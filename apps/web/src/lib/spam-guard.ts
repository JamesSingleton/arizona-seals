/**
 * Cheap, dependency-free spam signals for public forms. These run before the
 * BotID check so obvious junk never costs an email send.
 *
 * - honeypot: a field humans never see; any value means a bot filled the form.
 * - timing: the form stamps when it mounted. No stamp means no JavaScript ran
 *   (script-less bots), and a near-instant submit means an automated fill.
 * - content: link-stuffed or markup-laden messages are almost always spam.
 */

export const HONEYPOT_FIELD = "company_website";
export const STARTED_AT_FIELD = "form_started_at";

const MIN_FILL_MS = 3_000;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;
const MAX_LINKS_IN_MESSAGE = 2;

const LINK_SOURCE = "https?://|www\\.|\\[url|<a\\s";
const HAS_LINK = new RegExp(LINK_SOURCE, "i");
const ALL_LINKS = new RegExp(LINK_SOURCE, "gi");
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type SpamVerdict =
  /** Looks human. */
  | { kind: "ok" }
  /** Certainly automated: pretend it worked so the bot learns nothing. */
  | { kind: "bot"; reason: string }
  /** Possibly a person: show a message they can act on. */
  | { kind: "reject"; reason: string; message: string };

export function isValidEmail(email: string): boolean {
  return email.length <= 254 && EMAIL_PATTERN.test(email);
}

export function inspectSubmission(
  formData: FormData,
  fields: { name: string; message: string },
  now: number = Date.now(),
): SpamVerdict {
  if (String(formData.get(HONEYPOT_FIELD) ?? "").trim() !== "") {
    return { kind: "bot", reason: "honeypot" };
  }

  const startedAt = Number(formData.get(STARTED_AT_FIELD));
  if (!Number.isFinite(startedAt) || startedAt <= 0) {
    return { kind: "bot", reason: "no_timestamp" };
  }
  const elapsed = now - startedAt;
  if (elapsed < MIN_FILL_MS) {
    return { kind: "bot", reason: "too_fast" };
  }
  if (elapsed > MAX_FORM_AGE_MS) {
    return {
      kind: "reject",
      reason: "stale_form",
      message: "This form expired. Please refresh the page and try again.",
    };
  }

  if (HAS_LINK.test(fields.name)) {
    return { kind: "bot", reason: "link_in_name" };
  }
  const links = fields.message.match(ALL_LINKS)?.length ?? 0;
  if (links > MAX_LINKS_IN_MESSAGE) {
    return {
      kind: "reject",
      reason: "too_many_links",
      message:
        "Please remove the links from your message and try again. We can't accept messages with several links.",
    };
  }

  return { kind: "ok" };
}
