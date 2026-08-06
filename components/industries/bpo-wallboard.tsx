"use client"

// A custom hero visual built specifically for BPO & call-centre content: a
// "neural call network" — a pulsing central hub with six capability nodes
// orbiting it, each connected by an animated line that continuously carries
// a traveling pulse of light into the hub (representing calls flowing in).
// Every piece of the graphic is in motion — the aurora backdrop drifts, the
// halo of particles rotates, each node bobs and pops in, the connecting
// lines pulse, and a live call-line ticker cycles at the bottom — so unlike
// a static screenshot, nothing here ever sits still.

import { useEffect, useState } from "react"
import { BarChart3, Clock, Globe2, Headphones, ShieldCheck, Star, Zap } from "lucide-react"

const CENTER = 200
const RADIUS = 148

const NODES = [
  { angle: -90, Icon: Globe2, label: "Multilingual", tint: "from-blue-500 to-sky-400", delay: 0 },
  { angle: -30, Icon: Zap, label: "< 3s response", tint: "from-amber-500 to-orange-400", delay: 0.15 },
  { angle: 30, Icon: BarChart3, label: "Live analytics", tint: "from-emerald-500 to-teal-400", delay: 0.3 },
  { angle: 90, Icon: ShieldCheck, label: "TRAI compliant", tint: "from-sky-500 to-blue-400", delay: 0.45 },
  { angle: 150, Icon: Star, label: "4.6 CSAT", tint: "from-pink-500 to-rose-400", delay: 0.6 },
  { angle: 210, Icon: Clock, label: "24/7 coverage", tint: "from-violet-500 to-purple-400", delay: 0.75 },
]

const HALO_DOTS = Array.from({ length: 18 }, (_, i) => i)

const TICKER_LINES = [
  "“Namaste, IT helpdesk se baat kar rahi hoon…”",
  "“Your order has been dispatched, tracking sent via SMS.”",
  "“I've flagged this for a senior agent — 2 minutes.”",
  "“Refund initiated, funds in 3–5 business days.”",
]

function toXY(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: CENTER + radius * Math.cos(rad), y: CENTER + radius * Math.sin(rad) }
}

export function BpoWallboard() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % TICKER_LINES.length), 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/70 to-sky-50 px-4 py-6 sm:px-6 sm:py-8">
      {/* Drifting aurora blobs — three colours on independent cycles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -left-10 top-6 size-52 rounded-full bg-blue-400/25 blur-3xl motion-safe:animate-[breathe_8s_ease-in-out_infinite]" />
        <span
          style={{ animationDelay: "1.2s" }}
          className="absolute -right-8 top-16 size-44 rounded-full bg-emerald-400/20 blur-3xl motion-safe:animate-[breathe_10s_ease-in-out_infinite]"
        />
        <span
          style={{ animationDelay: "2.4s" }}
          className="absolute bottom-4 left-1/3 size-48 rounded-full bg-violet-400/20 blur-3xl motion-safe:animate-[breathe_11s_ease-in-out_infinite]"
        />
      </div>

      {/* Network diagram */}
      <div className="relative mx-auto mt-2 grid aspect-square w-full max-w-[300px] shrink-0 place-items-center sm:max-w-[330px]">
        {/* Rotating halo of particles */}
        <div
          aria-hidden
          className="absolute inset-0 motion-safe:animate-[ind-spin_22s_linear_infinite]"
        >
          {HALO_DOTS.map((i) => {
            const { x, y } = toXY((360 / HALO_DOTS.length) * i, 49)
            return (
              <span
                key={i}
                className="absolute size-[3px] rounded-full bg-blue-400/50"
                style={{ left: `${x / 4}%`, top: `${y / 4}%`, transform: "translate(-50%, -50%)" }}
              />
            )
          })}
        </div>

        {/* Connecting lines with a traveling pulse of light per node */}
        <svg viewBox="0 0 400 400" className="absolute inset-0 size-full" aria-hidden>
          <defs>
            <radialGradient id="pulseGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="1" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </radialGradient>
          </defs>
          {NODES.map((n, i) => {
            const { x, y } = toXY(n.angle, RADIUS)
            return (
              <g key={i}>
                <line x1={x} y1={y} x2={CENTER} y2={CENTER} stroke="#93c5fd" strokeOpacity="0.45" strokeWidth="1.5" />
                <circle r="6" fill="url(#pulseGlow)">
                  <animateMotion
                    dur="2.6s"
                    begin={`${n.delay}s`}
                    repeatCount="indefinite"
                    path={`M${x},${y} L${CENTER},${CENTER}`}
                  />
                </circle>
              </g>
            )
          })}
        </svg>

        {/* Capability nodes */}
        {NODES.map((n, i) => {
          const { x, y } = toXY(n.angle, RADIUS)
          const floatClass = i % 2 === 0 ? "hero-float-up" : "hero-float-down"
          return (
            <div
              key={n.label}
              style={{ left: `${x / 4}%`, top: `${y / 4}%`, animationDelay: `${n.delay}s` }}
              className={`card-pop-in absolute -translate-x-1/2 -translate-y-1/2 ${floatClass}`}
            >
              <div className="flex flex-col items-center gap-1">
                <span
                  className={`relative grid size-9 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg sm:size-11 ${n.tint}`}
                >
                  <span
                    aria-hidden
                    style={{ animationDelay: `${n.delay}s` }}
                    className="absolute inset-0 rounded-2xl bg-white/30 motion-safe:animate-[ind-ping_2.8s_ease-out_infinite]"
                  />
                  <n.Icon className="relative size-4 sm:size-5" aria-hidden />
                </span>
                <span className="whitespace-nowrap rounded-full bg-white/90 px-2 py-0.5 text-[8.5px] font-bold text-slate-700 shadow-sm ring-1 ring-slate-200/70 sm:text-[9.5px]">
                  {n.label}
                </span>
              </div>
            </div>
          )
        })}

        {/* Centre hub */}
        <span className="relative z-10 grid size-16 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-[0_16px_36px_-10px_rgba(37,99,235,0.75)] sm:size-[76px]">
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-blue-500/35 motion-safe:animate-[ind-ping_2.4s_ease-out_infinite]"
          />
          <span
            aria-hidden
            className="absolute -inset-2 rounded-full border border-blue-300/50 motion-safe:animate-[breathe_4s_ease-in-out_infinite]"
          />
          <Headphones className="relative size-7 sm:size-8" aria-hidden />
        </span>
      </div>

      {/* Live call-line ticker — cycles continuously, nothing static */}
      <div className="relative mt-3 w-full max-w-[380px] overflow-hidden rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="flex size-2 shrink-0" aria-hidden>
            <span className="absolute inline-flex size-2 animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <p className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400 sm:text-[10px]">Live on call</p>
          <span className="ml-auto flex h-3.5 items-end gap-[2px]" aria-hidden>
            {[6, 11, 5, 13, 8].map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
                className="ind-eq w-[2.5px] rounded-full bg-gradient-to-t from-sky-500 to-blue-600"
              />
            ))}
          </span>
        </div>
        <p className="relative mt-1.5 h-4 overflow-hidden text-[11px] font-medium text-slate-600 sm:text-[12px]">
          {TICKER_LINES.map((line, i) => (
            <span
              key={line}
              className="absolute inset-0 truncate transition-all duration-500"
              style={{
                opacity: tick === i ? 1 : 0,
                transform: `translateY(${tick === i ? 0 : 8}px)`,
              }}
            >
              {line}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}
