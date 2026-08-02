import type { PagebuilderType } from "@/types";
import { CtaBand } from "./cta-band";
import { CtaCard } from "./cta-card";
import { CtaFullBleed } from "./cta-full-bleed";

export type CTABlockProps = PagebuilderType<"cta"> & {
  layout?: "card" | "fullBleed" | "cyanBand" | "navyBand" | null;
};

/** Explicit CTA variants — layout selects which composed section to render. */
export function CTABlock({
  richText,
  title,
  eyebrow,
  buttons,
  image,
  layout = "card",
}: CTABlockProps) {
  if (layout === "fullBleed") {
    const primary = buttons?.[0];
    const secondary = buttons?.[1];
    return (
      <CtaFullBleed
        eyebrow={eyebrow ?? undefined}
        titleLines={title ? title.split("\n").filter(Boolean) : undefined}
        image={image}
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

  if (layout === "cyanBand" || layout === "navyBand") {
    return (
      <CtaBand
        eyebrow={eyebrow}
        title={title}
        richText={richText}
        buttons={buttons}
        tone={layout === "cyanBand" ? "cyan" : "navy"}
      />
    );
  }

  return (
    <CtaCard
      eyebrow={eyebrow}
      title={title}
      richText={richText}
      buttons={buttons}
    />
  );
}
