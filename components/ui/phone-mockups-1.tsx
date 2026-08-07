"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Bell, CheckCircle2, Headphones, KeyRound, Server, ShieldCheck, Wifi } from "lucide-react"
import { ImageItem, PhoneCarousel } from "@/components/ui/phone-mockups-1-utils/phone-carousel"

const TICKET_ROWS = [
  { t: "VPN outage", meta: "#IT-2198 · 2m ago", s: "Resolved", ok: true, Icon: Wifi, tint: "bg-blue-50 text-blue-600" },
  { t: "Password reset", meta: "#IT-2201 · 6m ago", s: "Resolved", ok: true, Icon: KeyRound, tint: "bg-violet-50 text-violet-600" },
  { t: "Access request", meta: "#IT-2204 · 12m ago", s: "In progress", ok: false, Icon: ShieldCheck, tint: "bg-amber-50 text-amber-600" },
]

// Ticks up on an interval so a stagger container can be remounted (via
// `key={tick}`) and replay its one-by-one entrance animation repeatedly,
// instead of only ever playing once on mount.
function useReplayTick(intervalMs: number) {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return tick
}

const staggerContainer = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }
const popInItem = { hidden: { opacity: 0, y: 10, scale: 0.85 }, show: { opacity: 1, y: 0, scale: 1 } }

// A trio of tiny twinkling dots scattered around a corner — a sparkle
// flourish reused near a few of the screens' hero badges.
function Twinkles({ className }: { className?: string }) {
  const dots = [
    { top: "-6px", left: "-4px", delay: 0 },
    { top: "2px", left: "34px", delay: 0.5 },
    { top: "24px", left: "-8px", delay: 1 },
  ]
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className ?? ""}`}>
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute size-[3px] rounded-full bg-sky-400"
          style={{ top: d.top, left: d.left }}
          animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: d.delay }}
        />
      ))}
    </div>
  )
}

// A dashed ring that spins continuously behind a hero icon — reused across
// screens for a consistent "processing halo" flourish.
function SpinHalo({ size = 48, color = "border-blue-300" }: { size?: number; color?: string }) {
  return (
    <div aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: size, height: size }}>
      <motion.span
        className={`block size-full rounded-full border-2 border-dashed ${color}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

function PhoneStatusBar() {
  return (
    <div className="flex items-center justify-between px-3 pb-0.5 pt-3 text-[6.5px] font-semibold text-slate-400">
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <Wifi className="size-2" aria-hidden />
        <span className="h-1.5 w-3 rounded-[1px] bg-slate-300" aria-hidden />
      </span>
    </div>
  )
}

