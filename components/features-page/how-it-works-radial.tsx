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
 * completed arcs stay solid. Beside it, all steps are listed at once as
 * clickable rows — the active row expands to show its description — so
 * the section reads as a real step list, not just one floating step.
 */
export function HowItWorksRadial({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0)
  const [cycleKey, setCycleKey] = useState(0)
  const paused = useRef(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (paused.current) return
      setActive((i) => (i + 1) % steps.length)
      setCycleKey((k) => k + 1)
    }, STEP_DURATION)
    return () => clearInterval(interval)
  }, [steps.length])

  function selectStep(i: number) {
    setActive(i)
    setCycleKey((k) => k + 1)
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
    <div className="mt-10">
      <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-center">
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
          <p className="absolute -bottom-7 inset-x-0 text-center text-xs font-semibold uppercase tracking-wide text-primary/60">
            Step {active + 1} of {steps.length}
          </p>
        </div>

        <div className="w-full min-w-0 flex-1">
          {steps.map((s, i) => {
            const isActive = i === active
            const isDone = i < active
            const isLast = i === steps.length - 1
            return (
              <button
                key={s.title}
                type="button"
                onClick={() => selectStep(i)}
                aria-pressed={isActive}
                className={cn(
                  "group relative flex w-full items-start gap-4 overflow-hidden rounded-xl px-4 py-4 text-left transition-all",
                  isActive ? "bg-primary/[0.05] shadow-[0_1px_2px_rgba(15,23,42,0.04)]" : "hover:bg-slate-50",
                )}
              >
                {isActive && (
                  <span aria-hidden className="absolute inset-y-1.5 left-0 w-[3px] rounded-r-full bg-primary" />
                )}
                {isActive && (
                  <motion.span
                    key={cycleKey}
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-primary/30"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: STEP_DURATION / 1000, ease: "linear" }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
                {!isLast && (
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-8 top-12 w-px translate-x-[-0.5px] bg-border/70 transition-colors",
                      isDone && "bg-primary/40",
                    )}
                    style={{ height: "calc(100% - 1.25rem)" }}
                  />
                )}
                <span
                  className={cn(
                    "relative z-10 mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : isDone
                        ? "bg-primary/15 text-primary"
                        : "bg-slate-100 text-muted-foreground",
                  )}
                >
                  {isDone ? "✓" : i + 1}
                </span>
                <span className="min-w-0 pb-1">
                  <span
                    className={cn(
                      "block text-base font-semibold tracking-tight transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
                    )}
                  >
                    {s.title}
                  </span>
                  <span
                    className={cn(
                      "mt-1 block text-sm leading-relaxed transition-colors",
                      isActive ? "text-muted-foreground" : "text-muted-foreground/60",
                    )}
                  >
                    {s.description}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
