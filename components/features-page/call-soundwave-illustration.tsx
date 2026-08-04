"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Clock3, Download, FileText, Headphones, Mic, Pause, PhoneCall, Play } from "lucide-react"
import { MouseGlowCard } from "@/components/animation/mouse-glow-card"
import { CountUp } from "@/components/ui/count-up"

/** Gentle continuous float — matches the treatment used across the other feature illustrations. */
function Float({
  children,
  delay = 0,
  duration = 4.5,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1, y: [-6, 6, -6] }}
      transition={{
        opacity: { duration: 0.4, delay, ease: "easeOut" },
        scale: { duration: 0.4, delay, ease: "easeOut" },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay: delay + 0.4 },
      }}
    >
      {children}
    </motion.div>
  )
}

const STATS = [
  { icon: PhoneCall, label: "Total Calls", value: 1248, display: null, tone: "bg-blue-50 text-blue-600" },
  { icon: Mic, label: "Recorded", value: 892, display: null, tone: "bg-rose-50 text-rose-600" },
  { icon: FileText, label: "Transcripts", value: 892, display: null, tone: "bg-emerald-50 text-emerald-600" },
  { icon: Clock3, label: "Avg Duration", value: 0, display: "05:32", tone: "bg-amber-50 text-amber-600" },
]

const ROWS = [
  { duration: "04:28", seconds: 6, bars: [45, 70, 55, 85, 60, 65, 50, 62], line: "Hello, thanks for calling, how can I help you today?" },
  { duration: "07:15", seconds: 7, bars: [55, 45, 75, 55, 65, 80, 50, 70], line: "Sure, I can look into that refund for you right away." },
  { duration: "03:52", seconds: 5, bars: [60, 50, 58, 70, 45, 65, 55, 60], line: "Your appointment is confirmed for tomorrow at noon." },
]

/**
 * Illustration for the Call Reports feature page — a "Call Reports"
 * dashboard card (stat tiles + a mini recordings list with waveforms)
 * surrounded by a live "Recording…" phone badge, a headset badge, and a
 * transcript badge. Same flat-mockup + MouseGlowCard technique used on
 * the other feature illustrations.
 */
