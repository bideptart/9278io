"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { PhoneCall, Globe, Clock, ShieldCheck, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

const highlights = [
  {
    icon: PhoneCall,
    color: "text-blue-600 bg-blue-50 border-blue-100",
    stat: "24/7",
    statColor: "text-blue-600",
    title: "Always Answers",
    desc: "Picks up on the first ring — day, night, weekends and public holidays.",
  },
  {
    icon: Globe,
    color: "text-violet-600 bg-violet-50 border-violet-100",
    stat: "10+",
    statColor: "text-violet-600",
    title: "Indian Languages",
    desc: "Hindi, Tamil, Telugu, Kannada, Marathi, Bengali and more. Auto-detects mid-call.",
  },
  {
    icon: Clock,
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    stat: "0s",
    statColor: "text-emerald-600",
    title: "Wait Time",
    desc: "Qualify, route and book appointments instantly — no hold music, no queue.",
  },
  {
    icon: ShieldCheck,
    color: "text-orange-600 bg-orange-50 border-orange-100",
    stat: "TRAI",
    statColor: "text-orange-600",
    title: "Fully Compliant",
    desc: "DNC scrubbing, calling windows, DPDP localisation — pre-configured for India.",
  },
]

const callSteps = [
  { icon: PhoneCall,  label: "Incoming call",      color: "text-blue-600 bg-blue-50 border-blue-200",    done: "bg-emerald-50 border-emerald-200 text-emerald-700" },
  { icon: Globe,      label: "Language detected",  color: "text-violet-600 bg-violet-50 border-violet-200", done: "bg-emerald-50 border-emerald-200 text-emerald-700" },
  { icon: ShieldCheck,label: "Intent understood",  color: "text-primary bg-primary/10 border-primary/25",   done: "bg-emerald-50 border-emerald-200 text-emerald-700" },
  { icon: Clock,      label: "Appointment booked", color: "text-emerald-600 bg-emerald-50 border-emerald-200", done: "bg-emerald-50 border-emerald-200 text-emerald-700" },
  { icon: PhoneCall,  label: "Routed to team",     color: "text-orange-600 bg-orange-50 border-orange-200",   done: "bg-emerald-50 border-emerald-200 text-emerald-700" },
]

const transcript = [
  { speaker: "Agent",  text: "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?", delay: 0.3 },
  { speaker: "Caller", text: "I need to book an appointment please.", delay: 1.2 },
  { speaker: "Agent",  text: "Sure! Morning or evening works better?", delay: 2.1 },
  { speaker: "Caller", text: "Morning, around 10 AM.", delay: 3.0 },
]

function LiveCallPanel() {
  const [step, setStep] = useState(0)
  const [tKey, setTKey] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % callSteps.length), 1500)
    return () => clearInterval(t)
  }, [])
  useEffect(() => {
    const t = setInterval(() => { setTKey(k => k + 1); setStep(0) }, 10000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="rounded-2xl border-[3px] border-border bg-white shadow-[0_8px_40px_oklch(0_0_0/0.08)] overflow-hidden">
      {/* Call header */}
      <div className="flex items-center justify-between border-b border-border bg-slate-50 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white shadow-sm">
            <PhoneCall className="h-4 w-4 text-primary" />
            <motion.span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500"
              animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">+91 98765 43210</p>
            <p className="text-[10px] text-muted-foreground">Hindi · Inbound</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
          <motion.span className="h-1.5 w-1.5 rounded-full bg-emerald-500" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
          Live
        </span>
      </div>

      {/* Transcript */}
      <div key={tKey} className="space-y-2.5 px-5 py-4">
        {transcript.map((line, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: line.delay }}
            className={`flex text-xs ${line.speaker === "Agent" ? "justify-start" : "justify-end"}`}
          >
            {line.speaker === "Agent" ? (
              <span className="max-w-[80%] rounded-xl rounded-tl-sm bg-primary/[0.1] px-3 py-2 text-primary">
                <span className="mr-1 text-[9px] font-bold opacity-50">Agent</span>{line.text}
              </span>
            ) : (
              <span className="max-w-[80%] rounded-xl rounded-tr-sm bg-slate-100 px-3 py-2 text-slate-700">
                <span className="mr-1 text-[9px] font-bold opacity-40">Caller</span>{line.text}
              </span>
            )}
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, delay: 4, times: [0, 0.1, 0.8, 1] }}
          className="flex justify-start"
        >
          <span className="inline-flex items-center gap-1 rounded-xl rounded-tl-sm bg-primary/[0.08] px-3 py-2">
            {[0, 0.12, 0.24].map((d, i) => (
              <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-primary/60"
                animate={{ y: [0, -3, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: d }} />
            ))}
          </span>
        </motion.div>
      </div>

      {/* Step pipeline */}
      <div className="border-t border-border px-5 py-4">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Call pipeline</p>
        <div className="space-y-1.5">
          {callSteps.map((s, i) => {
            const Icon = s.icon
            const isDone = i < step
            const isCurrent = i === step
            return (
              <div key={i} className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-all duration-300 ${
                isCurrent ? "border border-primary/20 bg-primary/[0.06]" :
                isDone ? "border border-emerald-100 bg-emerald-50/60" :
                "opacity-35"
              }`}>
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${
                  isCurrent ? "bg-primary/15 text-primary" :
                  isDone ? "bg-emerald-100 text-emerald-600" :
                  "bg-slate-100 text-slate-400"
                }`}>
                  <Icon className="h-3 w-3" />
                </span>
                <span className={isCurrent ? "font-medium text-primary" : isDone ? "text-emerald-700" : "text-muted-foreground"}>
                  {s.label}
                </span>
                {isDone && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto text-emerald-500 text-[10px]">✓</motion.span>}
                {isCurrent && (
                  <span className="ml-auto flex gap-0.5">
                    {[0, 0.1, 0.2].map((d, j) => (
                      <motion.span key={j} className="h-1 w-1 rounded-full bg-primary"
                        animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.7, repeat: Infinity, delay: d }} />
                    ))}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function Platform() {
  return (
    <section className="border-b border-border">
      <div className="w-full px-6 py-16 md:px-8 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Left: content ── */}
          <ScrollReveal>
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary"
            >
              <motion.span className="h-1.5 w-1.5 rounded-full bg-primary"
                animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
              AI Receptionist
            </motion.span>

            <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Answer every call like your{" "}
              <span className="text-primary">best front desk.</span>
            </h2>
            <p className="mt-4 max-w-lg text-pretty leading-relaxed text-muted-foreground">
              Greet callers, qualify requests, route to the right team, and book appointments — in 10+ Indian languages, around the clock.
            </p>

            {/* Feature list — no cards, clean rows */}
            <div className="mt-8 space-y-5">
              {highlights.map((h) => {
                const Icon = h.icon
                return (
                  <div key={h.title} className="flex items-start gap-4">
                    <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${h.color}`}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className={`text-sm font-bold ${h.statColor}`}>{h.stat}</span>
                        <span className="font-semibold text-foreground">{h.title}</span>
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">{h.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <Button asChild className="mt-8 rounded-xl bg-primary px-6 text-white shadow-[0_4px_16px_oklch(0.52_0.22_265/0.3)] hover:bg-primary/90">
              <Link href="/get-started">
                Get started free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>

          {/* ── Right: live call panel ── */}
          <ScrollReveal delay={0.2}>
            <LiveCallPanel />
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}
