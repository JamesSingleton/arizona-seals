import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { Waves } from "lucide-react";
import { defineField, defineType } from "sanity";

import { PathnameFieldComponent } from "../../components/slug-field-component";
import { GROUP, GROUPS } from "../../utils/constant";
import { createSlug, isUnique } from "../../utils/slug";

export const program = defineType({
  name: "program",
  title: "Program",
  type: "document",
  icon: Waves,
  groups: GROUPS.filter((group) =>
    [GROUP.MAIN_CONTENT, GROUP.CARD].includes(group.name),
  ),
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      group: GROUP.MAIN_CONTENT,
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (Rule) =>
            Rule.required().warning("Add alt text for accessibility."),
        }),
      ],
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL / Anchor",
      description: "Used as the page anchor id (e.g. blue, red)",
      group: GROUP.MAIN_CONTENT,
      components: {
        field: PathnameFieldComponent,
      },
      options: {
        source: "name",
        slugify: createSlug,
        isUnique,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      // The site no longer shows small labels above titles.
      hidden: true,
      name: "tagline",
      type: "string",
      title: "Tagline",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "level",
      type: "string",
      title: "Level",
      description: "e.g. Highest Level, Advanced, Intermediate",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "summary",
      type: "text",
      title: "Summary",
      description: "Short description for preview cards and listings",
      rows: 2,
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      rows: 4,
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "accent",
      type: "string",
      title: "Accent",
      description:
        "Brand accent for this program group (hex, e.g. #1B3A6B). Frontend maps this to styles.",
      group: GROUP.CARD,
    }),
    defineField({
      name: "expectations",
      type: "array",
      title: "Expectations",
      of: [{ type: "string" }],
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "requirements",
      type: "array",
      title: "Requirements",
      of: [{ type: "string" }],
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "equipment",
      type: "array",
      title: "Equipment",
      of: [{ type: "string" }],
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "sessions",
      type: "string",
      title: "Sessions",
      description: "e.g. 6–8 practices/week",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "ageRange",
      type: "string",
      title: "Ages",
      description: "Shown in the schedule table, e.g. 5+ or 13 and up",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "practiceTimes",
      type: "array",
      title: "Practice Times",
      description:
        "One row per block of days that share a time. Shown in the Practice Schedule & Dues block.",
      group: GROUP.MAIN_CONTENT,
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "days",
              type: "string",
              title: "Days",
              description: "e.g. Monday to Thursday",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "time",
              type: "string",
              title: "Time",
              description: "e.g. 4:30 to 6:00 p.m.",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "days", subtitle: "time" } },
        },
      ],
    }),
    defineField({
      name: "monthlyDues",
      type: "string",
      title: "Monthly Dues",
      description:
        "e.g. $95 per month. Leave empty to show the fallback text set on the schedule block.",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "buttons",
      type: "array",
      title: "Buttons",
      description:
        "CTA for this group on the programs page (e.g. Inquire About This Group).",
      group: GROUP.MAIN_CONTENT,
      of: [{ type: "button" }],
    }),
    orderRankField({ type: "program" }),
    defineField({
      name: "sortOrder",
      type: "number",
      title: "Sort Order (Deprecated)",
      deprecated: {
        reason: "Use drag-and-drop ordering in the Club desk instead.",
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
      subtitle: "level",
      media: "image",
    },
  },
});
