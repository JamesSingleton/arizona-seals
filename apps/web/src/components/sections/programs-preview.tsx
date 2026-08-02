import Link from "next/link";

import type { SanityImageProps } from "@/types";
import {
  objectPositionFromHotspot,
  SanityImage,
} from "../elements/sanity-image";

export type ProgramsPreviewProgram = {
  _id?: string;
  id?: string | null;
  name?: string | null;
  summary?: string | null;
  accent?: string | null;
  level?: string | null;
  image?: SanityImageProps | null;
};

export type ProgramsPreviewProps = {
  eyebrow?: string | null;
  title?: string | null;
  intro?: string | null;
  viewAllLabel?: string | null;
  viewAllUrl?: { href?: string | null } | null;
  programs?: ProgramsPreviewProgram[] | null;
};

export function ProgramsPreview({
  eyebrow = "Training Groups",
  title = "Our Programs",
  intro,
  viewAllLabel = "View All Programs →",
  viewAllUrl,
  programs,
}: ProgramsPreviewProps) {
  if (!programs?.length) return null;

  const viewAllHref = viewAllUrl?.href || "/programs";

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="mb-14">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-0.5 w-8 bg-cyan-brand" />
                <span className="font-display text-xs font-bold tracking-[0.25em] text-cyan-brand uppercase">
                  {eyebrow}
                </span>
              </div>
              <h2
                className="font-display font-black leading-none text-foreground uppercase"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                {title}
              </h2>
            </div>
            <Link
              href={viewAllHref}
              className="w-fit shrink-0 border-b-2 border-foreground pb-0.5 font-display text-sm font-bold tracking-widest text-foreground uppercase transition-colors hover:border-cyan-brand hover:text-cyan-brand"
            >
              {viewAllLabel}
            </Link>
          </div>
          {intro ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-seal-gray md:mt-6">
              {intro}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((prog) => {
            const slug = prog.id;
            if (!slug) return null;
            const accent = prog.accent || "#00AEEF";

            return (
              <Link
                key={prog._id ?? slug}
                href={`/programs#${slug}`}
                className="group relative block h-80 overflow-hidden"
              >
                {prog.image?.id ? (
                  <SanityImage
                    image={prog.image}
                    width={1200}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{
                      objectPosition: objectPositionFromHotspot(
                        prog.image.hotspot,
                      ),
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-navy" />
                )}
                <div className="absolute inset-0 bg-navy/50 transition-colors duration-300 group-hover:bg-navy/30" />
                <div
                  className="absolute top-0 right-0 left-0 h-1.5"
                  style={{ backgroundColor: accent }}
                />
                <div className="absolute right-0 bottom-0 left-0 p-5">
                  {prog.level ? (
                    <p className="mb-1 font-display text-xs tracking-widest text-white/70 uppercase">
                      {prog.level}
                    </p>
                  ) : null}
                  <h3 className="mb-2 font-display text-2xl leading-none font-black text-white uppercase">
                    {prog.name}
                  </h3>
                  {prog.summary ? (
                    <p className="line-clamp-2 text-xs leading-relaxed text-white/0 transition-all duration-300 group-hover:text-white/80">
                      {prog.summary}
                    </p>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
