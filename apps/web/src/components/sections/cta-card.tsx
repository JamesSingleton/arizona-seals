import { Badge } from "@workspace/ui/components/badge";

import type { PagebuilderType } from "@/types";
import { RichText } from "../elements/rich-text";
import { SanityButtons } from "../elements/sanity-buttons";

export type CtaCardProps = Pick<
  PagebuilderType<"cta">,
  "eyebrow" | "title" | "richText" | "buttons"
>;

export function CtaCard({ eyebrow, title, richText, buttons }: CtaCardProps) {
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
