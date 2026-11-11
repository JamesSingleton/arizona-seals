/**
 * Date handling for club events. Everything is shown in Arizona time, which
 * has no daylight saving, so a meet at 8 a.m. reads 8 a.m. year-round no
 * matter where the visitor's device thinks it is.
 */
export const EVENT_TIME_ZONE = "America/Phoenix";

export type EventCategory = "meet" | "community" | "team" | "tryout";

export const EVENT_CATEGORY_LABELS: Record<EventCategory, string> = {
  meet: "Swim meet",
  community: "Community event",
  team: "Team event",
  tryout: "Tryout",
};

export type EventLocation = {
  name?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
};

export type ClubEvent = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  category?: string | null;
  start?: string | null;
  end?: string | null;
  allDay?: boolean | null;
  status?: string | null;
  summary?: string | null;
  host?: string | null;
  location?: EventLocation | null;
  linkLabel?: string | null;
  link?: { href?: string | null; openInNewTab?: boolean | null } | null;
};

const fmt = (options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", { timeZone: EVENT_TIME_ZONE, ...options });

const dayFmt = fmt({ weekday: "short", month: "short", day: "numeric" });
const longDayFmt = fmt({
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});
const timeFmt = fmt({ hour: "numeric", minute: "2-digit" });
const monthFmt = fmt({ month: "long", year: "numeric" });
const keyFmt = fmt({ year: "numeric", month: "2-digit", day: "2-digit" });
const partsFmt = fmt({ weekday: "short", month: "short", day: "numeric" });

function arizonaYmd(date: Date) {
  const parts = keyFmt.formatToParts(date);
  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);
  return { y: get("year"), m: get("month"), d: get("day") };
}

/** "2026-10-28" in Arizona time; used to compare calendar days. */
export function arizonaDayKey(date: Date): string {
  const { y, m, d } = arizonaYmd(date);
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export function categoryLabel(category?: string | null): string {
  return EVENT_CATEGORY_LABELS[category as EventCategory] ?? "Event";
}

/** "6:00 PM" becomes "6:00 p.m.", which reads better in running text. */
function friendlyTime(date: Date): string {
  return timeFmt.format(date).replace(" AM", " a.m.").replace(" PM", " p.m.");
}

/** Short date and time line, e.g. "Wed, Oct 28 · 6:00 – 8:00 p.m.". */
export function formatEventWhen(event: ClubEvent): string {
  if (!event.start) return "";
  const start = new Date(event.start);
  const end = event.end ? new Date(event.end) : null;
  const multiDay = end && arizonaDayKey(start) !== arizonaDayKey(end);

  if (multiDay && end) {
    const range = `${dayFmt.format(start)} – ${dayFmt.format(end)}`;
    return event.allDay ? range : `${range} · starts ${friendlyTime(start)}`;
  }
  if (event.allDay) return `${dayFmt.format(start)} · All day`;
  return end
    ? `${dayFmt.format(start)} · ${friendlyTime(start)} – ${friendlyTime(end)}`
    : `${dayFmt.format(start)} · ${friendlyTime(start)}`;
}

/** Long form for an event's own page. */
export function formatEventWhenLong(event: ClubEvent): {
  date: string;
  time?: string;
} {
  if (!event.start) return { date: "" };
  const start = new Date(event.start);
  const end = event.end ? new Date(event.end) : null;
  const multiDay = end && arizonaDayKey(start) !== arizonaDayKey(end);
  const date =
    multiDay && end
      ? `${longDayFmt.format(start)} – ${longDayFmt.format(end)}`
      : longDayFmt.format(start);
  if (event.allDay) return { date, time: "All day" };
  if (multiDay && end) {
    return {
      date,
      time: `Starts ${dayFmt.format(start)}, ${friendlyTime(start)} · ends ${dayFmt.format(end)}, ${friendlyTime(end)} (Arizona time)`,
    };
  }
  const time = end
    ? `${friendlyTime(start)} – ${friendlyTime(end)} (Arizona time)`
    : `${friendlyTime(start)} (Arizona time)`;
  return { date, time };
}

/** Pieces for the date tile: { weekday: "Wed", month: "Oct", day: "28" }. */
export function dateTileParts(iso: string) {
  const parts = partsFmt.formatToParts(new Date(iso));
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return { weekday: get("weekday"), month: get("month"), day: get("day") };
}

export function monthLabel(iso: string): string {
  return monthFmt.format(new Date(iso));
}

/**
 * An event stays "upcoming" until it ends. All-day events (and events with
 * no end) count as running until the end of their last Arizona day.
 */
export function isUpcoming(event: ClubEvent, now: number): boolean {
  if (!event.start) return false;
  const last = new Date(event.end ?? event.start);
  if (event.allDay || !event.end) {
    // Arizona is UTC-7 all year, so the local day ends at 06:59:59Z next day.
    const { y, m, d } = arizonaYmd(last);
    return Date.UTC(y, m - 1, d + 1, 6, 59, 59) >= now;
  }
  return last.getTime() >= now;
}

export function formatAddress(location?: EventLocation | null): string {
  if (!location) return "";
  const cityLine = [location.city, location.state].filter(Boolean).join(", ");
  return [location.street, [cityLine, location.zip].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(", ");
}

export function mapsUrl(location?: EventLocation | null): string | undefined {
  const query = [location?.name, formatAddress(location)]
    .filter(Boolean)
    .join(", ");
  return query
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
    : undefined;
}

export function eventPath(slug?: string | null): string {
  if (!slug) return "/events";
  return slug.startsWith("/") ? slug : `/events/${slug}`;
}
