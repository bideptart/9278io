"use client"

import type { ReactNode } from "react"
import { motion } from "motion/react"
import { CheckCircle2 } from "lucide-react"

// `icon` is a pre-rendered element, not the icon component itself — lucide
// component references can't cross the server→client boundary as props,
// only rendered JSX (a plain descriptor object) can.
type Capability = {
  icon: ReactNode
  title: string
  description: string
  points: string[]
}

const VIEWPORT = { once: false, amount: 0.3, margin: "0px 0px -10% 0px" } as const

export function MultiAgentCapabilities({ capabilities }: { capabilities: Capability[] }) {
  return (
    <>
      {capabilities.map((c, i) => {
        const isLast = i === capabilities.length - 1
        const fromLeft = i % 2 === 0 // number's side on this row

        return (
          <section
            key={c.title}
            className={isLast ? "" : "border-b border-border/50"}
            style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#F7F9FC" }}
          >
            <div className="mx-auto flex min-h-[420px] max-w-5xl px-6 py-14 md:min-h-[480px] md:px-8 md:py-20">
              <div className={`flex w-full flex-col gap-10 md:items-center md:justify-between ${fromLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <motion.div
                  className="flex shrink-0 items-center"
                  initial={{ opacity: 0, scale: 0.7, x: fromLeft ? -60 : 60 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span
                    className="text-7xl font-bold tracking-tight md:text-[10rem]"
                    style={{ WebkitTextStroke: "2px #2563EB", WebkitTextFillColor: "transparent" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.div>

                <motion.div
                  className="max-w-xl flex-1"
                  initial={{ opacity: 0, x: fromLeft ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-4">
                    {c.icon}
                    <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{c.title}</h3>
                  </div>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{c.description}</p>
                  <ul className="mt-6 flex flex-col gap-3">
                    {c.points.map((point, pi) => (
                      <motion.li
                        key={point}
                        className="flex items-start gap-2.5 text-sm text-foreground/80 md:text-base"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={VIEWPORT}
                        transition={{ duration: 0.5, delay: 0.3 + pi * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
