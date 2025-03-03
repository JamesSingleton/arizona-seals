import { buttonVariants } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import type { PortableTextBlock } from "next-sanity";

import { convertToSlug } from "@/utils";

interface TableOfContentProps<T> {
  richText?: T | null;
}

interface ProcessedHeading {
  href: string;
  text: string;
}

function filterHeadings(
  richText?: PortableTextBlock[] | null,
): ProcessedHeading[] {
  if (!Array.isArray(richText)) return [];

  return richText.reduce<ProcessedHeading[]>((headings, block) => {
    if (block._type !== "block" || !block.style?.startsWith("h")) {
      return headings;
    }
    const text = block.children
      ?.map((child) => child.text)
      .join("")
      .trim();
    if (!text) return headings;
    const slug = convertToSlug(text);
    headings.push({ href: `#${slug}`, text });
    return headings;
  }, []);
}

function TableOfContentLink({ heading }: { heading: ProcessedHeading }) {
  return (
    <Link
      href={heading.href}
      className={cn(
        buttonVariants({ variant: "link" }),
        "text-sm justify-start truncate",
      )}
    >
      {heading.text}
    </Link>
  );
}

export function TableOfContent<T>({ richText }: TableOfContentProps<T>) {
  const headings = filterHeadings(richText as PortableTextBlock[]);
  if (!headings.length) return null;

  return (
    <div className="sticky left-0 top-8 flex flex-col">
      <details className="group mb-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 p-8">
        <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold">
          <span>Table of Contents</span>
          <ChevronDown
            className="h-5 w-5 transform transition-transform duration-200 group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <nav className="mt-4 " aria-label="Table of contents">
          <ul className="flex flex-col space-y-2">
            {headings.map((heading) => (
              <TableOfContentLink
                key={`${heading.href}-${heading.text}-heading`}
                heading={heading}
              />
            ))}
          </ul>
        </nav>
      </details>
    </div>
  );
}
