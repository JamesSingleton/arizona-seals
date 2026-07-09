export type HeadCoach = {
  name: string;
  title: string;
  photo: string;
  certifications: string[];
  bio: string;
  specialties: string[];
  email: string;
};

export type AssistantCoach = {
  name: string;
  title: string;
  photo: string;
  bio: string;
  certifications: string[];
  email: string;
};

export const headCoaches: HeadCoach[] = [
  {
    name: "Elena Martinez",
    title: "Head Coach & Program Director",
    photo: "/placeholder.svg?height=500&width=400",
    certifications: [
      "ASCA Level 5",
      "USA Swimming Certified",
      "CPR/AED Certified",
    ],
    bio: "Coach Elena brings over 20 years of elite coaching experience to Arizona Seals. A former NCAA Division I All-American at the University of Arizona, she has guided 12 swimmers to Olympic Trial qualifications and was named ASCA Coach of the Year in 2024. Her philosophy centers on technical excellence and developing the complete athlete.",
    specialties: [
      "Butterfly & Backstroke",
      "Elite Competition Prep",
      "Dryland Training",
    ],
    email: "elena@azsealsswimming.com",
  },
  {
    name: "Marcus Thompson",
    title: "Associate Head Coach – Competitive Group",
    photo: "/placeholder.svg?height=500&width=400",
    certifications: [
      "ASCA Level 4",
      "USA Swimming Certified",
      "Strength & Conditioning Cert.",
    ],
    bio: "Coach Marcus joined the Seals in 2014 after a decorated collegiate career at Arizona State University. He specializes in sprint events and has coached five Arizona state record holders. Known for his high-energy coaching style, Marcus creates an environment where athletes push past perceived limits.",
    specialties: [
      "Sprint Freestyle & Breaststroke",
      "Race Strategy",
      "Mental Performance",
    ],
    email: "marcus@azsealsswimming.com",
  },
];

export const assistantCoaches: AssistantCoach[] = [
  {
    name: "Sofia Reyes",
    title: "Development Group Coach",
    photo: "/placeholder.svg?height=400&width=300",
    bio: "Former Arizona state champion specializing in age-group development. Sofia has a gift for making swimming fun while building rock-solid technique foundations.",
    certifications: ["ASCA Level 2", "USA Swimming Certified"],
    email: "sofia@azsealsswimming.com",
  },
  {
    name: "James Park",
    title: "Senior Group Coach",
    photo: "/placeholder.svg?height=400&width=300",
    bio: "James brings 10 years of coaching experience and a background in exercise science. He works primarily with 14–18 year old athletes preparing for collegiate swimming.",
    certifications: ["ASCA Level 3", "USA Swimming Certified"],
    email: "james@azsealsswimming.com",
  },
  {
    name: "Alicia Torres",
    title: "Masters & Adult Program Coach",
    photo: "/placeholder.svg?height=400&width=300",
    bio: "A USMS All-American, Alicia leads our adult and masters program with incredible energy. She makes every workout challenging, rewarding, and fun for swimmers of all backgrounds.",
    certifications: ["ASCA Level 2", "USMS Certified Coach"],
    email: "alicia@azsealsswimming.com",
  },
  {
    name: "David Kim",
    title: "Novice & Learn-to-Compete Coach",
    photo: "/placeholder.svg?height=400&width=300",
    bio: "David works with our youngest and newest competitive swimmers, providing patient instruction and building confidence from the first lap to the first race.",
    certifications: ["ASCA Level 1", "USA Swimming Certified"],
    email: "david@azsealsswimming.com",
  },
];
