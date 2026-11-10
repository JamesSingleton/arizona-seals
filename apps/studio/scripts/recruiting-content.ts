/**
 * Content for the recruiting pages: /tryouts, /schedule, the reworked home
 * page, navigation and per-group practice times.
 *
 * Every fact here comes from content already published on the site (FAQs,
 * program documents, the club history timeline). Nothing about dues is
 * invented: monthly dues stay empty until the club enters them in Studio.
 *
 * Consumed by seed-recruiting-pages.ts, which writes these as DRAFTS only.
 */

type Ref = { _type: "reference"; _ref: string };

let keyCounter = 0;
/** Stable keys so re-running the seed produces the same documents. */
const k = (prefix: string) =>
  `${prefix}${String(++keyCounter).padStart(3, "0")}`;

const ref = (_ref: string): Ref => ({ _type: "reference", _ref });

const internal = (id: string) => ({
  _type: "customUrl",
  type: "internal",
  openInNewTab: false,
  internal: ref(id),
});

const external = (href: string, openInNewTab = false) => ({
  _type: "customUrl",
  type: "external",
  openInNewTab,
  external: href,
});

const button = (
  text: string,
  url: ReturnType<typeof internal> | ReturnType<typeof external>,
  variant: "default" | "secondary" | "outline" | "link" = "default",
) => ({ _key: k("btn"), _type: "button", text, variant, url });

const image = (assetId: string, alt: string) => ({
  _type: "image",
  alt,
  asset: ref(assetId),
});

const paragraph = (text: string) => ({
  _key: k("blk"),
  _type: "block",
  style: "normal",
  markDefs: [],
  children: [{ _key: k("spn"), _type: "span", marks: [], text }],
});

/** Existing published documents these pages link to. */
export const IDS = {
  home: "homePage",
  tryouts: "page-tryouts",
  schedule: "page-schedule",
  programs: "page-programs",
  coaches: "page-coaches",
  about: "page-about",
  board: "page-board",
  facilities: "page-facilities",
  sponsors: "page-sponsors",
  contact: "page-contact",
  resources: "5mggxWyKI45XqPWaEzV8Bc",
} as const;

/** Photos already in the dataset. */
const IMG = {
  heroRace: "image-4853ac4449a8f1d89aa4d48bb5bc8338b243be1d-6000x4000-avif",
  seniorState: "image-5eab7ec38166ec7e22db4124e92ff6db561278dc-6000x4000-avif",
  teamPhoto: "image-95dc2d3fa7688ae12963124e451eb731b974b171-2048x1365-avif",
  youngSwimmer: "image-d73a1decc0de60122120f8b2a90582d2142a16a0-1365x2048-avif",
  racer: "image-809df70e47b9c4fa715daf212c690723f8eb4b78-2048x1365-avif",
  copperSky: "image-785899a115828858fc71c51625da8cba575542cd-1138x533-jpg",
  butterfly: "image-916535f31cba5e8265d5731e23dcd027523653a5-2048x1323-avif",
} as const;

/** Existing FAQ documents, by question. */
const FAQ = {
  needToSwim: "a498aaa9-7294-4db8-b890-d89db72dac9f",
  startAge: "d96e8b20-71c3-441a-a475-7041c8af2cfd",
  tryBeforeCommit: "3b4d15a2-c9b7-452b-a566-d230127b49a0",
  lessons: "ee663f65-466a-4178-b9d4-6fddbaf01fcb",
  needToJoin: "8416db75-0325-4fba-9b05-8ab019384e18",
  cost: "21134dff-4390-416e-9efe-048fb60be799",
  where: "0814c611-82f3-4ac7-9cb6-b69cfbf620c4",
  bring: "7473aad8-8b01-4c46-9f37-35a64dd351b3",
  meetsRequired: "cec1d4c8-0dbc-48d7-bd8e-bbe60a454474",
  copperSkyMembership: "d06e9006-6891-4597-9ae9-f6994a2aaa6e",
  highSchool: "7d8ca40b-fe46-43b3-9ff6-d45e84098f35",
  whereFrom: "6afa21d3-1f7a-480c-b4fa-1b5d57dacbbc",
} as const;

