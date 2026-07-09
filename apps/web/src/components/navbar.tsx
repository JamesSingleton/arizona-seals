import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
} from "@workspace/sanity/live";
import {
  queryGlobalSeoSettings,
  queryNavbarData,
} from "@workspace/sanity/query";
import type {
  QueryGlobalSeoSettingsResult,
  QueryNavbarDataResult,
} from "@workspace/sanity/types";
import { draftMode } from "next/headers";
import { Suspense } from "react";

import { Logo } from "./logo";
import { NavbarClient, NavbarSkeletonResponsive } from "./navbar-client";

export async function NavbarServer() {
  const { isEnabled: isDraftMode } = await draftMode();
  if (isDraftMode) {
    return (
      <Suspense fallback={<NavbarSkeleton />}>
        <DynamicNavbar />
      </Suspense>
    );
  }
  return <CachedNavbar perspective="published" stega={false} />;
}

async function DynamicNavbar() {
  const options = await getDynamicFetchOptions();
  return <CachedNavbar {...options} />;
}

async function CachedNavbar({ perspective, stega }: DynamicFetchOptions) {
  "use cache";
  const [navbarData, settingsData] = await Promise.all([
    sanityFetch({ query: queryNavbarData, perspective, stega }),
    sanityFetch({ query: queryGlobalSeoSettings, perspective, stega }),
  ]);
  return (
    <Navbar navbarData={navbarData.data} settingsData={settingsData.data} />
  );
}

export function Navbar({
  navbarData,
  settingsData,
}: {
  navbarData: QueryNavbarDataResult;
  settingsData: QueryGlobalSeoSettingsResult;
}) {
  const { siteTitle: settingsSiteTitle, logo } = settingsData ?? {};

  return (
    <header className="border-b border-border bg-background py-3">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-[auto_1fr] items-center gap-4">
          {logo ? (
            <Logo
              alt={settingsSiteTitle ?? "Arizona Seals Swimming"}
              priority
              image={logo}
              className="size-10"
            />
          ) : (
            <a
              href="/"
              className="font-display text-lg font-black uppercase tracking-wide text-foreground"
            >
              {settingsSiteTitle ?? "Arizona Seals"}
            </a>
          )}
          <NavbarClient navbarData={navbarData} settingsData={settingsData} />
        </div>
      </div>
    </header>
  );
}

export function NavbarSkeleton() {
  return (
    <header className="h-[75px] border-b border-border py-4" aria-hidden>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-[auto_1fr] items-center gap-4">
          <div className="h-10 w-[170px] animate-pulse rounded bg-muted" />
          <NavbarSkeletonResponsive />
        </div>
      </div>
    </header>
  );
}
