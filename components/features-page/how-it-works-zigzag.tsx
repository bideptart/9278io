"use client"

import type { ReactNode } from "react"
import { motion } from "motion/react"

type Step = {
  icon: ReactNode
  title: string
  description: string
}

/**
 * Zigzag step path — each step alternates left/right along a dashed
 * S-curve, numbered circle first then its card sliding in from its own
 * side. A deliberately different shape from the vertical connector-line
 * timeline and the horizontal arrow-flow used on the other feature pages.
 */
export function HowItWorksZigzag({ steps }: { steps: Step[] }) {
  const pathD = Array.from({ length: steps.length - 1 })
    .map((_, i) => {
      const y0 = (i / (steps.length - 1)) * 100
      const y1 = ((i + 1) / (steps.length - 1)) * 100
      const x0 = i % 2 === 0 ? 0 : 4
      const x1 = i % 2 === 0 ? 4 : 0
      return `M${x0} ${y0} L${x1} ${y1}`
    })
    .join(" ")

  return (
    <div className="relative mt-10 overflow-x-hidden">
      <svg viewBox="0 0 4 100" preserveAspectRatio="none" aria-hidden className="absolute inset-y-0 left-1/2 hidden h-full w-1 -translate-x-1/2 sm:block">
        <path d={pathD} fill="none" stroke="oklch(0.546 0.215 262.88 / 0.3)" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
        <motion.circle
          r="2"
          fill="oklch(0.546 0.215 262.88)"
          style={{ offsetPath: `path('${pathD}')` }}
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      <div className="space-y-8">
        {steps.map((s, i) => {
          const reversed = i % 2 === 1
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: reversed ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px", amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className={`relative flex sm:w-1/2 ${reversed ? "sm:ml-auto sm:flex-row-reverse sm:text-right" : ""}`}
            >
              <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow duration-300 hover:shadow-[0_20px_44px_-24px_rgba(37,99,235,0.35)]">
                <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.45_0.19_264)] text-sm font-bold text-white shadow-[0_10px_24px_oklch(0.546_0.215_262.88/0.4)]">
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full border-2 border-primary/40"
                    animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: i * 0.4 }}
                  />
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <span className={`flex items-center gap-1.5 ${reversed ? "sm:justify-end" : ""}`}>
                    <span className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-primary [&_svg]:size-3.5">
                      {s.icon}
                    </span>
                  </span>
                  <p className="mt-2 text-base font-semibold tracking-tight text-foreground">{s.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
