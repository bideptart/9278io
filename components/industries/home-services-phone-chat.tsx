"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

const SCRIPT = [
  { from: "bot", text: "Hi! Need help with a repair today?" },
  { from: "user", text: "Yes, my AC stopped cooling." },
  { from: "bot", text: "Got it — booking a technician for you now." },
] as const

export function HomeServicesPhoneChat() {
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
    }, 2000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [count, cycle])

  const messages = SCRIPT.slice(0, count)

  return (
    <div
      ref={scrollRef}
      className="flex h-[92px] w-full shrink-0 flex-col justify-end gap-2 overflow-hidden px-1"
    >
      <AnimatePresence initial={false}>
        {messages.map((m, i) => (
          <motion.div
            key={`${cycle}-${i}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <p
              className={
                m.from === "user"
                  ? "max-w-[82%] rounded-lg rounded-tr-sm bg-blue-600 px-2.5 py-1.5 text-[9.5px] font-semibold leading-snug text-white shadow-sm"
                  : "max-w-[82%] rounded-lg rounded-tl-sm border border-slate-300 bg-white px-2.5 py-1.5 text-[9.5px] font-semibold leading-snug text-slate-900 shadow-sm"
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
