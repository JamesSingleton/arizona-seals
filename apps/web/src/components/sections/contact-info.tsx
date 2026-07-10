import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ContactForm } from "./contact-form";

export type ContactInfoBlockProps = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  useSiteSettings?: boolean | null;
  email?: string | null;
  phone?: string | null;
  address?: {
    street?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
  } | null;
  settings?: {
    contactEmail?: string | null;
    contactPhone?: string | null;
    primaryAddress?: {
      street?: string | null;
      city?: string | null;
      state?: string | null;
      zip?: string | null;
    } | null;
    officeHours?: { days?: string | null; hours?: string | null }[] | null;
    inquiryTypes?: string[] | null;
    mapUrl?: string | null;
  } | null;
  showContactForm?: boolean | null;
  showForm?: boolean | null;
};

const quickLinks = [
  { label: "View All Programs", href: "/programs" },
  { label: "Meet Our Coaches", href: "/coaches" },
  { label: "About the Club", href: "/about" },
  { label: "Facility Info", href: "/facilities" },
];

export function ContactInfoBlock({
  eyebrow = "Get in Touch",
  title = "We're Here to Help",
  description = "Have a question about tryouts, programs, or the club? Fill out the form and one of our staff members will respond within 24 hours.",
  useSiteSettings = true,
  email,
  phone,
  address,
  settings,
  showContactForm,
  showForm,
}: ContactInfoBlockProps) {
  const showFormResolved = showContactForm ?? showForm ?? true;
  const resolvedEmail =
    useSiteSettings !== false
      ? (settings?.contactEmail ?? email)
      : (email ?? settings?.contactEmail);
  const resolvedPhone =
    useSiteSettings !== false
      ? (settings?.contactPhone ?? phone)
      : (phone ?? settings?.contactPhone);
  const resolvedAddress =
    useSiteSettings !== false
      ? (settings?.primaryAddress ?? address)
      : (address ?? settings?.primaryAddress);
  const mapUrl =
    settings?.mapUrl ||
    "https://maps.google.com/?q=44345+MLK+Jr+Blvd+Maricopa+AZ+85138";
  const inquiryTypes = settings?.inquiryTypes?.filter(Boolean) ?? [];

  return (
    <>
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1">
              {eyebrow ? (
                <p className="mb-3 font-display text-sm font-bold tracking-[0.2em] text-cyan-brand uppercase">
                  {eyebrow}
                </p>
              ) : null}
              <h2 className="mb-5 font-display text-3xl font-bold text-balance text-navy uppercase">
                {title}
              </h2>
              {description ? (
                <p className="mb-8 leading-relaxed text-seal-gray">
                  {description}
                </p>
              ) : null}

              <div className="mb-10 flex flex-col gap-5">
                {resolvedAddress ? (
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#E8F6FD]">
                      <MapPin size={18} className="text-cyan-brand" />
                    </div>
                    <div>
                      <p className="mb-0.5 text-sm font-bold text-navy">
                        Primary Location
                      </p>
                      <p className="text-sm text-seal-gray">
                        {resolvedAddress.street}
                        <br />
                        {[resolvedAddress.city, resolvedAddress.state]
                          .filter(Boolean)
                          .join(", ")}{" "}
                        {resolvedAddress.zip}
                      </p>
                    </div>
                  </div>
                ) : null}

                {resolvedPhone ? (
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#E8F6FD]">
                      <Phone size={18} className="text-cyan-brand" />
                    </div>
                    <div>
                      <p className="mb-0.5 text-sm font-bold text-navy">
                        Phone
                      </p>
                      <a
                        href={`tel:${resolvedPhone.replace(/[^\d+]/g, "")}`}
                        className="text-sm text-seal-gray transition-colors hover:text-cyan-brand"
                      >
                        {resolvedPhone}
                      </a>
                    </div>
                  </div>
                ) : null}

                {resolvedEmail ? (
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#E8F6FD]">
                      <Mail size={18} className="text-cyan-brand" />
                    </div>
                    <div>
                      <p className="mb-0.5 text-sm font-bold text-navy">
                        Email
                      </p>
                      <a
                        href={`mailto:${resolvedEmail}`}
                        className="text-sm text-seal-gray transition-colors hover:text-cyan-brand"
                      >
                        {resolvedEmail}
                      </a>
                    </div>
                  </div>
                ) : null}

                {settings?.officeHours?.length ? (
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#E8F6FD]">
                      <Clock size={18} className="text-cyan-brand" />
                    </div>
                    <div>
                      <p className="mb-0.5 text-sm font-bold text-navy">
                        Office Hours
                      </p>
                      {settings.officeHours.map((row) => (
                        <p
                          key={`${row.days}-${row.hours}`}
                          className="text-sm text-seal-gray"
                        >
                          {row.days}
                          {row.hours ? `: ${row.hours}` : null}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="rounded-xl bg-navy p-6">
                <p className="mb-4 font-display text-sm font-bold tracking-wide text-white uppercase">
                  Quick Links
                </p>
                <div className="flex flex-col gap-2">
                  {quickLinks.map((l) => (
                    <Link
                      key={l.label}
                      href={l.href}
                      className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-cyan-on-navy"
                    >
                      <span className="size-1 rounded-full bg-cyan-on-navy" />
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              {showFormResolved ? (
                <ContactForm inquiryTypes={inquiryTypes} />
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex h-72 items-center justify-center overflow-hidden bg-muted">
        <Image
          src="/placeholder.svg?height=400&width=1600"
          alt="Map location"
          fill
          className="object-cover opacity-40"
        />
        <div className="relative z-10 mx-4 max-w-md rounded-xl bg-background/95 p-6 text-center shadow-lg backdrop-blur">
          <p className="mb-1 font-display text-lg font-bold text-navy uppercase">
            Copper Sky Aquatic Center
          </p>
          <p className="mb-4 text-sm text-seal-gray">
            {resolvedAddress?.street}
            <br />
            {[resolvedAddress?.city, resolvedAddress?.state]
              .filter(Boolean)
              .join(", ")}{" "}
            {resolvedAddress?.zip}
          </p>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-display text-sm font-bold tracking-wide text-cyan-brand uppercase"
          >
            <MapPin size={14} />
            Open in Google Maps
          </a>
        </div>
      </section>
    </>
  );
}
