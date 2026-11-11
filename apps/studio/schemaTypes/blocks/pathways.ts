import { Signpost } from "lucide-react";
import { defineField, defineType } from "sanity";

export const pathways = defineType({
  name: "pathways",
  title: "Pathways (Where Do You Start?)",
  description:
    "Two to four cards that send each kind of visitor to the right next page.",
  type: "object",
  icon: Signpost,
  fields: [
    defineField({
      // The site no longer shows small labels above titles.
      hidden: true,
      name: "eyebrow",
      type: "string",
      title: "Eyebrow",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      initialValue: "Where Do You Start?",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "intro", type: "text", title: "Intro", rows: 3 }),
    defineField({
      name: "cards",
      type: "array",
      title: "Cards",
      validation: (rule) => rule.min(2).max(4),
      of: [
        {
          type: "object",
          fields: [
            defineField({
              // The site no longer shows small labels above titles.
              hidden: true,
              name: "kicker",
              type: "string",
              title: "Kicker",
              description:
                "Short line describing who this card is for, e.g. New to swim team",
            }),
            defineField({
              name: "title",
              type: "string",
              title: "Title",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              type: "text",
              title: "Description",
              rows: 3,
            }),
            defineField({
              name: "image",
              type: "image",
              title: "Image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  type: "string",
                  title: "Alternative text",
                }),
              ],
            }),
            defineField({
              name: "linkLabel",
              type: "string",
              title: "Link label",
              initialValue: "Learn more",
            }),
            defineField({ name: "url", type: "customUrl", title: "Link" }),
          ],
          preview: {
            select: { title: "title", subtitle: "kicker", media: "image" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", cards: "cards" },
    prepare: ({ title, cards = [] }) => ({
      title: title || "Pathways",
      subtitle: `${cards.length} card${cards.length === 1 ? "" : "s"}`,
    }),
  },
});
