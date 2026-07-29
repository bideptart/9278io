"use client"

import { motion } from "motion/react"
import { CheckCircle2, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

// Waveform bar peak heights — mirrors the equaliser pattern used in
// components/animation/voice-orb.tsx so the two animations feel related.
const BARS = [0.4, 0.9, 0.6, 1, 0.5, 0.8, 0.45]

export function LiveCallMockup({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none select-none", className)}>
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -6 }}
        whileInView={{ opacity: 1, y: 0, rotate: -4 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="w-64 rounded-2xl border border-border/60 bg-white p-4 shadow-[0_20px_60px_-15px_oklch(0.4_0.2_262/0.35)]"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Live call</span>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex size-10 flex-none items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              PS
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">Priya Sharma</p>
              <p className="text-xs text-muted-foreground">+91 98765 43210</p>
            </div>
            <Phone className="ml-auto size-4 flex-none text-primary" aria-hidden />
          </div>

          <div className="mt-4 flex h-8 items-end gap-1">
            {BARS.map((peak, i) => (
              <motion.span
                key={i}
                className="block w-1 rounded-full bg-primary/70"
                initial={{ scaleY: 0.3 }}
                animate={{ scaleY: [0.3, peak, 0.4, peak * 0.7, 0.3] }}
                transition={{
                  duration: 1.2 + i * 0.06,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.05,
                }}
                style={{ height: "100%", transformOrigin: "bottom" }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="relative -mt-4 ml-8 flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm"
        >
          <CheckCircle2 className="size-3.5" aria-hidden />
          Answered in 0.8s
        </motion.div>
      </motion.div>
    </div>
  )
}
