import {
  buttonCtaClassName,
  buttonVariants,
} from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";

import type { SanityImageProps } from "@/types";
import { SanityImage } from "../elements/sanity-image";

export type CtaFullBleedProps = {
  eyebrow?: string;
  titleLines?: string[];
  image?: SanityImageProps | null;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function CtaFullBleed({
  eyebrow = "Get Started",
  titleLines = ["Master the Basics", "at Arizona Seals"],
  image,
  primaryCta = { label: "Join the Team", href: "/contact" },
  secondaryCta = { label: "Explore Programs", href: "/programs" },
}: CtaFullBleedProps) {
  const imageAlt =
    typeof image?.alt === "string" && image.alt
      ? image.alt
      : "Arizona Seals team at the pool";

  return (
    <section className="relative flex h-[480px] items-end overflow-hidden bg-navy md:h-[560px]">
      {image?.id ? (
        <SanityImage
          image={image}
          alt={imageAlt}
          className="absolute inset-0 size-full object-cover object-center"
        />
      ) : null}
      <div className="absolute inset-0 bg-linear-to-t from-navy/90 via-navy/40 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 sm:px-10 md:pb-24 lg:px-16">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-0.5 w-8 bg-cyan-on-navy" />
          <span className="font-display text-xs font-bold tracking-[0.25em] text-cyan-on-navy uppercase">
            {eyebrow}
          </span>
        </div>
        <h2
          className="mb-8 font-display font-black leading-none text-balance text-white uppercase"
          style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)" }}
        >
          {titleLines.map((line, i) => (
            <span key={line}>
              {line}
              {i < titleLines.length - 1 && <br />}
            </span>
          ))}
        </h2>
        <div className="flex flex-wrap gap-4">
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
