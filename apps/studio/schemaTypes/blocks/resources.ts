import { FileText } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

import { createRadioListLayout, isValidUrl } from "../../utils/helper";

type ResourceItemParent = {
  kind?: "file" | "external";
  title?: string;
};

const resourceItem = defineArrayMember({
  name: "resourceItem",
  type: "object",
  title: "Resource",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "string",
      title: "Description",
      description: "Optional short line under the title",
    }),
    defineField({
      name: "kind",
      type: "string",
      title: "Type",
      options: createRadioListLayout(["file", "external"]),
      initialValue: "file",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "file",
      type: "file",
      title: "PDF File",
      options: {
        accept: "application/pdf",
      },
      hidden: ({ parent }) =>
        (parent as ResourceItemParent | undefined)?.kind !== "file",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as ResourceItemParent | undefined;
          if (parent?.kind !== "file") return true;
          if (!value?.asset) return "Upload a PDF file";
          return true;
        }),
    }),
    defineField({
      name: "url",
      type: "url",
      title: "External URL",
      hidden: ({ parent }) =>
        (parent as ResourceItemParent | undefined)?.kind !== "external",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as ResourceItemParent | undefined;
          if (parent?.kind !== "external") return true;
          if (!value?.trim()) return "Enter an external URL";
          return isValidUrl(value) ? true : "Invalid URL";
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      kind: "kind",
      description: "description",
    },
    prepare: ({ title, kind, description }) => ({
      title: title || "Untitled resource",
      subtitle: [kind === "external" ? "External link" : "PDF", description]
        .filter(Boolean)
        .join(" · "),
      media: FileText,
    }),
  },
});

const resourceGroup = defineArrayMember({
  name: "resourceGroup",
  type: "object",
  title: "Group",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Group Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      type: "array",
      title: "Resources",
      of: [resourceItem],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      items: "items",
    },
    prepare: ({ title, items }) => ({
      title: title || "Untitled group",
      subtitle: `${Array.isArray(items) ? items.length : 0} resource(s)`,
      media: FileText,
    }),
  },
});

export const resources = defineType({
  name: "resources",
  title: "Resources",
  type: "object",
  icon: FileText,
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow",
      description:
        "The smaller text that sits above the title to provide context",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "The large text that is the primary focus of the block",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      type: "text",
      title: "Subtitle",
      rows: 2,
      description: "Additional context below the main title",
    }),
    defineField({
      name: "groups",
      type: "array",
      title: "Groups",
      description: "Categorized lists of downloadable PDFs and external links",
      of: [resourceGroup],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      groups: "groups",
    },
    prepare: ({ title, groups }) => ({
      title: title || "Untitled",
      subtitle: `Resources · ${Array.isArray(groups) ? groups.length : 0} group(s)`,
      media: FileText,
    }),
  },
});
