import { Bell, CheckCircle2, Headphones, PhoneForwarded, Star, UserCheck } from "lucide-react"
import { ImageItem, PhoneCarousel } from "@/components/ui/phone-mockups-1-utils/phone-carousel"

const CALL_ROWS = [
  { t: "Order status", meta: "#CC-4821 · 1m ago", s: "Resolved", ok: true, Icon: CheckCircle2, tint: "bg-blue-50 text-blue-600" },
  { t: "Billing query", meta: "#CC-4819 · 4m ago", s: "Resolved", ok: true, Icon: CheckCircle2, tint: "bg-emerald-50 text-emerald-600" },
  { t: "Refund request", meta: "#CC-4815 · 9m ago", s: "In progress", ok: false, Icon: PhoneForwarded, tint: "bg-amber-50 text-amber-600" },
]

function PhoneStatusBar() {
  return (
    <div className="flex items-center justify-between px-3 pb-0.5 pt-3 text-[6.5px] font-semibold text-slate-400">
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <Headphones className="size-2" aria-hidden />
        <span className="h-1.5 w-3 rounded-[1px] bg-slate-300" aria-hidden />
      </span>
    </div>
  )
}

function CallQueueScreen() {
  return (
    <div className="flex h-full flex-col bg-slate-50 px-2.5 pb-2">
      <PhoneStatusBar />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="grid size-4.5 place-items-center rounded-md bg-gradient-to-br from-blue-600 to-sky-500 text-white">
            <Headphones className="size-2.5" aria-hidden />
          </span>
          <p className="text-[8.5px] font-extrabold text-slate-800">Call Centre</p>
        </div>
        <span className="relative grid size-4.5 place-items-center rounded-full bg-white text-slate-400 shadow-sm">
          <Bell className="size-2.5" aria-hidden />
          <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-red-500 ring-1 ring-white" aria-hidden />
        </span>
      </div>

      <div className="mt-1.5 grid grid-cols-2 gap-1">
        <div className="rounded-lg border border-slate-100 bg-white px-1.5 py-1 shadow-sm">
          <p className="text-[6px] font-semibold uppercase tracking-wide text-slate-400">In queue</p>
          <p className="text-[9.5px] font-extrabold text-slate-800">6</p>
        </div>
        <div className="rounded-lg border border-slate-100 bg-white px-1.5 py-1 shadow-sm">
          <p className="text-[6px] font-semibold uppercase tracking-wide text-slate-400">Avg. wait</p>
          <p className="text-[9.5px] font-extrabold text-slate-800">6s</p>
        </div>
      </div>

      <p className="mt-1.5 text-[6.5px] font-bold uppercase tracking-wide text-slate-400">Recent calls</p>
      <div className="mt-1 space-y-1">
        {CALL_ROWS.map((row) => (
          <div key={row.t} className="flex items-center gap-1.5 rounded-lg border border-slate-100 bg-white px-1.5 py-1 shadow-sm">
            <span className={`grid size-5 shrink-0 place-items-center rounded-md ${row.tint}`}>
              <row.Icon className="size-2.5" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[7.5px] font-bold text-slate-800">{row.t}</span>
              <span className="block truncate text-[6px] font-medium text-slate-400">{row.meta}</span>
            </span>
            <span
              className={`shrink-0 rounded-full px-1.5 py-0.5 text-[6px] font-bold ${
                row.ok ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
              }`}
            >
              {row.s}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 p-1.5 text-white shadow-sm">
        <div className="flex h-5 items-end gap-[2px]" aria-hidden>
          {[5, 9, 7, 12, 9, 14].map((h, i) => (
            <span key={i} style={{ height: `${h}px` }} className="w-[2.5px] rounded-full bg-white/70" />
          ))}
        </div>
        <div>
          <p className="text-[6.5px] font-medium text-blue-100">Calls handled today</p>
          <p className="font-serif text-[13px] font-extrabold leading-none">2,847</p>
        </div>
      </div>
    </div>
  )
}

function LiveCallScreen() {
  return (
    <div className="flex h-full flex-col bg-white px-2.5 pb-2">
      <PhoneStatusBar />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="grid size-4.5 place-items-center rounded-md bg-gradient-to-br from-blue-600 to-sky-500 text-white">
            <Headphones className="size-2.5" aria-hidden />
          </span>
          <p className="text-[8.5px] font-extrabold text-slate-800">Call Centre</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[6px] font-bold text-red-500">
          <span className="size-1 rounded-full bg-red-500 motion-safe:animate-pulse" aria-hidden />
          Live
        </span>
      </div>

      <div className="mt-2 flex flex-col items-center gap-1.5 rounded-2xl border border-slate-100 bg-gradient-to-b from-blue-50/60 to-white p-3 text-center shadow-sm">
        <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-600/25">
          <Headphones className="size-6" aria-hidden />
        </span>
        <p className="text-[9px] font-bold text-slate-800">AI Agent — Live</p>
        <div className="flex h-4 items-end gap-[2px]" aria-hidden>
          {[6, 12, 8, 14, 7, 11].map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
              className="ind-eq w-[2.5px] rounded-full bg-gradient-to-t from-sky-400 to-blue-500"
            />
          ))}
        </div>
        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[7.5px] font-semibold text-blue-600 ring-1 ring-blue-100">
          00:38
        </span>
      </div>

      <div className="mt-2 space-y-1">
        <p className="text-[6px] font-bold uppercase tracking-wide text-slate-400">Call details</p>
        {[
          { label: "Caller", value: "+91 98xxx xxxxx" },
          { label: "Queue", value: "Support" },
          { label: "Language", value: "Tamil / English" },
        ].map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-1.5 py-1"
          >
            <span className="text-[6.5px] font-semibold text-slate-500">{row.label}</span>
            <span className="max-w-[68px] truncate text-[6.5px] font-bold text-slate-800">{row.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 p-1.5 text-white shadow-sm">
        <div className="flex h-5 items-end gap-[2px]" aria-hidden>
          {[9, 5, 12, 7, 14, 9].map((h, i) => (
            <span key={i} style={{ height: `${h}px` }} className="w-[2.5px] rounded-full bg-white/70" />
          ))}
        </div>
        <div>
          <p className="text-[6.5px] font-medium text-blue-100">Audio latency</p>
          <p className="font-serif text-[13px] font-extrabold leading-none">210ms</p>
        </div>
      </div>
    </div>
  )
}

function CsatScreen() {
  return (
    <div className="flex h-full flex-col bg-white px-2.5 pb-2">
      <PhoneStatusBar />

      <div className="flex items-center gap-1.5">
        <span className="grid size-4.5 place-items-center rounded-md bg-gradient-to-br from-blue-600 to-sky-500 text-white">
          <Headphones className="size-2.5" aria-hidden />
        </span>
        <p className="text-[8.5px] font-extrabold text-slate-800">Call Centre</p>
      </div>

      <div className="mt-2 flex flex-col items-center gap-1.5 text-center">
        <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-400 text-white shadow-lg shadow-amber-500/25">
          <Star className="size-5" aria-hidden />
        </span>
        <p className="text-[9px] font-bold text-slate-800">Call feedback</p>
        <div className="flex items-center gap-0.5" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-2.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[7.5px] font-bold text-emerald-600 ring-1 ring-emerald-100">
          <CheckCircle2 className="size-2.5" aria-hidden />
          Submitted
        </span>
      </div>

      <div className="mt-2 space-y-1">
        <p className="text-[6px] font-bold uppercase tracking-wide text-slate-400">Feedback details</p>
        {[
          { label: "Rating", value: "5 / 5" },
          { label: "Resolved on", value: "First call" },
          { label: "Agent", value: "AI Voice Agent" },
        ].map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-1.5 py-1"
          >
            <span className="text-[6.5px] font-semibold text-slate-500">{row.label}</span>
            <span className="max-w-[68px] truncate text-[6.5px] font-bold text-slate-800">{row.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 p-1.5 text-white shadow-sm">
        <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-white/15">
          <Star className="size-3.5" aria-hidden />
        </span>
        <div>
          <p className="text-[7px] font-bold leading-tight">Avg. CSAT: 4.6 / 5</p>
          <p className="text-[6px] font-medium text-amber-50">Across 2,847 calls today</p>
        </div>
      </div>
    </div>
  )
}

function EscalationScreen() {
  return (
    <div className="flex h-full flex-col bg-white px-2.5 pb-2">
      <PhoneStatusBar />

      <div className="flex items-center gap-1.5">
        <span className="grid size-4.5 place-items-center rounded-md bg-gradient-to-br from-blue-600 to-sky-500 text-white">
          <Headphones className="size-2.5" aria-hidden />
        </span>
        <p className="text-[8.5px] font-extrabold text-slate-800">Call Centre</p>
      </div>

      <div className="mt-2 flex flex-col items-center gap-1.5 text-center">
        <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-600/25">
          <UserCheck className="size-5" aria-hidden />
        </span>
        <p className="text-[9px] font-bold text-slate-800">Escalation</p>
        <span className="rounded-full bg-violet-50 px-2.5 py-0.5 text-[7.5px] font-bold text-violet-600 ring-1 ring-violet-100">
          Routed live
        </span>
      </div>

      <div className="mt-2 space-y-1">
        <p className="text-[6px] font-bold uppercase tracking-wide text-slate-400">Handoff details</p>
        {[
          { label: "Reason", value: "Complex refund" },
          { label: "Routed to", value: "Senior agent" },
          { label: "Handoff time", value: "12s" },
        ].map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-1.5 py-1"
          >
            <span className="text-[6.5px] font-semibold text-slate-500">{row.label}</span>
            <span className="max-w-[68px] truncate text-[6.5px] font-bold text-slate-800">{row.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 p-1.5 text-white shadow-sm">
        <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-white/15">
          <UserCheck className="size-3.5" aria-hidden />
        </span>
        <div>
          <p className="text-[7px] font-bold leading-tight">Ticket #CC-4815</p>
          <p className="text-[6px] font-medium text-violet-100">Handed off automatically</p>
        </div>
      </div>
    </div>
  )
}

const bpoScreens: ImageItem[] = [
  { alt: "Call centre live queue", content: <CallQueueScreen /> },
  { alt: "Live AI voice agent call", content: <LiveCallScreen /> },
  { alt: "Customer satisfaction feedback", content: <CsatScreen /> },
  { alt: "Call escalated to a human agent", content: <EscalationScreen /> },
]

export default function PhoneMockupBpo() {
  return <PhoneCarousel images={bpoScreens} />
}
