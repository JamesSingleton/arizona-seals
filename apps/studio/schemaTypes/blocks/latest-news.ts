import { Newspaper } from "lucide-react";
import { defineField, defineType } from "sanity";

export const latestNews = defineType({
  name: "latestNews",
  title: "Latest News",
  type: "object",
  icon: Newspaper,
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow",
      initialValue: "Stay Updated",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      initialValue: "Latest News",
    }),
    defineField({
      name: "count",
      type: "number",
      title: "Number of Articles",
      description:
        "How many latest articles to show when no specific posts are selected",
      initialValue: 3,
      validation: (Rule) => Rule.min(1).max(12),
    }),
    defineField({
      name: "posts",
      type: "array",
      title: "Featured Posts",
      description: "Optional: pick specific posts instead of auto-latest",
      of: [
        {
          type: "reference",
          to: [{ type: "blog" }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "eyebrow",
    },
    prepare: ({ title, subtitle }) => ({
      title: title || "Latest News",
      subtitle: subtitle || "Latest News Block",
    }),
  },
});
