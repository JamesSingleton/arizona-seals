import {
  buttonCtaClassName,
  buttonVariants,
} from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { CheckCircle, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { programs } from "@/content/programs";

export default function ProgramsPage() {
  return (
    <main>
      <section className="relative flex h-72 items-end overflow-hidden md:h-96">
        <Image
          src="/placeholder.svg?height=384&width=1600"
          alt="Arizona Seals swimmers at practice"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-navy/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-10 sm:px-10 md:pb-14 lg:px-16">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-0.5 w-8 bg-cyan-brand" />
            <span className="font-display text-xs font-bold tracking-[0.25em] text-cyan-brand uppercase">
              Arizona Seals
            </span>
          </div>
          <h1
            className="font-display leading-none font-black text-white uppercase"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          >
            Our Programs
          </h1>
        </div>
      </section>

      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10 lg:px-16">
          <h2
            className="mb-5 font-display leading-none font-black text-foreground uppercase"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            A Group for Every Swimmer
          </h2>
          <p className="text-base leading-relaxed text-seal-gray">
            Arizona Seals offers four training groups — Rising, White, Red, and
            Blue — structured by ability and commitment level. All swimmers are
            evaluated by our coaching staff and placed in the group that best
            fits their current level and goals. Group placement is reviewed each
            season.
          </p>
        </div>
      </section>

      {programs.map((program, i) => (
        <section
          key={program.id}
          id={program.id}
          className={
            i % 2 === 0
              ? "bg-muted py-20 md:py-28"
              : "bg-background py-20 md:py-28"
          }
        >
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
            <div className={`mb-8 h-1 w-16 ${program.bgAccent}`} />

            <div
              className={`grid grid-cols-1 items-start gap-14 lg:grid-cols-2 ${i % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}
            >
              <div
                className={`relative h-72 overflow-hidden md:h-[420px] ${i % 2 !== 0 ? "lg:col-start-2" : ""}`}
              >
                <Image
                  src="/placeholder.svg?height=420&width=700"
                  alt={program.name}
                  fill
                  className="object-cover"
                />
                <div
                  className={`absolute top-5 left-5 px-4 py-2 font-display text-xs font-bold tracking-widest text-white uppercase ${program.bgAccent}`}
                >
                  {program.level}
                </div>
                <div className="absolute right-5 bottom-5 bg-navy px-4 py-2 font-display text-xs font-bold tracking-widest text-white uppercase">
                  {program.sessions}
                </div>
              </div>

              <div
                className={i % 2 !== 0 ? "lg:col-start-1 lg:row-start-1" : ""}
              >
                <p
                  className={`mb-3 font-display text-xs font-bold tracking-[0.25em] uppercase ${program.textAccent}`}
                >
                  {program.tagline}
                </p>
                <h2
                  className="mb-5 font-display leading-none font-black text-foreground uppercase"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                >
                  {program.name}
                </h2>
                <p className="mb-8 text-base leading-relaxed text-seal-gray">
                  {program.description}
                </p>

                <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <h4 className="mb-4 font-display text-sm font-bold tracking-widest text-foreground uppercase">
                      What to Expect
                    </h4>
                    <ul className="flex flex-col gap-2.5">
                      {program.expectations.map((e) => (
                        <li key={e} className="flex items-start gap-2.5">
                          <CheckCircle
                            size={14}
                            className={`mt-0.5 shrink-0 ${program.textAccent}`}
                          />
                          <span className="text-sm leading-snug text-seal-gray">
                            {e}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-4 font-display text-sm font-bold tracking-widest text-foreground uppercase">
                      Required Equipment
                    </h4>
                    <ul className="flex flex-col gap-2.5">
                      {program.equipment.map((e) => (
                        <li key={e} className="flex items-start gap-2.5">
                          <ChevronRight
                            size={14}
                            className={`mt-0.5 shrink-0 ${program.textAccent}`}
                          />
                          <span className="text-sm leading-snug text-seal-gray">
                            {e}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  className={`mb-8 border-l-4 py-1 pl-4 ${program.borderAccent}`}
                >
                  <p className="mb-3 font-display text-xs font-bold tracking-widest text-foreground uppercase">
                    Entry Requirements
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {program.requirements.map((r) => (
                      <li key={r} className="text-sm text-seal-gray">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "default", size: "xl" }),
                    buttonCtaClassName,
                    "text-white hover:opacity-90",
                    program.bgAccent,
                  )}
                >
                  Inquire About This Group
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-navy py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="h-0.5 w-10 bg-cyan-brand" />
            <span className="font-display text-xs font-bold tracking-[0.25em] text-cyan-brand uppercase">
              Get Evaluated
            </span>
            <div className="h-0.5 w-10 bg-cyan-brand" />
          </div>
          <h2
            className="mb-5 font-display leading-none font-black text-white uppercase"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Not Sure Which Group Is Right for You?
          </h2>
          <p className="mb-8 leading-relaxed text-white/70">
            Contact us to schedule a complimentary evaluation swim. Our coaches
            will assess your swimmer and place them in the group that best fits
            their ability and goals.
          </p>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "default", size: "xl" }),
              buttonCtaClassName,
            )}
          >
            Schedule an Evaluation
          </Link>
        </div>
      </section>
    </main>
  );
}
