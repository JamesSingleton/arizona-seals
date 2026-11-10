import { buttonCtaClassName } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";

import type { SanityButtonProps } from "@/types";
import { SanityButtons } from "../elements/sanity-buttons";
import { SectionHeading } from "../elements/section-heading";

type ScheduleProgram = {
  _id?: string;
  id?: string | null;
  name?: string | null;
  level?: string | null;
  accent?: string | null;
  sessions?: string | null;
  ageRange?: string | null;
  monthlyDues?: string | null;
  practiceTimes?:
    | { _key?: string; days?: string | null; time?: string | null }[]
    | null;
};

export type ScheduleDuesProps = {
  eyebrow?: string | null;
  title?: string | null;
  intro?: string | null;
  programs?: ScheduleProgram[] | null;
  showDues?: boolean | null;
  duesFallback?: string | null;
  fees?:
    | {
        _key?: string;
        label?: string | null;
        amount?: string | null;
        note?: string | null;
      }[]
    | null;
  footnote?: string | null;
  buttons?: SanityButtonProps[] | null;
};

function PracticeTimes({ program }: { program: ScheduleProgram }) {
  const times = program.practiceTimes?.filter((row) => row?.days) ?? [];
  if (!times.length) {
    return (
      <p className="text-sm text-seal-gray">
        {program.sessions || "Ask a coach"}
      </p>
    );
  }
  return (
    <dl className="space-y-1.5">
      {times.map((row) => (
        <div
          key={row._key ?? `${row.days}-${row.time}`}
          className="flex flex-wrap gap-x-3 text-sm md:text-base"
        >
          <dt className="font-semibold text-foreground">{row.days}</dt>
          <dd className="text-seal-gray tabular-nums">{row.time}</dd>
        </div>
      ))}
    </dl>
  );
}

function GroupName({ program }: { program: ScheduleProgram }) {
  const name = (
    <span className="font-display text-2xl leading-none font-black text-foreground uppercase">
      {program.name}
    </span>
  );
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden
        className="h-10 w-1.5 shrink-0 bg-cyan-brand"
        style={program.accent ? { backgroundColor: program.accent } : undefined}
      />
      <div>
        {program.id ? (
          <Link
            href={`/programs#${program.id}`}
            className="underline-offset-4 hover:underline"
          >
            {name}
          </Link>
        ) : (
          name
        )}
        {program.level ? (
          <p className="mt-1 font-display text-xs font-bold tracking-[0.2em] text-seal-gray uppercase">
            {program.level}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function ScheduleDues({
  eyebrow,
  title,
  intro,
  programs,
  showDues,
  duesFallback,
  fees,
  footnote,
  buttons,
}: ScheduleDuesProps) {
  const groups = programs?.filter((program) => program?.name) ?? [];
  if (!groups.length) return null;

  const withDues = showDues !== false;
  const fallback = duesFallback || "Shared at your tryout";
  const feeRows = fees?.filter((fee) => fee?.label) ?? [];
  const th =
    "px-5 py-4 text-left font-display text-xs font-bold tracking-[0.2em] text-white uppercase";

  return (
    <section
      id="schedule"
      className="scroll-mt-24 bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          intro={intro}
          className="mb-10 md:mb-12"
        />

        {/* Desktop: one comparable table. */}
        <div className="hidden overflow-hidden ring-1 ring-border md:block">
          <table className="w-full border-collapse">
            <thead className="bg-navy">
              <tr>
                <th scope="col" className={th}>
                  Group
                </th>
                <th scope="col" className={th}>
                  Ages
                </th>
                <th scope="col" className={th}>
                  Practice Times
                </th>
                {withDues ? (
                  <th scope="col" className={cn(th, "text-right")}>
                    Monthly Dues
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {groups.map((program) => (
                <tr
                  key={program._id ?? program.name}
                  className="align-top even:bg-muted/50"
                >
                  <th scope="row" className="px-5 py-6 text-left font-normal">
                    <GroupName program={program} />
                  </th>
                  <td className="px-5 py-6 text-base whitespace-nowrap text-foreground">
                    {program.ageRange || "—"}
                  </td>
                  <td className="px-5 py-6">
                    <PracticeTimes program={program} />
                  </td>
                  {withDues ? (
                    <td className="px-5 py-6 text-right">
                      {program.monthlyDues ? (
                        <span className="font-display text-2xl leading-none font-black text-foreground">
                          {program.monthlyDues}
                        </span>
                      ) : (
                        <span className="text-sm text-seal-gray">
                          {fallback}
                        </span>
                      )}
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: one card per group. */}
        <ul className="space-y-4 md:hidden">
          {groups.map((program) => (
            <li
              key={program._id ?? program.name}
              className="bg-background p-5 ring-1 ring-border"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <GroupName program={program} />
                {program.ageRange ? (
                  <span className="shrink-0 bg-muted px-2.5 py-1 font-display text-xs font-bold tracking-widest text-foreground uppercase">
                    Ages {program.ageRange}
                  </span>
                ) : null}
              </div>
              <PracticeTimes program={program} />
              {withDues ? (
                <p className="mt-4 flex items-baseline justify-between gap-4 border-t border-border pt-4">
                  <span className="font-display text-xs font-bold tracking-[0.2em] text-seal-gray uppercase">
                    Monthly dues
                  </span>
                  {program.monthlyDues ? (
                    <span className="font-display text-2xl leading-none font-black text-foreground">
                      {program.monthlyDues}
                    </span>
                  ) : (
                    <span className="text-right text-sm text-seal-gray">
                      {fallback}
                    </span>
                  )}
                </p>
              ) : null}
            </li>
          ))}
        </ul>

        {feeRows.length ? (
          <dl className="mt-8 grid grid-cols-1 gap-px bg-border ring-1 ring-border sm:grid-cols-2 lg:grid-cols-3">
            {feeRows.map((fee) => (
              <div key={fee._key ?? fee.label} className="bg-background p-5">
                <dt className="font-display text-xs font-bold tracking-[0.2em] text-seal-gray uppercase">
                  {fee.label}
                </dt>
                <dd className="mt-2">
                  {fee.amount ? (
                    <span className="font-display text-2xl leading-none font-black text-foreground">
                      {fee.amount}
                    </span>
                  ) : null}
                  {fee.note ? (
                    <span className="mt-1 block text-sm text-seal-gray">
                      {fee.note}
                    </span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        {footnote ? (
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-seal-gray">
            {footnote}
          </p>
        ) : null}

        {buttons?.length ? (
          <SanityButtons
            placement="schedule_dues"
            buttons={buttons}
            className="mt-10 gap-3"
            buttonClassName={cn(buttonCtaClassName, "h-12 px-8")}
          />
        ) : null}
      </div>
    </section>
  );
}
