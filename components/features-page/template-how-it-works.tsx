"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { FilePlus, Users, RefreshCw } from "lucide-react"

const CYCLE_MS = 1400

const steps = [
  {
    icon: FilePlus,
    title: "Build a template once",
    description: "Set up the knowledge base for a role — support, sales, front desk — a single time.",
  },
  {
    icon: Users,
    title: "Apply it to any agent",
    description: "Attach the template to as many agents or numbers as you need, in a couple of clicks.",
  },
  {
    icon: RefreshCw,
    title: "Edit once, update everywhere",
    description: "Change the template and every agent using it reflects the update immediately.",
  },
]

// rail positions as fractions of the inset track (0/50/100%), which itself
// spans exactly from the first grid column's center to the last one's — so
// the token/dots always land under the matching icon below, and the fill
// reaches a true 100% once the last step is reached.
const positions = [0, 50, 100]

export function TemplateHowItWorksFlow() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative mx-auto mt-14 w-full">
      {/* the rail, inset to span column-1-center → column-3-center (1/6 of the grid width on each side) */}
      <div
        className="relative hidden h-1.5 rounded-full sm:block"
        style={{ backgroundColor: "#DCE3F5", marginLeft: `${100 / 6}%`, marginRight: `${100 / 6}%` }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: "linear-gradient(90deg, #2563EB, #4F8DFF)", boxShadow: "0 0 14px 1px rgba(37,99,235,0.55)" }}
          animate={{ width: `${positions[active]}%` }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
        />
        {/* traveling token */}
        <motion.div
          className="absolute top-1/2 z-10 flex size-6 -translate-y-1/2 items-center justify-center rounded-full"
          style={{ backgroundColor: "#2563EB", boxShadow: "0 0 0 4px rgba(37,99,235,0.18), 0 8px 16px -6px rgba(37,99,235,0.6)" }}
          animate={{ left: `calc(${positions[active]}% - 12px)` }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
        >
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ border: "1.5px solid #2563EB" }}
            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
          />
        </motion.div>
        {/* node markers */}
        {positions.map((p, i) => (
          <span
            key={p}
            className="absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full"
            style={{ left: `calc(${p}% - 5px)`, backgroundColor: i <= active ? "#2563EB" : "#CBD5E1" }}
          />
        ))}
      </div>

      <div className="mt-8 grid gap-8 sm:mt-10 sm:grid-cols-3 sm:gap-6">
        {steps.map((s, i) => {
          const Icon = s.icon
          const isActive = i === active
          return (
            <motion.div
              key={s.title}
              className="flex flex-col items-center text-center"
              animate={{ opacity: isActive ? 1 : 0.5, y: isActive ? 0 : 2 }}
              transition={{ duration: 0.4 }}
            >
              <motion.span
                className="flex size-11 items-center justify-center rounded-2xl text-white"
                animate={{
                  background: isActive ? "linear-gradient(135deg, #2563EB, #4F8DFF)" : "linear-gradient(135deg, #CBD5E1, #CBD5E1)",
                  scale: isActive ? 1.1 : 1,
                  boxShadow: isActive ? "0 14px 28px -12px rgba(37,99,235,0.55)" : "0 0 0 0 rgba(0,0,0,0)",
                }}
                transition={{ duration: 0.4 }}
              >
                <Icon className="size-5" aria-hidden />
              </motion.span>
              <span className="mt-3 font-mono text-[11px] font-semibold tabular-nums" style={{ color: isActive ? "#2563EB" : "#94A3B8" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-1 text-base font-bold tracking-tight" style={{ color: "#0F172A" }}>
                {s.title}
              </p>
              <p className="mt-1.5 max-w-[26ch] text-sm leading-relaxed" style={{ color: "#667085" }}>
                {s.description}
              </p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
