/**
 * Creates the upcoming swim meets, an /events page with the calendar block,
 * and "Events" links in the navbar and footer — all as DRAFTS. Review and publish them in Studio.
 *
 *   cd apps/studio
 *   pnpm exec sanity exec scripts/seed-events.ts --with-user-token
 *
 * Add `-- --dry-run` to print what would change without writing.
 * Deploy the Studio schema first so the Event type is editable.
 */
import { getCliClient } from "sanity/cli";

const dryRun = process.argv.includes("--dry-run");
const client = getCliClient({ apiVersion: "2025-02-19" }).withConfig({
  perspective: "raw",
});

type Doc = Record<string, any> & { _id: string; _type: string };

const EVENTS_PAGE_ID = "page-events";
const UNPUBLISHED = new Set([EVENTS_PAGE_ID]);

const key = (() => {
  let n = 0;
  return (prefix: string) => `${prefix}${String(++n).padStart(3, "0")}`;
})();

/** Link to a page that may only exist as a draft (weak until published). */
const internal = (id: string) => ({
  _type: "customUrl",
  type: "internal",
  openInNewTab: false,
  internal: UNPUBLISHED.has(id)
    ? {
        _type: "reference",
        _ref: id,
        _weak: true,
        _strengthenOnPublish: { type: "page" },
      }
    : { _type: "reference", _ref: id },
});

/**
 * Upcoming meets copied from the team's GoMotion calendar (Nov 11, 2026).
 * GoMotion stores times in Arizona time; meets listed from 12:00 AM are
 * treated as all-day. Hosts and missing street addresses are left blank
 * rather than guessed.
 */
const AZ = (local: string) => new Date(`${local}-07:00`).toISOString();

type Meet = {
  slug: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  location: Record<string, string>;
  summary: string;
  pdf: string;
};

const meets: Meet[] = [
  {
    slug: "jsc-fall-invite-2026",
    title: "JSC Fall Invite",
    start: AZ("2026-11-13T00:00:00"),
    end: AZ("2026-11-15T00:00:00"),
    allDay: true,
    location: {
      name: "Martin Pear Aquatic Center",
      street: "12701 N Scottsdale Rd",
      city: "Scottsdale",
      state: "AZ",
      zip: "85254",
    },
    summary:
      "Three-day meet at Martin Pear Aquatic Center in Scottsdale. Entry deadline was Nov. 2.",
    pdf: "https://www.gomotionapp.com/azseals/__eventform__/1612402_30a32a2a-ea5d-43c1-9e93-c40331572a74.pdf",
  },
  {
    slug: "fast-winter-lights-2026",
    title: "FAST Winter Lights",
    start: AZ("2026-12-03T00:00:00"),
    end: AZ("2026-12-06T19:30:00"),
    allDay: true,
    location: {
      name: "Oro Valley Aquatic Center",
      street: "23 W Calle Concordia",
      city: "Oro Valley",
      state: "AZ",
      zip: "85704",
    },
    summary:
      "Four-day meet at Oro Valley Aquatic Center. Entry deadline: Nov. 22.",
    pdf: "https://www.gomotionapp.com/azseals/__eventform__/1592884_03c8bd99-40b4-4b82-b586-8923d02120b0.pdf",
  },
  {
    slug: "christmas-bonus-meet-2026",
    title: "Christmas Bonus Meet",
    start: AZ("2026-12-19T00:00:00"),
    end: AZ("2026-12-20T00:00:00"),
    allDay: true,
    location: { name: "MVCC", city: "Phoenix", state: "AZ", zip: "85023" },
    summary: "Two-day meet in Phoenix. Entry deadline: Dec. 1.",
    pdf: "https://www.gomotionapp.com/azseals/__eventform__/1605612_bfb0533e-047d-4e0a-bc64-33f7e9bd0d7c.pdf",
  },
  {
    slug: "heat-new-years-splash-2027",
    title: "Heat New Year's Splash",
    start: AZ("2027-01-15T17:00:00"),
    end: AZ("2027-01-17T17:00:00"),
    allDay: false,
    location: {
      name: "Valley Aquatic Center",
      street: "4318 W 18th St",
      city: "Yuma",
      state: "AZ",
      zip: "85364",
    },
    summary:
      "Three-day meet at Valley Aquatic Center in Yuma. Entry deadline: Dec. 30.",
    pdf: "https://www.gomotionapp.com/azseals/__eventform__/1588233_909064b8-9a62-4305-8f7e-571107ffd779.pdf",
  },
  {
    slug: "bob-platt-memorial-2027",
    title: "Bob Platt Memorial",
    start: AZ("2027-01-29T15:00:00"),
    end: AZ("2027-01-31T17:00:00"),
    allDay: false,
    location: {
      name: "Cactus Aquatic Center",
      city: "Scottsdale",
      state: "AZ",
    },
    summary:
      "Three-day meet at Cactus Aquatic Center in Scottsdale. Entry deadline: Jan. 17.",
    pdf: "https://www.gomotionapp.com/azseals/__eventform__/1588232_c3b35fa1-79b2-41a3-ad75-19170bc7beaa.pdf",
  },
];

