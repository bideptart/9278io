"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"

const STEPS = [
  { time: "0:00", label: "You dial the real number", tone: "#2563EB" },
  { time: "0:02", label: "Agent answers with the live greeting", tone: "#7C3AED" },
  { time: "0:14", label: "You ask a real caller question", tone: "#10B981" },
  { time: "0:21", label: "You confirm the answer and routing", tone: "#D97706" },
  { time: "0:26", label: "Approve — it's ready for real callers", tone: "#0F172A" },
]

const STEP_MS = 1500
const CYCLE_MS = STEPS.length * STEP_MS + 1400

export function LiveTestCallTimeline() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = []
    function run() {
      setActive(0)
      STEPS.forEach((_, i) => {
        timers.push(setTimeout(() => setActive(i + 1), (i + 1) * STEP_MS))
      })
      timers.push(setTimeout(run, CYCLE_MS))
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="mx-auto mt-12 w-full max-w-2xl">
      <div className="relative pl-8">
        <div className="absolute left-[9px] top-1 bottom-1 w-px bg-border" aria-hidden />
        <motion.div
          className="absolute left-[9px] top-1 w-px origin-top"
          style={{ backgroundColor: "#2563EB" }}
          animate={{ height: `${(Math.max(active - 1, 0) / (STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          aria-hidden
        />
        <div className="space-y-7">
          {STEPS.map((step, i) => {
            const done = active > i
            return (
              <div key={step.label} className="relative flex items-start gap-4">
                <motion.span
                  className="absolute -left-8 top-0.5 flex size-[19px] items-center justify-center rounded-full"
                  animate={{ backgroundColor: done ? step.tone : "#E9ECF3", scale: active === i + 1 ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {done && (
                    <svg viewBox="0 0 16 16" className="size-2.5" fill="none">
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
                <div className="flex w-full items-baseline justify-between gap-4">
                  <motion.p
                    className="text-sm font-medium"
                    animate={{ color: done ? "#0F172A" : "#94A3B8" }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.label}
                  </motion.p>
                  <motion.span
                    className="shrink-0 font-mono text-xs"
                    animate={{ color: done ? step.tone : "#CBD5E1" }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.time}
                  </motion.span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
