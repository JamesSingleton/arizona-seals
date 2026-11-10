import { posthog } from "posthog-js";

/**
 * Single source of truth for custom PostHog events. Add an event here first;
 * `track()` and `trackClick()` only accept names and properties defined below.
 * PostHog autocapture still records raw clicks/pageviews — these named events
 * exist so funnels and insights don't depend on CSS selectors or link text.
 */
export type AnalyticsEvents = {
  /** Primary marketing CTA (hero, CTA band/card, page-builder buttons). */
  marketing_cta_clicked: {
    cta_label: string;
    cta_href: string;
    placement: string;
    cta_variant?: string;
  };
  /** Buttons in the site navbar (desktop and mobile sheet). */
  navigation_cta_clicked: {
    cta_label: string;
    cta_href: string;
    cta_variant?: string;
  };
  mobile_navigation_toggled: { open: boolean };
  /** Someone tapped a mailto: or tel: link. The address itself is not sent. */
  contact_method_clicked: {
    method: "email" | "phone";
    placement: string;
  };
  /** Link that leaves the site (sponsors, social, maps, city site). */
  outbound_link_clicked: {
    link_type: "sponsor" | "social" | "map" | "partner";
    placement: string;
    url: string;
    label?: string;
  };
  /** Downloadable or external resource opened from a Resources section. */
  resource_opened: {
    resource_title: string;
    resource_kind: string;
    url: string;
  };
  /** Sponsor tier "choose" CTA (opens a pre-filled email). */
  sponsor_tier_selected: { tier: string };
  contact_form_submitted: { inquiry_type: string };
  contact_form_succeeded: { inquiry_type: string };
  contact_form_failed: { inquiry_type: string; error: string };
  /** Fired alongside contact_form_succeeded when the inquiry is about tryouts. */
  tryout_inquiry_submitted: { inquiry_type: string };
  newsletter_subscription_submitted: { placement: string };
};

export type AnalyticsEventName = keyof AnalyticsEvents;

// Sanity Visual Editing (stega) embeds invisible characters in strings during
// preview; strip them so draft-mode clicks don't create junk property values.
const STEGA_CHARS = /[​-‍﻿⁠-⁤]/g;

export function cleanProperties<T extends Record<string, unknown>>(
  props: T,
): T {
  return Object.fromEntries(
    Object.entries(props)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [
        key,
        typeof value === "string"
          ? value.replace(STEGA_CHARS, "").trim()
          : value,
      ]),
  ) as T;
}

export function track<E extends AnalyticsEventName>(
  event: E,
  properties: AnalyticsEvents[E],
) {
  posthog.capture(event, cleanProperties(properties));
}
