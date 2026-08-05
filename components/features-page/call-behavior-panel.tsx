"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { MessageSquareText, Repeat, PhoneForwarded, Sparkles, ShieldCheck, Car, Stethoscope, Home, PhoneCall, Activity } from "lucide-react"

const CYCLE_MS = 3600

const profiles = [
  {
    agent: "Aarav Motors Agent",
    avatar: Car,
    rows: [
      { icon: MessageSquareText, label: "Greeting", value: "Custom", tone: "#2563EB" },
      { icon: Repeat, label: "Interruptions", value: "Allowed", tone: "#7C3AED" },
      { icon: PhoneForwarded, label: "Handoff", value: "2 attempts", tone: "#D97706" },
    ],
  },
  {
    agent: "Priya Dental Care",
    avatar: Stethoscope,
    rows: [
      { icon: MessageSquareText, label: "Greeting", value: "Custom", tone: "#2563EB" },
      { icon: Repeat, label: "Interruptions", value: "Turn-based", tone: "#7C3AED" },
      { icon: PhoneForwarded, label: "Handoff", value: "VIP callers", tone: "#D97706" },
    ],
  },
  {
    agent: "Sharma Real Estate",
    avatar: Home,
    rows: [
      { icon: MessageSquareText, label: "Greeting", value: "Custom", tone: "#2563EB" },
      { icon: Repeat, label: "Interruptions", value: "Allowed", tone: "#7C3AED" },
      { icon: PhoneForwarded, label: "Handoff", value: "3 attempts", tone: "#D97706" },
    ],
  },
]

