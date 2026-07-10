"use client";

import type { QueryNavbarDataResult } from "@workspace/sanity/types";
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
import Link from "next/link";
import { useEffect, useState } from "react";

import { SanityImage } from "@/components/elements/sanity-image";
import { ThemeToggle } from "@/components/theme-toggle";
import type { SanityImageProps } from "@/types";

type NavbarData = NonNullable<QueryNavbarDataResult>;
type NavColumn = NonNullable<NavbarData["columns"]>[number];
type NavbarLogo = NavbarData["logo"];

type SiteNavbarProps = {
  columns?: NavbarData["columns"];
  buttons?: NavbarData["buttons"];
  logo?: NavbarLogo;
  alternateLogo?: NavbarData["alternateLogo"];
  siteTitle?: NavbarData["siteTitle"];
};

const FALLBACK_COLUMNS = [
  { _key: "home", type: "link" as const, name: "Home", href: "/" },
  {
    _key: "about",
    type: "column" as const,
    title: "About",
    links: [
      {
        _key: "about-story",
        name: "Our Story",
        description: "History, mission, and values",
        href: "/about",
      },
      {
        _key: "about-coaches",
        name: "Coaching Staff",
        description: "Meet our certified coaches",
        href: "/coaches",
      },
      {
        _key: "about-board",
        name: "Board of Directors",
        description: "Club officers and leadership",
        href: "/board",
      },
      {
        _key: "about-facilities",
        name: "Facilities",
        description: "Where we train",
        href: "/facilities",
      },
    ],
  },
  {
    _key: "programs",
    type: "column" as const,
    title: "Programs",
    links: [
      {
        _key: "programs-all",
        name: "All Programs",
        description: "View every training group",
        href: "/programs",
      },
      {
        _key: "programs-blue",
        name: "Blue Group",
        description: "Elite competitors — highest level",
        href: "/programs#blue",
      },
      {
        _key: "programs-red",
        name: "Red Group",
        description: "Advanced athletes building toward Blue",
        href: "/programs#red",
      },
      {
        _key: "programs-white",
        name: "White Group",
        description: "Intermediate competitors",
        href: "/programs#white",
      },
      {
        _key: "programs-rising",
        name: "Rising Group",
        description: "Beginners and new competitive swimmers",
        href: "/programs#rising",
      },
    ],
  },
  { _key: "coaches", type: "link" as const, name: "Coaches", href: "/coaches" },
  { _key: "board", type: "link" as const, name: "Board", href: "/board" },
  {
    _key: "facilities",
    type: "link" as const,
    name: "Facilities",
    href: "/facilities",
  },
  {
    _key: "sponsors",
    type: "link" as const,
    name: "Sponsors",
    href: "/sponsors",
  },
] as NonNullable<NavbarData["columns"]>;

function normalizeHref(href?: string | null) {
  if (!href) return "#";
  return href.startsWith("/") || href.startsWith("http") || href.startsWith("#")
    ? href
    : `/${href}`;
}

function isRenderableLogo(
  image?: NavbarLogo,
): image is NonNullable<NavbarLogo> & { id: string } {
  return typeof image?.id === "string" && image.id.length > 0;
}

function BrandMark({
  logo,
  alternateLogo,
  siteTitle,
  solid,
}: {
  logo?: NavbarLogo;
  alternateLogo?: NavbarData["alternateLogo"];
  siteTitle?: string | null;
  solid: boolean;
}) {
  const primary = isRenderableLogo(logo) ? logo : null;
  const alternate = isRenderableLogo(alternateLogo) ? alternateLogo : primary;
  const alt = primary?.alt || alternate?.alt || siteTitle || "Arizona Seals";

  return (
    <>
      {primary ? (
        <SanityImage
          image={primary as SanityImageProps}
          alt={alt}
          width={56}
          height={56}
          className={cn(
            "size-12 object-contain transition-opacity duration-300 md:size-14 dark:brightness-110",
            solid ? "opacity-100" : "absolute opacity-0",
          )}
        />
      ) : null}
      {alternate ? (
        <SanityImage
          image={alternate as SanityImageProps}
          alt={alt}
          width={56}
          height={56}
          className={cn(
            "size-12 object-contain transition-opacity duration-300 md:size-14",
            solid ? "absolute opacity-0" : "opacity-100",
          )}
        />
      ) : null}
    </>
  );
}

