"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { RotateCw } from "lucide-react"
import type { ReactNode } from "react"

type DetailItem = { icon: ReactNode; title: string; description: string }

/**
 * "What you get" as a row of 3D flip cards — each capability sits on a
 * card front (icon + title) that flips 180° on click to reveal its
 * description on the back face, then flips back. Cards float gently, tilt
 * and lift on hover, and get a diagonal light-sweep sheen. A genuinely
 * different interaction (3D flip, no split panel, no tabs, no list, no
 * bubbles, no connected line, no rotation-scatter) from every "what you
 * get" format used elsewhere on the site.
 */
export function DetailFlipCards({ items }: { items: DetailItem[] }) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set())

  function toggle(i: number) {
    setFlipped((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-3">
      {items.map((item, i) => {
        const isFlipped = flipped.has(i)
        return (
          <motion.button
            key={item.title}
            type="button"
            onClick={() => toggle(i)}
            initial={{ opacity: 0, y: 24, rotateX: -20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            aria-label={`${item.title} — click to ${isFlipped ? "show summary" : "show details"}`}
            className="group relative h-56 [perspective:1200px]"
          >
            <motion.div
              animate={{
                rotateY: isFlipped ? 180 : 0,
                y: [0, -5, 0],
              }}
              transition={{
                rotateY: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 3.6 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
              }}
              className="relative size-full [transform-style:preserve-3d]"
            >
              {/* front */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-border/60 bg-white p-6 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow group-hover:shadow-[0_24px_50px_-24px_rgba(37,99,235,0.35)]"
                style={{ backfaceVisibility: "hidden" }}
              >
                {/* diagonal sheen sweep on hover */}
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 group-hover:opacity-100"
                  initial={false}
                  animate={{ x: ["-120%", "320%"] }}
                  transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
                />

                <motion.span
                  whileHover={{ rotate: 8, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300, damping: 14 }}
                  className="relative flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"
                >
                  {item.icon}
                </motion.span>
                <p className="relative text-sm font-bold tracking-tight text-foreground">{item.title}</p>
                <span className="relative flex items-center gap-1 text-[10px] font-semibold text-muted-foreground/70">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="flex"
                  >
                    <RotateCw className="size-3" aria-hidden />
                  </motion.span>
                  Tap to flip
                </span>
              </div>

              {/* back */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.42_0.19_264)] p-6 text-center text-white shadow-[0_20px_45px_-20px_rgba(37,99,235,0.5)]"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <span aria-hidden className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-white/10 blur-2xl" />
                <p className="relative text-sm font-bold tracking-tight">{item.title}</p>
                <p className="relative text-xs leading-relaxed text-white/85">{item.description}</p>
              </div>
            </motion.div>
          </motion.button>
        )
      })}
    </div>
  )
}
