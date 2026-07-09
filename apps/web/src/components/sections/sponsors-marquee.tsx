import { Marquee } from "@workspace/ui/components/marquee";
import Link from "next/link";

import { type MarqueeSponsor, marqueeSponsors } from "@/content/sponsors";

export type SponsorsMarqueeProps = {
  eyebrow?: string;
  title?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  sponsors?: MarqueeSponsor[];
};

export function SponsorsMarquee({
  eyebrow = "Proudly Supported By",
  title = "Our Sponsors & Partners",
  viewAllHref = "/sponsors",
  viewAllLabel = "View All Sponsors →",
  sponsors = marqueeSponsors,
}: SponsorsMarqueeProps) {
  return (
    <section className="overflow-hidden border-t border-border bg-muted py-16">
      <div className="mx-auto mb-8 flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div>
          <p className="mb-1 font-display text-sm font-bold tracking-[0.2em] text-cyan-brand uppercase">
            {eyebrow}
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground uppercase">
            {title}
          </h2>
        </div>
        <Link
          href={viewAllHref}
          className="shrink-0 text-sm font-bold tracking-wide text-cyan-brand uppercase transition-colors hover:text-foreground"
        >
          {viewAllLabel}
        </Link>
      </div>

      <div className="relative">
        <Marquee pauseOnHover className="[--duration:35s]">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="mx-8 flex h-14 items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-10 w-auto object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-muted to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-muted to-transparent" />
      </div>
    </section>
  );
}
