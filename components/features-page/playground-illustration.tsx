"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Check,
  ChevronDown,
  Copy,
  FlaskConical,
  LineChart,
  Loader2,
  Play,
  RotateCcw,
  Send,
  Upload,
} from "lucide-react"
import { MouseGlowCard } from "@/components/animation/mouse-glow-card"
import { CountUp } from "@/components/ui/count-up"

/** Gentle continuous float — matches the treatment used across the other feature illustrations. */
function Float({
  children,
  delay = 0,
  duration = 4.5,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}) {
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

const THREAD = [
  { from: "user", text: "Hello! This is a test message." },
  { from: "agent", text: "Got it! Your test message was received." },
]

const JSON_LINES = [
  "{",
  '  "status": "success",',
  '  "message": "Message sent",',
  '  "data": {',
  '    "message_id": "msg_123456",',
  '    "to": "+12025550123",',
  '    "status": "delivered"',
  "  }",
  "}",
]

const CYCLE = [
  { phase: "idle", hold: 600 },
  { phase: "userSent", hold: 900 },
  { phase: "thinking", hold: 750 },
  { phase: "agentReplied", hold: 2800 },
] as const

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1 rounded-full bg-muted-foreground/50"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

/**
 * Illustration for the Playground / Live Testing feature page — a
 * developer-console mockup: an endpoint + parameters form on the left, a
 * live phone preview in the middle, and a live JSON response panel on the
 * right, with a "Send" cycle that animates the message landing on the
 * phone and the response streaming in. A request/response API-tester
 * metaphor, distinct from the dashboard-card mockups used elsewhere.
 */
export function PlaygroundIllustration() {
  const [phase, setPhase] = useState<(typeof CYCLE)[number]["phase"]>("idle")
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    setPhase("idle")

    let elapsed = 0
    CYCLE.forEach((step, i) => {
      elapsed += step.hold
      timers.push(
        setTimeout(() => {
          if (cancelled) return
          const next = CYCLE[i + 1]
          setPhase(next ? next.phase : "idle")
          if (!next) timers.push(setTimeout(() => !cancelled && setCycle((c) => c + 1), 300))
        }, elapsed),
      )
    })

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [cycle])

  const sending = phase === "userSent"
  const thinking = phase === "thinking"
  const delivered = phase === "agentReplied"
  const showUser = phase === "userSent" || phase === "thinking" || phase === "agentReplied"

  return (
    <div className="relative mx-auto w-full max-w-[760px] lg:mr-4">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-8 -z-10 rounded-full bg-primary/20 blur-[60px]"
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
        <MouseGlowCard
          tiltStrength={2}
          glowSize={320}
          glowColor="oklch(0.6 0.19 262.88 / 0.14)"
          className="relative overflow-hidden rounded-2xl border-border/60 bg-white shadow-[0_30px_70px_-30px_oklch(0.2_0.05_260/0.35)] backdrop-blur-0"
        >
          {/* title bar */}
          <div className="flex items-center gap-2 border-b border-border/60 px-5 py-3.5">
            <span className="size-2.5 rounded-full bg-red-400" />
            <span className="size-2.5 rounded-full bg-amber-400" />
            <span className="size-2.5 rounded-full bg-emerald-400" />
            <p className="ml-1.5 text-xs font-bold tracking-tight text-foreground">Playground / Live Testing</p>
            <span className="ml-auto flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide text-emerald-600">
              <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden />
              Live
            </span>
            <button type="button" onClick={() => setCycle((c) => c + 1)} className="flex items-center gap-1 rounded-full border border-border/60 px-2.5 py-1 text-[9px] font-semibold text-muted-foreground transition-colors hover:text-primary">
              <RotateCcw className="size-3" aria-hidden />
              Reset
            </button>
          </div>

          <div className="grid grid-cols-3 gap-5 p-6">
            {/* column 1 — endpoint + params */}
            <div className="space-y-3.5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">1. Select Endpoint</p>
                <motion.div
                  animate={sending ? { borderColor: "oklch(0.546 0.215 262.88)", boxShadow: "0 0 0 3px oklch(0.546 0.215 262.88 / 0.15)" } : { borderColor: "oklch(0.9 0.005 260)", boxShadow: "0 0 0 0px transparent" }}
                  transition={{ duration: 0.3 }}
                  className="mt-1.5 flex items-center justify-between rounded-md border px-2 py-1.5 text-[10.5px] font-semibold text-foreground"
                >
                  <span className="truncate">POST /v1/send-sms</span>
                  <ChevronDown className="size-3 shrink-0 text-muted-foreground" aria-hidden />
                </motion.div>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">2. Input Parameters</p>
                <div className="mt-1.5 space-y-1.5">
                  <div>
                    <p className="text-[9.5px] text-muted-foreground">To</p>
                    <div className="mt-0.5 rounded-md border border-border/60 px-2 py-1.5 text-[10.5px] text-foreground">+1 202 555 0123</div>
                  </div>
                  <div>
                    <p className="text-[9.5px] text-muted-foreground">Message</p>
                    <div className="mt-0.5 rounded-md border border-border/60 px-2 py-1.5 text-[10.5px] leading-tight text-foreground">Hello! This is a test message.</div>
                  </div>
                  <div>
                    <p className="text-[9.5px] text-muted-foreground">From (Optional)</p>
                    <div className="mt-0.5 rounded-md border border-border/60 px-2 py-1.5 text-[10.5px] text-foreground">Test Sender</div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">3. Send Request</p>
                <motion.button
                  type="button"
                  onClick={() => setCycle((c) => c + 1)}
                  animate={sending ? { scale: [1, 0.96, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className="mt-1.5 flex w-full items-center justify-center gap-1.5 rounded-md bg-primary py-2 text-[10.5px] font-bold text-white"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {sending || thinking ? (
                      <motion.span key="spin" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}>
                        <Loader2 className="size-3 animate-spin" aria-hidden />
                      </motion.span>
                    ) : delivered ? (
                      <motion.span key="check" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}>
                        <Check className="size-3" aria-hidden />
                      </motion.span>
                    ) : (
                      <motion.span key="send" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}>
                        <Send className="size-3" aria-hidden />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {delivered ? "Sent" : "Send"}
                </motion.button>
              </div>
            </div>

            {/* column 2 — live preview phone */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Live Preview</p>
              <div className="mx-auto mt-1.5 w-full max-w-[195px] overflow-hidden rounded-2xl border-2 border-slate-900 bg-white shadow-sm">
                <div className="flex items-center justify-between bg-slate-900 px-2 py-1.5 text-[9px] text-white">
                  <span>9:41</span>
                  <span className="flex items-center gap-0.5">
                    <span className="size-1 rounded-full bg-white/80" />
                    <span className="size-1 rounded-full bg-white/80" />
                  </span>
                </div>
                <div className="flex items-center gap-1.5 border-b border-border/50 px-2 py-1.5">
                  <span className="size-4 rounded-full bg-primary/15" />
                  <span className="text-[9px] font-semibold text-foreground">+1 202 555 0123</span>
                </div>
                <div className="flex min-h-[140px] flex-col justify-end gap-1.5 p-2">
                  <AnimatePresence>
                    {showUser && (
                      <motion.div
                        key="user"
                        initial={{ opacity: 0, y: 6, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 240, damping: 26 }}
                        className="self-end rounded-lg rounded-br-sm bg-primary px-2 py-1.5 text-[9.5px] leading-tight text-white"
                      >
                        {THREAD[0].text}
                      </motion.div>
                    )}
                    {thinking && (
                      <motion.div
                        key="thinking"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="self-start rounded-lg rounded-bl-sm bg-slate-100 px-2 py-1"
                      >
                        <TypingDots />
                      </motion.div>
                    )}
                    {delivered && (
                      <motion.div
                        key="agent"
                        initial={{ opacity: 0, y: 6, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 240, damping: 26 }}
                        className="self-start rounded-lg rounded-bl-sm bg-slate-100 px-2 py-1.5 text-[9.5px] leading-tight text-foreground"
                      >
                        {THREAD[1].text}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex items-center gap-1 border-t border-border/50 px-2 py-1.5">
                  <span className="flex-1 text-[9px] text-muted-foreground">Test Message</span>
                  <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Send className="size-2" aria-hidden />
                  </span>
                </div>
              </div>
            </div>

            {/* column 3 — response */}
            <div>
              <div className="flex items-center gap-2.5 text-[10px] font-semibold">
                <span className={delivered ? "text-primary" : "text-muted-foreground"}>Response</span>
                <span className="text-muted-foreground/50">Headers</span>
                <span className="text-muted-foreground/50">Logs</span>
              </div>
              <AnimatePresence mode="wait">
                {delivered ? (
                  <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    200 OK · <CountUp key={cycle} value={245} suffix="ms" once={false} duration={0.6} />
                  </motion.div>
                ) : sending || thinking ? (
                  <motion.div key="pending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-muted-foreground/60">
                    <Loader2 className="size-2.5 animate-spin" aria-hidden />
                    Waiting…
                  </motion.div>
                ) : (
                  <div key="idle" className="mt-1.5 text-[10px] font-semibold text-muted-foreground">Waiting…</div>
                )}
              </AnimatePresence>
              <div className="relative mt-1.5 min-h-[110px] overflow-hidden rounded-md bg-slate-900 p-2.5 font-mono text-[9.5px] leading-relaxed text-slate-300">
                <Copy className="absolute right-2.5 top-2.5 size-3 text-slate-500 transition-colors hover:text-slate-300" aria-hidden />
                <AnimatePresence mode="wait">
                  {delivered ? (
                    <motion.div key="json" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                      {JSON_LINES.map((line, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.08, ease: "easeOut" }}
                        >
                          {line}
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.pre key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="text-slate-500">// awaiting request</motion.pre>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </MouseGlowCard>
      </motion.div>

      {/* decorative squiggle chart line */}
      <Float delay={0.5} duration={4.6} className="absolute -bottom-4 left-10 z-10 hidden sm:block">
        <span className="flex size-9 items-center justify-center rounded-xl border border-border/60 bg-white text-primary/60 shadow-[0_10px_24px_-14px_rgba(15,23,42,0.25)]">
          <LineChart className="size-4" aria-hidden />
        </span>
      </Float>

      {/* flask badge */}
      <Float delay={0.7} duration={4.2} className="absolute -bottom-6 right-10 z-10 hidden sm:block">
        <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.42_0.19_264)] text-white shadow-[0_16px_32px_-12px_oklch(0.546_0.215_262.88/0.5)]">
          <FlaskConical className="size-5" aria-hidden />
        </span>
      </Float>

      {/* upload badge, corner */}
      <Float delay={0.9} duration={5} className="absolute -bottom-3 -right-3 z-10 hidden sm:block">
        <span className="flex size-9 items-center justify-center rounded-full border border-border/60 bg-white text-muted-foreground shadow-[0_10px_24px_-14px_rgba(15,23,42,0.25)]">
          <Upload className="size-4" aria-hidden />
        </span>
      </Float>

      {/* floating replay/play button */}
      <motion.button
        type="button"
        aria-label="Replay demo"
        onClick={() => setCycle((c) => c + 1)}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="absolute -bottom-6 left-1/2 z-20 flex size-14 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-white shadow-[0_16px_32px_-10px_oklch(0.546_0.215_262.88/0.6)]"
      >
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border-2 border-primary/50"
          animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
        <Play className="relative size-5 translate-x-px" aria-hidden fill="currentColor" />
      </motion.button>
    </div>
  )
}
