"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Ear, Loader2, Search } from "lucide-react"
import { CountUp } from "@/components/ui/count-up"

const RACE_DURATION = 2600

/**
 * "Why it matters" as a head-to-head speed race — two progress bars filling
 * at wildly different rates (manual scrubbing vs. instant transcript
 * search), with a big animated "x faster" multiplier callout. A race/
 * comparison composition, not the search-box + stat-card layout used
 * previously here, nor the timeline, filmstrip, or waveform-reveal
 * treatments used elsewhere on this page.
 */
export function TranscriptSearchDemo() {
  const [cycle, setCycle] = useState(0)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    setProgress(0)
    setDone(false)
    const start = Date.now()
    const interval = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - start) / RACE_DURATION) * 100)
      setProgress(pct)
      if (pct >= 100) {
        clearInterval(interval)
        setDone(true)
      }
    }, 30)
    const reset = setTimeout(() => setCycle((c) => c + 1), RACE_DURATION + 1800)
    return () => {
      clearInterval(interval)
      clearTimeout(reset)
    }
  }, [cycle])

  const manualPct = progress
  const searchPct = Math.min(100, progress * 40)

  return (
    <div className="relative mx-auto mt-8 max-w-2xl">
      <div aria-hidden className="pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10 rounded-[2rem] bg-primary/[0.06] blur-2xl" />
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-white p-6 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.25)] sm:p-8">
        <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-transparent" />

        <div className="flex items-center justify-between">
          <p className="text-sm font-bold tracking-tight text-foreground">Finding one moment in a call</p>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
            <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden />
            Live
          </span>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 font-semibold text-muted-foreground">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-slate-100">
                  <Ear className="size-3" aria-hidden />
                </span>
                Scrubbing through the recording by ear
              </span>
              <span className="font-mono text-muted-foreground">{done ? "38.4s" : `${(manualPct * 0.384).toFixed(1)}s`}</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-slate-400" style={{ width: `${manualPct}%` }} />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 font-semibold text-foreground">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Search className="size-3 text-primary" aria-hidden />
                </span>
                Searching the transcript for "refund"
              </span>
              <span className="font-mono text-primary">{searchPct >= 100 ? "0.2s" : ""}</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-primary/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-[oklch(0.6_0.19_262.88)]"
                style={{ width: `${searchPct}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4 border-t border-border/50 pt-5">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.p
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="text-3xl font-black tracking-tight text-primary"
              >
                <CountUp value={192} once={false} duration={0.8} />x
              </motion.p>
            ) : (
              <motion.span
                key="pending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex size-8 items-center justify-center text-muted-foreground/40"
              >
                <Loader2 className="size-5 animate-spin" aria-hidden />
              </motion.span>
            )}
          </AnimatePresence>
          <p className="text-xs leading-relaxed text-muted-foreground">
            faster to find the exact moment you need — no scrubbing, no guesswork.
          </p>
        </div>
      </div>
    </div>
  )
}
