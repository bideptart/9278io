/**
 * Single source of truth for 9278.io pricing (India-focused, INR primary).
 */

export type PlanId = "starter" | "growth" | "scale"

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
  agents: number
  tagline: string
  highlights: string[]
  recommended?: boolean
}

export const LOWEST_RATE_INR = 8.35
export const ENTRY_RATE_INR = 12.50
export const LOWEST_RATE_PER_MIN = 0.1
export const ENTRY_RATE_PER_MIN = 0.15

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    amountInr: 1699,
    amountUsd: 20,
    ratePerMinInr: 12.50,
    ratePerMinUsd: 0.15,
    minutes: 135,
    agents: 1,
    tagline: "Pilot a single agent and prove the ROI.",
    highlights: [
      "1 AI voice agent",
      "~135 voice minutes included",
      "₹12.50 per minute",
      "Credit valid for 60 days",
      "Inbound or outbound calling",
      "Hindi & regional language support",
      "Real-time transcripts",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    amountInr: 4199,
    amountUsd: 50,
    ratePerMinInr: 10,
    ratePerMinUsd: 0.12,
    minutes: 420,
    agents: 2,
    tagline: "Most Indian teams start here. Scale to a full pipeline.",
    highlights: [
      "2 AI voice agents",
      "~420 voice minutes included",
      "₹10 per minute",
      "Credit valid for 60 days",
      "Inbound + outbound + transfers",
      "Custom voice & persona",
      "Zoho, Freshworks & CRM integrations",
      "WhatsApp Business API",
      "Priority support",
    ],
    recommended: true,
  },
  {
    id: "scale",
    name: "Scale",
    amountInr: 8399,
    amountUsd: 100,
    ratePerMinInr: 8.35,
    ratePerMinUsd: 0.1,
    minutes: 1005,
    agents: 3,
    tagline: "High-volume BPOs and enterprises running full call centers.",
    highlights: [
      "3 AI voice agents",
      "~1,005 voice minutes included",
      "₹8.35 per minute — our best rate",
      "Credit valid for 60 days",
      "Concurrent call campaigns",
      "Advanced analytics & reports",
      "Custom integrations & webhooks",
      "TRAI-compliant calling",
      "Dedicated success manager",
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
