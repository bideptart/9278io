"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, PhoneCall, Globe, Clock, ShieldCheck, Check } from "lucide-react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

/* ── Data ── */
const highlights = [
  { icon: PhoneCall,   stat: "24/7", title: "Always Answers",   color: "text-blue-600",    tile: "bg-blue-50" },
  { icon: Globe,       stat: "10+",  title: "Indian Languages", color: "text-violet-600",  tile: "bg-violet-50" },
  { icon: Clock,       stat: "0s",   title: "Wait Time",        color: "text-emerald-600", tile: "bg-emerald-50" },
  { icon: ShieldCheck, stat: "TRAI", title: "Fully Compliant",  color: "text-orange-600",  tile: "bg-orange-50" },
]

/* City dots — positions calibrated from each city's real lat/long onto the map */
const cities = [
  { name: "Delhi",     left: 34.0, top: 30.0 },
  { name: "Jaipur",    left: 30.1, top: 35.6 },
  { name: "Lucknow",   left: 44.5, top: 35.8 },
  { name: "Ahmedabad", left: 21.1, top: 48.5 },
  { name: "Surat",     left: 21.8, top: 54.6 },
  { name: "Kolkata",   left: 65.2, top: 50.0 },
  { name: "Odisha",    left: 58.1, top: 57.4 },
  { name: "Mumbai",    left: 21.9, top: 61.5 },
  { name: "Hyderabad", left: 37.6, top: 67.1 },
  { name: "Bengaluru", left: 35.1, top: 81.6 },
  { name: "Chennai",   left: 42.6, top: 81.3 },
  { name: "Kochi",     left: 31.4, top: 91.7 },
]

/* ── Small animated audio bars ── */
function Bars({ count = 7, className = "" }: { count?: number; className?: string }) {
  const heights = Array.from({ length: count }, (_, i) => 5 + ((i * 11) % 16))
  return (
    <div className={`flex h-4 items-end gap-[2px] ${className}`} aria-hidden>
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="w-[2.5px] rounded-full bg-current"
          style={{ height: h, transformOrigin: "bottom" }}
          animate={{ scaleY: [0.45, 1, 0.6, 0.9, 0.45] }}
          transition={{ duration: 0.9 + (i % 5) * 0.14, repeat: Infinity, ease: "easeInOut", delay: (i % 7) * 0.08 }}
        />
      ))}
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative flex flex-col overflow-hidden border-b border-border/50 bg-gradient-to-b from-blue-50/50 via-background to-background lg:min-h-[calc(100vh-64px)] lg:justify-center">
      {/* Glow */}
      <div aria-hidden className="pointer-events-none absolute -top-32 right-0 h-[620px] w-[820px] rounded-full bg-primary/[0.1] blur-[130px]" />

      <div className="relative w-full px-6 pb-8 pt-4 md:px-8 md:pb-10 md:pt-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">

          {/* ── Left ── */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-2 text-sm font-semibold uppercase tracking-wider text-primary"
            >
              <span className="text-primary"><Bars count={4} /></span>
              AI Voice Receptionist
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[3.6rem]"
            >
              Answer every call like your{" "}
              <span className="bg-gradient-to-r from-primary via-[oklch(0.62_0.2_240)] to-[oklch(0.72_0.18_150)] bg-clip-text text-transparent">
                best front desk.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              AI voice receptionist that greets, understands, qualifies and books — in 10+ Indian languages,
              around the clock.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-gradient-to-r from-primary to-[oklch(0.5_0.21_255)] py-2 pl-8 pr-2 text-base font-semibold text-white shadow-[0_8px_28px_oklch(0.546_0.215_262.88/0.45)] transition-all hover:shadow-[0_10px_36px_oklch(0.546_0.215_262.88/0.6)]"
              >
                <Link href="/get-started">
                  Build your first agent
                  <span className="flex size-7 items-center justify-center rounded-full bg-white/20">
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-border bg-white px-7 text-base font-semibold text-foreground hover:border-primary/30 hover:bg-slate-50"
              >
                <Link href="/get-started">
                  <PhoneCall className="mr-2 h-4 w-4" />
                  Try live demo
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"
            >
              {["Per-second billing", "10+ Indian languages", "No contracts"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <Check className="size-4 text-emerald-600" aria-hidden /> {t}
                </span>
              ))}
            </motion.div>

            {/* Stats card */}
            <ScrollReveal className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border/60 sm:grid-cols-4">
              {highlights.map((h) => {
                const Icon = h.icon
                return (
                  <div key={h.title} className="flex flex-col items-center gap-1 bg-white px-3 py-3 text-center">
                    <div className="flex items-center gap-2">
                      <span className={`flex size-8 items-center justify-center rounded-full ${h.tile} ${h.color}`}>
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <span className={`text-lg font-bold ${h.color}`}>{h.stat}</span>
                    </div>
                    <span className="text-[11px] leading-tight text-muted-foreground">{h.title}</span>
                  </div>
                )
              })}
            </ScrollReveal>
          </div>

          {/* ── Right: India map mockup ── */}
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto w-full max-w-[440px]"
            >
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative aspect-square w-full"
              >
                <Image
                  src="/india-map-outline.png"
                  alt="Map of India with state borders"
                  fill
                  sizes="(max-width: 1024px) 80vw, 440px"
                  className="object-contain"
                  priority
                />
                {/* City coverage dots */}
                {cities.map((c, i) => (
                  <span
                    key={c.name}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${c.left}%`, top: `${c.top}%` }}
                  >
                    <span className="relative flex size-2.5 items-center justify-center">
                      <motion.span
                        className="absolute inset-0 rounded-full bg-sky-400/50"
                        animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: (i % 6) * 0.3 }}
                      />
                      <span className="relative size-2.5 rounded-full bg-sky-400 ring-2 ring-white" />
                    </span>
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
