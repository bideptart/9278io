"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { FaqItem } from "@/lib/faq"

/**
 * Interactive question switcher — click a question on the left, its answer
 * crossfades into a fixed panel on the right. A genuinely different
 * interaction from FaqAccordion (expand/collapse) and FaqPreviewCards/
 * FaqPlainList (everything shown at once) — only one answer is visible at
 * a time, selected by the reader.
 */
export function FaqSwitcher({ items }: { items: FaqItem[] }) {
  const [active, setActive] = useState(0)

  return (
    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-6">
      <div className="space-y-2">
        {items.map((item, i) => {
          const isActive = active === i
          return (
            <button
              key={item.q}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              className={cn(
                "flex w-full items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors",
                isActive ? "bg-primary text-white shadow-[0_10px_24px_-12px_rgba(37,99,235,0.5)]" : "text-foreground hover:bg-primary/[0.06]",
              )}
            >
              <span className="min-w-0 flex-1 truncate">{item.q}</span>
              <ChevronRight className={cn("size-4 shrink-0 transition-transform", isActive ? "translate-x-0.5" : "text-muted-foreground/50")} aria-hidden />
            </button>
          )
        })}
      </div>

      <div className="min-h-[140px] rounded-2xl border border-border/60 bg-white p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <p className="text-base font-semibold text-foreground">{items[active].q}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{items[active].a}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
