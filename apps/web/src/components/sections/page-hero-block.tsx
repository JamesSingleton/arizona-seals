import { urlFor } from "@workspace/sanity/client";

import { PageHero } from "@/components/page-hero";
import type { SanityImageProps } from "@/types";

export type PageHeroBlockProps = {
  title?: string;
  subtitle?: string | null;
  overlay?: boolean | null;
  size?: "default" | "tall" | null;
  backgroundImage?: SanityImageProps | null;
};

function resolveBackgroundUrl(
  backgroundImage?: PageHeroBlockProps["backgroundImage"],
): string | undefined {
  if (!backgroundImage?.id) {
    return undefined;
  }

  return urlFor({
    _id: backgroundImage.id,
    ...(backgroundImage.crop ? { crop: backgroundImage.crop } : {}),
    ...(backgroundImage.hotspot ? { hotspot: backgroundImage.hotspot } : {}),
  })
    .width(1600)
    .quality(80)
    .url();
}

export function PageHeroBlock({
  title = "Page",
  subtitle,
  overlay,
  size,
  backgroundImage,
}: PageHeroBlockProps) {
  return (
    <PageHero
      title={title}
      subtitle={subtitle ?? undefined}
      overlay={overlay ?? true}
      size={size ?? "default"}
      backgroundImage={resolveBackgroundUrl(backgroundImage)}
      hotspot={backgroundImage?.hotspot}
    />
  );
}
