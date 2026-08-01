"use client"

import { motion } from "motion/react"
import { Check, Gauge, ShieldCheck, Sparkles, X } from "lucide-react"
import type { ReactNode } from "react"
import { CountUp } from "@/components/ui/count-up"

const TOPIC_ICONS: Record<string, ReactNode> = {
  Speed: <Gauge className="size-4" aria-hidden />,
  Coverage: <ShieldCheck className="size-4" aria-hidden />,
  Effort: <Sparkles className="size-4" aria-hidden />,
}

type Bar = {
  label: string
  detail: string
  /** 0-100, how far the bar fills — a visual read of relative delay/gap. */
  fill: number
  variant: "muted" | "primary"
}

type Comparison = {
  topic: string
  bars: [Bar, Bar]
  stat: { value: number; suffix: string; label: string }
}

const COMPARISONS: Comparison[] = [
  {
    topic: "Speed",
    bars: [
      { label: "Checking a dashboard manually", detail: "Could be minutes or hours later", fill: 92, variant: "muted" },
      { label: "With Booking Notifications", detail: "Under 1 second, every time", fill: 4, variant: "primary" },
    ],
    stat: { value: 95, suffix: "%", label: "faster to find out" },
  },
  {
    topic: "Coverage",
    bars: [
      { label: "Only the bookings you happen to check", detail: "Easy to miss one on a busy day", fill: 55, variant: "muted" },
      { label: "Every confirmed booking, notified", detail: "100% of them, no exceptions", fill: 100, variant: "primary" },
    ],
    stat: { value: 100, suffix: "%", label: "of bookings notified" },
  },
  {
    topic: "Effort",
    bars: [
      { label: "Refreshing the dashboard all day", detail: "Constant, ongoing attention", fill: 85, variant: "muted" },
      { label: "It comes straight to your inbox", detail: "Zero effort after setup", fill: 6, variant: "primary" },
    ],
    stat: { value: 0, suffix: "", label: "manual checking needed" },
  },
]

/**
 * "Why it matters" as race-style comparison bars, grouped by topic (Speed,
 * Coverage, Effort) — a long muted bar for the old way next to a primary
 * bar for this feature, each filling in on scroll. A visual comparison, not
 * a stat band, card grid, or before/after list — a shape not used
 * elsewhere on the site.
 */
export function SpeedComparisonBars() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {COMPARISONS.map((comparison, ci) => (
        <motion.div
          key={comparison.topic}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px", amount: 0.4 }}
          transition={{ duration: 0.4, delay: ci * 0.1, ease: "easeOut" }}
          className="rounded-2xl border border-border/60 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
        >
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
              {TOPIC_ICONS[comparison.topic]}
            </span>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary/70">{comparison.topic}</p>
          </div>

          <div className="mt-5 space-y-5">
            {comparison.bars.map((bar, i) => (
              <div key={bar.label}>
                <div className="flex items-baseline justify-between gap-3">
                  <p
                    className={`flex items-center gap-1.5 text-sm font-semibold ${
                      bar.variant === "primary" ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {bar.variant === "primary" ? (
                      <Check className="size-3.5 shrink-0 text-primary" aria-hidden />
                    ) : (
                      <X className="size-3.5 shrink-0 text-muted-foreground/50" aria-hidden />
                    )}
                    {bar.label}
                  </p>
                  {bar.variant === "primary" && (
                    <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                      This feature
                    </span>
                  )}
                </div>
                <p className="pl-5 text-xs text-muted-foreground">{bar.detail}</p>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-secondary/50">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${bar.fill}%` }}
                    viewport={{ once: false, margin: "-80px", amount: 0.4 }}
                    transition={{ duration: 1, delay: 0.2 + ci * 0.1 + i * 0.15, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      bar.variant === "primary"
                        ? "bg-gradient-to-r from-primary to-[oklch(0.6_0.19_262.88)] shadow-[0_0_10px_oklch(0.546_0.215_262.88/0.5)]"
                        : "bg-muted-foreground/30"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-baseline gap-2 border-t border-border/60 pt-4">
            <CountUp
              value={comparison.stat.value}
              suffix={comparison.stat.suffix}
              once={false}
              className="text-2xl font-bold tracking-tight text-primary"
            />
            <span className="text-xs text-muted-foreground">{comparison.stat.label}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
