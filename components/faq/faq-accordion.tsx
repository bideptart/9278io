"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { FaqItem } from "@/lib/faq"

/**
 * Radix-driven FAQ accordion. Radix measures each answer's real height
 * (ResizeObserver) and animates to it via the accordion-down/up keyframes
 * in globals.css, so the open/close is a smooth height transition instead
 * of the instant snap a native <details> element gives you.
 *
 * type="single" + collapsible keeps exactly one answer open at a time,
 * closable by clicking it again.
 */
export function FaqAccordion({
  items,
  idPrefix,
  defaultOpenIndex = null,
}: {
  items: FaqItem[]
  idPrefix?: string
  defaultOpenIndex?: number | null
}) {
  const defaultValue =
    defaultOpenIndex != null ? (idPrefix ? `${idPrefix}-${defaultOpenIndex}` : `${defaultOpenIndex}`) : undefined

  return (
    <Accordion type="single" collapsible defaultValue={defaultValue} className="w-full space-y-3">
      {items.map((item, i) => {
        const value = idPrefix ? `${idPrefix}-${i}` : `${i}`
        return (
          <AccordionItem
            key={value}
            value={value}
            className="transition-colors hover:border-primary/30 data-[state=open]:border-primary/40 data-[state=open]:shadow-[0_1px_0_0_var(--color-primary)_inset,0_8px_24px_-16px_rgba(37,99,235,0.35)]"
          >
            <AccordionTrigger className="data-[state=open]:text-primary [&>svg]:text-muted-foreground data-[state=open]:[&>svg]:text-primary">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-pretty leading-relaxed text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
