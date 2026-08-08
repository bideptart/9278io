"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import type { ReactNode } from "react"

type DetailItem = {
  icon: ReactNode
  title: string
  description: string
}

const CYCLE_MS = 2400

/**
 * "What you get" as a full-width professional ledger — numbered rows with
 * a small icon chip, title, and description, each spanning the full
 * container width instead of a narrow icon+text pair with dead space
 * beside it. Clean bordered cards, distinct from the split-rows, grid,
 * numbered-list, and bordered-row treatments used elsewhere on the site.
 * Beyond hover, a "spotlight" row auto-cycles on repeat — its number and
 * icon light up and the arrow slides into view — so the ledger reads as
 * live even before a visitor touches it, then hover still takes over.
 */
export function DetailProfessionalLedger({ items }: { items: DetailItem[] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % items.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [paused, items.length])

  return (
    <div
      className="divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/60 bg-white"
      onMouseLeave={() => setPaused(false)}
    >
      {items.map((d, i) => {
        const isActive = i === active
        return (
          <motion.div
            key={d.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px", amount: 0.4 }}
            animate={{ backgroundColor: isActive ? "rgba(37,99,235,0.03)" : "rgba(37,99,235,0)" }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => {
              setPaused(true)
              setActive(i)
            }}
            className="group flex w-full items-center gap-5 px-6 py-6 sm:px-8"
          >
            <motion.span
              animate={{ color: isActive ? "var(--primary)" : "color-mix(in oklab, var(--muted-foreground) 40%, transparent)" }}
              transition={{ duration: 0.3 }}
              className="font-mono text-sm font-bold sm:text-base"
            >
              {String(i + 1).padStart(2, "0")}
            </motion.span>

            <motion.span
              animate={{
                backgroundColor: isActive ? "var(--primary)" : "color-mix(in oklab, var(--primary) 7%, transparent)",
                color: isActive ? "#ffffff" : "var(--primary)",
              }}
              transition={{ duration: 0.3 }}
              className="flex size-12 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ring-primary/10 [&_svg]:size-5"
            >
              {d.icon}
            </motion.span>

            <div className="min-w-0 flex-1">
              <p className="text-base font-semibold tracking-tight text-foreground sm:text-lg">{d.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
            </div>

            <motion.span
              animate={{
                x: isActive ? 4 : 0,
                color: isActive ? "var(--primary)" : "color-mix(in oklab, var(--muted-foreground) 40%, transparent)",
              }}
              transition={{ duration: 0.3 }}
              className="hidden shrink-0 sm:block"
            >
              <ArrowRight className="size-5" aria-hidden />
            </motion.span>
          </motion.div>
        )
      })}
    </div>
  )
}
