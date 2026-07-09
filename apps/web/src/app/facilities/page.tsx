import { Badge } from "@workspace/ui/components/badge";
import {
  buttonCtaClassName,
  buttonVariants,
} from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { Clock, ExternalLink, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/page-hero";
import { primaryFacility } from "@/content/facilities";

export default function FacilitiesPage() {
  const facility = primaryFacility;

  return (
    <main>
      <PageHero
        title="Our Facilities"
        subtitle="World-class aquatic facilities in Maricopa, Arizona"
        backgroundImage="/placeholder.svg?height=480&width=1600"
      />

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="mb-2 font-display text-sm font-bold tracking-[0.2em] text-cyan-brand uppercase">
              Where We Train
            </p>
            <h2 className="font-display text-4xl font-bold text-balance text-foreground uppercase md:text-5xl">
              {facility.shortName}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-seal-gray">
              {facility.description}
            </p>
          </div>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="relative h-80 overflow-hidden rounded-2xl shadow-xl md:h-[440px]">
              <Image
                src={facility.image}
                alt={facility.name}
                fill
                className="object-cover"
              />
              <Badge className="absolute top-4 left-4 rounded border-0 bg-cyan-brand px-3 py-1.5 text-xs font-bold tracking-wide text-primary-foreground uppercase">
                Primary Training Facility
              </Badge>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <h3 className="mb-3 font-display text-3xl font-bold text-foreground uppercase">
                  {facility.name}
                </h3>
                <p className="leading-relaxed text-seal-gray">
                  {facility.longDescription}
                </p>
              </div>

              <div className="flex flex-col gap-3 rounded-xl bg-muted p-5">
                <div className="flex items-start gap-3">
                  <MapPin
                    size={16}
                    className="mt-0.5 shrink-0 text-cyan-brand"
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {facility.address.street}
                    </p>
                    <p className="text-sm text-seal-gray">
                      {facility.address.city}, {facility.address.state}{" "}
                      {facility.address.zip}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock
                    size={16}
                    className="mt-0.5 shrink-0 text-cyan-brand"
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {facility.hours.label}
                    </p>
                    {facility.hours.hours.map((h) => (
                      <p key={h} className="text-sm text-seal-gray">
                        {h}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="shrink-0 text-cyan-brand" />
                  <a
                    href={facility.phoneHref}
                    className="text-sm font-medium text-cyan-brand transition-colors hover:text-foreground"
                  >
                    {facility.phone}
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={facility.mapsUrl}
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
              </div>
              <p className="mt-3 max-w-sm text-xs leading-relaxed text-seal-gray">
                {facility.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-2 font-display text-sm font-bold tracking-[0.2em] text-cyan-brand uppercase">
              What We Have
            </p>
            <h2 className="font-display text-4xl font-bold text-balance text-white uppercase">
              Facility Amenities
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facility.features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
              >
                <h4 className="mb-2 font-display text-base leading-tight font-bold text-white uppercase">
                  {f.title}
                </h4>
                <p className="text-sm leading-relaxed text-white/80">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-balance text-foreground uppercase md:text-4xl">
            Ready to Train With Us?
          </h2>
          <p className="mb-8 leading-relaxed text-seal-gray">
            Come see Copper Sky for yourself. Our coaches and staff are ready to
            welcome you to the Arizona Seals family.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "default", size: "xl" }),
                buttonCtaClassName,
              )}
            >
              Contact Us
            </Link>
            <Link
              href="/programs"
              className={cn(
                buttonVariants({ variant: "outlineStrong", size: "xl" }),
                buttonCtaClassName,
              )}
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
