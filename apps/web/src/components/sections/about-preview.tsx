import type {
  SanityButtonProps,
  SanityImageProps,
  SanityRichTextProps,
} from "@/types";
import { RichText } from "../elements/rich-text";
import { SanityButtons } from "../elements/sanity-buttons";
import {
  objectPositionFromHotspot,
  SanityImage,
} from "../elements/sanity-image";

export type SplitContentProps = {
  eyebrow?: string | null;
  title?: string | null;
  richText?: SanityRichTextProps | null;
  image?: SanityImageProps | null;
  imagePlacement?: "start" | "end" | "left" | "right" | null;
  /** Legacy field — prefer imagePlacement */
  imagePosition?: "left" | "right" | null;
  buttons?: SanityButtonProps[] | null;
  className?: string;
  /** When true, center text and hide the image column */
  centered?: boolean | null;
};

function resolveImageAtEnd(
  imagePlacement?: string | null,
  imagePosition?: string | null,
): boolean {
  if (imagePlacement === "start" || imagePlacement === "left") return false;
  if (imagePlacement === "end" || imagePlacement === "right") return true;
  if (imagePosition === "left") return false;
  if (imagePosition === "right") return true;
  return true;
}

export function AboutPreview({
  title,
  richText,
  image,
  imagePlacement,
  imagePosition,
  buttons,
  className,
  centered,
}: SplitContentProps) {
  if (!title && !richText && !buttons?.length) return null;

  const imageAtEnd = resolveImageAtEnd(imagePlacement, imagePosition);

  // No CMS image → centered intro (coaches philosophy, etc.). Home/about seed images when needed.
  if (centered || !image?.id) {
    return (
      <section className={className ?? "bg-background py-20 md:py-28"}>
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          {title ? (
            <h2 className="section-title mb-6 text-foreground">{title}</h2>
          ) : null}
          {richText ? (
            <RichText
              richText={richText}
              className="text-base leading-relaxed text-seal-gray [&_p]:mb-5 [&_p:last-child]:mb-0"
            />
          ) : null}
          {buttons && buttons.length > 0 ? (
            <div className="mt-8 flex justify-center">
              <SanityButtons
                placement="about_preview"
                buttons={buttons}
                className="gap-4"
                buttonClassName=""
              />
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className={className ?? "bg-background py-20 md:py-28"}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 sm:px-10 lg:grid-cols-12 lg:gap-16 lg:px-16">
        <div className={`lg:col-span-6 ${imageAtEnd ? "" : "lg:order-2"}`}>
          {title ? (
            <h2 className="section-title mb-7 text-foreground">{title}</h2>
          ) : null}

          {richText ? (
            <RichText
              richText={richText}
              className="mb-8 max-w-xl text-lg leading-relaxed text-seal-gray [&_p]:mb-5 [&_p:last-child]:mb-0"
            />
          ) : null}

          {buttons && buttons.length > 0 ? (
            <SanityButtons
              placement="about_preview"
              buttons={buttons}
              size="lg"
              className="gap-3"
            />
          ) : null}
        </div>

        <div
          className={`relative aspect-[4/3] overflow-hidden bg-water lg:col-span-6 lg:aspect-[5/6] ${imageAtEnd ? "" : "lg:order-1"}`}
        >
          <SanityImage
            image={image}
            width={1400}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="absolute inset-0 size-full object-cover"
            style={{
              objectPosition: objectPositionFromHotspot(image?.hotspot),
            }}
          />
        </div>
      </div>
    </section>
  );
}
