import type { EventCategory } from "@/lib/events";

/**
 * One colour per kind of event, used for the bar on event chips, the dots on
 * the small calendar and the legend. Each passes 3:1 against the chip
 * background in both themes; the event text itself is always full contrast.
 */
export const CATEGORY_STYLES: Record<
  EventCategory,
  { bar: string; dot: string }
> = {
  meet: { bar: "border-navy dark:border-white", dot: "bg-navy dark:bg-white" },
  community: { bar: "border-cyan-brand", dot: "bg-cyan-brand" },
  team: {
    bar: "border-[#5b6b7f] dark:border-[#b9c8d8]",
    dot: "bg-[#5b6b7f] dark:bg-[#b9c8d8]",
  },
  tryout: {
    bar: "border-[#0f766e] dark:border-[#5eead4]",
    dot: "bg-[#0f766e] dark:bg-[#5eead4]",
  },
};

export function categoryStyle(category?: string | null) {
  return CATEGORY_STYLES[category as EventCategory] ?? CATEGORY_STYLES.meet;
}
