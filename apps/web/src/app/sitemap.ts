import type { MetadataRoute } from "next";

import { getBaseUrl } from "@/config";
import { isSanityConfigured } from "@/lib/sanity/api";
import { client } from "@/lib/sanity/client";
import { querySitemapData } from "@/lib/sanity/query";

const baseUrl = getBaseUrl();

const staticRoutes = [
  "",
  "/about",
  "/coaches",
  "/contact",
  "/facilities",
  "/programs",
  "/sponsors",
  "/privacy",
  "/terms",
  "/news/seals-capture-5-medals-az-state-championships",
  "/news/summer-season-registration-now-open",
  "/news/february-2026-swimmers-of-the-month",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  if (!isSanityConfigured) {
    return staticEntries;
  }

  try {
    const { slugPages, blogPages } = await client.fetch(querySitemapData);
    return [
      ...staticEntries,
      ...slugPages.map((page) => ({
        url: `${baseUrl}${page.slug}`,
        lastModified: new Date(page.lastModified ?? new Date()),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
      ...blogPages.map((page) => ({
        url: `${baseUrl}${page.slug}`,
        lastModified: new Date(page.lastModified ?? new Date()),
        changeFrequency: "weekly" as const,
        priority: 0.5,
      })),
    ];
  } catch {
    return staticEntries;
  }
}
