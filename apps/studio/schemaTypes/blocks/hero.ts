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
      // The site no longer shows small labels above titles.
      hidden: true,
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
      description:
        "Set the focal point (hotspot) on the subject — e.g. the swimmer’s face — so mobile crops keep them in frame. Check the Mobile preview below the image.",
      options: {
        hotspot: {
          previews: [
            { title: "Mobile", aspectRatio: 9 / 16 },
            { title: "Desktop", aspectRatio: 16 / 9 },
            { title: "Square", aspectRatio: 1 },
            { title: "3:4", aspectRatio: 3 / 4 },
          ],
        },
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Describe the image for accessibility and SEO",
          validation: (rule) =>
            rule.warning("Alt text helps accessibility and SEO"),
        }),
      ],
    }),
    buttonsField,
    defineField({
      name: "stats",
      type: "array",
      title: "Proof strip",
      description:
        "Up to four short facts shown along the bottom of the immersive hero, e.g. 2004 / Founded in Pinal County.",
      hidden: ({ parent }) => parent?.variant !== "immersive",
      validation: (rule) => rule.max(4),
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "number",
              type: "string",
              title: "Number or short fact",
              validation: (rule) => rule.required().max(12),
            }),
            defineField({
              name: "label",
              type: "string",
              title: "Label",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "number", subtitle: "label" } },
        },
      ],
    }),
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
