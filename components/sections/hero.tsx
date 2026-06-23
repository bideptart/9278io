"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight, PhoneCall, Globe, Clock, ShieldCheck, Headphones,
  Zap, Smile, CalendarCheck, Users, MessageSquare, BarChart3, Check,
} from "lucide-react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

/* ── Data ── */
const highlights = [
  { icon: PhoneCall,   stat: "24/7", title: "Always Answers",   color: "text-blue-600",    tile: "bg-blue-50" },
  { icon: Globe,       stat: "10+",  title: "Indian Languages", color: "text-violet-600",  tile: "bg-violet-50" },
  { icon: Clock,       stat: "0s",   title: "Wait Time",        color: "text-emerald-600", tile: "bg-emerald-50" },
  { icon: ShieldCheck, stat: "TRAI", title: "Fully Compliant",  color: "text-orange-600",  tile: "bg-orange-50" },
]

const transcript = [
  { speaker: "Agent",  text: "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?", delay: 0.3 },
  { speaker: "Caller", text: "I need to book an appointment please.", delay: 1.2 },
  { speaker: "Agent",  text: "Sure! Morning or evening works better?", delay: 2.1 },
  { speaker: "Caller", text: "Morning, around 10 AM.", delay: 3.0 },
]

const journey = [
  { icon: PhoneCall,    label: "Incoming\nCall" },
  { icon: Globe,        label: "Language\nDetected" },
  { icon: MessageSquare,label: "Intent\nUnderstood" },
  { icon: CalendarCheck,label: "Appointment\nBooked" },
  { icon: Users,        label: "Routed to\nTeam" },
]

const railIcons = [PhoneCall, MessageSquare, Users, CalendarCheck, BarChart3]

const floatingChips = [
  { icon: Globe,        title: "10+ Indian", sub: "Languages",    color: "text-blue-600",    pos: "right-0 top-[8%]" },
  { icon: Headphones,   title: "24/7",       sub: "Always On",    color: "text-emerald-600", pos: "-right-3 top-[40%]" },
  { icon: CalendarCheck,title: "Smart",      sub: "Appointments", color: "text-violet-600",  pos: "-left-4 top-[58%]" },
]

/* ── Small animated audio bars ── */
function Bars({ count = 7, className = "" }: { count?: number; className?: string }) {
  const heights = Array.from({ length: count }, (_, i) => 5 + ((i * 11) % 16))
  return (
    <div className={`flex h-4 items-end gap-[2px] ${className}`} aria-hidden>
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="w-[2.5px] rounded-full bg-current"
          style={{ height: h, transformOrigin: "bottom" }}
          animate={{ scaleY: [0.45, 1, 0.6, 0.9, 0.45] }}
          transition={{ duration: 0.9 + (i % 5) * 0.14, repeat: Infinity, ease: "easeInOut", delay: (i % 7) * 0.08 }}
        />
      ))}
    </div>
  )
}

/* ── Full-width voice waveform inside the dashboard ── */
function Waveform() {
  const bars = Array.from({ length: 40 }, (_, i) => 4 + ((i * 13) % 20))
  return (
    <div className="flex h-12 items-center justify-center gap-[3px] overflow-hidden border-b border-border/70 bg-gradient-to-r from-primary/[0.03] via-primary/[0.08] to-primary/[0.03] px-4">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] shrink-0 rounded-full bg-gradient-to-t from-primary/40 to-primary"
          style={{ height: h, transformOrigin: "center" }}
          animate={{ scaleY: [0.4, 1, 0.6, 0.85, 0.4] }}
          transition={{ duration: 1 + (i % 6) * 0.16, repeat: Infinity, ease: "easeInOut", delay: (i % 9) * 0.06 }}
        />
      ))}
    </div>
  )
}

