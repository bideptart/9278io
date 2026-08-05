"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { PhoneCall, Ear, Gauge, Route, Moon, Mic, PartyPopper, Timer } from "lucide-react"

const CHECKS = [
  {
    icon: PhoneCall,
    title: "Dial the real number",
    description: "No sandbox mode — the exact number customers dial.",
    tone: "#2563EB",
  },
  {
    icon: Ear,
    title: "Hear it as callers do",
    description: "Same voice, greeting, and hold music.",
    tone: "#7C3AED",
  },
  {
    icon: Gauge,
    title: "Latency & voice quality",
    description: "Catch a lag or glitch live, before customers do.",
    tone: "#10B981",
  },
  {
    icon: Route,
    title: "Routing end to end",
    description: "Transfers, fallbacks, and hours behave as set.",
    tone: "#D97706",
  },
  {
    icon: Moon,
    title: "After-hours behavior",
    description: "Calls outside business hours handled correctly.",
    tone: "#DB2777",
  },
  {
    icon: Mic,
    title: "Recording & transcript",
    description: "Every call recorded and transcribed correctly.",
    tone: "#0891B2",
  },
]

const CHECKING_MS = 900
const GAP_MS = 250
const HOLD_MS = 1800
const RESET_MS = 500

const RADIUS = 19
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

type Status = "pending" | "checking" | "passed"

function Dial({ status, tone }: { status: Status; tone: string }) {
  return (
    <svg viewBox="0 0 44 44" className="absolute inset-0 size-full -rotate-90" aria-hidden>
      <circle cx="22" cy="22" r={RADIUS} fill="none" stroke="#EEF1F5" strokeWidth={3} />
      <motion.circle
        cx="22"
        cy="22"
        r={RADIUS}
        fill="none"
        stroke={tone}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        animate={{
          strokeDashoffset: status === "pending" ? CIRCUMFERENCE : 0,
        }}
        transition={{ duration: status === "checking" ? CHECKING_MS / 1000 : 0.3, ease: "linear" }}
      />
    </svg>
  )
}

export function LiveTestCallChecklist() {
  const [statuses, setStatuses] = useState<Status[]>(CHECKS.map(() => "pending"))
  const [durations, setDurations] = useState<(number | null)[]>(CHECKS.map(() => null))
  const [allDone, setAllDone] = useState(false)
  const [elapsedMs, setElapsedMs] = useState(0)

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = []
    let ticker: ReturnType<typeof setInterval>

    function run() {
      setStatuses(CHECKS.map(() => "pending"))
      setDurations(CHECKS.map(() => null))
      setAllDone(false)
      setElapsedMs(0)

      ticker = setInterval(() => setElapsedMs((t) => t + 100), 100)

      CHECKS.forEach((_, i) => {
        const startAt = i * (CHECKING_MS + GAP_MS)
        timers.push(
          setTimeout(() => {
            setStatuses((s) => s.map((v, si) => (si === i ? "checking" : v)))
          }, startAt),
        )
        timers.push(
          setTimeout(() => {
            setStatuses((s) => s.map((v, si) => (si === i ? "passed" : v)))
            setDurations((d) => d.map((v, si) => (si === i ? CHECKING_MS + startAt : v)))
          }, startAt + CHECKING_MS),
        )
      })

      const totalMs = CHECKS.length * (CHECKING_MS + GAP_MS)
      timers.push(
        setTimeout(() => {
          setAllDone(true)
          clearInterval(ticker)
        }, totalMs + 150),
      )
      timers.push(setTimeout(run, totalMs + 150 + HOLD_MS + RESET_MS))
    }

    run()
    return () => {
      timers.forEach(clearTimeout)
      clearInterval(ticker)
    }
  }, [])

  const passedCount = statuses.filter((s) => s === "passed").length
  const elapsedLabel = (elapsedMs / 1000).toFixed(1) + "s"

  return (
    <div className="mx-auto mt-10 w-full max-w-4xl">
      {/* overall progress */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Running live checks</p>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-xs font-semibold tabular-nums text-muted-foreground">
            <Timer className="size-3" aria-hidden />
            {elapsedLabel}
          </span>
          <p className="text-xs font-semibold tabular-nums text-muted-foreground">{passedCount}/{CHECKS.length}</p>
        </div>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#EEF2FF]">
        <motion.div
          className="h-full rounded-full bg-primary"
          animate={{ width: `${(passedCount / CHECKS.length) * 100}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* dial grid — each check is its own radial gauge that fills as it runs */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {CHECKS.map((item, i) => {
          const Icon = item.icon
          const status = statuses[i]
          const duration = durations[i]
          const isPassed = status === "passed"
          return (
            <motion.div
              key={item.title}
              className="relative overflow-hidden rounded-2xl border border-border/60 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <div className="relative size-11 shrink-0">
                  <Dial status={status} tone={item.tone} />
                  <motion.span
                    className="absolute inset-[6px] flex items-center justify-center rounded-full"
                    animate={{ backgroundColor: status === "pending" ? "#F1F5F9" : `${item.tone}18` }}
                    transition={{ duration: 0.3 }}
                  >
                    <AnimatePresence mode="wait">
                      {isPassed ? (
                        <motion.svg key="check" viewBox="0 0 16 16" className="size-3" fill="none" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}>
                          <motion.path
                            d="M3 8.5L6.2 11.5L13 4.5"
                            stroke={item.tone}
                            strokeWidth={2.4}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.25 }}
                          />
                        </motion.svg>
                      ) : (
                        <Icon key="icon" className="size-4" style={{ color: status === "pending" ? "#94A3B8" : item.tone }} aria-hidden />
                      )}
                    </AnimatePresence>
                  </motion.span>
                </div>

                {/* duration badge — reserved space so it never shifts the card */}
                <div className="h-5 w-10 text-right">
                  <AnimatePresence>
                    {isPassed && duration != null && (
                      <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block rounded-full px-1.5 py-0.5 font-mono text-[10px] font-semibold"
                        style={{ backgroundColor: `${item.tone}14`, color: item.tone }}
                      >
                        {(duration / 1000).toFixed(1)}s
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <motion.p
                className="mt-3 text-sm font-semibold"
                animate={{ color: status === "pending" ? "#94A3B8" : "#0F172A" }}
                transition={{ duration: 0.3 }}
              >
                {item.title}
              </motion.p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
            </motion.div>
          )
        })}
      </div>

      {/* payoff banner — height is always reserved so it never shifts the layout */}
      <div className="mt-6 flex h-11 items-center justify-center">
        <motion.div
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
          style={{ backgroundColor: "#ECFDF5", color: "#059669" }}
          animate={{ opacity: allDone ? 1 : 0, y: allDone ? 0 : 8 }}
          transition={{ duration: 0.3 }}
        >
          <PartyPopper className="size-4" aria-hidden />
          All {CHECKS.length} checks passed in {elapsedLabel} — ready for real callers
        </motion.div>
      </div>
    </div>
  )
}
