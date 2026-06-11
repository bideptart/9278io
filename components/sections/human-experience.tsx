"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

const barData = [30, 45, 38, 58, 52, 72, 68, 84, 78, 92, 88, 100]
const barMonths = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]

const languages = [
  "Hindi", "Tamil", "Telugu", "Kannada", "Marathi",
  "Bengali", "Gujarati", "Punjabi", "Malayalam", "Odia",
  "Assamese", "Urdu", "Bhojpuri", "Rajasthani", "Maithili",
]

const complianceBadges = [
  { label: "TRAI", bg: "bg-orange-500/15", text: "text-orange-400", border: "border-orange-500/25", glow: "oklch(0.65 0.17 45 / 0.5)" },
  { label: "DPDP", bg: "bg-blue-500/15", text: "text-blue-400", border: "border-blue-500/25", glow: "oklch(0.60 0.20 240 / 0.5)" },
  { label: "DND", bg: "bg-green-500/15", text: "text-green-400", border: "border-green-500/25", glow: "oklch(0.72 0.17 145 / 0.5)" },
  { label: "GST", bg: "bg-purple-500/15", text: "text-purple-400", border: "border-purple-500/25", glow: "oklch(0.55 0.20 300 / 0.5)" },
  { label: "ISO", bg: "bg-cyan-500/15", text: "text-cyan-400", border: "border-cyan-500/25", glow: "oklch(0.75 0.15 200 / 0.5)" },
]

const toggleFeatures = [
  "TRAI calling windows",
  "DND registry scrubbing",
  "DPDP data localisation",
  "Consent capture flows",
  "GST invoice generation",
]

const infraNodes = ["Mumbai DC", "Hyderabad DC", "Jio", "Airtel"]

function useCounter(target: number, duration = 1800) {
  const [value, setValue] = useState(0)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    if (!triggered) return
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [triggered, target, duration])

  return { value, trigger: () => setTriggered(true) }
}

