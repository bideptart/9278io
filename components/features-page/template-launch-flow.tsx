"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { LayoutTemplate, SlidersHorizontal, Rocket } from "lucide-react"

const STEPS = [
  { label: "Pick a template", detail: "Receptionist, Healthcare, Transport, Support, or Blank", icon: LayoutTemplate, tone: "#2563EB" },
  { label: "Customize the details", detail: "Greeting, voice, and knowledge — already pre-filled", icon: SlidersHorizontal, tone: "#7C3AED" },
  { label: "Launch instantly", detail: "Your agent is live and answering calls", icon: Rocket, tone: "#10B981" },
]

const STEP_MS = 900
const HOLD_MS = 1800

export function TemplateLaunchFlow() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = []
    function run() {
      setActive(0)
      STEPS.forEach((_, i) => {
        timers.push(setTimeout(() => setActive(i + 1), (i + 1) * STEP_MS))
      })
      timers.push(setTimeout(run, STEPS.length * STEP_MS + HOLD_MS))
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="relative mx-auto mt-14 w-full max-w-3xl">
      <div className="absolute left-0 right-0 top-6 hidden h-px sm:block" style={{ backgroundColor: "#E9ECF3" }} aria-hidden />
      <div className="pointer-events-none absolute left-6 right-6 top-6 hidden h-px overflow-hidden sm:block" aria-hidden>
        <motion.div
          className="h-full"
          style={{ background: "linear-gradient(90deg, #2563EB, #7C3AED, #10B981)" }}
          animate={{ width: `${(Math.max(active - 1, 0) / (STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
        {STEPS.map((step, i) => {
          const Icon = step.icon
          const isDone = active > i
          return (
            <div key={step.label} className="flex items-center gap-4 sm:flex-col sm:items-center sm:gap-3 sm:text-center">
              <motion.span
                className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full text-white"
                animate={{ backgroundColor: isDone ? step.tone : "#E9ECF3", scale: active === i + 1 ? [1, 1.15, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Icon className="size-5" style={{ color: isDone ? "white" : "#94A3B8" }} aria-hidden />
              </motion.span>
              <div>
                <motion.p
                  className="text-sm font-semibold"
                  animate={{ color: isDone ? "#0F172A" : "#94A3B8" }}
                  transition={{ duration: 0.3 }}
                >
                  {step.label}
                </motion.p>
                <motion.p
                  className="mt-0.5 text-xs"
                  animate={{ color: isDone ? step.tone : "#CBD5E1" }}
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
  )
}
