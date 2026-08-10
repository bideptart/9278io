"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { PhoneIncoming, BadgeCheck } from "lucide-react"

// Bespoke pattern for identity-setup's "Why it matters" section — three
// different phone numbers laid out as boarding-pass-style tickets. The top
// half of each is unique (its own number, its own line); the perforated
// bottom stub is identical on all three — same avatar, same name, same
// greeting. Seeing all three stubs match at a glance, side by side, makes
// "same identity, every line" a fact you can check rather than a claim.

const LINES = [
  { number: "+91 98xxx xxx01", label: "Sales line", tone: "#2563EB" },
  { number: "+91 98xxx xxx02", label: "Support line", tone: "#7C3AED" },
  { number: "+91 98xxx xxx03", label: "Booking line", tone: "#10B981" },
]

export function IdentityBuildPreview() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: false, amount: 0.4 })

  const SCAN_MS = 3600

  return (
    <div ref={containerRef}>
      <div className="relative grid gap-5 overflow-hidden rounded-[28px] sm:grid-cols-3">
        {/* verification scan-line, sweeping left to right across all three tickets */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 z-10 w-1/3"
          style={{ background: "linear-gradient(90deg, transparent, oklch(0.6 0.19 262.88 / 0.14), transparent)" }}
          animate={inView ? { left: ["-33.4%", "100%"] } : { left: "-33.4%" }}
          transition={{ duration: SCAN_MS / 1000, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
        />

        {LINES.map((line, i) => (
          <motion.div
            key={line.number}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl border border-border/60 bg-white shadow-[0_16px_34px_-24px_rgba(15,23,42,0.3)]"
          >
            {/* unique half — this line's own number */}
            <div className="p-4">
              <span
                className="flex size-9 items-center justify-center rounded-full"
                style={{ backgroundColor: `${line.tone}14`, color: line.tone }}
              >
                <PhoneIncoming className="size-4" aria-hidden />
              </span>
              <p className="mt-2.5 font-mono text-sm font-bold text-foreground">{line.number}</p>
              <p className="text-[11px] font-medium text-muted-foreground">{line.label}</p>
            </div>

            {/* perforation */}
            <div className="relative">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-dashed border-border" aria-hidden />
              <div className="absolute -left-2.5 top-1/2 size-5 -translate-y-1/2 rounded-full bg-background" aria-hidden />
              <div className="absolute -right-2.5 top-1/2 size-5 -translate-y-1/2 rounded-full bg-background" aria-hidden />
            </div>

            {/* shared stub — identical on every card, stamped "verified" as the scan passes */}
            <div className="relative px-4 pb-4 pt-5 text-center" style={{ backgroundColor: `${line.tone}0A` }}>
              <motion.span
                aria-hidden
                className="absolute right-3 top-2 flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white"
                initial={{ opacity: 0, scale: 0.4, rotate: -14 }}
                animate={
                  inView
                    ? { opacity: [0, 0, 1, 1, 0], scale: [0.4, 0.4, 1.15, 1, 1], rotate: [-14, -14, 4, 0, 0] }
                    : { opacity: 0 }
                }
                transition={{
                  duration: SCAN_MS / 1000,
                  repeat: Infinity,
                  ease: "easeOut",
                  repeatDelay: 0.6,
                  delay: i * 0,
                  times: [0, (i + 0.32) / 3, (i + 0.5) / 3, (i + 0.72) / 3, (i + 0.98) / 3],
                }}
              >
                <BadgeCheck className="size-3" aria-hidden />
                Verified
              </motion.span>

              <span
                className="mx-auto flex size-11 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)" }}
              >
                A
              </span>
              <p className="mt-2 text-sm font-bold text-foreground">Ava</p>
              <p className="text-[11px] text-muted-foreground">Sharma Reality</p>
              <p className="mt-2 text-[11px] italic leading-snug text-muted-foreground">
                &ldquo;Thanks for calling Sharma Reality, this is Ava.&rdquo;
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-[13px] font-semibold text-foreground">
        <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
        Three different numbers. One identity, every time.
      </div>
    </div>
  )
}
