"use client"

import type { ReactNode } from "react"
import { motion } from "motion/react"

// `icon` is a pre-rendered element, not the icon component itself — lucide
// component references can't cross the server→client boundary as props,
// only rendered JSX (a plain descriptor object) can.
type Value = { icon: ReactNode; title: string; description: string }

/**
 * Three value cards where the center one anchors and the two side cards
 * slide out from behind it. Replays every time the section scrolls into
 * view (viewport `once: false`), not just on first load.
 */
export function ValuesGrid({ values }: { values: Value[] }) {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {values.map((v, i) => {
        const isCenter = i === 1
        const fromRight = i === 0 // card to the left starts offset from the center, toward the right
        return (
          <motion.div
            key={v.title}
            className="h-full"
            style={{ zIndex: isCenter ? 20 : 10 }}
            initial={{ opacity: 0, scale: 0.85, x: isCenter ? 0 : fromRight ? 60 : -60 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1, delay: isCenter ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-full rounded-2xl border border-border bg-white p-7 shadow-[0_16px_34px_-24px_oklch(0.2_0.05_260/0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_50px_-20px_oklch(0.546_0.215_262.88/0.3)]">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.42_0.19_264)] text-white shadow-[0_6px_14px_-4px_oklch(0.546_0.215_262.88/0.45)]">
                {v.icon}
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