export function CallSoundwaveIllustration() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (playingIndex === null) return
    const row = ROWS[playingIndex]
    setProgress(0)

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(row.line)
      utterance.rate = 0.95
      window.speechSynthesis.speak(utterance)
    }

    const start = Date.now()
    const interval = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - start) / (row.seconds * 1000)) * 100)
      setProgress(pct)
      if (pct >= 100) {
        clearInterval(interval)
        setPlayingIndex(null)
      }
    }, 60)
    return () => {
      clearInterval(interval)
      if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel()
    }
  }, [playingIndex])

  return (
    <div className="relative mx-auto w-full max-w-[520px] lg:mr-4">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-8 -z-10 rounded-full bg-primary/20 blur-[60px]"
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-4 -top-2 -z-10 size-40 opacity-60"
        style={{
          backgroundImage: "radial-gradient(oklch(0.6 0.19 262.88 / 0.25) 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }}
      />

      {/* dashboard card */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
        <MouseGlowCard
          tiltStrength={3}
          glowSize={280}
          glowColor="oklch(0.6 0.19 262.88 / 0.16)"
          className="relative overflow-hidden rounded-3xl border-border/60 bg-white shadow-[0_30px_70px_-30px_oklch(0.2_0.05_260/0.35)] backdrop-blur-0"
        >
          <div className="p-6">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold tracking-tight text-foreground">Call Reports</p>
              <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-emerald-600">
                <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden />
                Live
              </span>
            </div>

            {/* stat tiles */}
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {STATS.map((s, si) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.35, delay: 0.15 + si * 0.08, ease: "easeOut" }}
                  className="rounded-xl border border-border/60 p-2.5 transition-shadow hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.25)]"
                >
                  <motion.span
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.25 + si * 0.08 }}
                    className={`flex size-7 items-center justify-center rounded-full ${s.tone}`}
                  >
                    <s.icon className="size-3.5" aria-hidden />
                  </motion.span>
                  {s.display ? (
                    <p className="mt-1.5 text-sm font-bold leading-none text-foreground">{s.display}</p>
                  ) : (
                    <CountUp value={s.value} once={false} className="mt-1.5 block text-sm font-bold leading-none text-foreground" />
                  )}
                  <p className="truncate text-[9px] text-muted-foreground">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* recordings list */}
            <p className="mt-4 text-xs font-semibold text-foreground">Call Recordings</p>
            <div className="mt-2 space-y-2">
              {ROWS.map((row, i) => {
                const isPlaying = playingIndex === i
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.3 + i * 0.1 }}
                    className={`relative overflow-hidden rounded-lg border px-2.5 py-2 transition-colors ${
                      isPlaying ? "border-primary/40 bg-primary/[0.03]" : "border-border/50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setPlayingIndex(isPlaying ? null : i)}
                        aria-label={isPlaying ? `Pause recording ${i + 1}` : `Play recording ${i + 1}`}
                        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-transform hover:scale-105"
                      >
                        {isPlaying ? (
                          <Pause className="size-3" aria-hidden fill="currentColor" />
                        ) : (
                          <Play className="size-3 translate-x-px" aria-hidden fill="currentColor" />
                        )}
                      </button>
                      <div className="flex h-5 flex-1 items-end justify-between">
                        {row.bars.map((h, bi) => (
                          <motion.span
                            key={bi}
                            className="w-[3px] rounded-full bg-primary/50"
                            animate={isPlaying ? { height: [`${h * 0.6}%`, `${h}%`, `${h * 0.6}%`] } : { height: `${h * 0.6}%` }}
                            transition={isPlaying ? { duration: 0.5, repeat: Infinity, delay: bi * 0.05, ease: "easeInOut" } : { duration: 0.2 }}
                          />
                        ))}
                      </div>
                      <span className="shrink-0 text-[10px] text-muted-foreground">
                        {isPlaying ? <span className="font-semibold text-primary">Now playing</span> : row.duration}
                      </span>
                      <Download className="size-3 shrink-0 text-muted-foreground/60 transition-colors hover:text-primary" aria-hidden />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-border/40">
                      <div className="h-full bg-primary/60 transition-[width] duration-100" style={{ width: `${isPlaying ? progress : 0}%` }} />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </MouseGlowCard>
      </motion.div>

      {/* "Recording..." phone badge, top-right */}
      <Float delay={0.3} duration={4.4} className="absolute -right-4 -top-8 z-20 hidden sm:block">
        <div className="flex w-[190px] items-center gap-2.5 rounded-2xl border border-border/70 bg-white px-3.5 py-2.5 shadow-[0_16px_34px_-18px_oklch(0.2_0.05_260/0.4)]">
          <span className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
            <Mic className="size-4" aria-hidden />
            <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-white ring-1 ring-red-500 motion-safe:animate-pulse" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold text-foreground">Recording…</p>
            <p className="truncate text-[9px] text-muted-foreground">00:02:45</p>
          </div>
        </div>
      </Float>

      {/* headset badge */}
      <Float delay={0.5} duration={4} className="absolute -left-8 top-28 z-20 hidden sm:block">
        <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.42_0.19_264)] text-white shadow-[0_14px_28px_-12px_oklch(0.546_0.215_262.88/0.5)]">
          <Headphones className="size-5" aria-hidden />
        </span>
      </Float>

      {/* transcript badge, bottom-right */}
      <Float delay={0.7} duration={4.8} className="absolute -right-6 -bottom-6 z-20 hidden sm:block">
        <span className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-[0_16px_32px_-12px_rgba(16,185,129,0.5)]">
          <FileText className="size-6" aria-hidden />
        </span>
      </Float>
    </div>
  )
}
