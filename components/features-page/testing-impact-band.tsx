"use client"

import { motion } from "motion/react"
import { CheckCircle2, ShieldCheck, Timer } from "lucide-react"
import { CountUp } from "@/components/ui/count-up"
import { cn } from "@/lib/utils"

const STATS = [
  {
    icon: ShieldCheck,
    value: 0,
    suffix: "",
    display: "0",
    label: "Real callers at risk",
    description: "Every test happens in the sandbox — nothing reaches a live caller until you're ready.",
    tone: "bg-blue-50 text-blue-600",
    bar: "from-blue-500 to-blue-500/20",
  },
  {
    icon: Timer,
    value: 2,
    prefix: "<",
    suffix: " min",
    label: "To catch a gap",
    description: "Send a test message and see the response instantly, instead of waiting for a real call to fail.",
    tone: "bg-amber-50 text-amber-600",
    bar: "from-amber-500 to-amber-500/20",
  },
  {
    icon: CheckCircle2,
    value: 100,
    suffix: "%",
    label: "Reviewed before launch",
    description: "Every response your agent gives can be checked and tweaked before it ever goes live.",
    tone: "bg-emerald-50 text-emerald-600",
    bar: "from-emerald-500 to-emerald-500/20",
  },
]

/**
 * "Why it matters" as a full-width impact stat band — three large animated
 * numbers with icons and short explanations, laid out edge-to-edge with
 * divider lines. A horizontal stat-row metaphor, distinct from the
 * comparison panel, search race, activity feed, and checklist used for
 * "why it matters" elsewhere on the site.
 */
export function TestingImpactBand() {
  return (
    <div className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.07] via-primary/[0.03] to-transparent">
      <div className="grid divide-y divide-border/50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
            className="relative flex flex-col items-center overflow-hidden px-8 py-10 text-center transition-colors hover:bg-white/60"
          >
            <span aria-hidden className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", stat.bar)} />
            <motion.span
              initial={{ scale: 0.6 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 300, damping: 16, delay: i * 0.1 + 0.1 }}
              className={cn("relative flex size-12 items-center justify-center rounded-2xl", stat.tone)}
            >
              <motion.span
                aria-hidden
                className="absolute -inset-2 rounded-full opacity-30"
                style={{ background: `radial-gradient(circle, currentColor 0%, transparent 70%)` }}
                animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              />
              <stat.icon className="relative size-6" aria-hidden />
            </motion.span>
            <p className="mt-4 text-4xl font-black tracking-tight text-foreground">
              {stat.display ?? <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} duration={1.2} />}
            </p>
            <p className="mt-1.5 text-sm font-bold text-foreground">{stat.label}</p>
            <p className="mt-2 max-w-[220px] text-xs leading-relaxed text-muted-foreground">{stat.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