const faqRefs = (ids: string[]) =>
  ids.map((id) => ({ _key: k("faq"), ...ref(id) }));

const TRYOUT_INQUIRY = "Schedule a Tryout";

/* ------------------------------------------------------------------ */
/* Programs: practice times moved out of the FAQ into structured data  */
/* ------------------------------------------------------------------ */

const times = (rows: [days: string, time: string][]) =>
  rows.map(([days, time]) => ({ _key: k("pt"), days, time }));

export const programPatches: Record<
  string,
  { ageRange: string; practiceTimes: ReturnType<typeof times> }
> = {
  "program-rising": {
    ageRange: "5+",
    practiceTimes: times([
      ["Tuesday & Thursday", "5:00 to 6:15 p.m."],
      ["Saturday", "8:00 to 9:15 a.m."],
    ]),
  },
  "program-white": {
    ageRange: "7+",
    practiceTimes: times([
      ["Monday, Wednesday & Friday", "5:00 to 6:30 p.m."],
      ["Saturday", "8:00 to 9:30 a.m."],
    ]),
  },
  "program-red": {
    ageRange: "12+",
    practiceTimes: times([
      ["Monday to Thursday", "4:30 to 6:00 p.m."],
      ["Friday", "5:00 to 6:30 p.m."],
      ["Saturday", "8:00 to 9:30 a.m."],
    ]),
  },
  "program-blue": {
    ageRange: "13+",
    practiceTimes: times([
      ["Monday to Thursday", "4:00 to 6:00 p.m."],
      ["Friday", "5:00 to 6:30 p.m."],
      ["Saturday", "8:00 to 9:30 a.m."],
    ]),
  },
};

/* ------------------------------------------------------------------ */
/* /tryouts                                                            */
/* ------------------------------------------------------------------ */

export const tryoutsPage = {
  _id: IDS.tryouts,
  _type: "page",
  title: "Tryouts",
  description:
    "How to join Arizona Seals: the readiness test, what happens at a tryout, and how coaches place swimmers in a training group.",
  slug: { _type: "slug", current: "/tryouts" },
  seoTitle: "Swim Team Tryouts in Maricopa, AZ | Arizona Seals",
  seoDescription:
    "Schedule a swim team tryout at Copper Sky in Maricopa, AZ. See the readiness test, what happens at the evaluation and how swimmers ages 5+ are placed.",
  pageBuilder: [
    {
      _key: k("blk"),
      _type: "pageHero",
      title: "Tryouts",
      subtitle:
        "Every new Seal starts with a tryout, so our coaches can put your swimmer in the right group from day one.",
      backgroundImage: image(
        IMG.racer,
        "Arizona Seals swimmer racing freestyle",
      ),
      overlay: true,
      size: "tall",
    },
    {
      _key: k("blk"),
      _type: "checklistSplit",
      eyebrow: "The Readiness Test",
      title: "Is Your Swimmer Ready for Swim Team?",
      paragraphs: [
        "Arizona Seals is a competitive swim team, not a lesson program. To start in our Rising Group, a swimmer needs to be able to:",
      ],
      items: [
        "Swim 25 yards of freestyle on their own",
        "Swim 25 yards of backstroke on their own",
        "Feel comfortable in deep water",
        "Be at least 5 years old",
      ],
      image: image(IMG.youngSwimmer, "Young Arizona Seals swimmer at practice"),
      imagePlacement: "end",
      variant: "default",
      buttons: [button("Schedule a Tryout", external("#contact-form"))],
    },
    {
      _key: k("blk"),
      _type: "processSteps",
      eyebrow: "How It Works",
      title: "What Happens at a Tryout",
      intro:
        "A tryout is a short, low-pressure swim with a coach. It tells us where your swimmer will be challenged without being overwhelmed.",
      variant: "navy",
      steps: [
        {
          _key: k("stp"),
          title: "Reach Out",
          description:
            "Send the form below with your swimmer's age and experience. We'll reply with a time to come to Copper Sky.",
        },
        {
          _key: k("stp"),
          title: "Swim for a Coach",
          description:
            "Your swimmer gets in the water and shows a coach what they can do. Bring a swimsuit, goggles and a towel.",
        },
        {
          _key: k("stp"),
          title: "Get Placed",
          description:
            "Coaches place your swimmer in Rising, White, Red or Blue based on age and ability, and walk you through that group's schedule and dues.",
        },
        {
          _key: k("stp"),
          title: "Join the Team",
          description:
            "Register with USA Swimming, set up monthly dues and start practice with your new teammates.",
        },
      ],
    },
    {
      _key: k("blk"),
      _type: "checklistSplit",
      eyebrow: "Not Ready Yet?",
      title: "Start With Lessons, Then Come Race",
      paragraphs: [
        "If your child is still learning to swim, lessons are the right first step. We don't teach lessons, but swim lessons are offered right here in Maricopa at Copper Sky.",
        "Once your swimmer can cover 25 yards of freestyle and backstroke, come try out. Rising is built for exactly that next step.",
      ],
      image: image(IMG.copperSky, "The competition pool at Copper Sky"),
      imagePlacement: "start",
      variant: "muted",
      buttons: [
        button(
          "See the Rising Group",
          external("/programs#rising"),
          "secondary",
        ),
      ],
    },
    {
      _key: k("blk"),
      _type: "faqAccordion",
      eyebrow: "Tryout Questions",
      title: "Before You Come",
      faqs: faqRefs([
        FAQ.tryBeforeCommit,
        FAQ.startAge,
        FAQ.needToSwim,
        FAQ.needToJoin,
        FAQ.cost,
        FAQ.bring,
      ]),
    },
    {
      _key: k("blk"),
      _type: "contactInfo",
      eyebrow: "Schedule a Tryout",
      title: "Tell Us About Your Swimmer",
      description:
        "Include your swimmer's age and any swim team or lesson experience. A coach or board member will reply with a tryout time.",
      useSiteSettings: true,
      showContactForm: true,
      formTitle: "Schedule a Tryout",
      defaultInquiryType: TRYOUT_INQUIRY,
      showMap: true,
    },
  ],
};

