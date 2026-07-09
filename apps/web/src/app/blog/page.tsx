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

import { BlogCard, BlogHeader, FeaturedBlogCard } from "@/components/blog-card";
import { PageBuilder } from "@/components/pagebuilder";
import { getSEOMetadata } from "@/lib/seo";

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
    title,
    description,
    pageBuilder = [],
    _id,
    _type,
    displayFeaturedBlogs,
    featuredBlogsCount,
  } = data;

  const validFeaturedBlogsCount = featuredBlogsCount
    ? Number.parseInt(featuredBlogsCount, 10)
    : 0;

  if (!blogs.length) {
    return (
      <div className="container mx-auto my-16 px-4 md:px-6">
        <BlogHeader title={title} description={description} />
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No blog posts available at the moment.
          </p>
        </div>
        {pageBuilder && pageBuilder.length > 0 ? (
          <PageBuilder
            pageBuilder={pageBuilder as never}
            id={_id}
            type={_type}
          />
        ) : null}
      </div>
    );
  }

  const shouldDisplayFeaturedBlogs =
    displayFeaturedBlogs && validFeaturedBlogsCount > 0;

  const featuredBlogs = shouldDisplayFeaturedBlogs
    ? blogs.slice(0, validFeaturedBlogsCount)
    : [];
  const remainingBlogs = shouldDisplayFeaturedBlogs
    ? blogs.slice(validFeaturedBlogsCount)
    : blogs;

  return (
    <div className="bg-background">
      <div className="container mx-auto my-16 px-4 md:px-6">
        <BlogHeader title={title} description={description} />

        {featuredBlogs.length > 0 ? (
          <div className="mx-auto mt-8 mb-12 grid grid-cols-1 gap-8 sm:mt-12 md:mt-16 md:gap-12 lg:mb-20">
            {featuredBlogs.map((blog) => (
              <FeaturedBlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : null}

        {remainingBlogs.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2">
            {remainingBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : null}
      </div>

      {pageBuilder && pageBuilder.length > 0 ? (
        <PageBuilder pageBuilder={pageBuilder as never} id={_id} type={_type} />
      ) : null}
    </div>
  );
}
