"use client"

import { Zap, Globe2, MessageSquare, PhoneForwarded, Mic, Headphones } from "lucide-react"
import { motion } from "motion/react"

const tasks = [
  { label: "Answer customer inquiries", status: "In progress", tone: "bg-amber-50 text-amber-700" },
  { label: "Provide product recommendations", status: "Completed", tone: "bg-emerald-50 text-emerald-700" },
  { label: "Assist with order processing", status: "Completed", tone: "bg-emerald-50 text-emerald-700" },
  { label: "Handle billing questions", status: "Queued", tone: "bg-slate-100 text-slate-500" },
]

const tools = [
  { icon: Zap, tone: "border-primary/20 bg-primary/[0.08] text-primary" },
  { icon: Globe2, tone: "border-blue-200 bg-blue-50 text-blue-600" },
  { icon: MessageSquare, tone: "border-sky-200 bg-sky-50 text-sky-600" },
  { icon: PhoneForwarded, tone: "border-indigo-200 bg-indigo-50 text-indigo-600" },
  { icon: Mic, tone: "border-cyan-200 bg-cyan-50 text-cyan-600" },
]

const stats = [
  { label: "Response Accuracy", value: "99%", tone: "text-primary" },
  { label: "Customer Satisfaction", value: "96%", tone: "text-emerald-600" },
]

export function AgentShowcase() {
  return (
    <div className="relative grid w-full max-w-[600px] grid-cols-[1fr_auto_1fr] items-center gap-3">
      {/* Left: Agent Tasks */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-border bg-white p-4 shadow-[0_8px_30px_-12px_oklch(0.13_0.025_255/0.15)]"
      >
        <p className="text-sm font-semibold text-foreground">Agent Tasks</p>
        <p className="mt-0.5 text-[10px] leading-tight text-muted-foreground">Live task queue</p>
        <div className="mt-3 space-y-2.5">
          {tasks.map((t) => (
            <div key={t.label} className="flex items-center justify-between gap-2">
              <span className="text-[11px] leading-tight text-muted-foreground">{t.label}</span>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold whitespace-nowrap ${t.tone}`}>
                {t.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Center: glowing orb */}
      <div className="relative flex h-24 w-24 items-center justify-center">
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            className="absolute h-16 w-16 rounded-full border border-primary/40"
            animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: i * 1.3 }}
          />
        ))}
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-16 w-16 items-center justify-center rounded-full shadow-[0_0_40px_oklch(0.6_0.22_265/0.6)] ring-1 ring-white/50"
          style={{
            background:
              "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.9), rgba(255,255,255,0) 45%), linear-gradient(150deg, oklch(0.75 0.12 235), oklch(0.55 0.2 262))",
          }}
        >
          <Headphones className="h-7 w-7 text-white" strokeWidth={1.6} aria-hidden />
        </motion.div>
      </div>

      {/* Right: Voice AI Agent */}
      <motion.div
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-border bg-white p-4 shadow-[0_8px_30px_-12px_oklch(0.13_0.025_255/0.15)]"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Headphones className="h-3 w-3" aria-hidden />
          </span>
          <p className="text-sm font-semibold text-foreground">Voice AI Agent</p>
        </div>

        <p className="mt-2.5 text-[9px] font-medium uppercase tracking-wide text-muted-foreground">Agent Tools</p>
        <div className="mt-1.5 flex gap-1.5">
          {tools.map(({ icon: Icon, tone }, i) => (
            <span key={i} className={`flex h-7 w-7 items-center justify-center rounded-lg border ${tone}`}>
              <Icon className="h-3.5 w-3.5" aria-hidden />
            </span>
          ))}
        </div>

        <p className="mt-3 text-[9px] font-medium uppercase tracking-wide text-muted-foreground">Key Statistics</p>
        <div className="mt-1.5 space-y-1">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center justify-between rounded-lg bg-slate-50 px-2 py-1.5">
              <span className="text-[10px] leading-tight text-muted-foreground">{s.label}</span>
              <span className={`text-sm font-bold ${s.tone}`}>{s.value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
