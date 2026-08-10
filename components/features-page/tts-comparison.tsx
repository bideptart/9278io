"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"

// Bespoke pattern for voice-selection's "Under the hood" section — literally
// under the hood: two circuit-board traces. 9278.io's signal passes through
// one chip. Typical text-to-speech routes the same signal through three —
// speech-to-text, a language model, then text-to-speech — and the pulse
// visibly stalls at each hand-off. The board layout *is* the architecture.

function Pin({ x, flip = false }: { x: number; flip?: boolean }) {
  return <rect x={flip ? x - 4 : x} y={-1} width={4} height={2} fill="#94A3B8" />
}

function Chip({ x, w, label, tone, active }: { x: number; w: number; label: string; tone: string; active: boolean }) {
  return (
    <g>
      <rect x={x} y={-11} width={w} height={22} rx={4} fill={active ? `${tone}1A` : "#F8FAFC"} stroke={active ? tone : "#CBD5E1"} strokeWidth={1.3} />
      <text x={x + w / 2} y={3} textAnchor="middle" fontSize="7.5" fontWeight={700} fill={active ? tone : "#64748B"} letterSpacing="0.3">
        {label}
      </text>
    </g>
  )
}

// One shared pulse path per row, expressed as a single continuous SVG path
// that dips through every chip in order — offsetPath needs one path, not a
// list, so the "stop at each chip" motion comes from an eased multi-keyframe
// timeline along it instead of swapping paths mid-flight.
const NATIVE_PATH = "M20,0 L280,0"
const TTS_PATH = "M20,0 L70,0 L114,0 L140,0 L184,0 L210,0 L254,0 L280,0"

export function TtsComparison() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: false, amount: 0.4 })

  return (
    <div ref={containerRef} className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-border/60 bg-white p-6 md:p-8">
      {/* native — one chip on the board */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold" style={{ color: "#2563EB" }}>9278.io</span>
        <span className="text-[11px] font-semibold" style={{ color: "#2563EB" }}>0.2s to first sound</span>
      </div>
      <svg viewBox="-4 -14 308 28" className="mt-4 w-full" aria-hidden>
        <path d={NATIVE_PATH} stroke="#DBEAFE" strokeWidth="1.5" fill="none" />
        <Pin x={20} />
        <Pin x={280} flip />
        <Chip x={110} w={80} label="AUDIO ENGINE" tone="#2563EB" active={inView} />
        <motion.circle
          key={`native-${inView}`}
          r="3"
          fill="#2563EB"
          style={{ offsetPath: `path('${NATIVE_PATH}')` }}
          animate={inView ? { offsetDistance: ["0%", "100%"] } : { offsetDistance: "0%" }}
          transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 1.7, ease: "easeInOut" }}
        />
      </svg>
      <p className="mt-1 text-center text-[12px] text-muted-foreground">Straight through one chip — audio in, audio out.</p>

      <div className="my-6 border-t border-dashed border-border" aria-hidden />

      {/* typical TTS — three chips, three hops, three stalls */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-muted-foreground">Typical text-to-speech</span>
        <span className="text-[11px] font-semibold text-muted-foreground">1.8s to first sound</span>
      </div>
      <svg viewBox="-4 -14 308 28" className="mt-4 w-full" aria-hidden>
        <path d={TTS_PATH} stroke="#E2E8F0" strokeWidth="1.5" fill="none" />
        <Pin x={20} />
        <Pin x={280} flip />
        <Chip x={70} w={44} label="STT" tone="#7C3AED" active={inView} />
        <Chip x={140} w={44} label="LLM" tone="#D97706" active={inView} />
        <Chip x={210} w={44} label="TTS" tone="#059669" active={inView} />
        <motion.circle
          key={`tts-${inView}`}
          r="3"
          fill="#64748B"
          style={{ offsetPath: `path('${TTS_PATH}')` }}
          animate={inView ? { offsetDistance: ["0%", "28%", "28%", "55%", "55%", "81%", "81%", "100%"] } : { offsetDistance: "0%" }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1] }}
        />
      </svg>
      <p className="mt-1 text-center text-[12px] text-muted-foreground">Three separate chips, three hand-offs — every one costs time.</p>
    </div>
  )
}
