import { ArrowUpRight, FileText } from "lucide-react";

import type { PagebuilderType } from "@/types";

type ResourcesBlockProps = PagebuilderType<"resources">;
type ResourceItem = NonNullable<
  NonNullable<
    NonNullable<ResourcesBlockProps["groups"]>[number]["items"]
  >[number]
>;

function formatFileSize(bytes?: number | null): string | null {
  if (typeof bytes !== "number" || bytes <= 0) return null;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function resourceHref(item: ResourceItem): string | null {
  if (item.kind === "external") {
    return item.url?.trim() || null;
  }
  return item.file?.asset?.url?.trim() || null;
}

function resourceMeta(item: ResourceItem): string | null {
  if (item.kind === "external") return "Link";
  const parts = ["PDF"];
  const size = formatFileSize(item.file?.asset?.size);
  if (size) parts.push(size);
  return parts.join(" · ");
}

function ResourceRow({ item }: { item: ResourceItem }) {
  const href = resourceHref(item);
  if (!href || !item.title) return null;

  const meta = resourceMeta(item);
  const isExternal = item.kind === "external";

  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start gap-4 border-b border-border py-5 transition-colors hover:border-cyan-brand"
      >
        <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center bg-navy text-cyan-on-navy">
          <FileText className="size-5" aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-start justify-between gap-4">
            <span className="font-display text-base font-bold tracking-wide text-foreground uppercase transition-colors group-hover:text-cyan-brand md:text-lg">
              {item.title}
            </span>
            <ArrowUpRight
              className="mt-1 size-4 shrink-0 text-seal-gray transition-colors group-hover:text-cyan-brand"
              aria-hidden
            />
          </span>
          {item.description ? (
            <span className="mt-1 block text-sm leading-relaxed text-seal-gray">
              {item.description}
            </span>
          ) : null}
          {meta ? (
            <span className="mt-2 block font-display text-xs font-bold tracking-[0.18em] text-seal-gray uppercase">
              {meta}
              {isExternal ? null : (
                <span className="sr-only"> (opens in a new tab)</span>
              )}
            </span>
          ) : null}
        </span>
      </a>
    </li>
  );
}

export function ResourcesBlock({
  eyebrow,
  title,
  subtitle,
  groups,
}: ResourcesBlockProps) {
  const visibleGroups =
    groups?.filter((group) =>
      group.items?.some((item) => resourceHref(item)),
    ) ?? [];

  if (!visibleGroups.length) return null;

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          {eyebrow ? (
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="h-0.5 w-8 bg-cyan-brand" />
              <span className="font-display text-xs font-bold tracking-[0.25em] text-cyan-brand uppercase">
                {eyebrow}
              </span>
              <div className="h-0.5 w-8 bg-cyan-brand" />
            </div>
          ) : null}
          {title ? (
            <h2
              className="font-display font-black leading-none text-foreground uppercase"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {title}
            </h2>
          ) : null}
          {subtitle ? (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-seal-gray md:text-lg">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="mx-auto flex max-w-3xl flex-col gap-14">
          {visibleGroups.map((group) => (
            <div key={group._key}>
              {group.title ? (
                <h3 className="mb-2 font-display text-sm font-bold tracking-[0.2em] text-cyan-brand uppercase md:text-base">
                  {group.title}
                </h3>
              ) : null}
              <ul className="border-t border-border">
                {group.items?.map((item) => (
                  <ResourceRow key={item._key} item={item} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
