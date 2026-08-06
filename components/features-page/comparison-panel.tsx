"use client"

import { motion } from "motion/react"
import { ArrowRight, Check, X } from "lucide-react"

type ComparisonPanelProps = {
  withoutTitle: string
  withoutPoints: string[]
  withTitle: string
  withPoints: string[]
}

/**
 * Single unified card of "transformation rows" — each row pairs one
 * without-point directly with its corresponding with-point via an arrow,
 * instead of two separate side-by-side lists. A different shape from the
 * earlier two-card layout, making the before → after relationship explicit
 * per point rather than generic parallel lists.
 */
export function ComparisonPanel({ withoutTitle, withoutPoints, withTitle, withPoints }: ComparisonPanelProps) {
  const rows = withoutPoints.map((p, i) => ({ before: p, after: withPoints[i] }))

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-border/60 bg-secondary/30 px-5 py-3 sm:gap-6 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{withoutTitle}</p>
        <span className="size-4" aria-hidden />
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{withTitle}</p>
      </div>

      <div className="divide-y divide-border/50">
        {rows.map((row, i) => (
          <motion.div
            key={row.before}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px", amount: 0.4 }}
            transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
            className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 py-4 sm:gap-6 sm:px-6"
          >
            <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <X className="mt-0.5 size-4 shrink-0 text-red-400" aria-hidden />
              <span>{row.before}</span>
            </div>
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ArrowRight className="size-3.5" aria-hidden />
            </span>
            <div className="flex items-start gap-2.5 text-sm font-medium text-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden />
              <span>{row.after}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
