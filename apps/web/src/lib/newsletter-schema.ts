import { z } from "zod";

import { isValidEmail } from "./spam-guard";

/** Shared by the newsletter form (react-hook-form) and its server action. */
export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .refine(isValidEmail, "Enter an email address like name@example.com."),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;
