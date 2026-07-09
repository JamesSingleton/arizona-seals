import { ListOrdered } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const programsList = defineType({
  name: "programsList",
  title: "Programs List",
  type: "object",
  icon: ListOrdered,
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
      name: "intro",
      type: "text",
      title: "Intro",
      rows: 3,
    }),
    defineField({
      name: "programs",
      type: "array",
      title: "Programs",
      description: "Leave empty to show all programs ordered by sort order.",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "program" }],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", eyebrow: "eyebrow" },
    prepare: ({ title, eyebrow }) => ({
      title: title || "Programs List",
      subtitle: eyebrow || "Full program detail sections",
    }),
  },
});
