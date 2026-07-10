import { Handshake } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";

export const sponsor = defineType({
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  icon: Handshake,
  groups: GROUPS.filter((group) =>
    [GROUP.MAIN_CONTENT, GROUP.CARD].includes(group.name as string),
  ),
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      type: "image",
      title: "Logo",
      group: GROUP.MAIN_CONTENT,
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Describe the logo for screen readers.",
          validation: (Rule) =>
            Rule.required().warning("Add alt text for accessibility."),
        }),
      ],
      validation: (Rule) =>
        Rule.required().warning(
          "Add a logo so the sponsor displays correctly.",
        ),
    }),
    defineField({
      name: "url",
      type: "url",
      title: "Website URL",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "level",
      type: "reference",
      title: "Sponsorship Level",
      description:
        "Controls which tier group this sponsor appears under on the Sponsors page.",
      group: GROUP.MAIN_CONTENT,
      to: [{ type: "sponsorLevel" }],
      options: { disableNew: true },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured in Marquee",
      description: "Show this sponsor in the home page marquee",
      initialValue: true,
      group: GROUP.CARD,
    }),
  ],
  orderings: [
    {
      title: "Name",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "level.name",
      media: "logo",
    },
  },
});
