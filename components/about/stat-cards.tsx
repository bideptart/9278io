"use client"

import type { ReactNode } from "react"
import { motion, type Variants } from "motion/react"
import { CountUp } from "@/components/ui/count-up"

type Stat = {
  icon: ReactNode
  label: string
  /** Static text value, e.g. "TRAI & DPDP" — rendered as-is, no count-up. */
  value?: string
  /** Numeric value to animate with a count-up, e.g. 10 for "10+". */
  numeric?: number
  prefix?: string
  suffix?: string
}

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

export function StatCards({ stats }: { stats: Stat[] }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-1.5 rounded-3xl border border-border/60 bg-white/40 p-1.5 backdrop-blur-sm sm:grid-cols-4"
    >
      {stats.map((s) => (
        <motion.div
          key={s.label}
          variants={item}
          className="group relative flex flex-col items-center gap-2 rounded-2xl px-4 py-6 transition-colors duration-300 hover:bg-primary hover:shadow-[0_8px_24px_-12px_oklch(0.546_0.215_262.88/0.5)]"
        >
          <motion.span
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="flex size-9 items-center justify-center text-primary transition-colors duration-300 group-hover:text-white"
          >
            {s.icon}
          </motion.span>
          <p className="text-2xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-white">
            {s.numeric !== undefined ? (
              <CountUp value={s.numeric} prefix={s.prefix} suffix={s.suffix} duration={1.4} />
            ) : (
              s.value
            )}
          </p>
          <p className="text-center text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors duration-300 group-hover:text-white/80">
            {s.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )
}
