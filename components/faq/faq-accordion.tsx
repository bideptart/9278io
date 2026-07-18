"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { FaqItem } from "@/lib/faq"

/**
 * Radix-driven FAQ accordion. Radix measures each answer's real height
 * (ResizeObserver) and animates to it via the accordion-down/up keyframes
 * in globals.css, so the open/close is a smooth height transition instead
 * of the instant snap a native <details> element gives you.
 */
export function FaqAccordion({ items, idPrefix }: { items: FaqItem[]; idPrefix?: string }) {
  return (
    <Accordion type="multiple" className="w-full">
      {items.map((item, i) => {
        const value = idPrefix ? `${idPrefix}-${i}` : `${i}`
        return (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="py-5 text-base font-medium hover:text-primary hover:no-underline data-[state=open]:text-primary [&>svg]:mt-1 [&>svg]:text-muted-foreground">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-pretty leading-relaxed text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
