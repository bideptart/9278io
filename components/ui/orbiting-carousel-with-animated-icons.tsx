"use client"

import React from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChevronLeft, ChevronRight, PhoneCall } from "lucide-react"

type Capability = {
  id: number
  name: string
  role: string
  meta: string
  photo: string
}

// --- Data: what the AI voice agent handles for BFSI & fintech teams ---
// Photos are themed stock images (Unsplash), not real staff portraits.
const capabilities: Capability[] = [
  {
    id: 1,
    name: "Loan Assistant",
    role: "Loan status & EMI queries",
    meta: "Live in < 3 seconds",
    photo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&q=70&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Fraud Watch",
    role: "Real-time fraud alerts",
    meta: "24/7 monitoring",
    photo: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=200&q=70&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Payment Recovery",
    role: "EMI reminders & collection",
    meta: "10+ Indian languages",
    photo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&q=70&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Credit Desk",
    role: "Credit card & score queries",
    meta: "TRAI compliant",
    photo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&q=70&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "KYC Verifier",
    role: "Identity & document checks",
    meta: "DPDP Act ready",
    photo: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=200&q=70&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Investment Desk",
    role: "Portfolio & SIP queries",
    meta: "Live in under 5 min",
    photo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&q=70&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Wallet Support",
    role: "Balance & transaction help",
    meta: "From ₹10 / minute",
    photo: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=200&q=70&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Escalation Agent",
    role: "Routes to a human expert",
    meta: "Seamless handoff",
    photo: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=200&q=70&auto=format&fit=crop",
  },
]

const safeImage = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.target as HTMLImageElement
  target.src = "https://placehold.co/200x200/E0E7FF/4338CA?text=9278.io"
}

