"use client"

import { Headphones, FileText, Megaphone, Settings, BarChart3, MessageCircle, Bot } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type RingNode = { icon: LucideIcon; label: string; angle: number }

// Three concentric rings of module icons around a fixed central hub, each
// ring dashed with faint tick marks and rotating independently — outer and
// inner turn anti-clockwise, the middle ring turns clockwise — icons
// counter-rotating so they stay upright as they travel.
const OUTER_R = 46
const MIDDLE_R = 33
const INNER_R = 20

const outerNodes: RingNode[] = [
  { icon: Headphones, label: "Support Agent", angle: -90 },
  { icon: Settings, label: "Ops Agent", angle: 90 },
]

const middleNodes: RingNode[] = [
  { icon: Megaphone, label: "Marketing Agent", angle: 30 },
  { icon: BarChart3, label: "Analytics Agent", angle: 210 },
]

const innerNodes: RingNode[] = [
  { icon: FileText, label: "Content Agent", angle: 45 },
  { icon: MessageCircle, label: "Sales Agent", angle: 225 },
]

function pointOnRing(radius: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: 50 + radius * Math.cos(rad), y: 50 + radius * Math.sin(rad) }
}

// Faint evenly-spaced tick dots around a ring, for extra gauge-like detail.
function ticksFor(radius: number, count: number) {
  return Array.from({ length: count }, (_, i) => pointOnRing(radius, (360 / count) * i))
}

const outerTicks = ticksFor(OUTER_R, 16)
const middleTicks = ticksFor(MIDDLE_R, 12)
const innerTicks = ticksFor(INNER_R, 8)

type RingSize = "outer" | "middle" | "inner"

const RING_CONFIG: Record<RingSize, { radius: number; counterClass: string; tileClass: string; iconClass: string }> = {
  outer: { radius: OUTER_R, counterClass: "orbit-icon-counter", tileClass: "size-14", iconClass: "size-6" },
  middle: { radius: MIDDLE_R, counterClass: "orbit-icon-counter-fast", tileClass: "size-12", iconClass: "size-5" },
  inner: { radius: INNER_R, counterClass: "orbit-icon-counter-fastest", tileClass: "size-10", iconClass: "size-5" },
}

function RingIcons({ nodes, ring }: { nodes: RingNode[]; ring: RingSize }) {
  const { radius, counterClass, tileClass, iconClass } = RING_CONFIG[ring]
  return (
    <>
      {nodes.map((n, i) => {
        const p = pointOnRing(radius, n.angle)
        const Icon = n.icon
        return (
          <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            <div className={counterClass}>
              <div className="flex flex-col items-center gap-2">
                <div className="relative flex items-center justify-center">
                  <span aria-hidden className={`absolute ${tileClass} scale-110 rounded-full opacity-40 blur-sm`} style={{ backgroundColor: "#BFD6FF" }} />
                  <div
                    className={`relative flex ${tileClass} items-center justify-center rounded-2xl bg-white`}
                    style={{ border: "1px solid #E4ECFF", boxShadow: "0 10px 24px rgba(37,99,235,0.16)" }}
                  >
                    <Icon className={iconClass} style={{ color: "#2563EB" }} strokeWidth={1.8} aria-hidden />
                  </div>
                </div>
                <p
                  className="whitespace-nowrap rounded-full bg-white px-3 py-1 text-center text-[11px] font-semibold"
                  style={{ color: "#0F172A", boxShadow: "0 6px 14px rgba(15,23,42,0.08)" }}
                >
                  {n.label}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export function MultiAgentHub() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      {/* dashed ring guides + tick marks */}
      <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
        <circle cx={50} cy={50} r={OUTER_R} fill="none" stroke="#A8C5FF" strokeWidth={0.9} strokeDasharray="1.8 2" />
        <circle cx={50} cy={50} r={MIDDLE_R} fill="none" stroke="#8FB4FF" strokeWidth={0.9} strokeDasharray="1.6 1.9" />
        <circle cx={50} cy={50} r={INNER_R} fill="none" stroke="#6B9BFF" strokeWidth={0.9} strokeDasharray="1.4 1.7" />

        {[...outerTicks, ...middleTicks, ...innerTicks].map((t, i) => (
          <circle key={i} cx={t.x} cy={t.y} r={0.5} fill="#5B8DEF" fillOpacity={0.85} />
        ))}
      </svg>

      {/* outer ring — rotates anti-clockwise */}
      <div className="orbit-ring absolute inset-0 z-10">
        <RingIcons nodes={outerNodes} ring="outer" />
      </div>

      {/* middle ring — rotates clockwise */}
      <div className="orbit-ring-fast absolute inset-0 z-10">
        <RingIcons nodes={middleNodes} ring="middle" />
      </div>

      {/* inner ring — rotates anti-clockwise, fastest */}
      <div className="orbit-ring-fastest absolute inset-0 z-10">
        <RingIcons nodes={innerNodes} ring="inner" />
      </div>

      {/* soft symmetric glow behind the hub, breathing gently */}
      <div
        aria-hidden
        className="animate-breathe absolute left-1/2 top-1/2 z-10 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{ backgroundColor: "#BFD6FF" }}
      />

      {/* hub — fixed circular chip at the centre */}
      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div
          className="flex size-24 items-center justify-center rounded-full"
          style={{
            background: "linear-gradient(135deg, #4F8DFF, #2563EB)",
            border: "3px solid rgba(255,255,255,0.55)",
            boxShadow: "0 20px 45px rgba(37,99,235,0.45)",
          }}
        >
          <Bot className="size-10 text-white" strokeWidth={1.8} aria-hidden />
        </div>
      </div>
    </div>
  )
}
