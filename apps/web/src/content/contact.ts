export const inquiryTypes = [
  "General Inquiry",
  "Schedule a Tryout",
  "Competitive Team",
  "Development Squad",
  "Masters Swimming",
  "Swim Lessons",
  "Sponsorship",
  "Coaching Opportunities",
  "Facility Rental",
] as const;

export type InquiryType = (typeof inquiryTypes)[number];

export const contactInfo = {
  address: {
    label: "Primary Location",
    lines: ["4500 N. Scottsdale Rd", "Scottsdale, AZ 85251"],
  },
  phone: {
    label: "Phone",
    display: "(480) 555-0123",
    href: "tel:+14805550123",
  },
  email: {
    label: "Email",
    display: "info@azsealsswimming.com",
    href: "mailto:info@azsealsswimming.com",
  },
  hours: {
    label: "Office Hours",
    lines: ["Mon–Fri: 8:00am – 6:00pm", "Sat: 8:00am – 12:00pm"],
  },
  map: {
    title: "Scottsdale Aquatic Center",
    address: "4500 N. Scottsdale Rd, Scottsdale, AZ 85251",
    mapsUrl: "https://maps.google.com",
    image: "/placeholder.svg?height=288&width=1440",
  },
};

export const contactQuickLinks = [
  { label: "View All Programs", href: "/programs" },
  { label: "Meet Our Coaches", href: "/coaches" },
  { label: "About the Club", href: "/about" },
  { label: "Facility Info", href: "/facilities" },
] as const;
