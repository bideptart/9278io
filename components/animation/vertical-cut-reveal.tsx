"use client"

import { motion } from "motion/react"

/**
 * "Vertical cut reveal" text animation: each word sits inside an
 * overflow-hidden mask and slides up from below it (as if a guillotine
 * cut were sliding away), staggered left to right. Plays once when the
 * text scrolls into view.
 */
export function VerticalCutReveal({
  text,
  className,
  wordClassName,
  staggerDelay = 0.05,
  startDelay = 0,
}: {
  text: string
  className?: string
  wordClassName?: string
  staggerDelay?: number
  startDelay?: number
}) {
  const words = text.split(" ")

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className={`inline-block overflow-hidden pb-1 align-bottom ${i < words.length - 1 ? "mr-[0.25em]" : ""}`}
        >
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
              delay: startDelay + i * staggerDelay,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
