"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { CheckCircle2, MessageCircle, Sparkles, Timer, User2, Users, ShieldCheck } from "lucide-react"
import { MouseGlowCard } from "@/components/animation/mouse-glow-card"
import { CountUp } from "@/components/ui/count-up"

/** Gentle continuous float — matches the treatment used across the other feature illustrations. */
function Float({ children, delay = 0, duration = 4.5, className = "" }: { children: React.ReactNode; delay?: number; duration?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1, y: [-6, 6, -6] }}
      transition={{
        opacity: { duration: 0.4, delay, ease: "easeOut" },
        scale: { duration: 0.4, delay, ease: "easeOut" },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay: delay + 0.4 },
      }}
    >
      {children}
    </motion.div>
  )
}

const TICKETS = [
  { id: 1, initials: "JS", avatarBg: "bg-violet-500", name: "John Smith", subject: "Payment gateway error", accent: "bg-violet-500", priority: "High", priorityTone: "bg-rose-100 text-rose-700" },
  { id: 2, initials: "AC", avatarBg: "bg-blue-500", name: "Anna Cooper", subject: "Unable to login", accent: "bg-blue-500", priority: "Medium", priorityTone: "bg-amber-100 text-amber-700" },
  { id: 3, initials: "MJ", avatarBg: "bg-emerald-500", name: "Mike Johnson", subject: "Feature request", accent: "bg-emerald-500", priority: "Low", priorityTone: "bg-slate-100 text-slate-600" },
]

const CYCLE_DURATION = 2600

const CONFETTI = [
  { x: -34, y: -20, tone: "text-emerald-400", shape: "sparkle" },
  { x: 30, y: -24, tone: "text-primary", shape: "sparkle" },
  { x: -20, y: 22, tone: "text-primary", shape: "square" },
  { x: 26, y: 20, tone: "text-emerald-400", shape: "square" },
  { x: -42, y: 2, tone: "text-emerald-300", shape: "sparkle" },
  { x: 40, y: -2, tone: "text-emerald-300", shape: "square" },
  { x: -10, y: -30, tone: "text-amber-400", shape: "square" },
  { x: 14, y: -32, tone: "text-violet-400", shape: "sparkle" },
  { x: -46, y: -8, tone: "text-amber-300", shape: "square" },
  { x: 48, y: -12, tone: "text-violet-300", shape: "sparkle" },
]

/**
 * Illustration for the Support Tickets System feature page — a stack of
 * ticket cards where the front one gets stamped "Resolved" with a burst
 * of sparkles and flies off, the next card sliding forward to take its
 * place, looping continuously.
 */
