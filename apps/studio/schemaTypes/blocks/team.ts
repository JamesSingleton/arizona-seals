import { Users } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const team = defineType({
  name: "team",
  title: "Team",
  icon: Users,
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "Heading for the featured people section",
    }),
    defineField({
      name: "roleFilter",
      type: "string",
      title: "Role Filter",
      description:
        "When Team Members is empty, automatically include people from this role group.",
      options: {
        list: [
          { title: "Coaching", value: "coaching" },
          { title: "Board / Leadership", value: "board" },
          { title: "Operations / Staff", value: "operations" },
          { title: "All people", value: "all" },
        ],
        layout: "radio",
      },
      initialValue: "coaching",
    }),
    defineField({
      name: "layout",
      type: "string",
      title: "Layout",
      description:
        "Uniform Grid shows everyone as equal cards (best for Board). Featured + Supporting elevates people marked Featured (best for Coaches).",
      options: {
        list: [
          {
            title: "Featured + Supporting",
            value: "split",
          },
          {
            title: "Uniform Grid (equal cards)",
            value: "uniform",
          },
        ],
        layout: "radio",
      },
      initialValue: "split",
    }),
    defineField({
      name: "assistantsEyebrow",
      type: "string",
      title: "Supporting Section Eyebrow",
      initialValue: "The Full Staff",
      hidden: ({ parent }) => parent?.layout === "uniform",
    }),
    defineField({
      name: "assistantsTitle",
      type: "string",
      title: "Supporting Section Title",
      description: "Heading for non-featured people in this list",
      initialValue: "Assistant Coaches",
      hidden: ({ parent }) => parent?.layout === "uniform",
    }),
    defineField({
      name: "teamMembers",
      type: "array",
      title: "Team Members",
      description:
        "Leave empty to auto-fill from the Role Filter, ordered by desk order.",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "staff" }],
          options: { disableNew: true },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      roleFilter: "roleFilter",
    },
    prepare: ({ title, roleFilter }) => ({
      title: title || "Team",
      subtitle: roleFilter ? `Filter: ${roleFilter}` : "Team block",
    }),
  },
});
