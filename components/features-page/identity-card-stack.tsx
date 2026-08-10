"use client"

import { motion } from "motion/react"
import { Type, Palette, MessageCircle } from "lucide-react"

const cards = [
  {
    icon: Type,
    title: "Name your agent",
    description: "Give it a name that matches your business — callers hear it, your team recognizes it.",
    example: "“Ava”",
    tone: "#2563EB",
    rotate: -4,
  },
  {
    icon: Palette,
    title: "Set its avatar",
    description: "Pick a look for your agent that shows up across your dashboard and reports.",
    example: "A",
    tone: "#0EA5E9",
    rotate: 0,
  },
  {
    icon: MessageCircle,
    title: "Define its introduction",
    description: "Write exactly how it greets every caller, in your own words.",
    example: "“Thanks for calling Sharma Reality…”",
    tone: "#D97706",
    rotate: 4,
  },
]

export function IdentityCardStack() {
  return (
    <div className="mx-auto mt-12 grid w-full max-w-5xl gap-8 sm:grid-cols-3">
      {cards.map((c, i) => {
        const Icon = c.icon
        return (
          <motion.div
            key={c.title}
            className="flex flex-col items-center gap-4 rounded-2xl bg-white p-9 text-center"
            style={{ border: "1px solid #E4ECFF", boxShadow: "0 20px 44px -28px rgba(15,23,42,0.28)" }}
            initial={{ opacity: 0, y: 30, rotate: c.rotate * 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: c.rotate }}
            viewport={{ once: false, margin: "-60px", amount: 0.5 }}
            whileHover={{ y: -6, rotate: 0, boxShadow: `0 28px 56px -24px ${c.tone}55` }}
            transition={{ duration: 0.45, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="flex size-14 items-center justify-center rounded-2xl"
              style={{ backgroundColor: `${c.tone}14`, color: c.tone }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
            >
              <Icon className="size-6" aria-hidden />
            </motion.span>
            <p className="text-lg font-bold" style={{ color: "#0F172A" }}>{c.title}</p>
            <p className="text-[15px] leading-relaxed" style={{ color: "#667085" }}>{c.description}</p>
            <span
              className="mt-1 rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: `${c.tone}0F`, color: c.tone }}
            >
              {c.example}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}
