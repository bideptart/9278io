"use client"

import { motion } from "motion/react"
import { TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { PLANS } from "@/lib/pricing"

const orderedPlans = [
  PLANS.find((p) => p.id === "starter")!,
  PLANS.find((p) => p.id === "growth")!,
  PLANS.find((p) => p.id === "scale")!,
]

export function RateByPlanMockup({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none select-none", className)}>
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: 5 }}
        whileInView={{ opacity: 1, y: 0, rotate: 3 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.3 }}
          className="w-72 rounded-2xl border border-border/60 bg-white p-4 shadow-[0_20px_60px_-15px_oklch(0.4_0.2_262/0.3)]"
        >
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <TrendingDown className="size-3.5 text-primary" aria-hidden />
            Effective rate by plan
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {orderedPlans.map((plan, i) => (
              <div
                key={plan.id}
                className={cn(
                  "rounded-lg border px-2 py-2 text-center",
                  plan.recommended ? "border-primary/40 bg-primary/[0.06]" : "border-border/60 bg-muted/20",
                )}
              >
                <p className="truncate text-[10px] font-medium text-muted-foreground">{plan.name}</p>
                <p className="mt-1 text-base font-bold text-foreground">₹{plan.ratePerMinInr}</p>
                <p className="text-[10px] text-muted-foreground">{plan.minutes.toLocaleString("en-IN")} min</p>
              </div>
            ))}
          </div>

          <p className="mt-3 text-xs font-medium text-emerald-600">Your starting rate</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
