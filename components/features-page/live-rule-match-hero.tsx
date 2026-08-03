"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { MessageSquareText, Clock3, ShieldQuestion, Wallet, ShoppingBag, Voicemail, Check } from "lucide-react"

const CYCLE_MS = 3000

const switches = [
  { icon: MessageSquareText, label: "Keyword", detail: "“refund” heard", destIcon: Wallet, dest: "Billing Agent", tone: "#D97706", x: 15 },
  { icon: ShieldQuestion, label: "Intent", detail: "Sales inquiry", destIcon: ShoppingBag, dest: "Sales Agent", tone: "#2563EB", x: 50 },
  { icon: Clock3, label: "Time of day", detail: "After 7 PM", destIcon: Voicemail, dest: "Voicemail", tone: "#7C3AED", x: 85 },
]

export function LiveRuleMatchHero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % switches.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  const current = switches[active]
  const DestIcon = current.destIcon

  return (
    <div className="relative mx-auto flex w-full max-w-[460px] flex-col justify-center py-6" style={{ minHeight: 460 }}>
      {/* ambient glow, tinted to whichever rule is currently active */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{ backgroundColor: `${current.tone}20` }}
        style={{ filter: "blur(100px)" }}
        transition={{ duration: 0.6 }}
      />

      {/* the switchboard — 3 physical toggles, one per rule type */}
      <div className="relative grid grid-cols-3 gap-3">
        {switches.map((sw, i) => {
          const Icon = sw.icon
          const isOn = i === active
          return (
            <div key={sw.label} className="flex flex-col items-center gap-3">
              <motion.span
                animate={{ scale: isOn ? [1, 1.35, 1] : 1, rotate: isOn ? [0, -8, 8, 0] : 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Icon className="size-5" style={{ color: isOn ? sw.tone : "#94A3B8" }} aria-hidden />
              </motion.span>
              {/* rocker switch track */}
              <motion.div
                className="relative h-10 w-20 rounded-full"
                animate={{
                  background: isOn
                    ? `linear-gradient(180deg, ${sw.tone}, ${sw.tone}CC)`
                    : "linear-gradient(180deg, #EEF1F8, #E3E8F3)",
                  boxShadow: isOn
                    ? `inset 0 1.5px 3px rgba(0,0,0,0.15), inset 0 -1px 1px rgba(255,255,255,0.25), 0 0 0 5px ${sw.tone}22, 0 10px 22px -8px ${sw.tone}90`
                    : "inset 0 1.5px 3px rgba(15,23,42,0.1), inset 0 -1px 1px rgba(255,255,255,0.6), 0 2px 6px -3px rgba(15,23,42,0.15)",
                }}
                transition={{ duration: 0.35 }}
              >
                {/* flip spark burst */}
                {isOn && (
                  <motion.span
                    key={`spark-${sw.label}`}
                    aria-hidden
                    className="absolute inset-0"
                    initial="hidden"
                    animate="show"
                  >
                    {[0, 1, 2, 3].map((p) => (
                      <motion.span
                        key={p}
                        className="absolute right-1 top-1/2 size-1 -translate-y-1/2 rounded-full"
                        style={{ backgroundColor: sw.tone }}
                        initial={{ opacity: 0.9, x: 0, y: 0 }}
                        animate={{
                          opacity: 0,
                          x: Math.cos((p / 4) * Math.PI * 2) * 18,
                          y: Math.sin((p / 4) * Math.PI * 2) * 18,
                        }}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                      />
                    ))}
                  </motion.span>
                )}
                <motion.span
                  className="absolute top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full"
                  animate={{
                    left: isOn ? "calc(100% - 34px)" : "2px",
                    background: isOn
                      ? "radial-gradient(circle at 32% 28%, #FFFFFF, #F4F6FB 55%, #E4E9F3)"
                      : "radial-gradient(circle at 32% 28%, #FFFFFF, #E7ECF5 60%, #CBD5E1)",
                    scale: isOn ? [1, 1.22, 1] : 1,
                  }}
                  style={{ boxShadow: "0 2px 5px rgba(15,23,42,0.28), inset 0 -1px 1px rgba(15,23,42,0.08)" }}
                  transition={{
                    left: { type: "spring", stiffness: 320, damping: 20 },
                    background: { duration: 0.3 },
                    scale: { duration: 0.4, ease: "easeOut" },
                  }}
                >
                  {isOn && (
                    <>
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full"
                        style={{ border: `1.5px solid ${sw.tone}` }}
                        animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                      />
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full"
                        style={{ border: `1.5px solid ${sw.tone}` }}
                        animate={{ scale: [1, 2.1], opacity: [0.4, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
                      />
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.15, type: "spring", stiffness: 340, damping: 18 }}
                      >
                        <Check className="size-4" style={{ color: sw.tone }} aria-hidden />
                      </motion.span>
                    </>
                  )}
                </motion.span>
              </motion.div>
              <motion.span
                className="text-xs font-semibold"
                animate={{ color: isOn ? sw.tone : "#94A3B8" }}
                transition={{ duration: 0.3 }}
              >
                {sw.label}
              </motion.span>
            </div>
          )
        })}
      </div>

      {/* right-angled circuit traces running from each switch down to the shared output lamp */}
      <svg viewBox="0 0 100 140" preserveAspectRatio="none" className="h-36 w-full overflow-visible" aria-hidden>
        <defs>
          <filter id="lrm-wire-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
        </defs>
        {switches.map((sw, i) => {
          const isOn = i === active
          const d = `M${sw.x} 0 L${sw.x} 70 L50 70 L50 140`
          return (
            <g key={sw.label}>
              {isOn && (
                <motion.path
                  d={d}
                  fill="none"
                  stroke={sw.tone}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#lrm-wire-glow)"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: [0.25, 0.55, 0.25] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <motion.path
                d={d}
                fill="none"
                stroke={isOn ? sw.tone : "#DCE3F5"}
                strokeWidth={isOn ? 2 : 1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={isOn ? "5 4" : undefined}
                initial={false}
                animate={isOn ? { opacity: 1, strokeDashoffset: [0, -18] } : { opacity: 0.5 }}
                transition={
                  isOn
                    ? { opacity: { duration: 0.35 }, strokeDashoffset: { duration: 0.7, repeat: Infinity, ease: "linear" } }
                    : { duration: 0.35 }
                }
              />
              {/* bend node */}
              <motion.circle
                cx={sw.x}
                cy={70}
                r={isOn ? 2.2 : 1.4}
                fill={isOn ? sw.tone : "#DCE3F5"}
                initial={false}
                animate={{ opacity: isOn ? 1 : 0.6 }}
                transition={{ duration: 0.35 }}
              />
            </g>
          )
        })}
        {/* current pulse traveling into the lamp on every switch */}
        <motion.circle
          key={active}
          r="2.6"
          fill={current.tone}
          style={{ offsetPath: `path('M${current.x} 0 L${current.x} 70 L50 70 L50 140')`, filter: `drop-shadow(0 0 4px ${current.tone})` }}
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />
      </svg>

      {/* the output lamp, lit with whichever rule is currently active */}
      <div className="relative flex flex-col items-center">
        {/* rotating halo ring for depth */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -top-4 left-1/2 size-28 -translate-x-1/2 rounded-full"
          animate={{
            background: `conic-gradient(from 0deg, ${current.tone}00, ${current.tone}55, ${current.tone}00)`,
            rotate: 360,
          }}
          transition={{ background: { duration: 0.5 }, rotate: { duration: 6, repeat: Infinity, ease: "linear" } }}
        />
        <motion.span
          className="relative flex size-20 items-center justify-center rounded-full text-white"
          animate={{
            background: `linear-gradient(135deg, ${current.tone}, ${current.tone}CC)`,
            boxShadow: `0 0 0 10px ${current.tone}1A, 0 20px 40px -14px ${current.tone}80`,
            scale: [1, 1.12, 1],
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.span
            key={`ring1-${active}`}
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ border: `1.5px solid ${current.tone}` }}
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
          <motion.span
            key={`ring2-${active}`}
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ border: `1.5px solid ${current.tone}` }}
            animate={{ scale: [1, 2.1], opacity: [0.4, 0] }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          />
          <motion.span
            key={`icon-${active}`}
            initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15, type: "spring", stiffness: 260, damping: 16 }}
          >
            <DestIcon className="size-8" aria-hidden />
          </motion.span>
        </motion.span>

        <motion.p
          key={`label-${active}`}
          className="mt-4 text-lg font-bold"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0, color: current.tone }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          {current.dest}
        </motion.p>
        <motion.p
          key={`detail-${active}`}
          className="mt-1 text-sm"
          style={{ color: "#94A3B8" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Matched: {current.detail}
        </motion.p>
      </div>
    </div>
  )
}
