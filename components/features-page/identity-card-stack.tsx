"use client"

import { motion } from "motion/react"
import { Type, Palette, MessageCircle } from "lucide-react"

const cards = [
  {
    icon: Type,
    title: "Name your agent",
    description: "Give it a name that matches your business — callers hear it, your team recognizes it.",
    tone: "#2563EB",
    rotate: -4,
  },
  {
    icon: Palette,
    title: "Set its avatar",
    description: "Pick a look for your agent that shows up across your dashboard and reports.",
    tone: "#0EA5E9",
    rotate: 0,
  },
  {
    icon: MessageCircle,
    title: "Define its introduction",
    description: "Write exactly how it greets every caller, in your own words.",
    tone: "#D97706",
    rotate: 4,
  },
]

export function IdentityCardStack() {
  return (
    <div className="mx-auto mt-12 grid w-full max-w-3xl gap-6 sm:grid-cols-3">
      {cards.map((c, i) => {
        const Icon = c.icon
        return (
          <motion.div
            key={c.title}
            className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 text-center"
            style={{ border: "1px solid #E4ECFF", boxShadow: "0 20px 44px -28px rgba(15,23,42,0.28)" }}
            initial={{ opacity: 0, y: 30, rotate: c.rotate * 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: c.rotate }}
            viewport={{ once: false, margin: "-60px", amount: 0.5 }}
            whileHover={{ y: -6, rotate: 0, boxShadow: `0 28px 56px -24px ${c.tone}55` }}
            transition={{ duration: 0.45, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="flex size-12 items-center justify-center rounded-2xl" style={{ backgroundColor: `${c.tone}14`, color: c.tone }}>
              <Icon className="size-5" aria-hidden />
            </span>
            <p className="text-base font-bold" style={{ color: "#0F172A" }}>{c.title}</p>
            <p className="text-sm leading-relaxed" style={{ color: "#667085" }}>{c.description}</p>
          </motion.div>
        )
      })}
    </div>
  )
}