/* ── The dashboard / live-call console ── */
function DashboardPanel() {
  const [secs, setSecs] = useState(38)
  const [active, setActive] = useState(0)
  const [tKey, setTKey] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setSecs(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [])
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % journey.length), 1600)
    return () => clearInterval(t)
  }, [])
  useEffect(() => {
    const t = setInterval(() => { setTKey(k => k + 1); setActive(0) }, 10000)
    return () => clearInterval(t)
  }, [])

  const mm = String(Math.floor(secs / 60)).padStart(2, "0")
  const ss = String(secs % 60).padStart(2, "0")

  const metrics = [
    { icon: Zap,         value: "281ms",    label: "Latency",    color: "text-primary",     tile: "bg-primary/10" },
    { icon: ShieldCheck, value: "98%",      label: "Confidence", color: "text-emerald-600", tile: "bg-emerald-50" },
    { icon: Smile,       value: "Positive", label: "Sentiment",  color: "text-violet-600",  tile: "bg-violet-50" },
  ]

  return (
    <div className="flex overflow-hidden rounded-[2.4rem] border border-white/70 bg-white shadow-[0_44px_100px_-26px_oklch(0.52_0.22_265/0.5)] ring-1 ring-black/[0.04]">
      {/* Left nav rail */}
      <div className="hidden w-12 shrink-0 flex-col items-center gap-1.5 border-r border-border/70 bg-slate-50/80 py-4 sm:flex">
        {railIcons.map((Icon, i) => (
          <span
            key={i}
            className={`flex size-8 items-center justify-center rounded-xl transition-colors ${
              i === 0 ? "bg-primary text-white shadow-sm" : "text-muted-foreground/50 hover:bg-white"
            }`}
          >
            <Icon className="size-4" aria-hidden />
          </span>
        ))}
      </div>

      {/* Main */}
      <div className="min-w-0 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-full border border-border bg-white text-base shadow-sm">🇮🇳</span>
            <div className="leading-tight">
              <p className="text-[13px] font-bold text-foreground">+91 98765 43210</p>
              <p className="text-[10px] text-muted-foreground">Hindi · Inbound Call</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-semibold tabular-nums text-foreground">{mm}:{ss}</span>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
              <motion.span className="size-1.5 rounded-full bg-emerald-500" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
              Live
            </span>
          </div>
        </div>

        {/* Waveform */}
        <Waveform />

        {/* Transcript */}
        <div key={tKey} className="space-y-2 px-4 py-3.5">
          {transcript.map((line, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: line.delay }}
              className={`flex text-xs ${line.speaker === "Agent" ? "justify-start" : "justify-end"}`}
            >
              {line.speaker === "Agent" ? (
                <span className="max-w-[78%] rounded-2xl rounded-tl-sm bg-primary/[0.1] px-3 py-1.5 text-primary">
                  <span className="mr-1 text-[9px] font-bold opacity-50">Agent</span>{line.text}
                </span>
              ) : (
                <span className="max-w-[78%] rounded-2xl rounded-tr-sm bg-slate-100 px-3 py-1.5 text-slate-700">
                  <span className="mr-1 text-[9px] font-bold opacity-40">Caller</span>{line.text}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Metrics */}
        <div className="flex items-center gap-2 border-t border-border/70 px-4 py-3">
          {metrics.map((m) => {
            const Icon = m.icon
            return (
              <div key={m.label} className="flex flex-1 items-center gap-2">
                <span className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${m.tile} ${m.color}`}>
                  <Icon className="size-3.5" aria-hidden />
                </span>
                <div className="leading-tight">
                  <p className={`text-[13px] font-bold tabular-nums ${m.color}`}>{m.value}</p>
                  <p className="text-[9px] uppercase tracking-wide text-muted-foreground">{m.label}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Call journey */}
        <div className="border-t border-border/70 bg-slate-50/50 px-4 py-4">
          <p className="mb-3 text-[11px] font-semibold text-foreground">Call Journey</p>
          <div className="relative flex items-start justify-between">
            {/* connector line */}
            <div className="absolute left-4 right-4 top-4 h-[2px] -translate-y-1/2 bg-border" aria-hidden />
            <motion.div
              className="absolute left-4 top-4 h-[2px] -translate-y-1/2 bg-primary"
              animate={{ width: `${(active / (journey.length - 1)) * 88}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ maxWidth: "calc(100% - 2rem)" }}
              aria-hidden
            />
            {journey.map((s, i) => {
              const Icon = s.icon
              const done = i < active
              const current = i === active
              return (
                <div key={i} className="relative z-10 flex w-1/5 flex-col items-center gap-1.5">
                  <motion.span
                    animate={current ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                    transition={{ duration: 1, repeat: current ? Infinity : 0 }}
                    className={`flex size-8 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                      current ? "border-primary bg-primary text-white shadow-[0_0_0_4px_oklch(0.52_0.22_265/0.12)]" :
                      done ? "border-emerald-500 bg-emerald-500 text-white" :
                      "border-border bg-white text-muted-foreground/50"
                    }`}
                  >
                    {done ? <Check className="size-4" /> : <Icon className="size-4" />}
                  </motion.span>
                  <span className={`whitespace-pre text-center text-[9px] font-medium leading-tight ${
                    current ? "text-primary" : done ? "text-emerald-700" : "text-muted-foreground"
                  }`}>
                    {s.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Audio orb floating above the dashboard ── */
function AudioOrb() {
  return (
    <div className="relative flex size-32 items-center justify-center">
      {/* glowing platform under the orb */}
      <div className="absolute bottom-0 left-1/2 h-5 w-24 -translate-x-1/2 rounded-[50%] bg-primary/40 blur-lg" />
      {/* expanding pulse rings */}
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30"
          animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: i * 1.4 }}
        />
      ))}
      {/* flanking sound bars */}
      <div className="absolute -left-12 text-primary/80"><Bars count={6} /></div>
      <div className="absolute -right-12 text-primary/80"><Bars count={6} /></div>
      {/* glossy orb */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex size-24 items-center justify-center rounded-full shadow-[0_20px_55px_-8px_oklch(0.52_0.22_265/0.6)] ring-1 ring-white/50"
        style={{
          background:
            "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.9), rgba(255,255,255,0) 42%), linear-gradient(150deg, oklch(0.55 0.21 262), oklch(0.7 0.18 150))",
        }}
      >
        <Headphones className="size-10 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]" strokeWidth={1.6} aria-hidden />
      </motion.div>
    </div>
  )
}

/* ── Floating glass feature chip ── */
function FloatingChip({ chip, index }: { chip: typeof floatingChips[number]; index: number }) {
  const Icon = chip.icon
  return (
    <motion.div
      animate={{ y: [-6, 6, -6] }}
      transition={{ duration: 4 + index * 0.6, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
      className={`absolute z-20 hidden items-center gap-2.5 rounded-2xl border border-white/70 bg-white/80 px-3.5 py-2.5 shadow-[0_12px_30px_-10px_oklch(0.52_0.22_265/0.35)] backdrop-blur-md lg:flex ${chip.pos}`}
    >
      <span className={`flex size-8 items-center justify-center rounded-xl bg-slate-50 ${chip.color}`}>
        <Icon className="size-4" aria-hidden />
      </span>
      <div className="leading-tight">
        <p className="text-[13px] font-bold text-foreground">{chip.title}</p>
        <p className="text-[10px] text-muted-foreground">{chip.sub}</p>
      </div>
    </motion.div>
  )
}

/* ── Composed hero visual (orb + rings + chips + dashboard) ── */
function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
      {/* Decorations — centered on the panel (left ~72% of the area), lg only */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        <div className="absolute left-[44%] top-[36%] size-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.12] blur-[90px]" />
        <div className="absolute left-[44%] top-[38%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-primary/15" style={{ width: 600, height: 340 }} />
        <div className="absolute left-[44%] top-[38%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-primary/10" style={{ width: 460, height: 230 }} />
        <motion.div
          className="absolute left-[44%] top-[38%] -translate-x-1/2 -translate-y-1/2"
          style={{ width: 600, height: 340 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_10px_oklch(0.52_0.22_265/0.8)]" />
        </motion.div>
        <div className="absolute -bottom-10 left-[44%] -translate-x-1/2">
          {[260, 420, 580].map((s) => (
            <div key={s} className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-primary/[0.08]" style={{ width: s, height: s }} />
          ))}
        </div>
      </div>

      {/* Floating chips — in the right gutter, beside the panel */}
      {floatingChips.map((chip, i) => (
        <FloatingChip key={chip.title} chip={chip} index={i} />
      ))}

      {/* Panel + orb — contained to the left so chips have room on the right */}
      <div className="relative z-10 w-full lg:w-[86%]">
        {/* Audio orb floats above the panel */}
        <div className="absolute -top-6 left-1/2 z-20 hidden -translate-x-1/2 lg:block">
          <AudioOrb />
        </div>
        {/* tilt lives on a static wrapper so the entry animation can't override it */}
        <div className="lg:pt-24 lg:[perspective:1800px]">
          <div className="lg:[transform:rotateY(-8deg)_rotateX(3deg)_scale(1.06)]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <DashboardPanel />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-blue-50/50 via-background to-background">
      {/* Glow */}
      <div aria-hidden className="pointer-events-none absolute -top-32 right-0 h-[620px] w-[820px] rounded-full bg-primary/[0.1] blur-[130px]" />

      <div className="relative w-full px-6 pb-14 pt-4 md:px-8 md:pb-16 md:pt-6">
        <div className="grid items-stretch gap-14 lg:grid-cols-2 lg:gap-12">

          {/* ── Left ── */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-2 text-sm font-semibold uppercase tracking-wider text-primary"
            >
              <span className="text-primary"><Bars count={4} /></span>
              AI Voice Receptionist
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[4.2rem]"
            >
              Answer every call like your{" "}
              <span className="bg-gradient-to-r from-primary via-[oklch(0.62_0.2_240)] to-[oklch(0.72_0.18_150)] bg-clip-text text-transparent">
                best front desk.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              AI voice receptionist that greets, understands, qualifies and books — in 10+ Indian languages,
              around the clock.
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
                className="h-12 rounded-full bg-gradient-to-r from-primary to-[oklch(0.5_0.21_255)] py-2 pl-8 pr-2 text-base font-semibold text-white shadow-[0_8px_28px_oklch(0.546_0.215_262.88/0.45)] transition-all hover:shadow-[0_10px_36px_oklch(0.546_0.215_262.88/0.6)]"
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
                className="h-12 rounded-full border-border bg-white px-7 text-base font-semibold text-foreground hover:border-primary/30 hover:bg-slate-50"
              >
                <a href="#demo-audio">
                  <PhoneCall className="mr-2 h-4 w-4" />
                  Try live demo
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"
            >
              {["Per-second billing", "10+ Indian languages", "No contracts"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <Check className="size-4 text-emerald-600" aria-hidden /> {t}
                </span>
              ))}
            </motion.div>

            {/* Stats card — pinned to the bottom so it aligns with the dashboard */}
            <ScrollReveal className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border/60 sm:grid-cols-4 lg:mt-auto">
              {highlights.map((h) => {
                const Icon = h.icon
                return (
                  <div key={h.title} className="flex flex-col items-center gap-1 bg-white px-3 py-3.5 text-center">
                    <div className="flex items-center gap-2">
                      <span className={`flex size-8 items-center justify-center rounded-full ${h.tile} ${h.color}`}>
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <span className={`text-lg font-bold ${h.color}`}>{h.stat}</span>
                    </div>
                    <span className="text-[11px] leading-tight text-muted-foreground">{h.title}</span>
                  </div>
                )
              })}
            </ScrollReveal>
          </div>

          {/* ── Right: hero visual ── */}
          <div id="demo-audio" className="flex scroll-mt-24 items-center justify-center lg:pt-8">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
