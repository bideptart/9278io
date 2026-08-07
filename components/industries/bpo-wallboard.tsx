"use client"

// Hero visual for "AI Voice Agents for BPO & Call Centres" — a premium
// enterprise-SaaS AI voice-agent interface. Sky-blue-on-white only, no
// other accent colours. Built with GSAP-style animation principles
// (staggered entrances, layered speeds, smooth easing, no bounce) using
// the codebase's existing motion/react library rather than adding GSAP as
// a new dependency.

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import { CheckCircle2, Globe2, Headphones, PhoneCall, Star, User, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"

// Two customer nodes at the container edges, each with a curved routing
// path into the central hub — represents multiple simultaneous calls being
// routed into the AI agent, not just one static connection.
const ROUTES = [
  { x1: 6, y1: 32, path: "M6,32 C 22,20 34,28 50,48", dur: "3.2s", delay: "0s" },
  { x1: 94, y1: 66, path: "M94,66 C 78,74 62,60 50,48", dur: "3.6s", delay: "1.1s" },
]

// Small drifting particles standing in for ambient "voice signal" energy —
// distinct from the waveform inside the card, these live in open space
// around the composition.
const PARTICLES = [
  { top: "18%", left: "22%", delay: 0 },
  { top: "72%", left: "18%", delay: 1.2 },
  { top: "14%", left: "76%", delay: 0.6 },
  { top: "80%", left: "80%", delay: 1.8 },
]

type Notice = { Icon: LucideIcon; label: string; sub: string }

// Three independent slots, each cycling through its own pair of statuses on
// its own timer — so notifications never change in lockstep, matching the
// "staggered appearance" behaviour requested.
const SLOT_A: Notice[] = [
  { Icon: Users, label: "Call Queue", sub: "4 waiting" },
  { Icon: Globe2, label: "Language", sub: "Auto-detected" },
]
const SLOT_B: Notice[] = [
  { Icon: CheckCircle2, label: "Resolution", sub: "In progress" },
  { Icon: Star, label: "CSAT Score", sub: "4.6 / 5" },
]
const SLOT_C: Notice[] = [
  { Icon: PhoneCall, label: "Customer", sub: "Connected" },
  { Icon: Headphones, label: "Routed to", sub: "Billing queue" },
]

function useCycle(items: Notice[], intervalMs: number) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % items.length), intervalMs)
    return () => clearInterval(id)
  }, [items.length, intervalMs])
  return items[i]
}

