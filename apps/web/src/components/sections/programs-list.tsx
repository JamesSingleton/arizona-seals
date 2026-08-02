import { cn } from "@workspace/ui/lib/utils";
import { Award, ChevronRight, ClipboardCheck } from "lucide-react";

import type { SanityButtonProps, SanityImageProps } from "@/types";
import { SanityButtons } from "../elements/sanity-buttons";
import {
  objectPositionFromHotspot,
  SanityImage,
} from "../elements/sanity-image";

export type ProgramsListProgram = {
  _id?: string;
  id?: string | null;
  name?: string | null;
  tagline?: string | null;
  level?: string | null;
  accent?: string | null;
  description?: string | null;
  expectations?: string[] | null;
  requirements?: string[] | null;
  equipment?: string[] | null;
  sessions?: string | null;
  image?: SanityImageProps | null;
  buttons?: SanityButtonProps[] | null;
};

export type ProgramsListProps = {
  eyebrow?: string | null;
  title?: string | null;
  intro?: string | null;
  requirementsLabel?: string | null;
  equipmentLabel?: string | null;
  expectationsLabel?: string | null;
  programs?: ProgramsListProgram[] | null;
};

export function ProgramsList({
  eyebrow,
  title,
  intro,
  requirementsLabel,
  equipmentLabel,
  expectationsLabel,
  programs,
}: ProgramsListProps) {
  if (!programs?.length) return null;

  return (
    <>
      {(title || intro || eyebrow) && (
        <section className="bg-background py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
            {eyebrow ? (
              <p className="mb-3 font-display text-sm font-bold tracking-[0.2em] text-cyan-brand uppercase">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="font-display text-3xl font-bold text-foreground uppercase md:text-4xl">
                {title}
              </h2>
            ) : null}
            {intro ? (
              <p className="mt-4 text-base leading-relaxed text-seal-gray">
                {intro}
              </p>
            ) : null}
          </div>
        </section>
      )}

      {programs.map((program, index) => {
        const slug = program.id;
        if (!slug) return null;
        const accent = program.accent || undefined;
        const imageOnRight = index % 2 === 1;
        const bg = index % 2 === 0 ? "bg-muted" : "bg-background";

        return (
          <section
            key={program._id ?? slug}
            id={slug}
            className={cn("scroll-mt-28 py-16 md:py-20", bg)}
          >
            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
              <div
                className={cn("mb-8 h-1.5 w-24", !accent && "bg-cyan-brand")}
                style={accent ? { backgroundColor: accent } : undefined}
              />
              <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
                <div
                  className={cn(
                    "relative h-72 overflow-hidden md:h-[420px] lg:sticky lg:top-28",
                    imageOnRight ? "lg:order-2" : "",
                  )}
                >
                  {program.image?.id ? (
                    <SanityImage
                      image={program.image}
                      width={1200}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="absolute inset-0 size-full object-cover"
                      style={{
                        objectPosition: objectPositionFromHotspot(
                          program.image.hotspot,
                        ),
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-muted" />
                  )}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {program.level ? (
                      <span className="rounded bg-navy px-3 py-1 font-display text-xs font-bold tracking-wide text-white uppercase">
                        {program.level}
                      </span>
                    ) : null}
                    {program.sessions ? (
                      <span className="rounded bg-navy/90 px-3 py-1 font-display text-xs font-bold tracking-wide text-white uppercase">
                        {program.sessions}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className={imageOnRight ? "lg:order-1" : ""}>
                  {program.tagline ? (
                    <p className="mb-2 font-display text-sm font-bold tracking-[0.2em] text-cyan-brand uppercase">
                      {program.tagline}
                    </p>
                  ) : null}
                  <h3 className="mb-4 font-display text-3xl font-bold text-foreground uppercase md:text-4xl">
                    {program.name}
                  </h3>
                  {program.description ? (
                    <p className="mb-8 text-base leading-relaxed text-seal-gray">
                      {program.description}
                    </p>
                  ) : null}

                  {program.requirements?.length ? (
                    <div className="mb-6">
                      {requirementsLabel ? (
                        <h4 className="mb-3 font-display text-lg font-bold text-foreground uppercase">
                          {requirementsLabel}
                        </h4>
                      ) : null}
                      <ul className="space-y-2">
                        {program.requirements.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-seal-gray"
                          >
                            <ClipboardCheck
                              size={16}
                              className="mt-0.5 shrink-0 text-cyan-brand"
                              aria-hidden
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {program.equipment?.length ? (
                    <div className="mb-6">
                      {equipmentLabel ? (
                        <h4 className="mb-3 font-display text-lg font-bold text-foreground uppercase">
                          {equipmentLabel}
                        </h4>
                      ) : null}
                      <ul className="space-y-2">
                        {program.equipment.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-seal-gray"
                          >
                            <ChevronRight
                              size={16}
                              className="mt-0.5 shrink-0 text-cyan-brand"
                              aria-hidden
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {program.expectations?.length ? (
                    <div className="mb-8">
                      {expectationsLabel ? (
                        <h4 className="mb-3 font-display text-lg font-bold text-foreground uppercase">
                          {expectationsLabel}
                        </h4>
                      ) : null}
                      <ul className="space-y-2">
                        {program.expectations.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-seal-gray"
                          >
                            <Award
                              size={16}
                              className="mt-0.5 shrink-0 text-cyan-brand"
                              aria-hidden
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {program.buttons?.length ? (
                    <SanityButtons
                      buttons={program.buttons}
                      size="lg"
                      className="gap-3"
                      buttonClassName="font-display font-bold tracking-widest uppercase"
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
