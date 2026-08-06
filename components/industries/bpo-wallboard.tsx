"use client"

// A sixth, deliberately bolder take on the BPO hero visual: a large glowing
// "pulse core" — a rotating gradient sphere representing the AI agent —
// orbited by rings of traveling light particles, with a floating glass
// transcript panel in front showing a live-typed caption and waveform.
// Bigger scale, heavier glow, more premium/dramatic than the previous
// dashboard, diagram, and illustration attempts. Every layer is animated
// independently and continuously.

import { useEffect, useState, type CSSProperties } from "react"
import { Headphones } from "lucide-react"

const RINGS = [
  { rx: 150, ry: 58, rotate: -18, dur: "7s" },
  { rx: 128, ry: 96, rotate: 12, dur: "9s" },
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
      if (i < full.length) {
        timer = setTimeout(typeStep, typeMs)
      } else {
        timer = setTimeout(eraseStep, holdMs)
      }
    }
    const eraseStep = () => {
      if (cancelled) return
      i -= 1
      setText(full.slice(0, Math.max(i, 0)))
      if (i > 0) {
        timer = setTimeout(eraseStep, eraseMs)
      } else {
        setLineIndex((li) => (li + 1) % lines.length)
      }
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
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/60 to-sky-50">
      {/* Deep ambient glow behind everything */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] -z-10 size-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.28),rgba(56,189,248,0.1)_60%,transparent)] blur-2xl motion-safe:animate-[breathe_5s_ease-in-out_infinite]"
      />

      <div className="relative grid size-[280px] shrink-0 place-items-center sm:size-[320px]">
        {/* Orbit rings, each with two travelling light particles */}
        {RINGS.map((r, ri) => (
          <div
            key={ri}
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ transform: `translate(-50%, -50%) rotate(${r.rotate}deg)` }}
          >
            <span
              className="block rounded-full border border-blue-400/30"
              style={{ width: `${r.rx * 2}px`, height: `${r.ry * 2}px` }}
            />
            {[0, 0.5].map((offset) => (
              <span
                key={offset}
                className="orbit-travel absolute size-2.5 rounded-full bg-gradient-to-br from-sky-300 to-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.9)]"
                style={
                  {
                    offsetPath: `ellipse(${r.rx}px ${r.ry}px at 50% 50%)`,
                    "--dur": r.dur,
                    animationDelay: `${offset === 0.5 ? parseFloat(r.dur) / 2 : 0}s`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        ))}

        {/* Pulse core — rotating gradient halo (reuses the site's own
            .card-glow conic-gradient spin) behind a solid pulsing sphere. */}
        <div className="relative z-10 size-24 sm:size-28">
          <div className="card-glow absolute inset-0 rounded-full opacity-90 blur-md" />
          <div className="absolute inset-[7px] grid place-items-center rounded-full bg-gradient-to-br from-blue-600 via-indigo-500 to-sky-400 shadow-[0_0_50px_rgba(37,99,235,0.55)] motion-safe:animate-[breathe_3.2s_ease-in-out_infinite]">
            <span aria-hidden className="absolute inset-0 rounded-full bg-white/15 motion-safe:animate-[ind-ping_2.2s_ease-out_infinite]" />
            <Headphones className="relative size-9 text-white sm:size-10" aria-hidden />
          </div>
        </div>
      </div>

      {/* Floating glass transcript panel, overlapping the bottom of the core */}
      <div className="absolute inset-x-5 bottom-5 z-20 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-[0_20px_45px_-15px_rgba(37,99,235,0.45)] backdrop-blur-lg sm:inset-x-8 sm:bottom-7">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-[9.5px] font-bold uppercase tracking-wider text-blue-600/80 sm:text-[10.5px]">
            <span className="relative flex size-2" aria-hidden>
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-red-500" />
            </span>
            AI voice agent — live
          </p>
          <span className="flex h-3.5 items-end gap-[2.5px]" aria-hidden>
            {[6, 11, 5, 13, 8].map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
                className="ind-eq w-[2.5px] rounded-full bg-gradient-to-t from-sky-500 to-blue-600"
              />
            ))}
          </span>
        </div>
        <p className="relative mt-1.5 h-4 truncate text-[11px] font-medium text-slate-700 sm:text-[12.5px]">
          {caption}
          <span className="ml-0.5 inline-block h-3 w-[2px] animate-pulse bg-blue-500 align-middle" aria-hidden />
        </p>
      </div>

      {/* Bold stat badges, top corners */}
      <div
        style={{ animationDelay: "0s" }}
        className="hero-float-up absolute left-[5%] top-[8%] z-20 rounded-2xl border border-white/70 bg-white/90 px-3.5 py-2.5 shadow-[0_14px_30px_-10px_rgba(37,99,235,0.4)] backdrop-blur"
      >
        <p className="font-serif text-lg font-black leading-none text-slate-900 sm:text-xl">2,847</p>
        <p className="text-[8.5px] font-medium text-slate-500 sm:text-[9.5px]">Calls today</p>
      </div>
      <div
        style={{ animationDelay: "1.4s" }}
        className="hero-float-down absolute right-[5%] top-[8%] z-20 rounded-2xl border border-white/70 bg-white/90 px-3.5 py-2.5 shadow-[0_14px_30px_-10px_rgba(37,99,235,0.4)] backdrop-blur"
      >
        <p className="font-serif text-lg font-black leading-none text-slate-900 sm:text-xl">4.6★</p>
        <p className="text-[8.5px] font-medium text-slate-500 sm:text-[9.5px]">CSAT score</p>
      </div>
    </div>
  )
}
