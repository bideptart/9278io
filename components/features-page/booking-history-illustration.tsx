"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Bell, Calendar, CheckCircle2, Clock } from "lucide-react"
import { MouseGlowCard } from "@/components/animation/mouse-glow-card"
import { CountUp } from "@/components/ui/count-up"

/** Terms the search bar cycles through — typed out, held, then deleted, looping forever. */
const SEARCH_TERMS = ["Aarav", "Confirmed", "Neha"]

/** Live-typing search hook: types a term, holds it, deletes it, moves to the next term, loops. */
function useTypingSearch(terms: string[]) {
  const [text, setText] = useState("")

  useEffect(() => {
    let termIndex = 0
    let charIndex = 0
    let phase: "typing" | "holding" | "deleting" = "typing"
    let timeout: ReturnType<typeof setTimeout>

    function tick() {
      const term = terms[termIndex]
      if (phase === "typing") {
        charIndex++
        setText(term.slice(0, charIndex))
        if (charIndex >= term.length) {
          phase = "holding"
          timeout = setTimeout(tick, 1100)
          return
        }
        timeout = setTimeout(tick, 90)
      } else if (phase === "holding") {
        phase = "deleting"
        timeout = setTimeout(tick, 60)
      } else {
        charIndex--
        setText(term.slice(0, charIndex))
        if (charIndex <= 0) {
          phase = "typing"
          termIndex = (termIndex + 1) % terms.length
          timeout = setTimeout(tick, 400)
          return
        }
        timeout = setTimeout(tick, 45)
      }
    }

    timeout = setTimeout(tick, 900)
    return () => clearTimeout(timeout)
  }, [terms])

  return text
}

/** Gentle continuous float — matches the treatment used on the FAQ/Analytics illustrations' stat chips. */
function Float({
  children,
  delay = 0,
  duration = 4.5,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1, y: [-6, 6, -6] }}
      transition={{
        opacity: { duration: 0.4, delay, ease: "easeOut" },
        scale: { duration: 0.4, delay, ease: "easeOut" },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay: delay + 0.4 },
      }}
    >
      {children}
    </motion.div>
  )
}

const STATUS_STYLES: Record<string, string> = {
  Confirmed: "bg-emerald-100 text-emerald-700",
  Completed: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
}

const BOOKINGS = [
  { name: "Aarav Mehta", company: "Acme Corp", time: "May 30, 11:00 AM", status: "Confirmed", color: "oklch(0.6 0.19 262.88)" },
  { name: "Neha Sharma", company: "Globex Inc", time: "May 29, 3:30 PM", status: "Confirmed", color: "oklch(0.62 0.19 300)" },
  { name: "Rohan Verma", company: "InnovaTech", time: "May 28, 10:30 AM", status: "Completed", color: "oklch(0.72 0.17 155)" },
  { name: "Priya Nair", company: "NextWave", time: "May 27, 2:00 PM", status: "Cancelled", color: "oklch(0.78 0.15 70)" },
]

const FLOW = [
  { icon: Calendar, label: "Agent books" },
  { icon: Clock, label: "Appointment scheduled" },
  { icon: Bell, label: "Confirmed" },
  { icon: CheckCircle2, label: "Completed" },
]

/**
 * Product-screenshot style illustration for the Booking History feature
 * page — a browser-chrome card with a searchable, filterable booking table
 * (status badges, avatars), a checkmark badge, and an "Appointments, all in
 * one place" stat card. Same tilt/spotlight
 * treatment as the Analytics Dashboard illustration for visual consistency
 * across the feature detail pages.
 */
