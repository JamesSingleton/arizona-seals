import { History } from "lucide-react";
import { defineField, defineType } from "sanity";

export const timeline = defineType({
  name: "timeline",
  title: "Timeline",
  type: "object",
  icon: History,
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
      name: "items",
      type: "array",
      title: "Milestones",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "year",
              type: "string",
              title: "Year",
            }),
            defineField({
              name: "title",
              type: "string",
              title: "Title",
            }),
            defineField({
              name: "description",
              type: "text",
              title: "Description",
              rows: 3,
            }),
            defineField({
              name: "event",
              type: "text",
              title: "Event (legacy)",
              rows: 2,
              hidden: true,
              deprecated: {
                reason: "Use description instead",
              },
            }),
          ],
          preview: {
            select: { title: "year", subtitle: "title" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "eyebrow",
    },
    prepare: ({ title, subtitle }) => ({
      title: title || "Timeline",
      subtitle: subtitle || "Timeline Block",
    }),
  },
});
