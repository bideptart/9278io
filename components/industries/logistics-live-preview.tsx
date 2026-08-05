"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Bot, Users } from "lucide-react"

const SCRIPT = [
  { from: "agent", text: "Hello! Your shipment is scheduled for delivery today between 2 PM and 5 PM.", time: "10:30 AM" },
  { from: "customer", text: "Can I change the delivery time?", time: "10:31 AM" },
  { from: "agent", text: "Certainly. I can reschedule it for tomorrow morning. Would that work for you?", time: "10:31 AM" },
  { from: "customer", text: "Yes.", time: "10:32 AM" },
  { from: "agent", text: "Perfect. Your delivery has been updated and a confirmation SMS has been sent.", time: "10:33 AM" },
] as const

export function LogisticsLivePreview() {
  const [count, setCount] = useState(1)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => (c >= SCRIPT.length ? 1 : c + 1))
    }, 2600)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [count])

  const messages = SCRIPT.slice(0, count)

  return (
    <div ref={scrollRef} className="mt-4 h-[280px] space-y-3 overflow-y-auto scroll-smooth pr-1">
      <AnimatePresence initial={false}>
        {messages.map((m, i) => (
          <motion.div
            key={`${count >= SCRIPT.length ? "b" : "a"}-${i}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`flex items-start gap-2 ${m.from === "customer" ? "justify-end" : ""}`}
          >
            {m.from === "agent" && (
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-blue-100 text-blue-600">
                <Bot className="size-4" aria-hidden />
              </span>
            )}
            <div className={m.from === "customer" ? "text-right" : ""}>
              <p className={`text-[10.5px] font-bold ${m.from === "agent" ? "text-blue-600" : "text-slate-500"}`}>
                {m.from === "agent" ? "Agent" : "Customer"}
              </p>
              <p
                className={`mt-0.5 max-w-[85%] rounded-lg px-3 py-2 text-[12.5px] leading-snug ${
                  m.from === "agent" ? "ml-0 rounded-tl-sm bg-blue-50 text-blue-900" : "ml-auto rounded-tr-sm bg-slate-50 text-slate-700"
                }`}
              >
                {m.text}
              </p>
              <p className="mt-1 text-[9.5px] text-slate-400">{m.time}</p>
            </div>
            {m.from === "customer" && (
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500">
                <Users className="size-4" aria-hidden />
              </span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
