import { Check, Flag, X } from "lucide-react"

// Bespoke pattern for setup-templates: a two-lane "race to launch" — a blank
// page crawling toward the finish line vs. a template sprinting there,
// looping together. Pure CSS keyframes (see .st-race-* in globals.css), no
// JS timers. Distinct from the card-grid, wipe-slider, and progress-track
// patterns already used elsewhere on the site.
const POINTS = [
  { without: "Every agent starts from a blank page", withPoint: "Start from a proven, pre-filled template" },
  { without: "Writing a greeting and rules from scratch takes hours", withPoint: "Greeting, routing, and knowledge already set" },
  { without: "Easy to miss a step a proven setup would cover", withPoint: "Launch in minutes, refine anything after" },
]

export function SetupTemplatesRace() {
  return (
    <div className="rounded-[28px] border border-border/60 bg-white p-6 shadow-[0_24px_54px_-30px_rgba(15,23,42,0.25)] md:p-10">
      <div className="space-y-7">
        {/* lane 1 — blank page, crawling */}
        <div>
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-semibold text-muted-foreground">Blank page</span>
            <span className="text-xs text-muted-foreground">~3 hours to launch</span>
          </div>
          <div className="relative mt-2 h-3 overflow-visible rounded-full bg-secondary">
            <div className="st-race-blank-fill h-full rounded-full bg-red-300" />
            <span className="st-race-blank-flag absolute right-0 top-1/2 flex size-7 items-center justify-center rounded-full bg-white text-red-500 shadow-[0_6px_16px_-6px_rgba(239,68,68,0.5)]" style={{ border: "1.5px solid #FCA5A5" }}>
              <Flag className="size-3.5" aria-hidden />
            </span>
          </div>
        </div>

        {/* lane 2 — setup template, sprinting */}
        <div>
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-semibold text-primary">Setup template</span>
            <span className="text-xs font-medium text-primary">~3 minutes to launch</span>
          </div>
          <div className="relative mt-2 h-3 overflow-visible rounded-full bg-secondary">
            <div className="st-race-template-fill h-full rounded-full" style={{ backgroundImage: "linear-gradient(90deg, #2563EB, #0EA5E9, #10B981)" }} />
            <span
              className="st-race-template-flag absolute right-0 top-1/2 flex size-7 items-center justify-center rounded-full text-white shadow-[0_6px_16px_-6px_rgba(37,99,235,0.6)]"
              style={{ backgroundImage: "linear-gradient(135deg, #2563EB, #10B981)" }}
            >
              <Flag className="size-3.5" aria-hidden />
            </span>
          </div>
        </div>
      </div>

      <div className="mt-9 divide-y divide-border/50 border-t border-border/50">
        {POINTS.map((p) => (
          <div key={p.without} className="grid grid-cols-1 gap-1.5 py-3.5 sm:grid-cols-2 sm:gap-4">
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <X className="mt-0.5 size-3.5 shrink-0 text-red-400" aria-hidden />
              <span>{p.without}</span>
            </div>
            <div className="flex items-start gap-2 text-sm font-medium text-foreground">
              <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-600" aria-hidden />
              <span>{p.withPoint}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
