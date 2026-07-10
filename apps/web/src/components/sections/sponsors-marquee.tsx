"use client";

import { Marquee } from "@workspace/ui/components/marquee";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { SanityImageProps } from "@/types";
import { SponsorLogo } from "../elements/sponsor-logo";

export type SponsorsMarqueeSponsor = {
  _id?: string;
  name?: string | null;
  url?: string | null;
  image?: SanityImageProps | null;
};

export type SponsorsMarqueeProps = {
  eyebrow?: string | null;
  title?: string | null;
  viewAllLabel?: string | null;
  viewAllUrl?: { href?: string | null } | null;
  sponsors?: SponsorsMarqueeSponsor[] | null;
};

function SponsorItem({ sponsor }: { sponsor: SponsorsMarqueeSponsor }) {
  return (
    <div className="mx-3 flex items-center justify-center">
      <SponsorLogo
        name={sponsor.name}
        image={sponsor.image}
        url={sponsor.url}
        size="sm"
      />
    </div>
  );
}

export function SponsorsMarquee({
  eyebrow = "Proudly Supported By",
  title = "Our Sponsors & Partners",
  viewAllLabel = "View All Sponsors →",
  viewAllUrl,
  sponsors,
}: SponsorsMarqueeProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!sponsors?.length) return null;

  const viewAllHref = viewAllUrl?.href || "/sponsors";

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
        {reducedMotion ? (
          <div className="flex flex-wrap items-center justify-center gap-3 px-4">
            {sponsors.map((sponsor) => (
              <SponsorItem
                key={sponsor._id ?? sponsor.name}
                sponsor={sponsor}
              />
            ))}
          </div>
        ) : (
          <Marquee pauseOnHover className="[--duration:35s]">
            {sponsors.map((sponsor) => (
              <SponsorItem
                key={sponsor._id ?? sponsor.name}
                sponsor={sponsor}
              />
            ))}
          </Marquee>
        )}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-muted to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-muted to-transparent" />
      </div>
    </section>
  );
}
