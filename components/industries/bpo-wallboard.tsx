"use client"

// A custom, code-drawn hero visual built specifically for BPO & call-centre
// content — a "live call radar" rather than a photo or a generic dashboard
// mockup. Every ring, sweep, and blip is plain CSS/SVG so it stays crisp at
// any size, and it uses the site's own established motion vocabulary
// (ind-ping, ind-eq, bar-grow, card-pop-in) so it reads as part of the same
// design system, not a bolted-on widget. The only real client-side logic is
// the count-up on "Calls answered today".

import { useEffect, useRef, useState } from "react"
import { Headphones, PhoneCall } from "lucide-react"

// Six "incoming call" blips placed evenly around the radar, each on its own
// pulse rhythm so the sweep never looks mechanically synced.
const BLIPS = [
  { angle: -35, radius: 78, delay: 0, size: "size-3" },
  { angle: 40, radius: 92, delay: 0.6, size: "size-2.5" },
  { angle: 110, radius: 70, delay: 1.2, size: "size-3" },
  { angle: 165, radius: 95, delay: 1.8, size: "size-2" },
  { angle: 225, radius: 82, delay: 0.3, size: "size-2.5" },
  { angle: 290, radius: 65, delay: 1.5, size: "size-2" },
]

const STATS = [
  { label: "Agents online", value: "38" },
  { label: "Avg. wait", value: "6s" },
]

function useCountUp(target: number, durationMs = 1600) {
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    const start = performance.now()
    let frame: number
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, durationMs])

  return value
}

export function BpoWallboard() {
  const callsToday = useCountUp(2847)

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white via-blue-50/50 to-sky-50/60 px-6 py-8">
      {/* Ambient glow behind the radar */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[38%] -z-10 size-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.14),transparent)] motion-safe:animate-[breathe_7s_ease-in-out_infinite]"
      />

      {/* Live badge */}
      <span className="mb-6 flex items-center gap-1.5 rounded-full border border-blue-200/70 bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 shadow-sm backdrop-blur">
        <span className="relative flex size-2" aria-hidden>
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-red-500" />
        </span>
        Live call radar
      </span>

      {/* Radar */}
      <div className="relative grid size-[240px] shrink-0 place-items-center sm:size-[270px]">
        {/* Concentric rings */}
        {[1, 0.72, 0.44].map((scale, i) => (
          <span
            key={i}
            aria-hidden
            className="absolute rounded-full border border-blue-300/40"
            style={{ width: `${scale * 100}%`, height: `${scale * 100}%` }}
          />
        ))}

        {/* Rotating sweep, clipped to the radar circle */}
        <div
          aria-hidden
          className="absolute inset-0 overflow-hidden rounded-full motion-safe:animate-[ind-spin_4s_linear_infinite]"
          style={{
            background: "conic-gradient(from 0deg, rgba(37,99,235,0.32), transparent 32%, transparent 100%)",
          }}
        />

        {/* Blips — each an incoming call detected on the radar */}
        {BLIPS.map((b, i) => {
          const rad = (b.angle * Math.PI) / 180
          const x = 50 + (b.radius / 2.7) * Math.cos(rad)
          const y = 50 + (b.radius / 2.7) * Math.sin(rad)
          return (
            <span
              key={i}
              aria-hidden
              className="absolute"
              style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
            >
              <span
                style={{ animationDelay: `${b.delay}s` }}
                className={`absolute inset-0 rounded-full bg-blue-500/40 motion-safe:animate-[ind-ping_2.2s_ease-out_infinite] ${b.size}`}
              />
              <span className={`relative block rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)] ${b.size}`} />
            </span>
          )
        })}

        {/* Centre hub */}
        <span className="relative z-10 grid size-16 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-[0_12px_30px_-8px_rgba(37,99,235,0.7)] sm:size-[72px]">
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-blue-500/30 motion-safe:animate-[ind-ping_2.6s_ease-out_infinite]"
          />
          <Headphones className="relative size-7 sm:size-8" aria-hidden />
        </span>
      </div>

      {/* Calls answered today */}
      <div className="mt-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Calls answered today</p>
        <p className="mt-1 bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text font-serif text-[2.25rem] font-black leading-none tabular-nums text-transparent sm:text-[2.6rem]">
          {callsToday.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Stat chips + live waveform */}
      <div className="mt-5 flex w-full max-w-[360px] items-center justify-between gap-3">
        {STATS.map((s, i) => (
          <span
            key={s.label}
            style={{ animationDelay: `${i * 0.1}s` }}
            className="card-pop-in rounded-2xl border border-slate-200/70 bg-white/90 px-3.5 py-2 text-center shadow-sm backdrop-blur"
          >
            <span className="block font-serif text-base font-extrabold text-slate-900">{s.value}</span>
            <span className="block text-[9.5px] font-medium text-slate-500">{s.label}</span>
          </span>
        ))}
        <span
          style={{ animationDelay: "0.2s" }}
          className="card-pop-in flex items-center gap-2 rounded-2xl border border-slate-200/70 bg-white/90 px-3.5 py-2 shadow-sm backdrop-blur"
        >
          <PhoneCall className="size-3.5 text-blue-600" aria-hidden />
          <span className="flex h-4 items-end gap-[2.5px]" aria-hidden>
            {[7, 12, 6, 14, 9].map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
                className="ind-eq w-[2.5px] rounded-full bg-gradient-to-t from-sky-500 to-blue-600"
              />
            ))}
          </span>
        </span>
      </div>
    </div>
  )
}
