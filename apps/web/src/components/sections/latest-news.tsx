import Image from "next/image";
import Link from "next/link";

import { type Article, articles } from "@/content/news";

export type LatestNewsProps = {
  eyebrow?: string;
  title?: string;
  items?: Article[];
};

export function LatestNews({
  eyebrow = "Stay Updated",
  title = "Latest News",
  items = articles,
}: LatestNewsProps) {
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
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/news/${item.slug}`}
              className="flex flex-col"
            >
              <article className="group flex flex-1 cursor-pointer flex-col border border-border bg-background">
                <div className="relative h-52 shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-cyan-brand px-3 py-1 font-display text-xs font-bold tracking-widest text-primary-foreground uppercase">
                    {item.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="mb-3 font-display text-xs tracking-widest text-seal-gray uppercase">
                    {item.date}
                  </p>
                  <h3 className="mb-3 font-display text-lg leading-tight font-black text-balance text-foreground uppercase transition-colors group-hover:text-cyan-brand">
                    {item.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-seal-gray">
                    {item.excerpt}
                  </p>
                  <p className="mt-4 font-display text-xs font-bold tracking-widest text-cyan-brand uppercase transition-colors group-hover:text-foreground">
                    Read More →
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
