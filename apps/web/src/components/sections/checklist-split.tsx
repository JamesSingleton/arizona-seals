import { Star } from "lucide-react";

import type { SanityButtonProps, SanityImageProps } from "@/types";
import { SanityButtons } from "../elements/sanity-buttons";
import {
  objectPositionFromHotspot,
  SanityImage,
} from "../elements/sanity-image";

export type ChecklistSplitProps = {
  eyebrow?: string | null;
  title?: string | null;
  paragraphs?: (string | null)[] | null;
  items?: (string | null)[] | null;
  image?: SanityImageProps | null;
  imagePlacement?: "start" | "end" | null;
  variant?: "default" | "muted" | "soft" | null;
  buttons?: SanityButtonProps[] | null;
};

const bgClass = {
  default: "bg-background",
  muted: "bg-muted",
  soft: "bg-accent",
} as const;

export function ChecklistSplit({
  eyebrow,
  title,
  paragraphs,
  items,
  image,
  imagePlacement = "end",
  variant = "default",
  buttons,
}: ChecklistSplitProps) {
  if (!title && !items?.length && !paragraphs?.length) return null;

  const imageAtEnd = imagePlacement !== "start";
  const lines = paragraphs?.filter(Boolean) ?? [];
  const checks = items?.filter(Boolean) ?? [];

  return (
    <section className={`${bgClass[variant ?? "default"]} py-20 md:py-28`}>
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className={imageAtEnd ? "" : "lg:order-2"}>
            {eyebrow ? (
              <div className="mb-4 flex items-center gap-3">
                <div className="h-0.5 w-8 bg-cyan-brand" />
                <span className="font-display text-xs font-bold tracking-[0.25em] text-cyan-brand uppercase">
                  {eyebrow}
                </span>
              </div>
            ) : null}
            {title ? (
              <h2 className="mb-6 font-display text-3xl font-bold text-foreground uppercase md:text-4xl">
                {title}
              </h2>
            ) : null}
            {lines.map((p) => (
              <p
                key={p!.slice(0, 40)}
                className="mb-4 text-base leading-relaxed text-seal-gray last:mb-6"
              >
                {p}
              </p>
            ))}
            {checks.length > 0 ? (
              <ul className="mb-8 space-y-3">
                {checks.map((item) => (
                  <li
                    key={item!}
                    className="flex items-start gap-3 text-sm text-seal-gray"
                  >
                    <Star
                      size={14}
                      className="mt-0.5 shrink-0 fill-cyan-brand text-cyan-brand"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
            {buttons?.length ? (
              <SanityButtons
                buttons={buttons}
                className="gap-3"
                buttonClassName="font-display text-sm font-bold tracking-widest uppercase"
              />
            ) : null}
          </div>

          <div
            className={`relative h-72 overflow-hidden bg-muted md:h-[420px] ${imageAtEnd ? "" : "lg:order-1"}`}
          >
            {image?.id ? (
              <SanityImage
                image={image}
                width={1200}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="absolute inset-0 size-full object-cover"
                style={{
                  objectPosition: objectPositionFromHotspot(image.hotspot),
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
