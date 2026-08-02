import {
  buttonCtaClassName,
  buttonVariants,
} from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

import type { PagebuilderType } from "@/types";
import { RichText } from "../elements/rich-text";
import { SanityButtons } from "../elements/sanity-buttons";

export type CtaBandProps = Pick<
  PagebuilderType<"cta">,
  "eyebrow" | "title" | "richText" | "buttons"
> & {
  tone: "cyan" | "navy";
};

export function CtaBand({
  eyebrow,
  title,
  richText,
  buttons,
  tone,
}: CtaBandProps) {
  const isCyan = tone === "cyan";

  return (
    <section
      className={cn("py-16 md:py-20", isCyan ? "bg-cyan-band" : "bg-navy")}
    >
      <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
        {eyebrow ? (
          <p
            className={cn(
              "mb-3 font-display text-sm font-bold tracking-[0.2em] uppercase",
              isCyan ? "text-white/85" : "text-cyan-on-navy",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="mb-4 font-display text-3xl font-bold text-white uppercase md:text-4xl">
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
            isCyan && "border-0 bg-white text-navy hover:bg-white/90",
          )}
        />
      </div>
    </section>
  );
}
