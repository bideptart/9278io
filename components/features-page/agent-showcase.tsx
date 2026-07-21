"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"
import {
  Phone, PhoneCall, MessageCircle, MessageSquare, Mail, Globe2,
  Type, Image as ImageIcon, Smile, Mic, Headphones,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

type Row = { avatar: string; channel: LucideIcon; color: string; bg: string; muted?: boolean }

const rows: Row[] = [
  { avatar: "/avatars/priya.jpg", channel: Phone, color: "text-emerald-600", bg: "bg-emerald-50" },
  { avatar: "/avatars/rahul.jpg", channel: MessageSquare, color: "text-amber-600", bg: "bg-amber-50" },
  { avatar: "/avatars/amit.jpg", channel: Mail, color: "text-slate-500", bg: "bg-slate-100", muted: true },
]

type Chip = { icon: LucideIcon; label: string; tip: string; color: string; bg: string }

const channels: Chip[] = [
  { icon: Phone, label: "Calls", tip: "Inbound & outbound voice calls in 10+ Indian languages", color: "text-white", bg: "bg-primary" },
  { icon: MessageCircle, label: "WhatsApp", tip: "Automated WhatsApp follow-ups & confirmations", color: "text-white", bg: "bg-emerald-500" },
  { icon: MessageSquare, label: "SMS", tip: "Instant SMS reminders & order updates", color: "text-white", bg: "bg-amber-500" },
  { icon: Mail, label: "Email", tip: "Transactional emails for receipts & call summaries", color: "text-white", bg: "bg-slate-500" },
  { icon: Globe2, label: "Web chat", tip: "24/7 website chat handled by the same AI agent", color: "text-white", bg: "bg-violet-500" },
]

/** Small animated audio bars for the voice-note floating card. */
function MiniWave() {
  const bars = [6, 12, 18, 10, 15, 8]
  return (
    <div className="flex h-5 items-center gap-[3px]" aria-hidden>
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-primary"
          style={{ height: h, transformOrigin: "center" }}
          animate={{ scaleY: [0.35, 1, 0.5, 0.9, 0.35] }}
          transition={{ duration: 0.9 + (i % 3) * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }}
        />
      ))}
    </div>
  )
}

/** Gentle continuous float, used for every card orbiting the hub. */
function Float({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [-6, 6, -6] }}
      transition={{ duration: 4.5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  )
}

