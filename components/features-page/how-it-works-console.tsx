"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type Step = { icon: ReactNode; title: string; description: string }

const TYPE_SPEED = 22
const HOLD_AFTER_LINE = 700
const CYCLE_GAP = 2000

/**
 * "How it works" as a terminal console that types out each step as a
 * command line, one at a time, with a blinking cursor. A code-console
 * metaphor, distinct from the flow, radial, timeline, zigzag, and
 * step-reveal treatments used for "how it works" elsewhere on the site.
 */
export function HowItWorksConsole({ steps }: { steps: Step[] }) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [typed, setTyped] = useState("")
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    setVisibleCount(0)
    setTyped("")

    function typeLine(index: number) {
      if (cancelled || index >= steps.length) {
        timers.push(setTimeout(() => !cancelled && setCycle((c) => c + 1), CYCLE_GAP))
        return
      }
      const line = steps[index].title
      let i = 0
      const interval = setInterval(() => {
        if (cancelled) return
        i += 1
        setTyped(line.slice(0, i))
        if (i >= line.length) {
          clearInterval(interval)
          timers.push(
            setTimeout(() => {
              if (cancelled) return
              setVisibleCount(index + 1)
              setTyped("")
              typeLine(index + 1)
            }, HOLD_AFTER_LINE),
          )
        }
      }, TYPE_SPEED)
      timers.push(interval as unknown as ReturnType<typeof setTimeout>)
    }

    const start = setTimeout(() => typeLine(0), 400)
    timers.push(start)

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [cycle, steps])

  const activeIndex = visibleCount < steps.length ? visibleCount : -1

  return (
    <div className="relative mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-[1fr_200px]">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-emerald-500/10 blur-2xl"
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.5)]"
      >
        <div className="flex items-center gap-1.5 border-b border-slate-800 bg-slate-950/60 px-4 py-2.5">
          {[["bg-red-500/70", 0], ["bg-amber-500/70", 0.08], ["bg-emerald-500/70", 0.16]].map(([color, delay]) => (
            <motion.span
              key={color as string}
              className={cn("size-2.5 rounded-full", color as string)}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 400, damping: 14, delay: delay as number }}
            />
          ))}
          <span className="ml-2 text-[10px] font-medium text-slate-400">sandbox — test session</span>
          <span className="ml-auto flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" aria-hidden />
            Running
          </span>
        </div>

        <div className="h-[340px] space-y-3.5 overflow-hidden p-5 font-mono text-xs sm:text-sm">
          {steps.map((step, i) => {
            const isDone = i < visibleCount
            const isActive = i === activeIndex
            if (!isDone && !isActive) return null
            return (
              <div key={step.title}>
                <div className="flex items-start gap-2">
                  <span className="shrink-0 text-primary/70">agent@sandbox:~$</span>
                  <span className={cn("text-slate-100", isActive && "after:inline-block")}>
                    {isActive ? typed : step.title}
                    {isActive && (
                      <motion.span
                        className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-[2px] bg-emerald-400"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}
                  </span>
                </div>
                {isDone && (
                  <>
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-4 mt-1 flex items-start gap-2 text-slate-400"
                    >
                      <span className="mt-0.5 shrink-0 text-primary/70">{step.icon}</span>
                      {step.description}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.15 }}
                      className="ml-4 mt-1 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400"
                    >
                      <span>✓</span> done
                    </motion.p>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* session step checklist, filling the space beside the terminal */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        className="rounded-2xl border border-border/60 bg-white p-4"
      >
        <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Session steps</p>
        <div className="relative mt-3 space-y-3">
          <div className="absolute bottom-3 left-2.5 top-3 w-px overflow-hidden bg-border/60" aria-hidden>
            <motion.div
              className="w-full bg-gradient-to-b from-emerald-500 to-emerald-500/20"
              animate={{ height: `${(visibleCount / steps.length) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          {steps.map((step, i) => {
            const isDone = i < visibleCount
            const isActive = i === activeIndex
            return (
              <div key={step.title} className="relative flex items-start gap-2.5">
                <motion.span
                  animate={{
                    backgroundColor: isDone ? "oklch(0.72 0.18 155)" : isActive ? "oklch(0.546 0.215 262.88)" : "oklch(0.94 0.005 260)",
                    color: isDone || isActive ? "#fff" : "oklch(0.55 0.02 260)",
                    scale: isActive ? [1, 1.15, 1] : 1,
                  }}
                  transition={{ duration: isActive ? 1 : 0.3, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
                  className="relative z-10 flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-background text-[9px] font-bold"
                >
                  {isDone ? "✓" : i + 1}
                </motion.span>
                <div className="min-w-0 pt-0.5">
                  <p className={cn("text-[10.5px] font-semibold leading-tight", isActive ? "text-foreground" : isDone ? "text-foreground/80" : "text-muted-foreground")}>
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
