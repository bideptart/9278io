"use client"

import { useRef } from "react"
import type { ReactNode } from "react"
import { motion, useScroll, useTransform } from "motion/react"

type Step = {
  icon: ReactNode
  title: string
  description: string
}

/**
 * Scroll-driven timeline: the connector line fills in sync with scroll
 * progress through the section (via useScroll + useTransform), each step
 * card slides in from the right as it enters view, and its badge pops in
 * with a spring plus a looping pulse ring — replaces the old page-load-only
 * fade-up with something that actually tracks the user's scroll position.
 */
export function HowItWorksTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div ref={ref} className="relative mt-10">
      {/* base line, always visible */}
      <div aria-hidden className="absolute left-6 top-6 bottom-6 w-px bg-border" />
      {/* fill line, grows as the section scrolls through view */}
      <motion.div
        aria-hidden
        style={{ height: lineHeight }}
        className="absolute left-6 top-6 w-px bg-gradient-to-b from-primary to-[oklch(0.6_0.19_262.88)]"
      />
      <div className="space-y-8">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px", amount: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-start gap-5"
          >
            <motion.span
              initial={{ scale: 0.5 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ type: "spring", stiffness: 260, damping: 15, delay: i * 0.1 + 0.1 }}
              className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.45_0.19_264)] text-white shadow-[0_8px_20px_oklch(0.546_0.215_262.88/0.35)]"
            >
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full border-2 border-primary/50"
                animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: i * 0.35 }}
              />
              {s.icon}
            </motion.span>
            <div className="rounded-2xl border border-border/60 bg-white p-5 pt-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
              <span className="font-mono text-xs font-semibold text-primary/60">STEP {i + 1}</span>
              <p className="mt-1 text-base font-semibold tracking-tight text-foreground">{s.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
