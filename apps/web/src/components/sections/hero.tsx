import { Badge } from "@workspace/ui/components/badge";

import type { PagebuilderType, SanityImageProps } from "@/types";
import { RichText } from "../elements/rich-text";
import { SanityButtons } from "../elements/sanity-buttons";
import { SanityImage } from "../elements/sanity-image";
import { HeroFullBleed } from "./hero-full-bleed";

type HeroBlockProps = PagebuilderType<"hero"> & {
  variant?: "split" | "immersive" | "fullBleed" | null;
  /** @deprecated Prefer `variant` — kept for legacy CMS documents */
  layout?: "split" | "fullBleed" | null;
  titleAccent?: string | null;
};

function HeroSplit({
  title,
  buttons,
  badge,
  image,
  richText,
}: Pick<HeroBlockProps, "title" | "buttons" | "badge" | "image" | "richText">) {
  return (
    <section id="hero" className="mt-4 md:my-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="grid h-full grid-rows-[auto_1fr_auto] items-center justify-items-center gap-4 text-center lg:items-start lg:justify-items-start lg:text-left">
            {badge ? <Badge variant="secondary">{badge}</Badge> : null}
            <div className="grid gap-4">
              <h1 className="text-balance text-4xl font-semibold lg:text-6xl">
                {title}
              </h1>
              <RichText
                richText={richText}
                className="text-base font-normal md:text-lg"
              />
            </div>

            <SanityButtons
              buttons={buttons}
              buttonClassName="w-full sm:w-auto"
              className="mb-8 grid w-full gap-2 sm:w-fit sm:grid-flow-col lg:justify-start"
            />
          </div>

          {image ? (
            <div className="h-96 w-full">
              <SanityImage
                image={image as SanityImageProps}
                loading="eager"
                width={800}
                height={800}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="max-h-96 w-full rounded-3xl object-cover"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** Default to immersive so homepage matches the original full-bleed hero. */
function isImmersive(variant?: string | null, layout?: string | null): boolean {
  if (variant === "split" || layout === "split") return false;
  return (
    !variant ||
    variant === "immersive" ||
    variant === "fullBleed" ||
    layout === "fullBleed"
  );
}

export function HeroBlock({
  title,
  buttons,
  badge,
  image,
  richText,
  variant,
  layout,
  titleAccent,
}: HeroBlockProps) {
  if (isImmersive(variant, layout)) {
    const primary = buttons?.[0];
    const secondary = buttons?.[1];
    return (
      <HeroFullBleed
        eyebrow={badge ?? undefined}
        titleLines={title ? title.split("\n").filter(Boolean) : undefined}
        accentWord={titleAccent ?? undefined}
        sanityImage={image as SanityImageProps | null | undefined}
        imageAlt={
          image && "alt" in image && typeof image.alt === "string"
            ? image.alt
            : undefined
        }
        primaryCta={
          primary?.href
            ? { label: primary.text ?? "Learn More", href: primary.href }
            : undefined
        }
        secondaryCta={
          secondary?.href
            ? { label: secondary.text ?? "Learn More", href: secondary.href }
            : undefined
        }
      />
    );
  }

  return (
    <HeroSplit
      title={title}
      buttons={buttons}
      badge={badge}
      image={image}
      richText={richText}
    />
  );
}
