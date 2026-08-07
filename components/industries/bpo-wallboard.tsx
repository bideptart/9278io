"use client"

// Hero visual for "AI Voice Agents for BPO & Call Centres" — a premium
// sky-blue-on-white composition that rotates through four entirely
// different scenes every couple of seconds: a radial voice-spectrum burst,
// a live transcript feed, a world call-map, and an agent constellation.
// Every scene stays permanently mounted and is simply faded/transformed in
// or out based on an `active` flag (rather than mounted/unmounted through
// AnimatePresence), so the rotation never depends on an exit animation
// reliably reporting "finished" before the next scene can appear. Built
// entirely on the codebase's existing motion/react library.

import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import type { MotionValue } from "motion/react"
import { Globe2, Headphones, MapPin, PhoneCall, Star, User } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const SCENES = ["spectrum", "transcript", "world", "constellation"] as const

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
    <span className="flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-sky-700 sm:text-[10px]">
      <span className="relative flex size-1.5" aria-hidden>
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-sky-400 opacity-75" />
        <span className="relative inline-flex size-1.5 rounded-full bg-sky-500" />
      </span>
      {children}
    </span>
  )
}

const SPECTRUM_BARS = Array.from({ length: 20 }, (_, i) => i)

// Scene 1 — "Voice Spectrum": a full-circle radial spectrum analyzer —
// spokes of light radiating from a central AI core, each pulsing on its own
// phase, slowly rotating as a whole. A "sunburst" composition, not a card.
function SpectrumScene({ centerY, centerRotate, centerScale, active }: SceneLayerProps) {
  return (
    <motion.div
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div style={{ y: centerY, rotate: centerRotate, scale: centerScale }} className="relative z-10 flex flex-col items-center">
        <SceneBadge>Voice Spectrum</SceneBadge>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="relative mt-5 size-[210px] sm:size-[240px]"
        >
          {SPECTRUM_BARS.map((i) => {
            const deg = (360 / SPECTRUM_BARS.length) * i
            const base = 14 + (i % 5) * 6
            return (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 w-[3px] rounded-full bg-gradient-to-t from-sky-200 to-blue-600"
                style={{ transformOrigin: "bottom center", transform: `translate(-50%, -100%) rotate(${deg}deg)` }}
                animate={{ height: [base * 0.5, base * 1.5, base * 0.5] }}
                transition={{ duration: 1.3 + (i % 4) * 0.18, repeat: Infinity, ease: "easeInOut", delay: i * 0.06 }}
              />
            )
          })}
        </motion.div>

        <div className="pointer-events-none absolute grid size-16 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-[0_20px_45px_-16px_rgba(2,132,199,0.65)] sm:size-[72px]">
          <span aria-hidden className="absolute inset-0 rounded-full bg-sky-400/30 motion-safe:animate-ping" />
          <Headphones className="relative size-6 sm:size-7" aria-hidden />
        </div>
      </motion.div>
    </motion.div>
  )
}

const TRANSCRIPT_LINES: { from: "agent" | "caller"; text: string }[] = [
  { from: "agent", text: "Thanks for calling — how can I help today?" },
  { from: "caller", text: "I need to check my order status." },
  { from: "agent", text: "Sure, pulling that up right now." },
  { from: "caller", text: "Great, thank you." },
]

