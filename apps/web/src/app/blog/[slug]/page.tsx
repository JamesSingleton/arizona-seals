import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RichText } from "@/components/elements/rich-text";
import { SanityImage } from "@/components/elements/sanity-image";
import { TableOfContent } from "@/components/elements/table-of-content";
import { isSanityConfigured } from "@/lib/sanity/api";
import { client } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/live";
import { queryBlogPaths, queryBlogSlugPageData } from "@/lib/sanity/query";
import type { QueryBlogSlugPageDataResult } from "@/lib/sanity/sanity.types";
import { getSEOMetadata } from "@/lib/seo";

async function fetchBlogSlugPageData(slug: string, stega = true) {
  return (await sanityFetch({
    query: queryBlogSlugPageData,
    params: { slug: `/blog/${slug}` },
    stega,
  })) as { data: QueryBlogSlugPageDataResult };
}

async function fetchBlogPaths() {
  if (!isSanityConfigured) return [];
  try {
    const slugs = await client.fetch(queryBlogPaths);
    const paths: { slug: string }[] = [];
    for (const slug of slugs) {
      if (!slug) continue;
      const [, , path] = slug.split("/");
      if (path) paths.push({ slug: path });
    }
    return paths;
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isSanityConfigured) {
    return getSEOMetadata({ slug: `/blog/${slug}` });
  }

  try {
    const { data } = await fetchBlogSlugPageData(slug, false);
    return getSEOMetadata(
      data
        ? {
            title: data?.title ?? data?.seoTitle ?? "",
            description: data?.description ?? data?.seoDescription ?? "",
            slug: `/${data?.slug}`,
            contentId: data?._id,
            contentType: data?._type,
            pageType: "article",
          }
        : {},
    );
  } catch {
    return getSEOMetadata({ slug: `/blog/${slug}` });
  }
}

export async function generateStaticParams() {
  return await fetchBlogPaths();
}

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!isSanityConfigured) return notFound();

  const { slug } = await params;
  try {
    const { data } = await fetchBlogSlugPageData(slug);
    if (!data) return notFound();
    const { title, description, image, richText } = data ?? {};

    return (
      <div className="container mx-auto my-16 px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
          <main>
            <header className="mb-8">
              <h1 className="mt-2 text-4xl font-bold">{title}</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {description}
              </p>
            </header>
            {image && (
              <div className="mb-12">
                <SanityImage
                  image={image}
                  alt={title}
                  width={1600}
                  loading="eager"
                  height={900}
                  className="h-auto w-full rounded-lg"
                />
              </div>
            )}
            <RichText richText={richText ?? []} />
          </main>

          <div className="hidden lg:block">
            <div className="sticky top-4 rounded-lg">
              <TableOfContent richText={richText} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch {
    return notFound();
  }
}
