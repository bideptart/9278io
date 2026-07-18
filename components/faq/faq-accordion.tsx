"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import type { FaqItem } from "@/lib/faq"

/**
 * Client-rendered FAQ accordion. Answers stay in the DOM at all times (just
 * visually collapsed) so they're still present in view-source and to
 * crawlers — the same SEO property the old <details>-based version had —
 * while the open/close transition is animated instead of snapping instantly.
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
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex)

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i))
  }

  return (
    <div className="w-full divide-y divide-border/60">
      {items.map((item, i) => {
        const id = idPrefix ? `${idPrefix}-${i}` : `${i}`
        const isOpen = openIndex === i
        return (
          <div key={id}>
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${id}`}
              className="flex w-full cursor-pointer items-start justify-between gap-4 py-5 text-left text-base font-medium transition-colors hover:text-primary"
            >
              <span className={cn(isOpen && "text-primary")}>{item.q}</span>
              <ChevronDown
                className={cn(
                  "mt-1 size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
                aria-hidden
              />
            </button>
            <motion.div
              id={`faq-panel-${id}`}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pb-5 text-pretty leading-relaxed text-muted-foreground">{item.a}</div>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
