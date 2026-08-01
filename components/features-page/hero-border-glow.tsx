"use client"

import { motion } from "motion/react"

// Same traveling border-light effect used on the Voice Studio dashboard
// card, applied here to the whole hero section's edge instead — a glow
// core line plus a softer blurred outer line, both looping continuously.
export function HeroBorderGlow() {
  return (
    <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full" aria-hidden>
      <defs>
        <filter id="hero-dash-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={3} />
        </filter>
      </defs>
      <motion.rect
        x="0.3%"
        y="0.5%"
        width="99.4%"
        height="99%"
        fill="none"
        stroke="#2563EB"
        strokeOpacity={0.5}
        strokeWidth={5}
        strokeLinecap="round"
        filter="url(#hero-dash-glow)"
        animate={{ strokeDashoffset: [0, -2000] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        strokeDasharray="500 1500"
      />
      <motion.rect
        x="0.3%"
        y="0.5%"
        width="99.4%"
        height="99%"
        fill="none"
        stroke="#60A5FA"
        strokeWidth={2}
        strokeLinecap="round"
        animate={{ strokeDashoffset: [0, -2000] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        strokeDasharray="500 1500"
      />
    </svg>
  )
}
