import Image from "next/image"
import { Marquee } from "@/components/ui/marquee"

/**
 * Retail-only "whole purchase" section: the three moments a shopper picks up
 * the phone, shown as a legend beside a continuously scrolling feed of the
 * calls themselves.
 *
 * Replaced an earlier three-column timeline, which read sparse and uneven —
 * the columns had different amounts of content, so the row never balanced.
 * A feed fixes that: every entry is the same shape, the motion is inherent
 * to the format rather than decoration, and it shows *volume* across the
 * journey, which is the actual point of the heading.
 *
 * Uses the project's existing Marquee (vertical, pause-on-hover) rather than
 * a bespoke scroller. Server component — the only page-local keyframe is the
 * legend's phase highlight, scoped as `rpt-` under `.rpt-journey`.
 *
 * The agent replies marked below are real lines from the e-commerce playbook
 * in lib/industries.ts; the rest are ordinary support exchanges, not claims.
 */

/* Kept as data so the image's alt text stays in step with what it depicts. */
const PHASES = [
  { label: "Before the buy", note: "Sizing, availability, store hours" },
  { label: "On the way", note: "Order status, delivery windows" },
  { label: "After it arrives", note: "Returns, exchanges, win-backs" },
]

type Moment = { phase: string; tone: string; ask: string; reply: string; meta: string }

const MOMENTS: Moment[] = [
  {
    phase: "Before the buy",
    tone: "bg-sky-50 text-sky-700",
    ask: "Do you have these in a size 9?",
    reply: "Size 9 is in stock — it ships today.",
    meta: "English · 0:41",
  },
  {
    phase: "On the way",
    tone: "bg-primary/10 text-primary",
    ask: "Where's my order? It was due yesterday.",
    // real line from lib/industries.ts
    reply: "Looks like your order shipped Monday and is out for delivery today before 6pm.",
    meta: "हिन्दी · 1:02",
  },
  {
    phase: "After it arrives",
    tone: "bg-emerald-50 text-emerald-700",
    ask: "I'd like to return the jacket.",
    // real line from lib/industries.ts
    reply: "Totally understandable. I'll get a return label sent — should I refund to your original method or UPI?",
    meta: "English · 0:58",
  },
  {
    phase: "Before the buy",
    tone: "bg-sky-50 text-sky-700",
    ask: "What time do you close today?",
    reply: "We're open until 9 PM today, and 8 PM on Sunday.",
    meta: "ಕನ್ನಡ · 0:22",
  },
  {
    phase: "After it arrives",
    tone: "bg-emerald-50 text-emerald-700",
    ask: "The 8.5 was a bit tight on me.",
    // real line from lib/industries.ts
    reply: "Based on your last order, the size 9 should fit a touch better than the 8.5. Want me to swap it?",
    meta: "English · 1:14",
  },
  {
    phase: "On the way",
    tone: "bg-primary/10 text-primary",
    ask: "Can it come Friday instead?",
    reply: "Moved to Friday — you'll get a confirmation shortly.",
    meta: "मराठी · 0:36",
  },
]

export function RetailPurchaseTimeline() {
  return (
    <div className="rpt-journey grid items-center gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-14">
      {/* ── the three phases, as a quiet legend ── */}
      <div>
        <Image
          src="/industries/retail-purchase-phases.png"
          alt={PHASES.map((p, i) => `${String(i + 1).padStart(2, "0")} ${p.label} — ${p.note}`).join(". ")}
          width={974}
          height={546}
          className="h-auto w-full"
        />
      </div>

      {/* ── the calls themselves, streaming past ── */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_-34px_oklch(0.52_0.22_265/0.45)]">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Support line · live</p>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
            <span className="rpt-blink size-1.5 rounded-full bg-emerald-500" aria-hidden />
            Answering
          </span>
        </div>

        <Marquee
          vertical
          pauseOnHover
          repeat={2}
          className="h-[420px] [--duration:34s] [--gap:0.75rem] p-3"
        >
          {MOMENTS.map((m) => (
            <article
              key={m.ask}
              className="w-full rounded-xl border border-slate-200 bg-white p-4 transition-colors duration-300 hover:border-primary/30"
            >
              <div className="flex items-center justify-between gap-3">
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${m.tone}`}>{m.phase}</span>
                <span className="shrink-0 text-[10.5px] tabular-nums text-muted-foreground">{m.meta}</span>
              </div>

              <p className="mt-3 text-[13px] leading-relaxed text-foreground/80">
                <span className="mr-1.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground/60">
                  Caller
                </span>
                {m.ask}
              </p>
              <p className="mt-2 rounded-lg rounded-bl-sm bg-primary/[0.07] px-3 py-2 text-[13px] leading-relaxed text-foreground/85 ring-1 ring-primary/10">
                <span className="mr-1.5 text-[10px] font-bold uppercase tracking-wide text-primary/60">Agent</span>
                {m.reply}
              </p>
            </article>
          ))}
        </Marquee>

        {/* fade the feed in and out at the panel edges */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[45px] h-14 bg-gradient-to-b from-white to-transparent"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white to-transparent"
        />
      </div>

      <style>{`
        @keyframes rptBlink {
          0%, 45%, 100% { opacity: 1; }
          60%, 85%      { opacity: 0.25; }
        }
        .rpt-journey .rpt-blink { animation: rptBlink 1.6s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .rpt-journey .rpt-blink { animation: none; }
        }
      `}</style>
    </div>
  )
}
