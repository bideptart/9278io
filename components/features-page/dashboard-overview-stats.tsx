"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Zap, Link2, HeartPulse } from "lucide-react"

function useCountUp(to: number, decimals = 0, durationMs = 1400) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let raf: number
    const start = performance.now()
    const factor = 10 ** decimals
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1)
      setValue(Math.round(to * progress * factor) / factor)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, decimals, durationMs])
  return value
}

const stats = [
  { icon: Zap, value: 0.4, decimals: 1, suffix: "s", label: "Key activity the moment you log in", tone: "#2563EB" },
  { icon: Link2, value: 3, decimals: 0, suffix: "", label: "Quick links to what matters most", tone: "#7C3AED" },
  { icon: HeartPulse, value: 99.9, decimals: 1, suffix: "%", label: "Account health at a glance", tone: "#10B981" },
]

function StatItem({ stat, index }: { stat: (typeof stats)[number]; index: number }) {
  const Icon = stat.icon
  const value = useCountUp(stat.value, stat.decimals, 1200 + index * 150)
  return (
    <motion.div
      className="flex flex-1 flex-col items-center gap-2 text-center"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <span className="flex size-11 items-center justify-center rounded-2xl" style={{ backgroundColor: `${stat.tone}14`, color: stat.tone }}>
        <Icon className="size-5" aria-hidden />
      </span>
      <p className="text-3xl font-extrabold tabular-nums" style={{ color: "#0F172A" }}>
        {value}
        {stat.suffix}
      </p>
      <p className="max-w-[20ch] text-sm" style={{ color: "#667085" }}>{stat.label}</p>
    </motion.div>
  )
}

export function DashboardOverviewStats() {
  return (
    <div className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-8 sm:flex-row sm:gap-6">
      {stats.map((s, i) => (
        <StatItem key={s.label} stat={s} index={i} />
      ))}
    </div>
  )
}
