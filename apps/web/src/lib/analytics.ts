import posthog from "posthog-js";

/** Fires when a primary marketing CTA (hero, full-bleed banner, etc.) is clicked. */
export function captureMarketingCtaClicked({
  label,
  href,
  placement,
}: {
  label: string;
  href: string;
  placement: string;
}) {
  posthog.capture("marketing_cta_clicked", {
    cta_label: label,
    cta_href: href,
    placement,
  });
}

export function captureContactFormSubmitted(inquiryType: string) {
  posthog.capture("contact_form_submitted", {
    inquiry_type: inquiryType,
  });

  if (/tryout/i.test(inquiryType)) {
    posthog.capture("tryout_inquiry_submitted", {
      inquiry_type: inquiryType,
    });
  }
}
