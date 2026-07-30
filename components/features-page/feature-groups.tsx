"use client"

import { useEffect, useRef, useState } from "react"
import {
  Bot, AudioLines, SlidersHorizontal, BookOpen, Copy, GitBranch,
  FlaskConical, BarChart3, History, PhoneForwarded, BellRing,
  LifeBuoy, Mic, Settings, LayoutDashboard, Fingerprint,
  PhoneCall, LayoutTemplate, ChevronDown, Check,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

type Feature = { icon: LucideIcon; title: string; description: string; details: string[] }
type Group = { id: string; heading: string; blurb: string; features: Feature[] }

const featureGroups: Group[] = [
  {
    id: "build-setup",
    heading: "Build & Setup",
    blurb: "Spin up agents and give each one a voice and a personality.",
    features: [
      {
        icon: Bot,
        title: "Multi-Agent Management",
        description: "Create and manage as many AI agents as you need from a single account.",
        details: [
          "One dashboard for every agent you run",
          "Clone an existing agent to start a new one fast",
          "Assign a different number to each agent",
        ],
      },
      {
        icon: AudioLines,
        title: "Voice Selection",
        description: "Choose from ten named voices, each with a personality description and a preview clip.",
        details: [
          "Preview every voice before you assign it",
          "Match the voice tone to your brand",
          "Switch a voice anytime without rebuilding the agent",
        ],
      },
      {
        icon: SlidersHorizontal,
        title: "Call Behavior Controls",
        description: "Set how your agent greets callers, handles interruptions, and hands off conversations.",
        details: [
          "Set a custom greeting per agent",
          "Choose how interruptions are handled",
          "Define exactly when to transfer to a human",
        ],
      },
    ],
  },
  {
    id: "train-configure",
    heading: "Train & Configure",
    blurb: "Teach each agent your business and route calls the way you want.",
    features: [
      {
        icon: BookOpen,
        title: "Knowledge Base (per agent)",
        description: "Give each agent its own set of company facts, FAQs, and policies to draw on.",
        details: [
          "Add FAQs, policies, and business facts",
          "Update answers anytime — no re-training",
          "Each agent answers only from its own knowledge",
        ],
      },
      {
        icon: Copy,
        title: "Reusable Knowledge Templates",
        description: "Save a knowledge setup once and reuse it across multiple agents or numbers.",
        details: [
          "Build once, apply to many agents",
          "Keep answers consistent across numbers",
          "Edit the template to update everywhere",
        ],
      },
      {
        icon: GitBranch,
        title: "Behavior & Routing Rules",
        description: "Decide how calls get classified and routed by intent, keyword, or time of day.",
        details: [
          "Route by caller intent or keyword",
          "Handle calls differently by time of day",
          "Fallback rules for unmatched calls",
        ],
      },
    ],
  },
  {
    id: "test-go-live",
    heading: "Test & Go Live",
    blurb: "Hear your agent before real callers do, then launch in minutes.",
    features: [
      {
        icon: FlaskConical,
        title: "Playground / Live Testing",
        description: "Test your agent's responses in a live sandbox before it ever answers a real call.",
        details: [
          "Chat with your agent in a safe sandbox",
          "Tweak prompts and see results instantly",
          "Catch gaps before going live",
        ],
      },
      {
        icon: PhoneCall,
        title: "Live Test Call (Real Number Dial-In)",
        description: "Dial your agent's real number and hear exactly what your callers hear, live.",
        details: [
          "Dial the real number and hear it live",
          "Verify voice, latency, and answers",
          "Confirm routing works end to end",
        ],
      },
      {
        icon: LayoutTemplate,
        title: "Ready-Made Setup Templates",
        description: "Start from Receptionist, Healthcare, Transport, Support, or Blank. Launch in minutes.",
        details: [
          "Start from a proven setup",
          "Receptionist, Healthcare, Transport, Support, or Blank",
          "Customize everything after launching",
        ],
      },
    ],
  },
  {
    id: "operate-monitor",
    heading: "Operate & Monitor",
    blurb: "Watch every call, booking, and hand-off from one dashboard.",
    features: [
      {
        icon: BarChart3,
        title: "Analytics Dashboard",
        description: "Track call counts, minutes used, and average call duration in one place.",
        details: [
          "Call volume, minutes, and durations",
          "Spot your busy hours at a glance",
          "Track usage against your plan",
        ],
      },
      {
        icon: History,
        title: "Booking History",
        description: "See every appointment your agent has booked, in one searchable list.",
        details: [
          "Every appointment in one searchable list",
          "Filter by date or by agent",
          "Export whenever you need it",
        ],
      },
      {
        icon: PhoneForwarded,
        title: "Call Transfer Tool",
        description: "Hand off any call to a human number with a custom label you set.",
        details: [
          "Forward any call to a human number",
          "Add a custom label per transfer",
          "Set fallback numbers for busy lines",
        ],
      },
      {
        icon: BellRing,
        title: "Booking Notifications",
        description: "Get an email the moment your agent books a meeting or appointment.",
        details: [
          "Instant email on every booking",
          "Never miss a new appointment",
          "Sent the moment it's confirmed",
        ],
      },
      {
        icon: LifeBuoy,
        title: "Support Tickets System",
        description: "Raise and track support requests directly from your dashboard.",
        details: [
          "Raise requests from your dashboard",
          "Track status in one place",
          "Full history kept for reference",
        ],
      },
      {
        icon: Mic,
        title: "Call Reports (Recordings / Transcripts)",
        description: "Every call is recorded and transcribed, with playback and download built in.",
        details: [
          "Recording + transcript for every call",
          "Play back or download anytime",
          "Review exactly what was said",
        ],
      },
    ],
  },
  {
    id: "account-overview",
    heading: "Account & Overview",
    blurb: "Manage billing, team access, and your agent's identity.",
    features: [
      {
        icon: Settings,
        title: "Account Settings",
        description: "Manage billing, team access, and account details in one place.",
        details: [
          "Manage billing and invoices",
          "Add or remove team access",
          "Update account details anytime",
        ],
      },
      {
        icon: LayoutDashboard,
        title: "Dashboard Overview",
        description: "See your account's activity at a glance the moment you log in.",
        details: [
          "Key activity the moment you log in",
          "Quick links to what matters most",
          "Account health at a glance",
        ],
      },
      {
        icon: Fingerprint,
        title: "Agent Identity Setup",
        description: "Name your agent, set its avatar, and define how it introduces itself.",
        details: [
          "Name your agent and set its avatar",
          "Define how it introduces itself",
          "Keep branding consistent across calls",
        ],
      },
    ],
  },
]

export function FeatureGroups() {
  const [active, setActive] = useState(featureGroups[0].id)
  const [open, setOpen] = useState<string | null>(null)
  const refs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    )
    for (const el of Object.values(refs.current)) {
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  const jump = (id: string) => {
    refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="mx-auto mt-12 grid max-w-5xl gap-10 lg:grid-cols-[290px_1fr] lg:gap-14">
      {/* Left: sticky group nav (lg+) */}
      <nav aria-label="Feature groups" className="hidden lg:block">
        <div className="sticky top-24 space-y-1">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Explore
          </p>
          {featureGroups.map((g, i) => {
            const on = active === g.id
            return (
              <div className={cn("rounded-2xl transition-colors duration-300", on && "glass-panel shadow-[0_10px_30px_-18px_oklch(0.546_0.215_262.88/0.35)]")} key={g.id}>
                <button
                  type="button"
                  onClick={() => jump(g.id)}
                  aria-current={on ? "true" : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-base font-semibold transition-colors",
                    on ? "text-primary" : "text-muted-foreground hover:bg-primary/[0.05] hover:text-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-lg border text-sm font-bold transition-all duration-300",
                      on ? "border-primary bg-gradient-to-br from-primary to-[oklch(0.45_0.19_264)] text-white shadow-[0_4px_14px_oklch(0.546_0.215_262.88/0.45)]" : "border-border text-muted-foreground",
                    )}
                  >
                    {i + 1}
                  </span>
                  {g.heading}
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-3 pb-3 pl-[52px] text-sm leading-relaxed text-primary/80">{g.blurb}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </nav>

      {/* Right: grouped, expandable feature lists */}
      <div className="space-y-12">
        {featureGroups.map((g) => (
          <section
            key={g.id}
            id={g.id}
            ref={(el) => {
              refs.current[g.id] = el
            }}
            className="scroll-mt-24"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">{g.heading}</h3>
              <span className="shrink-0 text-xs font-medium text-muted-foreground">
                {g.features.length} {g.features.length === 1 ? "feature" : "features"}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{g.blurb}</p>

            <div className="glass-panel mt-4 divide-y divide-border/60 overflow-hidden rounded-[1.75rem] shadow-[0_20px_48px_-32px_oklch(0.13_0.025_255/0.35)] transition-shadow hover:shadow-[0_28px_60px_-32px_oklch(0.13_0.025_255/0.45)]">
              {g.features.map((f) => {
                const Icon = f.icon
                const isOpen = open === f.title
                return (
                  <div key={f.title} className={cn("group transition-colors", isOpen && "bg-primary/[0.04]")}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : f.title)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start gap-3.5 p-4 text-left transition-colors hover:bg-primary/[0.03]"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/[0.08] text-primary transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-semibold text-foreground">{f.title}</h4>
                          <ChevronDown
                            className={cn(
                              "size-4 shrink-0 text-muted-foreground transition-transform duration-300",
                              isOpen && "rotate-180 text-primary",
                            )}
                            aria-hidden
                          />
                        </div>
                        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <ul className="space-y-2 px-4 pb-4 pl-[66px]">
                            {f.details.map((d) => (
                              <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <Check className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
