import {
  buttonCtaClassName,
  buttonVariants,
} from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";

import type { SanityImageProps } from "@/types";
import {
  objectPositionFromHotspot,
  SanityImage,
} from "../elements/sanity-image";

/** Original homepage hero image (Sanity CDN asset used before CMS page-builder wiring). */
const DEFAULT_HERO_ASSET_ID =
  "image-4853ac4449a8f1d89aa4d48bb5bc8338b243be1d-6000x4000-avif";

/** Fallback focal point when CMS hotspot is missing — subject sits upper-right. */
const DEFAULT_HOTSPOT = { x: 0.72, y: 0.42 };

export type HeroFullBleedProps = {
  eyebrow?: string;
  titleLines?: string[];
  accentWord?: string;
  /** @deprecated Prefer sanityImage — kept for call-site compatibility */
  image?: string;
  /** Sanity CMS image object — preferred when editors upload a hero image */
  sanityImage?: SanityImageProps | null;
  imageAlt?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

function resolveHeroImage(
  sanityImage: SanityImageProps | null | undefined,
  imageAlt: string,
): NonNullable<SanityImageProps> {
  if (sanityImage?.id) {
    return {
      ...sanityImage,
      hotspot: sanityImage.hotspot ?? DEFAULT_HOTSPOT,
    };
  }

  return {
    id: DEFAULT_HERO_ASSET_ID,
    alt: imageAlt,
    hotspot: DEFAULT_HOTSPOT,
    crop: null,
    preview: null,
    dominantColor: null,
  };
}

export function HeroFullBleed({
  eyebrow = "For the Team",
  titleLines = ["Arizona", "Seals"],
  accentWord = "Swimming",
  sanityImage,
  imageAlt = "Arizona Seals swimmers racing in the pool",
  primaryCta = { label: "Join the Team", href: "/contact" },
  secondaryCta = { label: "Our Programs", href: "/programs" },
}: HeroFullBleedProps) {
  const image = resolveHeroImage(sanityImage, imageAlt);

  return (
    <section className="relative flex h-screen max-h-225 min-h-150 flex-col justify-end overflow-hidden">
      <SanityImage
        image={image}
        width={2400}
        sizes="100vw"
        loading="eager"
        className="absolute inset-0 size-full object-cover"
        style={{
          objectPosition: objectPositionFromHotspot(
            image.hotspot,
            `${DEFAULT_HOTSPOT.x * 100}% ${DEFAULT_HOTSPOT.y * 100}%`,
          ),
        }}
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
