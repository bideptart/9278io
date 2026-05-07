"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Network, PhoneCall, FlaskConical, BarChart3, Database,
  CheckCircle2, Clock,
} from "lucide-react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

const CYCLE_DURATION = 5

const tabs = [
  {
    id: "multi-agent",
    icon: Network,
    title: "Multi-Agent System",
    description:
      "Architect modular call flows with specialised sub-agents — lead qualifier, scheduler, support, collections — all running in parallel.",
  },
  {
    id: "telephony",
    icon: PhoneCall,
    title: "Custom Telephony",
    description:
      "Sub-100ms latency across Jio, Airtel, BSNL, and Vi. Provision Indian DIDs and route intelligently without replacing your SIP or PBX.",
  },
  {
    id: "sandbox",
    icon: FlaskConical,
    title: "AI Sandbox for Testing",
    description:
      "Preview and test your agent safely. Compare versions, run scenario tests, and roll back any update without downtime.",
  },
  {
    id: "monitoring",
    icon: BarChart3,
    title: "Real-Time Monitoring",
    description:
      "Live visibility into every call, webhook, and API event. Debug faster and deploy with full confidence.",
  },
  {
    id: "finetuning",
    icon: Database,
    title: "Data Fine-Tuning",
    description:
      "Train smarter agents using your own past call recordings. Improve accuracy and behaviour on your specific Indian use cases.",
  },
]

/* ─── Main Section ─── */

