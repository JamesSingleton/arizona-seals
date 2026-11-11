import Link from "next/link";

import { formatDate } from "@/lib/format-date";
import type { SanityImageProps } from "@/types";
import {
  objectPositionFromHotspot,
  SanityImage,
} from "../elements/sanity-image";

export type LatestNewsPost = {
  _id?: string;
  title?: string | null;
  description?: string | null;
  slug?: string | null;
  category?: string | null;
  publishedAt?: string | null;
  image?: SanityImageProps | null;
};

export type LatestNewsProps = {
  eyebrow?: string | null;
  title?: string | null;
  posts?: LatestNewsPost[] | null;
};

export function LatestNews({ title = "Latest News", posts }: LatestNewsProps) {
  if (!posts?.length) return null;

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="section-title text-foreground">{title}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
          {posts.map((item) => {
            const slug = item.slug;
            if (!slug) return null;
            const href = slug.startsWith("/blog/")
              ? slug
              : slug.startsWith("/")
                ? slug
                : `/blog/${slug}`;

            return (
              <Link
                key={item._id ?? slug}
                href={href}
                className="flex flex-col"
              >
                <article className="group flex flex-1 cursor-pointer flex-col border-b-[6px] border-cyan-brand bg-water">
                  <div className="relative h-56 shrink-0 overflow-hidden bg-muted">
                    {item.image?.id ? (
                      <SanityImage
                        image={item.image}
                        width={1200}
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{
                          objectPosition: objectPositionFromHotspot(
                            item.image.hotspot,
                          ),
                        }}
                      />
                    ) : null}
                    {item.category ? (
                      <span className="absolute top-4 left-4 bg-navy px-3 py-1.5 label text-sm text-white">
                        {item.category}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    {item.publishedAt ? (
                      <p className="mb-3 label text-sm text-seal-gray">
                        {formatDate(item.publishedAt)}
                      </p>
                    ) : null}
                    <h3 className="mb-3 text-3xl text-balance text-foreground transition-colors group-hover:text-cyan-brand">
                      {item.title}
                    </h3>
                    {item.description ? (
                      <p className="flex-1 text-base leading-relaxed text-seal-gray">
                        {item.description}
                      </p>
                    ) : null}
                    <p className="mt-4 label text-sm text-cyan-brand transition-colors group-hover:text-foreground">
                      Read More →
                    </p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
