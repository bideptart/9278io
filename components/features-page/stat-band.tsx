"use client"

import { Zap, CheckCircle2, Timer, TrendingDown } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { CountUp } from "@/components/ui/count-up"
import { StaggerGroup, StaggerItem } from "@/components/animation/stagger"

// Numbers restated from components/sections/features.tsx's LatencyVisual /
// AnalyticsVisual — the same figures already shown on the homepage.
type Stat = {
  icon: LucideIcon
  value: number
  suffix: string
  decimals?: number
  label: string
}

const stats: Stat[] = [
  { icon: Zap, value: 94, suffix: "ms", label: "Response latency" },
  { icon: CheckCircle2, value: 87, suffix: "%", label: "Calls resolved by AI" },
  { icon: Timer, value: 134, suffix: "s", label: "Avg. call time (2m 14s)" },
  { icon: TrendingDown, value: 13, suffix: "%", label: "Escalation rate" },
]

export function StatBand() {
  return (
    <StaggerGroup className="mx-auto grid max-w-5xl grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((s) => {
        const Icon = s.icon
        return (
          <StaggerItem key={s.label}>
            <div className="glass-panel flex h-full flex-col items-center gap-2 rounded-2xl px-4 py-8 text-center shadow-[0_20px_48px_-32px_oklch(0.13_0.025_255/0.3)]">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <p className="text-3xl font-bold tabular-nums tracking-tight text-foreground">
                <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals} />
              </p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          </StaggerItem>
        )
      })}
    </StaggerGroup>
  )
}
