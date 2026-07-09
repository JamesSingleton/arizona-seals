import type { SanityImageSource } from "@sanity/image-url";
import { createImageUrlBuilder } from "@sanity/image-url";
import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, studioUrl } from "./api";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
  stega: {
    studioUrl,
  },
});

const imageBuilder = createImageUrlBuilder({
  projectId: projectId,
  dataset: dataset,
});

/** Build a Sanity CDN URL. Prefer auto format — forcing `fm=webp` breaks some AVIF source paths. */
export const urlFor = (source: SanityImageSource) =>
  imageBuilder.image(source).auto("format").fit("max");

