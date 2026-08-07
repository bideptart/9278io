"use client"

// Hero visual for "AI Voice Agents for BPO & Call Centres" — a premium
// sky-blue-on-white composition that rotates through four scenes every
// couple of seconds. All four share one cohesive visual language — soft
// 3D gradient spheres, frosted glass, blurred aurora colour fields — rather
// than four unrelated ideas, so the set reads as one polished piece rather
// than a grab bag. Every scene stays permanently mounted and is simply
// faded/transformed in or out based on an `active` flag (rather than
// mounted/unmounted through AnimatePresence), so the rotation never depends
// on an exit animation reliably reporting "finished" before the next scene
// can appear. Built entirely on the codebase's existing motion/react
// library.

import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import type { MotionValue } from "motion/react"
import { CheckCircle2, Globe2, Headphones, PhoneCall, Star, User } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const SCENES = ["transcript", "timeline", "hexgrid", "swarm"] as const

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

const TRANSCRIPT_LINES: { from: "agent" | "caller"; text: string }[] = [
  { from: "agent", text: "Thanks for calling — how can I help today?" },
  { from: "caller", text: "I need to check my order status." },
  { from: "agent", text: "Sure, pulling that up right now." },
  { from: "caller", text: "Great, thank you." },
]

// Scene 1 — "Live Transcript": a rounded rectangle glass panel — the
// overall shape here is a card, not a circle, and the content is a real
// conversation typing itself out line by line.
function TranscriptScene({ centerY, centerScale, active }: SceneLayerProps) {
  const [visible, setVisible] = useState(1)
  useEffect(() => {
    const id = setInterval(() => setVisible((v) => (v >= TRANSCRIPT_LINES.length ? 1 : v + 1)), 1300)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div style={{ y: centerY, scale: centerScale }} className="relative z-10 w-[230px] sm:w-[270px]">
        <div className="rounded-[1.75rem] border border-sky-100 bg-white/95 p-4 shadow-[0_30px_60px_-24px_rgba(14,116,209,0.35)] backdrop-blur-sm sm:p-5">
          <SceneBadge>Live Transcript</SceneBadge>

          <div className="mt-4 flex min-h-[148px] flex-col justify-end gap-2">
            {TRANSCRIPT_LINES.slice(0, visible).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`flex items-end gap-1.5 text-[11px] ${line.from === "agent" ? "justify-start" : "justify-end"}`}
              >
                {line.from === "agent" && (
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-sky-100 text-sky-600">
                    <Headphones className="size-2.5" aria-hidden />
                  </span>
                )}
                <span
                  className={
                    line.from === "agent"
                      ? "max-w-[78%] rounded-2xl rounded-bl-sm bg-sky-50 px-3 py-2 text-slate-700 ring-1 ring-sky-100"
                      : "max-w-[78%] rounded-2xl rounded-br-sm bg-slate-50 px-3 py-2 text-slate-700 ring-1 ring-slate-200"
                  }
                >
                  {line.text}
                </span>
                {line.from === "caller" && (
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500">
                    <User className="size-2.5" aria-hidden />
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-center gap-1.5">
            <span className="relative flex size-1.5" aria-hidden>
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            <p className="text-[9.5px] font-semibold text-slate-500 sm:text-[10.5px]">Live call in progress</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const TIMELINE_STAGES: { label: string; Icon: LucideIcon }[] = [
  { label: "Ringing", Icon: PhoneCall },
  { label: "Connected", Icon: Headphones },
  { label: "Resolved", Icon: CheckCircle2 },
]

// Scene 2 — "Call Timeline": a wide horizontal strip, not a circle at all —
// three stage nodes on a straight line with a marker travelling left to
// right between them, like a linear progress rail.
function TimelineScene({ centerY, centerScale, active }: SceneLayerProps) {
  return (
    <motion.div
      animate={active ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -24, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div style={{ y: centerY, scale: centerScale }} className="relative z-10 w-[250px] sm:w-[290px]">
        <div className="rounded-[1.75rem] border border-sky-100 bg-white/95 px-5 py-6 shadow-[0_30px_60px_-24px_rgba(14,116,209,0.35)] backdrop-blur-sm">
          <div className="flex justify-center">
            <SceneBadge>Call Timeline</SceneBadge>
          </div>

          <div className="relative mt-7 flex items-start justify-between">
            <div className="absolute left-[10%] right-[10%] top-[18px] h-px bg-sky-100" aria-hidden />
            <motion.span
              aria-hidden
              className="absolute top-[14px] size-2 rounded-full bg-sky-500 shadow-[0_0_8px_2px_rgba(14,165,233,0.5)]"
              animate={{ left: ["10%", "90%", "10%"] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            />
            {TIMELINE_STAGES.map(({ label, Icon }, i) => (
              <div key={label} className="relative z-10 flex flex-col items-center gap-2" style={{ width: "33%" }}>
                <span className="grid size-9 place-items-center rounded-full bg-white text-sky-600 ring-1 ring-sky-100 shadow-sm">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="text-[9px] font-semibold text-slate-500 sm:text-[10px]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const HEX_TILES: { x: number; y: number; size: number; Icon: LucideIcon; big?: boolean }[] = [
  { x: 50, y: 50, size: 60, Icon: Headphones, big: true },
  { x: 50, y: 12, size: 42, Icon: User },
  { x: 84, y: 31, size: 42, Icon: PhoneCall },
  { x: 84, y: 69, size: 42, Icon: Globe2 },
  { x: 50, y: 88, size: 42, Icon: Star },
  { x: 16, y: 69, size: 42, Icon: CheckCircle2 },
  { x: 16, y: 31, size: 42, Icon: Headphones },
]
const HEXAGON_CLIP = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"

// Scene 3 — "Hex Grid": an angular honeycomb cluster of tiles — straight
// edges throughout, the most geometric of the four, standing well apart
// from the circular Particle Swarm.
function HexGridScene({ centerY, centerScale, active }: SceneLayerProps) {
  return (
    <motion.div
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div style={{ y: centerY, scale: centerScale }} className="relative z-10 flex flex-col items-center">
        <SceneBadge>Hex Grid</SceneBadge>

        <div className="relative mt-7 size-[220px] sm:size-[250px]">
          {HEX_TILES.map(({ x, y, size, Icon, big }, i) => (
            <motion.div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
              animate={{ scale: [0.94, 1.04, 0.94], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }}
            >
              <div
                className={`grid size-full place-items-center text-white shadow-[0_16px_30px_-14px_rgba(14,116,209,0.6)] ${
                  big ? "bg-gradient-to-br from-blue-600 to-sky-500" : "bg-gradient-to-br from-sky-400 to-blue-500"
                }`}
                style={{ clipPath: HEXAGON_CLIP }}
              >
                <Icon className={big ? "size-6" : "size-4"} aria-hidden />
              </div>
            </motion.div>
          ))}
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
          the same layout. All four stay mounted; only `active` (and the
          opacity/transform it drives) changes, so the rotation never
          depends on any exit-animation completing first. */}
      <TranscriptScene {...baseProps} active={scene === "transcript"} />
      <TimelineScene {...baseProps} active={scene === "timeline"} />
      <HexGridScene {...baseProps} active={scene === "hexgrid"} />
      <ParticleSwarmScene {...baseProps} active={scene === "swarm"} />
    </div>
  )
}
