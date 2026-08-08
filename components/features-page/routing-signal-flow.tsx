import { GitBranch, Moon, PhoneCall, ShieldQuestion, Tag, Terminal } from "lucide-react"

// Bespoke pattern for behavior-routing-rules' "Why it matters" section: a
// call packet travels from an incoming-call node, through the rules engine,
// out to one of three destinations in turn — the routing decision made
// visible as motion, not just a static comparison list. The page's own
// "How it works" section already uses a top-down decision TREE, so this is
// a left-to-right signal-routing diagram instead, to stay visually
// distinct. Pure CSS keyframes (see .rt-* in globals.css), no JS.
const DESTINATIONS = [
  {
    icon: Tag,
    label: "Intent match",
    top: 30,
    share: "58%",
    tone: "#2563EB",
    destClass: "rt-dest-a",
    captionClass: "rt-caption-a",
    condition: 'IF intent == "pricing" OR "booking"',
    matched: "Calls route automatically by intent or keyword",
    without: "Without a rule: every call follows the same flow, regardless of intent",
  },
  {
    icon: Moon,
    label: "After-hours",
    top: 120,
    share: "27%",
    tone: "#7C3AED",
    destClass: "rt-dest-b",
    captionClass: "rt-caption-b",
    condition: "IF call_time > 18:00 OR < 09:00",
    matched: "Time-of-day rules send after-hours calls the right way",
    without: "Without a rule: after-hours calls get treated the same as business hours",
  },
  {
    icon: ShieldQuestion,
    label: "Fallback",
    top: 230,
    share: "15%",
    tone: "#10B981",
    destClass: "rt-dest-c",
    captionClass: "rt-caption-c",
    condition: "IF no_rule_matched == true",
    matched: "A fallback rule catches anything unmatched",
    without: "Without a rule: unmatched calls have nowhere defined to go",
  },
]

export function RoutingSignalFlow() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-border/60 bg-white shadow-[0_24px_54px_-30px_rgba(15,23,42,0.25)]">
      <div className="flex items-center gap-2.5 border-b border-border/60 bg-[#F8FAFC] px-6 py-3.5 md:px-10">
        <Terminal className="size-3.5 text-muted-foreground" aria-hidden />
        <span className="text-xs font-semibold text-foreground">Call Router</span>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          Live
        </span>
        <span className="ml-auto text-[10px] text-muted-foreground">Routing decision in &lt;50ms</span>
      </div>

      <div className="grid gap-10 p-6 md:grid-cols-[500px_1fr] md:items-center md:p-10">
        {/* the routing diagram — kept at a literal 500x260px canvas and
            scaled down as a single block on narrow screens, instead of
            reflowing via percentages, so the fixed-size icons/text inside
            never get crushed into overlapping on small viewports. */}
        <div className="relative mx-auto w-full max-w-[500px] overflow-visible" style={{ aspectRatio: "500 / 260" }}>
          <div className="absolute left-1/2 top-0 h-[260px] w-[500px] origin-top -translate-x-1/2 scale-[0.62] sm:scale-100">
            <svg viewBox="0 0 500 260" className="absolute inset-0 size-full" aria-hidden>
              <path d="M40,130 L250,130" fill="none" stroke="#E2E8F0" strokeWidth="2" />
              {DESTINATIONS.map((d) => (
                <path key={d.label} d={`M250,130 L460,${d.top}`} fill="none" stroke="#E2E8F0" strokeWidth="2" />
              ))}
            </svg>

            {/* incoming call */}
            <div className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5" style={{ left: 40, top: 130 }}>
              <span className="flex size-11 items-center justify-center rounded-full bg-foreground text-white shadow-[0_10px_22px_-8px_rgba(15,23,42,0.5)]">
                <PhoneCall className="size-5" aria-hidden />
              </span>
              <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Incoming</span>
            </div>

            {/* rules engine — always processing */}
            <div className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5" style={{ left: 250, top: 130 }}>
              <span className="relative flex size-11 items-center justify-center rounded-full bg-primary text-white shadow-[0_10px_22px_-8px_rgba(37,99,235,0.6)]">
                <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-40" style={{ animationDuration: "1.8s" }} aria-hidden />
                <GitBranch className="relative size-5" aria-hidden />
              </span>
              <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-primary">Rules engine</span>
            </div>

            {/* destinations */}
            {DESTINATIONS.map((d) => {
              const Icon = d.icon
              return (
                <div
                  key={d.label}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5"
                  style={{ left: 460, top: d.top }}
                >
                  <span className={`flex size-10 items-center justify-center rounded-full text-white ${d.destClass}`} style={{ backgroundColor: d.tone, boxShadow: `0 10px 20px -8px ${d.tone}99` }}>
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="mt-1 whitespace-nowrap text-[10px] font-semibold" style={{ color: d.tone }}>
                    {d.label}
                  </span>
                  <span className="whitespace-nowrap rounded-full px-1.5 py-0.5 font-mono text-[9px] font-bold" style={{ backgroundColor: `${d.tone}14`, color: d.tone }}>
                    {d.share}
                  </span>
                </div>
              )
            })}

            {/* traveling call packets, each with a soft blurred trail behind it */}
            <div className="rt-packet-a absolute size-5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[6px]" style={{ backgroundColor: "#2563EB", opacity: 0.45 }} />
            <div className="rt-packet-a absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ backgroundColor: "#2563EB" }} />
            <div className="rt-packet-b absolute size-5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[6px]" style={{ backgroundColor: "#7C3AED", opacity: 0.45 }} />
            <div className="rt-packet-b absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ backgroundColor: "#7C3AED" }} />
            <div className="rt-packet-c absolute size-5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[6px]" style={{ backgroundColor: "#10B981", opacity: 0.45 }} />
            <div className="rt-packet-c absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ backgroundColor: "#10B981" }} />
          </div>
        </div>

        {/* caption stack — synced to the same 9s cycle as the packets */}
        <div className="relative min-h-[164px]">
          {DESTINATIONS.map((d) => {
            const Icon = d.icon
            return (
              <div key={d.label} className={`absolute inset-0 ${d.captionClass}`}>
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide" style={{ color: d.tone }}>
                  <Icon className="size-3.5" aria-hidden />
                  {d.label}
                </div>
                <p
                  className="mt-2 inline-block rounded-lg px-2.5 py-1 font-mono text-[12px]"
                  style={{ backgroundColor: `${d.tone}0F`, color: d.tone }}
                >
                  {d.condition}
                </p>
                <p className="mt-2 text-base font-bold text-foreground">{d.matched}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{d.without}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
