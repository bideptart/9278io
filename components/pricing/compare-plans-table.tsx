import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatPlanAgents, PLANS } from "@/lib/pricing"

type CellValue = string | boolean

type Row = {
  label: string
  values: [CellValue, CellValue, CellValue]
}

const starter = PLANS.find((p) => p.id === "starter")!
const growth = PLANS.find((p) => p.id === "growth")!
const scale = PLANS.find((p) => p.id === "scale")!
const orderedPlans = [starter, growth, scale] as const

const VOICE_STACK: Record<string, string> = {
  starter: "Standard",
  growth: "Standard + premium",
  scale: "Realtime + premium",
}

const SUPPORT: Record<string, string> = {
  starter: "Email",
  growth: "Priority",
  scale: "Dedicated success manager",
}

const rows: Row[] = [
  {
    label: "Included minutes",
    values: orderedPlans.map((p) => `${p.minutes.toLocaleString("en-IN")} min`) as [string, string, string],
  },
  {
    label: "Effective rate",
    values: orderedPlans.map((p) => `₹${p.ratePerMinInr}/min`) as [string, string, string],
  },
  {
    label: "AI voice agents",
    values: orderedPlans.map((p) => formatPlanAgents(p.agents)) as [string, string, string],
  },
  {
    label: "Voice stack",
    values: orderedPlans.map((p) => VOICE_STACK[p.id]) as [string, string, string],
  },
  { label: "Call recording", values: [true, true, true] },
  { label: "Real-time transcription", values: [true, true, true] },
  {
    label: "Support",
    values: orderedPlans.map((p) => SUPPORT[p.id]) as [string, string, string],
  },
  { label: "SLA", values: [false, false, true] },
]

export function ComparePlansTable() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          Compare plans
        </span>
      </div>
      <h2 className="mt-3 text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Every plan, side by side.
      </h2>

      <div className="mt-8 overflow-hidden rounded-2xl border-2 border-border bg-white shadow-sm">
        <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-border">
              <th scope="col" className="border-r border-border/60 px-6 py-4 text-left font-semibold text-foreground/80">
                Feature
              </th>
              {orderedPlans.map((plan, colIndex) => (
                <th
                  key={plan.id}
                  scope="col"
                  className={cn(
                    "border-border/60 px-6 py-4 text-left font-semibold text-foreground/80",
                    colIndex < orderedPlans.length - 1 && "border-r",
                    plan.recommended && "border-x-2 border-primary/40 bg-primary/[0.07]",
                  )}
                >
                  <span className="inline-flex items-center gap-2">
                    {plan.name}
                    {plan.recommended && (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                        Popular
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const isLastRow = i === rows.length - 1
              return (
                <tr key={row.label} className={cn("group transition-colors hover:bg-primary/[0.04]", i % 2 === 1 && "bg-muted/30")}>
                  <td
                    className={cn(
                      "border-r border-border/60 px-6 py-3 font-medium text-foreground/90 whitespace-nowrap transition-colors group-hover:border-primary/40",
                      !isLastRow && "border-b",
                    )}
                  >
                    {row.label}
                  </td>
                  {row.values.map((value, colIndex) => (
                    <td
                      key={colIndex}
                      className={cn(
                        "border-border/60 px-6 py-3 text-muted-foreground transition-colors group-hover:border-primary/40",
                        !isLastRow && "border-b",
                        colIndex < orderedPlans.length - 1 && "border-r",
                        orderedPlans[colIndex].recommended && "border-x-2 border-primary/40 bg-primary/[0.07]",
                      )}
                    >
                      {typeof value === "boolean" ? (
                        value ? (
                          <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                        ) : (
                          <span className="text-muted-foreground/40" aria-hidden="true">
                            —
                          </span>
                        )
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}
