"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ConciergeBell, HeartPulse, Truck, Headset, FileText, Zap } from "lucide-react"

const TEMPLATES = [
  { icon: ConciergeBell, name: "Receptionist", tagline: "Greets, books, and transfers callers", tone: "#2563EB" },
  { icon: HeartPulse, name: "Healthcare", tagline: "Appointments, reminders, and intake", tone: "#EF4444" },
  { icon: Truck, name: "Transport", tagline: "Bookings, tracking, and dispatch calls", tone: "#D97706" },
  { icon: Headset, name: "Support", tagline: "Tickets, FAQs, and escalations", tone: "#7C3AED" },
  { icon: FileText, name: "Blank", tagline: "Start from a clean, empty agent", tone: "#64748B" },
]

const CYCLE_MS = 2400

export function TemplateGalleryHero() {
  const [active, setActive] = useState(0)
  const [launched, setLaunched] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setLaunched(false)
      setActive((a) => (a + 1) % TEMPLATES.length)
    }, CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setTimeout(() => setLaunched(true), CYCLE_MS - 700)
    return () => clearTimeout(id)
  }, [active])

  const current = TEMPLATES[active]

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div aria-hidden className="absolute inset-x-8 -top-6 h-24 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative" style={{ height: 280 }}>
        {TEMPLATES.map((t, i) => {
          const offset = (i - active + TEMPLATES.length) % TEMPLATES.length
          if (offset > 2) return null
          const Icon = t.icon
          return (
            <motion.div
              key={t.name}
              className="absolute inset-x-0 top-0 overflow-hidden rounded-3xl border border-border/60 bg-white shadow-[0_24px_50px_-24px_rgba(15,23,42,0.28)]"
              animate={{
                y: offset * 14,
                scale: 1 - offset * 0.05,
                opacity: offset === 0 ? 1 : 0.55 - offset * 0.12,
                zIndex: TEMPLATES.length - offset,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: 240 }}
            >
              <div className="flex h-full flex-col justify-between p-6">
                <div className="flex items-start justify-between">
                  <span
                    className="flex size-12 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: `${t.tone}18` }}
                  >
                    <Icon className="size-6" style={{ color: t.tone }} aria-hidden />
                  </span>
                  <span className="rounded-full bg-secondary/60 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Template
                  </span>
                </div>
                <div>
                  <p className="text-xl font-bold tracking-tight text-foreground">{t.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.tagline}</p>
                </div>

                {offset === 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5">
                      {TEMPLATES.map((_, dotI) => (
                        <span
                          key={dotI}
                          className="size-1.5 rounded-full transition-colors"
                          style={{ backgroundColor: dotI === active ? t.tone : "#E2E8F0" }}
                        />
                      ))}
                    </div>
                    <AnimatePresence mode="wait">
                      {launched ? (
                        <motion.span
                          key="launched"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-white"
                          style={{ backgroundColor: t.tone }}
                        >
                          <Zap className="size-3" aria-hidden />
                          Launched
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-xs font-semibold text-muted-foreground"
                        >
                          Ready to launch
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
