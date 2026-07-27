import { isSanityConfigured } from "@workspace/sanity/api";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
} from "@workspace/sanity/live";
import { queryBlogIndexPageData } from "@workspace/sanity/query";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { BlogCard, FeaturedBlogCard } from "@/components/blog-card";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { PageBuilder } from "@/components/pagebuilder";
import { getSEOMetadata, resolveSeoImageUrl } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  if (!isSanityConfigured) {
    return getSEOMetadata({ title: "Blog", slug: "/blog" });
  }

  const { isEnabled: isDraftMode } = await draftMode();
  try {
    const { data: result } = await sanityFetchMetadata({
      query: queryBlogIndexPageData,
      perspective: isDraftMode ? "drafts" : "published",
    });
    return getSEOMetadata(
      result
        ? {
            title: result.seoTitle ?? result.title ?? "Blog",
            description: result.seoDescription ?? result.description ?? "",
            slug: result.slug?.startsWith("/")
              ? result.slug
              : `/${result.slug ?? "blog"}`,
            contentId: result._id,
            contentType: result._type,
            seoNoIndex: Boolean(
              "seoNoIndex" in result ? result.seoNoIndex : false,
            ),
            ogTitle: result.ogTitle ?? undefined,
            ogDescription: result.ogDescription ?? undefined,
            seoImage: resolveSeoImageUrl(result.seoImage),
          }
        : { title: "Blog", slug: "/blog" },
    );
  } catch {
    return getSEOMetadata({ title: "Blog", slug: "/blog" });
  }
}

export default async function BlogIndexPage() {
  if (!isSanityConfigured) notFound();

  const { isEnabled: isDraftMode } = await draftMode();
  if (isDraftMode) {
    return (
      <Suspense
        fallback={<div className="min-h-[40vh] animate-pulse bg-muted" />}
      >
        <DynamicBlogIndex />
      </Suspense>
    );
  }
  return <CachedBlogIndex perspective="published" stega={false} />;
}

async function DynamicBlogIndex() {
  const options = await getDynamicFetchOptions();
  return <CachedBlogIndex {...options} />;
}

async function CachedBlogIndex({ perspective, stega }: DynamicFetchOptions) {
  "use cache";
  const { data } = await sanityFetch({
    query: queryBlogIndexPageData,
    perspective,
    stega,
  });
  if (!data) notFound();

  const {
    blogs = [],
    featuredBlogs: featuredFromCms = [],
    title,
    description,
    pageBuilder = [],
    _id,
    _type,
  } = data;

  const featuredIds = new Set(
    (featuredFromCms ?? []).map((blog) => blog._id).filter(Boolean),
  );
  const featuredBlogs = featuredFromCms ?? [];
  const remainingBlogs = featuredIds.size
    ? blogs.filter((blog) => !featuredIds.has(blog._id))
    : blogs;

  return (
    <div className="bg-background">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: title || "News", path: "/blog" },
        ]}
      />
      <PageHero
        title={title ?? "News"}
        subtitle={description ?? undefined}
        size="tall"
      />

      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          {!blogs.length && !featuredBlogs.length ? (
            <div className="py-12 text-center">
              <p className="text-seal-gray">
                No blog posts available at the moment.
              </p>
            </div>
          ) : (
            <>
              {featuredBlogs.length > 0 ? (
                <div className="mb-12 grid grid-cols-1 gap-8 lg:mb-16">
                  {featuredBlogs.map((blog) => (
                    <FeaturedBlogCard key={blog._id} blog={blog} />
                  ))}
                </div>
              ) : null}

              {remainingBlogs.length > 0 ? (
                <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {remainingBlogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>

      {pageBuilder && pageBuilder.length > 0 ? (
        <PageBuilder pageBuilder={pageBuilder as never} id={_id} type={_type} />
      ) : null}
    </div>
  );
}
