"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Copy, Layers, Pencil } from "lucide-react"

const CYCLE_MS = 3200

const steps = [
  {
    icon: Copy,
    title: "Build once, apply to many agents",
    description: "Set up a knowledge base a single time, then apply it to every agent that needs it.",
    tone: "#2563EB",
  },
  {
    icon: Layers,
    title: "Keep answers consistent across numbers",
    description: "Every agent using a template answers the same way, on every number.",
    tone: "#7C3AED",
  },
  {
    icon: Pencil,
    title: "Edit the template to update everywhere",
    description: "Change the template once and every agent using it updates automatically.",
    tone: "#10B981",
  },
]

export function TemplateBenefitsTimeline() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [paused])

  return (
    <div
      className="relative mx-auto mt-12 flex h-[300px] w-full max-w-4xl overflow-hidden rounded-3xl sm:h-[340px]"
      style={{ boxShadow: "0 30px 70px -34px rgba(15,23,42,0.22)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* crisp border overlay, painted above every panel so glows/gradients never wash it out */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-3xl"
        style={{ boxShadow: "inset 0 0 0 2px #94A7D6" }}
      />
      {steps.map((s, i) => {
        const Icon = s.icon
        const isActive = i === active
        return (
          <motion.button
            key={s.title}
            onClick={() => setActive(i)}
            className="relative flex h-full cursor-pointer flex-col items-center overflow-hidden text-left"
            style={{ backgroundColor: isActive ? `${s.tone}0D` : "#F7F9FC", borderRight: i < steps.length - 1 ? "2px solid #94A7D6" : undefined }}
            animate={{ flexGrow: isActive ? 5 : 1 }}
            transition={{ type: "spring", stiffness: 140, damping: 22 }}
          >
            {/* soft corner glow, tinted to this panel while active */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -top-8 left-1/2 size-48 -translate-x-1/2 rounded-full blur-3xl"
              animate={{ backgroundColor: isActive ? `${s.tone}33` : `${s.tone}00`, opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* glowing gradient base rail with a shimmer sweep while active */}
            <motion.span
              aria-hidden
              className="absolute inset-x-0 bottom-0 overflow-hidden"
              animate={{ height: isActive ? 3 : 1.5, backgroundColor: isActive ? s.tone : "#E4ECFF" }}
              style={{ boxShadow: isActive ? `0 0 16px 1px ${s.tone}99` : "none" }}
              transition={{ duration: 0.4 }}
            >
              {isActive && (
                <motion.span
                  aria-hidden
                  className="absolute inset-y-0 w-1/3"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)" }}
                  animate={{ left: ["-40%", "140%"] }}
                  transition={{ duration: CYCLE_MS / 1000, repeat: Infinity, ease: "linear" }}
                />
              )}
            </motion.span>

            <div className="flex w-full flex-1 flex-col items-center justify-center px-3 py-6">
              <motion.span
                className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl text-white"
                animate={{
                  background: isActive ? `linear-gradient(135deg, ${s.tone}, ${s.tone}CC)` : "linear-gradient(135deg, #CBD5E1, #CBD5E1)",
                  scale: isActive ? 1.08 : 1,
                  boxShadow: isActive ? `0 14px 28px -10px ${s.tone}90` : "0 0 0 0 rgba(0,0,0,0)",
                }}
                transition={{ duration: 0.4 }}
              >
                {isActive && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-2xl"
                    style={{ border: `1.5px solid ${s.tone}` }}
                    animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <Icon className="size-5" aria-hidden />
              </motion.span>

              <AnimatePresence mode="wait">
                {isActive ? (
                  <motion.div
                    key="expanded"
                    className="mt-4 max-w-[280px] text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <span className="font-mono text-[11px] font-semibold tabular-nums" style={{ color: s.tone }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-1 text-base font-bold tracking-tight sm:text-lg" style={{ color: "#0F172A" }}>
                      {s.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: "#667085" }}>
                      {s.description}
                    </p>
                  </motion.div>
                ) : (
                  <motion.span
                    key="collapsed"
                    className="mt-5 whitespace-nowrap text-[11px] font-semibold uppercase tracking-wider"
                    style={{ writingMode: "vertical-rl", color: "#94A3B8" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                  >
                    Step {i + 1}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
