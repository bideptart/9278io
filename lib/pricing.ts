/**
 * Single source of truth for 9278.io pricing (India-focused, INR primary).
 */

export type PlanId = "starter" | "growth" | "scale"

export type PlanAgents = number | "unlimited"

export type BillingPeriod = "monthly" | "yearly"

export type Plan = {
  id: PlanId
  name: string
  /** Credit amount in INR. */
  amountInr: number
  /** USD equivalent (used for Stripe). */
  amountUsd: number
  /** Voice rate in INR per minute. */
  ratePerMinInr: number
  /** Voice rate in USD per minute. */
  ratePerMinUsd: number
  /** Approx voice minutes included. */
  minutes: number
  /** Number of concurrent AI voice agents. */
  agents: PlanAgents
  tagline: string
  highlights: string[]
  recommended?: boolean
}

export function formatPlanAgents(agents: PlanAgents) {
  return agents === "unlimited" ? "Unlimited" : String(agents)
}

export function formatPlanAgentNoun(agents: PlanAgents) {
  if (agents === "unlimited") return "AI voice agents"
  return `AI voice agent${agents === 1 ? "" : "s"}`
}

export const YEARLY_DISCOUNT = 0.2

export function planAmountInr(plan: Pick<Plan, "amountInr">, period: BillingPeriod) {
  if (period === "monthly") return plan.amountInr
  return Math.round(plan.amountInr * 12 * (1 - YEARLY_DISCOUNT))
}

export function planAmountUsd(plan: Pick<Plan, "amountUsd">, period: BillingPeriod) {
  if (period === "monthly") return plan.amountUsd
  return Math.round(plan.amountUsd * 12 * (1 - YEARLY_DISCOUNT))
}

export const LOWEST_RATE_INR = 10
export const ENTRY_RATE_INR = 12
export const LOWEST_RATE_PER_MIN = 0.12
export const ENTRY_RATE_PER_MIN = 0.15

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    amountInr: 3000,
    amountUsd: 36,
    ratePerMinInr: 12,
    ratePerMinUsd: 0.15,
    minutes: 250,
    agents: 2,
    tagline: "Pilot a single agent.",
    highlights: [
      "2 AI voice agents",
      "250 included minutes",
      "₹12/min effective rate · ₹12/min overage",
      "1 phone number (DID)",
      "3 concurrent calls",
      "Inbound calling",
      "Per-second billing (no minute-rounding)",
      "Standard voice stack",
      "Call recording",
      "Real-time transcription",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    amountInr: 8800,
    amountUsd: 106,
    ratePerMinInr: 11,
    ratePerMinUsd: 0.14,
    minutes: 800,
    agents: 10,
    tagline: "Most teams start here.",
    highlights: [
      "10 AI voice agents",
      "800 included minutes",
      "₹11/min effective rate · ₹11/min overage",
      "3 phone numbers (DIDs)",
      "12 concurrent calls",
      "Inbound calling",
      "Per-second billing (no minute-rounding)",
      "Standard + premium voices",
      "Call recording",
      "Real-time transcription",
      "Priority support",
    ],
    recommended: true,
  },
  {
    id: "scale",
    name: "Scale",
    amountInr: 30000,
    amountUsd: 360,
    ratePerMinInr: 10,
    ratePerMinUsd: 0.12,
    minutes: 3000,
    agents: "unlimited",
    tagline: "High-volume call centers.",
    highlights: [
      "Unlimited AI voice agents",
      "3,000 included minutes",
      "₹10/min effective rate · ₹10/min overage",
      "15 phone numbers (DIDs)",
      "40 concurrent calls",
      "Inbound calling",
      "Per-second billing (no minute-rounding)",
      "Realtime + premium voices",
      "Call recording",
      "Real-time transcription",
      "Dedicated success manager + SLA",
    ],
  },
]

export const CREDIT_VALIDITY_DAYS = 60

export type PhoneNumberRegion = {
  id: "in" | "us" | "uk" | "ae"
  region: string
  flag: string
  countries: string[]
  monthlyInr: number
  monthlyUsd: number
  description: string
}

export const PHONE_NUMBER_RATES: PhoneNumberRegion[] = [
  {
    id: "in",
    region: "India",
    flag: "IN",
    countries: ["India"],
    monthlyInr: 400,
    monthlyUsd: 2.4,
    description: "Indian landline & mobile DIDs across all major cities and states.",
  },
]
