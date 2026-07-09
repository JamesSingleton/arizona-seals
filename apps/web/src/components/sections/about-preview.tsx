import Image from "next/image";
import Link from "next/link";

export type SplitContentProps = {
  eyebrow?: string;
  title?: string;
  paragraphs?: string[];
  cta?: { label: string; href: string };
  image?: string;
  imageAlt?: string;
  imageOnRight?: boolean;
  className?: string;
};

export function AboutPreview({
  eyebrow = "Who We Are",
  title = "Swimming's about more than what happens in the water.",
  paragraphs = [
    "Arizona Seals Swimming is a USA Swimming sanctioned club based at Copper Sky Recreation Center in Maricopa, Arizona. We develop competitive swimmers at every level — from athletes just learning to race to those chasing national titles.",
    "Our coaches are dedicated to building not just fast swimmers, but confident, disciplined competitors who carry those values with them beyond the pool.",
  ],
  cta = { label: "Our Story →", href: "/about" },
  image = "/placeholder.svg?height=460&width=700",
  imageAlt = "Arizona Seals athletes racing at a swim meet",
  imageOnRight = true,
  className,
}: SplitContentProps) {
  return (
    <section className={className ?? "bg-background py-20 md:py-28"}>
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className={imageOnRight ? "" : "lg:order-2"}>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-0.5 w-8 bg-cyan-brand" />
              <span className="font-display text-xs font-bold tracking-[0.25em] text-cyan-brand uppercase">
                {eyebrow}
              </span>
            </div>

            <h2
              className="mb-8 font-display font-black leading-none text-balance text-foreground uppercase"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {title}
            </h2>

            {paragraphs.map((p) => (
              <p
                key={p.slice(0, 40)}
                className="mb-5 text-base leading-relaxed text-seal-gray last:mb-8"
              >
                {p}
              </p>
            ))}

            {cta && (
              <Link
                href={cta.href}
                className="inline-flex items-center gap-2 border-b-2 border-foreground pb-0.5 font-display text-sm font-bold tracking-widest text-foreground uppercase transition-colors hover:border-cyan-brand hover:text-cyan-brand"
              >
                {cta.label}
              </Link>
            )}
          </div>

          <div
            className={`relative h-80 overflow-hidden md:h-[460px] ${imageOnRight ? "" : "lg:order-1"}`}
          >
            <Image src={image} alt={imageAlt} fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
