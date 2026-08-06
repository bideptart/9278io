"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CenterOutItem } from "@/components/industries/center-out-reveal"

// `icon` is a pre-rendered element, not the icon component itself — lucide
// component references can't cross the server→client boundary as props,
// only rendered JSX (a plain descriptor object) can.
type ExploreLink = { icon: ReactNode; href: string; title: string; description: string }

/**
 * Three link cards where the centre one anchors and the two side cards
 * slide out from behind it — replays every time the section scrolls into
 * view, same as the industry-page "Other industries we power" cards.
 */
export function MultiAgentExploreLinks({ links }: { links: ExploreLink[] }) {
  return (
    <div className="mt-8 grid gap-5 overflow-x-clip md:grid-cols-3">
      {links.map((l, i) => {
        const position = i === 0 ? "left" : i === 2 ? "right" : "middle"
        return (
          <CenterOutItem key={l.href} position={position}>
            <Link
              href={l.href}
              className="group relative block h-full overflow-hidden rounded-xl border border-l-4 border-border border-l-primary bg-gradient-to-br from-slate-50/60 to-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* corner ribbon */}
              <span
                aria-hidden
                className="absolute right-0 top-0 h-10 w-10 bg-primary [clip-path:polygon(100%_0,0_0,100%_100%)]"
              />

              {/* dotted decoration */}
              <div aria-hidden className="absolute right-4 top-10 grid grid-cols-4 gap-1 opacity-60">
                {Array.from({ length: 16 }).map((_, d) => (
                  <span key={d} className="size-1 rounded-full bg-slate-300" />
                ))}
              </div>

              <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                {l.icon}
              </span>

              <p className="mt-3 text-balance text-[15px] font-bold leading-snug tracking-tight text-foreground">{l.title}</p>
              <span aria-hidden className="mt-2 block h-1 w-7 rounded-full bg-primary" />
              <p className="mt-2 text-pretty text-[12.5px] leading-relaxed text-muted-foreground">{l.description}</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-[12.5px] font-semibold text-primary">Read more</span>
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-white shadow-md transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="size-3" aria-hidden />
                </span>
              </div>
            </Link>
          </CenterOutItem>
        )
      })}
    </div>
  )
}
