import { buttonCtaClassName } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

import type { SanityButtonProps } from "@/types";
import { SanityButtons } from "../elements/sanity-buttons";
import { SectionHeading } from "../elements/section-heading";

export type ProcessStepsProps = {
  eyebrow?: string | null;
  title?: string | null;
  intro?: string | null;
  steps?:
    | { _key?: string; title?: string | null; description?: string | null }[]
    | null;
  variant?: "default" | "muted" | "navy" | null;
  buttons?: SanityButtonProps[] | null;
};

const bgClass = {
  default: "bg-background",
  muted: "bg-muted",
  navy: "bg-navy",
} as const;

const gridCols: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
  5: "md:grid-cols-2 lg:grid-cols-5",
  6: "md:grid-cols-2 lg:grid-cols-3",
};

export function ProcessSteps({
  eyebrow,
  title,
  intro,
  steps,
  variant,
  buttons,
}: ProcessStepsProps) {
  const items = steps?.filter((step) => step?.title) ?? [];
  if (!items.length) return null;

  const tone = variant ?? "default";
  const onNavy = tone === "navy";

  return (
    <section className={cn(bgClass[tone], "py-20 md:py-28")}>
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          intro={intro}
          onNavy={onNavy}
          className="mb-12 md:mb-16"
        />

        <ol
          className={cn(
            "grid grid-cols-1 gap-x-8 gap-y-10",
            gridCols[items.length] ?? gridCols[4],
          )}
        >
          {items.map((step, index) => (
            <li
              key={step._key ?? step.title}
              className={cn(
                "relative border-t-2 pt-6",
                onNavy ? "border-white/20" : "border-border",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute -top-0.5 left-0 h-0.5 w-12",
                  onNavy ? "bg-cyan-on-navy" : "bg-cyan-brand",
                )}
              />
              <span
                aria-hidden
                className={cn(
                  "mb-3 block font-display text-6xl leading-none font-black tabular-nums",
                  onNavy ? "text-cyan-on-navy" : "text-cyan-brand",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3
                className={cn(
                  "mb-2 font-display text-xl leading-tight font-bold uppercase md:text-2xl",
                  onNavy ? "text-white" : "text-foreground",
                )}
              >
                {step.title}
              </h3>
              {step.description ? (
                <p
                  className={cn(
                    "text-sm leading-relaxed md:text-base",
                    onNavy ? "text-white/80" : "text-seal-gray",
                  )}
                >
                  {step.description}
                </p>
              ) : null}
            </li>
          ))}
        </ol>

        {buttons?.length ? (
          <SanityButtons
            placement="process_steps"
            buttons={buttons}
            className="mt-12 gap-3"
            buttonClassName={cn(buttonCtaClassName, "h-12 px-8")}
          />
        ) : null}
      </div>
    </section>
  );
}
