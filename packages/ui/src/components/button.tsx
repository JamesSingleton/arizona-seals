import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cn } from "@workspace/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "group/button slant inline-flex shrink-0 items-center justify-center rounded-none border-0 font-display font-extrabold uppercase tracking-[0.08em] border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all outline-none select-none active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /** Primary action: navy on light surfaces, Seals cyan on navy/photo (both > 7:1). */
        default:
          "bg-navy text-white hover:bg-[#16396a] on-dark:bg-pool on-dark:text-[#0d2849] on-dark:hover:bg-pool-hover",
        outline:
          "bg-foreground/10 text-foreground hover:bg-foreground hover:text-background",
        /** Secondary action: an underlined text button, never a second solid block. */
        secondary:
          "[clip-path:none] px-1 text-foreground underline decoration-cyan-brand decoration-[3px] underline-offset-[7px] hover:text-cyan-brand on-dark:text-white on-dark:decoration-pool on-dark:hover:text-pool",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "[clip-path:none] px-0 text-foreground underline decoration-cyan-brand decoration-[3px] on-dark:decoration-pool underline-offset-[6px] hover:text-cyan-brand",
        /** White outline for dark/hero surfaces — hover text stays deep navy (not theme foreground) */
        /** Solid white for photo and navy surfaces */
        inverse: "bg-white text-[#0d2849] hover:bg-white/90",
        outlineInverse:
          "bg-white/15 text-white backdrop-blur-sm hover:bg-white hover:text-[#0d2849]",
        /** Foreground outline for light/themed surfaces */
        outlineStrong: "bg-foreground text-background hover:bg-foreground/85",
      },
      size: {
        default:
          "h-11 gap-1.5 px-6 text-base has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-4",
        xs: "h-6 gap-1 px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3 text-xs has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-13 gap-2 px-8 text-lg has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5 [&_svg:not([class*='size-'])]:size-4",
        xl: "h-15 gap-2 px-10 text-xl has-data-[icon=inline-end]:pr-6 has-data-[icon=inline-start]:pl-6 [&_svg:not([class*='size-'])]:size-4",
        icon: "size-9 [&_svg:not([class*='size-'])]:size-4",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-10 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/** Shared marketing CTA type treatment — use with buttonVariants */
const buttonCtaClassName = "";

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonCtaClassName, buttonVariants };
