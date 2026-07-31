"use client"

import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import type { FaqItem } from "@/lib/faq"

/**
 * Compact quick-link list — no cards, no accordion, no borders at all:
 * just a numbered question with an arrow, linking out to the full FAQ
 * page's matching section, with the answer's first line as a one-line
 * preview underneath. A minimal fourth shape, distinct from the accordion,
 * plain-list, and switcher formats used for "related questions" on the
 * other feature pages.
 */
export function FaqQuickLinks({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-border/50">
      {items.map((item, i) => (
        <motion.a
          key={item.q}
          href="/faq"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-80px", amount: 0.4 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="group flex items-center gap-4 py-4 first:pt-0 last:pb-0"
        >
          <span className="font-mono text-xs font-semibold text-muted-foreground/50 tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
              {item.q}
            </p>
            <p className="truncate text-xs text-muted-foreground">{item.a}</p>
          </div>
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/40 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden />
        </motion.a>
      ))}
    </div>
  )
}
