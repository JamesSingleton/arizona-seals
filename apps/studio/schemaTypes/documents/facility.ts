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
      type: "string",
      title: "Hours",
      description: "e.g. Mon–Fri 5:00 AM – 8:00 PM",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
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
      name: "mapUrl",
      type: "url",
      title: "Map URL",
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
  preview: {
    select: {
      title: "name",
      subtitle: "subtitle",
      media: "image",
    },
  },
});
