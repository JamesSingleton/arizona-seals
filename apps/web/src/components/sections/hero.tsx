import { Badge } from "@workspace/ui/components/badge";

import type { PagebuilderType } from "@/types";

import { RichText } from "../richtext";
import { SanityButtons } from "../sanity-buttons";
import { SanityImage } from "../sanity-image";

type HeroBlockProps = PagebuilderType<"hero">;

export function HeroBlock({
  title,
  buttons,
  badge,
  image,
  richText,
}: HeroBlockProps) {
  return (
    <section id="hero" className="relative mt-4 md:my-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-blue-950 dark:via-gray-900 dark:to-cyan-950" />
      
      {/* Swimming pool pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="pool-lanes" x="0" y="0" width="20" height="100" patternUnits="userSpaceOnUse">
              <rect width="20" height="100" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#pool-lanes)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-2 min-h-[600px]">
          <div className="grid h-full grid-rows-[auto_1fr_auto] gap-6 items-center justify-items-center text-center lg:items-start lg:justify-items-start lg:text-left">
            {badge && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {badge}
              </Badge>
            )}
            <div className="grid gap-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-balance bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-600 bg-clip-text text-transparent dark:from-blue-100 dark:via-blue-300 dark:to-cyan-300">
                {title}
              </h1>
              <div className="text-lg md:text-xl font-normal text-gray-700 dark:text-gray-300">
                <RichText richText={richText} />
              </div>
            </div>

            <SanityButtons
              buttons={buttons}
              buttonClassName="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700"
              className="w-full sm:w-fit grid gap-3 sm:grid-flow-col lg:justify-start mb-8"
            />
          </div>

          {image && (
            <div className="relative h-96 w-full lg:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-3xl" />
              <SanityImage
                asset={image}
                loading="eager"
                width={800}
                height={800}
                priority
                quality={90}
                className="relative z-10 max-h-96 lg:max-h-[500px] w-full rounded-3xl object-cover shadow-2xl"
              />
              {/* Floating elements for visual interest */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}