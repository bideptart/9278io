"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
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
  contentClassName,
}: {
  items: FaqItem[]
  idPrefix?: string
  defaultOpenIndex?: number | null
  contentClassName?: string
}) {
  const defaultValue =
    defaultOpenIndex != null ? (idPrefix ? `${idPrefix}-${defaultOpenIndex}` : `${defaultOpenIndex}`) : undefined

  return (
    <Accordion type="single" collapsible defaultValue={defaultValue} className="w-full space-y-4">
      {items.map((item, i) => {
        const value = idPrefix ? `${idPrefix}-${i}` : `${i}`
        return (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="data-[state=open]:text-primary [&>svg]:text-foreground">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className={cn("text-pretty leading-relaxed text-muted-foreground", contentClassName)}>
              {item.a}
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