// Screen 1 — ticket queue: rows sweep with a highlight in turn, the
// "in progress" row pulses to signal it's actively being worked, and the
// footer equalizer never stops moving.
function TicketScreen() {
  const [liveRow, setLiveRow] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setLiveRow((r) => (r + 1) % TICKET_ROWS.length), 1600)
    return () => clearInterval(id)
  }, [])
  const replayTick = useReplayTick(4200)

  return (
    <div className="flex h-full flex-col bg-slate-50 px-2.5 pb-2">
      <PhoneStatusBar />

      <div className="flex items-center justify-between">
        <motion.div
          animate={{ y: [0, -1.5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-1.5"
        >
          <span className="grid size-4.5 place-items-center rounded-md bg-gradient-to-br from-blue-600 to-sky-500 text-white">
            <Server className="size-2.5" aria-hidden />
          </span>
          <p className="text-[8.5px] font-extrabold text-slate-800">IT Helpdesk</p>
        </motion.div>
        <motion.span
          animate={{ rotate: [0, -18, 16, -12, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
          className="relative grid size-5 place-items-center rounded-full bg-white text-slate-500 shadow-sm"
        >
          <Twinkles className="scale-75" />
          <Bell className="size-3" aria-hidden />
          <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-red-500 ring-2 ring-white" aria-hidden />
          <span aria-hidden className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-red-400 motion-safe:animate-ping" />
        </motion.span>
      </div>

      <motion.div
        key={replayTick}
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className="mt-1.5 grid grid-cols-2 gap-1"
      >
        <motion.div
          variants={popInItem}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-lg border border-slate-100 bg-white px-1.5 py-1 shadow-sm"
        >
          <p className="text-[6px] font-semibold uppercase tracking-wide text-slate-400">Open</p>
          <p className="text-[9.5px] font-extrabold text-slate-800">3</p>
        </motion.div>
        <motion.div
          variants={popInItem}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-lg border border-slate-100 bg-white px-1.5 py-1 shadow-sm"
        >
          <p className="text-[6px] font-semibold uppercase tracking-wide text-slate-400">Avg. response</p>
          <p className="text-[9.5px] font-extrabold text-slate-800">2m 40s</p>
        </motion.div>
      </motion.div>

      <p className="mt-1.5 text-[6.5px] font-bold uppercase tracking-wide text-slate-400">Recent tickets</p>
      <motion.div animate={{ y: [0, -2.5, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }} className="mt-1 space-y-1">
        {TICKET_ROWS.map((row, i) => (
          <motion.div
            key={row.t}
            animate={
              i === liveRow
                ? { scale: [1, 1.08, 1.04], boxShadow: "0 6px 16px -6px rgba(37,99,235,0.45)" }
                : { scale: 1, boxShadow: "0 1px 2px 0 rgba(0,0,0,0.04)" }
            }
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center gap-1.5 overflow-hidden rounded-lg border border-slate-100 bg-white px-1.5 py-1"
          >
            {i === liveRow && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-2/5 -skew-x-12 bg-gradient-to-r from-transparent via-blue-200 to-transparent"
                initial={{ x: "-140%" }}
                animate={{ x: "240%" }}
                transition={{ duration: 0.9, ease: "linear" }}
              />
            )}
            <motion.span
              animate={i === liveRow ? { scale: [1, 1.25, 1] } : { scale: 1 }}
              transition={{ duration: 0.6, repeat: i === liveRow ? Infinity : 0, ease: "easeInOut" }}
              className={`relative grid size-5 shrink-0 place-items-center rounded-md ${row.tint}`}
            >
              <row.Icon className="size-2.5" aria-hidden />
            </motion.span>
            <span className="relative min-w-0 flex-1">
              <span className="block truncate text-[7.5px] font-bold text-slate-800">{row.t}</span>
              <span className="block truncate text-[6px] font-medium text-slate-400">{row.meta}</span>
            </span>
            <span
              className={`relative shrink-0 rounded-full px-1.5 py-0.5 text-[6px] font-bold ${
                row.ok ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
              }`}
            >
              {row.s}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="mt-auto flex items-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 p-1.5 text-white shadow-sm"
      >
        <div className="flex h-5 items-end gap-[2px]" aria-hidden>
          {[5, 9, 7, 12, 9, 14].map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
              className="ind-eq w-[2.5px] rounded-full bg-white/70"
            />
          ))}
        </div>
        <div>
          <p className="text-[6.5px] font-medium text-blue-100">Resolved today</p>
          <p className="font-serif text-[13px] font-extrabold leading-none">96%</p>
        </div>
      </motion.div>
    </div>
  )
}

// Screen 2 — live call: a genuinely ticking call timer, a pulsing ring
// around the AI avatar, and a continuously moving waveform.
function LiveCallScreen() {
  const [seconds, setSeconds] = useState(42)
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0")
  const ss = String(seconds % 60).padStart(2, "0")
  const replayTick = useReplayTick(4600)

  return (
    <div className="flex h-full flex-col bg-white px-2.5 pb-2">
      <PhoneStatusBar />

      <div className="flex items-center justify-between">
        <motion.div
          animate={{ y: [0, -1.5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-1.5"
        >
          <span className="grid size-4.5 place-items-center rounded-md bg-gradient-to-br from-blue-600 to-sky-500 text-white">
            <Server className="size-2.5" aria-hidden />
          </span>
          <p className="text-[8.5px] font-extrabold text-slate-800">IT Helpdesk</p>
        </motion.div>
        <motion.span
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[6px] font-bold text-red-500"
        >
          <span className="size-1 rounded-full bg-red-500 motion-safe:animate-pulse" aria-hidden />
          Live
        </motion.span>
      </div>

      <motion.div
        animate={{ boxShadow: ["0 8px 20px -10px rgba(37,99,235,0.15)", "0 14px 32px -10px rgba(37,99,235,0.4)", "0 8px 20px -10px rgba(37,99,235,0.15)"] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="relative mt-2 flex flex-col items-center gap-1.5 overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-b from-blue-50/60 to-white p-3 text-center"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-6 left-1/2 size-24 -translate-x-1/2 rounded-full bg-sky-300/40 blur-xl"
          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10 grid size-12 place-items-center">
          <SpinHalo size={62} color="border-sky-300" />
          <motion.span
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="relative grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-600/25"
          >
            <span aria-hidden className="absolute inset-0 rounded-2xl bg-sky-400/50 motion-safe:animate-ping" />
            <Headphones className="relative size-6" aria-hidden />
          </motion.span>
        </div>
        <p className="relative z-10 text-[9px] font-bold text-slate-800">AI Agent — Live</p>
        <div className="relative z-10 flex h-5 items-end gap-[2.5px]" aria-hidden>
          {[9, 16, 11, 19, 10, 15].map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
              className="ind-eq w-[3px] rounded-full bg-gradient-to-t from-sky-400 to-blue-500"
            />
          ))}
        </div>
        <span className="relative z-10 rounded-full bg-blue-50 px-2.5 py-0.5 text-[7.5px] font-semibold tabular-nums text-blue-600 ring-1 ring-blue-100">
          {mm}:{ss}
        </span>
      </motion.div>

      <div className="mt-2 space-y-1">
        <p className="text-[6px] font-bold uppercase tracking-wide text-slate-400">Call details</p>
        <motion.div key={replayTick} initial="hidden" animate="show" variants={staggerContainer} className="space-y-1">
          {[
            { label: "Caller", value: "+91 98xxx xxxxx" },
            { label: "Queue", value: "IT Helpdesk" },
            { label: "Language", value: "Hindi / English" },
          ].map((row) => (
            <motion.div
              key={row.label}
              variants={popInItem}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-1.5 py-1"
            >
              <span className="text-[6.5px] font-semibold text-slate-500">{row.label}</span>
              <span className="max-w-[68px] truncate text-[6.5px] font-bold text-slate-800">{row.value}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="mt-auto flex items-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 p-1.5 text-white shadow-sm"
      >
        <div className="flex h-5 items-end gap-[2px]" aria-hidden>
          {[9, 5, 12, 7, 14, 9].map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
              className="ind-eq w-[2.5px] rounded-full bg-white/70"
            />
          ))}
        </div>
        <div>
          <p className="text-[6.5px] font-medium text-blue-100">Audio latency</p>
          <p className="font-serif text-[13px] font-extrabold leading-none">180ms</p>
        </div>
      </motion.div>
    </div>
  )
}

// Screen 3 — password reset: the key icon gently "turns", and the
// confirmation badge pops in with a spring on a repeating cycle.
function PasswordResetScreen() {
  const replayTick = useReplayTick(4400)

  return (
    <div className="flex h-full flex-col bg-white px-2.5 pb-2">
      <PhoneStatusBar />

      <motion.div
        animate={{ y: [0, -1.5, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-1.5"
      >
        <span className="grid size-4.5 place-items-center rounded-md bg-gradient-to-br from-blue-600 to-sky-500 text-white">
          <Server className="size-2.5" aria-hidden />
        </span>
        <p className="text-[8.5px] font-extrabold text-slate-800">IT Helpdesk</p>
      </motion.div>

      <div className="mt-2 flex flex-col items-center gap-1.5 text-center">
        <div className="relative grid size-10 place-items-center">
          <motion.span
            aria-hidden
            className="absolute size-12 rounded-full border-2 border-dashed border-blue-300"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          <motion.span
            animate={{ rotate: [0, -32, 0, 32, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-600/25"
          >
            <KeyRound className="size-5" aria-hidden />
          </motion.span>
        </div>
        <p className="text-[9px] font-bold text-slate-800">Password reset</p>
        <motion.span
          animate={{ scale: [1, 1.22, 1], y: [0, -2, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[7.5px] font-bold text-emerald-600 ring-1 ring-emerald-100"
        >
          <Twinkles />
          <CheckCircle2 className="size-2.5" aria-hidden />
          Link sent
        </motion.span>
        <div className="mt-0.5 h-1 w-20 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            key={replayTick}
            className="h-full rounded-full bg-gradient-to-r from-blue-400 to-emerald-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <div className="mt-2 space-y-1">
        <p className="text-[6px] font-bold uppercase tracking-wide text-slate-400">Reset details</p>
        <motion.div key={replayTick} initial="hidden" animate="show" variants={staggerContainer} className="space-y-1">
          {[
            { label: "Account", value: "r.mehta@company.com" },
            { label: "Method", value: "SMS one-time link" },
            { label: "Requested", value: "Just now" },
          ].map((row) => (
            <motion.div
              key={row.label}
              variants={popInItem}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-1.5 py-1"
            >
              <span className="text-[6.5px] font-semibold text-slate-500">{row.label}</span>
              <span className="max-w-[68px] truncate text-[6.5px] font-bold text-slate-800">{row.value}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="mt-auto flex items-center gap-2 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-1.5 text-white shadow-sm"
      >
        <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-white/15">
          <CheckCircle2 className="size-3.5" aria-hidden />
        </span>
        <div>
          <p className="text-[7px] font-bold leading-tight">Ticket #IT-2201</p>
          <p className="text-[6px] font-medium text-emerald-100">Closed automatically</p>
        </div>
      </motion.div>
    </div>
  )
}

// Screen 4 — access granted: expanding sonar-style approval rings behind
// the shield, like a stamp landing.
function AccessGrantedScreen() {
  const replayTick = useReplayTick(4800)

  return (
    <div className="flex h-full flex-col bg-white px-2.5 pb-2">
      <PhoneStatusBar />

      <motion.div
        animate={{ y: [0, -1.5, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-1.5"
      >
        <span className="grid size-4.5 place-items-center rounded-md bg-gradient-to-br from-blue-600 to-sky-500 text-white">
          <Server className="size-2.5" aria-hidden />
        </span>
        <p className="text-[8.5px] font-extrabold text-slate-800">IT Helpdesk</p>
      </motion.div>

      <div className="mt-2 flex flex-col items-center gap-1.5 text-center">
        <div className="relative grid size-10 place-items-center">
          <SpinHalo size={58} color="border-emerald-300" />
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute size-10 rounded-2xl border-2 border-emerald-400/70"
              animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: i * 0.7 }}
            />
          ))}
          <motion.span
            animate={{ scale: [1, 1.22, 0.96, 1.08, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-600/25"
          >
            <ShieldCheck className="size-5" aria-hidden />
          </motion.span>
        </div>
        <p className="text-[9px] font-bold text-slate-800">Access request</p>
        <motion.span
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="relative rounded-full bg-emerald-50 px-2.5 py-0.5 text-[7.5px] font-bold text-emerald-600 ring-1 ring-emerald-100"
        >
          <Twinkles />
          Granted
        </motion.span>
      </div>

      <div className="mt-2 space-y-1">
        <p className="text-[6px] font-bold uppercase tracking-wide text-slate-400">Request details</p>
        <motion.div key={replayTick} initial="hidden" animate="show" variants={staggerContainer} className="space-y-1">
          {[
            { label: "Requester", value: "Aditya Sharma" },
            { label: "Resource", value: "VPN — Finance" },
            { label: "Duration", value: "24 hours" },
          ].map((row) => (
            <motion.div
              key={row.label}
              variants={popInItem}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-1.5 py-1"
            >
              <span className="text-[6.5px] font-semibold text-slate-500">{row.label}</span>
              <span className="max-w-[68px] truncate text-[6.5px] font-bold text-slate-800">{row.value}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="mt-auto flex items-center gap-2 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-1.5 text-white shadow-sm"
      >
        <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-white/15">
          <ShieldCheck className="size-3.5" aria-hidden />
        </span>
        <div>
          <p className="text-[7px] font-bold leading-tight">Ticket #IT-2204</p>
          <p className="text-[6px] font-medium text-emerald-100">Approved by AI agent</p>
        </div>
      </motion.div>
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
