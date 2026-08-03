"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { PhoneCall, Clock, Bot, CalendarCheck, TrendingUp } from "lucide-react"

function useCountUp(to: number, durationMs = 1400) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let raf: number
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1)
      setValue(Math.round(to * progress))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, durationMs])
  return value
}

const tiles = [
  { icon: PhoneCall, label: "Calls today", to: 128, tone: "#2563EB", spark: [30, 45, 38, 60, 52, 70, 64, 82] },
  { icon: Clock, label: "Minutes used", to: 940, tone: "#7C3AED", spark: [40, 42, 55, 50, 68, 60, 74, 80] },
  { icon: Bot, label: "Active agents", to: 4, tone: "#10B981", spark: [20, 20, 30, 30, 40, 40, 40, 50] },
  { icon: CalendarCheck, label: "Bookings today", to: 17, tone: "#D97706", spark: [10, 25, 20, 40, 35, 55, 48, 65] },
]

const feed = [
  { text: "Aarav Motors Agent booked a service slot", time: "just now" },
  { text: "Priya Dental Care answered a call in 2 rings", time: "1m ago" },
  { text: "Sharma Realty transferred a call to sales", time: "3m ago" },
]

function StatTile({ tile, index }: { tile: (typeof tiles)[number]; index: number }) {
  const Icon = tile.icon
  const value = useCountUp(tile.to, 1200 + index * 150)
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl p-3.5"
      style={{ backgroundColor: `${tile.tone}0A`, border: `1px solid ${tile.tone}25` }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <span className="flex size-8 items-center justify-center rounded-lg" style={{ backgroundColor: `${tile.tone}18`, color: tile.tone }}>
        <Icon className="size-4" aria-hidden />
      </span>
      <p className="mt-2.5 text-2xl font-extrabold tabular-nums" style={{ color: "#0F172A" }}>{value}</p>
      <p className="text-[11px] font-medium" style={{ color: "#94A3B8" }}>{tile.label}</p>
      {/* sparkline */}
      <svg viewBox="0 0 80 24" preserveAspectRatio="none" className="mt-2 h-6 w-full" aria-hidden>
        <motion.polyline
          points={tile.spark.map((v, si) => `${(si / (tile.spark.length - 1)) * 80},${24 - (v / 90) * 24}`).join(" ")}
          fill="none"
          stroke={tile.tone}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: "easeOut" }}
        />
      </svg>
    </motion.div>
  )
}

export function DashboardOverviewHero() {
  const [feedIndex, setFeedIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setFeedIndex((f) => (f + 1) % feed.length), 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-white p-5"
        style={{ border: "1px solid #E4ECFF", boxShadow: "0 40px 80px -34px rgba(15,23,42,0.24)" }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold" style={{ color: "#0F172A" }}>Account overview</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
            <span className="relative flex size-1.5">
              <motion.span
                className="absolute inline-flex size-full rounded-full bg-emerald-500"
                animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
              />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            Live
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {tiles.map((t, i) => (
            <StatTile key={t.label} tile={t} index={i} />
          ))}
        </div>

        {/* live activity ticker */}
        <div className="mt-4 rounded-2xl px-3.5 py-3" style={{ backgroundColor: "#F7F9FC", border: "1px solid #E4ECFF" }}>
          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color: "#94A3B8" }}>
            <TrendingUp className="size-3" aria-hidden />
            Recent activity
          </span>
          <div className="relative mt-1.5 h-5 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={feedIndex}
                className="absolute inset-0 truncate text-xs font-medium"
                style={{ color: "#334155" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {feed[feedIndex].text}
                <span className="ml-1.5" style={{ color: "#94A3B8" }}>· {feed[feedIndex].time}</span>
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
