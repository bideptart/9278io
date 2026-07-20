"use client"

import { useEffect, useRef } from "react"
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react"

/** Counts up from 0 to `value` once it scrolls into view. */
export function AnimatedStatValue({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number
  prefix?: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const count = useMotionValue(0)
  const display = useTransform(count, (latest) => `${prefix}${Math.round(latest).toLocaleString("en-IN")}${suffix}`)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(count, value, { duration: 1.2, ease: "easeOut" })
    return controls.stop
  }, [isInView, value, count])

  return <motion.span ref={ref}>{display}</motion.span>
}
