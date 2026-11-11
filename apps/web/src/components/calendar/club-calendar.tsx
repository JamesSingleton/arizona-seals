"use client";

import { cn } from "@workspace/ui/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  addMonths,
  type DayKey,
  dayNumber,
  indexByDay,
  labelLongDay,
  labelMonth,
  labelWeekdayLong,
  labelWeekdayShort,
  monthGrid,
  sameMonth,
  weekDays,
} from "@/lib/calendar-dates";
import {
  arizonaDayKey,
  type ClubEvent,
  categoryLabel,
  EVENT_CATEGORY_LABELS,
  type EventCategory,
  formatEventWhen,
} from "@/lib/events";
import { CATEGORY_STYLES, categoryStyle } from "./category";
import { EventDialog } from "./event-dialog";

export function ClubCalendar({
  events,
  snapshotAt,
}: {
  events: ClubEvent[];
  /** Server time of the query; used until the browser's clock takes over. */
  snapshotAt?: string | null;
}) {
  const initialToday = arizonaDayKey(
    snapshotAt ? new Date(snapshotAt) : new Date(0),
  );
  const [today, setToday] = useState(initialToday);
  const [anchor, setAnchor] = useState<DayKey>(initialToday);
  const [selected, setSelected] = useState<ClubEvent | null>(null);
  const touched = useRef(false);
  const pathname = usePathname();

  // Cached pages can be days old: switch to the visitor's real "today".
  useEffect(() => {
    const now = arizonaDayKey(new Date());
    setToday(now);
    if (!touched.current) setAnchor(now);
  }, []);

  // Next keeps this page's state when you leave and come back, so make sure
  // the details panel is closed whenever the URL changes.
  useEffect(() => {
    setSelected(null);
  }, [pathname]);

  const byDay = useMemo(() => indexByDay(events), [events]);

  const go = (next: DayKey) => {
    touched.current = true;
    setAnchor(next);
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-foreground pb-4">
        <h3 aria-live="polite" className="text-3xl text-foreground md:text-4xl">
          {labelMonth(anchor)}
        </h3>
        <div className="flex">
          <button
            type="button"
            onClick={() => go(addMonths(anchor, -1))}
            className="flex size-11 items-center justify-center border-2 border-foreground text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            <ChevronLeft aria-hidden className="size-5" />
            <span className="sr-only">Previous month</span>
          </button>
          <button
            type="button"
            onClick={() => go(today)}
            className="label -ml-0.5 h-11 border-2 border-foreground px-4 text-base font-extrabold text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => go(addMonths(anchor, 1))}
            className="-ml-0.5 flex size-11 items-center justify-center border-2 border-foreground text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            <ChevronRight aria-hidden className="size-5" />
            <span className="sr-only">Next month</span>
          </button>
        </div>
      </div>

      <Legend />

      <MonthView
        anchor={anchor}
        today={today}
        byDay={byDay}
        onSelect={setSelected}
        onPickDay={go}
      />

      <EventDialog event={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function Legend() {
  return (
    <ul
      aria-label="Event types"
      className="mt-4 mb-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-seal-gray"
    >
      {(Object.keys(CATEGORY_STYLES) as EventCategory[]).map((category) => (
        <li key={category} className="flex items-center gap-2">
          <span
            aria-hidden
            className={cn("size-3", CATEGORY_STYLES[category].dot)}
          />
          {EVENT_CATEGORY_LABELS[category]}
        </li>
      ))}
    </ul>
  );
}

/** One event as a compact button that opens the details dialog. */
function EventChip({
  event,
  onSelect,
}: {
  event: ClubEvent;
  onSelect: (event: ClubEvent) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(event)}
      className={cn(
        "flex w-full border-l-4 bg-water px-2 py-1 text-left text-sm leading-snug text-foreground transition-colors hover:bg-cyan-brand/15",
        categoryStyle(event.category).bar,
        event.status === "cancelled" && "line-through",
      )}
    >
      <span className="min-w-0 flex-1 truncate font-semibold">
        {event.title}
      </span>
      <span className="sr-only">
        , {categoryLabel(event.category)}, {formatEventWhen(event)}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Month                                                               */
/* ------------------------------------------------------------------ */

function MonthView({
  anchor,
  today,
  byDay,
  onSelect,
  onPickDay,
}: {
  anchor: DayKey;
  today: DayKey;
  byDay: Map<DayKey, ClubEvent[]>;
  onSelect: (event: ClubEvent) => void;
  onPickDay: (day: DayKey) => void;
}) {
  const days = monthGrid(anchor);
  const weeks = Array.from({ length: 6 }, (_, i) =>
    days.slice(i * 7, i * 7 + 7),
  );
  // Drop a trailing week that's entirely next month.
  const visibleWeeks = weeks.filter(
    (week, i) => i < 5 || week.some((day) => sameMonth(day, anchor)),
  );
  const headers = weekDays(days[0] as DayKey);

  // Small screens: the picked day's events are listed under the grid.
  const pickedDay = anchor;
  const pickedEvents = byDay.get(pickedDay) ?? [];
  const monthHasEvents = days.some(
    (day) => sameMonth(day, anchor) && byDay.has(day),
  );

  return (
    <>
      {/* Wide screens: full month grid */}
      <table className="hidden w-full table-fixed border-collapse md:table">
        <caption className="sr-only">
          {labelMonth(anchor)} events. Select an event for details.
        </caption>
        <thead>
          <tr>
            {headers.map((day) => (
              <th
                key={day}
                scope="col"
                className="label border border-foreground/15 bg-water py-2 text-sm text-foreground"
              >
                <abbr title={labelWeekdayLong(day)} className="no-underline">
                  {labelWeekdayShort(day)}
                </abbr>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleWeeks.map((week) => (
            <tr key={week[0]}>
              {week.map((day) => {
                const list = byDay.get(day) ?? [];
                const inMonth = sameMonth(day, anchor);
                const isToday = day === today;
                return (
                  <td
                    key={day}
                    className={cn(
                      "h-32 border border-foreground/15 p-1.5 align-top",
                      !inMonth && "bg-muted/60",
                    )}
                  >
                    <span
                      className={cn(
                        "mb-1 flex size-8 items-center justify-center font-display text-lg font-bold",
                        isToday && "bg-navy text-white",
                        !isToday && !inMonth && "text-seal-gray",
                        !isToday && inMonth && "text-foreground",
                      )}
                    >
                      {dayNumber(day)}
                      {isToday ? (
                        <span className="sr-only"> (today)</span>
                      ) : null}
                    </span>
                    {list.length ? (
                      <ul className="space-y-1">
                        {list.map((event) => (
                          <li key={event._id}>
                            <EventChip event={event} onSelect={onSelect} />
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Small screens: compact grid with dots, then the picked day's events */}
      <div className="md:hidden">
        <div className="grid grid-cols-7 text-center">
          {headers.map((day) => (
            <div
              key={day}
              aria-hidden
              className="label py-2 text-sm text-seal-gray"
            >
              {labelWeekdayShort(day).slice(0, 1)}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px border border-foreground/15 bg-foreground/15">
          {visibleWeeks.flat().map((day) => {
            const list = byDay.get(day) ?? [];
            const inMonth = sameMonth(day, anchor);
            const isToday = day === today;
            const isPicked = day === pickedDay;
            return (
              <button
                key={day}
                type="button"
                aria-pressed={isPicked}
                aria-label={`${labelLongDay(day)}${isToday ? ", today" : ""}, ${list.length} ${list.length === 1 ? "event" : "events"}`}
                onClick={() => onPickDay(day)}
                className={cn(
                  "flex h-14 flex-col items-center px-1 py-1.5",
                  inMonth ? "bg-background" : "bg-muted",
                  isPicked && "bg-navy text-white",
                )}
              >
                <span
                  className={cn(
                    "font-display text-base font-bold",
                    !isPicked &&
                      isToday &&
                      "text-cyan-brand underline decoration-2 underline-offset-4",
                    !isPicked && !inMonth && "text-seal-gray",
                  )}
                >
                  {dayNumber(day)}
                </span>
                {list.length ? (
                  <span
                    aria-hidden
                    className="mt-auto flex flex-wrap justify-center gap-0.5"
                  >
                    {list.slice(0, 3).map((event) => (
                      <span
                        key={event._id}
                        className={cn(
                          "size-1.5",
                          isPicked
                            ? "bg-white"
                            : categoryStyle(event.category).dot,
                        )}
                      />
                    ))}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        <h4 className="mt-6 mb-3 text-2xl text-foreground">
          {labelLongDay(pickedDay)}
        </h4>
        {pickedEvents.length ? (
          <ul className="space-y-2">
            {pickedEvents.map((event) => (
              <li key={event._id}>
                <button
                  type="button"
                  onClick={() => onSelect(event)}
                  className={cn(
                    "w-full border-l-4 bg-water p-4 text-left",
                    categoryStyle(event.category).bar,
                  )}
                >
                  <span className="block text-lg font-semibold text-foreground">
                    {event.title}
                  </span>
                  <span className="mt-1 block text-base text-seal-gray">
                    {formatEventWhen(event)}
                    {event.location?.name ? ` · ${event.location.name}` : ""}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-base text-seal-gray">
            {monthHasEvents
              ? "Nothing on this day. Days with dots have events."
              : `No events posted for ${labelMonth(anchor)} yet.`}
          </p>
        )}
      </div>
    </>
  );
}
