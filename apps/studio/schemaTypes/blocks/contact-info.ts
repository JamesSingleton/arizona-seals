import { Contact } from "lucide-react";
import { defineField, defineType } from "sanity";

export const contactInfo = defineType({
  name: "contactInfo",
  title: "Contact Info",
  type: "object",
  icon: Contact,
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
      name: "description",
      type: "text",
      title: "Description",
      rows: 3,
    }),
    defineField({
      name: "useSiteSettings",
      type: "boolean",
      title: "Use Global Settings",
      description:
        "Pull address, phone, email, and hours from Settings when enabled",
      initialValue: true,
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email Override",
      hidden: ({ parent }) => parent?.useSiteSettings !== false,
    }),
    defineField({
      name: "phone",
      type: "string",
      title: "Phone Override",
      hidden: ({ parent }) => parent?.useSiteSettings !== false,
    }),
    defineField({
      name: "address",
      type: "object",
      title: "Address Override",
      hidden: ({ parent }) => parent?.useSiteSettings !== false,
      fields: [
        defineField({ name: "street", type: "string", title: "Street" }),
        defineField({ name: "city", type: "string", title: "City" }),
        defineField({ name: "state", type: "string", title: "State" }),
        defineField({ name: "zip", type: "string", title: "ZIP" }),
      ],
    }),
    defineField({
      name: "showContactForm",
      type: "boolean",
      title: "Show Contact Form",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "eyebrow",
    },
    prepare: ({ title, subtitle }) => ({
      title: title || "Contact Info",
      subtitle: subtitle || "Contact Info Block",
    }),
  },
});
