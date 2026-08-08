"use client"

import { useEffect, useState } from "react"
import { Car, CalendarClock, Wrench, ArrowLeftRight, KeyRound, Quote } from "lucide-react"

type ConversationLine = { speaker: string; text: string }

type AutomotiveDispatchBoardProps = {
  jobs: string[]
  sampleLines: string[]
  conversation: ConversationLine[]
}

const CYCLE_MS = 3000
// Order matches the automotive jobs array in lib/industries.ts exactly —
// service booking, then test-drive follow-up, parts, exchange, pickup.
const BAY_ICONS = [CalendarClock, Car, Wrench, ArrowLeftRight, KeyRound]
const BAY_LABELS = ["Service", "Test drive", "Parts", "Exchange", "Pickup"]

/**
 * Automotive-only "dispatch board" — a light, on-brand alternative to the
 * shared PlaybookStage (used by the other industry pages), so this section
 * doesn't read as a re-skin of Fitness/Education. Same underlying data
 * (jobs/sampleLines/conversation from lib/industries.ts). The distinct
 * touch is the sliding-pill bay selector: an absolutely-positioned pill
 * glides to the active tab (via CSS transition on left/width) rather than
 * the fade/underline patterns used elsewhere on the site.
 */
export function AutomotiveDispatchBoard({ jobs, sampleLines, conversation }: AutomotiveDispatchBoardProps) {
  const [active, setActive] = useState(0)
  const [cycleKey, setCycleKey] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % jobs.length)
    }, CYCLE_MS)
    return () => clearInterval(id)
  }, [jobs.length, cycleKey])

  function selectBay(i: number) {
    setActive(i)
    setCycleKey((k) => k + 1)
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_70px_-40px_oklch(0.52_0.22_265/0.35)]">
      {/* Header strip */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-primary/[0.05] px-5 py-3.5 sm:px-7">
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
          <span className="size-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
          Service bay dispatch
        </p>
        <p className="text-[11px] font-semibold tabular-nums text-muted-foreground">
          Bay {String(active + 1).padStart(2, "0")} / {String(jobs.length).padStart(2, "0")}
        </p>
      </div>

      {/* Bay selector — fixed grid so the sliding pill's left/width can be
          computed exactly from the active index. */}
      <div className="relative grid grid-cols-5 gap-1 border-b border-slate-100 bg-slate-50/60 p-2 sm:p-3">
        <div
          aria-hidden
          className="absolute inset-y-2 rounded-2xl bg-gradient-to-r from-primary to-[oklch(0.5_0.21_255)] shadow-md shadow-primary/25 transition-[left,width] duration-500 ease-out"
          style={{
            left: `calc(${(active / jobs.length) * 100}% + 4px)`,
            width: `calc(${100 / jobs.length}% - 8px)`,
          }}
        />
        {jobs.map((job, i) => {
          const BayIcon = BAY_ICONS[i % BAY_ICONS.length]
          const isActive = i === active
          return (
            <button
              key={job}
              type="button"
              onClick={() => selectBay(i)}
              className={`relative z-10 flex flex-col items-center gap-2 rounded-2xl px-1.5 py-3 text-center transition-colors duration-300 ${
                isActive ? "text-white" : "text-muted-foreground hover:text-primary"
              }`}
            >
              <BayIcon className="size-5 shrink-0" aria-hidden />
              <span className="text-[11px] font-semibold leading-tight sm:text-[13px]">
                {BAY_LABELS[i % BAY_LABELS.length]}
              </span>
            </button>
          )
        })}
      </div>

      {/* Dispatch ticket — active job as a quote. The quote mark sits inline
          beside the heading rather than stacked above it, so the card
          doesn't carry that extra line of height. */}
      <div className="px-5 pt-5 sm:px-7">
        <div className="flex items-start gap-2.5">
          <Quote className="mt-0.5 size-6 shrink-0 text-primary/60" aria-hidden />
          <p className="text-pretty text-lg font-medium leading-relaxed text-foreground sm:text-xl">
            {jobs[active]}
          </p>
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
          {sampleLines[active % sampleLines.length]}
        </p>
      </div>

      {/* Live call strip */}
      <div className="mt-5 border-t border-slate-100 bg-primary/[0.03] px-5 py-5 sm:px-7">
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden />
            Live agent preview
          </p>
          <div className="flex h-4 items-end gap-[2px]" aria-hidden>
            {[6, 11, 8, 13, 9, 7, 12].map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}px`, animationDelay: `${(i % 5) * 0.12}s` }}
                className="ind-eq w-1 rounded-full bg-primary/70"
              />
            ))}
          </div>
        </div>

        {/* Bubbles fade/slide in on a loop (reusing the site's existing
            fit-bubble-cycle keyframe), staggered per line, followed by a
            three-dot typing indicator — so the panel keeps feeling "live"
            instead of sitting static. */}
        <div className="mt-4 space-y-2">
          {conversation.map((line, i) => (
            <div
              key={i}
              style={{ animationDelay: `${i * 1.1}s` }}
              className={`fit-bubble-cycle flex text-sm ${line.speaker === "Agent" ? "justify-start" : "justify-end"}`}
            >
              {line.speaker === "Agent" ? (
                <span className="max-w-[85%] rounded-2xl rounded-bl-sm bg-primary/15 px-3.5 py-2 text-primary ring-1 ring-primary/20">
                  <span className="mr-1 text-[10px] font-bold opacity-60">Agent</span>
                  {line.text}
                </span>
              ) : (
                <span className="max-w-[85%] rounded-2xl rounded-br-sm bg-slate-50 px-3.5 py-2 text-slate-700 ring-1 ring-slate-200">
                  <span className="mr-1 text-[10px] font-bold opacity-40">Caller</span>
                  {line.text}
                </span>
              )}
            </div>
          ))}

          <div className="flex">
            <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-2">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  style={{ animationDelay: `${d * 0.16}s` }}
                  className="fit-typing size-1.5 rounded-full bg-primary"
                />
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
