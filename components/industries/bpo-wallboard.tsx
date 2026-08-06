"use client"

// A custom, fully code-drawn "live ops wallboard" — built specifically for
// BPO & call-centre content (queue status, agent presence, call volume,
// multilingual support) rather than reusing a generic dashboard mockup.
// The only piece of real client-side logic is the count-up on "Calls
// answered today"; everything else is the same plain-CSS animation
// vocabulary (bar-grow, ind-eq, ind-ping, hero-float) already used across
// every other industry hero on this site.

import { useEffect, useRef, useState } from "react"
import { Headphones, PhoneCall } from "lucide-react"

const AGENTS = [
  { initials: "RA", tint: "from-blue-600 to-sky-500", onCall: true },
  { initials: "PK", tint: "from-emerald-500 to-emerald-600", onCall: false },
  { initials: "SN", tint: "from-violet-500 to-purple-500", onCall: false },
  { initials: "MJ", tint: "from-amber-500 to-orange-500", onCall: true },
  { initials: "TV", tint: "from-pink-500 to-rose-500", onCall: false },
]

const HOUR_BARS = [38, 52, 61, 45, 70, 84, 96, 73, 58]

const LANGUAGES = ["Hindi", "English", "Tamil", "Telugu", "Bengali"]

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
  const [activeLang, setActiveLang] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActiveLang((i) => (i + 1) % LANGUAGES.length), 1800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 p-5 text-white sm:p-7">
      {/* Faint scanning sweep drifting across the whole board — reads as a
          live monitoring wall, not a static screenshot. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent motion-safe:animate-[ind-shimmer_5s_linear_infinite]"
        style={{ backgroundSize: "200% auto" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-blue-500/20 blur-3xl motion-safe:animate-[breathe_9s_ease-in-out_infinite]"
      />

      {/* Header */}
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300/80 sm:text-xs">
            Live Ops Wallboard
          </p>
          <p className="mt-1 font-serif text-lg font-bold tracking-tight sm:text-xl">Call Centre — Floor 2</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-red-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-300 ring-1 ring-red-400/30 sm:text-[11px]">
          <span className="size-1.5 rounded-full bg-red-400 motion-safe:animate-pulse" aria-hidden />
          Live
        </span>
      </div>

      {/* Calls answered today — the one genuinely JS-animated element */}
      <div className="relative mt-5 sm:mt-6">
        <p className="text-[10.5px] font-medium uppercase tracking-wider text-white/50 sm:text-[11px]">
          Calls answered today
        </p>
        <p className="mt-1 font-serif text-[2.5rem] font-black leading-none tabular-nums sm:text-[3rem]">
          {callsToday.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Agent presence row */}
      <div className="relative mt-5 flex items-center gap-2.5 sm:mt-6 sm:gap-3">
        {AGENTS.map((agent, i) => (
          <span
            key={agent.initials}
            style={{ animationDelay: `${i * 0.1}s` }}
            className="card-pop-in relative grid size-9 shrink-0 place-items-center rounded-full sm:size-11"
          >
            <span
              className={`grid size-full place-items-center rounded-full bg-gradient-to-br text-[10px] font-bold text-white shadow-lg sm:text-xs ${agent.tint}`}
            >
              {agent.initials}
            </span>
            {agent.onCall ? (
              <span
                aria-hidden
                className="absolute -bottom-0.5 -right-0.5 grid size-3.5 place-items-center rounded-full bg-emerald-500 ring-2 ring-slate-900 sm:size-4"
              >
                <Headphones className="size-2 text-white sm:size-2.5" aria-hidden />
              </span>
            ) : (
              <span
                aria-hidden
                className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900 motion-safe:animate-pulse sm:size-3"
              />
            )}
          </span>
        ))}
        <span className="ml-1 text-[10px] font-medium text-white/50 sm:text-[11px]">+34 online</span>
      </div>

      {/* Call-volume bars */}
      <div className="relative mt-5 flex-1 sm:mt-6">
        <p className="text-[10.5px] font-medium uppercase tracking-wider text-white/50 sm:text-[11px]">
          Call volume — last 9 hours
        </p>
        <div className="mt-3 flex h-16 items-end gap-1.5 sm:h-20 sm:gap-2">
          {HOUR_BARS.map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%`, animationDelay: `${0.3 + i * 0.06}s` }}
              className="bar-grow flex-1 rounded-t-md bg-gradient-to-t from-blue-600 to-sky-400"
            />
          ))}
        </div>
      </div>

      {/* Footer: live call waveform + cycling language indicator */}
      <div className="relative mt-5 flex items-center justify-between gap-3 rounded-2xl bg-white/5 px-3.5 py-3 ring-1 ring-white/10 sm:mt-6 sm:px-4">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 sm:size-9">
            <PhoneCall className="size-4 text-white" aria-hidden />
          </span>
          <div>
            <p className="text-[10.5px] font-bold leading-tight sm:text-[12px]">Live call in progress</p>
            <p className="relative h-4 overflow-hidden text-[9.5px] font-medium text-white/50 sm:text-[10.5px]">
              {LANGUAGES.map((lang, i) => (
                <span
                  key={lang}
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    opacity: activeLang === i ? 1 : 0,
                    transform: `translateY(${activeLang === i ? 0 : 6}px)`,
                  }}
                >
                  Speaking in {lang}
                </span>
              ))}
            </p>
          </div>
        </div>
        <div className="flex h-5 items-end gap-[2.5px]" aria-hidden>
          {[8, 14, 7, 16, 10, 13, 6].map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
              className="ind-eq w-[3px] rounded-full bg-gradient-to-t from-sky-400 to-emerald-400"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
