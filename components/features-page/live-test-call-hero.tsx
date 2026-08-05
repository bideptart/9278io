"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { PhoneCall, PhoneOff, Gauge, AudioLines, Route, Check } from "lucide-react"

type Stage = "dialing" | "ringing" | "connected"

const STAGE_MS: Record<Stage, number> = { dialing: 1300, ringing: 1500, connected: 8200 }
const ORDER: Stage[] = ["dialing", "ringing", "connected"]

const TRANSCRIPT = [
  { from: "caller", text: "Hi, I'd like to book an appointment for Thursday." },
  { from: "agent", text: "Sure! I have a 4 PM slot open — should I book that?" },
  { from: "caller", text: "Yes, that works." },
  { from: "agent", text: "You're all set for Thursday at 4 PM — anything else?" },
]

const LINE_MS = 1700
const LATENCY_FROM = 310
const LATENCY_TO = 142

function Bars({ active }: { active: boolean }) {
  const heights = [8, 16, 26, 14, 22, 10, 20, 12]
  return (
    <div className="flex h-10 items-end gap-1" aria-hidden>
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full bg-primary"
          animate={active ? { height: [h * 0.4, h, h * 0.5, h * 1.15, h * 0.4] } : { height: h * 0.3 }}
          transition={active ? { duration: 0.85 + i * 0.06, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
        />
      ))}
    </div>
  )
}

function useCountUp(target: number, from: number, durationMs: number, active: boolean) {
  const [value, setValue] = useState(from)
  useEffect(() => {
    if (!active) {
      setValue(from)
      return
    }
    let raf: number
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1)
      setValue(Math.round(from + (target - from) * progress))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, from, durationMs])
  return value
}

