"use client"

import { useEffect, useRef } from "react"
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react"

type CountUpProps = {
  /** Final value to count up to. */
  value: number
  /** Text before the number, e.g. "₹". */
  prefix?: string
  /** Text after the number, e.g. "ms", "%". */
  suffix?: string
  /** Decimal places to show. */
  decimals?: number
  /** Animation duration in seconds. */
  duration?: number
  className?: string
}

/** Counts up from 0 to `value` once it scrolls into view. */
export function CountUp({ value, prefix = "", suffix = "", decimals = 0, duration = 1.2, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })
  const count = useMotionValue(0)
  const display = useTransform(count, (latest) =>
    `${prefix}${latest.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`,
  )

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, value, { duration, ease: "easeOut" })
    return controls.stop
  }, [inView, value, duration, count])

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  )
}
