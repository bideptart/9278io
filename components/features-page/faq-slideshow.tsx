"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import type { FaqItem } from "@/lib/faq"
import { cn } from "@/lib/utils"

/**
 * "Related questions" as a one-at-a-time glass slideshow — a single big
 * question and answer in a translucent panel, stepped through with arrow
 * buttons and dot indicators. No search box, no grid, no marquee, no
 * plain list: a slideshow format not used by any other "related
 * questions" section on the site.
 */
export function FaqSlideshow({ items }: { items: FaqItem[] }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  function go(next: number) {
    setDirection(next > index ? 1 : -1)
    setIndex((next + items.length) % items.length)
  }

  const current = items[index]

  return (
    <div className="mesh-gradient-bg relative mx-auto max-w-2xl overflow-hidden rounded-3xl p-2">
      <div className="glass-panel relative min-h-[220px] overflow-hidden rounded-[1.35rem] p-8 sm:p-10">
        <Quote className="absolute right-6 top-6 size-10 text-primary/10" aria-hidden />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction >= 0 ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -24 : 24 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-primary/70">
              Question {index + 1} of {items.length}
            </span>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">{current.q}</h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">{current.a}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-2 flex items-center justify-center gap-4 pb-1 pt-3">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous question"
          className="flex size-9 items-center justify-center rounded-full border border-border/60 bg-white text-muted-foreground transition-colors hover:text-primary"
        >
          <ChevronLeft className="size-4" aria-hidden />
        </button>

        <div className="flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.q}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to question ${i + 1}`}
              aria-current={i === index}
              className="p-1"
            >
              <span className={cn("block h-1.5 rounded-full transition-all duration-300", i === index ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-primary/40")} />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next question"
          className="flex size-9 items-center justify-center rounded-full border border-border/60 bg-white text-muted-foreground transition-colors hover:text-primary"
        >
          <ChevronRight className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  )
}
