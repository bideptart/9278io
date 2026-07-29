"use client"

import { motion } from "motion/react"
import { TrendingDown, User, Bot } from "lucide-react"
import { PLANS } from "@/lib/pricing"

// Illustrative baseline for a single entry-level call-agent/front-desk hire's
// monthly salary in India — not a sourced statistic, just a rough anchor so
// the comparison has a number to grow the bars against.
const HUMAN_AGENT_MONTHLY_INR = 18000

const growth = PLANS.find((p) => p.id === "growth")!

const BARS = [
  {
    key: "human",
    icon: User,
    label: "One human agent",
    sub: "Typical entry-level salary, illustrative",
    amount: HUMAN_AGENT_MONTHLY_INR,
    color: "bg-muted-foreground/40",
    text: "text-foreground",
  },
  {
    key: "ai",
    icon: Bot,
    label: `${growth.name} plan — ${growth.agents} AI agents`,
    sub: `${growth.minutes.toLocaleString("en-IN")} min included · ₹${growth.ratePerMinInr}/min after`,
    amount: growth.amountInr,
    color: "bg-primary",
    text: "text-primary",
  },
]

const MAX = Math.max(...BARS.map((b) => b.amount))
const SAVE_PERCENT = Math.round((1 - growth.amountInr / HUMAN_AGENT_MONTHLY_INR) * 100)

export function CostComparisonStrip() {
  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border-2 border-border/60 bg-white p-6 shadow-sm sm:p-8">
      <div className="space-y-5">
        {BARS.map((bar, i) => {
          const Icon = bar.icon
          const widthPercent = (bar.amount / MAX) * 100
          return (
            <div key={bar.key}>
              <div className="mb-1.5 flex items-end justify-between gap-3">
                <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <Icon className="size-4 text-muted-foreground" aria-hidden />
                  {bar.label}
                </span>
                <span className={`text-lg font-bold tabular-nums ${bar.text}`}>
                  ₹{bar.amount.toLocaleString("en-IN")}
                  <span className="ml-1 text-xs font-normal text-muted-foreground">/mo</span>
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-muted/50">
                <motion.div
                  className={`h-full rounded-full ${bar.color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${widthPercent}%` }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{bar.sub}</p>
            </div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3"
      >
        <TrendingDown className="size-4 flex-none text-emerald-600" aria-hidden />
        <p className="text-sm font-semibold text-emerald-700">
          ~{SAVE_PERCENT}% less than one human agent's salary — and it answers every call, 24/7.
        </p>
      </motion.div>
    </div>
  )
}
