"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"

// Coordinates are tuned to the specific card layout in the pricing hero's
// mockup stack (LiveCallMockup top-right, WalletCreditMockup middle-left,
// RateByPlanMockup bottom-left) — viewBox is stretched to the container via
// preserveAspectRatio="none", so exact geometry only needs to look right at
// that layout, not be reusable elsewhere.
const PATHS = [
  "M 470 90 C 360 130, 260 130, 175 175",
  "M 175 195 C 150 230, 150 270, 165 305",
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
