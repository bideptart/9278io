"use client"

import { useEffect, useRef } from "react"
import { animate, motion, useMotionValue, useTransform } from "motion/react"

/** Rolls/counts fast from the previous value to `value` whenever it changes. */
export function AnimatedPrice({ value }: { value: number }) {
  const count = useMotionValue(value)
  const prevValue = useRef(value)
  const display = useTransform(count, (latest) => `₹${Math.round(latest).toLocaleString("en-IN")}`)

  useEffect(() => {
    if (prevValue.current === value) return
    prevValue.current = value
    const controls = animate(count, value, { duration: 0.5, ease: "easeOut" })
    return controls.stop
  }, [value, count])

  return <motion.span>{display}</motion.span>
}
