"use client"

import { motion } from "motion/react"
import { BookOpen, Search, FileText, ShieldCheck, HelpCircle } from "lucide-react"

const entries = [
  { icon: HelpCircle, label: "Return policy", tone: "#2563EB" },
  { icon: FileText, label: "Store hours", tone: "#7C3AED" },
  { icon: ShieldCheck, label: "Warranty terms", tone: "#D97706" },
]

export function KnowledgeBasePanel() {
  return (
    <div className="relative mx-auto flex w-full max-w-[480px] items-center justify-center py-10">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.22), transparent 70%)" }}
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative w-full max-w-[360px] overflow-hidden rounded-[24px] bg-white p-6"
        style={{ border: "1px solid #E4ECFF", boxShadow: "0 40px 80px -30px rgba(37,99,235,0.4)" }}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: "linear-gradient(90deg, #4F8DFF, #7C3AED)" }} aria-hidden />

        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: "linear-gradient(135deg, #4F8DFF, #2563EB)" }}>
            <BookOpen className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#94A3B8" }}>Knowledge base</p>
            <p className="text-lg font-bold" style={{ color: "#0F172A" }}>Aarav Motors Agent</p>
          </div>
          <span className="ml-auto rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ backgroundColor: "#EEF4FF", color: "#2563EB" }}>
            12 entries
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2" style={{ backgroundColor: "#F7F9FC", border: "1px solid #E4ECFF" }}>
          <Search className="size-3.5" style={{ color: "#94A3B8" }} aria-hidden />
          <span className="text-xs" style={{ color: "#94A3B8" }}>Search this agent's knowledge…</span>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {entries.map((e, i) => {
            const Icon = e.icon
            return (
              <motion.div
                key={e.label}
                className="flex items-center gap-3 rounded-2xl p-3"
                style={{ background: "linear-gradient(180deg, #FFFFFF, #F7F9FC)", border: "1px solid #E4ECFF", boxShadow: "0 10px 20px -14px rgba(15,23,42,0.25)" }}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg text-white" style={{ background: `linear-gradient(135deg, ${e.tone}, ${e.tone}CC)` }}>
                  <Icon className="size-4" aria-hidden />
                </span>
                <p className="text-sm font-semibold" style={{ color: "#0F172A" }}>{e.label}</p>
                <span className="ml-auto text-[11px] font-semibold" style={{ color: "#22C55E" }}>Live</span>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
