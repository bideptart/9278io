"use client"

import { Code2, FlaskConical, Rocket, BarChart3 } from "lucide-react"
import { motion } from "motion/react"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"

const steps = [
  {
    number: "01",
    icon: Code2,
    title: "Build",
    description:
      "Write your agent's behavior in plain English, or start from a ready-made template. Paste your website URL to auto-import company facts and FAQs — no engineering required.",
  },
  {
    number: "02",
    icon: FlaskConical,
    title: "Evaluate",
    description:
      "Review and edit your agent's voice, language, and behavior any time in a simple form. Changes save and apply immediately — no redeploy needed.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Launch",
    description:
      "Provision an Indian DID from ₹400/month or port your existing number through our SIP trunk. Go live in minutes.",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Optimize",
    description:
      "Track call counts, minutes used, and average call duration in your dashboard. Fine-tune your agent's prompt based on real call data.",
  },
]

export function HowItWorks() {
  return (
    <section className="border-b border-border">
      <div className="w-full px-6 py-14 md:px-8 md:py-20">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary"
          >
            <motion.span className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
            How It Works
          </motion.span>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Every call your business makes.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Inbound front desk, follow-ups and reminders — one platform,
            TRAI-compliant, live in hours.
          </p>
        </ScrollReveal>

        <StaggerGroup className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <StaggerItem key={step.number}>
                <motion.div
                  className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border border-primary bg-primary p-7 shadow-[0_4px_20px_oklch(0.52_0.22_265/0.25)] transition-all duration-300 hover:border-border hover:bg-white hover:shadow-md"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  {/* Top shine on hover */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="flex items-start justify-between">
                    <span className="text-5xl font-black leading-none text-white/40 transition-colors duration-300 group-hover:text-primary/40">{step.number}</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/[0.12] text-white transition-colors duration-300 group-hover:border-primary/20 group-hover:bg-primary/[0.08] group-hover:text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70 transition-colors duration-300 group-hover:text-muted-foreground">{step.description}</p>
                  </div>

                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
