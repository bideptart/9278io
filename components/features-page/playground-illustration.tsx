"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Bot, FlaskConical, Gauge, ShieldCheck, Sparkles } from "lucide-react"

type Scenario = { user: string; agent: string; ms: number }

const SCENARIOS: Scenario[] = [
  { user: "Are you open on Sundays?", agent: "Yes — 10 AM to 6 PM, every Sunday.", ms: 210 },
  { user: "Can you transfer me to sales?", agent: "Sure, connecting you to sales now.", ms: 180 },
  { user: "What's your refund policy?", agent: "Full refund within 7 days, with receipt.", ms: 240 },
]

const THINK_MS = 550
const HOLD_MS = 1950

function TypingDots() {
  return (
    <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm px-3.5 py-2.5" style={{ backgroundColor: "#F1F5F9" }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full"
          style={{ backgroundColor: "#94A3B8" }}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

/** A tiny drifting sparkle dot, scattered around the composition for texture. */
function Sparkle({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.span
      className={`absolute rounded-full bg-primary/40 ${className}`}
      animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay }}
    />
  )
}

/**
 * Illustration for the Playground / Live Testing feature page — a "sandbox
 * chamber" console with a small state machine per test run (query appears,
 * agent "thinks", reply lands with a measured latency) instead of a static
 * swap, a scan-line sweep on the boundary, a before/after prompt-diff card
 * wired into the agent with a traveling pulse, a live pass-rate/latency
 * readout, and a dimmed "live" agent parked outside — untouched.
 */
