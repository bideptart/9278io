"use client"

import { useState } from "react"
import { motion, AnimatePresence, type PanInfo } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type DetailItem = { icon: ReactNode; title: string; description: string }

const SWIPE_THRESHOLD = 60

/**
 * "What you get" as a drag-to-swipe carousel — one large capability card at
 * a time, dragged or arrow-navigated between, with a peek of the next card
 * showing at the edge. A physically-draggable single-focus carousel,
 * distinct from every other "what you get" format on the site (card
 * grids, tabs, lists, bubbles, connected line, scattered rotation, flip
 * cards).
 */
export function DetailSwipeCarousel({ items }: { items: DetailItem[] }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  function go(next: number) {
    const clamped = (next + items.length) % items.length
    setDirection(next > index ? 1 : -1)
    setIndex(clamped)
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_THRESHOLD) go(index + 1)
    else if (info.offset.x > SWIPE_THRESHOLD) go(index - 1)
  }

  const current = items[index]
  const next = items[(index + 1) % items.length]

  return (
    <div className="mx-auto mt-10 max-w-xl">
      <div className="relative h-64">
        {/* peek of next card behind */}
        <div className="absolute inset-x-4 top-3 flex h-full flex-col items-center justify-center gap-2 rounded-3xl border border-border/50 bg-white/70 p-8 text-center opacity-50">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">{next.icon}</span>
          <p className="text-sm font-bold text-foreground">{next.title}</p>
        </div>

        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, x: direction >= 0 ? 80 : -80, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction >= 0 ? -80 : 80, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            whileTap={{ cursor: "grabbing" }}
            className="absolute inset-0 flex cursor-grab flex-col items-center justify-center gap-3 rounded-3xl border border-border/60 bg-white p-8 text-center shadow-[0_24px_55px_-28px_rgba(15,23,42,0.3)]"
          >
            <span className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">{current.icon}</span>
            <p className="text-lg font-bold tracking-tight text-foreground">{current.title}</p>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{current.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous"
          className="flex size-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
        >
          <ChevronLeft className="size-4" aria-hidden />
        </button>

        <div className="flex gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to item ${i + 1}`}
              onClick={() => go(i)}
              className={cn("size-1.5 rounded-full transition-all duration-300", i === index ? "w-6 bg-primary" : "bg-border hover:bg-primary/40")}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next"
          className="flex size-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
        >
          <ChevronRight className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  )
}
