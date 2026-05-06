"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AudioPlayer } from "@/components/audio-player"
import { ArrowRight, PhoneCall } from "lucide-react"
import { motion } from "motion/react"

const stats = [
  { numeric: 10, suffix: "M+", label: "Calls Automated" },
  { numeric: 15, suffix: "+", label: "Indian Languages" },
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
      <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {prefix}{value.toFixed(decimals)}{suffix}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </motion.div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.22_0.018_252/0.2)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.22_0.018_252/0.2)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />
        {/* Single static glow — was two animated blurs at 120px / 80px,
            each forcing a fresh GPU rasterisation per keyframe. Static
            looks the same and costs nothing after first paint. */}
        <div
          className="absolute -top-32 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-primary/[0.08] blur-[120px]"
        />
        {/* Reduced from 8 → 4 particles (still feels alive, half the rAF
            tick volume). */}
        {[
          { x: "15%", y: "20%", size: 3, delay: 0 },
          { x: "80%", y: "15%", size: 2, delay: 0.8 },
          { x: "65%", y: "70%", size: 3, delay: 1.6 },
          { x: "25%", y: "75%", size: 2, delay: 2.4 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/40"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
            animate={{ y: [-8, 8, -8], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12 text-center md:px-6 md:pb-28 md:pt-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.08] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          India's #1 AI Voice Agent Platform
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto max-w-5xl text-balance text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          AI Voice Agents Built for{" "}
          <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
            Indian Businesses
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Handle inbound and outbound calls in Hindi, Tamil, Telugu, Marathi, Bengali, and
          15+ Indian languages. TRAI-compliant, sub-second latency, Indian phone numbers — live in hours.
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
            className="h-12 rounded-xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_0_32px_oklch(0.78_0.16_195/0.35)] transition-all hover:bg-primary/90 hover:shadow-[0_0_48px_oklch(0.78_0.16_195/0.5)]"
          >
            <Link href="/get-started">
              Start Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-xl border-border bg-white/[0.04] px-8 text-base font-semibold backdrop-blur-sm transition-all hover:border-border/80 hover:bg-white/[0.07]"
          >
            <a href="https://dashboard.9278.io/login">
              <PhoneCall className="mr-2 h-4 w-4" />
              Contact Sales
            </a>
          </Button>
        </motion.div>

        {/* Trust text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 text-xs text-muted-foreground/70"
        >
          Trusted by 500+ Indian businesses · TRAI Compliant · DPDP Act Ready · Data Stored in India
        </motion.p>

        {/* Demo audio */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mx-auto mt-10 w-full max-w-xl"
        >
          <AudioPlayer src="/audio/demo.mp3" title="Hear our agent in action" />
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-2 divide-x divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm md:grid-cols-4 md:divide-y-0"
        >
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
