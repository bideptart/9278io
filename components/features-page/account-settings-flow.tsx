"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Pencil, LayoutDashboard, Smartphone, Users, Receipt, Sparkles } from "lucide-react"

const STEPS = [
  { label: "Change made", detail: "9 AM – 9 PM", time: "0.0s", status: "You update a setting", icon: Pencil, tone: "#0F172A" },
  { label: "Dashboard", detail: "Overview updated", time: "0.2s", status: "Pushing to your dashboard…", icon: LayoutDashboard, tone: "#2563EB" },
  { label: "Mobile app", detail: "Every device", time: "0.4s", status: "Syncing to the mobile app…", icon: Smartphone, tone: "#7C3AED" },
  { label: "Team members", detail: "Everyone with access", time: "0.6s", status: "Notifying your team…", icon: Users, tone: "#10B981" },
  { label: "Billing", detail: "Next invoice", time: "0.8s", status: "Updating the next invoice…", icon: Receipt, tone: "#D97706" },
]

const STEP_MS = 700
const BANNER_MS = 1400
const RESET_MS = 500

export function AccountSettingsFlow() {
  const [active, setActive] = useState(0)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = []

    function run() {
      setActive(0)
      setShowBanner(false)
      STEPS.forEach((_, i) => {
        timers.push(setTimeout(() => setActive(i + 1), (i + 1) * STEP_MS))
      })
      timers.push(setTimeout(() => setShowBanner(true), STEPS.length * STEP_MS + 150))
      timers.push(setTimeout(run, STEPS.length * STEP_MS + 150 + BANNER_MS + RESET_MS))
    }

    run()
    return () => timers.forEach(clearTimeout)
  }, [])

  const currentStatus = active > 0 && active <= STEPS.length ? STEPS[active - 1].status : STEPS[0].status

  return (
    <div className="relative mx-auto mt-14 w-full max-w-5xl">
      {/* live status caption — changes as each step fires */}
      <div className="mb-8 flex h-6 items-center justify-center gap-2.5">
        <motion.span
          className="size-2 rounded-full"
          style={{ backgroundColor: active > 0 && active <= STEPS.length ? STEPS[active - 1].tone : "#94A3B8" }}
          animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <AnimatePresence mode="wait">
          <motion.p
            key={currentStatus}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
          >
            {currentStatus}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* base rail */}
      <div className="absolute left-8 right-8 top-[7.375rem] hidden h-px sm:block" style={{ backgroundColor: "#E9ECF3" }} aria-hidden />

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-5 sm:gap-6">
        {STEPS.map((step, i) => {
          const Icon = step.icon
          const isDone = active > i
          const isCurrent = active === i + 1
          return (
            <div key={step.label} className="flex items-center gap-5 sm:flex-col sm:items-center sm:gap-4 sm:text-center">
              <div className="relative flex shrink-0 flex-col items-center gap-1.5">
                {/* elapsed-time pill, fades in the moment this step completes */}
                <motion.span
                  className="hidden h-6 items-center justify-center rounded-full px-2.5 font-mono text-xs font-semibold sm:flex"
                  animate={{ opacity: isDone ? 1 : 0, y: isDone ? 0 : 4 }}
                  transition={{ duration: 0.25 }}
                  style={{ backgroundColor: `${step.tone}14`, color: step.tone }}
                >
                  {step.time}
                </motion.span>

                <motion.span
                  className="relative z-10 flex size-16 items-center justify-center rounded-full text-white"
                  animate={{
                    backgroundColor: isDone ? step.tone : "#E9ECF3",
                    scale: isCurrent ? [1, 1.28, 1] : 1,
                    boxShadow: isCurrent ? `0 0 0 12px ${step.tone}22` : `0 0 0 0px ${step.tone}00`,
                  }}
                  transition={{ duration: isCurrent ? 0.6 : 0.3 }}
                >
                  <motion.svg viewBox="0 0 24 24" className="size-7" fill="none" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    {isDone ? (
                      <motion.path
                        d="M5 13l4 4L19 7"
                        stroke="white"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                    ) : (
                      <Icon />
                    )}
                  </motion.svg>
                </motion.span>
              </div>
              <div>
                <motion.p
                  className="text-base font-semibold"
                  animate={{ color: isDone ? "#0F172A" : "#94A3B8" }}
                  transition={{ duration: 0.3 }}
                >
                  {step.label}
                </motion.p>
                <motion.p
                  className="mt-1 text-sm"
                  animate={{ color: isDone ? step.tone : "#CBD5E1" }}
                  transition={{ duration: 0.3 }}
                >
                  {step.detail}
                </motion.p>
              </div>
            </div>
          )
        })}
      </div>

      {/* traveling dot that leads the rail fill, with a soft glow trail */}
      <div className="pointer-events-none absolute left-8 right-8 top-[7.375rem] hidden h-px overflow-visible sm:block" aria-hidden>
        <motion.div
          className="h-full"
          style={{ background: "linear-gradient(90deg, #0F172A, #2563EB, #7C3AED, #10B981, #D97706)" }}
          animate={{ width: `${(Math.max(active - 1, 0) / (STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
        {active > 0 && active <= STEPS.length && (
          <motion.span
            className="absolute top-1/2 size-4 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: STEPS[Math.min(active, STEPS.length) - 1].tone, boxShadow: `0 0 18px 5px ${STEPS[Math.min(active, STEPS.length) - 1].tone}80` }}
            animate={{ left: `${(Math.max(active - 1, 0) / (STEPS.length - 1)) * 100}%` }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        )}
      </div>

      {/* completion summary — appears once every destination is synced */}
      <div className="mt-8 flex justify-center">
        <AnimatePresence>
          {showBanner && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-2.5 shadow-[0_10px_30px_-14px_rgba(15,23,42,0.35)]"
              style={{ border: "1px solid #E4ECFF" }}
            >
              <Sparkles className="size-4 text-primary" aria-hidden />
              <span className="text-sm font-semibold text-foreground">
                All 5 places synced in under a second
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
