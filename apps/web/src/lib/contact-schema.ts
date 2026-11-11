import { z } from "zod";

import { isValidEmail } from "./spam-guard";

/**
 * One schema for the contact form, used by react-hook-form in the browser and
 * re-checked in the server action so nothing relies on client validation.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Enter your name.")
    .max(120, "Keep your name under 120 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .refine(isValidEmail, "Enter an email address like name@example.com."),
  phone: z
    .string()
    .trim()
    .max(40, "Keep the phone number under 40 characters.")
    .refine(
      (value) => value === "" || value.replace(/\D/g, "").length >= 10,
      "Enter a 10-digit phone number, or leave this blank.",
    ),
  subject: z.string().trim().min(1, "Choose what your message is about."),
  message: z
    .string()
    .trim()
    .min(
      10,
      "Add a little more detail so we can help (at least 10 characters).",
    )
    .max(5000, "Keep your message under 5,000 characters."),
  /** Honeypot: hidden from people, filled in by bots. */
  website: z.string().max(500).optional(),
  /** Epoch ms stamped when the form mounted (bot timing check). */
  startedAt: z.number().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
