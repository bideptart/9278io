"use client"

import { useEffect, useState } from "react"
import {
  AudioLines, Languages, MessageCircle, Activity,
  Network, CalendarClock, PhoneForwarded, Mic, Timer,
} from "lucide-react"
import { motion } from "motion/react"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"

const WAVE = [30, 55, 40, 70, 50, 85, 45, 72, 38, 65, 42, 78, 35, 60, 48]

function WaveformVisual() {
  return (
    <div className="mt-5 flex items-center gap-0.5" style={{ height: 36 }}>
      {WAVE.map((h, i) => (
        <motion.div
          key={i}
          className={`flex-1 rounded-full ${h >= 70 ? "bg-primary" : h >= 50 ? "bg-primary/60" : "bg-primary/30"}`}
          style={{ height: `${h}%` }}
          animate={{ scaleY: [1, 1.6, 0.4, 1.4, 0.7, 1] }}
          transition={{ duration: 1.3, repeat: Infinity, delay: i * 0.07, ease: "easeInOut" }}
        />
      ))}
      <div className="ml-2 flex items-center gap-1">
        <motion.div className="h-1.5 w-1.5 rounded-full bg-primary" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
        <span className="whitespace-nowrap text-[10px] font-semibold text-primary">94 ms avg</span>
      </div>
    </div>
  )
}

const LANGS = ["Hindi", "Tamil", "Telugu", "Kannada", "Marathi", "Bengali", "Gujarati", "Punjabi", "Malayalam", "Odia"]
function LangTicker() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % LANGS.length), 900)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="mt-5 flex flex-wrap gap-1.5">
      {LANGS.slice(0, 6).map((l, i) => (
        <motion.span
          key={l}
          animate={idx % LANGS.length === i ? { scale: 1.08 } : { scale: 1 }}
          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold transition-colors duration-200 ${
            idx % LANGS.length === i
              ? "border-primary/40 bg-primary/[0.12] text-primary"
              : "border-primary/20 bg-primary/[0.06] text-primary/70"
          }`}
        >
          {l}
        </motion.span>
      ))}
      <span className="rounded-full border border-border bg-slate-50 px-2.5 py-0.5 text-[10px] text-muted-foreground">+4 more</span>
    </div>
  )
}

const BAR_DATA = [45, 62, 58, 78, 72, 88, 82, 95]
function AnalyticsVisual() {
  const [key, setKey] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setKey(k => k + 1), 3000)
    return () => clearInterval(t)
  }, [])
  return (
    <div key={key} className="mt-5">
      <div className="flex items-end gap-1.5" style={{ height: 48 }}>
        {BAR_DATA.map((h, i) => (
          <motion.div
            key={i}
            className={`flex-1 rounded-t-sm ${h >= 85 ? "bg-primary" : h >= 70 ? "bg-primary/65" : "bg-primary/35"}`}
            style={{ height: `${h}%`, originY: 1 }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.45, delay: 0.05 * i, ease: "easeOut" }}
          />
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-muted-foreground/50">
        <span>Mon</span><span className="font-semibold text-primary/70">+{BAR_DATA[BAR_DATA.length - 1]}% resolved</span><span>Fri</span>
      </div>
    </div>
  )
}

const DOTS = Array.from({ length: 12 })
function ConcurrencyVisual() {
  return (
    <div className="mt-5 grid grid-cols-6 gap-1.5">
      {DOTS.map((_, i) => {
        const row = Math.floor(i / 6), col = i % 6
        return (
          <motion.div key={i} className="aspect-square rounded-md bg-primary/15"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.05 * i, stiffness: 300, damping: 18 }}
          >
            <motion.div className="h-full w-full rounded-md bg-primary/50"
              animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: (row + col) * 0.18, ease: "easeInOut" }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

function RecordingVisual() {
  return (
    <div className="mt-5 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50/60 px-4 py-3">
      <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-red-300/50 bg-red-100">
        <motion.div className="absolute inset-0 rounded-full bg-red-300/30" animate={{ scale: [1, 1.6], opacity: [0.5, 0] }} transition={{ duration: 1.3, repeat: Infinity }} />
        <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
      </div>
      <div>
        <p className="text-xs font-semibold text-foreground">Recording active</p>
        <p className="text-[10px] text-muted-foreground">Encrypted · searchable · downloadable</p>
      </div>
    </div>
  )
}

function BillingVisual() {
  const [secs, setSecs] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setSecs(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [])
  const cost = (secs * (10 / 60)).toFixed(3)
  return (
    <div className="mt-5 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/[0.05] px-4 py-3">
      <motion.div className="h-2 w-2 rounded-full bg-primary" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
      <div>
        <p className="text-[10px] text-muted-foreground">Live meter</p>
        <p className="text-xs font-bold text-primary">₹{cost} · {secs}s billed</p>
      </div>
      <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">₹10/min</span>
    </div>
  )
}

const features = [
  {
    icon: AudioLines, badge: "Real-Time", span: "md:col-span-2",
    title: "Sub-300ms Latency",
    description: "WebRTC audio with a distributed Indian media network. Conversations feel instant with near-zero perceptible lag.",
    visual: <WaveformVisual />,
  },
  {
    icon: Languages, badge: "Multilingual", span: "",
    title: "10+ Indian Languages",
    description: "Native voices in Hindi, Tamil, Telugu, Kannada, Marathi, Bengali and more. Auto-detects dialect mid-call.",
    visual: <LangTicker />,
  },
  {
    icon: MessageCircle, badge: "Conversational", span: "",
    title: "Natural Turn-Taking",
    description: "Smart endpointing, barge-in detection, and interruption handling. The agent listens, pauses, and responds like a person.",
    visual: null,
  },
  {
    icon: Activity, badge: "Analytics", span: "md:col-span-2",
    title: "Real Time Transcripts & Analytics",
    description: "Speaker labels, sentiment, intents, and conversion events — searchable and exportable from day one.",
    visual: <AnalyticsVisual />,
  },
  {
    icon: Network, badge: "Scale", span: "",
    title: "Massive Concurrency",
    description: "Scale from one call to thousands simultaneously. Burst capacity is built in — no pre-provisioning needed.",
    visual: <ConcurrencyVisual />,
  },
  {
    icon: CalendarClock, badge: "Scheduling", span: "",
    title: "Call Scheduling",
    description: "Schedule outbound campaigns by time window or day. TRAI calling-window enforced automatically.",
    visual: null,
  },
  {
    icon: PhoneForwarded, badge: "Routing", span: "",
    title: "Call Forwarding",
    description: "Route any call to a human agent, department, or external number in real time. Define rules by intent or keyword.",
    visual: null,
  },
  {
    icon: Mic, badge: "Security", span: "",
    title: "Call Recording",
    description: "Every call recorded and stored securely. Full playback, download, and audit trail included on every plan.",
    visual: <RecordingVisual />,
  },
  {
    icon: Timer, badge: "Billing", span: "",
    title: "Per Second Billing",
    description: "Pay only for the seconds your agent actually speaks — no minute-rounding, no idle time, no hidden charges.",
    visual: <BillingVisual />,
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

        <StaggerGroup className="mt-14 grid gap-4 md:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <StaggerItem key={f.title} className={f.span}>
                <motion.div
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary/25 hover:shadow-md"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="flex items-start justify-between">
                    <span className="w-fit rounded-full border border-primary/20 bg-primary/[0.07] px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                      {f.badge}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.07] text-primary">
                      <Icon className="h-[18px] w-[18px]" aria-hidden />
                    </span>
                  </div>

                  <h3 className="mt-4 font-bold tracking-tight text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>

                  {f.visual}
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
