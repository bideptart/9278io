"use client"

import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import type { ReactNode } from "react"

type DetailItem = {
  icon: ReactNode
  title: string
  description: string
}

/**
 * "What you get" as a full-width professional ledger — numbered rows with
 * a small icon chip, title, and description, each spanning the full
 * container width instead of a narrow icon+text pair with dead space
 * beside it. Clean bordered cards with a subtle hover lift, distinct from
 * the split-rows, grid, numbered-list, and bordered-row treatments used
 * elsewhere on the site.
 */
export function DetailProfessionalLedger({ items }: { items: DetailItem[] }) {
  return (
    <div className="divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/60 bg-white">
      {items.map((d, i) => (
        <motion.div
          key={d.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px", amount: 0.4 }}
          transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ backgroundColor: "rgba(37,99,235,0.03)" }}
          className="group flex w-full items-center gap-5 px-6 py-6 transition-colors sm:px-8"
        >
          <span className="font-mono text-sm font-bold text-muted-foreground/40 sm:text-base">
            {String(i + 1).padStart(2, "0")}
          </span>

          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/[0.07] text-primary ring-1 ring-inset ring-primary/10 transition-colors group-hover:bg-primary group-hover:text-white [&_svg]:size-5">
            {d.icon}
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-base font-semibold tracking-tight text-foreground sm:text-lg">{d.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
          </div>

          <ArrowRight
            className="hidden size-5 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-1 group-hover:text-primary sm:block"
            aria-hidden
          />
        </motion.div>
      ))}
    </div>
  )
}
