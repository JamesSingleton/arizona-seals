import { urlFor } from "@workspace/sanity/client";
import Image from "next/image";

import type { SanityImageProps } from "@/types";

/** Original stats side image used on the hardcoded homepage. */
const DEFAULT_STATS_IMAGE = urlFor({
  _id: "image-5eab7ec38166ec7e22db4124e92ff6db561278dc-6000x4000-avif",
})
  .width(1200)
  .height(1040)
  .fit("crop")
  .quality(80)
  .url();

export type StatsItem = {
  _key?: string;
  number?: string | null;
  label?: string | null;
};

export type StatsSectionProps = {
  eyebrow?: string | null;
  title?: string | null;
  stats?: StatsItem[] | null;
  image?: SanityImageProps | null;
};

function resolveStatsSrc(image?: SanityImageProps | null): string {
  if (image?.id) {
    return urlFor({ _id: image.id })
      .width(1200)
      .height(1040)
      .fit("crop")
      .quality(80)
      .url();
  }
  return DEFAULT_STATS_IMAGE;
}

export function StatsSection({
  eyebrow = "By the Numbers",
  title = "We've Got a Lot to Be Proud About",
  stats,
  image,
}: StatsSectionProps) {
  if (!stats?.length) return null;

  const src = resolveStatsSrc(image);

  return (
    <section className="bg-navy py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="h-0.5 w-12 bg-cyan-on-navy" />
            <span className="font-display text-xs font-bold tracking-[0.3em] text-cyan-on-navy uppercase">
              {eyebrow}
            </span>
            <div className="h-0.5 w-12 bg-cyan-on-navy" />
          </div>
          <h2
            className="font-display font-black leading-none text-white uppercase"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 items-center gap-0 lg:grid-cols-2 lg:gap-16">
          <div className="divide-y divide-white/10">
            {stats.map((s) => (
              <div
                key={s._key ?? `${s.number}-${s.label}`}
                className="flex items-center gap-6 py-5"
              >
                <span
                  className="w-32 shrink-0 text-right font-display leading-none font-black text-white"
                  style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
                >
                  {s.number}
                </span>
                <div className="h-0.5 w-6 shrink-0 bg-cyan-on-navy" />
                <span className="font-display text-sm font-bold tracking-wide text-white/80 uppercase">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12 lg:mt-0 lg:sticky lg:top-24 lg:self-start">
            <div className="relative h-64 overflow-hidden lg:h-[520px]">
              <Image
                src={src}
                alt="Arizona Seals swimmer competing at a meet"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
