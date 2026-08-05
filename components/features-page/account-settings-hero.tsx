"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { CreditCard, Users, ShieldCheck, Signal, Wifi, BatteryFull, Check } from "lucide-react"

const CYCLE_MS = 2600

const settings = [
  { icon: CreditCard, label: "Autopay billing", sub: "₹4,200 due this cycle", tone: "#2563EB" },
  { icon: Users, label: "Team access", sub: "3 members can edit", tone: "#7C3AED" },
  { icon: ShieldCheck, label: "Two-factor auth", sub: "Extra login verification", tone: "#10B981" },
]

function Toggle({ on, tone }: { on: boolean; tone: string }) {
  return (
    <motion.span
      className="relative flex h-[22px] w-[38px] shrink-0 items-center rounded-full p-[3px]"
      animate={{ backgroundColor: on ? tone : "#D1D5DB" }}
      transition={{ duration: 0.3 }}
    >
      <motion.span
        className="size-4 rounded-full bg-white shadow-sm"
        animate={{ x: on ? 16 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </motion.span>
  )
}

export function AccountSettingsHero() {
  const [active, setActive] = useState(0)
  const [toasting, setToasting] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setActive((a) => (a + 1) % settings.length)
      setToasting(true)
      setTimeout(() => setToasting(false), 1300)
    }, CYCLE_MS)
    return () => clearInterval(id)
  }, [paused])

  return (
    <div
      className="relative mx-auto w-full max-w-[280px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{ backgroundColor: `${settings[active].tone}22` }}
        style={{ filter: "blur(90px)" }}
        transition={{ duration: 0.6 }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-3 left-1/2 h-6 w-[85%] -translate-x-1/2 rounded-full blur-xl"
        style={{ backgroundColor: "rgba(15,23,42,0.22)" }}
      />

      <motion.div
        className="relative mx-auto"
        style={{ width: 280, aspectRatio: "9 / 16" }}
        initial={{ opacity: 0, y: 30, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* side controls — flatter, Android-style: one long volume rocker, one power button */}
        <span className="absolute -right-[3px] top-[18%] h-16 w-[3px] rounded-r-sm bg-[#1C1C1E]" aria-hidden />
        <span className="absolute -right-[3px] top-[36%] h-9 w-[3px] rounded-r-sm bg-[#1C1C1E]" aria-hidden />

        {/* floating stat pills around the top of the phone — purely decorative,
            gently bobbing so the hero feels alive even when nothing is toggling */}
        {[
          { label: "2FA on", tone: "#10B981", side: "right" as const, top: "10%", drift: 0 },
          { label: "₹4,200 due", tone: "#2563EB", side: "right" as const, top: "27%", drift: 0.4 },
          { label: "3 members", tone: "#7C3AED", side: "left" as const, top: "16%", drift: 0.2 },
          { label: "Applies instantly", tone: "#D97706", side: "left" as const, top: "33%", drift: 0.6 },
          { label: "GST invoices", tone: "#0891B2", side: "right" as const, top: "82%", drift: 0.8 },
          { label: "Custom branding", tone: "#DB2777", side: "left" as const, top: "78%", drift: 1 },
        ].map((pill) => (
          <motion.div
            key={pill.label}
            className={`absolute z-40 hidden whitespace-nowrap rounded-full bg-white px-3 py-1.5 shadow-[0_12px_28px_-14px_rgba(15,23,42,0.35)] sm:block ${
              pill.side === "right" ? "left-full ml-3" : "right-full mr-3"
            }`}
            style={{ top: pill.top, border: `1.5px solid ${pill.tone}30` }}
            initial={{ opacity: 0, x: pill.side === "right" ? 16 : -16, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.4, delay: pill.drift * 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="flex items-center gap-1.5"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: pill.drift }}
            >
              <span className="size-1.5 rounded-full" style={{ backgroundColor: pill.tone }} />
              <span className="text-xs font-semibold" style={{ color: pill.tone }}>{pill.label}</span>
            </motion.div>
          </motion.div>
        ))}

        {/* physical frame — squarer corners, thinner bezel than the iPhone concept */}
        <div
          className="relative size-full overflow-hidden rounded-[26px] bg-[#1C1C1E] p-[2.5px]"
          style={{ boxShadow: "0 60px 100px -40px rgba(15,23,42,0.45), inset 0 0 0 1px rgba(255,255,255,0.05)" }}
        >
          <div className="relative size-full overflow-hidden rounded-[23px] bg-black p-[2px]">
            <div className="relative size-full overflow-hidden rounded-[21px] bg-white">
              {/* punch-hole front camera, top-center */}
              <div
                className="absolute left-1/2 top-[9px] z-30 size-[9px] -translate-x-1/2 rounded-full"
                style={{ background: "radial-gradient(circle at 35% 35%, #3b4a6b, #05070d 70%)", boxShadow: "0 0 0 3px #000" }}
                aria-hidden
              />

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20"
                style={{ background: "linear-gradient(115deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 18%, rgba(255,255,255,0) 82%, rgba(255,255,255,0.05) 100%)" }}
              />

              <div className="relative z-10 flex h-full flex-col">
                {/* status bar */}
                <div className="flex items-center justify-between px-5 pb-1 pt-4 text-[12px] font-semibold" style={{ color: "#0F172A" }}>
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <Signal className="size-3.5" aria-hidden strokeWidth={2.4} />
                    <Wifi className="size-3.5" aria-hidden strokeWidth={2.4} />
                    <BatteryFull className="size-4" aria-hidden strokeWidth={1.6} />
                  </div>
                </div>

                {/* Material-style app bar */}
                <div className="px-5 pb-3 pt-4">
                  <p className="text-[22px] font-bold tracking-tight" style={{ color: "#0F172A" }}>Settings</p>
                </div>

                {/* category pills — a sliding highlight tracks whichever setting is active */}
                <div className="relative flex gap-1.5 px-4 pb-3">
                  {settings.map((s, i) => {
                    const isActive = i === active
                    return (
                      <button
                        key={s.label}
                        onClick={() => setActive(i)}
                        className="relative rounded-full px-2.5 py-1 text-[11px] font-semibold"
                        style={{ color: isActive ? "white" : "#667085" }}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="settings-pill-highlight"
                            className="absolute inset-0 rounded-full"
                            style={{ backgroundColor: s.tone }}
                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                          />
                        )}
                        <span className="relative z-10">{s.label.split(" ")[0]}</span>
                      </button>
                    )
                  })}
                </div>

                {/* setting cards, each with its own toggle */}
                <div className="flex-1 space-y-2.5 px-4 pb-4">
                  {settings.map((s, i) => {
                    const Icon = s.icon
                    const isActive = i === active
                    return (
                      <motion.div
                        key={s.label}
                        className="relative flex items-center gap-3 rounded-2xl p-3"
                        animate={{
                          backgroundColor: isActive ? `${s.tone}10` : "#F7F8FA",
                          boxShadow: isActive ? `0 0 0 1.5px ${s.tone}40` : "0 0 0 0px transparent",
                        }}
                        transition={{ duration: 0.35 }}
                      >
                        <span className="relative flex size-9 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${s.tone}18` }}>
                          {isActive && (
                            <motion.span
                              className="absolute inset-0 rounded-xl"
                              style={{ border: `1.5px solid ${s.tone}` }}
                              initial={{ opacity: 0.6, scale: 1 }}
                              animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.35, 1] }}
                              transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                              aria-hidden
                            />
                          )}
                          <motion.span
                            animate={isActive ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                            transition={{ duration: 0.4 }}
                          >
                            <Icon className="size-4" style={{ color: s.tone }} aria-hidden />
                          </motion.span>
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[13px] font-semibold" style={{ color: "#0F172A" }}>{s.label}</p>
                          <p className="truncate text-[11px]" style={{ color: "#8A8F98" }}>{s.sub}</p>
                        </div>
                        <Toggle on={isActive} tone={s.tone} />
                      </motion.div>
                    )
                  })}
                </div>

                {/* instant-save toast */}
                <div className="relative h-0 px-4">
                  <AnimatePresence>
                    {toasting && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.9 }}
                        animate={{ opacity: 1, y: -56, scale: 1 }}
                        exit={{ opacity: 0, y: -48, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 420, damping: 24 }}
                        className="absolute inset-x-4 flex items-center gap-1.5 rounded-xl px-3 py-2 text-white shadow-lg"
                        style={{ backgroundColor: "#0F172A" }}
                      >
                        <motion.span
                          initial={{ scale: 0, rotate: -30 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.1, type: "spring", stiffness: 500, damping: 20 }}
                        >
                          <Check className="size-3.5 text-emerald-400" aria-hidden />
                        </motion.span>
                        <span className="text-[12px] font-medium">Saved instantly</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Android gesture bar */}
                <div className="flex justify-center pb-2.5 pt-3">
                  <div className="h-1 w-28 rounded-full" style={{ backgroundColor: "#0F172A" }} aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-5 flex justify-center gap-1.5" aria-hidden>
        {settings.map((s, i) => (
          <span
            key={s.label}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{ width: i === active ? "18px" : "6px", backgroundColor: i === active ? s.tone : "#E4ECFF" }}
          />
        ))}
      </div>
    </div>
  )
}
