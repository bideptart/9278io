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
  /** Replay the count-up every time it scrolls into view, instead of just once. */
  once?: boolean
}

/** Counts up from 0 to `value` once it scrolls into view (or every time, if `once` is false). */
export function CountUp({ value, prefix = "", suffix = "", decimals = 0, duration = 1.2, className, once = true }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once, margin: "-10% 0px" })
  const count = useMotionValue(0)
  const display = useTransform(count, (latest) =>
    `${prefix}${latest.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`,
  )

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration, ease: "easeOut" })
      return controls.stop
    }
    if (!once) count.set(0)
  }, [inView, value, duration, count, once])

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  )
}
