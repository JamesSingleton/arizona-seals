import { Button, buttonVariants } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";

import type { SanityButtonProps } from "@/types";

type SanityButtonsProps = {
  buttons: SanityButtonProps[] | null;
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
}: SanityButtonProps & {
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
      className={cn(
        buttonVariants({ variant, size }),
        "rounded-[10px]",
        className,
      )}
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
}: SanityButtonsProps) {
  if (!buttons?.length) return null;

  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row", className)}>
      {buttons.map((button) => (
        <SanityButton
          key={`button-${button._key}`}
          size={size}
          {...button}
          className={buttonClassName}
        />
      ))}
    </div>
  );
}
