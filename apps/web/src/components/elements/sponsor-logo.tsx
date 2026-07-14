import { cn } from "@workspace/ui/lib/utils";

import type { SanityImageProps } from "@/types";
import { SanityImage } from "./sanity-image";

type SponsorLogoProps = {
  name?: string | null;
  image?: SanityImageProps | null;
  url?: string | null;
  /** Marquee uses a slightly smaller chip */
  size?: "sm" | "md";
  className?: string;
};

/**
 * Renders a sponsor logo on a light plate so dark artwork stays readable
 * on both light and dark page backgrounds.
 */
export function SponsorLogo({
  name,
  image,
  url,
  size = "md",
  className,
}: SponsorLogoProps) {
  const chip = (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg border border-border bg-white shadow-sm",
        size === "sm" ? "h-20 min-w-40 px-5" : "h-24 min-w-44 px-6",
        className,
      )}
    >
      {image?.id ? (
        <SanityImage
          image={image}
          alt={name ?? "Sponsor"}
          className={cn(
            "w-auto object-contain",
            size === "sm" ? "h-12 max-w-36" : "h-14 max-w-40",
          )}
        />
      ) : (
        <span className="font-display text-sm font-bold tracking-wide text-foreground uppercase">
          {name}
        </span>
      )}
    </div>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={name ?? "Sponsor"}
        className="inline-flex transition-opacity hover:opacity-90"
      >
        {chip}
      </a>
    );
  }

  return chip;
}
