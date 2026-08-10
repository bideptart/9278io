"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { CalendarCheck2, CircleDot, Wrench } from "lucide-react"
import { cn } from "@/lib/utils"

const STEPS = [
  {
    icon: CircleDot,
    label: "Raised",
    title: "A ticket comes in",
    description: "Ticket #482 opens the moment a request is raised — “Call routing not triggering for VIP numbers.”",
  },
  {
    icon: Wrench,
    label: "In progress",
    title: "A specialist picks it up",
    description: "Priya takes ownership and the SLA clock starts — no queue to sit in, no ticket left unclaimed.",
  },
  {
    icon: CalendarCheck2,
    label: "Resolved",
    title: "Closed, and kept on record",
    description: "The fix ships and the ticket closes in 1h 52m — searchable in your history from then on.",
  },
]

const STEP_DURATION = 3200

/**
 * "How it works" as an open, editorial step reveal — no card, no border,
 * no background box at all. A giant faint step number, a crossfading
 * title and caption sitting directly on the page, and a thin progress
 * rule underneath. Distinct from the boxed kanban board, terminal log,
 * and chat thread already tried for this page's "how it works" section.
 */
export function TicketStepReveal() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setStage((s) => (s + 1) % STEPS.length), STEP_DURATION)
    return () => clearInterval(interval)
  }, [])

  const current = STEPS[stage]
  const Icon = current.icon

  return (
    <div className="relative mx-auto mt-14 max-w-2xl text-center">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none text-[10rem] font-black leading-none text-slate-100"
      >
        {String(stage + 1).padStart(2, "0")}
      </span>

      <div className="min-h-[210px] sm:min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Icon className="size-3.5" aria-hidden />
              {current.label}
            </span>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{current.title}</h3>
            <p className="mx-auto mt-3 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground">
              {current.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mx-auto mt-8 flex max-w-xs items-center gap-2">
        {STEPS.map((_, i) => (
          <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-border/60">
            <motion.div
              className={cn("h-full rounded-full bg-primary", i > stage && "opacity-0")}
              initial={false}
              animate={
                i < stage
                  ? { width: "100%", opacity: 1 }
                  : i === stage
                    ? { width: "100%", opacity: 1 }
                    : { width: "0%" }
              }
              transition={i === stage ? { duration: STEP_DURATION / 1000, ease: "linear" } : { duration: 0.3 }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
