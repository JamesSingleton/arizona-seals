import {
  buttonCtaClassName,
  buttonVariants,
} from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { CheckCircle, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { SanityImageProps } from "@/types";
import { SanityImage } from "../elements/sanity-image";

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
};

export type ProgramsListProps = {
  eyebrow?: string | null;
  title?: string | null;
  intro?: string | null;
  programs?: ProgramsListProgram[] | null;
};

export function ProgramsList({
  eyebrow,
  title = "A Group for Every Swimmer",
  intro,
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
              <h2 className="font-display text-3xl font-bold text-navy uppercase md:text-4xl">
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
        const accent = program.accent || "#00AEEF";
        const imageOnRight = index % 2 === 1;
        const bg = index % 2 === 0 ? "bg-[#F4F6F8]" : "bg-background";

        return (
          <section
            key={program._id ?? slug}
            id={slug}
            className={cn("scroll-mt-28 py-16 md:py-20", bg)}
          >
            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
              <div
                className="mb-8 h-1.5 w-24"
                style={{ backgroundColor: accent }}
              />
              <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
                <div
                  className={cn(
                    "relative h-72 overflow-hidden md:h-[420px]",
                    imageOnRight ? "lg:order-2" : "",
                  )}
                >
                  {program.image?.id ? (
                    <SanityImage
                      image={program.image}
                      alt={program.name ?? "Program"}
                      className="absolute inset-0 size-full object-cover"
                    />
                  ) : (
                    <Image
                      src="/placeholder.svg?height=420&width=700"
                      alt={program.name ?? "Program"}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {program.level ? (
                      <span
                        className="rounded px-3 py-1 font-display text-xs font-bold tracking-wide text-white uppercase"
                        style={{ backgroundColor: accent }}
                      >
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
                    <p
                      className="mb-2 font-display text-sm font-bold tracking-[0.2em] uppercase"
                      style={{ color: accent }}
                    >
                      {program.tagline}
                    </p>
                  ) : null}
                  <h3 className="mb-4 font-display text-3xl font-bold text-navy uppercase md:text-4xl">
                    {program.name}
                  </h3>
                  {program.description ? (
                    <p className="mb-8 text-base leading-relaxed text-seal-gray">
                      {program.description}
                    </p>
                  ) : null}

                  {program.expectations?.length ? (
                    <div className="mb-6">
                      <h4 className="mb-3 font-display text-lg font-bold text-navy uppercase">
                        What to Expect
                      </h4>
                      <ul className="space-y-2">
                        {program.expectations.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-seal-gray"
                          >
                            <CheckCircle
                              size={16}
                              className="mt-0.5 shrink-0"
                              style={{ color: accent }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {program.equipment?.length ? (
                    <div className="mb-6">
                      <h4 className="mb-3 font-display text-lg font-bold text-navy uppercase">
                        Required Equipment
                      </h4>
                      <ul className="space-y-2">
                        {program.equipment.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-seal-gray"
                          >
                            <ChevronRight
                              size={16}
                              className="mt-0.5 shrink-0"
                              style={{ color: accent }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {program.requirements?.length ? (
                    <div
                      className="mb-8 border-l-4 bg-muted p-4"
                      style={{ borderColor: accent }}
                    >
                      <h4 className="mb-2 font-display text-sm font-bold text-navy uppercase">
                        Entry Requirements
                      </h4>
                      <ul className="space-y-1">
                        {program.requirements.map((item) => (
                          <li key={item} className="text-sm text-seal-gray">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  <Link
                    href="/contact"
                    className={cn(
                      buttonVariants({ variant: "default", size: "lg" }),
                      buttonCtaClassName,
                    )}
                    style={{ backgroundColor: accent }}
                  >
                    Inquire About This Group
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
