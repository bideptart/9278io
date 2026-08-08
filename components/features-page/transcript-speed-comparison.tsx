// Bespoke pattern for call-reports' "Why it matters" section: a literal
// speedometer-style gauge — a needle sweeps from a red "slow" zone to a
// green "fast" zone, with the readout crossfading in sync. Pure CSS
// keyframes (see .gauge-* in globals.css), no JS.
export function TranscriptSpeedComparison() {
  return (
    <div className="mt-8 w-full">
      <div className="flex items-center justify-start gap-2.5">
        <p className="text-sm font-bold tracking-tight text-foreground">Finding one moment in a call</p>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
          <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden />
          Live
        </span>
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 pb-10 pt-6 lg:flex-row lg:items-center lg:gap-12">
        <div className="w-[340px] shrink-0">
          {/* the gauge */}
          <div className="relative mx-auto w-[340px]" style={{ aspectRatio: "340 / 190" }}>
            <svg viewBox="0 0 300 168" className="absolute inset-0 size-full" aria-hidden>
              <defs>
                <linearGradient id="gaugeArc" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="50%" stopColor="#0EA5E9" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
              <path d="M20,160 A130,130 0 0 1 280,160" fill="none" stroke="#EEF2F7" strokeWidth="20" strokeLinecap="round" />
              <path
                className="gauge-zone-glow"
                d="M20,160 A130,130 0 0 1 280,160"
                fill="none"
                stroke="url(#gaugeArc)"
                strokeWidth="20"
                strokeLinecap="round"
              />
            </svg>

            {/* needle, pivoting from the bottom-center of the arc */}
            <div className="absolute bottom-0 left-1/2 h-[2px] w-[2px]" style={{ transform: "translateX(-50%)" }}>
              <div className="gauge-needle absolute bottom-0 left-1/2 h-[140px] w-[3px] -translate-x-1/2 rounded-full bg-foreground" style={{ transformOrigin: "bottom center" }}>
                <span className="absolute -left-[5px] -top-[5px] size-3 rounded-full bg-foreground" />
              </div>
              <span className="absolute -bottom-2 -left-2 size-4 rounded-full border-2 border-white bg-foreground shadow-[0_2px_6px_rgba(15,23,42,0.4)]" />
            </div>
          </div>

          {/* zone labels sit in normal flow below the arc, not absolutely
              overlapping it, so they can never collide with the stroke */}
          <div className="flex w-full items-center justify-between px-6">
            <span className="text-[11px] font-bold uppercase tracking-wide text-primary">Slow</span>
            <span className="text-[11px] font-bold uppercase tracking-wide text-emerald-600">Fast</span>
          </div>

          {/* readout, crossfading in sync with the needle */}
          <div className="relative mt-6 h-24 w-full">
            <div className="gauge-manual absolute inset-0 flex flex-col items-center">
              <p className="font-mono text-5xl font-black tracking-tight text-primary">38.4s</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Manual search</p>
            </div>
            <div className="gauge-found absolute inset-0 flex flex-col items-center">
              <p className="font-mono text-5xl font-black tracking-tight text-emerald-600">0.2s</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-emerald-600">9278.io transcript search</p>
            </div>
          </div>
        </div>

        {/* right-side content — swaps twice per cycle, in sync with the needle */}
        <div className="relative h-64 w-full min-w-0 flex-1 pl-4 lg:pl-6">
          <div className="gauge-manual absolute inset-0 flex flex-col justify-start pt-2">
            <p className="text-2xl font-bold text-foreground">Scrubbing through the recording by ear</p>
            <p className="mt-3 whitespace-nowrap text-base leading-relaxed text-muted-foreground">
              Guessing, playing it back, and rewinding — for every single call.
            </p>
            <ul className="mt-3 space-y-1.5">
              <li className="flex items-center gap-2 whitespace-nowrap text-sm text-muted-foreground">
                <span className="size-1 shrink-0 rounded-full bg-red-400" aria-hidden />
                No timestamp to jump to
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap text-sm text-muted-foreground">
                <span className="size-1 shrink-0 rounded-full bg-red-400" aria-hidden />
                Every call reviewed the same slow way
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap text-sm text-muted-foreground">
                <span className="size-1 shrink-0 rounded-full bg-red-400" aria-hidden />
                Minutes add up across your whole team
              </li>
            </ul>
            <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-500">
              38.4s average, per call
            </span>
          </div>
          <div className="gauge-found absolute inset-0 flex flex-col justify-start pt-2">
            <p className="text-2xl font-bold text-foreground">Search the transcript for &ldquo;refund&rdquo;</p>
            <p className="mt-3 whitespace-nowrap text-base leading-relaxed text-muted-foreground">
              Jump straight to that exact moment — no scrubbing, no guessing.
            </p>
            <ul className="mt-3 space-y-1.5">
              <li className="flex items-center gap-2 whitespace-nowrap text-sm text-muted-foreground">
                <span className="size-1 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                Exact timestamp, every time
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap text-sm text-muted-foreground">
                <span className="size-1 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                Works the same way for every call
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap text-sm text-muted-foreground">
                <span className="size-1 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                Your team spends time on customers, not searching
              </li>
            </ul>
            <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
              0.2s — 192x faster
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
