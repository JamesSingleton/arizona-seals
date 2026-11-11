"use server";

import { checkBotId } from "botid/server";
import { createElement } from "react";
import { render } from "react-email";
import { Resend } from "resend";

import { ContactFormNotification } from "@/emails/contact-form-notification";
import {
  type ContactFormValues,
  contactFormSchema,
} from "@/lib/contact-schema";
import { inspectSubmission } from "@/lib/spam-guard";

export type ContactFormState = {
  ok: boolean;
  message: string;
  /** Per-field messages when server validation disagrees with the browser. */
  fieldErrors?: Partial<Record<keyof ContactFormValues, string>>;
};

const SUCCESS: ContactFormState = {
  ok: true,
  message:
    "Thank you for reaching out. A member of our team will be in touch as soon as possible.",
};

const SEND_FAILED: ContactFormState = {
  ok: false,
  message:
    "We couldn't send your message. Please try again, or email info@arizonaseals.com.",
};

export async function submitContactForm(
  values: ContactFormValues,
): Promise<ContactFormState> {
  // Layer 0: the same zod schema the browser used. Never trust the client.
  const parsed = contactFormSchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: ContactFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactFormValues;
      fieldErrors[key] ??= issue.message;
    }
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }
  const { name, email, phone, subject, message, website, startedAt } =
    parsed.data;

  // Layer 1: honeypot, fill-time and link heuristics (free, no network).
  const verdict = inspectSubmission(
    { honeypot: website, startedAt },
    { name, message },
  );
  if (verdict.kind === "bot") {
    // Report success so automated senders get no signal to adapt to.
    console.warn(`[contact] dropped bot submission (${verdict.reason})`);
    return SUCCESS;
  }
  if (verdict.kind === "reject") {
    return { ok: false, message: verdict.message };
  }

  // Layer 2: Vercel BotID. Always passes in local development.
  try {
    const { isBot } = await checkBotId();
    if (isBot) {
      console.warn("[contact] dropped bot submission (botid)");
      return SUCCESS;
    }
  } catch (error) {
    // Never lose a real family's message because the classifier is unreachable.
    console.error("[contact] BotID check failed, allowing submission:", error);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return SEND_FAILED;
  }

  // From must be a Resend-verified domain address — not the Zoho group inbox.
  const from =
    process.env.RESEND_FROM_EMAIL ?? "Arizona Seals <website@arizonaseals.com>";
  const to = process.env.CONTACT_TO_EMAIL ?? "info@arizonaseals.com";

  const emailElement = createElement(ContactFormNotification, {
    name,
    email,
    phone: phone || undefined,
    subject,
    message,
  });

  const [html, text] = await Promise.all([
    render(emailElement),
    render(emailElement, { plainText: true }),
  ]);

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send(
    {
      from,
      to: [to],
      replyTo: email,
      subject: `${subject} — ${name}`,
      html,
      text,
    },
    { idempotencyKey: `contact-form/${crypto.randomUUID()}` },
  );

  if (error) {
    console.error("[contact] Resend error:", error);
    return SEND_FAILED;
  }

  return SUCCESS;
}
