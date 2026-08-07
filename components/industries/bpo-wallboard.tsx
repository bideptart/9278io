"use client"

// Hero visual for "AI Voice Agents for BPO & Call Centres" — a premium
// enterprise-SaaS AI voice-agent interface. Sky-blue-on-white only, no
// other accent colours. Built with GSAP-style animation principles
// (staggered entrances, layered speeds, smooth easing, no bounce) using
// the codebase's existing motion/react library rather than adding GSAP as
// a new dependency.

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { CheckCircle2, Globe2, Headphones, PhoneCall, Star, User, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type Notice = { Icon: LucideIcon; label: string; sub: string }

// Three independent slots, each cycling through its own pair of statuses on
// its own timer — so notifications never change in lockstep, matching the
// "staggered appearance" behaviour requested.
const SLOT_A: Notice[] = [
  { Icon: Users, label: "Call Queue", sub: "4 waiting" },
  { Icon: Globe2, label: "Language", sub: "Auto-detected" },
]
const SLOT_B: Notice[] = [
  { Icon: CheckCircle2, label: "Resolution", sub: "In progress" },
  { Icon: Star, label: "CSAT Score", sub: "4.6 / 5" },
]
const SLOT_C: Notice[] = [
  { Icon: PhoneCall, label: "Customer", sub: "Connected" },
  { Icon: Headphones, label: "Routed to", sub: "Billing queue" },
]

function useCycle(items: Notice[], intervalMs: number) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % items.length), intervalMs)
    return () => clearInterval(id)
  }, [items.length, intervalMs])
  return items[i]
}

function NoticeCard({ notice, className }: { notice: Notice; className?: string }) {
  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={notice.label + notice.sub}
          initial={{ opacity: 0, scale: 0.92, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: -4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2 rounded-2xl border border-sky-100 bg-white/95 px-3 py-2 shadow-[0_10px_28px_-14px_rgba(14,116,209,0.35)] backdrop-blur"
        >
          <span className="grid size-7 shrink-0 place-items-center rounded-xl bg-sky-50 text-sky-600">
            <notice.Icon className="size-3.5" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[9.5px] font-semibold leading-tight text-slate-500">{notice.label}</p>
            <p className="truncate text-[10.5px] font-bold leading-tight text-slate-800">{notice.sub}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export function BpoWallboard() {
  const slotA = useCycle(SLOT_A, 3200)
  const slotB = useCycle(SLOT_B, 3800)
  const slotC = useCycle(SLOT_C, 4400)

  const [seconds, setSeconds] = useState(38)
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0")
  const ss = String(seconds % 60).padStart(2, "0")

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-white via-sky-50/50 to-sky-50/80">
      {/* Background layer — slow drift, furthest back = layered parallax */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(14,165,233,0.18),transparent)] blur-2xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Foreground layer 1 — the three floating notice cards, mid-speed */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[4%] top-[10%] z-20 hidden sm:block"
      >
        <NoticeCard notice={slotA} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="absolute right-[3%] top-[6%] z-20 hidden md:block"
      >
        <NoticeCard notice={slotB} />
      </motion.div>
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute bottom-[10%] left-[2%] z-20"
      >
        <NoticeCard notice={slotC} className="scale-90 sm:scale-100" />
      </motion.div>

      {/* Foreground layer 2 — the central AI call interface, fastest/closest */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-[220px] sm:w-[250px]"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-[1.75rem] border border-sky-100 bg-white/95 p-4 shadow-[0_30px_60px_-24px_rgba(14,116,209,0.35)] backdrop-blur-sm sm:p-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-sky-700 sm:text-[10px]">
              <span className="relative flex size-1.5" aria-hidden>
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-sky-500" />
              </span>
              AI Agent Active
            </span>
            <span className="font-serif text-[11px] font-bold tabular-nums text-slate-400 sm:text-xs">
              {mm}:{ss}
            </span>
          </div>

          {/* Voice waveform */}
          <div className="mt-4 flex h-10 items-center justify-center gap-[3px] sm:h-12">
            {[8, 16, 11, 22, 14, 26, 12, 19, 9, 17, 13].map((h, i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-gradient-to-t from-sky-300 to-sky-600"
                animate={{ height: [h * 0.35, h, h * 0.35] }}
                transition={{ duration: 1.1 + (i % 3) * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.06 }}
              />
            ))}
          </div>

          {/* AI ↔ Customer connection indicator */}
          <div className="relative mt-4 flex items-center justify-between px-1">
            <span className="grid size-8 place-items-center rounded-full bg-sky-600 text-white shadow-[0_6px_16px_-4px_rgba(2,132,199,0.6)] sm:size-9">
              <Headphones className="size-4" aria-hidden />
            </span>
            <span className="relative mx-2 h-px flex-1 overflow-hidden bg-sky-100">
              <motion.span
                className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-sky-400 to-transparent"
                animate={{ x: ["-100%", "220%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              />
            </span>
            <span className="grid size-8 place-items-center rounded-full bg-slate-100 text-slate-500 sm:size-9">
              <User className="size-4" aria-hidden />
            </span>
          </div>

          <div className="mt-3 flex items-center justify-center gap-1.5">
            <span className="relative flex size-1.5" aria-hidden>
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            <p className="text-[9.5px] font-semibold text-slate-500 sm:text-[10.5px]">Customer Connected</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
