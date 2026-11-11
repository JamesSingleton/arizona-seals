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
    <section className="on-dark bg-navy py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div
          className={cn(
            "grid grid-cols-1 gap-12 lg:gap-16",
            hasImage && "lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]",
          )}
        >
          <div>
            <SectionHeading
              title={title}
              intro={intro}
              onNavy
              className="mb-10 md:mb-12"
            />

            <ol>
              {rows.map((row) => (
                <li
                  key={row._key ?? `${row.year}-${row.meet}`}
                  className="grid grid-cols-[5.5rem_1fr] items-baseline gap-x-5 border-t-2 border-white/15 py-5 sm:grid-cols-[8rem_1fr] sm:gap-x-8 md:py-6"
                >
                  <span className="display text-5xl text-cyan-on-navy tabular-nums sm:text-6xl">
                    {row.year}
                  </span>
                  <div>
                    <h3 className="text-2xl not-italic text-white md:text-3xl">
                      {row.meet}
                    </h3>
                    {row.detail ? (
                      <p className="mt-1.5 leading-relaxed text-white/75">
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
                size="lg"
                className="mt-10 gap-3"
              />
            ) : null}
          </div>

          {hasImage ? (
            <div className="relative min-h-96 overflow-hidden lg:min-h-0">
              <SanityImage
                image={image}
                width={1200}
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="absolute inset-0 size-full object-cover"
                style={{
                  objectPosition: objectPositionFromHotspot(image?.hotspot),
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
