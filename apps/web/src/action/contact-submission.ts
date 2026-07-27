"use server";

import { createElement } from "react";
import { render } from "react-email";
import { Resend } from "resend";

import { ContactFormNotification } from "@/emails/contact-form-notification";

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
      subject: `Contact form: ${subject}`,
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

  return {
    ok: true,
    message:
      "Thank you for reaching out. A member of our team will be in touch within 24 hours.",
  };
}
