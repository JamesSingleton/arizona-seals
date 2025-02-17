import { defineArrayMember, defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";
import { ogFields } from "../../utils/og-fields";
import { seoFields } from "../../utils/seo-fields";
import { defineSlug } from "../../utils/slug";

export const blog = defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  groups: GROUPS,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      ...defineSlug(),
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "authors",
      type: "array",
      title: "Authors",
      of: [
        defineArrayMember({
          type: "reference",
          to: [
            {
              type: "author",
              options: {
                disableNew: true,
              },
            },
          ],
          options: {
            disableNew: true,
          },
        }),
      ],
      validation: (Rule) => [
        Rule.required(),
        Rule.max(1),
        Rule.min(1),
        Rule.unique(),
      ],
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "publishedAt",
      type: "date",
      initialValue: () => new Date().toISOString().split("T")[0],
      title: "Published At",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "richText",
      type: "richText",
      group: GROUP.MAIN_CONTENT,
    }),
    ...seoFields,
    ...ogFields,
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      isPrivate: "seoNoIndex",
      slug: "slug.current",
    },
    prepare: ({ title, media, slug, isPrivate }) => ({
      title,
      media,
      subtitle: `${isPrivate ? "Private" : "Public"}:- ${slug}`,
    }),
  },
});
