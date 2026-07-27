import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@workspace/sanity/client";
import type { Metadata } from "next";

import type { Maybe } from "@/types";
import { capitalize, getBaseUrl } from "@/utils";

// Site-wide configuration interface
interface SiteConfig {
  title: string;
  description: string;
  twitterHandle: string;
  keywords: string[];
}

// Page-specific SEO data interface
interface PageSeoData extends Metadata {
  title?: string;
  description?: string;
  slug?: string;
  contentId?: string;
  contentType?: string;
  keywords?: string[];
  seoNoIndex?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  /** Absolute URL for Open Graph / Twitter image override */
  seoImage?: string;
  pageType?: Extract<Metadata["openGraph"], { type: string }>["type"];
}

// OpenGraph image generation parameters
interface OgImageParams {
  type?: string;
  id?: string;
}

// Default site configuration
const siteConfig: SiteConfig = {
  title: "Arizona Seals Swimming",
  description:
    "Competitive swim team in Maricopa, AZ serving all of Pinal County. USA Swimming sanctioned, four training groups for ages 5 and up. Schedule a tryout today.",
  twitterHandle: "@arizonaseals",
  keywords: [
    "competitive swim team",
    "swim club",
    "swim team",
    "swim club near me",
    "swim team near me",
    "USA Swimming",
    "Arizona",
    "Maricopa",
    "Casa Grande",
    "Coolidge",
    "Eloy",
    "Florence",
    "Pinal County",
  ],
};

function generateOgImageUrl(params: OgImageParams = {}): string {
  const { type, id } = params;
  const searchParams = new URLSearchParams();

  if (id) searchParams.set("id", id);
  if (type) searchParams.set("type", type);

  const baseUrl = getBaseUrl();
  return `${baseUrl}/api/og?${searchParams.toString()}`;
}

/** Resolve a Sanity seoImage field to a CDN URL for Open Graph tags. */
export function resolveSeoImageUrl(
  seoImage?: SanityImageSource | null,
): string | undefined {
  if (!seoImage) return undefined;
  try {
    return urlFor(seoImage).width(1200).height(630).fit("crop").url();
  } catch {
    return undefined;
  }
}

function buildPageUrl({
  baseUrl,
  slug,
}: {
  baseUrl: string;
  slug: string;
}): string {
  const normalizedSlug = slug.startsWith("/") ? slug : `/${slug}`;
  return `${baseUrl}${normalizedSlug}`;
}

function extractTitle({
  pageTitle,
  slug,
  siteTitle,
}: {
  pageTitle?: Maybe<string>;
  slug: string;
  siteTitle: string;
}): string {
  if (pageTitle) return pageTitle;
  if (slug && slug !== "/") return capitalize(slug.replace(/^\//, ""));
  return siteTitle;
}

export function getSEOMetadata(page: PageSeoData = {}): Metadata {
  const {
    title: pageTitle,
    description: pageDescription,
    slug = "/",
    contentId,
    contentType,
    keywords: pageKeywords = [],
    seoNoIndex = false,
    ogTitle,
    ogDescription,
    seoImage,
    pageType = "website",
    ...pageOverrides
  } = page;

  const baseUrl = getBaseUrl();
  const pageUrl = buildPageUrl({ baseUrl, slug });

  // Build default metadata values
  const defaultTitle = extractTitle({
    pageTitle,
    slug,
    siteTitle: siteConfig.title,
  });
  const defaultDescription = pageDescription || siteConfig.description;
  const allKeywords = [...siteConfig.keywords, ...pageKeywords];

  const ogImage = seoImage
    ? seoImage
    : generateOgImageUrl({
        type: contentType,
        id: contentId,
      });

  const socialTitle = ogTitle || defaultTitle;
  const socialDescription = ogDescription || defaultDescription;

  const fullTitle =
    defaultTitle === siteConfig.title
      ? defaultTitle
      : `${defaultTitle} | ${siteConfig.title}`;

  // Build default metadata object
  const defaultMetadata: Metadata = {
    // absolute: layout title.template would otherwise append the brand again
    title: { absolute: fullTitle },
    description: defaultDescription,
    metadataBase: new URL(baseUrl),
    creator: siteConfig.title,
    authors: [{ name: siteConfig.title }],
    icons: {
      icon: [
        { url: "/favicon.ico" },
        {
          url: "/icon-light-32x32.png",
          media: "(prefers-color-scheme: light)",
        },
        {
          url: "/icon-dark-32x32.png",
          media: "(prefers-color-scheme: dark)",
        },
      ],
      apple: "/apple-icon.png",
    },

    keywords: allKeywords,
    robots: seoNoIndex ? "noindex, nofollow" : "index, follow",
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
      creator: siteConfig.twitterHandle,
      title: socialTitle,
      description: socialDescription,
    },
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: pageType ?? "website",
      locale: "en_US",
      siteName: siteConfig.title,
      countryName: "United States",
      description: socialDescription,
      title: socialTitle,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: socialTitle,
          secureUrl: ogImage,
        },
      ],
      url: pageUrl,
    },
  };

  // Override any defaults with page-specific metadata
  return {
    ...defaultMetadata,
    ...pageOverrides,
  };
}
