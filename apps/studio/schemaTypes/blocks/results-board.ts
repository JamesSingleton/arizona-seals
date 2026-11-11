import { Trophy } from "lucide-react";
import { defineField, defineType } from "sanity";

import { buttonsField } from "../common";

export const resultsBoard = defineType({
  name: "resultsBoard",
  title: "Results Board",
  description:
    "Recent meet results and qualifiers. Shows parents the team competes at a high level.",
  type: "object",
  icon: Trophy,
  fields: [
    defineField({
      // The site no longer shows small labels above titles.
      hidden: true,
      name: "eyebrow",
      type: "string",
      title: "Eyebrow",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "intro", type: "text", title: "Intro", rows: 3 }),
    defineField({
      name: "results",
      type: "array",
      title: "Results",
      description: "Newest first. Three to six rows reads best.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "year",
              type: "string",
              title: "Year or season",
              description: "e.g. 2026",
            }),
            defineField({
              name: "meet",
              type: "string",
              title: "Meet or achievement",
              description: "e.g. Speedo Sectionals, Boise",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "detail",
              type: "text",
              title: "Detail",
              description: "Who swam and what they did",
              rows: 2,
            }),
          ],
          preview: {
            select: { title: "meet", subtitle: "year" },
          },
        },
      ],
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Side image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alternative text" }),
      ],
    }),
    buttonsField,
  ],
  preview: {
    select: { title: "title", results: "results" },
    prepare: ({ title, results = [] }) => ({
      title: title || "Results Board",
      subtitle: `${results.length} result${results.length === 1 ? "" : "s"}`,
    }),
  },
});