export function PlaygroundIllustration() {
  const [index, setIndex] = useState(0)
  const [thinking, setThinking] = useState(false)
  const [runs, setRuns] = useState(1)

  useEffect(() => {
    setThinking(true)
    const toReply = setTimeout(() => setThinking(false), THINK_MS)
    const toNext = setTimeout(() => {
      setIndex((i) => (i + 1) % SCENARIOS.length)
      setRuns((r) => r + 1)
    }, THINK_MS + HOLD_MS)
    return () => {
      clearTimeout(toReply)
      clearTimeout(toNext)
    }
  }, [index])

  const active = SCENARIOS[index]
  const avgMs = Math.round(SCENARIOS.reduce((s, x) => s + x.ms, 0) / SCENARIOS.length)

  return (
    <div className="relative mx-auto flex w-full max-w-[560px] items-center justify-center py-10 sm:py-14 lg:mr-6">
      {/* grounding shadow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-4 left-1/2 h-8 w-[70%] -translate-x-1/2 rounded-full bg-[oklch(0.2_0.05_260/0.16)] blur-xl"
      />

      {/* ambient glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-primary/15 blur-[70px]"
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <Sparkle className="left-[4%] top-[6%] size-1.5" delay={0.2} />
      <Sparkle className="right-[8%] top-[12%] size-1" delay={1.2} />
      <Sparkle className="bottom-[18%] left-[8%] size-1" delay={2} />

      {/* the sandbox boundary — dashed, with a scan-line sweep along the edge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full overflow-hidden rounded-[28px] bg-white/60"
        style={{ border: "2px dashed oklch(0.546 0.215 262.88 / 0.35)" }}
      >
        {/* scan-line sweep, travels the perimeter continuously */}
        <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full" aria-hidden>
          <defs>
            <filter id="pg-scan-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" />
            </filter>
          </defs>
          <motion.rect
            x="1%"
            y="1%"
            width="98%"
            height="98%"
            rx="26"
            fill="none"
            stroke="var(--primary)"
            strokeWidth={2}
            strokeLinecap="round"
            filter="url(#pg-scan-glow)"
            strokeOpacity={0.55}
            strokeDasharray="120 640"
            animate={{ strokeDashoffset: [0, -1000] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        {/* faint dot-grid texture inside the sandbox */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage: "radial-gradient(oklch(0.546 0.215 262.88 / 0.12) 1.5px, transparent 1.5px)",
            backgroundSize: "18px 18px",
            maskImage: "radial-gradient(ellipse at center, black 45%, transparent 90%)",
          }}
        />

        {/* mini session header */}
        <div className="relative flex items-center gap-2 border-b px-4 py-2.5 sm:px-6" style={{ borderColor: "oklch(0.546 0.215 262.88 / 0.15)" }}>
          <span className="size-1.5 rounded-full bg-red-300" />
          <span className="size-1.5 rounded-full bg-amber-300" />
          <span className="size-1.5 rounded-full bg-emerald-300" />
          <span className="ml-1.5 font-mono text-[10px] font-semibold text-muted-foreground">sandbox-session-01</span>
          <span className="ml-auto flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: "oklch(0.546 0.215 262.88 / 0.08)", color: "var(--primary)" }}>
            <motion.span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: "var(--primary)" }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            Run #{runs}
          </span>
        </div>

        <div className="relative min-h-[420px] px-4 py-5 sm:px-6 sm:py-6">
          {/* sandbox label */}
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #E4ECFF", color: "var(--primary)" }}
            >
              <FlaskConical className="size-3.5" aria-hidden />
              Test sandbox
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
              style={{ backgroundColor: "#ECFDF5", color: "oklch(0.55 0.15 155)" }}
            >
              <ShieldCheck className="size-3.5" aria-hidden />
              No real calls affected
            </span>
          </div>

          {/* agent + chat scenario, with a "thinking" beat before the reply lands */}
          <div className="flex items-start gap-3">
            <motion.span
              className="relative flex size-11 shrink-0 items-center justify-center rounded-2xl text-white"
              style={{ background: "linear-gradient(135deg, var(--primary), oklch(0.45 0.19 264))", boxShadow: "0 14px 28px -12px oklch(0.546 0.215 262.88 / 0.5)" }}
              animate={{ scale: thinking ? [1, 1.1, 1] : [1, 1.04, 1] }}
              transition={{ duration: thinking ? 0.6 : 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-2xl border"
                style={{ borderColor: "oklch(0.546 0.215 262.88 / 0.5)" }}
                animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
              <Bot className="relative size-5" aria-hidden />
            </motion.span>

            {/* This column stays permanently mounted — only the text inside each
                slot crossfades — so the row's height never collapses between
                states the way it would if the whole block were re-keyed and
                remounted by AnimatePresence on every cycle. */}
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex w-[210px] shrink-0 items-center self-start overflow-hidden rounded-2xl rounded-tl-sm px-3.5 py-2 text-sm sm:w-[230px]" style={{ backgroundColor: "#F1F5F9", color: "#334155" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block truncate"
                  >
                    {active.user}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="flex min-h-[70px] flex-col items-end justify-start gap-1 self-end">
                <AnimatePresence mode="wait">
                  {thinking ? (
                    <motion.div key="thinking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                      <TypingDots />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`reply-${index}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col items-end gap-1"
                    >
                      <div className="w-[210px] shrink-0 truncate rounded-2xl rounded-tr-sm px-3.5 py-2 text-sm text-white sm:w-[230px]" style={{ background: "linear-gradient(135deg, var(--primary), oklch(0.45 0.19 264))" }}>
                        {active.agent}
                      </div>
                      <span className="text-[10px] font-medium text-muted-foreground/70">{active.ms}ms response</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* scenario checklist — all three runs visible, active one pulsing */}
          <div className="mt-4 flex flex-col gap-1.5 border-t pt-3" style={{ borderColor: "oklch(0.546 0.215 262.88 / 0.12)" }}>
            {SCENARIOS.map((s, i) => (
              <div key={s.user} className="flex items-center gap-2 text-[11px]" style={{ color: i === index ? "var(--primary)" : "#94A3B8" }}>
                <motion.span
                  className="flex size-3.5 shrink-0 items-center justify-center rounded-full text-[8px] font-bold text-white"
                  animate={{ backgroundColor: i === index ? "var(--primary)" : "#94A3B8" }}
                  transition={{ duration: 0.3 }}
                >
                  {i === index ? "•" : "✓"}
                </motion.span>
                <span className="truncate">{s.user}</span>
              </div>
            ))}
          </div>

          {/* live pass-rate + latency readout */}
          <div className="mt-3 flex items-center gap-3 border-t pt-3 text-[11px] font-semibold" style={{ borderColor: "oklch(0.546 0.215 262.88 / 0.12)" }}>
            <span className="flex items-center gap-1.5" style={{ color: "oklch(0.55 0.15 155)" }}>
              <ShieldCheck className="size-3.5" aria-hidden />
              {SCENARIOS.length}/{SCENARIOS.length} passed
            </span>
            <span aria-hidden style={{ color: "#CBD5E1" }}>·</span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Gauge className="size-3.5" aria-hidden />
              {avgMs}ms avg
            </span>
          </div>
        </div>
      </motion.div>

      {/* sparkle badge, top-right */}
      <motion.span
        className="pointer-events-none absolute -top-2 right-6 hidden sm:block"
        animate={{ rotate: [0, 18, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="size-4 opacity-60" style={{ color: "var(--primary)" }} aria-hidden />
      </motion.span>
    </div>
  )
}
