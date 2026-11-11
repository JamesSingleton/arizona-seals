import { ListOrdered } from "lucide-react";
import { defineField, defineType } from "sanity";

import { buttonsField } from "../common";

export const processSteps = defineType({
  name: "processSteps",
  title: "Numbered Steps",
  description:
    "A numbered how-it-works sequence, e.g. what happens at a tryout.",
  type: "object",
  icon: ListOrdered,
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
      name: "steps",
      type: "array",
      title: "Steps",
      validation: (rule) => rule.min(2).max(6),
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Step title",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              type: "text",
              title: "Description",
              rows: 3,
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        },
      ],
    }),
    defineField({
      name: "variant",
      type: "string",
      title: "Background",
      options: {
        list: [
          { title: "Light", value: "default" },
          { title: "Muted", value: "muted" },
          { title: "Navy", value: "navy" },
        ],
        layout: "radio",
      },
      initialValue: "default",
    }),
    buttonsField,
  ],
  preview: {
    select: { title: "title", steps: "steps" },
    prepare: ({ title, steps = [] }) => ({
      title: title || "Numbered Steps",
      subtitle: `${steps.length} step${steps.length === 1 ? "" : "s"}`,
    }),
  },
});
