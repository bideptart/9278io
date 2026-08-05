"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

// `icon` is a pre-rendered element, not the icon component itself — lucide
// component references can't cross the server→client boundary as props,
// only rendered JSX (a plain descriptor object) can.
type ExploreLink = { icon: ReactNode; href: string; title: string; description: string }

/**
 * Three link cards where the centre one anchors and the two side cards
 * slide out from behind it — same technique as components/about/values-grid.tsx.
 * Replays every time the section scrolls into view (viewport `once: false`).
 */
export function MultiAgentExploreLinks({ links }: { links: ExploreLink[] }) {
  return (
    <div className="mt-8 grid gap-5 md:grid-cols-3">
      {links.map((l, i) => {
        const isCenter = i === 1
        const fromRight = i === 0 // card to the left starts offset from the centre, toward the right
        return (
          <motion.div
            key={l.href}
            className="h-full"
            style={{ zIndex: isCenter ? 20 : 10 }}
            initial={{ opacity: 0, scale: 0.85, x: isCenter ? 0 : fromRight ? 60 : -60 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 1, delay: isCenter ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={l.href}
              className="group relative block h-full overflow-hidden rounded-xl border border-l-4 border-border border-l-primary bg-gradient-to-br from-slate-50/60 to-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* corner ribbon */}
              <span
                aria-hidden
                className="absolute right-0 top-0 h-12 w-12 bg-primary [clip-path:polygon(100%_0,0_0,100%_100%)]"
              />

              {/* dotted decoration */}
              <div aria-hidden className="absolute right-5 top-12 grid grid-cols-4 gap-1 opacity-60">
                {Array.from({ length: 16 }).map((_, d) => (
                  <span key={d} className="size-1 rounded-full bg-slate-300" />
                ))}
              </div>

              <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                {l.icon}
              </span>

              <p className="mt-4 text-balance text-lg font-bold tracking-tight text-foreground">{l.title}</p>
              <span aria-hidden className="mt-2.5 block h-1 w-8 rounded-full bg-primary" />
              <p className="mt-2.5 text-pretty text-sm leading-relaxed text-muted-foreground">{l.description}</p>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm font-semibold text-primary">Read more</span>
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-white shadow-md transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="size-3.5" aria-hidden />
                </span>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
