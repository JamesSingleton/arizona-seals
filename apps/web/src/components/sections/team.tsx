import { Award, Mail } from "lucide-react";

import type { SanityImageProps, SanityRichTextProps } from "@/types";
import { RichText } from "../elements/rich-text";
import {
  objectPositionFromHotspot,
  SanityImage,
} from "../elements/sanity-image";

export type TeamMember = {
  _id?: string;
  name?: string | null;
  position?: string | null;
  roles?: string[] | null;
  role?: string | null;
  featured?: boolean | null;
  /** @deprecated Prefer `featured` + `role` */
  tier?: string | null;
  email?: string | null;
  bio?: SanityRichTextProps | string | null;
  certifications?: string[] | null;
  specialties?: string[] | null;
  image?: SanityImageProps | null;
};

export type TeamBlockProps = {
  eyebrow?: string | null;
  title?: string | null;
  assistantsEyebrow?: string | null;
  assistantsTitle?: string | null;
  roleFilter?: string | null;
  /** split = featured cards + supporting list; uniform = equal cards for everyone */
  layout?: "split" | "uniform" | null;
  teamMembers?: TeamMember[] | null;
};

function isFeatured(member: TeamMember): boolean {
  if (typeof member.featured === "boolean") return member.featured;
  return member.tier === "head" || member.tier === "leadership";
}

/**
 * Board officer display order. Desk orderRank is shared with Coaching, so a
 * Head Coach who also sits on the board would otherwise appear first.
 * Match Vice President before President.
 */
function boardOfficerSortRank(position?: string | null): number {
  const p = (position ?? "").toLowerCase();
  if (/vice\s*president/.test(p)) return 1;
  if (/president/.test(p)) return 0;
  if (/treasurer/.test(p)) return 2;
  if (/secretary/.test(p)) return 3;
  if (/member\s*at\s*large|at[\s-]large/.test(p)) return 4;
  if (/head\s*coach/.test(p)) return 5;
  if (/coach/.test(p)) return 6;
  return 50;
}

function sortBoardOfficers(members: TeamMember[]): TeamMember[] {
  return [...members].sort(
    (a, b) =>
      boardOfficerSortRank(a.position) - boardOfficerSortRank(b.position),
  );
}

function hasImage(
  member: TeamMember,
): member is TeamMember & { image: NonNullable<TeamMember["image"]> } {
  return Boolean(member.image?.id);
}

function hasMeaningfulBio(bio?: TeamMember["bio"]): boolean {
  if (!bio) return false;
  if (typeof bio === "string") return bio.trim().length > 0;
  if (!Array.isArray(bio) || bio.length === 0) return false;

  return bio.some((block) => {
    if (!block || typeof block !== "object") return false;
    const children = (block as { children?: unknown }).children;
    if (!Array.isArray(children)) return false;
    return children.some((child) => {
      if (!child || typeof child !== "object") return false;
      const text = (child as { text?: unknown }).text;
      return typeof text === "string" && text.trim().length > 0;
    });
  });
}

function hasExpandedBody(
  member: TeamMember,
  { includeBio = true }: { includeBio?: boolean } = {},
): boolean {
  return Boolean(
    (includeBio && hasMeaningfulBio(member.bio)) ||
      member.specialties?.length ||
      member.certifications?.length,
  );
}

function initialsFromName(name?: string | null): string {
  if (!name?.trim()) return "?";
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase() || "?";
}

function BioText({ bio }: { bio?: TeamMember["bio"] }) {
  if (!hasMeaningfulBio(bio)) return null;
  if (typeof bio === "string") {
    return <p className="text-sm leading-relaxed text-seal-gray">{bio}</p>;
  }
  return (
    <RichText
      richText={bio}
      className="text-sm leading-relaxed text-seal-gray [&_p]:mb-3"
    />
  );
}

