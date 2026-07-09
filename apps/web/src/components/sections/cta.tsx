import {
  buttonCtaClassName,
  buttonVariants,
} from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";

import type { PagebuilderType } from "@/types";
import { RichText } from "../elements/rich-text";
import { SanityButtons } from "../elements/sanity-buttons";
import { CtaFullBleed } from "./cta-full-bleed";

export type CTABlockProps = PagebuilderType<"cta"> & {
  layout?: "card" | "fullBleed" | "cyanBand" | "navyBand" | null;
};

export function CTABlock({
  richText,
  title,
  eyebrow,
  buttons,
  layout = "card",
}: CTABlockProps) {
  if (layout === "fullBleed") {
    const primary = buttons?.[0];
    const secondary = buttons?.[1];
    return (
      <CtaFullBleed
        eyebrow={eyebrow ?? undefined}
        titleLines={title ? title.split("\n").filter(Boolean) : undefined}
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
    const isCyan = layout === "cyanBand";
    return (
      <section className={cn("py-16 md:py-20", isCyan ? "bg-cyan-brand" : "bg-navy")}>
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          {eyebrow ? (
            <p
              className={cn(
                "mb-3 font-display text-sm font-bold tracking-[0.2em] uppercase",
                isCyan ? "text-white/80" : "text-cyan-brand",
              )}
            >
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2
              className={cn(
                "mb-4 font-display text-3xl font-bold uppercase md:text-4xl",
                "text-white",
              )}
            >
              {title}
            </h2>
          ) : null}
          {richText ? (
            <RichText
              richText={richText}
              className="mb-8 text-base leading-relaxed text-white/85 [&_p]:mb-0"
            />
          ) : null}
          <SanityButtons
            buttons={buttons}
            className="justify-center gap-3"
            buttonClassName={cn(
              buttonVariants({
                variant: isCyan ? "secondary" : "default",
                size: "lg",
              }),
              buttonCtaClassName,
              isCyan &&
                "bg-white text-navy hover:bg-white/90 border-0",
            )}
          />
        </div>
      </section>
    );
  }

  return (
    <section id="features" className="my-6 md:my-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="rounded-3xl bg-muted px-4 py-16">
          <div className="mx-auto max-w-3xl space-y-8 text-center">
            {eyebrow ? (
              <Badge
                variant="secondary"
                className="bg-zinc-200 dark:text-black"
              >
                {eyebrow}
              </Badge>
            ) : null}
            <h2 className="text-balance text-3xl font-semibold md:text-5xl">
              {title}
            </h2>
            <div className="text-lg text-muted-foreground">
              <RichText richText={richText} className="text-balance" />
            </div>
            <div className="flex justify-center">
              <SanityButtons
                buttons={buttons}
                buttonClassName="w-full sm:w-auto"
                className="mb-8 grid w-full gap-2 sm:w-fit sm:grid-flow-col lg:justify-start"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
