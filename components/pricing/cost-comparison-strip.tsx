"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { TrendingDown, User, Bot, Check } from "lucide-react"
import { PLANS } from "@/lib/pricing"

// Illustrative baseline for a single entry-level call-agent/front-desk hire's
// monthly salary in India — not a sourced statistic, just a rough anchor so
// the comparison has a number to grow the bars against.
const HUMAN_AGENT_MONTHLY_INR = 18000

const starter = PLANS.find((p) => p.id === "starter")!
const growth = PLANS.find((p) => p.id === "growth")!
const scale = PLANS.find((p) => p.id === "scale")!
const orderedPlans = [starter, growth, scale]

// How many human agents each plan's AI capacity stands in for. Starter's 2
// AI agents are still compared against a single hire (illustrative baseline);
// Growth (10 agents) and Scale (unlimited, represented as 15) scale up the
// human-cost side to match.
const HUMAN_COUNT_BY_PLAN: Record<string, number> = {
  starter: 1,
  growth: 10,
  scale: 15,
}

const AUTO_CYCLE_MS = 3000

const WHY_THIS_MATTERS = [
  "Scales instantly — add capacity without hiring or training",
  "Works 24/7 — no shifts, no sick days, never quits",
  "Per-second billing — pay only for actual talk time",
  "Speaks 10+ Indian languages out of the box",
  "TRAI-compliant with GST invoices, no hidden fees",
  "Answers multiple calls at once — no hold queue",
]

export function CostComparisonStrip() {
  const [planId, setPlanId] = useState(growth.id)

  // Auto-advance through the tabs every 3s; restarts on manual selection
  // (planId dependency) so clicking a tab doesn't get immediately undone.
  useEffect(() => {
    const id = setInterval(() => {
      setPlanId((current) => {
        const i = orderedPlans.findIndex((p) => p.id === current)
        return orderedPlans[(i + 1) % orderedPlans.length].id
      })
    }, AUTO_CYCLE_MS)
    return () => clearInterval(id)
  }, [planId])

  const plan = orderedPlans.find((p) => p.id === planId) ?? growth
  const humanCount = HUMAN_COUNT_BY_PLAN[planId] ?? 1
  const humanCost = HUMAN_AGENT_MONTHLY_INR * humanCount
  const aiCost = plan.amountInr
  const max = Math.max(humanCost, aiCost)
  const savePercent = Math.max(0, Math.round((1 - aiCost / humanCost) * 100))
  // Scale's AI capacity is unlimited, so its human-agent stand-in is a
  // minimum, not a hard count — shown as "15+" rather than a flat "15".
  const humanCountLabel = plan.agents === "unlimited" ? `${humanCount}+` : `${humanCount}`

  const bars = [
    {
      key: "human",
      icon: User,
      label: humanCount === 1 ? "One human agent" : `${humanCountLabel} human agents`,
      sub: "Typical entry-level salary, illustrative",
      amount: humanCost,
      color: "bg-muted-foreground/40",
      text: "text-foreground",
    },
    {
      key: "ai",
      icon: Bot,
      label: `${plan.name} plan — ${plan.agents === "unlimited" ? "Unlimited" : plan.agents} AI agents`,
      sub: `${plan.minutes.toLocaleString("en-IN")} min included · ₹${plan.ratePerMinInr}/min after`,
      amount: aiCost,
      color: "bg-primary",
      text: "text-primary",
    },
  ]

  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-start gap-8 rounded-2xl border-2 border-border/60 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[1fr_220px]">
      <div>
        <div className="mb-5 flex w-full items-center gap-1.5 lg:w-auto lg:justify-start">
          {orderedPlans.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlanId(p.id)}
              aria-pressed={planId === p.id}
              className={`relative min-w-0 flex-1 rounded-full border px-3 py-2 text-sm font-semibold transition-colors sm:px-5 sm:py-2.5 lg:flex-none lg:min-w-28 ${
                planId === p.id
                  ? "border-transparent text-primary-foreground"
                  : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {planId === p.id && (
                <motion.span
                  layoutId="cost-comparison-tab-highlight"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative truncate">{p.name}</span>
            </button>
          ))}
        </div>

        <div className="space-y-5">
          {bars.map((bar) => {
            const Icon = bar.icon
            const widthPercent = (bar.amount / max) * 100
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
                    animate={{ width: `${widthPercent}%` }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{bar.sub}</p>
              </div>
            )
          })}
        </div>

        <motion.div
          key={savePercent}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3"
        >
          <TrendingDown className="size-4 flex-none text-emerald-600" aria-hidden />
          <p className="text-sm font-semibold text-emerald-700">
            ~{savePercent}% less than {humanCount === 1 ? "one human agent's" : `${humanCountLabel} human agents'`}{" "}
            salary — and it answers every call, 24/7.
          </p>
        </motion.div>
      </div>

      <div className="border-t border-border/60 pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
          Why this matters
        </span>
        <ul className="mt-3 space-y-2.5 rounded-xl bg-slate-100 p-3">
          {WHY_THIS_MATTERS.map((item) => (
            <li key={item} className="flex items-start gap-1.5 text-xs leading-snug text-slate-900">
              <Check className="mt-0.5 size-3.5 flex-none text-emerald-600" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
