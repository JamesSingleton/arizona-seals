import "@workspace/ui/globals.css";

import { SanityLive } from "@workspace/sanity/live";
import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { Suspense } from "react";

import { CombinedJsonLd } from "@/components/json-ld";
import { PreviewBar } from "@/components/preview-bar";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbarServer } from "@/components/site-navbar-server";
import { getBaseUrl } from "@/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const siteName = "Arizona Seals Swimming";
const siteDescription =
  "Arizona Seals Swimming – a premier competitive swim club in Arizona dedicated to developing athletes of all ages and skill levels.";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "swim club",
    "Arizona",
    "competitive swimming",
    "swim team",
    "USA Swimming",
    "Maricopa",
  ],
  // icons: {
  //   icon: [
  //     { url: "/favicon.ico" },
  //     { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
  //     { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
  //   ],
  //   apple: "/apple-icon.png",
  // },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName,
    title: siteName,
    description:
      "A premier competitive swim club in Maricopa, Arizona — USA Swimming sanctioned training for athletes of all ages.",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description:
      "A premier competitive swim club in Maricopa, Arizona — USA Swimming sanctioned training for athletes of all ages.",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#006f9a" },
    { media: "(prefers-color-scheme: dark)", color: "#0D1520" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${barlowCondensed.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-background focus:px-4 focus:py-2 focus:shadow"
          >
            Skip to main content
          </a>
          <SiteNavbarServer />
          <main id="main-content">{children}</main>
          <SiteFooter />

          <Suspense fallback={null}>
            <CombinedJsonLd includeOrganization includeWebsite />
          </Suspense>
          <SanityLive includeDrafts={isDraftMode} />
          {isDraftMode ? (
            <>
              <VisualEditing />
              <PreviewBar />
            </>
          ) : null}
        </Providers>
      </body>
    </html>
  );
}
