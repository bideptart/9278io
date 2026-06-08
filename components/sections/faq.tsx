"use client"

import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { FLAT_FAQ } from "@/lib/faq"

/**
 * Homepage FAQ — shows the top 8 most-asked questions, links out to the
 * dedicated /faq page for the full list.
 */
export function FAQ() {
  const items = FLAT_FAQ.slice(0, 8)
  return (
    <section id="faq" className="border-b border-border/50">
      <div className="mx-auto w-full max-w-4xl px-4 py-20 md:px-6 md:py-28">
        <ScrollReveal className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">FAQ</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Questions, answered.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            The short version: ₹1,999 minimum top-up, voice from ₹5.7/min, Indian numbers from ₹400/month. The long
            version is below.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border/60">
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-pretty leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>

        <ScrollReveal className="mt-10 flex justify-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            See all FAQs →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
