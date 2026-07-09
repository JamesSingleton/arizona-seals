import {
  buttonCtaClassName,
  buttonVariants,
} from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/lib/sanity/client";

const DEFAULT_HERO_IMAGE = urlFor({
  _id: "image-4853ac4449a8f1d89aa4d48bb5bc8338b243be1d-6000x4000-avif",
})
  .width(2400)
  .quality(80)
  .url();

export type HeroFullBleedProps = {
  eyebrow?: string;
  titleLines?: string[];
  accentWord?: string;
  image?: string;
  imageAlt?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function HeroFullBleed({
  eyebrow = "For the Team",
  titleLines = ["Arizona", "Seals"],
  accentWord = "Swimming",
  image = DEFAULT_HERO_IMAGE,
  imageAlt = "Arizona Seals swimmers racing in the pool",
  primaryCta = { label: "Join the Team", href: "/contact" },
  secondaryCta = { label: "Our Programs", href: "/programs" },
}: HeroFullBleedProps) {
  return (
    <section className="relative flex h-screen min-h-[600px] max-h-[900px] flex-col justify-end overflow-hidden">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/20" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 sm:px-10 md:pb-24 lg:px-16">
        <p className="mb-3 font-display text-xs font-bold tracking-[0.3em] text-[#5ec9f2] uppercase drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)] sm:text-sm">
          {eyebrow}
        </p>

        <h1
          className="mb-6 font-display font-black leading-[0.9] text-balance text-white uppercase drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]"
          style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
        >
          {titleLines.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
          <span className="text-[#5ec9f2]">{accentWord}</span>
        </h1>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href={primaryCta.href}
            className={cn(
              buttonVariants({ variant: "default", size: "xl" }),
              buttonCtaClassName,
            )}
          >
            {primaryCta.label}
          </Link>
          <Link
            href={secondaryCta.href}
            className={cn(
              buttonVariants({ variant: "outlineInverse", size: "xl" }),
              buttonCtaClassName,
            )}
          >
            {secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
