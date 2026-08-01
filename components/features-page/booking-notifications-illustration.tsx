"use client"

import { motion } from "motion/react"
import { AtSign, Bell, Calendar, Check, MessageCircle, MessageSquare, Send, Smartphone } from "lucide-react"
import type { ReactNode } from "react"

type Channel = {
  id: string
  icon: ReactNode
  iconBg: string
  accent: string
  glow: string
  title: string
  detail: string
  top: number
  left: number
  width: number
  pathD: string
  dotAt: [number, number]
}

const CHANNELS: Channel[] = [
  {
    id: "email",
    icon: <AtSign className="size-5" aria-hidden />,
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-700",
    accent: "bg-blue-500",
    glow: "oklch(0.55 0.2 262 / 0.55)",
    title: "Email Sent",
    detail: "Booking notification has been emailed",
    top: 6,
    left: 232,
    width: 210,
    pathD: "M260,165 C268,138 254,112 250,92",
    dotAt: [255, 122],
  },
  {
    id: "meeting",
    icon: <Calendar className="size-5" aria-hidden />,
    iconBg: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    accent: "bg-emerald-500",
    glow: "oklch(0.72 0.18 155 / 0.55)",
    title: "Meeting Booked",
    detail: "Your agent has booked a new meeting",
    top: 172,
    left: 4,
    width: 186,
    pathD: "M205,220 C198,212 194,205 190,201",
    dotAt: [198, 213],
  },
  {
    id: "sms",
    icon: <MessageSquare className="size-5" aria-hidden />,
    iconBg: "bg-gradient-to-br from-violet-500 to-violet-700",
    accent: "bg-violet-500",
    glow: "oklch(0.55 0.2 300 / 0.55)",
    title: "SMS Delivered",
    detail: "Notification SMS has been sent",
    top: 186,
    left: 330,
    width: 182,
    pathD: "M315,220 C322,213 326,207 330,203",
    dotAt: [320, 213],
  },
  {
    id: "push",
    icon: <Smartphone className="size-5" aria-hidden />,
    iconBg: "bg-gradient-to-br from-amber-400 to-amber-600",
    accent: "bg-amber-500",
    glow: "oklch(0.78 0.16 75 / 0.55)",
    title: "Push Notification",
    detail: "Push notification has been delivered",
    top: 344,
    left: 232,
    width: 205,
    pathD: "M260,275 C258,302 284,328 300,344",
    dotAt: [270, 310],
  },
]

/** Gentle continuous float — matches the treatment used across the other feature illustrations. */
function Float({ children, delay = 0, duration = 4.5, className = "" }: { children: ReactNode; delay?: number; duration?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1, y: [-5, 5, -5] }}
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

/**
 * Illustration for the Booking Notifications feature page — a central
 * pulsing bell "hub" with four notification-channel cards (email, SMS,
 * push, and the meeting-booked event) radiating out on animated dashed
 * paths, plus three decorative floating channel-icon bubbles and corner
 * dot grids. Sized to stay fully inside its hero column — every card,
 * bubble, and orbit ring is placed within the 520×440 canvas so nothing
 * clips against the page or overlaps fixed chrome.
 */
