"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

// `icon` is pre-rendered JSX, not the icon component itself — lucide
// component references can't cross the server→client boundary as props,
// only rendered elements can.
type ExploreLink = { icon: ReactNode; href: string; titlePrefix: string; highlight: string; description: string }

/**
 * Industry-page variant of components/features-page/multi-agent-explore-links.tsx:
 * the centre card anchors while the two side cards slide out from behind it.
 * Shared across the five bespoke industry pages (automotive, education,
 * fitness, legal, retail-ecom) — the other industry pages still render the
 * shared [slug] template and are unaffected.
 */
export function IndustryExploreLinks({ links }: { links: ExploreLink[] }) {
  return (
    <div className="mt-6 grid gap-x-5 gap-y-5 overflow-x-hidden sm:grid-cols-2 lg:grid-cols-3">
      {links.map((link, i) => {
        const isCenter = i === 1
        const fromRight = i === 0 // the card left of centre starts offset toward the right
        return (
          <motion.div
            key={link.href}
            className="h-full"
            style={{ zIndex: isCenter ? 20 : 10 }}
            initial={{ opacity: 0, scale: 0.85, x: isCenter ? 0 : fromRight ? 60 : -60 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 1, delay: isCenter ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={link.href}
              className="group relative block h-full overflow-hidden rounded-2xl border border-l-4 border-slate-200 border-l-primary bg-gradient-to-br from-slate-50/60 to-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <span
                aria-hidden
                className="absolute right-0 top-0 h-12 w-12 bg-primary [clip-path:polygon(100%_0,0_0,100%_100%)]"
              />
              <div aria-hidden className="absolute right-4 top-12 grid grid-cols-4 gap-1 opacity-60">
                {Array.from({ length: 16 }).map((_, d) => (
                  <span key={d} className="size-1 rounded-full bg-slate-300" />
                ))}
              </div>

              <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                {link.icon}
              </span>

              <h3 className="mt-3 min-h-[2.4rem] text-balance text-[15px] font-semibold leading-snug tracking-tight text-foreground">
                {link.titlePrefix}
                <span className="text-primary">{link.highlight}</span>
              </h3>
              <span aria-hidden className="mt-2 block h-1 w-8 rounded-full bg-primary" />
              <p className="mt-2 text-pretty text-[12.5px] leading-relaxed text-muted-foreground">
                {link.description}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-primary">Read more</span>
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-white shadow-md transition-transform duration-300 group-hover:translate-x-0.5">
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
