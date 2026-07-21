"use client"

import { Code2, FlaskConical, Rocket, BarChart3 } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { motion } from "motion/react"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"

type Step = { number: string; icon: LucideIcon; title: string; description: string }

const steps: Step[] = [
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

/* Inner content of a card face. */
function FaceContent({ step, dark }: { step: Step; dark?: boolean }) {
  const Icon = step.icon
  return (
    <>
      <div className="flex items-start justify-between">
        <span className={`text-4xl font-black leading-none md:text-5xl ${dark ? "text-primary/40" : "text-white/40"}`}>
          {step.number}
        </span>
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-xl border md:h-10 md:w-10 ${
            dark ? "border-primary/20 bg-primary/[0.08] text-primary" : "border-white/20 bg-white/[0.12] text-white"
          }`}
        >
          <Icon className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
        </span>
      </div>

      <div>
        <h3 className={`text-base font-bold tracking-tight md:text-xl ${dark ? "text-foreground" : "text-white"}`}>
          {step.title}
        </h3>
        <p
          className={`mt-1.5 line-clamp-4 text-xs leading-relaxed md:mt-2 md:line-clamp-none md:text-sm ${
            dark ? "text-muted-foreground" : "text-white/70"
          }`}
        >
          {step.description}
        </p>
      </div>
    </>
  )
}

const faceBase = "flex flex-col gap-3 overflow-hidden rounded-2xl border p-4 md:gap-5 md:p-7"

/* A flip card: blue front flips to a white back on hover. */
function FlipCard({ step }: { step: Step }) {
  return (
    <div className="group [perspective:1400px]">
      <div className="relative min-h-[240px] transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] md:min-h-[300px]">
        {/* invisible sizer — gives the card its height so both faces can be absolute */}
        <div aria-hidden className={`invisible ${faceBase} border-transparent`}>
          <FaceContent step={step} />
        </div>
        {/* front (blue) */}
        <div className={`absolute inset-0 border-primary bg-primary shadow-[0_4px_20px_oklch(0.52_0.22_265/0.25)] [backface-visibility:hidden] ${faceBase}`}>
          <FaceContent step={step} />
        </div>
        {/* back (white) */}
        <div className={`absolute inset-0 border-border bg-white shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)] ${faceBase}`}>
          <FaceContent step={step} dark />
        </div>
      </div>
    </div>
  )
}

export function HowItWorks() {
  return (
    <section className="border-b border-border">
      <div className="w-full px-6 pb-14 pt-6 md:px-8 md:pb-20 md:pt-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <motion.span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            How It Works
          </motion.span>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Every call your business makes.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Inbound front desk, follow-ups and reminders — one platform, TRAI-compliant, live in hours.
          </p>
        </ScrollReveal>

        <StaggerGroup className="relative mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {steps.map((step) => (
            <StaggerItem key={step.number}>
              <FlipCard step={step} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
