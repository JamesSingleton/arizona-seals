import { Building2 } from "lucide-react";
import { defineField, defineType } from "sanity";

export const facility = defineType({
  name: "facility",
  title: "Facility",
  type: "document",
  icon: Building2,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      type: "string",
      title: "Subtitle",
      description: "Short name or park name shown as a secondary label",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Summary",
      description: "Short summary for cards and previews",
      rows: 3,
    }),
    defineField({
      name: "longDescription",
      type: "text",
      title: "Description",
      description: "Full facility description for the facilities page",
      rows: 5,
    }),
    defineField({
      name: "address",
      type: "object",
      title: "Address",
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
    }),
    defineField({
      name: "hours",
      type: "object",
      title: "Hours",
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
      name: "features",
      type: "array",
      title: "Features",
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
    }),
    defineField({
      name: "mapUrl",
      type: "url",
      title: "Map URL",
    }),
    defineField({
      name: "citySiteUrl",
      type: "url",
      title: "City / Operator Site URL",
    }),
    defineField({
      name: "disclaimer",
      type: "text",
      title: "Disclaimer",
      rows: 3,
    }),
    defineField({
      name: "isPrimary",
      type: "boolean",
      title: "Primary Facility",
      initialValue: false,
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
      subtitle: "subtitle",
      media: "image",
    },
  },
});
