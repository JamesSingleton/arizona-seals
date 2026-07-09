interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  overlay?: boolean;
  /** default = h-64 md:h-80; tall = programs-style h-72 md:h-96 */
  size?: "default" | "tall";
}

export function PageHero({
  title,
  subtitle,
  backgroundImage = "/placeholder.svg?height=480&width=1600",
  overlay = true,
  size = "default",
}: PageHeroProps) {
  const heightClass =
    size === "tall"
      ? "h-72 md:h-96"
      : "h-64 md:h-80";

  return (
    <section
      className={`relative flex items-end ${heightClass}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {overlay ? <div className="absolute inset-0 bg-navy/70" /> : null}
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
