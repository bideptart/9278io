"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, type LucideIcon } from "lucide-react"

export type ExpandCardItem = {
  icon: LucideIcon
  tag: string
  title: string
  description: string
  caps: string[]
  agentLine?: string
  href: string
  accent: string
  tile: string
  bar: string
}

const COLLAPSED_WIDTH = "5rem"
const EXPANDED_WIDTH = "26rem"

export function IndustriesExpandCards({ items }: { items: ExpandCardItem[] }) {
  const [expanded, setExpanded] = useState(0)

  return (
    <div className="flex w-full items-stretch justify-center gap-1.5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {items.map((item, i) => {
        const isOpen = i === expanded
        const Icon = item.icon
        return (
          <div
            key={item.title}
            onMouseEnter={() => setExpanded(i)}
            className={`group relative h-[340px] shrink-0 cursor-pointer overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-white to-slate-50 shadow-sm transition-[width] duration-500 ease-in-out ${item.accent}`}
            style={{ width: isOpen ? EXPANDED_WIDTH : COLLAPSED_WIDTH }}
          >
            {/* accent bar */}
            <span className={`pointer-events-none absolute inset-x-0 top-0 h-[3px] ${item.bar}`} aria-hidden />

            {/* Collapsed state — icon + vertical label */}
            <div
              className={`absolute inset-0 flex flex-col items-center gap-3 pt-6 transition-opacity duration-300 ${isOpen ? "pointer-events-none opacity-0" : "opacity-100"}`}
            >
              <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl border ${item.tile}`}>
                <Icon className="size-4" aria-hidden />
              </span>
              <span className="flex flex-col items-center text-[11px] font-semibold uppercase leading-[1.3] text-muted-foreground">
                {item.tag.split("").map((ch, i) =>
                  ch === " " ? <span key={i} className="h-2" aria-hidden /> : <span key={i}>{ch}</span>
                )}
              </span>
            </div>

            {/* Expanded state — full card content */}
            <div
              className={`absolute inset-0 flex w-[26rem] flex-col px-6 py-6 transition-opacity duration-300 ${isOpen ? "opacity-100 delay-150" : "pointer-events-none opacity-0"}`}
            >
              <div className="flex items-center gap-3">
                <span className={`flex size-11 shrink-0 items-center justify-center rounded-2xl border ${item.tile}`}>
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em]">{item.tag}</p>
                  <h3 className="truncate text-lg font-bold tracking-tight text-foreground">{item.title}</h3>
                </div>
              </div>

              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.caps.map((cap) => (
                  <span
                    key={cap}
                    className="rounded-full border border-current/25 bg-current/[0.07] px-2.5 py-0.5 text-[11px] font-semibold"
                  >
                    {cap}
                  </span>
                ))}
              </div>

              {item.agentLine ? (
                <div className="mt-3 flex items-start gap-2 rounded-xl border border-border bg-white/70 px-3 py-2 backdrop-blur-sm">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-current/15 text-[10px] font-bold">
                    A
                  </span>
                  <p className="line-clamp-2 text-[12px] italic leading-relaxed text-slate-500">{item.agentLine}</p>
                </div>
              ) : null}

              <div className="mt-auto flex items-center justify-between pt-3">
                <Link
                  href={item.href}
                  className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold"
                  onClick={(e) => e.stopPropagation()}
                >
                  Explore <ArrowRight className="size-4" aria-hidden />
                </Link>
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  TRAI-compliant
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
