import type { PagebuilderType } from "@/types";
import { RichText } from "../elements/rich-text";
import { SanityIcon } from "../elements/sanity-icon";

type FeatureCardsWithIconProps = PagebuilderType<"featureCardsIcon"> & {
  variant?: "default" | "navy" | null;
};

type FeatureCardProps = {
  card: NonNullable<FeatureCardsWithIconProps["cards"]>[number];
  navy?: boolean;
};

function FeatureCard({ card, navy }: FeatureCardProps) {
  const { icon, title, richText } = card ?? {};
  if (navy) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10">
        {icon ? (
          <span className="mb-5 flex size-12 items-center justify-center rounded-full bg-cyan-on-navy/20 text-cyan-on-navy">
            <SanityIcon icon={icon} />
          </span>
        ) : null}
        <h3 className="mb-2 font-display text-lg font-bold text-white uppercase">
          {title}
        </h3>
        <RichText
          richText={richText}
          className="text-sm leading-relaxed text-white/70 [&_p]:mb-0"
        />
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-accent p-8 md:min-h-[300px] md:p-8">
      {icon ? (
        <span className="mb-9 flex w-fit items-center justify-center rounded-full bg-background p-3 drop-shadow-xl">
          <SanityIcon icon={icon} />
        </span>
      ) : null}
      <div>
        <h3 className="mb-2 text-lg font-medium md:text-2xl">{title}</h3>
        <RichText
          richText={richText}
          className="text-sm leading-7 font-normal text-balance text-black/90 md:text-[16px] dark:text-neutral-300"
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
  variant,
}: FeatureCardsWithIconProps) {
  const navy = variant === "navy";

  return (
    <section
      id="features"
      className={navy ? "bg-navy py-20 md:py-28" : "my-6 md:my-16"}
    >
      <div
        className={
          navy
            ? "mx-auto max-w-7xl px-6 sm:px-10 lg:px-16"
            : "container mx-auto px-4 md:px-6"
        }
      >
        <div className="flex w-full flex-col items-center">
          <div className="flex flex-col items-center space-y-4 text-center sm:space-y-6">
            {eyebrow ? (
              <p
                className={
                  navy
                    ? "font-display text-sm font-bold tracking-[0.2em] text-cyan-on-navy uppercase"
                    : "rounded-full bg-muted px-3 py-1 text-sm"
                }
              >
                {eyebrow}
              </p>
            ) : null}
            <h2
              className={
                navy
                  ? "font-display text-4xl font-bold text-white uppercase md:text-5xl"
                  : "text-3xl font-semibold md:text-5xl"
              }
            >
              {title}
            </h2>
            {richText ? (
              <RichText
                richText={richText}
                className={
                  navy
                    ? "max-w-3xl text-base text-white/70"
                    : "max-w-3xl text-base text-balance md:text-lg"
                }
              />
            ) : null}
          </div>
        </div>
        <div
          className={
            navy
              ? "mx-auto mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              : "mx-auto mt-20 grid gap-8 lg:grid-cols-3"
          }
        >
          {cards?.map((card, index) => (
            <FeatureCard
              key={`FeatureCard-${card?._key}-${index}`}
              card={card}
              navy={navy}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
