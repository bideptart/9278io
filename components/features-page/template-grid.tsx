"use client"

import { motion } from "motion/react"
import { ConciergeBell, HeartPulse, Truck, Headset, FileText } from "lucide-react"

const TEMPLATES = [
  {
    icon: ConciergeBell,
    name: "Receptionist",
    description: "Greets callers, books appointments, and transfers to the right person.",
    tone: "#2563EB",
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    description: "Handles appointment booking, reminders, and basic patient intake.",
    tone: "#EF4444",
  },
  {
    icon: Truck,
    name: "Transport",
    description: "Takes bookings, shares live status, and routes dispatch calls.",
    tone: "#D97706",
  },
  {
    icon: Headset,
    name: "Support",
    description: "Raises tickets, answers FAQs, and escalates to a human when needed.",
    tone: "#7C3AED",
  },
  {
    icon: FileText,
    name: "Blank",
    description: "No preset script — start from a clean agent and build it your way.",
    tone: "#64748B",
  },
]

export function TemplateGrid() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {TEMPLATES.map((t, i) => {
        const Icon = t.icon
        return (
          <motion.div
            key={t.name}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_16px_36px_-20px_rgba(15,23,42,0.25)]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="flex size-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
              style={{ backgroundColor: `${t.tone}18` }}
            >
              <Icon className="size-5" style={{ color: t.tone }} aria-hidden />
            </span>
            <h3 className="mt-4 text-sm font-semibold text-foreground">{t.name}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.description}</p>
          </motion.div>
        )
      })}
    </div>
  )
}
