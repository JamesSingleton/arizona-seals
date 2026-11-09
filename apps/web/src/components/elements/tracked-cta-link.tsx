"use client";

import {
  buttonCtaClassName,
  buttonVariants,
} from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { type VariantProps } from "class-variance-authority";
import Link from "next/link";

import { captureMarketingCtaClicked } from "@/lib/analytics";

type TrackedCtaLinkProps = {
  label: string;
  href: string;
  placement: string;
  className?: string;
} & Pick<VariantProps<typeof buttonVariants>, "variant" | "size">;

export function TrackedCtaLink({
  label,
  href,
  placement,
  variant = "default",
  size = "xl",
  className,
}: TrackedCtaLinkProps) {
  return (
    <Link
      href={href}
      onClick={() =>
        captureMarketingCtaClicked({ label, href, placement })
      }
      className={cn(
        buttonVariants({ variant, size }),
        variant === "default" && buttonCtaClassName,
        className,
      )}
    >
      {label}
    </Link>
  );
}
