import { defineField, defineType } from "sanity";

export const staff = defineType({
  name: "staff",
  title: "Staff",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "position",
      type: "string",
      title: "Position",
    }),
    defineField({
      name: "tier",
      type: "string",
      title: "Tier",
      options: {
        list: [
          { title: "Head Coach", value: "head" },
          { title: "Assistant Coach", value: "assistant" },
          { title: "Staff", value: "staff" },
        ],
        layout: "radio",
      },
      initialValue: "assistant",
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      type: "richText",
      title: "Bio",
    }),
    defineField({
      name: "certifications",
      type: "array",
      title: "Certifications",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "specialties",
      type: "array",
      title: "Specialties",
      of: [{ type: "string" }],
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
      subtitle: "position",
      media: "image",
    },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle,
      media,
    }),
  },
});
