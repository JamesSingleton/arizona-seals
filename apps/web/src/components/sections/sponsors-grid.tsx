import type { SanityImageProps } from "@/types";
import { SponsorLogo } from "../elements/sponsor-logo";

export type SponsorsGridSponsor = {
  _id?: string;
  name?: string | null;
  url?: string | null;
  image?: SanityImageProps | null;
};

export type SponsorsGridProps = {
  eyebrow?: string | null;
  title?: string | null;
  sponsors?: SponsorsGridSponsor[] | null;
  footerNote?: string | null;
  footerEmail?: string | null;
};

export function SponsorsGrid({
  eyebrow = "Thank You",
  title = "Our Sponsors & Partners",
  sponsors,
  footerNote,
  footerEmail = "info@azsealsswimming.com",
}: SponsorsGridProps) {
  if (!sponsors?.length) return null;

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

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          {sponsors.map((sponsor) => (
            <SponsorLogo
              key={sponsor._id ?? sponsor.name}
              name={sponsor.name}
              image={sponsor.image}
              url={sponsor.url}
              size="md"
            />
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
