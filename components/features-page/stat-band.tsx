"use client"

import { Zap, CheckCircle2, Timer, TrendingDown } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { motion, type Variants } from "motion/react"
import { CountUp } from "@/components/ui/count-up"

// Numbers restated from components/sections/features.tsx's LatencyVisual /
// AnalyticsVisual — the same figures already shown on the homepage.
type Stat = {
  icon: LucideIcon
  value: number
  suffix: string
  decimals?: number
  label: string
}

const stats: Stat[] = [
  { icon: Zap, value: 94, suffix: "ms", label: "Response latency" },
  { icon: CheckCircle2, value: 87, suffix: "%", label: "Calls resolved by AI" },
  { icon: Timer, value: 134, suffix: "s", label: "Avg. call time (2m 14s)" },
  { icon: TrendingDown, value: 13, suffix: "%", label: "Escalation rate" },
]

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export function StatBand() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-30px" }}
      className="mx-auto grid max-w-3xl grid-cols-2 gap-1.5 rounded-3xl border border-primary/60 bg-white/40 p-1.5 backdrop-blur-sm sm:grid-cols-4"
    >
      {stats.map((s, i) => {
        const Icon = s.icon
        return (
          <motion.div
            key={s.label}
            variants={item}
            className="group relative flex flex-col items-center gap-2 rounded-2xl px-4 py-6 transition-colors duration-300 hover:bg-primary hover:shadow-[0_8px_24px_-12px_oklch(0.546_0.215_262.88/0.5)]"
          >
            {i < stats.length - 1 && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-6 -right-[3px] hidden w-px bg-primary/50 sm:block"
              />
            )}
            <motion.span
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="flex size-9 items-center justify-center text-primary transition-colors duration-300 group-hover:text-white"
            >
              <Icon className="size-5" aria-hidden />
            </motion.span>
            <p className="text-2xl font-bold tabular-nums tracking-tight text-foreground transition-colors duration-300 group-hover:text-white">
              <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals} once={false} duration={0.6} />
            </p>
            <p className="text-center text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors duration-300 group-hover:text-white/80">
              {s.label}
            </p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
