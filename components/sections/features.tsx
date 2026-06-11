"use client"

import { useEffect, useState } from "react"
import {
  AudioLines, Languages, MessageCircle, Activity,
  Network, CalendarClock, PhoneForwarded, Mic, Timer,
} from "lucide-react"
import { motion } from "motion/react"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"

/* ── Animated waveform ── */
const WAVE = [30, 55, 40, 70, 50, 85, 45, 72, 38, 65, 42, 78, 35, 60, 48]
function WaveformVisual() {
  return (
    <div className="mt-4 flex items-center gap-[2px]" style={{ height: 28 }}>
      {WAVE.map((h, i) => (
        <motion.div key={i}
          className="flex-1 rounded-full bg-blue-500/60"
          style={{ height: `${h}%` }}
          animate={{ scaleY: [1, 1.5, 0.5, 1.3, 0.8, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.06, ease: "easeInOut" }}
        />
      ))}
      <span className="ml-2 whitespace-nowrap text-[10px] font-semibold text-blue-600">94 ms</span>
    </div>
  )
}

/* ── Language pill ticker ── */
const LANGS = ["Hindi", "Tamil", "Telugu", "Kannada", "Marathi", "Bengali", "Punjabi", "Gujarati"]
function LangTicker() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % LANGS.length), 900)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="mt-4 flex flex-wrap gap-1">
      {LANGS.slice(0, 5).map((l, i) => (
        <span key={l} className={`rounded-full px-2 py-0.5 text-[10px] font-medium transition-all duration-200 ${
          idx % LANGS.length === i
            ? "bg-violet-100 text-violet-700 ring-1 ring-violet-300"
            : "bg-slate-100 text-slate-500"
        }`}>{l}</span>
      ))}
      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-400">+5</span>
    </div>
  )
}

/* ── Bar chart ── */
const BARS = [38, 52, 46, 68, 60, 80, 74, 92]
function BarsVisual() {
  const [k, setK] = useState(0)
  useEffect(() => { const t = setInterval(() => setK(x => x + 1), 3000); return () => clearInterval(t) }, [])
  return (
    <div key={k} className="mt-4 flex items-end gap-1" style={{ height: 32 }}>
      {BARS.map((h, i) => (
        <motion.div key={i}
          className="flex-1 rounded-t-sm bg-emerald-500/70"
          style={{ height: `${h}%`, originY: 1 }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.4, delay: 0.04 * i }}
        />
      ))}
    </div>
  )
}

/* ── Live billing meter ── */
function BillingMeter() {
  const [s, setS] = useState(0)
  useEffect(() => { const t = setInterval(() => setS(x => x + 1), 1000); return () => clearInterval(t) }, [])
  return (
    <div className="mt-4 flex items-center gap-2 rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2">
      <motion.div className="h-1.5 w-1.5 rounded-full bg-indigo-500" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
      <span className="text-xs font-bold text-indigo-700">₹{(s * 10 / 60).toFixed(3)}</span>
      <span className="text-[10px] text-indigo-400">· {s}s billed</span>
      <span className="ml-auto text-[10px] font-semibold text-indigo-500">₹10/min</span>
    </div>
  )
}

/* ── Recording pulse ── */
function RecordingPulse() {
  return (
    <div className="mt-4 flex items-center gap-2">
      <div className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100">
        <motion.div className="absolute inset-0 rounded-full bg-red-300/50" animate={{ scale: [1, 1.6], opacity: [0.5, 0] }} transition={{ duration: 1.2, repeat: Infinity }} />
        <div className="h-2 w-2 rounded-full bg-red-500" />
      </div>
      <span className="text-xs text-muted-foreground">Encrypted · searchable · downloadable</span>
    </div>
  )
}

const features = [
  {
    icon: AudioLines,
    title: "Sub-300ms Latency",
    description: "WebRTC audio on Indian media network. Conversations feel instant — zero perceptible lag.",
    extra: <WaveformVisual />,
    iconBg: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    icon: Languages,
    title: "10+ Indian Languages",
    description: "Native voices in Hindi, Tamil, Telugu, Kannada, Marathi, Bengali and more. Auto-detects mid-call.",
    extra: <LangTicker />,
    iconBg: "bg-violet-50 text-violet-600 border-violet-100",
  },
  {
    icon: MessageCircle,
    title: "Natural Turn-Taking",
    description: "Smart endpointing, barge-in detection and interruption handling. Responds like a real person.",
    extra: null,
    iconBg: "bg-cyan-50 text-cyan-600 border-cyan-100",
  },
  {
    icon: Activity,
    title: "Real Time Transcripts & Analytics",
    description: "Speaker labels, sentiment, intents and conversion events — searchable from day one.",
    extra: <BarsVisual />,
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    icon: Network,
    title: "Massive Concurrency",
    description: "Scale from one call to thousands with no pre-provisioning. Burst capacity built in.",
    extra: null,
    iconBg: "bg-orange-50 text-orange-600 border-orange-100",
  },
  {
    icon: CalendarClock,
    title: "Call Scheduling",
    description: "Schedule outbound campaigns by time window or day. TRAI calling-window enforced automatically.",
    extra: null,
    iconBg: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    icon: PhoneForwarded,
    title: "Call Forwarding",
    description: "Route any call to a human agent or department in real time. Define rules by intent or keyword.",
    extra: null,
    iconBg: "bg-teal-50 text-teal-600 border-teal-100",
  },
  {
    icon: Mic,
    title: "Call Recording",
    description: "Every call recorded and stored securely. Full playback, download and audit trail on every plan.",
    extra: <RecordingPulse />,
    iconBg: "bg-red-50 text-red-600 border-red-100",
  },
  {
    icon: Timer,
    title: "Per Second Billing",
    description: "Pay only for seconds your agent actually speaks. No minute-rounding, no hidden charges.",
    extra: <BillingMeter />,
    iconBg: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
]

export function Features() {
  return (
    <section id="features" className="border-b border-border">
      <div className="w-full px-6 py-20 md:px-8 md:py-28">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Features</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Everything your voice agent needs.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Built for Indian businesses — low latency, multi-language, TRAI-compliant, and priced per second.
          </p>
        </ScrollReveal>

        <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <StaggerItem key={f.title}>
                <motion.div
                  className="group relative flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Icon */}
                  <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${f.iconBg}`}>
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>

                  {/* Text */}
                  <h3 className="mt-4 font-bold tracking-tight text-foreground">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.description}</p>

                  {/* Optional visual */}
                  {f.extra}
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
