"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Search, HelpCircle, ShieldCheck, Building2, Bot } from "lucide-react"

const CYCLE_MS = 3200

const queries = [
  { q: "Are you open on Sundays?", a: "Yes — 10 AM to 6 PM, every Sunday.", icon: HelpCircle, tone: "#2563EB" },
  { q: "What's your refund policy?", a: "Full refund within 7 days of purchase, with receipt.", icon: ShieldCheck, tone: "#7C3AED" },
  { q: "Where are your branches?", a: "Andheri, Powai, and Thane.", icon: Building2, tone: "#D97706" },
]

export function KnowledgeSearchDemo() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % queries.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  const active = queries[index]
  const Icon = active.icon

  return (
    <div className="relative mx-auto mt-10 max-w-4xl">
      <div className="rounded-3xl bg-white p-8 md:p-10" style={{ border: "1px solid #E4ECFF", boxShadow: "0 30px 60px -30px rgba(37,99,235,0.35)" }}>
        <div className="flex items-center gap-2 rounded-xl px-5 py-4" style={{ backgroundColor: "#F7F9FC", border: "1px solid #E4ECFF" }}>
          <Search className="size-4 shrink-0" style={{ color: "#94A3B8" }} aria-hidden />
          <AnimatePresence mode="wait">
            <motion.p
              key={active.q}
              className="truncate text-base font-medium"
              style={{ color: "#0F172A" }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              "{active.q}"
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full text-white" style={{ background: "linear-gradient(135deg, #4F8DFF, #2563EB)" }}>
            <Bot className="size-5" aria-hidden />
          </span>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.a}
              className="min-w-0 flex-1 rounded-2xl rounded-tl-sm p-5"
              style={{ backgroundColor: "#EEF4FF", border: "1px solid #BBD1FF" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-base" style={{ color: "#0F172A" }}>{active.a}</p>
              <span
                className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
                style={{ backgroundColor: "#FFFFFF", color: active.tone }}
              >
                <Icon className="size-3.5" aria-hidden />
                Matched from knowledge base
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-7 flex justify-center gap-1.5" aria-hidden>
          {queries.map((qq, i) => (
            <span
              key={qq.q}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{ width: i === index ? "20px" : "8px", backgroundColor: i === index ? "#2563EB" : "#E4ECFF" }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
