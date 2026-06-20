"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  AudioLines, Languages, MessageCircle, Network,
  CalendarClock, PhoneForwarded, Mic, Timer, Activity,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

type Feature = {
  id: string
  label: string
  icon: LucideIcon
  image: string
  description: string
}

const FEATURES: Feature[] = [
  {
    id: "latency",
    label: "Sub-300ms Latency",
    icon: AudioLines,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
    description: "Real-time WebRTC audio on India's media network — zero perceptible lag.",
  },
  {
    id: "languages",
    label: "10+ Indian Languages",
    icon: Languages,
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200",
    description: "Native voices in Hindi, Tamil, Telugu, Marathi, Bengali and more.",
  },
  {
    id: "turn-taking",
    label: "Natural Turn-Taking",
    icon: MessageCircle,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200",
    description: "Smart endpointing and barge-in detection — it talks like a person.",
  },
  {
    id: "concurrency",
    label: "Massive Concurrency",
    icon: Network,
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200",
    description: "Scale from one call to thousands, with burst capacity built in.",
  },
  {
    id: "scheduling",
    label: "Call Scheduling",
    icon: CalendarClock,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200",
    description: "Set calling windows; TRAI calling-window rules enforced automatically.",
  },
  {
    id: "forwarding",
    label: "Call Forwarding",
    icon: PhoneForwarded,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200",
    description: "Route any call to a human, department, or external number in real time.",
  },
  {
    id: "recording",
    label: "Call Recording",
    icon: Mic,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
    description: "Every call recorded, encrypted, and stored securely in India.",
  },
  {
    id: "billing",
    label: "Per Second Billing",
    icon: Timer,
    image: "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?q=80&w=1200",
    description: "Pay only for the seconds your agent actually speaks — no rounding.",
  },
  {
    id: "analytics",
    label: "Real-time Analytics",
    icon: Activity,
    image: "https://images.unsplash.com/photo-1551288049-bbda38a10ad5?q=80&w=1200",
    description: "Speaker labels, sentiment, and intents — searchable from day one.",
  },
]

const AUTO_PLAY_INTERVAL = 3000
const ITEM_HEIGHT = 65

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

export function FeatureCarousel() {
  const [step, setStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const currentIndex =
    ((step % FEATURES.length) + FEATURES.length) % FEATURES.length

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1)
  }, [])

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length
    if (diff > 0) setStep((s) => s + diff)
  }

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL)
    return () => clearInterval(interval)
  }, [nextStep, isPaused])

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex
    const len = FEATURES.length

    let normalizedDiff = diff
    if (diff > len / 2) normalizedDiff -= len
    if (diff < -len / 2) normalizedDiff += len

    if (normalizedDiff === 0) return "active"
    if (normalizedDiff === -1) return "prev"
    if (normalizedDiff === 1) return "next"
    return "hidden"
  }

  return (
    <div className="mx-auto w-full max-w-7xl md:p-8">
      <div className="relative flex min-h-[600px] flex-col overflow-hidden rounded-[2.5rem] border border-border/40 lg:aspect-video lg:flex-row lg:rounded-[4rem]">
        <div className="relative z-30 flex min-h-[350px] w-full flex-col items-start justify-center overflow-hidden bg-primary px-8 md:min-h-[450px] md:px-16 lg:h-full lg:w-[40%] lg:pl-16">
          <div className="absolute inset-x-0 top-0 z-40 h-12 bg-gradient-to-b from-primary via-primary/80 to-transparent md:h-20 lg:h-16" />
          <div className="absolute inset-x-0 bottom-0 z-40 h-12 bg-gradient-to-t from-primary via-primary/80 to-transparent md:h-20 lg:h-16" />
          <div className="relative z-20 flex h-full w-full items-center justify-center lg:justify-start">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon
              const isActive = index === currentIndex
              const distance = index - currentIndex
              const wrappedDistance = wrap(
                -(FEATURES.length / 2),
                FEATURES.length / 2,
                distance,
              )

              return (
                <motion.div
                  key={feature.id}
                  style={{
                    height: ITEM_HEIGHT,
                    width: "fit-content",
                  }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "group relative flex items-center gap-4 rounded-full border px-6 py-3.5 text-left transition-all duration-700 md:px-10 md:py-5 lg:px-8 lg:py-4",
                      isActive
                        ? "z-10 border-white bg-white text-primary"
                        : "border-white/20 bg-transparent text-white/60 hover:border-white/40 hover:text-white",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center transition-colors duration-500",
                        isActive ? "text-primary" : "text-white/40",
                      )}
                    >
                      <Icon size={18} strokeWidth={2} aria-hidden />
                    </div>

                    <span className="whitespace-nowrap text-sm font-normal uppercase tracking-tight md:text-[15px]">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="relative flex min-h-[500px] flex-1 items-center justify-center overflow-hidden border-t border-border/20 bg-secondary/30 px-6 py-16 md:min-h-[600px] md:px-12 md:py-24 lg:h-full lg:border-l lg:border-t-0 lg:px-10 lg:py-16">
          <div className="relative flex aspect-[4/5] w-full max-w-[420px] items-center justify-center">
            {FEATURES.map((feature, index) => {
              const status = getCardStatus(index)
              const isActive = status === "active"
              const isPrev = status === "prev"
              const isNext = status === "next"

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className="absolute inset-0 origin-center overflow-hidden rounded-[2rem] border-4 border-background bg-background md:rounded-[2.8rem] md:border-8"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className={cn(
                      "h-full w-full object-cover transition-all duration-700",
                      isActive
                        ? "blur-0 grayscale-0"
                        : "blur-[2px] brightness-75 grayscale",
                    )}
                  />

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-10 pt-32"
                      >
                        <div className="mb-3 w-fit rounded-full border border-border/50 bg-background px-4 py-1.5 text-[11px] font-normal uppercase tracking-[0.2em] text-foreground shadow-lg">
                          {index + 1} • {feature.label}
                        </div>
                        <p className="text-xl font-normal leading-tight tracking-tight text-white drop-shadow-md md:text-2xl">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className={cn(
                      "absolute left-8 top-8 flex items-center gap-3 transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_10px_white]" />
                    <span className="font-mono text-[10px] font-normal uppercase tracking-[0.3em] text-white/80">
                      Live Session
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureCarousel
