import { Star } from "lucide-react";
import { defineField, defineType } from "sanity";

import { buttonsField, richTextField } from "../common";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  icon: Star,
  type: "object",
  fields: [
    defineField({
      name: "layout",
      type: "string",
      title: "Layout",
      options: {
        list: [
          { title: "Split (image + text)", value: "split" },
          { title: "Full Bleed", value: "fullBleed" },
        ],
        layout: "radio",
      },
      initialValue: "split",
    }),
    defineField({
      name: "badge",
      type: "string",
      title: "Eyebrow / Badge",
      description: "Small text above the title",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "titleAccent",
      type: "string",
      title: "Title Accent Line",
      description:
        "Optional accent line rendered in brand color (full-bleed layout)",
      hidden: ({ parent }) => parent?.layout !== "fullBleed",
    }),
    richTextField,
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
    }),
    buttonsField,
  ],
  preview: {
    select: {
      title: "title",
      layout: "layout",
    },
    prepare: ({ title, layout }) => ({
      title,
      subtitle: `Hero (${layout === "fullBleed" ? "Full Bleed" : "Split"})`,
    }),
  },
});