const meetDocs: Doc[] = meets.map((meet) => ({
  _id: `event-${meet.slug}`,
  _type: "event",
  title: meet.title,
  slug: { _type: "slug", current: `/events/${meet.slug}` },
  category: "meet",
  start: meet.start,
  end: meet.end,
  allDay: meet.allDay,
  status: "scheduled",
  summary: meet.summary,
  location: meet.location,
  linkLabel: "Meet info (PDF)",
  link: {
    _type: "customUrl",
    type: "external",
    openInNewTab: true,
    external: meet.pdf,
  },
  seoNoIndex: false,
}));

const eventsPage: Doc = {
  _id: EVENTS_PAGE_ID,
  _type: "page",
  title: "Events",
  description:
    "Swim meets, community events and team events for Arizona Seals Swimming in Maricopa, AZ.",
  slug: { _type: "slug", current: "/events" },
  seoTitle: "Swim Meets & Events | Arizona Seals, Maricopa AZ",
  seoDescription:
    "Upcoming swim meets, community events and team events for Arizona Seals Swimming in Maricopa, AZ. Come say hello or race with us.",
  pageBuilder: [
    {
      _key: key("blk"),
      _type: "pageHero",
      title: "Events",
      subtitle:
        "Where the Seals are racing, and where to find us around Maricopa.",
      overlay: true,
    },
    {
      _key: key("blk"),
      _type: "eventsCalendar",
      title: "Calendar",
      intro:
        "Meets, community events and team events. Select an event for times, directions and an add-to-calendar file.",
      showPast: true,
    },
    {
      _key: key("blk"),
      _type: "cta",
      layout: "navyBand",
      title: "Want to Swim With Us?",
      richText: [
        {
          _key: key("b"),
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: key("s"),
              _type: "span",
              marks: [],
              text: "Every new Seal starts with a short tryout at Copper Sky.",
            },
          ],
        },
      ],
      buttons: [
        {
          _key: key("btn"),
          _type: "button",
          text: "Schedule a Tryout",
          variant: "default",
          url: internal("page-tryouts"),
        },
      ],
    },
  ],
};

const draftId = (id: string) => `drafts.${id.replace(/^drafts\./, "")}`;

async function latest(id: string): Promise<Doc | null> {
  const docs = await client.fetch<Doc[]>(`*[_id in [$draft, $id]]`, {
    id,
    draft: draftId(id),
  });
  return docs.find((d) => d._id.startsWith("drafts.")) ?? docs[0] ?? null;
}

async function saveDraft(doc: Doc, label: string) {
  const { _rev, _updatedAt, _createdAt, _system, ...rest } = doc;
  console.log(
    `${dryRun ? "[dry run] would write" : "writing"} draft: ${label}`,
  );
  if (!dryRun) await client.createOrReplace({ ...rest, _id: draftId(doc._id) });
}

async function createIfMissing(doc: Doc, label: string) {
  if (await latest(doc._id)) {
    console.log(`skip: ${label} already exists`);
    return;
  }
  await saveDraft(doc, label);
}

async function addNavbarLink() {
  const navbar = await latest("navbar");
  if (!navbar) return console.log("skip: navbar not found");
  const columns: any[] = navbar.columns ?? [];
  if (columns.some((c) => c.name === "Events")) {
    return console.log("skip: navbar already has Events");
  }
  const link = {
    _key: "navEvents",
    _type: "navbarLink",
    name: "Events",
    url: internal(EVENTS_PAGE_ID),
  };
  const after = columns.findIndex((c) => c.name === "Schedule & Dues");
  const next = [...columns];
  next.splice(after >= 0 ? after + 1 : next.length, 0, link);
  await saveDraft({ ...navbar, columns: next }, "navbar (adds Events)");
}

async function addFooterLink() {
  const footerId = await client.fetch<string | null>(
    `*[_type == "footer" && !(_id in path("drafts.**"))][0]._id`,
  );
  const footer = footerId ? await latest(footerId) : null;
  if (!footer) return console.log("skip: footer not found");
  const columns: any[] = footer.columns ?? [];
  const first = columns[0];
  if (
    !first ||
    first.links?.some((l: { name?: string }) => l.name === "Events")
  ) {
    return console.log("skip: footer already has Events");
  }
  const link = {
    _key: "ftrEvents",
    _type: "footerColumnLink",
    name: "Events",
    url: internal(EVENTS_PAGE_ID),
  };
  const links: any[] = [...(first.links ?? [])];
  const after = links.findIndex((l) => l.name === "Schedule & Dues");
  links.splice(after >= 0 ? after + 1 : links.length, 0, link);
  await saveDraft(
    { ...footer, columns: [{ ...first, links }, ...columns.slice(1)] },
    "footer (adds Events)",
  );
}

async function main() {
  for (const doc of meetDocs) {
    await createIfMissing(doc, `event: ${doc.title}`);
  }
  await createIfMissing(eventsPage, "/events page");
  await addNavbarLink();
  await addFooterLink();
  console.log(
    dryRun
      ? "Dry run complete. Nothing was written."
      : "Done. Publish the drafts in Studio.",
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
