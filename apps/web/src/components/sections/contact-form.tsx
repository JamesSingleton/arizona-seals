"use client";

import { useActionState, useEffect, useState } from "react";
import { Send } from "lucide-react";

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

  useEffect(() => {
    if (state.ok) setShowSuccess(true);
  }, [state]);

  if (showSuccess) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-muted px-6 py-16 text-center">
        <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-cyan-brand">
          <Send size={28} className="text-white" />
        </div>
        <h3 className="mb-3 font-display text-2xl font-bold text-navy uppercase">
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
          className="rounded border-2 border-navy px-6 py-2 text-sm font-bold tracking-wide text-navy uppercase transition-colors hover:bg-navy hover:text-white"
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
      className="space-y-5 rounded-2xl border border-border bg-background p-6 md:p-8"
    >
      <h3 className="font-display text-2xl font-bold text-navy uppercase">
        Send Us a Message
      </h3>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-sm font-semibold text-navy">
            Name <span className="text-cyan-brand">*</span>
          </span>
          <input
            name="name"
            required
            className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-cyan-brand"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-semibold text-navy">
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
          <span className="text-sm font-semibold text-navy">Phone</span>
          <input
            name="phone"
            type="tel"
            className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-cyan-brand"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-semibold text-navy">
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
        <span className="text-sm font-semibold text-navy">
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
        className="inline-flex items-center gap-2 rounded-md bg-cyan-brand px-6 py-3 font-display text-sm font-bold tracking-widest text-white uppercase transition-colors hover:bg-[#0095CC] disabled:opacity-60"
      >
        <Send size={14} />
        {pending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
