import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { Building2 } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";

export const facility = defineType({
  name: "facility",
  title: "Facility",
  type: "document",
  icon: Building2,
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
      name: "subtitle",
      type: "string",
      title: "Subtitle",
      description: "Short name or park name shown as a secondary label",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Summary",
      description: "Short summary for cards and previews",
      rows: 3,
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "longDescription",
      type: "text",
      title: "Description",
      description: "Full facility description for the facilities page",
      rows: 5,
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "address",
      type: "object",
      title: "Address",
      group: GROUP.MAIN_CONTENT,
      fields: [
        defineField({ name: "street", type: "string", title: "Street" }),
        defineField({ name: "city", type: "string", title: "City" }),
        defineField({ name: "state", type: "string", title: "State" }),
        defineField({ name: "zip", type: "string", title: "ZIP" }),
      ],
    }),
    defineField({
      name: "phone",
      type: "string",
      title: "Phone",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "hours",
      type: "object",
      title: "Hours",
      group: GROUP.MAIN_CONTENT,
      fields: [
        defineField({
          name: "label",
          type: "string",
          title: "Label",
          initialValue: "Hours",
        }),
        defineField({
          name: "periods",
          type: "array",
          title: "Periods",
          of: [{ type: "string" }],
          description: "e.g. Mon–Fri: 5:30am – 8:00pm",
        }),
      ],
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
      name: "features",
      type: "array",
      title: "Features",
      group: GROUP.MAIN_CONTENT,
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({
              name: "description",
              type: "text",
              title: "Description",
              rows: 2,
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
    }),
    defineField({
      name: "amenities",
      type: "array",
      title: "Amenities",
      of: [{ type: "string" }],
      description: "Short amenity labels for lists",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "mapUrl",
      type: "url",
      title: "Map URL",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "citySiteUrl",
      type: "url",
      title: "City / Operator Site URL",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "disclaimer",
      type: "text",
      title: "Disclaimer",
      rows: 3,
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "isPrimary",
      type: "boolean",
      title: "Primary Facility",
      initialValue: false,
      group: GROUP.CARD,
    }),
    orderRankField({ type: "facility" }),
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
      subtitle: "subtitle",
      media: "image",
    },
  },
});
