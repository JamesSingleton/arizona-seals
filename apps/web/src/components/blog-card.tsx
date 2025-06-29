import Link from "next/link";

import type { QueryBlogIndexPageDataResult } from "@/lib/sanity/sanity.types";

import { SanityImage } from "./sanity-image";

type Blog = NonNullable<
  NonNullable<QueryBlogIndexPageDataResult>["blogs"]
>[number];

interface BlogImageProps {
  image: Blog["image"];
  title?: string | null;
}

function BlogImage({ image, title }: BlogImageProps) {
  if (!image?.asset) return null;

  return (
    <SanityImage
      asset={image}
      width={800}
      height={400}
      alt={title ?? "Swimming blog post image"}
      className="aspect-[16/9] w-full rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 object-cover sm:aspect-[2/1] lg:aspect-[3/2] border border-blue-200 dark:border-blue-800"
    />
  );
}

interface AuthorImageProps {
  author: Blog["authors"];
}

function AuthorImage({ author }: AuthorImageProps) {
  if (!author?.image) return null;

  return (
    <SanityImage
      asset={author.image}
      width={40}
      height={40}
      alt={author.name ?? "Swimming coach image"}
      className="size-8 flex-none rounded-full bg-blue-50 dark:bg-blue-900 border-2 border-blue-200 dark:border-blue-700"
    />
  );
}

interface BlogAuthorProps {
  author: Blog["authors"];
}

export function BlogAuthor({ author }: BlogAuthorProps) {
  if (!author) return null;

  return (
    <div className="flex items-center gap-x-2.5 text-sm/6 font-semibold text-blue-900 dark:text-blue-100">
      <AuthorImage author={author} />
      {author.name}
    </div>
  );
}

interface BlogCardProps {
  blog: Blog;
}

function BlogMeta({ publishedAt }: { publishedAt: string | null }) {
  return (
    <div className="flex items-center gap-x-4 text-xs my-4">
      <time dateTime={publishedAt ?? ""} className="text-blue-600 dark:text-blue-400 font-medium">
        {publishedAt
          ? new Date(publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : ""}
      </time>
    </div>
  );
}

function BlogContent({
  title,
  slug,
  description,
  isFeatured,
}: {
  title: string | null;
  slug: string | null;
  description: string | null;
  isFeatured?: boolean;
}) {
  const HeadingTag = isFeatured ? "h2" : "h3";
  const headingClasses = isFeatured
    ? "mt-3 text-3xl font-bold leading-tight text-blue-900 dark:text-blue-100"
    : "mt-3 text-lg font-semibold leading-6 text-blue-900 dark:text-blue-100";

  return (
    <div className="group relative">
      <HeadingTag className={headingClasses}>
        <Link href={slug ?? "#"} className="hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
          <span className="absolute inset-0" />
          {title}
        </Link>
      </HeadingTag>
      <p className="mt-5 text-sm leading-6 text-gray-700 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
}

function AuthorSection({ authors }: { authors: Blog["authors"] }) {
  if (!authors) return null;

  return (
    <div className="mt-6 flex border-t border-blue-200 dark:border-blue-800 pt-6">
      <div className="relative flex items-center gap-x-4">
        <AuthorImage author={authors} />
        <div className="text-sm leading-6">
          <p className="font-semibold text-blue-900 dark:text-blue-100">
            <span className="absolute inset-0" />
            {authors.name}
          </p>
          {authors.position && (
            <p className="text-blue-600 dark:text-blue-400 text-xs">
              {authors.position}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function FeaturedBlogCard({ blog }: BlogCardProps) {
  const { title, publishedAt, slug, authors, description, image } = blog ?? {};

  return (
    <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 p-8 rounded-3xl border border-blue-200 dark:border-blue-800">
      <BlogImage image={image} title={title} />
      <div className="space-y-6">
        <BlogMeta publishedAt={publishedAt} />
        <BlogContent
          title={title}
          slug={slug}
          description={description}
          isFeatured
        />
        <AuthorSection authors={authors} />
      </div>
    </article>
  );
}

export function BlogCard({ blog }: BlogCardProps) {
  if (!blog) {
    return (
      <article className="grid grid-cols-1 gap-4 w-full bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
        <div className="h-48 bg-blue-200 dark:bg-blue-800 rounded-2xl animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-24 bg-blue-200 dark:bg-blue-800 rounded animate-pulse" />
          <div className="h-6 w-full bg-blue-200 dark:bg-blue-800 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-blue-200 dark:bg-blue-800 rounded animate-pulse" />
        </div>
      </article>
    );
  }

  const { title, publishedAt, slug, authors, description, image } = blog;

  return (
    <article className="grid grid-cols-1 gap-4 w-full bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 p-6 rounded-2xl border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative w-full h-auto aspect-[16/9] overflow-hidden rounded-2xl">
        <BlogImage image={image} title={title} />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-blue-200 dark:ring-blue-800" />
      </div>
      <div className="w-full space-y-4">
        <BlogMeta publishedAt={publishedAt} />
        <BlogContent title={title} slug={slug} description={description} />
        <AuthorSection authors={authors} />
      </div>
    </article>
  );
}

export function BlogHeader({
  title,
  description,
}: {
  title: string | null;
  description: string | null;
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold sm:text-4xl text-blue-900 dark:text-blue-100">
          {title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
          {description}
        </p>
      </div>
    </div>
  );
}