// --- Custom hook for responsive detection ---
const useResponsive = () => {
  const [screenSize, setScreenSize] = React.useState<"xs" | "sm" | "md" | "lg">("lg")

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const checkScreenSize = () => {
      const width = window.innerWidth
      if (width < 480) setScreenSize("xs")
      else if (width < 640) setScreenSize("sm")
      else if (width < 768) setScreenSize("md")
      else setScreenSize("lg")
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  return screenSize
}

// --- Main Component ---
export default function OrbitCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [isHovering, setIsHovering] = React.useState(false)
  const screenSize = useResponsive()

  const getResponsiveValues = () => {
    switch (screenSize) {
      case "xs":
        return {
          containerRadius: 115,
          profileSize: 54,
          cardWidth: "w-44",
          avatarSize: "w-14 h-14",
          avatarMargin: "-mt-9",
          fontSize: { name: "text-sm", role: "text-xs", meta: "text-xs" },
        }
      case "sm":
        return {
          containerRadius: 140,
          profileSize: 62,
          cardWidth: "w-48",
          avatarSize: "w-16 h-16",
          avatarMargin: "-mt-10",
          fontSize: { name: "text-base", role: "text-xs", meta: "text-xs" },
        }
      case "md":
        return {
          containerRadius: 150,
          profileSize: 65,
          cardWidth: "w-48",
          avatarSize: "w-16 h-16",
          avatarMargin: "-mt-10",
          fontSize: { name: "text-base", role: "text-sm", meta: "text-xs" },
        }
      default:
        return {
          containerRadius: 190,
          profileSize: 78,
          cardWidth: "w-56",
          avatarSize: "w-20 h-20",
          avatarMargin: "-mt-12",
          fontSize: { name: "text-lg", role: "text-sm", meta: "text-xs" },
        }
    }
  }

  const { containerRadius, profileSize, cardWidth, avatarSize, avatarMargin, fontSize } = getResponsiveValues()
  const containerSize = containerRadius * 2 + 100
  const isMobile = screenSize === "xs" || screenSize === "sm"

  const getRotation = React.useCallback(
    (index: number): number => (index - activeIndex) * (360 / capabilities.length),
    [activeIndex]
  )

  const next = () => setActiveIndex((i) => (i + 1) % capabilities.length)
  const prev = () => setActiveIndex((i) => (i - 1 + capabilities.length) % capabilities.length)

  const handleProfileClick = React.useCallback(
    (index: number) => {
      if (index === activeIndex) return
      setActiveIndex(index)
    },
    [activeIndex]
  )

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "ArrowLeft") prev()
      else if (event.key === "ArrowRight") next()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  React.useEffect(() => {
    if (isHovering) return

    const interval = setInterval(() => {
      next()
    }, 5000)

    return () => clearInterval(interval)
  }, [isHovering])

  const active = capabilities[activeIndex]

  return (
    <div
      className="relative flex w-full flex-col items-center p-2 sm:min-h-[400px] sm:p-4"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="relative mx-auto flex max-w-full items-center justify-center"
        style={{ width: containerSize, height: containerSize }}
      >
        {/* Active capability card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`z-10 rounded-xl border border-slate-100 bg-white/95 p-3 text-center shadow-xl backdrop-blur-sm sm:p-4 ${cardWidth}`}
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              src={active.photo}
              alt={active.name}
              onError={safeImage}
              className={`mx-auto ${avatarSize} ${avatarMargin} rounded-full border-4 border-white object-cover shadow-md`}
            />
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }}>
              <h3 className={`mt-2 font-bold text-slate-800 ${fontSize.name}`}>{active.name}</h3>
              <div className={`mt-1 flex items-center justify-center gap-1.5 text-slate-600 ${fontSize.role}`}>
                <span className="truncate">{active.role}</span>
              </div>
              <div className={`mt-0.5 flex items-center justify-center gap-1.5 text-blue-600 ${fontSize.meta}`}>
                <PhoneCall size={12} aria-hidden />
                <span className="truncate">{active.meta}</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-2 flex items-center justify-center space-x-1.5 sm:mt-3 sm:space-x-2"
            >
              <button
                onClick={prev}
                aria-label="Previous capability"
                className="rounded-full bg-slate-100 p-1 transition-colors hover:bg-slate-200 sm:p-1.5"
              >
                <ChevronLeft size={14} className="text-slate-700 sm:size-4" />
              </button>
              <span className="rounded-full bg-gradient-to-r from-blue-600 to-sky-600 px-3 py-0.5 text-xs font-semibold text-white sm:px-4 sm:py-1 sm:text-sm">
                Ask the agent
              </span>
              <button
                onClick={next}
                aria-label="Next capability"
                className="rounded-full bg-slate-100 p-1 transition-colors hover:bg-slate-200 sm:p-1.5"
              >
                <ChevronRight size={14} className="text-slate-700 sm:size-4" />
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Orbiting capability photos with counter-rotation */}
        {capabilities.map((c, i) => {
          const rotation = getRotation(i)
          const isActive = i === activeIndex

          // On mobile the active item is already shown large in the center
          // card — keep it out of the ring there so its photo never visually
          // collides with the card's protruding avatar. Desktop keeps the
          // original behavior of showing the active photo in the ring too.
          if (isActive && isMobile) return null

          return (
            <motion.div
              key={c.id}
              animate={{ transform: `rotate(${rotation}deg) translateY(-${containerRadius}px)` }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 20,
                delay: isMobile ? 0 : isActive ? 0 : Math.abs(i - activeIndex) * 0.05,
              }}
              style={{
                width: profileSize,
                height: profileSize,
                position: "absolute",
                top: `calc(50% - ${profileSize / 2}px)`,
                left: `calc(50% - ${profileSize / 2}px)`,
                zIndex: isActive ? 20 : 10,
              }}
            >
              {/* Counter-rotation keeps the photo upright as the ring spins */}
              <motion.div animate={{ rotate: -rotation }} transition={{ type: "spring", stiffness: 150, damping: 20 }} className="size-full">
                <motion.img
                  src={c.photo}
                  alt={c.name}
                  onError={safeImage}
                  onClick={() => handleProfileClick(i)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className={`size-full cursor-pointer rounded-full object-cover shadow-md transition-all duration-300 ${
                    isActive ? "border-4 border-blue-500 shadow-lg" : "border-2 border-white/70 hover:border-blue-300"
                  }`}
                />
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Progress indicator */}
      <div className="mt-4 flex justify-center space-x-1.5 sm:mt-6 sm:space-x-2">
        {capabilities.map((c, index) => (
          <motion.button
            key={c.id}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${c.name}`}
            className={`h-1.5 w-1.5 rounded-full transition-colors sm:h-2 sm:w-2 ${index === activeIndex ? "bg-blue-600" : "bg-slate-300"}`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  )
}
