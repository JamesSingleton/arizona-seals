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

export type CtaFullBleedProps = {
  eyebrow?: string;
  titleLines?: string[];
  image?: SanityImageProps | null;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function CtaFullBleed({
  titleLines = ["Master the Basics", "at Arizona Seals"],
  image,
  primaryCta = { label: "Join the Team", href: "/contact" },
  secondaryCta = { label: "Explore Programs", href: "/programs" },
}: CtaFullBleedProps) {
  return (
    <section className="on-dark relative flex min-h-[30rem] items-end overflow-hidden bg-navy md:min-h-[36rem]">
      <div className="contents">
        {image?.id ? (
          <SanityImage
            image={image}
            width={1600}
            sizes="100vw"
            className="absolute inset-0 size-full object-cover"
            style={{
              objectPosition: objectPositionFromHotspot(image.hotspot),
            }}
          />
        ) : null}
        <div className="absolute inset-0 bg-linear-to-tr from-[#061428]/92 via-[#061428]/45 to-[#061428]/10" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 pb-14 sm:px-10 md:pb-20 lg:px-16">
          <h2 className="section-title mb-8 max-w-3xl text-white">
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
              {...trackClick("marketing_cta_clicked", {
                cta_label: primaryCta.label,
                cta_href: primaryCta.href,
                cta_variant: "default",
                placement: "cta_full_bleed_primary",
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
                placement: "cta_full_bleed_secondary",
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
      </div>
    </section>
  );
}
