import { PanelTop } from "lucide-react";
import { defineField, defineType } from "sanity";

export const pageHero = defineType({
  name: "pageHero",
  title: "Page Hero",
  type: "object",
  icon: PanelTop,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      type: "text",
      title: "Subtitle",
      rows: 2,
    }),
    defineField({
      name: "backgroundImage",
      type: "image",
      title: "Background Image",
      options: { hotspot: true },
    }),
    defineField({
      name: "overlay",
      type: "boolean",
      title: "Show Overlay",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "backgroundImage",
    },
    prepare: ({ title, subtitle, media }) => ({
      title: title || "Page Hero",
      subtitle: subtitle || "Page Hero Block",
      media,
    }),
  },
});
