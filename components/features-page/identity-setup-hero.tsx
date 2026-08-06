"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Car, Stethoscope, Home, PhoneIncoming } from "lucide-react"

const CYCLE_MS = 3400
const NAME_SPEED = 32
const GREETING_SPEED = 16
const GREETING_GAP = 180
const PREVIEW_GAP = 280

const profiles = [
  { name: "Aarav Motors Agent", icon: Car, greeting: "Thanks for calling Aarav Motors, how can I help?", tone: "#2563EB" },
  { name: "Priya Dental Care", icon: Stethoscope, greeting: "Hi, you've reached Priya Dental Care!", tone: "#7C3AED" },
  { name: "Sharma Reality", icon: Home, greeting: "Hello! Sharma Reality, how can I assist you today?", tone: "#D97706" },
]

function TypedText({ text, speed, startDelay = 0, tone }: { text: string; speed: number; startDelay?: number; tone: string }) {
  const [shown, setShown] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    setShown("")
    setDone(false)
    let i = 0
    let interval: ReturnType<typeof setInterval>
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i++
        setShown(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return (
    <span>
      {shown}
      {!done && (
        <motion.span
          className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5"
          style={{ backgroundColor: tone }}
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        />
      )}
    </span>
  )
}

export function IdentitySetupHero() {
  const [active, setActive] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const [paused, setPaused] = useState(false)

  const current = profiles[active]
  const Icon = current.icon
  const previewDelay = current.name.length * NAME_SPEED + GREETING_GAP + current.greeting.length * GREETING_SPEED + PREVIEW_GAP

  useEffect(() => {
    if (paused) return
    setShowPreview(false)
    const previewTimer = setTimeout(() => setShowPreview(true), previewDelay)
    const nextTimer = setTimeout(() => setActive((a) => (a + 1) % profiles.length), CYCLE_MS)
    return () => {
      clearTimeout(previewTimer)
      clearTimeout(nextTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused])

  return (
    <div
      className="relative mx-auto w-full max-w-[500px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{ backgroundColor: `${current.tone}18` }}
        style={{ filter: "blur(90px)" }}
        transition={{ duration: 0.6 }}
      />

      {/* the identity builder panel */}
      <motion.div
        className="relative overflow-hidden rounded-[22px] bg-white"
        style={{ borderWidth: 3.5, borderStyle: "solid", boxShadow: "0 40px 80px -34px rgba(15,23,42,0.28)" }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        animate={{ borderColor: `${current.tone}AA` }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2 rounded-full bg-[#F87171]" />
            <span className="size-2 rounded-full bg-[#FBBF24]" />
            <span className="size-2 rounded-full bg-[#34D399]" />
          </div>
          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            <motion.span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: current.tone }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            Editing identity
          </span>
        </div>

        <div className="space-y-6 p-7">
          {/* avatar picker */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Avatar</p>
            <div className="mt-2 flex gap-2.5">
              {profiles.map((p, i) => {
                const PIcon = p.icon
                const isActive = i === active
                return (
                  <motion.span
                    key={p.name}
                    className="relative flex size-14 items-center justify-center rounded-xl"
                    animate={{
                      backgroundColor: isActive ? p.tone : "#F1F5F9",
                      scale: isActive ? 1.08 : 1,
                      y: isActive ? -2 : 0,
                    }}
                    transition={{ duration: 0.35 }}
                  >
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 rounded-xl"
                        style={{ border: `1.5px solid ${p.tone}` }}
                        initial={{ opacity: 0.6, scale: 1 }}
                        animate={{ opacity: 0, scale: 1.35 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    )}
                    <PIcon className="size-6" style={{ color: isActive ? "white" : "#94A3B8" }} aria-hidden />
                  </motion.span>
                )
              })}
            </div>
          </div>

          {/* name field */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Name</p>
            <div className="mt-2 rounded-xl px-4 py-3.5" style={{ backgroundColor: "#F7F9FC", border: "1px solid #E4ECFF" }}>
              <span className="text-base font-bold" style={{ color: "#0F172A" }}>
                <TypedText key={`name-${active}`} text={current.name} speed={NAME_SPEED} tone={current.tone} />
              </span>
            </div>
          </div>

          {/* greeting field */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Greeting</p>
            <div className="mt-2 min-h-[5rem] rounded-xl px-4 py-3.5" style={{ backgroundColor: "#F7F9FC", border: "1px solid #E4ECFF" }}>
              <span className="text-sm italic leading-relaxed" style={{ color: "#334155" }}>
                <TypedText
                  key={`greeting-${active}`}
                  text={current.greeting}
                  speed={GREETING_SPEED}
                  startDelay={GREETING_GAP + current.name.length * NAME_SPEED}
                  tone={current.tone}
                />
              </span>
            </div>
          </div>
        </div>

        {/* payoff: what the caller actually sees */}
        <div className="flex h-[72px] items-center border-t border-border/60 bg-[#FAFBFF] px-7 py-3">
          <AnimatePresence mode="wait">
            {showPreview ? (
              <motion.div
                key={active}
                className="flex items-center gap-2.5"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <span className="relative flex size-6 items-center justify-center rounded-full" style={{ backgroundColor: `${current.tone}18` }}>
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ border: `1.5px solid ${current.tone}` }}
                    animate={{ opacity: [0.6, 0], scale: [1, 1.6] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: "easeOut" }}
                  />
                  <PhoneIncoming className="size-3" style={{ color: current.tone }} aria-hidden />
                </span>
                <span className="text-xs text-muted-foreground">
                  Caller sees <span className="font-semibold" style={{ color: current.tone }}>{current.name}</span>
                </span>
              </motion.div>
            ) : (
              <motion.div
                key={`building-${active}`}
                className="flex items-center gap-2.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="flex size-6 items-center justify-center rounded-full" style={{ backgroundColor: "#EEF2F7" }}>
                  <motion.span
                    className="size-1.5 rounded-full"
                    style={{ backgroundColor: "#94A3B8" }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                  />
                </span>
                <span className="text-xs text-muted-foreground">Building preview…</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="mt-4 flex justify-center gap-1.5" aria-hidden>
        {profiles.map((p, i) => (
          <span
            key={p.name}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{ width: i === active ? "18px" : "6px", backgroundColor: i === active ? current.tone : "#E4ECFF" }}
          />
        ))}
      </div>
    </div>
  )
}
