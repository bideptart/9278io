"use client"

import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { motion, useMotionValue, useTransform, animate as animateValue } from "motion/react"

type Step = {
  icon: ReactNode
  title: string
  description: string
  live: string
}

const STEP_MS = 1600
const DRAG_THRESHOLD = 80

/**
 * "How it works" as a fanned card deck — all 3 step cards overlap in a
 * single stack, physically shuffling so the active one rotates to the
 * front (like flipping through a rolodex) while the other two peek out
 * tilted behind it. The front card is draggable — swipe/flick left or
 * right to advance or go back, same as the click-to-select behavior on
 * the peeking cards. Each card also carries a small "live" readout
 * (a real detail relevant to that step) instead of static copy alone.
 * A stories-style segmented bar (not plain numbered dots) shows genuine
 * auto-advance progress per step.
 */
export function HowItWorksPipeline({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-15, 15])

  useEffect(() => {
    if (paused) return
    const start = Date.now()
    const id = setInterval(() => {
      if (Date.now() - start >= STEP_MS) {
        setActive((a) => (a + 1) % steps.length)
      }
    }, 50)
    return () => clearInterval(id)
  }, [paused, active, steps.length])

  function advance(dir: 1 | -1) {
    setActive((a) => (a + dir + steps.length) % steps.length)
  }

  return (
    <div className="mt-14 flex w-full flex-col items-center px-4 sm:px-6" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative h-[320px] w-full max-w-2xl sm:h-[260px]">
        {steps.map((s, i) => {
          const total = steps.length
          const offset = (i - active + total) % total
          // offset 0 = front/active, 1 = one behind (peeking right), 2 = two behind (peeking left)
          const isFront = offset === 0
          const side = offset === 1 ? 1 : -1
          const peek = 18

          return (
            <motion.div
              key={s.title}
              className="absolute inset-0 flex cursor-grab flex-col items-center justify-center rounded-3xl border bg-white p-5 text-center shadow-[0_24px_50px_-24px_rgba(15,23,42,0.25)] active:cursor-grabbing sm:p-8"
              style={isFront ? { x, rotate } : undefined}
              drag={isFront ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(_, info) => {
                if (info.offset.x < -DRAG_THRESHOLD) advance(1)
                else if (info.offset.x > DRAG_THRESHOLD) advance(-1)
                animateValue(x, 0, { type: "spring", stiffness: 300, damping: 30 })
              }}
              animate={{
                x: isFront ? undefined : side * peek,
                y: isFront ? 0 : 14,
                rotate: isFront ? undefined : side * 4,
                scale: isFront ? 1 : 0.92,
                zIndex: total - offset,
                opacity: 1,
                borderColor: isFront ? "var(--primary)" : "var(--border)",
              }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={() => !isFront && setActive(i)}
              role="button"
              tabIndex={isFront ? -1 : 0}
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary [&_svg]:size-5 sm:size-14 sm:[&_svg]:size-6">
                {s.icon}
              </span>
              <span className="mt-3 font-mono text-xs font-bold uppercase tracking-wide text-primary/60 sm:mt-4">
                Step {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-1.5 text-base font-semibold tracking-tight text-foreground sm:text-lg">{s.title}</p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{s.description}</p>

              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/[0.07] px-3 py-1 text-xs font-semibold text-primary">
                <motion.span
                  className="size-1.5 rounded-full bg-primary"
                  animate={isFront ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
                  transition={{ duration: 1.3, repeat: isFront ? Infinity : 0 }}
                />
                {s.live}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* stories-style progress bar — segments fill in real time, doubles as a selector */}
      <div className="mt-8 flex w-full max-w-[280px] items-center gap-1.5">
        {steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show step ${i + 1}`}
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-primary/10"
          >
            <motion.span
              className="block h-full rounded-full bg-primary"
              initial={false}
              animate={
                i < active
                  ? { width: "100%" }
                  : i > active
                    ? { width: "0%" }
                    : { width: paused ? "50%" : ["0%", "100%"] }
              }
              transition={i === active && !paused ? { duration: STEP_MS / 1000, ease: "linear" } : { duration: 0.2 }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
