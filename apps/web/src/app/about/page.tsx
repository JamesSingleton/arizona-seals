import {
  buttonCtaClassName,
  buttonVariants,
} from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { Heart, Star, Trophy, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/page-hero";
import { Timeline } from "@/components/sections/timeline";
import { mission, values } from "@/content/about";
import { aboutStats } from "@/content/stats";

const iconMap = {
  trophy: Trophy,
  users: Users,
  star: Star,
  heart: Heart,
} as const;

export default function AboutPage() {
  return (
    <main>
      <PageHero
        title="About Arizona Seals"
        subtitle="Building champions since 2005"
        backgroundImage="/placeholder.svg?height=480&width=1600"
      />

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-3 font-display text-sm font-bold tracking-[0.2em] text-cyan-brand uppercase">
                {mission.eyebrow}
              </p>
              <h2 className="mb-6 font-display text-4xl font-bold text-balance text-foreground uppercase md:text-5xl">
                {mission.title}
              </h2>
              {mission.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="mb-4 leading-relaxed text-seal-gray last:mb-8"
                >
                  {p}
                </p>
              ))}
              <div className="grid grid-cols-2 gap-4">
                {aboutStats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-lg border border-border bg-muted p-5 text-center"
                  >
                    <p className="font-display text-3xl font-bold text-cyan-brand">
                      {s.number}
                    </p>
                    <p className="mt-1 text-sm tracking-wide text-seal-gray uppercase">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[500px] overflow-hidden rounded-2xl">
              <Image
                src={mission.image}
                alt="Arizona Seals team"
                fill
                className="object-cover"
              />
              <div className="absolute right-0 bottom-0 left-0 bg-navy/80 p-6">
                <p className="font-display text-xl font-bold text-white uppercase">
                  &quot;{mission.quote}&quot;
                </p>
                <p className="mt-1 text-sm font-medium text-cyan-brand">
                  {mission.quoteAttribution}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-2 font-display text-sm font-bold tracking-[0.2em] text-cyan-brand uppercase">
              What Drives Us
            </p>
            <h2 className="font-display text-4xl font-bold text-balance text-white uppercase md:text-5xl">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => {
              const Icon = iconMap[v.icon];
              return (
                <div
                  key={v.title}
                  className="rounded-xl border border-white/10 bg-white/5 p-7 transition-colors hover:bg-white/10"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-brand/20">
                    <Icon size={22} className="text-cyan-brand" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-bold text-white uppercase">
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/80">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Timeline />

      <section className="bg-cyan-brand py-16 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-balance text-primary-foreground uppercase md:text-4xl">
            Be Part of Our Story
          </h2>
          <p className="mb-8 text-base leading-relaxed text-primary-foreground/90">
            Join the Arizona Seals family and write your own chapter of
            excellence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "secondary", size: "xl" }),
                buttonCtaClassName,
                "bg-background text-foreground hover:bg-background/90",
              )}
            >
              Schedule a Tryout
            </Link>
            <Link
              href="/coaches"
              className={cn(
                buttonVariants({ variant: "outlineInverse", size: "xl" }),
                buttonCtaClassName,
              )}
            >
              Meet Our Coaches
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
