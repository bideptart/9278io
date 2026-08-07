"use client"

// Hero visual for "AI Voice Agents for BPO & Call Centres" — a premium
// sky-blue-on-white composition that rotates through three scenes every
// couple of seconds: the original, first-approved "Live Call" design, a 3D
// tilt card, and a particle-swarm orb. Every scene stays permanently
// mounted and is simply faded/transformed in or out based on an `active`
// flag (rather than mounted/unmounted through AnimatePresence), so the
// rotation never depends on an exit animation reliably reporting "finished"
// before the next scene can appear. Built entirely on the codebase's
// existing motion/react library.

import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import type { MotionValue } from "motion/react"
import { CheckCircle2, Globe2, Headphones, PhoneCall, Star, User, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const SCENES = ["call", "tilt", "swarm"] as const

function useSceneCycle(intervalMs: number) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % SCENES.length), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return SCENES[i]
}

// Small drifting particles standing in for ambient "voice signal" energy —
// these live in open space around the composition and stay put across
// every scene.
const PARTICLES = [
  { top: "18%", left: "22%", delay: 0 },
  { top: "72%", left: "18%", delay: 1.2 },
  { top: "14%", left: "76%", delay: 0.6 },
  { top: "80%", left: "80%", delay: 1.8 },
]

type SceneLayerProps = {
  cardsY: MotionValue<number>
  centerY: MotionValue<number>
  centerRotate: MotionValue<number>
  centerScale: MotionValue<number>
  active: boolean
}

function SceneBadge({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-sky-100 bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-sky-700 shadow-sm backdrop-blur sm:text-[10px]">
      <span className="relative flex size-1.5" aria-hidden>
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-sky-400 opacity-75" />
        <span className="relative inline-flex size-1.5 rounded-full bg-sky-500" />
      </span>
      {children}
    </span>
  )
}

// Two customer nodes at the container edges, each with a curved routing
// path into the central hub — represents multiple simultaneous calls being
// routed into the AI agent, not just one static connection.
const ROUTES = [
  { x1: 6, y1: 32, path: "M6,32 C 22,20 34,28 50,48", dur: "3.2s", delay: "0s" },
  { x1: 94, y1: 66, path: "M94,66 C 78,74 62,60 50,48", dur: "3.6s", delay: "1.1s" },
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

// Scene 1 — "Live Call": the original, first-approved hero design — the
// central AI Agent Active card with a live timer and waveform, curved
// call-routing paths carrying pulses from two customer nodes, and three
// independently-cycling status notice cards floating around it.
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

      <motion.div
        aria-hidden
        style={{ y: cardsY }}
        className="absolute left-1/2 top-1/2 z-[5] hidden w-[190px] -translate-x-[42%] -translate-y-[54%] rotate-[7deg] rounded-[1.6rem] border border-sky-100 bg-white/60 shadow-[0_20px_40px_-20px_rgba(14,116,209,0.3)] backdrop-blur-sm sm:block sm:w-[215px]"
      >
        <div className="aspect-[220/260]" />
      </motion.div>

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

// Scene 2 — "3D Voice Card": a glossy card with real perspective, gently
// rocking on two axes like a physical object tilting in your hand. No
// paragraph text — just an icon and a small waveform.
function TiltCardScene({ centerY, centerScale, active }: SceneLayerProps) {
  return (
    <motion.div
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div style={{ y: centerY, scale: centerScale }} className="relative z-10 flex flex-col items-center">
        <SceneBadge>3D Voice Card</SceneBadge>

        <div className="relative mt-7" style={{ perspective: 700 }}>
          <motion.div
            className="relative size-[190px] overflow-hidden rounded-[1.75rem] shadow-[0_45px_90px_-24px_rgba(2,132,199,0.6)] sm:size-[220px]"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: [-12, 12, -12], rotateX: [5, -5, 5] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400 via-blue-500 to-blue-700" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_18%,rgba(255,255,255,0.55),transparent_45%)]" />
            <div className="relative z-10 flex size-full flex-col items-center justify-center gap-5">
              <span className="grid size-14 place-items-center rounded-full bg-white/20 text-white ring-1 ring-white/30 backdrop-blur">
                <Headphones className="size-6" aria-hidden />
              </span>
              <div className="flex h-8 items-center gap-[3px]">
                {[8, 14, 10, 18, 11, 16, 9].map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] rounded-full bg-white/85"
                    animate={{ height: [h * 0.4, h, h * 0.4] }}
                    transition={{ duration: 1.1 + (i % 3) * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.06 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const SWARM_PARTICLES = Array.from({ length: 16 }, (_, i) => {
  const angle = (i / 16) * Math.PI * 2
  return {
    startX: Math.cos(angle) * 95,
    startY: Math.sin(angle) * 95,
    delay: (i % 8) * 0.15,
    dur: 3.2 + (i % 4) * 0.3,
  }
})

// Scene 4 — "Particle Swarm": a ring of glowing particles continuously
// breathing in toward a bright core and back out again — motion-heavy,
// abstract, representing many calls being drawn into the AI in real time.
function ParticleSwarmScene({ centerY, centerScale, active }: SceneLayerProps) {
  return (
    <motion.div
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div style={{ y: centerY, scale: centerScale }} className="relative z-10 flex flex-col items-center">
        <SceneBadge>Live Voice Network</SceneBadge>

        <div className="relative mt-7 grid size-[220px] place-items-center sm:size-[250px]">
          {SWARM_PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute size-2 rounded-full bg-gradient-to-br from-sky-300 to-blue-600 shadow-[0_0_10px_2px_rgba(14,165,233,0.5)]"
              animate={{
                x: [p.startX, p.startX * 0.22, p.startX],
                y: [p.startY, p.startY * 0.22, p.startY],
                opacity: [0.85, 1, 0.85],
              }}
              transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
            />
          ))}

          <motion.div
            aria-hidden
            className="absolute size-24 rounded-full bg-sky-400/40 blur-2xl"
            animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            className="relative grid size-16 place-items-center rounded-full shadow-[0_30px_60px_-18px_rgba(2,132,199,0.65)] sm:size-[72px]"
            style={{ background: "radial-gradient(circle at 34% 28%, #bae6fd, #0ea5e9 55%, #1d4ed8 100%)" }}
          >
            <Headphones className="relative size-6 text-white sm:size-7" aria-hidden />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function BpoWallboard() {
  const scene = useSceneCycle(2000)

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
      <TiltCardScene {...baseProps} active={scene === "tilt"} />
      <ParticleSwarmScene {...baseProps} active={scene === "swarm"} />
    </div>
  )
}
