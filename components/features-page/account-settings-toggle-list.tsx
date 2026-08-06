"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { CreditCard, Users, ShieldCheck, Zap, Palette, Gauge, ChevronRight } from "lucide-react"

const items = [
  {
    icon: CreditCard,
    title: "Billing & invoices",
    description: "Top up credit, switch plans, and download GST invoices anytime.",
    stat: "₹4,200 due",
    tone: "#2563EB",
  },
  {
    icon: Users,
    title: "Team access",
    description: "Invite teammates and set who can edit agents, billing, or both.",
    stat: "3 members",
    tone: "#7C3AED",
  },
  {
    icon: ShieldCheck,
    title: "Account security",
    description: "Change your business info, security settings, and login preferences.",
    stat: "2FA on",
    tone: "#10B981",
  },
  {
    icon: Zap,
    title: "Applies instantly",
    description: "Every change goes live right away — no waiting, no support tickets.",
    stat: "Live",
    tone: "#D97706",
  },
  {
    icon: Palette,
    title: "Custom branding",
    description: "Set your business name, logo, and greeting across every agent.",
    stat: "3 agents",
    tone: "#DB2777",
  },
  {
    icon: Gauge,
    title: "Usage & limits",
    description: "See minutes used, plan limits, and upgrade before you hit them.",
    stat: "62% used",
    tone: "#0891B2",
  },
]

const CYCLE_MS = 2400

export function AccountSettingsToggleList() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % items.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [paused])

  return (
    <div
      className="mx-auto mt-12 grid w-full max-w-4xl grid-cols-1 items-start gap-4 sm:grid-cols-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {items.map((item, i) => {
        const Icon = item.icon
        const isOpen = active === i
        return (
          <div
            key={item.title}
            className="relative overflow-hidden rounded-2xl border border-border/60 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
          >
            {/* colored bar that slides in on the active card */}
            <motion.span
              className="absolute inset-y-0 left-0 w-1"
              animate={{ backgroundColor: isOpen ? item.tone : "transparent" }}
              transition={{ duration: 0.3 }}
              aria-hidden
            />

            <button
              type="button"
              onClick={() => setActive(i)}
              className="flex w-full flex-col items-start gap-3 px-4 py-4 text-left"
            >
              <div className="flex w-full items-center gap-3">
                <motion.span
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl"
                  animate={{
                    backgroundColor: isOpen ? item.tone : `${item.tone}14`,
                    scale: isOpen ? [1, 1.12, 1] : 1,
                  }}
                  transition={{ duration: 0.35 }}
                >
                  <Icon className="size-4" style={{ color: isOpen ? "white" : item.tone }} aria-hidden />
                </motion.span>

                <motion.p
                  className="min-w-0 flex-1 truncate text-sm font-semibold"
                  animate={{ color: isOpen ? "#0F172A" : "#667085" }}
                  transition={{ duration: 0.3 }}
                >
                  {item.title}
                </motion.p>

                <motion.span animate={{ rotate: isOpen ? 90 : 0, color: isOpen ? item.tone : "#C7C7CC" }} transition={{ duration: 0.3 }}>
                  <ChevronRight className="size-4" aria-hidden />
                </motion.span>
              </div>

              <motion.span
                className="rounded-full px-2.5 py-1 text-xs font-semibold"
                animate={{ backgroundColor: isOpen ? `${item.tone}14` : `${item.tone}0D`, color: isOpen ? item.tone : "#94A3B8" }}
                transition={{ duration: 0.3 }}
              >
                {item.stat}
              </motion.span>

              {/* description slot is always reserved at full height — only its opacity
                  toggles, so a card opening never changes any card's height or pushes
                  the grid (and everything below it) up or down */}
              <div className="h-10 w-full">
                <motion.p
                  className="text-sm leading-relaxed text-muted-foreground"
                  animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -4 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item.description}
                </motion.p>
              </div>
            </button>

            {/* progress underline showing time left before this card auto-advances */}
            {isOpen && (
              <motion.div
                key={`progress-${i}-${active}`}
                className="absolute bottom-0 left-1 right-0 h-[2px] origin-left"
                style={{ backgroundColor: item.tone }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: paused ? undefined : 1 }}
                transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
