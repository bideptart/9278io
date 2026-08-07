"use client"

// Hero visual for "AI Voice Agents for BPO & Call Centres" — a premium
// enterprise-SaaS AI voice-agent interface. Sky-blue-on-white only, no
// other accent colours. The composition rotates through several distinct
// scenes (live call, network pulse, live queue), each with its own layout
// and its own entrance/exit animation, so the hero keeps presenting a new
// design rather than looping one static arrangement. Built entirely on the
// codebase's existing motion/react library.

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import type { MotionValue } from "motion/react"
import {
  CheckCircle2,
  Clock,
  Globe2,
  Headphones,
  ListOrdered,
  PhoneCall,
  Radio,
  Signal,
  Star,
  TrendingUp,
  User,
  Users,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

const SCENES = ["call", "network", "queue"] as const
type SceneKey = (typeof SCENES)[number]

function useSceneCycle(intervalMs: number) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % SCENES.length), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return SCENES[i]
}

// Two customer nodes at the container edges, each with a curved routing
// path into the central hub — represents multiple simultaneous calls being
// routed into the AI agent, not just one static connection.
const ROUTES = [
  { x1: 6, y1: 32, path: "M6,32 C 22,20 34,28 50,48", dur: "3.2s", delay: "0s" },
  { x1: 94, y1: 66, path: "M94,66 C 78,74 62,60 50,48", dur: "3.6s", delay: "1.1s" },
]

// Small drifting particles standing in for ambient "voice signal" energy —
// distinct from the waveform inside the card, these live in open space
// around the composition and stay put across every scene.
const PARTICLES = [
  { top: "18%", left: "22%", delay: 0 },
  { top: "72%", left: "18%", delay: 1.2 },
  { top: "14%", left: "76%", delay: 0.6 },
  { top: "80%", left: "80%", delay: 1.8 },
]

type Notice = { Icon: LucideIcon; label: string; sub: string }

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

function StatBadge({
  icon: Icon,
  label,
  value,
  delay,
  floatClass,
}: {
  icon: LucideIcon
  label: string
  value: string
  delay: number
  floatClass: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`flex items-center gap-2 rounded-2xl border border-sky-100 bg-white/95 px-3 py-2 shadow-[0_10px_28px_-14px_rgba(14,116,209,0.35)] backdrop-blur ${floatClass}`}
      >
        <span className="grid size-7 shrink-0 place-items-center rounded-xl bg-sky-50 text-sky-600">
          <Icon className="size-3.5" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[9.5px] font-semibold leading-tight text-slate-500">{label}</p>
          <p className="truncate text-[10.5px] font-bold leading-tight text-slate-800">{value}</p>
        </div>
      </div>
    </motion.div>
  )
}

type SceneLayerProps = {
  cardsY: MotionValue<number>
  centerY: MotionValue<number>
  centerRotate: MotionValue<number>
  centerScale: MotionValue<number>
  active: boolean
}

// Every scene stays permanently mounted and is simply faded/transformed in
// or out based on `active` — rather than being mounted/unmounted through
// AnimatePresence. Conditional mounting made the rotation depend on each
// scene's exit animation reliably reporting "finished" before the next one
// could appear, and that never happened consistently in practice, which is
// why the composition looked stuck on the first design. Keeping every scene
// alive and driving visibility straight off `active` has no such dependency
// — it always reflects the current scene on the very next render.

