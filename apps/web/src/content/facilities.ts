export type FacilityFeature = {
  title: string;
  description: string;
};

export type FacilityHours = {
  label: string;
  hours: string[];
};

export type Facility = {
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  image: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  phoneHref: string;
  hours: FacilityHours;
  mapsUrl: string;
  citySiteUrl: string;
  disclaimer: string;
  features: FacilityFeature[];
};

export const primaryFacility: Facility = {
  name: "Copper Sky Aquatic Center",
  shortName: "Copper Sky Regional Park",
  description:
    "Arizona Seals trains at the premier aquatic facility in Maricopa. Copper Sky offers a competition-grade 50-meter pool and everything our athletes need to excel.",
  longDescription:
    "Home to Arizona Seals Swimming, the Copper Sky Aquatic Center is a state-of-the-art facility featuring a competition 50-meter pool and a full-service recreation center. Our athletes train year-round in one of the best aquatic environments in the Southwest.",
  image: "/placeholder.svg?height=440&width=700",
  address: {
    street: "44345 M.L.K. Jr. Blvd",
    city: "Maricopa",
    state: "AZ",
    zip: "85138",
  },
  phone: "(520) 568-9200",
  phoneHref: "tel:+15205689200",
  hours: {
    label: "Aquatic Center Hours",
    hours: [
      "Mon–Fri: 5:30am – 8:00pm",
      "Sat: 7:00am – 4:00pm",
      "Sun: 10:00am – 4:00pm",
    ],
  },
  mapsUrl: "https://maps.google.com/?q=44345+MLK+Jr+Blvd+Maricopa+AZ+85138",
  citySiteUrl: "https://www.maricopa-az.gov/parks",
  disclaimer:
    "Copper Sky Aquatic Center is operated by the City of Maricopa. Arizona Seals leases pool time for all practices and events. Facility hours, pricing, and public access policies are set by the City.",
  features: [
    {
      title: "50-Meter Competition Pool",
      description:
        "10 lanes, competition timing system, electronic start system, and underwater windows for video analysis.",
    },
    {
      title: "Warm-Up Pool",
      description:
        "25-yard heated warm-up and cool-down pool available before and after practices and competitions.",
    },
    {
      title: "Dryland Training Area",
      description:
        "Dedicated strength and conditioning space for dryland workouts, stretching, and team warm-ups.",
    },
    {
      title: "Starting Blocks",
      description:
        "Certified competition starting blocks with non-slip surfaces on every lane.",
    },
    {
      title: "Team Locker Rooms",
      description:
        "Full locker room facilities with showers and storage for athletes at every practice.",
    },
    {
      title: "Spectator Seating",
      description:
        "Ample bleacher seating with full pool deck visibility for parents, family, and fans.",
    },
    {
      title: "Recreation Center",
      description:
        "Full-service recreation center on-site with fitness equipment, courts, and family amenities.",
    },
    {
      title: "Ample Parking",
      description:
        "Free and plentiful parking directly adjacent to the aquatic facility.",
    },
  ],
};
