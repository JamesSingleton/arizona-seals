import Link from "next/link";

import type { SanityImageProps } from "@/types";
import { SanityImage } from "../elements/sanity-image";

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

export function LatestNews({
  eyebrow = "Stay Updated",
  title = "Latest News",
  posts,
}: LatestNewsProps) {
  if (!posts?.length) return null;

  return (
    <section className="bg-muted py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-0.5 w-8 bg-cyan-brand" />
              <span className="font-display text-xs font-bold tracking-[0.25em] text-cyan-brand uppercase">
                {eyebrow}
              </span>
            </div>
            <h2
              className="font-display font-black leading-none text-foreground uppercase"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {title}
            </h2>
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
                <article className="group flex flex-1 cursor-pointer flex-col border border-border bg-background">
                  <div className="relative h-52 shrink-0 overflow-hidden bg-muted">
                    {item.image?.id ? (
                      <SanityImage
                        image={item.image}
                        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : null}
                    {item.category ? (
                      <span className="absolute top-4 left-4 bg-cyan-brand px-3 py-1 font-display text-xs font-bold tracking-widest text-primary-foreground uppercase">
                        {item.category}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    {item.publishedAt ? (
                      <p className="mb-3 font-display text-xs tracking-widest text-seal-gray uppercase">
                        {formatDate(item.publishedAt)}
                      </p>
                    ) : null}
                    <h3 className="mb-3 font-display text-lg leading-tight font-black text-balance text-foreground uppercase transition-colors group-hover:text-cyan-brand">
                      {item.title}
                    </h3>
                    {item.description ? (
                      <p className="flex-1 text-sm leading-relaxed text-seal-gray">
                        {item.description}
                      </p>
                    ) : null}
                    <p className="mt-4 font-display text-xs font-bold tracking-widest text-cyan-brand uppercase transition-colors group-hover:text-foreground">
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
