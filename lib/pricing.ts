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

export const LOWEST_RATE_INR = 9
export const ENTRY_RATE_INR = 12
export const LOWEST_RATE_PER_MIN = 0.11
export const ENTRY_RATE_PER_MIN = 0.15

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    amountInr: 2399,
    amountUsd: 29,
    ratePerMinInr: 12,
    ratePerMinUsd: 0.15,
    minutes: 200,
    agents: 1,
    tagline: "Pilot a single agent.",
    highlights: [
      "1 AI voice agent",
      "200 included minutes",
      "₹12/min effective rate · ₹18/min overage",
      "1 phone number (DID)",
      "2 concurrent calls",
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
    amountInr: 6999,
    amountUsd: 84,
    ratePerMinInr: 10,
    ratePerMinUsd: 0.12,
    minutes: 700,
    agents: 5,
    tagline: "Most teams start here.",
    highlights: [
      "5 AI voice agents",
      "700 included minutes",
      "₹10/min effective rate · ₹15/min overage",
      "5 phone numbers (DIDs)",
      "10 concurrent calls",
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
    amountInr: 26999,
    amountUsd: 325,
    ratePerMinInr: 9,
    ratePerMinUsd: 0.11,
    minutes: 3000,
    agents: "unlimited",
    tagline: "High-volume call centers.",
    highlights: [
      "Unlimited AI voice agents",
      "3,000 included minutes",
      "₹9/min effective rate · ₹12/min overage",
      "20 phone numbers (DIDs)",
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
  {
    id: "us",
    region: "United States",
    flag: "US",
    countries: ["USA"],
    monthlyInr: 165,
    monthlyUsd: 2,
    description: "Local US area codes, toll-free 800-series available.",
  },
  {
    id: "uk",
    region: "United Kingdom",
    flag: "UK",
    countries: ["United Kingdom"],
    monthlyInr: 415,
    monthlyUsd: 5,
    description: "London, Manchester, Edinburgh and other UK city codes.",
  },
  {
    id: "ae",
    region: "UAE & Gulf",
    flag: "AE",
    countries: ["UAE", "Saudi Arabia", "Qatar", "Bahrain"],
    monthlyInr: 415,
    monthlyUsd: 5,
    description: "Dubai, Abu Dhabi, Riyadh and Gulf region numbers.",
  },
]
