import type { NextConfig } from "next";
import { sanity } from "next-sanity/live/cache-life";

const isVercelProduction =
  process.env.VERCEL === "1" && process.env.VERCEL_ENV === "production";

if (isVercelProduction && !process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
  throw new Error(
    "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN must be set for Vercel production builds so PostHog can initialize in the client bundle.",
  );
}

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    default: sanity,
  },
  transpilePackages: ["@workspace/ui", "@workspace/sanity"],
  experimental: {
    inlineCss: true,
  },
  logging: {
    fetches: {},
  },
  images: {
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
