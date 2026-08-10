"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { Mic, MessageSquareText, Cog, Volume2, Zap, Hourglass } from "lucide-react"

// Bespoke pattern for voice-selection's "Under the hood" section — instead of a
// generic pros/cons checklist, this draws the actual mechanism difference: one
// signal path that goes straight from mic to speaker as native audio, versus a
// path that detours through a text step and a TTS engine, visibly losing time
// at every stage.

function SmoothBars({ playing }: { playing: boolean }) {
  const heights = [0.4, 0.75, 0.55, 0.9, 0.6, 0.8, 0.45, 0.7, 0.5]
  return (
    <div className="flex h-10 flex-1 items-center justify-center gap-[3px]">
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full"
          style={{ backgroundColor: "#2563EB", height: `${h * 100}%` }}
          animate={playing ? { scaleY: [0.5, 1, 0.5], opacity: [0.7, 1, 0.7] } : { scaleY: 0.5, opacity: 0.7 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.06 }}
        />
      ))}
    </div>
  )
}

function ChoppyBars({ playing }: { playing: boolean }) {
  // Uneven spacing and a mid-row gap read as "stitched together," not a single
  // continuous signal — the visual argument for "converted, not native."
  const segments = [
    [0.3, 0.6, 0.4],
    [0.7, 0.35, 0.55, 0.3],
    [0.45, 0.65],
  ]
  return (
    <div className="flex h-10 flex-1 items-center justify-center gap-2.5">
      {segments.map((seg, si) => (
        <div key={si} className="flex items-center gap-[3px]">
          {seg.map((h, i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-muted-foreground/50"
              style={{ height: `${h * 100}%` }}
              animate={playing ? { scaleY: [0.4, 1, 0.4], opacity: [0.4, 0.75, 0.4] } : { scaleY: 0.4, opacity: 0.4 }}
              transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: si * 0.35 + i * 0.05 }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export function TtsComparison() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: false, amount: 0.4 })

  return (
    <div ref={containerRef} className="mx-auto mt-10 flex max-w-3xl flex-col gap-5">
      {/* Native audio path — one unbroken hop */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border-2 bg-white p-5 md:p-6"
        style={{ borderColor: "#2563EB" }}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold" style={{ color: "#2563EB" }}>9278.io</span>
          <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold" style={{ color: "#2563EB" }}>
            <Zap className="size-3" aria-hidden />
            0.2s to first sound
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2 sm:gap-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: "#2563EB" }}>
            <Mic className="size-4.5" aria-hidden />
          </span>
          <span className="h-px flex-1 bg-blue-200" aria-hidden />
          <SmoothBars playing={inView} />
          <span className="h-px flex-1 bg-blue-200" aria-hidden />
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: "#2563EB" }}>
            <Volume2 className="size-4.5" aria-hidden />
          </span>
        </div>

        <p className="mt-3 text-center text-[13px] text-muted-foreground">Native audio in, native audio out — one continuous signal.</p>
      </motion.div>

      {/* Typical TTS path — detours through text + a TTS engine, losing time at each hop */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
        transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border-2 border-border bg-muted/30 p-5 md:p-6"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-muted-foreground">Typical text-to-speech</span>
          <span className="flex items-center gap-1.5 rounded-full bg-border/60 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
            <Hourglass className="size-3" aria-hidden />
            1.8s to first sound
          </span>
        </div>

        <div className="mt-4 flex items-center gap-1.5 sm:gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-border text-muted-foreground">
            <Mic className="size-4.5" aria-hidden />
          </span>
          <span className="h-px w-3 shrink-0 bg-border" aria-hidden />
          <span className="flex shrink-0 items-center gap-1 rounded-lg border border-border bg-white px-2 py-1.5 text-[11px] font-medium text-muted-foreground">
            <MessageSquareText className="size-3.5" aria-hidden />
            Text
          </span>
          <span className="h-px w-3 shrink-0 bg-border" aria-hidden />
          <span className="flex shrink-0 items-center gap-1 rounded-lg border border-border bg-white px-2 py-1.5 text-[11px] font-medium text-muted-foreground">
            <Cog className="size-3.5" aria-hidden />
            TTS engine
          </span>
          <span className="h-px w-3 shrink-0 bg-border" aria-hidden />
          <ChoppyBars playing={inView} />
          <span className="h-px w-3 shrink-0 bg-border" aria-hidden />
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-border text-muted-foreground">
            <Volume2 className="size-4.5" aria-hidden />
          </span>
        </div>

        <p className="mt-3 text-center text-[13px] text-muted-foreground">Converted from text at every hop — the gaps are audible.</p>
      </motion.div>
    </div>
  )
}
