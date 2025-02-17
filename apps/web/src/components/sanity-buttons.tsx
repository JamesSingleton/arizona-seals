import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import type { ComponentProps } from "react";

import type { SanityButtonProps } from "@/types";

type SanityButtonsProps = {
  buttons: SanityButtonProps[] | null;
  className?: string;
  buttonClassName?: string;
};

function SanityButton({
  text,
  href,
  variant = "default",
  openInNewTab,
  className,
  ...props
}: SanityButtonProps & ComponentProps<typeof Button>) {
  if (!href) {
    console.log("Link Broken", { text, href, variant, openInNewTab });
    return <Button>Link Broken</Button>;
  }

  return (
    <Link
      href={href || "#"}
      target={openInNewTab ? "_blank" : "_self"}
      aria-label={`Navigate to ${text}`}
      title={`Click to visit ${text}`}
    >
      <Button
        variant={variant}
        {...props}
        className={cn("rounded-[10px]", className)}
      >
        {text}
      </Button>
    </Link>
  );
}

export function SanityButtons({
  buttons,
  className,
  buttonClassName,
}: SanityButtonsProps) {
  if (!buttons?.length) return null;

  return (
    <div className={cn("flex flex-col sm:flex-row gap-4", className)}>
      {buttons.map((button) => (
        <SanityButton
          key={`button-${button._key}`}
          {...button}
          className={buttonClassName}
        />
      ))}
    </div>
  );
}
