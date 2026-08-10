"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Copy, FileText, Receipt, Car, Stethoscope, Home, Check } from "lucide-react"

const CYCLE_MS = 3400

const allAgents = [
  { name: "Aarav Motors", icon: Car, tone: "#2563EB" },
  { name: "Priya Dental", icon: Stethoscope, tone: "#10B981" },
  { name: "Sharma Reality", icon: Home, tone: "#7C3AED" },
]

const templates = [
  { name: "Front Desk Support", icon: Copy, agents: [0, 1, 2], tags: ["Hours", "Greeting", "Directions"] },
  { name: "Sales Script", icon: FileText, agents: [0, 2], tags: ["Pricing", "Objections"] },
  { name: "Billing Policy", icon: Receipt, agents: [1], tags: ["Refunds", "Invoices", "Late fees"] },
]

const MAX_ROWS = 3
const ROW_H = 40
const TABLE_HEAD_H = 27

export function KnowledgeTemplatesHeroIllustration() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % templates.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  const template = templates[active]
  const appliedCount = template.agents.length

  return (
    <div className="relative mx-auto mt-8 w-full max-w-[520px]">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.18), transparent 70%)" }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* rotating gradient ring, clipped to a thin border around the dashboard */}
      <motion.div
        className="relative overflow-hidden rounded-2xl p-[1.5px]"
        style={{ boxShadow: "0 40px 80px -30px rgba(15,23,42,0.25)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-1/2 size-[200%]"
          style={{ background: "conic-gradient(from 0deg, #7C3AED, #4F8DFF, #34D399, #7C3AED)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />

        {/* dashboard window — fixed footprint, never resizes between templates */}
        <div className="relative flex h-[480px] flex-col overflow-hidden rounded-[15px] bg-white">
          {/* title bar */}
          <div className="flex shrink-0 items-center gap-2 border-b px-4 py-3" style={{ borderColor: "#E4ECFF", backgroundColor: "#FAFBFF" }}>
            <span className="size-2.5 rounded-full" style={{ backgroundColor: "#F87171" }} aria-hidden />
            <span className="size-2.5 rounded-full" style={{ backgroundColor: "#FBBF24" }} aria-hidden />
            <span className="size-2.5 rounded-full" style={{ backgroundColor: "#34D399" }} aria-hidden />
            <span className="ml-2 text-xs font-semibold" style={{ color: "#667085" }}>Knowledge Templates</span>
            <span className="ml-auto inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold" style={{ backgroundColor: "#F3EEFF", color: "#7C3AED" }}>
              <span className="relative flex size-1.5">
                <motion.span
                  className="absolute inline-flex size-full rounded-full"
                  style={{ backgroundColor: "#7C3AED" }}
                  animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                />
                <span className="relative inline-flex size-1.5 rounded-full" style={{ backgroundColor: "#7C3AED" }} />
              </span>
              Live
            </span>
          </div>

          <div className="grid flex-1 grid-cols-[124px_1fr] sm:grid-cols-[150px_1fr]">
            {/* sidebar: template list, selection auto-advances */}
            <div className="relative flex flex-col gap-1 border-r p-2.5" style={{ borderColor: "#E4ECFF", backgroundColor: "#FAFBFF" }}>
              {templates.map((t, i) => {
                const Icon = t.icon
                const isActive = i === active
                return (
                  <motion.div
                    key={t.name}
                    className="relative flex items-center gap-2 rounded-lg px-2.5 py-2"
                    animate={{
                      backgroundColor: isActive ? "#7C3AED" : "#FAFBFF00",
                      boxShadow: isActive ? "0 8px 16px -8px rgba(124,58,237,0.5)" : "0 0 0 0 rgba(0,0,0,0)",
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="template-cursor"
                        className="absolute -left-2.5 h-5 w-1 rounded-full"
                        style={{ backgroundColor: "#7C3AED" }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                    )}
                    <Icon className="size-3.5 shrink-0" style={{ color: isActive ? "#FFFFFF" : "#94A3B8" }} aria-hidden />
                    <span className="truncate text-[11px] font-semibold" style={{ color: isActive ? "#FFFFFF" : "#667085" }}>
                      {t.name}
                    </span>
                  </motion.div>
                )
              })}
            </div>

            {/* main panel: selected template + tags + applied agents table */}
            <div className="relative flex flex-col overflow-hidden p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={template.name}
                  className="flex flex-1 flex-col"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "#94A3B8" }}>Selected template</p>
                      <p className="truncate text-base font-bold" style={{ color: "#0F172A" }}>{template.name}</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold" style={{ backgroundColor: "#F3EEFF", color: "#7C3AED" }}>
                      Applied to {appliedCount}
                    </span>
                  </div>

                  {/* content-type pills for the selected template */}
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {template.tags.map((tag, i) => (
                      <motion.span
                        key={tag}
                        className="rounded-full px-2.5 py-1 text-[10px] font-semibold"
                        style={{ backgroundColor: "#F7F9FC", color: "#475569", border: "1px solid #E4ECFF" }}
                        initial={{ opacity: 0, y: 6, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <div className="relative mt-2.5 overflow-hidden rounded-xl" style={{ border: "1px solid #E4ECFF", height: TABLE_HEAD_H + MAX_ROWS * ROW_H }}>
                    {/* sync scan-line sweep, replays with every template switch */}
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 z-10 h-8"
                      style={{ background: "linear-gradient(180deg, transparent, rgba(124,58,237,0.16), transparent)" }}
                      initial={{ top: "-20%" }}
                      animate={{ top: "120%" }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                    <div
                      className="grid grid-cols-[1fr_auto] items-center gap-2 px-3 text-[9px] font-semibold uppercase tracking-wide"
                      style={{ height: TABLE_HEAD_H, backgroundColor: "#F7F9FC", color: "#94A3B8" }}
                    >
                      <span>Agent</span>
                      <span>Status</span>
                    </div>
                    {allAgents.map((a, i) => {
                      const Icon = a.icon
                      const isApplied = template.agents.includes(i)
                      return (
                        <motion.div
                          key={a.name}
                          className="grid grid-cols-[1fr_auto] items-center gap-2 border-t px-3"
                          style={{ height: ROW_H, borderColor: "#EEF2FA" }}
                          animate={{ opacity: isApplied ? 1 : 0.45 }}
                          transition={{ duration: 0.3, delay: 0.1 + i * 0.08 }}
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            <motion.span
                              className="flex size-6 shrink-0 items-center justify-center rounded-full text-white"
                              animate={{ backgroundColor: isApplied ? a.tone : "#CBD5E1", scale: isApplied ? 1 : 0.92 }}
                              transition={{ duration: 0.35, type: "spring", stiffness: 260, damping: 18 }}
                            >
                              <Icon className="size-3" aria-hidden />
                            </motion.span>
                            <span className="truncate text-xs font-medium" style={{ color: isApplied ? "#0F172A" : "#94A3B8" }}>{a.name}</span>
                          </span>
                          {isApplied ? (
                            <motion.span
                              className="inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold"
                              style={{ backgroundColor: "#F0FDF4", color: "#16A34A" }}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: [0, 1, 1, 0.55, 1], scale: 1 }}
                              transition={{ duration: 2.4, delay: 0.35 + i * 0.1, times: [0, 0.15, 0.5, 0.75, 1], repeat: Infinity, repeatDelay: 0.5 }}
                            >
                              <Check className="size-2.5" aria-hidden />
                              Synced
                            </motion.span>
                          ) : (
                            <span className="whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: "#F1F5F9", color: "#94A3B8" }}>
                              Not applied
                            </span>
                          )}
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              <motion.div
                className="mt-2.5 flex shrink-0 items-center justify-between rounded-xl px-3 py-2.5"
                style={{ backgroundColor: "#F3EEFF", border: "1px solid #E9D8FF" }}
                animate={{ borderColor: ["#E9D8FF", "#C4B5FD", "#E9D8FF"] }}
                transition={{ duration: CYCLE_MS / 1000, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-[11px]" style={{ color: "#7C3AED" }}>Edit template once</p>
                <span className="text-[11px] font-semibold" style={{ color: "#7C3AED" }}>Updates all {appliedCount} →</span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
