"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Bot, Check } from "lucide-react"

const CONVERSATIONS = [
  {
    agent: "Hi! How can I help you with our platform today?",
    caller: "I'd like to book a demo for my team.",
    status: "Job captured · Demo Booking · Priority: High",
  },
  {
    agent: "Sure! What's your team size so I can suggest the right plan?",
    caller: "We have about 50 people.",
    status: "Lead Qualified · Growth Plan Suggested",
  },
  {
    agent: "Your trial is expiring soon — want a walkthrough of the Pro features?",
    caller: "Yes, that would help a lot.",
    status: "Trial Recovery · Walkthrough Scheduled",
  },
  {
    agent: "I've logged your issue and created a support ticket for our team.",
    caller: "Great, thank you for the quick help!",
    status: "Support Ticket · Resolved",
  },
]

/** Floating, gently rocking robot mascot — must render inside the clipped
 * illustration box so its "bottom-24" position resolves against it. */
export function SaasHeroRobot() {
  return (
    <motion.div
      className="absolute bottom-24 left-1/2 -translate-x-1/2"
      animate={{ y: [0, -8, 0], rotate: [0, -2.5, 2.5, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="relative flex flex-col items-center">
        <span className="size-2 rounded-full bg-blue-400" aria-hidden />
        <span className="h-3 w-[2px] bg-blue-300" aria-hidden />
        <div className="grid size-16 place-items-center rounded-2xl bg-white shadow-lg">
          <div className="flex items-center gap-2.5">
            <motion.span
              className="size-2.5 rounded-full bg-blue-600"
              animate={{ scaleY: [1, 0.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
              aria-hidden
            />
            <motion.span
              className="size-2.5 rounded-full bg-blue-600"
              animate={{ scaleY: [1, 0.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
              aria-hidden
            />
          </div>
          <span className="absolute -left-2 top-4 size-3 rounded-full bg-blue-300" aria-hidden />
          <span className="absolute -right-2 top-4 size-3 rounded-full bg-blue-300" aria-hidden />
        </div>
        <span className="h-1.5 w-4 bg-blue-200" aria-hidden />
        <div className="flex h-11 w-24 items-start justify-center rounded-2xl bg-gradient-to-b from-blue-600 to-indigo-600 pt-2.5 shadow-lg">
          <span className="grid size-6 place-items-center rounded-full bg-white text-blue-600">
            <Bot className="size-3.5" aria-hidden />
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/** Live call preview card — sits outside the clipped illustration box so it
 * can overlap past its bottom edge, and cycles through sample conversations. */
export function SaasHeroLiveCall() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % CONVERSATIONS.length)
    }, 4200)
    return () => clearInterval(id)
  }, [])

  const active = CONVERSATIONS[index]

  return (
    <div className="absolute inset-x-4 bottom-4 z-20 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_50px_-20px_rgba(2,6,23,0.35)]">
      <div className="flex items-center justify-between px-5 py-4">
        <p className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-slate-500">
          <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden />
          Live Call Preview
        </p>
        <div className="flex h-4 items-end gap-[2px]" aria-hidden>
          {[6, 10, 7, 12, 8].map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}px`, animationDelay: `${i * 0.12}s` }}
              className="ind-eq w-[2.5px] rounded-full bg-gradient-to-t from-blue-500 to-sky-400"
            />
          ))}
        </div>
      </div>

      <div className="relative min-h-[104px] space-y-3 overflow-hidden px-5 pb-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-3"
          >
            <div className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3">
              <span className="shrink-0 rounded-md bg-blue-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                Agent
              </span>
              <p className="text-[14px] leading-snug text-blue-900">{active.agent}</p>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
              <span className="shrink-0 rounded-md bg-slate-200 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-600">
                Caller
              </span>
              <p className="text-[14px] leading-snug text-slate-600">{active.caller}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative overflow-hidden bg-emerald-50 px-5 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex items-center gap-1.5 text-[13px] font-semibold text-emerald-700"
          >
            <span className="grid size-4 shrink-0 place-items-center rounded-full bg-emerald-100">
              <Check className="size-2.5" aria-hidden />
            </span>
            {active.status}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
