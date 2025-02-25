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
    }),
    defineField({
      name: "position",
      type: "string",
      title: "Position",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
    }),
    defineField({
      name: "bio",
      type: "richText",
      title: "Bio",
    }),
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
