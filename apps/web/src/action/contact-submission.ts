"use server";

import { checkBotId } from "botid/server";
import { createElement } from "react";
import { render } from "react-email";
import { Resend } from "resend";

import { ContactFormNotification } from "@/emails/contact-form-notification";
import { inspectSubmission, isValidEmail } from "@/lib/spam-guard";

const SUCCESS: ContactFormState = {
  ok: true,
  message:
    "Thank you for reaching out. A member of our team will be in touch as soon as possible.",
};

const LIMITS = { name: 120, phone: 40, subject: 120, message: 5000 } as const;

export type ContactFormState = {
  ok: boolean;
  message: string;
};

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !subject || !message) {
    return {
      ok: false,
      message: "Please fill in all required fields.",
    };
  }

  if (!isValidEmail(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  if (
    name.length > LIMITS.name ||
    phone.length > LIMITS.phone ||
    subject.length > LIMITS.subject ||
    message.length > LIMITS.message
  ) {
    return {
      ok: false,
      message: "Your message is too long. Please shorten it and try again.",
    };
  }

  // Layer 1: honeypot, fill-time and link heuristics (free, no network).
  const verdict = inspectSubmission(formData, { name, message });
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
    return {
      ok: false,
      message: "Unable to send your message right now. Please try again later.",
    };
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
  const idempotencyKey = `contact-form/${crypto.randomUUID()}`;

  const { error } = await resend.emails.send(
    {
      from,
      to: [to],
      replyTo: email,
      subject: `${subject} — ${name}`,
      html,
      text,
    },
    { idempotencyKey },
  );

  if (error) {
    console.error("[contact] Resend error:", error);
    return {
      ok: false,
      message: "Unable to send your message right now. Please try again later.",
    };
  }

  return SUCCESS;
}
