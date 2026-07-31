"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"

type DetailItem = {
  icon: ReactNode
  title: string
  description: string
}

/**
 * "What you get" as a borderless numbered list — no card backgrounds, just a
 * large faded number, icon, and copy. Laid out as a wide grid (one column
 * per item) rather than a stacked single column, so it fills a wide
 * container instead of leaving the right side empty. A deliberately
 * boxless shape, different from DetailCards (bordered 3-column grid) and
 * DetailListRows (bordered rows).
 */
export function DetailNumberedList({ items }: { items: DetailItem[] }) {
  return (
    <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((d, i) => (
        <motion.div
          key={d.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px", amount: 0.4 }}
          transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
          className="group border-t border-border/50 pt-5"
        >
          <div className="flex items-center justify-between">
            <motion.span
              className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
              whileHover={{ scale: 1.15, rotate: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
            >
              {d.icon}
            </motion.span>
            <span className="font-mono text-2xl font-bold leading-none text-primary/15 transition-colors duration-300 group-hover:text-primary/30">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <p className="mt-3 text-base font-semibold tracking-tight text-foreground">{d.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
        </motion.div>
      ))}
    </div>
  )
}
