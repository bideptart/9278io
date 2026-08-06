"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { PhoneCall, Clock, Bot, CalendarCheck, TrendingUp, PhoneIncoming, ArrowRightLeft } from "lucide-react"

const SPARK_W = 80
const SPARK_H = 28
const SPARK_MAX = 90

function buildSmoothPath(spark: number[]) {
  const pts = spark.map((v, i) => [
    (i / (spark.length - 1)) * SPARK_W,
    SPARK_H - (v / SPARK_MAX) * SPARK_H,
  ])
  let d = `M ${pts[0][0]},${pts[0][1]}`
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1]
    const [x, y] = pts[i]
    const mx = (px + x) / 2
    const my = (py + y) / 2
    d += ` Q ${px},${py} ${mx},${my}`
  }
  const last = pts[pts.length - 1]
  d += ` T ${last[0]},${last[1]}`
  return { line: d, area: `${d} L ${SPARK_W},${SPARK_H} L 0,${SPARK_H} Z` }
}

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
  { icon: PhoneCall, label: "Calls today", to: 128, bump: 1, tone: "#2563EB", spark: [30, 45, 38, 60, 52, 70, 64, 82] },
  { icon: Clock, label: "Minutes used", to: 940, bump: 6, tone: "#7C3AED", spark: [40, 42, 55, 50, 68, 60, 74, 80] },
  { icon: Bot, label: "Active agents", to: 4, bump: 0, tone: "#10B981", spark: [20, 20, 30, 30, 40, 40, 40, 50] },
  { icon: CalendarCheck, label: "Bookings today", to: 17, bump: 1, tone: "#D97706", spark: [10, 25, 20, 40, 35, 55, 48, 65] },
]

const feed = [
  { icon: CalendarCheck, text: "Aarav Motors Agent booked a service slot", time: "just now" },
  { icon: PhoneIncoming, text: "Priya Dental Care answered a call in 2 rings", time: "1m ago" },
  { icon: ArrowRightLeft, text: "Sharma Reality transferred a call to sales", time: "3m ago" },
]

const LIVE_TICK_MS = 3200

function StatTile({ tile, index }: { tile: (typeof tiles)[number]; index: number }) {
  const Icon = tile.icon
  const countedUp = useCountUp(tile.to, 1200 + index * 150)
  const [liveValue, setLiveValue] = useState(tile.to)
  const [spark, setSpark] = useState(tile.spark)
  const [bumpKey, setBumpKey] = useState(0)
  const settledRef = useRef(false)

  useEffect(() => {
    setLiveValue(countedUp)
  }, [countedUp])

  useEffect(() => {
    if (countedUp >= tile.to) settledRef.current = true
  }, [countedUp, tile.to])

  useEffect(() => {
    if (tile.bump === 0) return
    const id = setInterval(() => {
      if (!settledRef.current) return
      setLiveValue((v) => v + tile.bump)
      setSpark((s) => [...s.slice(1), Math.min(90, s[s.length - 1] + Math.random() * 14)])
      setBumpKey((k) => k + 1)
    }, LIVE_TICK_MS + index * 400)
    return () => clearInterval(id)
  }, [tile.bump, index])

  const { line, area } = buildSmoothPath(spark)
  const gradientId = `spark-gradient-${index}`

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl p-3.5"
      style={{
        backgroundColor: `${tile.tone}0A`,
        border: `1.5px solid ${tile.tone}2A`,
        boxShadow: `0 10px 24px -18px ${tile.tone}80`,
      }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      whileHover={{ scale: 1.03, y: -2, boxShadow: `0 16px 32px -16px ${tile.tone}90` }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div className="flex items-start justify-between">
        <span className="flex size-8 items-center justify-center rounded-lg" style={{ backgroundColor: `${tile.tone}18`, color: tile.tone }}>
          <Icon className="size-4" aria-hidden />
        </span>

        {/* floating "+N" badge each time this tile ticks up live */}
        <div className="relative h-4 w-8">
          <AnimatePresence>
            {tile.bump > 0 && bumpKey > 0 && (
              <motion.span
                key={bumpKey}
                className="absolute right-0 top-0 text-[11px] font-bold"
                style={{ color: tile.tone }}
                initial={{ opacity: 0, y: 4, scale: 0.8 }}
                animate={{ opacity: [0, 1, 1, 0], y: -10, scale: 1 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              >
                +{tile.bump}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.p
        key={liveValue}
        className="mt-1.5 text-2xl font-extrabold tabular-nums"
        style={{ color: "#0F172A" }}
        initial={liveValue !== countedUp ? { scale: 1.15 } : false}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {liveValue}
      </motion.p>
      <p className="text-[11px] font-medium" style={{ color: "#94A3B8" }}>{tile.label}</p>

      {/* sparkline — smooth curve with a soft area fill, scrolls forward as new live points arrive */}
      <svg viewBox={`0 0 ${SPARK_W} ${SPARK_H}`} preserveAspectRatio="none" className="mt-2 h-7 w-full" aria-hidden>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tile.tone} stopOpacity={0.32} />
            <stop offset="100%" stopColor={tile.tone} stopOpacity={0} />
          </linearGradient>
        </defs>

        <motion.path
          d={area}
          fill={`url(#${gradientId})`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke={tile.tone}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: "easeOut" }}
        />
        <motion.circle
          cx={SPARK_W}
          cy={SPARK_H - (spark[spark.length - 1] / SPARK_MAX) * SPARK_H}
          r={2.4}
          fill={tile.tone}
          vectorEffect="non-scaling-stroke"
          animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
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

  const CurrentFeedIcon = feed[feedIndex].icon

  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      {/* animated border — a plain colored border plus a pulsing box-shadow ring;
          box-shadow is always bounded to the element's own edges, so unlike a
          rotating gradient layer it can never escape as a stray colored block */}
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-white p-5"
        style={{ borderWidth: 2, borderStyle: "solid", borderColor: "#93B4FD" }}
        animate={{
          boxShadow: [
            "0 40px 80px -34px rgba(15,23,42,0.24), 0 0 0 0px #93B4FD55",
            "0 40px 80px -34px rgba(15,23,42,0.24), 0 0 0 6px #93B4FD00",
          ],
        }}
        transition={{ boxShadow: { duration: 1.8, repeat: Infinity, ease: "easeOut" } }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
      >
        {/* sheen sweep across the top of the card, looping */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-1/2 h-1/2 opacity-60"
          style={{ background: "linear-gradient(115deg, transparent, rgba(37,99,235,0.06), transparent)" }}
          animate={{ x: ["-100%", "160%"] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative flex items-center justify-between">
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

        <div className="relative mt-4 grid grid-cols-2 gap-3">
          {tiles.map((t, i) => (
            <StatTile key={t.label} tile={t} index={i} />
          ))}
        </div>

        {/* live activity ticker */}
        <div className="relative mt-4 rounded-2xl px-3.5 py-3" style={{ backgroundColor: "#F7F9FC", border: "1px solid #E4ECFF" }}>
          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color: "#94A3B8" }}>
            <TrendingUp className="size-3" aria-hidden />
            Recent activity
          </span>
          <div className="relative mt-1.5 flex h-5 items-center gap-1.5 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={`icon-${feedIndex}`}
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0"
              >
                <CurrentFeedIcon className="size-3.5" style={{ color: "#2563EB" }} aria-hidden />
              </motion.span>
            </AnimatePresence>
            <div className="relative h-5 flex-1 overflow-hidden">
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
        </div>
      </motion.div>
    </div>
  )
}
