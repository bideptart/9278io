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
      "Design your agent visually or in plain English. Set system prompt, RAG sources, tools, and personas — no engineering required.",
  },
  {
    number: "02",
    icon: FlaskConical,
    title: "Evaluate",
    description:
      "Sandbox every scenario before going live. Compare versions, run scripted calls, and roll back any update with zero downtime.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Launch",
    description:
      "Provision an Indian DID from ₹400/month or port your existing number through our SIP trunk. Go live on Jio/Airtel/BSNL/Vi in minutes.",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Optimize",
    description:
      "Watch P50/P90 latency, transcripts, and AI summaries from the self-hosted dashboard. Fine-tune on your own call data.",
  },
]

export function UseCases() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">How It Works</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Every call your business makes.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Inbound front desk, outbound campaigns, follow-ups and reminders — one platform,
            TRAI-compliant, live in hours.
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
