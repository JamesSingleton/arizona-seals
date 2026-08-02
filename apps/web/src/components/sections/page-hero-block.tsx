import { PageHero } from "@/components/page-hero";
import type { SanityImageProps } from "@/types";

export type PageHeroBlockProps = {
  title?: string;
  subtitle?: string | null;
  overlay?: boolean | null;
  size?: "default" | "tall" | null;
  backgroundImage?: SanityImageProps | null;
};

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
      image={backgroundImage}
    />
  );
}