export function HumanExperience() {
  const [activeLang, setActiveLang] = useState(-1)
  const [activeBadge, setActiveBadge] = useState(0)
  const [barKey, setBarKey] = useState(0)

  const counter60 = useCounter(60)
  const counter10 = useCounter(10)

  useEffect(() => {
    // Language wave sweep — highlight one pill at a time
    let idx = 0
    const t1 = setInterval(() => {
      setActiveLang(idx % languages.length)
      idx++
    }, 500)
    // Badge glow cycle
    const t2 = setInterval(() => setActiveBadge(i => (i + 1) % complianceBadges.length), 1200)
    // Bar chart "new data" pulse every 5s
    const t3 = setInterval(() => setBarKey(k => k + 1), 5000)
    return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3) }
  }, [])

  return (
    <section className="relative border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Why 9278.io</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            The most complete AI voice platform for Indian businesses.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">

          {/* ── Card 1: ROI Chart ── spans 2 cols */}
          <ScrollReveal className="md:col-span-2">
            <motion.div
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-7 transition-colors duration-300 hover:border-primary/25 hover:bg-slate-50"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <motion.div
                className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-primary/[0.03] to-transparent"
                animate={{ left: ["-60%", "160%"] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
              />

              <span className="w-fit rounded-full border border-primary/20 bg-primary/[0.08] px-3 py-1 text-xs font-semibold text-primary">
                Proven ROI
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight">3–5× Call Capacity in 30 Days</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Indian teams report 3–5× call-handling capacity within the first month and measurable revenue
                impact within 60 days of deploying their first agent.
              </p>

              {/* Bar chart with periodic re-animation */}
              <div className="mt-8 flex flex-col gap-2">
                <div key={barKey} className="relative flex items-end gap-1.5" style={{ height: 80 }}>
                  {barData.map((h, i) => (
                    <motion.div
                      key={i}
                      className={`flex-1 rounded-t-sm ${
                        h >= 80 ? "bg-primary" : h >= 55 ? "bg-primary/60" : "bg-primary/30"
                      }`}
                      style={{ height: `${h}%`, originY: 1 }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.55, delay: 0.06 * i, ease: "easeOut" }}
                    />
                  ))}
                </div>
                <div className="flex gap-1.5">
                  {barMonths.map((m, i) => (
                    <span key={i} className="flex-1 text-center text-[9px] text-muted-foreground/40">{m}</span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-5">
                <motion.div
                  onViewportEnter={counter10.trigger}
                >
                  <span className="text-2xl font-bold text-foreground">{counter10.value}M+</span>
                  <span className="ml-2 text-xs text-muted-foreground">calls automated</span>
                </motion.div>
                <div className="border-l border-border pl-6">
                  <motion.div onViewportEnter={counter60.trigger}>
                    <span className="text-2xl font-bold text-foreground">{counter60.value}</span>
                    <span className="text-2xl font-bold text-foreground"> days</span>
                    <span className="ml-2 text-xs text-muted-foreground">to measurable ROI</span>
                  </motion.div>
                </div>
                <div className="border-l border-border pl-6">
                  <span className="text-2xl font-bold text-foreground">3–5×</span>
                  <span className="ml-2 text-xs text-muted-foreground">call capacity</span>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* ── Card 2: 10+ Indian Languages ── */}
          <ScrollReveal>
            <motion.div
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-7 transition-colors duration-300 hover:border-primary/25 hover:bg-slate-50"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="w-fit rounded-full border border-primary/20 bg-primary/[0.08] px-3 py-1 text-xs font-semibold text-primary">
                Multilingual
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight">10+ Indian Languages</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Native voices with auto-dialect detection. Switch mid-call naturally.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {languages.map((lang, i) => (
                  <motion.span
                    key={lang}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.04 * i, type: "spring", stiffness: 300, damping: 20 }}
                    animate={
                      activeLang === i
                        ? { scale: 1.1, backgroundColor: "oklch(0.78 0.16 195 / 0.2)", borderColor: "oklch(0.78 0.16 195 / 0.5)" }
                        : { scale: 1, backgroundColor: "oklch(0.78 0.16 195 / 0.07)", borderColor: "oklch(0.78 0.16 195 / 0.2)" }
                    }
                    className="rounded-full border border-primary/20 bg-primary/[0.07] px-2.5 py-1 text-xs font-medium text-primary/90"
                  >
                    {lang}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </ScrollReveal>

          {/* ── Card 3: Compliance Badges ── */}
          <ScrollReveal>
            <motion.div
              className="group relative overflow-hidden rounded-2xl border border-border bg-white p-7 transition-colors duration-300 hover:border-primary/25 hover:bg-slate-50"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="w-fit rounded-full border border-primary/20 bg-primary/[0.08] px-3 py-1 text-xs font-semibold text-primary">
                Compliant
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight">India-First Compliance</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Every Indian regulation — built in, not bolted on.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {complianceBadges.map((badge, i) => (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      opacity: { duration: 0.4, delay: 0.1 * i },
                      y: { duration: 0.4, delay: 0.1 * i },
                      scale: { type: "spring", stiffness: 300, damping: 18 },
                    }}
                    animate={
                      activeBadge === i
                        ? { scale: 1.14, boxShadow: `0 0 18px ${badge.glow}` }
                        : { scale: 1, boxShadow: "0 0 0px transparent" }
                    }
                    className={`flex h-14 w-14 flex-col items-center justify-center rounded-xl border text-xs font-bold ${badge.bg} ${badge.text} ${badge.border}`}
                  >
                    {badge.label}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ScrollReveal>

          {/* ── Card 4: Feature Toggles ── */}
          <ScrollReveal>
            <motion.div
              className="group relative overflow-hidden rounded-2xl border border-border bg-white p-7 transition-colors duration-300 hover:border-primary/25 hover:bg-slate-50"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="w-fit rounded-full border border-primary/20 bg-primary/[0.08] px-3 py-1 text-xs font-semibold text-primary">
                Regulatory
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight">Designed for India</h3>
              <ul className="mt-6 space-y-3.5">
                {toggleFeatures.map((label, i) => (
                  <motion.li
                    key={label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.08 * i }}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="text-sm text-muted-foreground">{label}</span>
                    <div className="relative flex h-5 w-9 shrink-0 items-center rounded-full bg-primary p-0.5">
                      <motion.div
                        className="h-4 w-4 rounded-full bg-white shadow-sm"
                        initial={{ x: 0 }}
                        whileInView={{ x: 16 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.35 + 0.1 * i }}
                      />
                      {/* Glow ring after flip */}
                      <motion.div
                        className="pointer-events-none absolute inset-0 rounded-full"
                        initial={{ boxShadow: "0 0 0px oklch(0.78 0.16 195 / 0)" }}
                        whileInView={{ boxShadow: ["0 0 0px oklch(0.78 0.16 195 / 0)", "0 0 8px oklch(0.78 0.16 195 / 0.6)", "0 0 0px oklch(0.78 0.16 195 / 0)"] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.6 + 0.1 * i }}
                      />
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </ScrollReveal>

          {/* ── Card 5: Uptime / India Infra ── */}
          <ScrollReveal>
            <motion.div
              className="group relative overflow-hidden rounded-2xl border border-border bg-white p-7 transition-colors duration-300 hover:border-primary/25 hover:bg-slate-50"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="w-fit rounded-full border border-primary/20 bg-primary/[0.08] px-3 py-1 text-xs font-semibold text-primary">
                Infrastructure
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight">India Data Centres</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Mumbai &amp; Hyderabad. Data never leaves India. Sub-second latency on Jio &amp; Airtel.
              </p>

              {/* Uptime bar with shimmer */}
              <div className="mt-7">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Uptime SLA</span>
                  <motion.span
                    className="font-bold text-primary"
                    animate={{ opacity: [1, 0.6, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    99.99%
                  </motion.span>
                </div>
                <div className="relative h-2 overflow-hidden rounded-full bg-border">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary/70 to-primary"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "99.99%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: "easeOut", delay: 0.4 }}
                  />
                  {/* Shimmer sweep over bar */}
                  <motion.div
                    className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ left: ["-10%", "110%"] }}
                    transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
                  />
                </div>
              </div>

              {/* Infra nodes with ping effect */}
              <div className="mt-6 grid grid-cols-2 gap-2">
                {infraNodes.map((node, i) => (
                  <motion.div
                    key={node}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.1, type: "spring", stiffness: 280, damping: 20 }}
                    className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2"
                  >
                    <div className="relative flex h-3 w-3 items-center justify-center">
                      <motion.div
                        className="absolute h-3 w-3 rounded-full bg-green-400/40"
                        animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6 }}
                      />
                      <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    </div>
                    <span className="truncate text-xs text-muted-foreground">{node}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}
