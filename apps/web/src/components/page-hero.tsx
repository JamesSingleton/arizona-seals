import type { ReactNode } from "react";

import type { SanityImageProps } from "@/types";
import {
  objectPositionFromHotspot,
  SanityImage,
} from "./elements/sanity-image";

export type PageHeroProps = {
  title: string;
  subtitle?: string;
  /** Sanity image bag from `imageFields`. When omitted, solid navy background. */
  image?: SanityImageProps | null;
  overlay?: boolean;
  /** default = h-64 md:h-80; tall = h-72 md:h-96 */
  size?: "default" | "tall";
  /** Optional content above the title (e.g. category badge). */
  beforeTitle?: ReactNode;
  loading?: "eager" | "lazy";
};

export function PageHero({
  title,
  subtitle,
  image,
  overlay = true,
  size = "default",
  beforeTitle,
  loading = "eager",
}: PageHeroProps) {
  const hasImage = Boolean(image?.id);
  const tall = size === "tall";

  return (
    <section
      data-hero
      className={`on-dark relative flex items-end overflow-hidden bg-navy ${tall ? "min-h-[30rem] md:min-h-[36rem]" : "min-h-[24rem] md:min-h-[28rem]"}`}
    >
      {hasImage ? (
        <>
          <SanityImage
            image={image}
            width={2400}
            sizes="100vw"
            loading={loading}
            className="absolute inset-0 size-full object-cover"
            style={{
              objectPosition: objectPositionFromHotspot(image?.hotspot),
            }}
          />
          {overlay ? (
            <div className="absolute inset-0 bg-linear-to-t from-[#061428]/92 via-[#061428]/45 to-[#061428]/25" />
          ) : null}
        </>
      ) : null}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-36 pb-12 sm:px-10 md:pb-16 lg:px-16">
        {beforeTitle}
        <h1
          className="display text-white"
          style={{ fontSize: "clamp(3.25rem, 9vw, 7.5rem)" }}
        >
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
            {subtitle}
          </p>
        ) : null}
      </div>
      {/* Sun stripe: the same accent that marks every primary action. */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-1.5 bg-pool" />
    </section>
  );
}
