"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, Check, MessageCircle, Mic, UserCheck, X } from "lucide-react"

type Mode = "without" | "with"

// Bespoke, topic-specific replacement for the generic before/after list rows
// — one card per behavior control, each with its own small animated scene
// (not shared text-only rows) that auto-toggles between the "without" and
// "with" state so the difference is shown, not just described.
const CARDS: {
  key: "greeting" | "interrupt" | "handoff"
  icon: typeof MessageCircle
  label: string
  tone: string
  withoutCaption: string
  withCaption: string
}[] = [
  {
    key: "greeting",
    icon: MessageCircle,
    label: "Opening greeting",
    tone: "#2563EB",
    withoutCaption: "Every agent opens with the same generic greeting",
    withCaption: "A custom greeting per agent, written by you",
  },
  {
    key: "interrupt",
    icon: Mic,
    label: "Mid-call interruptions",
    tone: "#10B981",
    withoutCaption: "Callers can't get a word in until the agent finishes talking",
    withCaption: "Callers can interrupt naturally, mid-sentence",
  },
  {
    key: "handoff",
    icon: UserCheck,
    label: "Handoff to a human",
    tone: "#7C3AED",
    withoutCaption: "No clear rule for when a call should reach a human",
    withCaption: "A clear, configurable trigger decides exactly when to hand off",
  },
]

const GREETINGS = [
  { name: "Sharma Reality", tone: "#2563EB", text: "Namaste! Welcome to Sharma Reality." },
  { name: "Support desk", tone: "#10B981", text: "Hey! Thanks for calling support." },
  { name: "Sales — Priya", tone: "#8B5CF6", text: "Hello, this is Priya from sales." },
]

const BARS = [0.5, 0.85, 0.4, 1, 0.6, 0.9, 0.45]

