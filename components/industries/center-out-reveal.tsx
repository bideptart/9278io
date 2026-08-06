"use client"

import type React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * Reveal for a 3-card row where the middle card fades up first, then the
 * left and right cards slide out from the center to their resting spot at
 * the same time — used for "Other industries we power" style sections.
 */
export function CenterOutItem({
  children,
  className,
  position,
  role,
}: {
  children: React.ReactNode
  className?: string
  position: "left" | "middle" | "right"
  role?: string
}) {
  const xOffset = position === "left" ? 140 : position === "right" ? -140 : 0

  return (
    <motion.div
      className={cn(className)}
      role={role}
      initial={{ opacity: 0, x: xOffset, y: position === "middle" ? 20 : 0 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, margin: "-30px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: position === "middle" ? 0 : 0.3,
      }}
    >
      {children}
    </motion.div>
  )
}
