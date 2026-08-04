"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { LogIn, Loader2, LayoutDashboard } from "lucide-react"

const STAGE_MS = 1300

const stages = [
  { icon: LogIn, label: "You log in", tone: "#2563EB" },
  { icon: Loader2, label: "Data loads instantly", tone: "#7C3AED" },
  { icon: LayoutDashboard, label: "Your overview is ready", tone: "#10B981" },
]

export function DashboardBootSequence() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setStage((s) => (s + 1) % stages.length), STAGE_MS)
    return () => clearInterval(id)
  }, [])

  const current = stages[stage]
  const Icon = current.icon

  return (
    <div className="mx-auto mt-10 flex w-full max-w-lg flex-col items-center">
      <div className="flex items-center gap-2">
        {stages.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2">
            <motion.span
              className="flex size-9 items-center justify-center rounded-full"
              animate={{
                backgroundColor: i <= stage ? s.tone : "#F1F5F9",
                color: i <= stage ? "#FFFFFF" : "#94A3B8",
                scale: i === stage ? 1.12 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <s.icon className={i === stage && i === 1 ? "size-4 animate-spin" : "size-4"} aria-hidden />
            </motion.span>
            {i < stages.length - 1 && (
              <motion.span
                className="h-[2px] w-10 rounded-full sm:w-16"
                animate={{ backgroundColor: i < stage ? s.tone : "#EEF2FA" }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-6 text-xs font-medium sm:gap-9">
        {stages.map((s, i) => (
          <motion.span key={s.label} animate={{ color: i === stage ? s.tone : "#94A3B8" }} transition={{ duration: 0.3 }}>
            {s.label}
          </motion.span>
        ))}
      </div>

      {/* the "screen" reveal */}
      <motion.div
        className="relative mt-6 h-32 w-full overflow-hidden rounded-2xl"
        animate={{ borderColor: current.tone }}
        style={{ border: "1.5px solid", backgroundColor: "#FAFBFF" }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {stage < 2 ? (
            <motion.div
              key="skeleton"
              className="absolute inset-0 flex flex-col gap-2 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {[0, 1, 2].map((row) => (
                <motion.span
                  key={row}
                  className="h-4 rounded-md"
                  style={{ backgroundColor: "#E4ECFF", width: `${80 - row * 15}%` }}
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: row * 0.15 }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="ready"
              className="absolute inset-0 flex items-center justify-center gap-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, type: "spring", stiffness: 260, damping: 18 }}
            >
              <Icon className="size-5" style={{ color: current.tone }} aria-hidden />
              <span className="text-sm font-bold" style={{ color: "#0F172A" }}>Overview ready</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
