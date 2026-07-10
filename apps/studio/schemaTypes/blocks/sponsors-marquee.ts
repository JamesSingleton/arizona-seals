import { GalleryHorizontal } from "lucide-react";
import { defineField, defineType } from "sanity";

export const sponsorsMarquee = defineType({
  name: "sponsorsMarquee",
  title: "Sponsors Marquee",
  type: "object",
  icon: GalleryHorizontal,
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow",
      initialValue: "Proudly Supported By",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      initialValue: "Our Sponsors & Partners",
    }),
    defineField({
      name: "viewAllLabel",
      type: "string",
      title: "View All Label",
      initialValue: "View All Sponsors",
    }),
    defineField({
      name: "viewAllUrl",
      type: "customUrl",
      title: "View All Link",
    }),
    defineField({
      name: "sponsors",
      type: "array",
      title: "Sponsors",
      description:
        "Leave empty to show all featured sponsors in the marquee (alphabetical).",
      of: [
        {
          type: "reference",
          to: [{ type: "sponsor" }],
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
      title: title || "Sponsors Marquee",
      subtitle: subtitle || "Sponsors Marquee Block",
    }),
  },
});
