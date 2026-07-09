import { PageHero } from "@/components/page-hero";

export type PageHeroBlockProps = {
  title?: string;
  subtitle?: string | null;
  overlay?: boolean | null;
  backgroundImage?: { preview?: string | null } | null;
};

export function PageHeroBlock({
  title = "Page",
  subtitle,
  overlay,
  backgroundImage,
}: PageHeroBlockProps) {
  return (
    <PageHero
      title={title}
      subtitle={subtitle ?? undefined}
      overlay={overlay ?? true}
      backgroundImage={backgroundImage?.preview ?? undefined}
    />
  );
}
