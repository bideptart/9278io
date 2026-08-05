"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Bot, Check, CalendarCheck, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const CHAT_SCRIPT = [
  { from: "bot", text: "Hello! 👋 How can I help you today?" },
  { from: "user", text: "Hi, I'd like to book a table for 2 people this Saturday." },
  { from: "bot", text: "Sure! What time would you prefer?" },
  { from: "user", text: "7:00 PM" },
] as const

export function RestaurantChatCard() {
  const [count, setCount] = useState(1)
  const [cycle, setCycle] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= CHAT_SCRIPT.length) {
          setCycle((cy) => cy + 1)
          return 1
        }
        return c + 1
      })
    }, 2600)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [count, cycle])

  const messages = CHAT_SCRIPT.slice(0, count)

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-blue-400 bg-white shadow-xl shadow-slate-900/10">
      <div className="flex items-center gap-2.5 border-b border-blue-100 bg-blue-50/60 px-4 pb-3.5 pt-6">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
          <Bot className="size-4" aria-hidden />
        </span>
        <div>
          <p className="text-[13px] font-bold text-slate-900">AI Restaurant Assistant</p>
          <p className="flex items-center gap-1 text-[10.5px] font-semibold text-emerald-600">
            <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden />
            Online
          </p>
        </div>
      </div>

      <div ref={scrollRef} className="h-[260px] shrink-0 space-y-2.5 overflow-y-auto scroll-smooth px-4 py-4">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={`${cycle}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <p
                className={
                  m.from === "user"
                    ? "max-w-[85%] rounded-2xl rounded-tr-sm bg-blue-600 px-3 py-2 text-[12.5px] text-white"
                    : "max-w-[85%] rounded-2xl rounded-tl-sm bg-blue-50 px-3 py-2 text-[12.5px] text-slate-700"
                }
              >
                {m.text}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-auto border-t border-blue-100 px-4 py-3">
        <div className="flex items-center justify-between rounded-full bg-blue-50 px-3.5 py-2 text-[12px] text-slate-500">
          Type your message...
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
            <ArrowRight className="size-3" aria-hidden />
          </span>
        </div>
      </div>
    </div>
  )
}

export function RestaurantReservationCard() {
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    if (!confirmed) return
    const id = setTimeout(() => setConfirmed(false), 3200)
    return () => clearTimeout(id)
  }, [confirmed])

  return (
    <div className="h-full rounded-[1.75rem] border border-blue-400 bg-white px-7 pb-7 pt-9 shadow-xl shadow-slate-900/10">
      <div className="mb-5 flex flex-col items-center text-center">
        <span className="grid size-14 place-items-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30">
          <CalendarCheck className="size-6" aria-hidden />
        </span>
        <p className="mt-3 font-serif text-xl font-extrabold text-slate-900">Reserve a Table</p>
        <p className="text-[13px] text-slate-500">Book your perfect dining experience</p>
      </div>

      <div className="space-y-3">
        <div>
          <p className="mb-1 text-[11px] font-bold text-slate-500">Date</p>
          <div className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2 text-[13px] font-semibold text-slate-800">
            Aug 8, 2026
            <CalendarCheck className="size-4 text-slate-400" aria-hidden />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="mb-1 text-[11px] font-bold text-slate-500">Time</p>
            <div className="rounded-xl border border-slate-200 px-3 py-2 text-[13px] font-semibold text-slate-800">
              7:00 PM
            </div>
          </div>
          <div>
            <p className="mb-1 text-[11px] font-bold text-slate-500">Party Size</p>
            <div className="rounded-xl border border-slate-200 px-3 py-2 text-[13px] font-semibold text-slate-800">
              4 People
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={() => setConfirmed(true)}
        className="mt-4 h-auto w-full rounded-xl bg-blue-600 py-2.5 text-[13.5px] font-bold text-white hover:bg-blue-700"
      >
        Confirm Reservation
      </Button>

      <div className="mt-3 h-[46px]">
        <AnimatePresence mode="wait">
          {confirmed ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex items-start gap-2 rounded-xl bg-emerald-50 px-3 py-2.5"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 15 }}
                className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-emerald-100"
              >
                <Check className="size-2.5 text-emerald-700" aria-hidden />
              </motion.span>
              <div>
                <p className="text-[12px] font-bold text-emerald-700">Reservation confirmed!</p>
                <p className="text-[11px] text-emerald-600/80">You&apos;ll receive a confirmation message shortly.</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5"
            >
              <p className="text-[11.5px] text-slate-400">Click confirm to reserve your table.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
