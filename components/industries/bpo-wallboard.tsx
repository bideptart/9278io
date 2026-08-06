"use client"

// "Voice Aura" — the hero visual for BPO & call-centre content. Built to be
// unlike any other page's hero: an organically morphing gradient backdrop
// (no static blurred circles), a pulsing AI orb, three frosted-glass call
// cards drifting in independent 3D space (reusing the site's own
// .tilt-float / .tilt-shadow — proven elsewhere, not new/untested motion),
// particles rising off a flowing voice-waveform ribbon, and a live caption
// line that types itself out on loop. Every element is in continuous
// motion; nothing on this graphic ever sits still.

import { useEffect, useState, type CSSProperties } from "react"
import { Globe2, Headphones, ShieldCheck, Sparkles } from "lucide-react"

const PARTICLES = [
  { left: "22%", x: -18, delay: 0 },
  { left: "38%", x: 10, delay: 0.9 },
  { left: "52%", x: -8, delay: 1.8 },
  { left: "64%", x: 20, delay: 0.4 },
  { left: "74%", x: -14, delay: 2.3 },
  { left: "45%", x: 6, delay: 3.1 },
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
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-sky-50/50">
      {/* Morphing aura blobs — the "living gradient" backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="voice-blob-morph absolute -left-16 top-4 size-64 bg-gradient-to-br from-blue-400/35 to-sky-300/25 blur-2xl sm:size-72" />
        <span
          style={{ animationDelay: "4.5s" }}
          className="voice-blob-morph absolute -right-12 top-16 size-56 bg-gradient-to-br from-violet-400/30 to-fuchsia-300/20 blur-2xl sm:size-64"
        />
        <span
          style={{ animationDelay: "9s" }}
          className="voice-blob-morph absolute bottom-0 left-1/4 size-52 bg-gradient-to-br from-emerald-400/30 to-teal-300/20 blur-2xl sm:size-60"
        />
      </div>

      {/* Rising particles drifting off the scene */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-16 h-40">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="voice-particle-rise absolute bottom-0 size-1.5 rounded-full bg-blue-500/70"
            style={{ left: p.left, animationDelay: `${p.delay}s`, "--x": `${p.x}px` } as CSSProperties}
          />
        ))}
      </div>

      {/* Stage — the orb plus three drifting glass cards, each on its own
          tilt-float rhythm so they never move in sync. */}
      <div className="relative grid h-full w-full place-items-center" style={{ perspective: "1400px" }}>
        {/* Central AI orb */}
        <span className="relative z-10 grid size-20 place-items-center rounded-full bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400 text-white shadow-[0_20px_45px_-12px_rgba(37,99,235,0.65)] sm:size-24">
          <span aria-hidden className="absolute inset-0 rounded-full bg-blue-400/40 motion-safe:animate-[ind-ping_2.4s_ease-out_infinite]" />
          <span aria-hidden className="absolute -inset-3 rounded-full border border-blue-300/40 motion-safe:animate-[breathe_4.5s_ease-in-out_infinite]" />
          <Sparkles className="relative size-8 sm:size-9" aria-hidden />
        </span>

        {/* Card 1 — top-left, waveform */}
        <div
          className="tilt-float absolute left-[6%] top-[10%] z-20 w-[150px] sm:left-[8%] sm:w-[172px]"
          style={{ animationDelay: "0s" }}
        >
          <div className="rounded-2xl border border-white/70 bg-white/70 p-3 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              <span className="flex size-1.5" aria-hidden>
                <span className="absolute inline-flex size-1.5 animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
              </span>
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500 sm:text-[10px]">Live call</p>
            </div>
            <div className="mt-2 flex h-6 items-end gap-[2.5px]" aria-hidden>
              {[6, 12, 8, 16, 10, 14, 7, 11].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
                  className="ind-eq w-[3px] rounded-full bg-gradient-to-t from-sky-500 to-blue-600"
                />
              ))}
            </div>
          </div>
          <span aria-hidden className="tilt-shadow mx-auto mt-2 block h-2 w-3/4 rounded-full bg-blue-600/25 blur-sm" />
        </div>

        {/* Card 2 — right, language */}
        <div
          className="tilt-float absolute right-[4%] top-[38%] z-20 w-[136px] sm:right-[6%] sm:w-[152px]"
          style={{ animationDelay: "2.6s" }}
        >
          <div className="rounded-2xl border border-white/70 bg-white/70 p-3 shadow-xl backdrop-blur-md">
            <span className="grid size-7 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-400 text-white sm:size-8">
              <Globe2 className="size-3.5 sm:size-4" aria-hidden />
            </span>
            <p className="mt-1.5 text-[10px] font-bold text-slate-800 sm:text-[11px]">10+ languages</p>
            <p className="text-[8.5px] font-medium text-slate-500 sm:text-[9.5px]">Auto-detected live</p>
          </div>
          <span aria-hidden className="tilt-shadow mx-auto mt-2 block h-2 w-3/4 rounded-full bg-violet-600/20 blur-sm" />
        </div>

        {/* Card 3 — bottom-left, compliance */}
        <div
          className="tilt-float absolute bottom-[8%] left-[10%] z-20 w-[142px] sm:bottom-[10%] sm:w-[160px]"
          style={{ animationDelay: "5.2s" }}
        >
          <div className="rounded-2xl border border-white/70 bg-white/70 p-3 shadow-xl backdrop-blur-md">
            <span className="grid size-7 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 text-white sm:size-8">
              <ShieldCheck className="size-3.5 sm:size-4" aria-hidden />
            </span>
            <p className="mt-1.5 text-[10px] font-bold text-slate-800 sm:text-[11px]">TRAI compliant</p>
            <p className="text-[8.5px] font-medium text-slate-500 sm:text-[9.5px]">Always within window</p>
          </div>
          <span aria-hidden className="tilt-shadow mx-auto mt-2 block h-2 w-3/4 rounded-full bg-emerald-600/20 blur-sm" />
        </div>
      </div>

      {/* Live typewriter caption */}
      <div className="absolute inset-x-4 bottom-4 z-20 rounded-2xl border border-white/70 bg-white/80 px-4 py-2.5 shadow-lg backdrop-blur-md sm:inset-x-8 sm:bottom-6">
        <p className="text-[9px] font-bold uppercase tracking-wider text-blue-600/80 sm:text-[10px]">AI voice agent</p>
        <p className="mt-0.5 h-4 text-[11px] font-medium text-slate-700 sm:text-[12.5px]">
          {caption}
          <span className="ml-0.5 inline-block h-3 w-[2px] animate-pulse bg-blue-500 align-middle" aria-hidden />
        </p>
      </div>
    </div>
  )
}
