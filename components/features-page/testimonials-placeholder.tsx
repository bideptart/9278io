"use client"

import { Quote, Star } from "lucide-react"
import { MouseGlowCard } from "@/components/animation/mouse-glow-card"
import { StaggerGroup, StaggerItem } from "@/components/animation/stagger"

// Illustrative only — no real customer has been quoted yet. Each card is
// visibly labeled "Sample quote" so nothing here reads as a genuine
// endorsement. Swap in real names/quotes/logos once available.
const samples = [
  {
    quote: "Our front desk used to miss calls after 7pm. Now every call gets answered, in the caller's own language.",
    name: "Sample Business Owner",
    role: "Illustrative persona",
    initials: "SB",
  },
  {
    quote: "Setup took an afternoon, not a vendor onboarding call. We were live the same day.",
    name: "Sample Business Owner",
    role: "Illustrative persona",
    initials: "SB",
  },
  {
    quote: "Per-second billing actually matches what we use — no more paying for a full minute on a 10-second call.",
    name: "Sample Business Owner",
    role: "Illustrative persona",
    initials: "SB",
  },
]

export function TestimonialsPlaceholder() {
  return (
    <div>
      <p className="mb-6 text-center text-xs font-medium text-muted-foreground/70">
        Sample quotes — pending real customer feedback.
      </p>
      <StaggerGroup className="grid gap-4 sm:grid-cols-3">
        {samples.map((t, i) => (
          <StaggerItem key={i}>
            <MouseGlowCard className="flex h-full flex-col gap-4 p-5">
              <div className="flex items-center justify-between">
                <Quote className="size-6 text-primary/30" aria-hidden />
                <span className="rounded-full border border-border/60 bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Sample quote
                </span>
              </div>
              <p className="flex-1 text-sm leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5" aria-hidden>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="size-3.5 fill-primary/40 text-primary/40" />
                  ))}
                </div>
              </div>
            </MouseGlowCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  )
}
