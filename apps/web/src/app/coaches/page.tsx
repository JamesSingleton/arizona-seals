import {
  buttonCtaClassName,
  buttonVariants,
} from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { Award, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/page-hero";
import { assistantCoaches, headCoaches } from "@/content/coaches";

export default function CoachesPage() {
  return (
    <main>
      <PageHero
        title="Coaching Staff"
        subtitle="World-class coaches dedicated to your development"
        backgroundImage="/placeholder.svg?height=480&width=1600"
      />

      <section className="bg-background py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 font-display text-sm font-bold tracking-[0.2em] text-cyan-brand uppercase">
            Our Coaching Philosophy
          </p>
          <h2 className="mb-5 font-display text-3xl font-bold text-balance text-foreground uppercase md:text-4xl">
            More Than Stroke Technique
          </h2>
          <p className="text-base leading-relaxed text-seal-gray md:text-lg">
            Our coaches bring decades of competitive and collegiate experience.
            We believe coaching is a relationship — built on trust,
            communication, and a shared commitment to growth. Every coach at
            Arizona Seals is USA Swimming certified, background-checked, and
            dedicated to the safety and development of each athlete.
          </p>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="mb-2 font-display text-sm font-bold tracking-[0.2em] text-cyan-brand uppercase">
              Leadership
            </p>
            <h2 className="font-display text-4xl font-bold text-foreground uppercase">
              Head Coaches
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {headCoaches.map((coach) => (
              <div
                key={coach.name}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
              >
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={coach.photo}
                    alt={coach.name}
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                  <div className="absolute right-0 bottom-0 left-0 p-5">
                    <p className="mb-0.5 text-xs font-bold tracking-widest text-cyan-brand uppercase">
                      {coach.title}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-white uppercase">
                      {coach.name}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col gap-4 p-6">
                  <p className="text-sm leading-relaxed text-seal-gray">
                    {coach.bio}
                  </p>

                  <div>
                    <p className="mb-2 text-xs font-bold tracking-wide text-foreground uppercase">
                      Specialties
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {coach.specialties.map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-bold tracking-wide text-foreground uppercase">
                      Certifications
                    </p>
                    <div className="flex flex-col gap-1">
                      {coach.certifications.map((c) => (
                        <div key={c} className="flex items-center gap-2">
                          <Award
                            size={12}
                            className="shrink-0 text-cyan-brand"
                          />
                          <span className="text-xs text-seal-gray">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href={`mailto:${coach.email}`}
                    className="flex items-center gap-2 text-sm font-medium text-cyan-brand transition-colors hover:text-foreground"
                  >
                    <Mail size={14} />
                    {coach.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="mb-2 font-display text-sm font-bold tracking-[0.2em] text-cyan-brand uppercase">
              The Full Staff
            </p>
            <h2 className="font-display text-4xl font-bold text-foreground uppercase">
              Assistant Coaches
            </h2>
          </div>

          <div className="flex flex-col divide-y divide-border">
            {assistantCoaches.map((coach) => (
              <div
                key={coach.name}
                className="flex flex-col items-start gap-5 py-8 first:pt-0 sm:flex-row sm:gap-6"
              >
                <div className="relative size-24 shrink-0 self-center overflow-hidden rounded-full border-2 border-cyan-brand/20 sm:self-start">
                  <Image
                    src={coach.photo}
                    alt={coach.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-baseline gap-x-2">
                    <h3 className="font-display text-lg leading-tight font-bold text-foreground uppercase">
                      {coach.name}
                    </h3>
                    <span className="text-sm font-medium text-seal-gray">
                      — {coach.title}
                    </span>
                  </div>
                  <p className="mb-3 text-sm leading-relaxed text-seal-gray">
                    {coach.bio}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    {coach.certifications.map((c) => (
                      <div key={c} className="flex items-center gap-1.5">
                        <Award size={11} className="shrink-0 text-cyan-brand" />
                        <span className="text-xs text-seal-gray">{c}</span>
                      </div>
                    ))}
                    <a
                      href={`mailto:${coach.email}`}
                      className="flex items-center gap-1.5 text-xs font-medium text-cyan-brand transition-colors hover:text-foreground"
                    >
                      <Mail size={11} />
                      {coach.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-white uppercase md:text-4xl">
            Interested in Coaching With Us?
          </h2>
          <p className="mb-8 leading-relaxed text-white/70">
            We are always looking for passionate, certified coaches to join our
            team. If you share our commitment to athlete development and
            excellence, we want to hear from you.
          </p>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "default", size: "xl" }),
              buttonCtaClassName,
            )}
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
