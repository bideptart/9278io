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
          className={`mt-1.5 text-xs leading-relaxed md:mt-2 md:text-sm ${
            dark ? "text-muted-foreground" : "text-white/70"
          }`}
        >
          {step.description}
        </p>
      </div>
    </>
  )
}

/* No `flex` here — each face sets its own display so the mobile `hidden`
   never fights a `flex` from this shared string. */
const faceBase = "flex-col gap-3 overflow-hidden rounded-2xl border p-4 md:gap-5 md:p-7"

/* A flip card: blue front flips to a white back on hover.
   The 3D context only exists from md up — phones have no hover, and
   preserve-3d + backface-visibility force the card onto a GPU layer, which
   rasterises the text and makes it look blurry. Below md the front face is a
   plain in-flow card instead. */
function FlipCard({ step }: { step: Step }) {
  return (
    <div className="group md:[perspective:1400px]">
      <div className="relative transition-transform duration-500 md:min-h-[300px] md:[transform-style:preserve-3d] md:group-hover:[transform:rotateY(180deg)]">
        {/* invisible sizer — only needed once both faces go absolute (md+) */}
        <div aria-hidden className={`invisible hidden md:flex ${faceBase} border-transparent`}>
          <FaceContent step={step} />
        </div>
        {/* front (blue) — in flow on mobile, absolute face on md+ */}
        <div className={`relative flex border-primary bg-primary shadow-[0_4px_20px_oklch(0.52_0.22_265/0.25)] md:absolute md:inset-0 md:[backface-visibility:hidden] ${faceBase}`}>
          <FaceContent step={step} />
        </div>
        {/* back (white) — md+ only */}
        <div className={`hidden border-border bg-white shadow-md md:absolute md:inset-0 md:flex md:[backface-visibility:hidden] md:[transform:rotateY(180deg)] ${faceBase}`}>
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
          <h2 className="mt-3 whitespace-nowrap text-4xl font-bold tracking-tight md:text-5xl">
            Every call your business makes.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Inbound front desk, follow-ups and reminders — one platform, TRAI-compliant, live in hours.
          </p>
        </ScrollReveal>

        <StaggerGroup className="relative mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
