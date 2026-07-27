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

const DEFAULT_SERVICE_AREAS = [
  { placeType: "City" as const, name: "Maricopa" },
  { placeType: "City" as const, name: "Casa Grande" },
  { placeType: "City" as const, name: "Coolidge" },
  { placeType: "City" as const, name: "Eloy" },
  { placeType: "City" as const, name: "Florence" },
  { placeType: "City" as const, name: "San Tan Valley" },
  { placeType: "City" as const, name: "Arizona City" },
  {
    placeType: "AdministrativeArea" as const,
    name: "Ak-Chin Indian Community",
  },
  { placeType: "AdministrativeArea" as const, name: "Pinal County" },
];

type ServiceAreaPlace = {
  name?: string | null;
  placeType?: string | null;
};

function buildAreaServed(areas: ServiceAreaPlace[] | null | undefined) {
  const source =
    areas?.filter((area): area is { name: string; placeType?: string | null } =>
      Boolean(area?.name),
    ) ?? DEFAULT_SERVICE_AREAS;

  if (!source.length) return undefined;

  return source.map((area) =>
    area.placeType === "AdministrativeArea"
      ? ({
          "@type": "AdministrativeArea" as const,
          name: area.name,
        } as const)
      : ({
          "@type": "City" as const,
          name: area.name,
        } as const),
  );
}

function buildOpeningHours(
  officeHours:
    | { days?: string | null; hours?: string | null }[]
    | null
    | undefined,
) {
  if (!officeHours?.length) return undefined;
  const hours = officeHours
    .filter((row) => row.days && row.hours)
    .map((row) => `${row.days} ${row.hours}`);
  return hours.length ? hours : undefined;
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
  const areaServed = buildAreaServed(settings.serviceAreas);
  const openingHours = buildOpeningHours(settings.officeHours);
  const geo =
    typeof settings.geo?.lat === "number" &&
    typeof settings.geo?.lng === "number"
      ? {
          "@type": "GeoCoordinates" as const,
          latitude: settings.geo.lat,
          longitude: settings.geo.lng,
        }
      : undefined;

  const socialLinks = settings.socialLinks
    ? (Object.values(settings.socialLinks).filter(Boolean) as string[])
    : undefined;

  const organizationJsonLd = {
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
    geo,
    areaServed,
    openingHours,
    // schema-dts SportsClub omits sport; valid Schema.org property
    sport: "Competitive Swimming",
    location: address?.street
      ? {
          "@type": "SportsActivityLocation",
          name: "Copper Sky Aquatic Center",
          address: {
            "@type": "PostalAddress",
            streetAddress: address.street,
            addressLocality: address.city,
            addressRegion: address.state,
            postalCode: address.zip,
            addressCountry: "US",
          } as PostalAddress,
          geo,
        }
      : undefined,
    contactPoint:
      settings.contactEmail || phone
        ? ({
            "@type": "ContactPoint",
            email: settings.contactEmail || undefined,
            telephone: phone,
            contactType: "customer service",
            areaServed: areaServed ?? "AZ",
            availableLanguage: "English",
          } as ContactPoint)
        : undefined,
    sameAs: socialLinks?.length ? socialLinks : undefined,
    memberOf: {
      "@type": "Organization",
      name: "USA Swimming",
    },
    knowsAbout: [
      "Competitive swimming",
      "USA Swimming",
      "Youth athletics",
      "Youth swim team",
      "Competitive swimming club",
    ],
  } as WithContext<SportsClub>;

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
