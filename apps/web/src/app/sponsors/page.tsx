import {
  buttonCtaClassName,
  buttonVariants,
} from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { Star } from "lucide-react";
import Image from "next/image";

import {
  currentSponsors,
  sponsorBenefits,
  sponsorEmail,
  sponsorTiers,
} from "@/content/sponsors";

function StarIcon({ className }: { className?: string }) {
  return <Star className={className} fill="currentColor" strokeWidth={0} />;
}

export default function SponsorsPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-navy pt-32 pb-16">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center sm:px-10 lg:px-16">
          <div className="mb-6 flex items-center justify-center gap-4">
            <StarIcon className="size-6 text-cyan-brand" />
            <StarIcon className="size-4 text-cyan-brand/60" />
          </div>
          <h1
            className="mb-6 font-display leading-none font-black text-balance text-white uppercase"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
          >
            Sponsor the Team
          </h1>
          <div className="mb-6 flex items-center justify-center gap-4">
            <StarIcon className="size-4 text-cyan-brand/60" />
            <StarIcon className="size-6 text-cyan-brand" />
          </div>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            Arizona Seals Swimming is home to 200+ competitive athletes across
            Maricopa, AZ. Our sponsors make it possible to deliver world-class
            coaching, equipment, and opportunities to every swimmer — from our
            youngest Rising Group kids to our elite Blue Group competitors.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            Partnering with Arizona Seals connects your brand with hundreds of
            families across the greater Phoenix metro, year-round visibility at
            competitions, and a community that genuinely values your support.
          </p>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="mb-3 font-display text-sm font-bold tracking-[0.2em] text-cyan-brand uppercase">
                Sponsorship
              </p>
              <h2
                className="mb-6 font-display leading-none font-black text-balance text-foreground uppercase"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
              >
                Supporting 200+ Athletes & Their Families
              </h2>
              <p className="mb-4 leading-relaxed text-seal-gray">
                Your sponsorship goes directly toward keeping program fees
                accessible, funding championship travel, and providing the
                equipment our athletes need to compete at the highest levels.
                Every dollar invested in Arizona Seals invests in the youth and
                families of the Maricopa community.
              </p>
              <p className="mb-6 leading-relaxed text-seal-gray">
                Becoming a sponsor is simple — choose a tier that fits your
                goals, or reach out to us directly to build a custom package. We
                also offer add-on options like meet naming rights, team event
                sponsorships, and athlete spotlights.
              </p>
              <a
                href={`mailto:${sponsorEmail}`}
                className={cn(
                  buttonVariants({ variant: "outlineStrong", size: "xl" }),
                  buttonCtaClassName,
                )}
              >
                Contact Us About Sponsorship
              </a>
            </div>
            <div className="relative h-80 overflow-hidden rounded-2xl shadow-xl lg:h-[420px]">
              <Image
                src="/placeholder.svg?height=420&width=700"
                alt="Arizona Seals swimmers at competition"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            <div className="relative order-2 h-80 overflow-hidden rounded-2xl shadow-xl lg:order-1 lg:h-[420px]">
              <Image
                src="/placeholder.svg?height=420&width=700"
                alt="Swimmers warming up at the pool"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2
                className="mb-8 font-display leading-none font-black text-balance text-foreground uppercase"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" }}
              >
                As a Sponsor You Will:
              </h2>
              <ul className="flex flex-col gap-4">
                {sponsorBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <StarIcon className="mt-0.5 size-4 shrink-0 text-cyan-brand" />
                    <span className="text-sm leading-relaxed text-seal-gray">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <StarIcon className="size-7 text-cyan-brand" />
              </div>
              <h2
                className="mb-5 font-display leading-none font-black text-balance text-foreground uppercase"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
              >
                Ready to Become a Sponsor?
              </h2>
              <p className="mb-8 leading-relaxed text-seal-gray">
                Choose a sponsorship level below or reach out directly to
                discuss a custom partnership. We would love to have you join the
                Arizona Seals family.
              </p>
              <a
                href={`mailto:${sponsorEmail}`}
                className={cn(
                  buttonVariants({ variant: "outlineStrong", size: "xl" }),
                  buttonCtaClassName,
                )}
              >
                Sponsor the Team
              </a>
            </div>
            <div className="relative h-72 overflow-hidden rounded-2xl shadow-xl lg:h-[360px]">
              <Image
                src="/placeholder.svg?height=360&width=700"
                alt="Young swimmers on pool edge"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-24">
        <div className="mx-auto mb-14 max-w-7xl px-6 sm:px-10 lg:px-16">
          <h2
            className="text-center font-display leading-none font-black text-transparent uppercase select-none"
            style={{
              fontSize: "clamp(2rem, 6vw, 5rem)",
              WebkitTextStroke: "2px rgba(255,255,255,0.25)",
            }}
          >
            Annual Sponsorship Levels
          </h2>
        </div>

        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sponsorTiers.map((tier) => (
              <div
                key={tier.name}
                className="flex flex-col rounded-2xl border border-white/15 bg-white/5 p-7 transition-colors hover:bg-white/10"
              >
                <div className="mb-1 flex items-start justify-between">
                  <h3 className="font-display text-xl font-bold text-white uppercase">
                    {tier.name}
                  </h3>
                  <span className="font-display text-xl leading-none font-black text-cyan-brand">
                    {tier.price}
                  </span>
                </div>
                <p className="mb-5 text-xs font-medium tracking-wider text-white/70 uppercase">
                  {tier.availability}
                </p>
                <ul className="flex flex-1 flex-col gap-3">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5">
                      <StarIcon className="mt-0.5 size-3.5 shrink-0 text-cyan-brand" />
                      <span className="text-sm leading-relaxed text-white/70">
                        {perk}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:${sponsorEmail}`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "default" }),
                    buttonCtaClassName,
                    "mt-7 w-full border-cyan-brand/50 text-cyan-brand hover:border-cyan-brand hover:bg-cyan-brand hover:text-primary-foreground",
                  )}
                >
                  Choose {tier.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-16">
          <div className="mb-12 text-center">
            <p className="mb-2 font-display text-sm font-bold tracking-[0.2em] text-cyan-brand uppercase">
              Thank You
            </p>
            <h2 className="font-display text-3xl font-bold text-balance text-foreground uppercase md:text-4xl">
              Our Sponsors &amp; Partners
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {currentSponsors.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-4 opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                aria-label={s.name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.logo}
                  alt={s.name}
                  className="h-10 w-auto object-contain"
                />
              </a>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-seal-gray">
            Interested in joining this list?{" "}
            <a
              href={`mailto:${sponsorEmail}`}
              className="font-semibold text-cyan-brand transition-colors hover:text-foreground"
            >
              Reach out to become a sponsor.
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
