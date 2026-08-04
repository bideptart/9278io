"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Type, Palette, MessageCircle, Bot } from "lucide-react"

const STEP_MS = 1400
const TOTAL_STEPS = 3

const steps = [
  { icon: Type, label: "Name it", tone: "#2563EB" },
  { icon: Palette, label: "Pick an avatar", tone: "#7C3AED" },
  { icon: MessageCircle, label: "Write the greeting", tone: "#D97706" },
]

export function IdentityWizard() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % (TOTAL_STEPS + 1)), STEP_MS)
    return () => clearInterval(id)
  }, [])

  const current = steps[Math.min(step, TOTAL_STEPS - 1)]

  return (
    <div className="mx-auto mt-10 flex w-full max-w-lg flex-col items-center">
      {/* stepper */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2">
            <motion.span
              className="flex size-9 items-center justify-center rounded-full"
              animate={{
                backgroundColor: step > i ? s.tone : step === i ? `${s.tone}1A` : "#F1F5F9",
                color: step > i ? "#FFFFFF" : step === i ? s.tone : "#94A3B8",
                scale: step === i ? 1.12 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <s.icon className="size-4" aria-hidden />
            </motion.span>
            {i < steps.length - 1 && (
              <motion.span
                className="h-[2px] w-10 rounded-full sm:w-16"
                animate={{ backgroundColor: step > i ? s.tone : "#EEF2FA" }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-6 text-xs font-medium sm:gap-9">
        {steps.map((s, i) => (
          <motion.span key={s.label} animate={{ color: step === i ? s.tone : "#94A3B8" }} transition={{ duration: 0.3 }}>
            {s.label}
          </motion.span>
        ))}
      </div>

      {/* the card, building up field by field */}
      <motion.div
        className="relative mt-6 w-full overflow-hidden rounded-2xl bg-white p-5"
        animate={{ borderColor: current.tone }}
        style={{ border: "1.5px solid" }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <motion.span
            className="flex size-11 shrink-0 items-center justify-center rounded-xl text-white"
            animate={{ backgroundColor: step >= 1 ? steps[1].tone : "#E4ECFF", color: step >= 1 ? "#FFFFFF" : "#CBD5E1" }}
            transition={{ duration: 0.3 }}
          >
            <Bot className="size-5" aria-hidden />
          </motion.span>
          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              {step >= 1 ? (
                <motion.p
                  key="named"
                  className="truncate text-sm font-bold"
                  style={{ color: "#0F172A" }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Front Desk Agent
                </motion.p>
              ) : (
                <motion.span className="block h-4 w-28 rounded" style={{ backgroundColor: "#EEF2FA" }} />
              )}
            </AnimatePresence>
            <span className="text-xs" style={{ color: "#94A3B8" }}>Voice agent</span>
          </div>
        </div>

        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              className="mt-3.5 rounded-xl px-3.5 py-3"
              style={{ backgroundColor: "#F7F9FC", border: "1px solid #E4ECFF" }}
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 14 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-sm italic leading-relaxed" style={{ color: "#334155" }}>
                "Hi, thanks for calling — how can I help today?"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
