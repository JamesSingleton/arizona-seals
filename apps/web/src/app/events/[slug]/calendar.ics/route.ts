import { client } from "@workspace/sanity/client";
import { queryEventBySlug } from "@workspace/sanity/query";

import { formatAddress } from "@/lib/events";
import { getBaseUrl } from "@/utils";

/** iCalendar UTC timestamp: 20261029T010000Z */
const icsDate = (iso: string) =>
  new Date(iso)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

/** All-day dates are the Arizona calendar day: 20261028 */
const icsDay = (iso: string, addDays = 0) => {
  const d = new Date(new Date(iso).getTime() - 7 * 3600_000);
  d.setUTCDate(d.getUTCDate() + addDays);
  return d.toISOString().slice(0, 10).replace(/-/g, "");
};

const escapeIcs = (text: string) =>
  text.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/[,;]/g, "\\$&");

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const path = `/events/${slug}`;
  const event = await client.fetch(queryEventBySlug, { slug: path });
  if (!event?.start || !event.title) {
    return new Response("Event not found", { status: 404 });
  }

  const url = `${getBaseUrl()}${path}`;
  const where = [event.location?.name, formatAddress(event.location)]
    .filter(Boolean)
    .join(", ");
  const timing = event.allDay
    ? [
        `DTSTART;VALUE=DATE:${icsDay(event.start)}`,
        `DTEND;VALUE=DATE:${icsDay(event.end ?? event.start, 1)}`,
      ]
    : [
        `DTSTART:${icsDate(event.start)}`,
        `DTEND:${icsDate(event.end ?? new Date(new Date(event.start).getTime() + 3600_000).toISOString())}`,
      ];

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Arizona Seals Swimming//Events//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${event._id}@arizonaseals.com`,
    `DTSTAMP:${icsDate(new Date().toISOString())}`,
    ...timing,
    `SUMMARY:${escapeIcs(event.title)}`,
    event.summary
      ? `DESCRIPTION:${escapeIcs(`${event.summary}\n\n${url}`)}`
      : `DESCRIPTION:${escapeIcs(url)}`,
    where ? `LOCATION:${escapeIcs(where)}` : "",
    `URL:${url}`,
    event.status === "cancelled" ? "STATUS:CANCELLED" : "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);

  return new Response(`${lines.join("\r\n")}\r\n`, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug}.ics"`,
    },
  });
}
