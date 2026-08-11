"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { BarChart3, PhoneCall, PieChart, Settings, TrendingUp, Users } from "lucide-react"
import { MouseGlowCard } from "@/components/animation/mouse-glow-card"
import { CountUp } from "@/components/ui/count-up"
import { cn } from "@/lib/utils"

/** Gentle continuous float — matches the treatment used on the FAQ illustration's stat chips. */
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

const STATS = [
  { icon: PhoneCall, label: "Total Calls", value: 12842, change: "+18.6%" },
  { icon: TrendingUp, label: "Minutes Used", value: 24530, change: "+16.2%" },
  { icon: Users, label: "Active Agents", value: 56, change: "+12.5%" },
]

const SOURCES = [
  { label: "Website", pct: 45, color: "oklch(0.6 0.19 262.88)" },
  { label: "Phone Number", pct: 28, color: "oklch(0.62 0.19 300)" },
  { label: "WhatsApp", pct: 15, color: "oklch(0.72 0.17 155)" },
  { label: "Other", pct: 12, color: "oklch(0.78 0.15 70)" },
]

// SVG donut: stacked stroke segments around a circle of radius r.
function donutSegments(r: number) {
  const circumference = 2 * Math.PI * r
  let offset = 0
  return SOURCES.map((s) => {
    const length = (s.pct / 100) * circumference
    const seg = { ...s, length, offset }
    offset += length
    return seg
  })
}

const AGENTS = [
  { name: "Aarav Mehta", calls: "1,842", status: "On call", initial: "A", color: "oklch(0.6 0.19 262.88)" },
  { name: "Neha Sharma", calls: "1,534", status: "Available", initial: "N", color: "oklch(0.62 0.19 300)" },
  { name: "Rohan Verma", calls: "1,248", status: "Available", initial: "R", color: "oklch(0.72 0.17 155)" },
]

const SETTINGS_ROWS = [
  { label: "Email notifications", on: true },
  { label: "Weekly summary", on: false },
  { label: "Auto top-up", on: true },
]

