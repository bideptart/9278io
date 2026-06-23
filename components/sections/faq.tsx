"use client"

import Link from "next/link"
import { motion } from "motion/react"
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
      <div className="w-full px-6 py-14 md:px-8 md:py-20">
        <ScrollReveal className="text-center">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary"
          >
            <motion.span className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
            FAQ
          </motion.span>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Questions, answered.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            The short version: ₹3,000 minimum top-up, voice from ₹10/min, Indian numbers from ₹400/month. The long
            version is below.
          </p>
        </ScrollReveal>

        <div className="mx-auto mt-12 max-w-3xl">
          <ScrollReveal>
            <Accordion type="single" collapsible className="w-full divide-y divide-border/60">
              {items.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-0">
                  <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline hover:text-primary [&[data-state=open]]:text-primary">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-pretty leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>

          <ScrollReveal className="mt-10 flex justify-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 px-5 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              See all FAQs →
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
