"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { HelpCircle, ShieldCheck, Building2, Sparkles } from "lucide-react"

const CYCLE_MS = 3200

const entries = [
  { q: "Are you open on Sundays?", a: "Yes — 10 AM to 6 PM, every Sunday.", icon: HelpCircle, tone: "#2563EB", confidence: 98 },
  { q: "What's your refund policy?", a: "Full refund within 7 days of purchase, with receipt.", icon: ShieldCheck, tone: "#7C3AED", confidence: 96 },
  { q: "Where are your branches?", a: "Andheri, Powai, and Thane.", icon: Building2, tone: "#D97706", confidence: 99 },
]

export function KnowledgeIndexLookup() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % entries.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  const active = entries[index]
  const Icon = active.icon

  return (
    <div className="relative mx-auto mt-10 w-full overflow-hidden rounded-3xl bg-white" style={{ border: "1px solid #E4ECFF", boxShadow: "0 30px 60px -30px rgba(37,99,235,0.35)" }}>
      <div className="grid md:grid-cols-[240px_1fr]">
        {/* left — the knowledge index, one row per entry */}
        <div className="flex flex-col gap-2 border-b p-5 md:justify-center md:border-b-0 md:border-r md:p-6" style={{ borderColor: "#E4ECFF" }}>
          {entries.map((e, i) => {
            const isActive = i === index
            const RowIcon = e.icon
            return (
              <button
                key={e.q}
                type="button"
                onClick={() => setIndex(i)}
                className="relative flex items-center gap-2.5 overflow-hidden rounded-xl px-3 py-3 text-left transition-colors"
                style={{ backgroundColor: isActive ? "#EEF4FF" : "transparent" }}
              >
                {isActive && (
                  <motion.span
                    layoutId="index-lookup-accent"
                    className="absolute inset-y-0 left-0 w-1"
                    style={{ backgroundColor: e.tone }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <RowIcon className="size-4 shrink-0" style={{ color: isActive ? e.tone : "#94A3B8" }} aria-hidden />
                <span className="min-w-0 flex-1 truncate text-xs font-medium md:text-sm" style={{ color: isActive ? "#0F172A" : "#64748B" }}>
                  {e.q}
                </span>
              </button>
            )
          })}
        </div>

        {/* right — matched answer + a live confidence meter (not used anywhere else on the site) */}
        <div className="flex flex-col justify-center p-5 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.q}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="size-3.5" style={{ color: active.tone }} aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: active.tone }}>
                  Matched instantly
                </p>
              </div>
              <p className="mt-3 text-lg font-semibold" style={{ color: "#0F172A" }}>
                "{active.q}"
              </p>
              <div className="mt-3 flex items-start gap-3 rounded-2xl p-4" style={{ backgroundColor: "#F7F9FC", border: "1px solid #E4ECFF" }}>
                <Icon className="mt-0.5 size-4 shrink-0" style={{ color: active.tone }} aria-hidden />
                <p className="min-w-0 flex-1 text-sm leading-relaxed" style={{ color: "#334155" }}>{active.a}</p>
              </div>

              {/* confidence meter — fills to the entry's match score each cycle */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs font-medium" style={{ color: "#94A3B8" }}>
                  <span>Confidence</span>
                  <span style={{ color: active.tone }}>{active.confidence}%</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: "#E4ECFF" }}>
                  <motion.div
                    key={active.q + "-bar"}
                    className="h-full rounded-full"
                    style={{ backgroundColor: active.tone }}
                    initial={{ width: 0 }}
                    animate={{ width: `${active.confidence}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
