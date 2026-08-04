"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import type { ReactNode } from "react"

type DetailItem = {
  icon: ReactNode
  title: string
  description: string
}

// Percent-of-own-width pull toward the center column, at rest (scroll
// progress 0). Animating this down to 0% as the section scrolls only ever
// moves each card *inward* from its natural grid slot toward stacked —
// never past its slot outward — so the cards can never spill past the
// container's edge, which stays a plain overflow-hidden box.
const STACK_PULL = [108, 0, -108]
const STACK_ROTATE = [-6, 0, 6]
const STACK_Z = [10, 20, 10]

function GlassTile({ item, index }: { item: DetailItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.35"] })
  const x = useTransform(scrollYProgress, [0, 1], [`${STACK_PULL[index]}%`, "0%"])
  const rotate = useTransform(scrollYProgress, [0, 1], [STACK_ROTATE[index], 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1])

  return (
    <motion.div
      ref={ref}
      style={{ x, rotate, scale, zIndex: STACK_Z[index] }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px", amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      className="glass-panel group relative rounded-2xl p-6 shadow-[0_8px_30px_-16px_rgba(15,23,42,0.15)] transition-shadow duration-300 hover:shadow-[0_16px_40px_-16px_rgba(15,23,42,0.22)]"
    >
      <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.42_0.19_264)] text-white shadow-[0_10px_24px_-8px_oklch(0.546_0.215_262.88/0.5)] transition-transform duration-300 group-hover:scale-110 [&_svg]:size-5">
        {item.icon}
      </span>
      <p className="mt-4 text-base font-semibold tracking-tight text-foreground">{item.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
    </motion.div>
  )
}

/**
 * "What you get" as a row of glassmorphism tiles that start stacked in
 * the center like a card deck and separate into place as the section
 * scrolls through view — the left card peels off to the left, the right
 * card to the right, the middle card holds still. Each tile only ever
 * moves inward from its natural grid slot toward the stacked state, so
 * it can never spill past the container's own rounded, clipped edge.
 * Distinct from the plain card grid, numbered list, split rows, spotlight
 * panel, and receipt ledger used for "what you get" elsewhere on the site.
 */
export function DetailGlassRow({ items }: { items: DetailItem[] }) {
  return (
    <div className="mesh-gradient-bg relative overflow-hidden rounded-3xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-3">
        {items.map((item, i) => (
          <GlassTile key={item.title} item={item} index={i} />
        ))}
      </div>
    </div>
  )
}
