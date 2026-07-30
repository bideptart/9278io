"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  PhoneCall, MessageSquare, ShieldCheck,
  Ear, IndianRupee, Volume2, Check,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

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
type Badge = {
  icon: LucideIcon
  label: string
  x: number
  y: number
  check?: boolean
  wave?: boolean
  path: Point[]
  /** Extra px nudge for the label (positive = right, negative = left) — for badges whose default anchor still sits too close to the device card. */
  labelShift?: number
}

// Every badge restates a real, already-shipped 9278.io capability — see
// app/features/page.tsx trust chips and components/sections/features.tsx.
// Coordinates are in the same 0–100 space as the connector SVG below.
// `path` is the right-angle route from the badge to the device edge —
// first point is the badge anchor, last point touches the device.
const badges: Badge[] = [
  { icon: Ear, label: "AI Voice Agent", x: 24, y: 0, path: [{ x: 20, y: 0 }, { x: 12, y: 0 }, { x: 12, y: 28 }, { x: 40, y: 28 }] },
  { icon: Volume2, label: "Audio Engine", x: 88, y: 6, wave: true, labelShift: 14, path: [{ x: 88, y: 10 }, { x: 79, y: 10 }, { x: 79, y: 38 }, { x: 65, y: 38 }] },
  { icon: PhoneCall, label: "Call Routing", x: 5, y: 40, wave: true, path: [{ x: 5, y: 40 }, { x: 45, y: 40 }] },
  { icon: ShieldCheck, label: "Compliance Engine", x: 95, y: 46, path: [{ x: 95, y: 46 }, { x: 55, y: 46 }] },
  { icon: MessageSquare, label: "WhatsApp Assistant", x: 10, y: 93, path: [{ x: 10, y: 93 }, { x: 10, y: 79 }, { x: 42, y: 79 }, { x: 42, y: 81 }] },
  { icon: IndianRupee, label: "Billing Engine", x: 90, y: 90, path: [{ x: 90, y: 90 }, { x: 90, y: 79 }, { x: 58, y: 79 }, { x: 58, y: 81 }] },
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
  { dockIcon: Ear, icon: Ear, title: "AI Voice Agent", text: "Listening in 10+ Indian languages", detail: "Native audio in and out — no robotic text-to-speech.", bars: [30, 55, 85, 100, 70, 90, 50, 75, 40, 60, 95, 65], relatedBadges: [0] },
  { dockIcon: PhoneCall, icon: PhoneCall, title: "Call Routing", text: "Routes every call automatically", detail: "Hands off to a human number of your choice, anytime.", bars: [60, 40, 90, 55, 100, 45, 80, 35, 70, 50, 85, 60], relatedBadges: [2] },
  { dockIcon: MessageSquare, icon: MessageSquare, title: "WhatsApp Assistant", text: "Sends WhatsApp confirmations after calls", detail: "No manual follow-up — confirmations go out on their own.", bars: [45, 80, 35, 95, 50, 70, 100, 40, 65, 85, 30, 75], relatedBadges: [4] },
  { dockIcon: Volume2, icon: Volume2, title: "Audio Engine", text: "Crystal clear audio, sub-300ms latency", detail: "Natural turn-taking — no awkward pauses or talk-overs.", bars: [70, 100, 60, 85, 45, 95, 55, 80, 40, 90, 50, 75], relatedBadges: [1] },
  { dockIcon: ShieldCheck, icon: ShieldCheck, title: "Compliance Engine", text: "TRAI-compliant, 9AM–09PM calling window", detail: "Enforced automatically — nothing for you to track.", bars: [50, 65, 40, 75, 95, 55, 85, 30, 100, 60, 70, 45], relatedBadges: [3] },
  { dockIcon: IndianRupee, icon: IndianRupee, title: "Billing Engine", text: "Per-second billing, not per-minute", detail: "No minute-rounding, no idle charges, no surprises.", bars: [40, 90, 55, 70, 30, 100, 60, 45, 80, 35, 95, 50], relatedBadges: [5] },
]

/**
 * A single right-angle connector segment, rendered as a plain absolutely
 * positioned div using the exact same `%` coordinate space as the badges
 * (left/top of the shared relative container) — not an SVG viewBox, which
 * scales independently of CSS percentages and can drift out of alignment
 * with them whenever the container isn't perfectly square.
 */
function ConnectorSegment({ from, to }: { from: Point; to: Point }) {
  if (from.y === to.y) {
    const left = Math.min(from.x, to.x)
    const width = Math.abs(to.x - from.x)
    return (
      <div
        aria-hidden
        className="connector-dash-h pointer-events-none absolute"
        style={{ left: `${left}%`, top: `${from.y}%`, width: `${width}%`, height: "2px" }}
      />
    )
  }
  const top = Math.min(from.y, to.y)
  const height = Math.abs(to.y - from.y)
  return (
    <div
      aria-hidden
      className="connector-dash-v pointer-events-none absolute"
      style={{ left: `${from.x}%`, top: `${top}%`, width: "2px", height: `${height}%` }}
    />
  )
}

