import { LayoutGrid } from "lucide-react";
import { defineField, defineType } from "sanity";

export const programsPreview = defineType({
  name: "programsPreview",
  title: "Programs Preview",
  type: "object",
  icon: LayoutGrid,
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow",
      initialValue: "Training Groups",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      initialValue: "Our Programs",
    }),
    defineField({
      name: "viewAllLabel",
      type: "string",
      title: "View All Label",
      initialValue: "View All Programs",
    }),
    defineField({
      name: "viewAllUrl",
      type: "customUrl",
      title: "View All Link",
    }),
    defineField({
      name: "programs",
      type: "array",
      title: "Programs",
      description: "Leave empty to show all programs ordered by sort order",
      of: [
        {
          type: "reference",
          to: [{ type: "program" }],
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
      title: title || "Programs Preview",
      subtitle: subtitle || "Programs Preview Block",
    }),
  },
});
