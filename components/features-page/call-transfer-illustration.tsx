"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, Phone, PhoneForwarded, UserRound } from "lucide-react"

type Stage = "ringing" | "connecting" | "transferred"

const STAGE_MS: Record<Stage, number> = {
  ringing: 1400,
  connecting: 1100,
  transferred: 2200,
}

const STAGE_LABEL: Record<Stage, string> = {
  ringing: "Incoming call",
  connecting: "Transferring…",
  transferred: "Transferred in 1.8s",
}

const AGENTS = [
  { name: "Rahul", tone: "oklch(0.546 0.215 262.88)" },
  { name: "Priya", tone: "oklch(0.72 0.19 152)" },
  { name: "Kabir", tone: "oklch(0.65 0.19 40)" },
  { name: "Meera", tone: "oklch(0.58 0.22 300)" },
]

const LOG_LINES = [
  "Aarav Motors → Rahul · billing question",
  "Sharma Reality → Priya · site visit request",
  "Clinic line → Kabir · appointment reschedule",
]

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

const LEFT_PATH = "M0 12 Q60 -6 122 12"
const RIGHT_PATH = "M-2 12 Q60 -6 120 12"

/**
 * Illustration for the Call Transfer Tool feature page — a live "transfer
 * console" panel rather than a lone floating icon trio: a header bar, the
 * sequential caller → hub → agent handoff animation (ringing, connecting,
 * transferred), a row of available agents with live status dots, and a
 * scrolling log of recent transfers. Fills the panel the way a real product
 * widget would instead of leaving open padding around a small graphic.
 */
