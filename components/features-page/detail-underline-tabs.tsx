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

/**
 * "What you get" as plain underline tabs — no card, no border, no
 * background box anywhere. Just text tabs with a sliding underline
 * indicator, and the selected item's copy sitting directly on the page
 * below. Auto-advances on its own (like a live demo) unless the reader
 * clicks a tab themselves, in which case it pauses on their choice for a
 * while before resuming. A boxless format not used by DetailCards,
 * DetailListRows, DetailNumberedList, DetailSplitRows, or DetailTabPanel
 * elsewhere on the site.
 */
export function DetailUnderlineTabs({ items }: { items: DetailItem[] }) {
  const [active, setActive] = useState(0)
  const current = items[active]
  const paused = useRef(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (paused.current) return
      setActive((i) => (i + 1) % items.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [items.length])

  function selectTab(i: number) {
    setActive(i)
    paused.current = true
    setTimeout(() => {
      paused.current = false
    }, 9000)
  }

  return (
    <div>
      <div className="flex flex-nowrap items-center gap-x-6 overflow-x-auto border-b border-border/50 sm:gap-x-8">
        {items.map((d, i) => {
          const isActive = active === i
          return (
            <button
              key={d.title}
              type="button"
              onClick={() => selectTab(i)}
              aria-pressed={isActive}
              className={cn(
                "relative flex shrink-0 items-center gap-2 whitespace-nowrap pb-3 text-sm font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <motion.span animate={{ scale: isActive ? 1.15 : 1 }} transition={{ type: "spring", stiffness: 300, damping: 14 }} className="[&_svg]:size-4">
                {d.icon}
              </motion.span>
              {d.title}
              {isActive && (
                <motion.span
                  layoutId="detail-tab-underline"
                  className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="pt-6"
        >
          <p className="text-lg font-semibold tracking-tight text-foreground">{current.title}</p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{current.description}</p>
          {current.points && current.points.length > 0 && (
            <ul className="mt-4 max-w-xl space-y-2">
              {current.points.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
                  className="flex items-start gap-2 text-sm text-foreground"
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
  )
}
