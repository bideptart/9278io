"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { PhoneCall, PhoneOff, Gauge, AudioLines, Route, Check } from "lucide-react"

const CONNECTED_CYCLE_MS = 8200

const TRANSCRIPT = [
  { from: "caller", text: "Hi, I'd like to book an appointment for Thursday." },
  { from: "agent", text: "Sure! I have a 4 PM slot open — should I book that?" },
  { from: "caller", text: "Yes, that works." },
  { from: "agent", text: "You're all set for Thursday at 4 PM — anything else?" },
]

const LINE_MS = 1700
const LATENCY_FROM = 310
const LATENCY_TO = 142

function Bars() {
  const heights = [8, 16, 26, 14, 22, 10, 20, 12]
  return (
    <div className="flex h-10 items-end gap-1" aria-hidden>
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full bg-primary"
          animate={{ height: [h * 0.4, h, h * 0.5, h * 1.15, h * 0.4] }}
          transition={{ duration: 0.85 + i * 0.06, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

function useCountUp(target: number, from: number, durationMs: number) {
  const [value, setValue] = useState(from)
  useEffect(() => {
    let raf: number
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1)
      setValue(Math.round(from + (target - from) * progress))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, from, durationMs])
  return value
}

export function LiveTestCallHero() {
  const [lineCount, setLineCount] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [routingConfirmed, setRoutingConfirmed] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Always shows the connected state — restarts the transcript, timer, and
  // routing check on a fixed interval instead of cycling back through the
  // empty dialing/ringing placeholder states.
  useEffect(() => {
    const id = setInterval(() => {
      setLineCount(0)
      setSeconds(0)
      setRoutingConfirmed(false)
    }, CONNECTED_CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setLineCount((c) => (c < TRANSCRIPT.length ? c + 1 : c))
    }, LINE_MS)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setTimeout(() => setRoutingConfirmed(true), 1400)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [lineCount])

  const latency = useCountUp(LATENCY_TO, LATENCY_FROM, 1100)
  const quality = useCountUp(97, 0, 1100)
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0")
  const ss = String(seconds % 60).padStart(2, "0")

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div aria-hidden className="absolute inset-x-6 -top-6 h-24 rounded-full bg-primary/15 blur-3xl" />

      <motion.div
        className="relative overflow-hidden rounded-3xl bg-white"
        style={{ borderWidth: 2, borderStyle: "solid", borderColor: "#10B981", boxShadow: "0 30px 60px -30px rgba(15,23,42,0.25), 0 0 0 4px #10B98122" }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
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
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#10B98120" }}>
            <PhoneCall className="size-5 text-emerald-600" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-base font-bold tracking-tight text-foreground">+91 98765 43210</p>
            <p className="truncate text-xs font-semibold uppercase tracking-wider" style={{ color: "#10B981" }}>
              Connected — {mm}:{ss}
            </p>
          </div>
        </div>

        {/* live metrics */}
        <div className="grid grid-cols-3 gap-2 border-t border-border/60 px-5 py-3" style={{ backgroundColor: "#FAFBFC" }}>
          <div className="rounded-xl bg-white px-2.5 py-2 shadow-sm">
            <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              <Gauge className="size-3" aria-hidden /> Latency
            </div>
            <p className="mt-0.5 text-sm font-bold tabular-nums" style={{ color: "#10B981" }}>{latency}ms</p>
          </div>
          <div className="rounded-xl bg-white px-2.5 py-2 shadow-sm">
            <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              <AudioLines className="size-3" aria-hidden /> Quality
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#EEF2FF]">
              <motion.div className="h-full rounded-full bg-primary" animate={{ width: `${quality}%` }} transition={{ duration: 0.2 }} />
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
          <Bars />
        </div>

        {/* live transcript feed */}
        <div className="border-t border-border/60 px-5 py-3" style={{ backgroundColor: "#FAFBFC" }}>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Live transcript</p>
          <div ref={scrollRef} className="mt-2 h-28 space-y-2 overflow-hidden">
            <AnimatePresence initial={false}>
              {TRANSCRIPT.slice(0, lineCount).map((line, i) => (
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
              ))}
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
