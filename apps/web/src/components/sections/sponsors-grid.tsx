import type { SanityImageProps } from "@/types";
import { SanityImage } from "../elements/sanity-image";

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
          <h2 className="font-display text-4xl font-bold text-navy uppercase md:text-5xl">
            {title}
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
          {sponsors.map((sponsor) => {
            const content = sponsor.image?.id ? (
              <SanityImage
                image={sponsor.image}
                alt={sponsor.name ?? "Sponsor"}
                className="h-12 w-auto object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
            ) : (
              <span className="font-display text-sm font-bold tracking-wide text-seal-gray uppercase opacity-60 transition-opacity hover:opacity-100">
                {sponsor.name}
              </span>
            );

            if (sponsor.url) {
              return (
                <a
                  key={sponsor._id ?? sponsor.name}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={sponsor.name ?? "Sponsor"}
                  className="flex h-16 items-center justify-center"
                >
                  {content}
                </a>
              );
            }

            return (
              <div
                key={sponsor._id ?? sponsor.name}
                className="flex h-16 items-center justify-center"
              >
                {content}
              </div>
            );
          })}
        </div>

        {footerNote || footerEmail ? (
          <p className="mt-12 text-center text-sm text-seal-gray">
            {footerNote || "Interested in becoming a sponsor?"}{" "}
            <a
              href={`mailto:${footerEmail}`}
              className="font-semibold text-cyan-brand hover:text-navy"
            >
              {footerEmail}
            </a>
          </p>
        ) : null}
      </div>
    </section>
  );
}
