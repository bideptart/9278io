"use client"

import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

type Step = {
  icon: ReactNode
  title: string
  description: string
}

const CYCLE_MS = 2200

/**
 * Horizontal step-flow — numbered circle cards connected by arrows. Beyond
 * the one-time scroll-in reveal, an active step auto-cycles through 1→2→3
 * on repeat: the current card's number glows with a pulsing ring and its
 * border lights up, and a traveling dot flows along the connecting arrow
 * into the next step — so the section reads as a live process in motion,
 * not a static row of cards. Distinct from HowItWorksTimeline's vertical
 * connector-line layout, so pages reusing "how it works" don't all look
 * identical.
 */
export function HowItWorksFlow({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [steps.length])

  return (
    <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-stretch md:gap-4">
      {steps.map((s, i) => {
        const isActive = i === active
        return (
          <div key={s.title} className="flex flex-1 items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px", amount: 0.5 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.15 }}
              animate={{
                borderColor: isActive ? "var(--primary)" : "var(--border)",
                boxShadow: isActive ? "0 16px 32px -20px oklch(0.546 0.215 262.88 / 0.45)" : "0 1px 2px rgba(15,23,42,0.04)",
              }}
              className="flex-1 rounded-2xl border bg-white p-5 text-center md:flex md:flex-col md:items-center"
            >
              <span className="relative mx-auto flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.45_0.19_264)] text-2xl font-bold text-white shadow-[0_10px_24px_oklch(0.546_0.215_262.88/0.35)]">
                {isActive && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full border-2 border-primary"
                    initial={{ opacity: 0.7, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.6 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                {i + 1}
              </span>
              <motion.span
                className="mx-auto mt-3 flex size-9 items-center justify-center rounded-lg"
                animate={{ backgroundColor: isActive ? "var(--primary)" : "color-mix(in oklab, var(--primary) 10%, transparent)", color: isActive ? "#ffffff" : "var(--primary)" }}
                transition={{ duration: 0.3 }}
              >
                {s.icon}
              </motion.span>
              <p className="mt-3 text-base font-semibold tracking-tight text-foreground">{s.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
            </motion.div>

            {i < steps.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: i * 0.15 + 0.2 }}
                className="relative hidden shrink-0 text-primary/40 md:flex md:items-center md:justify-center"
              >
                <ArrowRight className="size-6" aria-hidden />
                {isActive && (
                  <motion.span
                    aria-hidden
                    className="absolute left-0 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-primary"
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ x: 24, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: CYCLE_MS / 1000, ease: "easeInOut" }}
                  />
                )}
              </motion.span>
            )}
          </div>
        )
      })}
    </div>
  )
}
