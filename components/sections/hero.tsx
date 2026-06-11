"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AudioPlayer } from "@/components/audio-player"
import { ArrowRight, PhoneCall } from "lucide-react"
import { motion } from "motion/react"

const stats = [
  { value: "300ms", label: "Voice Latency" },
  { value: "10+", label: "Indian Languages" },
  { value: "+40%", label: "Answer Rate" },
  { value: "99.99%", label: "Uptime SLA" },
]

const transcript = [
  { speaker: "Agent", text: "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?", delay: 0.2 },
  { speaker: "Caller", text: "I need to book an appointment.", delay: 1.0 },
  { speaker: "Agent", text: "Sure! Morning or evening works better for you?", delay: 1.8 },
  { speaker: "Caller", text: "Morning, around 10 AM please.", delay: 2.6 },
]

export function Hero() {
  const [key, setKey] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setKey(k => k + 1), 9000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="overflow-hidden border-b border-border">
      <div className="mx-auto flex min-h-[600px] w-full max-w-7xl flex-col lg:flex-row">

        {/* ── Left — dark panel ── */}
        <div className="relative flex flex-1 flex-col justify-between bg-slate-900 px-8 py-14 md:px-12 md:py-16">
          {/* Subtle grid */}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0/0.04)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
          {/* Glow */}
          <div aria-hidden className="pointer-events-none absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-primary/25 blur-[80px]" />

          <div className="relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.15] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              AI Voice Platform for India
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="max-w-lg text-balance text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              AI Voice Agents That{" "}
              <span className="text-[oklch(0.72_0.18_150)]">
                Actually Sound Human.
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-5 max-w-sm text-sm leading-relaxed text-white/60"
            >
              Handle inbound &amp; outbound calls in Hindi, Tamil, Telugu and 10+ Indian languages.
              Per-second billing — no minute-rounding, no hidden markups.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Button
                asChild
                size="lg"
                className="h-12 rounded-xl bg-primary px-7 text-sm font-semibold text-white shadow-[0_4px_24px_oklch(0.52_0.22_265/0.4)] hover:bg-primary/90"
              >
                <Link href="/get-started">
                  Build your first agent
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-white/20 bg-white/[0.07] px-7 text-sm font-semibold text-white hover:bg-white/[0.13] hover:border-white/30"
              >
                <a href="#demo-audio">
                  <PhoneCall className="mr-2 h-4 w-4" />
                  Try live demo
                </a>
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-5 text-xs text-white/30"
            >
              Per-second billing · No contracts · GST invoices · Indian phone numbers
            </motion.p>
          </div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="relative z-10 mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3">
                <p className="text-xl font-bold tracking-tight text-white">{s.value}</p>
                <p className="mt-0.5 text-xs text-white/45">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right — light panel ── */}
        <div className="flex w-full flex-col justify-center gap-6 bg-slate-50 px-8 py-12 lg:w-[42%] lg:shrink-0 lg:px-10">
          {/* Audio demo */}
          <motion.div
            id="demo-audio"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="scroll-mt-24"
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Hear our agent live
            </p>
            <AudioPlayer src="/audio/demo.mp3" title="Live call demo" />
          </motion.div>

          {/* Conversation preview */}
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Sample conversation
            </p>
            <div className="space-y-2.5 rounded-2xl border border-border bg-white p-4 shadow-sm">
              {transcript.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: line.speaker === "Agent" ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: line.delay }}
                  className={`flex text-xs ${line.speaker === "Agent" ? "justify-start" : "justify-end"}`}
                >
                  {line.speaker === "Agent" ? (
                    <span className="max-w-[82%] rounded-xl bg-primary/[0.12] px-3 py-2 text-primary ring-1 ring-primary/20">
                      <span className="mr-1.5 text-[10px] font-bold opacity-50">Agent</span>
                      {line.text}
                    </span>
                  ) : (
                    <span className="max-w-[82%] rounded-xl bg-slate-100 px-3 py-2 text-slate-700 ring-1 ring-slate-200">
                      <span className="mr-1.5 text-[10px] font-bold opacity-40">Caller</span>
                      {line.text}
                    </span>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.5, delay: 3.6, times: [0, 0.1, 0.8, 1] }}
                className="flex justify-start"
              >
                <span className="inline-flex items-center gap-1 rounded-xl bg-primary/[0.08] px-3 py-2">
                  {[0, 0.15, 0.3].map((d, i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-primary/60"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: d }}
                    />
                  ))}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
