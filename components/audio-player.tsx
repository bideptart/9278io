"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

type AudioPlayerProps = {
  src: string
  title?: string
  className?: string
}

function formatTime(s: number) {
  if (!Number.isFinite(s)) return "0:00"
  const m = Math.floor(s / 60)
  const r = Math.floor(s % 60)
  return `${m}:${r.toString().padStart(2, "0")}`
}

const WAVEFORM_BARS = 32

// Precomputed bar heights (30%..100%). Must be a static literal — computing
// these at render time with Math.sin / Math.random risks SSR/CSR mismatch
// because Math.sin precision is not pinned across JS engines.
const WAVEFORM_HEIGHTS: number[] = [
  45, 78, 92, 51, 67, 83, 38, 71, 88, 56, 64, 95, 42, 73, 81, 49,
  86, 58, 69, 91, 35, 76, 84, 47, 62, 89, 53, 79, 41, 87, 61, 74,
]

export function AudioPlayer({ src, title, className }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  // Tracks any in-flight play() Promise so we can serialize a follow-up
  // pause() and avoid the AbortError race ("play() was interrupted by
  // pause()"). Without this, fast user toggles or React re-renders that
  // overlap with media start-up reject the play() Promise.
  const playPromiseRef = useRef<Promise<void> | null>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [scrubbing, setScrubbing] = useState(false)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const updateDuration = () => {
      if (Number.isFinite(a.duration)) setDuration(a.duration)
    }
    const onTime = () => !scrubbing && setCurrent(a.currentTime)
    const onEnd = () => {
      setPlaying(false)
      setCurrent(0)
    }
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    // Cover all the events that surface duration — different browsers
    // dispatch different ones depending on how the file is fetched.
    a.addEventListener("loadedmetadata", updateDuration)
    a.addEventListener("durationchange", updateDuration)
    a.addEventListener("loadeddata", updateDuration)
    a.addEventListener("canplay", updateDuration)
    a.addEventListener("timeupdate", onTime)
    a.addEventListener("ended", onEnd)
    a.addEventListener("play", onPlay)
    a.addEventListener("pause", onPause)
    // In case metadata is already loaded by the time this effect runs.
    updateDuration()
    return () => {
      a.removeEventListener("loadedmetadata", updateDuration)
      a.removeEventListener("durationchange", updateDuration)
      a.removeEventListener("loadeddata", updateDuration)
      a.removeEventListener("canplay", updateDuration)
      a.removeEventListener("timeupdate", onTime)
      a.removeEventListener("ended", onEnd)
      a.removeEventListener("play", onPlay)
      a.removeEventListener("pause", onPause)
    }
  }, [scrubbing])

  // Poll currentTime ~12fps while playing. 60fps via rAF was visually
  // identical for a 14-second clip but caused re-render storms (every
  // setState walks the 32 motion bars), which raced with React's
  // reconciliation and could pause audio mid-playback in some browsers.
  // setInterval at ~85ms gives a smooth bar fill without the churn.
  useEffect(() => {
    if (!playing || scrubbing) return
    const id = window.setInterval(() => {
      const a = audioRef.current
      if (a) setCurrent(a.currentTime)
    }, 85)
    return () => window.clearInterval(id)
  }, [playing, scrubbing])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return

    if (a.paused) {
      // Capture the Promise so we can wait for it before any subsequent
      // pause() call. Swallow AbortError — it fires when pause() interrupts
      // an in-flight play() and indicates "user already paused", not a bug.
      const p = a.play()
      playPromiseRef.current = p
      p.catch((err: unknown) => {
        if ((err as DOMException | null)?.name !== "AbortError") {
          // eslint-disable-next-line no-console
          console.warn("Audio play failed:", err)
        }
      }).finally(() => {
        if (playPromiseRef.current === p) playPromiseRef.current = null
      })
    } else {
      // If a play is still resolving, defer the pause until it settles.
      const pending = playPromiseRef.current
      if (pending) {
        pending.then(() => a.pause()).catch(() => {
          /* play was already aborted — nothing to pause */
        })
      } else {
        a.pause()
      }
    }
  }

  const toggleMute = () => {
    const a = audioRef.current
    if (!a) return
    a.muted = !a.muted
    setMuted(a.muted)
  }

  const seek = (v: number) => {
    const a = audioRef.current
    if (!a || !duration) return
    a.currentTime = v
    setCurrent(v)
  }

  const progress = duration ? (current / duration) * 100 : 0

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border-2 border-border bg-white p-5 shadow-[0_0_40px_oklch(0.52_0.22_265/0.08)] sm:p-6",
        className,
      )}
    >
      {/* Glow halo behind the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl bg-[radial-gradient(60%_100%_at_50%_0%,oklch(0.52_0.22_265/0.10),transparent_70%)]"
      />

      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        playsInline
        aria-label={title ?? "Demo audio"}
      />

      <div className="relative flex items-center gap-4">
        {/* Play / Pause */}
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className={cn(
            "group relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_24px_oklch(0.52_0.22_265/0.55)] transition-all hover:scale-105 hover:shadow-[0_0_36px_oklch(0.52_0.22_265/0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          )}
        >
          {/* Animated pulse ring while playing */}
          {playing && (
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-primary/40"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
            />
          )}
          {playing ? (
            <Pause className="h-5 w-5" fill="currentColor" />
          ) : (
            <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
          )}
        </button>

        {/* Right side */}
        <div className="min-w-0 flex-1">
          {/* Top row: label + time */}
          <div className="mb-2 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <span
                className={cn(
                  "h-1.5 w-1.5 shrink-0 rounded-full bg-primary",
                  playing && "animate-pulse",
                )}
              />
              <p className="truncate text-xs font-semibold uppercase tracking-wider text-primary">
                {title ?? "Hear our agent in action"}
              </p>
            </div>
            <p className="shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground">
              {formatTime(current)} <span className="text-muted-foreground/50">/</span>{" "}
              {formatTime(duration)}
            </p>
          </div>

          {/* Waveform / progress */}
          <div className="relative">
            {/* Decorative waveform bars (purely visual) */}
            <div
              aria-hidden
              className="pointer-events-none flex h-8 items-center gap-[3px]"
            >
              {WAVEFORM_HEIGHTS.map((h, i) => {
                // Light the bar up as soon as the playhead has crossed its
                // left edge (inclusive) so bar 0 turns primary the instant
                // audio starts.
                const reached = progress >= (i / WAVEFORM_BARS) * 100
                return (
                  <motion.span
                    key={i}
                    className={cn(
                      "block flex-1 rounded-full transition-colors duration-150",
                      reached ? "bg-primary" : "bg-slate-200",
                    )}
                    style={{ height: `${h}%`, transformOrigin: "center" }}
                    animate={
                      playing && reached
                        ? { scaleY: [1, 1.3, 0.85, 1.15, 1] }
                        : { scaleY: 1 }
                    }
                    transition={{
                      duration: 1.2 + (i % 5) * 0.15,
                      repeat: playing && reached ? Number.POSITIVE_INFINITY : 0,
                      ease: "easeInOut",
                      delay: (i % 7) * 0.08,
                    }}
                  />
                )
              })}
            </div>

            {/* Functional range input — overlaid invisibly for scrubbing */}
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.01}
              value={current}
              onChange={(e) => seek(parseFloat(e.target.value))}
              onMouseDown={() => setScrubbing(true)}
              onMouseUp={() => setScrubbing(false)}
              onTouchStart={() => setScrubbing(true)}
              onTouchEnd={() => setScrubbing(false)}
              aria-label="Seek"
              className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0"
            />
          </div>
        </div>

        {/* Mute */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>
    </div>
  )
}