function EmailLink({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  return (
    <a
      href={`mailto:${email}`}
      className={
        className ??
        "inline-flex items-center gap-2 text-sm font-medium text-cyan-brand hover:text-foreground"
      }
    >
      <Mail size={14} className="shrink-0" />
      <span className="break-all">{email}</span>
    </a>
  );
}

function PersonIdentity({ member }: { member: TeamMember }) {
  return (
    <>
      {member.position ? (
        <p className="mb-1.5 font-display text-sm font-bold tracking-[0.12em] text-cyan-on-navy uppercase md:text-base">
          {member.position}
        </p>
      ) : null}
      <h3 className="font-display text-2xl font-bold text-white uppercase md:text-3xl">
        {member.name}
      </h3>
    </>
  );
}

function PersonBody({
  member,
  showBio = true,
}: {
  member: TeamMember;
  showBio?: boolean;
}) {
  return (
    <div className="shrink-0 space-y-4 bg-background p-6">
      {showBio ? <BioText bio={member.bio} /> : null}
      {member.specialties?.length ? (
        <div className="flex flex-wrap gap-2">
          {member.specialties.map((s) => (
            <span
              key={s}
              className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground"
            >
              {s}
            </span>
          ))}
        </div>
      ) : null}
      {member.certifications?.length ? (
        <ul className="space-y-1.5">
          {member.certifications.map((c) => (
            <li
              key={c}
              className="flex items-center gap-2 text-xs text-seal-gray"
            >
              <Award size={14} className="shrink-0 text-cyan-brand" />
              {c}
            </li>
          ))}
        </ul>
      ) : null}
      {member.email ? <EmailLink email={member.email} /> : null}
    </div>
  );
}

/**
 * Shared portrait media for team cards — hotspot-aware cover crop.
 */
function TeamMemberPhoto({
  member,
  width,
  sizes,
  fallbackClassName,
}: {
  member: TeamMember;
  width: number;
  sizes: string;
  fallbackClassName?: string;
}) {
  if (hasImage(member)) {
    return (
      <SanityImage
        image={member.image}
        width={width}
        sizes={sizes}
        className="absolute inset-0 size-full object-cover"
        style={{
          objectPosition: objectPositionFromHotspot(member.image?.hotspot),
        }}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={
        fallbackClassName ??
        "absolute inset-0 flex items-center justify-center bg-linear-to-br from-navy to-[#132847]"
      }
    >
      <span className="font-display text-6xl font-bold tracking-wide text-cyan-on-navy/40 uppercase md:text-7xl">
        {initialsFromName(member.name)}
      </span>
    </div>
  );
}

/**
 * Equal-weight person card. Photo and no-photo variants share the same
 * portrait slot height so a mixed board grid stays visually balanced.
 * When a row mate has a contact footer, cards without one grow the portrait
 * instead of leaving an empty bottom bar.
 */
function PersonCard({
  member,
  showBio = true,
}: {
  member: TeamMember;
  showBio?: boolean;
}) {
  const showBody =
    hasExpandedBody(member, { includeBio: showBio }) || Boolean(member.email);

  return (
    <article className="flex h-full flex-col overflow-hidden border border-border bg-background">
      <div
        className={
          showBody
            ? "relative h-72 shrink-0 bg-navy md:h-80"
            : "relative min-h-72 flex-1 bg-navy md:min-h-80"
        }
      >
        <TeamMemberPhoto
          member={member}
          width={1200}
          sizes="(min-width: 768px) 50vw, 100vw"
        />
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-navy via-navy/70 to-transparent p-5 pt-16">
          <PersonIdentity member={member} />
        </div>
      </div>
      {showBody ? <PersonBody member={member} showBio={showBio} /> : null}
    </article>
  );
}

function SupportingPersonRow({ member }: { member: TeamMember }) {
  return (
    <article className="flex flex-col gap-5 border-b border-border py-8 last:border-0 sm:flex-row sm:items-start">
      <div className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy sm:size-28">
        {hasImage(member) ? (
          <TeamMemberPhoto member={member} width={400} sizes="112px" />
        ) : (
          <span
            aria-hidden
            className="font-display text-2xl font-bold tracking-wide text-cyan-brand uppercase sm:text-3xl"
          >
            {initialsFromName(member.name)}
          </span>
        )}
      </div>
      <div className="flex-1 space-y-3">
        <div>
          <h3 className="font-display text-xl font-bold text-foreground uppercase">
            {member.name}
          </h3>
          {member.position ? (
            <p className="text-sm font-semibold text-cyan-brand">
              {member.position}
            </p>
          ) : null}
        </div>
        <BioText bio={member.bio} />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {member.certifications?.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-1.5 text-xs text-seal-gray"
            >
              <Award size={12} className="text-cyan-brand" />
              {c}
            </span>
          ))}
          {member.email ? (
            <a
              href={`mailto:${member.email}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-brand"
            >
              <Mail size={12} />
              {member.email}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function PersonGrid({
  eyebrow,
  title,
  members,
  showBio = true,
}: {
  eyebrow?: string | null;
  title?: string | null;
  members: TeamMember[];
  showBio?: boolean;
}) {
  return (
    <section className="bg-muted py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="mb-12 text-center">
          {eyebrow ? (
            <p className="mb-2 font-display text-sm font-bold tracking-[0.2em] text-cyan-brand uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="font-display text-4xl font-bold text-foreground uppercase md:text-5xl">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
          {members.map((member) => (
            <PersonCard
              key={member._id ?? member.name}
              member={member}
              showBio={showBio}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function TeamBlock({
  eyebrow = "Leadership",
  title = "Featured",
  assistantsEyebrow = "The Full Staff",
  assistantsTitle = "Team Members",
  roleFilter,
  layout,
  teamMembers,
}: TeamBlockProps) {
  if (!teamMembers?.length) return null;

  const resolvedLayout =
    layout ?? (roleFilter === "board" ? "uniform" : "split");
  const showBio = roleFilter !== "board";

  const membersForDisplay =
    roleFilter === "board" ? sortBoardOfficers(teamMembers) : teamMembers;

  if (resolvedLayout === "uniform") {
    return (
      <PersonGrid
        eyebrow={eyebrow}
        title={title}
        members={membersForDisplay}
        showBio={showBio}
      />
    );
  }

  const featured = membersForDisplay.filter(isFeatured);
  const supporting = membersForDisplay.filter((m) => !isFeatured(m));
  const featuredList = featured.length ? featured : membersForDisplay;
  const supportingList = featured.length ? supporting : [];

  return (
    <>
      <PersonGrid
        eyebrow={eyebrow}
        title={title}
        members={featuredList}
        showBio={showBio}
      />

      {supportingList.length > 0 ? (
        <section className="bg-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
            <div className="mb-10">
              {assistantsEyebrow ? (
                <p className="mb-2 font-display text-sm font-bold tracking-[0.2em] text-cyan-brand uppercase">
                  {assistantsEyebrow}
                </p>
              ) : null}
              <h2 className="font-display text-3xl font-bold text-foreground uppercase md:text-4xl">
                {assistantsTitle}
              </h2>
            </div>
            <div>
              {supportingList.map((member) => (
                <SupportingPersonRow
                  key={member._id ?? member.name}
                  member={member}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
