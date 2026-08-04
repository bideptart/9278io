"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type DetailItem = { icon: ReactNode; title: string; description: string }

const AUTO_ADVANCE_MS = 3600

/**
 * "What you get" as a click-to-switch tab panel — a vertical list of
 * capability tabs on the left, with a shared sliding highlight morphing
 * between them, and a large content panel on the right that crossfades in
 * the selected capability's icon and description. Auto-advances on a
 * story-style progress bar and pauses on hover. An interactive switcher,
 * distinct from the always-visible card grids, glass rows, numbered lists,
 * split rows, spotlight panel, scattered cards, chat bubbles, and
 * connected list used for "what you get" elsewhere on the site.
 */
export function DetailTabSwitcher({ items }: { items: DetailItem[] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [runId, setRunId] = useState(0)
  const current = items[active]
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    if (paused) return
    timeoutRef.current = setTimeout(() => {
      setActive((a) => (a + 1) % items.length)
      setRunId((r) => r + 1)
    }, AUTO_ADVANCE_MS)
    return () => clearTimeout(timeoutRef.current)
  }, [active, paused, items.length, runId])

  function selectTab(i: number) {
    setActive(i)
    setRunId((r) => r + 1)
  }

  return (
    <div
      className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-[220px_1fr] sm:gap-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex gap-2 overflow-x-auto sm:flex-col sm:overflow-visible">
        {items.map((item, i) => {
          const isActive = active === i
          return (
            <motion.button
              key={item.title}
              type="button"
              onClick={() => selectTab(i)}
              aria-pressed={isActive}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              whileHover={!isActive ? { x: 3 } : {}}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3, delay: i * 0.08, ease: "easeOut" }}
              className={cn(
                "relative flex shrink-0 items-center gap-2.5 overflow-hidden rounded-xl border px-3.5 py-3 text-left text-sm font-semibold sm:shrink",
                isActive ? "border-transparent text-white" : "border-border/60 text-foreground hover:border-primary/30 hover:bg-primary/[0.06]",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="tab-highlight"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-xl bg-primary shadow-[0_10px_24px_-12px_rgba(37,99,235,0.5)]"
                />
              )}
              {isActive && (
                <motion.span
                  key={runId}
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[3px] bg-white/60"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: paused ? 0 : 1 }}
                  transition={{ duration: paused ? 0 : AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                  style={{ transformOrigin: "left" }}
                />
              )}
              <span className={cn("relative flex size-7 shrink-0 items-center justify-center rounded-full", isActive ? "bg-white/20" : "bg-primary/10 text-primary")}>
                {item.icon}
              </span>
              <span className="relative whitespace-nowrap sm:whitespace-normal">{item.title}</span>
            </motion.button>
          )
        })}
      </div>

      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.25 }}
        className="relative min-h-[200px] overflow-hidden rounded-2xl border border-border/60 bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-shadow hover:shadow-[0_20px_45px_-24px_rgba(15,23,42,0.25)]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.span
              initial={{ scale: 0.5, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 14, delay: 0.05 }}
              className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"
            >
              <motion.span
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="flex"
              >
                {current.icon}
              </motion.span>
            </motion.span>
            <p className="mt-4 text-xl font-bold tracking-tight text-foreground">{current.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{current.description}</p>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.span
            key={active}
            aria-hidden
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="pointer-events-none absolute -bottom-6 -right-6 text-[7rem] font-black leading-none text-primary/[0.04]"
          >
            {active + 1}
          </motion.span>
        </AnimatePresence>

        <div className="absolute bottom-4 right-4 flex gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to item ${i + 1}`}
              onClick={() => selectTab(i)}
              className={cn("size-1.5 rounded-full transition-colors duration-300", i === active ? "bg-primary" : "bg-border hover:bg-primary/40")}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
