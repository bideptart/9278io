"use client"

import { motion } from "motion/react"
import { Clock, LayoutGrid, MessageCircleQuestion, Phone } from "lucide-react"

/** Gentle continuous float — used for both the stat chips and the illustration accessories. */
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

const dropShadow = "drop-shadow(0 10px 14px oklch(0.3 0.1 262.88 / 0.25))"

/**
 * Flat vector illustration — a laptop showing an FAQ document, with a chat
 * bubble, phone icon, and headset floating independently around it (each its
 * own small SVG in a Float wrapper, not baked into one static image), plus a
 * gradient fill and glossy screen highlight for depth.
 */
export function FaqIllustration({
  questionCount = 27,
  questions = [],
}: {
  questionCount?: number
  /** Real question text for the 4 rows on the FAQ card — pass real data from lib/faq.ts. */
  questions?: string[]
}) {
  return (
    <div className="relative mx-auto w-full max-w-[480px] lg:ml-auto lg:mr-0">
      <div className="relative aspect-square w-full">
        {/* static core: laptop + FAQ content + background dashes/sparkles */}
        <svg viewBox="0 0 400 400" className="absolute inset-0 size-full" aria-hidden>
          <defs>
            <linearGradient id="screenFrame" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.66 0.19 262.88)" />
              <stop offset="100%" stopColor="oklch(0.46 0.21 262.88)" />
            </linearGradient>
            <linearGradient id="baseBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.95 0.01 262.88)" />
              <stop offset="100%" stopColor="oklch(0.87 0.02 262.88)" />
            </linearGradient>
            <linearGradient id="glossFade" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.35" />
              <stop offset="45%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="rowIcon" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.62 0.19 262.88)" />
              <stop offset="100%" stopColor="oklch(0.48 0.21 262.88)" />
            </linearGradient>
            <filter id="rowShadow" x="-20%" y="-40%" width="140%" height="220%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="oklch(0.5 0.1 262.88)" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* ambient shadow under the laptop */}
          <ellipse cx="200" cy="298" rx="95" ry="10" fill="oklch(0.5 0.1 262.88 / 0.15)" />

          {/* dashed connector lines */}
          <path d="M78 165 Q100 185 122 200" stroke="oklch(0.6 0.15 262.88 / 0.4)" strokeWidth="1.5" strokeDasharray="4 5" fill="none" />
          <path d="M322 165 Q300 185 278 200" stroke="oklch(0.6 0.15 262.88 / 0.4)" strokeWidth="1.5" strokeDasharray="4 5" fill="none" />

          {/* scattered dots and sparkles */}
          <circle cx="30" cy="330" r="4" fill="oklch(0.546 0.215 262.88 / 0.4)" />
          <circle cx="370" cy="330" r="4" fill="oklch(0.546 0.215 262.88 / 0.4)" />
          <circle cx="200" cy="40" r="3" fill="oklch(0.546 0.215 262.88 / 0.35)" />
          <path d="M355 155 l2.5 6 l6 2.5 l-6 2.5 l-2.5 6 l-2.5 -6 l-6 -2.5 l6 -2.5 z" fill="oklch(0.7 0.15 262.88 / 0.5)" />
          <path d="M45 200 l2.5 6 l6 2.5 l-6 2.5 l-2.5 6 l-2.5 -6 l-6 -2.5 l6 -2.5 z" fill="oklch(0.7 0.15 262.88 / 0.5)" />

          {/* laptop */}
          <g style={{ filter: dropShadow }}>
            <rect x="100" y="60" width="200" height="194" rx="16" fill="url(#screenFrame)" />
            <rect x="114" y="74" width="172" height="166" rx="8" fill="white" />
            {/* soft glossy highlight on the display, clipped to its rounded corners */}
            <clipPath id="displayClip">
              <rect x="114" y="74" width="172" height="166" rx="8" />
            </clipPath>
            <rect x="114" y="74" width="172" height="166" fill="url(#glossFade)" clipPath="url(#displayClip)" />
            <rect x="88" y="256" width="224" height="14" rx="7" fill="url(#baseBar)" />
            <rect x="180" y="260" width="40" height="4" rx="2" fill="oklch(0.6 0.15 262.88 / 0.4)" />
          </g>

          {/* FAQ content on the display */}
          <text x="128" y="100" fontFamily="ui-sans-serif, system-ui" fontWeight="800" fontSize="23" fill="oklch(0.546 0.215 262.88)">
            FAQ
          </text>
          <rect x="128" y="108" width="26" height="3" rx="1.5" fill="oklch(0.546 0.215 262.88 / 0.5)" />

          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(128, ${122 + i * 26})`} filter="url(#rowShadow)">
              <rect width="144" height="19" rx="8" fill="white" stroke="oklch(0.92 0.015 262.88)" />
              <circle cx="13.5" cy="9.5" r="7.5" fill="url(#rowIcon)" />
              <text x="13.5" y="13" textAnchor="middle" fontFamily="ui-sans-serif, system-ui" fontWeight="700" fontSize="9" fill="white">
                ?
              </text>
              {questions[i] ? (
                <text
                  x="29"
                  y="13"
                  textLength="106"
                  lengthAdjust="spacingAndGlyphs"
                  fontFamily="ui-sans-serif, system-ui"
                  fontWeight="600"
                  fontSize="8.5"
                  fill="oklch(0.3 0.03 262.88)"
                >
                  {questions[i]}
                </text>
              ) : (
                <>
                  <rect x="29" y="6" width="90" height="3" rx="1.5" fill="oklch(0.82 0.02 262.88)" />
                  <rect x="29" y="12" width="60" height="3" rx="1.5" fill="oklch(0.9 0.01 262.88)" />
                </>
              )}
            </g>
          ))}
        </svg>

        {/* chat bubble — floats independently, left of the laptop */}
        <Float delay={0.2} duration={4} className="absolute left-[6%] top-[42%] z-10 w-[18%]">
          <svg viewBox="0 0 72 46" style={{ filter: dropShadow }}>
            <defs>
              <linearGradient id="bubbleFill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.62 0.19 262.88)" />
                <stop offset="100%" stopColor="oklch(0.48 0.21 262.88)" />
              </linearGradient>
            </defs>
            <path d="M0 14 a14 14 0 0 1 14 -14 h44 a14 14 0 0 1 14 14 v18 a14 14 0 0 1 -14 14 h-28 l-13 11 v-11 h-3 a14 14 0 0 1 -14 -14 Z" fill="url(#bubbleFill)" />
            <circle cx="19" cy="23" r="3.5" fill="white" />
            <circle cx="31" cy="23" r="3.5" fill="white" />
            <circle cx="43" cy="23" r="3.5" fill="white" />
          </svg>
        </Float>

        {/* phone icon — floats independently, below the chat bubble */}
        <Float delay={0.5} duration={5} className="absolute left-[9%] top-[64%] z-10 aspect-square w-[10%]">
          <div
            className="flex size-full items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.66_0.19_262.88)] to-[oklch(0.48_0.21_262.88)] text-white"
            style={{ filter: dropShadow }}
          >
            <Phone className="size-[55%]" fill="currentColor" strokeWidth={0} aria-hidden />
          </div>
        </Float>

        {/* headset — floats independently, right of the laptop */}
        <Float delay={0.35} duration={4.5} className="absolute left-[79%] top-[44%] z-10 w-[17%]">
          <svg viewBox="0 0 68 78" style={{ filter: dropShadow }}>
            <defs>
              <linearGradient id="headsetFill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.66 0.19 262.88)" />
                <stop offset="100%" stopColor="oklch(0.48 0.21 262.88)" />
              </linearGradient>
            </defs>
            <path d="M8 34 a26 26 0 0 1 52 0" fill="none" stroke="url(#headsetFill)" strokeWidth="6" strokeLinecap="round" />
            <rect x="0" y="32" width="16" height="22" rx="8" fill="url(#headsetFill)" />
            <rect x="52" y="32" width="16" height="22" rx="8" fill="url(#headsetFill)" />
            <path d="M60 52 q8 5 5 16" stroke="oklch(0.546 0.215 262.88)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <circle cx="65" cy="69" r="3.5" fill="oklch(0.546 0.215 262.88)" />
          </svg>
        </Float>

        {/* reply bubble near the headset — floats independently, own rhythm */}
        <Float delay={0.6} duration={5.5} className="absolute left-[75%] top-[65%] z-10 w-[12%]">
          <svg viewBox="0 0 48 37" style={{ filter: dropShadow }}>
            <rect x="0" y="0" width="48" height="28" rx="9" fill="white" stroke="oklch(0.9 0.02 262.88)" />
            <path d="M6 28 l0 9 l9 -9 Z" fill="white" stroke="oklch(0.9 0.02 262.88)" />
            <rect x="9" y="8" width="28" height="3.5" rx="1.75" fill="oklch(0.85 0.02 262.88)" />
            <rect x="9" y="16" width="18" height="3.5" rx="1.75" fill="oklch(0.9 0.01 262.88)" />
          </svg>
        </Float>

        {/* paper airplane, tucked in the gap between the two right-hand chips */}
        <Float delay={0.15} duration={3.5} className="absolute left-[85%] top-[30%] z-10 w-[7%]">
          <svg viewBox="0 0 26 15" style={{ transform: "rotate(20deg)" }}>
            <path d="M0 0 L26 6 L3 15 L6 9 Z" fill="oklch(0.546 0.215 262.88)" />
          </svg>
        </Float>

        {/* floating "27+ answered" stat chip */}
        <Float delay={0.1} className="absolute -left-2 top-[8%] z-20">
          <div className="flex items-center gap-2 rounded-full border border-border/70 bg-white px-3.5 py-2 shadow-[0_16px_34px_-18px_oklch(0.2_0.05_260/0.4)]">
            <MessageCircleQuestion className="size-3.5 text-primary" aria-hidden />
            <span className="text-xs font-semibold text-foreground">{questionCount}+ answered</span>
          </div>
        </Float>

        {/* floating "6 categories" stat chip */}
        <Float delay={0.4} className="absolute right-[2%] top-[3%] z-20">
          <div className="flex items-center gap-2 rounded-full border border-border/70 bg-white px-3.5 py-2 shadow-[0_16px_34px_-18px_oklch(0.2_0.05_260/0.4)]">
            <LayoutGrid className="size-3.5 text-primary" aria-hidden />
            <span className="text-xs font-semibold text-foreground">6 categories</span>
          </div>
        </Float>

        {/* floating "<1hr reply" stat chip */}
        <Float delay={0.7} className="absolute -right-2 top-[58%] z-20">
          <div className="flex items-center gap-2 rounded-full border border-border/70 bg-white px-3.5 py-2 shadow-[0_16px_34px_-18px_oklch(0.2_0.05_260/0.4)]">
            <Clock className="size-3.5 text-accent" aria-hidden />
            <span className="text-xs font-semibold text-foreground">&lt;1hr reply</span>
          </div>
        </Float>
      </div>
    </div>
  )
}
