/**
 * Seeds Arizona Seals CMS documents from the former static marketing content.
 *
 * Requires:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN
 *
 * Usage (from apps/web):
 *   node --env-file=.env.local scripts/seed-cms.mjs
 */

import { randomUUID } from "node:crypto";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-06-12",
  useCdn: false,
});

const key = () => randomUUID();

/** Single-paragraph portable text */
const rich = (text) => [
  {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  },
];

/** Multiple paragraphs as separate portable text blocks */
const richMulti = (...texts) => texts.map((text) => rich(text)[0]);

const internalUrl = (ref) => ({
  _type: "customUrl",
  type: "internal",
  openInNewTab: false,
  internal: { _type: "reference", _ref: ref },
});

const button = (text, ref, variant = "default") => ({
  _key: key(),
  _type: "button",
  text,
  variant,
  url: internalUrl(ref),
});

const externalUrl = (href) => ({
  _type: "customUrl",
  type: "external",
  openInNewTab: false,
  external: href,
});

const navLink = (name, ref) => ({
  _key: key(),
  _type: "navbarLink",
  name,
  url: internalUrl(ref),
});

const navColumnLink = (name, description, url) => ({
  _key: key(),
  _type: "navbarColumnLink",
  name,
  description,
  url,
});

const navColumn = (title, links) => ({
  _key: key(),
  _type: "navbarColumn",
  title,
  links,
});

const footerLink = (name, ref) => ({
  _key: key(),
  name,
  url: internalUrl(ref),
});

const footerExternalLink = (name, href) => ({
  _key: key(),
  name,
  url: externalUrl(href),
});

/** Existing CDN assets already uploaded to the project */
const imageRef = (assetId) => ({
  _type: "image",
  asset: { _type: "reference", _ref: assetId },
});

const HERO_IMAGE_ID =
  "image-4853ac4449a8f1d89aa4d48bb5bc8338b243be1d-6000x4000-avif";
const STATS_IMAGE_ID =
  "image-5eab7ec38166ec7e22db4124e92ff6db561278dc-6000x4000-avif";
const FACILITY_IMAGE_ID =
  "image-785899a115828858fc71c51625da8cba575542cd-1138x533-jpg";
const COACH_MEG_IMAGE_ID =
  "image-89857c9d1144a64e3d1ce07a5d371f5d27ebbfe1-3240x2160-jpg";
const COACH_CONNOR_IMAGE_ID =
  "image-740a0f62664ba072b3ef5f4be007e4f9d9b49a84-1556x1556-jpg";
const COACH_SARAH_IMAGE_ID =
  "image-208b47218b4084956c46bcfd49dd196fcc0d54df-1142x1142-jpg";

// ---------------------------------------------------------------------------
// Programs — Rising (not Bronze), full original fields
// ---------------------------------------------------------------------------

