"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { track } from "@workspace/analytics";
import { Button } from "@workspace/ui/components/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { LoaderCircle } from "lucide-react";
import { useId, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import { newsletterSubmission } from "@/action/newsletter-submission";
import {
  type NewsletterValues,
  newsletterSchema,
} from "@/lib/newsletter-schema";
import type { PagebuilderType } from "@/types";
import { RichText } from "../elements/rich-text";

type SubscribeNewsletterProps = PagebuilderType<"subscribeNewsletter">;

export function SubscribeNewsletter({
  title,
  subTitle,
  helperText,
}: SubscribeNewsletterProps) {
  const inputId = useId();
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string }>();
  const form = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    mode: "onTouched",
    defaultValues: { email: "" },
  });

  const onSubmit = (values: NewsletterValues) => {
    track("newsletter_subscription_submitted", {
      placement: "subscribe_newsletter",
    });
    startTransition(async () => {
      setResult(await newsletterSubmission(values));
    });
  };

  return (
    <section id="subscribe" className="bg-water py-20 md:py-24">
      <div className="mx-auto max-w-2xl px-6 sm:px-10">
        {title ? (
          <h2 className="section-title mb-4 text-foreground">{title}</h2>
        ) : null}
        {subTitle ? (
          <RichText
            richText={subTitle}
            className="mb-8 text-lg text-seal-gray"
          />
        ) : null}

        <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={inputId}>Email address</FieldLabel>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    {...field}
                    id={inputId}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    aria-invalid={fieldState.invalid}
                    aria-describedby={
                      helperText ? `${inputId}-helper` : undefined
                    }
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={pending}
                    className="shrink-0"
                  >
                    {pending ? (
                      <LoaderCircle
                        aria-hidden
                        className="size-5 animate-spin"
                      />
                    ) : null}
                    Subscribe
                  </Button>
                </div>
                {helperText ? (
                  <FieldDescription id={`${inputId}-helper`}>
                    <RichText richText={helperText} />
                  </FieldDescription>
                ) : null}
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : null}
              </Field>
            )}
          />
          {result ? (
            <p role="status" className="mt-4 text-base text-foreground">
              {result.message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
