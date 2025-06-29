import { Badge } from "@workspace/ui/components/badge";

import type { PagebuilderType } from "@/types";

import { RichText } from "../richtext";
import { SanityIcon } from "../sanity-icon";

type FeatureCardsWithIconProps = PagebuilderType<"featureCardsIcon">;

type FeatureCardProps = {
  card: NonNullable<FeatureCardsWithIconProps["cards"]>[number];
};

function FeatureCard({ card }: FeatureCardProps) {
  const { icon, title, richText } = card ?? {};
  return (
    <div className="group rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 p-8 md:min-h-[300px] md:p-8 border border-blue-100 dark:border-blue-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {icon && (
        <span className="mb-6 flex w-fit p-4 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
          <SanityIcon icon={icon} className="text-white" />
        </span>
      )}

      <div>
        <h3 className="text-lg font-semibold md:text-2xl mb-3 text-blue-900 dark:text-blue-100">
          {title}
        </h3>
        <RichText
          richText={richText}
          className="font-normal text-sm md:text-[16px] text-gray-700 dark:text-gray-300 leading-7 text-balance"
        />
      </div>
    </div>
  );
}

export function FeatureCardsWithIcon({
  eyebrow,
  title,
  richText,
  cards,
}: FeatureCardsWithIconProps) {
  return (
    <section id="features" className="my-6 md:my-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex w-full flex-col items-center">
          <div className="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:text-center">
            {eyebrow && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {eyebrow}
              </Badge>
            )}
            <h2 className="text-3xl font-semibold md:text-5xl text-blue-900 dark:text-blue-100">
              {title}
            </h2>
            <RichText
              richText={richText}
              className="text-base md:text-lg text-balance max-w-3xl text-gray-700 dark:text-gray-300"
            />
          </div>
        </div>
        <div className="mx-auto mt-20 grid gap-8 lg:grid-cols-3">
          {cards?.map((card, index) => (
            <FeatureCard
              key={`FeatureCard-${card?._key}-${index}`}
              card={card}
            />
          ))}
        </div>
      </div>
    </section>
  );
}