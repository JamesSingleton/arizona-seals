/**
 * Writes the recruiting content (see recruiting-content.ts) to Sanity as
 * DRAFTS. Nothing is published: review each draft in Studio and publish it
 * yourself.
 *
 *   cd apps/studio
 *   pnpm exec sanity exec scripts/seed-recruiting-pages.ts --with-user-token
 *
 * Add `-- --dry-run` to print what would change without writing.
 *
 * Safe to re-run: new pages are only created if no draft or published copy
 * exists, and existing documents are edited in their draft, never replaced.
 * Deploy the Studio schema first (pnpm --filter studio run deploy) so the new
 * blocks and fields are editable.
 */
import { getCliClient } from "sanity/cli";

import {
  footerLinks,
  footerSubtitle,
  HOME_ORDER,
  homeHeroPatch,
  homePathways,
  homeResults,
  homeSteps,
  IDS,
  navAbout,
  navCoaches,
  navCta,
  navSchedule,
  navTryouts,
  programPatches,
  schedulePage,
  tryoutsPage,
} from "./recruiting-content";

const dryRun = process.argv.includes("--dry-run");
const client = getCliClient({ apiVersion: "2025-02-19" }).withConfig({
  perspective: "raw",
});

// Loose document shapes: this is a one-off content script.
type Doc = Record<string, any> & { _id: string; _type: string };

const draftId = (id: string) => `drafts.${id}`;

/** The draft if one exists, otherwise the published document. */
async function latest(id: string): Promise<Doc | null> {
  const docs = await client.fetch<Doc[]>(`*[_id in [$draft, $id]]`, {
    id,
    draft: draftId(id),
  });
  return docs.find((doc) => doc._id.startsWith("drafts.")) ?? docs[0] ?? null;
}

/** Pages that only exist as drafts until someone publishes them. */
const UNPUBLISHED = new Set<string>([IDS.tryouts, IDS.schedule]);

/**
 * A draft can't hold a normal reference to a document that isn't published
 * yet. Studio handles this with a weak reference that becomes a strong one
 * when the target is published; do the same here.
 */
function weakenUnpublishedRefs(node: any): any {
  if (Array.isArray(node)) return node.map(weakenUnpublishedRefs);
  if (!node || typeof node !== "object") return node;
  if (node._type === "reference" && UNPUBLISHED.has(node._ref)) {
    return { ...node, _weak: true, _strengthenOnPublish: { type: "page" } };
  }
  return Object.fromEntries(
    Object.entries(node).map(([key, value]) => [
      key,
      weakenUnpublishedRefs(value),
    ]),
  );
}

async function saveDraft(doc: Doc, label: string) {
  const { _rev, _updatedAt, _createdAt, _system, ...rest } = doc;
  const draft = weakenUnpublishedRefs({
    ...rest,
    _id: draftId(doc._id.replace(/^drafts\./, "")),
  });
  console.log(
    `${dryRun ? "[dry run] would write" : "writing"} draft: ${label}`,
  );
  if (!dryRun) await client.createOrReplace(draft);
}

async function createPage(page: Doc) {
  if (await latest(page._id)) {
    console.log(`skip: ${page.slug.current} already exists`);
    return;
  }
  await saveDraft(page, page.slug.current);
}

async function patchPrograms() {
  for (const [id, patch] of Object.entries(programPatches)) {
    const program = await latest(id);
    if (!program) {
      console.log(`skip: program ${id} not found`);
      continue;
    }
    await saveDraft(
      {
        ...program,
        ageRange: program.ageRange ?? patch.ageRange,
        practiceTimes: program.practiceTimes?.length
          ? program.practiceTimes
          : patch.practiceTimes,
      },
      `${program.name} practice times`,
    );
  }
}

async function patchHome() {
  const home = await latest(IDS.home);
  if (!home) {
    console.log("skip: home page not found");
    return;
  }
  const existing: Doc[] = home.pageBuilder ?? [];
  const added: Record<string, Doc> = {
    pathways: homePathways as unknown as Doc,
    resultsBoard: homeResults as unknown as Doc,
    processSteps: homeSteps as unknown as Doc,
  };

  const ordered: Doc[] = [];
  for (const type of HOME_ORDER) {
    const current = existing.find((block) => block._type === type);
    if (type === "hero" && current) {
      ordered.push({ ...current, ...homeHeroPatch });
    } else if (current) {
      ordered.push(current);
    } else if (added[type]) {
      ordered.push(added[type]);
    }
  }
  // Blocks the new layout doesn't name (e.g. "stats") are dropped from the
  // draft only; the published page keeps them until you publish.
  const dropped = existing
    .filter((block) => !ordered.some((kept) => kept._key === block._key))
    .map((block) => block._type);
  if (dropped.length) console.log(`home: leaving out ${dropped.join(", ")}`);

  // Point the closing call to action at the tryouts page.
  const cta = ordered.find((block) => block._type === "cta");
  if (cta?.buttons?.[0]) {
    cta.buttons[0] = { ...cta.buttons[0], text: navCta.text, url: navCta.url };
  }

  await saveDraft({ ...home, pageBuilder: ordered }, "home page");
}

async function patchNavbar() {
  const navbar = await latest("navbar");
  if (!navbar) {
    console.log("skip: navbar not found");
    return;
  }
  const programs = (navbar.columns ?? []).find(
    (column: Doc) =>
      column._type === "navbarColumn" && column.title === "Programs",
  );
  const columns = [
    programs,
    navTryouts,
    navSchedule,
    navCoaches,
    navAbout,
  ].filter(Boolean);

  const signIn = (navbar.buttons ?? []).filter(
    (button: Doc) => button.url?.type === "external",
  );
  await saveDraft(
    { ...navbar, columns, buttons: [navCta, ...signIn] },
    "navbar",
  );
}

async function patchFooter() {
  const footerId = await client.fetch<string | null>(
    `*[_type == "footer" && !(_id in path("drafts.**"))][0]._id`,
  );
  const footer = footerId ? await latest(footerId) : null;
  if (!footer) {
    console.log("skip: footer not found");
    return;
  }
  const columns = (footer.columns ?? []).map((column: Doc, index: number) => {
    if (index !== 0) return column;
    const names = new Set((column.links ?? []).map((link: Doc) => link.name));
    const missing = footerLinks.filter((link) => !names.has(link.name));
    const [home, ...rest] = column.links ?? [];
    return { ...column, links: [home, ...missing, ...rest].filter(Boolean) };
  });
  await saveDraft({ ...footer, subtitle: footerSubtitle, columns }, "footer");
}

async function main() {
  await createPage(tryoutsPage as unknown as Doc);
  await createPage(schedulePage as unknown as Doc);
  await patchPrograms();
  await patchHome();
  await patchNavbar();
  await patchFooter();
  console.log(
    dryRun
      ? "Dry run complete. Nothing was written."
      : "Done. Review and publish the drafts in Studio.",
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
