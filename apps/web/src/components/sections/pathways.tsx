import { trackClick } from "@workspace/analytics";
import { cn } from "@workspace/ui/lib/utils";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import type { SanityImageProps } from "@/types";
import {
  objectPositionFromHotspot,
  SanityImage,
} from "../elements/sanity-image";
import { SectionHeading } from "../elements/section-heading";

export type PathwayCard = {
  _key?: string;
  kicker?: string | null;
  title?: string | null;
  description?: string | null;
  linkLabel?: string | null;
  href?: string | null;
  openInNewTab?: boolean | null;
  image?: SanityImageProps | null;
};

export type PathwaysProps = {
  eyebrow?: string | null;
  title?: string | null;
  intro?: string | null;
  cards?: PathwayCard[] | null;
};

const gridCols: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function Pathways({ eyebrow, title, intro, cards }: PathwaysProps) {
  const items = cards?.filter((card) => card?.title) ?? [];
  if (!items.length) return null;

  return (
    <section className="bg-muted py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          intro={intro}
          className="mb-12 md:mb-14"
        />

        <ul
          className={cn(
            "grid grid-cols-1 gap-6",
            gridCols[items.length] ?? gridCols[3],
          )}
        >
          {items.map((card, index) => {
            const href = card.href || "#";
            const external = /^https?:\/\//.test(href);
            const Arrow = external ? ArrowUpRight : ArrowRight;
            const label = card.linkLabel || "Learn more";

            return (
              <li key={card._key ?? card.title} className="flex">
                <Link
                  href={href}
                  target={card.openInNewTab || external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  {...trackClick("marketing_cta_clicked", {
                    cta_label: card.title ?? "",
                    cta_href: href,
                    placement: "pathways_card",
                  })}
                  className="group flex w-full flex-col overflow-hidden bg-background shadow-[0_1px_0_0_var(--border)] ring-1 ring-border transition-shadow duration-300 hover:shadow-xl hover:ring-cyan-brand focus-visible:ring-2 focus-visible:ring-cyan-brand focus-visible:outline-none"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-navy">
                    {card.image?.id ? (
                      <SanityImage
                        image={card.image}
                        width={900}
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{
                          objectPosition: objectPositionFromHotspot(
                            card.image.hotspot,
                          ),
                        }}
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="absolute -right-2 -bottom-8 font-display text-[11rem] leading-none font-black text-white/10"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 bg-cyan-on-navy transition-transform duration-500 group-hover:scale-x-100" />
                  </div>

                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    {card.kicker ? (
                      <p className="mb-2 font-display text-xs font-bold tracking-[0.2em] text-cyan-brand uppercase">
                        {card.kicker}
                      </p>
                    ) : null}
                    <h3 className="mb-3 font-display text-2xl leading-tight font-black text-foreground uppercase md:text-3xl">
                      {card.title}
                    </h3>
                    {card.description ? (
                      <p className="mb-6 text-sm leading-relaxed text-seal-gray md:text-base">
                        {card.description}
                      </p>
                    ) : null}
                    <span className="mt-auto inline-flex items-center gap-2 font-display text-sm font-bold tracking-widest text-foreground uppercase transition-colors group-hover:text-cyan-brand">
                      {label}
                      <Arrow
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
