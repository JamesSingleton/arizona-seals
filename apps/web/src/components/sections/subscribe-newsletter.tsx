"use client";
import { Button } from "@workspace/ui/components/button";
import { ChevronRight, LoaderCircle } from "lucide-react";
import Form from "next/form";
import { useFormStatus } from "react-dom";

import { newsletterSubmission } from "@/action/newsletter-submission";
import type { PagebuilderType } from "@/types";

import { RichText } from "../richtext";

type SubscribeNewsletterProps = PagebuilderType<"subscribeNewsletter">;

export default function SubscribeNewsletterButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      size="icon"
      type="submit"
      disabled={pending}
      className="size-8 aspect-square bg-blue-600 hover:bg-blue-700 text-white"
      aria-label={pending ? "Subscribing..." : "Subscribe to newsletter"}
    >
      <span className="flex items-center justify-center gap-2">
        {pending ? (
          <LoaderCircle
            className="animate-spin text-white"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        ) : (
          <ChevronRight
            className="text-white"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        )}
      </span>
    </Button>
  );
}

export function SubscribeNewsletter({
  title,
  subTitle,
  helperText,
}: SubscribeNewsletterProps) {
  return (
    <section id="subscribe" className="px-4 py-8 sm:py-12 md:py-16">
      <div className="relative container mx-auto px-4 md:px-8 py-8 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 rounded-3xl overflow-hidden">
        {/* Swimming wave pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
            <path d="M0,100 Q100,50 200,100 T400,100 L400,200 L0,200 Z" fill="currentColor" />
            <path d="M0,120 Q100,70 200,120 T400,120 L400,200 L0,200 Z" fill="currentColor" opacity="0.5" />
            <path d="M0,140 Q100,90 200,140 T400,140 L400,200 L0,200 Z" fill="currentColor" opacity="0.3" />
          </svg>
        </div>
        
        <div className="relative z-10 mx-auto text-center">
          <h2 className="mb-4 text-xl font-semibold text-white sm:text-3xl md:text-5xl text-balance">
            {title}
          </h2>
          {subTitle && (
            <RichText
              richText={subTitle}
              className="mb-6 text-sm text-blue-100 sm:mb-8 text-balance sm:text-base prose-invert"
            />
          )}
          <Form
            className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-2"
            action={newsletterSubmission}
          >
            <div className="flex bg-white items-center border rounded-xl p-2 drop-shadow-lg md:w-96 justify-between pl-4">
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email for swim updates"
                className="rounded-e-none border-e-0 focus-visible:ring-0 outline-none bg-transparent w-full text-gray-900 placeholder:text-gray-600"
              />
              <SubscribeNewsletterButton />
            </div>
          </Form>
          {helperText && (
            <RichText
              richText={helperText}
              className="mt-3 text-sm text-blue-100 opacity-90 sm:mt-4 prose-invert"
            />
          )}
        </div>
      </div>
    </section>
  );
}