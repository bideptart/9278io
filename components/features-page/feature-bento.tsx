"use client"

import {
  AudioLines, BookOpen, GitBranch, BarChart3, ShieldCheck,
  Timer, Share2, Languages, PhoneForwarded,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { MouseGlowCard } from "@/components/animation/mouse-glow-card"
import { StaggerGroup, StaggerItem } from "@/components/animation/stagger"

type Tile = {
  icon: LucideIcon
  title: string
  description: string
  span: string
}

// Every tile below restates a real, already-shipped 9278.io capability —
// sourced from feature-groups.tsx and the Connectivity integrations list —
// nothing here is a new product claim.
const tiles: Tile[] = [
  {
    icon: AudioLines,
    title: "Voice AI",
    description: "Choose from ten named voices, each with a personality description and a preview clip.",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    icon: Share2,
    title: "CRM & Integrations",
    description: "Connects with 200+ tools Indian teams already use — Zoho CRM, HubSpot, Razorpay, Tally, and more.",
    span: "sm:col-span-2",
  },
  {
    icon: BookOpen,
    title: "Knowledge Base",
    description: "Give each agent its own set of company facts, FAQs, and policies to draw on.",
    span: "",
  },
  {
    icon: GitBranch,
    title: "Automation & Routing",
    description: "Route calls by intent, keyword, or time of day — with fallback rules for the rest.",
    span: "",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track call counts, minutes used, and average call duration in one place.",
    span: "sm:col-span-2",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Recording",
    description: "Every call recorded and transcribed, with a TRAI-compliant 9AM–9PM calling window built in.",
    span: "",
  },
  {
    icon: Timer,
    title: "Per-Second Billing",
    description: "Priced per second, not rounded up to the next minute.",
    span: "",
  },
  {
    icon: Languages,
    title: "10+ Indian Languages",
    description: "Hindi, Bengali, Tamil, Telugu, Marathi, and more — tuned for real Indian accents.",
    span: "",
  },
  {
    icon: PhoneForwarded,
    title: "Call Transfer",
    description: "Hand off any call to a human number with a custom label you set.",
    span: "",
  },
]

export function FeatureBento() {
  return (
    <StaggerGroup className="mx-auto grid max-w-5xl auto-rows-[180px] grid-cols-1 gap-4 sm:grid-cols-4">
      {tiles.map((t) => {
        const Icon = t.icon
        return (
          <StaggerItem key={t.title} className={t.span}>
            <MouseGlowCard className="flex h-full flex-col justify-between p-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.08] text-primary transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{t.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.description}</p>
              </div>
            </MouseGlowCard>
          </StaggerItem>
        )
      })}
    </StaggerGroup>
  )
}
