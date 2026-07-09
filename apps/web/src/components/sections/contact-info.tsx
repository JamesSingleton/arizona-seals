import {
  buttonCtaClassName,
  buttonVariants,
} from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

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
  } | null;
  showContactForm?: boolean | null;
};

export function ContactInfoBlock({
  eyebrow = "Get In Touch",
  title = "Contact Us",
  description,
  useSiteSettings = true,
  email,
  phone,
  address,
  settings,
  showContactForm = true,
}: ContactInfoBlockProps) {
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

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          {eyebrow && (
            <p className="mb-2 font-display text-sm font-bold tracking-[0.2em] text-cyan-brand uppercase">
              {eyebrow}
            </p>
          )}
          <h2 className="font-display text-4xl font-bold text-foreground uppercase md:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-base leading-relaxed text-seal-gray">
              {description}
            </p>
          )}
        </div>

        <ul className="space-y-4">
          {resolvedAddress && (
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-cyan-brand" />
              <span className="text-sm text-seal-gray">
                {resolvedAddress.street}
                {resolvedAddress.street && <br />}
                {[resolvedAddress.city, resolvedAddress.state]
                  .filter(Boolean)
                  .join(", ")}{" "}
                {resolvedAddress.zip}
              </span>
            </li>
          )}
          {resolvedPhone && (
            <li className="flex items-center gap-3">
              <Phone className="size-5 shrink-0 text-cyan-brand" />
              <a
                href={`tel:${resolvedPhone}`}
                className="text-sm text-seal-gray transition-colors hover:text-cyan-brand"
              >
                {resolvedPhone}
              </a>
            </li>
          )}
          {resolvedEmail && (
            <li className="flex items-center gap-3">
              <Mail className="size-5 shrink-0 text-cyan-brand" />
              <a
                href={`mailto:${resolvedEmail}`}
                className="text-sm text-seal-gray transition-colors hover:text-cyan-brand"
              >
                {resolvedEmail}
              </a>
            </li>
          )}
        </ul>

        {settings?.officeHours && settings.officeHours.length > 0 && (
          <div className="mt-8">
            <p className="mb-2 font-display text-xs font-bold tracking-widest text-foreground uppercase">
              Office Hours
            </p>
            <ul className="space-y-1">
              {settings.officeHours.map((row) => (
                <li
                  key={`${row.days}-${row.hours}`}
                  className="text-sm text-seal-gray"
                >
                  <span className="font-medium">{row.days}</span>
                  {row.hours ? ` — ${row.hours}` : null}
                </li>
              ))}
            </ul>
          </div>
        )}

        {showContactForm !== false && (
          <div className="mt-10">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                buttonCtaClassName,
              )}
            >
              Contact Form
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
