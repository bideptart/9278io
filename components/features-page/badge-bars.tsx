"use client"

import { motion } from "motion/react"

/** Small animated audio bars — same icon used in the homepage hero's
 * "AI Voice Receptionist" badge, reused here so every feature page's hero
 * badge carries the same live-waveform motif instead of a static dot. */
export function BadgeBars({ count = 4, className = "" }: { count?: number; className?: string }) {
  const heights = Array.from({ length: count }, (_, i) => 5 + ((i * 11) % 16))
  return (
    <div className={`flex h-4 items-end gap-[2px] ${className}`} aria-hidden>
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="w-[2.5px] rounded-full bg-current"
          style={{ height: h, transformOrigin: "bottom" }}
          animate={{ scaleY: [0.45, 1, 0.6, 0.9, 0.45] }}
          transition={{ duration: 0.9 + (i % 5) * 0.14, repeat: Infinity, ease: "easeInOut", delay: (i % 7) * 0.08 }}
        />
      ))}
    </div>
  )
}
