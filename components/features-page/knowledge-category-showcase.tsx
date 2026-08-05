"use client"

import { motion } from "motion/react"
import { HelpCircle, ShieldCheck, Building2 } from "lucide-react"

const categories = [
  {
    icon: HelpCircle,
    tone: "#2563EB",
    label: "FAQs",
    title: "Answer the questions callers actually ask",
    q: "Are you open on Sundays?",
    a: "Yes — 10 AM to 6 PM, every Sunday.",
  },
  {
    icon: ShieldCheck,
    tone: "#7C3AED",
    label: "Policies",
    title: "Keep the fine print consistent, every call",
    q: "What's your refund policy?",
    a: "Full refund within 7 days of purchase, with receipt.",
  },
  {
    icon: Building2,
    tone: "#D97706",
    label: "Business facts",
    title: "Ground the agent in real details about you",
    q: "Where are your branches?",
    a: "Andheri, Powai, and Thane.",
  },
]

export function KnowledgeCategoryShowcase() {
  return (
    <div className="mt-10 flex flex-col gap-6">
      {categories.map((c, i) => {
        const Icon = c.icon
        const reversed = i % 2 === 1
        return (
          <motion.div
            key={c.label}
            className={`flex flex-col items-center gap-6 rounded-3xl p-6 sm:flex-row md:p-8 ${reversed ? "sm:flex-row-reverse" : ""}`}
            style={{ backgroundColor: "#F7F9FC", border: "1px solid #E4ECFF" }}
            initial={{ opacity: 0, x: reversed ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.4, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex shrink-0 flex-col items-center gap-2 text-center sm:w-40">
              <span
                className="flex size-14 items-center justify-center rounded-2xl text-white"
                style={{ background: `linear-gradient(135deg, ${c.tone}, ${c.tone}CC)`, boxShadow: `0 14px 28px -12px ${c.tone}80` }}
              >
                <Icon className="size-6" aria-hidden />
              </span>
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: c.tone }}>{c.label}</p>
            </div>

            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="text-lg font-semibold tracking-tight" style={{ color: "#0F172A" }}>{c.title}</p>
              <div className="mx-auto mt-3 max-w-md rounded-2xl bg-white p-4 sm:mx-0" style={{ border: "1px solid #E4ECFF" }}>
                <p className="text-sm font-medium" style={{ color: "#0F172A" }}>"{c.q}"</p>
                <p className="mt-1.5 text-sm" style={{ color: "#667085" }}>→ {c.a}</p>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
