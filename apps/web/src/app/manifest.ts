import type { MetadataRoute } from "next";

/** Installable-app details and the icon phones use for home-screen shortcuts. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arizona Seals Swimming",
    short_name: "AZ Seals",
    description:
      "Year-round USA Swimming club at Copper Sky in Maricopa, AZ, for swimmers ages 5 and up.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0d2849",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
