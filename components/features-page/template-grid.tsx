"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ConciergeBell, HeartPulse, Truck, Headset, FileText, PhoneIncoming } from "lucide-react"

const TEMPLATES = [
  {
    icon: ConciergeBell,
    name: "Receptionist",
    description: "Greets callers, books appointments, and transfers to the right person.",
    bestFor: "Clinics, salons, and offices with a front desk",
    greeting: "Thanks for calling Meridian Clinic, this is Ava — how can I help you today?",
    tags: ["Appointment booking", "Call transfer", "Caller lookup", "Business hours"],
    tone: "#2563EB",
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    description: "Handles appointment booking, reminders, and basic patient intake.",
    bestFor: "Clinics, diagnostic labs, and patient care lines",
    greeting: "Hi, this is HealthLine's assistant — book, reschedule, or ask about a prescription?",
    tags: ["Reminders", "Patient intake", "Follow-up calls", "Prescription queries"],
    tone: "#EF4444",
  },
  {
    icon: Truck,
    name: "Transport",
    description: "Takes bookings, shares live status, and routes dispatch calls.",
    bestFor: "Logistics, fleet, and delivery operations",
    greeting: "You've reached Swift Logistics dispatch — tracking, booking, or a driver update?",
    tags: ["Live status", "Dispatch routing", "Booking confirmation", "Driver updates"],
    tone: "#D97706",
  },
  {
    icon: Headset,
    name: "Support",
    description: "Raises tickets, answers FAQs, and escalates to a human when needed.",
    bestFor: "Customer support and helpdesk teams",
    greeting: "Hello, this is Support — I can raise a ticket or connect you to a specialist.",
    tags: ["Ticket creation", "FAQ answers", "Human escalation", "Priority routing"],
    tone: "#7C3AED",
  },
  {
    icon: FileText,
    name: "Blank",
    description: "No preset script — start from a clean agent and build it your way.",
    bestFor: "Teams with their own script and routing logic",
    greeting: "Write your own opening line, routing rules, and knowledge — from scratch.",
    tags: ["No preset script", "Full customization", "Build from scratch", "Empty knowledge base"],
    tone: "#64748B",
  },
]

const CYCLE_MS = 2800

export function TemplateGrid() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % TEMPLATES.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [paused])

  const current = TEMPLATES[active]
  const CurrentIcon = current.icon

  return (
    <div className="mt-10" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* tab rail — pick a template */}
      <div className="flex flex-wrap gap-2">
        {TEMPLATES.map((t, i) => {
          const Icon = t.icon
          const isActive = i === active
          return (
            <button
              key={t.name}
              type="button"
              onClick={() => setActive(i)}
              className="relative flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors"
              style={{
                backgroundColor: isActive ? `${t.tone}12` : "white",
                color: isActive ? t.tone : "var(--muted-foreground)",
              }}
            >
              <Icon className="size-3.5" aria-hidden />
              {t.name}
              {isActive && (
                <motion.span
                  layoutId="template-tab-underline"
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: `0 0 0 1.5px ${t.tone}` }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* progress rail showing time until auto-advance */}
      <div className="mt-3 h-[2px] w-full overflow-hidden rounded-full bg-[#EEF2F7]">
        <motion.div
          key={paused ? `${active}-paused` : active}
          className="h-full"
          style={{ backgroundColor: current.tone }}
          initial={{ width: "0%" }}
          animate={{ width: paused ? "0%" : "100%" }}
          transition={{ duration: paused ? 0 : CYCLE_MS / 1000, ease: "linear" }}
        />
      </div>

      {/* detail panel */}
      <div className="relative mt-6 overflow-hidden rounded-2xl border border-border/60 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-8 p-8 md:grid-cols-[auto_1fr] md:p-10"
          >
            <div className="flex flex-col items-center gap-4 text-center md:h-full md:gap-3">
              <div className="flex items-start gap-4 md:flex-col md:items-center">
                <span
                  className="flex size-14 shrink-0 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${current.tone}18` }}
                >
                  <CurrentIcon className="size-7" style={{ color: current.tone }} aria-hidden />
                </span>
                <div className="md:mt-1">
                  <h3 className="text-lg font-bold text-foreground">{current.name}</h3>
                  <p className="mt-1 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
                    {current.description}
                  </p>
                </div>
              </div>

              <div className="mx-auto max-w-[16rem] md:mt-auto">
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: current.tone }}>
                  Best for
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">{current.bestFor}</p>
              </div>
            </div>

            <div className="min-w-0">
              {/* sample opening line, as a call bubble */}
              <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-[#F8FAFC] px-5 py-4">
                <PhoneIncoming className="mt-0.5 size-5 shrink-0" style={{ color: current.tone }} aria-hidden />
                <p className="text-base italic leading-relaxed text-foreground/80">&ldquo;{current.greeting}&rdquo;</p>
              </div>

              {/* what's included */}
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">What's included</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {current.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 + i * 0.04 }}
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ backgroundColor: `${current.tone}12`, color: current.tone }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
