"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Phone, Sparkles } from "lucide-react"

const CHANNELS = ["# Trial signups", "# Demo requests", "# Support tickets"]

const SCRIPT = [
  { from: "agent", text: "Your trial expires in 3 days — need any help before it ends?" },
  { from: "customer", text: "Yes, can you connect me with sales?" },
  { from: "agent", text: "Sure! I've looped in our team — they'll call within the hour." },
] as const

export function SaasAgentConsole() {
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
    <div className="relative w-full">
      {/* macOS-style console window */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_50px_-20px_rgba(2,6,23,0.35)]">
        <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-3.5">
          <span className="size-2.5 rounded-full bg-red-400" aria-hidden />
          <span className="size-2.5 rounded-full bg-amber-400" aria-hidden />
          <span className="size-2.5 rounded-full bg-emerald-400" aria-hidden />
          <p className="mx-auto pr-10 text-[13.5px] font-semibold text-slate-500">9278.io — Agent Console</p>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-40 shrink-0 border-r border-slate-100 px-4 py-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Playbooks</p>
            <ul className="mt-2 space-y-1.5">
              {CHANNELS.map((c, i) => (
                <li
                  key={c}
                  className={`truncate rounded-md px-2 py-1.5 text-[12px] font-semibold ${
                    i === 0 ? "bg-blue-50 text-blue-700" : "text-slate-500"
                  }`}
                >
                  {c}
                </li>
              ))}
            </ul>

            <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Live now</p>
            <ul className="mt-2 space-y-2">
              <li className="flex items-center gap-2 text-[12px] font-medium text-slate-600">
                <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden />
                Agent A
              </li>
              <li className="flex items-center gap-2 text-[12px] font-medium text-slate-400">
                <span className="size-1.5 rounded-full bg-slate-300" aria-hidden />
                Agent B
              </li>
            </ul>
          </div>

          {/* Main thread */}
          <div className="flex-1 px-5 pt-4 pb-6">
            <div className="flex items-center justify-between">
              <p className="text-[14.5px] font-bold text-slate-800">{CHANNELS[0]}</p>
              <div className="flex items-center gap-1.5">
                <span className="grid size-7 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                  <Phone className="size-3.5" aria-hidden />
                </span>
                <span className="grid size-7 place-items-center rounded-full bg-violet-50 text-violet-600">
                  <Sparkles className="size-3.5" aria-hidden />
                </span>
              </div>
            </div>
            <p className="text-[12px] text-slate-400">2 agents &middot; 1 live call</p>

            <div ref={scrollRef} className="mt-4 h-[260px] space-y-2.5 overflow-y-auto scroll-smooth pr-1">
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={`${count >= SCRIPT.length ? "b" : "a"}-${i}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className={`flex ${m.from === "customer" ? "justify-end" : ""}`}
                  >
                    <p
                      className={`max-w-[82%] rounded-lg px-3.5 py-2.5 text-[13.5px] leading-snug ${
                        m.from === "agent" ? "bg-blue-50 text-blue-900" : "bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span
                        className={`mr-1.5 text-[10px] font-bold uppercase ${
                          m.from === "agent" ? "text-blue-500" : "text-slate-400"
                        }`}
                      >
                        {m.from === "agent" ? "Agent" : "Caller"}
                      </span>
                      {m.text}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-3 flex items-center gap-2.5 rounded-lg bg-blue-600 px-3.5 py-2.5 text-white">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/15">
                <Phone className="size-3" aria-hidden />
              </span>
              <span className="text-[12.5px] font-semibold">Live call &middot; 00:42 &middot; transcript on</span>
              <div className="ml-auto flex h-4 items-end gap-[2px]" aria-hidden>
                {[4, 7, 5, 8, 6].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
                    className="ind-eq w-[2px] rounded-full bg-white"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
