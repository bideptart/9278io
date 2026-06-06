/**
 * Single source of truth for 9278.io pricing (India-focused, INR primary).
 */

export type PlanId = "starter" | "growth" | "scale"

export type PlanAgents = number | "unlimited"

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

export const LOWEST_RATE_INR = 5.7
export const ENTRY_RATE_INR = 6.7
export const LOWEST_RATE_PER_MIN = 0.07
export const ENTRY_RATE_PER_MIN = 0.08

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    amountInr: 1999,
    amountUsd: 24,
    ratePerMinInr: 6.7,
    ratePerMinUsd: 0.08,
    minutes: 300,
    agents: 2,
    tagline: "Pilot a single agent.",
    highlights: [
      "2 AI voice agents",
      "300 included minutes",
      "₹6.7/min effective rate · ₹10/min overage",
      "1 phone number (DID)",
      "3 concurrent calls",
      "Inbound + outbound calling",
      "Standard voice stack",
      "Call recording",
      "Real-time transcription",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    amountInr: 5999,
    amountUsd: 72,
    ratePerMinInr: 6.7,
    ratePerMinUsd: 0.08,
    minutes: 900,
    agents: 10,
    tagline: "Most teams start here.",
    highlights: [
      "10 AI voice agents",
      "900 included minutes",
      "₹6.7/min effective rate · ₹9/min overage",
      "3 phone numbers (DIDs)",
      "12 concurrent calls",
      "Inbound + outbound calling",
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
    amountInr: 19999,
    amountUsd: 240,
    ratePerMinInr: 5.7,
    ratePerMinUsd: 0.07,
    minutes: 3500,
    agents: "unlimited",
    tagline: "High-volume call centers.",
    highlights: [
      "Unlimited AI voice agents",
      "3,500 included minutes",
      "₹5.7/min effective rate · ₹8/min overage",
      "15 phone numbers (DIDs)",
      "40 concurrent calls",
      "Inbound + outbound calling",
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
    monthlyInr: 200,
    monthlyUsd: 2.4,
    description: "Indian landline & mobile DIDs across all major cities and states.",
  },
]
