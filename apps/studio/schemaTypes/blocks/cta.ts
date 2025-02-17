import { PhoneIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { buttonsField, richTextField } from "../common";

const ctaCard = defineField({
  name: "ctaCard",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The title of the CTA card",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "A brief description of the CTA card content",
    }),
    defineField({
      name: "image",
      title: "Logo",
      type: "image",
      description: "The logo or icon to display on the CTA card",
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      description: "The destination URL when clicking the link",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare: ({ title, media }) => ({
      title: title || "Untitled CTA Card",
      media,
    }),
  },
});

export const cta = defineType({
  name: "cta",
  type: "object",
  icon: PhoneIcon,
  fields: [
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
    buttonsField,
    // defineField({
    //   name: "ctaCards",
    //   title: "CTA Cards",
    //   type: "array",
    //   description: "Add multiple CTA cards with logos, titles, and links",
    //   of: [ctaCard],
    // }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "CTA Block",
    }),
  },
});
