import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { articles, getArticleBySlug } from "@/content/news";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const paragraphs = article.body
    .trim()
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <main>
      <div className="relative h-72 w-full overflow-hidden md:h-96">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-navy/60" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-4xl px-6 pb-10 sm:px-10 lg:px-8">
            <span className="mb-4 inline-block bg-cyan-brand px-3 py-1 font-display text-xs font-bold tracking-widest text-primary-foreground uppercase">
              {article.category}
            </span>
            <h1 className="font-display text-3xl leading-tight font-black text-balance text-white uppercase md:text-5xl">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-6 py-16 sm:px-10 lg:px-8">
        <div className="mb-10 flex items-center gap-5 border-b border-border pb-6 font-display text-xs font-bold tracking-widest text-seal-gray uppercase">
          <span className="flex items-center gap-2">
            <Calendar size={12} className="text-cyan-brand" />
            {article.date}
          </span>
          <span className="flex items-center gap-2">
            <Tag size={12} className="text-cyan-brand" />
            {article.category}
          </span>
        </div>

        <div className="prose prose-lg max-w-none">
          {paragraphs.map((p, i) => {
            if (p.startsWith("- ") || p.includes("\n- ")) {
              const items = p.split("\n").filter((l) => l.startsWith("- "));
              return (
                <ul
                  key={i}
                  className="my-5 list-inside list-disc space-y-1 text-base leading-relaxed text-seal-gray"
                >
                  {items.map((item, j) => (
                    <li key={j}>{item.replace(/^- /, "")}</li>
                  ))}
                </ul>
              );
            }
            const parts = p.split(/(\*\*[^*]+\*\*)/);
            return (
              <p
                key={i}
                className="my-5 text-base leading-relaxed text-seal-gray"
              >
                {parts.map((part, j) =>
                  part.startsWith("**") && part.endsWith("**") ? (
                    <strong key={j} className="font-bold text-foreground">
                      {part.slice(2, -2)}
                    </strong>
                  ) : (
                    part
                  ),
                )}
              </p>
            );
          })}
        </div>

        <div className="mt-14 border-t border-border pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-display text-xs font-bold tracking-widest text-cyan-brand uppercase transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>
      </article>
    </main>
  );
}
