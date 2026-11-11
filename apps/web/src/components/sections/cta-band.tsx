import { cn } from "@workspace/ui/lib/utils";

import type { PagebuilderType } from "@/types";
import { RichText } from "../elements/rich-text";
import { SanityButtons } from "../elements/sanity-buttons";

export type CtaBandProps = Pick<
  PagebuilderType<"cta">,
  "title" | "richText" | "buttons"
> & {
  tone: "cyan" | "navy";
};

export function CtaBand({ title, richText, buttons, tone }: CtaBandProps) {
  const isCyan = tone === "cyan";

  return (
    <section className={cn(isCyan ? "bg-water" : "on-dark bg-navy")}>
      <div className="px-6 py-20 text-center sm:px-10 md:py-28">
        <div className="mx-auto max-w-3xl">
          {title ? (
            <h2
              className={cn(
                "section-title mb-5",
                isCyan ? "text-foreground" : "text-white",
              )}
            >
              {title}
            </h2>
          ) : null}
          {richText ? (
            <RichText
              richText={richText}
              className={cn(
                "mb-9 text-lg leading-relaxed [&_p]:mb-0",
                isCyan ? "text-seal-gray" : "text-white/85",
              )}
            />
          ) : null}
          <SanityButtons
            placement="cta_band"
            buttons={buttons}
            className="justify-center gap-3"
            size="lg"
          />
        </div>
      </div>
    </section>
  );
}
