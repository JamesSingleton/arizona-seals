import type { PagebuilderType } from "@/types";
import { CtaBand } from "./cta-band";

export type CtaCardProps = Pick<
  PagebuilderType<"cta">,
  "title" | "richText" | "buttons"
>;

/** Legacy "card" CTA layout: rendered as the light band so every CTA matches. */
export function CtaCard({ title, richText, buttons }: CtaCardProps) {
  return (
    <CtaBand title={title} richText={richText} buttons={buttons} tone="cyan" />
  );
}
