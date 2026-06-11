"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AudioPlayer } from "@/components/audio-player"
import { ArrowRight, PhoneCall } from "lucide-react"
import { motion } from "motion/react"

const stats = [
  { numeric: 300, suffix: "ms", label: "Voice Latency" },
  { numeric: 10, suffix: "+", label: "Indian Languages" },
  { numeric: 40, prefix: "+", suffix: "%", label: "Answer Rate" },
  { numeric: 99.99, suffix: "%", label: "Uptime SLA", decimals: 2 },
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
      <span className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {prefix}{value.toFixed(decimals)}{suffix}
      </span>
      <span className="text-xs text-white/50">{label}</span>
    </motion.div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-slate-900">
      {/* Grid background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0/0.04)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />
      {/* Glow */}
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-primary/[0.12] blur-[120px]" />
      {/* Floating particles */}
      {[
        { x: "15%", y: "20%", size: 3, delay: 0 },
        { x: "80%", y: "15%", size: 2, delay: 0.8 },
        { x: "65%", y: "70%", size: 3, delay: 1.6 },
        { x: "25%", y: "75%", size: 2, delay: 2.4 },
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

      <div className="relative w-full px-6 pb-20 pt-12 text-center md:px-8 md:pb-28 md:pt-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.12] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          What's inside 9278.io
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto max-w-5xl text-balance text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Everything you need to ship a{" "}
          <span className="bg-gradient-to-r from-primary via-[oklch(0.72_0.18_150)] to-primary/60 bg-clip-text text-transparent">
            real voice agent.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg"
        >
          Clean per-second billing — no minute-rounding, no hidden markups. Pay only for what your agent actually talks.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="h-12 rounded-xl bg-primary px-8 text-base font-semibold text-white shadow-[0_4px_24px_oklch(0.52_0.22_265/0.45)] transition-all hover:bg-primary/90 hover:shadow-[0_4px_32px_oklch(0.52_0.22_265/0.6)]"
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
            className="h-12 rounded-xl border-white/20 bg-white/[0.07] px-8 text-base font-semibold text-white hover:border-white/30 hover:bg-white/[0.12]"
          >
            <a href="#demo-audio">
              <PhoneCall className="mr-2 h-4 w-4" />
              Try the live demo
            </a>
          </Button>
        </motion.div>

        {/* Trust text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 text-xs text-white/30"
        >
          Per-second billing · 10+ Indian languages · Sub-second latency · No contracts
        </motion.p>

        {/* Audio demo */}
        <motion.div
          id="demo-audio"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mx-auto mt-10 w-full max-w-xl scroll-mt-24"
        >
          <AudioPlayer src="/audio/demo.mp3" title="Hear our agent in action" />
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-2 divide-x divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] md:grid-cols-4 md:divide-y-0"
        >
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
