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
  const heightClass = size === "tall" ? "h-72 md:h-96" : "h-64 md:h-80";
  const hasImage = Boolean(image?.id);

  return (
    <section
      className={`relative flex items-end overflow-hidden ${heightClass} ${hasImage ? "" : "bg-navy"}`}
    >
      {hasImage ? (
        <SanityImage
          image={image}
          width={1600}
          sizes="100vw"
          loading={loading}
          className="absolute inset-0 size-full object-cover"
          style={{
            objectPosition: objectPositionFromHotspot(image?.hotspot),
          }}
        />
      ) : null}
      {overlay && hasImage ? (
        <div className="absolute inset-0 bg-navy/70" />
      ) : null}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="border-l-4 border-cyan-brand pl-5">
          {beforeTitle}
          <h1 className="font-display text-balance text-4xl font-bold tracking-wide text-white uppercase md:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-2 font-sans text-base leading-relaxed text-white/80 md:text-lg">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
