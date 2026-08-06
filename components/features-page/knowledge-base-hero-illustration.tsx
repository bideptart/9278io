"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Search, Brain, Bot, FileText, HelpCircle, ShieldCheck, Sparkles } from "lucide-react"

const searchQueries = ["Are you open on Sundays?", "What's your refund policy?", "Where are your branches?"]

function useTypewriter(words: string[]) {
  const [text, setText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    const holdAtFull = !deleting && text === current
    const holdAtEmpty = deleting && text === ""

    const delay = holdAtFull ? 1400 : holdAtEmpty ? 400 : deleting ? 35 : 55

    const id = setTimeout(() => {
      if (holdAtFull) {
        setDeleting(true)
        return
      }
      if (holdAtEmpty) {
        setDeleting(false)
        setWordIndex((w) => (w + 1) % words.length)
        return
      }
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1))
    }, delay)

    return () => clearTimeout(id)
  }, [text, deleting, wordIndex, words])

  return text
}

function useCountUp(to: number, durationMs = 1400) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let raf: number
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1)
      setValue(Math.round(to * progress))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, durationMs])
  return value
}

const agents = [
  { name: "Agent A", tone: "#2563EB" },
  { name: "Agent B", tone: "#10B981" },
  { name: "Agent C", tone: "#7C3AED" },
]

const miniList = [
  { icon: FileText, label: "Company Facts" },
  { icon: HelpCircle, label: "FAQs" },
  { icon: ShieldCheck, label: "Policies" },
]


