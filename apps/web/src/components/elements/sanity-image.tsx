"use client";

import {
  processImageData,
  SANITY_BASE_URL,
  type SanityImageProps,
} from "@workspace/sanity/image";
import { memo } from "react";
import {
  SanityImage as BaseSanityImage,
  type WrapperProps,
} from "sanity-image";

const ImageWrapper = <T extends React.ElementType = "img">(
  props: WrapperProps<T>,
) => <BaseSanityImage baseUrl={SANITY_BASE_URL} {...props} />;

function SanityImageComponent({ image, alt: altProp, ...props }: SanityImageProps) {
  const processedImageData = processImageData(image);

  if (!processedImageData) {
    return null;
  }

  const { alt, hotspot, crop, preview, id } = processedImageData;

  return (
    <ImageWrapper
      {...props}
      id={id}
      alt={typeof altProp === "string" ? altProp : alt}
      preview={preview}
      hotspot={hotspot}
      crop={crop}
    />
  );
}

export const SanityImage = memo(SanityImageComponent);
