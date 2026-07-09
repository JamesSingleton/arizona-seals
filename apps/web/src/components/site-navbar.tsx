"use client";

import {
  buttonCtaClassName,
  buttonVariants,
} from "@workspace/ui/components/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@workspace/ui/components/navigation-menu";
import { Separator } from "@workspace/ui/components/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { cn } from "@workspace/ui/lib/utils";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";

const programs = [
  {
    label: "Blue Group",
    href: "/programs#blue",
    description: "Elite competitors — highest level",
  },
  {
    label: "Red Group",
    href: "/programs#red",
    description: "Advanced athletes building toward Blue",
  },
  {
    label: "White Group",
    href: "/programs#white",
    description: "Intermediate competitors",
  },
  {
    label: "Rising Group",
    href: "/programs#rising",
    description: "Beginners and new competitive swimmers",
  },
];

const aboutLinks = [
  {
    label: "Our Story",
    href: "/about",
    description: "History, mission, and values",
  },
  {
    label: "Coaching Staff",
    href: "/coaches",
    description: "Meet our certified coaches",
  },
  { label: "Facilities", href: "/facilities", description: "Where we train" },
];

export function SiteNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isScrolled = mounted && scrolled;
  // Solid bar whenever scrolled or a dropdown/sheet is open — keeps AA contrast
  const solid = isScrolled || menuOpen || sheetOpen;

  const linkClass = cn(
    "text-sm font-semibold tracking-wide uppercase transition-colors",
    solid
      ? "text-foreground hover:text-cyan-brand"
      : "text-white hover:text-white/90",
  );

  const triggerClass = cn(
    "h-auto bg-transparent px-3 py-2 text-sm font-semibold tracking-wide uppercase",
    solid
      ? "text-foreground hover:bg-muted hover:text-cyan-brand focus:bg-muted data-popup-open:bg-muted data-popup-open:text-cyan-brand data-open:bg-muted data-open:text-cyan-brand"
      : "text-white hover:bg-white/20 hover:text-white focus:bg-white/20 data-popup-open:bg-white/20 data-popup-open:text-white data-open:bg-white/20 data-open:text-white",
  );

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-border bg-background/98 py-2 shadow-sm backdrop-blur-sm"
          : "bg-transparent py-4",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/logo.png"
            alt="Arizona Seals Swimming Logo"
            width={56}
            height={56}
            className={cn(
              "size-12 object-contain transition-opacity duration-300 md:size-14 dark:brightness-110",
              solid ? "opacity-100" : "absolute opacity-0",
            )}
          />
          <Image
            src="/logo-white.png"
            alt="Arizona Seals Swimming Logo"
            width={56}
            height={56}
            className={cn(
              "size-12 object-contain transition-opacity duration-300 md:size-14",
              solid ? "absolute opacity-0" : "opacity-100",
            )}
          />
          <div className="hidden leading-none sm:block">
            <p
              className={cn(
                "font-display text-lg leading-tight font-bold tracking-wide uppercase",
                solid ? "text-foreground" : "text-white",
              )}
            >
              Arizona Seals
            </p>
            <p
              className={cn(
                "font-display mt-0.5 text-xs font-bold tracking-[0.18em] uppercase",
                solid ? "text-cyan-brand" : "text-[#5ec9f2]",
              )}
            >
              Swimming
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <NavigationMenu
            onValueChange={(value) => setMenuOpen(Boolean(value))}
          >
            <NavigationMenuList className="gap-0">
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/"
                  className={cn(linkClass, "rounded-md px-3 py-2")}
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem value="about">
                <NavigationMenuTrigger className={triggerClass}>
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-56 p-2">
                    {aboutLinks.map((item) => (
                      <li key={item.href}>
                        <NavigationMenuLink
                          href={item.href}
                          className="block rounded-md px-3 py-2.5 text-popover-foreground hover:bg-muted focus:bg-muted"
                        >
                          <p className="text-sm font-semibold text-popover-foreground">
                            {item.label}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem value="programs">
                <NavigationMenuTrigger className={triggerClass}>
                  Programs
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-64 p-2">
                    <li className="mb-1">
                      <NavigationMenuLink
                        href="/programs"
                        className="block rounded-md bg-muted px-3 py-2.5 text-popover-foreground hover:bg-muted/80"
                      >
                        <p className="text-sm font-bold tracking-wide text-popover-foreground uppercase">
                          All Programs
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          View every training group
                        </p>
                      </NavigationMenuLink>
                    </li>
                    {programs.map((item) => (
                      <li key={item.href}>
                        <NavigationMenuLink
                          href={item.href}
                          className="block rounded-md px-3 py-2.5 text-popover-foreground hover:bg-muted focus:bg-muted"
                        >
                          <p className="text-sm font-semibold text-popover-foreground">
                            {item.label}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/coaches"
                  className={cn(linkClass, "rounded-md px-3 py-2")}
                >
                  Coaches
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/facilities"
                  className={cn(linkClass, "rounded-md px-3 py-2")}
                >
                  Facilities
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/sponsors"
                  className={cn(linkClass, "rounded-md px-3 py-2")}
                >
                  Sponsors
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <ThemeToggle
            className={cn(
              "ml-1",
              solid
                ? "text-foreground hover:bg-muted"
                : "text-white hover:bg-white/20",
            )}
          />

          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "default", size: "default" }),
              buttonCtaClassName,
              "ml-2",
            )}
          >
            Join the Team
          </Link>
        </nav>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger
            className={cn(
              "inline-flex size-7 items-center justify-center rounded-md lg:hidden",
              solid
                ? "text-foreground hover:bg-muted"
                : "text-white hover:bg-white/10",
            )}
            aria-label="Open navigation menu"
          >
            <Menu className="size-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-80 p-0">
            <SheetHeader className="border-b border-border px-6 py-5">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <Link
                href="/"
                onClick={() => setSheetOpen(false)}
                className="flex items-center gap-3"
              >
                <Image
                  src="/logo.png"
                  alt="Arizona Seals Swimming"
                  width={48}
                  height={48}
                  className="size-12 object-contain"
                />
                <div>
                  <p className="font-display text-base leading-tight font-bold text-foreground uppercase">
                    Arizona Seals
                  </p>
                  <p className="font-display text-xs font-bold tracking-widest text-cyan-brand uppercase">
                    Swimming
                  </p>
                </div>
              </Link>
            </SheetHeader>

            <nav className="flex flex-col overflow-y-auto px-4 py-4">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Coaches", href: "/coaches" },
                { label: "Programs", href: "/programs" },
                { label: "Facilities", href: "/facilities" },
                { label: "Sponsors", href: "/sponsors" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSheetOpen(false)}
                  className="flex items-center rounded-md px-3 py-3 text-sm font-semibold tracking-wide text-foreground uppercase transition-colors hover:bg-muted hover:text-cyan-brand"
                >
                  {link.label}
                </Link>
              ))}
              <Separator className="my-3" />
              <Link
                href="/contact"
                onClick={() => setSheetOpen(false)}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  buttonCtaClassName,
                  "mx-3 mt-1",
                )}
              >
                Join the Team
              </Link>
              <Separator className="my-3" />
              <div className="flex items-center justify-between px-3 py-1">
                <span className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                  Appearance
                </span>
                <ThemeToggle className="text-foreground hover:bg-muted" />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
