"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { CheckCircle2, CircleDot, MessageCircle } from "lucide-react"
import { CountUp } from "@/components/ui/count-up"

type LogEntry = { id: number; icon: typeof CheckCircle2; text: string; tone: "new" | "reply" | "done" }

const EVENTS: Omit<LogEntry, "id">[] = [
  { icon: CircleDot, text: "Ticket #482 raised — “Call routing not triggering”", tone: "new" },
  { icon: MessageCircle, text: "Priya replied on Ticket #479", tone: "reply" },
  { icon: CheckCircle2, text: "Ticket #476 resolved in 1h 52m", tone: "done" },
  { icon: CircleDot, text: "Ticket #483 raised — “GST invoice missing”", tone: "new" },
  { icon: CheckCircle2, text: "Ticket #477 resolved in 38m", tone: "done" },
  { icon: MessageCircle, text: "Support replied on Ticket #482", tone: "reply" },
]

const TONE_STYLE: Record<LogEntry["tone"], string> = {
  new: "bg-blue-100 text-blue-600",
  reply: "bg-amber-100 text-amber-600",
  done: "bg-emerald-100 text-emerald-600",
}

const STATS = [
  { value: 94, suffix: "%", label: "Tickets resolved in under 2 hours" },
  { value: 312, suffix: "", label: "Tickets closed this month" },
  { value: 24, suffix: "/7", label: "Billing & outage support, every plan" },
]

/**
 * "Why it matters" as a live activity log — a scrolling feed of ticket
 * events stacking up in real time, next to a running stat strip. Reads
 * as an operations feed rather than a before/after comparison or a bar
 * chart, distinct from ComparisonPanel and SpeedComparisonBars used
 * elsewhere on the site.
 */
export function TicketActivityFeed() {
  const [entries, setEntries] = useState<LogEntry[]>(() => [{ id: 0, ...EVENTS[0] }])
  const [cursor, setCursor] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setEntries((prev) => {
        const next = { id: prev[prev.length - 1].id + 1, ...EVENTS[cursor % EVENTS.length] }
        const updated = [...prev, next]
        return updated.slice(-5)
      })
      setCursor((c) => c + 1)
    }, 2000)
    return () => clearInterval(interval)
  }, [cursor])

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Live ticket activity</p>
        <div className="mt-3 flex flex-col gap-2">
          <AnimatePresence initial={false}>
            {entries.map((entry) => {
              const Icon = entry.icon
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex items-center gap-2.5 rounded-lg px-2 py-1.5"
                >
                  <span className={`flex size-6 shrink-0 items-center justify-center rounded-full ${TONE_STYLE[entry.tone]}`}>
                    <Icon className="size-3.5" aria-hidden />
                  </span>
                  <span className="truncate text-sm text-foreground">{entry.text}</span>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-border/60 bg-white p-5">
            <CountUp value={stat.value} suffix={stat.suffix} once={false} className="text-2xl font-bold tracking-tight text-primary" />
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
