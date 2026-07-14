import { Award, Mail } from "lucide-react";

import type { SanityImageProps, SanityRichTextProps } from "@/types";
import { RichText } from "../elements/rich-text";
import { SanityImage } from "../elements/sanity-image";

export type TeamMember = {
  _id?: string;
  name?: string | null;
  position?: string | null;
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
  teamMembers?: TeamMember[] | null;
};

function isFeatured(member: TeamMember): boolean {
  if (typeof member.featured === "boolean") return member.featured;
  return member.tier === "head" || member.tier === "leadership";
}

function BioText({ bio }: { bio?: TeamMember["bio"] }) {
  if (!bio) return null;
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

function FeaturedPersonCard({ member }: { member: TeamMember }) {
  return (
    <article className="overflow-hidden border border-border bg-background">
      <div className="relative h-72 bg-muted md:h-80">
        {member.image?.id ? (
          <SanityImage
            image={member.image}
            alt={member.name ?? "Team member"}
            className="absolute inset-0 size-full object-cover object-top"
          />
        ) : null}
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-navy via-navy/70 to-transparent p-5 pt-16">
          {member.position ? (
            <p className="mb-1 font-display text-xs font-bold tracking-widest text-cyan-brand uppercase">
              {member.position}
            </p>
          ) : null}
          <h3 className="font-display text-2xl font-bold text-white uppercase">
            {member.name}
          </h3>
        </div>
      </div>
      <div className="space-y-4 p-6">
        <BioText bio={member.bio} />
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
        {member.email ? (
          <a
            href={`mailto:${member.email}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-cyan-brand hover:text-foreground"
          >
            <Mail size={14} />
            {member.email}
          </a>
        ) : null}
      </div>
    </article>
  );
}

function SupportingPersonRow({ member }: { member: TeamMember }) {
  return (
    <article className="flex flex-col gap-5 border-b border-border py-8 last:border-0 sm:flex-row sm:items-start">
      <div className="relative size-24 shrink-0 overflow-hidden rounded-full bg-muted sm:size-28">
        {member.image?.id ? (
          <SanityImage
            image={member.image}
            alt={member.name ?? "Team member"}
            className="absolute inset-0 size-full object-cover object-top"
          />
        ) : null}
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

export function TeamBlock({
  eyebrow = "Leadership",
  title = "Featured",
  assistantsEyebrow = "The Full Staff",
  assistantsTitle = "Team Members",
  teamMembers,
}: TeamBlockProps) {
  if (!teamMembers?.length) return null;

  const featured = teamMembers.filter(isFeatured);
  const supporting = teamMembers.filter((m) => !isFeatured(m));
  const featuredList = featured.length ? featured : teamMembers;
  const supportingList = featured.length ? supporting : [];

  return (
    <>
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
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {featuredList.map((member) => (
              <FeaturedPersonCard
                key={member._id ?? member.name}
                member={member}
              />
            ))}
          </div>
        </div>
      </section>

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
