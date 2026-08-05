"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"

type DetailItem = {
  icon: ReactNode
  title: string
  description: string
  tags: string[]
  accent: string
}

const ROTATIONS = [-6, 3, -3]
const OFFSETS = [
  { top: 0, left: "2%" },
  { top: 40, left: "36%" },
  { top: 10, left: "68%" },
]

/**
 * "What you get" as a scattered fan of tilted cards on a soft gradient
 * backdrop — each capability on its own card, rotated and overlapping
 * like a spread deck, with a colored top accent and small pill tags.
 * A completely different composition (loose, playful, non-grid) from
 * the audio-track rows, plain card grid, numbered list, split rows,
 * spotlight panel, receipt ledger, and glass-row used for "what you get"
 * elsewhere on the site.
 */
export function DetailScatteredCards({ items }: { items: (DetailItem & { icon: ReactNode })[] }) {
  return (
    <div className="relative mt-8 min-h-[280px] overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.08] via-primary/[0.04] to-transparent p-6 sm:min-h-[240px] sm:p-10">
      <div className="relative mx-auto max-w-2xl">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: ROTATIONS[i % ROTATIONS.length] }}
            whileHover={{
              rotate: 0,
              scale: 1.03,
              zIndex: 20,
              transition: { type: "spring", stiffness: 260, damping: 24, mass: 0.6 },
            }}
            viewport={{ once: true, margin: "-60px", amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-4 w-full max-w-[300px] rounded-2xl border-t-4 bg-white p-4 shadow-[0_20px_45px_-20px_rgba(15,23,42,0.25)] sm:absolute sm:mb-0"
            style={{
              borderTopColor: item.accent,
              top: OFFSETS[i % OFFSETS.length].top,
              left: OFFSETS[i % OFFSETS.length].left,
              zIndex: i,
            }}
          >
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3.6 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: 1 + i * 0.3 }}
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                {item.icon}
              </span>
              <p className="mt-3 text-sm font-bold tracking-tight text-foreground">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-primary/20 bg-primary/[0.05] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primary">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      {/* spacer to reserve height on mobile stacked layout */}
      <div className="hidden sm:block sm:h-[210px]" aria-hidden />
    </div>
  )
}
