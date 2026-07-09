"use server";

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

  // Placeholder for email/CRM integration — log for now.
  console.info("[contact]", { name, email, phone, subject, message });

  return {
    ok: true,
    message:
      "Thank you for reaching out. A member of our team will be in touch within 24 hours.",
  };
}
