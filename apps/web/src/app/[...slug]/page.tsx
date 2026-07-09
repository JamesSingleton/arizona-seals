import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageBuilder } from "@/components/pagebuilder";
import { isSanityConfigured } from "@/lib/sanity/api";
import { client } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/live";
import { querySlugPageData, querySlugPagePaths } from "@/lib/sanity/query";
import type { QuerySlugPageDataResult } from "@/lib/sanity/sanity.types";
import { getSEOMetadata } from "@/lib/seo";

async function fetchSlugPageData(slug: string, stega = true) {
  // Cast until TypeGen is regenerated after Seals page-builder GROQ updates
  return (await sanityFetch({
    query: querySlugPageData,
    params: { slug: `/${slug}` },
    stega,
  })) as { data: QuerySlugPageDataResult };
}

async function fetchSlugPagePaths() {
  if (!isSanityConfigured) return [];
  try {
    const slugs = await client.fetch(querySlugPagePaths);
    const paths: { slug: string[] }[] = [];
    for (const slug of slugs) {
      if (!slug) continue;
      const parts = slug.split("/").filter(Boolean);
      paths.push({ slug: parts });
    }
    return paths;
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const slugString = slug.join("/");

  if (!isSanityConfigured) {
    return getSEOMetadata({ slug: `/${slugString}` });
  }

  try {
    const { data: pageData } = await fetchSlugPageData(slugString, false);
    return getSEOMetadata(
      pageData
        ? {
            title: pageData?.title ?? pageData?.seoTitle ?? "",
            description:
              pageData?.description ?? pageData?.seoDescription ?? "",
            slug: `/${pageData?.slug}`,
            contentId: pageData?._id,
            contentType: pageData?._type,
          }
        : { slug: `/${slugString}` },
    );
  } catch {
    return getSEOMetadata({ slug: `/${slugString}` });
  }
}

export async function generateStaticParams() {
  return await fetchSlugPagePaths();
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  if (!isSanityConfigured) {
    return notFound();
  }

  const { slug } = await params;
  const slugString = slug.join("/");

  try {
    const { data: pageData } = await fetchSlugPageData(slugString);

    if (!pageData) {
      return notFound();
    }

    const { title, pageBuilder, _id, _type } = pageData ?? {};

    return !Array.isArray(pageBuilder) || pageBuilder?.length === 0 ? (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-4 text-center">
        <h1 className="mb-4 text-2xl font-semibold capitalize">{title}</h1>
        <p className="mb-6 text-muted-foreground">
          This page has no content blocks yet.
        </p>
      </div>
    ) : (
      <PageBuilder pageBuilder={pageBuilder} id={_id} type={_type} />
    );
  } catch {
    return notFound();
  }
}
