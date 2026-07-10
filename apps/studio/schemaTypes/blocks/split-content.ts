import { Columns2 } from "lucide-react";
import { defineField, defineType } from "sanity";

import { buttonsField, richTextField } from "../common";

export const splitContent = defineType({
  name: "splitContent",
  title: "Split Content",
  type: "object",
  icon: Columns2,
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
    richTextField,
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
      description: "Where the image sits relative to the text content",
      options: {
        list: [
          { title: "End (after text)", value: "end" },
          { title: "Start (before text)", value: "start" },
        ],
        layout: "radio",
      },
      initialValue: "end",
    }),

    buttonsField,
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "eyebrow",
      media: "image",
    },
    prepare: ({ title, subtitle, media }) => ({
      title: title || "Split Content",
      subtitle: subtitle || "Split Content Block",
      media,
    }),
  },
});
