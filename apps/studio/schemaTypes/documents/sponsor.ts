import { Handshake } from "lucide-react";
import { defineField, defineType } from "sanity";

export const sponsor = defineType({
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  icon: Handshake,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      type: "image",
      title: "Logo",
      options: { hotspot: true },
    }),
    defineField({
      name: "url",
      type: "url",
      title: "Website URL",
    }),
    defineField({
      name: "tier",
      type: "string",
      title: "Tier",
      options: {
        list: [
          { title: "Platinum", value: "platinum" },
          { title: "Gold", value: "gold" },
          { title: "Silver", value: "silver" },
          { title: "Bronze", value: "bronze" },
          { title: "Partner", value: "partner" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured in Marquee",
      description: "Show this sponsor in the home page marquee",
      initialValue: true,
    }),
    defineField({
      name: "sortOrder",
      type: "number",
      title: "Sort Order",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "tier",
      media: "logo",
    },
  },
});
