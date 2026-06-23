"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AudioPlayer } from "@/components/audio-player"
import { ArrowRight, PhoneCall, Globe, Clock, ShieldCheck } from "lucide-react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

const stats = [
  { numeric: 300, suffix: "ms", label: "Voice Latency" },
  { numeric: 10, suffix: "+", label: "Indian Languages" },
  { numeric: 40, prefix: "+", suffix: "%", label: "Answer Rate" },
  { numeric: 99.99, suffix: "%", label: "Uptime SLA", decimals: 2 },
]

const highlights = [
  {
    icon: PhoneCall,
    color: "text-blue-600 bg-blue-50 border-blue-100",
    stat: "24/7",
    statColor: "text-blue-600",
    title: "Always Answers",
    desc: "Picks up on the first ring — day, night, weekends and public holidays.",
  },
  {
    icon: Globe,
    color: "text-violet-600 bg-violet-50 border-violet-100",
    stat: "10+",
    statColor: "text-violet-600",
    title: "Indian Languages",
    desc: "Hindi, Tamil, Telugu, Marathi, Bengali and more. Auto-detects mid-call.",
  },
  {
    icon: Clock,
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    stat: "0s",
    statColor: "text-emerald-600",
    title: "Wait Time",
    desc: "Qualify, route and book appointments instantly — no hold music, no queue.",
  },
  {
    icon: ShieldCheck,
    color: "text-orange-600 bg-orange-50 border-orange-100",
    stat: "TRAI",
    statColor: "text-orange-600",
    title: "Fully Compliant",
    desc: "DNC scrubbing, calling windows, DPDP localisation — pre-configured for India.",
  },
]

const callSteps = [
  { icon: PhoneCall,   label: "Incoming call" },
  { icon: Globe,       label: "Language detected" },
  { icon: ShieldCheck, label: "Intent understood" },
  { icon: Clock,       label: "Appointment booked" },
  { icon: PhoneCall,   label: "Routed to team" },
]

const transcript = [
  { speaker: "Agent",  text: "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?", delay: 0.3 },
  { speaker: "Caller", text: "I need to book an appointment please.", delay: 1.2 },
  { speaker: "Agent",  text: "Sure! Morning or evening works better?", delay: 2.1 },
  { speaker: "Caller", text: "Morning, around 10 AM.", delay: 3.0 },
]

function AnimatedStat({ numeric, prefix = "", suffix = "", label, decimals = 0 }: {
  numeric: number; prefix?: string; suffix?: string; label: string; decimals?: number
}) {
  const [value, setValue] = useState(0)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    if (!triggered) return
    const duration = 2000
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(parseFloat((numeric * eased).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [triggered, numeric, decimals])

  return (
    <motion.div onViewportEnter={() => setTriggered(true)} className="flex flex-col items-center gap-1 px-3 py-4 sm:gap-1.5 sm:px-6 sm:py-6">
      <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {prefix}{value.toFixed(decimals)}{suffix}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </motion.div>
  )
}

function Equalizer() {
  const bars = [0.45, 0.8, 0.35, 1, 0.6, 0.85, 0.5]
  return (
    <div className="flex h-4 items-end gap-[2px]" aria-hidden>
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-[2.5px] rounded-full bg-primary"
          animate={{ scaleY: [h, h * 0.4, h] }}
          transition={{ duration: 0.6 + i * 0.07, repeat: Infinity, ease: "easeInOut" }}
          style={{ height: "100%", transformOrigin: "bottom", scaleY: h }}
        />
      ))}
    </div>
  )
}

function Waveform() {
  // Deterministic per-bar profile so SSR and client match; animation runs after mount.
  const bars = Array.from({ length: 36 }, (_, i) => 5 + ((i * 13) % 22))
  return (
    <div className="flex items-center justify-center gap-[3px] overflow-hidden border-b border-border bg-gradient-to-r from-primary/[0.04] via-primary/[0.09] to-primary/[0.04] px-5 py-3">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] shrink-0 rounded-full bg-gradient-to-t from-primary/40 to-primary"
          style={{ height: h }}
          animate={{ scaleY: [0.4, 1.6, 0.7, 1.3, 0.4] }}
          transition={{ duration: 1 + (i % 6) * 0.18, repeat: Infinity, ease: "easeInOut", delay: (i % 9) * 0.07 }}
        />
      ))}
    </div>
  )
}

