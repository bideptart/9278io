"use client"

import { useEffect, useState } from "react"
import { PhoneCall, Truck, Tag, Languages, Zap, Check } from "lucide-react"

/**
 * Retail hero visual: a collage of offset, floating support cards — a live
 * call panel with a waveform, an order that just resolved, and a few
 * capability tiles — layered at varied sizes and depths.
 *
 * Every figure shown is one the site already publishes (sub-3s first
 * response, up to 40 concurrent calls on Scale, 10+ Indian languages). The
 * order/stock cards are illustrative UI, not statistics: no revenue, growth
 * or volume numbers are claimed anywhere, since none exist to cite.
 *
 * The container is a fixed height and the cards are absolutely positioned
 * inside it, so the collage can float and cycle without changing its own
 * footprint — the hero copy beside it, and everything below, stays put.
 *
 * Motion reuses the site's existing hero-float-up / hero-float-down and
 * ind-eq keyframes rather than introducing new ones; the only page-local
 * keyframe is the order card's status swap, scoped as `rhc-`.
 */

const ORDERS = [
  { id: "#4821", status: "Out for delivery", detail: "Arriving today, before 6 PM", icon: Truck },
  { id: "#4790", status: "Return started", detail: "Label emailed to the customer", icon: Check },
  { id: "#4913", status: "In stock", detail: "Size 9 — ships today", icon: Tag },
]

export function RetailHeroCards() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % ORDERS.length), 3200)
    return () => clearInterval(id)
  }, [])

  const order = ORDERS[i]
  const OrderIcon = order.icon

  return (
    <div aria-hidden className="relative mx-auto h-[440px] w-full max-w-[540px] sm:h-[470px]">
      {/* soft brand glow behind the collage */}
      <div className="pointer-events-none absolute inset-10 -z-10 rounded-full bg-primary/[0.15] blur-[80px]" />

      {/* decorative dots, echoing the reference's accent specks */}
      <span className="absolute left-[46%] top-[2%] size-2.5 rounded-full bg-primary/50" />
      <span className="absolute right-[3%] top-[46%] size-3 rounded-full bg-emerald-400/50" />
      <span className="absolute bottom-[8%] left-[6%] size-2 rounded-full bg-sky-400/60" />

      {/* ── Live call · waveform panel (the collage's anchor) ── */}
      <div className="hero-float-up absolute left-0 top-[16%] w-[62%] max-w-[300px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_22px_50px_-24px_oklch(0.52_0.22_265/0.45)]">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <PhoneCall className="size-4" />
            </span>
            {/* The badge sits beside the title rather than at the card's right
                edge: the order card overlaps this one's right ~20%, and the
                edge is where it used to get clipped. */}
            <div className="min-w-0 flex-1 leading-tight">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-[12px] font-semibold text-foreground">Live call</p>
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-700">
                  <span className="size-1 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
                  Live
                </span>
              </div>
              <p className="text-[10.5px] text-muted-foreground">Order enquiry · 00:24</p>
            </div>
          </div>

          {/* waveform — stands in for the reference's chart panel */}
          <div className="mt-4 flex h-14 items-end justify-between gap-[3px]">
            {[8, 15, 10, 22, 14, 28, 18, 34, 20, 26, 12, 30, 16, 24, 10, 18].map((h, k) => (
              <span
                key={k}
                style={{ height: `${h}px`, animationDelay: `${(k % 6) * 0.1}s` }}
                className="ind-eq w-full max-w-[7px] flex-1 rounded-full bg-gradient-to-t from-primary/60 to-primary"
              />
            ))}
          </div>
          <p className="mt-2.5 text-[10.5px] text-muted-foreground">Answered in under 3 seconds</p>
        </div>
      </div>

      {/* ── Order status — cycles through resolved enquiries ── */}
      {/* Slightly narrower on small screens so its left edge clears the live
          card's badge, which the collage would otherwise overlap. */}
      <div className="hero-float-down absolute right-0 top-0 w-[52%] max-w-[268px] sm:w-[58%]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_22px_50px_-24px_oklch(0.52_0.22_265/0.45)]">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-600">
              <OrderIcon className="size-4" />
            </span>
            <p className="text-[12px] font-semibold text-foreground">Order {order.id}</p>
          </div>
          <div key={i} className="rhc-swap mt-3">
            <p className="text-[17px] font-bold tracking-tight text-foreground">{order.status}</p>
            <p className="mt-1 text-[10.5px] leading-snug text-muted-foreground">{order.detail}</p>
          </div>
        </div>
      </div>

      {/* ── Concurrent calls — the "big number" tile ── */}
      {/* Narrower on small screens: at full 50% width its left edge sat
          under the Languages card below, which — painting later, on top —
          clipped the "On the Scale plan" line beneath it. */}
      <div
        className="hero-float-down absolute right-[4%] top-[40%] w-[38%] max-w-[228px] sm:w-[50%]"
        style={{ animationDelay: "0.7s" }}
      >
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_22px_50px_-24px_oklch(0.52_0.22_265/0.45)]">
          <div className="flex items-center gap-2">
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-blue-100 text-blue-600">
              <PhoneCall className="size-3.5" />
            </span>
            <p className="text-[11px] font-medium text-muted-foreground">Concurrent calls</p>
          </div>
          <p className="mt-2 text-[26px] font-bold leading-none tracking-tight text-foreground">Up to 40</p>
          <p className="mt-1.5 text-[10px] text-muted-foreground">On the Scale plan — no queue</p>
        </div>
      </div>

      {/* ── Languages ── */}
      <div
        className="hero-float-up absolute bottom-[10%] left-[8%] w-[48%] max-w-[218px]"
        style={{ animationDelay: "1.1s" }}
      >
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_22px_50px_-24px_oklch(0.52_0.22_265/0.45)]">
          <div className="flex items-center gap-2">
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-violet-100 text-violet-600">
              <Languages className="size-3.5" />
            </span>
            <p className="text-[11px] font-medium text-muted-foreground">Languages</p>
          </div>
          <p className="mt-2 text-[26px] font-bold leading-none tracking-tight text-foreground">10+</p>
          <p className="mt-1.5 text-[10px] text-muted-foreground">Indian languages, switchable mid-call</p>
        </div>
      </div>

      {/* ── First response — small wide chip, bottom right ── */}
      <div
        className="hero-float-up absolute bottom-0 right-[2%] w-[52%] max-w-[236px]"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_22px_50px_-24px_oklch(0.52_0.22_265/0.45)]">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-sky-100 text-sky-600">
            <Zap className="size-4" />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="text-[15px] font-bold tracking-tight text-foreground">&lt; 3 seconds</p>
            <p className="text-[10px] text-muted-foreground">First-touch response</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes rhcSwap {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rhc-swap { animation: rhcSwap 0.45s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .rhc-swap { animation: none; }
        }
      `}</style>
    </div>
  )
}
