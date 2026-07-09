"use client";

import {
  Button,
  buttonCtaClassName,
  buttonVariants,
} from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { PageHero } from "@/components/page-hero";
import {
  contactInfo,
  contactQuickLinks,
  inquiryTypes,
} from "@/content/contact";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you"
        backgroundImage="/placeholder.svg?height=480&width=1600"
      />

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <p className="mb-3 font-display text-sm font-bold tracking-[0.2em] text-cyan-brand uppercase">
                Get in Touch
              </p>
              <h2 className="mb-5 font-display text-3xl font-bold text-balance text-foreground uppercase">
                We&apos;re Here to Help
              </h2>
              <p className="mb-8 leading-relaxed text-seal-gray">
                Have a question about tryouts, programs, or the club? Fill out
                the form and one of our staff members will respond within 24
                hours.
              </p>

              <div className="mb-10 flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent">
                    <MapPin size={18} className="text-cyan-brand" />
                  </div>
                  <div>
                    <p className="mb-0.5 text-sm font-bold text-foreground">
                      {contactInfo.address.label}
                    </p>
                    {contactInfo.address.lines.map((line) => (
                      <p key={line} className="text-sm text-seal-gray">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent">
                    <Phone size={18} className="text-cyan-brand" />
                  </div>
                  <div>
                    <p className="mb-0.5 text-sm font-bold text-foreground">
                      {contactInfo.phone.label}
                    </p>
                    <a
                      href={contactInfo.phone.href}
                      className="text-sm text-seal-gray transition-colors hover:text-cyan-brand"
                    >
                      {contactInfo.phone.display}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent">
                    <Mail size={18} className="text-cyan-brand" />
                  </div>
                  <div>
                    <p className="mb-0.5 text-sm font-bold text-foreground">
                      {contactInfo.email.label}
                    </p>
                    <a
                      href={contactInfo.email.href}
                      className="text-sm text-seal-gray transition-colors hover:text-cyan-brand"
                    >
                      {contactInfo.email.display}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent">
                    <Clock size={18} className="text-cyan-brand" />
                  </div>
                  <div>
                    <p className="mb-0.5 text-sm font-bold text-foreground">
                      {contactInfo.hours.label}
                    </p>
                    {contactInfo.hours.lines.map((line) => (
                      <p key={line} className="text-sm text-seal-gray">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-navy p-6">
                <p className="mb-4 font-display text-sm font-bold tracking-wide text-white uppercase">
                  Quick Links
                </p>
                <div className="flex flex-col gap-2">
                  {contactQuickLinks.map((l) => (
                    <Link
                      key={l.label}
                      href={l.href}
                      className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-cyan-brand"
                    >
                      <span className="h-1 w-1 rounded-full bg-cyan-brand" />
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-muted py-16 text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-brand">
                    <Send size={28} className="text-white" />
                  </div>
                  <h3 className="mb-3 font-display text-2xl font-bold text-foreground uppercase">
                    Message Sent!
                  </h3>
                  <p className="mb-6 max-w-sm leading-relaxed text-seal-gray">
                    Thank you for reaching out. A member of our team will be in
                    touch within 24 hours.
                  </p>
                  <Button
                    type="button"
                    variant="outlineStrong"
                    size="lg"
                    onClick={() => setSubmitted(false)}
                    className={buttonCtaClassName}
                  >
                    Send Another
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-border bg-card p-8 shadow-sm"
                >
                  <h3 className="mb-6 font-display text-2xl font-bold text-foreground uppercase">
                    Send Us a Message
                  </h3>

                  <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-xs font-bold tracking-wide text-foreground uppercase"
                      >
                        Full Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="w-full rounded-lg border border-border px-4 py-3 text-sm text-foreground transition-colors placeholder:text-seal-gray focus:border-cyan-brand focus:outline-none"
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-xs font-bold tracking-wide text-foreground uppercase"
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="w-full rounded-lg border border-border px-4 py-3 text-sm text-foreground transition-colors placeholder:text-seal-gray focus:border-cyan-brand focus:outline-none"
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>

                  <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1.5 block text-xs font-bold tracking-wide text-foreground uppercase"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        className="w-full rounded-lg border border-border px-4 py-3 text-sm text-foreground transition-colors placeholder:text-seal-gray focus:border-cyan-brand focus:outline-none"
                        placeholder="(480) 555-0000"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="mb-1.5 block text-xs font-bold tracking-wide text-foreground uppercase"
                      >
                        Inquiry Type *
                      </label>
                      <select
                        id="subject"
                        required
                        value={form.subject}
                        onChange={(e) =>
                          setForm({ ...form, subject: e.target.value })
                        }
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-cyan-brand focus:outline-none"
                      >
                        <option value="">Select a topic...</option>
                        {inquiryTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-xs font-bold tracking-wide text-foreground uppercase"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="w-full resize-none rounded-lg border border-border px-4 py-3 text-sm text-foreground transition-colors placeholder:text-seal-gray focus:border-cyan-brand focus:outline-none"
                      placeholder="Tell us about your swimmer, your goals, or any questions you have..."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="default"
                    size="xl"
                    className={cn(buttonCtaClassName, "w-full sm:w-auto")}
                  >
                    <Send size={14} />
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-72 overflow-hidden border-t border-border bg-muted">
        <Image
          src={contactInfo.map.image}
          alt="Map showing Arizona Seals Swimming location"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-xl border border-border bg-background px-8 py-5 text-center shadow-lg">
            <p className="mb-1 font-display text-lg font-bold text-foreground uppercase">
              {contactInfo.map.title}
            </p>
            <p className="text-sm text-seal-gray">{contactInfo.map.address}</p>
            <a
              href={contactInfo.map.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-xs font-bold tracking-wide text-cyan-brand uppercase transition-colors hover:text-foreground"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
