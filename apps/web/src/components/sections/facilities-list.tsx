import { trackClick } from "@workspace/analytics";
import { Badge } from "@workspace/ui/components/badge";
import {
  buttonCtaClassName,
  buttonVariants,
} from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { Clock, ExternalLink, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import type { SanityImageProps } from "@/types";
import {
  objectPositionFromHotspot,
  SanityImage,
} from "../elements/sanity-image";

export type FacilitiesListFacility = {
  _id?: string;
  name?: string | null;
  subtitle?: string | null;
  description?: string | null;
  longDescription?: string | null;
  address?: {
    street?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
  } | null;
  phone?: string | null;
  hours?: {
    label?: string | null;
    periods?: string[] | null;
  } | null;
  features?:
    | {
        _key?: string;
        title?: string | null;
        description?: string | null;
      }[]
    | null;
  image?: SanityImageProps | null;
  mapUrl?: string | null;
  citySiteUrl?: string | null;
  disclaimer?: string | null;
  isPrimary?: boolean | null;
};

export type FacilitiesListProps = {
  eyebrow?: string | null;
  title?: string | null;
  intro?: string | null;
  facilities?: FacilitiesListFacility[] | null;
};

function FacilityCard({ facility }: { facility: FacilitiesListFacility }) {
  const phoneHref = facility.phone
    ? `tel:${facility.phone.replace(/[^\d+]/g, "")}`
    : undefined;
  const periods = facility.hours?.periods?.filter(Boolean) ?? [];

  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
      <div className="relative h-80 overflow-hidden bg-muted md:h-[30rem]">
        {facility.image?.id ? (
          <SanityImage
            image={facility.image}
            width={1200}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="absolute inset-0 size-full object-cover"
            style={{
              objectPosition: objectPositionFromHotspot(facility.image.hotspot),
            }}
          />
        ) : null}
        {facility.isPrimary ? (
          <Badge className="label absolute top-0 left-0 h-auto rounded-none border-0 bg-navy px-4 py-2 text-sm text-white">
            Primary Training Facility
          </Badge>
        ) : null}
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h3 className="mb-3 text-4xl text-foreground md:text-5xl">
            {facility.name}
          </h3>
          {facility.longDescription || facility.description ? (
            <p className="text-lg leading-relaxed text-seal-gray">
              {facility.longDescription || facility.description}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-4 border-l-[6px] border-cyan-brand bg-water p-6">
          {facility.address ? (
            <div className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-cyan-brand" />
              <div>
                {facility.address.street ? (
                  <p className="text-base font-semibold text-foreground">
                    {facility.address.street}
                  </p>
                ) : null}
                <p className="text-base text-seal-gray">
                  {[facility.address.city, facility.address.state]
                    .filter(Boolean)
                    .join(", ")}{" "}
                  {facility.address.zip}
                </p>
              </div>
            </div>
          ) : null}

          {periods.length > 0 ? (
            <div className="flex items-start gap-3">
              <Clock size={16} className="mt-0.5 shrink-0 text-cyan-brand" />
              <div>
                <p className="text-base font-semibold text-foreground">
                  {facility.hours?.label || "Hours"}
                </p>
                {periods.map((h) => (
                  <p key={h} className="text-sm text-seal-gray">
                    {h}
                  </p>
                ))}
              </div>
            </div>
          ) : null}

          {facility.phone && phoneHref ? (
            <div className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-cyan-brand" />
              <a
                href={phoneHref}
                {...trackClick("contact_method_clicked", {
                  method: "phone",
                  placement: "facility_card",
                })}
                className="text-sm font-medium text-cyan-brand transition-colors hover:text-foreground"
              >
                {facility.phone}
              </a>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {facility.mapUrl ? (
            <a
              href={facility.mapUrl}
              {...trackClick("outbound_link_clicked", {
                link_type: "map",
                placement: "facility_card",
                url: facility.mapUrl,
                label: facility.name ?? undefined,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                buttonCtaClassName,
              )}
            >
              <MapPin size={14} />
              Get Directions
              <ExternalLink size={12} />
            </a>
          ) : null}
          {facility.citySiteUrl ? (
            <a
              href={facility.citySiteUrl}
              {...trackClick("outbound_link_clicked", {
                link_type: "partner",
                placement: "facility_card",
                url: facility.citySiteUrl,
                label: "City of Maricopa",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                buttonCtaClassName,
              )}
            >
              City of Maricopa Site
              <ExternalLink size={12} />
            </a>
          ) : null}
        </div>

        {facility.disclaimer ? (
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-seal-gray">
            {facility.disclaimer}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function FacilitiesList({
  title = "Copper Sky Regional Park",
  intro,
  facilities,
}: FacilitiesListProps) {
  if (!facilities?.length) return null;

  const primary = facilities[0];
  const features = primary?.features?.filter((f) => f.title) ?? [];
  const introText =
    intro ||
    primary?.description ||
    "Arizona Seals trains at the premier aquatic facility in Maricopa. Copper Sky offers a competition pool and everything our athletes need to excel.";

  return (
    <>
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="mb-16 text-center">
            {title ? (
              <h2 className="section-title text-foreground">{title}</h2>
            ) : null}
            {introText ? (
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-seal-gray">
                {introText}
              </p>
            ) : null}
          </div>

          <div className="space-y-24">
            {facilities.map((facility) => (
              <FacilityCard
                key={facility._id ?? facility.name}
                facility={facility}
              />
            ))}
          </div>
        </div>
      </section>

      {features.length > 0 ? (
        <section className="on-dark bg-navy py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
            <div className="mb-12 text-center">
              <h2 className="section-title text-white">Facility Amenities</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f) => (
                <div
                  key={f._key ?? f.title}
                  className="border-t-[6px] border-pool bg-white/5 p-6"
                >
                  <h3 className="mb-2 text-2xl text-white">{f.title}</h3>
                  {f.description ? (
                    <p className="leading-relaxed text-white/80">
                      {f.description}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-water py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="section-title mb-4 text-foreground">
            Ready to Train With Us?
          </h2>
          <p className="mb-9 text-lg leading-relaxed text-seal-gray">
            Come see Copper Sky for yourself. Our coaches and staff are ready to
            welcome you to the Arizona Seals family, whether you are coming from
            Maricopa, Casa Grande, Coolidge, or anywhere else in Pinal County.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/tryouts"
              {...trackClick("marketing_cta_clicked", {
                cta_label: "Schedule a tryout",
                cta_href: "/tryouts",
                placement: "facilities_footer",
              })}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                buttonCtaClassName,
              )}
            >
              Schedule a tryout
            </Link>
            <Link
              href="/programs"
              {...trackClick("marketing_cta_clicked", {
                cta_label: "View Programs",
                cta_href: "/programs",
                placement: "facilities_footer",
              })}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                buttonCtaClassName,
              )}
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