export function LiveTestCallHero() {
  const [stage, setStage] = useState<Stage>("dialing")
  const [lineCount, setLineCount] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [routingConfirmed, setRoutingConfirmed] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = setTimeout(() => {
      const idx = ORDER.indexOf(stage)
      if (idx === ORDER.length - 1) {
        setStage("dialing")
        setLineCount(0)
        setSeconds(0)
        setRoutingConfirmed(false)
      } else {
        setStage(ORDER[idx + 1])
      }
    }, STAGE_MS[stage])
    return () => clearTimeout(id)
  }, [stage])

  const connected = stage === "connected"

  useEffect(() => {
    if (!connected) return
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [connected])

  useEffect(() => {
    if (!connected) return
    const id = setInterval(() => {
      setLineCount((c) => (c < TRANSCRIPT.length ? c + 1 : c))
    }, LINE_MS)
    return () => clearInterval(id)
  }, [connected])

  useEffect(() => {
    if (!connected) return
    const id = setTimeout(() => setRoutingConfirmed(true), 1400)
    return () => clearTimeout(id)
  }, [connected])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [lineCount])

  const latency = useCountUp(LATENCY_TO, LATENCY_FROM, 1100, connected)
  const quality = useCountUp(97, 0, 1100, connected)
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0")
  const ss = String(seconds % 60).padStart(2, "0")

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div aria-hidden className="absolute inset-x-6 -top-6 h-24 rounded-full bg-primary/15 blur-3xl" />

      {/* animated border — a plain colored border plus a pulsing box-shadow ring;
          box-shadow is always bounded to the element's own edges, so unlike a
          rotating gradient layer it can never escape as a stray colored block.
          Color follows the call's own state (blue while connecting, green once live) */}
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25)]"
        style={{ borderWidth: 2, borderStyle: "solid" }}
        animate={{
          borderColor: connected ? "#10B981" : "#2563EB",
          boxShadow: [
            `0 30px 60px -30px rgba(15,23,42,0.25), 0 0 0 0px ${connected ? "#10B98155" : "#2563EB55"}`,
            `0 30px 60px -30px rgba(15,23,42,0.25), 0 0 0 6px ${connected ? "#10B98100" : "#2563EB00"}`,
          ],
        }}
        transition={{
          borderColor: { duration: 0.4 },
          boxShadow: { duration: 1.6, repeat: Infinity, ease: "easeOut" },
        }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-border/60 bg-[#F7F9FC] px-5 py-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Test Call Dashboard</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-red-600">
            <motion.span className="size-1.5 rounded-full bg-red-600" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
            Live
          </span>
        </div>

        {/* call status row */}
        <div className="flex items-center gap-3 px-5 pb-3 pt-4">
          <motion.span
            className="flex size-11 shrink-0 items-center justify-center rounded-full"
            animate={{ backgroundColor: connected ? "#10B98120" : "#2563EB18", scale: stage === "ringing" ? [1, 1.08, 1] : 1 }}
            transition={{ backgroundColor: { duration: 0.4 }, scale: { duration: 0.6, repeat: stage === "ringing" ? Infinity : 0 } }}
          >
            <PhoneCall className={`size-5 ${connected ? "text-emerald-600" : "text-primary"}`} aria-hidden />
          </motion.span>
          <div className="min-w-0 flex-1">
            <p className="text-base font-bold tracking-tight text-foreground">+91 98765 43210</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={stage}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: connected ? "#10B981" : stage === "ringing" ? "#D97706" : "#94A3B8" }}
              >
                {stage === "dialing" && "Dialing your agent's real number…"}
                {stage === "ringing" && "Ringing…"}
                {stage === "connected" && `Connected — ${mm}:${ss}`}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* live metrics */}
        <div className="grid grid-cols-3 gap-2 border-t border-border/60 px-5 py-3" style={{ backgroundColor: "#FAFBFC" }}>
          <div className="rounded-xl bg-white px-2.5 py-2 shadow-sm">
            <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              <Gauge className="size-3" aria-hidden /> Latency
            </div>
            <p className="mt-0.5 text-sm font-bold tabular-nums" style={{ color: connected ? "#10B981" : "#94A3B8" }}>
              {connected ? `${latency}ms` : "—"}
            </p>
          </div>
          <div className="rounded-xl bg-white px-2.5 py-2 shadow-sm">
            <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              <AudioLines className="size-3" aria-hidden /> Quality
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#EEF2FF]">
              <motion.div className="h-full rounded-full bg-primary" animate={{ width: connected ? `${quality}%` : "0%" }} transition={{ duration: 0.2 }} />
            </div>
          </div>
          <div className="rounded-xl bg-white px-2.5 py-2 shadow-sm">
            <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              <Route className="size-3" aria-hidden /> Routing
            </div>
            <div className="mt-0.5 flex items-center gap-1">
              <AnimatePresence mode="wait">
                {routingConfirmed ? (
                  <motion.span key="ok" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-1 text-sm font-bold text-emerald-600">
                    <Check className="size-3.5" aria-hidden /> OK
                  </motion.span>
                ) : (
                  <motion.span key="wait" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-bold text-muted-foreground">—</motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* waveform */}
        <div className="flex items-center justify-center border-t border-border/60 px-5 py-3">
          <Bars active={connected} />
        </div>

        {/* live transcript feed */}
        <div className="border-t border-border/60 px-5 py-3" style={{ backgroundColor: "#FAFBFC" }}>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Live transcript</p>
          <div ref={scrollRef} className="mt-2 h-28 space-y-2 overflow-hidden">
            <AnimatePresence initial={false}>
              {connected ? (
                TRANSCRIPT.slice(0, lineCount).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`rounded-xl px-3 py-2 text-xs leading-relaxed shadow-sm ${line.from === "agent" ? "bg-primary/[0.08] text-foreground" : "bg-white text-foreground"}`}
                  >
                    <span className={`font-semibold ${line.from === "agent" ? "text-primary" : "text-muted-foreground"}`}>
                      {line.from === "agent" ? "Agent: " : "Caller: "}
                    </span>
                    {line.text}
                  </motion.div>
                ))
              ) : (
                <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-8 text-center text-xs text-muted-foreground">
                  Waiting to connect…
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 border-t border-border/60 px-6 py-4">
          <span className="flex size-11 items-center justify-center rounded-full bg-red-50 text-red-500">
            <PhoneOff className="size-4" aria-hidden />
          </span>
          <span className="text-xs text-muted-foreground">Same voice, latency, and answers a real caller hears</span>
        </div>
      </motion.div>
    </div>
  )
}