function FloatingBadge({
  icon: Icon,
  className,
  delay = 0,
  tone = "#2563EB",
}: {
  icon: typeof Sparkles
  className: string
  delay?: number
  tone?: string
}) {
  return (
    <motion.span
      aria-hidden
      className={`absolute z-20 hidden size-12 items-center justify-center rounded-full sm:flex ${className}`}
      style={{
        background: `linear-gradient(135deg, ${tone}14, #FFFFFF 60%)`,
        border: `1.5px solid ${tone}33`,
        boxShadow: `0 14px 30px -12px ${tone}66, inset 0 1px 0 rgba(255,255,255,0.8)`,
      }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <span className="flex size-7 items-center justify-center rounded-full" style={{ backgroundColor: tone }}>
        <Icon className="size-3.5 text-white" aria-hidden />
      </span>
    </motion.span>
  )
}

export function CallBehaviorPanel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % profiles.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  const profile = profiles[index]

  return (
    <div className="relative mx-auto flex w-full max-w-[520px] items-center justify-center py-4" style={{ perspective: "1400px" }}>
      {/* dot-grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage: "radial-gradient(rgba(37,99,235,0.18) 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse at center, black 35%, transparent 75%)",
        }}
      />
      {/* ambient glow beneath the stack */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:size-[420px]"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.28), transparent 70%)" }}
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* secondary violet glow, offset */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-10 size-56 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%)" }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      {/* grounding shadow — cast behind the whole stack */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-6 left-1/2 h-14 w-[78%] -translate-x-1/2 rounded-full blur-2xl"
        style={{ backgroundColor: "rgba(15,23,42,0.4)" }}
        animate={{ opacity: [0.7, 0.9, 0.7], scaleX: [1, 1.05, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* soft shadow peeking above the stack, mirroring the one below */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-8 h-10 w-[55%] -translate-x-1/2 rounded-full blur-2xl"
        style={{ backgroundColor: "rgba(15,23,42,0.18)" }}
      />

      <FloatingBadge icon={Sparkles} className="left-4 top-4" delay={0} tone="#7C3AED" />
      <FloatingBadge icon={PhoneCall} className="right-4 top-4" delay={0.7} tone="#2563EB" />
      <FloatingBadge icon={Activity} className="left-4 bottom-4" delay={2.1} tone="#D97706" />
      <FloatingBadge icon={ShieldCheck} className="right-4 bottom-4" delay={1.4} tone="#22C55E" />

      {/* rotating conic aura behind the whole stack */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-md sm:size-[360px]"
        style={{ background: "conic-gradient(from 0deg, #2563EB, #7C3AED, #22C55E, #2563EB)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: [-12, 12, -12], rotateX: [5, -4, 5], scale: [1, 1.02, 1] }}
        transition={{ rotateY: { duration: 9, repeat: Infinity, ease: "easeInOut" }, rotateX: { duration: 9, repeat: Infinity, ease: "easeInOut" }, scale: { duration: CYCLE_MS / 1000, repeat: Infinity, ease: "easeInOut" } }}
      >
        {/* back layer — furthest depth, styled like a card, not a flat block */}
        <div
          className="absolute inset-0 translate-x-7 translate-y-9 overflow-hidden rounded-[28px] bg-white p-6"
          style={{ border: "1px solid #E4ECFF", transform: "translateZ(-100px) scale(0.94)", boxShadow: "0 20px 40px -20px rgba(15,23,42,0.35)" }}
        >
          <span className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: "#0F172A" }} aria-hidden />
          <div className="h-3 w-24 rounded-full" style={{ backgroundColor: "#E4ECFF" }} />
          <div className="mt-5 flex flex-col gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-11 rounded-2xl" style={{ backgroundColor: "#F1F5F9" }} />
            ))}
          </div>
        </div>
        {/* mid layer — offset behind, also card-shaped */}
        <div
          className="absolute inset-0 translate-x-3.5 translate-y-5 overflow-hidden rounded-[28px] bg-white p-6"
          style={{ border: "1px solid #E4ECFF", transform: "translateZ(-50px) scale(0.97)", boxShadow: "0 20px 40px -20px rgba(37,99,235,0.4)" }}
        >
          <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: "linear-gradient(90deg, #4F8DFF, #7C3AED)" }} aria-hidden />
          <div className="h-3 w-28 rounded-full" style={{ backgroundColor: "#EEF4FF" }} />
          <div className="mt-5 flex flex-col gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-11 rounded-2xl" style={{ backgroundColor: "#F7F9FC" }} />
            ))}
          </div>
        </div>

        {/* front layer — a brand new card swaps in each cycle, not the same card updating in place */}
        <div className="relative h-[360px] w-[85vw] max-w-[340px]" style={{ transformStyle: "preserve-3d" }}>
          {/* the previous card recedes back in 3D space and stays partly
              visible behind the incoming one, instead of just vanishing */}
          <AnimatePresence>
            <motion.div
              key={profile.agent}
              className="absolute inset-0 overflow-hidden rounded-[28px] bg-white p-6"
              style={{
                border: "1px solid #E4ECFF",
                boxShadow: "0 60px 100px -30px rgba(37,99,235,0.55), 0 4px 12px rgba(15,23,42,0.08)",
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, x: 70, z: -60, rotate: 5, scale: 0.9, zIndex: 20 }}
              animate={{ opacity: 1, x: 0, z: 0, rotate: 0, scale: 1, zIndex: 20 }}
              exit={{ opacity: 0.35, x: -40, z: -120, rotate: -8, scale: 0.8, zIndex: 5 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* top accent bar */}
              <span
                className="absolute inset-x-0 top-0 h-1.5"
                style={{ background: "linear-gradient(90deg, #4F8DFF, #7C3AED)" }}
                aria-hidden
              />
              {/* glossy diagonal highlight sweep */}
              <span
                aria-hidden
                className="pointer-events-none absolute -left-1/3 -top-1/3 size-[220%] rotate-12"
                style={{ background: "linear-gradient(120deg, rgba(255,255,255,0.6) 0%, transparent 30%)" }}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="flex size-9 shrink-0 items-center justify-center rounded-xl text-white"
                    style={{ background: "linear-gradient(135deg, #4F8DFF, #7C3AED)" }}
                  >
                    <profile.avatar className="size-4" aria-hidden />
                  </span>
                  <div>
                    <span className="flex items-center gap-1.5">
                      <span className="relative flex size-1.5">
                        <motion.span
                          className="absolute inline-flex size-full rounded-full bg-emerald-400"
                          animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                        />
                        <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#94A3B8" }}>Call behavior</p>
                    </span>
                    <p className="mt-0.5 text-lg font-bold" style={{ color: "#0F172A" }}>{profile.agent}</p>
                  </div>
                </div>
                <div className="flex gap-1" aria-hidden>
                  {profiles.map((p, i) => (
                    <span
                      key={p.agent}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{ width: i === index ? "16px" : "6px", backgroundColor: i === index ? "#2563EB" : "#E4ECFF" }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3">
                {profile.rows.map((r, i) => {
                  const Icon = r.icon
                  return (
                    <motion.div
                      key={r.label}
                      className="flex items-center gap-3 rounded-2xl p-3"
                      style={{
                        background: "linear-gradient(180deg, #FFFFFF, #F7F9FC)",
                        border: "1px solid #E4ECFF",
                        boxShadow: "0 12px 22px -14px rgba(15,23,42,0.28), inset 0 1px 0 rgba(255,255,255,0.7)",
                      }}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ y: -2, scale: 1.02 }}
                      transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                    >
                      <span
                        className="flex size-10 shrink-0 items-center justify-center rounded-xl text-white"
                        style={{ background: `linear-gradient(135deg, ${r.tone}, ${r.tone}CC)`, boxShadow: `0 10px 18px -6px ${r.tone}99` }}
                      >
                        <Icon className="size-4.5" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold" style={{ color: "#0F172A" }}>{r.label}</p>
                      </div>
                      <span
                        className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                        style={{ backgroundColor: `${r.tone}1A`, color: r.tone }}
                      >
                        {r.value}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
