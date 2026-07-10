import type { SanityImageProps } from "@/types";
import { SponsorLogo } from "../elements/sponsor-logo";

export type SponsorsGridSponsor = {
  _id?: string;
  name?: string | null;
  url?: string | null;
  tier?: string | null;
  image?: SanityImageProps | null;
  level?: {
    _id?: string;
    name?: string | null;
    slug?: string | null;
    orderRank?: string | null;
  } | null;
};

export type SponsorsGridProps = {
  eyebrow?: string | null;
  title?: string | null;
  sponsors?: SponsorsGridSponsor[] | null;
  footerNote?: string | null;
  footerEmail?: string | null;
};

type SponsorGroup = {
  key: string;
  name: string;
  sponsors: SponsorsGridSponsor[];
};

function groupSponsorsByLevel(
  sponsors: SponsorsGridSponsor[],
): SponsorGroup[] {
  const groups = new Map<string, SponsorGroup>();

  for (const sponsor of sponsors) {
    const key = sponsor.level?._id ?? sponsor.tier ?? "ungrouped";
    const name = sponsor.level?.name ?? sponsor.tier ?? "Partners";
    const existing = groups.get(key);
    if (existing) {
      existing.sponsors.push(sponsor);
    } else {
      groups.set(key, { key, name, sponsors: [sponsor] });
    }
  }

  return Array.from(groups.values());
}

export function SponsorsGrid({
  eyebrow = "Thank You",
  title = "Our Sponsors & Partners",
  sponsors,
  footerNote,
  footerEmail = "info@azsealsswimming.com",
}: SponsorsGridProps) {
  if (!sponsors?.length) return null;

  const groups = groupSponsorsByLevel(sponsors);
  const showGroupHeadings = groups.length > 1;

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="mb-14 text-center">
          {eyebrow ? (
            <p className="mb-2 font-display text-sm font-bold tracking-[0.2em] text-cyan-brand uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="font-display text-4xl font-bold text-foreground uppercase md:text-5xl">
            {title}
          </h2>
        </div>

        <div className="space-y-14">
          {groups.map((group) => (
            <div key={group.key}>
              {showGroupHeadings ? (
                <h3 className="mb-6 text-center font-display text-sm font-bold tracking-[0.25em] text-cyan-brand uppercase">
                  {group.name}
                </h3>
              ) : null}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
                {group.sponsors.map((sponsor) => (
                  <SponsorLogo
                    key={sponsor._id ?? sponsor.name}
                    name={sponsor.name}
                    image={sponsor.image}
                    url={sponsor.url}
                    size="md"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {footerNote || footerEmail ? (
          <p className="mt-12 text-center text-sm text-seal-gray">
            {footerNote || "Interested in becoming a sponsor?"}{" "}
            <a
              href={`mailto:${footerEmail}`}
              className="font-semibold text-cyan-brand hover:text-foreground"
            >
              {footerEmail}
            </a>
          </p>
        ) : null}
      </div>
    </section>
  );
}
