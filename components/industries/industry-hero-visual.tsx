"use client"

import { motion } from "motion/react"
import { Phone, MessageCircle } from "lucide-react"

const LANGUAGE_CHIPS = [
  { text: "नमस्ते", cls: "top-2 left-6 sm:left-10", avatarBg: "bg-violet-600", delay: 0.2 },
  { text: "வணக்கம்", cls: "top-[26%] -right-2 sm:right-2", avatarBg: "bg-emerald-500", delay: 1.1 },
  { text: "Hello · నమస్తే", cls: "-bottom-2 left-1/2 -translate-x-1/2", avatarBg: "bg-violet-600", delay: 2 },
]

const ICON_DOTS = [
  { Icon: Phone, cls: "top-[38%] -left-2 sm:left-2", bg: "bg-primary", delay: 0.6 },
  { Icon: MessageCircle, cls: "bottom-[16%] -right-1 sm:right-3", bg: "bg-orange-500", delay: 1.6 },
]

const DECOR_DOTS = [
  { cls: "top-6 right-[30%]", size: "size-2.5", bg: "bg-primary" },
  { cls: "top-1/2 -left-4", size: "size-2", bg: "bg-violet-400" },
  { cls: "top-[42%] -right-6", size: "size-2", bg: "bg-teal-400" },
]

const WAVEFORM = [10, 18, 26, 16, 30, 20, 12, 24, 14]

/**
 * Circular voice-AI illustration for the industries hero: a dotted "world
 * map" disc inside concentric orbit rings, a glowing waveform core on a
 * 3D podium, and floating multilingual chat-bubble chips + icon avatars
 * orbiting around it (all gently animated with motion).
 */
export function IndustryHeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px]">
      {/* outer dashed ring, slowly rotating */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full border border-dashed border-primary/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      {/* inner solid ring */}
      <div aria-hidden className="absolute inset-[13%] rounded-full border border-primary/15" />

      {/* dotted "world map" disc */}
      <div
        aria-hidden
        className="absolute inset-[6%] overflow-hidden rounded-full bg-gradient-to-br from-primary/[0.06] via-sky-50 to-primary/[0.08] shadow-inner"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#93c5fd_1px,transparent_1px)] bg-[length:14px_14px] opacity-40" />
      </div>

      {/* decorative dotted square accent, top-right */}
      <div
        aria-hidden
        className="absolute right-2 top-2 grid grid-cols-4 gap-1.5 opacity-50 sm:right-4 sm:top-4"
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className="size-1 rounded-full bg-primary/50" />
        ))}
      </div>

      {/* decorative floating dots */}
      {DECOR_DOTS.map(({ cls, size, bg }, i) => (
        <motion.span
          key={i}
          className={`absolute z-20 rounded-full ${size} ${bg} ${cls}`}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        />
      ))}

      {/* icon-only avatar bubbles (phone / message) */}
      {ICON_DOTS.map(({ Icon, cls, bg, delay }, i) => (
        <motion.span
          key={i}
          className={`absolute z-30 grid size-11 place-items-center rounded-full bg-white shadow-lg ${cls}`}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <span className={`grid size-8 place-items-center rounded-full text-white ${bg}`}>
            <Icon className="size-4" aria-hidden />
          </span>
        </motion.span>
      ))}

      {/* language chat-bubble chips */}
      {LANGUAGE_CHIPS.map(({ text, cls, avatarBg, delay }, i) => (
        <motion.span
          key={i}
          className={`absolute z-30 flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-4 shadow-lg ${cls}`}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <span className={`grid size-7 shrink-0 place-items-center rounded-full text-white ${avatarBg}`}>
            <MessageCircle className="size-3.5" aria-hidden />
          </span>
          <span className="whitespace-nowrap text-sm font-semibold text-foreground">{text}</span>
        </motion.span>
      ))}

      {/* central podium + glowing waveform core */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          className="relative z-20 grid size-32 place-items-center rounded-full bg-white shadow-2xl shadow-primary/20 ring-8 ring-primary/10 sm:size-36"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex h-9 items-end gap-1" aria-hidden>
            {WAVEFORM.map((h, i) => (
              <motion.span
                key={i}
                className="w-1.5 rounded-full bg-primary"
                style={{ height: h }}
                animate={{ scaleY: [0.4, 1, 0.4] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }}
              />
            ))}
          </div>
        </motion.div>

        {/* 3D podium beneath the core */}
        <div className="relative z-10 -mt-2 flex flex-col items-center">
          <div className="h-3 w-40 rounded-[50%] bg-white shadow-lg sm:w-48" />
          <div className="-mt-1.5 h-3.5 w-52 rounded-[50%] bg-gradient-to-b from-white to-primary/20 shadow-xl sm:w-60" />
          <div
            aria-hidden
            className="mt-1 h-2 w-44 rounded-full bg-primary/30 blur-md sm:w-52"
          />
        </div>
      </div>
    </div>
  )
}