function GreetingScene({ mode }: { mode: Mode }) {
  return (
    <div className="relative flex h-[184px] items-center justify-center">
      <AnimatePresence mode="wait">
        {mode === "without" ? (
          <motion.div
            key="without"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="relative"
          >
            {[2, 1, 0].map((offset) => (
              <div
                key={offset}
                className="absolute left-0 top-0 flex w-[248px] items-center gap-2.5 rounded-2xl border border-border/60 bg-white px-3.5 py-3 text-[13px] text-muted-foreground shadow-[0_10px_24px_-16px_rgba(15,23,42,0.35)]"
                style={{ transform: `translate(${offset * 7}px, ${offset * 7}px)`, opacity: 1 - offset * 0.28, zIndex: 3 - offset }}
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-[11px] font-bold text-muted-foreground">A{offset + 1}</span>
                <span className="truncate">"Hi, thanks for calling."</span>
              </div>
            ))}
            <div className="h-[84px] w-[248px]" aria-hidden />
          </motion.div>
        ) : (
          <motion.div key="with" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="flex flex-col gap-2.5">
            {GREETINGS.map((g, i) => (
              <motion.div
                key={g.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: i * 0.1 }}
                className="flex w-[248px] items-center gap-2.5 rounded-2xl border bg-white px-3.5 py-2 text-[12px] shadow-[0_10px_24px_-16px_rgba(15,23,42,0.35)]"
                style={{ borderColor: `${g.tone}33` }}
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ backgroundColor: g.tone }}>
                  {g.name[0]}
                </span>
                <span className="truncate text-foreground">{g.text}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function InterruptScene({ mode }: { mode: Mode }) {
  return (
    <div className="relative flex h-[184px] flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Agent</span>
        <div className="flex h-8 items-end gap-1">
          {BARS.map((h, i) => (
            <motion.span
              key={i}
              className="w-1.5 rounded-full bg-primary"
              animate={{ scaleY: [0.4, h, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }}
              style={{ height: 32, transformOrigin: "bottom" }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Caller</span>
        <AnimatePresence mode="wait">
          {mode === "without" ? (
            <motion.div key="blocked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-8 items-center gap-1.5 rounded-full bg-red-50 px-3">
              <X className="size-3.5 text-red-500" aria-hidden />
              <span className="text-[11px] font-medium text-red-500">Muted until agent finishes</span>
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-8 items-end gap-1">
              {BARS.map((h, i) => (
                <motion.span
                  key={i}
                  className="w-1.5 rounded-full bg-emerald-500"
                  animate={{ scaleY: [0.4, h, 0.4] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: i * 0.07 }}
                  style={{ height: 32, transformOrigin: "bottom" }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function HandoffScene({ mode }: { mode: Mode }) {
  return (
    <div className="relative flex h-[184px] items-center justify-center">
      <AnimatePresence mode="wait">
        {mode === "without" ? (
          <motion.div key="without" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-3">
            <motion.span
              className="flex size-14 items-center justify-center rounded-full border-2 border-dashed text-2xl font-bold text-muted-foreground"
              style={{ borderColor: "#CBD5E1" }}
              animate={{ rotate: [0, -6, 6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              ?
            </motion.span>
            <span className="text-[12px] text-muted-foreground">No rule for handoff</span>
          </motion.div>
        ) : (
          <motion.div key="with" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex w-[248px] flex-col gap-2.5">
            <div className="rounded-xl border border-primary/20 bg-primary/[0.05] px-3.5 py-2.5 text-[12px] text-foreground">
              <span className="font-semibold text-primary">IF</span> caller asks for a human
            </div>
            <div className="flex items-center justify-center">
              <ArrowRight className="size-4 rotate-90 text-primary/50" aria-hidden />
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-[12px] font-medium text-emerald-700">
              <UserCheck className="size-4 shrink-0" aria-hidden />
              Hand off to a human, instantly
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const SCENES = {
  greeting: GreetingScene,
  interrupt: InterruptScene,
  handoff: HandoffScene,
} as const

const CYCLE_MS = 3200

function BehaviorCard({ card, offsetMs }: { card: (typeof CARDS)[number]; offsetMs: number }) {
  const [mode, setMode] = useState<Mode>("without")

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null
    const startTimeout = setTimeout(() => {
      setMode("with")
      intervalId = setInterval(() => setMode((m) => (m === "without" ? "with" : "without")), CYCLE_MS)
    }, CYCLE_MS + offsetMs)
    return () => {
      clearTimeout(startTimeout)
      if (intervalId) clearInterval(intervalId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const Scene = SCENES[card.key]
  const Icon = card.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px", amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="overflow-hidden rounded-[26px] border border-border/60 bg-white shadow-[0_20px_44px_-28px_rgba(15,23,42,0.22)]"
      style={{ borderTop: `3px solid ${card.tone}` }}
    >
      <div className="flex items-center gap-3 border-b border-border/60 px-5 py-4" style={{ backgroundColor: `${card.tone}0A` }}>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${card.tone}1A`, color: card.tone }}>
          <Icon className="size-4" aria-hidden />
        </span>
        <p className="text-sm font-semibold text-foreground">{card.label}</p>
        <div className="ml-auto flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[10px] font-semibold" style={{ border: "1px solid #E4ECFF" }}>
          <span className={mode === "without" ? "text-muted-foreground" : "text-muted-foreground/40"}>Without</span>
          <span className="text-muted-foreground/40">·</span>
          <span style={mode === "with" ? { color: card.tone } : undefined} className={mode === "with" ? "" : "text-muted-foreground/40"}>With</span>
        </div>
      </div>

      <div className="p-5">
        <div className="overflow-hidden rounded-2xl" style={{ backgroundColor: `${card.tone}07`, border: `1px solid ${card.tone}14` }}>
          <Scene mode={mode} />
        </div>
      </div>

      <div className="border-t border-border/50 px-5 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="flex items-start gap-2.5 text-[13px]"
          >
            {mode === "without" ? (
              <X className="mt-0.5 size-4 shrink-0 text-red-400" aria-hidden />
            ) : (
              <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden />
            )}
            <span className={mode === "without" ? "text-muted-foreground" : "font-medium text-foreground"}>
              {mode === "without" ? card.withoutCaption : card.withCaption}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export function CallBehaviorComparison() {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {CARDS.map((card, i) => (
        <BehaviorCard key={card.key} card={card} offsetMs={i * 550} />
      ))}
    </div>
  )
}
