import type {
  SanityButtonProps,
  SanityImageProps,
  SanityRichTextProps,
} from "@/types";
import { RichText } from "../elements/rich-text";
import { SanityButtons } from "../elements/sanity-buttons";
import { SanityImage } from "../elements/sanity-image";

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
  eyebrow,
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
          {eyebrow ? (
            <p className="mb-3 font-display text-sm font-bold tracking-[0.25em] text-cyan-brand uppercase">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2
              className="mb-6 font-display font-black leading-none text-balance text-foreground uppercase"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {title}
            </h2>
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
                buttons={buttons}
                className="gap-4"
                buttonClassName="inline-flex h-auto items-center gap-2 rounded-none border-0 border-b-2 border-foreground bg-transparent px-0 pb-0.5 font-display text-sm font-bold tracking-widest text-foreground uppercase shadow-none hover:border-cyan-brand hover:bg-transparent hover:text-cyan-brand"
              />
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className={className ?? "bg-background py-20 md:py-28"}>
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className={imageAtEnd ? "" : "lg:order-2"}>
            {eyebrow ? (
              <div className="mb-6 flex items-center gap-3">
                <div className="h-0.5 w-8 bg-cyan-brand" />
                <span className="font-display text-xs font-bold tracking-[0.25em] text-cyan-brand uppercase">
                  {eyebrow}
                </span>
              </div>
            ) : null}

            {title ? (
              <h2
                className="mb-8 font-display font-black leading-none text-balance text-foreground uppercase"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                {title}
              </h2>
            ) : null}

            {richText ? (
              <RichText
                richText={richText}
                className="mb-8 text-base leading-relaxed text-seal-gray [&_p]:mb-5 [&_p:last-child]:mb-0"
              />
            ) : null}

            {buttons && buttons.length > 0 ? (
              <SanityButtons
                buttons={buttons}
                className="gap-4"
                buttonClassName="inline-flex h-auto items-center gap-2 rounded-none border-0 border-b-2 border-foreground bg-transparent px-0 pb-0.5 font-display text-sm font-bold tracking-widest text-foreground uppercase shadow-none hover:border-cyan-brand hover:bg-transparent hover:text-cyan-brand"
              />
            ) : null}
          </div>

          <div
            className={`relative h-80 overflow-hidden bg-muted md:h-[460px] ${imageAtEnd ? "" : "lg:order-1"}`}
          >
            <SanityImage
              image={image}
              alt={
                typeof image.alt === "string"
                  ? image.alt
                  : "Arizona Seals athletes racing at a swim meet"
              }
              className="absolute inset-0 size-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
