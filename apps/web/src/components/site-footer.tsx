import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
} from "@workspace/sanity/live";
import { queryFooterData, querySettingsData } from "@workspace/sanity/query";
import { Mail, MapPin } from "lucide-react";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { FacebookIcon, InstagramIcon } from "@/components/icons";

const FALLBACK_QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Coaches", href: "/coaches" },
  { label: "Programs", href: "/programs" },
  { label: "Facilities", href: "/facilities" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Contact", href: "/contact" },
];

const FALLBACK_PROGRAMS = [
  { label: "Blue Group", href: "/programs#blue" },
  { label: "Red Group", href: "/programs#red" },
  { label: "White Group", href: "/programs#white" },
  { label: "Rising Group", href: "/programs#rising" },
];

export async function SiteFooter() {
  const { isEnabled: isDraftMode } = await draftMode();
  if (isDraftMode) {
    return (
      <Suspense fallback={<SiteFooterView />}>
        <DynamicSiteFooter />
      </Suspense>
    );
  }
  return <CachedSiteFooter perspective="published" stega={false} />;
}

async function DynamicSiteFooter() {
  const options = await getDynamicFetchOptions();
  return <CachedSiteFooter {...options} />;
}

async function CachedSiteFooter({ perspective, stega }: DynamicFetchOptions) {
  "use cache";
  const [footerResult, settingsResult] = await Promise.all([
    sanityFetch({ query: queryFooterData, perspective, stega }),
    sanityFetch({ query: querySettingsData, perspective, stega }),
  ]);

  return (
    <SiteFooterView
      subtitle={footerResult.data?.subtitle}
      columns={footerResult.data?.columns}
      email={settingsResult.data?.contactEmail}
      address={settingsResult.data?.primaryAddress}
      socialLinks={settingsResult.data?.socialLinks}
    />
  );
}

function SiteFooterView({
  subtitle = "Developing competitive swimmers and champions in and out of the pool since 2005.",
  columns,
  email = "arizonaseals@gmail.com",
  address,
  socialLinks,
}: {
  subtitle?: string | null;
  columns?:
    | {
        _key?: string;
        title?: string | null;
        links?:
          | {
              _key?: string;
              name?: string | null;
              href?: string | null;
            }[]
          | null;
      }[]
    | null;
  email?: string | null;
  address?: {
    street?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
  } | null;
  socialLinks?: {
    facebook?: string | null;
    instagram?: string | null;
  } | null;
}) {
  const quickLinks =
    columns
      ?.find(
        (c) =>
          c.title?.toLowerCase().includes("quick") ||
          c.title?.toLowerCase().includes("explore"),
      )
      ?.links?.map((l) => ({
        label: l.name ?? "",
        href: l.href ?? "#",
      }))
      .filter((l) => l.label) ?? FALLBACK_QUICK_LINKS;

  const programLinks =
    columns
      ?.find((c) => c.title?.toLowerCase().includes("program"))
      ?.links?.map((l) => ({
        label: l.name ?? "",
        href: l.href ?? "#",
      }))
      .filter((l) => l.label) ?? FALLBACK_PROGRAMS;

  const street = address?.street || "44345 M.L.K. Jr. Blvd";
  const cityLine = [address?.city || "Maricopa", address?.state || "AZ"]
    .filter(Boolean)
    .join(", ");
  const zip = address?.zip || "85138";
  const resolvedEmail = email || "arizonaseals@gmail.com";

  const social = [
    {
      icon: FacebookIcon,
      href: socialLinks?.facebook || "https://www.facebook.com/azseals",
      ariaLabel: "Facebook",
    },
    {
      icon: InstagramIcon,
      href: socialLinks?.instagram || "https://www.instagram.com/arizonaseals",
      ariaLabel: "Instagram",
    },
  ];

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Arizona Seals Swimming"
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
              />
              <div>
                <p className="font-display text-lg leading-tight font-bold text-white uppercase">
                  Arizona Seals
                </p>
                <p className="font-display text-sm font-bold tracking-widest text-cyan-on-navy uppercase">
                  Swimming
                </p>
              </div>
            </Link>
            <p className="mb-5 text-sm leading-relaxed text-white/70">
              {subtitle}
            </p>
            <div className="flex items-center gap-3">
              {social.map((s) => (
                <a
                  key={s.ariaLabel}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.ariaLabel}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-cyan-brand hover:text-primary-foreground"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display mb-4 text-base font-bold tracking-widest text-white uppercase">
              Quick Links
            </h2>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/80 transition-colors hover:text-cyan-on-navy"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display mb-4 text-base font-bold tracking-widest text-white uppercase">
              Programs
            </h2>
            <ul className="space-y-2">
              {programLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/80 transition-colors hover:text-cyan-on-navy"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display mb-4 text-base font-bold tracking-widest text-white uppercase">
              Contact Us
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-cyan-on-navy"
                />
                <span className="text-sm text-white/80">
                  {street}
                  <br />
                  {cityLine} {zip}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-cyan-on-navy" />
                <a
                  href={`mailto:${resolvedEmail}`}
                  className="text-sm text-white/80 transition-colors hover:text-cyan-on-navy"
                >
                  {resolvedEmail}
                </a>
              </li>
            </ul>
            <div className="mt-5">
              <p className="mb-1 text-xs tracking-widest text-white uppercase">
                Member Of
              </p>
              <p className="text-sm font-medium text-white/90">USA Swimming</p>
              <p className="text-sm font-medium text-white/90">
                Arizona Swimming
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-white/70">
            &copy; 2026 Arizona Seals Swimming. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-white/70 transition-colors hover:text-white/70"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-white/70 transition-colors hover:text-white/70"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
