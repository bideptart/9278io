"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { PhoneIncoming, Tags, Send, Bot, Voicemail, LifeBuoy, Check } from "lucide-react"

const STEP_MS = 750
const HOLD_MS = 1500
const CYCLE_MS = STEP_MS * 3 + HOLD_MS

const destinations = [
  { icon: Bot, label: "Right agent", reason: "Matched by intent", tone: "#2563EB" },
  { icon: Voicemail, label: "Voicemail", reason: "Matched by time of day", tone: "#7C3AED" },
  { icon: LifeBuoy, label: "Fallback", reason: "Nothing else matched", tone: "#D97706" },
]

const checkpoints = [
  { icon: PhoneIncoming, label: "Received" },
  { icon: Tags, label: "Classified" },
  { icon: Send, label: "Routed" },
]

export function CallRoutingDecisionTree() {
  const [active, setActive] = useState(0)
  const [step, setStep] = useState(0)

  useEffect(() => {
    setStep(0)
    const timers = [1, 2, 3].map((n) => setTimeout(() => setStep(n), n * STEP_MS))
    const cycle = setTimeout(() => setActive((a) => (a + 1) % destinations.length), CYCLE_MS)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(cycle)
    }
  }, [active])

  const current = destinations[active]
  const matched = step >= 3

  return (
    <div className="relative mx-auto mt-14 w-full max-w-3xl">
      {/* gradient glow ring — the ticket sits inside a thin gradient border */}
      <motion.div
        className="relative rounded-[27px] p-[2px]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        animate={{
          background: `linear-gradient(135deg, ${current.tone}, ${current.tone}55, ${current.tone})`,
          boxShadow: `0 40px 80px -34px rgba(15,23,42,0.24), 0 0 32px 2px ${current.tone}55`,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
      <div className="relative flex overflow-visible rounded-3xl bg-white">
        {/* stub */}
        <div
          className="relative flex w-20 shrink-0 flex-col items-center justify-center gap-2 border-r border-dashed py-6 sm:w-28 sm:gap-3 sm:py-8 md:w-36 md:py-10"
          style={{ borderColor: "#DCE3F5" }}
        >
          <span aria-hidden className="absolute -top-3 left-1/2 size-6 -translate-x-1/2 rounded-full bg-background" style={{ boxShadow: "inset 0 0 0 1px #E4ECFF" }} />
          <span aria-hidden className="absolute -bottom-3 left-1/2 size-6 -translate-x-1/2 rounded-full bg-background" style={{ boxShadow: "inset 0 0 0 1px #E4ECFF" }} />
          <motion.span
            className="relative flex size-11 items-center justify-center rounded-full text-white sm:size-14 md:size-16"
            animate={{ scale: [1, 1.08, 1], background: `linear-gradient(135deg, ${current.tone}, ${current.tone}CC)` }}
            transition={{ scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }, background: { duration: 0.4 } }}
          >
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full"
              animate={{ scale: [1, 1.6], opacity: [0.5, 0], borderColor: current.tone }}
              style={{ borderWidth: 1.5, borderStyle: "solid" }}
              transition={{ scale: { duration: 1.6, repeat: Infinity, ease: "easeOut" }, opacity: { duration: 1.6, repeat: Infinity, ease: "easeOut" }, borderColor: { duration: 0.4 } }}
            />
            <PhoneIncoming className="size-5 sm:size-6 md:size-7" aria-hidden />
          </motion.span>
          <span className="text-center text-[10px] font-semibold uppercase tracking-wide sm:text-xs" style={{ color: "#94A3B8" }}>
            Incoming
          </span>
        </div>

        {/* main: checkpoints + result */}
        <div className="relative min-w-0 flex-1 px-3 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10">
          <div className="flex items-center justify-between">
            {checkpoints.map((c, i) => {
              const Icon = c.icon
              const done = step > i
              const isCurrent = step === i
              return (
                <div key={c.label} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-2">
                    <motion.span
                      className="relative flex size-9 items-center justify-center rounded-full sm:size-10 md:size-12"
                      animate={{
                        backgroundColor: done ? current.tone : isCurrent ? `${current.tone}1A` : "#F1F5F9",
                        color: done ? "#FFFFFF" : isCurrent ? current.tone : "#94A3B8",
                        scale: isCurrent ? 1.12 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {done ? <Check className="size-4 sm:size-5" aria-hidden /> : <Icon className="size-4 sm:size-5" aria-hidden />}
                    </motion.span>
                    <motion.span
                      className="text-[11px] font-semibold sm:text-sm"
                      animate={{ color: done || isCurrent ? "#0F172A" : "#94A3B8" }}
                      transition={{ duration: 0.3 }}
                    >
                      {c.label}
                    </motion.span>
                  </div>
                  {i < checkpoints.length - 1 && (
                    <motion.span
                      className="mx-1.5 h-[3px] flex-1 rounded-full sm:mx-3"
                      animate={{ backgroundColor: step > i ? current.tone : "#EEF2FA" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <motion.span
              className="flex size-14 shrink-0 items-center justify-center rounded-2xl text-white"
              animate={{ background: `linear-gradient(135deg, ${current.tone}, ${current.tone}CC)`, opacity: matched ? 1 : 0.35 }}
              transition={{ duration: 0.3 }}
            >
              <current.icon className="size-6" aria-hidden />
            </motion.span>
            <div className="min-w-0">
              <motion.p className="text-xl font-bold" animate={{ opacity: matched ? 1 : 0.35 }} style={{ color: "#0F172A" }}>
                {current.label}
              </motion.p>
              <motion.p className="text-sm" animate={{ opacity: matched ? 1 : 0.35 }} style={{ color: "#94A3B8" }}>
                {current.reason}
              </motion.p>
            </div>
          </div>
        </div>

        {/* the stamp */}
        <AnimatePresence>
          {matched && (
            <motion.div
              key={`stamp-${active}`}
              className="pointer-events-none absolute right-3 top-3 select-none rounded-xl px-2.5 py-1 text-xs font-extrabold uppercase tracking-widest sm:right-8 sm:top-6 sm:px-4 sm:py-1.5 sm:text-sm"
              style={{ border: `2.5px solid ${current.tone}`, color: current.tone }}
              initial={{ opacity: 0, scale: 1.8, rotate: -18 }}
              animate={{ opacity: 0.9, scale: 1, rotate: -10 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            >
              Matched
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </motion.div>

      {/* dots for the 3 destinations this demo cycles through */}
      <div className="mt-5 flex justify-center gap-1.5" aria-hidden>
        {destinations.map((d, i) => (
          <span
            key={d.label}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{ width: i === active ? "18px" : "6px", backgroundColor: i === active ? current.tone : "#E4ECFF" }}
          />
        ))}
      </div>
    </div>
  )
}
