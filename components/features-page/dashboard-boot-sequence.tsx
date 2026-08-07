"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Mail, Lock, Check, LayoutDashboard, PhoneCall, Clock, Bot, CalendarCheck } from "lucide-react"

const tiles = [
  { icon: PhoneCall, label: "Calls", tone: "#2563EB" },
  { icon: Clock, label: "Minutes", tone: "#7C3AED" },
  { icon: Bot, label: "Agents", tone: "#10B981" },
  { icon: CalendarCheck, label: "Bookings", tone: "#D97706" },
]

const CYCLE_MS = 3600

export function DashboardBootSequence() {
  const [emailTyped, setEmailTyped] = useState(false)
  const [passwordTyped, setPasswordTyped] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [loginDone, setLoginDone] = useState(false)
  const [tileCount, setTileCount] = useState(0)
  const [dashboardReady, setDashboardReady] = useState(false)

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = []

    function run() {
      setEmailTyped(false)
      setPasswordTyped(false)
      setVerifying(false)
      setLoginDone(false)
      setTileCount(0)
      setDashboardReady(false)

      timers.push(setTimeout(() => setEmailTyped(true), 250))
      timers.push(setTimeout(() => setPasswordTyped(true), 550))
      timers.push(setTimeout(() => setVerifying(true), 750))
      tiles.forEach((_, i) => {
        timers.push(setTimeout(() => setTileCount(i + 1), 300 + i * 200))
      })
      timers.push(setTimeout(() => setDashboardReady(true), 300 + tiles.length * 200 + 50))
      timers.push(setTimeout(() => setLoginDone(true), 1800))
      timers.push(setTimeout(run, CYCLE_MS))
    }

    run()
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div
      className="mx-auto mt-10 w-full max-w-4xl overflow-hidden rounded-[2rem] p-6 sm:p-8"
      style={{ border: "2px solid #93B4FD", backgroundColor: "#F8FAFF", boxShadow: "0 1px 2px rgba(15,23,42,0.03), inset 0 1px 0 rgba(255,255,255,0.6)" }}
    >
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
        {/* left: the login you're still completing */}
        <motion.div
          className="rounded-3xl border border-border/60 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: "#94A3B8" }}>Signing in</p>

          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: "#F7F9FC", border: "1px solid #E4ECFF" }}>
              <Mail className="size-5 shrink-0" style={{ color: "#94A3B8" }} aria-hidden />
              <div className="h-5 flex-1 overflow-hidden text-base" style={{ color: "#334155" }}>
                <motion.span
                  className="block whitespace-nowrap"
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: emailTyped ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  owner@business.in
                </motion.span>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: "#F7F9FC", border: "1px solid #E4ECFF" }}>
              <Lock className="size-5 shrink-0" style={{ color: "#94A3B8" }} aria-hidden />
              <div className="flex flex-1 gap-1.5">
                {[0, 1, 2, 3, 4, 5].map((d) => (
                  <motion.span
                    key={d}
                    className="size-2.5 rounded-full"
                    animate={{ backgroundColor: passwordTyped ? "#334155" : "#E4ECFF" }}
                    transition={{ duration: 0.2, delay: d * 0.05 }}
                  />
                ))}
              </div>
            </div>
          </div>

          <motion.div
            className="mt-4 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white"
            animate={{ backgroundColor: loginDone ? "#10B981" : "#2563EB" }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {loginDone ? (
                <motion.span key="done" className="flex items-center gap-2" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}>
                  <Check className="size-4" aria-hidden /> Signed in
                </motion.span>
              ) : verifying ? (
                <motion.span key="verifying" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <motion.span
                    className="size-4 rounded-full border-2 border-white/40 border-t-white"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                  />
                  Verifying…
                </motion.span>
              ) : (
                <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  Continue
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* right: the dashboard, already assembling itself in the background */}
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-border/60 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex h-6 items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: "#94A3B8" }}>Your dashboard</p>
            <motion.span
              animate={{ opacity: dashboardReady ? 1 : 0, scale: dashboardReady ? 1 : 0.7 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600"
            >
              <Check className="size-3" aria-hidden /> Ready
            </motion.span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {tiles.map((t, i) => {
              const Icon = t.icon
              const isReady = tileCount > i
              return (
                <div key={t.label} className="h-[74px] overflow-hidden rounded-xl p-3.5" style={{ backgroundColor: isReady ? `${t.tone}0F` : "#F1F5F9" }}>
                  <AnimatePresence mode="wait">
                    {isReady ? (
                      <motion.div key="ready" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                        <Icon className="size-5" style={{ color: t.tone }} aria-hidden />
                        <p className="mt-1.5 text-sm font-semibold" style={{ color: "#0F172A" }}>{t.label}</p>
                      </motion.div>
                    ) : (
                      <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2 py-1.5">
                        <motion.span
                          className="block h-4 w-4 rounded"
                          style={{ backgroundColor: "#E4ECFF" }}
                          animate={{ opacity: [0.4, 0.9, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <motion.span
                          className="block h-2.5 w-14 rounded"
                          style={{ backgroundColor: "#E4ECFF" }}
                          animate={{ opacity: [0.4, 0.9, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.1 }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* the payoff line the whole animation is building toward — this row's height is
          always reserved (not conditionally mounted), so the banner fading in/out never
          grows or shrinks the section and shifts the borders above/below it */}
      <div className="mt-6 flex h-16 items-center justify-center px-2 sm:h-11">
        <motion.div
          className="inline-flex max-w-xs items-center gap-2 rounded-full px-5 py-2.5 text-center text-sm font-semibold sm:max-w-none"
          style={{ backgroundColor: "#EEF2FF", color: "#2563EB" }}
          animate={{ opacity: dashboardReady && !loginDone ? 1 : 0, y: dashboardReady && !loginDone ? 0 : 8 }}
          transition={{ duration: 0.3 }}
        >
          <LayoutDashboard className="size-4" aria-hidden />
          Your dashboard finished loading before your login even did
        </motion.div>
      </div>
    </div>
  )
}
