"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { MessageSquareQuote } from "lucide-react"
import { cn } from "@/lib/utils"

type ConversationLine = { speaker: string; text: string }

type PlaybookStageProps = {
  jobs: string[]
  sampleLines: string[]
  conversation: ConversationLine[]
  /* Optional illustration that fills the space under the transcript. Left
     unset, the card renders exactly as before — so pages that reuse this
     component are unaffected. */
  image?: { src: string; alt: string; width: number; height: number }
}

const CYCLE_MS = 2800

/**
 * Auto-cycling "playbook selector + live call" pair. The left card's
 * active row is driven by a timer (with a per-row progress bar showing
 * time-to-next), and its rotating caption on the right card is derived
 * from the same index — so the two cards read as one connected demo.
 * Clicking a row jumps straight to it and restarts the timer from there.
 */
export function PlaybookStage({ jobs, sampleLines, conversation, image }: PlaybookStageProps) {
  const [active, setActive] = useState(0)
  const [cycleKey, setCycleKey] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % jobs.length)
    }, CYCLE_MS)
    return () => clearInterval(id)
  }, [jobs.length, cycleKey])

  function selectJob(i: number) {
    setActive(i)
    setCycleKey((k) => k + 1)
  }

  const caption = sampleLines[active % sampleLines.length]

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-7">
      {/* ── Playbooks card ── */}
      <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between px-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Playbooks</p>
          <p className="text-xs font-semibold tabular-nums text-primary">
            {String(active + 1).padStart(2, "0")} / {String(jobs.length).padStart(2, "0")}
          </p>
        </div>

        {/* segmented progress bar — the active segment fills over the cycle */}
        <div className="mt-3 flex gap-1 px-1" aria-hidden>
          {jobs.map((_, i) => (
            <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-slate-100">
              <span
                key={i === active ? cycleKey : undefined}
                className={cn(
                  "block h-full rounded-full bg-primary",
                  i < active && "w-full",
                  i === active && "fit-progress-fill",
                  i > active && "w-0",
                )}
              />
            </span>
          ))}
        </div>

        <ol className="mt-3 flex-1 space-y-1">
          {jobs.map((job, i) => {
            const isActive = i === active
            return (
              <li key={job}>
                <button
                  type="button"
                  onClick={() => selectJob(i)}
                  aria-current={isActive}
                  className={cn(
                    "group flex w-full items-center gap-3.5 rounded-xl px-3 py-3 text-left transition-colors duration-300",
                    isActive ? "bg-primary/[0.07]" : "hover:bg-slate-50",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-7 shrink-0 place-items-center rounded-lg text-xs font-bold transition-colors duration-300",
                      isActive ? "bg-primary text-white shadow-sm shadow-primary/30" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-500",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={cn(
                      "text-pretty text-sm leading-relaxed transition-colors duration-300",
                      isActive ? "font-semibold text-foreground" : "text-muted-foreground group-hover:text-foreground/80",
                    )}
                  >
                    {job}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>

      {/* ── Live-call card ── */}
      <div className="relative h-full">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-primary/[0.14] blur-[70px]"
        />
        <div className="hero-float-up flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/[0.06]">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-primary/[0.07] to-transparent px-5 py-3.5">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden />
              Live agent preview
            </p>
            <div className="flex h-5 items-end gap-[2px]" aria-hidden>
              {[7, 13, 9, 15, 11, 8, 14].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}px`, animationDelay: `${(i % 5) * 0.12}s` }}
                  className="ind-eq w-1 rounded-full bg-primary/70"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2 p-5">
            {conversation.map((line, i) => (
              <div key={i} className={cn("flex text-sm", line.speaker === "Agent" ? "justify-start" : "justify-end")}>
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

            {image && (
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="mt-auto h-auto w-full rounded-xl border border-slate-200"
              />
            )}
          </div>

          {/* rotating caption, synced with the active playbook on the left */}
          <div className="flex items-start gap-3 border-t border-slate-100 bg-slate-50 px-5 py-4" aria-live="polite">
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <MessageSquareQuote className="size-3.5" aria-hidden />
            </span>
            <p key={active} className="ind-item-in text-pretty text-sm leading-relaxed text-foreground/80">
              {caption}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
