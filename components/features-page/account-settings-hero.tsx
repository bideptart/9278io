"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { CreditCard, Users, ShieldCheck, ChevronRight, Wifi, BatteryFull } from "lucide-react"

const CYCLE_MS = 2800

const categories = [
  { icon: CreditCard, label: "Billing", value: "₹4,200 due", tone: "#2563EB" },
  { icon: Users, label: "Team", value: "3 members", tone: "#7C3AED" },
  { icon: ShieldCheck, label: "Security", value: "2FA on", tone: "#10B981" },
]

function SignalBars({ color = "#0F172A" }: { color?: string }) {
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden>
      <rect x="0" y="7" width="3" height="4" rx="0.8" fill={color} />
      <rect x="4.4" y="5" width="3" height="6" rx="0.8" fill={color} />
      <rect x="8.8" y="2.5" width="3" height="8.5" rx="0.8" fill={color} />
      <rect x="13.2" y="0" width="3" height="11" rx="0.8" fill={color} />
    </svg>
  )
}

export function AccountSettingsHero() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % categories.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [paused])

  const current = categories[active]

  return (
    <div
      className="relative mx-auto w-full max-w-[280px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{ backgroundColor: `${current.tone}22` }}
        style={{ filter: "blur(90px)" }}
        transition={{ duration: 0.6 }}
      />

      {/* ground shadow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-3 left-1/2 h-6 w-[85%] -translate-x-1/2 rounded-full blur-xl"
        style={{ backgroundColor: "rgba(15,23,42,0.22)" }}
      />

      <motion.div
        className="relative mx-auto"
        style={{ width: 280, aspectRatio: "9 / 15" }}
        initial={{ opacity: 0, y: 30, rotate: 2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* side buttons */}
        <span className="absolute -left-[3px] top-[22%] h-6 w-[3px] rounded-l-sm bg-[#0B1120]" aria-hidden />
        <span className="absolute -left-[3px] top-[30%] h-10 w-[3px] rounded-l-sm bg-[#0B1120]" aria-hidden />
        <span className="absolute -left-[3px] top-[41%] h-10 w-[3px] rounded-l-sm bg-[#0B1120]" aria-hidden />
        <span className="absolute -right-[3px] top-[26%] h-14 w-[3px] rounded-r-sm bg-[#0B1120]" aria-hidden />

        {/* the physical frame */}
        <div
          className="relative size-full overflow-hidden rounded-[38px] bg-[#0B1120] p-[3px]"
          style={{ boxShadow: "0 60px 100px -40px rgba(15,23,42,0.45), inset 0 0 0 1px rgba(255,255,255,0.06)" }}
        >
          {/* bezel */}
          <div className="relative size-full overflow-hidden rounded-[35px] bg-black p-[9px]">
            {/* screen */}
            <div className="relative size-full overflow-hidden rounded-[27px] bg-white">
              {/* dynamic island, with the front camera lens visible inside it */}
              <div className="absolute left-1/2 top-2.5 z-30 flex h-[18px] w-[58px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-1.5" aria-hidden>
                <span
                  className="size-2 rounded-full"
                  style={{ background: "radial-gradient(circle at 35% 35%, #3b4a6b, #05070d 70%)", boxShadow: "0 0 0 1px rgba(255,255,255,0.06)" }}
                />
              </div>

              {/* screen glare */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20"
                style={{ background: "linear-gradient(115deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 18%, rgba(255,255,255,0) 82%, rgba(255,255,255,0.06) 100%)" }}
              />

              <div className="relative z-10 flex h-full flex-col">
                {/* status bar — extra top padding so it clears the dynamic island above it */}
                <div className="relative flex items-center px-6 pb-1 pt-9 text-[13px] font-semibold" style={{ color: "#0F172A" }}>
                  <span>9:41</span>
                  {/* icons sit right next to the island instead of pinned to the screen edge */}
                  <div className="absolute top-9 flex items-center gap-1.5" style={{ left: "calc(50% + 33px)" }}>
                    <SignalBars />
                    <Wifi className="size-3.5" aria-hidden strokeWidth={2.4} />
                    <BatteryFull className="size-4" aria-hidden strokeWidth={1.6} />
                  </div>
                </div>

                {/* app screen */}
                <div className="flex-1 overflow-hidden px-4 pb-5 pt-1">
                  <p className="text-[26px] font-extrabold tracking-tight" style={{ color: "#0F172A" }}>Settings</p>

                  {/* grouped list, iOS-style, with dividers instead of gaps */}
                  <div className="mt-4 overflow-hidden rounded-2xl" style={{ backgroundColor: "#F2F2F7" }}>
                    {categories.map((c, i) => {
                      const Icon = c.icon
                      const isActive = i === active
                      return (
                        <motion.button
                          key={c.label}
                          onClick={() => setActive(i)}
                          className="relative flex w-full items-center gap-3 px-3.5 py-3 text-left"
                          animate={{ backgroundColor: isActive ? `${c.tone}12` : "rgba(0,0,0,0)" }}
                          transition={{ duration: 0.3 }}
                        >
                          {i > 0 && (
                            <span
                              aria-hidden
                              className="absolute inset-x-3.5 top-0 h-px"
                              style={{ backgroundColor: "rgba(60,60,67,0.16)" }}
                            />
                          )}
                          <motion.span
                            className="flex size-7 shrink-0 items-center justify-center rounded-lg"
                            animate={{ backgroundColor: c.tone }}
                            transition={{ duration: 0.3 }}
                          >
                            <Icon className="size-4 text-white" aria-hidden />
                          </motion.span>
                          <span className="min-w-0 flex-1 truncate whitespace-nowrap text-[15px] font-medium" style={{ color: "#0F172A" }}>
                            {c.label}
                          </span>
                          <motion.span
                            className={`shrink-0 whitespace-nowrap text-[14px] ${isActive ? "font-semibold" : "font-normal"}`}
                            animate={{ color: isActive ? c.tone : "#8E8E93" }}
                            transition={{ duration: 0.3 }}
                          >
                            {c.value}
                          </motion.span>
                          <ChevronRight className="size-3.5 shrink-0" style={{ color: "#C7C7CC" }} aria-hidden />
                        </motion.button>
                      )
                    })}
                  </div>

                  {/* live preview card for the active category */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.label}
                      className="mt-4 rounded-2xl p-3.5"
                      style={{ backgroundColor: "#F2F2F7" }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: "#8E8E93" }}>
                        {current.label} details
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <motion.span
                          className="flex size-7 items-center justify-center rounded-full text-white"
                          animate={{ backgroundColor: current.tone }}
                          transition={{ duration: 0.3 }}
                        >
                          <current.icon className="size-3.5" aria-hidden />
                        </motion.span>
                        <p className="text-sm font-bold" style={{ color: "#0F172A" }}>{current.value}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* home indicator */}
                <div className="flex justify-center pb-2 pt-1">
                  <div className="h-1 w-32 rounded-full" style={{ backgroundColor: "#0F172A" }} aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-5 flex justify-center gap-1.5" aria-hidden>
        {categories.map((c, i) => (
          <span
            key={c.label}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{ width: i === active ? "18px" : "6px", backgroundColor: i === active ? current.tone : "#E4ECFF" }}
          />
        ))}
      </div>
    </div>
  )
}
