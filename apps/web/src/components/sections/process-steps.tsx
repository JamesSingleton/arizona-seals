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

const panelClass = {
  default: "bg-background",
  muted: "bg-water",
  navy: "on-dark bg-navy",
} as const;

const gridCols: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
  5: "md:grid-cols-2 lg:grid-cols-5",
  6: "md:grid-cols-2 lg:grid-cols-3",
};

export function ProcessSteps({
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
    <section className={cn(panelClass[tone], "py-20 md:py-28")}>
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeading
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
                "border-t-2 pt-5",
                onNavy ? "border-white/25" : "border-foreground",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "display mb-4 block text-7xl tabular-nums",
                  onNavy ? "text-pool" : "text-cyan-brand",
                )}
              >
                {index + 1}
              </span>
              <h3
                className={cn(
                  "mb-2 text-3xl not-italic",
                  onNavy ? "text-white" : "text-foreground",
                )}
              >
                {step.title}
              </h3>
              {step.description ? (
                <p
                  className={cn(
                    "leading-relaxed",
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
            size="lg"
            className="mt-12 gap-3"
          />
        ) : null}
      </div>
    </section>
  );
}
