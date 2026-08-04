"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import type { ReactNode } from "react"

type DetailItem = { icon: ReactNode; title: string; description: string }

const TYPING_HOLD = 550
const STAGGER = 700

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-muted-foreground/50"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

/**
 * "What you get" as an alternating chat-bubble thread — each capability
 * shown as a message bubble with a colored avatar, left/right alternating
 * like a conversation, each preceded by a brief "typing…" indicator before
 * the message pops in. A messaging-app metaphor, distinct from the card
 * grids, glass rows, numbered lists, split rows, spotlight panel, and
 * scattered cards used for "what you get" elsewhere on the site.
 */
export function DetailChatBubbles({ items }: { items: DetailItem[] }) {
  const [revealed, setRevealed] = useState(0)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!inView) return
    const timers: ReturnType<typeof setTimeout>[] = []
    items.forEach((_, i) => {
      timers.push(setTimeout(() => setRevealed((r) => Math.max(r, i + 1)), TYPING_HOLD + i * STAGGER))
    })
    return () => timers.forEach(clearTimeout)
  }, [inView, items])

  return (
    <motion.div
      className="mx-auto mt-8 flex max-w-xl flex-col gap-4"
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, margin: "-60px", amount: 0.4 }}
    >
      {items.map((item, i) => {
        const fromRight = i % 2 === 1
        const isRevealed = revealed > i
        const isTyping = inView && revealed === i
        return (
          <motion.div
            key={item.title}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            initial={{ opacity: 0, x: fromRight ? 24 : -24 }}
            transition={{ duration: 0.35, delay: i * STAGGER * 0.001, ease: "easeOut" }}
            className={`flex items-start gap-3 ${fromRight ? "flex-row-reverse self-end" : "self-start"}`}
          >
            <motion.span
              initial={{ scale: 0.6 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ type: "spring", stiffness: 300, damping: 16, delay: i * STAGGER * 0.001 }}
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
            >
              {item.icon}
            </motion.span>
            <div
              className={`max-w-sm rounded-2xl border border-border/60 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${
                fromRight ? "rounded-tr-sm" : "rounded-tl-sm"
              }`}
            >
              <AnimatePresence mode="wait">
                {isTyping ? (
                  <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <TypingDots />
                  </motion.div>
                ) : isRevealed ? (
                  <motion.div key="content" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <p className="text-sm font-bold tracking-tight text-foreground">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                  </motion.div>
                ) : (
                  <div key="placeholder" className="h-4 w-24" />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
