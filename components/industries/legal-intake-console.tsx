"use client"

import { useEffect, useState } from "react"
import { Phone, Quote, CalendarCheck, Check, Split } from "lucide-react"

/**
 * Legal-only hero visual: an inbound call turning into a structured intake
 * record, line by line.
 *
 * The idea being animated is the product's actual value — unstructured
 * speech becoming structured data. Each step shows what the caller just
 * said, then the field the agent extracted from it drops into the record
 * below and stays there, so the record visibly *builds* across the loop
 * rather than just fading in. Once the record is complete the call is
 * routed and a consult is confirmed, then it replays.
 *
 * Distinct by construction from the other industry heroes: Education uses a
 * square collage of floating cards, Fitness a desktop console with an
 * overlapping phone, Automotive a photograph. Nothing else in this project
 * animates a transcript into a form.
 *
 * Driven by React state rather than pure CSS because the steps are a
 * narrative sequence (each field must persist once revealed) — CSS keyframes
 * would need one hand-tuned delay per row and would drift out of sync.
 * Keyframes used for the ambient touches are `lgl-` prefixed and scoped to
 * the <style> block below, so nothing reaches the global sheet or any other
 * page.
 */

type Step = { quote: string; label: string; value: string }

// The caller's own words, then the field taken from them. Hindi lines echo
// the real legal sample lines in lib/industries.ts.
const STEPS: Step[] = [
  { quote: "नमस्ते, मुझे एक संपत्ति विवाद पर सलाह चाहिए।", label: "Practice area", value: "Property dispute" },
  { quote: "मेरे पास मूल बिक्री विलेख मौजूद है।", label: "Documents", value: "Sale deed on hand" },
  { quote: "My name is Rajesh Mehta — I'm calling from Ludhiana.", label: "Caller", value: "Rajesh M." },
  { quote: "कल दोपहर का समय ठीक रहेगा।", label: "Preferred slot", value: "Tomorrow · 3:30 PM" },
]

// Fields land quickly, then the finished record is held so it can actually
// be read before the loop restarts. A plain setInterval can't do both (one
// duration for every tick), so the delay is chosen per tick instead.
const STEP_MS = 900 // 1 → 4, briskly
const HOLD_MS = 4000 // dwell on the complete record
const LAST_TICK = STEPS.length // one tick past the steps = the complete state

