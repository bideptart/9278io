"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowRight } from "lucide-react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type DetailItem = { icon: ReactNode; title: string; description: string }

const FAN_TONES = ["from-amber-300 to-amber-400", "from-violet-300 to-violet-400"]

/**
 * "What you get" as a fanned card stack — a front card (icon, title,
 * description, CTA) with two tilted colored cards peeking out behind it,
 * paired with a clickable capability list, auto-cycling through each item.
 * A single-focus stacked-deck metaphor, distinct from every other "what
 * you get" format used elsewhere on the site (card grids, tabs, lists,
 * bubbles, connected line, flip cards, swipe carousel).
 */
export function DetailFanStack({ items }: { items: DetailItem[] }) {
  const [active, setActive] = useState(0)

  const current = items[active]
  const peekItems = [items[(active + 1) % items.length], items[(active + 2) % items.length]]

  return (
    <div className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.07] via-primary/[0.03] to-transparent p-8 sm:p-14">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 sm:flex-row sm:justify-between">
        <div className="flex w-full max-w-xs flex-col gap-2 sm:w-auto">
          {items.map((item, i) => {
            const isActive = active === i
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors",
                  isActive ? "bg-white shadow-[0_10px_24px_-16px_rgba(15,23,42,0.25)]" : "hover:bg-white/60",
                )}
              >
                <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-full", isActive ? "bg-primary/10 text-primary" : "bg-white/70 text-muted-foreground")}>
                  {item.icon}
                </span>
                <span className={cn("text-sm font-semibold", isActive ? "text-foreground" : "text-muted-foreground")}>{item.title}</span>
              </button>
            )
          })}
        </div>

        <div className="relative h-56 w-full max-w-80 shrink-0">
          {FAN_TONES.map((tone, i) => {
            const peek = peekItems[i]
            const isRight = i === 0
            return (
              <motion.div
                key={i}
                animate={{
                  rotate: isRight ? 8 : -8,
                  x: isRight ? 16 : -16,
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={cn(
                  "absolute inset-5 flex flex-col rounded-2xl bg-gradient-to-br p-4 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.25)]",
                  isRight ? "items-end text-right" : "items-start text-left",
                  tone,
                )}
                style={{ zIndex: i }}
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/30 text-white">
                  {peek.icon}
                </span>
                <p className="mt-2 text-xs font-bold leading-tight text-white drop-shadow-sm">{peek.title}</p>
              </motion.div>
            )
          })}

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -10 }}
              whileHover={{ y: -6, scale: 1.02, boxShadow: "0 32px 60px -20px rgba(15,23,42,0.4)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0 z-10 flex flex-col justify-between rounded-2xl border border-border/60 bg-white p-6 shadow-[0_24px_50px_-20px_rgba(15,23,42,0.3)]"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {current.icon}
              </span>
              <div>
                <p className="text-base font-bold tracking-tight text-foreground">{current.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{current.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Learn more
                  <ArrowRight className="size-3.5" aria-hidden />
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
