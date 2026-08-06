"use client"

import type { ReactNode } from "react"
import { motion } from "motion/react"

type Step = {
  icon: ReactNode
  title: string
  description: string
}

/**
 * Numbered step cards in a responsive row — each card carries its own step
 * number, icon badge, and a connecting arrow to the next card on desktop.
 * Stacks to a single column with a short vertical connector on mobile.
 */
export function HowItWorksTimeline({ steps }: { steps: Step[] }) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {steps.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex h-full flex-col rounded-2xl border border-border/60 bg-white p-6"
          style={{ boxShadow: "0 1px 2px rgba(15,23,42,0.04)" }}
        >
          <div className="flex items-center justify-between">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.45_0.19_264)] text-white shadow-[0_8px_20px_oklch(0.546_0.215_262.88/0.3)]">
              {s.icon}
            </span>
            <span className="font-mono text-2xl font-bold text-primary/15">{String(i + 1).padStart(2, "0")}</span>
          </div>
          <p className="mt-5 text-base font-semibold tracking-tight text-foreground">{s.title}</p>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>

          {i < steps.length - 1 && (
            <span
              aria-hidden
              className="absolute -right-[13px] top-1/2 z-10 hidden size-6 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-white text-muted-foreground lg:flex"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 5h8M6 1.5 9 5l-3 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          )}
        </motion.div>
      ))}
    </div>
  )
}
