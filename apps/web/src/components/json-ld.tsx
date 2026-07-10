import { client, urlFor } from "@workspace/sanity/client";
import { querySettingsData } from "@workspace/sanity/query";
import type {
  QueryBlogSlugPageDataResult,
  QuerySettingsDataResult,
} from "@workspace/sanity/types";
import { stegaClean } from "next-sanity";
import type {
  Answer,
  Article,
  BreadcrumbList,
  ContactPoint,
  FAQPage,
  ImageObject,
  ListItem,
  Organization,
  Person,
  PostalAddress,
  Question,
  SportsClub,
  WebPage,
  WebSite,
  WithContext,
} from "schema-dts";

import { getBaseUrl, handleErrors } from "@/utils";

interface RichTextChild {
  _type: string;
  text?: string;
  marks?: string[];
  _key: string;
}

interface RichTextBlock {
  _type: string;
  children?: RichTextChild[];
  style?: string;
  _key: string;
}

// Flexible FAQ type that can accept different rich text structures
interface FlexibleFaq {
  _id: string;
  title: string;
  richText?: RichTextBlock[] | null;
}

// Utility function to safely extract plain text from rich text blocks
function extractPlainTextFromRichText(
  richText: RichTextBlock[] | null | undefined,
): string {
  if (!Array.isArray(richText)) return "";

  return richText
    .filter((block) => block._type === "block" && Array.isArray(block.children))
    .map(
      (block) =>
        block.children
          ?.filter((child) => child._type === "span" && Boolean(child.text))
          .map((child) => child.text)
          .join("") ?? "",
    )
    .join(" ")
    .trim();
}

// Utility function to safely render JSON-LD
export function JsonLdScript<T>({ data, id }: { data: T; id: string }) {
  return (
    <script type="application/ld+json" id={id}>
      {JSON.stringify(data, null, 0)}
    </script>
  );
}

// FAQ JSON-LD Component
interface FaqJsonLdProps {
  faqs: FlexibleFaq[];
}

export function FaqJsonLd({ faqs }: FaqJsonLdProps) {
  if (!faqs?.length) return null;

  const validFaqs = faqs.filter((faq) => faq?.title && faq?.richText);

  if (!validFaqs.length) return null;

  const faqJsonLd: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: validFaqs.map(
      (faq): Question => ({
        "@type": "Question",
        name: faq.title,
        acceptedAnswer: {
          "@type": "Answer",
          text: extractPlainTextFromRichText(faq.richText),
        } as Answer,
      }),
    ),
  };

  return <JsonLdScript data={faqJsonLd} id="faq-json-ld" />;
}

function buildSafeImageUrl(image?: { id?: string | null }) {
  if (!image?.id) {
    return undefined;
  }
  return urlFor({ ...image, _id: image.id })
    .size(1920, 1080)
    .dpr(2)
    .auto("format")
    .quality(80)
    .url();
}

// Article JSON-LD Component
interface ArticleJsonLdProps {
  article: QueryBlogSlugPageDataResult;
  settings?: QuerySettingsDataResult;
}
export function ArticleJsonLd({ article, settings }: ArticleJsonLdProps) {
  if (!article) return null;

  const baseUrl = getBaseUrl();
  const articleUrl = `${baseUrl}${article.slug}`;
  const imageUrl = buildSafeImageUrl(article.image);

  const articleJsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description || undefined,
    image: imageUrl ? [imageUrl] : undefined,
    author: article.authors
      ? [
          {
            "@type": "Person",
            name: article.authors.name,
            url: `${baseUrl}`,
            image: article.authors.image
              ? ({
                  "@type": "ImageObject",
                  url: buildSafeImageUrl(article.authors.image),
                } as ImageObject)
              : undefined,
          } as Person,
        ]
      : [],
    publisher: {
      "@type": "Organization",
      name: settings?.siteTitle || "Website",
      logo: settings?.logo
        ? ({
            "@type": "ImageObject",
            url: settings.logo,
          } as ImageObject)
        : undefined,
    } as Organization,
    datePublished: new Date(
      article.publishedAt || article._createdAt || new Date().toISOString(),
    ).toISOString(),
    dateModified: new Date(
      article._updatedAt || new Date().toISOString(),
    ).toISOString(),
    url: articleUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    } as WebPage,
  };

  return (
    <JsonLdScript data={articleJsonLd} id={`article-json-ld-${article.slug}`} />
  );
}

