"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Check } from "lucide-react"

const STEPS = [
  { time: "0:00", label: "You dial the real number", detail: "Same number a real caller would dial", status: "Dialing…", tone: "#2563EB" },
  { time: "0:02", label: "Agent answers with the live greeting", detail: "Exact voice and greeting your callers hear", status: "Connecting…", tone: "#7C3AED" },
  { time: "0:14", label: "You ask a real caller question", detail: "Test it the way a customer actually would", status: "Listening…", tone: "#10B981" },
  { time: "0:21", label: "You confirm the answer and routing", detail: "Verify the response, transfer, and fallback logic", status: "Verifying…", tone: "#D97706" },
  { time: "0:26", label: "Approve — it's ready for real callers", detail: "One call, and you know it's production-ready", status: "Approved", tone: "#0F172A" },
]

const STEP_MS = 700
const HOLD_MS = 900
const CYCLE_MS = STEPS.length * STEP_MS + HOLD_MS

export function LiveTestCallTimeline() {
  const [active, setActive] = useState(0)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = []
    function run() {
      setActive(0)
      setShowBanner(false)
      STEPS.forEach((_, i) => {
        timers.push(setTimeout(() => setActive(i + 1), (i + 1) * STEP_MS))
      })
      timers.push(setTimeout(() => setShowBanner(true), STEPS.length * STEP_MS + 150))
      timers.push(setTimeout(run, CYCLE_MS))
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [])

  const currentStep = active > 0 && active <= STEPS.length ? STEPS[active - 1] : STEPS[0]

  return (
    <div className="mx-auto mt-6 w-full max-w-3xl">
      {/* live status caption — changes as each step fires */}
      <div className="mb-5 flex h-6 items-center justify-center gap-2.5">
        <motion.span
          className="size-2 rounded-full"
          style={{ backgroundColor: active > 0 ? currentStep.tone : "#94A3B8" }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <AnimatePresence mode="wait">
          <motion.p
            key={currentStep.status}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
          >
            {currentStep.status}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="relative pl-10">
        <div className="absolute left-3 top-1 bottom-1 w-px bg-border" aria-hidden />
        <motion.div
          className="absolute left-3 top-1 w-px origin-top"
          style={{ backgroundColor: "#2563EB" }}
          animate={{ height: `${(Math.max(active - 1, 0) / (STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          aria-hidden
        />
        <div className="space-y-5">
          {STEPS.map((step, i) => {
            const done = active > i
            const isCurrent = active === i + 1
            return (
              <div key={step.label} className="relative flex items-start gap-4">
                <span className="absolute -left-10 top-0.5 flex size-6 items-center justify-center">
                  {isCurrent && (
                    <motion.span
                      className="absolute inset-0 rounded-full"
                      style={{ border: `1.5px solid ${step.tone}` }}
                      initial={{ opacity: 0.6, scale: 1 }}
                      animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.5, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                      aria-hidden
                    />
                  )}
                  <motion.span
                    className="flex size-6 items-center justify-center rounded-full"
                    animate={{ backgroundColor: done ? step.tone : "#E9ECF3", scale: isCurrent ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {done && (
                      <svg viewBox="0 0 16 16" className="size-3.5" fill="none">
                        <motion.path
                          d="M3 8.5L6.2 11.5L13 4.5"
                          stroke="white"
                          strokeWidth={2.4}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </svg>
                    )}
                  </motion.span>
                </span>
                <div className="w-full">
                  <div className="flex items-baseline justify-between gap-4">
                    <motion.p
                      className="text-base font-semibold"
                      animate={{ color: done ? "#0F172A" : "#94A3B8" }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.label}
                    </motion.p>
                    <motion.span
                      className="shrink-0 font-mono text-sm"
                      animate={{ color: done ? step.tone : "#CBD5E1" }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.time}
                    </motion.span>
                  </div>
                  <motion.p
                    className="mt-1 text-sm leading-relaxed"
                    animate={{ color: done ? "#667085" : "#CBD5E1" }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.detail}
                  </motion.p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* completion banner — height is always reserved so it never shifts the layout */}
      <div className="mt-4 flex h-12 items-center justify-center">
        <motion.div
          className="inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-base font-semibold"
          style={{ backgroundColor: "#EEF2FF", color: "#2563EB" }}
          animate={{ opacity: showBanner ? 1 : 0, y: showBanner ? 0 : 8 }}
          transition={{ duration: 0.3 }}
        >
          <Check className="size-5" aria-hidden />
          Approved in 26 seconds — ready for real callers
        </motion.div>
      </div>
    </div>
  )
}
