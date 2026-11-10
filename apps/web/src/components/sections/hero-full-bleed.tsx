import { trackClick } from "@workspace/analytics";
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
  /** Short supporting line under the title. */
  subtitle?: string;
  /** Up to four proof points shown in a strip along the bottom of the hero. */
  stats?: { _key?: string; number?: string | null; label?: string | null }[];
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
  subtitle,
  stats,
  primaryCta = { label: "Join the Team", href: "/contact" },
  secondaryCta = { label: "Our Programs", href: "/programs" },
}: HeroFullBleedProps) {
  const image = resolveHeroImage(sanityImage, imageAlt);
  const proof = stats?.filter((s) => s?.number && s?.label).slice(0, 4) ?? [];

  return (
    <section className="relative flex min-h-[max(100svh,37.5rem)] flex-col justify-end overflow-hidden lg:min-h-150 lg:h-screen lg:max-h-240">
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

      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/45 to-black/25" />

      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 sm:px-10 lg:px-16",
          proof.length ? "pb-10 md:pb-14" : "pb-16 md:pb-24",
        )}
      >
        <p className="mb-3 font-display text-xs font-bold tracking-[0.3em] text-[#5ec9f2] uppercase drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)] sm:text-sm">
          {eyebrow}
        </p>

        <h1
          className="mb-6 font-display font-black leading-[0.9] text-balance text-white uppercase drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]"
          style={{ fontSize: "clamp(3rem, 9.5vw, 7.5rem)" }}
        >
          {titleLines.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
          <span className="text-[#5ec9f2]">{accentWord}</span>
        </h1>

        {subtitle ? (
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)] md:text-xl">
            {subtitle}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href={primaryCta.href}
            {...trackClick("marketing_cta_clicked", {
              cta_label: primaryCta.label,
              cta_href: primaryCta.href,
              cta_variant: "default",
              placement: "hero_primary",
            })}
            className={cn(
              buttonVariants({ variant: "default", size: "xl" }),
              buttonCtaClassName,
            )}
          >
            {primaryCta.label}
          </Link>
          <Link
            href={secondaryCta.href}
            {...trackClick("marketing_cta_clicked", {
              cta_label: secondaryCta.label,
              cta_href: secondaryCta.href,
              cta_variant: "outlineInverse",
              placement: "hero_secondary",
            })}
            className={cn(
              buttonVariants({ variant: "outlineInverse", size: "xl" }),
              buttonCtaClassName,
            )}
          >
            {secondaryCta.label}
          </Link>
        </div>
      </div>

      {proof.length ? (
        <div className="relative z-10 border-t border-white/20 bg-black/35 backdrop-blur-sm">
          <dl
            className={cn(
              "mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-5 px-6 py-6 sm:px-10 lg:px-16",
              proof.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
            )}
          >
            {proof.map((stat) => (
              <div
                key={stat._key ?? `${stat.number}-${stat.label}`}
                className="flex flex-col-reverse gap-1 lg:flex-row lg:items-center lg:gap-4"
              >
                <dt className="font-display text-xs leading-snug font-bold tracking-[0.15em] text-white/80 uppercase lg:order-2 lg:max-w-40">
                  {stat.label}
                </dt>
                <dd className="font-display text-4xl leading-none font-black text-white tabular-nums lg:text-5xl">
                  {stat.number}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </section>
  );
}
