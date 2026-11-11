import { CalendarDays } from "lucide-react";
import { defineField, defineType } from "sanity";

import { PathnameFieldComponent } from "../../components/slug-field-component";
import { createSlug, isUnique } from "../../utils/slug";

export const EVENT_CATEGORIES = [
  { title: "Swim meet", value: "meet" },
  { title: "Community event", value: "community" },
  { title: "Team event", value: "team" },
  { title: "Tryout", value: "tryout" },
] as const;

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  icon: CalendarDays,
  description:
    "Swim meets, community appearances and team events shown on the events calendar.",
  groups: [
    { name: "details", title: "Details", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      group: "details",
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL",
      group: "details",
      components: { field: PathnameFieldComponent },
      options: { source: "title", slugify: createSlug, isUnique },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Type of event",
      group: "details",
      options: { list: [...EVENT_CATEGORIES], layout: "radio" },
      initialValue: "meet",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "start",
      type: "datetime",
      title: "Starts",
      description:
        "Arizona time. For all-day events, any time on the day works.",
      group: "details",
      options: { timeStep: 15 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "end",
      type: "datetime",
      title: "Ends",
      description: "Optional. For a multi-day meet, set this to the last day.",
      group: "details",
      options: { timeStep: 15 },
      validation: (rule) =>
        rule.custom((end, context) => {
          const start = (context.document as { start?: string } | undefined)
            ?.start;
          if (!end || !start) return true;
          return new Date(end) >= new Date(start)
            ? true
            : "The end must be after the start.";
        }),
    }),
    defineField({
      name: "allDay",
      type: "boolean",
      title: "All-day event",
      description: "Hide times (common for multi-day meets).",
      group: "details",
      initialValue: false,
    }),
    defineField({
      name: "location",
      type: "object",
      title: "Location",
      group: "details",
      fields: [
        defineField({
          name: "name",
          type: "string",
          title: "Venue",
          description: "e.g. Copper Sky Aquatic Center",
        }),
        defineField({ name: "street", type: "string", title: "Street" }),
        defineField({ name: "city", type: "string", title: "City" }),
        defineField({
          name: "state",
          type: "string",
          title: "State",
          initialValue: "AZ",
        }),
        defineField({ name: "zip", type: "string", title: "ZIP" }),
      ],
    }),
    defineField({
      name: "summary",
      type: "text",
      title: "Summary",
      description:
        "One or two sentences shown on the calendar and in search results.",
      rows: 3,
      group: "details",
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: "body",
      type: "richText",
      title: "Details",
      description: "Optional: schedule, what to bring, who's swimming.",
      group: "details",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Photo",
      group: "details",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (rule) =>
            rule
              .warning()
              .custom((alt, context) =>
                (context.parent as { asset?: unknown } | undefined)?.asset &&
                !alt
                  ? "Describe the photo for screen readers."
                  : true,
              ),
        }),
      ],
    }),
    defineField({
      name: "host",
      type: "string",
      title: "Hosted by",
      description: "e.g. Arizona Swimming, City of Maricopa",
      group: "details",
    }),
    defineField({
      name: "linkLabel",
      type: "string",
      title: "Link label",
      description: "e.g. Meet info, Results, Event page",
      group: "details",
    }),
    defineField({
      name: "link",
      type: "customUrl",
      title: "Link",
      group: "details",
    }),
    defineField({
      name: "status",
      type: "string",
      title: "Status",
      group: "details",
      options: {
        list: [
          { title: "Scheduled", value: "scheduled" },
          { title: "Postponed", value: "postponed" },
          { title: "Cancelled", value: "cancelled" },
        ],
        layout: "radio",
      },
      initialValue: "scheduled",
    }),
    defineField({
      name: "seoNoIndex",
      type: "boolean",
      title: "Hide from search engines",
      group: "seo",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Date, newest first",
      name: "startDesc",
      by: [{ field: "start", direction: "desc" }],
    },
    {
      title: "Date, oldest first",
      name: "startAsc",
      by: [{ field: "start", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      start: "start",
      category: "category",
      media: "image",
    },
    prepare: ({ title, start, category, media }) => {
      const label =
        EVENT_CATEGORIES.find((c) => c.value === category)?.title ?? "Event";
      const date = start
        ? new Intl.DateTimeFormat("en-US", {
            timeZone: "America/Phoenix",
            dateStyle: "medium",
          }).format(new Date(start))
        : "No date";
      return { title, subtitle: `${date} · ${label}`, media };
    },
  },
});
