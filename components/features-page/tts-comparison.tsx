"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { Check, X } from "lucide-react"

// Both cards share one inView state (instead of each tracking its own
// viewport intersection) so they always slide in at the exact same instant —
// two independent IntersectionObservers could fire a frame apart and read
// as one card "pausing" before the other shifts.
const winCardVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, staggerChildren: 0.08, delayChildren: 0.15 } },
}
const loseCardVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, staggerChildren: 0.08, delayChildren: 0.15 } },
}
const winItemVariants = { hidden: { opacity: 0, x: 12 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4 } } }
const loseItemVariants = { hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4 } } }

const winPoints = [
  "Native audio in and out",
  "Natural turn-taking, no talk-overs",
  "Sub-second response latency",
  "Ten named voices, 10+ Indian languages",
]

const losePoints = [
  "Text converted to speech on the fly",
  "Robotic cadence, awkward pauses",
  "Noticeable lag before responding",
  "One generic voice for every business",
]

export function TtsComparison() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: false, amount: 0.3 })
  const state = inView ? "visible" : "hidden"

  return (
    <div ref={containerRef} className="relative mx-auto mt-10 grid max-w-4xl gap-12 sm:grid-cols-2">
      <motion.span
        className="absolute left-1/2 top-1/2 z-10 hidden size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xs font-bold sm:flex"
        style={{ border: "1px solid #E4ECFF", color: "#94A3B8" }}
        animate={{ boxShadow: ["0 6px 16px rgba(15,23,42,0.08)", "0 6px 20px rgba(37,99,235,0.35)", "0 6px 16px rgba(15,23,42,0.08)"] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        VS
      </motion.span>

      <motion.div
        variants={winCardVariants}
        initial="hidden"
        animate={state}
        whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
        className="relative h-full rounded-2xl border-2 bg-white p-7 md:p-8"
        style={{ borderColor: "#2563EB" }}
      >
        <motion.div
          className="absolute inset-0 -z-10 rounded-2xl"
          animate={{ boxShadow: ["0 16px 34px -24px rgba(37,99,235,0.4)", "0 20px 44px -20px rgba(37,99,235,0.55)", "0 16px 34px -24px rgba(37,99,235,0.4)"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-full" style={{ backgroundColor: "#2563EB" }}>
            <Check className="size-3.5 text-white" aria-hidden />
          </span>
          <p className="text-sm font-semibold" style={{ color: "#2563EB" }}>9278.io</p>
        </div>
        <ul className="mt-4 flex flex-col gap-3 text-sm">
          {winPoints.map((t) => (
            <motion.li key={t} className="flex items-start gap-2" variants={winItemVariants}>
              <Check className="mt-0.5 size-4 shrink-0" style={{ color: "#2563EB" }} aria-hidden />
              {t}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        variants={loseCardVariants}
        initial="hidden"
        animate={state}
        className="relative h-full rounded-2xl border-2 bg-muted/30 p-7 md:p-8"
        style={{ borderColor: "#2563EB" }}
      >
        <motion.div
          className="absolute inset-0 -z-10 rounded-2xl"
          animate={{ boxShadow: ["0 16px 34px -24px rgba(15,23,42,0.15)", "0 20px 44px -20px rgba(15,23,42,0.25)", "0 16px 34px -24px rgba(15,23,42,0.15)"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-full bg-border">
            <X className="size-3.5 text-muted-foreground" aria-hidden />
          </span>
          <p className="text-sm font-semibold text-muted-foreground">Typical text-to-speech</p>
        </div>
        <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
          {losePoints.map((t) => (
            <motion.li key={t} className="flex items-start gap-2" variants={loseItemVariants}>
              <X className="mt-0.5 size-4 shrink-0" aria-hidden />
              {t}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}
