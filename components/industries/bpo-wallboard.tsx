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

const SCENES = ["bloom", "halo", "waves", "swarm"] as const

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

const BLOOM_PETALS = Array.from({ length: 8 }, (_, i) => i)

// Scene 1 — "Signal Bloom": eight soft gradient petals breathing in and out
// around a fixed centre icon, the whole ring slowly rotating — reads as an
// organic blooming flower rather than mechanical rings.
function SignalBloomScene({ centerY, centerScale, active }: SceneLayerProps) {
  return (
    <motion.div
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div style={{ y: centerY, scale: centerScale }} className="relative z-10 flex flex-col items-center">
        <SceneBadge>Signal Bloom</SceneBadge>

        <div className="relative mt-7 size-[200px] sm:size-[230px]">
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-full bg-sky-400/35 blur-2xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            {BLOOM_PETALS.map((i) => {
              const deg = (360 / BLOOM_PETALS.length) * i
              return (
                <motion.span
                  key={i}
                  className="absolute left-1/2 top-1/2 h-14 w-5 rounded-full sm:h-16 sm:w-6"
                  style={{
                    transformOrigin: "bottom center",
                    transform: `translate(-50%, -100%) rotate(${deg}deg)`,
                    background: "linear-gradient(180deg, #bae6fd, #0ea5e9)",
                  }}
                  animate={{ scaleY: [0.55, 1, 0.55], opacity: [0.5, 0.95, 0.5] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                />
              )
            })}
          </motion.div>

          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[30%] grid place-items-center rounded-full shadow-[0_30px_60px_-18px_rgba(2,132,199,0.65)]"
            style={{ background: "radial-gradient(circle at 34% 28%, #bae6fd, #0ea5e9 55%, #1d4ed8 100%)" }}
          >
            <Headphones className="relative size-6 text-white sm:size-7" aria-hidden />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Scene 2 — "Orbit Halo": a fixed gradient core with a thin dashed halo and
// three small light beads travelling around it along a full circular path —
// calm and elegant next to the busier bloom/particle scenes.
function OrbitHaloScene({ centerY, centerScale, active }: SceneLayerProps) {
  return (
    <motion.div
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div style={{ y: centerY, scale: centerScale }} className="relative z-10 flex flex-col items-center">
        <SceneBadge>Orbit Halo</SceneBadge>

        <div className="relative mt-7 size-[190px] sm:size-[220px]">
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-full bg-sky-400/35 blur-2xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <span aria-hidden className="absolute inset-[7%] rounded-full border border-dashed border-sky-200" />

          <svg aria-hidden className="absolute inset-[7%] size-[86%]" viewBox="0 0 100 100">
            {[0, 1, 2].map((i) => (
              <circle key={i} r="2.4" fill="#0ea5e9">
                <animateMotion dur={`${5 + i * 1.6}s`} begin={`${i * 1.3}s`} repeatCount="indefinite" path="M50,4 A46,46 0 1,1 49.9,4 Z" />
              </circle>
            ))}
          </svg>

          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[26%] grid place-items-center rounded-full shadow-[0_30px_60px_-18px_rgba(2,132,199,0.65)]"
            style={{ background: "radial-gradient(circle at 34% 28%, #bae6fd, #0ea5e9 55%, #1d4ed8 100%)" }}
          >
            <Headphones className="relative size-6 text-white sm:size-7" aria-hidden />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Scene 3 — "Frequency Waves": four rings rippling outward from a fixed
// core and fading, staggered so a new ring launches every beat — a bigger,
// slower, more dramatic pulse than the tight particle-swarm rhythm.
function FrequencyWavesScene({ centerY, centerScale, active }: SceneLayerProps) {
  return (
    <motion.div
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div style={{ y: centerY, scale: centerScale }} className="relative z-10 flex flex-col items-center">
        <SceneBadge>Frequency Waves</SceneBadge>

        <div className="relative mt-7 grid size-[220px] place-items-center sm:size-[250px]">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute size-16 rounded-full border-2 border-sky-300/70 sm:size-20"
              animate={{ scale: [1, 3.6], opacity: [0.65, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut", delay: i * 0.8 }}
            />
          ))}

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
      <SignalBloomScene {...baseProps} active={scene === "bloom"} />
      <OrbitHaloScene {...baseProps} active={scene === "halo"} />
      <FrequencyWavesScene {...baseProps} active={scene === "waves"} />
      <ParticleSwarmScene {...baseProps} active={scene === "swarm"} />
    </div>
  )
}
