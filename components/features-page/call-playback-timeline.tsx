"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { FileText, Mic, Pause, PhoneCall, Play } from "lucide-react"
import { cn } from "@/lib/utils"

const STAGES = [
  { icon: PhoneCall, label: "Call happens", detail: "Your agent talks with the caller, live.", tone: "bg-blue-50 text-blue-600", time: "0:00" },
  { icon: Mic, label: "Recorded automatically", detail: "Audio capture starts the instant the call connects.", tone: "bg-rose-50 text-rose-600", time: "0:03" },
  { icon: FileText, label: "Transcribed & ready", detail: "A full text transcript lands in your dashboard.", tone: "bg-emerald-50 text-emerald-600", time: "0:07" },
]
const TOTAL_TIME = "0:07"

const BAR_HEIGHTS = [45, 65, 90, 55, 75, 100, 60, 80, 50, 92, 68, 48, 78, 58, 88, 52, 70, 84, 55, 74, 62, 90, 48, 76, 58, 82, 50, 66]
const STAGE_DURATION = 2400

/**
 * "How it works" as a scrubbing audio waveform — a playhead sweeps across
 * a static waveform while the stage label crossfades underneath, like
 * watching an audio player move through a call. An audio-player metaphor,
 * not a kanban board, timeline list, or step reveal used elsewhere on
 * the site.
 */
export function CallPlaybackTimeline() {
  const [stage, setStage] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return
    const interval = setInterval(() => setStage((s) => (s + 1) % STAGES.length), STAGE_DURATION)
    return () => clearInterval(interval)
  }, [playing])

  const progressPct = ((stage + 1) / STAGES.length) * 100
  const current = STAGES[stage]
  const Icon = current.icon

  return (
    <div className="relative mx-auto mt-10 max-w-2xl">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-primary/10 blur-2xl"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="rounded-2xl border border-border/60 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-shadow hover:shadow-[0_20px_45px_-24px_rgba(15,23,42,0.25)]">
      {/* waveform + scrubbing playhead */}
      <div className="relative flex h-20 items-center justify-between overflow-hidden">
        {BAR_HEIGHTS.map((h, i) => {
          const barPct = ((i + 1) / BAR_HEIGHTS.length) * 100
          const played = barPct <= progressPct
          const isLeading = played && barPct + 100 / BAR_HEIGHTS.length > progressPct
          return (
            <motion.span
              key={i}
              initial={{ opacity: 0, scaleY: 0.3 }}
              animate={{
                opacity: 1,
                scaleY: isLeading ? [1, 1.25, 1] : 1,
                backgroundColor: played ? "oklch(0.546 0.215 262.88)" : "oklch(0.9 0.01 260)",
              }}
              transition={{
                opacity: { duration: 0.3, delay: i * 0.015 },
                scaleY: isLeading ? { duration: 0.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 },
                backgroundColor: { duration: 0.4 },
              }}
              className="w-[3px] shrink-0 rounded-full"
              style={{ height: `${h}%` }}
            />
          )
        })}
        <motion.div
          className="absolute top-0 h-full w-0.5 bg-primary"
          animate={{ left: `${progressPct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          <motion.span
            aria-hidden
            className="absolute -top-1 left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_10px_oklch(0.546_0.215_262.88/0.7)]"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* elapsed / total time */}
      <div className="mt-1.5 flex justify-between font-mono text-[10px] text-muted-foreground">
        <span>{current.time}</span>
        <span>{TOTAL_TIME}</span>
      </div>

      {/* stage label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mt-4 flex items-center gap-3"
        >
          <span className={cn("relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full", current.tone)}>
            <motion.span
              key={stage}
              initial={{ scale: 0.5, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 16 }}
              className="flex"
            >
              <Icon className="size-4" aria-hidden />
            </motion.span>
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">{current.label}</p>
            <p className="text-xs text-muted-foreground">{current.detail}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* stage dots */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {STAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Jump to stage ${i + 1}`}
            onClick={() => setStage(i)}
            className={cn("h-1.5 rounded-full transition-all duration-300", i === stage ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-primary/40")}
          />
        ))}
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause auto-play" : "Resume auto-play"}
          className="ml-2 flex size-5 items-center justify-center rounded-full text-muted-foreground/60 transition-colors hover:text-primary"
        >
          {playing ? <Pause className="size-3" aria-hidden fill="currentColor" /> : <Play className="size-3 translate-x-px" aria-hidden fill="currentColor" />}
        </button>
      </div>
      </div>
    </div>
  )
}
