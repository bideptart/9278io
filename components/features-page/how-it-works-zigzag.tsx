"use client"

import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { motion } from "motion/react"

type Step = {
  icon: ReactNode
  title: string
  description: string
}

const CYCLE_MS = 2200

/**
 * Zigzag step path — each step alternates left/right along a dashed
 * S-curve, numbered circle first then its card sliding in from its own
 * side. A deliberately different shape from the vertical connector-line
 * timeline and the horizontal arrow-flow used on the other feature pages.
 * An "active" step auto-cycles on repeat: the traveling dot actually
 * stops at that step's position on the path (not an arbitrary endless
 * loop), and that step's card + number circle light up in sync — so the
 * dot reads as tracking real progress through the steps, not decoration.
 */
export function HowItWorksZigzag({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [steps.length])

  const pathD = Array.from({ length: steps.length - 1 })
    .map((_, i) => {
      const y0 = (i / (steps.length - 1)) * 100
      const y1 = ((i + 1) / (steps.length - 1)) * 100
      const x0 = i % 2 === 0 ? 0 : 4
      const x1 = i % 2 === 0 ? 4 : 0
      return `M${x0} ${y0} L${x1} ${y1}`
    })
    .join(" ")

  const activePercent = (active / (steps.length - 1)) * 100

  return (
    <div className="relative mt-10 overflow-x-hidden">
      <svg viewBox="0 0 4 100" preserveAspectRatio="none" aria-hidden className="absolute inset-y-0 left-1/2 hidden h-full w-1 -translate-x-1/2 sm:block">
        <path d={pathD} fill="none" stroke="oklch(0.546 0.215 262.88 / 0.3)" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
        <motion.circle
          r="2.5"
          fill="oklch(0.546 0.215 262.88)"
          style={{ offsetPath: `path('${pathD}')` }}
          animate={{ offsetDistance: `${activePercent}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      <div className="space-y-8">
        {steps.map((s, i) => {
          const reversed = i % 2 === 1
          const isActive = i === active
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: reversed ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px", amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              onClick={() => setActive(i)}
              role="button"
              tabIndex={0}
              className={`relative flex cursor-pointer sm:w-1/2 ${reversed ? "sm:ml-auto sm:flex-row-reverse sm:text-right" : ""}`}
            >
              <motion.div
                animate={{
                  borderColor: isActive ? "var(--primary)" : "color-mix(in oklab, var(--border) 100%, transparent)",
                  boxShadow: isActive ? "0 20px 44px -24px rgba(37,99,235,0.35)" : "0 1px 2px rgba(15,23,42,0.04)",
                }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-4 rounded-2xl border bg-white p-5"
              >
                <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.45_0.19_264)] text-sm font-bold text-white shadow-[0_10px_24px_oklch(0.546_0.215_262.88/0.4)]">
                  {isActive && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-full border-2 border-primary/40"
                      initial={{ scale: 1, opacity: 0.7 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <span className={`flex items-center gap-1.5 ${reversed ? "sm:justify-end" : ""}`}>
                    <motion.span
                      animate={{
                        backgroundColor: isActive ? "var(--primary)" : "color-mix(in oklab, var(--primary) 10%, transparent)",
                        color: isActive ? "#ffffff" : "var(--primary)",
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex size-6 items-center justify-center rounded-md [&_svg]:size-3.5"
                    >
                      {s.icon}
                    </motion.span>
                  </span>
                  <p className="mt-2 text-base font-semibold tracking-tight text-foreground">{s.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
