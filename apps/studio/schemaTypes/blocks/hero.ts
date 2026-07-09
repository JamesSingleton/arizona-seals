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
      name: "variant",
      type: "string",
      title: "Variant",
      options: {
        list: [
          { title: "Split (image + text)", value: "split" },
          { title: "Immersive (full bleed)", value: "immersive" },
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
        "Optional accent line rendered in brand color (immersive variant)",
      hidden: ({ parent }) => parent?.variant !== "immersive",
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
      variant: "variant",
    },
    prepare: ({ title, variant }) => ({
      title,
      subtitle: `Hero (${variant === "immersive" ? "Immersive" : "Split"})`,
    }),
  },
});

