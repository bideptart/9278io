"use client"

import { motion } from "motion/react"
import { Bell, Calendar, CheckCircle2, Contact2, Folder, Inbox, Mail, MoveRight, Reply, Sparkles, Trash2, User } from "lucide-react"
import { MouseGlowCard } from "@/components/animation/mouse-glow-card"

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

const DETAIL_ROWS = [
  { icon: User, label: "Agent", value: "Ravi Sharma" },
  { icon: Calendar, label: "Date & Time", value: "May 29, 2025 at 10:30 AM" },
  { icon: Contact2, label: "Contact", value: "Neha Verma" },
  { icon: Sparkles, label: "Purpose", value: "Product Demo" },
]

/**
 * Illustration for the Booking Notifications feature page — an email-inbox
 * card (toolbar, subject line, a confirmation banner, and a booking-detail
 * table) with a "New Booking Alert" toast arriving above it and floating
 * mail-icon badges connected by dashed paths. Same flat-mockup technique
 * used on the Analytics Dashboard and Booking History illustrations,
 * themed around this feature's actual email notification.
 */
export function BookingNotificationsIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[500px] lg:mr-4">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-8 -z-10 rounded-full bg-primary/20 blur-[60px]"
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-4 -top-2 -z-10 size-40 opacity-60"
        style={{
          backgroundImage: "radial-gradient(oklch(0.6 0.19 262.88 / 0.25) 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }}
      />

      {/* inbox card */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
        <MouseGlowCard
          tiltStrength={3}
          glowSize={280}
          glowColor="oklch(0.6 0.19 262.88 / 0.16)"
          className="relative overflow-hidden rounded-3xl border-border/60 bg-white shadow-[0_30px_70px_-30px_oklch(0.2_0.05_260/0.35)] backdrop-blur-0"
        >
          {/* toolbar */}
          <div className="flex items-center justify-between border-b border-border/60 bg-primary/[0.06] px-5 py-3.5">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
              <Inbox className="size-4 text-primary" aria-hidden />
              Inbox
            </div>
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <Reply className="size-4" aria-hidden />
              <Trash2 className="size-4" aria-hidden />
              <Mail className="size-4" aria-hidden />
              <Folder className="size-4" aria-hidden />
            </div>
          </div>

          <div className="p-6">
            {/* subject row */}
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Calendar className="size-5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-foreground">Meeting Booked Successfully</p>
                  <span className="shrink-0 text-xs text-muted-foreground">10:30 AM</span>
                </div>
                <p className="text-xs text-muted-foreground">to you</p>
              </div>
            </div>

            {/* confirmation banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-4 flex items-start gap-3 rounded-xl bg-emerald-50 p-4"
            >
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" aria-hidden />
              <p className="text-xs leading-relaxed text-emerald-900">
                Your agent has booked a new meeting. Here are the details.
              </p>
            </motion.div>

            {/* details table */}
            <div className="mt-4 space-y-3 rounded-xl border border-border/60 p-4">
              {DETAIL_ROWS.map((r, i) => {
                const Icon = r.icon
                return (
                  <motion.div
                    key={r.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.4 + i * 0.08 }}
                    className="flex items-center justify-between gap-2 text-xs"
                  >
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Icon className="size-4" aria-hidden />
                      {r.label}
                    </span>
                    <span className="truncate font-medium text-foreground">{r.value}</span>
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
              View all bookings
              <MoveRight className="size-3.5" aria-hidden />
            </div>
          </div>
          <div className="h-6" aria-hidden />
        </MouseGlowCard>
      </motion.div>

      {/* "New Booking Alert" toast, top-right */}
      <Float delay={0.3} duration={4.4} className="absolute -right-4 -top-10 z-20 hidden sm:block">
        <div className="flex w-[220px] items-center gap-2.5 rounded-2xl border border-border/70 bg-white px-3.5 py-2.5 shadow-[0_16px_34px_-18px_oklch(0.2_0.05_260/0.4)]">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
            <Bell className="size-4" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              <p className="text-[10px] font-semibold text-foreground">New Booking Alert!</p>
              <span className="text-[8px] text-muted-foreground">now</span>
            </div>
            <p className="truncate text-[9px] text-muted-foreground">Your agent booked a meeting</p>
          </div>
          <span className="size-1.5 shrink-0 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden />
        </div>
      </Float>

      {/* floating mail-icon badge, top-right */}
      <Float delay={0.5} duration={4} className="absolute -right-10 top-24 z-20 hidden sm:block">
        <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-[0_14px_28px_-12px_rgba(16,185,129,0.5)]">
          <Mail className="size-5" aria-hidden />
        </span>
      </Float>

      {/* floating mail-icon badge with unread count, bottom-right */}
      <Float delay={0.7} duration={4.8} className="absolute -right-8 -bottom-6 z-20 hidden sm:block">
        <span className="relative flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.45_0.19_264)] text-white shadow-[0_16px_32px_-12px_oklch(0.546_0.215_262.88/0.5)]">
          <Mail className="size-6" aria-hidden />
          <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
            1
          </span>
        </span>
      </Float>
    </div>
  )
}
