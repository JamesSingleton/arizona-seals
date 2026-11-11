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
    <section data-hero className="on-dark relative bg-navy">
      <div className="mx-auto max-w-7xl px-6 pt-40 pb-16 sm:px-10 md:pb-20 lg:px-16">
        <h1
          className="display text-white"
          style={{ fontSize: "clamp(3.25rem, 9vw, 7.5rem)" }}
        >
          {title}
        </h1>
        {lines.map((p) => (
          <p
            key={p!.slice(0, 40)}
            className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl"
          >
            {p}
          </p>
        ))}
      </div>
      <div aria-hidden className="h-1.5 bg-pool" />
    </section>
  );
}
