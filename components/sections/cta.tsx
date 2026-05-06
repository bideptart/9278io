"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CalendarDays, PhoneCall } from "lucide-react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

const badges = ["TRAI Compliant", "DPDP Act Ready", "Data Stored in India", "GST Invoicing"]

export function CTA() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Background glows */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/4 top-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.07] blur-[100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 top-1/2 -z-10 h-[300px] w-[400px] -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/[0.04] blur-[80px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 3 }}
      />

      <div className="relative mx-auto w-full max-w-4xl px-4 py-24 text-center md:px-6 md:py-32">
        <ScrollReveal>
          {/* Badge row */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            {badges.map((b) => (
              <span
                key={b}
                className="rounded-full border border-border bg-white/[0.04] px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {b}
              </span>
            ))}
          </div>

          <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Ready to automate your{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
              India calls?
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground md:text-lg">
            Join 500+ Indian businesses already handling calls in Hindi, Tamil, Telugu, and 15+ languages with 9278.io.
            Deploy your first agent today — no credit card required to start.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_0_32px_oklch(0.78_0.16_195/0.35)] transition-all hover:bg-primary/90 hover:shadow-[0_0_48px_oklch(0.78_0.16_195/0.5)]"
            >
              <Link href="/get-started">
                Start Now — It's Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-border bg-white/[0.04] px-8 text-base font-semibold backdrop-blur-sm hover:border-border/80 hover:bg-white/[0.07]"
            >
              <a href="https://dashboard.9278.io/login">
                <PhoneCall className="mr-2 h-4 w-4" />
                Contact Sales
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-12 rounded-xl px-8 text-base font-semibold text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
            >
              <Link href="/get-started">
                <CalendarDays className="mr-2 h-4 w-4" />
                Book a Demo
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-xs text-muted-foreground/60">
            No credit card required · Go live in minutes · Cancel anytime
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
