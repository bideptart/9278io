"use client"

import { useEffect, useRef, useState } from "react"
import {
  AudioLines, Languages, MessageCircle, Activity,
  Network, CalendarClock, PhoneForwarded, Mic, Timer,
  CheckCircle2, TrendingUp, Zap,
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

/* ══════════════════════════════════════════════════
   VISUALS
══════════════════════════════════════════════════ */

function LatencyVisual() {
  const rows = [
    { label: "Traditional IVR", ms: 2400, color: "bg-red-400" },
    { label: "Competitor A",    ms: 800,  color: "bg-orange-400" },
    { label: "9278.io",         ms: 94,   color: "bg-primary" },
  ]
  const max = 2400
  return (
    <div className="space-y-2.5">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Latency comparison</p>
      {rows.map((r, i) => (
        <div key={r.label} className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className={`font-medium ${i === 2 ? "text-primary" : "text-muted-foreground"}`}>{r.label}</span>
            <span className={`font-bold tabular-nums ${i === 2 ? "text-primary" : "text-muted-foreground"}`}>{r.ms} ms</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <motion.div className={`h-full rounded-full ${r.color}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${(r.ms / max) * 100}%` }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
      <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/[0.06] px-3 py-2">
        <motion.div className="h-1.5 w-1.5 rounded-full bg-primary" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity }} />
        <span className="text-xs font-bold text-primary">96% faster than legacy IVR</span>
      </div>
    </div>
  )
}

const LANGS = [
  { name: "Hindi",     script: "हिन्दी",   color: "bg-orange-50 text-orange-700 border-orange-200" },
  { name: "Tamil",     script: "தமிழ்",    color: "bg-red-50 text-red-700 border-red-200" },
  { name: "Telugu",    script: "తెలుగు",   color: "bg-green-50 text-green-700 border-green-200" },
  { name: "Kannada",   script: "ಕನ್ನಡ",   color: "bg-purple-50 text-purple-700 border-purple-200" },
  { name: "Marathi",   script: "मराठी",   color: "bg-blue-50 text-blue-700 border-blue-200" },
  { name: "Bengali",   script: "বাংলা",   color: "bg-teal-50 text-teal-700 border-teal-200" },
  { name: "Gujarati",  script: "ગુજરાતી", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  { name: "Punjabi",   script: "ਪੰਜਾਬੀ",  color: "bg-pink-50 text-pink-700 border-pink-200" },
  { name: "Malayalam", script: "മലയാളം",  color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  { name: "Odia",      script: "ଓଡ଼ିଆ",   color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
]
function LanguageVisual() {
  const [active, setActive] = useState(0)
  useEffect(() => { const t = setInterval(() => setActive(i => (i + 1) % LANGS.length), 1200); return () => clearInterval(t) }, [])
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center rounded-2xl border border-border bg-slate-50 py-5">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.25 }} className="text-center">
            <p className="text-4xl font-bold text-foreground">{LANGS[active].script}</p>
            <p className="mt-1 text-sm text-muted-foreground">{LANGS[active].name}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {LANGS.map((l, i) => (
          <span key={l.name} className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold transition-all duration-200 ${
            i === active ? l.color + " scale-105 shadow-sm" : "border-border bg-white text-muted-foreground/50"
          }`}>{l.name}</span>
        ))}
      </div>
    </div>
  )
}

function TurnTakingVisual() {
  const events = [
    { type: "agent",    text: "नमस्ते! How can I help you today?" },
    { type: "caller",   text: "I need to cancel my—" },
    { type: "barge",    text: "Barge-in detected" },
    { type: "agent",    text: "No problem, I can handle that. Can I get your booking ID?" },
    { type: "caller",   text: "It's BK-29371. Actually, can I reschedule instead?" },
    { type: "agent",    text: "Of course! What date works for you?" },
  ]
  const [shown, setShown] = useState(0)
  useEffect(() => {
    if (shown >= events.length) return
    const t = setTimeout(() => setShown(s => s + 1), shown === 0 ? 400 : 900)
    return () => clearTimeout(t)
  }, [shown])
  useEffect(() => { const t = setInterval(() => setShown(0), 9000); return () => clearInterval(t) }, [])

  return (
    <div className="space-y-2">
      {events.slice(0, shown).map((e, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
          className={`flex ${e.type === "caller" ? "justify-end" : "justify-start"}`}>
          {e.type === "barge" ? (
            <span className="flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-semibold text-amber-700">
              <Zap className="h-3 w-3" /> {e.text}
            </span>
          ) : (
            <span className={`max-w-[85%] rounded-xl px-3 py-2 text-xs ${
              e.type === "agent" ? "bg-primary/[0.1] text-primary" : "bg-slate-100 text-slate-700"
            }`}>
              <span className="mr-1 text-[9px] font-bold opacity-50">{e.type === "agent" ? "Agent" : "Caller"}</span>
              {e.text}
            </span>
          )}
        </motion.div>
      ))}
      {shown < events.length && (
        <div className="flex justify-start">
          <span className="inline-flex items-center gap-1 rounded-xl bg-primary/[0.08] px-3 py-2">
            {[0, 0.15, 0.3].map((d, i) => (
              <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-primary/60"
                animate={{ y: [0, -3, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: d }} />
            ))}
          </span>
        </div>
      )}
    </div>
  )
}

function ConcurrencyVisual() {
  const TOTAL = 32
  const [count, setCount] = useState(1)
  useEffect(() => {
    const t = setInterval(() => setCount(c => c < TOTAL ? c + 1 : 1), 250)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between rounded-xl border border-border bg-slate-50 px-3 py-2">
        <span className="text-xs text-muted-foreground">Active calls right now</span>
        <motion.span key={count} initial={{ scale: 1.25 }} animate={{ scale: 1 }} className="text-xl font-black text-primary">{count}</motion.span>
      </div>
      <div className="grid grid-cols-8 gap-1">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div key={i} className={`h-7 w-full rounded-md transition-colors duration-200 ${i < count ? "bg-primary" : "bg-primary/10"}`} />
        ))}
      </div>
      <p className="text-center text-[10px] text-muted-foreground">Each cell = 1 concurrent agent · scales to thousands</p>
    </div>
  )
}

function ScheduleVisual() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
  const slots = [
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [1, 1, 0, 0, 1],
  ]
  const times = ["9 AM", "12 PM", "3 PM"]
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-6 gap-1 text-[10px] text-muted-foreground">
        <span />
        {days.map(d => <span key={d} className="text-center font-semibold">{d}</span>)}
        {times.map((t, row) => (
          <>
            <span key={t} className="flex items-center text-[10px] text-muted-foreground">{t}</span>
            {slots[row].map((active, col) => (
              <motion.div key={col}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: row * 0.1 + col * 0.05 }}
                className={`rounded-md py-1.5 text-center text-[10px] font-medium ${
                  active ? "bg-primary text-white" : "bg-slate-100 text-slate-400"
                }`}
              >
                {active ? "●" : "○"}
              </motion.div>
            ))}
          </>
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2">
        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        <span className="text-xs font-medium text-emerald-700">TRAI 9 AM – 9 PM window enforced automatically</span>
      </div>
    </div>
  )
}

function ForwardingVisual() {
  const [active, setActive] = useState(0)
  const calls = [
    { lang: "Hindi",   intent: "Lead",    tag: "bg-blue-100 text-blue-700",   tagIntent: "bg-orange-100 text-orange-700" },
    { lang: "Tamil",   intent: "Support", tag: "bg-violet-100 text-violet-700", tagIntent: "bg-emerald-100 text-emerald-700" },
    { lang: "Marathi", intent: "Billing", tag: "bg-pink-100 text-pink-700",   tagIntent: "bg-indigo-100 text-indigo-700" },
  ]
  const dests = [
    { name: "Sales Team",   icon: "💼", color: "border-blue-200 bg-blue-50 text-blue-700",    activeRing: "ring-2 ring-blue-400" },
    { name: "Support Desk", icon: "🎧", color: "border-emerald-200 bg-emerald-50 text-emerald-700", activeRing: "ring-2 ring-emerald-400" },
    { name: "Billing Dept", icon: "🧾", color: "border-indigo-200 bg-indigo-50 text-indigo-700",  activeRing: "ring-2 ring-indigo-400" },
  ]
  useEffect(() => { const t = setInterval(() => setActive(a => (a + 1) % calls.length), 2200); return () => clearInterval(t) }, [])
  const c = calls[active]
  return (
    <div className="space-y-2">
      {/* Incoming call card */}
      <div className="flex items-center justify-between rounded-xl border border-border bg-slate-50 px-4 py-2">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Incoming call</p>
          <p className="mt-0.5 font-mono text-sm font-bold text-foreground">+91 98765 43210</p>
        </div>
        <div className="flex items-center gap-1.5">
          <AnimatePresence mode="wait">
            <motion.span key={c.lang} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${c.tag}`}>{c.lang}</motion.span>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.span key={c.intent} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${c.tagIntent}`}>{c.intent}</motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Connector */}
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-border" />
        <div className="rounded-full border border-primary/30 bg-primary/[0.08] px-3 py-1 text-[10px] font-semibold text-primary">
          Rule engine
        </div>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* 3-column destination grid */}
      <div className="grid grid-cols-3 gap-2 px-1">
        {dests.map((d, i) => (
          <motion.div key={d.name}
            animate={i === active ? { scale: 1.02 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className={`flex flex-col items-center gap-0.5 rounded-xl border px-1 py-1.5 text-center transition-all duration-300 ${d.color} ${i === active ? d.activeRing : "opacity-50"}`}
          >
            <span className="text-sm leading-none">{d.icon}</span>
            <span className="text-[10px] font-bold leading-tight">{d.name}</span>
            {i === active && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex items-center gap-0.5 text-[9px] font-semibold leading-none">
                <motion.span className="h-1 w-1 rounded-full bg-current"
                  animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
                Active
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function RecordingVisual() {
  const [secs, setSecs] = useState(0)
  const [transcript] = useState([
    { s: "Agent", t: "Your order will arrive by Thursday." },
    { s: "Caller", t: "Can I change the delivery address?" },
    { s: "Agent", t: "Of course, what's the new address?" },
  ])
  useEffect(() => { const t = setInterval(() => setSecs(x => x + 1), 1000); return () => clearInterval(t) }, [])
  const mm = String(Math.floor(secs / 60)).padStart(2, "0")
  const ss = String(secs % 60).padStart(2, "0")
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50/70 px-4 py-2.5">
        <div className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100">
          <motion.div className="absolute inset-0 rounded-full bg-red-300/40" animate={{ scale: [1, 1.6], opacity: [0.5, 0] }} transition={{ duration: 1.2, repeat: Infinity }} />
          <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-red-700">REC</span>
            <span className="font-mono text-sm font-bold text-red-600">{mm}:{ss}</span>
          </div>
          <p className="text-[10px] text-red-400">Encrypted · AES-256 · Stored in India</p>
        </div>
        <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-600">Live</span>
      </div>
      <div className="space-y-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Live transcript</p>
        {transcript.map((line, i) => (
          <div key={i} className={`flex gap-2 text-xs ${line.s === "Agent" ? "justify-start" : "justify-end"}`}>
            <span className={`rounded-lg px-2.5 py-1.5 ${line.s === "Agent" ? "bg-primary/[0.08] text-primary" : "bg-slate-100 text-slate-600"}`}>
              <span className="mr-1 text-[9px] font-bold opacity-50">{line.s}</span>{line.t}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function BillingVisual() {
  const [secs, setSecs] = useState(0)
  useEffect(() => { const t = setInterval(() => setSecs(x => x + 1), 1000); return () => clearInterval(t) }, [])
  const perSecCost = secs * 10 / 60
  const perMinCost = Math.ceil(secs / 60) * 10
  const saved = perMinCost - perSecCost
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-center">
          <p className="text-[10px] text-red-400">Per-minute billing</p>
          <p className="mt-1 text-xl font-black text-red-600">₹{perMinCost.toFixed(2)}</p>
          <p className="text-[10px] text-red-400">{Math.ceil(secs / 60)} min × ₹10</p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/[0.06] p-3 text-center">
          <p className="text-[10px] text-primary/70">Per-second billing</p>
          <motion.p key={secs} className="mt-1 text-xl font-black text-primary" animate={{ scale: [1.05, 1] }} transition={{ duration: 0.2 }}>
            ₹{perSecCost.toFixed(3)}
          </motion.p>
          <p className="text-[10px] text-primary/70">{secs}s × ₹0.167</p>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5">
        <TrendingUp className="h-4 w-4 text-emerald-600" />
        <div>
          <span className="text-xs font-bold text-emerald-700">Saving ₹{saved.toFixed(2)} right now</span>
          <p className="text-[10px] text-emerald-600">No minute-rounding, ever</p>
        </div>
      </div>
    </div>
  )
}

const ABAR = [42, 58, 51, 72, 68, 85, 79, 95]
function AnalyticsVisual() {
  const [k, setK] = useState(0)
  useEffect(() => { const t = setInterval(() => setK(x => x + 1), 3000); return () => clearInterval(t) }, [])
  const metrics = [
    { label: "Calls resolved",  value: "87%",  up: true,  color: "text-emerald-600 bg-emerald-50" },
    { label: "Avg call time",   value: "2m 14s", up: false, color: "text-blue-600 bg-blue-50" },
    { label: "Escalation rate", value: "13%",  up: false, color: "text-orange-600 bg-orange-50" },
  ]
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {metrics.map(m => (
          <div key={m.label} className={`rounded-xl p-3 text-center ${m.color}`}>
            <p className="text-lg font-black">{m.value}</p>
            <p className="mt-0.5 text-[9px] font-medium leading-tight opacity-70">{m.label}</p>
          </div>
        ))}
      </div>
      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Weekly resolution rate</p>
        <div key={k} className="flex items-end gap-1.5" style={{ height: 56 }}>
          {ABAR.map((h, i) => (
            <motion.div key={i}
              className={`flex-1 rounded-t-md ${h >= 85 ? "bg-primary" : h >= 70 ? "bg-primary/65" : "bg-primary/30"}`}
              style={{ height: `${h}%`, originY: 1 }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.4, delay: 0.04 * i }}
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[10px] text-muted-foreground/50">
          <span>Mon</span>
          <motion.span key={k} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="font-semibold text-primary">+{ABAR[ABAR.length-1]}% resolved this week</motion.span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   FEATURE DATA
══════════════════════════════════════════════════ */
const features = [
  { icon: AudioLines,     label: "Sub-300ms Latency",     tag: "Speed",       color: "text-blue-600",    activeBg: "bg-blue-50 border-blue-200",       visual: <LatencyVisual />,      desc: "WebRTC audio on Indian media network. Conversations feel instant with near-zero perceptible lag." },
  { icon: Languages,      label: "10+ Indian Languages",  tag: "Multilingual",color: "text-violet-600",  activeBg: "bg-violet-50 border-violet-200",   visual: <LanguageVisual />,     desc: "Native voices in Hindi, Tamil, Telugu, Kannada, Marathi, Bengali and more. Auto-detects dialect and switches mid-call." },
  { icon: MessageCircle,  label: "Natural Turn-Taking",   tag: "AI",          color: "text-cyan-600",    activeBg: "bg-cyan-50 border-cyan-200",       visual: <TurnTakingVisual />,   desc: "Smart endpointing, barge-in detection and interruption handling. The agent listens and responds like a real person." },
  { icon: Network,        label: "Massive Concurrency",   tag: "Scale",       color: "text-orange-600",  activeBg: "bg-orange-50 border-orange-200",   visual: <ConcurrencyVisual />,  desc: "Scale from one call to thousands simultaneously. Burst capacity built in — no pre-provisioning needed." },
  { icon: CalendarClock,  label: "Call Scheduling",       tag: "Automation",  color: "text-purple-600",  activeBg: "bg-purple-50 border-purple-200",   visual: <ScheduleVisual />,     desc: "Set calling windows by time of day or day of week. TRAI calling-window rules enforced automatically." },
  { icon: PhoneForwarded, label: "Call Forwarding",       tag: "Routing",     color: "text-teal-600",    activeBg: "bg-teal-50 border-teal-200",       visual: <ForwardingVisual />,   desc: "Route any call to a human agent, department or external number in real time. Define rules by intent, keyword or time." },
  { icon: Mic,            label: "Call Recording",        tag: "Security",    color: "text-red-600",     activeBg: "bg-red-50 border-red-200",         visual: <RecordingVisual />,    desc: "Every call recorded, encrypted and stored securely. Full playback, download and audit trail on every plan." },
  { icon: Timer,          label: "Per Second Billing",    tag: "Billing",     color: "text-indigo-600",  activeBg: "bg-indigo-50 border-indigo-200",   visual: <BillingVisual />,      desc: "Pay only for the seconds your agent actually speaks. No minute-rounding, no idle charges, no surprises." },
  { icon: Activity,       label: "Real Time Transcripts & Analytics", tag: "Analytics", color: "text-emerald-600", activeBg: "bg-emerald-50 border-emerald-200", visual: <AnalyticsVisual />, desc: "Speaker labels, sentiment, intents and conversion events — searchable and exportable from day one." },
]

const AUTO_INTERVAL = 3500

export function Features() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const startRef = useRef(Date.now())
  const leftRef = useRef<HTMLDivElement>(null)
  const [leftHeight, setLeftHeight] = useState<number | undefined>(undefined)

  // Match right panel height to left column height
  useEffect(() => {
    const el = leftRef.current
    if (!el) return
    const obs = new ResizeObserver(entries => {
      setLeftHeight(entries[0].contentRect.height)
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Auto-advance
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
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary"
          >
            <motion.span className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
            Features
          </motion.span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Everything your voice agent needs.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Built for Indian businesses — low latency, multi-language, TRAI-compliant, priced per second.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-[500px_1fr]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* ── Left: 2-col grid (2+2+2+2+1) ── */}
          <div ref={leftRef} className="grid grid-cols-2 content-start gap-2 self-start">
            {features.map((feat, i) => {
              const Icon = feat.icon
              const isActive = i === active
              const isLast = i === features.length - 1
              return (
                <button
                  key={feat.label}
                  type="button"
                  onClick={() => { setActive(i); setProgress(0); startRef.current = Date.now() }}
                  className={`group relative flex items-start gap-3 overflow-hidden rounded-xl px-4 py-3.5 text-left transition-all duration-200 ${isLast ? "col-span-2" : ""} ${
                    isActive
                      ? "border-2 border-primary/50 bg-white shadow-[0_0_0_3px_oklch(0.52_0.22_265/0.08)]"
                      : "border-2 border-primary/15 hover:border-primary/35 hover:bg-slate-50"
                  }`}
                >
                  {isActive && (
                    <motion.div className="absolute bottom-0 left-0 h-[2px] rounded-full bg-primary" style={{ width: `${progress * 100}%` }} />
                  )}
                  {isActive && (
                    <div className={`absolute bottom-3 left-0 top-3 w-[3px] rounded-full ${feat.color.replace("text-", "bg-")}`} />
                  )}
                  <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 ${
                    isActive ? `${feat.activeBg} ${feat.color}` : "border-border bg-white text-muted-foreground/60 group-hover:text-muted-foreground"
                  }`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className={`text-[11px] font-semibold uppercase tracking-wide ${isActive ? feat.color : "text-muted-foreground/50 group-hover:text-muted-foreground/70"}`}>{feat.tag}</p>
                    <p className={`text-sm font-semibold leading-tight ${isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>{feat.label}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* ── Right: feature detail — height locked to left column ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ height: leftHeight }}
              className="flex flex-col overflow-hidden rounded-2xl border-[3px] border-primary/30 bg-white p-7 shadow-[0_0_0_3px_oklch(0.52_0.22_265/0.06)]"
            >
              <div className="flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl border ${f.activeBg} ${f.color}`}>
                  <f.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className={`text-[10px] font-semibold uppercase tracking-wider ${f.color}`}>{f.tag}</p>
                  <h3 className="text-lg font-bold tracking-tight text-foreground">{f.label}</h3>
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>

              <div className="mt-5 flex-1 overflow-hidden">
                {f.visual}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
