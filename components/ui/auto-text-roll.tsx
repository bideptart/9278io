"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

const STAGGER = 0.035
const NBSP = " "

/**
 * Same letter-roll mechanic as the hover-triggered text-roll pattern, but
 * self-triggering on an interval instead of whileHover — and, unlike that
 * version, carries no default text color or line-height of its own, so it
 * never overrides the caller's existing styling.
 */
export default function AutoTextRoll({
  children,
  className,
  center = false,
  intervalMs = 1000,
}: {
  children: string
  className?: string
  center?: boolean
  intervalMs?: number
}) {
  const [rolled, setRolled] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setRolled((r) => !r), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  const letters = children.split("")

  return (
    <span className="relative block overflow-hidden">
      {/* Top Text (Slides up) */}
      <div>
        {letters.map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
            : STAGGER * i

          return (
            <motion.span
              animate={{ y: rolled ? "-100%" : 0 }}
              transition={{ ease: "easeInOut", delay }}
              className={cn("inline-block", className)}
              key={i}
            >
              {l === " " ? NBSP : l}
            </motion.span>
          )
        })}
      </div>

      {/* Bottom Text (Slides in from bottom) */}
      <div className="absolute inset-0">
        {letters.map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
            : STAGGER * i

          return (
            <motion.span
              animate={{ y: rolled ? 0 : "100%" }}
              transition={{ ease: "easeInOut", delay }}
              className={cn("inline-block", className)}
              key={i}
            >
              {l === " " ? NBSP : l}
            </motion.span>
          )
        })}
      </div>
    </span>
  )
}
