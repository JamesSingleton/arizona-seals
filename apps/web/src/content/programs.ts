export type Program = {
  id: string;
  name: string;
  tagline: string;
  level: string;
  accentColor: string;
  textAccent: string;
  borderAccent: string;
  bgAccent: string;
  description: string;
  expectations: string[];
  requirements: string[];
  equipment: string[];
  sessions: string;
  /** Short description used on the home programs preview */
  previewDescription: string;
  previewLevel: string;
  href: string;
};

export const programs: Program[] = [
  {
    id: "blue",
    name: "Blue Group",
    tagline: "Elite Competitors",
    level: "Highest Level",
    accentColor: "#1B3A6B",
    textAccent: "text-[#1B3A6B]",
    borderAccent: "border-[#1B3A6B]",
    bgAccent: "bg-[#1B3A6B]",
    description:
      "Blue Group is our most advanced training group, designed for serious competitors pursuing state, regional, and national championships. Athletes in this group are held to the highest standards and are expected to demonstrate leadership, commitment, and elite-level performance.",
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
    sessions: "6–8 practices/week",
    previewDescription:
      "Our highest-level group for elite competitors pursuing regional, state, and national titles.",
    previewLevel: "Advanced",
    href: "/programs#blue",
  },
  {
    id: "red",
    name: "Red Group",
    tagline: "Advancing Athletes",
    level: "Advanced",
    accentColor: "#C0392B",
    textAccent: "text-[#C0392B]",
    borderAccent: "border-[#C0392B]",
    bgAccent: "bg-[#C0392B]",
    description:
      "Red Group bridges the gap between developing and elite swimming. Athletes here have solid foundations in all four strokes and are building the endurance, race experience, and technique to eventually earn a spot in Blue Group. Meets are a regular and expected part of participation.",
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
    sessions: "4–6 practices/week",
    previewDescription:
      "Developing athletes with strong fundamentals ready to compete at the next level.",
    previewLevel: "Intermediate–Advanced",
    href: "/programs#red",
  },
  {
    id: "white",
    name: "White Group",
    tagline: "Building Competitors",
    level: "Intermediate",
    accentColor: "#5A6A7A",
    textAccent: "text-[#5A6A7A]",
    borderAccent: "border-[#5A6A7A]",
    bgAccent: "bg-[#5A6A7A]",
    description:
      "White Group is where competitive swimming starts to get serious. Swimmers are learning to race, building endurance, and working toward legal and efficient strokes in all four disciplines. This group participates in sanctioned meets and introduces athletes to the full competitive experience.",
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
    sessions: "3–4 practices/week",
    previewDescription:
      "Building race-ready skills and competitive confidence in a structured environment.",
    previewLevel: "Intermediate",
    href: "/programs#white",
  },
  {
    id: "rising",
    name: "Rising Group",
    tagline: "Beginners Welcome",
    level: "Entry Level",
    accentColor: "#00AEEF",
    textAccent: "text-cyan-brand",
    borderAccent: "border-cyan-brand",
    bgAccent: "bg-cyan-brand",
    description:
      "Rising Group is the entry point into Arizona Seals Swimming. This group is designed for beginners who can swim independently but are brand new to competitive swimming. Coaches focus on water safety, basic stroke mechanics, and — most importantly — making the sport fun and building a love for the water.",
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
    sessions: "2–3 practices/week",
    previewDescription:
      "The starting point for new competitive swimmers learning all four strokes and race basics.",
    previewLevel: "Beginner",
    href: "/programs#rising",
  },
];