function NoticeCard({ notice, className }: { notice: Notice; className?: string }) {
  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={notice.label + notice.sub}
          initial={{ opacity: 0, scale: 0.92, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: -4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2 rounded-2xl border border-sky-100 bg-white/95 px-3 py-2 shadow-[0_10px_28px_-14px_rgba(14,116,209,0.35)] backdrop-blur"
        >
          <span className="grid size-7 shrink-0 place-items-center rounded-xl bg-sky-50 text-sky-600">
            <notice.Icon className="size-3.5" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[9.5px] font-semibold leading-tight text-slate-500">{notice.label}</p>
            <p className="truncate text-[10.5px] font-bold leading-tight text-slate-800">{notice.sub}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export function BpoWallboard() {
  const slotA = useCycle(SLOT_A, 3200)
  const slotB = useCycle(SLOT_B, 3800)
  const slotC = useCycle(SLOT_C, 4400)

  const [seconds, setSeconds] = useState(38)
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0")
  const ss = String(seconds % 60).padStart(2, "0")

  // Scroll-linked parallax: as the hero scrolls out of view, the three
  // layers drift at different rates (background slowest, central card
  // fastest) so the composition reads as having real depth rather than
  // moving as one flat image.
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] })
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 40])
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const centerY = useTransform(scrollYProgress, [0, 1], [0, 110])
  const centerRotate = useTransform(scrollYProgress, [0, 1], [0, -3])
  const centerScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  return (
    <div ref={containerRef} className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-white via-sky-50/50 to-sky-50/80">
      {/* Background layer — slow drift, furthest back = layered parallax */}
      <motion.div
        aria-hidden
        style={{ y: glowY }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(14,165,233,0.18),transparent)] blur-2xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Organic atmospheric shape — a single soft, continuously reshaping
          blob (sky-blue only) so the backdrop feels alive rather than a
          static blurred circle. */}
      <span
        aria-hidden
        className="voice-blob-morph pointer-events-none absolute -left-6 bottom-0 -z-10 size-64 bg-gradient-to-br from-sky-200/40 to-blue-100/30 blur-3xl"
      />

      {/* Call-routing paths — two customer nodes at the container edges,
          each with a light pulse continuously traveling into the hub, and a
          faint static trace so the path itself is visible even between
          pulses. */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {ROUTES.map((r, i) => (
          <g key={i}>
            <path d={r.path} fill="none" stroke="#7dd3fc" strokeOpacity="0.4" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
            <circle r="1.1" fill="#0ea5e9">
              <animateMotion dur={r.dur} begin={r.delay} repeatCount="indefinite" path={r.path} />
            </circle>
          </g>
        ))}
      </svg>
      {ROUTES.map((r, i) => (
        <motion.span
          key={i}
          aria-hidden
          style={{ left: `${r.x1}%`, top: `${r.y1}%` }}
          className="absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 sm:block"
          animate={{ y: [0, i === 0 ? -5 : 5, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="relative grid size-6 place-items-center rounded-full bg-white text-sky-500 shadow-[0_6px_14px_-4px_rgba(14,116,209,0.4)] ring-1 ring-sky-100 sm:size-7">
            <span aria-hidden className="absolute inset-0 rounded-full bg-sky-400/25 motion-safe:animate-ping" />
            <User className="relative size-3 sm:size-3.5" aria-hidden />
          </span>
        </motion.span>
      ))}

      {/* Ambient voice-signal particles drifting in open space — only the
          first two render on mobile, keeping the composition lighter there. */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          aria-hidden
          style={{ top: p.top, left: p.left, animationDelay: `${p.delay}s` }}
          className={`voice-particle-rise pointer-events-none absolute z-0 size-1.5 rounded-full bg-sky-400/70 ${i >= 2 ? "hidden sm:block" : ""}`}
        />
      ))}

      {/* Layered translucent surface behind the central card — a second
          glass panel peeking out at a slight offset/rotation, giving the
          composition real stacked depth instead of one flat card. */}
      <motion.div
        aria-hidden
        style={{ y: cardsY }}
        className="absolute left-1/2 top-1/2 z-[5] hidden w-[190px] -translate-x-[42%] -translate-y-[54%] rotate-[7deg] rounded-[1.6rem] border border-sky-100 bg-white/60 shadow-[0_20px_40px_-20px_rgba(14,116,209,0.3)] backdrop-blur-sm sm:block sm:w-[215px]"
      >
        <div className="aspect-[220/260]" />
      </motion.div>

      {/* Foreground layer 1 — the three floating notice cards, mid-speed.
          Outer div carries the scroll-linked parallax offset; inner div
          carries the continuous idle bob — kept on separate elements so
          the two "y" animations don't fight over the same value. */}
      <motion.div style={{ y: cardsY }} className="absolute left-[4%] top-[10%] z-20 hidden sm:block">
        <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
          <NoticeCard notice={slotA} />
        </motion.div>
      </motion.div>
      <motion.div style={{ y: cardsY }} className="absolute right-[3%] top-[6%] z-20 hidden md:block">
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          <NoticeCard notice={slotB} />
        </motion.div>
      </motion.div>
      <motion.div style={{ y: cardsY }} className="absolute bottom-[10%] left-[2%] z-20">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          <NoticeCard notice={slotC} className="scale-90 sm:scale-100" />
        </motion.div>
      </motion.div>

      {/* Foreground layer 2 — the central AI call interface, fastest/closest.
          Scroll parallax (outer) + entrance (middle) + idle bob (inner) are
          three separate motion layers so none of the "y"/"scale" animations
          collide. */}
      <motion.div style={{ y: centerY, rotate: centerRotate, scale: centerScale }} className="relative z-10 w-[220px] sm:w-[250px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-[1.75rem] border border-sky-100 bg-white/95 p-4 shadow-[0_30px_60px_-24px_rgba(14,116,209,0.35)] backdrop-blur-sm sm:p-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-sky-700 sm:text-[10px]">
              <span className="relative flex size-1.5" aria-hidden>
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-sky-500" />
              </span>
              AI Agent Active
            </span>
            <span className="font-serif text-[11px] font-bold tabular-nums text-slate-400 sm:text-xs">
              {mm}:{ss}
            </span>
          </div>

          {/* Voice waveform */}
          <div className="mt-4 flex h-10 items-center justify-center gap-[3px] sm:h-12">
            {[8, 16, 11, 22, 14, 26, 12, 19, 9, 17, 13].map((h, i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-gradient-to-t from-sky-300 to-sky-600"
                animate={{ height: [h * 0.35, h, h * 0.35] }}
                transition={{ duration: 1.1 + (i % 3) * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.06 }}
              />
            ))}
          </div>

          {/* AI ↔ Customer connection indicator */}
          <div className="relative mt-4 flex items-center justify-between px-1">
            <span className="grid size-8 place-items-center rounded-full bg-sky-600 text-white shadow-[0_6px_16px_-4px_rgba(2,132,199,0.6)] sm:size-9">
              <Headphones className="size-4" aria-hidden />
            </span>
            <span className="relative mx-2 h-px flex-1 overflow-hidden bg-sky-100">
              <motion.span
                className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-sky-400 to-transparent"
                animate={{ x: ["-100%", "220%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              />
            </span>
            <span className="grid size-8 place-items-center rounded-full bg-slate-100 text-slate-500 sm:size-9">
              <User className="size-4" aria-hidden />
            </span>
          </div>

          <div className="mt-3 flex items-center justify-center gap-1.5">
            <span className="relative flex size-1.5" aria-hidden>
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            <p className="text-[9.5px] font-semibold text-slate-500 sm:text-[10.5px]">Customer Connected</p>
          </div>
        </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
