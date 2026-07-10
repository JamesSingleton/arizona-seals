import { isSanityConfigured } from "@workspace/sanity/api";
import { sanityFetchMetadata } from "@workspace/sanity/live";
import { querySitemapData } from "@workspace/sanity/query";
import type { MetadataRoute } from "next";

import { getBaseUrl } from "@/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  if (!isSanityConfigured) {
    return entries;
  }

  try {
    const { data } = await sanityFetchMetadata({
      query: querySitemapData,
      perspective: "published",
    });

    const slugPages = data?.slugPages ?? [];
    const blogPages = data?.blogPages ?? [];

    return [
      ...entries,
      ...slugPages.map((page) => ({
        url: `${baseUrl}${page.slug?.startsWith("/") ? page.slug : `/${page.slug}`}`,
        lastModified: new Date(page.lastModified ?? new Date()),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
      ...blogPages.map((page) => ({
        url: `${baseUrl}${page.slug?.startsWith("/") ? page.slug : `/${page.slug}`}`,
        lastModified: new Date(page.lastModified ?? new Date()),
        changeFrequency: "weekly" as const,
        priority: 0.5,
      })),
    ];
  } catch {
    return entries;
  }
}
