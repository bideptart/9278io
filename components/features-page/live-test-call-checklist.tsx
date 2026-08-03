"use client"

import { motion } from "motion/react"
import { PhoneCall, Ear, Gauge, Route } from "lucide-react"

const CHECKS = [
  {
    icon: PhoneCall,
    title: "Dial the real number",
    description: "No sandbox mode — call the exact number your customers will dial.",
    tone: "#2563EB",
  },
  {
    icon: Ear,
    title: "Hear it exactly as callers do",
    description: "Same voice, same greeting, same hold music. Nothing is simulated.",
    tone: "#7C3AED",
  },
  {
    icon: Gauge,
    title: "Check latency & voice quality",
    description: "Notice a lag or a glitch live, before a real customer ever does.",
    tone: "#10B981",
  },
  {
    icon: Route,
    title: "Confirm routing end to end",
    description: "Make sure transfers, fallbacks, and hours behave exactly as configured.",
    tone: "#D97706",
  },
]

export function LiveTestCallChecklist() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CHECKS.map((item, i) => {
        const Icon = item.icon
        return (
          <motion.div
            key={item.title}
            className="relative overflow-hidden rounded-2xl border border-border/60 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between">
              <span
                className="flex size-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${item.tone}18` }}
              >
                <Icon className="size-5" style={{ color: item.tone }} aria-hidden />
              </span>
              <motion.span
                className="flex size-6 items-center justify-center rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.35, delay: i * 0.08 + 0.4, ease: "backOut" }}
                style={{ backgroundColor: `${item.tone}18` }}
              >
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none">
                  <motion.path
                    d="M3 8.5L6.2 11.5L13 4.5"
                    stroke={item.tone}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.3, delay: i * 0.08 + 0.5 }}
                  />
                </svg>
              </motion.span>
            </div>
            <h3 className="mt-4 text-sm font-semibold text-foreground">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </motion.div>
        )
      })}
    </div>
  )
}
