export type Article = {
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  body: string;
};

export const articles: Article[] = [
  {
    slug: "seals-capture-5-medals-az-state-championships",
    title: "Seals Capture 5 Medals at Arizona State Championships",
    date: "June 22, 2026",
    category: "Results",
    image: "/placeholder.svg?height=600&width=1200",
    excerpt:
      "Our competitive team had an outstanding performance at the AZ State Championships, bringing home 5 medals including 2 gold.",
    body: `
      The Arizona Seals had one of their best performances of the season at the 2026 Arizona State Swimming Championships, held at the Chandler Aquatic Center. Competing against over 40 clubs from across the state, our athletes stepped up when it mattered most.

      Senior swimmers led the charge, with standout performances in the 200 Butterfly, 100 Backstroke, and 4×100 Freestyle relay. The relay team — composed of four of our senior group athletes — dropped a full two seconds from their seed time to earn gold.

      Head Coach Elena Martinez called the meet "a defining moment for our program." She added: "These kids have been putting in the work day after day. Seeing it pay off at a championship meet is exactly why we do this."

      The full medal breakdown:
      - Gold: 200 Butterfly (Women 15–16), 4×100 Freestyle Relay (Men 17–18)
      - Silver: 100 Backstroke (Women 13–14), 200 Breaststroke (Men 15–16)
      - Bronze: 400 Individual Medley (Women 17–18)

      We are immensely proud of every athlete who competed. The season continues next month with the Southwest Zone Championships.
    `,
  },
  {
    slug: "summer-season-registration-now-open",
    title: "Summer Season Registration Now Open",
    date: "May 15, 2026",
    category: "Club News",
    image: "/placeholder.svg?height=600&width=1200",
    excerpt:
      "Registration for the 2026 summer season is officially open. Spots are limited — secure your swimmer's place in the group today.",
    body: `
      We are excited to announce that registration for the 2026 Summer Season is now officially open for all Arizona Seals training groups. Summer is one of our favorite training blocks — the longer days and competition schedule create a unique opportunity for athletes to make big jumps in their development.

      Registration is available through the Teamunify portal. Families who register before June 1st will receive priority lane assignments and access to our pre-season dryland camp.

      What to expect this summer:
      - Expanded morning practice schedule for Senior and Competitive groups
      - Summer Invitational hosted at Copper Sky on July 12–13
      - Swimmer of the Month recognition every four weeks
      - Optional open-water clinic in August

      Spots in each group are limited. If you have questions about which group is right for your swimmer, please reach out to your group coach or contact us at info@azsealsswimming.com.

      We look forward to a fantastic summer in the water!
    `,
  },
  {
    slug: "february-2026-swimmers-of-the-month",
    title: "February 2026 Swimmers of the Month",
    date: "March 1, 2026",
    category: "Awards",
    image: "/placeholder.svg?height=600&width=1200",
    excerpt:
      "Each month we recognize athletes who exemplify hard work, improvement, and team spirit. Meet our latest honorees.",
    body: `
      Each month the Arizona Seals coaching staff selects athletes who have gone above and beyond — not just in the pool, but in how they show up for their teammates and embody the values of our club. February's honorees represent the best of what we stand for.

      **Development Group — Maya Chen (Age 10)**
      Maya joined the Seals six months ago barely able to complete a 25-yard freestyle. This month she swam her first 200 IM in competition and finished the race with a smile. Her coachability and positive attitude are contagious.

      **Competitive Group — Tyler Nguyen (Age 14)**
      Tyler dropped time in every event he swam in February, capping the month with a 4-second personal best in the 200 Backstroke. He's also the first one in the water for practice and the last to leave.

      **Senior Group — Isabella Reyes (Age 17)**
      Isabella has been quietly putting together one of the best seasons in her career. This month she hit Junior National qualifying standards in two events. Her leadership in the locker room and on the blocks is an example to everyone on the team.

      Congratulations to all three — we are proud of everything you have accomplished.
    `,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
