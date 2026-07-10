import { ListChecks } from "lucide-react";
import { defineField, defineType } from "sanity";

import { buttonsField } from "../common";

export const checklistSplit = defineType({
  name: "checklistSplit",
  title: "Checklist Split",
  type: "object",
  icon: ListChecks,
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "paragraphs",
      type: "array",
      title: "Paragraphs",
      of: [{ type: "text", rows: 3 }],
    }),
    defineField({
      name: "items",
      type: "array",
      title: "Checklist Items",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imagePlacement",
      type: "string",
      title: "Image Placement",
      options: {
        list: [
          { title: "End (right)", value: "end" },
          { title: "Start (left)", value: "start" },
        ],
        layout: "radio",
      },
      initialValue: "end",
    }),
    defineField({
      name: "variant",
      type: "string",
      title: "Background",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Muted", value: "muted" },
          { title: "Soft Cyan", value: "soft" },
        ],
        layout: "radio",
      },
      initialValue: "default",
    }),
    buttonsField,
  ],
  preview: {
    select: { title: "title", eyebrow: "eyebrow" },
    prepare: ({ title, eyebrow }) => ({
      title: title || "Checklist Split",
      subtitle: eyebrow || "Split with checklist",
    }),
  },
});