/* ------------------------------------------------------------------ */
/* /schedule                                                           */
/* ------------------------------------------------------------------ */

export const schedulePage = {
  _id: IDS.schedule,
  _type: "page",
  title: "Schedule & Dues",
  description:
    "Practice times and costs for every Arizona Seals training group at Copper Sky in Maricopa, AZ.",
  slug: { _type: "slug", current: "/schedule" },
  seoTitle: "Practice Schedule & Dues | Arizona Seals",
  seoDescription:
    "Practice times, ages and monthly dues for all four Arizona Seals swim team groups at Copper Sky in Maricopa, AZ. Rising practices 3 days a week; Blue, 6.",
  pageBuilder: [
    {
      _key: k("blk"),
      _type: "pageHero",
      title: "Schedule & Dues",
      subtitle:
        "When each group practices at Copper Sky, and what it costs to swim with the Seals.",
      backgroundImage: image(IMG.copperSky, "The pool at Copper Sky"),
      overlay: true,
    },
    {
      _key: k("blk"),
      _type: "scheduleDues",
      eyebrow: "Year-Round Training",
      title: "Practice Times by Group",
      intro:
        "All practices are at Copper Sky in Maricopa. Coaches place each swimmer in a group at their tryout.",
      showDues: true,
      duesFallback: "Shared at your tryout",
      fees: [
        {
          _key: k("fee"),
          label: "Monthly dues",
          note: "Paid on the 6th of every month. The amount depends on your swimmer's group.",
        },
        {
          _key: k("fee"),
          label: "USA Swimming registration",
          note: "Every swimmer needs an active USA Swimming registration to practice and race.",
        },
        {
          _key: k("fee"),
          label: "Copper Sky membership",
          note: "Only needed for swimmers in groups that do dryland training.",
        },
      ],
      footnote:
        "Questions about dues? Email admin@arizonaseals.com and we'll send current pricing.",
      buttons: [button("Schedule a Tryout", internal(IDS.tryouts))],
    },
    {
      _key: k("blk"),
      _type: "checklistSplit",
      eyebrow: "On Deck",
      title: "What to Bring to Practice",
      paragraphs: [
        "Every swimmer needs the basics below. Your coach will tell you if your group needs anything else.",
      ],
      items: [
        "Swimsuit, goggles and a swim cap",
        "Kickboard",
        "Pull buoy",
        "Paddles",
      ],
      image: image(IMG.butterfly, "Arizona Seals swimmer racing butterfly"),
      imagePlacement: "end",
      variant: "muted",
    },
    {
      _key: k("blk"),
      _type: "faqAccordion",
      eyebrow: "Good to Know",
      title: "Practice and Meet Questions",
      faqs: faqRefs([
        FAQ.where,
        FAQ.meetsRequired,
        FAQ.copperSkyMembership,
        FAQ.highSchool,
        FAQ.whereFrom,
      ]),
    },
    {
      _key: k("blk"),
      _type: "cta",
      layout: "navyBand",
      eyebrow: "Next Step",
      title: "Ready to Get in the Water?",
      richText: [
        paragraph(
          "Every new swimmer starts with a tryout. It's the fastest way to find the right group.",
        ),
      ],
      buttons: [
        button("Schedule a Tryout", internal(IDS.tryouts)),
        button("Compare the Groups", internal(IDS.programs), "secondary"),
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Home page blocks                                                    */
/* ------------------------------------------------------------------ */

/** Replaces the existing hero's copy, CTAs and adds the proof strip. */
export const homeHeroPatch = {
  badge: "Competitive Swim Team · Maricopa, AZ",
  richText: [
    paragraph(
      "Year-round USA Swimming at Copper Sky. Four training groups for ages 5 and up, from a first race to Speedo Sectionals.",
    ),
  ],
  buttons: [
    button("Schedule a Tryout", internal(IDS.tryouts)),
    button("Schedule & Dues", internal(IDS.schedule), "secondary"),
  ],
  stats: [
    { _key: k("st"), number: "2004", label: "Racing in Pinal County since" },
    { _key: k("st"), number: "4", label: "Training groups, ages 5 and up" },
    { _key: k("st"), number: "8", label: "Junior Olympic titles in 2020" },
    {
      _key: k("st"),
      number: "4",
      label: "Seasons at Speedo Sectionals since 2021",
    },
  ],
};

export const homePathways = {
  _key: "homePathways",
  _type: "pathways",
  eyebrow: "Find Your Lane",
  title: "Where Do You Start?",
  intro:
    "We're a competitive swim team, not a lesson program. Here is the right first step for your swimmer.",
  cards: [
    {
      _key: k("pw"),
      kicker: "New to swim team",
      title: "Start in Rising",
      description:
        "For swimmers 5 and up who can swim 25 yards of freestyle and backstroke. Three practices a week, all four strokes and a first taste of racing.",
      image: image(IMG.youngSwimmer, "Young Arizona Seals swimmer at practice"),
      linkLabel: "How tryouts work",
      url: internal(IDS.tryouts),
    },
    {
      _key: k("pw"),
      kicker: "Already racing",
      title: "Train to Compete",
      description:
        "White, Red and Blue take swimmers from local meets to State and Sectionals. Coaches place you by age and ability, wherever you swam before.",
      image: image(IMG.racer, "Arizona Seals swimmer racing freestyle"),
      linkLabel: "Compare the groups",
      url: internal(IDS.programs),
    },
    {
      _key: k("pw"),
      kicker: "Still learning to swim",
      title: "Lessons First",
      description:
        "Take swim lessons at Copper Sky, then come try out once your swimmer can cover 25 yards of freestyle and backstroke.",
      image: image(IMG.copperSky, "The pool at Copper Sky"),
      linkLabel: "See the readiness test",
      url: internal(IDS.tryouts),
    },
  ],
};

export const homeResults = {
  _key: "homeResults",
  _type: "resultsBoard",
  eyebrow: "Proof in the Pool",
  title: "Maricopa Swimmers, Racing at the Top of Arizona",
  intro:
    "You don't have to leave Maricopa to swim at a high level. Seals qualify for State, Junior Olympics and Speedo Sectionals from right here at Copper Sky.",
  results: [
    {
      _key: k("rs"),
      year: "2026",
      meet: "Speedo Sectionals, Boise",
      detail:
        "Ethan Armstrong races at Sectionals, and Damien Drager competes at Long Course Age Group State.",
    },
    {
      _key: k("rs"),
      year: "2025",
      meet: "Four Corners Speedo Sectionals, Austin",
      detail:
        "Seth Kelly, Hudson Gehrke, Ethan Armstrong and Holden Gehrke race the 400 free relay. Seth Kelly makes finals at Long Course Senior State.",
    },
    {
      _key: k("rs"),
      year: "2023",
      meet: "Arizona Short Course Senior State",
      detail: "Jens Robinson posts a 22.16 in the 50 freestyle.",
    },
    {
      _key: k("rs"),
      year: "2022",
      meet: "Four Corners Speedo Sectionals",
      detail:
        "Nolan Ford drops a lifetime-best 46.78 in the 100 free and Connor Schrader goes 1:56.69 in the 200 back.",
    },
    {
      _key: k("rs"),
      year: "2020",
      meet: "Arizona Junior Olympic Championships",
      detail:
        "Eight event wins: five for Sidney Stolle, two for Connor Schrader and one for Kate Owens.",
    },
  ],
  image: image(
    IMG.seniorState,
    "Arizona Seals swimmer at the 2025 Arizona Senior State Championships",
  ),
  buttons: [button("Our Club History", internal(IDS.about), "secondary")],
};

export const homeSteps = {
  _key: "homeSteps",
  _type: "processSteps",
  eyebrow: "Joining the Seals",
  title: "Four Steps to Your First Practice",
  variant: "default",
  steps: [
    {
      _key: k("stp"),
      title: "Schedule a Tryout",
      description: "Tell us your swimmer's age and experience.",
    },
    {
      _key: k("stp"),
      title: "Swim for a Coach",
      description: "A short, low-pressure swim at Copper Sky.",
    },
    {
      _key: k("stp"),
      title: "Get Placed",
      description: "Coaches match your swimmer to Rising, White, Red or Blue.",
    },
    {
      _key: k("stp"),
      title: "Start Practice",
      description: "Register with USA Swimming and meet your teammates.",
    },
  ],
  buttons: [
    button("Schedule a Tryout", internal(IDS.tryouts)),
    button("See Schedule & Dues", internal(IDS.schedule), "secondary"),
  ],
};

/** Final home page order. Existing blocks are kept as they are, by type. */
export const HOME_ORDER = [
  "hero",
  "pathways",
  "splitContent",
  "programsPreview",
  "resultsBoard",
  "processSteps",
  "latestNews",
  "sponsorsMarquee",
  "cta",
] as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

const navLink = (name: string, id: string) => ({
  _key: k("nav"),
  _type: "navbarLink",
  name,
  url: internal(id),
});

const columnLink = (name: string, description: string, id: string) => ({
  _key: k("nav"),
  _type: "navbarColumnLink",
  name,
  description,
  url: internal(id),
});

/**
 * Top-level order puts the pages a new parent needs first. The existing
 * "Programs" dropdown is reused untouched; this only describes the rest.
 */
export const navAbout = {
  _key: "navAbout",
  _type: "navbarColumn",
  title: "About",
  links: [
    columnLink("Our Story", "History, mission and values", IDS.about),
    columnLink("Board of Directors", "Club officers and leadership", IDS.board),
    columnLink("Facilities", "Where we train", IDS.facilities),
    columnLink("Sponsors", "The partners behind the team", IDS.sponsors),
    columnLink("Resources", "Team documents and policies", IDS.resources),
    columnLink("Contact", "Questions? Get in touch", IDS.contact),
  ],
};

export const navTryouts = navLink("Tryouts", IDS.tryouts);
export const navSchedule = navLink("Schedule & Dues", IDS.schedule);
export const navCoaches = navLink("Coaches", IDS.coaches);
export const navCta = button("Schedule a Tryout", internal(IDS.tryouts));

export const footerLinks = [
  {
    _key: k("ftr"),
    _type: "footerColumnLink",
    name: "Tryouts",
    url: internal(IDS.tryouts),
  },
  {
    _key: k("ftr"),
    _type: "footerColumnLink",
    name: "Schedule & Dues",
    url: internal(IDS.schedule),
  },
];

/** About page says the club was founded in 2004; the footer said 2005. */
export const footerSubtitle =
  "Developing competitive swimmers and champions in and out of the pool since 2004. Proudly serving Maricopa and Pinal County, Arizona.";
