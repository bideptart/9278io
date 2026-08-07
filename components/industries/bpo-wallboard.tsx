"use client"

// Hero visual for "AI Voice Agents for BPO & Call Centres" — a premium
// sky-blue-on-white composition that rotates through four scenes every
// couple of seconds: the original, first-approved "Live Call" design, plus
// three deliberately distinct concepts — a radial "AI Voice Orbit", a
// left-to-right "Live Call Flow", and a layered "AI Command Center" of
// floating glass cards. Every scene stays permanently mounted and is simply
// faded/transformed in or out based on an `active` flag (rather than
// mounted/unmounted through AnimatePresence), so the rotation never depends
// on an exit animation reliably reporting "finished" before the next scene
// can appear. Built entirely on the codebase's existing motion/react
// library.

import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import type { MotionValue } from "motion/react"
import { CheckCircle2, Globe2, Headphones, PhoneCall, Signal, Star, TrendingUp, User, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const SCENES = ["call", "orbit", "flow", "command"] as const

function useSceneCycle(intervalMs: number) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % SCENES.length), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return SCENES[i]
}

// Small drifting particles standing in for ambient "voice signal" energy —
// these live in open space around the composition and stay put across
// every scene.
const PARTICLES = [
  { top: "18%", left: "22%", delay: 0 },
  { top: "72%", left: "18%", delay: 1.2 },
  { top: "14%", left: "76%", delay: 0.6 },
  { top: "80%", left: "80%", delay: 1.8 },
]

type SceneLayerProps = {
  cardsY: MotionValue<number>
  centerY: MotionValue<number>
  centerRotate: MotionValue<number>
  centerScale: MotionValue<number>
  active: boolean
}

function SceneBadge({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-sky-100 bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-sky-700 shadow-sm backdrop-blur sm:text-[10px]">
      <span className="relative flex size-1.5" aria-hidden>
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-sky-400 opacity-75" />
        <span className="relative inline-flex size-1.5 rounded-full bg-sky-500" />
      </span>
      {children}
    </span>
  )
}

// Two customer nodes at the container edges, each with a curved routing
// path into the central hub — represents multiple simultaneous calls being
// routed into the AI agent, not just one static connection.
const ROUTES = [
  { x1: 6, y1: 32, path: "M6,32 C 22,20 34,28 50,48", dur: "3.2s", delay: "0s" },
  { x1: 94, y1: 66, path: "M94,66 C 78,74 62,60 50,48", dur: "3.6s", delay: "1.1s" },
]

type Notice = { Icon: LucideIcon; label: string; sub: string }

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

