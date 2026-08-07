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

const SCENES = ["tilt", "stack", "crystal", "swarm"] as const

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

// Scene 1 — "3D Voice Card": a glossy card with real perspective, gently
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

const STACK_LAYERS = [
  { offset: 24, scale: 0.84, grad: "linear-gradient(135deg, #e0f2fe, #7dd3fc)" },
  { offset: 12, scale: 0.92, grad: "linear-gradient(135deg, #7dd3fc, #38bdf8)" },
  { offset: 0, scale: 1, grad: "linear-gradient(135deg, #38bdf8, #1d4ed8)" },
]

// Scene 2 — "Layered Stack": three glass panels stacked with real depth,
// each drifting on its own float cycle, an icon fixed on the front-most
// card — a tactile "deck of cards" 3D composition.
function LayeredStackScene({ centerY, centerScale, active }: SceneLayerProps) {
  return (
    <motion.div
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div style={{ y: centerY, scale: centerScale }} className="relative z-10 flex flex-col items-center">
        <SceneBadge>Layered Stack</SceneBadge>

        <div className="relative mt-8 size-[170px] sm:size-[190px]">
          {STACK_LAYERS.map((l, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-[1.6rem] border border-white/50 shadow-[0_30px_60px_-20px_rgba(2,132,199,0.5)]"
              style={{ zIndex: i, background: l.grad, scale: l.scale }}
              animate={{ y: [l.offset - 4, l.offset + 4, l.offset - 4] }}
              transition={{ duration: 4 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
            />
          ))}
          <div className="absolute inset-0 z-10 grid place-items-center">
            <span className="grid size-14 place-items-center rounded-full bg-white/25 text-white ring-1 ring-white/40 backdrop-blur">
              <Headphones className="size-6" aria-hidden />
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const CRYSTAL_CLIP = "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)"

// Scene 3 — "Crystal Prism": a faceted gem shape — flat angular planes with
// a moving highlight sweep, gently rocking — the most overtly 3D-looking
// of the set, and structurally nothing like a card, list, or circle.
function CrystalPrismScene({ centerY, centerScale, active }: SceneLayerProps) {
  return (
    <motion.div
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div style={{ y: centerY, scale: centerScale }} className="relative z-10 flex flex-col items-center">
        <SceneBadge>Crystal Prism</SceneBadge>

        <div className="relative mt-8 size-[180px] sm:size-[210px]">
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-full bg-sky-400/35 blur-2xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute inset-[8%]"
            animate={{ rotate: [0, 6, 0, -6, 0], y: [0, -6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="absolute inset-0 shadow-[0_35px_70px_-20px_rgba(2,132,199,0.6)]"
              style={{ clipPath: CRYSTAL_CLIP, background: "linear-gradient(160deg, #bae6fd, #0ea5e9 55%, #1d4ed8)" }}
            />
            <motion.div
              className="absolute inset-0"
              style={{ clipPath: CRYSTAL_CLIP, background: "linear-gradient(200deg, rgba(255,255,255,0.65), transparent 55%)" }}
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
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
          the same layout. All four stay mounted; only `active` (and the
          opacity/transform it drives) changes, so the rotation never
          depends on any exit-animation completing first. */}
      <TiltCardScene {...baseProps} active={scene === "tilt"} />
      <LayeredStackScene {...baseProps} active={scene === "stack"} />
      <CrystalPrismScene {...baseProps} active={scene === "crystal"} />
      <ParticleSwarmScene {...baseProps} active={scene === "swarm"} />
    </div>
  )
}
