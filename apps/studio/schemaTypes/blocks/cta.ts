import { PhoneIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { buttonsField, richTextField } from "../common";

export const cta = defineType({
  name: "cta",
  type: "object",
  icon: PhoneIcon,
  fields: [
    defineField({
      name: "layout",
      type: "string",
      title: "Layout",
      options: {
        list: [
          { title: "Card", value: "card" },
          { title: "Full Bleed", value: "fullBleed" },
        ],
        layout: "radio",
      },
      initialValue: "card",
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description:
        "The smaller text that sits above the title to provide context",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The large text that is the primary focus of the block",
    }),
    richTextField,
    defineField({
      name: "image",
      type: "image",
      title: "Background Image",
      description: "Used for full-bleed layout",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.layout !== "fullBleed",
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
      subtitle: `CTA (${layout === "fullBleed" ? "Full Bleed" : "Card"})`,
    }),
  },
});
