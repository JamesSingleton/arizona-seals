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

export function Pathways({ title, intro, cards }: PathwaysProps) {
  const items = cards?.filter((card) => card?.title) ?? [];
  if (!items.length) return null;

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeading
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
          {items.map((card) => {
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
                  className="on-dark group relative flex min-h-[30rem] w-full flex-col justify-end overflow-hidden bg-navy"
                >
                  {card.image?.id ? (
                    <SanityImage
                      image={card.image}
                      width={900}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      style={{
                        objectPosition: objectPositionFromHotspot(
                          card.image.hotspot,
                        ),
                      }}
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-linear-to-t from-[#061428]/95 via-[#061428]/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 bg-pool transition-transform duration-500 group-hover:scale-x-100" />

                  <div className="relative p-6 md:p-7">
                    <h3 className="mb-3 text-4xl text-white md:text-[2.75rem]">
                      {card.title}
                    </h3>
                    {card.description ? (
                      <p className="mb-5 leading-relaxed text-white/85">
                        {card.description}
                      </p>
                    ) : null}
                    <span className="label inline-flex items-center gap-2 text-base font-extrabold text-white">
                      {label}
                      <Arrow className="size-5 text-pool transition-transform duration-300 group-hover:translate-x-1" />
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
