import { CogIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

const socialLinks = defineField({
  name: "socialLinks",
  title: "Social Media Links",
  description: "Add links to your social media profiles",
  type: "object",
  options: {},
  fields: [
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      description: "Full URL to your LinkedIn profile/company page",
      type: "string",
    }),
    defineField({
      name: "facebook",
      title: "Facebook URL",
      description: "Full URL to your Facebook profile/page",
      type: "string",
    }),
    defineField({
      name: "twitter",
      title: "Twitter/X URL",
      description: "Full URL to your Twitter/X profile",
      type: "string",
    }),
    defineField({
      name: "instagram",
      title: "Instagram URL",
      description: "Full URL to your Instagram profile",
      type: "string",
    }),
    defineField({
      name: "youtube",
      title: "YouTube URL",
      description: "Full URL to your YouTube channel",
      type: "string",
    }),
  ],
});

export const settings = defineType({
  name: "settings",
  type: "document",
  title: "Settings",
  description: "Global settings and configuration for your website",
  icon: CogIcon,
  fields: [
    defineField({
      name: "label",
      type: "string",
      initialValue: "Settings",
      title: "Label",
      description: "Label used to identify settings in the CMS",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteTitle",
      type: "string",
      title: "Site Title",
      description:
        "The main title of your website, used in browser tabs and SEO",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteDescription",
      type: "text",
      title: "Site Description",
      description: "A brief description of your website for SEO purposes",
      validation: (rule) => rule.required().min(50).max(160),
    }),
    defineField({
      name: "logo",
      type: "image",
      title: "Site Logo",
      description:
        "Primary logo for light backgrounds (navbar when scrolled, mobile menu, etc.)",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Describe the logo for screen readers.",
          validation: (rule) =>
            rule.required().warning("Add alt text for accessibility."),
        }),
      ],
    }),
    defineField({
      name: "alternateLogo",
      type: "image",
      title: "Alternate Logo",
      description:
        "Logo for dark or transparent backgrounds (e.g. white mark over the hero)",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Describe the logo for screen readers.",
          validation: (rule) =>
            rule.required().warning("Add alt text for accessibility."),
        }),
      ],
    }),
    defineField({
      name: "contactEmail",
      type: "string",
      title: "Contact Email",
      description: "Primary contact email address for your website",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "contactPhone",
      type: "string",
      title: "Contact Phone",
    }),
    defineField({
      name: "primaryAddress",
      type: "object",
      title: "Primary Address",
      fields: [
        defineField({ name: "street", type: "string", title: "Street" }),
        defineField({ name: "city", type: "string", title: "City" }),
        defineField({ name: "state", type: "string", title: "State" }),
        defineField({ name: "zip", type: "string", title: "ZIP" }),
      ],
    }),
    defineField({
      name: "geo",
      type: "geopoint",
      title: "Location coordinates",
      description:
        "Latitude/longitude for the primary practice location (used in SportsClub JSON-LD)",
    }),
    defineField({
      name: "serviceAreas",
      type: "array",
      title: "Service areas",
      description:
        "Cities and regions the club serves (used in SportsClub areaServed schema)",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              type: "string",
              title: "Name",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "placeType",
              type: "string",
              title: "Type",
              options: {
                list: [
                  { title: "City", value: "City" },
                  {
                    title: "Administrative area",
                    value: "AdministrativeArea",
                  },
                ],
                layout: "radio",
              },
              initialValue: "City",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "placeType" },
          },
        },
      ],
    }),
    defineField({
      name: "officeHours",
      type: "array",
      title: "Office Hours",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "days", type: "string", title: "Days" }),
            defineField({ name: "hours", type: "string", title: "Hours" }),
          ],
          preview: {
            select: { title: "days", subtitle: "hours" },
          },
        },
      ],
    }),
    defineField({
      name: "inquiryTypes",
      type: "array",
      title: "Contact Inquiry Types",
      of: [{ type: "string" }],
      description: "Options shown in the contact form inquiry dropdown",
    }),
    defineField({
      name: "mapUrl",
      type: "url",
      title: "Map URL",
      description: "Google Maps or similar link for the primary location",
    }),
    socialLinks,
  ],
  preview: {
    select: {
      title: "label",
    },
    prepare: ({ title }) => ({
      title: title || "Untitled Settings",
      media: CogIcon,
    }),
  },
});