const programs = [
  {
    _id: "program-blue",
    _type: "program",
    name: "Blue Group",
    slug: { _type: "slug", current: "blue" },
    tagline: "Elite Competitors",
    level: "Highest Level",
    summary:
      "Our highest-level group for elite competitors pursuing regional, state, and national titles.",
    description:
      "Blue Group is our most advanced training group, designed for serious competitors pursuing state, regional, and national championships. Athletes in this group are held to the highest standards and are expected to demonstrate leadership, commitment, and elite-level performance.",
    accent: "#1B3A6B",
    sessions: "6–8 practices/week",
    sortOrder: 1,
    expectations: [
      "High-volume yardage with race-specific sets",
      "Individualized race strategy and goal-setting",
      "Dryland and strength conditioning required",
      "Competing at championships-level meets",
      "Video stroke analysis sessions",
      "USA Swimming Scholastic All-American eligibility",
    ],
    requirements: [
      "Invitation-only placement by coaching staff",
      "Must demonstrate consistent qualifying times",
      "Minimum 5 practices per week attendance",
      "Commitment to full-season meet schedule",
    ],
    equipment: [
      "Tech suit (required for championship meets)",
      "Practice suit (2 recommended)",
      "Two pairs of goggles",
      "Swim cap (team cap provided)",
      "Kickboard, pull buoy, fins, and paddles",
      "Resistance band for dryland",
      "Swim bag",
    ],
  },
  {
    _id: "program-red",
    _type: "program",
    name: "Red Group",
    slug: { _type: "slug", current: "red" },
    tagline: "Advancing Athletes",
    level: "Advanced",
    summary:
      "Developing athletes with strong fundamentals ready to compete at the next level.",
    description:
      "Red Group bridges the gap between developing and elite swimming. Athletes here have solid foundations in all four strokes and are building the endurance, race experience, and technique to eventually earn a spot in Blue Group. Meets are a regular and expected part of participation.",
    accent: "#C0392B",
    sessions: "4–6 practices/week",
    sortOrder: 2,
    expectations: [
      "Consistent attendance and coachability",
      "Competing in regular USA Swimming-sanctioned meets",
      "Introduction to dryland conditioning",
      "Stroke refinement with focus on efficiency",
      "Time standard progression toward Blue Group",
      "Team culture — supporting and encouraging peers",
    ],
    requirements: [
      "Able to legally swim all four competitive strokes",
      "Can complete a full 200 IM without stopping",
      "Commitment to at least 4 practices per week",
      "Willingness to compete at local and regional meets",
    ],
    equipment: [
      "Practice suit (2 recommended)",
      "Two pairs of goggles",
      "Swim cap (team cap provided)",
      "Kickboard, pull buoy, and fins",
      "Paddles (coach will advise sizing)",
      "Swim bag",
    ],
  },
  {
    _id: "program-white",
    _type: "program",
    name: "White Group",
    slug: { _type: "slug", current: "white" },
    tagline: "Building Competitors",
    level: "Intermediate",
    summary:
      "Building race-ready skills and competitive confidence in a structured environment.",
    description:
      "White Group is where competitive swimming starts to get serious. Swimmers are learning to race, building endurance, and working toward legal and efficient strokes in all four disciplines. This group participates in sanctioned meets and introduces athletes to the full competitive experience.",
    accent: "#5A6A7A",
    sessions: "3–4 practices/week",
    sortOrder: 3,
    expectations: [
      "Learning to compete and race with heart",
      "Attending in-club time trials and local meets",
      "Building all four competitive strokes",
      "Developing consistency in training attendance",
      "Introduction to team culture and sportsmanship",
    ],
    requirements: [
      "Ability to swim 25 yards of freestyle and backstroke",
      "Comfortable in deep water",
      "Willingness to learn breaststroke and butterfly",
      "Minimum age typically 7+",
    ],
    equipment: [
      "Practice suit",
      "Goggles (2 pairs recommended)",
      "Swim cap (team cap provided)",
      "Kickboard and fins",
      "Swim bag",
    ],
  },
  {
    _id: "program-rising",
    _type: "program",
    name: "Rising Group",
    slug: { _type: "slug", current: "rising" },
    tagline: "Beginners Welcome",
    level: "Entry Level",
    summary:
      "The starting point for new competitive swimmers learning all four strokes and race basics.",
    description:
      "Rising Group is the entry point into Arizona Seals Swimming. This group is designed for beginners who can swim independently but are brand new to competitive swimming. Coaches focus on water safety, basic stroke mechanics, and — most importantly — making the sport fun and building a love for the water.",
    accent: "#00AEEF",
    sessions: "2–3 practices/week",
    sortOrder: 4,
    expectations: [
      "Learning the four competitive strokes from the ground up",
      "Understanding basic swim meet format and rules",
      "Building water confidence and endurance",
      "Positive attitude and effort every practice",
      "Attendance at a few in-house or local meets per season",
    ],
    requirements: [
      "Able to swim 25 yards of freestyle independently",
      "Comfortable in deep water",
      "No prior competitive experience required",
      "Any age welcome — typically 6 and up",
    ],
    equipment: [
      "Practice suit",
      "Goggles",
      "Swim cap (team cap provided)",
      "Swim bag",
    ],
  },
];

// ---------------------------------------------------------------------------
// Facility — Copper Sky (exact primaryFacility)
// ---------------------------------------------------------------------------

