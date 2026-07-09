import Image from "next/image";
import Link from "next/link";

import { programs } from "@/content/programs";

export type ProgramsPreviewProps = {
  eyebrow?: string;
  title?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
};

export function ProgramsPreview({
  eyebrow = "Training Groups",
  title = "Our Programs",
  viewAllHref = "/programs",
  viewAllLabel = "View All Programs →",
}: ProgramsPreviewProps) {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-0.5 w-8 bg-cyan-brand" />
              <span className="font-display text-xs font-bold tracking-[0.25em] text-cyan-brand uppercase">
                {eyebrow}
              </span>
            </div>
            <h2
              className="font-display font-black leading-none text-foreground uppercase"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {title}
            </h2>
          </div>
          <Link
            href={viewAllHref}
            className="w-fit border-b-2 border-foreground pb-0.5 font-display text-sm font-bold tracking-widest text-foreground uppercase transition-colors hover:border-cyan-brand hover:text-cyan-brand"
          >
            {viewAllLabel}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((prog) => (
            <Link
              key={prog.id}
              href={prog.href}
              className="group relative block h-80 overflow-hidden"
            >
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt={prog.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-navy/50 transition-colors duration-300 group-hover:bg-navy/30" />
              <div
                className={`absolute top-0 right-0 left-0 h-1.5 ${prog.bgAccent}`}
              />
              <div className="absolute right-0 bottom-0 left-0 p-5">
                <p className="mb-1 font-display text-xs tracking-widest text-white/70 uppercase">
                  {prog.previewLevel}
                </p>
                <h3 className="mb-2 font-display text-2xl leading-none font-black text-white uppercase">
                  {prog.name}
                </h3>
                <p className="line-clamp-2 text-xs leading-relaxed text-white/0 transition-all duration-300 group-hover:text-white/80">
                  {prog.previewDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
