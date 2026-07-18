"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PricingComponent, type BillingCycle, type PriceTier } from "@/components/ui/pricing-card"
import { formatPlanAgents, planAmountInr, PLANS } from "@/lib/pricing"

function planPriceNote(plan: (typeof PLANS)[number]) {
  const agents = plan.agents === "unlimited" ? "Unlimited" : formatPlanAgents(plan.agents)
  const agentNoun = plan.agents === "unlimited" || plan.agents !== 1 ? "agents" : "agent"
  return `${plan.minutes.toLocaleString("en-IN")} included min · ₹${plan.ratePerMinInr}/min eff. · ${agents} ${agentNoun}`
}

const orderedTiers: [PriceTier, PriceTier, PriceTier] = PLANS
  .slice()
  .sort((a, b) => {
    const order: Record<string, number> = { starter: 0, growth: 1, scale: 2 }
    return order[a.id] - order[b.id]
  })
  .map((plan) => ({
    id: plan.id,
    name: plan.name,
    description: plan.tagline,
    priceNote: planPriceNote(plan),
    priceMonthly: plan.amountInr,
    priceYearly: planAmountInr(plan, "yearly"),
    isPopular: Boolean(plan.recommended),
    buttonLabel: "Buy",
    features: plan.highlights,
  })) as [PriceTier, PriceTier, PriceTier]

const TRUST_BADGES = ["TRAI-compliant", "24/7 always on", "Cancel anytime"]

export function PricingCardSection() {
  const router = useRouter()
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly")

  return (
    <PricingComponent
      plans={orderedTiers}
      badges={TRUST_BADGES}
      billingCycle={billingCycle}
      onCycleChange={setBillingCycle}
      onPlanSelect={(planId, cycle) => {
        router.push(`/get-started?plan=${planId}&cycle=${cycle}`)
      }}
    />
  )
}
