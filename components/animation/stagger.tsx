"use client"

import type React from "react"
import { motion, type Variants } from "motion/react"
import { cn } from "@/lib/utils"

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i },
  }),
}

type StaggerProps = {
  children: React.ReactNode
  className?: string
  /** Delay between each direct child */
  stagger?: number
  role?: string
}

export function StaggerGroup({ children, className, stagger = 0.08, ...rest }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: 0.05 },
        },
      }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode
  className?: string
  role?: string
}) {
  return (
    <motion.div variants={variants} className={cn(className)} {...rest}>
      {children}
    </motion.div>
  )
}

/**
 * Unlike StaggerItem (which needs a StaggerGroup ancestor and fires all
 * children together once the group scrolls into view), each ScrollStepItem
 * has its own `whileInView` trigger — so in a tall list, later rows reveal
 * only once you've actually scrolled down to them, not all at once.
 *
 * `once: false` makes it reversible: scrolling back up past a row plays the
 * reveal in reverse (fades/slides back to `initial`), then it replays
 * forward again if you scroll back down to it.
 */
export function ScrollStepItem({
  children,
  className,
  index = 0,
  ...rest
}: {
  children: React.ReactNode
  className?: string
  index?: number
  role?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 5) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
