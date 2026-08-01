"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { Play, Palette, RefreshCw, Globe } from "lucide-react"

const features = [
  {
    icon: Play,
    title: "Preview before you assign",
    description: "Hear a real clip of any voice before it ever answers a call, and compare voices side by side.",
  },
  {
    icon: Palette,
    title: "A personality for every voice",
    description: "Each of the ten named voices comes with its own personality description, so the tone matches your brand.",
  },
  {
    icon: RefreshCw,
    title: "Switch anytime, no rebuild",
    description: "Change an agent's voice whenever you want — knowledge base, routing, and behavior stay exactly as they were.",
  },
  {
    icon: Globe,
    title: "Switch languages instantly",
    description: "Same agent, same knowledge base — flip between 10+ Indian languages mid-conversation, no extra setup.",
  },
]

// Each step reveals in turn: icon appears, its title and description finish
// typing in fully, THEN the line advances to the next icon, which then
// reveals with its own text — one complete step at a time, not overlapping.
const WORD_STAGGER = 0.02
const WORD_START = 0.1
const WORD_DURATION = 0.1
const LINE_DURATION = 0.14
const textDoneOffset = (words: number) => WORD_START + (words - 1) * WORD_STAGGER + WORD_DURATION
const maxTextDoneOffset = Math.max(...features.map((f) => textDoneOffset(f.description.split(" ").length)))
const STEP = maxTextDoneOffset + LINE_DURATION + 0.04
const cardDelay = (i: number) => i * STEP
const lineDelay = (i: number) => i * STEP + maxTextDoneOffset

// icon tiles are size-12 (48px, half = 24px) and sit at the left edge of
// each grid column (lg:mx-0); columns are equal fractions with a 48px
// (gap-x-12) gutter between them. Each line segment should run exactly from
// one icon's center to the next icon's center — not past it — so it's
// expressed as a calc() off the shared column math rather than a flat split.
const GAP = 48
const ICON_HALF = 24
const N = features.length
const COL_WIDTH = `(100% - ${GAP * (N - 1)}px)/${N}`
const SEGMENT_WIDTH = `calc(${COL_WIDTH} + ${GAP}px)`

export function VoiceSelectionSteps() {
  const containerRef = useRef<HTMLDivElement>(null)
  // Whole row shares one inView state, so scrolling it in OR out always
  // resets and replays the entire sequence together — instead of each
  // element tracking its own viewport threshold and drifting out of sync.
  const inView = useInView(containerRef, { once: false, amount: 0.3 })

  return (
    <div ref={containerRef} className="relative mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: N - 1 }).map((_, k) => (
        <motion.div
          key={k}
          aria-hidden
          className="absolute top-6 hidden origin-left rounded-full lg:block"
          style={{
            left: k === 0 ? `${ICON_HALF}px` : `calc(${ICON_HALF}px + ${k} * ${SEGMENT_WIDTH})`,
            width: SEGMENT_WIDTH,
            height: "3px",
            background:
              k === N - 2
                ? "linear-gradient(90deg, #2563EB 0%, #2563EB 60%, rgba(37,99,235,0.15))"
                : k === 0
                  ? "linear-gradient(90deg, rgba(37,99,235,0.15), #2563EB 40%, #2563EB 100%)"
                  : "#2563EB",
            boxShadow: "0 0 8px rgba(37,99,235,0.4)",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ duration: LINE_DURATION, delay: inView ? lineDelay(k) : 0, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
      {features.map((f, i) => {
        const Icon = f.icon
        return (
          <motion.div key={f.title} className="group relative h-full text-center lg:text-left">
            <motion.div
              className="relative z-10 mx-auto flex size-12 items-center justify-center rounded-2xl bg-white lg:mx-0"
              style={{ border: "1px solid #E4ECFF", boxShadow: "0 10px 24px -14px rgba(37,99,235,0.35)" }}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 28 }}
              transition={{ duration: 0.14, delay: inView ? cardDelay(i) : 0, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, rotate: -6, scale: 1.05, transition: { duration: 0.15, delay: 0 } }}
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.5 }}
                transition={{ duration: 0.1, delay: inView ? cardDelay(i) + 0.03 : 0 }}
              >
                <Icon className="size-5" style={{ color: "#2563EB" }} aria-hidden />
              </motion.span>
            </motion.div>
            <motion.span
              className="relative mx-auto mt-3 flex size-6 items-center justify-center rounded-full text-[11px] font-bold text-white lg:mx-0"
              style={{ background: "linear-gradient(135deg, #4F8DFF, #2563EB)" }}
              initial={{ scale: 0 }}
              animate={{ scale: inView ? 1 : 0 }}
              transition={{ duration: 0.16, delay: inView ? cardDelay(i) + 0.025 : 0, type: "spring", stiffness: 500, damping: 24 }}
            >
              {i + 1}
              {inView && (
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ border: "1.5px solid #2563EB" }}
                  animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeOut", delay: cardDelay(i) + 0.08 }}
                />
              )}
            </motion.span>
            <motion.h3
              className="mt-6 text-lg font-semibold tracking-tight"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
              transition={{ duration: 0.12, delay: inView ? cardDelay(i) + 0.06 : 0 }}
            >
              {f.title}
            </motion.h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {f.description.split(" ").map((word, w) => (
                <motion.span
                  key={w}
                  className="inline-block"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 6 }}
                  transition={{ duration: WORD_DURATION, delay: inView ? cardDelay(i) + WORD_START + w * WORD_STAGGER : 0 }}
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </p>
          </motion.div>
        )
      })}
    </div>
  )
}