export function CallTransferIllustration() {
  const [stage, setStage] = useState<Stage>("ringing")
  const [activeAgent, setActiveAgent] = useState(0)
  const [logIndex, setLogIndex] = useState(0)

  useEffect(() => {
    const id = setTimeout(() => {
      setStage((s) => {
        if (s === "ringing") return "connecting"
        if (s === "connecting") return "transferred"
        setActiveAgent((a) => (a + 1) % AGENTS.length)
        setLogIndex((l) => (l + 1) % LOG_LINES.length)
        return "ringing"
      })
    }, STAGE_MS[stage])
    return () => clearTimeout(id)
  }, [stage])

  const dotOnLeft = stage === "ringing"
  const dotOnRight = stage === "connecting" || stage === "transferred"
  const confirmed = stage === "transferred"
  const agent = AGENTS[activeAgent]

  return (
    <div className="relative mx-auto w-full min-w-0 max-w-[560px] lg:ml-6">
      {/* grounding shadow beneath the whole panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-2 left-1/2 h-10 w-[85%] -translate-x-1/2 rounded-full bg-[oklch(0.2_0.05_260/0.16)] blur-2xl"
      />

      {/* ambient glow, brightens on confirm */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 -top-4 -z-10 h-40 rounded-full bg-primary/15 blur-[70px]"
        animate={{ opacity: confirmed ? [0.5, 0.75, 0.5] : [0.3, 0.5, 0.3] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <Sparkle className="left-[2%] top-[4%] size-1.5" delay={0.2} />
      <Sparkle className="right-[4%] top-[8%] size-1" delay={1} />

      {/* the panel itself */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl bg-white"
        style={{ border: "1px solid #E4ECFF", boxShadow: "0 30px 60px -30px rgba(37,99,235,0.35)" }}
      >
        {/* header bar */}
        <div className="flex items-center gap-2 border-b px-4 py-2.5" style={{ borderColor: "#EEF2F7", backgroundColor: "#F7F9FC" }}>
          <span className="size-2 rounded-full" style={{ backgroundColor: "#F87171" }} />
          <span className="size-2 rounded-full" style={{ backgroundColor: "#FBBF24" }} />
          <span className="size-2 rounded-full" style={{ backgroundColor: "#34D399" }} />
          <span className="ml-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Live Transfer</span>
          <span className="ml-auto flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color: confirmed ? "oklch(0.6 0.17 155)" : "var(--primary)" }}>
            <motion.span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: confirmed ? "oklch(0.72 0.19 152)" : "var(--primary)" }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            Live
          </span>
        </div>

        {/* faint dot-grid texture behind the handoff row */}
        <div className="relative px-4 pb-2 pt-6 sm:px-8 sm:pt-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage: "radial-gradient(oklch(0.6 0.19 262.88 / 0.14) 1.5px, transparent 1.5px)",
              backgroundSize: "20px 20px",
              maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            }}
          />

          {/* status chip, above the handoff row */}
          <div className="relative mb-4 flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: -6, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.94 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-center gap-2 rounded-full border border-border/70 bg-white px-3.5 py-1.5 shadow-[0_10px_24px_-16px_oklch(0.2_0.05_260/0.4)]"
              >
                <span
                  className="size-2 rounded-full motion-safe:animate-pulse"
                  style={{ backgroundColor: confirmed ? "oklch(0.72 0.19 152)" : "var(--primary)" }}
                  aria-hidden
                />
                <span className="text-xs font-semibold text-foreground">{STAGE_LABEL[stage]}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative flex w-full items-center justify-between gap-1 sm:gap-0">
            {/* caller, left */}
            <motion.div
              animate={{ scale: stage === "ringing" ? [1, 1.04, 1] : 1 }}
              transition={{ duration: 0.9, repeat: stage === "ringing" ? Infinity : 0, ease: "easeInOut" }}
              className="flex shrink-0 flex-col items-center gap-2"
            >
              <span className="relative flex size-11 shrink-0 items-center justify-center sm:size-16">
                {stage === "ringing" && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full border border-primary/40"
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <span className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-white to-primary/[0.06] text-primary shadow-[0_14px_28px_-14px_rgba(15,23,42,0.3)] ring-1 ring-inset ring-primary/15 sm:size-16">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{ background: "linear-gradient(160deg, white 0%, transparent 45%)", opacity: 0.5 }}
                  />
                  <Phone className="relative size-4 shrink-0 sm:size-6" aria-hidden />
                </span>
              </span>
              <div className="flex h-3.5 items-end gap-[3px]" aria-hidden>
                {[0.4, 0.9, 0.6, 1, 0.5].map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] rounded-full bg-primary/50"
                    animate={stage === "ringing" ? { scaleY: [h * 0.5, h, h * 0.5] } : { scaleY: h * 0.35 }}
                    transition={{ duration: 0.9, repeat: stage === "ringing" ? Infinity : 0, ease: "easeInOut", delay: i * 0.12 }}
                    style={{ height: "100%", transformOrigin: "bottom" }}
                  />
                ))}
              </div>
              <span className="rounded-full px-2 py-0.5 text-[11px] font-semibold text-muted-foreground" style={{ backgroundColor: "#F7F9FC" }}>
                Caller
              </span>
            </motion.div>

            {/* connecting path, left half */}
            <svg viewBox="0 0 122 24" preserveAspectRatio="none" className="h-6 min-w-0 flex-1 overflow-visible" aria-hidden>
              <path d={LEFT_PATH} fill="none" stroke="oklch(0.546 0.215 262.88 / 0.28)" strokeWidth="1.5" strokeDasharray="3 4" />
              {dotOnLeft && (
                <motion.circle
                  key="left-dot"
                  r="5"
                  fill="oklch(0.546 0.215 262.88)"
                  style={{ offsetPath: `path('${LEFT_PATH}')` }}
                  initial={{ offsetDistance: "0%", opacity: 0 }}
                  animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
                  transition={{ duration: STAGE_MS.ringing / 1000, ease: "easeInOut", times: [0, 0.15, 0.85, 1] }}
                />
              )}
            </svg>

            {/* center hub */}
            <motion.div
              animate={{ scale: stage === "connecting" ? [1, 1.08, 1] : 1 }}
              transition={{ duration: 0.55, repeat: stage === "connecting" ? Infinity : 0, ease: "easeInOut" }}
              className="relative flex size-[72px] shrink-0 items-center justify-center sm:size-28"
            >
              <motion.span
                aria-hidden
                className="absolute -inset-4 rounded-full bg-primary/25 blur-2xl"
                animate={{ opacity: confirmed ? [0.5, 0.85, 0.5] : [0.3, 0.55, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />

              <svg viewBox="0 0 100 100" className="absolute inset-0 size-full -rotate-90" aria-hidden>
                <circle cx="50" cy="50" r="44" fill="none" stroke="oklch(0.546 0.215 262.88 / 0.12)" strokeWidth="3" />
                <motion.circle
                  key={stage}
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke={confirmed ? "oklch(0.72 0.19 152)" : "oklch(0.546 0.215 262.88)"}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 44}
                  initial={{ strokeDashoffset: 2 * Math.PI * 44 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: STAGE_MS[stage] / 1000, ease: "linear" }}
                />
              </svg>

              <AnimatePresence mode="wait">
                <motion.span
                  key={confirmed ? "check" : "forward"}
                  initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="relative z-10 flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full text-white shadow-[0_18px_40px_oklch(0.546_0.215_262.88/0.45)] sm:size-20"
                  style={{
                    background: confirmed
                      ? "linear-gradient(135deg, oklch(0.72 0.19 152), oklch(0.6 0.17 155))"
                      : "linear-gradient(135deg, var(--primary), oklch(0.45 0.19 264))",
                  }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{ background: "linear-gradient(160deg, white 0%, transparent 50%)", opacity: 0.25 }}
                  />
                  {confirmed ? (
                    <Check className="relative size-5 shrink-0 sm:size-8" aria-hidden />
                  ) : (
                    <PhoneForwarded className="relative size-5 shrink-0 sm:size-8" aria-hidden />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* connecting path, right half */}
            <svg viewBox="0 0 120 24" preserveAspectRatio="none" className="h-6 min-w-0 flex-1 overflow-visible" aria-hidden>
              <path d={RIGHT_PATH} fill="none" stroke="oklch(0.546 0.215 262.88 / 0.28)" strokeWidth="1.5" strokeDasharray="3 4" />
              {dotOnRight && (
                <motion.circle
                  key={`right-dot-${stage}`}
                  r="5"
                  fill={confirmed ? "oklch(0.72 0.19 152)" : "oklch(0.546 0.215 262.88)"}
                  style={{ offsetPath: `path('${RIGHT_PATH}')` }}
                  initial={stage === "connecting" ? { offsetDistance: "0%", opacity: 0 } : { offsetDistance: "100%", opacity: 1 }}
                  animate={stage === "connecting" ? { offsetDistance: "100%", opacity: [0, 1, 1] } : { opacity: 1 }}
                  transition={{ duration: STAGE_MS.connecting / 1000, ease: "easeInOut" }}
                />
              )}
            </svg>

            {/* agent, right — tracks whichever teammate is currently "active" */}
            <motion.div
              animate={{ scale: confirmed ? [1, 1.08, 1] : 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex shrink-0 flex-col items-center gap-2"
            >
              <span
                className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full text-white shadow-[0_14px_28px_-14px_rgba(15,23,42,0.3)] sm:size-16"
                style={{ background: `linear-gradient(135deg, ${agent.tone}, ${agent.tone})` }}
              >
                {confirmed && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full border border-white/60"
                    initial={{ scale: 1, opacity: 0.7 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{ background: "linear-gradient(160deg, white 0%, transparent 45%)", opacity: 0.3 }}
                />
                <UserRound className="relative size-4 shrink-0 sm:size-6" aria-hidden />
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={agent.name}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-full px-2 py-0.5 text-[11px] font-semibold text-foreground"
                  style={{ backgroundColor: "#F7F9FC" }}
                >
                  {agent.name}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* available agents strip — always-on context, doesn't wait for the handoff cycle */}
        <div className="border-t px-4 py-3 sm:px-8" style={{ borderColor: "#EEF2F7" }}>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">Available now</p>
          <div className="flex flex-wrap gap-2">
            {AGENTS.map((a, i) => {
              const isActive = i === activeAgent && stage !== "ringing"
              return (
                <motion.span
                  key={a.name}
                  className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
                  animate={{
                    backgroundColor: isActive ? `${a.tone.replace(")", " / 0.12)")}` : "#F7F9FC",
                    borderColor: isActive ? a.tone : "#EEF2F7",
                  }}
                  style={{ borderWidth: 1, borderStyle: "solid", color: "#334155" }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="relative flex size-1.5">
                    {isActive && (
                      <motion.span
                        className="absolute inline-flex size-full rounded-full"
                        style={{ backgroundColor: a.tone }}
                        animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                    <span className="relative inline-flex size-1.5 rounded-full" style={{ backgroundColor: a.tone }} />
                  </span>
                  {a.name}
                </motion.span>
              )
            })}
          </div>
        </div>

        {/* recent transfers log — a slow ticker that reinforces this happens continuously */}
        <div className="flex items-center gap-2 border-t px-4 py-2.5 sm:px-8" style={{ borderColor: "#EEF2F7", backgroundColor: "#F7F9FC" }}>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">Recent</span>
          <div className="relative h-4 min-w-0 flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={logIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-x-0 truncate text-[11px] text-muted-foreground"
              >
                {LOG_LINES[logIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
