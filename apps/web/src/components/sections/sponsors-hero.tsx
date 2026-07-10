import { Star } from "lucide-react";

export type SponsorsHeroProps = {
  title?: string | null;
  paragraphs?: (string | null)[] | null;
};

export function SponsorsHero({
  title = "Sponsor the Team",
  paragraphs,
}: SponsorsHeroProps) {
  const lines = paragraphs?.filter(Boolean) ?? [];

  return (
    <section className="bg-navy py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
        <div className="mb-6 flex items-center justify-center gap-2">
          <Star className="size-5 fill-cyan-on-navy text-cyan-on-navy" />
          <Star className="size-4 fill-cyan-on-navy/70 text-cyan-on-navy/70" />
          <Star className="size-5 fill-cyan-on-navy text-cyan-on-navy" />
        </div>
        <h1 className="font-display text-4xl font-bold text-white uppercase md:text-6xl">
          {title}
        </h1>
        {lines.map((p) => (
          <p
            key={p!.slice(0, 40)}
            className="mt-5 text-base leading-relaxed text-white/75"
          >
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
