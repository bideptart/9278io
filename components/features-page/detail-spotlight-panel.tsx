"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check } from "lucide-react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type DetailItem = {
  icon: ReactNode
  title: string
  description: string
  points?: string[]
}

const CYCLE_DURATION = 4500

/**
 * "What you get" as a left nav-rail + right spotlight panel — a vertical
 * list of pill buttons on the left drives a single large gradient hero
 * card on the right, which swaps its icon, copy, and checklist with a
 * soft zoom/fade. Auto-cycles through every item on its own (each pill
 * fills with a progress bar as it counts down), pausing on the reader's
 * own choice for a while before resuming. A bigger, more premium visual
 * treatment than the flat grid, tab, row, or list formats used elsewhere
 * on the site.
 */
export function DetailSpotlightPanel({ items }: { items: DetailItem[] }) {
  const [active, setActive] = useState(0)
  const [cycleKey, setCycleKey] = useState(0)
  const paused = useRef(false)
  const current = items[active]

  useEffect(() => {
    const interval = setInterval(() => {
      if (paused.current) return
      setActive((i) => (i + 1) % items.length)
      setCycleKey((k) => k + 1)
    }, CYCLE_DURATION)
    return () => clearInterval(interval)
  }, [items.length])

  function selectItem(i: number) {
    setActive(i)
    setCycleKey((k) => k + 1)
    paused.current = true
    setTimeout(() => {
      paused.current = false
    }, CYCLE_DURATION * 3)
  }

  return (
    <div className="grid gap-4 md:grid-cols-[220px_1fr] md:gap-6">
      <div className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
        {items.map((d, i) => {
          const isActive = active === i
          return (
            <button
              key={d.title}
              type="button"
              onClick={() => selectItem(i)}
              aria-pressed={isActive}
              className={cn(
                "relative flex shrink-0 items-center gap-2.5 overflow-hidden rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors md:shrink",
                isActive ? "bg-primary text-white shadow-[0_10px_24px_-10px_oklch(0.546_0.215_262.88/0.55)]" : "text-muted-foreground hover:bg-slate-100",
              )}
            >
              {isActive && (
                <motion.span
                  key={cycleKey}
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-white/70"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: CYCLE_DURATION / 1000, ease: "linear" }}
                />
              )}
              <span className={cn("[&_svg]:size-4", isActive ? "text-white" : "text-primary")}>{d.icon}</span>
              <span className="whitespace-nowrap md:whitespace-normal">{d.title}</span>
            </button>
          )
        })}
      </div>

      <div className="relative h-[480px] overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-white to-primary/[0.04] p-8 sm:h-[360px]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-primary/10 blur-[80px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-10 size-56 rounded-full bg-primary/[0.06] blur-[70px]"
        />

        <span className="absolute right-6 top-6 text-xs font-semibold uppercase tracking-wide text-primary/50">
          {active + 1} / {items.length}
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-4 -top-6 text-primary/[0.06] [&_svg]:size-32"
            >
              {current.icon}
            </span>
            <motion.span
              initial={{ scale: 0.7, rotate: -8 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="relative flex size-14 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_14px_28px_-12px_oklch(0.546_0.215_262.88/0.55)] [&_svg]:size-6"
            >
              {current.icon}
            </motion.span>
            <p className="relative mt-5 text-xl font-semibold tracking-tight text-foreground">{current.title}</p>
            <p className="relative mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{current.description}</p>

            {current.points && current.points.length > 0 && (
              <ul className="relative mt-5 grid gap-2.5 sm:grid-cols-2">
                {current.points.map((point, i) => (
                  <motion.li
                    key={point}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
                    className="flex items-start gap-2 rounded-lg bg-white/70 px-3 py-2 text-sm text-foreground ring-1 ring-border/50"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
