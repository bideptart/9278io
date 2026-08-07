"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  ConciergeBell,
  HeartPulse,
  Headset,
  Check,
  Mic,
  BookOpen,
  Sparkles,
  PhoneIncoming,
  Rocket,
} from "lucide-react"

const STEPS = [
  {
    label: "Pick a template",
    detail: "Receptionist, Healthcare, Transport, Support, or Blank",
    tone: "#2563EB",
  },
  {
    label: "Customize the details",
    detail: "Greeting, voice, and knowledge — already pre-filled",
    tone: "#7C3AED",
  },
  {
    label: "Launch instantly",
    detail: "Your agent is live and answering calls",
    tone: "#10B981",
  },
]

const STEP_MS = 2600

const CONFIG_ROWS = [
  { label: "Greeting script", icon: Mic },
  { label: "Voice & language", icon: Sparkles },
  { label: "Knowledge base", icon: BookOpen },
]

function PickPanel({ tone }: { tone: string }) {
  const chips = [
    { icon: ConciergeBell, name: "Receptionist", selected: true },
    { icon: HeartPulse, name: "Healthcare", selected: false },
    { icon: Headset, name: "Support", selected: false },
  ]
  return (
    <div className="grid grid-cols-3 gap-3 p-5">
      {chips.map((c, i) => {
        const Icon = c.icon
        return (
          <motion.div
            key={c.name}
            className="relative flex flex-col items-center gap-2 rounded-xl border p-3.5 text-center"
            style={{ borderColor: c.selected ? tone : "#EEF2F7", backgroundColor: c.selected ? `${tone}0F` : "#F7F9FC" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, scale: c.selected ? 1.04 : 1 }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.08 }}
          >
            {c.selected && (
              <motion.span
                className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: tone }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.45, type: "spring", stiffness: 500, damping: 20 }}
              >
                <Check className="size-3" aria-hidden />
              </motion.span>
            )}
            <Icon className="size-5" style={{ color: c.selected ? tone : "#94A3B8" }} aria-hidden />
            <span className="text-[11px] font-semibold" style={{ color: c.selected ? "#0F172A" : "#94A3B8" }}>
              {c.name}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}

function CustomizePanel({ tone }: { tone: string }) {
  return (
    <div className="flex flex-col gap-2.5 p-5">
      {CONFIG_ROWS.map((row, i) => {
        const Icon = row.icon
        return (
          <motion.div
            key={row.label}
            className="flex items-center gap-3 rounded-xl border border-border/60 bg-[#F7F9FC] px-3.5 py-2.5"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.15 }}
          >
            <Icon className="size-4 shrink-0" style={{ color: tone }} aria-hidden />
            <span className="flex-1 text-xs font-semibold text-foreground">{row.label}</span>
            <motion.span
              className="flex size-5 items-center justify-center rounded-full"
              style={{ backgroundColor: `${tone}18` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + i * 0.15, type: "spring", stiffness: 500, damping: 20 }}
            >
              <Check className="size-3" style={{ color: tone }} aria-hidden />
            </motion.span>
          </motion.div>
        )
      })}
    </div>
  )
}

function LaunchPanel({ tone }: { tone: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-8">
      <div className="relative flex size-16 items-center justify-center rounded-full" style={{ backgroundColor: `${tone}18` }}>
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ border: `1.5px solid ${tone}` }}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 1.8 }}
          transition={{ duration: 1.3, repeat: Infinity, ease: "easeOut" }}
        />
        <PhoneIncoming className="size-7" style={{ color: tone }} aria-hidden />
      </div>
      <motion.span
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
        style={{ backgroundColor: `${tone}14`, color: tone }}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <Rocket className="size-3" aria-hidden />
        Agent is live
      </motion.span>
      <div className="flex items-end gap-1">
        {[6, 12, 8, 16, 10].map((h, i) => (
          <motion.span
            key={i}
            className="w-1 rounded-full"
            style={{ backgroundColor: tone }}
            animate={{ height: [h * 0.4, h, h * 0.4] }}
            transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  )
}

export function TemplateLaunchFlow() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % STEPS.length), STEP_MS)
    return () => clearInterval(id)
  }, [paused])

  return (
    <div
      className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* numbered step list */}
      <div className="flex flex-col gap-2">
        {STEPS.map((step, i) => {
          const isActive = active === i
          return (
            <button
              key={step.label}
              type="button"
              onClick={() => setActive(i)}
              className="relative flex items-start gap-3.5 overflow-hidden rounded-xl border p-4 text-left transition-colors"
              style={{
                borderColor: isActive ? step.tone : "var(--border)",
                backgroundColor: isActive ? `${step.tone}0A` : "white",
              }}
            >
              <span
                className="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  backgroundColor: isActive ? step.tone : "#EEF2F7",
                  color: isActive ? "white" : "#94A3B8",
                }}
              >
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold" style={{ color: isActive ? "#0F172A" : "#475569" }}>
                  {step.label}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{step.detail}</span>
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden bg-transparent" aria-hidden>
                  <motion.span
                    key={paused ? `${i}-paused` : i}
                    className="block h-full"
                    style={{ backgroundColor: step.tone }}
                    initial={{ width: "0%" }}
                    animate={{ width: paused ? "0%" : "100%" }}
                    transition={{ duration: paused ? 0 : STEP_MS / 1000, ease: "linear" }}
                  />
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* live mockup panel — content changes per step */}
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <div className="flex items-center gap-1.5 border-b border-border/60 px-4 py-2.5">
          <span className="size-2 rounded-full bg-[#F87171]" />
          <span className="size-2 rounded-full bg-[#FBBF24]" />
          <span className="size-2 rounded-full bg-[#34D399]" />
        </div>
        <div className="h-[210px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {active === 0 && <PickPanel tone={STEPS[0].tone} />}
              {active === 1 && <CustomizePanel tone={STEPS[1].tone} />}
              {active === 2 && <LaunchPanel tone={STEPS[2].tone} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
