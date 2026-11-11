"use server";

import {
  type NewsletterValues,
  newsletterSchema,
} from "@/lib/newsletter-schema";

export type NewsletterState = { ok: boolean; message: string };

/**
 * Not connected to an email provider yet. It validates and then says so
 * plainly instead of pretending the visitor was subscribed.
 */
export async function newsletterSubmission(
  values: NewsletterValues,
): Promise<NewsletterState> {
  const parsed = newsletterSchema.safeParse(values);
  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Check your email address.",
    };
  }
  return {
    ok: false,
    message:
      "Email sign-up isn't open yet. Follow the club on Facebook or Instagram for news.",
  };
}
