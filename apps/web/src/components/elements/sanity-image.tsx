"use client";

import {
  objectPositionFromHotspot,
  processImageData,
  SANITY_BASE_URL,
  type SanityImageProps,
} from "@workspace/sanity/image";
import type { ElementType } from "react";
import {
  SanityImage as BaseSanityImage,
  type WrapperProps,
} from "sanity-image";

/**
 * App wrapper around [`sanity-image`](https://github.com/coreyward/sanity-image).
 *
 * Accepts the GROQ image bag (`id`, `hotspot`, `crop`, `preview`, `alt`) and
 * configures `baseUrl` once. Alt always comes from `imageFields`
 * (`coalesce(alt, asset->altText, asset->originalFilename, "Image")`) — do not
 * pass an `alt` prop.
 *
 * @example
 * ```tsx
 * <SanityImage
 *   image={member.image}
 *   width={800}
 *   sizes="(min-width: 768px) 50vw, 100vw"
 * />
 * ```
 */
export function SanityImage<T extends ElementType = "img">({
  image,
  queryParams,
  ...props
}: SanityImageProps<T>) {
  const processed = processImageData(image);

  if (!processed) {
    return null;
  }

  return (
    <BaseSanityImage
      baseUrl={SANITY_BASE_URL}
      {...(props as WrapperProps<T>)}
      id={processed.id}
      hotspot={processed.hotspot}
      crop={processed.crop}
      preview={processed.preview}
      alt={processed.alt}
      queryParams={{ q: 80, ...queryParams }}
    />
  );
}

export { objectPositionFromHotspot };
