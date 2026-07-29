"use client"

import type { ReactNode } from "react"
import { motion } from "motion/react"

type UseCase = {
  icon: ReactNode
  label: string
  caption: string
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, x: 12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
}

const line = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.4, ease: "easeOut" } },
}

export function UseCaseGrid({ items }: { items: UseCase[] }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-60px" }}
      className="relative"
    >
      <motion.span
        aria-hidden
        variants={line}
        style={{ transformOrigin: "top" }}
        className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-border to-transparent"
      />
      {items.map((u, i) => (
        <motion.div key={u.label} variants={item} className="group relative flex gap-4 pb-8 last:pb-0">
          <motion.span
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.42_0.19_264)] text-white shadow-[0_6px_16px_-4px_oklch(0.546_0.215_262.88/0.5)] ring-4 ring-slate-50"
          >
            {u.icon}
          </motion.span>
          <div className="pt-1">
            <p className="flex items-baseline gap-2 font-semibold text-foreground">
              <span className="text-xs font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
              {u.label}
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">{u.caption}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
