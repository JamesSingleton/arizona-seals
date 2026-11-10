import { posthog } from "posthog-js";

import {
  type AnalyticsEventName,
  type AnalyticsEvents,
  cleanProperties,
} from "./events";

const EVENT_ATTR = "data-analytics-event";
const PROPS_ATTR = "data-analytics-props";

/**
 * Declarative click tracking that works in Server Components: spread the
 * returned attributes onto any clickable element and the delegated listener
 * installed by `initializeAnalytics()` captures the event.
 *
 * @example
 * <a href={url} {...trackClick("outbound_link_clicked", { link_type: "map", placement: "contact", url })}>
 */
export function trackClick<E extends AnalyticsEventName>(
  event: E,
  properties: AnalyticsEvents[E],
) {
  return {
    [EVENT_ATTR]: event,
    [PROPS_ATTR]: JSON.stringify(cleanProperties(properties)),
  } as const;
}

let installed = false;

export function installClickTracking() {
  if (installed || typeof document === "undefined") return;
  installed = true;

  // Capture phase so we still record the click when a handler further down
  // stops propagation or the navigation unloads the page.
  document.addEventListener(
    "click",
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const el = target.closest<HTMLElement>(`[${EVENT_ATTR}]`);
      const name = el?.getAttribute(EVENT_ATTR);
      if (!el || !name) return;

      let properties: Record<string, unknown> = {};
      try {
        properties = JSON.parse(el.getAttribute(PROPS_ATTR) ?? "{}");
      } catch {
        // Malformed attribute — still record the event name.
      }

      posthog.capture(name, properties, {
        // Outbound and mailto/tel clicks can unload the page before the
        // batched request goes out; sendBeacon survives navigation.
        transport: "sendBeacon",
      });
    },
    { capture: true },
  );
}
