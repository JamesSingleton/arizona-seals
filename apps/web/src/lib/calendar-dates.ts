/**
 * Plain calendar-day arithmetic for the events calendar. Days are
 * "YYYY-MM-DD" strings in Arizona time, and all math runs on UTC midnights,
 * so nothing shifts with the visitor's own time zone or daylight saving.
 */
import { arizonaDayKey, type ClubEvent } from "./events";

export type DayKey = string;

export function parseKey(key: DayKey) {
  const [y, m, d] = key.split("-").map(Number);
  return { y: y ?? 1970, m: m ?? 1, d: d ?? 1 };
}

const toUtc = (key: DayKey) => {
  const { y, m, d } = parseKey(key);
  return Date.UTC(y, m - 1, d);
};

export function fromUtc(ms: number): DayKey {
  return new Date(ms).toISOString().slice(0, 10);
}

export function addDays(key: DayKey, days: number): DayKey {
  return fromUtc(toUtc(key) + days * 86_400_000);
}

export function addMonths(key: DayKey, months: number): DayKey {
  const { y, m } = parseKey(key);
  return fromUtc(Date.UTC(y, m - 1 + months, 1));
}

/** 0 = Sunday. */
export function weekday(key: DayKey): number {
  return new Date(toUtc(key)).getUTCDay();
}

/** Weeks start on Sunday, as on most US calendars. */
export function startOfWeek(key: DayKey): DayKey {
  return addDays(key, -weekday(key));
}

export function startOfMonth(key: DayKey): DayKey {
  const { y, m } = parseKey(key);
  return fromUtc(Date.UTC(y, m - 1, 1));
}

export function sameMonth(a: DayKey, b: DayKey): boolean {
  return a.slice(0, 7) === b.slice(0, 7);
}

/** Six full weeks covering the month, starting on a Sunday. */
export function monthGrid(key: DayKey): DayKey[] {
  const first = startOfWeek(startOfMonth(key));
  return Array.from({ length: 42 }, (_, i) => addDays(first, i));
}

export function weekDays(key: DayKey): DayKey[] {
  const first = startOfWeek(key);
  return Array.from({ length: 7 }, (_, i) => addDays(first, i));
}

const fmt = (options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...options });
const monthYearFmt = fmt({ month: "long", year: "numeric" });
const longDayFmt = fmt({
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});
const shortDayFmt = fmt({ month: "short", day: "numeric" });
const weekdayShortFmt = fmt({ weekday: "short" });
const weekdayLongFmt = fmt({ weekday: "long" });

export const labelMonth = (key: DayKey) => monthYearFmt.format(toUtc(key));
export const labelLongDay = (key: DayKey) => longDayFmt.format(toUtc(key));
export const labelShortDay = (key: DayKey) => shortDayFmt.format(toUtc(key));
export const labelWeekdayShort = (key: DayKey) =>
  weekdayShortFmt.format(toUtc(key));
export const labelWeekdayLong = (key: DayKey) =>
  weekdayLongFmt.format(toUtc(key));

export const dayNumber = (key: DayKey) => String(parseKey(key).d);

/** Every Arizona day an event touches, first to last. */
export function eventDayKeys(event: ClubEvent): DayKey[] {
  if (!event.start) return [];
  const first = arizonaDayKey(new Date(event.start));
  let last = event.end ? arizonaDayKey(new Date(event.end)) : first;
  // A timed event ending exactly at midnight doesn't occupy the next day.
  if (
    event.end &&
    !event.allDay &&
    last !== first &&
    minutesIntoDay(event.end) === 0
  ) {
    last = addDays(last, -1);
  }
  const days: DayKey[] = [];
  for (
    let day = first;
    day <= last && days.length < 62;
    day = addDays(day, 1)
  ) {
    days.push(day);
  }
  return days;
}

/** Minutes after Arizona midnight (Arizona is UTC-7 all year). */
export function minutesIntoDay(iso: string): number {
  const shifted = new Date(Date.parse(iso) - 7 * 3_600_000);
  return shifted.getUTCHours() * 60 + shifted.getUTCMinutes();
}

/**
 * Timed, single-day events go on the hour grid. All-day and multi-day events
 * (most swim meets) go in the all-day lane above it.
 */
export function isTimedSingleDay(event: ClubEvent): boolean {
  return !event.allDay && eventDayKeys(event).length === 1;
}

/** Map of day → events on that day, each list sorted by start time. */
export function indexByDay(events: ClubEvent[]): Map<DayKey, ClubEvent[]> {
  const map = new Map<DayKey, ClubEvent[]>();
  for (const event of events) {
    for (const day of eventDayKeys(event)) {
      const list = map.get(day) ?? [];
      list.push(event);
      map.set(day, list);
    }
  }
  for (const list of map.values()) {
    list.sort((a, b) => {
      // All-day / multi-day first, then by start time.
      const aTimed = isTimedSingleDay(a) ? 1 : 0;
      const bTimed = isTimedSingleDay(b) ? 1 : 0;
      if (aTimed !== bTimed) return aTimed - bTimed;
      return Date.parse(a.start ?? "") - Date.parse(b.start ?? "");
    });
  }
  return map;
}
