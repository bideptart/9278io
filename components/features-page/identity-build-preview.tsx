import { Building2, Check, MessageCircle, UserRound } from "lucide-react"

// Bespoke pattern for identity-setup: a live "caller ID" preview badge that
// assembles itself piece by piece — avatar, then name, then greeting, then
// a "same on every number" tag — in sync with a setup checklist on the
// left, looping. Pure CSS keyframes (see .id-build-* in globals.css), no
// JS. Replaces an earlier flip-card attempt on this same section.
const ROWS = [
  {
    icon: UserRound,
    label: "Name & avatar",
    detail: "Each agent has its own name and avatar",
    buildClass: "id-build-name",
  },
  {
    icon: MessageCircle,
    label: "Branded greeting",
    detail: "Callers hear a consistent, branded greeting",
    buildClass: "id-build-greeting",
  },
  {
    icon: Building2,
    label: "Consistent branding",
    detail: "Every number feels like part of your business",
    buildClass: "id-build-tag",
  },
]

export function IdentityBuildPreview() {
  return (
    <div className="rounded-[28px] border border-border/60 bg-white p-6 shadow-[0_24px_54px_-30px_rgba(15,23,42,0.25)] md:p-10">
      <div className="grid gap-10 md:grid-cols-[1fr_260px] md:items-center">
        {/* setup checklist */}
        <div className="space-y-4">
          {ROWS.map((row) => {
            const Icon = row.icon
            return (
              <div key={row.label} className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-4" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{row.label}</p>
                  <p className="text-sm font-medium text-foreground">{row.detail}</p>
                </div>
                <span className={`flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ${row.buildClass}`}>
                  <Check className="size-3.5" aria-hidden />
                </span>
              </div>
            )
          })}
        </div>

        {/* live preview badge, assembling in sync with the checklist */}
        <div className="mx-auto w-full max-w-[260px] rounded-3xl px-6 py-7 text-center text-white" style={{ backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)" }}>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-white/75">Agent identity</p>

          <div className="id-build-avatar mt-4 flex justify-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-white/20 text-lg font-bold ring-2 ring-white/40">A</span>
          </div>

          <p className="id-build-name mt-3 text-lg font-bold">Ava — Sharma Reality</p>

          <p className="id-build-greeting mt-2 text-sm italic text-white/85">
            &ldquo;Thanks for calling Sharma Reality, this is Ava.&rdquo;
          </p>

          <span className="id-build-tag mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold">
            <Check className="size-3" aria-hidden />
            Same on every number
          </span>
        </div>
      </div>
    </div>
  )
}
