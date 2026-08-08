"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Type, Palette, MessageCircle, Bot, Headset, Building2, Check } from "lucide-react"

const STEPS = [
  {
    icon: Type,
    label: "Name it",
    detail: "Give it a name that matches your business — callers hear it, your team recognizes it.",
    tone: "#2563EB",
  },
  {
    icon: Palette,
    label: "Pick an avatar",
    detail: "Choose a look that shows up across your dashboard and reports.",
    tone: "#0EA5E9",
  },
  {
    icon: MessageCircle,
    label: "Write the greeting",
    detail: "Script exactly what every caller hears first, in your own words.",
    tone: "#D97706",
  },
]

const AVATARS = [Bot, Headset, Building2]
const NAME = "Front Desk Agent"
const GREETING = "Hi, thanks for calling — how can I help today?"
const STEP_MS = 2000

function useReveal(text: string, active: boolean, speed: number, startDelay = 0) {
  const [shown, setShown] = useState("")
  useEffect(() => {
    if (!active) {
      setShown("")
      return
    }
    let i = 0
    let interval: ReturnType<typeof setInterval>
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i++
        setShown(text.slice(0, i))
        if (i >= text.length) clearInterval(interval)
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [text, active, speed, startDelay])
  return shown
}

function Cursor({ tone, hide }: { tone: string; hide: boolean }) {
  if (hide) return null
  return (
    <motion.span
      className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5"
      style={{ backgroundColor: tone }}
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
    />
  )
}

export function IdentityWizard() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % STEPS.length), STEP_MS)
    return () => clearInterval(id)
  }, [paused])

  const nameText = useReveal(NAME, active === 0, 28)
  const greetingText = useReveal(GREETING, active === 2, 14)
  const current = STEPS[active]
  const CurrentIcon = current.icon

  return (
    <div
      className="mx-auto mt-12 w-full overflow-hidden rounded-[24px] border border-border/60 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* segmented progress header */}
      <div className="grid grid-cols-3">
        {STEPS.map((s, i) => {
          const isActive = active === i
          const isDone = active > i
          return (
            <button
              key={s.label}
              type="button"
              onClick={() => setActive(i)}
              className="relative flex flex-col items-center gap-2 border-b border-r border-border/60 px-3 py-4 text-center last:border-r-0"
            >
              <span className="absolute inset-x-0 bottom-0 h-[3px] overflow-hidden bg-[#EEF2F7]" aria-hidden>
                <motion.span
                  className="block h-full"
                  style={{ backgroundColor: s.tone }}
                  initial={false}
                  animate={{ width: isDone ? "100%" : isActive ? (paused ? "0%" : "100%") : "0%" }}
                  transition={{ duration: isActive && !paused ? STEP_MS / 1000 : 0.3, ease: "linear" }}
                />
              </span>
              <motion.span
                className="relative flex size-9 items-center justify-center rounded-full"
                animate={{
                  backgroundColor: isActive || isDone ? s.tone : "#F1F5F9",
                  scale: isActive ? 1.08 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {isActive && (
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ border: `1.5px solid ${s.tone}` }}
                    initial={{ opacity: 0.6, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.55 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                {isDone ? (
                  <Check className="size-4 text-white" aria-hidden />
                ) : (
                  <s.icon className="size-4" style={{ color: isActive ? "white" : "#94A3B8" }} aria-hidden />
                )}
              </motion.span>
              <span className="text-xs font-semibold" style={{ color: isActive ? s.tone : "#64748B" }}>
                {s.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* unified content panel */}
      <div className="h-[320px] overflow-hidden sm:h-[200px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid gap-8 p-7 sm:grid-cols-[0.9fr_1.1fr] sm:items-center md:p-9"
        >
          <div>
            <span className="flex size-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${current.tone}16` }}>
              <CurrentIcon className="size-5" style={{ color: current.tone }} aria-hidden />
            </span>
            <h3 className="mt-4 text-lg font-bold text-foreground">{current.label}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{current.detail}</p>
          </div>

          <div>
            {active === 0 && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Agent name</p>
                <div className="mt-2 rounded-xl px-4 py-3.5" style={{ backgroundColor: "#F7F9FC", border: "1px solid #E4ECFF" }}>
                  <span className="text-base font-bold" style={{ color: "#0F172A" }}>
                    {nameText}
                    <Cursor tone={current.tone} hide={nameText.length === NAME.length} />
                  </span>
                </div>
              </div>
            )}

            {active === 1 && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Avatar</p>
                <div className="mt-2 grid grid-cols-3 gap-3">
                  {AVATARS.map((AvIcon, i) => {
                    const selected = i === 0
                    return (
                      <motion.div
                        key={i}
                        className="relative flex flex-col items-center gap-2 rounded-xl border p-4"
                        style={{ borderColor: selected ? current.tone : "#EEF2F7", backgroundColor: selected ? `${current.tone}0F` : "#F7F9FC" }}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0, scale: selected ? 1.05 : 1 }}
                        transition={{ duration: 0.3, delay: 0.1 + i * 0.08 }}
                      >
                        {selected && (
                          <motion.span
                            className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full text-white"
                            style={{ backgroundColor: current.tone }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.45, type: "spring", stiffness: 500, damping: 20 }}
                          >
                            <Check className="size-3" aria-hidden />
                          </motion.span>
                        )}
                        <AvIcon className="size-5" style={{ color: selected ? current.tone : "#94A3B8" }} aria-hidden />
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}

            {active === 2 && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Greeting</p>
                <div className="mt-2 min-h-[4.5rem] rounded-xl px-4 py-3.5" style={{ backgroundColor: "#F7F9FC", border: "1px solid #E4ECFF" }}>
                  <span className="text-sm italic leading-relaxed" style={{ color: "#334155" }}>
                    {greetingText}
                    <Cursor tone={current.tone} hide={greetingText.length === GREETING.length} />
                  </span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
      </div>

      {/* persistent completion tracker */}
      <div className="flex items-center gap-2 border-t border-border/60 bg-[#FAFBFF] px-7 py-3 md:px-9">
        {STEPS.map((s, i) => {
          return (
            <span key={s.label} className="flex items-center gap-1.5 text-xs font-medium" style={{ color: active >= i ? "#0F172A" : "#94A3B8" }}>
              <motion.span
                className="flex size-4 items-center justify-center rounded-full"
                animate={{ backgroundColor: active >= i ? s.tone : "#E4ECFF" }}
                transition={{ duration: 0.3 }}
              >
                {active >= i && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}>
                    <Check className="size-2.5 text-white" aria-hidden />
                  </motion.span>
                )}
              </motion.span>
              {s.label}
              {i < STEPS.length - 1 && <span className="ml-1 text-[#CBD5E1]">·</span>}
            </span>
          )
        })}
      </div>
    </div>
  )
}
