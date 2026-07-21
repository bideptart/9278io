"use client"

import { motion } from "motion/react"
import { Phone, UserRound, CreditCard, Globe2, MessageSquare, CalendarCheck, Mic, Check, Zap } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type NodeColor = "blue" | "violet" | "amber" | "cyan" | "emerald" | "pink"
type Node = {
  x: number
  y: number
  icon: LucideIcon
  delay: number
  color: NodeColor
  label: string
  tip: string
  side: "above" | "below"
}

/* Literal classes (not templated) so Tailwind's scanner keeps them. */
const NODE_STYLES: Record<NodeColor, { border: string; icon: string; badge: string }> = {
  blue: { border: "border-blue-200", icon: "text-blue-600", badge: "bg-blue-600" },
  violet: { border: "border-violet-200", icon: "text-violet-600", badge: "bg-violet-600" },
  amber: { border: "border-amber-200", icon: "text-amber-600", badge: "bg-amber-600" },
  cyan: { border: "border-cyan-200", icon: "text-cyan-600", badge: "bg-cyan-600" },
  emerald: { border: "border-emerald-200", icon: "text-emerald-600", badge: "bg-emerald-600" },
  pink: { border: "border-pink-200", icon: "text-pink-600", badge: "bg-pink-600" },
}

/* White icon cards placed around the orb (percent coords) — 3 left, 3 right.
   tip = one-line hover copy; side = which way the tooltip opens, chosen per
   row so it never opens off the top/bottom edge of the illustration. */
const nodes: Node[] = [
  { x: 12, y: 16, icon: Phone, delay: 0, color: "blue", label: "Calls", tip: "Inbound & outbound calls in 10+ Indian languages", side: "above" },
  { x: 6, y: 50, icon: UserRound, delay: 0.6, color: "violet", label: "Profiles", tip: "Remembers caller history & details automatically", side: "above" },
  { x: 14, y: 84, icon: CalendarCheck, delay: 1.1, color: "amber", label: "Scheduling", tip: "Books, reschedules & confirms appointments live", side: "above" },
  { x: 88, y: 16, icon: CreditCard, delay: 1.4, color: "cyan", label: "Payments", tip: "Sends EMI & payment reminders right on schedule", side: "above" },
  { x: 94, y: 50, icon: Globe2, delay: 0.9, color: "emerald", label: "Languages", tip: "Switches fluently between Hindi, Tamil, Telugu & more", side: "above" },
  { x: 86, y: 84, icon: MessageSquare, delay: 1.7, color: "pink", label: "Messages", tip: "Follows up over SMS & WhatsApp after every call", side: "above" },
]

/* Gentle curved wire from a node to the center orb — bows left-side nodes one
   way and right-side nodes the other so the whole fan reads as one direction. */
function curvePath(x: number, y: number) {
  const cx = 50
  const cy = 50
  const mx = (cx + x) / 2
  const my = (cy + y) / 2
  const dx = x - cx
  const dy = y - cy
  const len = Math.hypot(dx, dy) || 1
  const bow = x < cx ? 6 : -6
  const px = (-dy / len) * bow
  const py = (dx / len) * bow
  return `M${x},${y} Q${mx + px},${my + py} ${cx},${cy}`
}

/* Green voice waveform inside the dark orb */
function OrbWave() {
  const bars = [14, 25, 36, 19, 30, 16, 27, 36, 22, 30, 16, 25]
  return (
    <div className="flex h-12 items-center gap-1" aria-hidden>
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full bg-primary"
          style={{ height: h, transformOrigin: "center" }}
          animate={{ scaleY: [0.3, 1, 0.5, 0.9, 0.3] }}
          transition={{ duration: 0.9 + (i % 4) * 0.16, repeat: Infinity, ease: "easeInOut", delay: i * 0.07 }}
        />
      ))}
    </div>
  )
}

