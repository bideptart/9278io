"use client"

import { motion } from "motion/react"
import { BookOpen, Car, Stethoscope, Home } from "lucide-react"

const agents = [
  { name: "Aarav Motors", icon: Car, tone: "#2563EB", entries: "12 entries" },
  { name: "Priya Dental", icon: Stethoscope, tone: "#7C3AED", entries: "9 entries" },
  { name: "Sharma Reality", icon: Home, tone: "#D97706", entries: "15 entries" },
]

export function KnowledgeIsolationDiagram() {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-3">
      {agents.map((a, i) => {
        const Icon = a.icon
        return (
          <motion.div
            key={a.name}
            className="relative flex flex-col items-center gap-3 rounded-2xl bg-white p-6 text-center"
            style={{ border: "1px solid #E4ECFF", boxShadow: "0 20px 40px -28px rgba(15,23,42,0.3)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.45, delay: i * 0.12 }}
          >
            <span className="flex size-12 items-center justify-center rounded-full text-white" style={{ background: `linear-gradient(135deg, ${a.tone}, ${a.tone}CC)` }}>
              <Icon className="size-5" aria-hidden />
            </span>
            <p className="text-sm font-semibold" style={{ color: "#0F172A" }}>{a.name}</p>

            <span className="my-1 h-6 w-px" style={{ backgroundColor: "#E4ECFF" }} aria-hidden />

            <div className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5" style={{ backgroundColor: "#F7F9FC", border: "1px solid #E4ECFF" }}>
              <BookOpen className="size-3.5 shrink-0" style={{ color: a.tone }} aria-hidden />
              <p className="text-xs font-medium" style={{ color: "#667085" }}>Its own knowledge base</p>
            </div>
            <span className="text-[11px] font-semibold" style={{ color: a.tone }}>{a.entries}</span>
          </motion.div>
        )
      })}
    </div>
  )
}
