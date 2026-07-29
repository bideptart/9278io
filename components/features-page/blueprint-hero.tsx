"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  AudioLines, PhoneCall, MessageSquare, Headphones, ShieldCheck, Settings,
  Ear, Globe, Zap, CalendarCheck, IndianRupee, Volume2, Check,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

/**
 * Friendly rounded robot face — a single SVG so proportions are fixed by
 * the viewBox instead of nested flex/percentage sizing (which doesn't
 * resolve reliably for percentage-sized children of an unsized flex box).
 */
function RobotFace({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <linearGradient id="robot-head-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.546 0.215 262.88)" />
          <stop offset="100%" stopColor="oklch(0.42 0.19 264)" />
        </linearGradient>
      </defs>
      {/* ears */}
      <circle cx="8" cy="50" r="9" fill="oklch(0.6 0.19 262)" />
      <circle cx="92" cy="50" r="9" fill="oklch(0.6 0.19 262)" />
      {/* head */}
      <rect x="15" y="10" width="70" height="70" rx="22" fill="url(#robot-head-fill)" />
      {/* glossy top highlight */}
      <path d="M17 30 Q50 8 83 30 L83 20 Q50 6 17 20 Z" fill="white" opacity="0.2" />
      {/* eyes */}
      <circle cx="38" cy="46" r="11" fill="white" />
      <circle cx="62" cy="46" r="11" fill="white" />
      <circle cx="41.5" cy="42.5" r="3.5" fill="white" opacity="0.9" />
      <circle cx="65.5" cy="42.5" r="3.5" fill="white" opacity="0.9" />
    </svg>
  )
}

