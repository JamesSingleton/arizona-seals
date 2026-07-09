import { BadgeDollarSign } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

const sponsorTier = defineField({
  name: "sponsorTier",
  type: "object",
  fields: [
    defineField({ name: "name", type: "string", title: "Name" }),
    defineField({ name: "price", type: "string", title: "Price" }),
    defineField({
      name: "availability",
      type: "string",
      title: "Availability",
    }),
    defineField({
      name: "perks",
      type: "array",
      title: "Perks",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "ctaLabel",
      type: "string",
      title: "CTA Label",
      initialValue: "Choose Package",
    }),
    defineField({
      name: "ctaEmail",
      type: "string",
      title: "CTA Email",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "price" },
  },
});

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
      title: "Tiers",
      of: [defineArrayMember(sponsorTier)],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({
      title: title || "Sponsor Tiers",
      subtitle: "Pricing cards",
    }),
  },
});
