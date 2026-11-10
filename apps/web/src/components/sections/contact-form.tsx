"use client";

import { track } from "@workspace/analytics";
import { Send } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";

import {
  type ContactFormState,
  submitContactForm,
} from "@/action/contact-submission";

const initialState: ContactFormState = { ok: false, message: "" };

export function ContactForm({
  inquiryTypes = [],
}: {
  inquiryTypes?: string[];
}) {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  );
  const [resetKey, setResetKey] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  // Inquiry type of the in-flight submission, so the result event can carry it.
  const inquiryTypeRef = useRef("");

  useEffect(() => {
    if (state === initialState) return;

    const inquiry_type = inquiryTypeRef.current;
    if (state.ok) {
      setShowSuccess(true);
      track("contact_form_succeeded", { inquiry_type });
      if (/tryout/i.test(inquiry_type)) {
        track("tryout_inquiry_submitted", { inquiry_type });
      }
    } else {
      track("contact_form_failed", { inquiry_type, error: state.message });
    }
  }, [state]);

  if (showSuccess) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-muted px-6 py-16 text-center">
        <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-cyan-brand">
          <Send size={28} className="text-white" />
        </div>
        <h3 className="mb-3 font-display text-2xl font-bold text-foreground uppercase">
          Message Sent!
        </h3>
        <p className="mb-6 max-w-sm leading-relaxed text-seal-gray">
          {state.message}
        </p>
        <button
          type="button"
          onClick={() => {
            setShowSuccess(false);
            setResetKey((k) => k + 1);
          }}
          className="rounded border-2 border-foreground px-6 py-2 text-sm font-bold tracking-wide text-foreground uppercase transition-colors hover:bg-foreground hover:text-background"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form
      key={resetKey}
      action={formAction}
      onSubmit={(event) => {
        const formData = new FormData(event.currentTarget);
        const inquiry_type = String(formData.get("subject") ?? "");
        inquiryTypeRef.current = inquiry_type;
        track("contact_form_submitted", { inquiry_type });
      }}
      className="space-y-5 rounded-2xl border border-border bg-background p-6 md:p-8"
    >
      <h3 className="font-display text-2xl font-bold text-foreground uppercase">
        Send Us a Message
      </h3>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-sm font-semibold text-foreground">
            Name <span className="text-cyan-brand">*</span>
          </span>
          <input
            name="name"
            required
            className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-cyan-brand"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-semibold text-foreground">
            Email <span className="text-cyan-brand">*</span>
          </span>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-cyan-brand"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-sm font-semibold text-foreground">Phone</span>
          <input
            name="phone"
            type="tel"
            className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-cyan-brand"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-semibold text-foreground">
            Inquiry Type <span className="text-cyan-brand">*</span>
          </span>
          <select
            name="subject"
            required
            defaultValue=""
            className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-cyan-brand"
          >
            <option value="" disabled>
              Select a topic
            </option>
            {inquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block space-y-1.5">
        <span className="text-sm font-semibold text-foreground">
          Message <span className="text-cyan-brand">*</span>
        </span>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-cyan-brand"
        />
      </label>

      {!state.ok && state.message ? (
        <p className="text-sm text-red-600" role="alert">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-display text-sm font-bold tracking-widest text-primary-foreground uppercase transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        <Send size={14} />
        {pending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
