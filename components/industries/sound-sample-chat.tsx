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
  height = 140,
  agentSide = "left",
}: {
  messages: SoundSampleMessage[]
  intervalMs?: number
  height?: number
  /** Which side agent bubbles render on — customer bubbles take the other side. */
  agentSide?: "left" | "right"
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
  const agentOnRight = agentSide === "right"

  return (
    <div ref={scrollRef} className="mt-4 space-y-2.5 overflow-hidden" style={{ height }}>
      <AnimatePresence initial={false}>
        {messages.map((m, i) => {
          const onRight = m.from === "agent" ? agentOnRight : !agentOnRight
          const isBlue = m.from === "agent"
          return (
            <motion.p
              key={`${cycle}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={[
                "max-w-[90%] px-3.5 py-2.5 text-[13.5px] leading-relaxed",
                onRight ? "ml-auto rounded-xl rounded-tr-sm" : "rounded-xl rounded-tl-sm",
                isBlue ? "bg-blue-50 text-blue-800" : "border border-slate-200 bg-slate-50 text-slate-700",
              ].join(" ")}
            >
              {m.text}
            </motion.p>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
