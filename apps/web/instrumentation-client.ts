import { initializeAnalytics } from "@workspace/analytics/instrumentation-client";
import { initBotId } from "botid/client/core";

initializeAnalytics();

// BotID attaches a challenge header to these requests so the server actions
// behind them (contact form) can call checkBotId(). The contact block can be
// placed on any page-builder page, so every page POST is covered.
initBotId({
  protect: [
    { path: "/", method: "POST" },
    { path: "/*", method: "POST" },
  ],
});
