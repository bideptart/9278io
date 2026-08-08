"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"

// Wraps a stat-row icon in a slow, continuous breathing scale so the icon
// always has visible motion, independent of whether its scroll-triggered
// parent has already played its entrance animation.
export function PulseIcon({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <motion.span
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.span>
  )
}
