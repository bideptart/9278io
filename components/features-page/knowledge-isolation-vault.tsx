"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Car, Stethoscope, Home, Lock, FileText, HelpCircle, ShieldCheck } from "lucide-react"

const CYCLE_MS = 3200

const agents = [
  { name: "Aarav Motors", icon: Car, tone: "#2563EB", entries: "12" },
  { name: "Priya Dental", icon: Stethoscope, tone: "#7C3AED", entries: "9" },
  { name: "Sharma Realty", icon: Home, tone: "#D97706", entries: "15" },
]

const facts = [
  { icon: FileText, label: "Company Facts" },
  { icon: HelpCircle, label: "FAQs" },
  { icon: ShieldCheck, label: "Policies" },
]

export function KnowledgeIsolationVault() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % agents.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  const agent = agents[active]
  const Icon = agent.icon

  return (
    <div className="relative mx-auto w-full max-w-lg">
      {/* ambient glow, tinted to the active agent */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        animate={{ backgroundColor: `${agent.tone}33` }}
        transition={{ duration: 0.6 }}
      />

      {/* agent selector tabs — clicking one "unlocks" that agent's vault */}
      <div className="flex justify-center gap-2">
        {agents.map((a, i) => {
          const TabIcon = a.icon
          const isActive = i === active
          return (
            <motion.button
              key={a.name}
              onClick={() => setActive(i)}
              className="flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold"
              style={{
                backgroundColor: isActive ? a.tone : "#F7F9FC",
                color: isActive ? "#FFFFFF" : "#667085",
                border: `1px solid ${isActive ? a.tone : "#E4ECFF"}`,
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              animate={{ scale: isActive ? 1.05 : 1 }}
              transition={{ duration: 0.25 }}
            >
              <TabIcon className="size-3.5" aria-hidden />
              {a.name}
            </motion.button>
          )
        })}
      </div>

      {/* progress dots */}
      <div className="mt-3 flex justify-center gap-1.5" aria-hidden>
        {agents.map((a, i) => (
          <span
            key={a.name}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{ width: i === active ? "18px" : "6px", backgroundColor: i === active ? a.tone : "#E4ECFF" }}
          />
        ))}
      </div>

      {/* the vault — only one agent's contents are ever visible at once */}
      <motion.div
        className="relative mt-4 h-[260px] overflow-hidden rounded-3xl bg-white"
        style={{ border: "1px solid #E4ECFF" }}
        animate={{ boxShadow: `0 30px 60px -24px ${agent.tone}40, 0 0 0 1px ${agent.tone}30` }}
        transition={{ duration: 0.6 }}
      >
        {/* dot-grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage: "radial-gradient(rgba(37,99,235,0.14) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
          }}
        />
        {/* unlock scan-line sweep, replays with every agent switch */}
        <motion.div
          key={`scan-${agent.name}`}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 h-10"
          style={{ background: `linear-gradient(180deg, transparent, ${agent.tone}55, transparent)` }}
          initial={{ top: "-10%" }}
          animate={{ top: "110%" }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={agent.name}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 py-8 text-center"
            initial={{ clipPath: "inset(0 50% 0 50%)", opacity: 0, y: 8 }}
            animate={{ clipPath: "inset(0 0% 0 0%)", opacity: 1, y: 0 }}
            exit={{ clipPath: "inset(0 50% 0 50%)", opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="relative flex size-12 items-center justify-center rounded-2xl text-white"
              style={{ background: `linear-gradient(135deg, ${agent.tone}, ${agent.tone}CC)`, boxShadow: `0 14px 28px -12px ${agent.tone}` }}
              initial={{ scale: 0.6, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
            >
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-2xl"
                style={{ border: `1.5px solid ${agent.tone}` }}
                animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                transition={{ duration: 1, repeat: 2, ease: "easeOut", delay: 0.5 }}
              />
              <Icon className="size-5" aria-hidden />
            </motion.span>
            <p className="text-base font-bold" style={{ color: "#0F172A" }}>{agent.name}</p>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: "#94A3B8" }}>
              <motion.span
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Lock className="size-3" aria-hidden />
              </motion.span>
              Sealed from every other agent
            </div>

            <div className="mt-2 flex gap-2">
              {facts.map((f, fi) => {
                const FIcon = f.icon
                return (
                  <motion.span
                    key={f.label}
                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium"
                    style={{ backgroundColor: "#F7F9FC", border: "1px solid #E4ECFF", color: "#334155" }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + fi * 0.08 }}
                  >
                    <FIcon className="size-3" style={{ color: agent.tone }} aria-hidden />
                    {f.label}
                  </motion.span>
                )
              })}
            </div>

            <span className="mt-1 text-xs font-semibold" style={{ color: agent.tone }}>{agent.entries} entries</span>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Switch agents above — you'll only ever see one vault open at a time.
      </p>
    </div>
  )
}