export function KnowledgeBaseHeroIllustration() {
  const entries = useCountUp(36)
  const typed = useTypewriter(searchQueries)

  return (
    <div className="relative mx-auto w-full max-w-[480px] py-10">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[380px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.22), transparent 70%)" }}
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -z-10 size-52 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.18), transparent 70%)" }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
      {/* grounding shadow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-8 w-[70%] -translate-x-1/2 rounded-full blur-2xl"
        style={{ backgroundColor: "rgba(15,23,42,0.22)" }}
        animate={{ opacity: [0.6, 0.85, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="pointer-events-none absolute -left-1 top-6"
        animate={{ rotate: [0, 20, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="size-4 opacity-60" style={{ color: "#7C3AED" }} aria-hidden />
      </motion.span>
      <motion.span
        className="pointer-events-none absolute -right-1 top-16"
        animate={{ rotate: [0, -20, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Sparkles className="size-3.5 opacity-50" style={{ color: "#2563EB" }} aria-hidden />
      </motion.span>

      {/* central knowledge-base "book" */}
      <motion.div
        className="relative z-10 mx-auto w-[220px] overflow-hidden rounded-[20px] bg-white p-5"
        style={{ border: "1px solid #E4ECFF" }}
        animate={{
          y: [0, -8, 0],
          boxShadow: [
            "0 30px 60px -24px rgba(37,99,235,0.35)",
            "0 34px 70px -20px rgba(37,99,235,0.45)",
            "0 30px 60px -24px rgba(37,99,235,0.35)",
          ],
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* top accent bar */}
        <span
          className="absolute inset-x-0 top-0 h-1.5"
          style={{ background: "linear-gradient(90deg, #4F8DFF, #7C3AED)" }}
          aria-hidden
        />
        <div className="relative flex items-start justify-between">
          <span className="flex size-11 items-center justify-center rounded-xl text-white" style={{ background: "linear-gradient(135deg, #4F8DFF, #2563EB)" }}>
            <Brain className="size-5" aria-hidden />
          </span>
          <div className="flex flex-col gap-1.5" aria-hidden>
            <span className="h-2 w-6 rounded-sm" style={{ backgroundColor: "#2563EB" }} />
            <span className="h-2 w-6 rounded-sm" style={{ backgroundColor: "#10B981" }} />
            <span className="h-2 w-6 rounded-sm" style={{ backgroundColor: "#F59E0B" }} />
          </div>
        </div>
        <p className="relative mt-3 text-lg font-extrabold leading-tight tracking-tight" style={{ color: "#0F172A" }}>Knowledge Base</p>
        <span className="relative mt-1 inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: "#667085" }}>
          <span className="relative flex size-1.5">
            <motion.span
              className="absolute inline-flex size-full rounded-full bg-emerald-500"
              animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          {entries} entries synced
        </span>
        <div className="relative mt-4 flex items-center gap-2 rounded-full px-3 py-2.5" style={{ backgroundColor: "#F7F9FC", border: "1px solid #E4ECFF" }}>
          <Search className="size-3.5 shrink-0" style={{ color: "#94A3B8" }} aria-hidden />
          <span className="truncate text-xs" style={{ color: "#475569" }}>
            {typed}
            <motion.span
              className="ml-0.5 inline-block h-3 w-px align-middle"
              style={{ backgroundColor: "#94A3B8" }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          </span>
        </div>
      </motion.div>

      {/* glowing curved beams fanning from the book down into each agent —
          percentage coordinates so they land on the same column centers as
          the full-width icon grid below (16.67% / 50% / 83.33%) */}
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-10 w-full overflow-visible" aria-hidden>
        <defs>
          <filter id="kb-beam-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>
        {agents.map((a, i) => {
          const x = [16.6667, 50, 83.3333][i]
          const d = `M50 0 C 50 18, ${x} 14, ${x} 40`
          return (
            <g key={a.name}>
              <motion.path
                d={d}
                fill="none"
                stroke={a.tone}
                strokeWidth="1.6"
                strokeLinecap="round"
                filter="url(#kb-beam-glow)"
                animate={{ opacity: [0.25, 0.55, 0.25] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              />
              <motion.circle
                r="1.8"
                fill={a.tone}
                style={{ offsetPath: `path('${d}')` }}
                animate={{ offsetDistance: ["0%", "100%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.35, repeatDelay: 0.4 }}
              />
            </g>
          )
        })}
      </svg>

      {/* three agents, each with its own mini knowledge list — plain flow, never overlaps */}
      <div className="grid grid-cols-3 gap-3">
        {agents.map((a, i) => (
          <motion.div
            key={a.name}
            className="relative flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.15 }}
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -z-10 size-16 rounded-full blur-xl"
              style={{ backgroundColor: `${a.tone}33` }}
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            />
            <motion.span
              className="relative flex size-10 items-center justify-center rounded-2xl text-white"
              style={{ background: `linear-gradient(135deg, ${a.tone}, ${a.tone}CC)`, boxShadow: `0 14px 28px -12px ${a.tone}80` }}
              animate={{ y: [0, -6, 0] }}
              whileHover={{ scale: 1.12, rotate: -8, transition: { duration: 0.25, ease: "easeOut" } }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
            >
              {/* sync-pulse ring, timed to fire when the beam's dot arrives */}
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-2xl"
                style={{ border: `1.5px solid ${a.tone}` }}
                animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.6, ease: "easeOut", delay: i * 0.35 + 1.8 }}
              />
              <Bot className="size-4" aria-hidden />
            </motion.span>
            <span
              className="whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
              style={{ backgroundColor: a.tone }}
            >
              {a.name}
            </span>
            <motion.div
              className="relative mt-1 w-full overflow-hidden rounded-xl bg-white p-3 pt-3.5"
              style={{ border: "1px solid #E4ECFF", boxShadow: "0 10px 20px -14px rgba(15,23,42,0.25)" }}
              whileHover={{ y: -3, scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <span className="absolute inset-x-0 top-0 h-[3px]" style={{ backgroundColor: a.tone }} aria-hidden />
              {miniList.map((m, mi) => {
                const Icon = m.icon
                // beam dot reaches this agent at i*0.35 + 1.8, then again every
                // 2.2s (its full travel + pause cycle) — each row flashes in
                // right after that arrival, one after another, not on a scroll trigger
                const arrival = i * 0.35 + 1.8
                return (
                  <motion.div
                    key={m.label}
                    className="flex items-center gap-1.5 py-1"
                    initial={{ opacity: 0.3, x: -6 }}
                    animate={{ opacity: [0.3, 1, 1, 0.3], x: [-6, 0, 0, -6] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: arrival + mi * 0.15,
                      times: [0, 0.15, 0.85, 1],
                    }}
                  >
                    <Icon className="size-3.5 shrink-0" style={{ color: a.tone }} aria-hidden />
                    <span className="truncate text-[11px] font-medium" style={{ color: "#475569" }}>{m.label}</span>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
