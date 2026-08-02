import { isSanityConfigured } from "@workspace/sanity/api";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  sanityFetchStaticParams,
} from "@workspace/sanity/live";
import { queryBlogPaths, queryBlogSlugPageData } from "@workspace/sanity/query";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, ViewTransition } from "react";

import { RichText } from "@/components/elements/rich-text";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { formatDate } from "@/lib/format-date";
import { getSEOMetadata, resolveSeoImageUrl } from "@/lib/seo";

function blogSlugPath(slug: string) {
  return slug.startsWith("/blog/") ? slug : `/blog/${slug}`;
}

export async function generateStaticParams() {
  const fallback = [{ slug: "welcome" }];
  if (!isSanityConfigured) return fallback;
  try {
    const { data: slugs } = await sanityFetchStaticParams({
      query: queryBlogPaths,
    });
    const paths: { slug: string }[] = [];
    for (const slug of slugs ?? []) {
      if (!slug) continue;
      const parts = slug.split("/").filter(Boolean);
      const path = parts.at(-1);
      if (path) paths.push({ slug: path });
    }
    return paths.length > 0 ? paths : fallback;
  } catch {
    return fallback;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isSanityConfigured) {
    return getSEOMetadata({ slug: `/blog/${slug}`, pageType: "article" });
  }

  const { isEnabled: isDraftMode } = await draftMode();
  try {
    const { data } = await sanityFetchMetadata({
      query: queryBlogSlugPageData,
      params: { slug: blogSlugPath(slug) },
      perspective: isDraftMode ? "drafts" : "published",
    });
    return getSEOMetadata(
      data
        ? {
            title: data.seoTitle ?? data.title ?? "",
            description: data.seoDescription ?? data.description ?? "",
            slug: data.slug?.startsWith("/") ? data.slug : `/${data.slug}`,
            contentId: data._id,
            contentType: data._type,
            pageType: "article",
            seoNoIndex: data.seoNoIndex ?? false,
            ogTitle: data.ogTitle ?? undefined,
            ogDescription: data.ogDescription ?? undefined,
            seoImage: resolveSeoImageUrl(data.seoImage),
          }
        : { slug: `/blog/${slug}`, pageType: "article" },
    );
  } catch {
    return getSEOMetadata({ slug: `/blog/${slug}`, pageType: "article" });
  }
}

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!isSanityConfigured) return notFound();

  const { isEnabled: isDraftMode } = await draftMode();
  if (isDraftMode) {
    return (
      <Suspense
        fallback={<div className="min-h-[40vh] animate-pulse bg-muted" />}
      >
        <DynamicBlogPost params={params} />
      </Suspense>
    );
  }

  const { slug } = await params;
  return (
    <CachedBlogPost
      slug={blogSlugPath(slug)}
      perspective="published"
      stega={false}
    />
  );
}

async function DynamicBlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [{ slug }, options] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);
  return <CachedBlogPost slug={blogSlugPath(slug)} {...options} />;
}

async function CachedBlogPost({
  slug,
  perspective,
  stega,
}: { slug: string } & DynamicFetchOptions) {
  "use cache";
  const { data } = await sanityFetch({
    query: queryBlogSlugPageData,
    params: { slug },
    perspective,
    stega,
  });
  if (!data) notFound();

  const { title, description, image, richText, category, publishedAt } = data;

  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      default="none"
    >
      <article>
        <ArticleJsonLd article={data} />
        <BreadcrumbJsonLd
          items={[
            { name: "Home", path: "/" },
            { name: "News", path: "/blog" },
            {
              name: title || "Article",
              path: data.slug?.startsWith("/")
                ? data.slug
                : `/blog/${data.slug}`,
            },
          ]}
        />

        <PageHero
          title={title ?? "Article"}
          image={image}
          size="tall"
          beforeTitle={
            category ? (
              <span className="mb-3 inline-block bg-cyan-brand px-3 py-1 font-display text-xs font-bold tracking-widest text-primary-foreground uppercase">
                {category}
              </span>
            ) : null
          }
        />

        <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10 md:py-16">
          <div className="mb-8 flex flex-wrap items-center gap-4">
            {publishedAt ? (
              <time
                dateTime={publishedAt}
                className="font-display text-xs tracking-widest text-seal-gray uppercase"
              >
                {formatDate(publishedAt)}
              </time>
            ) : null}
            {category ? (
              <span className="font-display text-xs font-bold tracking-widest text-cyan-brand uppercase">
                {category}
              </span>
            ) : null}
          </div>
          {description ? (
            <p className="mb-8 text-lg leading-relaxed text-seal-gray">
              {description}
            </p>
          ) : null}
          <RichText
            richText={richText ?? []}
            className="prose prose-neutral max-w-none dark:prose-invert"
          />
          <Link
            href="/blog"
            className="mt-12 inline-flex font-display text-sm font-bold tracking-widest text-cyan-brand uppercase transition-colors hover:text-foreground"
          >
            ← Back to News
          </Link>
        </div>
      </article>
    </ViewTransition>
  );
}
