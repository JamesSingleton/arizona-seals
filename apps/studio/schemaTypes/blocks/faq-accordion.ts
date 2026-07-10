import { MessageCircleQuestion } from "lucide-react";
import { defineField, defineType } from "sanity";

import { createRadioListLayout, isValidUrl } from "../../utils/helper";

const linkableTypes = [
  { type: "blog" },
  { type: "blogIndex" },
  { type: "page" },
  { type: "homePage" },
];

type FaqLinkValue = {
  title?: string;
  description?: string;
  url?: {
    type?: string;
    external?: string;
    internal?: { _ref?: string };
  };
};

function linkHasText(link?: FaqLinkValue | null) {
  return Boolean(link?.title?.trim() || link?.description?.trim());
}

function linkHasUrl(link?: FaqLinkValue | null) {
  if (!link?.url?.type) return false;
  if (link.url.type === "external") return Boolean(link.url.external?.trim());
  if (link.url.type === "internal") return Boolean(link.url.internal?._ref);
  return false;
}

export const faqAccordion = defineType({
  name: "faqAccordion",
  type: "object",
  icon: MessageCircleQuestion,
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
      type: "string",
      title: "Subtitle",
      description: "Additional context below the main title",
    }),
    defineField({
      name: "link",
      title: "Optional link",
      type: "object",
      description:
        "Optional call-to-action below the FAQs. Leave collapsed and empty to omit.",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "title",
          type: "string",
          title: "Label",
          description:
            'Small label above the link (e.g. "Still have questions?")',
        }),
        defineField({
          name: "description",
          type: "string",
          title: "Link text",
          description: 'Clickable text (e.g. "Contact us")',
        }),
        defineField({
          name: "url",
          type: "object",
          title: "URL",
          // Only prompt for a URL after the editor starts writing link copy.
          hidden: ({ parent }) => !linkHasText(parent as FaqLinkValue),
          fields: [
            defineField({
              name: "type",
              type: "string",
              options: createRadioListLayout(["internal", "external"]),
              initialValue: () => "external",
            }),
            defineField({
              name: "openInNewTab",
              title: "Open in new tab",
              type: "boolean",
              description: "If checked, the link will open in a new tab.",
              initialValue: () => false,
            }),
            defineField({
              name: "external",
              type: "string",
              title: "URL",
              hidden: ({ parent }) => parent?.type !== "external",
              validation: (Rule) =>
                Rule.custom((value, { parent }) => {
                  // Emptiness is enforced on the parent link when copy is present.
                  // Here we only validate format when a value exists.
                  if ((parent as { type?: string })?.type !== "external") {
                    return true;
                  }
                  if (!value) return true;
                  return isValidUrl(value) ? true : "Invalid URL";
                }),
            }),
            defineField({
              name: "href",
              type: "string",
              initialValue: () => "#",
              hidden: true,
              readOnly: true,
            }),
            defineField({
              name: "internal",
              type: "reference",
              options: { disableNew: true },
              hidden: ({ parent }) => parent?.type !== "internal",
              to: linkableTypes,
            }),
          ],
        }),
      ],
      validation: (Rule) =>
        Rule.custom((value) => {
          const link = value as FaqLinkValue | undefined;
          if (!link || !linkHasText(link)) return true;
          if (!linkHasUrl(link)) {
            return "Add a URL for this link, or clear the label and link text";
          }
          return true;
        }),
    }),
    defineField({
      name: "faqs",
      type: "array",
      title: "FAQs",
      description: "Select the FAQ items to display in this accordion",
      of: [
        {
          type: "reference",
          to: [{ type: "faq" }],
          options: { disableNew: true },
        },
      ],
      validation: (Rule) => [Rule.required(), Rule.unique()],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title: title ?? "Untitled",
      subtitle: "FAQ Accordion",
    }),
  },
});