export function Platform() {
  const [active, setActive] = useState(0)
  const [progressKey, setProgressKey] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setActive(i => (i + 1) % tabs.length)
      setProgressKey(k => k + 1)
    }, CYCLE_DURATION * 1000)
    return () => clearInterval(t)
  }, [])

  const handleTabClick = (i: number) => {
    setActive(i)
    setProgressKey(k => k + 1)
  }

  return (
    <section className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">The Control Panel</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            A self-hosted dashboard you actually own.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Voice agents, SIP routes, API keys, and analytics — all live on infrastructure you control.
            Recordings and transcripts never leave your environment.
          </p>
        </ScrollReveal>

        <div className="mt-14 flex flex-col gap-6 lg:flex-row lg:gap-0 lg:divide-x lg:divide-border">

          {/* ── Left tab list ── */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:w-[38%] lg:flex-col lg:gap-0 lg:pr-8">
            {tabs.map((tab, i) => {
              const Icon = tab.icon
              const isActive = active === i
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(i)}
                  className={`relative flex items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors duration-200 sm:px-4 lg:w-full lg:rounded-none lg:border-0 lg:border-l-2 lg:px-5 lg:py-3.5 ${
                    isActive
                      ? "border border-primary/20 bg-primary/[0.06] lg:border-l-primary lg:bg-primary/[0.04]"
                      : "border border-transparent hover:bg-card/50 lg:border-l-border lg:hover:border-l-primary/30"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200 sm:h-8 sm:w-8 ${
                      isActive
                        ? "border-primary/30 bg-primary/[0.1] text-primary"
                        : "border-border bg-card/50 text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div
                      className={`text-xs font-semibold leading-snug transition-colors duration-200 sm:text-sm ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {tab.title}
                    </div>
                    {/* Description only visible in sidebar on desktop */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="hidden overflow-hidden lg:block"
                        >
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {tab.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Progress bar */}
                  {isActive && (
                    <motion.div
                      key={progressKey}
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary/60"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: CYCLE_DURATION, ease: "linear" }}
                      style={{ transformOrigin: "left" }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* ── Right panel ── */}
          <div className="w-full lg:w-[62%] lg:pl-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden rounded-2xl border border-border bg-card/50"
              >
                {active === 0 && <MultiAgentPanel />}
                {active === 1 && <TelephonyPanel />}
                {active === 2 && <SandboxPanel />}
                {active === 3 && <MonitoringPanel />}
                {active === 4 && <FineTuningPanel />}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ─── Panel 1: Multi-Agent System ─── */

const agents = [
  { label: "Lead Qualifier", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/25", calls: 34 },
  { label: "Appointment", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/25", calls: 28 },
  { label: "Support", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/25", calls: 19 },
  { label: "Collections", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/25", calls: 12 },
]

function MultiAgentPanel() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <PanelHeader
        label="Live Agent Network"
        right={
          <LiveBadge>
            <motion.span
              key="calls"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              93 active calls
            </motion.span>
          </LiveBadge>
        }
      />

      <div className="flex items-center gap-3">
        {/* Caller + Router column */}
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-xl border border-border bg-card/50 px-4 py-2.5 text-center">
            <span className="text-xs font-semibold text-muted-foreground">📞 Caller</span>
          </div>
          {/* Animated pulse arrow */}
          <div className="relative flex h-8 w-px items-center justify-center bg-primary/30">
            <motion.div
              className="absolute h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_oklch(0.78_0.16_195/0.8)]"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="relative rounded-xl border border-primary/35 bg-primary/[0.08] px-5 py-3 text-center">
            <div className="text-xs font-bold text-primary">AI Router</div>
            <div className="text-[10px] text-primary/60">Hub</div>
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-xl border border-primary/20"
              animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Connection lines */}
        <div className="flex flex-col gap-2.5">
          {agents.map((_, i) => (
            <div key={i} className="relative h-7 w-10 overflow-hidden">
              <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 bg-primary/20" />
              <motion.div
                className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_6px_oklch(0.78_0.16_195/0.7)]"
                animate={{ left: ["-8px", "110%"] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.35, ease: "linear" }}
              />
            </div>
          ))}
        </div>

        {/* Agent nodes */}
        <div className="flex flex-1 flex-col gap-2">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.label}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 * i, type: "spring", stiffness: 280, damping: 22 }}
              className={`flex items-center justify-between rounded-lg border px-3 py-2 ${agent.bg} ${agent.border}`}
            >
              <span className={`text-xs font-semibold ${agent.color}`}>{agent.label}</span>
              <span className={`text-[10px] font-medium ${agent.color} opacity-70`}>
                {agent.calls} calls
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-1 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
        {[["93", "Active calls"], ["99.2%", "Route accuracy"], ["<200ms", "Decision time"]].map(([v, l]) => (
          <div key={l}>
            <div className="text-base font-bold text-foreground">{v}</div>
            <div className="text-[10px] text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Panel 2: Custom Telephony ─── */

const carriers = [
  { name: "Jio", latency: 88, calls: 412, bars: 5, color: "bg-blue-400" },
  { name: "Airtel", latency: 94, calls: 389, bars: 5, color: "bg-red-400" },
  { name: "BSNL", latency: 108, calls: 201, bars: 4, color: "bg-green-400" },
  { name: "Vi", latency: 101, calls: 245, bars: 4, color: "bg-purple-400" },
]

function TelephonyPanel() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <PanelHeader
        label="Carrier Status"
        right={<LiveBadge>All systems operational</LiveBadge>}
      />

      <div className="space-y-3">
        {carriers.map((carrier, i) => (
          <motion.div
            key={carrier.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i }}
            className="flex items-center gap-4 rounded-xl border border-border bg-card/50 px-4 py-3"
          >
            {/* Status dot */}
            <div className="relative flex h-3 w-3 items-center justify-center">
              <motion.div
                className="absolute h-3 w-3 rounded-full bg-green-400/30"
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
              />
              <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
            </div>

            {/* Carrier name */}
            <span className="w-12 text-sm font-bold text-foreground">{carrier.name}</span>

            {/* Signal bars */}
            <div className="flex items-end gap-0.5">
              {Array.from({ length: 5 }).map((_, b) => (
                <motion.div
                  key={b}
                  className={`w-1.5 rounded-sm ${b < carrier.bars ? carrier.color : "bg-border"}`}
                  style={{ height: `${(b + 1) * 4}px` }}
                  initial={{ scaleY: 0, originY: 1 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.1 * i + 0.05 * b, duration: 0.3 }}
                />
              ))}
            </div>

            {/* Latency */}
            <span className="ml-auto text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{carrier.latency}ms</span> avg
            </span>

            {/* Calls */}
            <span className="w-16 text-right text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{carrier.calls}</span> calls
            </span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
        {[["1,247", "Active DIDs"], ["TRAI", "Compliant"], ["<100ms", "Avg latency"]].map(([v, l]) => (
          <div key={l}>
            <div className="text-base font-bold text-foreground">{v}</div>
            <div className="text-[10px] text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Panel 3: AI Sandbox ─── */

const testScenarios = [
  { name: "Hindi greeting flow", status: "pass" },
  { name: "Appointment booking — Tamil", status: "pass" },
  { name: "EMI reminder outbound", status: "pass" },
  { name: "Transfer escalation", status: "running" },
  { name: "DND registry check", status: "pending" },
]

function SandboxPanel() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <PanelHeader
        label="AI Sandbox"
        right={
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-primary/25 bg-primary/[0.08] px-2.5 py-0.5 text-[10px] font-bold text-primary">
              v2.4 — Active
            </span>
          </div>
        }
      />

      <div className="flex gap-4">
        {/* Version list */}
        <div className="w-28 space-y-1.5">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Versions</div>
          {[
            { v: "v2.4", active: true },
            { v: "v2.3", active: false },
            { v: "v2.2", active: false },
            { v: "v2.1", active: false },
          ].map(({ v, active }) => (
            <div
              key={v}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
                active
                  ? "border-primary/30 bg-primary/[0.08] text-primary"
                  : "border-border bg-card/50 text-muted-foreground"
              }`}
            >
              {v}
            </div>
          ))}
        </div>

        {/* Test scenarios */}
        <div className="flex-1 space-y-2">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Test Scenarios</div>
          {testScenarios.map((test, i) => (
            <motion.div
              key={test.name}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.07 * i }}
              className="flex items-center gap-2.5 rounded-lg border border-border bg-card/50 px-3 py-2"
            >
              {test.status === "pass" && <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-green-400" />}
              {test.status === "running" && (
                <motion.div
                  className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-primary border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
              )}
              {test.status === "pending" && <Clock className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />}
              <span className={`text-xs ${test.status === "pending" ? "text-muted-foreground/60" : "text-muted-foreground"}`}>
                {test.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
        {[["4/5", "Tests passing"], ["0 ms", "Downtime on deploy"], ["Instant", "Rollback time"]].map(([v, l]) => (
          <div key={l}>
            <div className="text-base font-bold text-foreground">{v}</div>
            <div className="text-[10px] text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Panel 4: Real-Time Monitoring ─── */

const liveEvents = [
  { type: "Appointment booked", agent: "Agent-7", ago: "0.4s" },
  { type: "Lead qualified", agent: "Agent-3", ago: "1.8s" },
  { type: "Transfer to human", agent: "Agent-2", ago: "3.2s" },
  { type: "Call completed", agent: "Agent-9", ago: "4.7s" },
]

const miniChart = [42, 58, 51, 67, 72, 61, 78, 83, 76, 88, 82, 95]

function MonitoringPanel() {
  const [chartKey, setChartKey] = useState(0)
  const [events, setEvents] = useState(liveEvents)

  useEffect(() => {
    const t1 = setInterval(() => setChartKey(k => k + 1), 3000)
    const t2 = setInterval(() => {
      setEvents(prev => [
        { type: ["Appointment booked", "Lead qualified", "EMI reminder sent", "Call completed"][Math.floor(Math.random() * 4)], agent: `Agent-${Math.floor(Math.random() * 12) + 1}`, ago: "0.2s" },
        ...prev.slice(0, 3).map(e => ({ ...e, ago: (parseFloat(e.ago) + 1.8).toFixed(1) + "s" })),
      ])
    }, 2200)
    return () => { clearInterval(t1); clearInterval(t2) }
  }, [])

  return (
    <div className="flex flex-col gap-4 p-6">
      <PanelHeader
        label="Live Dashboard"
        right={<LiveBadge>Streaming</LiveBadge>}
      />

      {/* Top metrics */}
      <div className="grid grid-cols-3 gap-2">
        {[["127", "Active calls", "text-primary"], ["94.2%", "Success rate", "text-green-400"], ["3m 12s", "Avg duration", "text-foreground"]].map(([v, l, c]) => (
          <div key={l} className="rounded-xl border border-border bg-card/50 px-3 py-3 text-center">
            <div className={`text-xl font-bold ${c}`}>{v}</div>
            <div className="mt-0.5 text-[10px] text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>

      {/* Mini chart */}
      <div key={chartKey} className="flex items-end gap-0.5 rounded-xl border border-border bg-card/50 p-3" style={{ height: 72 }}>
        {miniChart.map((h, i) => (
          <motion.div
            key={i}
            className={`flex-1 rounded-t-sm ${h >= 80 ? "bg-primary" : h >= 60 ? "bg-primary/60" : "bg-primary/30"}`}
            style={{ height: `${h}%`, originY: 1 }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.45, delay: 0.04 * i, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Live event feed */}
      <div className="space-y-1.5">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Live Events</div>
        <AnimatePresence initial={false}>
          {events.slice(0, 3).map((ev) => (
            <motion.div
              key={`${ev.type}-${ev.ago}`}
              initial={{ opacity: 0, y: -12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-between rounded-lg border border-border bg-card/50 px-3 py-1.5"
            >
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">{ev.type}</span>
                <span className="text-[10px] text-muted-foreground/50">{ev.agent}</span>
              </div>
              <span className="text-[10px] text-muted-foreground/40">{ev.ago} ago</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─── Panel 5: Data Fine-Tuning ─── */

function FineTuningPanel() {
  const [progress, setProgress] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 300)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!started) return
    const target = 82
    const duration = 2500
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const p = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setProgress(Math.round(target * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started])

  return (
    <div className="flex flex-col gap-5 p-6">
      <PanelHeader
        label="Model Training"
        right={
          <span className="rounded-full border border-primary/25 bg-primary/[0.08] px-2.5 py-0.5 text-[10px] font-semibold text-primary">
            In Progress
          </span>
        }
      />

      {/* Dataset info */}
      <div className="grid grid-cols-2 gap-2">
        {[
          ["48,291", "Call recordings"],
          ["312h", "Total audio"],
          ["Hindi / Tamil", "Primary languages"],
          ["3 use-cases", "Appointment, EMI, Support"],
        ].map(([v, l]) => (
          <div key={l} className="rounded-xl border border-border bg-card/50 px-3 py-2.5">
            <div className="text-sm font-bold text-foreground">{v}</div>
            <div className="text-[10px] text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>

      {/* Training progress */}
      <div>
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Training progress</span>
          <span className="font-bold text-primary">{progress}%</span>
        </div>
        <div className="relative h-2.5 overflow-hidden rounded-full bg-border">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary/70 to-primary"
            style={{ width: `${progress}%` }}
          />
          <motion.div
            className="absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{ left: ["-10%", "110%"] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
          />
        </div>
        <p className="mt-1.5 text-[10px] text-muted-foreground">ETA ~14 minutes · Epoch 3 of 5</p>
      </div>

      {/* Accuracy comparison */}
      <div className="space-y-2.5">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Accuracy Improvement</div>
        {[
          { label: "Base model", pct: 74, color: "bg-muted-foreground/40" },
          { label: "Fine-tuned", pct: 91, color: "bg-primary" },
        ].map(({ label, pct, color }) => (
          <div key={label}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{label}</span>
              <span className={`font-semibold ${color === "bg-primary" ? "text-primary" : "text-muted-foreground"}`}>
                {pct}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-border">
              <motion.div
                className={`h-full rounded-full ${color}`}
                initial={{ width: "0%" }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1.2, delay: 0.3 + (color === "bg-primary" ? 0.3 : 0), ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Shared sub-components ─── */

function PanelHeader({ label, right }: { label: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
      {right}
    </div>
  )
}

function LiveBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[0.07] px-2.5 py-0.5 text-[10px] font-semibold text-primary">
      <motion.span
        className="h-1.5 w-1.5 rounded-full bg-primary"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      {children}
    </span>
  )
}
