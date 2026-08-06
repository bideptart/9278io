"use client"

// BPO hero visual, built in the same "blueprint schematic" style as the
// Features page's BlueprintHero — a central call-centre device card with a
// cycling icon dock, surrounded by real capability badges connected via
// animated right-angle dashed traces. Reuses the site's own established
// connector-dash-h/v primitives rather than inventing new motion, so it
// matches the one hero visual on the site already confirmed to look right.

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  BarChart3, GitBranch, Languages, PhoneCall, ShieldCheck, Star,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

function Tick({ className }: { className?: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute text-blue-600/25 ${className}`}>
      <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth={1.4}>
        <path d="M6 1v10M1 6h10" />
      </svg>
    </span>
  )
}

type Point = { x: number; y: number }
type Badge = { icon: LucideIcon; label: string; x: number; y: number; path: Point[] }

const badges: Badge[] = [
  { icon: PhoneCall, label: "Inbound Calls", x: 20, y: 0, path: [{ x: 20, y: 0 }, { x: 12, y: 0 }, { x: 12, y: 28 }, { x: 40, y: 28 }] },
  { icon: GitBranch, label: "Smart Routing", x: 88, y: 6, path: [{ x: 88, y: 10 }, { x: 79, y: 10 }, { x: 79, y: 38 }, { x: 65, y: 38 }] },
  { icon: Languages, label: "10+ Languages", x: 0, y: 40, path: [{ x: 0, y: 40 }, { x: 45, y: 40 }] },
  { icon: ShieldCheck, label: "TRAI Compliant", x: 100, y: 46, path: [{ x: 100, y: 46 }, { x: 55, y: 46 }] },
  { icon: BarChart3, label: "Live Analytics", x: 10, y: 93, path: [{ x: 10, y: 93 }, { x: 10, y: 79 }, { x: 42, y: 79 }, { x: 42, y: 81 }] },
  { icon: Star, label: "4.6 CSAT", x: 90, y: 90, path: [{ x: 90, y: 90 }, { x: 90, y: 79 }, { x: 58, y: 79 }, { x: 58, y: 81 }] },
]

const cardStates = [
  { dockIcon: PhoneCall, icon: PhoneCall, title: "Inbound Calls", text: "Answers instantly, day or night", detail: "No hold music — every call picked up in under 3 seconds.", bars: [30, 55, 85, 100, 70, 90, 50, 75, 40, 60, 95, 65], related: 0 },
  { dockIcon: GitBranch, icon: GitBranch, title: "Smart Routing", text: "Routes by intent automatically", detail: "Escalates to the right human agent only when it truly needs one.", bars: [60, 40, 90, 55, 100, 45, 80, 35, 70, 50, 85, 60], related: 1 },
  { dockIcon: Languages, icon: Languages, title: "10+ Languages", text: "Detects the caller's language live", detail: "Hindi, Tamil, Telugu, Bengali, and more — no menu required.", bars: [45, 80, 35, 95, 50, 70, 100, 40, 65, 85, 30, 75], related: 2 },
  { dockIcon: ShieldCheck, icon: ShieldCheck, title: "TRAI Compliant", text: "9AM–9PM calling window enforced", detail: "Compliance is automatic — nothing for your team to track.", bars: [50, 65, 40, 75, 95, 55, 85, 30, 100, 60, 70, 45], related: 3 },
  { dockIcon: BarChart3, icon: BarChart3, title: "Live Analytics", text: "Call volume tracked in real time", detail: "See handle time, queue depth, and outcomes as they happen.", bars: [40, 90, 55, 70, 30, 100, 60, 45, 80, 35, 95, 50], related: 4 },
  { dockIcon: Star, icon: Star, title: "4.6 CSAT", text: "Consistently high satisfaction", detail: "Every call scored automatically from the caller's own tone.", bars: [70, 100, 60, 85, 45, 95, 55, 80, 40, 90, 50, 75], related: 5 },
]

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

function ConnectorNode({ x, y }: Point) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute size-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-blue-600/70 bg-white"
      style={{ left: `${x}%`, top: `${y}%` }}
    />
  )
}

function ConnectorAnchor({ x, y }: Point) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute size-[9px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-blue-600"
      style={{ left: `${x}%`, top: `${y}%` }}
    />
  )
}

export function BpoWallboard() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTick((i) => (i + 1) % cardStates.length), 2200)
    return () => clearInterval(t)
  }, [])

  const current = cardStates[tick]

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-sky-50/50 px-4 py-10 sm:px-8">
      {/* ambient background blooms */}
      <div aria-hidden className="pointer-events-none absolute -inset-10 -z-10">
        <div className="absolute left-[4%] top-[2%] size-40 rounded-full bg-blue-500/15 blur-[80px]" />
        <div className="absolute bottom-[2%] right-[4%] size-48 rounded-full bg-sky-500/10 blur-[90px]" />
      </div>

      {/* decorative dot-grid patches */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[2%] top-[0%] h-14 w-20 opacity-30"
        style={{ backgroundImage: "radial-gradient(rgba(37,99,235,0.35) 1px, transparent 1px)", backgroundSize: "8px 8px" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-[16%] h-10 w-14 opacity-20"
        style={{ backgroundImage: "radial-gradient(rgba(37,99,235,0.35) 1px, transparent 1px)", backgroundSize: "7px 7px" }}
      />

      <Tick className="left-[6%] top-[2%]" />
      <Tick className="right-[6%] bottom-[10%]" />
      <div aria-hidden className="pointer-events-none absolute left-[10%] top-[8%] h-6 w-px rotate-45 bg-blue-600/15" />
      <div aria-hidden className="pointer-events-none absolute bottom-[14%] right-[16%] h-6 w-px rotate-45 bg-blue-600/15" />

      {/* right-angle connector traces */}
      <div className="relative mx-auto h-full w-full max-w-[420px]">
        {badges.flatMap((b) =>
          b.path.slice(0, -1).map((p, i) => <ConnectorSegment key={`${b.label}-seg-${i}`} from={p} to={b.path[i + 1]} />),
        )}
        {badges.flatMap((b) => b.path.slice(0, -1).map((p, i) => <ConnectorNode key={`${b.label}-node-${i}`} x={p.x} y={p.y} />))}
        {badges.map((b) => {
          const end = b.path[b.path.length - 1]
          return <ConnectorAnchor key={`${b.label}-anchor`} x={end.x} y={end.y} />
        })}

        {/* floating capability badges */}
        {badges.map((b, i) => {
          const Icon = b.icon
          const isRelated = i === current.related
          return (
            <div key={b.label} className="absolute z-20 -translate-x-1/2 -translate-y-1/2" style={{ left: `${b.x}%`, top: `${b.y}%` }}>
              <div className="relative">
                <div
                  className={`flex size-14 items-center justify-center rounded-full border-2 bg-white transition-[transform,border-color,box-shadow] duration-300 ease-out sm:size-16 ${
                    isRelated
                      ? "scale-105 border-blue-600 shadow-[0_20px_45px_-8px_rgba(37,99,235,0.75)]"
                      : "border-slate-200/70 shadow-[0_16px_34px_-20px_rgba(15,23,42,0.4)]"
                  }`}
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-[0_6px_14px_-4px_rgba(37,99,235,0.55)] ring-1 ring-white/20 sm:size-10">
                    <Icon className="size-3.5 sm:size-4.5" aria-hidden />
                  </span>
                </div>
                <p className="absolute left-1/2 top-full mt-1.5 w-max max-w-[110px] -translate-x-1/2 text-center text-[9px] font-semibold leading-tight text-slate-700 sm:max-w-[140px] sm:text-[10px]">
                  {b.label}
                </p>
              </div>
            </div>
          )
        })}

        {/* device card */}
        <div className="absolute left-1/2 top-1/2 w-[62%] min-w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-[1.75rem] bg-gradient-to-br from-blue-600 to-sky-600 p-[2px] shadow-[0_36px_80px_-28px_rgba(15,23,42,0.35)]">
          <div className="flex overflow-hidden rounded-[calc(1.75rem-2px)] bg-white">
            {/* icon dock */}
            <div className="flex w-10 flex-col items-center gap-3 bg-gradient-to-b from-blue-600 via-sky-500 to-blue-500 py-5 sm:w-12 sm:gap-4 sm:py-6">
              {cardStates.map((state, i) => {
                const Icon = state.dockIcon
                const active = i === tick
                return (
                  <motion.span
                    key={i}
                    animate={{ scale: active ? 1.15 : 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className={`flex items-center justify-center rounded-full p-1 transition-colors duration-300 ${
                      active ? "bg-white text-blue-600 shadow-[0_4px_16px_rgba(255,255,255,0.6)]" : "text-white/75"
                    }`}
                  >
                    <Icon className="size-3.5 sm:size-4" aria-hidden />
                  </motion.span>
                )
              })}
            </div>

            {/* content */}
            <div className="relative flex-1 overflow-hidden p-3.5 sm:p-5">
              <div className="relative flex items-center justify-between">
                <div className="flex gap-1" aria-hidden>
                  <span className="size-1.5 rounded-full bg-slate-200" />
                  <span className="size-1.5 rounded-full bg-slate-200" />
                  <span className="size-1.5 rounded-full bg-slate-200" />
                </div>
                <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600 sm:text-[11px]">
                  <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden />
                  Live
                </span>
              </div>

              <div className="relative mt-2.5 flex h-10 items-center justify-center sm:mt-3 sm:h-12">
                <AnimatePresence mode="wait">
                  {tick === 0 ? (
                    <motion.div
                      key="waveform"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex h-10 w-full items-end justify-center gap-[3px] sm:h-12"
                    >
                      {current.bars.map((h, i) => (
                        <span key={i} className="w-[3px] rounded-full bg-blue-600 sm:w-[4px]" style={{ height: `${h}%` }} />
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`state-icon-${tick}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-[0_12px_28px_-10px_rgba(37,99,235,0.55)] ring-1 ring-white/20 sm:size-14"
                    >
                      <current.icon className="size-6 sm:size-7" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative mt-5 flex min-h-[1.3rem] items-center gap-1.5 sm:mt-8 sm:min-h-[1.5rem]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`title-${tick}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="text-[13px] font-bold text-slate-900 sm:text-sm"
                  >
                    {current.title}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="relative mt-2 min-h-[1.6rem] sm:mt-3 sm:min-h-[2rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tick}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <current.icon className="size-3 shrink-0 text-blue-600 sm:size-3.5" aria-hidden />
                    <span className="text-[10px] font-medium text-slate-800 sm:text-[11px]">{current.text}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative mt-1.5 min-h-[2rem] sm:mt-2 sm:min-h-[2.4rem]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`detail-${tick}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className="text-[9.5px] font-bold leading-relaxed text-slate-500 sm:text-[11px]"
                  >
                    {current.detail}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
