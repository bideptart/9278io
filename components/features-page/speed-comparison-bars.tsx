"use client"

import { motion } from "motion/react"

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
}

const COMPARISONS: Comparison[] = [
  {
    topic: "Speed",
    bars: [
      { label: "Checking a dashboard manually", detail: "Could be minutes or hours later", fill: 92, variant: "muted" },
      { label: "With Booking Notifications", detail: "Under 1 second, every time", fill: 4, variant: "primary" },
    ],
  },
  {
    topic: "Coverage",
    bars: [
      { label: "Only the bookings you happen to check", detail: "Easy to miss one on a busy day", fill: 55, variant: "muted" },
      { label: "Every confirmed booking, notified", detail: "100% of them, no exceptions", fill: 100, variant: "primary" },
    ],
  },
  {
    topic: "Effort",
    bars: [
      { label: "Refreshing the dashboard all day", detail: "Constant, ongoing attention", fill: 85, variant: "muted" },
      { label: "It comes straight to your inbox", detail: "Zero effort after setup", fill: 6, variant: "primary" },
    ],
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
    <div className="grid gap-x-10 gap-y-10 md:grid-cols-3">
      {COMPARISONS.map((comparison, ci) => (
        <div key={comparison.topic}>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary/70">{comparison.topic}</p>
          <div className="mt-3 space-y-5">
            {comparison.bars.map((bar, i) => (
              <motion.div
                key={bar.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-80px", amount: 0.4 }}
                transition={{ duration: 0.4, delay: ci * 0.1 + i * 0.15, ease: "easeOut" }}
              >
                <p className="text-sm font-semibold text-foreground">{bar.label}</p>
                <p className="text-xs text-muted-foreground">{bar.detail}</p>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-secondary/50">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${bar.fill}%` }}
                    viewport={{ once: false, margin: "-80px", amount: 0.4 }}
                    transition={{ duration: 1, delay: 0.2 + ci * 0.1 + i * 0.15, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      bar.variant === "primary"
                        ? "bg-gradient-to-r from-primary to-[oklch(0.6_0.19_262.88)]"
                        : "bg-muted-foreground/30"
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
