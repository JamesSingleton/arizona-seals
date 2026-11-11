import { CalendarDays } from "lucide-react";
import { defineField, defineType } from "sanity";

import { EVENT_CATEGORIES } from "../documents/event";

export const eventsCalendar = defineType({
  name: "eventsCalendar",
  title: "Events Calendar",
  description:
    "An interactive month / week / day calendar, or a short upcoming list when a limit is set. Events are edited under Club → Events.",
  type: "object",
  icon: CalendarDays,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      initialValue: "Upcoming Events",
    }),
    defineField({ name: "intro", type: "text", title: "Intro", rows: 3 }),
    defineField({
      name: "categories",
      type: "array",
      title: "Only show these types",
      description: "Leave empty to show every type of event.",
      of: [{ type: "string" }],
      options: { list: [...EVENT_CATEGORIES], layout: "grid" },
    }),
    defineField({
      name: "limit",
      type: "number",
      title: "Show a short list instead",
      description:
        "Leave empty for the full calendar. Enter a number (e.g. 3) to show just the next few events as a list, which suits the home page.",
      validation: (rule) => rule.min(1).max(50).integer(),
    }),
    defineField({
      name: "showPast",
      type: "boolean",
      title: "Show past events",
      description: "Short list only: adds a Past tab.",
      initialValue: true,
    }),
    defineField({
      name: "viewAllUrl",
      type: "customUrl",
      title: '"See all events" link',
      description: "Optional. Useful when this block is a short preview.",
    }),
  ],
  preview: {
    select: { title: "title", limit: "limit" },
    prepare: ({ title, limit }) => ({
      title: title || "Events Calendar",
      subtitle: limit ? `Next ${limit} events (list)` : "Full calendar",
    }),
  },
});