export function BookingHistoryIllustration() {
  const query = useTypingSearch(SEARCH_TERMS)
  const [page, setPage] = useState(1)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setPage((p) => (p % 3) + 1), 2200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setActiveStep((s) => (s + 1) % FLOW.length), 1500)
    return () => clearInterval(interval)
  }, [])

  const q = query.toLowerCase()
  const filtered = BOOKINGS.filter(
    (b) => !q || b.name.toLowerCase().includes(q) || b.company.toLowerCase().includes(q) || b.status.toLowerCase().includes(q),
  )

  return (
    <div className="relative mx-auto w-full max-w-[460px] lg:mr-4">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-8 -z-10 rounded-full bg-primary/20 blur-[60px]"
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
        <MouseGlowCard
          tiltStrength={4}
          glowSize={280}
          glowColor="oklch(0.6 0.19 262.88 / 0.16)"
          className="relative overflow-hidden rounded-3xl border-border/60 bg-[#F4F8FF] shadow-[0_30px_70px_-30px_oklch(0.2_0.05_260/0.35)] backdrop-blur-0"
        >
          {/* window chrome */}
          <div className="flex items-center justify-between border-b border-border/60 bg-primary/[0.06] px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-[10px] font-medium text-muted-foreground">Booking History</span>
          </div>

          <div className="p-4">
            {/* search + filter row */}
            <div className="flex items-center gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-border/60 bg-white px-2.5 py-1.5">
                <span className="size-2.5 rounded-full border border-muted-foreground/40" />
                <span className="whitespace-nowrap text-[10px] text-foreground">
                  {query || <span className="text-muted-foreground">Search bookings…</span>}
                  <span className="ml-px inline-block w-px animate-pulse bg-primary align-middle" style={{ height: "10px" }} />
                </span>
              </div>
              <span className="shrink-0 rounded-lg border border-border/60 bg-white px-2 py-1.5 text-[9px] font-medium text-muted-foreground">
                Filter
              </span>
            </div>

            {/* table header */}
            <div className="mt-3 grid grid-cols-[1.4fr_1fr_0.8fr] gap-2 px-2.5 text-[8px] font-semibold uppercase tracking-wide text-muted-foreground/70">
              <span>Appointment</span>
              <span>Date &amp; time</span>
              <span className="text-right">Status</span>
            </div>

            {/* booking rows — filtered live by the typing search above; fixed height (not min) so the card never resizes as rows filter in/out */}
            <div className="mt-1.5 h-[204px] space-y-1.5">
              <AnimatePresence mode="popLayout">
                {filtered.map((b) => (
                  <motion.div
                    key={b.name}
                    layout
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-[1.4fr_1fr_0.8fr] items-center gap-2 rounded-xl border border-border/60 bg-white p-2.5"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className="flex size-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                        style={{ backgroundColor: b.color }}
                      >
                        {b.name[0]}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[10px] font-semibold text-foreground">{b.name}</p>
                        <p className="truncate text-[9px] text-muted-foreground">{b.company}</p>
                      </div>
                    </div>
                    <span className="truncate text-[9px] text-muted-foreground">{b.time}</span>
                    <span
                      className={`ml-auto shrink-0 rounded-full px-2 py-0.5 text-[8px] font-semibold ${STATUS_STYLES[b.status]}`}
                    >
                      {b.status}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {filtered.length === 0 && (
                <p className="pt-8 text-center text-[10px] text-muted-foreground">No bookings match “{query}”</p>
              )}
            </div>

            {/* pagination footer — active page cycles on its own to suggest live browsing */}
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[9px] font-medium text-muted-foreground/60">
              {[1, 2, 3].map((n) => (
                <span
                  key={n}
                  className={`flex size-5 items-center justify-center rounded-md transition-colors duration-300 ${
                    page === n ? "bg-primary text-white" : ""
                  }`}
                >
                  {n}
                </span>
              ))}
              <span>···</span>
              <span className="flex size-5 items-center justify-center rounded-md">12</span>
            </div>
          </div>
        </MouseGlowCard>
      </motion.div>

      {/* 4-step process flow underneath the card — steps activate one at a time, like a real workflow running */}
      <div className="relative mt-6 hidden items-start justify-between px-2 sm:flex">
        <div aria-hidden className="absolute left-6 right-6 top-4 h-px border-t border-dashed border-border" />
        <motion.div
          aria-hidden
          className="absolute top-4 h-px -translate-y-1/2 bg-primary"
          style={{ left: "1.5rem" }}
          animate={{ width: `calc(${(activeStep / (FLOW.length - 1)) * 100}% - 3rem)` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        {FLOW.map((f, i) => {
          const Icon = f.icon
          const isDone = i < activeStep
          const isActive = i === activeStep
          return (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              whileHover={{ y: -2 }}
              className="relative flex flex-col items-center gap-1.5"
            >
              <motion.span
                animate={{ scale: isActive ? 1.15 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className={`relative flex size-9 items-center justify-center rounded-full transition-colors duration-300 ${
                  isDone || isActive
                    ? "bg-gradient-to-br from-primary to-[oklch(0.45_0.19_264)] text-white shadow-[0_8px_18px_-6px_oklch(0.546_0.215_262.88/0.5)]"
                    : "bg-white text-muted-foreground/40 shadow-[0_4px_10px_-6px_rgba(15,23,42,0.15)]"
                }`}
              >
                {isActive && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full border-2 border-primary/40"
                    animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                {isDone ? <CheckCircle2 className="relative size-4" aria-hidden /> : <Icon className="relative size-4" aria-hidden />}
              </motion.span>
              <span
                className={`max-w-[80px] text-center text-[9px] font-medium transition-colors duration-300 ${
                  isActive ? "text-primary" : isDone ? "text-foreground" : "text-muted-foreground/50"
                }`}
              >
                {f.label}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* floating "All Appointments" stat card, clear of the card's left edge */}
      <Float delay={0.15} duration={4} className="absolute -left-16 top-2 z-20 hidden sm:block">
        <div className="w-20 rounded-lg border border-border/70 bg-white p-2 shadow-[0_16px_34px_-18px_oklch(0.2_0.05_260/0.4)]">
          <p className="text-[7px] text-muted-foreground">All Appointments</p>
          <CountUp value={128} duration={1.2} className="mt-0.5 block text-xs font-bold tabular-nums text-foreground" />
          <svg viewBox="0 0 100 28" className="mt-1 w-full overflow-visible">
            <motion.path
              d="M0 22 C15 20, 20 10, 32 14 C44 18, 48 6, 60 8 C72 10, 78 2, 100 4"
              fill="none"
              stroke="oklch(0.546 0.215 262.88)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </Float>

      {/* floating "Upcoming Appointments" card, clear of the card's right edge — mirrors "All Appointments" */}
      <Float delay={0.35} duration={4.2} className="absolute -right-16 top-2 z-20 hidden sm:block">
        <div className="w-20 rounded-lg border border-border/70 bg-white p-2 shadow-[0_16px_34px_-18px_oklch(0.2_0.05_260/0.4)]">
          <span className="flex size-5 items-center justify-center rounded-full bg-primary text-white">
            <Bell className="size-3" aria-hidden />
          </span>
          <p className="mt-1 text-[7px] text-muted-foreground">Upcoming</p>
          <CountUp value={8} duration={1} className="block text-xs font-bold tabular-nums text-foreground" />
        </div>
      </Float>

      {/* checkmark badge, vertically centered on the right edge — clear of both stat cards */}
      <Float delay={0.5} duration={4.6} className="absolute -right-5 top-1/2 z-20 hidden -translate-y-1/2 sm:block">
        <span className="flex size-11 items-center justify-center rounded-full bg-primary text-white shadow-[0_10px_24px_oklch(0.546_0.215_262.88/0.45)] ring-4 ring-white">
          <CheckCircle2 className="size-5" aria-hidden />
        </span>
      </Float>

      {/* "Appointments, all in one place" card, bottom-right */}
      <Float delay={0.7} duration={5} className="absolute -right-4 -bottom-6 z-20 hidden sm:block">
        <div className="flex w-[168px] items-center gap-2.5 rounded-2xl border border-border/70 bg-white px-3.5 py-2.5 shadow-[0_16px_34px_-18px_oklch(0.2_0.05_260/0.4)]">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="size-4" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold leading-tight text-foreground">Appointments</p>
            <p className="text-[10px] font-semibold leading-tight text-foreground">all in one place</p>
          </div>
        </div>
      </Float>
    </div>
  )
}
