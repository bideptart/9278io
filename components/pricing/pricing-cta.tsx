"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { ShaderBackground } from "@/components/ui/silk-shader"

type PricingCtaProps = {
  heading: string
  description: string
  primaryHref: string
  primaryLabel: string
  secondaryHref: string
  secondaryLabel: string
  id?: string
}

// Site-wide closing CTA (originally built for /pricing, now the standard
// CTA everywhere the old static-gradient GradientCta used to be): a live
// WebGL "Silk" shader background and floating glow orbs instead of a flat
// gradient.
export function PricingCta({
  heading,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  id,
}: PricingCtaProps) {
  return (
    <section id={id} className="w-full scroll-mt-24 px-6 py-14 md:px-8 md:py-16">
      <ScrollReveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-primary px-8 py-12 shadow-[0_40px_100px_-40px_oklch(0.52_0.22_265/0.6)] md:px-14 md:py-14">
          {/* Live WebGL "Silk" shader — replaces the flat gradient with a
              slowly-shifting animated background. Dark overlay right after
              it keeps the white heading/body text readable over the
              shader's lighter passages. */}
          <ShaderBackground className="pointer-events-none absolute inset-0" />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/35 via-black/15 to-black/40" />

          {/* Floating glow orbs */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-white/15 blur-[90px]"
            animate={{ x: [0, 24, 0], y: [0, 16, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -right-16 size-80 rounded-full bg-[oklch(0.7_0.15_210/0.35)] blur-[100px]"
            animate={{ x: [0, -20, 0], y: [0, -18, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
          />


          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
            <div className="max-w-xl">
              <h3 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">{heading}</h3>
              <div className="mt-4 h-px w-12 bg-white/40" aria-hidden />
              <p className="mt-4 text-pretty text-base leading-relaxed text-white/85 md:text-lg">{description}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-white px-8 text-base font-semibold text-primary shadow-[0_10px_30px_oklch(0.2_0.1_262/0.35)] transition-all hover:bg-white/90"
              >
                <Link href={primaryHref}>
                  {primaryLabel}
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-white/40 bg-white/10 px-7 text-base font-semibold text-white backdrop-blur hover:border-white/60 hover:bg-white/20 hover:text-white"
              >
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
