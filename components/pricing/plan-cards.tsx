"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { formatPlanAgents, planAmountInr, type BillingPeriod, PLANS } from "@/lib/pricing"

export function PlanCards() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly")
  const displayPlans = [...PLANS].sort((a, b) => {
    const order: Record<string, number> = { scale: 0, growth: 1, starter: 2 }
    return (order[a.id] ?? 99) - (order[b.id] ?? 99)
  })
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-card/40 p-1">
          <button
            type="button"
            onClick={() => setBillingPeriod("monthly")}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              billingPeriod === "monthly"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-pressed={billingPeriod === "monthly"}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingPeriod("yearly")}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              billingPeriod === "yearly"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-pressed={billingPeriod === "yearly"}
          >
            Yearly
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[11px] font-medium",
                billingPeriod === "yearly" ? "bg-primary-foreground/15 text-primary-foreground" : "bg-primary/15 text-primary",
              )}
            >
              Save 20%
            </span>
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {displayPlans.map((plan, i) => {
          const amountInr = planAmountInr(plan, billingPeriod)
          const yearlyTotalInr = planAmountInr(plan, "yearly")
          const yearlySaveInr = plan.amountInr * 12 - yearlyTotalInr
          const yearlyMonthlyEquivalentInr = Math.round(yearlyTotalInr / 12)
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className={cn(
                "relative flex flex-col rounded-2xl border p-7 transition-colors",
                plan.recommended
                  ? "border-primary/40 bg-gradient-to-b from-primary/[0.06] to-transparent"
                  : "border-border/60 bg-card/40 hover:border-border",
              )}
            >
              {plan.recommended && (
                <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground">
                  Most popular
                </span>
              )}

              <div>
                <h3 className="text-lg font-semibold tracking-tight">{plan.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{plan.tagline}</p>
              </div>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-semibold tracking-tight">₹{amountInr.toLocaleString("en-IN")}</span>
                <span className="text-sm text-muted-foreground">{billingPeriod === "yearly" ? "/yr" : "/mo"}</span>
              </div>
              {billingPeriod === "yearly" && (
                <p className="mt-1 text-xs text-primary">
                  Save ₹{yearlySaveInr.toLocaleString("en-IN")} vs monthly · ₹{yearlyMonthlyEquivalentInr.toLocaleString("en-IN")}
                  /mo equivalent
                </p>
              )}
              <p className="mt-2 text-sm text-muted-foreground">
                {plan.minutes.toLocaleString("en-IN")} included min · ₹{plan.ratePerMinInr}/min eff. ·{" "}
                {plan.agents === "unlimited" ? "Unlimited" : `${formatPlanAgents(plan.agents)} agents`}
              </p>

              <ul className="mt-6 space-y-3 text-sm">
                {plan.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-4 flex-none text-primary" aria-hidden />
                    <span className="text-foreground/90">{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-2 pt-2">
                {/* Both buttons now route to the in-house /get-started signup
                    widget. The CTA copy stays distinct so the price reinforces
                    intent, but the destination is the same. */}
                <Button
                  asChild
                  className={cn(
                    "w-full",
                    plan.recommended
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                  )}
                >
                  <Link
                    href={`/get-started?plan=${plan.id}&cycle=${billingPeriod}`}
                  >
                    Buy ₹{amountInr.toLocaleString("en-IN")} now
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full text-sm text-muted-foreground hover:text-foreground">
                  <Link
                    href={`/get-started?plan=${plan.id}&cycle=${billingPeriod}`}
                  >
                    Configure with phone number →
                  </Link>
                </Button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
