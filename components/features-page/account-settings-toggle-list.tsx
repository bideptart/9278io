"use client"

import { motion } from "motion/react"
import { CreditCard, Users, ShieldCheck, Zap } from "lucide-react"

const items = [
  {
    icon: CreditCard,
    title: "Billing & invoices",
    description: "Top up credit, switch plans, and download GST invoices anytime.",
    tone: "#2563EB",
  },
  {
    icon: Users,
    title: "Team access",
    description: "Invite teammates and set who can edit agents, billing, or both.",
    tone: "#7C3AED",
  },
  {
    icon: ShieldCheck,
    title: "Account security",
    description: "Change your business info, security settings, and login preferences.",
    tone: "#10B981",
  },
  {
    icon: Zap,
    title: "Applies instantly",
    description: "Every change goes live right away — no waiting, no support tickets.",
    tone: "#D97706",
  },
]

// duplicated once so the strip can loop seamlessly at -50%
const marqueeItems = [...items, ...items]

// duration of a single card's own flip (front -> back -> front); cards take
// turns one at a time as the strip scrolls, so each of the (duplicated) tiles
// gets its own unique slot — reusing slots per original item would make both
// copies flip together, which is exactly what we don't want
const FLIP_S = 1.3
const TOTAL_SLOTS = marqueeItems.length

function Card({ item, i }: { item: (typeof items)[number]; i: number }) {
  const Icon = item.icon
  const slot = i
  return (
    <div className="aspect-square w-56 shrink-0" style={{ perspective: 1000 }}>
      <motion.div
        className="relative size-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: [0, 0, 180, 180, 360] }}
        transition={{
          duration: FLIP_S,
          repeat: Infinity,
          repeatDelay: (TOTAL_SLOTS - 1) * FLIP_S,
          ease: "easeInOut",
          times: [0, 0.1, 0.5, 0.9, 1],
          delay: slot * FLIP_S,
        }}
      >
        {/* front — icon + title */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl p-6 text-center"
          style={{
            backfaceVisibility: "hidden",
            background: `linear-gradient(150deg, ${item.tone}, ${item.tone}CC)`,
            boxShadow: `0 24px 48px -24px ${item.tone}70`,
          }}
        >
          <span className="flex size-14 items-center justify-center rounded-2xl bg-white/15">
            <Icon className="size-7 text-white" aria-hidden />
          </span>
          <p className="text-lg font-bold text-white">{item.title}</p>
          <span className="text-xs font-medium text-white/70">Flips over automatically</span>
        </div>

        {/* back — description */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-3xl bg-white p-6 text-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            border: `1.5px solid ${item.tone}30`,
            boxShadow: "0 20px 44px -28px rgba(15,23,42,0.22)",
          }}
        >
          <span className="flex size-9 items-center justify-center rounded-xl" style={{ backgroundColor: `${item.tone}14`, color: item.tone }}>
            <Icon className="size-4" aria-hidden />
          </span>
          <p className="text-sm font-bold" style={{ color: "#0F172A" }}>{item.title}</p>
          <p className="text-sm leading-relaxed" style={{ color: "#667085" }}>{item.description}</p>
        </div>
      </motion.div>
    </div>
  )
}

export function AccountSettingsToggleList() {
  return (
    <div className="relative mx-auto mt-12 w-full max-w-3xl overflow-hidden">
      {/* fade masks so cards don't hard-cut at the edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" aria-hidden />

      {/* pure CSS keyframe animation for the scroll — GPU-composited, so it
          keeps running smoothly no matter how much JS (the card flips) is
          happening at the same time, unlike a JS-driven framer loop which
          can visibly stutter/jump when it competes for the same frame */}
      <style>{`
        @keyframes account-settings-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div className="flex w-max gap-6" style={{ animation: "account-settings-marquee 5s linear infinite" }}>
        {marqueeItems.map((item, i) => (
          <Card key={`${item.title}-${i}`} item={item} i={i} />
        ))}
      </div>
    </div>
  )
}
