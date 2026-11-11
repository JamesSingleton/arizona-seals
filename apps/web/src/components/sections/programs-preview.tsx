import { trackClick } from "@workspace/analytics";
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
  title = "Our Programs",
  intro,
  viewAllLabel = "View All Programs →",
  viewAllUrl,
  programs,
}: ProgramsPreviewProps) {
  if (!programs?.length) return null;

  const viewAllHref = viewAllUrl?.href || "/programs";

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="mb-14">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="section-title text-foreground">{title}</h2>
            </div>
            <Link
              href={viewAllHref}
              {...trackClick("marketing_cta_clicked", {
                cta_label: viewAllLabel ?? "View All",
                cta_href: viewAllHref,
                placement: "programs_preview_view_all",
              })}
              className="label inline-flex w-fit shrink-0 items-center text-base font-extrabold text-foreground underline decoration-cyan-brand decoration-[3px] underline-offset-[6px] transition-colors hover:text-cyan-brand"
            >
              {viewAllLabel}
            </Link>
          </div>
          {intro ? (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-seal-gray md:mt-6">
              {intro}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((prog) => {
            const slug = prog.id;
            if (!slug) return null;
            const accent = prog.accent || "#00AEEF";

            return (
              <Link
                key={prog._id ?? slug}
                href={`/programs#${slug}`}
                {...trackClick("marketing_cta_clicked", {
                  cta_label: prog.name ?? slug,
                  cta_href: `/programs#${slug}`,
                  placement: "programs_preview_card",
                })}
                className="on-dark group relative block h-96 overflow-hidden lg:h-[30rem]"
              >
                {prog.image?.id ? (
                  <SanityImage
                    image={prog.image}
                    width={1200}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    style={{
                      objectPosition: objectPositionFromHotspot(
                        prog.image.hotspot,
                      ),
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-navy" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-[#0d2849]/90 via-[#0d2849]/25 to-transparent" />
                <div className="absolute right-0 bottom-0 left-0 p-6">
                  {prog.level ? (
                    <p className="label mb-2 flex items-center gap-2 text-sm text-white/90">
                      <span
                        aria-hidden
                        className="size-2.5 rounded-full ring-2 ring-white/70"
                        style={{ backgroundColor: accent }}
                      />
                      {prog.level}
                    </p>
                  ) : null}
                  <h3 className="mb-2 text-4xl text-white">{prog.name}</h3>
                  {prog.summary ? (
                    <p className="text-[0.9375rem] leading-relaxed text-white/85">
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
