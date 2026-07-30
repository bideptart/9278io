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
      viewport={{ once: true, margin: "-80px" }}
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
