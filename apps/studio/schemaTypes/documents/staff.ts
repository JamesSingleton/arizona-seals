import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { User } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";

const ROLE_LABELS: Record<string, string> = {
  coaching: "Coaching",
  board: "Board",
  operations: "Operations",
};

function isBoardOnly(roles: unknown, legacyRole?: unknown): boolean {
  if (Array.isArray(roles) && roles.length > 0) {
    return roles.length === 1 && roles[0] === "board";
  }
  return legacyRole === "board";
}

export const staff = defineType({
  name: "staff",
  title: "Person",
  type: "document",
  icon: User,
  groups: GROUPS.filter((group) =>
    [GROUP.MAIN_CONTENT, GROUP.CARD].includes(group.name),
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
      name: "position",
      type: "string",
      title: "Title / Position",
      description:
        'e.g. "Head Coach", "Club President", "Vice President", "Meet Director"',
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "roles",
      type: "array",
      title: "Role Groups",
      description:
        "Where this person appears on the site. Select every group that applies — e.g. Head Coach who sits on the board selects both Coaching and Board.",
      group: GROUP.MAIN_CONTENT,
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Coaching", value: "coaching" },
          { title: "Board / Leadership", value: "board" },
          { title: "Operations / Staff", value: "operations" },
        ],
        layout: "grid",
      },
      initialValue: ["coaching"],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured",
      description:
        "Featured people get the large card treatment (e.g. head coaches, club officers). Others appear in the supporting list.",
      initialValue: false,
      group: GROUP.CARD,
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      group: GROUP.MAIN_CONTENT,
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (Rule) =>
            Rule.required().warning("Add alt text for accessibility."),
        }),
      ],
    }),
    defineField({
      name: "bio",
      type: "richText",
      title: "Bio",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "certifications",
      type: "array",
      title: "Certifications",
      of: [{ type: "string" }],
      group: GROUP.MAIN_CONTENT,
      hidden: ({ parent }) => isBoardOnly(parent?.roles, parent?.role),
    }),
    defineField({
      name: "specialties",
      type: "array",
      title: "Specialties",
      of: [{ type: "string" }],
      group: GROUP.MAIN_CONTENT,
      hidden: ({ parent }) => isBoardOnly(parent?.roles, parent?.role),
    }),
    orderRankField({ type: "staff" }),
    defineField({
      name: "sortOrder",
      type: "number",
      title: "Sort Order (Deprecated)",
      deprecated: {
        reason: "Use drag-and-drop ordering in the Club desk instead.",
      },
      readOnly: true,
      hidden: ({ value }) => value === undefined,
      initialValue: undefined,
      group: GROUP.CARD,
    }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: {
      title: "name",
      position: "position",
      roles: "roles",
      role: "role",
      media: "image",
    },
    prepare: ({ title, position, roles, role, media }) => {
      const roleValues: string[] = Array.isArray(roles)
        ? roles
        : role
          ? [role]
          : [];
      const roleLabels = roleValues
        .map((r) => ROLE_LABELS[r] ?? r)
        .filter(Boolean);
      return {
        title,
        subtitle: [position, roleLabels.join(", ")].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
