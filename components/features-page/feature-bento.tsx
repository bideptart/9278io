"use client"

import { motion } from "motion/react"
import {
  AudioLines, BookOpen, GitBranch, BarChart3, ShieldCheck,
  Timer, Share2, Languages, PhoneForwarded,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

type Capability = {
  icon: LucideIcon
  title: string
  description: string
}

// Every capability below restates a real, already-shipped 9278.io feature —
// sourced from feature-groups.tsx and the Connectivity integrations list —
// nothing here is a new product claim.
const capabilities: Capability[] = [
  {
    icon: AudioLines,
    title: "Voice AI",
    description: "Choose from ten named voices, each with a personality description and a preview clip.",
  },
  {
    icon: Share2,
    title: "CRM & Integrations",
    description: "Connects with 200+ tools Indian teams already use — Zoho CRM, HubSpot, Razorpay, Tally, and more.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Base",
    description: "Give each agent its own set of company facts, FAQs, and policies to draw on.",
  },
  {
    icon: GitBranch,
    title: "Automation & Routing",
    description: "Route calls by intent, keyword, or time of day — with fallback rules for the rest.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track call counts, minutes used, and average call duration in one place.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Recording",
    description: "Every call recorded and transcribed, with a TRAI-compliant 9AM–9PM calling window built in.",
  },
  {
    icon: Timer,
    title: "Per-Second Billing",
    description: "Priced per second, not rounded up to the next minute.",
  },
  {
    icon: Languages,
    title: "10+ Indian Languages",
    description: "Hindi, Bengali, Tamil, Telugu, Marathi, and more — tuned for real Indian accents.",
  },
  {
    icon: PhoneForwarded,
    title: "Call Transfer",
    description: "Hand off any call to a human number with a custom label you set.",
  },
]

const CENTER = 4 // "Analytics Dashboard" sits in the middle of the 3x3 grid

export function FeatureBento() {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
      {capabilities.map((c, i) => {
        const Icon = c.icon
        const isCenter = i === CENTER
        const row = Math.floor(i / 3)
        const col = i % 3
        // Percent offset (relative to the card's own size) from this card's grid slot back to the center slot.
        const dx = isCenter ? 0 : (1 - col) * 100
        const dy = isCenter ? 0 : (1 - row) * 100
        // Reveal order radiates outward from the center card, one at a time.
        const order = isCenter ? 0 : i < CENTER ? i + 1 : i
        return (
          <motion.div
            key={c.title}
            className="h-full"
            style={{ zIndex: isCenter ? 20 : 10 }}
            initial={{ opacity: 0, scale: isCenter ? 0.85 : 0.3, x: `${dx}%`, y: `${dy}%` }}
            whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, delay: order * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-full rounded-2xl border border-border bg-white p-7 shadow-[0_16px_34px_-24px_oklch(0.2_0.05_260/0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_50px_-20px_oklch(0.546_0.215_262.88/0.3)]">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.42_0.19_264)] text-white shadow-[0_6px_14px_-4px_oklch(0.546_0.215_262.88/0.45)]">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