export function AgentShowcase() {
  const [activeChannel, setActiveChannel] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActiveChannel((i) => (i + 1) % channels.length), 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto w-full max-w-[560px] lg:ml-auto lg:-mr-8"
    >
      <div className="relative aspect-[6/5] w-full">
        {/* outer dashed orbit — slowly rotating, with two marker dots */}
        <motion.div
          className="absolute inset-0 rounded-full border border-dashed border-primary/25"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute -top-1 left-[68%] size-2 rounded-full bg-primary/60" />
          <span className="absolute bottom-[14%] -left-1 size-1.5 rounded-full bg-primary/40" />
        </motion.div>

        {/* solid blue ring */}
        <div className="absolute inset-[9%] rounded-full border-2 border-primary/70" />

        {/* filled hub circle */}
        <div className="absolute inset-[19%] rounded-full bg-primary/15" />

        {/* stacked contact rows inside the hub */}
        <div className="absolute inset-[19%] flex flex-col items-center justify-center gap-2.5 px-[9%]">
          {rows.map((r, i) => {
            const Icon = r.channel
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: r.muted ? 0.7 : 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                className="flex w-full items-center gap-2.5 rounded-2xl border border-border/70 bg-white px-3 py-2.5 shadow-[0_10px_24px_-16px_oklch(0.2_0.05_260/0.35)]"
              >
                <span className="relative size-8 shrink-0 overflow-hidden rounded-full ring-1 ring-black/5">
                  <Image src={r.avatar} alt="" fill sizes="32px" className="object-cover" />
                </span>
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="h-1.5 w-4/5 rounded-full bg-slate-200" />
                  {!r.muted && <div className="h-1.5 w-1/2 rounded-full bg-slate-100" />}
                </div>
                <span className={`flex size-6 shrink-0 items-center justify-center rounded-full ${r.bg} ${r.color}`}>
                  <Icon className="size-3.5" aria-hidden />
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* composer toolbar — top-left */}
        <Float delay={0.2} className="absolute left-0 top-[10%] z-20">
          <div className="flex items-center gap-2 rounded-2xl border border-border/70 bg-white px-3.5 py-3 shadow-[0_16px_34px_-18px_oklch(0.2_0.05_260/0.4)]">
            {[Type, ImageIcon, Smile].map((I, i) => (
              <span key={i} className="flex size-8 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                <I className="size-4" aria-hidden />
              </span>
            ))}
            <span className="flex size-8 items-center justify-center rounded-xl bg-red-500 text-white">
              <Mic className="size-4" aria-hidden />
            </span>
          </div>
        </Float>

        {/* agent card — top-right */}
        <Float delay={0.6} className="absolute right-0 top-[6%] z-20">
          <div className="relative flex items-center gap-2.5 rounded-2xl border border-border/70 bg-white p-2.5 pr-4 shadow-[0_16px_34px_-18px_oklch(0.2_0.05_260/0.4)]">
            <span className="relative size-11 shrink-0 overflow-hidden rounded-full ring-1 ring-black/5">
              <Image src="/avatars/sneha.avif" alt="" fill sizes="44px" className="object-cover" />
            </span>
            <div className="leading-tight">
              <p className="text-xs font-semibold text-foreground">9278 Agent</p>
              <p className="text-[11px] text-muted-foreground">On a call</p>
            </div>
            <span className="absolute -left-1.5 -top-1.5 flex size-6 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
              <PhoneCall className="size-3" aria-hidden />
            </span>
          </div>
        </Float>

        {/* voice-note card — middle-left */}
        <Float delay={1} className="absolute left-[-3%] top-[42%] z-20">
          <div className="flex items-center gap-2.5 rounded-2xl border border-border/70 bg-white py-2.5 pl-2.5 pr-4 shadow-[0_16px_34px_-18px_oklch(0.2_0.05_260/0.4)]">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <Mic className="size-4" aria-hidden />
            </span>
            <MiniWave />
          </div>
        </Float>

        {/* transcript card — middle-right */}
        <Float delay={1.4} className="absolute right-[-2%] top-[52%] z-20">
          <div className="flex items-center gap-2.5 rounded-2xl border border-border/70 bg-white px-3.5 py-3 shadow-[0_16px_34px_-18px_oklch(0.2_0.05_260/0.4)]">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Headphones className="size-4" aria-hidden />
            </span>
            <div className="space-y-1.5">
              <div className="h-1.5 w-16 rounded-full bg-slate-200" />
              <div className="h-1.5 w-10 rounded-full bg-slate-100" />
            </div>
          </div>
        </Float>

        {/* channel pill — bottom; info auto-cycles every 3s, one channel at a time */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center">
          <div className="flex items-center gap-2.5 rounded-full border border-border/70 bg-white p-2.5 shadow-[0_20px_40px_-20px_oklch(0.2_0.05_260/0.45)]">
            {channels.map((c, i) => {
              const Icon = c.icon
              const active = activeChannel === i
              return (
                <div key={c.label} className="relative">
                  <motion.span
                    aria-label={c.label}
                    className={`flex size-9 items-center justify-center rounded-full sm:size-10 ${c.bg} ${c.color}`}
                    animate={{ y: [-2, 2, -2], scale: active ? 1.12 : 1 }}
                    transition={{
                      y: { duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 },
                      scale: { duration: 0.3, ease: "easeOut" },
                    }}
                  >
                    <Icon className="size-4 sm:size-4.5" aria-hidden />
                  </motion.span>

                  {/* tooltip — opens upward so it never clips the bottom edge */}
                  <AnimatePresence>
                    {active && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-30 w-40 -translate-x-1/2"
                      >
                        <span
                          aria-hidden
                          className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 border-b border-l-0 border-r border-t-0 border-border bg-white"
                        />
                        <div className="relative rounded-xl border border-border bg-white px-3 py-2 shadow-lg">
                          <p className="text-[11px] font-semibold text-foreground">{c.label}</p>
                          <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{c.tip}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
