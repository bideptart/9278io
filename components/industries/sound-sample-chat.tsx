"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

export type SoundSampleMessage = {
  from: "agent" | "customer"
  text: string
}

export function SoundSampleChat({
  messages: script,
  intervalMs = 2400,
}: {
  messages: SoundSampleMessage[]
  intervalMs?: number
}) {
  const [count, setCount] = useState(1)
  const [cycle, setCycle] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= script.length) {
          setCycle((cy) => cy + 1)
          return 1
        }
        return c + 1
      })
    }, intervalMs)
    return () => clearInterval(id)
  }, [script.length, intervalMs])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [count, cycle])

  const messages = script.slice(0, count)

  return (
    <div ref={scrollRef} className="mt-4 h-[140px] space-y-2.5 overflow-hidden">
      <AnimatePresence initial={false}>
        {messages.map((m, i) => (
          <motion.p
            key={`${cycle}-${i}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={
              m.from === "agent"
                ? "max-w-[90%] rounded-xl rounded-tl-sm bg-blue-50 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-blue-800"
                : "ml-auto max-w-[85%] rounded-xl rounded-tr-sm border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-slate-700"
            }
          >
            {m.text}
          </motion.p>
        ))}
      </AnimatePresence>
    </div>
  )
}
