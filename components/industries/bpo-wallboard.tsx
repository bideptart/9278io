"use client"

// A fifth, deliberately different take on the BPO hero visual: instead of
// an abstract dashboard/diagram (every earlier attempt), this is a hand-
// built illustrated scene — a support agent at a desk, wearing a headset,
// with animated speech-waves, a breathing idle bob, and floating info
// bubbles orbiting around them. Flat vector-illustration style (plain SVG
// shapes, no external art assets), warm and human rather than data-panel
// cold. Every part of it moves independently and continuously.

const SPARKLES = [
  { top: "14%", left: "12%", delay: 0 },
  { top: "22%", left: "82%", delay: 0.8 },
  { top: "58%", left: "6%", delay: 1.6 },
  { top: "68%", left: "88%", delay: 0.4 },
  { top: "8%", left: "48%", delay: 1.2 },
]

export function BpoWallboard() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 via-sky-50/70 to-white">
      {/* Soft colour blobs behind the scene */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="absolute -left-10 -top-6 size-56 rounded-full bg-blue-300/25 blur-3xl motion-safe:animate-[breathe_9s_ease-in-out_infinite]" />
        <span
          style={{ animationDelay: "2s" }}
          className="absolute -right-8 bottom-4 size-52 rounded-full bg-emerald-300/25 blur-3xl motion-safe:animate-[breathe_10s_ease-in-out_infinite]"
        />
      </div>

      {/* Twinkling sparkles scattered around the scene */}
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          aria-hidden
          style={{ top: s.top, left: s.left, animationDelay: `${s.delay}s` }}
          className="fit-twinkle absolute z-30 text-blue-400"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4L12 0z" />
          </svg>
        </span>
      ))}

      {/* ── The character ── */}
      <div className="relative z-10 mt-6" style={{ animation: "breathe 4.5s ease-in-out infinite" }}>
        <svg width="180" height="210" viewBox="0 0 180 210" className="drop-shadow-[0_18px_30px_rgba(37,99,235,0.25)]">
          {/* Desk */}
          <rect x="10" y="176" width="160" height="14" rx="7" fill="#1e40af" opacity="0.12" />
          {/* Chair back */}
          <rect x="48" y="86" width="84" height="94" rx="24" fill="#2563eb" />
          {/* Body / shirt */}
          <path d="M58 128c0-22 14-34 32-34s32 12 32 34v52H58z" fill="#0ea5e9" />
          {/* Collar */}
          <path d="M82 98l8 10 8-10" stroke="#e0f2fe" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Neck */}
          <rect x="82" y="76" width="16" height="18" rx="6" fill="#f2b98d" />
          {/* Head */}
          <circle cx="90" cy="58" r="30" fill="#f6c99a" />
          {/* Hair */}
          <path d="M60 52a30 30 0 0 1 60 0c0-6-4-9-8-9-3-8-11-13-22-13s-19 5-22 13c-4 0-8 3-8 9z" fill="#3b2a20" />
          {/* Smile */}
          <path d="M80 66q10 8 20 0" stroke="#7a4a30" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Eyes */}
          <circle cx="80" cy="56" r="2.6" fill="#3b2a20" />
          <circle cx="100" cy="56" r="2.6" fill="#3b2a20" />

          {/* Headset band */}
          <path d="M62 48a28 28 0 0 1 56 0" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Ear cups */}
          <circle cx="62" cy="58" r="8" fill="#0f172a" />
          <circle cx="118" cy="58" r="8" fill="#0f172a" />
          {/* Mic boom */}
          <path d="M118 64c4 6 6 12 2 18" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="119" cy="83" r="4.5" fill="#2563eb" />

          {/* Monitor on desk */}
          <g transform="translate(18 130)">
            <rect x="0" y="0" width="46" height="34" rx="5" fill="#0f172a" />
            <rect x="3" y="3" width="40" height="26" rx="3" fill="#e0f2fe" />
            <rect x="18" y="34" width="10" height="8" fill="#0f172a" />
            <rect x="10" y="42" width="26" height="4" rx="2" fill="#0f172a" />
          </g>
        </svg>

        {/* Mic pulse rings — sound leaving the headset */}
        <span
          aria-hidden
          className="absolute left-[132px] top-[76px] size-4 rounded-full bg-blue-500/50 motion-safe:animate-[ind-ping_1.8s_ease-out_infinite]"
        />
        <span
          aria-hidden
          style={{ animationDelay: "0.5s" }}
          className="absolute left-[130px] top-[74px] size-6 rounded-full bg-blue-400/30 motion-safe:animate-[ind-ping_1.8s_ease-out_infinite]"
        />
      </div>

      {/* Floating info bubbles orbiting the character */}
      <div
        style={{ animationDelay: "0s" }}
        className="hero-float-up absolute left-[6%] top-[16%] z-20 rounded-2xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur"
      >
        <div className="flex items-center gap-1.5">
          <span className="grid size-6 place-items-center rounded-full bg-emerald-100 text-emerald-600">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <p className="text-[9.5px] font-bold leading-tight text-slate-800">Order confirmed</p>
            <p className="text-[8px] font-medium text-slate-500">Resolved in 40s</p>
          </div>
        </div>
      </div>

      <div
        style={{ animationDelay: "1.4s" }}
        className="hero-float-down absolute right-[5%] top-[10%] z-20 rounded-2xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur"
      >
        <div className="flex items-center gap-1.5">
          <span className="grid size-6 place-items-center rounded-full bg-amber-100 text-amber-500">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.1 6.3 7 1-5 4.9 1.2 6.9L12 17.8 5.7 21l1.2-6.9-5-4.9 7-1z" />
            </svg>
          </span>
          <p className="text-[9.5px] font-bold text-slate-800">4.6 / 5 CSAT</p>
        </div>
      </div>

      <div
        style={{ animationDelay: "2.4s" }}
        className="hero-wobble absolute bottom-[16%] left-[2%] z-20 rounded-2xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur"
      >
        <div className="flex items-center gap-1.5">
          <span className="grid size-6 place-items-center rounded-full bg-violet-100 text-violet-600">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </svg>
          </span>
          <p className="text-[9.5px] font-bold text-slate-800">10+ languages</p>
        </div>
      </div>

      <div
        style={{ animationDelay: "0.7s" }}
        className="hero-float-up absolute bottom-[10%] right-[3%] z-20 rounded-2xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur"
      >
        <div className="flex items-center gap-1.5">
          <span className="relative grid size-6 place-items-center rounded-full bg-blue-100 text-blue-600">
            <span aria-hidden className="absolute inset-0 rounded-full bg-blue-400/30 motion-safe:animate-[ind-ping_2.4s_ease-out_infinite]" />
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z" />
            </svg>
          </span>
          <p className="text-[9.5px] font-bold text-slate-800">Live call</p>
        </div>
      </div>
    </div>
  )
}
