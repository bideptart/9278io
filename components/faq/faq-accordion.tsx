"use client"

import type { ReactNode } from "react"
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
  itemClassName,
  triggerIcon,
  contentClassName,
}: {
  items: FaqItem[]
  idPrefix?: string
  defaultOpenIndex?: number | null
  /** Extra classes merged onto each AccordionItem, for page-specific box styling. */
  itemClassName?: string
  /** Overrides the default triangle indicator, e.g. a Lucide icon. */
  triggerIcon?: ReactNode
  contentClassName?: string
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
            className={cn(
              "transition-colors hover:border-primary/30 data-[state=open]:border-primary/40 data-[state=open]:shadow-[0_1px_0_0_var(--color-primary)_inset,0_8px_24px_-16px_rgba(37,99,235,0.35)]",
              itemClassName,
            )}
          >
            <AccordionTrigger
              icon={triggerIcon}
              className="data-[state=open]:text-primary [&>svg]:text-muted-foreground data-[state=open]:[&>svg]:text-primary"
            >
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
