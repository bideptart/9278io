import { CheckCircle2, Headphones, KeyRound, ShieldCheck, Ticket } from "lucide-react"
import { ImageItem, PhoneCarousel } from "@/components/ui/phone-mockups-1-utils/phone-carousel"

function TicketScreen() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-blue-50/60 to-white px-3 pb-3 pt-7">
      <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">Helpdesk queue</p>
      <div className="mt-2 space-y-1.5">
        {[
          { t: "VPN outage", s: "Resolved", ok: true },
          { t: "Password reset", s: "Resolved", ok: true },
          { t: "Access request", s: "In progress", ok: false },
        ].map((row) => (
          <div key={row.t} className="flex items-center justify-between rounded-lg border border-slate-100 bg-white px-2 py-1.5 shadow-sm">
            <span className="flex items-center gap-1.5 text-[8.5px] font-semibold text-slate-700">
              <Ticket className="size-3 text-blue-500" aria-hidden />
              {row.t}
            </span>
            <span className={`text-[7.5px] font-bold ${row.ok ? "text-emerald-500" : "text-amber-500"}`}>{row.s}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 p-2.5 text-white shadow-sm">
        <p className="text-[8px] font-medium text-blue-100">Resolved today</p>
        <p className="font-serif text-lg font-extrabold">96%</p>
      </div>
    </div>
  )
}

function LiveCallScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-slate-900 to-blue-950 px-4 text-center">
      <span className="grid size-16 place-items-center rounded-3xl bg-white/10 text-white ring-1 ring-white/20">
        <Headphones className="size-8" aria-hidden />
      </span>
      <p className="text-[10px] font-bold text-white">AI Agent — Live</p>
      <div className="flex h-4 items-end gap-[2px]" aria-hidden>
        {[6, 12, 8, 14, 7, 11].map((h, i) => (
          <span
            key={i}
            style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
            className="ind-eq w-[2.5px] rounded-full bg-gradient-to-t from-sky-400 to-blue-300"
          />
        ))}
      </div>
      <span className="rounded-full bg-white/10 px-3 py-1 text-[8px] font-semibold text-sky-200 ring-1 ring-white/15">00:42</span>
    </div>
  )
}

function PasswordResetScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-white to-blue-50/60 px-4 text-center">
      <span className="grid size-16 place-items-center rounded-3xl bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-600/25">
        <KeyRound className="size-8" aria-hidden />
      </span>
      <p className="text-[10px] font-bold text-slate-800">Password reset</p>
      <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[8.5px] font-bold text-emerald-600 ring-1 ring-emerald-100">
        <CheckCircle2 className="size-3" aria-hidden />
        Link sent
      </span>
    </div>
  )
}

function AccessGrantedScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-white to-emerald-50/50 px-4 text-center">
      <span className="grid size-16 place-items-center rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-600/25">
        <ShieldCheck className="size-8" aria-hidden />
      </span>
      <p className="text-[10px] font-bold text-slate-800">Access request</p>
      <span className="rounded-full bg-emerald-50 px-3 py-1 text-[8.5px] font-bold text-emerald-600 ring-1 ring-emerald-100">
        Granted
      </span>
    </div>
  )
}

const enterpriseItScreens: ImageItem[] = [
  { alt: "IT helpdesk ticket queue", content: <TicketScreen /> },
  { alt: "Live AI voice agent call", content: <LiveCallScreen /> },
  { alt: "Password reset confirmation", content: <PasswordResetScreen /> },
  { alt: "Access request granted", content: <AccessGrantedScreen /> },
]

export default function PhoneMockupBasic() {
  return <PhoneCarousel images={enterpriseItScreens} />
}
