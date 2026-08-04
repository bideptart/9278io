"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Pencil, LayoutDashboard, Smartphone, Users, Receipt } from "lucide-react"

const STEPS = [
  { label: "Change made", detail: "9 AM – 9 PM", icon: Pencil, tone: "#0F172A" },
  { label: "Dashboard", detail: "Overview updated", icon: LayoutDashboard, tone: "#2563EB" },
  { label: "Mobile app", detail: "Every device", icon: Smartphone, tone: "#7C3AED" },
  { label: "Team members", detail: "Everyone with access", icon: Users, tone: "#10B981" },
  { label: "Billing", detail: "Next invoice", icon: Receipt, tone: "#D97706" },
]

const STEP_MS = 700
const HOLD_MS = 1600
const RESET_MS = 500

export function AccountSettingsFlow() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = []

    function run() {
      setActive(0)
      STEPS.forEach((_, i) => {
        timers.push(setTimeout(() => setActive(i + 1), (i + 1) * STEP_MS))
      })
      timers.push(setTimeout(run, STEPS.length * STEP_MS + HOLD_MS + RESET_MS))
    }

    run()
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="relative mx-auto mt-14 w-full max-w-4xl">
      {/* base rail */}
      <div className="absolute left-0 right-0 top-6 hidden h-px sm:block" style={{ backgroundColor: "#E9ECF3" }} aria-hidden />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-5 sm:gap-4">
        {STEPS.map((step, i) => {
          const Icon = step.icon
          const isDone = active > i
          return (
            <div key={step.label} className="flex items-center gap-4 sm:flex-col sm:items-center sm:gap-3 sm:text-center">
              <div className="relative shrink-0">
                <motion.span
                  className="relative z-10 flex size-12 items-center justify-center rounded-full text-white"
                  animate={{
                    backgroundColor: isDone ? step.tone : "#E9ECF3",
                    scale: active === i + 1 ? [1, 1.15, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.svg viewBox="0 0 24 24" className="size-5" fill="none" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    {isDone ? (
                      <motion.path
                        d="M5 13l4 4L19 7"
                        stroke="white"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                    ) : (
                      <Icon />
                    )}
                  </motion.svg>
                </motion.span>
              </div>
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

      {/* animated rail fill, drawn under the row, segment by segment */}
      <div className="pointer-events-none absolute left-6 right-6 top-6 hidden h-px overflow-hidden sm:block" aria-hidden>
        <motion.div
          className="h-full"
          style={{ background: "linear-gradient(90deg, #0F172A, #2563EB, #7C3AED, #10B981, #D97706)" }}
          animate={{ width: `${(Math.max(active - 1, 0) / (STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
