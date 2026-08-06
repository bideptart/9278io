"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { MessageSquareText, Clock3, ShieldAlert, ArrowRight, Bot, Voicemail, LifeBuoy } from "lucide-react"

const CYCLE_MS = 1400

const rules = [
  {
    conditionIcon: MessageSquareText,
    condition: "Caller says \"billing\" or \"refund\"",
    resultIcon: Bot,
    result: "Billing Agent",
    tone: "#2563EB",
  },
  {
    conditionIcon: Clock3,
    condition: "Call comes in after 7 PM",
    resultIcon: Voicemail,
    result: "After-hours voicemail",
    tone: "#7C3AED",
  },
  {
    conditionIcon: ShieldAlert,
    condition: "Nothing else matches",
    resultIcon: LifeBuoy,
    result: "Front desk fallback",
    tone: "#D97706",
  },
]

export function RoutingRuleChips() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % rules.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [paused])

  return (
    <div
      className="mx-auto mt-10 flex w-full max-w-4xl flex-col gap-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {rules.map((r, i) => {
        const ConditionIcon = r.conditionIcon
        const ResultIcon = r.resultIcon
        const isActive = i === active
        return (
          <motion.div
            key={r.condition}
            className="relative flex items-center gap-3 overflow-hidden rounded-2xl border-[1.5px] px-4 py-3.5 sm:gap-4 sm:px-5"
            animate={{
              borderColor: isActive ? r.tone : "#E4ECFF",
              backgroundColor: isActive ? `${r.tone}0A` : "#FFFFFF",
              boxShadow: isActive ? `0 16px 32px -20px ${r.tone}66` : "0 1px 2px rgba(15,23,42,0.04)",
              scale: isActive ? 1.015 : 1,
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {/* rule-number chip */}
            <span
              className="flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold"
              style={{ backgroundColor: isActive ? r.tone : "#F1F5F9", color: isActive ? "#FFFFFF" : "#94A3B8" }}
            >
              {i + 1}
            </span>

            {/* IF condition */}
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: isActive ? `${r.tone}1A` : "#F1F5F9", color: isActive ? r.tone : "#94A3B8" }}
              >
                If
              </span>
              <ConditionIcon className="size-4 shrink-0" style={{ color: isActive ? r.tone : "#94A3B8" }} aria-hidden />
              <span className="truncate text-sm font-medium" style={{ color: "#0F172A" }}>
                {r.condition}
              </span>
            </div>

            <motion.div animate={{ x: isActive ? [0, 3, 0] : 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
              <ArrowRight className="size-4 shrink-0" style={{ color: isActive ? r.tone : "#CBD5E1" }} aria-hidden />
            </motion.div>

            {/* THEN result */}
            <div className="flex shrink-0 items-center gap-2">
              <span
                className="hidden rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider sm:inline"
                style={{ backgroundColor: isActive ? `${r.tone}1A` : "#F1F5F9", color: isActive ? r.tone : "#94A3B8" }}
              >
                Then
              </span>
              <span
                className="flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold text-white"
                style={{ backgroundColor: isActive ? r.tone : "#CBD5E1" }}
              >
                <ResultIcon className="size-3.5" aria-hidden />
                {r.result}
              </span>
            </div>

            {/* matched-call pulse, replays whenever this rule becomes active */}
            <AnimatePresence>
              {isActive && (
                <motion.span
                  key={`pulse-${r.condition}`}
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-1"
                  style={{ backgroundColor: r.tone }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  exit={{ scaleY: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