const facility = {
  _id: "facility-copper-sky",
  _type: "facility",
  name: "Copper Sky Aquatic Center",
  subtitle: "Copper Sky Regional Park",
  description:
    "Arizona Seals trains at the premier aquatic facility in Maricopa. Copper Sky offers a competition-grade 50-meter pool and everything our athletes need to excel.",
  longDescription:
    "Home to Arizona Seals Swimming, the Copper Sky Aquatic Center is a state-of-the-art facility featuring a competition 50-meter pool and a full-service recreation center. Our athletes train year-round in one of the best aquatic environments in the Southwest.",
  address: {
    street: "44345 M.L.K. Jr. Blvd",
    city: "Maricopa",
    state: "AZ",
    zip: "85138",
  },
  phone: "(520) 568-9200",
  hours: {
    label: "Aquatic Center Hours",
    periods: [
      "Mon–Fri: 5:30am – 8:00pm",
      "Sat: 7:00am – 4:00pm",
      "Sun: 10:00am – 4:00pm",
    ],
  },
  mapUrl: "https://maps.google.com/?q=44345+MLK+Jr+Blvd+Maricopa+AZ+85138",
  citySiteUrl: "https://www.maricopa-az.gov/parks",
  disclaimer:
    "Copper Sky Aquatic Center is operated by the City of Maricopa. Arizona Seals leases pool time for all practices and events. Facility hours, pricing, and public access policies are set by the City.",
  isPrimary: true,
  sortOrder: 0,
  image: imageRef(FACILITY_IMAGE_ID),
  features: [
    {
      _key: key(),
      title: "50-Meter Competition Pool",
      description:
        "10 lanes, competition timing system, electronic start system, and underwater windows for video analysis.",
    },
    {
      _key: key(),
      title: "Warm-Up Pool",
      description:
        "25-yard heated warm-up and cool-down pool available before and after practices and competitions.",
    },
    {
      _key: key(),
      title: "Dryland Training Area",
      description:
        "Dedicated strength and conditioning space for dryland workouts, stretching, and team warm-ups.",
    },
    {
      _key: key(),
      title: "Starting Blocks",
      description:
        "Certified competition starting blocks with non-slip surfaces on every lane.",
    },
    {
      _key: key(),
      title: "Team Locker Rooms",
      description:
        "Full locker room facilities with showers and storage for athletes at every practice.",
    },
    {
      _key: key(),
      title: "Spectator Seating",
      description:
        "Ample bleacher seating with full pool deck visibility for parents, family, and fans.",
    },
    {
      _key: key(),
      title: "Recreation Center",
      description:
        "Full-service recreation center on-site with fitness equipment, courts, and family amenities.",
    },
    {
      _key: key(),
      title: "Ample Parking",
      description:
        "Free and plentiful parking directly adjacent to the aquatic facility.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Staff — from coaches.ts
// ---------------------------------------------------------------------------

const staff = [
  {
    _id: "staff-elena-martinez",
    _type: "staff",
    name: "Elena Martinez",
    position: "Head Coach & Program Director",
    tier: "head",
    email: "elena@azsealsswimming.com",
    bio: rich(
      "Coach Elena brings over 20 years of elite coaching experience to Arizona Seals. A former NCAA Division I All-American at the University of Arizona, she has guided 12 swimmers to Olympic Trial qualifications and was named ASCA Coach of the Year in 2024. Her philosophy centers on technical excellence and developing the complete athlete.",
    ),
    certifications: [
      "ASCA Level 5",
      "USA Swimming Certified",
      "CPR/AED Certified",
    ],
    specialties: [
      "Butterfly & Backstroke",
      "Elite Competition Prep",
      "Dryland Training",
    ],
    image: imageRef(COACH_MEG_IMAGE_ID),
    sortOrder: 1,
  },
  {
    _id: "staff-marcus-thompson",
    _type: "staff",
    name: "Marcus Thompson",
    position: "Associate Head Coach – Competitive Group",
    tier: "head",
    email: "marcus@azsealsswimming.com",
    bio: rich(
      "Coach Marcus joined the Seals in 2014 after a decorated collegiate career at Arizona State University. He specializes in sprint events and has coached five Arizona state record holders. Known for his high-energy coaching style, Marcus creates an environment where athletes push past perceived limits.",
    ),
    certifications: [
      "ASCA Level 4",
      "USA Swimming Certified",
      "Strength & Conditioning Cert.",
    ],
    specialties: [
      "Sprint Freestyle & Breaststroke",
      "Race Strategy",
      "Mental Performance",
    ],
    image: imageRef(COACH_CONNOR_IMAGE_ID),
    sortOrder: 2,
  },
  {
    _id: "staff-sofia-reyes",
    _type: "staff",
    name: "Sofia Reyes",
    position: "Development Group Coach",
    tier: "assistant",
    email: "sofia@azsealsswimming.com",
    bio: rich(
      "Former Arizona state champion specializing in age-group development. Sofia has a gift for making swimming fun while building rock-solid technique foundations.",
    ),
    certifications: ["ASCA Level 2", "USA Swimming Certified"],
    image: imageRef(COACH_SARAH_IMAGE_ID),
    sortOrder: 3,
  },
  {
    _id: "staff-james-park",
    _type: "staff",
    name: "James Park",
    position: "Senior Group Coach",
    tier: "assistant",
    email: "james@azsealsswimming.com",
    bio: rich(
      "James brings 10 years of coaching experience and a background in exercise science. He works primarily with 14–18 year old athletes preparing for collegiate swimming.",
    ),
    certifications: ["ASCA Level 3", "USA Swimming Certified"],
    image: imageRef(COACH_CONNOR_IMAGE_ID),
    sortOrder: 4,
  },
  {
    _id: "staff-alicia-torres",
    _type: "staff",
    name: "Alicia Torres",
    position: "Masters & Adult Program Coach",
    tier: "assistant",
    email: "alicia@azsealsswimming.com",
    bio: rich(
      "A USMS All-American, Alicia leads our adult and masters program with incredible energy. She makes every workout challenging, rewarding, and fun for swimmers of all backgrounds.",
    ),
    certifications: ["ASCA Level 2", "USMS Certified Coach"],
    image: imageRef(COACH_SARAH_IMAGE_ID),
    sortOrder: 5,
  },
  {
    _id: "staff-david-kim",
    _type: "staff",
    name: "David Kim",
    position: "Novice & Learn-to-Compete Coach",
    tier: "assistant",
    email: "david@azsealsswimming.com",
    bio: rich(
      "David works with our youngest and newest competitive swimmers, providing patient instruction and building confidence from the first lap to the first race.",
    ),
    certifications: ["ASCA Level 1", "USA Swimming Certified"],
    image: imageRef(COACH_MEG_IMAGE_ID),
    sortOrder: 6,
  },
];

// ---------------------------------------------------------------------------
// Sponsors — marquee + current
// ---------------------------------------------------------------------------

const sponsors = [
  // Marquee (featured)
  {
    _id: "sponsor-speedo",
    _type: "sponsor",
    name: "Speedo",
    url: "https://www.speedo.com",
    featured: true,
    tier: "partner",
    sortOrder: 1,
  },
  {
    _id: "sponsor-tyr-sport",
    _type: "sponsor",
    name: "TYR Sport",
    featured: true,
    tier: "partner",
    sortOrder: 2,
  },
  {
    _id: "sponsor-arena",
    _type: "sponsor",
    name: "Arena",
    featured: true,
    tier: "partner",
    sortOrder: 3,
  },
  {
    _id: "sponsor-finis",
    _type: "sponsor",
    name: "Finis",
    featured: true,
    tier: "partner",
    sortOrder: 4,
  },
  {
    _id: "sponsor-swimoutlet",
    _type: "sponsor",
    name: "SwimOutlet",
    featured: true,
    tier: "partner",
    sortOrder: 5,
  },
  {
    _id: "sponsor-daktronics",
    _type: "sponsor",
    name: "Daktronics",
    featured: true,
    tier: "partner",
    sortOrder: 6,
  },
  {
    _id: "sponsor-colorado-time-systems",
    _type: "sponsor",
    name: "Colorado Time Systems",
    featured: true,
    tier: "partner",
    sortOrder: 7,
  },
  {
    _id: "sponsor-banner-health",
    _type: "sponsor",
    name: "Banner Health",
    featured: true,
    tier: "partner",
    sortOrder: 8,
  },
  {
    _id: "sponsor-usa-swimming",
    _type: "sponsor",
    name: "USA Swimming",
    url: "https://www.usaswimming.org",
    featured: true,
    tier: "partner",
    sortOrder: 9,
  },
  {
    _id: "sponsor-arizona-swimming",
    _type: "sponsor",
    name: "Arizona Swimming",
    url: "https://www.azswimming.org",
    featured: true,
    tier: "partner",
    sortOrder: 10,
  },
  // Current sponsors not already in marquee
  {
    _id: "sponsor-asca",
    _type: "sponsor",
    name: "ASCA",
    url: "https://www.swimmingcoach.org",
    featured: false,
    tier: "partner",
    sortOrder: 11,
  },
  {
    _id: "sponsor-city-of-maricopa",
    _type: "sponsor",
    name: "City of Maricopa",
    url: "https://www.maricopa-az.gov",
    featured: false,
    tier: "partner",
    sortOrder: 12,
  },
  {
    _id: "sponsor-copper-sky",
    _type: "sponsor",
    name: "Copper Sky Aquatic Center",
    url: "https://www.maricopa-az.gov/parks",
    featured: false,
    tier: "partner",
    sortOrder: 13,
  },
];

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------

const settings = {
  _id: "settings",
  _type: "settings",
  label: "Settings",
  siteTitle: "Arizona Seals Swimming",
  siteDescription:
    "Arizona Seals Swimming – a premier competitive swim club in Arizona dedicated to developing athletes of all ages and skill levels.",
  contactEmail: "arizonaseals@gmail.com",
  contactPhone: "(520) 568-9200",
  primaryAddress: {
    street: "44345 M.L.K. Jr. Blvd",
    city: "Maricopa",
    state: "AZ",
    zip: "85138",
  },
  officeHours: [
    { _key: key(), days: "Mon–Fri", hours: "8:00am – 6:00pm" },
    { _key: key(), days: "Sat", hours: "8:00am – 12:00pm" },
  ],
  mapUrl: "https://maps.google.com/?q=44345+MLK+Jr+Blvd+Maricopa+AZ+85138",
  socialLinks: {
    facebook: "https://www.facebook.com/azseals",
    instagram: "https://www.instagram.com/arizonaseals",
  },
  inquiryTypes: [
    "General Inquiry",
    "Schedule a Tryout",
    "Competitive Team",
    "Development Squad",
    "Masters Swimming",
    "Swim Lessons",
    "Sponsorship",
    "Coaching Opportunities",
    "Facility Rental",
  ],
};

// ---------------------------------------------------------------------------
// Navbar & Footer
// ---------------------------------------------------------------------------

const navbar = {
  _id: "navbar",
  _type: "navbar",
  label: "Navbar",
  columns: [
    navLink("Home", "homePage"),
    navColumn("About", [
      navColumnLink(
        "Our Story",
        "History, mission, and values",
        internalUrl("page-about"),
      ),
      navColumnLink(
        "Coaching Staff",
        "Meet our certified coaches",
        internalUrl("page-coaches"),
      ),
      navColumnLink(
        "Facilities",
        "Where we train",
        internalUrl("page-facilities"),
      ),
    ]),
    navColumn("Programs", [
      navColumnLink(
        "All Programs",
        "View every training group",
        internalUrl("page-programs"),
      ),
      navColumnLink(
        "Blue Group",
        "Elite competitors — highest level",
        externalUrl("/programs#blue"),
      ),
      navColumnLink(
        "Red Group",
        "Advanced athletes building toward Blue",
        externalUrl("/programs#red"),
      ),
      navColumnLink(
        "White Group",
        "Intermediate competitors",
        externalUrl("/programs#white"),
      ),
      navColumnLink(
        "Rising Group",
        "Beginners and new competitive swimmers",
        externalUrl("/programs#rising"),
      ),
    ]),
    navLink("Coaches", "page-coaches"),
    navLink("Facilities", "page-facilities"),
    navLink("Sponsors", "page-sponsors"),
  ],
  buttons: [button("Join the Team", "page-contact", "default")],
};

const footer = {
  _id: "footer",
  _type: "footer",
  subtitle:
    "Developing competitive swimmers and champions in and out of the pool since 2005.",
  columns: [
    {
      _key: key(),
      title: "Quick Links",
      links: [
        footerLink("Home", "homePage"),
        footerLink("About Us", "page-about"),
        footerLink("Coaches", "page-coaches"),
        footerLink("Programs", "page-programs"),
        footerLink("Facilities", "page-facilities"),
        footerLink("Sponsors", "page-sponsors"),
        footerLink("Contact", "page-contact"),
      ],
    },
    {
      _key: key(),
      title: "Programs",
      links: [
        footerExternalLink("Blue Group", "/programs#blue"),
        footerExternalLink("Red Group", "/programs#red"),
        footerExternalLink("White Group", "/programs#white"),
        footerExternalLink("Rising Group", "/programs#rising"),
      ],
    },
    {
      _key: key(),
      title: "Club",
      links: [
        footerLink("Blog", "blogIndex"),
        footerLink("Privacy Policy", "page-privacy"),
        footerLink("Terms", "page-terms"),
      ],
    },
  ],
};

function pageDoc(id, title, slug, description, pageBuilder) {
  return {
    _id: id,
    _type: "page",
    title,
    description,
    slug: { _type: "slug", current: slug },
    pageBuilder,
    seoTitle: title,
    seoDescription: description,
  };
}

// ---------------------------------------------------------------------------
// Home page — exact HeroFullBleed / AboutPreview / CTA defaults
// ---------------------------------------------------------------------------

const homePage = {
  _id: "homePage",
  _type: "homePage",
  title: "Arizona Seals Swimming",
  description:
    "Arizona Seals Swimming – a premier competitive swim club in Arizona dedicated to developing athletes of all ages and skill levels.",
  slug: { _type: "slug", current: "/" },
  seoTitle: "Arizona Seals Swimming",
  seoDescription:
    "Arizona Seals Swimming – a premier competitive swim club in Arizona dedicated to developing athletes of all ages and skill levels.",
  pageBuilder: [
    {
      _key: key(),
      _type: "hero",
      variant: "immersive",
      badge: "For the Team",
      title: "Arizona\nSeals",
      titleAccent: "Swimming",
      image: imageRef(HERO_IMAGE_ID),
      buttons: [
        button("Join the Team", "page-contact", "default"),
        button("Our Programs", "page-programs", "secondary"),
      ],
    },

    {
      _key: key(),
      _type: "splitContent",
      eyebrow: "Who We Are",
      title: "Swimming's about more than what happens in the water.",
      imagePlacement: "end",
      image: imageRef(STATS_IMAGE_ID),
      richText: richMulti(
        "Arizona Seals Swimming is a USA Swimming sanctioned club based at Copper Sky Recreation Center in Maricopa, Arizona. We develop competitive swimmers at every level — from athletes just learning to race to those chasing national titles.",
        "Our coaches are dedicated to building not just fast swimmers, but confident, disciplined competitors who carry those values with them beyond the pool.",
      ),
      buttons: [button("Our Story →", "page-about", "link")],
    },
    {
      _key: key(),
      _type: "programsPreview",
      eyebrow: "Training Groups",
      title: "Our Programs",
      viewAllLabel: "View All Programs →",
      viewAllUrl: internalUrl("page-programs"),
      programs: [],
    },
    {
      _key: key(),
      _type: "stats",
      eyebrow: "By the Numbers",
      title: "We've Got a Lot to Be Proud About",
      image: imageRef(STATS_IMAGE_ID),
      stats: [
        { _key: key(), number: "4", label: "Training Groups" },
        { _key: key(), number: "30+", label: "Athletes Trained" },
        { _key: key(), number: "4", label: "Certified Coaches" },
        { _key: key(), number: "10+", label: "State Qualifiers" },
        { _key: key(), number: "5+", label: "Years of Excellence" },
        { _key: key(), number: "100%", label: "Sanctioned" },
      ],
    },

    {
      _key: key(),
      _type: "latestNews",
      eyebrow: "Stay Updated",
      title: "Latest News",
      count: 3,
    },
    {
      _key: key(),
      _type: "sponsorsMarquee",
      eyebrow: "Proudly Supported By",
      title: "Our Sponsors & Partners",
      viewAllLabel: "View All Sponsors →",
      viewAllUrl: internalUrl("page-sponsors"),
    },
    {
      _key: key(),
      _type: "cta",
      layout: "fullBleed",
      eyebrow: "Get Started",
      title: "Master the Basics\nat Arizona Seals",
      buttons: [
        button("Join the Team", "page-contact", "default"),
        button("Explore Programs", "page-programs", "secondary"),
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

const pages = [
  pageDoc(
    "page-about",
    "About",
    "/about",
    "Learn about Arizona Seals Swimming — our mission, values, and club history.",
    [
      {
        _key: key(),
        _type: "pageHero",
        title: "About Arizona Seals",
        subtitle: "Building champions since 2005",
      },
      {
        _key: key(),
        _type: "splitContent",
        eyebrow: "Our Mission",
        title: "Teaching Excellence Through Swimming For Life",
        imagePlacement: "end",
        image: imageRef(STATS_IMAGE_ID),
        richText: richMulti(
          "Arizona Seals Swimming was founded on the belief that competitive swimming is one of the greatest platforms to develop complete human beings. We don't just train swimmers — we develop leaders, teach perseverance, and forge lifelong friendships.",
          "Our club serves athletes across the greater Maricopa and Phoenix metropolitan area, offering programs for every skill level — from beginner development groups to elite national-level competitors.",
          "We are a proud member of USA Swimming and Arizona Swimming, competing in sanctioned meets across the state and country.",
        ),
      },
      {
        _key: key(),
        _type: "featureCardsIcon",
        variant: "navy",
        eyebrow: "What Drives Us",
        title: "Our Core Values",
        cards: [
          {
            _key: key(),
            title: "Excellence",
            richText: rich(
              "We hold every athlete, coach, and staff member to the highest standard of performance and professionalism.",
            ),
          },
          {
            _key: key(),
            title: "Team First",
            richText: rich(
              "Swimming is an individual sport, but at Arizona Seals we win together. The team's success is every swimmer's success.",
            ),
          },
          {
            _key: key(),
            title: "Commitment",
            richText: rich(
              "Championships are built in practice. We instill discipline, focus, and resilience in every session.",
            ),
          },
          {
            _key: key(),
            title: "Integrity",
            richText: rich(
              "We compete with honesty and respect — for officials, opponents, teammates, and ourselves.",
            ),
          },
        ],
      },
      {
        _key: key(),
        _type: "timeline",
        eyebrow: "Where We've Been",
        title: "Club History",
        items: [
          {
            _key: key(),
            year: "2005",
            title: "A Club Is Born",
            description:
              "Arizona Seals Swimming founded with a mission to develop champions in the water and in life.",
          },
          {
            _key: key(),
            year: "2008",
            title: "First State Title",
            description:
              "First state championship title — proving the Seals system could compete with Arizona's best.",
          },
          {
            _key: key(),
            year: "2012",
            title: "Growing the Roster",
            description:
              "Expanded training as the athlete roster grew across all age groups.",
          },
          {
            _key: key(),
            year: "2016",
            title: "National Stage",
            description:
              "Athletes qualify for USA Swimming Junior Nationals, putting Arizona Seals on the national map.",
          },
          {
            _key: key(),
            year: "2019",
            title: "Club of Excellence",
            description:
              "Named a USA Swimming Club of Excellence for sustained competitive performance and athlete development.",
          },
          {
            _key: key(),
            year: "2022",
            title: "Copper Sky Home",
            description:
              "Arizona Seals establishes Copper Sky Aquatic Center in Maricopa as its primary training home.",
          },
          {
            _key: key(),
            year: "2024",
            title: "Continued Excellence",
            description:
              "State qualifiers and championship performances continue to define the Seals standard.",
          },
          {
            _key: key(),
            year: "2026",
            title: "Still Growing",
            description:
              "A thriving competitive club community still growing stronger every season in Maricopa.",
          },
        ],
      },
      {
        _key: key(),
        _type: "cta",
        layout: "cyanBand",
        title: "Be Part of Our Story",
        richText: rich(
          "Join the Arizona Seals family and write your own chapter of excellence.",
        ),
        buttons: [
          button("Schedule a Tryout", "page-contact", "default"),
          button("Meet Our Coaches", "page-coaches", "secondary"),
        ],
      },
    ],
  ),
  pageDoc(
    "page-programs",
    "Programs",
    "/programs",
    "Explore Arizona Seals training groups for every competitive level — Rising, White, Red, and Blue.",
    [
      {
        _key: key(),
        _type: "pageHero",
        size: "tall",
        title: "Our Programs",
        subtitle: "Arizona Seals",
        backgroundImage: imageRef(HERO_IMAGE_ID),
      },
      {
        _key: key(),
        _type: "programsList",
        title: "A Group for Every Swimmer",
        intro:
          "Arizona Seals offers four training groups — Rising, White, Red, and Blue — structured by ability and commitment level. All swimmers are evaluated by our coaching staff and placed in the group that best fits their current level and goals. Group placement is reviewed each season.",
        programs: [],
      },
      {
        _key: key(),
        _type: "cta",
        layout: "navyBand",
        eyebrow: "Get Evaluated",
        title: "Not Sure Which Group Is Right?",
        richText: rich(
          "Our coaches will evaluate your swimmer and recommend the best fit. Schedule an evaluation to get started.",
        ),
        buttons: [button("Schedule an Evaluation", "page-contact", "default")],
      },
    ],
  ),
  pageDoc(
    "page-coaches",
    "Coaches",
    "/coaches",
    "Meet the Arizona Seals coaching staff dedicated to athlete development and competitive excellence.",
    [
      {
        _key: key(),
        _type: "pageHero",
        title: "Coaching Staff",
        subtitle: "World-class coaches dedicated to your development",
      },
      {
        _key: key(),
        _type: "splitContent",
        eyebrow: "Our Coaching Philosophy",
        title: "More Than Stroke Technique",
        imagePlacement: "end",
        richText: rich(
          "Great coaching develops the whole athlete. Our staff focuses on technical excellence, race strategy, and the character traits that carry swimmers far beyond the pool — discipline, resilience, and teamwork.",
        ),
      },
      {
        _key: key(),
        _type: "team",
        eyebrow: "Leadership",
        title: "Head Coaches",
        assistantsEyebrow: "The Full Staff",
        assistantsTitle: "Assistant Coaches",
        teamMembers: [],
      },
      {
        _key: key(),
        _type: "cta",
        layout: "navyBand",
        title: "Interested in Coaching With Us?",
        richText: rich(
          "We're always looking for passionate coaches who share our values.",
        ),
        buttons: [button("Get in Touch", "page-contact", "default")],
      },
    ],
  ),
  pageDoc(
    "page-facilities",
    "Facilities",
    "/facilities",
    "Train at Copper Sky Aquatic Center — Maricopa's premier competition pool and recreation facility.",
    [
      {
        _key: key(),
        _type: "pageHero",
        title: "Our Facilities",
        subtitle: "World-class aquatic facilities in Maricopa, Arizona",
        backgroundImage: imageRef(FACILITY_IMAGE_ID),
      },
      {
        _key: key(),
        _type: "facilitiesList",
        eyebrow: "Where We Train",
        title: "Copper Sky Regional Park",
        intro:
          "Arizona Seals trains at the premier aquatic facility in Maricopa. Copper Sky offers a competition-grade 50-meter pool and everything our athletes need to excel.",
        facilities: [],
      },
    ],
  ),
  pageDoc(
    "page-sponsors",
    "Sponsors",
    "/sponsors",
    "Thank you to the partners who support Arizona Seals Swimming athletes and families.",
    [
      {
        _key: key(),
        _type: "sponsorsHero",
        title: "Sponsor the Team",
        paragraphs: [
          "Partnering with Arizona Seals puts your brand in front of competitive swimming families across Maricopa County.",
          "Your support funds coaching, meet travel, and equipment that helps athletes chase their goals.",
        ],
      },
      {
        _key: key(),
        _type: "checklistSplit",
        variant: "default",
        eyebrow: "Sponsorship",
        title: "Supporting Athletes Who Represent Maricopa",
        paragraphs: [
          "Arizona Seals Swimming is a USA Swimming sanctioned club developing competitive athletes at Copper Sky Aquatic Center.",
          "Sponsors help us keep training accessible and competitive opportunities within reach for every family.",
        ],
        imagePlacement: "end",
        image: imageRef(HERO_IMAGE_ID),
        buttons: [
          {
            _key: key(),
            _type: "button",
            text: "Email Us About Sponsoring",
            variant: "default",
            url: externalUrl("mailto:sponsors@azsealsswimming.com"),
          },
        ],
      },
      {
        _key: key(),
        _type: "checklistSplit",
        variant: "muted",
        title: "As a Sponsor You Will:",
        items: [
          "Receive logo placement on team apparel and digital channels",
          "Be recognized at home meets and community events",
          "Support athlete travel and championship preparation",
          "Connect with swimming families across the East Valley",
          "Choose a package that fits your marketing goals",
          "Partner with a values-driven USA Swimming club",
        ],
        imagePlacement: "start",
        image: imageRef(STATS_IMAGE_ID),
      },
      {
        _key: key(),
        _type: "sponsorTiers",
        title: "Annual Sponsorship Levels",
        tiers: [
          {
            _key: key(),
            name: "Custom Package",
            price: "Custom",
            availability: "Limited",
            perks: [
              "Tailored benefits package",
              "Premium brand placement",
              "Meet hospitality options",
            ],
            ctaLabel: "Choose Custom",
            ctaEmail: "sponsors@azsealsswimming.com",
          },
          {
            _key: key(),
            name: "Digital",
            price: "$250",
            availability: "Available",
            perks: [
              "Website logo",
              "Social media mention",
              "Newsletter shout-out",
            ],
            ctaLabel: "Choose Digital",
            ctaEmail: "sponsors@azsealsswimming.com",
          },
          {
            _key: key(),
            name: "Friend",
            price: "$500",
            availability: "Available",
            perks: [
              "All Digital benefits",
              "Meet program listing",
              "Team thank-you post",
            ],
            ctaLabel: "Choose Friend",
            ctaEmail: "sponsors@azsealsswimming.com",
          },
          {
            _key: key(),
            name: "Bronze",
            price: "$1,200",
            availability: "Available",
            perks: [
              "All Friend benefits",
              "Banner at home meets",
              "Apparel logo placement",
            ],
            ctaLabel: "Choose Bronze",
            ctaEmail: "sponsors@azsealsswimming.com",
          },
          {
            _key: key(),
            name: "Silver",
            price: "$3,000",
            availability: "Limited",
            perks: [
              "All Bronze benefits",
              "Premium website placement",
              "Coach clinic naming rights",
            ],
            ctaLabel: "Choose Silver",
            ctaEmail: "sponsors@azsealsswimming.com",
          },
          {
            _key: key(),
            name: "Hospitality",
            price: "$2,000",
            availability: "Available",
            perks: [
              "Hospitality tent at select meets",
              "Family appreciation events",
              "Social media package",
            ],
            ctaLabel: "Choose Hospitality",
            ctaEmail: "sponsors@azsealsswimming.com",
          },
        ],
      },
      {
        _key: key(),
        _type: "sponsorsGrid",
        eyebrow: "Thank You",
        title: "Our Sponsors & Partners",
        sponsors: [],
        footerNote: "Interested in becoming a sponsor?",
        footerEmail: "sponsors@azsealsswimming.com",
      },
    ],
  ),
  pageDoc(
    "page-contact",
    "Contact",
    "/contact",
    "Contact Arizona Seals Swimming for registration, practice questions, and partnership inquiries.",
    [
      {
        _key: key(),
        _type: "pageHero",
        title: "Contact Us",
        subtitle: "We'd love to hear from you",
      },
      {
        _key: key(),
        _type: "contactInfo",
        eyebrow: "Get in Touch",
        title: "We're Here to Help",
        description:
          "Have a question about tryouts, programs, or the club? Fill out the form and one of our staff members will respond within 24 hours.",
        showContactForm: true,
      },
    ],
  ),
  pageDoc(
    "page-privacy",
    "Privacy Policy",
    "/privacy",
    "Privacy policy for Arizona Seals Swimming website visitors and members.",
    [
      {
        _key: key(),
        _type: "pageHero",
        title: "Privacy Policy",
      },
      {
        _key: key(),
        _type: "splitContent",
        title: "Your privacy matters",
        imagePlacement: "end",
        richText: richMulti(
          "Arizona Seals Swimming respects your privacy. We collect contact information you voluntarily submit through forms on this website in order to respond to inquiries and manage club communications.",
          "We do not sell personal information. For questions about this policy, email arizonaseals@gmail.com.",
        ),
      },
    ],
  ),
  pageDoc(
    "page-terms",
    "Terms and Conditions",
    "/terms",
    "Terms and conditions for Arizona Seals Swimming website use and membership.",
    [
      {
        _key: key(),
        _type: "pageHero",
        title: "Terms and Conditions",
      },
      {
        _key: key(),
        _type: "splitContent",
        title: "Website terms",
        imagePlacement: "end",
        richText: richMulti(
          "By using this website you agree to use it for lawful purposes related to Arizona Seals Swimming. Content is provided for general information about our club, programs, and events.",
          "Membership, training, and meet participation are governed by USA Swimming rules and club policies provided separately to registered families.",
        ),
      },
    ],
  ),
];

const blogPosts = [
  {
    _id: "blog-seals-capture-5-medals",
    _type: "blog",
    title: "Seals Capture 5 Medals at Arizona State Championships",
    description:
      "Our competitive team had an outstanding performance at the AZ State Championships, bringing home 5 medals including 2 gold.",
    slug: {
      _type: "slug",
      current: "/blog/seals-capture-5-medals-az-state-championships",
    },
    category: "Results",
    publishedAt: "2026-06-22T12:00:00.000Z",
    image: imageRef(HERO_IMAGE_ID),
    richText: richMulti(
      "The Arizona Seals had one of their best performances of the season at the 2026 Arizona State Swimming Championships. Competing against clubs from across the state, our athletes stepped up when it mattered most.",
      "Senior swimmers led the charge, with standout performances in the 200 Butterfly, 100 Backstroke, and 4×100 Freestyle relay. The relay team dropped a full two seconds from their seed time to earn gold.",
      "Head Coach Elena Martinez called the meet a defining moment for our program. These kids have been putting in the work day after day. Seeing it pay off at a championship meet is exactly why we do this.",
      "We are immensely proud of every athlete who competed. The season continues next month with the Southwest Zone Championships.",
    ),
  },
  {
    _id: "blog-summer-registration",
    _type: "blog",
    title: "Summer Season Registration Now Open",
    description:
      "Registration for the 2026 summer season is officially open. Spots are limited — secure your swimmer's place in the group today.",
    slug: {
      _type: "slug",
      current: "/blog/summer-season-registration-now-open",
    },
    category: "Club News",
    publishedAt: "2026-05-15T12:00:00.000Z",
    image: imageRef(FACILITY_IMAGE_ID),
    richText: richMulti(
      "We are excited to announce that registration for the 2026 Summer Season is now officially open for all Arizona Seals training groups. Summer is one of our favorite training blocks — the longer days and competition schedule create a unique opportunity for athletes to make big jumps in their development.",
      "Registration is available through the Teamunify portal. Families who register before June 1st will receive priority lane assignments and access to our pre-season dryland camp.",
      "Spots in each group are limited. If you have questions about which group is right for your swimmer, please reach out to your group coach or contact us.",
    ),
  },
  {
    _id: "blog-swimmers-of-the-month",
    _type: "blog",
    title: "February 2026 Swimmers of the Month",
    description:
      "Each month we recognize athletes who exemplify hard work, improvement, and team spirit. Meet our latest honorees.",
    slug: {
      _type: "slug",
      current: "/blog/february-2026-swimmers-of-the-month",
    },
    category: "Awards",
    publishedAt: "2026-03-01T12:00:00.000Z",
    image: imageRef(STATS_IMAGE_ID),
    richText: richMulti(
      "Each month the Arizona Seals coaching staff selects athletes who have gone above and beyond — not just in the pool, but in how they show up for their teammates and embody the values of our club.",
      "Development Group — Maya Chen (Age 10): Maya joined the Seals six months ago barely able to complete a 25-yard freestyle. This month she swam her first 200 IM in competition and finished the race with a smile.",
      "Competitive Group — Tyler Nguyen (Age 14): Tyler dropped time in every event he swam in February, capping the month with a 4-second personal best in the 200 Backstroke.",
      "Senior Group — Isabella Reyes (Age 17): Isabella has been quietly putting together one of the best seasons in her career. This month she hit Junior National qualifying standards in two events.",
    ),
  },
];

const blogIndex = {
  _id: "blogIndex",
  _type: "blogIndex",
  title: "Blog",
  description: "News, meet results, and updates from Arizona Seals Swimming.",
  slug: { _type: "slug", current: "/blog" },
  seoTitle: "Blog",
  seoDescription:
    "News, meet results, and updates from Arizona Seals Swimming.",
  displayFeaturedBlogs: "no",
  pageBuilder: [],
};

const docs = [
  settings,
  ...programs,
  facility,
  ...staff,
  ...sponsors,
  ...pages,
  homePage,
  blogIndex,
  ...blogPosts,
  navbar,
  footer,
];

try {
  await client.delete("program-bronze");
  console.log("Deleted program-bronze");
} catch {
  // ignore if missing
}

const transaction = client.transaction();
for (const doc of docs) {
  transaction.createOrReplace(doc);
}

const result = await transaction.commit({ autoGenerateArrayKeys: true });
console.log(`Seeded ${docs.length} documents into ${projectId}/${dataset}`);
console.log(result.results?.length ?? 0, "mutations applied");