export function LegalIntakeConsole() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const delay = tick >= LAST_TICK ? HOLD_MS : STEP_MS
    const id = setTimeout(() => setTick((t) => (t + 1) % (LAST_TICK + 1)), delay)
    return () => clearTimeout(id)
  }, [tick])

  const current = tick < STEPS.length ? STEPS[tick] : null
  const revealed = Math.min(tick, STEPS.length) // rows locked into the record
  const complete = tick >= STEPS.length

  return (
    <div aria-hidden className="relative mx-auto w-full max-w-[520px]">
      <div className="pointer-events-none absolute inset-8 -z-10 rounded-full bg-primary/[0.14] blur-[80px]" />

      {/* Fixed total height: the routing/booking block below still expands
          and collapses, but always inside this budget, so growing it can
          never push the hero copy or anything further down the page. The
          reserved space sits as breathing room above the block (flex
          justify-end), not a stray gap at the card's midsection. */}
      <div className="flex h-[524px] flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_34px_80px_-38px_oklch(0.52_0.22_265/0.5)]">
        {/* ── live call bar ── */}
        <div className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-primary/[0.09] via-primary/[0.04] to-transparent px-5 py-4">
          <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-primary text-white">
            <span className="lgl-ring absolute inset-0 rounded-full bg-primary/40" />
            <Phone className="relative size-[18px]" />
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="text-[13px] font-semibold text-foreground">Inbound client call</p>
            <p className="text-[11px] tabular-nums text-muted-foreground">+91 98••• ••210</p>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
            <span className="lgl-blink size-1.5 rounded-full bg-emerald-500" />
            Live
          </span>
        </div>

        {/* ── what the caller is saying ── */}
        <div className="relative min-h-[92px] border-b border-slate-100 px-5 py-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Transcript</p>
            <span className="flex h-3.5 items-end gap-[2px]">
              {[5, 9, 6, 11, 7, 10].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}px`, animationDelay: `${(i % 4) * 0.12}s` }}
                  className="ind-eq w-[2px] rounded-full bg-primary/70"
                />
              ))}
            </span>
          </div>

          {/* keyed so React remounts it each step, replaying the entry animation */}
          {current ? (
            <div key={tick} className="lgl-quote mt-3 flex gap-2.5">
              <Quote className="mt-0.5 size-3.5 shrink-0 text-primary/40" />
              <p className="text-pretty text-[13.5px] leading-relaxed text-foreground/85">{current.quote}</p>
            </div>
          ) : (
            <div className="lgl-quote mt-3 flex items-center gap-2 text-[13px] font-medium text-emerald-600">
              <Check className="size-4" />
              Intake complete
            </div>
          )}
        </div>

        {/* ── the record building up ── */}
        <div className="px-5 py-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Client intake record
            </p>
            <p className="text-[10px] font-semibold tabular-nums text-primary">
              {revealed}/{STEPS.length}
            </p>
          </div>

          {/* completion bar */}
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-100">
            <span
              className="block h-full rounded-full bg-gradient-to-r from-primary to-[oklch(0.5_0.22_255)] transition-[width] duration-700 ease-out"
              style={{ width: `${(revealed / STEPS.length) * 100}%` }}
            />
          </div>

          {/* Rows keep their slot from the start so the panel height never
              jumps as the record fills — only opacity/transform change. */}
          <dl className="mt-1 divide-y divide-slate-100">
            {STEPS.map((s, i) => {
              const isIn = i < revealed
              const justLanded = i === revealed - 1
              return (
                <div
                  key={s.label}
                  className={`flex items-baseline justify-between gap-4 py-2 transition-all duration-500 ease-out ${
                    isIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                  }`}
                >
                  <dt className="shrink-0 text-[12px] text-muted-foreground">{s.label}</dt>
                  <dd
                    className={`relative truncate rounded px-1 text-[13px] font-semibold text-foreground ${
                      justLanded ? "lgl-land" : ""
                    }`}
                  >
                    {s.value}
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>

        {/* ── routing + booking, once the record is complete ──
            flex-1 + justify-end: this wrapper always fills whatever's left
            of the card's fixed height, and pins its content to the bottom
            — so the reserved space reads as headroom above it, not a gap
            hanging off the record list. */}
        <div className="flex flex-1 flex-col justify-end" aria-hidden={!complete}>
          <div
            className={`grid transition-all duration-500 ease-out ${
              complete ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="mx-5 mb-3 flex items-center gap-2.5 rounded-xl border border-primary/20 bg-primary/[0.06] px-4 py-2.5">
                <Split className="size-4 shrink-0 text-primary" />
                <p className="min-w-0 flex-1 text-[12px] leading-snug text-foreground/80">
                  Screened against your intake rules · routed to{" "}
                  <span className="font-semibold text-primary">Property team</span>
                </p>
              </div>

              <div className="flex items-center gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-3.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-white shadow-sm shadow-primary/30">
                  <CalendarCheck className="size-[18px]" />
                </span>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="text-[12.5px] font-semibold text-foreground">Consultation booked</p>
                  <p className="text-[11px] text-muted-foreground">Tomorrow · 3:30 PM · confirmation sent</p>
                </div>
                <span className="lgl-stamp grid size-6 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                  <Check className="size-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* the caller's line easing in as they speak it */
        @keyframes lglQuote {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .lgl-quote { animation: lglQuote 0.45s cubic-bezier(0.22, 1, 0.36, 1) both; }

        /* a brand-tinted sweep across the value the moment it's extracted */
        @keyframes lglLand {
          0%   { background-color: oklch(0.546 0.215 262.88 / 0.18); }
          100% { background-color: transparent; }
        }
        .lgl-land { animation: lglLand 1.1s ease-out both; }

        @keyframes lglStamp {
          0%   { transform: scale(0.5); opacity: 0; }
          55%  { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .lgl-stamp { animation: lglStamp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }

        @keyframes lglRing {
          0%   { transform: scale(1);   opacity: 0.55; }
          70%  { transform: scale(1.9); opacity: 0; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        .lgl-ring { animation: lglRing 2.4s ease-out infinite; }

        @keyframes lglBlink {
          0%, 45%, 100% { opacity: 1; }
          60%, 85%      { opacity: 0.25; }
        }
        .lgl-blink { animation: lglBlink 1.6s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .lgl-quote, .lgl-land, .lgl-stamp { animation: none; }
          .lgl-ring { animation: none; opacity: 0; }
          .lgl-blink { animation: none; }
        }
      `}</style>
    </div>
  )
}
