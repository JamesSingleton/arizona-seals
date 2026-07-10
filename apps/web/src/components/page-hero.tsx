interface PageHeroProps {
  title: string;
  subtitle?: string;
  /** When omitted, renders a solid navy hero (no image). */
  backgroundImage?: string;
  /** Sanity hotspot (0–1). Used for CSS background-position under cover. */
  hotspot?: { x: number; y: number } | null;
  overlay?: boolean;
  /** default = h-64 md:h-80; tall = programs-style h-72 md:h-96 */
  size?: "default" | "tall";
}

function backgroundPositionFromHotspot(
  hotspot?: PageHeroProps["hotspot"],
): string {
  if (
    hotspot &&
    typeof hotspot.x === "number" &&
    typeof hotspot.y === "number"
  ) {
    return `${hotspot.x * 100}% ${hotspot.y * 100}%`;
  }
  return "center";
}

export function PageHero({
  title,
  subtitle,
  backgroundImage,
  hotspot,
  overlay = true,
  size = "default",
}: PageHeroProps) {
  const heightClass = size === "tall" ? "h-72 md:h-96" : "h-64 md:h-80";
  const hasImage = Boolean(backgroundImage);

  return (
    <section
      className={`relative flex items-end ${heightClass} ${hasImage ? "" : "bg-navy"}`}
      style={
        hasImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: backgroundPositionFromHotspot(hotspot),
            }
          : undefined
      }
    >
      {overlay && hasImage ? (
        <div className="absolute inset-0 bg-navy/70" />
      ) : null}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="border-l-4 border-cyan-brand pl-5">
          <h1 className="font-display text-balance text-4xl font-bold tracking-wide text-white uppercase md:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-2 font-sans text-base leading-relaxed text-white/80 md:text-lg">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
