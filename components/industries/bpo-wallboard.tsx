"use client"

// BPO hero visual — a gooey "metaball" cluster: four colourful liquid blobs
// that continuously wander, merge into, and separate from one another (the
// classic CSS blur+contrast goo technique), each carrying a capability icon
// that rides along with its own blob without inheriting the blur. This is a
// structurally different effect from every earlier attempt on this
// component — nothing else on the site uses a liquid/gooey motion.

import { Globe2, Headphones, ShieldCheck, Star } from "lucide-react"
import type { CSSProperties } from "react"

const BLOBS = [
  { top: "28%", left: "30%", size: 150, color: "#2563eb", wander: "blob-wander-a", dur: "7.5s", Icon: Headphones },
  { top: "32%", left: "62%", size: 130, color: "#d946ef", wander: "blob-wander-b", dur: "9s", Icon: Star },
  { top: "62%", left: "34%", size: 120, color: "#10b981", wander: "blob-wander-c", dur: "6.5s", Icon: ShieldCheck },
  { top: "60%", left: "66%", size: 110, color: "#f59e0b", wander: "blob-wander-a", dur: "8.5s", Icon: Globe2 },
]

export function BpoWallboard() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-sky-50/50">
      {/* Goo layer — blurred + high-contrast so overlapping circles fuse
          into a single liquid shape instead of visibly intersecting. */}
      <div aria-hidden className="absolute inset-0" style={{ filter: "blur(18px) contrast(28)" }}>
        {BLOBS.map((b, i) => (
          <span
            key={i}
            className={b.wander}
            style={
              {
                position: "absolute",
                top: b.top,
                left: b.left,
                width: b.size,
                height: b.size,
                marginLeft: -b.size / 2,
                marginTop: -b.size / 2,
                borderRadius: "9999px",
                background: b.color,
                "--dur": b.dur,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* Sheen overlay — a soft radial highlight so the merged blob reads as
          glossy liquid rather than a flat filled shape. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-overlay"
        style={{ background: "radial-gradient(60% 60% at 40% 30%, rgba(255,255,255,0.5), transparent 60%)" }}
      />

      {/* Icon layer — unfiltered, positioned/animated identically to each
          blob beneath it so the icon appears to ride inside the liquid. */}
      {BLOBS.map((b, i) => (
        <div
          key={i}
          className={`${b.wander} absolute z-10`}
          style={
            {
              top: b.top,
              left: b.left,
              width: b.size,
              height: b.size,
              marginLeft: -b.size / 2,
              marginTop: -b.size / 2,
              "--dur": b.dur,
            } as CSSProperties
          }
        >
          <div className="grid size-full place-items-center">
            <b.Icon className="size-7 text-white drop-shadow-sm sm:size-8" aria-hidden />
          </div>
        </div>
      ))}

      {/* Live caption strip, unaffected by the goo filter */}
      <div className="absolute inset-x-5 bottom-5 z-20 rounded-2xl border border-white/70 bg-white/85 px-4 py-2.5 shadow-lg backdrop-blur-md sm:inset-x-8">
        <p className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-blue-600/80 sm:text-[10px]">
          <span className="relative flex size-1.5" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-red-500" />
          </span>
          AI voice agent — live
        </p>
        <p className="mt-1 text-[11px] font-medium text-slate-700 sm:text-[12px]">
          10+ languages · 40+ concurrent calls · 4.6★ CSAT
        </p>
      </div>
    </div>
  )
}