// Scene 1 — "Live Call": the original AI-agent call card, plus curved
// routing paths carrying pulses from two customer nodes into the hub.
function CallScene({ cardsY, centerY, centerRotate, centerScale, active }: SceneLayerProps) {
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

  return (
    <motion.div
      animate={active ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: -18 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      className="absolute inset-0 flex items-center justify-center"
    >
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

      {/* Floating notice cards — mid-speed parallax outer, idle bob inner. */}
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

      {/* Central AI call interface — scroll parallax + idle bob. */}
      <motion.div style={{ y: centerY, rotate: centerRotate, scale: centerScale }} className="relative z-10 w-[220px] sm:w-[250px]">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-[1.75rem] border border-sky-100 bg-white/95 p-4 shadow-[0_30px_60px_-24px_rgba(14,116,209,0.35)] backdrop-blur-sm sm:p-5"
        >
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
  )
}

const ORBIT_NODES: { deg: number; Icon: LucideIcon }[] = [
  { deg: 0, Icon: Headphones },
  { deg: 120, Icon: User },
  { deg: 240, Icon: PhoneCall },
]

// Scene 2 — "Network Pulse": a circular hub with agent/customer/call nodes
// orbiting it, and floating network stat badges — a completely different
// layout language from the call card (radial instead of linear/stacked).
function NetworkScene({ cardsY, centerY, centerRotate, centerScale, active }: SceneLayerProps) {
  return (
    <motion.div
      animate={active ? { opacity: 1, rotate: 0, scale: 1 } : { opacity: 0, rotate: 10, scale: 0.9 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div style={{ y: cardsY }} className="absolute left-[3%] top-[12%] z-20 hidden sm:block">
        <StatBadge icon={Users} label="Agents Live" value="12 online" delay={0.15} floatClass="hero-float-up" />
      </motion.div>
      <motion.div style={{ y: cardsY }} className="absolute right-[3%] top-[8%] z-20 hidden md:block">
        <StatBadge icon={Signal} label="Uptime" value="99.9%" delay={0.3} floatClass="hero-float-down" />
      </motion.div>
      <motion.div style={{ y: cardsY }} className="absolute bottom-[8%] left-[3%] z-20">
        <StatBadge icon={Globe2} label="Regions" value="3 active" delay={0.45} floatClass="hero-float-up" />
      </motion.div>

      <motion.div style={{ y: centerY, rotate: centerRotate, scale: centerScale }} className="relative z-10 flex flex-col items-center">
        <span className="mb-3 flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-sky-700 sm:text-[10px]">
          <span className="relative flex size-1.5" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-sky-500" />
          </span>
          Network Pulse
        </span>

        <div className="relative grid size-[190px] place-items-center sm:size-[220px]">
          <span aria-hidden className="absolute inset-0 rounded-full border border-dashed border-sky-200" />
          <span aria-hidden className="absolute inset-[18%] rounded-full border border-dashed border-sky-100" />

          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 grid size-16 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-[0_20px_40px_-16px_rgba(2,132,199,0.6)] sm:size-[72px]"
          >
            <span aria-hidden className="absolute inset-0 rounded-full bg-sky-400/30 motion-safe:animate-ping" />
            <Radio className="relative size-6 sm:size-7" aria-hidden />
          </motion.div>

          {ORBIT_NODES.map(({ deg, Icon }, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 size-[190px] -translate-x-1/2 -translate-y-1/2 sm:size-[220px]"
              initial={{ rotate: deg }}
              animate={{ rotate: deg + 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                initial={{ rotate: -deg }}
                animate={{ rotate: -(deg + 360) }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              >
                <span className="grid size-8 place-items-center rounded-full bg-white text-sky-600 shadow-[0_10px_20px_-10px_rgba(14,116,209,0.5)] ring-1 ring-sky-100 sm:size-9">
                  <Icon className="size-3.5 sm:size-4" aria-hidden />
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

const QUEUE_ROWS = [
  { label: "Caller •••• 4821", wait: "0:12", tag: "Billing" },
  { label: "Caller •••• 7790", wait: "0:34", tag: "Support" },
  { label: "Caller •••• 1053", wait: "0:51", tag: "Sales" },
]

// Scene 3 — "Live Queue": a stacked list-board layout with a ticking queue
// counter and an animated resolution-rate progress bar — again a distinct
// composition from the previous two (stacked rows instead of radial/card).
function QueueScene({ cardsY, centerY, centerRotate, centerScale, active }: SceneLayerProps) {
  const [waiting, setWaiting] = useState(6)
  useEffect(() => {
    const id = setInterval(() => setWaiting((w) => (w <= 4 ? 7 : w - 1)), 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      animate={active ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -30, scale: 0.96 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div style={{ y: cardsY }} className="absolute left-[3%] top-[10%] z-20 hidden sm:block">
        <StatBadge icon={TrendingUp} label="Resolution" value="92% today" delay={0.15} floatClass="hero-float-up" />
      </motion.div>
      <motion.div style={{ y: cardsY }} className="absolute right-[3%] top-[8%] z-20 hidden md:block">
        <StatBadge icon={Clock} label="Avg. wait" value="41s" delay={0.3} floatClass="hero-float-down" />
      </motion.div>

      <motion.div style={{ y: centerY, rotate: centerRotate, scale: centerScale }} className="relative z-10 w-[230px] sm:w-[260px]">
        <div className="rounded-[1.75rem] border border-sky-100 bg-white/95 p-4 shadow-[0_30px_60px_-24px_rgba(14,116,209,0.35)] backdrop-blur-sm sm:p-5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-sky-700 sm:text-[10px]">
              <ListOrdered className="size-3" aria-hidden />
              Live Queue
            </span>
            <span className="font-serif text-[11px] font-bold tabular-nums text-slate-400 sm:text-xs">
              {waiting} waiting
            </span>
          </div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
            className="mt-4 space-y-2"
          >
            {QUEUE_ROWS.map((row) => (
              <motion.div
                key={row.label}
                variants={{ hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2.5 rounded-xl border border-sky-50 bg-sky-50/40 px-2.5 py-2"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-white text-sky-600 ring-1 ring-sky-100">
                  <User className="size-3.5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[10px] font-bold leading-tight text-slate-800">{row.label}</p>
                  <p className="truncate text-[9px] font-semibold leading-tight text-slate-500">{row.tag}</p>
                </div>
                <span className="shrink-0 text-[10px] font-bold tabular-nums text-sky-600">{row.wait}</span>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-[9.5px] font-semibold text-slate-500 sm:text-[10.5px]">
              <span>Avg. resolution</span>
              <span className="font-bold text-sky-700">92%</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-sky-50">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "92%" }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-600"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function BpoWallboard() {
  const scene = useSceneCycle(1000)

  // Scroll-linked parallax: as the hero scrolls out of view, layers drift
  // at different rates (background slowest, central composition fastest)
  // so it reads as having real depth — shared across every scene.
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] })
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 40])
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const centerY = useTransform(scrollYProgress, [0, 1], [0, 110])
  const centerRotate = useTransform(scrollYProgress, [0, 1], [0, -3])
  const centerScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  const baseProps = { cardsY, centerY, centerRotate, centerScale }

  return (
    <div ref={containerRef} className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-white via-sky-50/50 to-sky-50/80">
      {/* Background layer — slow drift, furthest back, constant across every scene */}
      <motion.div
        aria-hidden
        style={{ y: glowY }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(14,165,233,0.18),transparent)] blur-2xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Organic atmospheric shape — a single soft, continuously reshaping
          blob (sky-blue only), constant backdrop across every scene. */}
      <span
        aria-hidden
        className="voice-blob-morph pointer-events-none absolute -left-6 bottom-0 -z-10 size-64 bg-gradient-to-br from-sky-200/40 to-blue-100/30 blur-3xl"
      />

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

      {/* The composition itself keeps changing — a new design and a new
          transform-in animation every rotation, not just new content inside
          the same layout. All three stay mounted; only `active` (and the
          opacity/transform it drives) changes, so the rotation never
          depends on any exit-animation completing first. */}
      <CallScene {...baseProps} active={scene === "call"} />
      <NetworkScene {...baseProps} active={scene === "network"} />
      <QueueScene {...baseProps} active={scene === "queue"} />
    </div>
  )
}
