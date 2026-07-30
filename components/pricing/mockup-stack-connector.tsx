"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"

// Coordinates are tuned to the specific card layout in the pricing hero's
// mockup stack (LiveCallMockup top-right, WalletCreditMockup middle-left,
// RateByPlanMockup bottom-left) — viewBox is stretched to the container via
// preserveAspectRatio="none", so exact geometry only needs to look right at
// that layout, not be reusable elsewhere.
// Endpoints intentionally land a bit *inside* each card's bounds (not just
// at its edge) so the line tail is safely hidden under the card's opaque
// background rather than risking a visible gap from any small mismeasure.
const PATHS = [
  "M 401 130 C 340 155, 260 130, 197 117",
  "M 57 175 C 60 220, 90 270, 149 308",
]

export function MockupStackConnector({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 640 400" preserveAspectRatio="none" className={cn("pointer-events-none", className)}>
      {PATHS.map((d, i) => (
        <motion.path
          key={`base-${i}`}
          d={d}
          fill="none"
          stroke="oklch(0.546 0.215 262.88 / 0.18)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.4 + i * 0.3, ease: "easeInOut" }}
        />
      ))}
      {PATHS.map((d, i) => (
        <motion.path
          key={`flow-${i}`}
          d={d}
          fill="none"
          stroke="oklch(0.546 0.215 262.88 / 0.55)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="3 11"
          animate={{ strokeDashoffset: [0, -28] }}
          transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: i * 0.3 }}
        />
      ))}
    </svg>
  )
}
