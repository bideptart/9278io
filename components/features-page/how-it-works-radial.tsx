"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type Step = {
  icon: ReactNode
  title: string
  description: string
}

const SIZE = 152
const STROKE = 10
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const STEP_DURATION = 2600

/**
 * Circular step wheel — a ring divided into one arc per step. The active
 * arc sweeps in like a countdown (synced to the real auto-advance timer),
 * completed arcs stay solid, and clickable dots below let the reader jump
 * to any step directly (pausing the auto-advance for a while). A
 * completely different geometry from the vertical timeline, horizontal
 * flow, and zigzag path used for "how it works" on the other feature
 * pages — this one is a radial progress indicator, not a row of cards.
 */
export function HowItWorksRadial({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0)
  const paused = useRef(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (paused.current) return
      setActive((i) => (i + 1) % steps.length)
    }, STEP_DURATION)
    return () => clearInterval(interval)
  }, [steps.length])

  function selectStep(i: number) {
    setActive(i)
    paused.current = true
    setTimeout(() => {
      paused.current = false
    }, STEP_DURATION * 3)
  }

  const segmentLength = CIRCUMFERENCE / steps.length
  const gap = 6
  const drawLength = segmentLength - gap
  const current = steps[active]

  return (
    <div className="mx-auto mt-10 max-w-xl">
      <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:justify-center">
        <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
          <motion.div
            aria-hidden
            className="absolute inset-2 rounded-full bg-primary/15 blur-xl"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="relative size-full -rotate-90">
            {steps.map((_, i) => {
              const isDone = i < active
              const isActive = i === active
              return (
                <circle
                  key={i}
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  fill="none"
                  stroke="oklch(0.9 0.02 262.88)"
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                  strokeDasharray={`${drawLength} ${CIRCUMFERENCE - drawLength}`}
                  strokeDashoffset={-(i * segmentLength)}
                  opacity={isDone || isActive ? 0 : 1}
                />
              )
            })}
            {steps.map((_, i) => {
              const isDone = i < active
              const isActive = i === active
              if (!isDone && !isActive) return null
              return (
                <motion.circle
                  key={`fill-${i}-${isActive ? active : "done"}`}
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  fill="none"
                  stroke="oklch(0.546 0.215 262.88)"
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                  strokeDashoffset={-(i * segmentLength)}
                  initial={isActive ? { strokeDasharray: `0 ${CIRCUMFERENCE}` } : false}
                  animate={{ strokeDasharray: `${drawLength} ${CIRCUMFERENCE - drawLength}` }}
                  transition={isActive ? { duration: STEP_DURATION / 1000, ease: "linear" } : { duration: 0.3 }}
                />
              )
            })}
          </svg>
          <AnimatePresence mode="wait">
            <motion.span
              key={active}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary [&_svg]:size-6">
                {current.icon}
              </span>
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-primary/70">
                Step {active + 1} of {steps.length}
              </span>
              <p className="mt-1 text-lg font-semibold tracking-tight text-foreground">{current.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{current.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* clickable step dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => selectStep(i)}
            aria-label={`Go to step ${i + 1}: ${s.title}`}
            aria-pressed={active === i}
            className="p-1"
          >
            <span
              className={cn(
                "block h-1.5 rounded-full transition-all duration-300",
                active === i ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-primary/40",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
