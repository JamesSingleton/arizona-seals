import { LayoutGrid } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const sponsorsGrid = defineType({
  name: "sponsorsGrid",
  title: "Sponsors Grid",
  type: "object",
  icon: LayoutGrid,
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
      name: "sponsors",
      type: "array",
      title: "Sponsors",
      description: "Leave empty to show all sponsors.",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "sponsor" }],
        }),
      ],
    }),
    defineField({
      name: "footerNote",
      type: "string",
      title: "Footer Note",
    }),
    defineField({
      name: "footerEmail",
      type: "string",
      title: "Footer Email",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({
      title: title || "Sponsors Grid",
      subtitle: "Logo grid",
    }),
  },
});
