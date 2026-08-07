"use client"

// BPO hero visual — a "call journey" concept, distinct from every earlier
// attempt on this component (dashboard, radar, network diagram, blob+glass,
// illustrated character, glowing orb, and the Features-page blueprint
// style): a glowing core sending out expanding sound-wave rings, with a
// flowing path showing a call traveling through the system — from
// "Incoming" through two capability waypoints to "Resolved" — a light
// travels the path continuously and each waypoint pulses awake as it
// passes. Every element moves on its own independent, continuous rhythm.

import { useEffect, useState, type CSSProperties } from "react"
import { CheckCircle2, Globe2, Headphones, PhoneIncoming, Route } from "lucide-react"

const PATH_D = "M20,178 C55,120 60,60 130,58 C200,56 205,150 250,150"

const WAYPOINTS = [
  { Icon: PhoneIncoming, label: "Incoming", cx: 20, cy: 178, tint: "from-sky-500 to-blue-500", delay: 0 },
  { Icon: Route, label: "Routed", cx: 84, cy: 92, tint: "from-violet-500 to-fuchsia-400", delay: 0.9 },
  { Icon: Globe2, label: "10+ languages", cx: 165, cy: 57, tint: "from-emerald-500 to-teal-400", delay: 1.8 },
  { Icon: CheckCircle2, label: "Resolved", cx: 250, cy: 150, tint: "from-blue-600 to-sky-500", delay: 2.7 },
]

const CAPTION_LINES = [
  "Namaste! IT helpdesk se baat kar rahi hoon…",
  "Your refund has been initiated successfully.",
  "Connecting you to a specialist right away.",
]

function useTypewriter(lines: string[], typeMs = 42, holdMs = 1400, eraseMs = 22) {
  const [lineIndex, setLineIndex] = useState(0)
  const [text, setText] = useState("")

  useEffect(() => {
    let cancelled = false
    const full = lines[lineIndex]
    let i = 0
    let timer: ReturnType<typeof setTimeout>

    const typeStep = () => {
      if (cancelled) return
      i += 1
      setText(full.slice(0, i))
      timer = setTimeout(i < full.length ? typeStep : eraseStep, i < full.length ? typeMs : holdMs)
    }
    const eraseStep = () => {
      if (cancelled) return
      i -= 1
      setText(full.slice(0, Math.max(i, 0)))
      if (i > 0) timer = setTimeout(eraseStep, eraseMs)
      else setLineIndex((li) => (li + 1) % lines.length)
    }

    timer = setTimeout(typeStep, typeMs)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineIndex])

  return text
}

export function BpoWallboard() {
  const caption = useTypewriter(CAPTION_LINES)

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white via-blue-50/50 to-sky-50/60 px-5 py-8">
      {/* Deep ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[40%] -z-10 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.22),transparent)] blur-2xl motion-safe:animate-[breathe_6s_ease-in-out_infinite]"
      />

      {/* Journey diagram */}
      <div className="relative w-full max-w-[280px]" style={{ aspectRatio: "270 / 210" }}>
        {/* Expanding sound-wave rings from the centre of the journey */}
        <div aria-hidden className="pointer-events-none absolute left-[48%] top-[42%] -translate-x-1/2 -translate-y-1/2">
          {[0, 0.7, 1.4].map((d) => (
            <span
              key={d}
              style={{ animationDelay: `${d}s` }}
              className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/50 motion-safe:animate-[ind-ping_2.8s_ease-out_infinite]"
            />
          ))}
        </div>

        {/* Flowing path + traveling light */}
        <svg viewBox="0 0 270 210" className="absolute inset-0 size-full" aria-hidden>
          <defs>
            <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <radialGradient id="travelGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="1" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d={PATH_D} fill="none" stroke="url(#pathGrad)" strokeOpacity="0.35" strokeWidth="2.5" strokeDasharray="1 7" strokeLinecap="round" />
          <circle r="7" fill="url(#travelGlow)">
            <animateMotion dur="3.6s" repeatCount="indefinite" path={PATH_D} />
          </circle>
          <circle r="3" fill="#2563eb">
            <animateMotion dur="3.6s" repeatCount="indefinite" path={PATH_D} />
          </circle>
        </svg>

        {/* Waypoint markers, positioned to match the SVG path (270x210 space, converted to %) */}
        {WAYPOINTS.map((w) => (
          <div
            key={w.label}
            className="card-pop-in absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(w.cx / 270) * 100}%`, top: `${(w.cy / 210) * 100}%`, animationDelay: `${w.delay}s` } as CSSProperties}
          >
            <div className="flex flex-col items-center gap-1">
              <span className={`relative grid size-9 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg sm:size-10 ${w.tint}`}>
                <span
                  aria-hidden
                  style={{ animationDelay: `${w.delay}s` }}
                  className="absolute inset-0 rounded-2xl bg-white/30 motion-safe:animate-[ind-ping_3s_ease-out_infinite]"
                />
                <w.Icon className="relative size-4 sm:size-4.5" aria-hidden />
              </span>
              <span className="whitespace-nowrap rounded-full bg-white/90 px-2 py-0.5 text-[8px] font-bold text-slate-700 shadow-sm ring-1 ring-slate-200/70 sm:text-[9px]">
                {w.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Centre hub — sits over the middle of the journey path */}
      <div className="pointer-events-none absolute left-1/2 top-[38%] z-20 -translate-x-1/2 -translate-y-1/2">
        <span className="relative grid size-16 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-[0_16px_36px_-10px_rgba(37,99,235,0.75)] sm:size-[72px]">
          <span aria-hidden className="absolute inset-0 rounded-full bg-blue-500/30 motion-safe:animate-[ind-ping_2.4s_ease-out_infinite]" />
          <Headphones className="relative size-7 sm:size-8" aria-hidden />
        </span>
      </div>

      {/* Live typewriter caption */}
      <div className="relative mt-4 w-full max-w-[380px] rounded-2xl border border-white/70 bg-white/85 px-4 py-2.5 shadow-lg backdrop-blur-md">
        <p className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-blue-600/80 sm:text-[10px]">
          <span className="relative flex size-1.5" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-red-500" />
          </span>
          AI voice agent — live
        </p>
        <p className="relative mt-1 h-4 truncate text-[11px] font-medium text-slate-700 sm:text-[12px]">
          {caption}
          <span className="ml-0.5 inline-block h-3 w-[2px] animate-pulse bg-blue-500 align-middle" aria-hidden />
        </p>
      </div>
    </div>
  )
}
