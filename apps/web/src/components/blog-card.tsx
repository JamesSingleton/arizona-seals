import type { QueryBlogIndexPageDataResult } from "@workspace/sanity/types";
import Link from "next/link";

import { SanityImage } from "./elements/sanity-image";

type Blog = NonNullable<
  NonNullable<QueryBlogIndexPageDataResult>["blogs"]
>[number];

interface BlogCardProps {
  blog: Blog;
}

function formatDate(value?: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function blogHref(slug?: string | null): string {
  if (!slug) return "#";
  if (slug.startsWith("/blog/")) return slug;
  if (slug.startsWith("/")) return slug;
  return `/blog/${slug}`;
}

export function FeaturedBlogCard({ blog }: BlogCardProps) {
  if (!blog) return null;

  const { title, publishedAt, slug, description, image, category } = blog;
  const href = blogHref(slug);

  return (
    <Link href={href} className="group block">
      <article className="grid grid-cols-1 overflow-hidden border border-border bg-background lg:grid-cols-2">
        <div className="relative aspect-16/10 overflow-hidden bg-muted lg:aspect-auto lg:min-h-88">
          {image?.id ? (
            <SanityImage
              image={image}
              alt={title ?? "Blog post image"}
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-navy" />
          )}
          {category ? (
            <span className="absolute top-4 left-4 bg-cyan-brand px-3 py-1 font-display text-xs font-bold tracking-widest text-primary-foreground uppercase">
              {category}
            </span>
          ) : null}
        </div>
        <div className="flex flex-col justify-center p-8 md:p-10">
          {publishedAt ? (
            <p className="mb-3 font-display text-xs tracking-widest text-seal-gray uppercase">
              {formatDate(publishedAt)}
            </p>
          ) : null}
          <h2 className="mb-4 font-display text-2xl leading-tight font-black text-balance text-foreground uppercase transition-colors group-hover:text-cyan-brand md:text-3xl">
            {title}
          </h2>
          {description ? (
            <p className="mb-6 text-base leading-relaxed text-seal-gray">
              {description}
            </p>
          ) : null}
          <p className="font-display text-xs font-bold tracking-widest text-cyan-brand uppercase transition-colors group-hover:text-foreground">
            Read More →
          </p>
        </div>
      </article>
    </Link>
  );
}

export function BlogCard({ blog }: BlogCardProps) {
  if (!blog) {
    return (
      <article className="flex flex-col border border-border bg-background">
        <div className="h-52 animate-pulse bg-muted" />
        <div className="space-y-3 p-6">
          <div className="h-3 w-24 animate-pulse bg-muted" />
          <div className="h-5 w-full animate-pulse bg-muted" />
          <div className="h-4 w-3/4 animate-pulse bg-muted" />
        </div>
      </article>
    );
  }

  const { title, publishedAt, slug, description, image, category } = blog;
  const href = blogHref(slug);

  return (
    <Link href={href} className="group flex flex-col">
      <article className="flex flex-1 flex-col border border-border bg-background">
        <div className="relative h-52 shrink-0 overflow-hidden bg-muted">
          {image?.id ? (
            <SanityImage
              image={image}
              alt={title ?? "Blog post image"}
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : null}
          {category ? (
            <span className="absolute top-4 left-4 bg-cyan-brand px-3 py-1 font-display text-xs font-bold tracking-widest text-primary-foreground uppercase">
              {category}
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-6">
          {publishedAt ? (
            <p className="mb-3 font-display text-xs tracking-widest text-seal-gray uppercase">
              {formatDate(publishedAt)}
            </p>
          ) : null}
          <h3 className="mb-3 font-display text-lg leading-tight font-black text-balance text-foreground uppercase transition-colors group-hover:text-cyan-brand">
            {title}
          </h3>
          {description ? (
            <p className="flex-1 text-sm leading-relaxed text-seal-gray">
              {description}
            </p>
          ) : null}
          <p className="mt-4 font-display text-xs font-bold tracking-widest text-cyan-brand uppercase transition-colors group-hover:text-foreground">
            Read More →
          </p>
        </div>
      </article>
    </Link>
  );
}