export function AgentShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto w-full max-w-[540px] lg:ml-auto lg:-mr-12"
    >
      <div className="relative aspect-[7/5] w-full">
        {/* decorative green blobs */}
        <div aria-hidden className="pointer-events-none absolute -right-6 -top-6 size-40 rounded-full bg-blue-200/45 blur-2xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-8 -left-6 size-40 rounded-full bg-blue-200/45 blur-2xl" />
        {/* dotted grid accents */}
        {[
          "right-2 top-1 h-10 w-14",
          "bottom-2 left-1 h-10 w-14",
        ].map((c, i) => (
          <div
            key={i}
            aria-hidden
            className={`pointer-events-none absolute ${c} opacity-70`}
            style={{
              backgroundImage: "radial-gradient(oklch(0.6 0.17 255 / 0.55) 1.2px, transparent 1.2px)",
              backgroundSize: "9px 9px",
            }}
          />
        ))}

        {/* connecting lines — curved wires with a pulse travelling to the orb */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          {nodes.map((n) => {
            const d = curvePath(n.x, n.y)
            return (
              <g key={n.delay}>
                <path d={d} fill="none" stroke="oklch(0.5 0.02 260 / 0.3)" strokeWidth="0.4" />
                <circle r="0.9" fill="oklch(0.55 0.2 262)">
                  <animateMotion dur="2.6s" begin={`${n.delay}s`} repeatCount="indefinite" path={d} />
                </circle>
              </g>
            )
          })}
        </svg>

        {/* center dark orb */}
        <div className="absolute left-1/2 top-1/2 z-10 flex aspect-square w-[36%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          {/* soft green glow under orb */}
          <div aria-hidden className="absolute inset-2 rounded-full bg-primary/30 blur-2xl" />
          <div
            className="relative flex h-full w-full items-center justify-center rounded-full ring-1 ring-blue-100"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, #ffffff, oklch(0.94 0.035 250) 52%, oklch(0.86 0.07 255) 100%)",
              boxShadow:
                "0 34px 70px -22px oklch(0.55 0.2 262 / 0.45), inset 0 2px 8px rgba(255,255,255,0.85)",
            }}
          >
            {/* sonar pings — animated with framer-motion (inline styles) rather
                than a CSS keyframe class, so the motion never depends on a
                stylesheet rebuild */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
              {[0, 1.3].map((delay) => (
                <motion.circle
                  key={delay}
                  cx="50"
                  cy="50"
                  r="14"
                  fill="none"
                  stroke="oklch(0.55 0.2 262 / 0.45)"
                  strokeWidth="1"
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  animate={{ scale: [0.6, 1.7], opacity: [0.55, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay }}
                />
              ))}
            </svg>

            {/* waveform + mic */}
            <div className="relative flex items-center justify-center">
              <OrbWave />
              <span className="absolute flex size-12 items-center justify-center rounded-full bg-white text-primary shadow-[0_4px_12px_-4px_oklch(0.55_0.2_262/0.5)] ring-1 ring-primary/15">
                <Mic className="size-6" aria-hidden />
              </span>
            </div>
          </div>

          {/* latency + live badges */}
          <span className="absolute -top-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-semibold text-foreground shadow-[0_8px_20px_-10px_oklch(0.15_0.02_260/0.35)]">
            <Zap className="size-3 text-primary" aria-hidden /> &lt;300ms latency
          </span>
          <span className="absolute -bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-600 shadow-[0_8px_20px_-10px_oklch(0.15_0.02_260/0.35)]">
            <motion.span
              className="size-1.5 rounded-full bg-emerald-500"
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            Live
          </span>
        </div>

        {/* colour-coded icon cards, each with a hover/focus tooltip */}
        {nodes.map((n) => {
          const Icon = n.icon
          const style = NODE_STYLES[n.color]
          const tipBelow = n.side === "below"
          return (
            <motion.div
              key={`card-${n.delay}`}
              className="group absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4.5 + n.delay, repeat: Infinity, ease: "easeInOut", delay: n.delay }}
            >
              <div className="relative">
                <div
                  tabIndex={0}
                  className={`relative flex size-12 items-center justify-center rounded-2xl border bg-white shadow-[0_14px_34px_-16px_oklch(0.55_0.18_260/0.4)] outline-none transition-transform duration-200 hover:scale-110 focus-visible:scale-110 ${style.border}`}
                >
                  <Icon className={`size-5 ${style.icon}`} aria-hidden />
                  <span className={`absolute -left-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full ring-2 ring-white ${style.badge}`}>
                    <Check className="size-3 text-white" aria-hidden />
                  </span>
                </div>

                {/* tooltip */}
                <div
                  className={`pointer-events-none absolute left-1/2 z-30 w-44 -translate-x-1/2 opacity-0 transition-all duration-200 ease-out group-hover:opacity-100 group-focus-within:opacity-100 ${
                    tipBelow
                      ? "top-[calc(100%+10px)] translate-y-1 group-hover:translate-y-0 group-focus-within:translate-y-0"
                      : "bottom-[calc(100%+10px)] -translate-y-1 group-hover:translate-y-0 group-focus-within:translate-y-0"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute left-1/2 size-2 -translate-x-1/2 rotate-45 border bg-white ${style.border} ${
                      tipBelow ? "-top-1 border-b-0 border-r-0" : "-bottom-1 border-l-0 border-t-0"
                    }`}
                  />
                  <div className="relative rounded-xl border border-border bg-white px-3 py-2 shadow-lg">
                    <p className={`text-[11px] font-semibold ${style.icon}`}>{n.label}</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{n.tip}</p>
                  </div>
                </div>
              </div>

              <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground backdrop-blur-sm">
                {n.label}
              </span>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
