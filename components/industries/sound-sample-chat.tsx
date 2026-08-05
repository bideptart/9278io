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
  labeled = false,
}: {
  messages: SoundSampleMessage[]
  intervalMs?: number
  height?: number
  /** Which side agent bubbles render on — customer bubbles take the other side. */
  agentSide?: "left" | "right"
  /** Adds a small uppercase Agent/Customer tag and a ring-style bubble (matches the e-commerce hero preview). */
  labeled?: boolean
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
    <div
      ref={scrollRef}
      className={labeled ? "space-y-2.5 overflow-hidden p-5" : "mt-4 space-y-2.5 overflow-hidden"}
      style={{ height }}
    >
      <AnimatePresence initial={false}>
        {messages.map((m, i) => {
          const onRight = m.from === "agent" ? agentOnRight : !agentOnRight
          const isBlue = m.from === "agent"

          if (labeled) {
            return (
              <motion.div
                key={`${cycle}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`flex text-sm ${onRight ? "justify-end" : ""}`}
              >
                <span
                  className={[
                    "max-w-[85%] px-4 py-2.5",
                    onRight ? "rounded-2xl rounded-br-sm" : "rounded-2xl rounded-bl-sm",
                    isBlue ? "bg-blue-50 text-blue-800 ring-1 ring-blue-100" : "bg-slate-50 text-slate-700 ring-1 ring-slate-200",
                  ].join(" ")}
                >
                  <span className={`mr-1 text-[10px] font-bold uppercase ${isBlue ? "opacity-70" : "opacity-40"}`}>
                    {m.from === "agent" ? "Agent" : "Customer"}
                  </span>
                  {m.text}
                </span>
              </motion.div>
            )
          }

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