export function BookingNotificationsIllustration() {
  return (
    <div className="relative mx-auto h-[440px] w-full max-w-[520px]">
      {/* corner dot grids */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-4 -top-4 -z-10 size-32 opacity-60"
        style={{
          backgroundImage: "radial-gradient(oklch(0.6 0.19 262.88 / 0.25) 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-4 -left-4 -z-10 size-32 opacity-60"
        style={{
          backgroundImage: "radial-gradient(oklch(0.6 0.19 262.88 / 0.25) 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }}
      />

      {/* dashed connector paths, hub → each channel card */}
      <svg aria-hidden viewBox="0 0 520 440" className="pointer-events-none absolute inset-0 size-full">
        <motion.circle
          cx={260}
          cy={220}
          r={100}
          fill="none"
          stroke="oklch(0.7 0.03 262 / 0.35)"
          strokeWidth={1}
          strokeDasharray="2 6"
          style={{ transformOrigin: "260px 220px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx={260}
          cy={220}
          r={135}
          fill="none"
          stroke="oklch(0.7 0.03 262 / 0.22)"
          strokeWidth={1}
          strokeDasharray="2 6"
          style={{ transformOrigin: "260px 220px" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        />
        {CHANNELS.map((c, i) => (
          <motion.path
            key={c.id}
            d={c.pathD}
            fill="none"
            stroke="oklch(0.546 0.215 262.88 / 0.4)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeDasharray="1 9"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
          />
        ))}
        {CHANNELS.map((c, i) => (
          <motion.circle
            key={`dot-${c.id}`}
            cx={c.dotAt[0]}
            cy={c.dotAt[1]}
            r={3}
            fill="oklch(0.546 0.215 262.88 / 0.7)"
            animate={{ scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            style={{ transformOrigin: `${c.dotAt[0]}px ${c.dotAt[1]}px` }}
          />
        ))}
      </svg>

      {/* central hub */}
      <div className="absolute" style={{ top: 220 - 55, left: 260 - 55 }}>
        <motion.div
          aria-hidden
          className="absolute inset-[-40px] rounded-full bg-primary/25 blur-[45px]"
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative flex size-[110px] items-center justify-center rounded-full border border-border/60 bg-white shadow-[0_24px_60px_-24px_oklch(0.2_0.05_260/0.4)]"
        >
          <motion.span
            animate={{ rotate: [0, -12, 10, -6, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 3.6, ease: "easeInOut" }}
            className="text-primary"
          >
            <Bell className="size-9" aria-hidden />
          </motion.span>
        </motion.div>
      </div>

      {/* channel cards */}
      {CHANNELS.map((c, i) => (
        <Float key={c.id} delay={0.2 + i * 0.12} duration={4 + i * 0.3} className="absolute z-20 hidden sm:block">
          <div style={{ position: "relative", top: c.top, left: c.left, width: c.width }}>
            <div className="relative flex items-center gap-2.5 rounded-2xl border border-border/70 bg-white py-3 pl-4 pr-3 shadow-[0_16px_34px_-18px_oklch(0.2_0.05_260/0.4)]">
              <span aria-hidden className={`absolute inset-y-0 left-0 w-1 rounded-l-2xl ${c.accent}`} />
              <span
                className={`relative flex size-9 shrink-0 items-center justify-center rounded-full text-white shadow-[0_10px_20px_-8px_var(--tw-shadow-color)] ${c.iconBg}`}
                style={{ ["--tw-shadow-color" as string]: c.glow }}
              >
                {c.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold leading-tight text-foreground">{c.title}</p>
                <p className="truncate text-[11px] leading-snug text-muted-foreground">{c.detail}</p>
              </div>
              <motion.span
                className="absolute -right-1.5 -top-1.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white"
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5.5, ease: "easeOut", delay: i * 0.3 }}
              >
                <Check className="size-3" aria-hidden />
              </motion.span>
            </div>
          </div>
        </Float>
      ))}

      {/* decorative floating channel bubbles */}
      <Float delay={0.5} duration={4.2} className="absolute left-[148px] top-[108px] z-10 hidden sm:block">
        <span className="flex size-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <Send className="size-5" aria-hidden />
        </span>
      </Float>
      <Float delay={0.7} duration={4.6} className="absolute left-[118px] top-[298px] z-10 hidden sm:block">
        <span className="flex size-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <MessageCircle className="size-5" aria-hidden />
        </span>
      </Float>
      <Float delay={0.9} duration={5} className="absolute left-[458px] top-[10px] z-10 hidden sm:block">
        <span className="flex size-12 items-center justify-center rounded-full bg-violet-100 text-violet-600">
          <AtSign className="size-6" aria-hidden />
        </span>
      </Float>
    </div>
  )
}