export function SupportTicketIllustration() {
  const [cycle, setCycle] = useState(0)
  const [stamped, setStamped] = useState(false)

  useEffect(() => {
    setStamped(false)
    const stampTimer = setTimeout(() => setStamped(true), CYCLE_DURATION * 0.55)
    const nextTimer = setTimeout(() => setCycle((c) => c + 1), CYCLE_DURATION)
    return () => {
      clearTimeout(stampTimer)
      clearTimeout(nextTimer)
    }
  }, [cycle])

  const front = TICKETS[cycle % TICKETS.length]
  const resolvedCount = 94 + (cycle % 6)

  return (
    <div className="relative mx-auto w-full max-w-[480px] lg:mr-4">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-8 -z-10 rounded-full bg-primary/20 blur-[60px]"
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* resolved-today counter, ticks up each cycle */}
      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/70 py-1.5 pl-1.5 pr-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <motion.span
          key={`icon-${resolvedCount}`}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.35, 1] }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex size-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
        >
          <CheckCircle2 className="size-3.5" aria-hidden />
        </motion.span>
        <AnimatePresence mode="wait">
          <motion.span
            key={resolvedCount}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
            className="text-sm font-semibold text-foreground"
          >
            {resolvedCount} resolved today
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="relative h-[176px]">
        {/* front card — gets stamped and flies off */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cycle}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={
              stamped
                ? { opacity: 1, y: 0, scale: [1, 0.97, 1.015, 1] }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={{ opacity: 0, y: -80, x: 24, scale: 0.85, rotate: -10, filter: "blur(6px)" }}
            transition={stamped ? { duration: 0.45, ease: "easeOut" } : { duration: 0.4, ease: "easeOut" }}
            className="absolute inset-x-0 top-0 z-20"
          >
            <MouseGlowCard
              tiltStrength={4}
              glowSize={260}
              glowColor="oklch(0.6 0.19 262.88 / 0.14)"
              className={`relative overflow-hidden rounded-2xl border bg-white shadow-[0_30px_70px_-30px_oklch(0.2_0.05_260/0.4)] transition-colors duration-500 backdrop-blur-0 ${
                stamped ? "border-emerald-300 ring-4 ring-emerald-100" : "border-border/60"
              }`}
            >
              {/* rotating conic-gradient border sweep — only while resolved */}
              {stamped && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-px rounded-2xl"
                  style={{
                    padding: 1,
                    background: "conic-gradient(from var(--angle, 0deg), transparent 0%, oklch(0.72 0.19 155 / 0.8) 15%, transparent 30%)",
                    WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    animation: "spin-border 1.4s linear infinite",
                  }}
                />
              )}
              <span aria-hidden className={`absolute inset-y-0 left-0 w-1.5 ${front.accent}`} />
              <div className="p-6 pl-7">
                <div className="flex items-start gap-3">
                  <span className={`flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${front.avatarBg}`}>
                    {front.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-semibold text-foreground">{front.name}</p>
                    <p className="truncate text-sm text-muted-foreground">{front.subject}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${front.priorityTone}`}>{front.priority}</span>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <AnimatePresence mode="wait">
                    {stamped ? (
                      <motion.span
                        key="resolved-line"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-1.5 font-medium text-emerald-600"
                      >
                        <CheckCircle2 className="size-3.5" aria-hidden />
                        Resolved just now
                      </motion.span>
                    ) : (
                      <motion.span key="raised-line" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="flex items-center gap-1.5">
                        <User2 className="size-3.5" aria-hidden />
                        Raised 12m ago
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* countdown to next resolve */}
              <div className="absolute inset-x-0 bottom-0 h-[3px] bg-border/40">
                <motion.div
                  key={cycle}
                  className="h-full bg-primary/50"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: CYCLE_DURATION / 1000, ease: "linear" }}
                />
              </div>

              {/* stamp overlay */}
              <AnimatePresence>
                {stamped && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[1px]"
                  >
                    {/* expanding ripple rings */}
                    {[0, 1].map((r) => (
                      <motion.span
                        key={r}
                        aria-hidden
                        className="absolute size-10 rounded-full border-2 border-emerald-400"
                        style={{ left: "50%", top: "50%", translateX: "-50%", translateY: "-50%" }}
                        initial={{ scale: 0.6, opacity: 0.6 }}
                        animate={{ scale: 4, opacity: 0 }}
                        transition={{ duration: 1, delay: r * 0.2, ease: "easeOut" }}
                      />
                    ))}

                    <motion.div
                      initial={{ scale: 0.4, rotate: -18, opacity: 0 }}
                      animate={{ scale: 1, rotate: -8, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 14 }}
                      className="relative flex items-center gap-2 rounded-2xl border-2 border-emerald-500 bg-white px-5 py-2.5 shadow-[0_10px_24px_-8px_rgba(16,185,129,0.4)]"
                    >
                      <CheckCircle2 className="size-5 text-emerald-500" aria-hidden />
                      <span className="text-sm font-black uppercase tracking-wide text-emerald-600">Resolved</span>
                    </motion.div>
                    {CONFETTI.map((s, i) => (
                      <motion.span
                        key={i}
                        className={`absolute ${s.tone}`}
                        style={{ left: "50%", top: "50%" }}
                        initial={{ opacity: 0, x: 0, y: 0, scale: 0.4, rotate: 0 }}
                        animate={{ opacity: [0, 1, 0], x: s.x * 2.4, y: s.y * 2.4 + 30, scale: 1, rotate: s.x > 0 ? 180 : -180 }}
                        transition={{ duration: 1, delay: 0.06 + i * 0.025, ease: "easeOut" }}
                      >
                        {s.shape === "sparkle" ? (
                          <Sparkles className="size-4" aria-hidden />
                        ) : (
                          <span className="block size-2.5 rounded-[3px] bg-current" aria-hidden />
                        )}
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </MouseGlowCard>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* mini stat row — fills the space below the card stack, values tick live each cycle */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
        className="mt-4 grid grid-cols-3 gap-2"
      >
        {[
          { label: "Avg resolve", icon: Timer, tone: "bg-blue-50 text-blue-600", value: 2.2 + (cycle % 4) * 0.1, suffix: "h", decimals: 1 },
          { label: "SLA hit", icon: ShieldCheck, tone: "bg-emerald-50 text-emerald-600", value: 96 + (cycle % 4), suffix: "%", decimals: 0 },
          { label: "Active now", icon: Users, tone: "bg-violet-50 text-violet-600", value: 10 + (cycle % 5), suffix: "", decimals: 0 },
        ].map((s) => (
          <div key={s.label} className="relative overflow-hidden rounded-xl border border-border/60 bg-white p-2.5 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" aria-hidden />
            <span className={`mx-auto flex size-6 items-center justify-center rounded-full ${s.tone}`}>
              <s.icon className="size-3.5" aria-hidden />
            </span>
            <CountUp
              value={s.value}
              suffix={s.suffix}
              decimals={s.decimals}
              once={false}
              duration={0.8}
              className="mt-1 block text-sm font-bold text-foreground"
            />
            <p className="mt-0.5 text-[9px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* live-chat badge */}
      <Float delay={0.7} duration={4.8} className="absolute -right-6 -bottom-2 z-30 hidden sm:block">
        <span className="relative flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.45_0.19_264)] text-white shadow-[0_16px_32px_-12px_oklch(0.546_0.215_262.88/0.5)]">
          <MessageCircle className="size-6" aria-hidden />
          <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
            1
          </span>
        </span>
      </Float>
    </div>
  )
}
