import posthog from "posthog-js";

import { installClickTracking } from "./click-tracking";
import { keys } from "./keys";
import { posthogBeforeSend } from "./posthog-before-send";

export const initializeAnalytics = () => {
  const { NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN, NEXT_PUBLIC_POSTHOG_HOST } =
    keys();

  if (!(NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN && NEXT_PUBLIC_POSTHOG_HOST)) {
    const missing = NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
      ? "NEXT_PUBLIC_POSTHOG_HOST"
      : "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN";
    // Loud in every environment: a missing NEXT_PUBLIC_* var at build time
    // silently disables analytics in production (see PR #17).
    const log =
      process.env.NODE_ENV === "development" ? console.warn : console.error;
    log(
      `[analytics] ${missing} is not set — PostHog is disabled. NEXT_PUBLIC_* values are inlined at build time, so set it in the hosting provider and redeploy.`,
    );
    return;
  }

  posthog.init(NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN, {
    api_host: NEXT_PUBLIC_POSTHOG_HOST,
    ui_host: "https://us.posthog.com",
    defaults: "2026-01-30",
    before_send: posthogBeforeSend,
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
    // Opt out of capturing by default in development
    loaded: (ph) => {
      if (process.env.NODE_ENV === "development") {
        ph.opt_out_capturing();
      }
    },
  });

  installClickTracking();
};
