export type Stat = {
  number: string;
  label: string;
};

export const stats: Stat[] = [
  { number: "4", label: "Training Groups" },
  { number: "30+", label: "Athletes Trained" },
  { number: "4", label: "Certified Coaches" },
  { number: "10+", label: "State Qualifiers" },
  { number: "5+", label: "Years of Excellence" },
  { number: "100%", label: "Sanctioned" },
];

/** Compact stats used on the about page mission section */
export const aboutStats: Stat[] = [
  { number: "30+", label: "Active Athletes" },
  { number: "4", label: "Certified Coaches" },
  { number: "20+", label: "Years of Excellence" },
  { number: "50+", label: "National Qualifiers" },
];
