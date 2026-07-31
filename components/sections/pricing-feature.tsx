"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, Zap, TrendingUp, Building2 } from "lucide-react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"
import { AnimatedPrice } from "@/components/pricing/animated-price"
import { cn } from "@/lib/utils"

const plans = [
  {
    icon: Zap,
    name: "Starter",
    priceMonthly: 2999,
    rate: "₹12 / min eff.",
    credit: "250 included min",
    agents: "2 agents",
    highlight: false,
    features: [
      "2 AI voice agents",
      "250 included minutes",
      "₹12/min effective rate · ₹12/min overage",
      "Inbound calling",
      "Per-second billing (no minute-rounding)",
      "Call recording",
      "Real-time transcription",
    ],
    cta: "Get started",
    href: "/get-started",
  },
  {
    icon: TrendingUp,
    name: "Growth",
    priceMonthly: 8799,
    rate: "₹11 / min eff.",
    credit: "800 included min",
    agents: "10 agents",
    highlight: true,
    features: [
      "10 AI voice agents",
      "800 included minutes",
      "₹11/min effective rate · ₹11/min overage",
      "Inbound calling",
      "Per-second billing (no minute-rounding)",
      "Standard + premium voices",
      "Real-time transcription",
      "Priority support",
    ],
    cta: "Get started",
    href: "/get-started",
  },
  {
    icon: Building2,
    name: "Scale",
    priceMonthly: 29999,
    rate: "₹10 / min eff.",
    credit: "3,000 included min",
    agents: "Unlimited",
    highlight: false,
    features: [
      "Unlimited AI voice agents",
      "3,000 included minutes",
      "₹10/min effective rate · ₹10/min overage",
      "Inbound calling",
      "Per-second billing (no minute-rounding)",
      "Realtime + premium voices",
      "Success manager + SLA",
    ],
    cta: "Contact sales",
    href: "/get-started",
  },
]

const trustChips = ["TRAI-compliant", "24/7 always on", "Cancel anytime"]

function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`
}

export function PricingFeature() {
  const [yearly, setYearly] = useState(false)

  return (
    <section id="pricing" className="border-b border-border">
      <div className="w-full px-6 pb-10 pt-4 md:px-8 md:pb-14 md:pt-6">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary"
          >
            <motion.span className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
            Pricing
          </motion.span>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Pick your plan.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            All plans include inbound calling, call recording, and real-time transcription. Prices in ₹, billed once as
            wallet credit.
          </p>
        </ScrollReveal>

        {/* Trust chips + billing toggle */}
        <ScrollReveal className="mt-6 flex flex-col items-center gap-4">
          <div className="flex flex-nowrap items-center justify-center gap-1 sm:flex-wrap sm:gap-2">
            {trustChips.map((t) => (
              <span
                key={t}
                className="inline-flex shrink-0 items-center gap-1 rounded-full border border-primary/20 bg-primary/[0.05] px-2 py-1 text-[10px] font-medium text-foreground sm:gap-1.5 sm:px-3.5 sm:py-1.5 sm:text-xs"
              >
                <Check className="h-3 w-3 shrink-0 text-primary sm:h-3.5 sm:w-3.5" aria-hidden /> {t}
              </span>
            ))}
          </div>

          <div className="inline-flex items-center gap-1 rounded-full border border-border bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setYearly(false)}
              aria-pressed={!yearly}
              className={cn(
                "rounded-full px-5 py-1.5 text-sm font-semibold transition-colors",
                !yearly ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              aria-pressed={yearly}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-5 py-1.5 text-sm font-semibold transition-colors",
                yearly ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Yearly
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                  yearly ? "bg-white/20 text-white" : "bg-primary/10 text-primary",
                )}
              >
                Save 20%
              </span>
            </button>
          </div>
        </ScrollReveal>

        <StaggerGroup className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-auto md:grid md:max-w-6xl md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 md:items-stretch">
          {plans.map((plan) => {
            const Icon = plan.icon
            const price = yearly ? Math.round(plan.priceMonthly * 12 * 0.8) : plan.priceMonthly
            const originalYearly = plan.priceMonthly * 12
            return (
              <StaggerItem key={plan.name} className="w-[82%] shrink-0 snap-center sm:w-[46%] md:w-auto md:shrink">
                <div
                  className={cn(
                    "relative h-full md:transition-transform md:duration-300",
                    plan.highlight ? "md:z-10" : "",
                  )}
                >
                  <motion.div
                    className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 sm:p-8 ${
                      plan.highlight
                        ? "border-primary/40 bg-primary/[0.06] shadow-[0_20px_60px_oklch(0.78_0.16_195/0.2)]"
                        : "border-border bg-white hover:border-primary/20 hover:bg-slate-50"
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

                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.08] text-primary">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-semibold text-muted-foreground">{plan.name}</span>
                    </div>

                    <div className="mt-2 flex items-end gap-2 sm:mt-3">
                      <span className="text-3xl font-bold tracking-tight">
                        <AnimatedPrice value={price} />
                      </span>
                      <span className="pb-1 text-sm text-muted-foreground">{yearly ? "/yr" : "/mo"}</span>
                    </div>
                    {yearly && (
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        <span className="line-through">{formatINR(originalYearly)}</span>
                        <span className="ml-1.5 font-semibold text-emerald-600">Save 20% billed yearly</span>
                      </p>
                    )}

                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                        {plan.rate}
                      </span>
                      <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                        {plan.credit}
                      </span>
                    </div>

                    <ul className="mt-4 flex flex-col gap-2 sm:mt-6 sm:gap-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 sm:mt-7">
                      <Button
                        asChild
                        size="sm"
                        className={`w-full rounded-xl font-semibold ${
                          plan.highlight
                            ? "bg-primary text-primary-foreground shadow-[0_0_24px_oklch(0.78_0.16_195/0.3)] hover:bg-primary/90"
                            : "border border-border bg-slate-50 text-foreground hover:bg-slate-100"
                        }`}
                        variant={plan.highlight ? "default" : "outline"}
                      >
                        <Link href={plan.href}>{plan.cta}</Link>
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>

        <ScrollReveal className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Indian numbers ₹400/mo · No contracts · Cancel anytime · GST invoice included
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
