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
      "Design your AI agent with our visual flow builder. Set prompts, tools, knowledge bases, and integrations in minutes — no engineering required.",
  },
  {
    number: "02",
    icon: FlaskConical,
    title: "Evaluate",
    description:
      "Test every scenario in our AI sandbox before going live. Simulate real calls, check edge cases, and fine-tune responses with live audio previews.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Launch",
    description:
      "Go live instantly with carrier-grade phone numbers in 60+ countries. Deploy to one line or thousands with zero infrastructure setup.",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Optimize",
    description:
      "Monitor every call with live transcripts, sentiment analysis, and conversion tracking. Continuously improve agents with real-world data.",
  },
]

export function UseCases() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">How It Works</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            From idea to live calls in hours, not weeks.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Our end-to-end platform handles everything — no telephony expertise or ML background required.
          </p>
        </ScrollReveal>

        <StaggerGroup className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <StaggerItem key={step.number}>
                <motion.div
                  className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border border-border bg-card/50 p-7 transition-all duration-300 hover:border-primary/25 hover:bg-white/[0.04]"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="flex items-start justify-between">
                    <span className="text-5xl font-black leading-none text-white/[0.06]">{step.number}</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.07] text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold tracking-tight">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>

                  {/* Connector arrow for desktop */}
                  {i < steps.length - 1 && (
                    <div className="absolute -right-2.5 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-xs text-muted-foreground lg:flex">
                      →
                    </div>
                  )}
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
