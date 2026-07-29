"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight, PhoneCall, Globe, Clock, ShieldCheck, Check,
  CheckCircle2, LayoutGrid, Copy, Play, Download,
} from "lucide-react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

/* ── Left-column highlights ── */
const highlights = [
  { icon: PhoneCall,   stat: "24/7", title: "Always Answers",   color: "text-blue-600",    tile: "bg-blue-50" },
  { icon: Globe,       stat: "10+",  title: "Indian Languages", color: "text-violet-600",  tile: "bg-violet-50" },
  { icon: Clock,       stat: "0s",   title: "Wait Time",        color: "text-emerald-600", tile: "bg-emerald-50" },
  { icon: ShieldCheck, stat: "TRAI", title: "Fully Compliant",  color: "text-orange-600",  tile: "bg-orange-50" },
]

/* ── Small animated audio bars (used in the left badge) ── */
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

/* ── Call-analytics dashboard mockup ── */

const recentCalls = [
  { title: "Insurance", subtitle: "Motor insurance policy", duration: "3m 58s", active: true },
  { title: "E-Commerce", subtitle: "Cart abandoned", duration: "5m 29s", active: false },
  { title: "Customer Support", subtitle: "Wallet support", duration: "2m 07s", active: false },
]

const metrics = [
  { label: "Criteria met", value: "1/1", color: "text-foreground" },
  { label: "Relevance", value: "82%", color: "text-emerald-600" },
  { label: "Tool calls", value: "100%", color: "text-emerald-600" },
  { label: "Obedience", value: "84%", color: "text-emerald-600" },
]

const issues = [
  {
    tag: "Hallucination",
    title: "Misinformed about policy",
    desc: "Agent provided incorrect information about car pickups and dropoffs, deviating from the script.",
  },
  {
    tag: "Interruptions",
    title: "Speaking over the customer",
    desc: "Agent spoke over the customer twice, and did not wait for a response once.",
  },
]

const waveform = Array.from({ length: 42 }, (_, i) => 6 + ((i * 13) % 20))

const trendSeries = [
  { label: "Relevance", color: "bg-blue-500", stroke: "oklch(0.6 0.19 255)", values: [62, 70, 58, 75, 68, 80, 74] },
  { label: "Obedience", color: "bg-violet-500", stroke: "oklch(0.58 0.2 295)", values: [50, 60, 55, 65, 58, 66, 60] },
  { label: "Latency", color: "bg-orange-500", stroke: "oklch(0.68 0.18 55)", values: [30, 45, 35, 50, 40, 55, 48] },
]

function buildPoints(values: number[], width: number, height: number) {
  const max = 100
  const step = width / (values.length - 1)
  return values.map((v, i) => `${i * step},${height - (v / max) * height}`).join(" ")
}

