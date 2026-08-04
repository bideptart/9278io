"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { PhoneCall, PhoneOff } from "lucide-react"

type Stage = "dialing" | "ringing" | "connected"

const CAPTIONS = [
  "Namaste! Thanks for calling Sharma Dental Clinic.",
  "I can help you book, reschedule, or check an appointment.",
  "You're all set for Thursday at 4 PM — anything else?",
]

const STAGE_MS: Record<Stage, number> = { dialing: 1400, ringing: 1800, connected: 6400 }
const ORDER: Stage[] = ["dialing", "ringing", "connected"]

function Bars({ active }: { active: boolean }) {
  const heights = [6, 14, 22, 12, 18, 8, 16]
  return (
    <div className="flex h-8 items-end gap-1" aria-hidden>
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full bg-primary"
          animate={active ? { height: [h * 0.4, h, h * 0.5, h * 1.1, h * 0.4] } : { height: h * 0.3 }}
          transition={active ? { duration: 0.9 + i * 0.07, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
        />
      ))}
    </div>
  )
}

export function LiveTestCallHero() {
  const [stage, setStage] = useState<Stage>("dialing")
  const [captionIndex, setCaptionIndex] = useState(0)

  useEffect(() => {
    const id = setTimeout(() => {
      const idx = ORDER.indexOf(stage)
      if (idx === ORDER.length - 1) {
        setStage("dialing")
        setCaptionIndex(0)
      } else {
        setStage(ORDER[idx + 1])
      }
    }, STAGE_MS[stage])
    return () => clearTimeout(id)
  }, [stage])

  useEffect(() => {
    if (stage !== "connected") return
    const id = setInterval(() => {
      setCaptionIndex((c) => (c + 1 < CAPTIONS.length ? c + 1 : c))
    }, 2100)
    return () => clearInterval(id)
  }, [stage])

  const connected = stage === "connected"

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div
        aria-hidden
        className="absolute inset-x-6 -top-6 h-24 rounded-full bg-primary/15 blur-3xl"
      />

      <motion.div
        className="relative overflow-hidden rounded-3xl border border-border/60 bg-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25)]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between border-b border-border/60 bg-[#F7F9FC] px-5 py-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Test Call</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-red-600">
            <motion.span
              className="size-1.5 rounded-full bg-red-600"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            Live
          </span>
        </div>

        <div className="flex flex-col items-center gap-3 px-6 pb-3 pt-7">
          <motion.div
            className="flex size-16 items-center justify-center rounded-full"
            animate={{
              backgroundColor: connected ? "#10B98120" : "#2563EB18",
              scale: stage === "ringing" ? [1, 1.08, 1] : 1,
            }}
            transition={{ backgroundColor: { duration: 0.4 }, scale: { duration: 0.6, repeat: stage === "ringing" ? Infinity : 0 } }}
          >
            {connected ? (
              <PhoneCall className="size-6 text-emerald-600" aria-hidden />
            ) : (
              <PhoneCall className="size-6 text-primary" aria-hidden />
            )}
          </motion.div>
          <p className="text-lg font-bold tracking-tight text-foreground">+91 98765 43210</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={stage}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: connected ? "#10B981" : stage === "ringing" ? "#D97706" : "#94A3B8" }}
            >
              {stage === "dialing" && "Dialing your agent's real number…"}
              {stage === "ringing" && "Ringing…"}
              {stage === "connected" && "Connected — 00:0" + (captionIndex + 2)}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="border-t border-border/60 bg-[#FAFBFC] px-6 py-5">
          <div className="flex items-center justify-center">
            <Bars active={connected} />
          </div>
          <div className="mt-4 min-h-[52px] rounded-xl bg-white px-4 py-3 shadow-sm">
            <AnimatePresence mode="wait">
              <motion.p
                key={connected ? captionIndex : "idle"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-sm leading-relaxed text-foreground"
              >
                {connected ? (
                  <>
                    <span className="font-semibold text-primary">Agent: </span>
                    {CAPTIONS[captionIndex]}
                  </>
                ) : (
                  <span className="text-muted-foreground">Waiting to connect…</span>
                )}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 border-t border-border/60 px-6 py-4">
          <span className="flex size-11 items-center justify-center rounded-full bg-red-50 text-red-500">
            <PhoneOff className="size-4" aria-hidden />
          </span>
          <span className="text-xs text-muted-foreground">Same voice, latency, and answers a real caller hears</span>
        </div>
      </motion.div>
    </div>
  )
}
