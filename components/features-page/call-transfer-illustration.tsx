"use client"

import { motion } from "motion/react"
import { Phone, PhoneForwarded, UserRound } from "lucide-react"

const CURVE = "M0 12 Q60 -10 120 12"

/** Gentle continuous float — matches the treatment used across the other feature illustrations. */
function Float({
  children,
  delay = 0,
  duration = 4.5,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1, y: [-6, 6, -6] }}
      transition={{
        opacity: { duration: 0.4, delay, ease: "easeOut" },
        scale: { duration: 0.4, delay, ease: "easeOut" },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay: delay + 0.4 },
      }}
    >
      {children}
    </motion.div>
  )
}

/** A single expanding, fading ripple ring. */
function Ripple({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      className="absolute inset-0 rounded-full border-2 border-primary/50"
      initial={{ scale: 0.7, opacity: 0.7 }}
      animate={{ scale: 2.2, opacity: 0 }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay }}
    />
  )
}

/** A tiny drifting sparkle dot, scattered around the composition for texture. */
function Sparkle({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.span
      className={`absolute rounded-full bg-primary/40 ${className}`}
      animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay }}
    />
  )
}

/** A dot orbiting the hub at a fixed radius, its own speed and direction. */
function Orbiter({ radius, size, duration, reverse = false, delay = 0 }: { radius: number; size: number; duration: number; reverse?: boolean; delay?: number }) {
  return (
    <motion.div
      aria-hidden
      className="absolute inset-0"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
    >
      <span
        className="absolute left-1/2 top-1/2 rounded-full bg-white shadow-[0_0_8px_2px_oklch(0.546_0.215_262.88/0.55)]"
        style={{ width: size, height: size, transform: `translate(-50%, -50%) translateY(-${radius}px)` }}
      />
    </motion.div>
  )
}

/**
 * Illustration for the Call Transfer Tool feature page — a mostly-visual
 * composition instead of an app-panel mockup: a large phone-forward icon at
 * the center with layered ripple rings, a dual-speed rotating halo, and
 * orbiting satellites (an active call), plus a caller and an agent icon on
 * either side connected by curved, glowing traveling-dot paths.
 */