export function SiteNavbar({
  columns,
  buttons,
  logo,
  alternateLogo,
  siteTitle,
}: SiteNavbarProps) {
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
  const solid = isScrolled || menuOpen || sheetOpen;
  const navColumns = columns && columns.length > 0 ? columns : FALLBACK_COLUMNS;
  const cta = buttons?.[0];
  const ctaHref = normalizeHref(cta?.href) || "/contact";
  const ctaLabel = cta?.text || "Join the Team";
  const brandTitle = siteTitle || "Arizona Seals";

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

  const mobileLinks = flattenMobileLinks(navColumns);
  const sheetLogo = isRenderableLogo(logo) ? logo : null;

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
        <Link href="/" className="relative flex shrink-0 items-center gap-3">
          <BrandMark
            logo={logo}
            alternateLogo={alternateLogo}
            siteTitle={brandTitle}
            solid={solid}
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

        <div className="hidden items-center gap-1 lg:flex">
          <NavigationMenu
            aria-label="Main"
            onValueChange={(value) => setMenuOpen(Boolean(value))}
          >
            <NavigationMenuList className="gap-0">
              {navColumns.map((item) => (
                <DesktopNavItem
                  key={item._key}
                  item={item}
                  linkClass={linkClass}
                  triggerClass={triggerClass}
                />
              ))}
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
            href={ctaHref}
            className={cn(
              buttonVariants({ variant: "default", size: "default" }),
              buttonCtaClassName,
              "ml-2",
            )}
          >
            {ctaLabel}
          </Link>
        </div>

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
                {sheetLogo ? (
                  <SanityImage
                    image={sheetLogo as SanityImageProps}
                    alt={sheetLogo.alt || brandTitle}
                    width={48}
                    height={48}
                    className="size-12 object-contain"
                  />
                ) : null}
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

            <nav
              aria-label="Mobile"
              className="flex flex-col overflow-y-auto px-4 py-4"
            >
              {mobileLinks.map((link) => (
                <Link
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  onClick={() => setSheetOpen(false)}
                  className="flex items-center rounded-md px-3 py-3 text-sm font-semibold tracking-wide text-foreground uppercase transition-colors hover:bg-muted hover:text-cyan-brand"
                >
                  {link.label}
                </Link>
              ))}
              <Separator className="my-3" />
              <Link
                href={ctaHref}
                onClick={() => setSheetOpen(false)}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  buttonCtaClassName,
                  "mx-3 mt-1",
                )}
              >
                {ctaLabel}
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

function DesktopNavItem({
  item,
  linkClass,
  triggerClass,
}: {
  item: NavColumn;
  linkClass: string;
  triggerClass: string;
}) {
  if (item.type === "column") {
    const links = item.links ?? [];
    return (
      <NavigationMenuItem value={item.title ?? item._key}>
        <NavigationMenuTrigger className={triggerClass}>
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-64 p-2">
            {links.map((link, index) => (
              <li
                key={link._key}
                className={
                  index === 0 && item.title === "Programs" ? "mb-1" : ""
                }
              >
                <NavigationMenuLink
                  href={normalizeHref(link.href)}
                  className={cn(
                    "block rounded-md px-3 py-2.5 text-popover-foreground hover:bg-muted focus:bg-muted",
                    index === 0 &&
                      item.title === "Programs" &&
                      "bg-muted hover:bg-muted/80",
                  )}
                >
                  <p
                    className={cn(
                      "text-sm font-semibold text-popover-foreground",
                      index === 0 &&
                        item.title === "Programs" &&
                        "font-bold tracking-wide uppercase",
                    )}
                  >
                    {link.name}
                  </p>
                  {link.description ? (
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {link.description}
                    </p>
                  ) : null}
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        href={normalizeHref(item.href)}
        className={cn(linkClass, "rounded-md px-3 py-2")}
      >
        {item.name}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

function flattenMobileLinks(columns?: NavbarData["columns"]) {
  const links: { label: string; href: string }[] = [];
  for (const item of columns ?? []) {
    if (item.type === "link" && item.name) {
      links.push({ label: item.name, href: normalizeHref(item.href) });
    } else if (item.type === "column") {
      // Prefer top-level destinations for mobile (first link or column title page)
      const first = item.links?.[0];
      if (item.title === "About") {
        links.push({ label: "About", href: "/about" });
      } else if (item.title === "Programs") {
        links.push({ label: "Programs", href: "/programs" });
      } else if (first?.name) {
        links.push({
          label: first.name,
          href: normalizeHref(first.href),
        });
      }
    }
  }
  if (!links.some((l) => l.href === "/contact")) {
    links.push({ label: "Contact", href: "/contact" });
  }
  return links;
}