function RecentCallsCard() {
  return (
    <div className="rounded-2xl border border-blue-100/80 bg-white/95 p-3.5 shadow-[0_16px_40px_-26px_oklch(0.52_0.22_265/0.3)] backdrop-blur">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-foreground">Recent calls</p>
        <p className="text-[11px] text-muted-foreground">{recentCalls.length}</p>
      </div>
      <div className="mt-2.5 flex flex-col gap-1">
        {recentCalls.map((c) => (
          <div
            key={c.title}
            className={`flex items-center gap-2 rounded-xl px-2 py-1.5 ${c.active ? "bg-slate-100" : ""}`}
          >
            <span className={`size-1.5 shrink-0 rounded-full ${c.active ? "bg-emerald-500" : "bg-emerald-500/60"}`} aria-hidden />
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-[11px] font-semibold text-foreground">{c.title}</p>
              <p className="truncate text-[10px] text-muted-foreground">{c.subtitle}</p>
            </div>
            <span className="shrink-0 text-[10px] text-muted-foreground">{c.duration}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TrendsCard() {
  const w = 200
  const h = 56
  return (
    <div className="rounded-2xl border border-blue-100/80 bg-white/95 p-3.5 shadow-[0_16px_40px_-26px_oklch(0.52_0.22_265/0.3)] backdrop-blur">
      <div className="flex items-start justify-between gap-2">
        <div className="leading-tight">
          <p className="text-xs font-bold text-foreground">Trends · last 7 days</p>
          <p className="text-[10px] text-muted-foreground">Per-metric performance</p>
        </div>
        <div className="flex shrink-0 flex-col gap-0.5">
          {trendSeries.map((s) => (
            <span key={s.label} className="flex items-center gap-1 text-[9px] text-muted-foreground">
              <span className={`size-1.5 rounded-full ${s.color}`} aria-hidden />
              {s.label}
            </span>
          ))}
        </div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 h-14 w-full overflow-visible">
        {trendSeries.map((s) => (
          <polyline
            key={s.label}
            points={buildPoints(s.values, w, h)}
            fill="none"
            stroke={s.stroke}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
      <div className="mt-1 flex justify-between text-[9px] text-muted-foreground/70">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  )
}

function CallDetailCard() {
  return (
    <div className="rounded-2xl border border-blue-100/80 bg-white/95 p-4 shadow-[0_16px_40px_-26px_oklch(0.52_0.22_265/0.3)] backdrop-blur">
      {/* header */}
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-foreground">
          R
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="flex items-center gap-1.5 truncate text-sm font-bold text-foreground">
            Rahul <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden /> Insurance
          </p>
          <button
            type="button"
            className="mt-0.5 flex items-center gap-1 text-[10px] text-muted-foreground transition-colors hover:text-primary"
          >
            Copy Call ID <Copy className="size-2.5" aria-hidden />
          </button>
        </div>
      </div>

      {/* meta row */}
      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-blue-100/70 pt-3">
        <div className="leading-tight">
          <p className="text-[10px] text-muted-foreground">Call completed</p>
          <p className="text-[11px] font-semibold text-foreground">May 11, 10:19am</p>
        </div>
        <div className="leading-tight">
          <p className="text-[10px] text-muted-foreground">Call Duration</p>
          <p className="text-[11px] font-semibold text-foreground">3m 58s</p>
        </div>
        <div className="leading-tight">
          <p className="text-[10px] text-muted-foreground">Call Status</p>
          <p className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
            <CheckCircle2 className="size-3" aria-hidden /> Success
          </p>
        </div>
      </div>

      {/* waveform player */}
      <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-border bg-slate-50 px-3 py-2">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-white">
          <Play className="size-3 fill-current" aria-hidden />
        </span>
        <span className="shrink-0 text-[10px] text-muted-foreground">0:00</span>
        <div className="flex h-4 flex-1 items-end gap-[2px] overflow-hidden" aria-hidden>
          {waveform.map((h, i) => (
            <span
              key={i}
              className={`w-[2px] rounded-full ${i < 3 ? "bg-orange-400" : "bg-primary/20"}`}
              style={{ height: h }}
            />
          ))}
        </div>
        <span className="shrink-0 text-[10px] text-muted-foreground">-3:58</span>
        <Download className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
      </div>

      {/* metric tiles */}
      <div className="mt-3 grid grid-cols-4 gap-1.5">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-lg bg-slate-50 px-1.5 py-2 text-center leading-tight">
            <p className={`text-sm font-bold ${m.color}`}>{m.value}</p>
            <p className="mt-0.5 text-[9px] text-muted-foreground">{m.label}</p>
          </div>
        ))}
      </div>

      {/* issues */}
      <div className="mt-3 flex items-center justify-between border-t border-blue-100/70 pt-3">
        <p className="text-xs font-bold text-foreground">Issues across this call</p>
        <p className="text-[10px] text-muted-foreground">{issues.length} flagged</p>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        {issues.map((it) => (
          <div key={it.title} className="rounded-xl border border-border bg-white px-3 py-2">
            <span className="inline-flex items-center rounded-full bg-rose-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-rose-600">
              {it.tag}
            </span>
            <p className="mt-1 text-[11px] font-semibold text-foreground">{it.title}</p>
            <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground">{it.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function CallAnalyticsMockup() {
  return (
    <div className="relative grid gap-3 sm:grid-cols-[190px_1fr]">
      <div className="flex flex-col gap-3">
        <RecentCallsCard />
        <TrendsCard />
      </div>
      <CallDetailCard />
    </div>
  )
}

/* ── Composed hero visual ── */
function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative mx-auto w-full max-w-[620px]"
    >
      {/* soft glow behind */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.12] blur-[90px]"
        aria-hidden
      />
      <CallAnalyticsMockup />
    </motion.div>
  )
}

export function Hero() {
  return (
    <section className="relative flex flex-col overflow-hidden border-b border-border/50 bg-gradient-to-b from-blue-50/50 via-background to-background lg:min-h-[calc(100vh-64px)] lg:justify-center">
      {/* Glow */}
      <div aria-hidden className="pointer-events-none absolute -top-32 right-0 h-[620px] w-[820px] rounded-full bg-primary/[0.1] blur-[130px]" />

      <div className="relative w-full px-6 pb-6 pt-3 md:px-8 md:pb-8 md:pt-4">
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
              className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[3.6rem]"
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
              className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              AI voice receptionist that greets, understands, qualifies and books — in 10+ Indian languages,
              around the clock.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
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
                <Link href="/features">
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  Features
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"
            >
              {["Per-second billing", "10+ Indian languages", "No contracts"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <Check className="size-4 text-emerald-600" aria-hidden /> {t}
                </span>
              ))}
            </motion.div>

            {/* Stats card — pinned to the bottom so it aligns with the panel */}
            <ScrollReveal className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border/60 sm:grid-cols-4">
              {highlights.map((h) => {
                const Icon = h.icon
                return (
                  <div key={h.title} className="flex flex-col items-center gap-1 bg-white px-3 py-3 text-center">
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
          <div id="demo-audio" className="flex scroll-mt-24 items-center justify-center lg:pt-2">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
