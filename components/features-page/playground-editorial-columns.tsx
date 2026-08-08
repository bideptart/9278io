"use client"

import { motion } from "motion/react"
import { MessageSquareText, Sparkles, Wand2 } from "lucide-react"

// Bespoke pattern for playground-live-testing's "What you get": three quiet
// editorial columns with oversized watermark numerals, instead of another
// animated diagram — the page's hero, console typing effect, and stat band
// are already animation-heavy, so this section deliberately slows down.
const ITEMS = [
  {
    icon: MessageSquareText,
    number: "01",
    title: "Chat with your agent in a safe sandbox",
    description: "Send test messages and see exactly how your agent would respond to a real caller.",
    example: "Try: “Are you open on Sundays?”",
    tag: "No real calls affected",
    tone: "#2563EB",
  },
  {
    icon: Wand2,
    number: "02",
    title: "Tweak prompts and see results instantly",
    description: "Adjust your agent's instructions and immediately test the new behavior in the same session.",
    example: "Edit the greeting, hours, or routing rule",
    tag: "No redeploy needed",
    tone: "#0EA5E9",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Catch gaps before going live",
    description: "Find the questions your agent doesn't handle well yet, before a real customer ever asks them.",
    example: "Spot the answers that still need work — before a real customer ever hits that gap on a live call.",
    tag: "Fix it before launch",
    tone: "#10B981",
  },
]

export function PlaygroundEditorialColumns() {
  return (
    <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-3">
      {ITEMS.map((item, i) => {
        const Icon = item.icon
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px", amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            className="group relative"
          >
            <div className="flex items-start justify-between">
              <span className="relative flex size-16 items-center justify-center rounded-2xl" style={{ backgroundColor: `${item.tone}14`, color: item.tone }}>
                <Icon className="size-7" aria-hidden />
              </span>
              <span
                aria-hidden
                className="pointer-events-none select-none text-[72px] font-black leading-none"
                style={{ color: item.tone, opacity: 0.1 }}
              >
                {item.number}
              </span>
            </div>

            <h3 className="relative mt-4 text-base font-bold text-foreground">{item.title}</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>

            <p className="relative mt-3 text-sm italic text-foreground/70">{item.example}</p>

            <span
              className="relative mt-4 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold"
              style={{ backgroundColor: `${item.tone}14`, color: item.tone }}
            >
              {item.tag}
            </span>

            <span
              className="relative mt-5 block h-0.5 w-10 rounded-full transition-all duration-300 group-hover:w-20"
              style={{ backgroundColor: item.tone }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
