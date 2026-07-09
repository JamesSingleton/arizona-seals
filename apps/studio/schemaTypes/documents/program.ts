import { Waves } from "lucide-react";
import { defineField, defineType } from "sanity";

import { PathnameFieldComponent } from "../../components/slug-field-component";
import { createSlug, isUnique } from "../../utils/slug";

export const program = defineType({
  name: "program",
  title: "Program",
  type: "document",
  icon: Waves,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL / Anchor",
      description: "Used as the page anchor id (e.g. blue, red)",
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
      name: "tagline",
      type: "string",
      title: "Tagline",
    }),
    defineField({
      name: "level",
      type: "string",
      title: "Level",
      description: "e.g. Highest Level, Advanced, Intermediate",
    }),
    defineField({
      name: "summary",
      type: "text",
      title: "Summary",
      description: "Short description for preview cards and listings",
      rows: 2,
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      rows: 4,
    }),
    defineField({
      name: "accent",
      type: "string",
      title: "Accent",
      description:
        "Brand accent for this program group (hex, e.g. #1B3A6B). Frontend maps this to styles.",
    }),
    defineField({
      name: "expectations",
      type: "array",
      title: "Expectations",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "requirements",
      type: "array",
      title: "Requirements",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "equipment",
      type: "array",
      title: "Equipment",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "sessions",
      type: "string",
      title: "Sessions",
      description: "e.g. 6–8 practices/week",
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
      subtitle: "level",
      media: "image",
    },
  },
});
