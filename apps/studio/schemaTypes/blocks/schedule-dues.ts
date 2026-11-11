import { CalendarClock } from "lucide-react";
import { defineField, defineType } from "sanity";

import { buttonsField } from "../common";

export const scheduleDues = defineType({
  name: "scheduleDues",
  title: "Practice Schedule & Dues",
  description:
    "Table of every training group with its practice times and monthly dues. Times and dues are edited on each Program document.",
  type: "object",
  icon: CalendarClock,
  fields: [
    defineField({
      // The site no longer shows small labels above titles.
      hidden: true,
      name: "eyebrow",
      type: "string",
      title: "Eyebrow",
      initialValue: "Schedule & Dues",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      initialValue: "Practice Times and Monthly Dues",
    }),
    defineField({
      name: "intro",
      type: "text",
      title: "Intro",
      rows: 3,
    }),
    defineField({
      name: "programs",
      type: "array",
      title: "Programs",
      description: "Leave empty to show every program in desk order",
      of: [{ type: "reference", to: [{ type: "program" }] }],
    }),
    defineField({
      name: "showDues",
      type: "boolean",
      title: "Show monthly dues",
      description:
        "Turn off to show practice times only. Groups without dues filled in show the fallback text.",
      initialValue: true,
    }),
    defineField({
      name: "duesFallback",
      type: "string",
      title: "Text when a group has no dues entered",
      initialValue: "Shared at your tryout",
    }),
    defineField({
      name: "fees",
      type: "array",
      title: "Other fees",
      description:
        "One-time or annual costs, e.g. USA Swimming registration or meet fees",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              type: "string",
              title: "Fee",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "amount",
              type: "string",
              title: "Amount",
              description: "e.g. $85 per year",
            }),
            defineField({
              name: "note",
              type: "string",
              title: "Note",
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "amount" },
          },
        },
      ],
    }),
    defineField({
      name: "footnote",
      type: "text",
      title: "Footnote",
      description: "e.g. when dues are billed, or that times change by season",
      rows: 2,
    }),
    buttonsField,
  ],
  preview: {
    select: { title: "title", subtitle: "eyebrow" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Practice Schedule & Dues",
      subtitle: subtitle || "Schedule & Dues Block",
    }),
  },
});
