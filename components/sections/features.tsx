"use client"

import { useEffect, useState, useRef } from "react"
import {
  AudioLines, Languages, MessageCircle, Activity,
  Network, CalendarClock, PhoneForwarded, Mic, Timer,
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

/* ── Per-feature visuals ── */

const WAVE = [30, 55, 40, 70, 50, 85, 45, 72, 38, 65, 42, 78, 35, 60, 48]
function LatencyVisual() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-6">
      <div className="flex items-end gap-1" style={{ height: 80 }}>
        {WAVE.map((h, i) => (
          <motion.div key={i}
            className={`w-3 rounded-full ${h >= 70 ? "bg-primary" : h >= 50 ? "bg-primary/55" : "bg-primary/25"}`}
            style={{ height: `${h}%` }}
            animate={{ scaleY: [1, 1.5, 0.5, 1.3, 0.8, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.07, ease: "easeInOut" }}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2">
        <motion.div className="h-2 w-2 rounded-full bg-primary" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
        <span className="text-sm font-bold text-primary">94 ms avg latency</span>
      </div>
    </div>
  )
}

const LANGS = ["Hindi", "Tamil", "Telugu", "Kannada", "Marathi", "Bengali", "Gujarati", "Punjabi", "Malayalam", "Odia"]
function LanguageVisual() {
  const [idx, setIdx] = useState(0)
  useEffect(() => { const t = setInterval(() => setIdx(i => (i + 1) % LANGS.length), 700); return () => clearInterval(t) }, [])
  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <div className="relative flex h-20 w-full items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="text-4xl font-bold text-primary"
          >{LANGS[idx]}</motion.p>
        </AnimatePresence>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {LANGS.slice(0, 8).map((l, i) => (
          <span key={l} className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
            i === idx % 8 ? "bg-primary text-white" : "bg-slate-100 text-slate-500"
          }`}>{l}</span>
        ))}
      </div>
    </div>
  )
}

function TurnTakingVisual() {
  const lines = [
    { s: "Agent",  t: "नमस्ते! How can I help you today?", d: 0 },
    { s: "Caller", t: "I need to cancel my appointment.", d: 1.2 },
    { s: "Agent",  t: "Sure, let me pull that up for you.", d: 2.4 },
    { s: "Caller", t: "Actually, can I reschedule instead?", d: 3.6 },
    { s: "Agent",  t: "Of course! What time works for you?", d: 4.8 },
  ]
  const [key, setKey] = useState(0)
  useEffect(() => { const t = setInterval(() => setKey(k => k + 1), 8000); return () => clearInterval(t) }, [])
  return (
    <div key={key} className="space-y-2.5 py-4">
      {lines.map((l, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: l.s === "Agent" ? -12 : 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: l.d }}
          className={`flex ${l.s === "Agent" ? "justify-start" : "justify-end"}`}
        >
          <span className={`max-w-[78%] rounded-xl px-3 py-2 text-xs ${
            l.s === "Agent"
              ? "bg-primary/[0.1] text-primary"
              : "bg-slate-100 text-slate-700"
          }`}>
            <span className="mr-1.5 text-[9px] font-bold opacity-50">{l.s}</span>{l.t}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

const BARS = [38, 52, 46, 68, 60, 80, 74, 92]
function AnalyticsVisual() {
  const [k, setK] = useState(0)
  useEffect(() => { const t = setInterval(() => setK(x => x + 1), 2800); return () => clearInterval(t) }, [])
  return (
    <div className="py-4">
      <div key={k} className="mb-3 flex items-end gap-2" style={{ height: 80 }}>
        {BARS.map((h, i) => (
          <motion.div key={i}
            className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-primary/40"
            style={{ height: `${h}%`, originY: 1 }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 0.04 * i }}
          />
        ))}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Mon</span>
        <motion.span key={k} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="font-semibold text-primary">+{BARS[BARS.length-1]}% resolved</motion.span>
        <span>Sun</span>
      </div>
    </div>
  )
}

const DOTS = Array.from({ length: 16 })
function ConcurrencyVisual() {
  return (
    <div className="py-4">
      <div className="grid grid-cols-8 gap-2">
        {DOTS.map((_, i) => (
          <motion.div key={i}
            className="aspect-square rounded-lg bg-primary/20"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ type: "spring", delay: i * 0.04, stiffness: 300, damping: 18 }}
          >
            <motion.div className="h-full w-full rounded-lg bg-primary/60"
              animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.7, 1, 0.7] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
            />
          </motion.div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">Each cell = 1 concurrent agent</p>
    </div>
  )
}

function ScheduleVisual() {
  const slots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"]
  const [booked, setBooked] = useState(1)
  useEffect(() => { const t = setInterval(() => setBooked(b => (b + 1) % slots.length), 1500); return () => clearInterval(t) }, [])
  return (
    <div className="py-4">
      <div className="grid grid-cols-3 gap-2">
        {slots.map((s, i) => (
          <motion.div key={s}
            animate={i === booked ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.4 }}
            className={`rounded-lg border px-3 py-2.5 text-center text-xs font-medium transition-all duration-300 ${
              i === booked ? "border-primary bg-primary text-white shadow-sm" :
              i < booked ? "border-emerald-200 bg-emerald-50 text-emerald-700" :
              "border-border bg-slate-50 text-muted-foreground"
            }`}
          >
            {s}
          </motion.div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">TRAI calling window enforced</p>
    </div>
  )
}

function ForwardingVisual() {
  const [active, setActive] = useState(0)
  const routes = [
    { label: "Sales team", color: "text-blue-600 bg-blue-50 border-blue-200" },
    { label: "Support desk", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { label: "Billing dept", color: "text-violet-600 bg-violet-50 border-violet-200" },
  ]
  useEffect(() => { const t = setInterval(() => setActive(a => (a + 1) % routes.length), 1800); return () => clearInterval(t) }, [])
  return (
    <div className="py-4">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
          <PhoneForwarded className="h-5 w-5 text-primary" />
        </div>
        <div className="flex h-6 w-px bg-border" />
        <div className="flex flex-col gap-2 w-full">
          {routes.map((r, i) => (
            <motion.div key={r.label}
              animate={i === active ? { x: 4 } : { x: 0 }}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                i === active ? r.color : "border-border bg-slate-50/50 text-muted-foreground/50"
              }`}
            >
              {i === active && <motion.span className="h-1.5 w-1.5 rounded-full bg-current" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />}
              {r.label}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RecordingVisual() {
  const [t, setT] = useState(0)
  useEffect(() => { const id = setInterval(() => setT(x => x + 1), 1000); return () => clearInterval(id) }, [])
  const mm = String(Math.floor(t / 60)).padStart(2, "0")
  const ss = String(t % 60).padStart(2, "0")
  return (
    <div className="py-4">
      <div className="flex items-center justify-between rounded-2xl border border-red-100 bg-red-50 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
            <motion.div className="absolute inset-0 rounded-full bg-red-300/40" animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} transition={{ duration: 1.2, repeat: Infinity }} />
            <div className="h-3 w-3 rounded-full bg-red-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-red-700">REC</p>
            <p className="font-mono text-lg font-bold text-red-600">{mm}:{ss}</p>
          </div>
        </div>
        <div className="text-right text-xs text-red-400">
          <p>Encrypted</p>
          <p>Searchable</p>
        </div>
      </div>
    </div>
  )
}

function BillingVisual() {
  const [s, setS] = useState(0)
  useEffect(() => { const t = setInterval(() => setS(x => x + 1), 1000); return () => clearInterval(t) }, [])
  const cost = (s * 10 / 60).toFixed(4)
  return (
    <div className="py-4">
      <div className="rounded-2xl border border-primary/15 bg-primary/[0.04] p-5 text-center">
        <p className="text-xs text-muted-foreground mb-1">Amount charged so far</p>
        <motion.p key={s} className="text-4xl font-black text-primary" animate={{ scale: [1.04, 1] }} transition={{ duration: 0.2 }}>
          ₹{cost}
        </motion.p>
        <p className="mt-1 text-sm text-muted-foreground">{s} seconds · ₹10/min</p>
        <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-emerald-600 font-medium">
          <span>✓</span>
          <span>No minute-rounding ever</span>
        </div>
      </div>
    </div>
  )
}

/* ── Feature data — Analytics moved to last (pos 9, full-row) ── */
const features = [
  { icon: AudioLines,     label: "Sub-300ms Latency",     tag: "Speed",       color: "text-blue-600",    activeBg: "bg-blue-50 border-blue-200",    visual: <LatencyVisual />,      desc: "WebRTC audio on Indian media network. Conversations feel instant with near-zero perceptible lag for your callers." },
  { icon: Languages,      label: "10+ Indian Languages",  tag: "Multilingual",color: "text-violet-600",  activeBg: "bg-violet-50 border-violet-200", visual: <LanguageVisual />,     desc: "Native voices in Hindi, Tamil, Telugu, Kannada, Marathi, Bengali and more. Auto-detects dialect and switches mid-call." },
  { icon: MessageCircle,  label: "Natural Turn-Taking",   tag: "AI",          color: "text-cyan-600",    activeBg: "bg-cyan-50 border-cyan-200",     visual: <TurnTakingVisual />,   desc: "Smart endpointing, barge-in detection and interruption handling. The agent listens, pauses and responds like a real person." },
  { icon: Network,        label: "Massive Concurrency",   tag: "Scale",       color: "text-orange-600",  activeBg: "bg-orange-50 border-orange-200", visual: <ConcurrencyVisual />,  desc: "Scale from one call to thousands simultaneously. Burst capacity built in — no pre-provisioning or capacity planning needed." },
  { icon: CalendarClock,  label: "Call Scheduling",       tag: "Automation",  color: "text-purple-600",  activeBg: "bg-purple-50 border-purple-200", visual: <ScheduleVisual />,     desc: "Schedule outbound campaigns by time window or day of week. TRAI calling-window rules enforced automatically." },
  { icon: PhoneForwarded, label: "Call Forwarding",       tag: "Routing",     color: "text-teal-600",    activeBg: "bg-teal-50 border-teal-200",     visual: <ForwardingVisual />,   desc: "Route any call to a human agent, department or external number in real time. Define rules by intent, keyword or time." },
  { icon: Mic,            label: "Call Recording",        tag: "Security",    color: "text-red-600",     activeBg: "bg-red-50 border-red-200",       visual: <RecordingVisual />,    desc: "Every call recorded and stored securely. Full playback, download and audit trail available on every plan." },
  { icon: Timer,          label: "Per Second Billing",    tag: "Billing",     color: "text-indigo-600",  activeBg: "bg-indigo-50 border-indigo-200", visual: <BillingVisual />,      desc: "Pay only for the seconds your agent actually speaks. No minute-rounding, no idle charges, no surprises on your invoice." },
  { icon: Activity,       label: "Real Time Transcripts & Analytics", tag: "Analytics", color: "text-emerald-600", activeBg: "bg-emerald-50 border-emerald-200", visual: <AnalyticsVisual />, desc: "Speaker labels, sentiment, intents and conversion events — searchable and exportable from day one." },
]

const AUTO_INTERVAL = 3500

export function Features() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const startRef = useRef(Date.now())

  useEffect(() => {
    if (paused) return
    startRef.current = Date.now()
    setProgress(0)
    const raf = requestAnimationFrame(function tick() {
      const elapsed = Date.now() - startRef.current
      setProgress(Math.min(elapsed / AUTO_INTERVAL, 1))
      if (elapsed < AUTO_INTERVAL) requestAnimationFrame(tick)
      else { setActive(a => (a + 1) % features.length); setProgress(0); startRef.current = Date.now() }
    })
    return () => cancelAnimationFrame(raf)
  }, [active, paused])

  const f = features[active]

  return (
    <section id="features" className="border-b border-border">
      <div className="w-full px-6 py-20 md:px-8 md:py-28">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Features</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Everything your voice agent needs.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Built for Indian businesses — low latency, multi-language, TRAI-compliant, priced per second.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-[420px_1fr]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* ── Left: 2-column feature grid (2+2+2+2+1) ── */}
          <div className="grid grid-cols-2 gap-2">
            {features.map((feat, i) => {
              const Icon = feat.icon
              const isActive = i === active
              const isLast = i === features.length - 1
              return (
                <button
                  key={feat.label}
                  type="button"
                  onClick={() => { setActive(i); setProgress(0); startRef.current = Date.now() }}
                  className={`group relative flex items-start gap-3 overflow-hidden rounded-xl px-4 py-3.5 text-left transition-all duration-200 ${
                    isLast ? "col-span-2" : ""
                  } ${
                    isActive
                      ? "border border-border bg-white shadow-sm"
                      : "border border-transparent hover:border-border/60 hover:bg-slate-50"
                  }`}
                >
                  {/* Active progress bar */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] rounded-full bg-primary"
                      style={{ width: `${progress * 100}%` }}
                    />
                  )}
                  {/* Colored left accent bar */}
                  {isActive && (
                    <div className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-full ${feat.color.replace("text-", "bg-")}`} />
                  )}

                  <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 ${
                    isActive ? `${feat.activeBg} ${feat.color}` : "border-border bg-white text-muted-foreground/60 group-hover:border-border/80 group-hover:text-muted-foreground"
                  }`}>
                    <Icon className="h-4 w-4" />
                  </span>

                  <div className="min-w-0">
                    <p className={`text-[11px] font-semibold uppercase tracking-wide transition-colors duration-200 ${
                      isActive ? feat.color : "text-muted-foreground/50 group-hover:text-muted-foreground/70"
                    }`}>
                      {feat.tag}
                    </p>
                    <p className={`text-sm font-semibold leading-tight transition-colors duration-200 ${
                      isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}>
                      {feat.label}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* ── Right: feature detail ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex flex-col rounded-2xl border border-border bg-white p-8 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl border ${f.activeBg} ${f.color}`}>
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="text-xl font-bold tracking-tight text-foreground">{f.label}</h3>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>

              {/* Visual */}
              <div className="mt-4 flex-1">
                {f.visual}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
