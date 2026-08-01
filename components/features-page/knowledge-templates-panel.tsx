"use client"

import { motion } from "motion/react"
import { Copy, User } from "lucide-react"

const agents = ["Aarav Motors", "Priya Dental", "Sharma Realty"]

export function KnowledgeTemplatesPanel() {
  return (
    <div className="relative mx-auto flex w-full max-w-[480px] items-center justify-center py-10">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%)" }}
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative w-full max-w-[360px] overflow-hidden rounded-[24px] bg-white p-6"
        style={{ border: "1px solid #E4ECFF", boxShadow: "0 40px 80px -30px rgba(124,58,237,0.35)" }}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: "linear-gradient(90deg, #7C3AED, #4F8DFF)" }} aria-hidden />

        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: "linear-gradient(135deg, #A78BFA, #7C3AED)" }}>
            <Copy className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#94A3B8" }}>Template</p>
            <p className="text-lg font-bold" style={{ color: "#0F172A" }}>Front Desk Support</p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl p-4" style={{ backgroundColor: "#F7F9FC", border: "1px solid #E4ECFF" }}>
          <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: "#94A3B8" }}>Used by 3 agents</p>
          <div className="mt-3 flex flex-col gap-2.5">
            {agents.map((a, i) => (
              <motion.div
                key={a}
                className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2"
                style={{ border: "1px solid #E4ECFF" }}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#EEF4FF" }}>
                  <User className="size-3.5" style={{ color: "#7C3AED" }} aria-hidden />
                </span>
                <p className="text-sm font-medium" style={{ color: "#0F172A" }}>{a}</p>
                <span className="ml-auto flex items-center gap-1 text-[11px] font-semibold" style={{ color: "#22C55E" }}>
                  Synced
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl px-3 py-2.5" style={{ backgroundColor: "#F3EEFF", border: "1px solid #E9D8FF" }}>
          <p className="text-[11px]" style={{ color: "#7C3AED" }}>Edit template once</p>
          <span className="text-[11px] font-semibold" style={{ color: "#7C3AED" }}>Updates all 3 →</span>
        </div>
      </motion.div>
    </div>
  )
}
