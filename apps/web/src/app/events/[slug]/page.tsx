import { isSanityConfigured } from "@workspace/sanity/api";
import { urlFor } from "@workspace/sanity/client";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  sanityFetchStaticParams,
} from "@workspace/sanity/live";
import { queryEventBySlug, queryEventPaths } from "@workspace/sanity/query";
import { buttonVariants } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { CalendarPlus, Clock, ExternalLink, MapPin, Users } from "lucide-react";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stegaClean } from "next-sanity";
import { Suspense } from "react";

import { RichText } from "@/components/elements/rich-text";
import { BreadcrumbJsonLd, EventJsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import {
  categoryLabel,
  formatAddress,
  formatEventWhenLong,
  mapsUrl,
} from "@/lib/events";
import { getSEOMetadata, resolveSeoImageUrl } from "@/lib/seo";

const eventSlugPath = (slug: string) => `/events/${slug}`;

export async function generateStaticParams() {
  const fallback = [{ slug: "pacana-park-pumpkin-walk" }];
  if (!isSanityConfigured) return fallback;
  try {
    const { data } = await sanityFetchStaticParams({ query: queryEventPaths });
    const params = (data ?? [])
      .map((slug) => slug?.split("/").filter(Boolean).at(-1))
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => ({ slug }));
    return params.length ? params : fallback;
  } catch {
    return fallback;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = eventSlugPath(slug);
  if (!isSanityConfigured) return getSEOMetadata({ slug: path });

  const { isEnabled: isDraftMode } = await draftMode();
  let data: Awaited<ReturnType<typeof fetchEventMetadata>> = null;
  try {
    data = await fetchEventMetadata(path, isDraftMode);
  } catch {
    return getSEOMetadata({ slug: path });
  }
  if (!data) notFound();

  const when = formatEventWhenLong(data);
  return getSEOMetadata({
    title: data.title ?? "Event",
    description:
      data.summary ?? `${data.title} on ${when.date}. Arizona Seals Swimming.`,
    slug: path,
    contentId: data._id,
    contentType: data._type,
    seoNoIndex: data.seoNoIndex ?? false,
    seoImage: data.image?.id ? resolveSeoImageUrl(data.image) : undefined,
  });
}

async function fetchEventMetadata(slug: string, isDraftMode: boolean) {
  const { data } = await sanityFetchMetadata({
    query: queryEventBySlug,
    params: { slug },
    perspective: isDraftMode ? "drafts" : "published",
  });
  return data;
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!isSanityConfigured) notFound();

  const { isEnabled: isDraftMode } = await draftMode();
  if (isDraftMode) {
    return (
      <Suspense fallback={<div className="min-h-[40vh] bg-muted" />}>
        <DynamicEvent params={params} />
      </Suspense>
    );
  }

  const { slug } = await params;
  return (
    <CachedEvent
      slug={eventSlugPath(slug)}
      perspective="published"
      stega={false}
    />
  );
}

async function DynamicEvent({ params }: { params: Promise<{ slug: string }> }) {
  const [{ slug }, options] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);
  return <CachedEvent slug={eventSlugPath(slug)} {...options} />;
}

