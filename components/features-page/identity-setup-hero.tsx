"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Car, Stethoscope, Home, Fingerprint } from "lucide-react"

const CYCLE_MS = 3200

const profiles = [
  { name: "Aarav Motors Agent", icon: Car, greeting: "Thanks for calling Aarav Motors, how can I help?", tone: "#2563EB" },
  { name: "Priya Dental Care", icon: Stethoscope, greeting: "Hi, you've reached Priya Dental Care!", tone: "#7C3AED" },
  { name: "Sharma Realty", icon: Home, greeting: "Hello! Sharma Realty, how can I assist you today?", tone: "#D97706" },
]

export function IdentitySetupHero() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % profiles.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [paused])

  const current = profiles[active]
  const Icon = current.icon

  return (
    <div
      className="relative mx-auto w-full max-w-[420px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{ backgroundColor: `${current.tone}20` }}
        style={{ filter: "blur(90px)" }}
        transition={{ duration: 0.6 }}
      />

      {/* the ID card */}
      <motion.div
        className="relative overflow-hidden rounded-[26px] bg-white p-6"
        style={{ border: "1px solid #E4ECFF", boxShadow: "0 40px 80px -34px rgba(15,23,42,0.28)" }}
        initial={{ opacity: 0, y: 24, rotate: -1.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="absolute inset-x-0 top-0 h-2"
          animate={{ background: `linear-gradient(90deg, ${current.tone}, ${current.tone}88)` }}
          transition={{ duration: 0.5 }}
        />

        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#94A3B8" }}>
            Agent ID
          </span>
          <Fingerprint className="size-4" style={{ color: "#CBD5E1" }} aria-hidden />
        </div>

        <div className="mt-5 flex items-center gap-4">
          <motion.span
            key={current.name}
            className="flex size-16 shrink-0 items-center justify-center rounded-2xl text-white"
            style={{ background: `linear-gradient(135deg, ${current.tone}, ${current.tone}CC)`, boxShadow: `0 16px 32px -14px ${current.tone}90` }}
            initial={{ scale: 0.7, rotate: -12, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 260, damping: 18 }}
          >
            <Icon className="size-7" aria-hidden />
          </motion.span>
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.p
                key={current.name}
                className="truncate text-lg font-extrabold"
                style={{ color: "#0F172A" }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
              >
                {current.name}
              </motion.p>
            </AnimatePresence>
            <span className="text-xs font-medium" style={{ color: "#94A3B8" }}>Voice agent</span>
          </div>
        </div>

        <div className="mt-5 rounded-2xl px-4 py-3.5" style={{ backgroundColor: "#F7F9FC", border: "1px solid #E4ECFF" }}>
          <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "#94A3B8" }}>Greeting</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={current.greeting}
              className="mt-1 text-sm italic leading-relaxed"
              style={{ color: "#334155" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              "{current.greeting}"
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="mt-4 flex justify-center gap-1.5" aria-hidden>
        {profiles.map((p, i) => (
          <span
            key={p.name}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{ width: i === active ? "18px" : "6px", backgroundColor: i === active ? current.tone : "#E4ECFF" }}
          />
        ))}
      </div>
    </div>
  )
}
