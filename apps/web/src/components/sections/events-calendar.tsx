"use client";

import { buttonVariants } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  type ClubEvent,
  categoryLabel,
  dateTileParts,
  eventPath,
  formatEventWhen,
  isUpcoming,
  monthLabel,
} from "@/lib/events";
import { ClubCalendar } from "../calendar/club-calendar";
import { SectionHeading } from "../elements/section-heading";

export type EventsCalendarProps = {
  title?: string | null;
  intro?: string | null;
  limit?: number | null;
  showPast?: boolean | null;
  viewAllUrl?: { href?: string | null } | null;
  /** Server time of the query, used until the browser's clock takes over. */
  snapshotAt?: string | null;
  events?: ClubEvent[] | null;
};

type View = "upcoming" | "past";

function groupByMonth(events: ClubEvent[]) {
  const groups: { label: string; events: ClubEvent[] }[] = [];
  for (const event of events) {
    const label = monthLabel(event.start as string);
    const last = groups.at(-1);
    if (last?.label === label) last.events.push(event);
    else groups.push({ label, events: [event] });
  }
  return groups;
}

export function EventsCalendar({
  title,
  intro,
  limit,
  showPast,
  viewAllUrl,
  snapshotAt,
  events,
}: EventsCalendarProps) {
  // Render with the query's timestamp so server and browser HTML match,
  // then switch to the visitor's clock (cached pages can be days old).
  const [now, setNow] = useState(() =>
    snapshotAt ? Date.parse(snapshotAt) : 0,
  );
  useEffect(() => setNow(Date.now()), []);
  const [view, setView] = useState<View>("upcoming");

  const dated = useMemo(
    () =>
      (events ?? [])
        .filter((e) => e.start && e.title)
        .sort((x, y) => Date.parse(x.start ?? "") - Date.parse(y.start ?? "")),
    [events],
  );
  const { upcoming, past } = useMemo(() => {
    const up = dated.filter((e) => isUpcoming(e, now));
    const down = dated.filter((e) => !isUpcoming(e, now)).reverse();
    return { upcoming: limit ? up.slice(0, limit) : up, past: down };
  }, [dated, now, limit]);

  // Full page: the interactive month / week / day calendar.
  // With a limit (e.g. a home-page preview): a short list of what's next.
  if (!limit) {
    return (
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <SectionHeading
            title={title || "Events"}
            intro={intro}
            className="mb-10 md:mb-12"
          />
          <ClubCalendar events={dated} snapshotAt={snapshotAt} />
        </div>
      </section>
    );
  }

  const allowPast = showPast !== false && past.length > 0;
  const visible = view === "past" && allowPast ? past : upcoming;
  const groups = groupByMonth(visible);
  const listId = "events-list";

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <SectionHeading title={title || "Events"} intro={intro} />
          {allowPast ? (
            <fieldset className="flex shrink-0">
              <legend className="sr-only">Show</legend>
              {(["upcoming", "past"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={view === option}
                  aria-controls={listId}
                  onClick={() => setView(option)}
                  className={cn(
                    "label h-11 border-2 border-foreground px-5 text-base font-extrabold transition-colors",
                    option === "past" && "-ml-0.5",
                    view === option
                      ? "bg-foreground text-background"
                      : "bg-transparent text-foreground hover:bg-foreground/10",
                  )}
                >
                  {option === "upcoming"
                    ? `Upcoming (${upcoming.length})`
                    : `Past (${past.length})`}
                </button>
              ))}
            </fieldset>
          ) : null}
        </div>

        <div id={listId} aria-live="polite">
          {groups.length === 0 ? (
            <div className="border-t-2 border-foreground py-10">
              <p className="max-w-xl text-lg leading-relaxed text-seal-gray">
                {view === "past"
                  ? "No past events yet."
                  : "No upcoming events are posted yet. Meets and community events are added here as soon as they're confirmed."}
              </p>
            </div>
          ) : (
            groups.map((group) => (
              <section key={group.label} aria-label={group.label}>
                <h3 className="border-t-2 border-foreground pt-4 pb-2 text-2xl text-foreground md:text-3xl">
                  {group.label}
                </h3>
                <ol>
                  {group.events.map((event) => (
                    <EventRow key={event._id} event={event} />
                  ))}
                </ol>
              </section>
            ))
          )}
        </div>

        {viewAllUrl?.href ? (
          <Link
            href={viewAllUrl.href}
            className={cn(buttonVariants({ variant: "secondary" }), "mt-8")}
          >
            See all events
          </Link>
        ) : null}
      </div>
    </section>
  );
}

function EventRow({ event }: { event: ClubEvent }) {
  const tile = dateTileParts(event.start as string);
  const cancelled = event.status === "cancelled";
  const postponed = event.status === "postponed";
  const place = event.location?.name || event.location?.city;

  return (
    <li className="relative grid has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-ring grid-cols-[4.5rem_1fr] gap-x-5 border-t border-foreground/15 py-6 first:border-t-0 sm:grid-cols-[5.5rem_1fr] sm:gap-x-8">
      {/* Date tile is decorative; the full date is in the text beside it. */}
      <div
        aria-hidden
        className="on-dark flex flex-col items-center justify-center bg-navy py-3 text-white"
      >
        <span className="label text-xs text-pool">{tile.weekday}</span>
        <span className="display text-4xl leading-none sm:text-5xl">
          {tile.day}
        </span>
        <span className="label text-xs">{tile.month}</span>
      </div>

      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="label bg-water px-2.5 py-1 text-sm text-foreground">
            {categoryLabel(event.category)}
          </span>
          {cancelled || postponed ? (
            <span className="label bg-destructive px-2.5 py-1 text-sm text-white">
              {cancelled ? "Cancelled" : "Postponed"}
            </span>
          ) : null}
        </div>
        <h4
          className={cn(
            "text-2xl text-foreground md:text-3xl",
            cancelled && "line-through decoration-2",
          )}
        >
          {/* The stretched link makes the whole row clickable. */}
          <Link
            href={eventPath(event.slug)}
            className="after:absolute after:inset-0 hover:text-cyan-brand focus-visible:outline-none"
          >
            {event.title}
          </Link>
        </h4>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-base text-foreground">
          <time dateTime={event.start ?? undefined}>
            {formatEventWhen(event)}
          </time>
          {place ? (
            <span className="inline-flex items-center gap-1.5 text-seal-gray">
              <MapPin aria-hidden className="size-4 text-cyan-brand" />
              {place}
            </span>
          ) : null}
        </p>
        {event.summary ? (
          <p className="mt-2 max-w-3xl leading-relaxed text-seal-gray">
            {event.summary}
          </p>
        ) : null}
      </div>
    </li>
  );
}
