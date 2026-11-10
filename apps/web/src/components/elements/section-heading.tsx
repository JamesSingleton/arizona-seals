import { cn } from "@workspace/ui/lib/utils";

export type SectionHeadingProps = {
  eyebrow?: string | null;
  title?: string | null;
  intro?: string | null;
  /** Use on bg-navy bands so the accent and text stay AA. */
  onNavy?: boolean;
  align?: "start" | "center";
  className?: string;
};

/** Eyebrow rule + display title + optional intro, shared by page-builder sections. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  onNavy = false,
  align = "start",
  className,
}: SectionHeadingProps) {
  if (!eyebrow && !title && !intro) return null;
  const centered = align === "center";

  return (
    <div className={cn(centered && "text-center", className)}>
      {eyebrow ? (
        <div
          className={cn(
            "mb-4 flex items-center gap-3",
            centered && "justify-center",
          )}
        >
          <div
            className={cn(
              "h-0.5 w-8",
              onNavy ? "bg-cyan-on-navy" : "bg-cyan-brand",
            )}
          />
          <span
            className={cn(
              "font-display text-xs font-bold tracking-[0.25em] uppercase",
              onNavy ? "text-cyan-on-navy" : "text-cyan-brand",
            )}
          >
            {eyebrow}
          </span>
        </div>
      ) : null}
      {title ? (
        <h2
          className={cn(
            "font-display leading-none font-black text-balance uppercase",
            onNavy ? "text-white" : "text-foreground",
          )}
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          {title}
        </h2>
      ) : null}
      {intro ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed md:mt-6",
            centered && "mx-auto",
            onNavy ? "text-white/80" : "text-seal-gray",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