// Scene 1 — "Live Call": the original, first-approved hero design — the
// central AI Agent Active card with a live timer and waveform, curved
// call-routing paths carrying pulses from two customer nodes, and three
// independently-cycling status notice cards floating around it.
function CallScene({ cardsY, centerY, centerRotate, centerScale, active }: SceneLayerProps) {
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
    <motion.div
      animate={active ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: -18 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <svg aria-hidden className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {ROUTES.map((r, i) => (
          <g key={i}>
            <path d={r.path} fill="none" stroke="#7dd3fc" strokeOpacity="0.4" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
            <circle r="1.1" fill="#0ea5e9">
              <animateMotion dur={r.dur} begin={r.delay} repeatCount="indefinite" path={r.path} />
            </circle>
          </g>
        ))}
      </svg>
      {ROUTES.map((r, i) => (
        <motion.span
          key={i}
          aria-hidden
          style={{ left: `${r.x1}%`, top: `${r.y1}%` }}
          className="absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 sm:block"
          animate={{ y: [0, i === 0 ? -5 : 5, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="relative grid size-6 place-items-center rounded-full bg-white text-sky-500 shadow-[0_6px_14px_-4px_rgba(14,116,209,0.4)] ring-1 ring-sky-100 sm:size-7">
            <span aria-hidden className="absolute inset-0 rounded-full bg-sky-400/25 motion-safe:animate-ping" />
            <User className="relative size-3 sm:size-3.5" aria-hidden />
          </span>
        </motion.span>
      ))}

      <motion.div style={{ y: cardsY }} className="absolute left-[4%] top-[10%] z-20 hidden sm:block">
        <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
          <NoticeCard notice={slotA} />
        </motion.div>
      </motion.div>
      <motion.div style={{ y: cardsY }} className="absolute right-[3%] top-[6%] z-20 hidden md:block">
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          <NoticeCard notice={slotB} />
        </motion.div>
      </motion.div>
      <motion.div style={{ y: cardsY }} className="absolute bottom-[10%] left-[2%] z-20">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          <NoticeCard notice={slotC} className="scale-90 sm:scale-100" />
        </motion.div>
      </motion.div>

      <motion.div style={{ y: centerY, rotate: centerRotate, scale: centerScale }} className="relative z-10 w-[220px] sm:w-[250px]">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-[1.75rem] border border-sky-100 bg-white/95 p-4 shadow-[0_30px_60px_-24px_rgba(14,116,209,0.35)] backdrop-blur-sm sm:p-5"
        >
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
    </motion.div>
  )
}

const ORBIT_NODES: { deg: number; radius: number; speed: number; Icon: LucideIcon }[] = [
  { deg: 0, radius: 95, speed: 16, Icon: User },
  { deg: 130, radius: 95, speed: 16, Icon: PhoneCall },
  { deg: 250, radius: 95, speed: 16, Icon: Globe2 },
]

// Concept 1 — "AI Voice Orbit": a central pulsing AI core with two counter-
// rotating dashed rings, traveling signal pulses along them, three
// connection nodes orbiting at a fixed radius, and floating call-status
// panels — a radial, layered-depth composition unlike a card or a list.
function OrbitScene({ cardsY, centerY, centerScale, active }: SceneLayerProps) {
  return (
    <motion.div
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div style={{ y: cardsY }} className="absolute left-[4%] top-[10%] z-20 hidden sm:block">
        <div className="flex items-center gap-2 rounded-2xl border border-sky-100 bg-white/90 px-3 py-2 shadow-[0_10px_28px_-14px_rgba(14,116,209,0.35)] backdrop-blur">
          <span className="grid size-7 shrink-0 place-items-center rounded-xl bg-sky-50 text-sky-600">
            <Users className="size-3.5" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-[9.5px] font-semibold leading-tight text-slate-500">Live Calls</p>
            <p className="text-[10.5px] font-bold leading-tight text-slate-800">24 active</p>
          </div>
        </div>
      </motion.div>
      <motion.div style={{ y: cardsY }} className="absolute bottom-[8%] right-[3%] z-20 hidden md:block">
        <div className="flex items-center gap-2 rounded-2xl border border-sky-100 bg-white/90 px-3 py-2 shadow-[0_10px_28px_-14px_rgba(14,116,209,0.35)] backdrop-blur">
          <span className="grid size-7 shrink-0 place-items-center rounded-xl bg-sky-50 text-sky-600">
            <Signal className="size-3.5" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-[9.5px] font-semibold leading-tight text-slate-500">Connection</p>
            <p className="text-[10.5px] font-bold leading-tight text-slate-800">Stable</p>
          </div>
        </div>
      </motion.div>

      <motion.div style={{ y: centerY, scale: centerScale }} className="relative z-10 flex flex-col items-center">
        <SceneBadge>AI Voice Orbit</SceneBadge>

        <div className="relative mt-7 size-[220px] sm:size-[250px]">
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-full bg-sky-400/35 blur-2xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="absolute inset-[6%]">
            <motion.div className="size-full rounded-full border border-sky-200/80" animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} />
          </div>
          <div className="absolute inset-[16%]">
            <motion.div className="size-full rounded-full border border-dashed border-sky-300/70" animate={{ rotate: -360 }} transition={{ duration: 17, repeat: Infinity, ease: "linear" }} />
          </div>

          <svg aria-hidden className="absolute inset-[6%] size-[88%]" viewBox="0 0 100 100">
            {[0, 1].map((i) => (
              <circle key={i} r="1.8" fill="#0ea5e9">
                <animateMotion dur={`${4 + i * 1.4}s`} begin={`${i * 1.6}s`} repeatCount="indefinite" path="M50,2 A48,48 0 1,1 49.9,2 Z" />
              </circle>
            ))}
          </svg>

          {ORBIT_NODES.map(({ deg, speed, Icon }, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 size-[190px] -translate-x-1/2 -translate-y-1/2"
              initial={{ rotate: deg }}
              animate={{ rotate: deg + 360 }}
              transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                initial={{ rotate: -deg }}
                animate={{ rotate: -(deg + 360) }}
                transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
              >
                <span className="grid size-8 place-items-center rounded-full bg-white text-sky-600 shadow-[0_10px_20px_-10px_rgba(14,116,209,0.5)] ring-1 ring-sky-100 sm:size-9">
                  <Icon className="size-3.5 sm:size-4" aria-hidden />
                </span>
              </motion.div>
            </motion.div>
          ))}

          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[32%] grid place-items-center rounded-full shadow-[0_30px_60px_-18px_rgba(2,132,199,0.65)]"
            style={{ background: "radial-gradient(circle at 34% 28%, #bae6fd, #0ea5e9 55%, #1d4ed8 100%)" }}
          >
            <span aria-hidden className="absolute inset-0 rounded-full bg-sky-400/30 motion-safe:animate-ping" />
            <Headphones className="relative size-6 text-white sm:size-7" aria-hidden />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const FLOW_STAGES: { label: string; Icon: LucideIcon }[] = [
  { label: "Customer", Icon: User },
  { label: "AI Agent", Icon: Headphones },
  { label: "Routing", Icon: Signal },
  { label: "Resolved", Icon: CheckCircle2 },
]

// Concept 2 — "Live Call Flow": a curved path connecting Customer → AI
// Agent → Routing → Resolved, with a signal continuously travelling the
// full path and each stage lighting up in turn as it "processes" — a
// left-to-right narrative composition, structurally nothing like the
// radial orbit or the floating card stack.
function FlowScene({ centerY, centerScale, active }: SceneLayerProps) {
  const [liveStage, setLiveStage] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setLiveStage((s) => (s + 1) % FLOW_STAGES.length), 900)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      animate={active ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 24, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div style={{ y: centerY, scale: centerScale }} className="relative z-10 w-[250px] sm:w-[300px]">
        <div className="flex justify-center">
          <SceneBadge>Live Call Flow</SceneBadge>
        </div>

        <div className="relative mt-8">
          <svg aria-hidden className="absolute inset-x-0 top-[19px] h-6 w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M6,10 C 30,-2 40,22 50,10 C 60,-2 70,22 94,10" fill="none" stroke="#bae6fd" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
            <circle r="1.8" fill="#0ea5e9">
              <animateMotion dur="3.2s" repeatCount="indefinite" path="M6,10 C 30,-2 40,22 50,10 C 60,-2 70,22 94,10" />
            </circle>
          </svg>

          <div className="relative flex items-start justify-between">
            {FLOW_STAGES.map(({ label, Icon }, i) => {
              const isLive = i === liveStage
              return (
                <div key={label} className="relative z-10 flex flex-col items-center gap-2" style={{ width: "25%" }}>
                  <motion.span
                    animate={{ scale: isLive ? 1.15 : 1 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative grid size-9 place-items-center rounded-full shadow-sm ring-1 transition-colors duration-300 sm:size-10 ${
                      isLive ? "bg-gradient-to-br from-blue-600 to-sky-500 text-white ring-sky-200" : "bg-white text-sky-600 ring-sky-100"
                    }`}
                  >
                    {isLive && <span aria-hidden className="absolute inset-0 rounded-full bg-sky-400/40 motion-safe:animate-ping" />}
                    <Icon className="relative size-4" aria-hidden />
                  </motion.span>
                  <span className={`text-[8.5px] font-semibold sm:text-[9.5px] ${isLive ? "text-sky-700" : "text-slate-500"}`}>{label}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-[3px]">
          {[8, 14, 10, 18, 11, 16, 9, 13].map((h, i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-gradient-to-t from-sky-300 to-blue-600"
              animate={{ height: [h * 0.35, h, h * 0.35] }}
              transition={{ duration: 1.1 + (i % 3) * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.06 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

type CommandCard = { label: string; value: string; Icon: LucideIcon; className: string; delay: number; float: number; rotate: number }

const COMMAND_DATA: CommandCard[] = [
  { label: "Live Calls", value: "24", Icon: Users, className: "left-[2%] top-[6%] z-20 w-[108px]", delay: 0, float: 4.5, rotate: -4 },
  { label: "AI Agents Active", value: "8", Icon: Headphones, className: "right-[0%] top-[2%] z-30 w-[118px]", delay: 0.15, float: 5, rotate: 3 },
  { label: "Call Queue", value: "5", Icon: PhoneCall, className: "left-[8%] bottom-[10%] z-10 w-[100px]", delay: 0.3, float: 5.5, rotate: 5 },
  { label: "Resolution Rate", value: "92%", Icon: TrendingUp, className: "right-[4%] bottom-[4%] z-30 w-[126px]", delay: 0.45, float: 4.8, rotate: -3 },
]

// Concept 3 — "AI Command Center": several translucent glass cards of
// different sizes floating at different depths/rotations/speeds around a
// central waveform core, with a soft light sweep crossing one card — an
// overlapping, layered-depth composition, deliberately not a grid or list.
function CommandScene({ centerScale, active }: SceneLayerProps) {
  return (
    <motion.div
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="absolute top-[6%] left-1/2 z-40 -translate-x-1/2">
        <SceneBadge>AI Command Center</SceneBadge>
      </div>

      <div className="relative h-[240px] w-[280px] sm:h-[260px] sm:w-[320px]">
        {COMMAND_DATA.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: c.delay, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute ${c.className}`}
          >
            <motion.div
              animate={{ y: [0, -7, 0], rotate: [c.rotate, c.rotate * -1, c.rotate] }}
              transition={{ duration: c.float, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/75 p-3 shadow-[0_20px_45px_-20px_rgba(14,116,209,0.45)] backdrop-blur-md"
            >
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                animate={{ x: ["-120%", "220%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: i * 0.8 }}
              />
              <span className="relative grid size-7 place-items-center rounded-lg bg-sky-50 text-sky-600">
                <c.Icon className="size-3.5" aria-hidden />
              </span>
              <p className="relative mt-1.5 truncate text-[8.5px] font-semibold text-slate-500">{c.label}</p>
              <p className="relative text-[13px] font-extrabold text-slate-900">{c.value}</p>
            </motion.div>
          </motion.div>
        ))}

        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 z-0 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full shadow-[0_25px_55px_-16px_rgba(2,132,199,0.6)] sm:size-[72px]"
          style={{ background: "radial-gradient(circle at 34% 28%, #bae6fd, #0ea5e9 55%, #1d4ed8 100%)" }}
        >
          <div className="flex items-center gap-[2px]">
            {[6, 10, 7, 12, 8].map((h, i) => (
              <motion.span
                key={i}
                className="w-[2px] rounded-full bg-white/90"
                animate={{ height: [h * 0.4, h, h * 0.4] }}
                transition={{ duration: 1 + (i % 3) * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function BpoWallboard() {
  const scene = useSceneCycle(2000)

  // Scroll-linked parallax: as the hero scrolls out of view, layers drift
  // at different rates (background slowest, central composition fastest)
  // so it reads as having real depth — shared across every scene.
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] })
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 40])
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const centerY = useTransform(scrollYProgress, [0, 1], [0, 110])
  const centerRotate = useTransform(scrollYProgress, [0, 1], [0, -3])
  const centerScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  const baseProps = { cardsY, centerY, centerRotate, centerScale }

  return (
    <div ref={containerRef} className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* Background layer — slow drift, furthest back, constant across every scene */}
      <motion.div
        aria-hidden
        style={{ y: glowY }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(14,165,233,0.18),transparent)] blur-2xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Organic atmospheric shape — a single soft, continuously reshaping
          blob (sky-blue only), constant backdrop across every scene. */}
      <span
        aria-hidden
        className="voice-blob-morph pointer-events-none absolute -left-6 bottom-0 -z-10 size-64 bg-gradient-to-br from-sky-200/40 to-blue-100/30 blur-3xl"
      />

      {/* Ambient voice-signal particles drifting in open space — only the
          first two render on mobile, keeping the composition lighter there. */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          aria-hidden
          style={{ top: p.top, left: p.left, animationDelay: `${p.delay}s` }}
          className={`voice-particle-rise pointer-events-none absolute z-0 size-1.5 rounded-full bg-sky-400/70 ${i >= 2 ? "hidden sm:block" : ""}`}
        />
      ))}

      {/* The composition itself keeps changing — a new design and a new
          transform-in animation every rotation, not just new content inside
          the same layout. All three stay mounted; only `active` (and the
          opacity/transform it drives) changes, so the rotation never
          depends on any exit-animation completing first. */}
      <CallScene {...baseProps} active={scene === "call"} />
      <OrbitScene {...baseProps} active={scene === "orbit"} />
      <FlowScene {...baseProps} active={scene === "flow"} />
      <CommandScene {...baseProps} active={scene === "command"} />
    </div>
  )
}