/** Small white-filled, blue-ringed dot marking a connector waypoint. */
function ConnectorNode({ x, y }: Point) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute size-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-primary/70 bg-white"
      style={{ left: `${x}%`, top: `${y}%` }}
    />
  )
}

/** Small filled diamond marking where a connector touches the device. */
function ConnectorAnchor({ x, y }: Point) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute size-[9px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-primary"
      style={{ left: `${x}%`, top: `${y}%` }}
    />
  )
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
    <div className="relative mx-auto w-full max-w-[620px] px-10 py-14 sm:px-10 sm:py-16">
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

      {/* right-angle connector traces from each badge to the device edge — plain
          CSS-positioned divs so they share the exact same coordinate math as
          the badges below, instead of a separately-scaled SVG viewBox. */}
      {badges.flatMap((b) =>
        b.path.slice(0, -1).map((p, i) => (
          <ConnectorSegment key={`${b.label}-seg-${i}`} from={p} to={b.path[i + 1]} />
        )),
      )}
      {badges.flatMap((b) => b.path.slice(0, -1).map((p, i) => <ConnectorNode key={`${b.label}-node-${i}`} x={p.x} y={p.y} />))}
      {badges.map((b) => {
        const end = b.path[b.path.length - 1]
        return <ConnectorAnchor key={`${b.label}-anchor`} x={end.x} y={end.y} />
      })}

      {/* floating capability badges — highlight whichever matches the active card state */}
      {badges.map((b, i) => {
        const Icon = b.icon
        const isRelated = i === relatedForLap
        // A centered label under a badge on the left/right side of the
        // device card would grow toward the card and overlap it on narrow
        // screens — anchor those labels to grow away from the card (toward
        // the open edge) instead of staying centered.
        const growLeft = b.x < 50 // badge sits left of the card — grow the label further left
        const growRight = b.x >= 50 // badge sits right of the card — grow the label further right
        return (
          <div
            key={b.label}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
          >
            <div className="relative">
              <div
                className={`flex size-12 items-center justify-center rounded-full border-2 bg-white transition-[transform,border-color,box-shadow] duration-300 ease-out hover:scale-105 sm:size-16 ${
                  isRelated
                    ? "scale-105 border-primary shadow-[0_20px_45px_-8px_oklch(0.546_0.215_262.88/0.75)]"
                    : "border-border/60 shadow-[0_16px_34px_-20px_oklch(0.2_0.05_260/0.4)]"
                }`}
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.42_0.19_264)] text-white shadow-[0_6px_14px_-4px_oklch(0.546_0.215_262.88/0.55)] ring-1 ring-white/20 sm:size-10">
                  <Icon className="size-3.5 sm:size-4.5" aria-hidden />
                </span>
              </div>
              {b.check && (
                <span className="absolute -right-1 -top-1 flex size-4.5 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
                  <Check className="size-2.5" aria-hidden />
                </span>
              )}
              <p
                style={b.labelShift ? { marginLeft: b.labelShift } : undefined}
                className={`absolute top-full mt-1.5 w-max max-w-[70px] text-[8px] font-semibold leading-tight text-foreground sm:mt-2 sm:max-w-[140px] sm:text-[10px] ${
                  growLeft
                    ? "right-0 text-right"
                    : growRight
                      ? "left-0 text-left"
                      : "left-1/2 -translate-x-1/2 text-center"
                }`}
              >
                {b.label}
              </p>
            </div>
          </div>
        )
      })}

      {/* AI voice agent device card — gradient border wraps the whole card, not just the top edge */}
      <div className="relative mx-auto w-[58%] min-w-[230px] rounded-[1.75rem] bg-gradient-to-br from-primary to-[oklch(0.42_0.19_264)] p-[2px] shadow-[0_36px_80px_-28px_oklch(0.13_0.025_255/0.35)]">
      <div className="flex overflow-hidden rounded-[calc(1.75rem-2px)] bg-white">
        {/* icon dock */}
        <div className="flex w-12 flex-col items-center gap-4 bg-gradient-to-b from-primary via-[oklch(0.62_0.2_240)] to-[oklch(0.5_0.22_255)] py-6 sm:w-14">
          {cardStates.map((state, i) => {
            const Icon = state.dockIcon
            const active = i === activeIndex
            return (
              <motion.span
                key={i}
                animate={{ scale: active ? 1.15 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className={`flex items-center justify-center rounded-full p-1 transition-colors duration-300 ${
                  active ? "bg-white text-primary shadow-[0_4px_16px_rgba(255,255,255,0.6)]" : "text-white/75"
                }`}
              >
                <Icon className="size-4" aria-hidden />
              </motion.span>
            )
          })}
        </div>

        {/* content — fixed min-height so the card doesn't grow/shrink as the
            text length varies between states */}
        <div className="relative flex-1 min-h-[260px] overflow-hidden p-4 sm:min-h-[300px] sm:p-5">
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
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

          <div className="relative mt-3 min-h-[2.6rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-2"
              >
                <current.icon className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
                <span className="text-[11px] font-medium leading-snug text-foreground">{current.text}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative mt-2 min-h-[3.2rem]">
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
    </div>
  )
}
