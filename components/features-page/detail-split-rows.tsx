"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"

type DetailItem = {
  icon: ReactNode
  title: string
  description: string
}

/**
 * "What you get" as alternating split rows — a large tinted icon panel on
 * one side, copy on the other, flipping side to side down the page. A
 * deliberately different shape from the grid/numbered-list/bordered-row
 * treatments used on the other feature pages.
 */
export function DetailSplitRows({ items }: { items: DetailItem[] }) {
  return (
    <div className="space-y-10">
      {items.map((d, i) => (
        <motion.div
          key={d.title}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px", amount: 0.4 }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6 sm:flex-row"
        >
          <div className="flex size-24 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-inset ring-primary/10">
            <span className="[&_svg]:size-9">{d.icon}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-semibold tracking-tight text-foreground">{d.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
