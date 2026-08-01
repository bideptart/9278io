"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

const SCRIPT = [
  { from: "agent", text: "Hi! How can I help you today?" },
  { from: "customer", text: "I need to schedule a project review meeting." },
  { from: "agent", text: "Sure! Engineering team is available tomorrow at 11:00 AM or 3:00 PM. Which time works for you?" },
  { from: "customer", text: "3:00 PM works." },
] as const

export function RemoteAgentPhoneChat() {
  const [count, setCount] = useState(1)
  const [cycle, setCycle] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= SCRIPT.length) {
          setCycle((cy) => cy + 1)
          return 1
        }
        return c + 1
      })
    }, 2400)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [count, cycle])

  const messages = SCRIPT.slice(0, count)

  return (
    <div ref={scrollRef} className="h-full min-h-0 shrink-0 space-y-3 overflow-y-auto scroll-smooth px-4 py-4">
      <AnimatePresence initial={false}>
        {messages.map((m, i) => (
          <motion.div
            key={`${cycle}-${i}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`flex ${m.from === "agent" ? "justify-start" : "justify-end"}`}
          >
            <p
              className={
                m.from === "agent"
                  ? "max-w-[85%] rounded-lg rounded-tl-sm bg-blue-50 px-3 py-2 text-[12px] leading-snug text-blue-900"
                  : "max-w-[85%] rounded-lg rounded-tr-sm bg-slate-100 px-3 py-2 text-[12px] leading-snug text-slate-700"
              }
            >
              {m.text}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
