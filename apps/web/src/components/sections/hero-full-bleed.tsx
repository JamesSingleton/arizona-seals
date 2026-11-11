import { trackClick } from "@workspace/analytics";
import { buttonVariants } from "@workspace/ui/components/button";
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
    <section className="bg-background">
      <div
        data-hero
        className="on-dark relative flex min-h-[max(92svh,40rem)] flex-col justify-end overflow-hidden lg:max-h-[60rem]"
      >
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
        <div className="absolute inset-0 bg-linear-to-t from-[#061428]/92 via-[#061428]/35 to-[#061428]/20" />

        <div
          className={cn(
            "relative z-10 mx-auto w-full max-w-7xl px-6 pt-36 sm:px-10 lg:px-16",
            proof.length ? "pb-28 md:pb-36" : "pb-16 md:pb-24",
          )}
        >
          <h1
            className="display text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.35)]"
            style={{ fontSize: "clamp(4rem, 12.5vw, 11rem)" }}
          >
            {titleLines.join(" ")}{" "}
            <span className="text-cyan-on-navy">{accentWord}</span>
          </h1>

          {subtitle ? (
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
              {subtitle}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={primaryCta.href}
              {...trackClick("marketing_cta_clicked", {
                cta_label: primaryCta.label,
                cta_href: primaryCta.href,
                cta_variant: "default",
                placement: "hero_primary",
              })}
              className={buttonVariants({ variant: "default", size: "xl" })}
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
              className={buttonVariants({
                variant: "outlineInverse",
                size: "xl",
              })}
            >
              {secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>

      {proof.length ? (
        // The scoreboard: a slanted navy bar that overlaps the photo.
        <div className="relative z-10 mx-auto -mt-16 max-w-7xl px-4 sm:px-8 md:-mt-20 lg:px-14">
          <dl
            className={cn(
              "on-dark grid grid-cols-2 bg-navy px-3 text-white sm:px-8 lg:slant-lg",
              proof.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
            )}
          >
            {proof.map((stat, index) => (
              <div
                key={stat._key ?? `${stat.number}-${stat.label}`}
                className={cn(
                  "flex flex-col-reverse gap-2 px-4 py-6 md:px-7 md:py-8",
                  index % 2 === 1 && "border-l-2 border-white/15",
                  index >= 2 && "border-t-2 border-white/15 lg:border-t-0",
                  index === 2 && "lg:border-l-2",
                )}
              >
                <dt className="label text-sm text-white/85 md:text-[0.9375rem]">
                  {stat.label}
                </dt>
                <dd className="display text-5xl text-white tabular-nums md:text-6xl">
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
