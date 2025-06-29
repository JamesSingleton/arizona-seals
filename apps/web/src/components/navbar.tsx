import { sanityFetch } from "@/lib/sanity/live";
import { queryGlobalSeoSettings, queryNavbarData } from "@/lib/sanity/query";
import type {
  QueryGlobalSeoSettingsResult,
  QueryNavbarDataResult,
} from "@/lib/sanity/sanity.types";

import { Logo } from "./logo";
import { NavbarClient, NavbarSkeletonResponsive } from "./navbar-client";

export async function NavbarServer() {
  const [navbarData, settingsData] = await Promise.all([
    sanityFetch({ query: queryNavbarData }),
    sanityFetch({ query: queryGlobalSeoSettings }),
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
    <header className="py-3 md:border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 dark:bg-gray-900/80">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-[auto_1fr] items-center gap-4">
          <Logo 
            alt={settingsSiteTitle || "Arizona Seals Swimming Academy"} 
            priority 
            image={logo && "alt" in logo ? logo : null} 
          />
          <NavbarClient navbarData={navbarData} settingsData={settingsData} />
        </div>
      </div>
    </header>
  );
}

export function NavbarSkeleton() {
  return (
    <header className="h-[75px] py-4 md:border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 dark:bg-gray-900/80">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-[auto_1fr] items-center gap-4">
          <div className="h-[50px] w-[200px] rounded animate-pulse bg-muted" />
          <NavbarSkeletonResponsive />
        </div>
      </div>
    </header>
  );
}