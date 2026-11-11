import { trackClick } from "@workspace/analytics";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";

import type { SanityButtonProps } from "@/types";

type SanityButtonsProps = {
  buttons: SanityButtonProps[] | null;
  /** Section name sent with `marketing_cta_clicked` (e.g. "hero", "cta_band"). */
  placement?: string;
  className?: string;
  buttonClassName?: string;
  size?: "sm" | "lg" | "default" | "icon" | null | undefined;
};

function SanityButton({
  text,
  href,
  variant = "default",
  openInNewTab,
  className,
  size = "default",
  placement = "page_builder",
}: SanityButtonProps & {
  placement?: string;
  className?: string;
  size?: "sm" | "lg" | "default" | "icon" | null | undefined;
}) {
  if (!href) {
    return <Button>Link Broken</Button>;
  }

  return (
    <Link
      href={href}
      target={openInNewTab ? "_blank" : "_self"}
      aria-label={`Navigate to ${text}`}
      title={`Click to visit ${text}`}
      {...trackClick("marketing_cta_clicked", {
        cta_label: text ?? "",
        cta_href: href,
        cta_variant: variant ?? "default",
        placement,
      })}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {text}
    </Link>
  );
}

export function SanityButtons({
  buttons,
  className,
  buttonClassName,
  size = "default",
  placement,
}: SanityButtonsProps) {
  if (!buttons?.length) return null;

  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row", className)}>
      {buttons.map((button) => (
        <SanityButton
          key={`button-${button._key}`}
          size={size}
          placement={placement}
          {...button}
          className={buttonClassName}
        />
      ))}
    </div>
  );
}
