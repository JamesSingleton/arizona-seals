import { buttonCtaClassName } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

import type { SanityButtonProps, SanityImageProps } from "@/types";
import { SanityButtons } from "../elements/sanity-buttons";
import {
  objectPositionFromHotspot,
  SanityImage,
} from "../elements/sanity-image";
import { SectionHeading } from "../elements/section-heading";

export type ResultsBoardProps = {
  eyebrow?: string | null;
  title?: string | null;
  intro?: string | null;
  results?:
    | {
        _key?: string;
        year?: string | null;
        meet?: string | null;
        detail?: string | null;
      }[]
    | null;
  image?: SanityImageProps | null;
  buttons?: SanityButtonProps[] | null;
};

export function ResultsBoard({
  eyebrow,
  title,
  intro,
  results,
  image,
  buttons,
}: ResultsBoardProps) {
  const rows = results?.filter((row) => row?.meet) ?? [];
  if (!rows.length) return null;
  const hasImage = Boolean(image?.id);

  return (
    <section className="relative overflow-hidden bg-navy py-20 md:py-28">
      {/* Lane-line texture: thin horizontal rules echo a pool's lane ropes. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, #fff 0 2px, transparent 2px 96px)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div
          className={cn(
            "grid grid-cols-1 gap-12 lg:gap-16",
            hasImage && "lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)]",
          )}
        >
          <div>
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              intro={intro}
              onNavy
              className="mb-10 md:mb-12"
            />

            <ol className="border-t border-white/15">
              {rows.map((row) => (
                <li
                  key={row._key ?? `${row.year}-${row.meet}`}
                  className="grid grid-cols-[4.5rem_1fr] items-baseline gap-x-5 border-b border-white/15 py-5 sm:grid-cols-[6.5rem_1fr] sm:gap-x-8 md:py-6"
                >
                  <span className="font-display text-3xl leading-none font-black text-cyan-on-navy tabular-nums sm:text-5xl">
                    {row.year}
                  </span>
                  <div>
                    <h3 className="font-display text-xl leading-tight font-bold text-white uppercase md:text-2xl">
                      {row.meet}
                    </h3>
                    {row.detail ? (
                      <p className="mt-1.5 text-sm leading-relaxed text-white/75 md:text-base">
                        {row.detail}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            {buttons?.length ? (
              <SanityButtons
                placement="results_board"
                buttons={buttons}
                className="mt-10 gap-3"
                buttonClassName={cn(buttonCtaClassName, "h-12 px-8")}
              />
            ) : null}
          </div>

          {hasImage ? (
            <div className="relative min-h-80 overflow-hidden lg:min-h-0">
              <SanityImage
                image={image}
                width={1200}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="absolute inset-0 size-full object-cover"
                style={{
                  objectPosition: objectPositionFromHotspot(image?.hotspot),
                }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy/60 to-transparent" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
