import { Hash } from "lucide-react";
import { defineField, defineType } from "sanity";

export const stats = defineType({
  name: "stats",
  title: "Stats",
  type: "object",
  icon: Hash,
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
      name: "stats",
      type: "array",
      title: "Stats",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "number",
              type: "string",
              title: "Number",
              description: "e.g. 300+ or 100%",
            }),
            defineField({
              name: "label",
              type: "string",
              title: "Label",
            }),
          ],
          preview: {
            select: { title: "number", subtitle: "label" },
          },
        },
      ],
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Side Image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "eyebrow",
    },
    prepare: ({ title, subtitle }) => ({
      title: title || "Stats",
      subtitle: subtitle || "Stats Block",
    }),
  },
});