async function CachedEvent({
  slug,
  perspective,
  stega,
}: { slug: string } & DynamicFetchOptions) {
  "use cache";
  const { data: event } = await sanityFetch({
    query: queryEventBySlug,
    params: { slug },
    perspective,
    stega,
  });
  if (!event) notFound();

  const clean = stegaClean(event);
  const when = formatEventWhenLong(clean);
  const address = formatAddress(clean.location);
  const directions = mapsUrl(clean.location);
  const imageUrl = clean.image?.id
    ? urlFor({ _id: clean.image.id, ...clean.image })
        .width(1600)
        .height(900)
        .fit("crop")
        .url()
    : undefined;
  const statusNote =
    clean.status === "cancelled"
      ? "This event has been cancelled."
      : clean.status === "postponed"
        ? "This event has been postponed. A new date will be posted here."
        : null;

  return (
    <article>
      <EventJsonLd event={{ ...clean, imageUrl }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Events", path: "/events" },
          { name: clean.title ?? "Event", path: slug },
        ]}
      />

      <PageHero
        title={event.title ?? "Event"}
        subtitle={categoryLabel(clean.category)}
        image={event.image}
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-14 sm:px-10 md:py-20 lg:grid-cols-12 lg:gap-16 lg:px-16">
        <aside className="lg:order-2 lg:col-span-5">
          <div className="border-t-[6px] border-cyan-brand bg-water p-6 md:p-8 lg:sticky lg:top-28">
            <h2 className="sr-only">When and where</h2>
            {statusNote ? (
              <p
                role="status"
                className="mb-5 bg-destructive px-4 py-3 text-base font-semibold text-white"
              >
                {statusNote}
              </p>
            ) : null}
            <dl className="space-y-5 text-base">
              <div className="flex gap-3">
                <dt>
                  <Clock
                    aria-hidden
                    className="mt-0.5 size-5 text-cyan-brand"
                  />
                  <span className="sr-only">When</span>
                </dt>
                <dd>
                  <time
                    dateTime={clean.start ?? undefined}
                    className="block font-semibold text-foreground"
                  >
                    {when.date}
                  </time>
                  {when.time ? (
                    <span className="text-seal-gray">{when.time}</span>
                  ) : null}
                </dd>
              </div>
              {clean.location?.name || address ? (
                <div className="flex gap-3">
                  <dt>
                    <MapPin
                      aria-hidden
                      className="mt-0.5 size-5 text-cyan-brand"
                    />
                    <span className="sr-only">Where</span>
                  </dt>
                  <dd>
                    {clean.location?.name ? (
                      <span className="block font-semibold text-foreground">
                        {clean.location.name}
                      </span>
                    ) : null}
                    {address ? (
                      <span className="block text-seal-gray">{address}</span>
                    ) : null}
                    {directions ? (
                      <a
                        href={directions}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block font-semibold text-cyan-brand underline underline-offset-4"
                      >
                        Get directions
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : null}
                  </dd>
                </div>
              ) : null}
              {clean.host ? (
                <div className="flex gap-3">
                  <dt>
                    <Users
                      aria-hidden
                      className="mt-0.5 size-5 text-cyan-brand"
                    />
                    <span className="sr-only">Hosted by</span>
                  </dt>
                  <dd className="text-foreground">Hosted by {clean.host}</dd>
                </div>
              ) : null}
            </dl>

            <div className="mt-7 flex flex-col items-start gap-4">
              {clean.status !== "cancelled" ? (
                <a
                  href={`${slug}/calendar.ics`}
                  download
                  className={buttonVariants({ size: "lg" })}
                >
                  <CalendarPlus aria-hidden className="size-5" />
                  Add to calendar
                </a>
              ) : null}
              {clean.link?.href ? (
                <a
                  href={clean.link.href}
                  target={clean.link.openInNewTab ? "_blank" : undefined}
                  rel={
                    clean.link.openInNewTab ? "noopener noreferrer" : undefined
                  }
                  className={cn(
                    buttonVariants({ variant: "secondary" }),
                    "gap-2",
                  )}
                >
                  {clean.linkLabel || "More information"}
                  <ExternalLink aria-hidden className="size-4" />
                  {clean.link.openInNewTab ? (
                    <span className="sr-only"> (opens in a new tab)</span>
                  ) : null}
                </a>
              ) : null}
            </div>
          </div>
        </aside>

        <div className="lg:order-1 lg:col-span-7">
          {clean.summary ? (
            <p className="mb-8 text-xl leading-relaxed text-foreground">
              {clean.summary}
            </p>
          ) : null}
          {event.body?.length ? (
            <RichText
              richText={event.body}
              className="prose prose-lg prose-neutral max-w-none dark:prose-invert"
            />
          ) : null}
          <Link
            href="/events"
            className={cn(buttonVariants({ variant: "secondary" }), "mt-10")}
          >
            All events
          </Link>
        </div>
      </div>
    </article>
  );
}
