import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { BadgeDollarSign } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";

export const sponsorLevel = defineType({
  name: "sponsorLevel",
  title: "Sponsor Level",
  type: "document",
  icon: BadgeDollarSign,
  groups: GROUPS.filter((group) =>
    [GROUP.MAIN_CONTENT, GROUP.CARD].includes(group.name),
  ),
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      description: "e.g. Bronze, Silver, Digital, Partner",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      group: GROUP.MAIN_CONTENT,
      options: {
        source: "name",
        maxLength: 64,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      type: "string",
      title: "Price",
      description: 'Display price, e.g. "$1,200" or "Custom"',
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "availability",
      type: "string",
      title: "Availability",
      description: 'e.g. "Available", "Limited"',
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "perks",
      type: "array",
      title: "Perks",
      group: GROUP.MAIN_CONTENT,
      of: [{ type: "string" }],
    }),
    defineField({
      name: "ctaLabel",
      type: "string",
      title: "CTA Label",
      initialValue: "Choose Package",
      group: GROUP.CARD,
    }),
    defineField({
      name: "ctaEmail",
      type: "string",
      title: "CTA Email",
      group: GROUP.CARD,
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "showInPackages",
      type: "boolean",
      title: "Show on Packages Page",
      description:
        "When enabled, this level appears in the Sponsor Tiers / packages section.",
      initialValue: true,
      group: GROUP.CARD,
    }),
    orderRankField({ type: "sponsorLevel" }),
    defineField({
      name: "sortOrder",
      type: "number",
      title: "Sort Order (Deprecated)",
      deprecated: {
        reason: "Use drag-and-drop ordering in the Sponsors desk instead.",
      },
      readOnly: true,
      hidden: ({ value }) => value === undefined,
      initialValue: undefined,
      group: GROUP.CARD,
    }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: {
      title: "name",
      subtitle: "price",
      showInPackages: "showInPackages",
    },
    prepare: ({ title, subtitle, showInPackages }) => ({
      title: title || "Untitled Level",
      subtitle: [
        subtitle,
        showInPackages === false ? "Hidden from packages" : null,
      ]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
