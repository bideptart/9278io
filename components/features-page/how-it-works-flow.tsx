"use client"

import type { ReactNode } from "react"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

type Step = {
  icon: ReactNode
  title: string
  description: string
}

/**
 * Horizontal step-flow — numbered circle cards connected by arrows, each
 * scaling/fading in as it scrolls into view. A deliberately different shape
 * from HowItWorksTimeline's vertical connector-line layout, so pages reusing
 * the "how it works" pattern don't all look identical.
 */
export function HowItWorksFlow({ steps }: { steps: Step[] }) {
  return (
    <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-stretch md:gap-4">
      {steps.map((s, i) => (
        <div key={s.title} className="flex flex-1 items-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px", amount: 0.5 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.15 }}
            className="flex-1 rounded-2xl border border-border/60 bg-white p-5 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)] md:flex md:flex-col md:items-center"
          >
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.45_0.19_264)] text-2xl font-bold text-white shadow-[0_10px_24px_oklch(0.546_0.215_262.88/0.35)]">
              {i + 1}
            </span>
            <span className="mx-auto mt-3 flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {s.icon}
            </span>
            <p className="mt-3 text-base font-semibold tracking-tight text-foreground">{s.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
          </motion.div>

          {i < steps.length - 1 && (
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: i * 0.15 + 0.2 }}
              className="hidden shrink-0 text-primary/40 md:flex md:items-center md:justify-center"
            >
              <ArrowRight className="size-6" aria-hidden />
            </motion.span>
          )}
        </div>
      ))}
    </div>
  )
}
