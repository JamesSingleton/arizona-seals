import { Star } from "lucide-react";
import { defineField, defineType } from "sanity";

export const sponsorsHero = defineType({
  name: "sponsorsHero",
  title: "Sponsors Hero",
  type: "object",
  icon: Star,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "paragraphs",
      type: "array",
      title: "Paragraphs",
      of: [{ type: "text", rows: 3 }],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({
      title: title || "Sponsors Hero",
      subtitle: "Navy text hero",
    }),
  },
});
