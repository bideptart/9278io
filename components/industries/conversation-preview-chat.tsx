"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Bot, UserCheck } from "lucide-react"

export type ConversationMessage = {
  from: "agent" | "customer"
  text: string
}

export function ConversationPreviewChat({
  messages: script,
  intervalMs = 2200,
}: {
  messages: ConversationMessage[]
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
    <div ref={scrollRef} className="h-[300px] space-y-4 overflow-hidden p-5">
      <AnimatePresence initial={false}>
        {messages.map((m, i) => (
          <motion.div
            key={`${cycle}-${i}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={m.from === "agent" ? "flex items-start gap-2.5" : "flex items-start justify-end gap-2.5"}
          >
            {m.from === "agent" ? (
              <>
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-blue-100 text-blue-600">
                  <Bot className="size-4" aria-hidden />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Agent</p>
                  <p className="mt-0.5 max-w-[90%] rounded-2xl rounded-tl-sm bg-blue-50 px-3.5 py-2 text-[13.5px] leading-relaxed text-slate-800">
                    {m.text}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Customer</p>
                  <p className="mt-0.5 ml-auto max-w-[85%] rounded-2xl rounded-tr-sm border border-slate-200 bg-slate-50 px-3.5 py-2 text-[13.5px] leading-relaxed text-slate-700">
                    {m.text}
                  </p>
                </div>
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500">
                  <UserCheck className="size-4" aria-hidden />
                </span>
              </>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
