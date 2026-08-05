"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"

// Unlike ScrollReveal / StaggerGroup (which trigger once and then play a
// fixed-duration animation), this ties the reveal directly to scroll
// position: as the element scrolls up through the viewport, its content
// progressively unclips and fades in in step with the scroll — scroll
// slowly and it reveals slowly; scroll back up and it retreats. A true
// scrubbed reveal, not a timed one.
export function ScrollLinkedReveal({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode
  className?: string
  as?: "div" | "li"
}) {
  const ref = useRef<HTMLLIElement & HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    // Progress 0 when the element's top edge is 92% down the viewport
    // (just entering), progress 1 once it's reached 45% up (comfortably
    // in view) — the whole reveal happens within that scroll span.
    offset: ["start 92%", "start 45%"],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [30, 0])
  const revealPercent = useTransform(scrollYProgress, [0, 1], [100, 0])
  const clipPath = useTransform(revealPercent, (v) => `inset(0 ${v}% 0 0)`)

  const MotionTag = motion[as]

  return (
    <MotionTag ref={ref} style={{ opacity, y, clipPath }} className={className}>
      {children}
    </MotionTag>
  )
}
