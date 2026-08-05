"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Download, Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils"

const CLIPS = [
  { id: 1, duration: "3:12", seconds: 8, caller: "Priya", tag: "Booking", tone: "bg-blue-500", toneSoft: "bg-blue-50 text-blue-600", bars: [45, 65, 90, 55, 75, 60, 80, 50], line: "Sure, your booking is confirmed for Friday at 4 PM." },
  { id: 2, duration: "1:48", seconds: 6, caller: "Rohit", tag: "Support", tone: "bg-rose-500", toneSoft: "bg-rose-50 text-rose-600", bars: [55, 45, 70, 60, 50, 65, 80, 48], line: "I've checked your refund, it was processed yesterday." },
  { id: 3, duration: "4:05", seconds: 7, caller: "Anita", tag: "Sales", tone: "bg-emerald-500", toneSoft: "bg-emerald-50 text-emerald-600", bars: [60, 50, 45, 75, 55, 70, 65, 52], line: "Thanks for your interest, let me walk you through our plans." },
  { id: 4, duration: "2:33", seconds: 6, caller: "Karan", tag: "Follow-up", tone: "bg-amber-500", toneSoft: "bg-amber-50 text-amber-600", bars: [50, 58, 45, 68, 55, 72, 60, 46], line: "Just following up, is there anything else you need?" },
]

/**
 * A light "film reel" strip of recent recordings — sprocket holes running
 * along the top and bottom edges, each clip shown as a mini waveform with
 * duration and a working play/pause button. Pressing play animates that
 * clip's waveform and fills a progress bar in real time; only one clip
 * plays at a time. A cinema-strip metaphor for "your recording library,"
 * distinct from the card grids and bento layouts used elsewhere.
 */
export function RecordingFilmstrip() {
  const [playingId, setPlayingId] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (playingId === null) return
    const clip = CLIPS.find((c) => c.id === playingId)!
    setProgress(0)

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(clip.line)
      utterance.rate = 0.95
      window.speechSynthesis.speak(utterance)
    }

    const start = Date.now()
    const interval = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - start) / (clip.seconds * 1000)) * 100)
      setProgress(pct)
      if (pct >= 100) {
        clearInterval(interval)
        setPlayingId(null)
      }
    }, 60)
    return () => {
      clearInterval(interval)
      if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel()
    }
  }, [playingId])

  return (
    <div className="relative mt-10 overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/[0.06] to-primary/[0.02] py-3">
      {/* sprocket holes */}
      {[0, 1].map((row) => (
        <div key={row} className={`absolute inset-x-0 flex justify-between px-4 ${row === 0 ? "top-1.5" : "bottom-1.5"}`}>
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="size-1.5 rounded-full bg-primary/15" />
          ))}
        </div>
      ))}

      <div className="grid grid-cols-2 gap-3 px-4 py-4 sm:grid-cols-4">
        {CLIPS.map((clip, i) => {
          const isPlaying = playingId === clip.id
          return (
            <motion.div
              key={clip.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true, margin: "-60px", amount: 0.3 }}
              transition={{ duration: 0.35, delay: i * 0.08, ease: "easeOut" }}
              className={cn(
                "group rounded-xl border bg-white p-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_16px_32px_-18px_rgba(15,23,42,0.25)]",
                isPlaying ? "border-primary/40 ring-2 ring-primary/15" : "border-border/60",
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white", clip.tone)}>
                    {clip.caller.charAt(0)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPlayingId(isPlaying ? null : clip.id)}
                    aria-label={isPlaying ? `Pause ${clip.caller}` : `Play ${clip.caller}`}
                    className="flex size-7 items-center justify-center rounded-full bg-primary text-white transition-transform hover:scale-105"
                  >
                    {isPlaying ? (
                      <Pause className="size-3" aria-hidden fill="currentColor" />
                    ) : (
                      <Play className="size-3 translate-x-px" aria-hidden fill="currentColor" />
                    )}
                  </button>
                </div>
                <button
                  type="button"
                  aria-label={`Download ${clip.caller} recording`}
                  className="text-muted-foreground/50 opacity-0 transition-opacity hover:text-primary group-hover:opacity-100"
                >
                  <Download className="size-3.5" aria-hidden />
                </button>
              </div>

              <div className="mt-3 flex h-8 items-end justify-between">
                {clip.bars.map((h, bi) => (
                  <motion.span
                    key={bi}
                    className="w-[3px] shrink-0 rounded-full bg-primary/60"
                    animate={isPlaying ? { height: [`${h * 0.6}%`, `${h}%`, `${h * 0.6}%`] } : { height: `${h * 0.6}%` }}
                    transition={isPlaying ? { duration: 0.5, repeat: Infinity, delay: bi * 0.05, ease: "easeInOut" } : { duration: 0.2 }}
                  />
                ))}
              </div>

              <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-border/50">
                <div className="h-full rounded-full bg-primary transition-[width] duration-100" style={{ width: `${isPlaying ? progress : 0}%` }} />
              </div>

              <div className="mt-2.5 flex items-center justify-between">
                <div className="flex min-w-0 items-center gap-1.5">
                  <p className="truncate text-[10px] font-semibold text-foreground">{clip.caller}</p>
                  <span className={cn("shrink-0 rounded-full px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide", clip.toneSoft)}>
                    {clip.tag}
                  </span>
                </div>
                <span className="shrink-0 text-[10px] text-muted-foreground">
                  {isPlaying ? (
                    <span className="flex items-center gap-1 font-semibold text-primary">
                      <span className="size-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
                      Playing
                    </span>
                  ) : (
                    clip.duration
                  )}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
