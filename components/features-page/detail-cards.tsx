"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"

type DetailItem = {
  icon: ReactNode
  title: string
  description: string
}

/**
 * "What you get" style card grid. Cards slide in one at a time, left to
 * right, as the grid scrolls into view — then get a hover-lift + icon
 * spring + drawn underline, matching the FAQ category grid's treatment.
 */
export function DetailCards({ items }: { items: DetailItem[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {items.map((d, i) => {
        return (
          <motion.div
            key={d.title}
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-80px", amount: 0.4 }}
            whileHover={{ y: -4 }}
            transition={{
              opacity: { duration: 0.9, delay: i * 0.35, ease: "easeOut" },
              x: { type: "spring", stiffness: 90, damping: 16, delay: i * 0.35 },
              y: { type: "spring", stiffness: 300, damping: 20 },
            }}
            className="group relative h-full overflow-hidden rounded-2xl border border-border/60 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow duration-300 hover:border-primary/30 hover:shadow-[0_20px_48px_-20px_rgba(37,99,235,0.4)]"
          >
            {/* top accent bar that fills in on hover */}
            <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary to-[oklch(0.6_0.19_262.88)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
            {/* faint corner glow that fades in on hover */}
            <span className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-primary/[0.08] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

            <div className="flex items-start justify-between">
              <motion.span
                className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-inset ring-primary/10"
                whileHover={{ scale: 1.1, rotate: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
              >
                {d.icon}
              </motion.span>
              <span className="font-mono text-xs font-semibold text-muted-foreground/40 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-4 text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
              {d.title}
            </p>
            <span className="block h-px w-8 origin-left scale-x-0 bg-primary/40 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
          </motion.div>
        )
      })}
    </div>
  )
}
