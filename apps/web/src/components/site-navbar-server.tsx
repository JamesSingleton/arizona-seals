import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
} from "@workspace/sanity/live";
import { queryNavbarData } from "@workspace/sanity/query";
import { draftMode } from "next/headers";
import { Suspense } from "react";

import { SiteNavbar } from "./site-navbar";

export async function SiteNavbarServer() {
  const { isEnabled: isDraftMode } = await draftMode();
  if (isDraftMode) {
    return (
      <Suspense fallback={<SiteNavbar />}>
        <DynamicSiteNavbar />
      </Suspense>
    );
  }
  return <CachedSiteNavbar perspective="published" stega={false} />;
}

async function DynamicSiteNavbar() {
  const options = await getDynamicFetchOptions();
  return <CachedSiteNavbar {...options} />;
}

async function CachedSiteNavbar({ perspective, stega }: DynamicFetchOptions) {
  "use cache";
  const { data } = await sanityFetch({
    query: queryNavbarData,
    perspective,
    stega,
  });

  return (
    <SiteNavbar
      columns={data?.columns}
      buttons={data?.buttons}
      logo={data?.logo}
      alternateLogo={data?.alternateLogo}
      siteTitle={data?.siteTitle}
    />
  );
}
