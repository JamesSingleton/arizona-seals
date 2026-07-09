export type SponsorTier = {
  name: string;
  price: string;
  availability: string;
  perks: string[];
};

export type Sponsor = {
  name: string;
  href?: string;
  logo: string;
};

export type MarqueeSponsor = {
  name: string;
  logo: string;
};

export const sponsorTiers: SponsorTier[] = [
  {
    name: "Custom Package",
    price: "Contact Us",
    availability: "Flexible",
    perks: [
      "Tailored benefits to match your goals",
      "Custom naming rights or activations",
      "Work directly with team leadership",
    ],
  },
  {
    name: "Digital",
    price: "$250",
    availability: "Unlimited spots",
    perks: [
      "Logo on team website",
      "Social media mention",
      "Digital meet program listing",
    ],
  },
  {
    name: "Friend",
    price: "$500",
    availability: "Unlimited spots",
    perks: [
      "Everything in Digital",
      "Name/logo in printed meet programs",
      "2 guest passes per season",
    ],
  },
  {
    name: "Bronze",
    price: "$1,200",
    availability: "Limited spots",
    perks: [
      "Everything in Friend",
      "Banner display at home meets",
      "Quarterly social media features",
      "5 guest passes per season",
    ],
  },
  {
    name: "Silver",
    price: "$3,000",
    availability: "Limited spots",
    perks: [
      "Everything in Bronze",
      "Logo on team warm-up gear",
      "Monthly social media features",
      "Half-page ad in meet programs",
      "10 guest passes per season",
    ],
  },
  {
    name: "Hospitality",
    price: "$2,000",
    availability: "Limited spots",
    perks: [
      "Everything in Bronze",
      "Hospitality suite at championship meets",
      "Exclusive poolside access",
      "VIP recognition at awards ceremonies",
      "8 guest passes per season",
    ],
  },
];

export const currentSponsors: Sponsor[] = [
  {
    name: "USA Swimming",
    href: "https://www.usaswimming.org",
    logo: "/placeholder.svg?height=40&width=140&text=USA%20Swimming",
  },
  {
    name: "Arizona Swimming",
    href: "https://www.azswimming.org",
    logo: "/placeholder.svg?height=40&width=140&text=Arizona%20Swimming",
  },
  {
    name: "ASCA",
    href: "https://www.swimmingcoach.org",
    logo: "/placeholder.svg?height=40&width=140&text=ASCA",
  },
  {
    name: "City of Maricopa",
    href: "https://www.maricopa-az.gov",
    logo: "/placeholder.svg?height=40&width=140&text=City%20of%20Maricopa",
  },
  {
    name: "Copper Sky Aquatic Center",
    href: "https://www.maricopa-az.gov/parks",
    logo: "/placeholder.svg?height=40&width=140&text=Copper%20Sky",
  },
  {
    name: "Speedo",
    href: "https://www.speedo.com",
    logo: "/placeholder.svg?height=40&width=140&text=Speedo",
  },
];

export const marqueeSponsors: MarqueeSponsor[] = [
  { name: "Speedo", logo: "/placeholder.svg?height=40&width=130" },
  { name: "TYR Sport", logo: "/placeholder.svg?height=40&width=130" },
  { name: "Arena", logo: "/placeholder.svg?height=40&width=130" },
  { name: "Finis", logo: "/placeholder.svg?height=40&width=130" },
  { name: "SwimOutlet", logo: "/placeholder.svg?height=40&width=130" },
  { name: "Daktronics", logo: "/placeholder.svg?height=40&width=130" },
  {
    name: "Colorado Time Systems",
    logo: "/placeholder.svg?height=40&width=130",
  },
  { name: "Banner Health", logo: "/placeholder.svg?height=40&width=130" },
  { name: "USA Swimming", logo: "/placeholder.svg?height=40&width=130" },
  { name: "Arizona Swimming", logo: "/placeholder.svg?height=40&width=130" },
];

export const sponsorBenefits = [
  "Reach 200+ athletes and their families throughout the season",
  "Gain visibility at all Arizona Seals home meets and select travel events",
  "Be featured in our digital communications and social channels",
  "Receive logo placement on team gear, programs, and website",
  "Align your brand with youth excellence and community investment",
  "Receive a formal sponsorship agreement and recognition at season kickoff",
];

export const sponsorEmail = "sponsors@azsealsswimming.com";
