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
      {(title || intro) && (
        <section className="bg-background py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
            {title ? (
              <h2 className="section-title text-foreground">{title}</h2>
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
                    "relative h-80 overflow-hidden md:h-[32rem] lg:sticky lg:top-28",
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
                  <div className="absolute top-0 left-0 flex flex-wrap">
                    {program.level ? (
                      <span className="label bg-navy px-3 py-1.5 text-sm text-white">
                        {program.level}
                      </span>
                    ) : null}
                    {program.sessions ? (
                      <span className="label bg-navy px-3 py-1.5 text-sm text-white">
                        {program.sessions}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className={imageOnRight ? "lg:order-1" : ""}>
                  <h3 className="mb-4 text-5xl text-foreground md:text-6xl">
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
                        <h4 className="label mb-3 text-base text-foreground">
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
                        <h4 className="label mb-3 text-base text-foreground">
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
                        <h4 className="label mb-3 text-base text-foreground">
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
                      placement="programs_list"
                      buttons={program.buttons}
                      size="lg"
                      className="gap-3"
                      buttonClassName=""
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
