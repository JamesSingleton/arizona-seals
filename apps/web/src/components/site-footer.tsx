import { Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FacebookIcon, InstagramIcon } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Arizona Seals Swimming"
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
              />
              <div>
                <p className="font-display text-lg leading-tight font-bold text-white uppercase">
                  Arizona Seals
                </p>
                <p className="font-display text-sm font-bold tracking-widest text-cyan-brand uppercase">
                  Swimming
                </p>
              </div>
            </Link>
            <p className="mb-5 text-sm leading-relaxed text-white/70">
              Developing competitive swimmers and champions in and out of the
              pool since 2005.
            </p>
            <div className="flex items-center gap-3">
              {[
                {
                  icon: FacebookIcon,
                  href: "https://www.facebook.com/azseals",
                  ariaLabel: "Facebook",
                },
                {
                  icon: InstagramIcon,
                  href: "https://www.instagram.com/arizonaseals",
                  ariaLabel: "Instagram",
                },
              ].map((s) => (
                <a
                  key={s.ariaLabel}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.ariaLabel}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-cyan-brand hover:text-primary-foreground"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display mb-4 text-base font-bold tracking-widest text-cyan-brand uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Coaches", href: "/coaches" },
                { label: "Programs", href: "/programs" },
                { label: "Facilities", href: "/facilities" },
                { label: "Sponsors", href: "/sponsors" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 transition-colors hover:text-cyan-brand"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display mb-4 text-base font-bold tracking-widest text-cyan-brand uppercase">
              Programs
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Blue Group", href: "/programs#blue" },
                { label: "Red Group", href: "/programs#red" },
                { label: "White Group", href: "/programs#white" },
                { label: "Rising Group", href: "/programs#rising" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 transition-colors hover:text-cyan-brand"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display mb-4 text-base font-bold tracking-widest text-cyan-brand uppercase">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-cyan-brand" />
                <span className="text-sm text-white/70">
                  44345 M.L.K. Jr. Blvd
                  <br />
                  Maricopa, AZ 85138
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-cyan-brand" />
                <a
                  href="mailto:arizonaseals@gmail.com"
                  className="text-sm text-white/70 transition-colors hover:text-cyan-brand"
                >
                  arizonaseals@gmail.com
                </a>
              </li>
            </ul>
            <div className="mt-5">
              <p className="mb-1 text-xs tracking-widest text-white/50 uppercase">
                Member Of
              </p>
              <p className="text-sm font-medium text-white/80">USA Swimming</p>
              <p className="text-sm font-medium text-white/80">
                Arizona Swimming
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-white/70">
            &copy; {new Date().getFullYear()} Arizona Seals Swimming. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-white/70 transition-colors hover:text-white/70"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-white/70 transition-colors hover:text-white/70"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
