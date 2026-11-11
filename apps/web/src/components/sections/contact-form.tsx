"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { track } from "@workspace/analytics";
import { Button } from "@workspace/ui/components/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Textarea } from "@workspace/ui/components/textarea";
import { cn } from "@workspace/ui/lib/utils";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { useEffect, useId, useRef, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import { submitContactForm } from "@/action/contact-submission";
import {
  type ContactFormValues,
  contactFormSchema,
} from "@/lib/contact-schema";

type ContactFormProps = {
  inquiryTypes?: string[];
  title?: string;
  /** Preselects the inquiry dropdown when it matches one of `inquiryTypes`. */
  defaultInquiryType?: string;
};

export function ContactForm({
  inquiryTypes = [],
  title = "Send Us a Message",
  defaultInquiryType,
}: ContactFormProps) {
  const formId = useId();
  const id = (name: string) => `${formId}-${name}`;
  const preselected =
    defaultInquiryType && inquiryTypes.includes(defaultInquiryType)
      ? defaultInquiryType
      : "";

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: preselected,
      message: "",
      website: "",
    },
  });

  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string }>();
  const successRef = useRef<HTMLDivElement>(null);
  const subject = form.watch("subject");

  // Stamped after hydration: script-less bots never get one (see spam-guard).
  useEffect(() => {
    if (!result?.ok) form.setValue("startedAt", Date.now());
  }, [form, result?.ok]);

  // Move focus to the confirmation so screen readers announce it.
  useEffect(() => {
    if (result?.ok) successRef.current?.focus();
  }, [result?.ok]);

  const onSubmit = (values: ContactFormValues) => {
    const inquiry_type = values.subject;
    track("contact_form_submitted", { inquiry_type });
    startTransition(async () => {
      const response = await submitContactForm(values);
      if (response.ok) {
        track("contact_form_succeeded", { inquiry_type });
        if (/tryout/i.test(inquiry_type)) {
          track("tryout_inquiry_submitted", { inquiry_type });
        }
        form.reset({ ...form.formState.defaultValues, subject: preselected });
      } else {
        track("contact_form_failed", {
          inquiry_type,
          error: response.message,
        });
        for (const [field, message] of Object.entries(
          response.fieldErrors ?? {},
        )) {
          form.setError(field as keyof ContactFormValues, { message });
        }
      }
      setResult({ ok: response.ok, message: response.message });
    });
  };

  if (result?.ok) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex h-full flex-col items-start justify-center bg-water px-6 py-14 outline-none md:px-10"
      >
        <CheckCircle2 aria-hidden className="mb-5 size-12 text-cyan-brand" />
        <h3 className="mb-3 text-4xl text-foreground">Message sent</h3>
        <p className="mb-8 max-w-md text-lg leading-relaxed text-seal-gray">
          {result.message}
        </p>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setResult(undefined)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
      aria-labelledby={id("title")}
      className="relative bg-water p-6 md:p-10"
    >
      <h3 id={id("title")} className="mb-2 text-4xl text-foreground">
        {title}
      </h3>
      <p className="mb-8 text-base text-seal-gray">
        Fields marked <span aria-hidden>*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
      <div
        aria-hidden
        className="absolute -left-[9999px] size-px overflow-hidden"
      >
        <label>
          Website (leave blank)
          <input
            tabIndex={-1}
            autoComplete="off"
            {...form.register("website")}
          />
        </label>
      </div>

      <FieldGroup className="gap-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={id("name")}>
                  Name <Required />
                </FieldLabel>
                <Input
                  {...field}
                  id={id("name")}
                  autoComplete="name"
                  aria-required
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.invalid ? id("name-error") : undefined
                  }
                />
                {fieldState.invalid ? (
                  <FieldError
                    id={id("name-error")}
                    errors={[fieldState.error]}
                  />
                ) : null}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={id("email")}>
                  Email <Required />
                </FieldLabel>
                <Input
                  {...field}
                  id={id("email")}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  aria-required
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.invalid ? id("email-error") : undefined
                  }
                />
                {fieldState.invalid ? (
                  <FieldError
                    id={id("email-error")}
                    errors={[fieldState.error]}
                  />
                ) : null}
              </Field>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={id("phone")}>Phone</FieldLabel>
                <Input
                  {...field}
                  id={id("phone")}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  aria-invalid={fieldState.invalid}
                  aria-describedby={cn(
                    id("phone-hint"),
                    fieldState.invalid && id("phone-error"),
                  )}
                />
                <FieldDescription id={id("phone-hint")}>
                  Optional. Helpful if you'd like a call back.
                </FieldDescription>
                {fieldState.invalid ? (
                  <FieldError
                    id={id("phone-error")}
                    errors={[fieldState.error]}
                  />
                ) : null}
              </Field>
            )}
          />
          <Controller
            name="subject"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={id("subject")}>
                  What's this about? <Required />
                </FieldLabel>
                <Select
                  name={field.name}
                  value={field.value || null}
                  onValueChange={(value) => {
                    field.onChange(value ?? "");
                    field.onBlur();
                  }}
                >
                  <SelectTrigger
                    id={id("subject")}
                    ref={field.ref}
                    className="w-full"
                    aria-required
                    aria-invalid={fieldState.invalid}
                    aria-describedby={
                      fieldState.invalid ? id("subject-error") : undefined
                    }
                    onBlur={field.onBlur}
                  >
                    <SelectValue placeholder="Choose a topic">
                      {subject || undefined}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {inquiryTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid ? (
                  <FieldError
                    id={id("subject-error")}
                    errors={[fieldState.error]}
                  />
                ) : null}
              </Field>
            )}
          />
        </div>

        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={id("message")}>
                Message <Required />
              </FieldLabel>
              <Textarea
                {...field}
                id={id("message")}
                rows={6}
                aria-required
                aria-invalid={fieldState.invalid}
                aria-describedby={cn(
                  id("message-hint"),
                  fieldState.invalid && id("message-error"),
                )}
              />
              <FieldDescription id={id("message-hint")}>
                For tryouts, include your swimmer's age and any swim team or
                lesson experience.
              </FieldDescription>
              {fieldState.invalid ? (
                <FieldError
                  id={id("message-error")}
                  errors={[fieldState.error]}
                />
              ) : null}
            </Field>
          )}
        />

        {result && !result.ok ? (
          <p role="alert" className="text-base font-medium text-destructive">
            {result.message}
          </p>
        ) : null}

        <div>
          <Button type="submit" size="lg" disabled={pending}>
            {pending ? (
              <>
                <LoaderCircle aria-hidden className="size-5 animate-spin" />
                Sending…
              </>
            ) : (
              "Send message"
            )}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

function Required() {
  return (
    <span aria-hidden className="text-destructive">
      *
    </span>
  );
}
