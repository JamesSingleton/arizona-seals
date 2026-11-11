import type { QueryBlogIndexPageDataResult } from "@workspace/sanity/types";
import Link from "next/link";

import { formatDate } from "@/lib/format-date";
import type { StegaAware } from "@/types";
import {
  objectPositionFromHotspot,
  SanityImage,
} from "./elements/sanity-image";

type Blog = StegaAware<
  NonNullable<NonNullable<QueryBlogIndexPageDataResult>["blogs"]>[number]
>;

interface BlogCardProps {
  blog: Blog;
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
      <article className="grid grid-cols-1 overflow-hidden border-b-[6px] border-cyan-brand bg-water lg:grid-cols-2">
        <div className="relative aspect-16/10 overflow-hidden bg-muted lg:aspect-auto lg:min-h-88">
          {image?.id ? (
            <SanityImage
              image={image}
              width={1200}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{
                objectPosition: objectPositionFromHotspot(image.hotspot),
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-navy" />
          )}
          {category ? (
            <span className="absolute top-4 left-4 bg-navy px-3 py-1.5 label text-sm text-white">
              {category}
            </span>
          ) : null}
        </div>
        <div className="flex flex-col justify-center p-8 md:p-10">
          {publishedAt ? (
            <p className="mb-3 label text-sm text-seal-gray">
              {formatDate(publishedAt)}
            </p>
          ) : null}
          <h2 className="mb-4 text-4xl text-balance text-foreground transition-colors group-hover:text-cyan-brand md:text-5xl">
            {title}
          </h2>
          {description ? (
            <p className="mb-6 text-base leading-relaxed text-seal-gray">
              {description}
            </p>
          ) : null}
          <p className="label text-sm text-cyan-brand transition-colors group-hover:text-foreground">
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
      <article className="flex flex-col border-b-[6px] border-cyan-brand bg-water">
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
      <article className="flex flex-1 flex-col border-b-[6px] border-cyan-brand bg-water">
        <div className="relative h-56 shrink-0 overflow-hidden bg-muted">
          {image?.id ? (
            <SanityImage
              image={image}
              width={1200}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{
                objectPosition: objectPositionFromHotspot(image.hotspot),
              }}
            />
          ) : null}
          {category ? (
            <span className="absolute top-4 left-4 bg-navy px-3 py-1.5 label text-sm text-white">
              {category}
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-6">
          {publishedAt ? (
            <p className="mb-3 label text-sm text-seal-gray">
              {formatDate(publishedAt)}
            </p>
          ) : null}
          <h3 className="mb-3 text-3xl text-balance text-foreground transition-colors group-hover:text-cyan-brand">
            {title}
          </h3>
          {description ? (
            <p className="flex-1 text-base leading-relaxed text-seal-gray">
              {description}
            </p>
          ) : null}
          <p className="mt-4 label text-sm text-cyan-brand transition-colors group-hover:text-foreground">
            Read More →
          </p>
        </div>
      </article>
    </Link>
  );
}
