import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
} from "@workspace/sanity/live";
import { queryHomePageData } from "@workspace/sanity/query";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Suspense } from "react";

import { PageBuilder } from "@/components/pagebuilder";
import { getSEOMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled: isDraftMode } = await draftMode();
  const { data } = await sanityFetchMetadata({
    query: queryHomePageData,
    perspective: isDraftMode ? "drafts" : "published",
  });

  return getSEOMetadata(
    data
      ? {
          title: data.seoTitle ?? data.title ?? "",
          description: data.seoDescription ?? data.description ?? "",
          slug: "/",
          contentId: data._id,
          contentType: data._type,
          seoNoIndex: Boolean("seoNoIndex" in data ? data.seoNoIndex : false),
        }
      : { slug: "/" },
  );
}

export default async function HomePage() {
  const { isEnabled: isDraftMode } = await draftMode();
  if (isDraftMode) {
    return (
      <Suspense fallback={<HomeFallback />}>
        <DynamicHome />
      </Suspense>
    );
  }
  return <CachedHome perspective="published" stega={false} />;
}

async function DynamicHome() {
  const options = await getDynamicFetchOptions();
  return <CachedHome {...options} />;
}

async function CachedHome({ perspective, stega }: DynamicFetchOptions) {
  "use cache";
  const { data } = await sanityFetch({
    query: queryHomePageData,
    perspective,
    stega,
  });

  if (!data) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-4 text-center">
        <h1 className="mb-4 font-display text-2xl font-semibold uppercase">
          Arizona Seals Swimming
        </h1>
        <p className="text-muted-foreground">
          Homepage content is not available yet. Publish the Home Page in Sanity
          Studio.
        </p>
      </div>
    );
  }

  const { pageBuilder, _id, _type, title } = data;

  if (!Array.isArray(pageBuilder) || pageBuilder.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-4 text-center">
        <h1 className="mb-4 font-display text-2xl font-semibold uppercase">
          {title}
        </h1>
        <p className="text-muted-foreground">
          This page has no content blocks yet.
        </p>
      </div>
    );
  }

  return (
    <PageBuilder pageBuilder={pageBuilder as never} id={_id} type={_type} />
  );
}

function HomeFallback() {
  return <div className="min-h-[50vh] animate-pulse bg-muted" aria-hidden />;
}
