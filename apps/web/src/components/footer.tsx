import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
} from "@workspace/sanity/live";
import {
  queryFooterData,
  queryGlobalSeoSettings,
} from "@workspace/sanity/query";
import type {
  QueryFooterDataResult,
  QueryGlobalSeoSettingsResult,
} from "@workspace/sanity/types";
import { draftMode } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

import { Logo } from "./logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "./social-icons";

interface SocialLinksProps {
  data: NonNullable<QueryGlobalSeoSettingsResult>["socialLinks"];
}

interface FooterProps {
  data: NonNullable<QueryFooterDataResult>;
  settingsData: NonNullable<QueryGlobalSeoSettingsResult>;
}

export async function FooterServer() {
  const { isEnabled: isDraftMode } = await draftMode();
  if (isDraftMode) {
    return (
      <Suspense fallback={<FooterSkeleton />}>
        <DynamicFooter />
      </Suspense>
    );
  }
  return <CachedFooter perspective="published" stega={false} />;
}

async function DynamicFooter() {
  const options = await getDynamicFetchOptions();
  return <CachedFooter {...options} />;
}

async function CachedFooter({ perspective, stega }: DynamicFetchOptions) {
  "use cache";
  const [response, settingsResponse] = await Promise.all([
    sanityFetch({ query: queryFooterData, perspective, stega }),
    sanityFetch({ query: queryGlobalSeoSettings, perspective, stega }),
  ]);

  if (!response?.data || !settingsResponse?.data) return <FooterSkeleton />;
  return <Footer data={response.data} settingsData={settingsResponse.data} />;
}

function SocialLinks({ data }: SocialLinksProps) {
  if (!data) return null;

  const { facebook, twitter, instagram, youtube, linkedin } = data;

  const socialLinks = [
    {
      url: instagram,
      Icon: InstagramIcon,
      label: "Follow us on Instagram",
    },
    {
      url: facebook,
      Icon: FacebookIcon,
      label: "Follow us on Facebook",
    },
    { url: twitter, Icon: XIcon, label: "Follow us on Twitter" },
    {
      url: linkedin,
      Icon: LinkedinIcon,
      label: "Follow us on LinkedIn",
    },
    {
      url: youtube,
      Icon: YoutubeIcon,
      label: "Subscribe to our YouTube channel",
    },
  ].filter((link) => link.url);

  return (
    <ul className="flex items-center space-x-6 text-muted-foreground">
      {socialLinks.map(({ url, Icon, label }, index) => (
        <li
          key={`social-link-${url}-${index.toString()}`}
          className="font-medium hover:text-primary"
        >
          <Link
            href={url ?? "#"}
            target="_blank"
            prefetch={false}
            rel="noopener noreferrer"
            aria-label={label}
          >
            <Icon className="fill-muted-foreground hover:fill-primary/80 dark:fill-zinc-400 dark:hover:fill-primary" />
            <span className="sr-only">{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function FooterSkeleton() {
  return (
    <footer className="mt-16 pb-8" aria-hidden>
      <section className="container mx-auto px-4 md:px-6">
        <div className="h-[200px] animate-pulse rounded bg-muted" />
      </section>
    </footer>
  );
}

function Footer({ data, settingsData }: FooterProps) {
  const { subtitle, columns } = data;
  const { siteTitle, logo, socialLinks } = settingsData;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border pb-8">
      <section className="container mx-auto">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-4 py-12 text-center md:px-6 lg:flex-row lg:text-left">
          <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 md:gap-8 lg:items-start">
            <div>
              {logo ? (
                <span className="flex items-center justify-center gap-4 lg:justify-start">
                  <Logo
                    alt={siteTitle ?? "Arizona Seals Swimming"}
                    image={logo}
                  />
                </span>
              ) : (
                <p className="font-display text-lg font-black uppercase">
                  {siteTitle}
                </p>
              )}
              {subtitle ? (
                <p className="mt-6 text-sm text-muted-foreground">{subtitle}</p>
              ) : null}
            </div>
            {socialLinks ? <SocialLinks data={socialLinks} /> : null}
          </div>
          {Array.isArray(columns) && columns.length > 0 ? (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:mr-20 lg:gap-28">
              {columns.map((column, index) => (
                <div key={`column-${column?._key}-${index}`}>
                  <h2 className="mb-6 text-sm font-semibold">
                    {column?.title}
                  </h2>
                  {column?.links && column.links.length > 0 ? (
                    <ul className="space-y-4 text-sm text-muted-foreground">
                      {column.links.map((link, linkIndex) => (
                        <li
                          key={`${link?._key}-${linkIndex}-column-${column?._key}`}
                          className="font-medium hover:text-primary"
                        >
                          <Link
                            href={link.href ?? "#"}
                            target={link.openInNewTab ? "_blank" : undefined}
                            rel={
                              link.openInNewTab
                                ? "noopener noreferrer"
                                : undefined
                            }
                          >
                            {link.name}
                            {link.openInNewTab ? (
                              <span className="sr-only">
                                {" "}
                                (opens in new tab)
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="border-t border-border pt-8">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 text-center text-sm text-muted-foreground md:px-6 lg:flex-row lg:items-center lg:text-left">
            <p>
              © {year} {siteTitle}. All rights reserved.
            </p>
            <ul className="flex justify-center gap-4 lg:justify-start">
              <li className="hover:text-primary">
                <Link href="/terms">Terms and Conditions</Link>
              </li>
              <li className="hover:text-primary">
                <Link href="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </footer>
  );
}
