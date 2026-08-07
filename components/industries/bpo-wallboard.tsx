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
import { Headphones } from "lucide-react"

const SCENES = ["core", "wave", "aurora", "swarm"] as const

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

// Scene 1 — "Pulse Core": a glowing 3D-shaded sphere with two tilted rings
// spinning around it at different speeds, like a small glowing planet.
// The tilt is a static CSS transform on a wrapper element; only the spin
// itself is animated by Framer Motion on a separate inner element, so the
// two transform sources never fight over the same style property.
function PulseCoreScene({ centerY, centerRotate, centerScale, active }: SceneLayerProps) {
  return (
    <motion.div
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div style={{ y: centerY, rotate: centerRotate, scale: centerScale }} className="relative z-10 flex flex-col items-center">
        <SceneBadge>Pulse Core</SceneBadge>

        <div className="relative mt-7 size-[190px] sm:size-[220px]">
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-full bg-sky-400/40 blur-2xl"
            animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="absolute inset-0 [transform:rotateX(68deg)]">
            <motion.div
              className="size-full rounded-full border-2 border-sky-300/70"
              animate={{ rotate: 360 }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="absolute inset-[10%] [transform:rotateX(68deg)_rotateZ(35deg)]">
            <motion.div
              className="size-full rounded-full border border-sky-200/70"
              animate={{ rotate: -360 }}
              transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[18%] rounded-full shadow-[0_45px_90px_-24px_rgba(2,132,199,0.65)]"
            style={{
              background:
                "radial-gradient(circle at 32% 26%, #bae6fd 0%, #38bdf8 32%, #0ea5e9 55%, #1d4ed8 100%)",
            }}
          >
            <span aria-hidden className="absolute inset-[18%] rounded-full bg-white/30 blur-md" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const WAVE_BLOBS = [
  { size: 170, top: "16%", left: "10%", grad: "from-sky-300/70 to-blue-500/60", dur: 8, delay: 0 },
  { size: 140, top: "46%", left: "56%", grad: "from-blue-400/60 to-sky-600/55", dur: 10, delay: 0.6 },
  { size: 120, top: "62%", left: "16%", grad: "from-sky-200/70 to-blue-400/60", dur: 9, delay: 1.1 },
]
const WAVE_BARS = [10, 20, 14, 26, 16, 24, 11, 18]

// Scene 2 — "Wave Field": pure abstract art — three large soft blobs
// drifting and morphing behind a small central waveform, no card, no icons.
// Outer motion.div per blob carries the drift (x/y); the inner plain div
// carries the voice-blob-morph CSS shape animation, kept separate so the
// two transform sources don't collide.
function WaveFieldScene({ centerScale, active }: SceneLayerProps) {
  return (
    <motion.div
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <span className="absolute left-1/2 top-[8%] z-10 -translate-x-1/2">
        <SceneBadge>Wave Field</SceneBadge>
      </span>

      {WAVE_BLOBS.map((b, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute"
          style={{ width: b.size, height: b.size, top: b.top, left: b.left }}
          animate={{ x: [0, 16, -12, 0], y: [0, -12, 10, 0] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
        >
          <div className={`voice-blob-morph size-full bg-gradient-to-br ${b.grad} blur-2xl`} />
        </motion.div>
      ))}

      <motion.div style={{ scale: centerScale }} className="relative z-10 flex items-center gap-[3px] rounded-full border border-white/60 bg-white/70 px-5 py-4 shadow-[0_20px_45px_-20px_rgba(14,116,209,0.4)] backdrop-blur-md">
        {WAVE_BARS.map((h, i) => (
          <motion.span
            key={i}
            className="w-[3px] rounded-full bg-gradient-to-t from-sky-400 to-blue-700"
            animate={{ height: [h * 0.4, h, h * 0.4] }}
            transition={{ duration: 1.1 + (i % 3) * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.07 }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

// Scene 3 — "Aurora Glass": a frosted glass panel floating in front of
// large, slow-drifting aurora colour fields — the background is the star,
// the glass card carries just enough content to stay on-brand.
function AuroraGlassScene({ centerY, centerRotate, centerScale, active }: SceneLayerProps) {
  return (
    <motion.div
      animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.94 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <motion.div
        aria-hidden
        className="absolute -left-10 top-0 size-[220px] rounded-full bg-gradient-to-br from-sky-300/60 to-blue-500/40 blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, 14, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-14 bottom-0 size-[240px] rounded-full bg-gradient-to-tr from-blue-400/50 to-sky-300/50 blur-3xl"
        animate={{ x: [0, -18, 0], y: [0, -14, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <motion.div style={{ y: centerY, rotate: centerRotate, scale: centerScale }} className="relative z-10 w-[210px] sm:w-[240px]">
        <div className="rounded-[1.75rem] border border-white/70 bg-white/60 p-5 text-center shadow-[0_30px_70px_-24px_rgba(14,116,209,0.45)] backdrop-blur-xl">
          <div className="flex justify-center">
            <SceneBadge>AI Voice Live</SceneBadge>
          </div>

          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mt-5 grid size-16 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-[0_20px_40px_-14px_rgba(2,132,199,0.65)]"
          >
            <span aria-hidden className="absolute size-16 rounded-full bg-sky-400/40 motion-safe:animate-ping" />
            <Headphones className="relative size-6" aria-hidden />
          </motion.div>

          <div className="mt-4 flex h-8 items-center justify-center gap-[3px]">
            {[8, 14, 10, 18, 11, 16, 9].map((h, i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-gradient-to-t from-sky-300 to-blue-600"
                animate={{ height: [h * 0.35, h, h * 0.35] }}
                transition={{ duration: 1.1 + (i % 3) * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.06 }}
              />
            ))}
          </div>
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
      <PulseCoreScene {...baseProps} active={scene === "core"} />
      <WaveFieldScene {...baseProps} active={scene === "wave"} />
      <AuroraGlassScene {...baseProps} active={scene === "aurora"} />
      <ParticleSwarmScene {...baseProps} active={scene === "swarm"} />
    </div>
  )
}
