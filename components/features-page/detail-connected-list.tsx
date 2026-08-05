"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"

type DetailItem = { icon: ReactNode; title: string; description: string }

/**
 * "What you get" as a vertical connected list — numbered icon nodes linked
 * by a running gradient line down the left, content in plain rows to the
 * right. A roadmap/connected-line metaphor, distinct from the card grids,
 * glass rows, numbered lists, split rows, spotlight panel, scattered
 * cards, and chat bubbles used for "what you get" elsewhere on the site.
 */
export function DetailConnectedList({ items }: { items: DetailItem[] }) {
  return (
    <div className="mt-10 rounded-3xl bg-gradient-to-br from-primary/[0.06] via-primary/[0.02] to-transparent p-8 sm:p-12">
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute bottom-6 left-6 top-6 w-px overflow-hidden bg-border/60" aria-hidden>
          <motion.div
            className="w-full bg-gradient-to-b from-primary to-primary/20"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />
        </div>

        <div className="space-y-8">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px", amount: 0.5 }}
              transition={{ duration: 0.4, delay: i * 0.12, ease: "easeOut" }}
              className="relative flex items-start gap-5 pl-0"
            >
              <motion.span
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 16, delay: i * 0.12 + 0.1 }}
                className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border-4 border-background bg-white text-primary shadow-[0_0_0_1px_rgba(15,23,42,0.06)]"
              >
                {item.icon}
              </motion.span>
              <div className="min-w-0 flex-1 pt-1.5">
                <p className="text-base font-bold tracking-tight text-foreground">{item.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
