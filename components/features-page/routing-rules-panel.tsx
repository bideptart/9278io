"use client"

import { motion } from "motion/react"
import { PhoneCall, IndianRupee, LifeBuoy, ShoppingBag } from "lucide-react"

const routes = [
  { icon: ShoppingBag, label: "Sales", tone: "#2563EB" },
  { icon: LifeBuoy, label: "Support", tone: "#7C3AED" },
  { icon: IndianRupee, label: "Billing", tone: "#D97706" },
]

export function RoutingRulesPanel() {
  return (
    <div className="relative mx-auto flex w-full max-w-[480px] items-center justify-center py-10">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.22), transparent 70%)" }}
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex w-full max-w-[380px] flex-col items-center py-6">
        {/* incoming call, top */}
        <motion.div
          className="relative z-10 flex size-16 items-center justify-center rounded-full text-white"
          style={{ background: "linear-gradient(135deg, #4F8DFF, #2563EB)", boxShadow: "0 16px 34px -14px rgba(37,99,235,0.55)" }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <PhoneCall className="size-7" aria-hidden />
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ border: "2px solid #2563EB" }}
            animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        </motion.div>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wide" style={{ color: "#94A3B8" }}>Incoming call</p>

        {/* branching connector lines */}
        <svg viewBox="0 0 300 70" className="mt-2 h-16 w-full max-w-[300px]" aria-hidden>
          <path d="M150 0 L60 70" fill="none" stroke="#BBD1FF" strokeWidth="2" strokeDasharray="4 5" />
          <path d="M150 0 L150 70" fill="none" stroke="#BBD1FF" strokeWidth="2" strokeDasharray="4 5" />
          <path d="M150 0 L240 70" fill="none" stroke="#BBD1FF" strokeWidth="2" strokeDasharray="4 5" />
        </svg>

        {/* destination chips */}
        <div className="flex w-full max-w-[380px] items-start justify-between gap-3">
          {routes.map((r, i) => {
            const Icon = r.icon
            return (
              <motion.div
                key={r.label}
                className="flex flex-1 flex-col items-center gap-2 rounded-2xl bg-white p-4"
                style={{ border: "1px solid #E4ECFF", boxShadow: "0 20px 40px -24px rgba(15,23,42,0.3)" }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
              >
                <span className="flex size-9 items-center justify-center rounded-xl text-white" style={{ background: `linear-gradient(135deg, ${r.tone}, ${r.tone}CC)` }}>
                  <Icon className="size-4" aria-hidden />
                </span>
                <p className="text-xs font-semibold" style={{ color: "#0F172A" }}>{r.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
