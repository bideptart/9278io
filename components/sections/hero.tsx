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
    <section className="relative overflow-hidden border-b border-border bg-slate-900">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0/0.035)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.035)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]" />

      <div className="relative w-full px-6 py-16 text-center md:px-8 md:py-20 lg:py-24">

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
          className="mx-auto max-w-4xl text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          AI Voice Agents That{" "}
          <span className="text-[oklch(0.72_0.18_150)]">Actually Sound Human.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 md:text-lg"
        >
          Handle inbound &amp; outbound calls in Hindi, Tamil, Telugu and 10+ Indian languages.
          Per-second billing — no minute-rounding, no hidden markups.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            asChild
            size="lg"
            className="h-12 rounded-xl bg-primary px-8 text-sm font-semibold text-white shadow-[0_4px_24px_oklch(0.52_0.22_265/0.5)] hover:bg-primary/90"
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
            className="h-12 rounded-xl border-white/20 bg-white/[0.07] px-8 text-sm font-semibold text-white hover:bg-white/[0.13] hover:border-white/30"
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
          className="mt-4 text-xs text-white/30"
        >
          Per-second billing · No contracts · GST invoices · Indian phone numbers
        </motion.p>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-4">
              <p className="text-2xl font-bold tracking-tight text-white">{s.value}</p>
              <p className="mt-0.5 text-xs text-white/45">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Demo panel */}
        <motion.div
          id="demo-audio"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mx-auto mt-10 grid max-w-3xl gap-4 scroll-mt-24 sm:grid-cols-2"
        >
          {/* Audio player */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-left">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
              Hear our agent live
            </p>
            <AudioPlayer src="/audio/demo.mp3" title="Live call demo" />
          </div>

          {/* Conversation */}
          <div key={key} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-left">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
              Sample conversation
            </p>
            <div className="space-y-2">
              {transcript.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: line.speaker === "Agent" ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: line.delay }}
                  className={`flex text-xs ${line.speaker === "Agent" ? "justify-start" : "justify-end"}`}
                >
                  {line.speaker === "Agent" ? (
                    <span className="max-w-[85%] rounded-xl bg-primary/[0.2] px-3 py-2 text-primary ring-1 ring-primary/25">
                      <span className="mr-1.5 text-[10px] font-bold opacity-60">Agent</span>{line.text}
                    </span>
                  ) : (
                    <span className="max-w-[85%] rounded-xl bg-white/[0.1] px-3 py-2 text-white/80 ring-1 ring-white/10">
                      <span className="mr-1.5 text-[10px] font-bold opacity-40">Caller</span>{line.text}
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
                <span className="inline-flex items-center gap-1 rounded-xl bg-primary/[0.12] px-3 py-2">
                  {[0, 0.15, 0.3].map((d, i) => (
                    <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-primary/60"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: d }}
                    />
                  ))}
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