function LiveMetrics() {
  const [ms, setMs] = useState(288)
  useEffect(() => {
    let i = 0
    const t = setInterval(() => { i += 1; setMs(278 + Math.round(20 * Math.abs(Math.sin(i / 2)))) }, 900)
    return () => clearInterval(t)
  }, [])
  const items = [
    { label: "Latency", value: `${ms}ms`, accent: "text-primary" },
    { label: "Confidence", value: "98%", accent: "text-emerald-600" },
    { label: "Sentiment", value: "Positive", accent: "text-violet-600" },
  ]
  return (
    <div className="grid grid-cols-3 divide-x divide-border border-t border-border bg-slate-50/60">
      {items.map((m) => (
        <div key={m.label} className="flex flex-col items-center gap-0.5 px-2 py-2.5">
          <span className={`text-sm font-bold tabular-nums ${m.accent}`}>{m.value}</span>
          <span className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">{m.label}</span>
        </div>
      ))}
    </div>
  )
}

function LiveCallPanel() {
  const [step, setStep] = useState(0)
  const [tKey, setTKey] = useState(0)
  const [secs, setSecs] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % callSteps.length), 1500)
    return () => clearInterval(t)
  }, [])
  useEffect(() => {
    const t = setInterval(() => { setTKey(k => k + 1); setStep(0) }, 10000)
    return () => clearInterval(t)
  }, [])
  useEffect(() => {
    const t = setInterval(() => setSecs(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  const mm = String(Math.floor(secs / 60)).padStart(2, "0")
  const ss = String(secs % 60).padStart(2, "0")

  return (
    <div className="overflow-hidden rounded-2xl border-[3px] border-border bg-white shadow-[0_8px_40px_oklch(0_0_0/0.08)]">
      {/* Accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-[oklch(0.72_0.18_150)] to-primary" />

      {/* Call header */}
      <div className="flex items-center justify-between border-b border-border bg-slate-50 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center">
            {/* pulse rings */}
            <motion.span className="absolute inset-0 rounded-full bg-primary/20"
              animate={{ scale: [1, 1.7], opacity: [0.5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }} />
            <motion.span className="absolute inset-0 rounded-full bg-primary/20"
              animate={{ scale: [1, 1.7], opacity: [0.5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.9 }} />
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white shadow-sm">
              <PhoneCall className="h-4 w-4 text-primary" />
              <motion.span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500"
                animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">+91 98765 43210</p>
            <p className="text-[10px] text-muted-foreground">Hindi · Inbound</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-md bg-white px-1.5 py-0.5 font-mono text-[11px] font-semibold tabular-nums text-foreground ring-1 ring-border">
            {mm}:{ss}
          </span>
          <Equalizer />
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
            <motion.span className="h-1.5 w-1.5 rounded-full bg-emerald-500" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
            Live
          </span>
        </div>
      </div>

      {/* Live voice waveform */}
      <Waveform />

      {/* Transcript */}
      <div key={tKey} className="space-y-2.5 px-5 py-4">
        {transcript.map((line, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: line.delay }}
            className={`flex text-xs ${line.speaker === "Agent" ? "justify-start" : "justify-end"}`}
          >
            {line.speaker === "Agent" ? (
              <span className="max-w-[80%] rounded-xl rounded-tl-sm bg-primary/[0.1] px-3 py-2 text-primary">
                <span className="mr-1 text-[9px] font-bold opacity-50">Agent</span>{line.text}
              </span>
            ) : (
              <span className="max-w-[80%] rounded-xl rounded-tr-sm bg-slate-100 px-3 py-2 text-slate-700">
                <span className="mr-1 text-[9px] font-bold opacity-40">Caller</span>{line.text}
              </span>
            )}
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, delay: 4, times: [0, 0.1, 0.8, 1] }}
          className="flex justify-start"
        >
          <span className="inline-flex items-center gap-1 rounded-xl rounded-tl-sm bg-primary/[0.08] px-3 py-2">
            {[0, 0.12, 0.24].map((d, i) => (
              <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-primary/60"
                animate={{ y: [0, -3, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: d }} />
            ))}
          </span>
        </motion.div>
      </div>

      {/* Live metrics */}
      <LiveMetrics />

      {/* Step pipeline */}
      <div className="border-t border-border px-5 py-4">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Call pipeline</p>
        <div className="space-y-1.5">
          {callSteps.map((s, i) => {
            const Icon = s.icon
            const isDone = i < step
            const isCurrent = i === step
            return (
              <div key={i} className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-all duration-300 ${
                isCurrent ? "border border-primary/20 bg-primary/[0.06]" :
                isDone ? "border border-emerald-100 bg-emerald-50/60" :
                "opacity-35"
              }`}>
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${
                  isCurrent ? "bg-primary/15 text-primary" :
                  isDone ? "bg-emerald-100 text-emerald-600" :
                  "bg-slate-100 text-slate-400"
                }`}>
                  <Icon className="h-3 w-3" />
                </span>
                <span className={isCurrent ? "font-medium text-primary" : isDone ? "text-emerald-700" : "text-muted-foreground"}>
                  {s.label}
                </span>
                {isDone && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto text-[10px] text-emerald-500">✓</motion.span>}
                {isCurrent && (
                  <span className="ml-auto flex gap-0.5">
                    {[0, 0.1, 0.2].map((d, j) => (
                      <motion.span key={j} className="h-1 w-1 rounded-full bg-primary"
                        animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.7, repeat: Infinity, delay: d }} />
                    ))}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/50">
      {/* Glow */}
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-primary/[0.12] blur-[120px]" />
      {/* Floating particles */}
      {[
        { x: "12%", y: "22%", size: 3, delay: 0 },
        { x: "84%", y: "16%", size: 2, delay: 0.8 },
        { x: "60%", y: "72%", size: 3, delay: 1.6 },
        { x: "22%", y: "78%", size: 2, delay: 2.4 },
      ].map((p, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-primary/50"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
          animate={{ y: [-8, 8, -8], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}

      <div className="relative w-full px-6 pb-20 pt-8 md:px-8 md:pb-28 md:pt-12">
        {/* ── Top: positioning + live call ── */}
        <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left: content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              AI Voice Receptionist
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Answer every call like your{" "}
              <span className="bg-gradient-to-r from-primary via-[oklch(0.72_0.18_150)] to-primary/70 bg-clip-text text-transparent">
                best front desk.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              Greet callers, qualify requests, route to the right team, and book appointments — in 10+ Indian
              languages, around the clock. Clean per-second billing, no minute-rounding, no hidden markups.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-primary py-2 pl-8 pr-2 text-base font-semibold text-white shadow-[0_6px_24px_oklch(0.546_0.215_262.88/0.45)] transition-all hover:bg-primary/90 hover:shadow-[0_8px_32px_oklch(0.546_0.215_262.88/0.6)]"
              >
                <Link href="/get-started">
                  Build your first agent
                  <span className="flex size-7 items-center justify-center rounded-full bg-white/20">
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-border bg-white px-8 text-base font-semibold text-foreground hover:border-primary/30 hover:bg-slate-50"
              >
                <a href="#demo-audio">
                  <PhoneCall className="mr-2 h-4 w-4" />
                  Try the live demo
                </a>
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-5 text-xs text-muted-foreground"
            >
              Per-second billing · 10+ Indian languages · Sub-second latency · No contracts
            </motion.p>

            {/* Highlights — fill the left column to balance the console */}
            <div className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {highlights.map((h, i) => {
                const Icon = h.icon
                return (
                  <ScrollReveal key={h.title} delay={0.05 * i} className="flex items-start gap-3.5">
                    <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${h.color}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className={`text-sm font-bold ${h.statColor}`}>{h.stat}</span>
                        <span className="font-semibold text-foreground">{h.title}</span>
                      </div>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{h.desc}</p>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>

            {/* Stats strip — sits below the highlights, same column width */}
            <ScrollReveal className="mt-8 grid grid-cols-2 divide-x divide-y divide-border overflow-hidden rounded-2xl border-2 border-border bg-white sm:grid-cols-4 sm:divide-y-0">
              {stats.map((stat) => (
                <AnimatedStat key={stat.label} {...stat} />
              ))}
            </ScrollReveal>
          </div>

          {/* Right: live agent console + audio demo */}
          <ScrollReveal delay={0.2} className="flex h-full flex-col">
            <LiveCallPanel />
            <div id="demo-audio" className="mt-auto scroll-mt-24 pt-4">
              <AudioPlayer src="/audio/demo.mp3" title="Hear our agent in action" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
