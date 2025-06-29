import { Badge } from "@workspace/ui/components/badge";

import type { PagebuilderType } from "@/types";

import { RichText } from "../richtext";
import { SanityButtons } from "../sanity-buttons";

export type CTABlockProps = PagebuilderType<"cta">;

export function CTABlock({ richText, title, eyebrow, buttons }: CTABlockProps) {
  return (
    <section id="cta" className="my-6 md:my-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 py-16 rounded-3xl px-4 overflow-hidden">
          {/* Swimming wave pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
              <path d="M0,100 Q100,50 200,100 T400,100 L400,200 L0,200 Z" fill="currentColor" />
              <path d="M0,120 Q100,70 200,120 T400,120 L400,200 L0,200 Z" fill="currentColor" opacity="0.5" />
            </svg>
          </div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-8">
            {eyebrow && (
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-white/30"
              >
                {eyebrow}
              </Badge>
            )}
            <h2 className="text-3xl font-semibold md:text-5xl text-balance text-white">
              {title}
            </h2>
            <div className="text-lg text-blue-100">
              <RichText richText={richText} className="text-balance prose-invert" />
            </div>
            <div className="flex justify-center">
              <SanityButtons
                buttons={buttons}
                buttonClassName="w-full sm:w-auto bg-white text-blue-700 hover:bg-blue-50 border-white"
                className="w-full sm:w-fit grid gap-2 sm:grid-flow-col lg:justify-start mb-8"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}