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
      <div className="relative h-80 overflow-hidden rounded-2xl bg-muted shadow-xl md:h-[440px]">
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
          <Badge className="absolute top-4 left-4 rounded border-0 bg-cyan-brand px-3 py-1.5 text-xs font-bold tracking-wide text-primary-foreground uppercase">
            Primary Training Facility
          </Badge>
        ) : null}
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h3 className="mb-3 font-display text-3xl font-bold text-foreground uppercase">
            {facility.name}
          </h3>
          {facility.longDescription || facility.description ? (
            <p className="leading-relaxed text-seal-gray">
              {facility.longDescription || facility.description}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 rounded-xl bg-muted p-5">
          {facility.address ? (
            <div className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-cyan-brand" />
              <div>
                {facility.address.street ? (
                  <p className="text-sm font-semibold text-foreground">
                    {facility.address.street}
                  </p>
                ) : null}
                <p className="text-sm text-seal-gray">
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
                <p className="text-sm font-semibold text-foreground">
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
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outlineStrong", size: "lg" }),
                buttonCtaClassName,
              )}
            >
              City of Maricopa Site
              <ExternalLink size={12} />
            </a>
          ) : null}
        </div>

        {facility.disclaimer ? (
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-seal-gray">
            {facility.disclaimer}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function FacilitiesList({
  eyebrow = "Where We Train",
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
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            {eyebrow ? (
              <p className="mb-2 font-display text-sm font-bold tracking-[0.2em] text-cyan-brand uppercase">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="font-display text-4xl font-bold text-balance text-foreground uppercase md:text-5xl">
                {title}
              </h2>
            ) : null}
            {introText ? (
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-seal-gray">
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
        <section className="bg-navy py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="mb-2 font-display text-sm font-bold tracking-[0.2em] text-cyan-on-navy uppercase">
                What We Have
              </p>
              <h2 className="font-display text-4xl font-bold text-balance text-white uppercase">
                Facility Amenities
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f) => (
                <div
                  key={f._key ?? f.title}
                  className="rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <h3 className="mb-2 font-display text-base leading-tight font-bold text-white uppercase">
                    {f.title}
                  </h3>
                  {f.description ? (
                    <p className="text-sm leading-relaxed text-white/80">
                      {f.description}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-balance text-foreground uppercase md:text-4xl">
            Ready to Train With Us?
          </h2>
          <p className="mb-8 leading-relaxed text-seal-gray">
            Come see Copper Sky for yourself. Our coaches and staff are ready to
            welcome you to the Arizona Seals family, whether you are coming from
            Maricopa, Casa Grande, Coolidge, or anywhere else in Pinal County.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                buttonCtaClassName,
              )}
            >
              Contact Us
            </Link>
            <Link
              href="/programs"
              className={cn(
                buttonVariants({ variant: "outlineStrong", size: "lg" }),
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
