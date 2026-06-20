"use client"

import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { FeatureCarousel } from "@/components/ui/feature-carousel"

export function Features() {
  return (
    <section id="features" className="border-b border-border">
      <div className="w-full px-6 py-24 md:px-8 md:py-32">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary"
          >
            <motion.span className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
            Features
          </motion.span>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Everything your voice agent needs.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Built for Indian businesses — low latency, multi-language, TRAI-compliant, priced per second.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-14">
          <FeatureCarousel />
        </ScrollReveal>
      </div>
    </section>
  )
}
