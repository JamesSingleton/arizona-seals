import { sanityFetch } from "@/lib/sanity/live";
import { queryNavbarData } from "@/lib/sanity/query";
import type { QueryNavbarDataResult } from "@/lib/sanity/sanity.types";

import { Logo } from "./logo";
import { NavbarClient, NavbarSkeletonResponsive } from "./navbar-client";

export async function NavbarServer() {
  const navbarData = await sanityFetch({ query: queryNavbarData });
  return <Navbar navbarData={navbarData.data} />;
}

export function Navbar({ navbarData }: { navbarData: QueryNavbarDataResult }) {
  const { logo, siteTitle } = navbarData ?? {};

  return (
    <section className="py-4 h-[75px] md:border-b">
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center">
          <div className="flex-grow">
            <Logo src={logo} alt={siteTitle} priority />
          </div>
          <div className="flex-grow">
            <NavbarClient navbarData={navbarData} />
          </div>
        </nav>
      </div>
    </section>
  );
}

export function NavbarSkeleton() {
  return (
    <section className="py-4 h-[75px] md:border-b">
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center">
          <div className="flex-grow">
            <div className="h-[40px] w-[170px] bg-muted rounded animate-pulse" />
          </div>
          <div className="flex-grow">
            <NavbarSkeletonResponsive />
          </div>
        </nav>
      </div>
    </section>
  );
}
