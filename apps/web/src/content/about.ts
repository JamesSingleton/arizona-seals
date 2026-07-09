export type Milestone = {
  year: string;
  title?: string;
  description?: string;
  /** @deprecated Prefer description */
  event?: string;
};

export type Value = {
  icon: "trophy" | "users" | "star" | "heart";
  title: string;
  description: string;
};

export const milestones: Milestone[] = [
  {
    year: "2005",
    title: "A Club Is Born",
    description:
      "Arizona Seals Swimming founded in Scottsdale, AZ with 30 athletes and a mission to develop champions in the water and in life.",
  },
  {
    year: "2008",
    title: "First State Title",
    description:
      "First state championship title — 10 & Under division — proving the Seals system could compete with Arizona's best.",
  },
  {
    year: "2012",
    title: "Growing the Roster",
    description:
      "Expanded to a second training facility as the athlete roster surpassed 100 swimmers across all age groups.",
  },
  {
    year: "2016",
    title: "National Stage",
    description:
      "Three athletes qualify for USA Swimming Junior Nationals, putting Arizona Seals on the national map.",
  },
  {
    year: "2019",
    title: "Club of Excellence",
    description:
      "Named a USA Swimming Silver Medal Club of Excellence for sustained competitive performance and athlete development.",
  },
  {
    year: "2022",
    title: "New Competition Pool",
    description:
      "A new 50-meter competition pool opens at Scottsdale headquarters, giving Seals athletes a world-class home venue.",
  },
  {
    year: "2024",
    title: "Olympic Trials",
    description:
      "First ever Olympic Trial qualifier — Emma Rodriguez, 200m backstroke — a landmark moment for the club.",
  },
  {
    year: "2026",
    title: "300+ Strong",
    description:
      "Over 300 athletes, 15 coaches, 5 national qualifiers, and a community still growing stronger every season.",
  },
];

export const values: Value[] = [
  {
    icon: "trophy",
    title: "Excellence",
    description:
      "We hold every athlete, coach, and staff member to the highest standard of performance and professionalism.",
  },
  {
    icon: "users",
    title: "Team First",
    description:
      "Swimming is an individual sport, but at Arizona Seals we win together. The team's success is every swimmer's success.",
  },
  {
    icon: "star",
    title: "Commitment",
    description:
      "Championships are built in practice. We instill discipline, focus, and resilience in every session.",
  },
  {
    icon: "heart",
    title: "Integrity",
    description:
      "We compete with honesty and respect — for officials, opponents, teammates, and ourselves.",
  },
];

export const mission = {
  eyebrow: "Our Mission",
  title: "Teaching Excellence Through Swimming For Life",
  paragraphs: [
    "Arizona Seals Swimming was founded on the belief that competitive swimming is one of the greatest platforms to develop complete human beings. We don't just train swimmers — we develop leaders, teach perseverance, and forge lifelong friendships.",
    "Our club serves athletes across the greater Scottsdale and Phoenix metropolitan area, offering programs for every skill level — from beginner development groups to elite national-level competitors.",
    "We are a proud member of USA Swimming and Arizona Swimming, competing in the Desert Swimming Association and at sanctioned meets across the country.",
  ],
  quote: "We don't just create fast swimmers. We create great people.",
  quoteAttribution: "— Coach Elena Martinez, Head Coach",
  image: "/placeholder.svg?height=600&width=600",
};
