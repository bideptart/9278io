"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Headphones, FileText, Megaphone, Settings, BarChart3, MessageCircle, Bot } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type Node = { icon: LucideIcon; label: string; angle: number }

const RING_R = 42
const HUB_R = 14
const NODE_R = 8.5
const CYCLE_MS = 2400

// The 6 agents plus the account/hub identity itself — all 7 take turns
// occupying the centre. "bot" means the account icon is currently there.
type Slot = "bot" | number

const nodes: Node[] = [
  { icon: Headphones, label: "Support Agent", angle: -90 },
  { icon: FileText, label: "Content Agent", angle: -30 },
  { icon: Megaphone, label: "Marketing Agent", angle: 30 },
  { icon: Settings, label: "Ops Agent", angle: 90 },
  { icon: BarChart3, label: "Analytics Agent", angle: 150 },
  { icon: MessageCircle, label: "Sales Agent", angle: 210 },
]

const cx = 50
const cy = 50

function pointOnRing(radius: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) }
}

function iconFor(slot: Slot): LucideIcon {
  return slot === "bot" ? Bot : nodes[slot].icon
}

function labelFor(slot: Slot): string {
  return slot === "bot" ? "Your Account" : nodes[slot].label
}

export function MultiAgentHub() {
  // slots[0] = whoever is currently in the hub; slots[1..6] = the six ring positions.
  const [slots, setSlots] = useState<Slot[]>(["bot", 0, 1, 2, 3, 4, 5])
  // Which node index (0-5) is mid-swap right now, so its connector line can
  // light up to show the two points that are trading places.
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  // Plain counter, not React state — it only decides which ring index to swap
  // next and never needs to trigger a render itself. Keeping it out of
  // setState avoids a side-effect-inside-an-updater bug: React (in Strict
  // Mode) invokes state updaters twice to catch impurities, which was
  // silently double-swapping the same pair back to where it started.
  const stepRef = useRef(0)

  useEffect(() => {
    const id = setInterval(() => {
      stepRef.current += 1
      const ringIndex = 1 + (stepRef.current % nodes.length)
      setSlots((prev) => {
        const copy = [...prev]
        ;[copy[0], copy[ringIndex]] = [copy[ringIndex], copy[0]]
        return copy
      })
      setActiveIndex(ringIndex - 1)
    }, CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      {/* rotating ring — boundary, connectors, and node slots all revolve together, slowly */}
      <div className="orbit-ring absolute inset-0 z-10">
        <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
          <circle cx={cx} cy={cy} r={RING_R} fill="none" stroke="#D6E4FF" strokeWidth={0.6} />
          {nodes.map((n, i) => {
            const start = pointOnRing(HUB_R, n.angle)
            const end = pointOnRing(RING_R - NODE_R, n.angle)
            const dot = pointOnRing((HUB_R + (RING_R - NODE_R)) / 2, n.angle)
            const isActive = activeIndex === i
            return (
              <g key={n.angle}>
                <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="#A8C5FF" strokeWidth={0.7} strokeDasharray="1.2 2" strokeLinecap="round" />

                {/* the connector's own dot — travels node-to-hub when this pair is swapping, otherwise rests at the midpoint */}
                <motion.circle
                  r={1}
                  fill="#2563EB"
                  animate={
                    isActive
                      ? { cx: [end.x, start.x, dot.x], cy: [end.y, start.y, dot.y], r: [1, 1.6, 1] }
                      : { cx: dot.x, cy: dot.y, r: 1 }
                  }
                  transition={isActive ? { duration: 0.9, times: [0, 0.85, 1], ease: [0.22, 1, 0.36, 1] } : { duration: 0.4 }}
                />
              </g>
            )
          })}
        </svg>

        {/* ring node slots — content (icon + label) swaps with the hub each cycle */}
        {nodes.map((n, i) => {
          const p = pointOnRing(RING_R, n.angle)
          const slot = slots[1 + i]
          const Icon = iconFor(slot)
          return (
            <div key={n.angle} className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:-translate-y-[calc(50%+4px)]" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
              <div className="orbit-icon-counter flex flex-col items-center gap-2">
                <div className="relative flex size-14 items-center justify-center overflow-hidden rounded-full bg-white" style={{ boxShadow: "0 10px 22px rgba(37,99,235,0.16)" }}>
                  {/* ripple pulse announcing a fresh arrival */}
                  <motion.span
                    key={`ping-${slot}`}
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{ backgroundColor: "#2563EB" }}
                    initial={{ opacity: 0.35, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.7 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={slot}
                      initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    >
                      <Icon className="size-6" style={{ color: "#2563EB" }} strokeWidth={1.8} aria-hidden />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={slot}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4 }}
                    className="whitespace-nowrap rounded-full bg-white px-3 py-1 text-center text-[11px] font-semibold"
                    style={{ color: "#0F172A", boxShadow: "0 6px 14px rgba(15,23,42,0.08)" }}
                  >
                    {labelFor(slot)}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          )
        })}
      </div>

      {/* soft ambient glow behind the hub, breathing gently */}
      <div
        aria-hidden
        className="animate-breathe absolute left-1/2 top-1/2 z-10 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{ backgroundColor: "#BFD6FF" }}
      />

      {/* glossy 3D sphere hub — fixed in place, its icon swaps with a ring slot each cycle */}
      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div
          className="relative flex size-28 items-center justify-center overflow-hidden rounded-full"
          style={{
            background: "radial-gradient(circle at 34% 28%, #8FB4FF 0%, #2563EB 55%, #163E9E 100%)",
            boxShadow: "0 26px 55px rgba(37,99,235,0.5), inset 0 -10px 18px rgba(0,0,0,0.18)",
          }}
        >
          <span
            aria-hidden
            className="absolute -left-3 -top-5 size-16 rounded-full opacity-70 blur-md"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.95), transparent 70%)" }}
          />
          {/* ripple pulse announcing a fresh arrival */}
          <motion.span
            key={`ping-${slots[0]}`}
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full bg-white"
            initial={{ opacity: 0.3, scale: 1 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
          <AnimatePresence mode="wait" initial={false}>
            {(() => {
              const HubIcon = iconFor(slots[0])
              return (
                <motion.div
                  key={slots[0]}
                  initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="relative"
                >
                  <HubIcon className="size-11 text-white" strokeWidth={1.8} aria-hidden />
                </motion.div>
              )
            })()}
          </AnimatePresence>
        </div>

        {/* what the hub is currently showing — keeps the swap legible instead of just an icon */}
        <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={slots[0]}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.4 }}
              className="whitespace-nowrap rounded-full px-3.5 py-1.5 text-center text-xs font-bold text-white"
              style={{ backgroundColor: "#2563EB", boxShadow: "0 8px 18px rgba(37,99,235,0.4)" }}
            >
              {labelFor(slots[0])}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
