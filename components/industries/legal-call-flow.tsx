"use client"

import { useState } from "react"
import { PhoneIncoming, ListFilter, FileText, Split, CalendarCheck } from "lucide-react"

/**
 * Legal-only "call journey" — five stages of an inbound enquiry on a
 * horizontal rail. At rest the stages sit as five equal columns; hovering
 * (or focusing) one expands it to reveal its detail while the others give up
 * width, and moving off the rail closes it again.
 *
 * Chosen because no other page in this project uses an expanding-panel
 * interaction: Automotive's journey is five equal cards behind a dashed line,
 * Fitness/Education use list-plus-caption stages. The width transition also
 * mirrors the subject — a call narrowing from "unknown caller" down to one
 * booked consultation.
 *
 * On mobile the rail stacks vertically and every stage is expanded, since a
 * width-based hover reveal is unusable without a pointer.
 */

const STAGES = [
  {
    icon: PhoneIncoming,
    label: "Ring",
    headline: "Answered on the first ring",
    body: "Every enquiry is picked up — including the ones that land while your team is in court, in a consult, or gone for the day.",
  },
  {
    icon: ListFilter,
    label: "Screen",
    headline: "Screened against your rules",
    body: "The agent checks each caller against the practice areas, jurisdictions and intake criteria your firm configures — no judgement on the merits of a matter.",
  },
  {
    icon: FileText,
    label: "Capture",
    headline: "The facts, written down",
    body: "Names, the nature of the matter, dates, and which documents the caller already holds — captured in the caller's own language and logged to your system.",
  },
  {
    icon: Split,
    label: "Route",
    headline: "To the right desk",
    body: "Qualified enquiries reach the right team, urgent ones get flagged, and anything outside your criteria is politely closed out.",
  },
  {
    icon: CalendarCheck,
    label: "Book",
    headline: "A consult on the calendar",
    body: "The agent offers real availability and confirms the slot, with paid consultations captured through Razorpay where you've enabled it.",
  },
]

export function LegalCallFlow() {
  // null = nothing open. Purely hover/focus driven: a stage expands while
  // it's hovered and collapses again on the way out, so the rail sits at
  // rest as five equal columns until the reader engages with it.
  const [active, setActive] = useState<number | null>(null)

  return (
    <div
      onMouseLeave={() => setActive(null)}
      onBlur={(e) => {
        // only close once focus has actually left the rail
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setActive(null)
      }}
      className="flex flex-col gap-3 lg:flex-row lg:gap-2.5"
    >
      {STAGES.map((stage, i) => {
        const isActive = i === active
        return (
          <button
            key={stage.label}
            type="button"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-current={isActive}
            className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-500 ease-out lg:min-h-[248px] ${
              isActive
                ? "border-primary/25 bg-gradient-to-br from-primary/[0.07] to-white shadow-[0_18px_44px_-26px_oklch(0.52_0.22_265/0.5)] lg:flex-[3.2]"
                : "border-slate-200 bg-white hover:border-primary/25 hover:bg-slate-50/60 lg:flex-1"
            }`}
          >
            {/* stage number, kept faint so it orders without shouting */}
            <span
              aria-hidden
              className={`absolute right-4 top-4 text-[11px] font-semibold tabular-nums transition-colors duration-500 ${
                isActive ? "text-primary/50" : "text-muted-foreground/35"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* icon + label centered as their own unit at the top of the card */}
            <div className="flex flex-col items-center text-center">
              <span
                className={`grid size-14 place-items-center rounded-2xl transition-all duration-500 ${
                  isActive ? "bg-primary text-white shadow-md shadow-primary/25" : "bg-primary/10 text-primary"
                }`}
              >
                <stage.icon className="size-7" aria-hidden />
              </span>

              <p
                className={`mt-4 text-[15px] font-bold uppercase tracking-[0.12em] transition-colors duration-500 ${
                  isActive ? "text-primary" : "text-foreground/70"
                }`}
              >
                {stage.label}
              </p>
            </div>

            {/* Headline sits below the label on every card, expanded or
                not — only the longer description is reserved for the
                active state. Centered, primary blue, on the site's default
                Geist sans (no font-serif applied). */}
            <p className="mt-4 text-balance text-center font-sans text-[15px] font-semibold leading-snug tracking-tight text-primary">
              {stage.headline}
            </p>

            <div
              className={`text-left transition-all duration-500 ease-out lg:overflow-hidden ${
                isActive ? "opacity-100 lg:max-h-56" : "opacity-100 lg:max-h-0 lg:opacity-0"
              }`}
            >
              <p className="mt-2 text-pretty text-[13px] leading-relaxed text-muted-foreground">{stage.body}</p>
            </div>

            {/* progress underline on the active stage */}
            <span
              aria-hidden
              className={`absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-primary to-[oklch(0.5_0.22_255)] transition-transform duration-500 ${
                isActive ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}
