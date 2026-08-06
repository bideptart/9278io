"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { PhoneIncoming, BarChart3, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

type Tile = {
  icon: typeof PhoneIncoming
  label: string
  title: string
  description: string
  value: number
  suffix: string
  tone: string
}

const TILES: Tile[] = [
  {
    icon: PhoneIncoming,
    label: "Step 1",
    title: "Every call logs itself",
    description: "The moment an agent answers or makes a call, it's captured — no setup, no extra step.",
    value: 1,
    suffix: " call logged",
    tone: "#2563EB",
  },
  {
    icon: BarChart3,
    label: "Step 2",
    title: "Numbers update in real time",
    description: "Volume, minutes, and duration roll into the dashboard as calls happen, not overnight.",
    value: 247,
    suffix: " min tracked",
    tone: "#7C3AED",
  },
  {
    icon: Wallet,
    label: "Step 3",
    title: "See usage against your wallet credit",
    description: "Included minutes burn down against your plan so you always know where you stand before topping up.",
    value: 36,
    suffix: "% of plan used",
    tone: "#D97706",
  },
]

const CYCLE_MS = 2800

function useCountTo(target: number, active: boolean) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) {
      setValue(0)
      return
    }
    let raf: number
    const start = performance.now()
    const duration = 900
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target])
  return value
}

function KpiTile({ tile, isActive }: { tile: Tile; isActive: boolean }) {
  const Icon = tile.icon
  const count = useCountTo(tile.value, isActive)

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border bg-white p-5"
      animate={{
        borderColor: isActive ? tile.tone : "#E4ECFF",
        scale: isActive ? 1.03 : 1,
        boxShadow: isActive ? `0 20px 44px -22px ${tile.tone}80` : "0 1px 2px rgba(15,23,42,0.04)",
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: isActive ? `${tile.tone}1A` : "#F1F5F9", color: isActive ? tile.tone : "#94A3B8" }}
        >
          <Icon className="size-4.5" aria-hidden />
        </span>
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: isActive ? tile.tone : "#94A3B8" }}>
          {tile.label}
        </span>
      </div>

      <p className="mt-4 text-2xl font-extrabold tabular-nums tracking-tight" style={{ color: isActive ? "#0F172A" : "#CBD5E1" }}>
        {count}
        <span className="text-sm font-semibold">{tile.suffix}</span>
      </p>

      <div className="mt-3 h-1 w-full overflow-hidden rounded-full" style={{ backgroundColor: "#E4ECFF" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: tile.tone }}
          animate={{ width: isActive ? "100%" : "0%" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  )
}

/**
 * "How it works" as a live metric-tile carousel — 3 dashboard-style KPI
 * cards that count up when active, distinct from every connector-line,
 * zigzag, console, radial, or slider "how it works" format used elsewhere.
 * Ties directly into the analytics theme: each step is presented as the
 * live number it produces, not just an icon and a sentence.
 */
export function AnalyticsHowItWorksTiles() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % TILES.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="mt-10">
      <div className="grid gap-4 sm:grid-cols-3">
        {TILES.map((tile, i) => (
          <button key={tile.title} type="button" onClick={() => setActive(i)} className="text-left">
            <KpiTile tile={tile} isActive={i === active} />
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-center gap-3 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="max-w-lg text-sm leading-relaxed text-muted-foreground"
          >
            {TILES[active].description}
          </motion.p>
        </AnimatePresence>
        <div className="flex gap-1.5" aria-hidden>
          {TILES.map((t, i) => (
            <span
              key={t.title}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{ width: i === active ? "18px" : "6px", backgroundColor: i === active ? t.tone : "#E4ECFF" }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
