"use client"

import Link from "next/link"
import { Check, Zap, TrendingUp, Building2 } from "lucide-react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"

const plans = [
  {
    icon: Zap,
    name: "Starter",
    price: "₹1,699",
    rate: "₹12.50 / min",
    credit: "~135 minutes",
    agents: "1 concurrent agent",
    highlight: false,
    features: [
      "1 AI voice agent",
      "~135 voice minutes",
      "Inbound & outbound calls",
      "Hindi & regional languages",
      "Email support",
      "Call recordings & transcripts",
      "Credit valid for 60 days",
    ],
    cta: "Get started",
    href: "/get-started",
  },
  {
    icon: TrendingUp,
    name: "Growth",
    price: "₹4,199",
    rate: "₹10 / min",
    credit: "~420 minutes",
    agents: "2 concurrent agents",
    highlight: true,
    features: [
      "2 AI voice agents",
      "~420 voice minutes",
      "Inbound + outbound + transfers",
      "Custom voice & persona",
      "Zoho, Freshworks & CRM integrations",
      "WhatsApp Business API",
      "Priority support",
      "Credit valid for 60 days",
    ],
    cta: "Start now",
    href: "/get-started",
  },
  {
    icon: Building2,
    name: "Scale",
    price: "₹8,399",
    rate: "₹8.35 / min",
    credit: "~1,005 minutes",
    agents: "3 concurrent agents",
    highlight: false,
    features: [
      "3 AI voice agents",
      "~1,005 voice minutes",
      "Concurrent call campaigns",
      "Advanced analytics & reports",
      "Custom integrations & webhooks",
      "TRAI-compliant calling",
      "Dedicated success manager",
      "Credit valid for 60 days",
    ],
    cta: "Contact sales",
    href: "/get-started",
  },
]

export function PricingFeature() {
  return (
    <section id="pricing" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Pricing</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Fair pricing. Pay only for what you talk.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Voice credit valid 60 days from purchase. Indian DIDs from ₹200/month, billed separately.
            No setup, no contracts, no minimums beyond your top-up.
          </p>
        </ScrollReveal>

        <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon
            return (
              <StaggerItem key={plan.name}>
                <motion.div
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border p-7 transition-all duration-300 ${
                    plan.highlight
                      ? "border-primary/40 bg-primary/[0.06] shadow-[0_0_40px_oklch(0.78_0.16_195/0.12)]"
                      : "border-border bg-card/50 hover:border-primary/20 hover:bg-white/[0.04]"
                  }`}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  {plan.highlight && (
                    <>
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                      <span className="absolute right-5 top-5 rounded-full bg-primary px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                        Most Popular
                      </span>
                    </>
                  )}

                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.08] text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold text-muted-foreground">{plan.name}</span>
                  </div>

                  <div className="mt-5">
                    <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                    <span className="ml-2 text-sm text-muted-foreground">one-time top-up</span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                      {plan.rate}
                    </span>
                    <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                      {plan.credit}
                    </span>
                  </div>

                  <ul className="mt-7 flex flex-col gap-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Button
                      asChild
                      className={`w-full rounded-xl font-semibold ${
                        plan.highlight
                          ? "bg-primary text-primary-foreground shadow-[0_0_24px_oklch(0.78_0.16_195/0.3)] hover:bg-primary/90"
                          : "border border-border bg-white/[0.04] text-foreground hover:bg-white/[0.08]"
                      }`}
                      variant={plan.highlight ? "default" : "outline"}
                    >
                      <Link href={plan.href}>{plan.cta}</Link>
                    </Button>
                  </div>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>

        <ScrollReveal className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Indian numbers from ₹200/mo · US, UK, UAE also available · No contracts · Cancel anytime · GST invoice included
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
