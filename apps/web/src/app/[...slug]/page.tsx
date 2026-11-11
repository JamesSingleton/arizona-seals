import { isSanityConfigured } from "@workspace/sanity/api";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  sanityFetchStaticParams,
} from "@workspace/sanity/live";
import { querySlugPageData, querySlugPagePaths } from "@workspace/sanity/query";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageBuilder } from "@/components/pagebuilder";
import { getSEOMetadata, resolveSeoImageUrl } from "@/lib/seo";

function toSlugParam(slug: string[]) {
  return `/${slug.join("/")}`;
}

export async function generateStaticParams() {
  // Cache Components requires at least one static param for build-time validation.
  const fallback = [{ slug: ["about"] }];
  if (!isSanityConfigured) return fallback;
  try {
    const { data: slugs } = await sanityFetchStaticParams({
      query: querySlugPagePaths,
    });
    const paths: { slug: string[] }[] = [];
    for (const slug of slugs ?? []) {
      if (!slug) continue;
      const parts = slug.split("/").filter(Boolean);
      if (parts.length) paths.push({ slug: parts });
    }
    return paths.length > 0 ? paths : fallback;
  } catch {
    return fallback;
  }
}

async function fetchSlugMetadata(slug: string, isDraftMode: boolean) {
  const { data } = await sanityFetchMetadata({
    query: querySlugPageData,
    params: { slug },
    perspective: isDraftMode ? "drafts" : "published",
  });
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const slugString = toSlugParam(slug);
  const { isEnabled: isDraftMode } = await draftMode();

  if (!isSanityConfigured) {
    return getSEOMetadata({ slug: slugString });
  }

  let pageData: Awaited<ReturnType<typeof fetchSlugMetadata>> = null;
  try {
    pageData = await fetchSlugMetadata(slugString, isDraftMode);
  } catch {
    return getSEOMetadata({ slug: slugString });
  }

  // Unknown URL: a real 404 (blocking metadata for crawlers) instead of a
  // soft 404 that search engines would index.
  if (!pageData) notFound();

  return getSEOMetadata({
    title: pageData.seoTitle ?? pageData.title ?? "",
    description: pageData.seoDescription ?? pageData.description ?? "",
    slug: pageData.slug?.startsWith("/") ? pageData.slug : `/${pageData.slug}`,
    contentId: pageData._id,
    contentType: pageData._type,
    seoNoIndex: pageData.seoNoIndex ?? false,
    ogTitle: pageData.ogTitle ?? undefined,
    ogDescription: pageData.ogDescription ?? undefined,
    seoImage: resolveSeoImageUrl(pageData.seoImage),
  });
}

export default function SlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  if (!isSanityConfigured) notFound();

  return (
    <Suspense fallback={<PageFallback />}>
      <SlugPageContent params={params} />
    </Suspense>
  );
}

async function SlugPageContent({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { isEnabled: isDraftMode } = await draftMode();
  if (isDraftMode) {
    const [{ slug }, options] = await Promise.all([
      params,
      getDynamicFetchOptions(),
    ]);
    return <CachedSlugPage slug={toSlugParam(slug)} {...options} />;
  }

  const { slug } = await params;
  return (
    <CachedSlugPage
      slug={toSlugParam(slug)}
      perspective="published"
      stega={false}
    />
  );
}

async function CachedSlugPage({
  slug,
  perspective,
  stega,
}: { slug: string } & DynamicFetchOptions) {
  "use cache";
  const { data: pageData } = await sanityFetch({
    query: querySlugPageData,
    params: { slug },
    perspective,
    stega,
  });

  if (!pageData) notFound();

  const { title, pageBuilder, _id, _type } = pageData;

  if (!Array.isArray(pageBuilder) || pageBuilder.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-4 text-center">
        <h1 className="mb-4 font-display text-2xl font-semibold capitalize">
          {title}
        </h1>
        <p className="mb-6 text-muted-foreground">
          This page has no content blocks yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: title || "Page", path: slug },
        ]}
      />
      <PageBuilder pageBuilder={pageBuilder as never} id={_id} type={_type} />
    </>
  );
}

function PageFallback() {
  return <div className="min-h-[50vh] animate-pulse bg-muted" aria-hidden />;
}
