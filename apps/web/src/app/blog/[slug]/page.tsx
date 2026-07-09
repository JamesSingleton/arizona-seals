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
import { SanityImage } from "@/components/elements/sanity-image";
import { ArticleJsonLd } from "@/components/json-ld";
import { getSEOMetadata } from "@/lib/seo";

function blogSlugPath(slug: string) {
  return slug.startsWith("/blog/") ? slug : `/blog/${slug}`;
}

function formatDate(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
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

        <section className="relative flex h-72 items-end overflow-hidden md:h-96">
          {image ? (
            <SanityImage
              image={image}
              alt={title ?? "Blog post"}
              loading="eager"
              className="absolute inset-0 size-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-navy" />
          )}
          <div className="absolute inset-0 bg-navy/60" />
          <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-10 sm:px-10">
            {category ? (
              <span className="mb-3 inline-block bg-cyan-brand px-3 py-1 font-display text-xs font-bold tracking-widest text-white uppercase">
                {category}
              </span>
            ) : null}
            <h1 className="font-display text-3xl font-bold text-balance text-white uppercase md:text-5xl">
              {title}
            </h1>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10">
          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-seal-gray">
            {publishedAt ? <span>{formatDate(publishedAt)}</span> : null}
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
            href="/"
            className="mt-12 inline-flex font-display text-sm font-bold tracking-widest text-cyan-brand uppercase hover:text-navy"
          >
            ← Back to Home
          </Link>
        </div>
      </article>
    </ViewTransition>
  );
}
