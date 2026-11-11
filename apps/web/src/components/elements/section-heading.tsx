import { cn } from "@workspace/ui/lib/utils";

export type SectionHeadingProps = {
  title?: string | null;
  intro?: string | null;
  /** Use on navy panels so text stays readable. */
  onNavy?: boolean;
  align?: "start" | "center";
  className?: string;
};

/** Title and optional intro shared by page-builder sections. */
export function SectionHeading({
  title,
  intro,
  onNavy = false,
  align = "start",
  className,
}: SectionHeadingProps) {
  if (!title && !intro) return null;
  const centered = align === "center";

  return (
    <div className={cn(centered && "text-center", className)}>
      {title ? (
        <h2
          className={cn(
            "section-title",
            onNavy ? "text-white" : "text-foreground",
          )}
        >
          {title}
        </h2>
      ) : null}
      {intro ? (
        <p
          className={cn(
            "mt-5 max-w-xl text-lg leading-relaxed",
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
