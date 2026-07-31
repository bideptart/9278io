import { PhoneCall, Check } from "lucide-react"

/**
 * Retail-only "peak demand" visual: a column of simultaneous calls, each
 * answered on arrival rather than stacking into a hold queue.
 *
 * Pure CSS (no "use client", no state) — the rows run on staggered
 * `animation-delay` offsets against a shared duration, so the section ships
 * no JS and animates even before hydration.
 *
 * `rpq-` prefixed keyframes are scoped under `.rpq-queue` in the <style>
 * block below.
 */

const CALLS = [
  { label: "Order status", detail: "#4821 · out for delivery" },
  { label: "Product enquiry", detail: "Size 9 · in stock" },
  { label: "Return request", detail: "Label emailed" },
  { label: "Store hours", detail: "Open till 9 PM" },
  { label: "Delivery update", detail: "Rescheduled to Friday" },
]

export function RetailPeakQueue() {
  return (
    <div className="rpq-queue rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          Sale day · live calls
        </p>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
          <span className="rpq-blink size-1.5 rounded-full bg-emerald-500" aria-hidden />
          0 waiting
        </span>
      </div>

      <ul className="mt-4 space-y-2">
        {CALLS.map((call, i) => (
          <li
            key={call.label}
            style={{ animationDelay: `${i * 0.55}s` }}
            className="rpq-row flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <PhoneCall className="size-4" aria-hidden />
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-[12.5px] font-semibold text-foreground">{call.label}</span>
              <span className="block truncate text-[11px] text-muted-foreground">{call.detail}</span>
            </span>
            <span
              style={{ animationDelay: `${i * 0.55 + 0.5}s` }}
              className="rpq-done grid size-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white"
              aria-hidden
            >
              <Check className="size-3" />
            </span>
          </li>
        ))}
      </ul>

      <style>{`
        /* each call arrives, gets picked up, then clears for the next wave */
        @keyframes rpqRow {
          0%        { opacity: 0; transform: translateY(8px); }
          8%, 80%   { opacity: 1; transform: translateY(0); }
          92%, 100% { opacity: 0; transform: translateY(-5px); }
        }
        .rpq-queue .rpq-row { animation: rpqRow 5.5s cubic-bezier(0.22, 1, 0.36, 1) infinite both; }

        @keyframes rpqDone {
          0%, 10%   { opacity: 0; transform: scale(0.5); }
          18%       { opacity: 1; transform: scale(1.15); }
          24%, 80%  { opacity: 1; transform: scale(1); }
          92%, 100% { opacity: 0; transform: scale(0.9); }
        }
        .rpq-queue .rpq-done { animation: rpqDone 5.5s cubic-bezier(0.22, 1, 0.36, 1) infinite both; }

        @keyframes rpqBlink {
          0%, 45%, 100% { opacity: 1; }
          60%, 85%      { opacity: 0.25; }
        }
        .rpq-queue .rpq-blink { animation: rpqBlink 1.6s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .rpq-queue .rpq-row,
          .rpq-queue .rpq-done { animation: none; opacity: 1; transform: none; }
          .rpq-queue .rpq-blink { animation: none; }
        }
      `}</style>
    </div>
  )
}