function Donut({ size = "size-16" }: { size?: string }) {
  const donut = donutSegments(36)
  const circumference = 2 * Math.PI * 36
  return (
    <svg viewBox="0 0 88 88" className={size}>
      <circle cx="44" cy="44" r="36" fill="none" stroke="oklch(0.94 0.01 262.88)" strokeWidth="10" />
      {donut.map((seg, i) => (
        <motion.circle
          key={seg.label}
          cx="44"
          cy="44"
          r="36"
          fill="none"
          stroke={seg.color}
          strokeWidth="10"
          strokeDashoffset={-seg.offset}
          transform="rotate(-90 44 44)"
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${seg.length} ${circumference - seg.length}` }}
          transition={{ duration: 0.5, delay: 0.15 * i, ease: "easeOut" }}
        />
      ))}
    </svg>
  )
}

function AnalyticsPanel() {
  return (
    <>
      {/* stat cards */}
      <div className="grid grid-cols-3 gap-2.5">
        {STATS.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
              className="rounded-xl border border-border/60 bg-white p-2.5"
            >
              <span className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="size-3.5" aria-hidden />
              </span>
              <CountUp
                value={s.value}
                duration={1.2}
                className="mt-2 block text-[13px] font-bold tabular-nums text-foreground"
              />
              <p className="text-[9px] text-muted-foreground">{s.label}</p>
              <p className="mt-0.5 text-[9px] font-semibold text-emerald-600">{s.change}</p>
            </motion.div>
          )
        })}
      </div>

      {/* call activity chart */}
      <div className="mt-3 overflow-hidden rounded-xl border border-border/60 bg-white p-3">
        <p className="text-[10px] font-semibold text-foreground">Call Activity</p>
        <svg viewBox="-2 10 224 44" className="mt-1 block w-full overflow-hidden">
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.6 0.19 262.88)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="oklch(0.6 0.19 262.88)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/*
            Built from explicit C-curve segments (control points held at each
            segment's own endpoint y-values) instead of chained smooth
            T-commands — T's reflected control points compounded segment to
            segment and overshot far outside the point range (one control
            point landed at y=-42), clipping the curve. Convex-hull property
            of a cubic Bezier guarantees this version stays within [14, 46],
            the real min/max of the data.
          */}
          <motion.path
            d="M0 50 L0 34 C9.33 34 18.67 40 28 40 C37.33 40 46.67 32 56 32 C65.33 32 74.67 46 84 46 C93.33 46 102.67 18 112 18 C121.33 18 130.67 30 140 30 C149.33 30 158.67 14 168 14 C177.33 14 186.67 26 196 26 L220 20 L220 50 Z"
            fill="url(#areaFill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          />
          <motion.path
            d="M0 34 C9.33 34 18.67 40 28 40 C37.33 40 46.67 32 56 32 C65.33 32 74.67 46 84 46 C93.33 46 102.67 18 112 18 C121.33 18 130.67 30 140 30 C149.33 30 158.67 14 168 14 C177.33 14 186.67 26 196 26 L220 20"
            fill="none"
            stroke="oklch(0.546 0.215 262.88)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* donut + table row */}
      <div className="mt-3 grid grid-cols-[auto_1fr] gap-3">
        <div className="flex items-center justify-center rounded-xl border border-border/60 bg-white p-2.5">
          <Donut />
        </div>
        <div className="rounded-xl border border-border/60 bg-white p-2.5">
          <p className="text-[10px] font-semibold text-foreground">Top Agents</p>
          <div className="mt-1.5 space-y-1.5">
            {AGENTS.slice(0, 2).map((a) => (
              <div key={a.name} className="flex items-center gap-1.5">
                <span
                  className="flex size-4 items-center justify-center rounded-full text-[8px] font-bold text-white"
                  style={{ backgroundColor: a.color }}
                >
                  {a.initial}
                </span>
                <span className="min-w-0 flex-1 truncate text-[9px] text-foreground">{a.name}</span>
                <span className="shrink-0 text-[9px] font-semibold tabular-nums text-muted-foreground">
                  {a.calls}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function AgentsPanel() {
  return (
    <div className="rounded-xl border border-border/60 bg-white p-3">
      <p className="text-[10px] font-semibold text-foreground">Agents</p>
      <div className="mt-2 space-y-2">
        {AGENTS.map((a, i) => (
          <motion.div
            key={a.name}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.07 }}
            className="flex items-center gap-2 rounded-lg border border-border/50 p-2"
          >
            <span
              className="flex size-6 items-center justify-center rounded-full text-[9px] font-bold text-white"
              style={{ backgroundColor: a.color }}
            >
              {a.initial}
            </span>
            <span className="min-w-0 flex-1 truncate text-[10px] font-medium text-foreground">{a.name}</span>
            <span
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-[8px] font-semibold",
                a.status === "On call" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700",
              )}
            >
              {a.status}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function SourcesPanel() {
  return (
    <div className="rounded-xl border border-border/60 bg-white p-3">
      <p className="text-[10px] font-semibold text-foreground">Calls by Source</p>
      <div className="mt-2 flex items-center gap-4">
        <Donut size="size-20 shrink-0" />
        <div className="flex-1 space-y-1.5">
          {SOURCES.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="flex items-center gap-1.5 text-[9px]"
            >
              <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="min-w-0 flex-1 truncate text-foreground">{s.label}</span>
              <span className="shrink-0 font-semibold text-muted-foreground">{s.pct}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SettingsPanel() {
  return (
    <div className="rounded-xl border border-border/60 bg-white p-3">
      <p className="text-[10px] font-semibold text-foreground">Account Settings</p>
      <div className="mt-2 space-y-2">
        {SETTINGS_ROWS.map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.07 }}
            className="flex items-center justify-between rounded-lg border border-border/50 p-2"
          >
            <span className="text-[10px] text-foreground">{row.label}</span>
            <span className={cn("relative h-4 w-7 rounded-full transition-colors", row.on ? "bg-primary" : "bg-border")}>
              <span
                className={cn(
                  "absolute top-0.5 size-3 rounded-full bg-white transition-all",
                  row.on ? "left-3.5" : "left-0.5",
                )}
              />
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const TABS = [
  { id: "analytics" as const, icon: BarChart3, label: "Analytics", panel: AnalyticsPanel },
  { id: "agents" as const, icon: Users, label: "Agents", panel: AgentsPanel },
  { id: "sources" as const, icon: PieChart, label: "Calls by source", panel: SourcesPanel },
  { id: "settings" as const, icon: Settings, label: "Settings", panel: SettingsPanel },
]

/**
 * Product-screenshot style illustration for the Analytics Dashboard feature
 * page — a browser-chrome card with real dashboard chrome (a clickable icon
 * sidebar, stat cards, an animated line chart, a donut chart, and an agent
 * table), plus a couple of small floating accent cards. Clicking a sidebar
 * icon swaps the main panel to that section's own mini dashboard.
 */
export function AnalyticsDashboardIllustration() {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("analytics")
  const ActivePanel = TABS.find((t) => t.id === active)!.panel
  const paused = useRef(false)

  // Auto-cycle through the tabs like a live demo. A manual click pauses
  // the cycle for a while so the reader's own choice sticks.
  useEffect(() => {
    const interval = setInterval(() => {
      if (paused.current) return
      setActive((current) => {
        const index = TABS.findIndex((t) => t.id === current)
        return TABS[(index + 1) % TABS.length].id
      })
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  function handleTabClick(id: (typeof TABS)[number]["id"]) {
    setActive(id)
    paused.current = true
    setTimeout(() => {
      paused.current = false
    }, 8000)
  }

  return (
    <div className="relative mx-auto w-full max-w-[560px] lg:mr-4">
      {/* ambient glow that breathes behind the card */}
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
            <span className="text-[10px] font-medium text-muted-foreground">Analytics Dashboard</span>
          </div>

          <div className="flex">
            {/* clickable icon sidebar — swaps the panel on the right */}
            <div className="hidden flex-col items-center gap-3 border-r border-border/60 px-3 py-4 sm:flex">
              {TABS.map((tab) => {
                const Icon = tab.icon
                const isActive = active === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabClick(tab.id)}
                    aria-label={tab.label}
                    aria-pressed={isActive}
                    className={cn(
                      "flex size-8 items-center justify-center rounded-lg transition-colors duration-200",
                      isActive
                        ? "bg-primary text-white shadow-[0_6px_14px_oklch(0.546_0.215_262.88/0.4)]"
                        : "text-muted-foreground/50 hover:bg-primary/10 hover:text-primary",
                    )}
                  >
                    <Icon className="size-4" aria-hidden />
                  </button>
                )
              })}
            </div>

            <div className="h-[440px] min-w-0 flex-1 overflow-hidden p-4">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <ActivePanel />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </MouseGlowCard>
      </motion.div>

      {/* floating "312 calls today" chip, top-left of the card — offset clear of the window-chrome dots */}
      <Float delay={0.15} duration={4} className="absolute -left-6 -top-8 z-20">
        <div className="flex items-center gap-2 rounded-full border border-border/70 bg-white px-3.5 py-2 shadow-[0_16px_34px_-18px_oklch(0.2_0.05_260/0.4)]">
          <PhoneCall className="size-3.5 text-primary" aria-hidden />
          <span className="text-xs font-semibold text-foreground">312 calls today</span>
        </div>
      </Float>

      {/* floating mini bar-chart card, bottom-right of the card */}
      <Float delay={0.45} duration={4.5} className="absolute -right-3 -bottom-4 z-20 hidden sm:block">
        <div className="flex h-14 w-14 items-end gap-1 rounded-2xl border border-border/70 bg-white p-2 shadow-[0_16px_34px_-18px_oklch(0.2_0.05_260/0.4)]">
          {[0.4, 0.7, 0.5, 0.9].map((h, i) => (
            <span
              key={i}
              className="w-1.5 rounded-full bg-gradient-to-t from-primary to-[oklch(0.75_0.14_262.88)]"
              style={{ height: `${h * 100}%` }}
            />
          ))}
        </div>
      </Float>

      {/* floating "busiest hour" chip, bottom-left — offset clear of the donut chart */}
      <Float delay={0.7} duration={5} className="absolute -left-10 -bottom-6 z-20 hidden sm:block">
        <div className="flex items-center gap-2 rounded-full border border-border/70 bg-white px-3.5 py-2 shadow-[0_16px_34px_-18px_oklch(0.2_0.05_260/0.4)]">
          <TrendingUp className="size-3.5 text-accent" aria-hidden />
          <span className="text-xs font-semibold text-foreground">Busiest at 6 PM</span>
        </div>
      </Float>
    </div>
  )
}
