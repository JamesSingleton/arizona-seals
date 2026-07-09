import { urlFor } from "@workspace/sanity/client";

import { PageHero } from "@/components/page-hero";

export type PageHeroBlockProps = {
  title?: string;
  subtitle?: string | null;
  overlay?: boolean | null;
  size?: "default" | "tall" | null;
  backgroundImage?: {
    id?: string | null;
    preview?: string | null;
    alt?: string | null;
  } | null;
};

function resolveBackgroundUrl(
  backgroundImage?: PageHeroBlockProps["backgroundImage"],
): string | undefined {
  if (backgroundImage?.id) {
    return urlFor({ _id: backgroundImage.id }).width(1600).quality(80).url();
  }
  return undefined;
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
    />
  );
}