// Scene 2 — "Live Transcript": a glass panel where a real conversation
// types itself out line by line, agent and caller bubbles alternating —
// a chat-first composition instead of a stats card or radial shape.
function TranscriptScene({ centerY, centerRotate, centerScale, active }: SceneLayerProps) {
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
      <motion.div style={{ y: centerY, rotate: centerRotate, scale: centerScale }} className="relative z-10 w-[230px] sm:w-[270px]">
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

// Simple dotted-globe silhouette — points laid out on a sphere-like grid,
// purely decorative, no real geography.
const GLOBE_DOTS = (() => {
  const dots: { x: number; y: number }[] = []
  for (let row = 0; row < 7; row++) {
    const y = 8 + row * 14
    const spread = Math.sin((row / 6) * Math.PI)
    const count = Math.max(3, Math.round(spread * 9))
    for (let c = 0; c < count; c++) {
      const x = 50 + (spread === 0 ? 0 : ((c / (count - 1 || 1)) - 0.5) * spread * 82)
      dots.push({ x, y })
    }
  }
  return dots
})()

const REGIONS = [
  { x: 22, y: 30, label: "Mumbai" },
  { x: 78, y: 24, label: "London" },
  { x: 62, y: 66, label: "Dubai" },
]

// Scene 3 — "World Pulse": a dotted globe with glowing regional pins and an
// arcing pulse traveling between two of them — a geography-flavoured
// composition, again structurally distinct from the previous scenes.
function WorldScene({ centerY, centerRotate, centerScale, active }: SceneLayerProps) {
  return (
    <motion.div
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div style={{ y: centerY, rotate: centerRotate, scale: centerScale }} className="relative z-10 flex flex-col items-center">
        <SceneBadge>
          <Globe2 className="size-3" aria-hidden />
          Global Reach
        </SceneBadge>

        <div className="relative mt-4 size-[220px] overflow-hidden rounded-[1.75rem] border border-sky-100 bg-white/95 shadow-[0_30px_60px_-24px_rgba(14,116,209,0.35)] backdrop-blur-sm sm:size-[250px]">
          <svg aria-hidden className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {GLOBE_DOTS.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r="0.9" fill="#bae6fd" />
            ))}
            <path
              d={`M${REGIONS[0].x},${REGIONS[0].y} Q 50,10 ${REGIONS[1].x},${REGIONS[1].y}`}
              fill="none"
              stroke="#38bdf8"
              strokeOpacity="0.5"
              strokeWidth="0.6"
              vectorEffect="non-scaling-stroke"
            />
            <circle r="1.3" fill="#0ea5e9">
              <animateMotion
                dur="2.4s"
                repeatCount="indefinite"
                path={`M${REGIONS[0].x},${REGIONS[0].y} Q 50,10 ${REGIONS[1].x},${REGIONS[1].y}`}
              />
            </circle>
            <path
              d={`M${REGIONS[1].x},${REGIONS[1].y} Q 74,48 ${REGIONS[2].x},${REGIONS[2].y}`}
              fill="none"
              stroke="#38bdf8"
              strokeOpacity="0.5"
              strokeWidth="0.6"
              vectorEffect="non-scaling-stroke"
            />
            <circle r="1.3" fill="#0ea5e9">
              <animateMotion
                dur="2.8s"
                begin="0.6s"
                repeatCount="indefinite"
                path={`M${REGIONS[1].x},${REGIONS[1].y} Q 74,48 ${REGIONS[2].x},${REGIONS[2].y}`}
              />
            </circle>
          </svg>

          {REGIONS.map((r, i) => (
            <motion.div
              key={r.label}
              className="absolute -translate-x-1/2 -translate-y-full"
              style={{ left: `${r.x}%`, top: `${r.y}%` }}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            >
              <span className="relative flex flex-col items-center">
                <span className="grid size-6 place-items-center rounded-full bg-white text-sky-600 shadow-[0_8px_18px_-8px_rgba(14,116,209,0.5)] ring-1 ring-sky-100">
                  <MapPin className="size-3" aria-hidden />
                </span>
                <span className="mt-1 whitespace-nowrap rounded-full bg-slate-900/80 px-1.5 py-0.5 text-[7.5px] font-semibold text-white">
                  {r.label}
                </span>
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

const CONSTELLATION_NODES: { x: number; y: number; Icon: LucideIcon }[] = [
  { x: 22, y: 26, Icon: Headphones },
  { x: 76, y: 20, Icon: User },
  { x: 80, y: 74, Icon: PhoneCall },
  { x: 20, y: 72, Icon: Star },
]
const CONSTELLATION_EDGES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [0, 2],
]

// Scene 4 — "Agent Constellation": four agent nodes linked in a network
// graph, with the "active" agent cycling on its own timer — a mesh/graph
// composition, the most abstract of the four.
function ConstellationScene({ centerY, centerRotate, centerScale, active }: SceneLayerProps) {
  const [liveNode, setLiveNode] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setLiveNode((n) => (n + 1) % CONSTELLATION_NODES.length), 1400)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div style={{ y: centerY, rotate: centerRotate, scale: centerScale }} className="relative z-10 flex flex-col items-center">
        <SceneBadge>Agent Constellation</SceneBadge>

        <div className="relative mt-5 size-[210px] sm:size-[240px]">
          <svg aria-hidden className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {CONSTELLATION_EDGES.map(([a, b], i) => (
              <line
                key={i}
                x1={CONSTELLATION_NODES[a].x}
                y1={CONSTELLATION_NODES[a].y}
                x2={CONSTELLATION_NODES[b].x}
                y2={CONSTELLATION_NODES[b].y}
                stroke="#bae6fd"
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          {CONSTELLATION_NODES.map(({ x, y, Icon }, i) => {
            const isLive = i === liveNode
            return (
              <motion.div
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
                animate={{ scale: isLive ? 1.15 : 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className={`relative grid size-11 place-items-center rounded-full shadow-[0_10px_24px_-10px_rgba(14,116,209,0.5)] ring-1 transition-colors duration-300 sm:size-12 ${
                    isLive ? "bg-gradient-to-br from-blue-600 to-sky-500 text-white ring-sky-200" : "bg-white text-sky-600 ring-sky-100"
                  }`}
                >
                  {isLive && <span aria-hidden className="absolute inset-0 rounded-full bg-sky-400/40 motion-safe:animate-ping" />}
                  <Icon className="relative size-4.5" aria-hidden />
                </span>
              </motion.div>
            )
          })}
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
      <SpectrumScene {...baseProps} active={scene === "spectrum"} />
      <TranscriptScene {...baseProps} active={scene === "transcript"} />
      <WorldScene {...baseProps} active={scene === "world"} />
      <ConstellationScene {...baseProps} active={scene === "constellation"} />
    </div>
  )
}