function formatPhoneToE164(phone?: string | null): string | undefined {
  if (!phone) return undefined;
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return phone;
}

// Organization JSON-LD Component (SportsClub for local swim-team search)
interface OrganizationJsonLdProps {
  settings: QuerySettingsDataResult;
}

export function OrganizationJsonLd({ settings }: OrganizationJsonLdProps) {
  if (!settings) return null;

  const baseUrl = getBaseUrl();
  const address = settings.primaryAddress;
  const phone = formatPhoneToE164(settings.contactPhone);

  const socialLinks = settings.socialLinks
    ? (Object.values(settings.socialLinks).filter(Boolean) as string[])
    : undefined;

  const organizationJsonLd: WithContext<SportsClub> = {
    "@context": "https://schema.org",
    "@type": "SportsClub",
    name: settings.siteTitle!,
    description: settings.siteDescription!,
    url: baseUrl,
    logo: settings.logo
      ? ({
          "@type": "ImageObject",
          url: settings.logo,
        } as ImageObject)
      : undefined,
    image: settings.logo || undefined,
    email: settings.contactEmail || undefined,
    telephone: phone,
    address: address?.street
      ? ({
          "@type": "PostalAddress",
          streetAddress: address.street,
          addressLocality: address.city,
          addressRegion: address.state,
          postalCode: address.zip,
          addressCountry: "US",
        } as PostalAddress)
      : undefined,
    areaServed: address?.city
      ? {
          "@type": "City",
          name: `${address.city}${address.state ? `, ${address.state}` : ""}`,
        }
      : undefined,
    contactPoint:
      settings.contactEmail || phone
        ? ({
            "@type": "ContactPoint",
            email: settings.contactEmail || undefined,
            telephone: phone,
            contactType: "customer service",
            areaServed: "US",
            availableLanguage: "English",
          } as ContactPoint)
        : undefined,
    sameAs: socialLinks?.length ? socialLinks : undefined,
    knowsAbout: ["Competitive swimming", "USA Swimming", "Youth athletics"],
  };

  return <JsonLdScript data={organizationJsonLd} id="organization-json-ld" />;
}

// Breadcrumb JSON-LD
export type BreadcrumbItem = {
  name: string;
  path: string;
};

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  if (!items?.length) return null;

  const baseUrl = getBaseUrl();
  const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(
      (crumb, index): ListItem => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item:
          crumb.path === "/"
            ? baseUrl
            : `${baseUrl}${crumb.path.startsWith("/") ? crumb.path : `/${crumb.path}`}`,
      }),
    ),
  };

  return <JsonLdScript data={breadcrumbJsonLd} id="breadcrumb-json-ld" />;
}

// Website JSON-LD Component
interface WebSiteJsonLdProps {
  settings: QuerySettingsDataResult;
}

export function WebSiteJsonLd({ settings }: WebSiteJsonLdProps) {
  if (!settings) return null;

  const baseUrl = getBaseUrl();

  const websiteJsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.siteTitle!,
    description: settings.siteDescription || undefined,
    url: baseUrl,
    publisher: {
      "@type": "Organization",
      name: settings.siteTitle,
    } as Organization,
  };

  return <JsonLdScript data={websiteJsonLd} id="website-json-ld" />;
}

// Combined JSON-LD Component for pages with multiple structured data
interface CombinedJsonLdProps {
  settings?: QuerySettingsDataResult;
  article?: QueryBlogSlugPageDataResult;
  faqs?: FlexibleFaq[];
  includeWebsite?: boolean;
  includeOrganization?: boolean;
}

export async function CombinedJsonLd({
  includeWebsite = false,
  includeOrganization = false,
}: CombinedJsonLdProps) {
  const [res] = await handleErrors(client.fetch(querySettingsData));

  const cleanSettings = stegaClean(res);
  return (
    <>
      {includeWebsite && cleanSettings ? (
        <WebSiteJsonLd settings={cleanSettings} />
      ) : null}
      {includeOrganization && cleanSettings ? (
        <OrganizationJsonLd settings={cleanSettings} />
      ) : null}
    </>
  );
}
