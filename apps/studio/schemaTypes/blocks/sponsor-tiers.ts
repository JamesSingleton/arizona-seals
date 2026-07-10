import { BadgeDollarSign } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const sponsorTiers = defineType({
  name: "sponsorTiers",
  title: "Sponsor Tiers",
  type: "object",
  icon: BadgeDollarSign,
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
    defineField({
      name: "tiers",
      type: "array",
      title: "Levels",
      description:
        "Leave empty to show all sponsor levels marked “Show on Packages Page”, ordered by desk order.",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "sponsorLevel" }],
          options: { disableNew: true },
        }),
      ],
      validation: (Rule) => Rule.unique(),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({
      title: title || "Sponsor Tiers",
      subtitle: "Sponsorship packages",
    }),
  },
});
