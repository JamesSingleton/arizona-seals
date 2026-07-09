import { Badge } from "@workspace/ui/components/badge";

import type { PagebuilderType } from "@/types";
import { RichText } from "../elements/rich-text";
import { SanityButtons } from "../elements/sanity-buttons";
import { SanityImage } from "../elements/sanity-image";
import { HeroFullBleed } from "./hero-full-bleed";

type HeroBlockProps = PagebuilderType<"hero"> & {
  layout?: "split" | "fullBleed";
  titleAccent?: string | null;
};

export function HeroBlock({
  title,
  buttons,
  badge,
  image,
  richText,
  layout = "split",
  titleAccent,
}: HeroBlockProps) {
  if (layout === "fullBleed") {
    const primary = buttons?.[0];
    const secondary = buttons?.[1];
    return (
      <HeroFullBleed
        eyebrow={badge ?? undefined}
        titleLines={title ? title.split("\n").filter(Boolean) : undefined}
        accentWord={titleAccent ?? undefined}
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
    <section id="hero" className="mt-4 md:my-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="grid h-full grid-rows-[auto_1fr_auto] items-center justify-items-center gap-4 text-center lg:items-start lg:justify-items-start lg:text-left">
            {badge && <Badge variant="secondary">{badge}</Badge>}
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

          {image && (
            <div className="h-96 w-full">
              <SanityImage
                image={image}
                loading="eager"
                width={800}
                height={800}
                className="max-h-96 w-full rounded-3xl object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
