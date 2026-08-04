"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import type { FaqItem } from "@/lib/faq"
import { cn } from "@/lib/utils"

const BARS = [8, 16, 10, 20, 14, 22, 9, 17, 12]

/**
 * "Related questions" as waveform rows — each question sits beside a
 * small static waveform icon; tapping it "plays" a wipe transition that
 * reveals the answer beneath, like scrubbing into a recording. An
 * audio-themed reveal, distinct from every plain-list, switcher, search,
 * slideshow, or accordion "related questions" format used elsewhere.
 */
export function FaqWaveformReveal({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0)

  return (
    <div className="mx-auto mt-8 max-w-2xl space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q} className={cn("overflow-hidden rounded-2xl border transition-colors", isOpen ? "border-primary/30 bg-primary/[0.03]" : "border-border/60 bg-white")}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-3 px-5 py-4 text-left"
            >
              <span className={cn("flex h-7 shrink-0 items-end gap-[2px] rounded-md px-1.5", isOpen ? "text-primary" : "text-muted-foreground/50")}>
                {BARS.map((h, bi) => (
                  <motion.span
                    key={bi}
                    className="w-[2.5px] rounded-full bg-current"
                    animate={isOpen ? { height: [h * 0.5, h, h * 0.5] } : { height: h * 0.6 }}
                    transition={isOpen ? { duration: 0.6, repeat: Infinity, delay: bi * 0.04, ease: "easeInOut" } : { duration: 0.2 }}
                  />
                ))}
              </span>
              <span className={cn("flex-1 text-sm font-semibold", isOpen ? "text-primary" : "text-foreground")}>{item.q}</span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    animate={{ clipPath: "inset(0 0% 0 0)" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="px-5 pb-5 pl-[3.25rem]"
                  >
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
