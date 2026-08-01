"use client"

import { motion, type Variants } from "motion/react"
import {
  AudioLines, BookOpen, GitBranch, BarChart3, ShieldCheck,
  Timer, Share2, Languages, PhoneForwarded,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

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

const VIEWPORT = { once: false, amount: 0.15, margin: "0px 0px -10% 0px" } as const

// Mobile (single column) keeps the original simple fade + scale-up stagger.
const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

// Desktop (3×3 grid): every card starts stacked behind the centre card and
// slides out to its own slot — same "emerges from the centre" technique as
// components/about/values-grid.tsx, generalised from 3 cards to 9.
const TRAVEL_X = 70
const TRAVEL_Y = 60

function cardMotion(index: number) {
  const row = Math.floor(index / 3)
  const col = index % 3
  const dx = col - 1 // -1 left, 0 centre, 1 right
  const dy = row - 1 // -1 top, 0 centre, 1 bottom
  const isCenter = dx === 0 && dy === 0
  const isDiagonal = dx !== 0 && dy !== 0
  const delay = isCenter ? 0 : isDiagonal ? 0.3 : 0.15

  return {
    initial: { opacity: 0, scale: 0.85, x: -dx * TRAVEL_X, y: -dy * TRAVEL_Y },
    whileInView: { opacity: 1, scale: 1, x: 0, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
    zIndex: isCenter ? 20 : 10,
  }
}

function BentoCard({ c }: { c: Capability }) {
  const Icon = c.icon
  return (
    <div className="h-full rounded-2xl border border-border bg-white p-7 shadow-[0_16px_34px_-24px_oklch(0.2_0.05_260/0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_50px_-20px_oklch(0.546_0.215_262.88/0.3)]">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.42_0.19_264)] text-white shadow-[0_6px_14px_-4px_oklch(0.546_0.215_262.88/0.45)]">
        <Icon className="size-5" aria-hidden />
      </span>
      <h3 className="mt-5 text-lg font-semibold tracking-tight">{c.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
    </div>
  )
}

export function FeatureBento() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3"
      >
        {capabilities.map((c) => (
          <motion.div key={c.title} variants={item} className="h-full">
            <BentoCard c={c} />
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
      {capabilities.map((c, i) => {
        const { initial, whileInView, transition, zIndex } = cardMotion(i)
        return (
          <motion.div
            key={c.title}
            className="h-full"
            style={{ zIndex }}
            initial={initial}
            whileInView={whileInView}
            viewport={VIEWPORT}
            transition={transition}
          >
            <BentoCard c={c} />
          </motion.div>
        )
      })}
    </div>
  )
}
