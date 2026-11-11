"use client";

import { cn } from "@workspace/ui/lib/utils";
import type * as React from "react";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: generic wrapper; callers pass htmlFor (or nest the control)
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-base leading-tight font-semibold select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
