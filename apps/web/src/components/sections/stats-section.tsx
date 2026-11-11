import type { SanityImageProps } from "@/types";
import {
  objectPositionFromHotspot,
  SanityImage,
} from "../elements/sanity-image";

/** Original stats side image used on the hardcoded homepage. */
const DEFAULT_STATS_IMAGE: SanityImageProps = {
  id: "image-5eab7ec38166ec7e22db4124e92ff6db561278dc-6000x4000-avif",
  alt: "Arizona Seals swimmer competing at a meet",
  hotspot: null,
  crop: null,
  preview: null,
  dominantColor: null,
};

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

export function StatsSection({
  title = "We've Got a Lot to Be Proud About",
  stats,
  image,
}: StatsSectionProps) {
  if (!stats?.length) return null;

  const resolvedImage = image?.id ? image : DEFAULT_STATS_IMAGE;

  return (
    <section className="on-dark bg-navy py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="mb-16 text-center">
          <h2 className="section-title text-white">{title}</h2>
        </div>

        <div className="grid grid-cols-1 items-center gap-0 lg:grid-cols-2 lg:gap-16">
          <div className="divide-y divide-white/10">
            {stats.map((s) => (
              <div
                key={s._key ?? `${s.number}-${s.label}`}
                className="flex items-center gap-6 py-5"
              >
                <span className="display w-36 shrink-0 text-right text-6xl text-white tabular-nums md:text-7xl">
                  {s.number}
                </span>
                <div aria-hidden className="h-1 w-6 shrink-0 bg-pool" />
                <span className="label text-base text-white/85">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 lg:mt-0 lg:sticky lg:top-24 lg:self-start">
            <div className="relative h-72 overflow-hidden rounded-sm lg:h-130">
              <SanityImage
                image={resolvedImage}
                width={1200}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="absolute inset-0 size-full object-cover"
                style={{
                  objectPosition: objectPositionFromHotspot(
                    resolvedImage.hotspot,
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
