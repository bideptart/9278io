"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { PhoneCall, Globe, CalendarCheck, GitMerge, ShieldCheck, Zap } from "lucide-react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

const capabilities = [
  {
    icon: PhoneCall,
    stat: "24/7",
    title: "Always Answers",
    description: "Never miss a call — your agent picks up on the first ring, day or night, weekends and holidays.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: Globe,
    stat: "10+",
    title: "Indian Languages",
    description: "Hindi, Tamil, Telugu, Kannada, Marathi, Bengali and more. Auto-detects dialect and switches mid-call.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    icon: CalendarCheck,
    stat: "0 min",
    title: "Wait Time",
    description: "Route to the right team instantly. Book appointments, confirm details and send reminders — automatically.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: ShieldCheck,
    stat: "TRAI",
    title: "Fully Compliant",
    description: "DNC scrubbing, calling-window enforcement, DPDP data localisation and consent capture — pre-configured.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
]

const callSteps = [
  { label: "Incoming call", icon: PhoneCall, active: true },
  { label: "Language detected", icon: Globe, active: false },
  { label: "Intent understood", icon: Zap, active: false },
  { label: "Appointment booked", icon: CalendarCheck, active: false },
  { label: "Routed to team", icon: GitMerge, active: false },
]

function LiveCallFlow() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setActiveStep(s => (s + 1) % callSteps.length)
    }, 1400)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <motion.span
          className="h-2 w-2 rounded-full bg-emerald-500"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Live call handling</span>
      </div>
      <div className="space-y-2.5">
        {callSteps.map((step, i) => {
          const Icon = step.icon
          const isDone = i < activeStep
          const isCurrent = i === activeStep
          return (
            <motion.div
              key={i}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-300 ${
                isCurrent
                  ? "bg-primary/[0.08] border border-primary/20"
                  : isDone
                  ? "bg-emerald-50 border border-emerald-100"
                  : "border border-transparent"
              }`}
            >
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${
                isCurrent
                  ? "border-primary/25 bg-primary/[0.12] text-primary"
                  : isDone
                  ? "border-emerald-200 bg-emerald-100 text-emerald-600"
                  : "border-border bg-slate-50 text-muted-foreground/40"
              }`}>
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className={`font-medium ${
                isCurrent ? "text-primary" : isDone ? "text-emerald-700" : "text-muted-foreground/40"
              }`}>
                {step.label}
              </span>
              {isDone && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto text-emerald-500 text-xs font-bold"
                >
                  ✓
                </motion.span>
              )}
              {isCurrent && (
                <motion.span
                  className="ml-auto flex gap-0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {[0, 0.15, 0.3].map((d, j) => (
                    <motion.span
                      key={j}
                      className="h-1 w-1 rounded-full bg-primary"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: d }}
                    />
                  ))}
                </motion.span>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export function Platform() {
  return (
    <section className="border-b border-border">
      <div className="w-full px-6 py-16 md:px-8 md:py-20">

        {/* Header */}
        <ScrollReveal className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            AI Receptionist
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Answer every call like your{" "}
            <span className="text-primary">best front desk.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Greet callers, qualify requests, route to the right team, and book appointments — in 10+ Indian languages.
          </p>
        </ScrollReveal>

        {/* Two-column: capability cards + live call flow */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_360px]">

          {/* Capability cards grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon
              return (
                <ScrollReveal key={cap.title} delay={i * 0.08}>
                  <motion.div
                    className="group flex flex-col gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary/25 hover:shadow-md"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  >
                    <div className="flex items-start justify-between">
                      <span className={`flex h-10 w-10 items-center justify-center rounded-xl border ${cap.border} ${cap.bg} ${cap.color}`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className={`text-2xl font-black tracking-tight ${cap.color}`}>{cap.stat}</span>
                    </div>
                    <div>
                      <h3 className="font-bold tracking-tight text-foreground">{cap.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{cap.description}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>

          {/* Live call flow */}
          <ScrollReveal delay={0.2} className="flex flex-col gap-4">
            <LiveCallFlow />

            {/* Quick stat strip */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "<300ms", label: "Latency" },
                { value: "99.99%", label: "Uptime" },
                { value: "∞", label: "Concurrent" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-white px-3 py-3 text-center shadow-sm">
                  <p className="text-lg font-bold text-primary">{s.value}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  )
}
