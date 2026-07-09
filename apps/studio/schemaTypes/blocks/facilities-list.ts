import { Building2 } from "lucide-react";
import { defineField, defineType } from "sanity";

export const facilitiesList = defineType({
  name: "facilitiesList",
  title: "Facilities List",
  type: "object",
  icon: Building2,
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow",
      initialValue: "Where We Train",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      initialValue: "Our Facilities",
    }),
    defineField({
      name: "intro",
      type: "text",
      title: "Intro",
      rows: 3,
    }),
    defineField({
      name: "facilities",
      type: "array",
      title: "Facilities",
      description: "Leave empty to show all facilities ordered by sort order",
      of: [
        {
          type: "reference",
          to: [{ type: "facility" }],
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
      title: title || "Facilities List",
      subtitle: subtitle || "Facilities List Block",
    }),
  },
});