/** Small "+" tick mark — decorative blueprint-style accent. */
function Tick({ className }: { className?: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute text-primary/25 ${className}`}>
      <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth={1.4}>
        <path d="M6 1v10M1 6h10" />
      </svg>
    </span>
  )
}

type Point = { x: number; y: number }
type Badge = { icon: LucideIcon; label: string; x: number; y: number; check?: boolean; wave?: boolean; path: Point[] }

// Every badge restates a real, already-shipped 9278.io capability — see
// app/features/page.tsx trust chips and components/sections/features.tsx.
// Coordinates are in the same 0–100 space as the connector SVG below.
// `path` is the right-angle route from the badge to the device edge —
// first point is the badge anchor, last point touches the device.
const badges: Badge[] = [
  { icon: Globe, label: "10+ Indian Languages", x: 24, y: 0, path: [{ x: 24, y: 0 }, { x: 24, y: 13 }, { x: 40, y: 13 }, { x: 40, y: 30 }] },
  { icon: Zap, label: "Sub-300ms Latency", x: 88, y: 6, wave: true, path: [{ x: 88, y: 6 }, { x: 88, y: 15 }, { x: 65, y: 15 }, { x: 65, y: 30 }] },
  { icon: PhoneCall, label: "Smart Call Handling", x: 0, y: 40, wave: true, path: [{ x: 0, y: 40 }, { x: 45, y: 40 }] },
  { icon: Volume2, label: "Crystal Clear Quality", x: 100, y: 46, path: [{ x: 100, y: 46 }, { x: 55, y: 46 }] },
  { icon: CalendarCheck, label: "Appointment Booked", x: 10, y: 93, check: true, path: [{ x: 10, y: 93 }, { x: 10, y: 79 }, { x: 42, y: 79 }, { x: 42, y: 81 }] },
  { icon: IndianRupee, label: "Per-Second Billing", x: 90, y: 90, path: [{ x: 90, y: 90 }, { x: 90, y: 79 }, { x: 58, y: 79 }, { x: 58, y: 81 }] },
]

// Each sidebar icon has its own real 9278.io fact, its own waveform
// pattern, and its own background watermark — when the icon highlights,
// the whole card content changes together, not just one line of text.
// `relatedBadges` lists the indices (into `badges` above) that this
// capability actually corresponds to — used to give exactly one matching
// badge the bold border in sync with the active card state. Empty when no
// badge matches. When a state has more than one, we alternate one-at-a-time
// across laps rather than highlighting both together.
const cardStates = [
  { dockIcon: AudioLines, icon: Ear, title: "AI Voice Agent", text: "Listening in 10+ Indian languages", detail: "Native audio in and out — no robotic text-to-speech.", bars: [30, 55, 85, 100, 70, 90, 50, 75, 40, 60, 95, 65], relatedBadges: [0] },
  { dockIcon: PhoneCall, icon: PhoneCall, title: "Call Routing", text: "Routes every call automatically", detail: "Hands off to a human number of your choice, anytime.", bars: [60, 40, 90, 55, 100, 45, 80, 35, 70, 50, 85, 60], relatedBadges: [2] },
  { dockIcon: MessageSquare, icon: MessageSquare, title: "WhatsApp Assistant", text: "Sends WhatsApp confirmations after calls", detail: "No manual follow-up — confirmations go out on their own.", bars: [45, 80, 35, 95, 50, 70, 100, 40, 65, 85, 30, 75], relatedBadges: [] },
  { dockIcon: Headphones, icon: Volume2, title: "Audio Engine", text: "Crystal clear audio, sub-300ms latency", detail: "Natural turn-taking — no awkward pauses or talk-overs.", bars: [70, 100, 60, 85, 45, 95, 55, 80, 40, 90, 50, 75], relatedBadges: [1, 3] },
  { dockIcon: ShieldCheck, icon: ShieldCheck, title: "Compliance Engine", text: "TRAI-compliant, 9AM–09PM calling window", detail: "Enforced automatically — nothing for you to track.", bars: [50, 65, 40, 75, 95, 55, 85, 30, 100, 60, 70, 45], relatedBadges: [] },
  { dockIcon: Settings, icon: IndianRupee, title: "Billing Engine", text: "Per-second billing, not per-minute", detail: "No minute-rounding, no idle charges, no surprises.", bars: [40, 90, 55, 70, 30, 100, 60, 45, 80, 35, 95, 50], relatedBadges: [5] },
]

function pathD(points: Point[]) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")
}

/**
 * "AI Voice Agent" hero illustration for the features page — a phone-shaped
 * device card (sidebar dock + a crossfading real-fact readout) surrounded by
 * real capability badges on dashed connectors. Sized with generous padding
 * so nothing clips.
 */
export function BlueprintHero() {
  // Raw tick keeps counting up (not modulo) so that when a state has more
  // than one related badge, we can tell which lap we're on and alternate
  // between them — never highlighting more than one badge at once.
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTick((i) => i + 1), 2200)
    return () => clearInterval(t)
  }, [])

  const activeIndex = tick % cardStates.length
  const lap = Math.floor(tick / cardStates.length)
  const current = cardStates[activeIndex]
  const relatedForLap = current.relatedBadges.length ? current.relatedBadges[lap % current.relatedBadges.length] : null

  return (
    <div className="relative mx-auto w-full max-w-[620px] px-6 py-14 sm:px-10 sm:py-16">
      {/* ambient background blooms */}
      <div aria-hidden className="pointer-events-none absolute -inset-10 -z-10">
        <div className="absolute left-[4%] top-[2%] size-40 rounded-full bg-primary/15 blur-[80px]" />
        <div className="absolute bottom-[2%] right-[4%] size-48 rounded-full bg-primary/10 blur-[90px]" />
      </div>

      {/* decorative dot-grid patches */}
      <div aria-hidden className="pointer-events-none absolute right-[2%] top-[0%] h-14 w-20 opacity-30" style={{ backgroundImage: "radial-gradient(oklch(0.546 0.215 262.88 / 0.35) 1px, transparent 1px)", backgroundSize: "8px 8px" }} />
      <div aria-hidden className="pointer-events-none absolute right-[10%] top-[16%] h-10 w-14 opacity-20" style={{ backgroundImage: "radial-gradient(oklch(0.546 0.215 262.88 / 0.35) 1px, transparent 1px)", backgroundSize: "7px 7px" }} />

      {/* decorative "+" ticks and diagonal accent lines */}
      <Tick className="left-[6%] top-[2%]" />
      <Tick className="right-[6%] bottom-[10%]" />
      <div aria-hidden className="pointer-events-none absolute left-[10%] top-[8%] h-6 w-px rotate-45 bg-primary/15" />
      <div aria-hidden className="pointer-events-none absolute bottom-[14%] right-[16%] h-6 w-px rotate-45 bg-primary/15" />

      {/* right-angle connector traces from each badge to the device edge */}
      <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
        {badges.map((b) => (
          <path
            key={`${b.label}-path`}
            className="connector-flow"
            d={pathD(b.path)}
            fill="none"
            stroke="rgba(37,99,235,0.5)"
            strokeWidth={0.8}
            strokeDasharray="0.9 1.1"
            strokeLinecap="round"
          />
        ))}
        {/* small circle nodes at the badge end and any bends */}
        {badges.flatMap((b) =>
          b.path.slice(0, -1).map((p, i) => (
            <circle key={`${b.label}-node-${i}`} cx={p.x} cy={p.y} r={1.3} fill="white" stroke="rgba(37,99,235,0.7)" strokeWidth={0.8} />
          )),
        )}
        {/* diamond marker where the trace touches the device */}
        {badges.map((b) => {
          const end = b.path[b.path.length - 1]
          return (
            <rect
              key={`${b.label}-anchor`}
              x={end.x - 1.3}
              y={end.y - 1.3}
              width={2.6}
              height={2.6}
              transform={`rotate(45 ${end.x} ${end.y})`}
              className="fill-primary"
            />
          )
        })}

        {/* connector from the device down to the assistant mascot */}
        <path
          className="connector-flow"
          d="M 50 81 L 50 92"
          fill="none"
          stroke="rgba(37,99,235,0.5)"
          strokeWidth={0.8}
          strokeDasharray="0.9 1.1"
          strokeLinecap="round"
        />
        <rect x="48.7" y="79.7" width="2.6" height="2.6" transform="rotate(45 50 81)" className="fill-primary" />
        <circle cx="50" cy="92" r="1.3" fill="white" stroke="rgba(37,99,235,0.7)" strokeWidth={0.8} />
      </svg>

      {/* floating capability badges — highlight whichever matches the active card state */}
      {badges.map((b, i) => {
        const Icon = b.icon
        const isRelated = i === relatedForLap
        return (
          <div
            key={b.label}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
          >
            <div className="relative">
              <div
                className={`flex h-[68px] w-[152px] items-center gap-2 rounded-xl border bg-white px-3 py-2.5 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:scale-105 ${
                  isRelated
                    ? "scale-105 border-2 border-primary shadow-[0_20px_45px_-8px_oklch(0.546_0.215_262.88/0.75)]"
                    : "border-border/60 shadow-[0_16px_34px_-20px_oklch(0.2_0.05_260/0.4)]"
                }`}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.42_0.19_264)] text-white shadow-[0_6px_14px_-4px_oklch(0.546_0.215_262.88/0.55)] ring-1 ring-white/20">
                  <Icon className="size-4.5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold leading-snug text-foreground">{b.label}</p>
                  {b.wave ? (
                    <svg viewBox="0 0 40 8" className="mt-1 h-1.5 w-10 text-primary/50" aria-hidden>
                      <path d="M0 4 L4 2 L8 6 L12 1 L16 5 L20 3 L24 6 L28 2 L32 5 L36 3 L40 4" fill="none" stroke="currentColor" strokeWidth={1} />
                    </svg>
                  ) : (
                    <span className="mt-1.5 block h-1 w-10 rounded-full bg-slate-200" aria-hidden />
                  )}
                </div>
              </div>
              {b.check && (
                <span className="absolute -right-1 -top-1 flex size-4.5 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
                  <Check className="size-2.5" aria-hidden />
                </span>
              )}
            </div>
          </div>
        )
      })}

      {/* AI voice agent device card — gradient border wraps the whole card, not just the top edge */}
      <div className="relative mx-auto w-[58%] min-w-[230px] rounded-[1.75rem] bg-gradient-to-br from-primary to-[oklch(0.42_0.19_264)] p-[2px] shadow-[0_36px_80px_-28px_oklch(0.13_0.025_255/0.35)]">
      <div className="flex overflow-hidden rounded-[calc(1.75rem-2px)] bg-white">
        {/* icon dock */}
        <div className="flex w-12 flex-col items-center gap-4 bg-gradient-to-b from-primary to-[oklch(0.42_0.19_264)] py-6 sm:w-14">
          {cardStates.map((state, i) => {
            const Icon = state.dockIcon
            const active = i === activeIndex
            return (
              <span
                key={i}
                className={`flex items-center justify-center rounded-full p-1 transition-all duration-300 ${
                  active ? "bg-white text-primary shadow-[0_4px_16px_rgba(255,255,255,0.6)]" : "text-white/75"
                }`}
              >
                <Icon className="size-4" aria-hidden />
              </span>
            )
          })}
        </div>

        {/* content */}
        <div className="relative flex-1 overflow-hidden p-4 sm:p-5">
          <div className="relative flex items-center justify-between">
            <div className="flex gap-1" aria-hidden>
              <span className="size-1.5 rounded-full bg-slate-200" />
              <span className="size-1.5 rounded-full bg-slate-200" />
              <span className="size-1.5 rounded-full bg-slate-200" />
            </div>
            <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
              <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden />
              Online
            </span>
          </div>

          {/* waveform only for the Voice state — every other state shows its own icon instead */}
          <div className="relative mt-3 flex h-12 items-center justify-center">
            <AnimatePresence mode="wait">
              {activeIndex === 0 ? (
                <motion.div
                  key="waveform"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-12 w-full items-end justify-center gap-[3px]"
                >
                  {current.bars.map((h, i) => (
                    <span key={i} className="w-[4px] rounded-full bg-primary" style={{ height: `${h}%` }} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key={`state-icon-${activeIndex}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.42_0.19_264)] text-white shadow-[0_12px_28px_-10px_oklch(0.546_0.215_262.88/0.55)] ring-1 ring-white/20"
                >
                  <current.icon className="size-7" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative mt-8 flex min-h-[1.5rem] items-center gap-1.5">
            <AnimatePresence mode="wait">
              <motion.p
                key={`title-${activeIndex}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="text-sm font-bold text-foreground"
              >
                {current.title}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="relative mt-3 min-h-[2rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <current.icon className="size-3.5 shrink-0 text-primary" aria-hidden />
                <span className="text-[11px] font-medium text-foreground">{current.text}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative mt-2 min-h-[2.4rem]">
            <AnimatePresence mode="wait">
              <motion.p
                key={`detail-${activeIndex}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="text-[11px] font-bold leading-relaxed text-muted-foreground"
              >
                {current.detail}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
      </div>

      {/* assistant mascot — centered between the Appointment/Billing connector paths */}
      <div className="absolute z-10 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center" style={{ left: "50%", top: "97%" }}>
        <div aria-hidden className="pointer-events-none absolute size-16 rounded-full border border-primary/15" />
        <RobotFace className="size-12" />
      </div>
    </div>
  )
}
