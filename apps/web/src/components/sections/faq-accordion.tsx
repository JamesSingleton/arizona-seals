import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { stegaClean } from "next-sanity";

import type { PagebuilderType } from "@/types";
import { RichText } from "../elements/rich-text";
import { FaqJsonLd } from "../json-ld";

type FaqAccordionProps = PagebuilderType<"faqAccordion">;

export function FaqAccordion({
  eyebrow,
  title,
  subtitle,
  faqs,
  link,
}: FaqAccordionProps) {
  const firstFaqId = faqs?.[0]?._id;
  const showLink = Boolean(link?.href && (link.title || link.description));

  return (
    <section id="faq" className="bg-background py-20 md:py-28">
      <FaqJsonLd faqs={stegaClean(faqs) ?? []} />
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          {eyebrow ? (
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="h-0.5 w-8 bg-cyan-brand" />
              <span className="font-display text-xs font-bold tracking-[0.25em] text-cyan-brand uppercase">
                {eyebrow}
              </span>
              <div className="h-0.5 w-8 bg-cyan-brand" />
            </div>
          ) : null}
          {title ? (
            <h2
              className="font-display font-black leading-none text-foreground uppercase"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {title}
            </h2>
          ) : null}
          {subtitle ? (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-seal-gray md:text-lg">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion
            className="w-full overflow-visible rounded-none border-0 border-t border-border"
            defaultValue={firstFaqId ? [firstFaqId] : undefined}
          >
            {faqs?.map((faq, index) => (
              <AccordionItem
                value={faq?._id}
                key={`AccordionItem-${faq?._id}-${index}`}
                className="border-b border-border py-0 data-open:bg-transparent"
              >
                <AccordionTrigger className="gap-4 px-0 py-5 text-left font-display text-base font-bold tracking-wide text-foreground uppercase hover:no-underline hover:text-cyan-brand aria-expanded:text-cyan-brand md:text-lg **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-cyan-brand">
                  {faq?.title}
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-6 text-base leading-relaxed text-seal-gray">
                  <RichText
                    richText={faq?.richText ?? []}
                    className="text-sm leading-relaxed text-seal-gray md:text-base [&_a]:text-cyan-brand [&_a]:underline-offset-4 [&_li]:text-seal-gray [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:my-2 [&_ol]:my-2"
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {showLink ? (
            <div className="mt-10 border-t border-border pt-8 text-center">
              {link?.title ? (
                <p className="mb-2 font-display text-xs font-bold tracking-[0.2em] text-seal-gray uppercase">
                  {link.title}
                </p>
              ) : null}
              <Link
                href={link?.href ?? "#"}
                target={link?.openInNewTab ? "_blank" : undefined}
                rel={link?.openInNewTab ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 border-b-2 border-foreground pb-0.5 font-display text-sm font-bold tracking-widest text-foreground uppercase transition-colors hover:border-cyan-brand hover:text-cyan-brand"
              >
                {link?.description || "Learn more"}
                <ArrowUpRight size={16} aria-hidden />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
