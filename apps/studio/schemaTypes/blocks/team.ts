import { Users } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const team = defineType({
  name: "team",
  title: "Team",
  icon: Users,
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "teamMembers",
      type: "array",
      title: "Team Members",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "staff" }],
        }),
      ],
    }),
  ],
});
