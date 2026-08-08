import { AudioLines, Lock, PhoneCall, Route, Timer } from "lucide-react"

// Bespoke pattern for live-test-call: a before/after "wipe" reveal — a
// vertical divider sweeps across a single set of tiles, uncovering the real
// live-call layer underneath a locked/grayscale sandbox layer, the way a
// photo comparison slider does. Driven purely by CSS keyframes (see
// .lt-wipe-clip / .lt-wipe-left in globals.css) rather than JS timers, so
// there's no component state to reset. Distinct from the card-grid and
// progress-track patterns already used elsewhere on the site.
const CHECKS = [
  {
    icon: AudioLines,
    label: "Voice quality",
    locked: "Only tested in a text-based sandbox",
    result: "Tested by dialing the exact live number",
  },
  {
    icon: Timer,
    label: "Latency",
    locked: "First real call reveals voice or latency issues",
    result: "Voice and latency verified before launch",
  },
  {
    icon: Route,
    label: "Call routing",
    locked: "Routing mistakes discovered by an actual customer",
    result: "Routing confirmed end to end, by you",
  },
]

function Tile({ icon: Icon, label, sub, tone }: { icon: typeof AudioLines; label: string; sub: string; tone: "locked" | "live" }) {
  const isLive = tone === "live"
  return (
    <div
      className="flex flex-1 flex-col items-center gap-2.5 rounded-2xl px-4 py-6 text-center"
      style={isLive ? { backgroundColor: "#ECFDF5" } : { backgroundColor: "#F1F5F9" }}
    >
      <span
        className="flex size-14 items-center justify-center rounded-full"
        style={
          isLive
            ? { backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)", color: "#FFFFFF" }
            : { backgroundColor: "#E2E8F0", color: "#94A3B8" }
        }
      >
        {isLive ? <Icon className="size-6" aria-hidden /> : <Lock className="size-6" aria-hidden />}
      </span>
      <p className="text-[16px] font-semibold" style={{ color: isLive ? "#065F46" : "#64748B" }}>
        {label}
      </p>
      <p className="text-[14px] leading-snug" style={{ color: isLive ? "#059669" : "#94A3B8" }}>
        {sub}
      </p>
    </div>
  )
}

export function LiveTestCallComparison() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-border/60 bg-white p-6 shadow-[0_24px_54px_-30px_rgba(15,23,42,0.25)] md:p-8">
      <div className="flex items-start justify-between gap-6">
        <p className="max-w-sm text-[13px] leading-relaxed text-muted-foreground">
          A text sandbox can only tell you the agent replies with the right words. Dragging this into a real
          call is what actually proves it.
        </p>
        <div className="flex shrink-0 flex-col items-end gap-1 text-[11px] font-semibold uppercase tracking-wide">
          <span className="text-muted-foreground">Text sandbox</span>
          <span className="text-primary">Live test call</span>
        </div>
      </div>

      <div className="relative mt-6">
        {/* base layer — the real live-call result, always fully present underneath */}
        <div className="flex gap-3">
          {CHECKS.map((c) => (
            <Tile key={c.label} icon={c.icon} label={c.label} sub={c.result} tone="live" />
          ))}
        </div>

        {/* overlay — sandbox/locked state, swept away left-to-right (and back) by CSS */}
        <div className="lt-wipe-clip absolute inset-0 flex gap-3">
          {CHECKS.map((c) => (
            <Tile key={c.label} icon={c.icon} label={c.label} sub={c.locked} tone="locked" />
          ))}
        </div>

        {/* divider + handle, tracking the same sweep */}
        <div className="lt-wipe-left pointer-events-none absolute inset-y-0 z-10" aria-hidden>
          <div
            className="h-full w-0.5 -translate-x-1/2"
            style={{ backgroundImage: "linear-gradient(180deg, #2563EB, #0EA5E9, #10B981)" }}
          />
          <span
            className="absolute top-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-[0_10px_20px_-8px_rgba(37,99,235,0.6)]"
            style={{ backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)" }}
          >
            <PhoneCall className="size-3.5" aria-hidden />
          </span>
        </div>
      </div>

      <p className="mx-auto mt-5 max-w-lg text-center text-[12px] leading-relaxed text-muted-foreground">
        A sandbox can't tell you any of this — only dialing the real number, and hearing your agent answer
        it live, actually can.
      </p>
    </div>
  )
}
