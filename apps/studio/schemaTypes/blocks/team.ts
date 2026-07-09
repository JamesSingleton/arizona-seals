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
    }),
    defineField({
      name: "assistantsEyebrow",
      type: "string",
      title: "Assistants Eyebrow",
      initialValue: "The Full Staff",
    }),
    defineField({
      name: "assistantsTitle",
      type: "string",
      title: "Assistants Title",
      initialValue: "Assistant Coaches",
    }),
    defineField({
      name: "teamMembers",
      type: "array",
      title: "Team Members",
      description: "Leave empty to show all staff ordered by sort order.",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "staff" }],
        }),
      ],
    }),
  ],
});
