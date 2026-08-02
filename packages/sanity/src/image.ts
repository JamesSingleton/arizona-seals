import type { ElementType } from "react";
import type { WrapperProps } from "sanity-image";

import { dataset, projectId } from "./api";
import type { QueryImageTypeResult } from "./sanity.types";

/** Shape returned by our shared image GROQ projection. */
export type SanityImageData = NonNullable<QueryImageTypeResult>;

/** Hotspot coords used by `sanity-image` (width/height are unused by the library). */
export type ImageHotspot = {
  readonly x: number;
  readonly y: number;
};

export type ImageCrop = {
  readonly top: number;
  readonly bottom: number;
  readonly left: number;
  readonly right: number;
};

export type ProcessedImageData = {
  readonly id: string;
  readonly alt: string;
  readonly preview?: string;
  readonly hotspot?: ImageHotspot;
  readonly crop?: ImageCrop;
};

/**
 * Props for the app `SanityImage` wrapper: GROQ image bag + library props
 * (minus `id`, which is derived from `image`).
 */
export type SanityImageProps<T extends ElementType = "img"> = {
  readonly image: SanityImageData | null | undefined;
} & Omit<WrapperProps<T>, "id" | "alt">;

export const SANITY_BASE_URL =
  `https://cdn.sanity.io/images/${projectId}/${dataset}/` as const;

function isValidNumber(value: unknown): value is number {
  return typeof value === "number" && !Number.isNaN(value);
}

function isValidHotspot(hotspot: unknown): hotspot is ImageHotspot {
  if (!hotspot || typeof hotspot !== "object") {
    return false;
  }
  const h = hotspot as Record<string, unknown>;
  return isValidNumber(h.x) && isValidNumber(h.y);
}

function isValidCrop(crop: unknown): crop is ImageCrop {
  if (!crop || typeof crop !== "object") {
    return false;
  }
  const c = crop as Record<string, unknown>;
  return (
    isValidNumber(c.top) &&
    isValidNumber(c.bottom) &&
    isValidNumber(c.left) &&
    isValidNumber(c.right)
  );
}

function extractHotspot(image: SanityImageData): ImageHotspot | undefined {
  if (!isValidHotspot(image?.hotspot)) {
    return;
  }
  // Library only uses x/y for focal-point crop — ignore width/height
  return { x: image.hotspot.x, y: image.hotspot.y };
}

function extractCrop(image: SanityImageData): ImageCrop | undefined {
  if (!isValidCrop(image?.crop)) {
    return;
  }
  return {
    top: image.crop.top,
    bottom: image.crop.bottom,
    left: image.crop.left,
    right: image.crop.right,
  };
}

/**
 * Normalize a GROQ image projection into props for `sanity-image`.
 * Returns null when the asset id is missing.
 */
export function processImageData(
  image: SanityImageData | null | undefined,
): ProcessedImageData | null {
  if (!image?.id || typeof image.id !== "string") {
    return null;
  }

  const hotspot = extractHotspot(image);
  const crop = extractCrop(image);
  const preview =
    typeof image.preview === "string" && image.preview.length > 0
      ? image.preview
      : undefined;

  return {
    id: image.id,
    alt:
      typeof image.alt === "string" && image.alt.trim().length > 0
        ? image.alt.trim()
        : "Image",
    ...(preview ? { preview } : {}),
    ...(hotspot ? { hotspot } : {}),
    ...(crop ? { crop } : {}),
  };
}

/**
 * Map Sanity hotspot (0–1) to CSS `object-position` for `object-cover` layouts
 * where the browser crops (full-bleed heroes, etc.).
 */
export function objectPositionFromHotspot(
  hotspot?: { x: number; y: number } | null,
  fallback = "center",
): string {
  if (
    hotspot &&
    typeof hotspot.x === "number" &&
    typeof hotspot.y === "number"
  ) {
    return `${hotspot.x * 100}% ${hotspot.y * 100}%`;
  }
  return fallback;
}
