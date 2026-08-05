"use client"

import { useEffect, useState } from "react"
import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { Timer } from "lucide-react"
import { cn } from "@/lib/utils"

// Ticks up in real time to show per-second billing (no minute-rounding) —
// pairs with the Live Call card above it as "here's what that call costs."
const RATE_PER_SEC = 0.02

export function LiveCostMockup({ className, framed = false }: { className?: string; framed?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const id = setInterval(() => setSeconds((s) => s + 1), 400)
    return () => clearInterval(id)
  }, [isInView])

  const content = (
    <>
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        <Timer className="size-3.5 text-primary" aria-hidden />
        Live call cost
      </div>
      <p className="mt-2 text-2xl font-bold tabular-nums tracking-tight text-foreground">
        ₹{(seconds * RATE_PER_SEC).toFixed(2)}
      </p>
      <p className="mt-1 text-[11px] leading-tight text-muted-foreground">Billed per second — no minute-rounding.</p>
    </>
  )

  if (framed) {
    return (
      <div ref={ref} aria-hidden className={cn("select-none", className)}>
        {content}
      </div>
    )
  }

  return (
    <div aria-hidden className={cn("pointer-events-none select-none", className)}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24, rotate: -3 }}
        whileInView={{ opacity: 1, y: 0, rotate: -2 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.6 }}
          className="w-56 rounded-2xl border border-border/60 bg-white p-4 shadow-[0_20px_60px_-15px_oklch(0.4_0.2_262/0.3)]"
        >
          {content}
        </motion.div>
      </motion.div>
    </div>
  )
}
