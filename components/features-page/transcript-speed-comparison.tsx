"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Ear, Search } from "lucide-react"
import { CountUp } from "@/components/ui/count-up"

const CYCLE_MS = 3400

/**
 * "Why it matters" as a professional split-metric comparison card — two
 * side-by-side stat columns (manual vs. instant search) divided by a
 * center "faster" multiplier badge, styled like a boardroom analytics
 * report rather than a race/progress-bar animation. Full-width instead of
 * a narrow centered card, so it fills the section instead of leaving open
 * margin on either side.
 */
export function TranscriptSpeedComparison() {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    setRevealed(false)
    const id = setTimeout(() => setRevealed(true), 500)
    const reset = setTimeout(() => setRevealed(false), CYCLE_MS)
    return () => {
      clearTimeout(id)
      clearTimeout(reset)
    }
  }, [])

  useEffect(() => {
    const loop = setInterval(() => {
      setRevealed(false)
      setTimeout(() => setRevealed(true), 400)
    }, CYCLE_MS)
    return () => clearInterval(loop)
  }, [])

  return (
    <div className="relative mt-8 w-full overflow-hidden rounded-3xl border border-border/60 bg-white shadow-[0_24px_60px_-30px_rgba(15,23,42,0.2)]">
      <div className="flex items-center justify-between border-b border-border/60 bg-[#F7F9FC] px-6 py-4 sm:px-10">
        <p className="text-sm font-bold tracking-tight text-foreground">Finding one moment in a call</p>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
          <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden />
          Live
        </span>
      </div>

      <div className="relative grid sm:grid-cols-2">
        {/* divider + multiplier badge, desktop only */}
        <div className="pointer-events-none absolute inset-y-6 left-1/2 hidden w-px -translate-x-1/2 bg-border/60 sm:block" />
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-primary px-4 py-3 text-white shadow-[0_16px_32px_-14px_oklch(0.546_0.215_262.88/0.6)] sm:flex"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: revealed ? 1 : 0.7, opacity: revealed ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 20 }}
        >
          <span className="text-xl font-black leading-none">
            <CountUp value={192} once={false} duration={0.7} />x
          </span>
          <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-wide text-white/80">Faster</span>
        </motion.div>

        <div className="flex flex-col items-center gap-3 px-6 py-8 text-center sm:items-start sm:px-10 sm:text-left">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
            <Ear className="size-4.5" aria-hidden />
          </span>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Manual search</p>
          <p className="font-mono text-4xl font-extrabold tracking-tight text-slate-400 sm:text-5xl">38.4s</p>
          <p className="max-w-[26ch] text-sm leading-relaxed text-muted-foreground">
            Scrubbing through the recording by ear, guessing where the moment might be.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 border-t border-border/60 px-6 py-8 text-center sm:items-start sm:border-t-0 sm:px-10 sm:text-left">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Search className="size-4.5" aria-hidden />
          </span>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">9278.io transcript search</p>
          <p className="font-mono text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">0.2s</p>
          <p className="max-w-[26ch] text-sm leading-relaxed text-muted-foreground">
            Search the transcript for "refund" and jump straight to that exact moment.
          </p>
        </div>
      </div>

      {/* multiplier badge, mobile — inline instead of overlapping a divider */}
      <div className="flex items-center justify-center gap-2 border-t border-border/60 bg-[#F7F9FC] py-3 sm:hidden">
        <span className="text-lg font-black text-primary">
          <CountUp value={192} once={false} duration={0.7} />x
        </span>
        <span className="text-xs font-semibold text-muted-foreground">faster to find the exact moment</span>
      </div>
    </div>
  )
}
