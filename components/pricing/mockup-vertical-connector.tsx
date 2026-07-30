"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"

/** Short animated dashed line connecting two stacked mockup cards on mobile. */
export function MockupVerticalConnector({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 56" width="20" height="56" className={cn("pointer-events-none", className)}>
      <motion.line
        x1="10"
        y1="0"
        x2="10"
        y2="56"
        stroke="oklch(0.546 0.215 262.88 / 0.18)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      <motion.line
        x1="10"
        y1="0"
        x2="10"
        y2="56"
        stroke="oklch(0.546 0.215 262.88 / 0.55)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 9"
        animate={{ strokeDashoffset: [0, -24] }}
        transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
    </svg>
  )
}
