"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check } from "lucide-react"

const CHECKS = [
  "Voice and tone sound right",
  "Responses match your business info",
  "Transfers route to the correct number",
  "Booking confirmations go out correctly",
]

const STEP_DURATION = 900
const HOLD_DURATION = 2200

/**
 * "Why it matters" as an animated go-live readiness checklist — items tick
 * off one by one with a progress bar filling alongside, then reset and
 * loop. A checklist/progress metaphor, distinct from the comparison panel,
 * search race, activity feed, and stat bands used for "why it matters"
 * elsewhere on the site.
 */
export function GoLiveChecklist() {
  const [checked, setChecked] = useState(0)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    setChecked(0)
    let i = 0
    const interval = setInterval(() => {
      i += 1
      setChecked(i)
      if (i >= CHECKS.length) {
        clearInterval(interval)
        setTimeout(() => setCycle((c) => c + 1), HOLD_DURATION)
      }
    }, STEP_DURATION)
    return () => clearInterval(interval)
  }, [cycle])

  const pct = (checked / CHECKS.length) * 100
  const allDone = checked >= CHECKS.length

  return (
    <div className="relative mx-auto mt-8 max-w-xl">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-emerald-500/10 blur-2xl"
        animate={{ opacity: allDone ? [0.4, 0.75, 0.4] : [0.15, 0.3, 0.15] }}
        transition={{ duration: allDone ? 1.6 : 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        animate={allDone ? { scale: [1, 1.015, 1] } : {}}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="rounded-3xl border border-border/60 bg-white p-6 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.2)] sm:p-8"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold tracking-tight text-foreground">Ready to go live?</p>
          <motion.span
            key={checked}
            initial={{ scale: 1.3, color: "oklch(0.72 0.18 155)" }}
            animate={{ scale: 1, color: "oklch(0.55 0.02 260)" }}
            transition={{ duration: 0.4 }}
            className="font-mono text-xs"
          >
            {checked}/{CHECKS.length}
          </motion.span>
        </div>

        <div className="relative mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-500"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          {pct > 0 && (
            <motion.span
              aria-hidden
              className="absolute top-0 h-full w-4 bg-white/40 blur-[2px]"
              animate={{ left: [`${Math.max(0, pct - 12)}%`, `${pct}%`] }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          )}
        </div>

        <div className="mt-5 space-y-1">
          {CHECKS.map((label, i) => {
            const done = i < checked
            return (
              <motion.div
                key={label}
                animate={{ backgroundColor: done ? "oklch(0.97 0.03 155)" : "oklch(1 0 0)" }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 rounded-lg px-2.5 py-2"
              >
                <span
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                    done ? "border-emerald-500 bg-emerald-500 text-white" : "border-border text-transparent"
                  }`}
                >
                  <AnimatePresence>
                    {done && (
                      <motion.span
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 18 }}
                      >
                        <Check className="size-3" aria-hidden />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <span className={`text-xs sm:text-sm ${done ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
              </motion.div>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          {allDone && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5 text-xs font-semibold text-emerald-600"
            >
              <motion.span animate={{ rotate: [0, 12, -12, 0] }} transition={{ duration: 0.6, delay: 0.2 }}>
                <Check className="size-4" aria-hidden />
              </motion.span>
              All checks passed — safe to go live.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