export function CallTransferIllustration() {
  return (
    <div className="relative mx-auto flex w-full max-w-[520px] items-center justify-center py-10 sm:py-14 lg:mr-6">
      {/* grounding shadow beneath the whole stage */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-6 left-1/2 h-8 w-[70%] -translate-x-1/2 rounded-full bg-[oklch(0.2_0.05_260/0.18)] blur-xl"
      />

      {/* ambient glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-primary/15 blur-[70px]"
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* faint dot-grid texture, masked toward the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage: "radial-gradient(oklch(0.6 0.19 262.88 / 0.18) 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      <Sparkle className="left-[6%] top-[10%] size-1.5" delay={0.2} />
      <Sparkle className="right-[8%] top-[16%] size-1" delay={1} />
      <Sparkle className="bottom-[16%] left-[14%] size-1" delay={1.8} />
      <Sparkle className="bottom-[10%] right-[10%] size-1.5" delay={0.7} />

      <div className="relative p-3 sm:p-8">
      <div className="flex w-full items-center justify-between gap-1 sm:gap-0">
        {/* caller, left */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex shrink-0 flex-col items-center gap-2.5"
        >
          <span className="relative flex size-12 shrink-0 items-center justify-center sm:size-20">
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full border border-primary/40"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
            <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-white to-primary/[0.06] text-primary shadow-[0_14px_28px_-14px_rgba(15,23,42,0.3)] ring-1 ring-inset ring-primary/15 transition-shadow duration-300 hover:shadow-[0_18px_36px_-14px_rgba(37,99,235,0.4)] sm:size-20">
              {/* glossy top highlight */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{ background: "linear-gradient(160deg, white 0%, transparent 45%)", opacity: 0.5 }}
              />
              <Phone className="relative size-4 shrink-0 sm:size-7" aria-hidden />
            </span>
          </span>
          {/* live audio waveform */}
          <div className="flex h-4 items-end gap-[3px]" aria-hidden>
            {[0.4, 0.9, 0.6, 1, 0.5].map((h, i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-primary/50"
                animate={{ scaleY: [h * 0.5, h, h * 0.5] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
                style={{ height: "100%", transformOrigin: "bottom" }}
              />
            ))}
          </div>
          <span className="rounded-full bg-white/70 px-2 py-0.5 text-xs font-semibold text-muted-foreground shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:px-2.5 sm:py-1 sm:text-sm">
            Caller
          </span>
        </motion.div>

        {/* connecting path, left half */}
        <svg viewBox="0 0 120 24" preserveAspectRatio="none" className="h-6 min-w-0 flex-1 overflow-visible" aria-hidden>
          <path d={CURVE} fill="none" stroke="oklch(0.546 0.215 262.88 / 0.3)" strokeWidth="1.5" strokeDasharray="3 4" />
          <motion.circle
            r="7"
            fill="oklch(0.546 0.215 262.88 / 0.25)"
            style={{ offsetPath: `path('${CURVE}')` }}
            animate={{ offsetDistance: ["0%", "100%"] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.3 }}
          />
          <motion.circle
            r="3.5"
            fill="oklch(0.546 0.215 262.88)"
            style={{ offsetPath: `path('${CURVE}')` }}
            animate={{ offsetDistance: ["0%", "100%"] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.3 }}
          />
        </svg>

        {/* center hub — active call, with layered rings, dual-speed halo, and orbiting satellites */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="relative flex size-20 shrink-0 items-center justify-center sm:size-32"
        >
          <motion.span
            aria-hidden
            className="absolute -inset-5 rounded-full bg-primary/25 blur-2xl"
            animate={{ opacity: [0.4, 0.75, 0.4] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* outer, slower, reverse-spinning halo */}
          <motion.span
            aria-hidden
            className="absolute -inset-4 rounded-full opacity-40"
            style={{
              background:
                "conic-gradient(from 0deg, oklch(0.546 0.215 262.88 / 0.4), transparent 25%, transparent 75%, oklch(0.546 0.215 262.88 / 0.4))",
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          />
          {/* inner, faster halo */}
          <motion.span
            aria-hidden
            className="absolute -inset-2 rounded-full opacity-70"
            style={{
              background:
                "conic-gradient(from 0deg, oklch(0.546 0.215 262.88 / 0.5), transparent 30%, transparent 70%, oklch(0.546 0.215 262.88 / 0.5))",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
          <Ripple delay={0} />
          <Ripple delay={0.9} />
          <Ripple delay={1.8} />
          <Orbiter radius={54} size={7} duration={4} />
          <Orbiter radius={62} size={4} duration={6} reverse delay={0.5} />
          <motion.span
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary to-[oklch(0.45_0.19_264)] text-white shadow-[0_18px_40px_oklch(0.546_0.215_262.88/0.45)] sm:size-24"
          >
            {/* glossy top highlight */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{ background: "linear-gradient(160deg, white 0%, transparent 50%)", opacity: 0.25 }}
            />
            <PhoneForwarded className="relative size-5 shrink-0 sm:size-9" aria-hidden />
          </motion.span>
        </motion.div>

        {/* connecting path, right half */}
        <svg viewBox="0 0 120 24" preserveAspectRatio="none" className="h-6 min-w-0 flex-1 overflow-visible" aria-hidden>
          <path d={CURVE} fill="none" stroke="oklch(0.546 0.215 262.88 / 0.3)" strokeWidth="1.5" strokeDasharray="3 4" />
          <motion.circle
            r="7"
            fill="oklch(0.546 0.215 262.88 / 0.25)"
            style={{ offsetPath: `path('${CURVE}')` }}
            animate={{ offsetDistance: ["0%", "100%"] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut", delay: 0.65, repeatDelay: 0.3 }}
          />
          <motion.circle
            r="3.5"
            fill="oklch(0.546 0.215 262.88)"
            style={{ offsetPath: `path('${CURVE}')` }}
            animate={{ offsetDistance: ["0%", "100%"] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut", delay: 0.65, repeatDelay: 0.3 }}
          />
        </svg>

        {/* agent, right */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="flex shrink-0 flex-col items-center gap-2.5"
        >
          <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-white to-primary/[0.06] text-primary shadow-[0_14px_28px_-14px_rgba(15,23,42,0.3)] ring-1 ring-inset ring-primary/15 transition-shadow duration-300 hover:shadow-[0_18px_36px_-14px_rgba(37,99,235,0.4)] sm:size-20">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{ background: "linear-gradient(160deg, white 0%, transparent 45%)", opacity: 0.5 }}
            />
            <UserRound className="relative size-4 shrink-0 sm:size-7" aria-hidden />
          </span>
          <span className="rounded-full bg-white/70 px-2 py-0.5 text-xs font-semibold text-foreground shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:px-2.5 sm:py-1 sm:text-sm">
            Agent
          </span>
        </motion.div>
      </div>
      </div>

      {/* floating "transferred" chip, above */}
      <Float delay={0.3} duration={4.2} className="absolute -top-1 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-full border border-border/70 bg-white px-4 py-2.5 shadow-[0_16px_34px_-18px_oklch(0.2_0.05_260/0.4)]">
          <span className="size-2.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden />
          <span className="text-sm font-semibold text-foreground">Transferred in 1.8s</span>
        </div>
      </Float>
    </div>
  )
}
