import "@workspace/ui/globals.css";

import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";

import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";

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

export const metadata: Metadata = {
  title: {
    default: "Arizona Seals Swimming",
    template: "%s | Arizona Seals Swimming",
  },
  description:
    "Arizona Seals Swimming – a premier competitive swim club in Arizona dedicated to developing athletes of all ages and skill levels.",
  keywords: [
    "swim club",
    "Arizona",
    "competitive swimming",
    "swim team",
    "USA Swimming",
    "Maricopa",
  ],
  openGraph: {
    title: "Arizona Seals Swimming",
    description: "A premier competitive swim club in Arizona.",
    siteName: "Arizona Seals Swimming",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0077A3" },
    { media: "(prefers-color-scheme: dark)", color: "#0D1520" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${barlowCondensed.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <Providers>
          <SiteNavbar />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
