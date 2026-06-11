"use client"

import { useEffect, useState } from "react"
import {
  AudioLines, Hand, PhoneCall, Languages,
  ShieldCheck, Activity, Network,
} from "lucide-react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

const networkPills = ["Inbound PSTN", "Outbound PSTN", "SIP trunking", "Indian DIDs"]

const waveHeights = [30, 55, 40, 70, 50, 85, 45, 72, 38, 65, 42, 78, 35, 60, 48]

const analyticsDataSets = [
  [45, 62, 58, 78, 72, 88, 82, 95],
  [55, 70, 66, 84, 79, 91, 87, 97],
  [38, 55, 48, 68, 63, 80, 76, 90],
]

const transcriptLines = [
  { speaker: "Agent", text: "नमस्ते! आपका नाम क्या है?", delay: 0.3 },
  { speaker: "Caller", text: "Rahul Sharma", delay: 1.0 },
  { speaker: "Agent", text: "Thank you, Rahul. How can I help?", delay: 1.8 },
  { speaker: "Caller", text: "I need to book an appointment.", delay: 2.6 },
]

const traiChecks = [
  "TRAI calling window (9 AM – 9 PM)",
  "National DNC registry scrubbing",
  "DPDP Act data localisation",
  "Consent capture & audit trail",
  "Promotional vs transactional routing",
]

const concurrencyDots = Array.from({ length: 12 })

export function Features() {
  const [transcriptKey, setTranscriptKey] = useState(0)
  const [activePill, setActivePill] = useState(0)
  const [analyticsIdx, setAnalyticsIdx] = useState(0)
  const [analyticsKey, setAnalyticsKey] = useState(0)
  const [activeCheck, setActiveCheck] = useState(0)

  useEffect(() => {
    const t1 = setInterval(() => setTranscriptKey(k => k + 1), 7500)
    const t2 = setInterval(() => setActivePill(i => (i + 1) % networkPills.length), 1800)
    const t3 = setInterval(() => {
      setAnalyticsIdx(i => (i + 1) % analyticsDataSets.length)
      setAnalyticsKey(k => k + 1)
    }, 3200)
    const t4 = setInterval(() => setActiveCheck(i => (i + 1) % traiChecks.length), 1400)
    return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3); clearInterval(t4) }
  }, [])

  const analyticsData = analyticsDataSets[analyticsIdx]

  return (
    <section id="features" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">The Voice Engine</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Native audio. Not a relay.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Most AI voice products glue speech-to-text, an LLM, and text-to-speech together — the seams show.
            9278.io runs on a single audio-native model. No relay, no pipeline lag, no robotic timing.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">

          {/* Sub-300ms: waveform */}
          <ScrollReveal>
            <BentoCard>
              <CardBadge>Real-Time</CardBadge>
              <CardIcon Icon={AudioLines} />
              <h3 className="mt-4 font-bold tracking-tight">Sub-300ms Latency</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                WebRTC audio with a distributed Indian media network. Conversations feel instant.
              </p>
              <div className="mt-6 flex items-center gap-0.5" style={{ height: 44 }}>
                {waveHeights.map((h, i) => (
                  <motion.div
                    key={i}
                    className={`flex-1 rounded-full ${
                      h >= 70 ? "bg-primary" : h >= 50 ? "bg-primary/65" : "bg-primary/35"
                    }`}
                    style={{ height: `${h}%` }}
                    animate={{ scaleY: [1, 1.6, 0.4, 1.4, 0.7, 1] }}
                    transition={{
                      duration: 1.3,
                      repeat: Infinity,
                      delay: i * 0.07,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <motion.div
                  className="h-1.5 w-1.5 rounded-full bg-primary"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-xs font-semibold text-primary">Live · 94 ms avg</span>
              </div>
            </BentoCard>
          </ScrollReveal>

          {/* Indian Carrier Telephony: spans 2 */}
          <ScrollReveal className="md:col-span-2">
            <BentoCard>
              <CardBadge>India Network</CardBadge>
              <CardIcon Icon={PhoneCall} />
              <h3 className="mt-4 font-bold tracking-tight">Indian Carrier-Grade Telephony</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Inbound and outbound calls with Indian numbers, reliable routing, and full telecom-circle coverage.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {networkPills.map((c, i) => (
                  <motion.span
                    key={c}
                    animate={
                      activePill === i
                        ? { scale: 1.07 }
                        : { scale: 1 }
                    }
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors duration-300 ${
                      activePill === i
                        ? "border-primary/50 bg-primary/[0.15] text-primary"
                        : "border-primary/20 bg-primary/[0.06] text-primary/70"
                    }`}
                  >
                    {activePill === i && (
                      <motion.span
                        className="h-1.5 w-1.5 rounded-full bg-primary"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 0.7, repeat: Infinity }}
                      />
                    )}
                    {c}
                  </motion.span>
                ))}
                <span className="rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
                  + all telecom circles
                </span>
              </div>
              <div className="mt-4 flex gap-4">
                <Stat value="SIP" label="PSTN routing" />
                <Stat value="HD" label="voice codec" />
                <Stat value="99.99%" label="uptime" />
              </div>
            </BentoCard>
          </ScrollReveal>

          {/* 15+ Languages — spans 2 with auto-looping transcript */}
          <ScrollReveal className="md:col-span-2">
            <BentoCard>
              <CardBadge>Multilingual</CardBadge>
              <CardIcon Icon={Languages} />
              <h3 className="mt-4 font-bold tracking-tight">15+ Indian Languages</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Native voices in Hindi, Tamil, Telugu, Kannada, Marathi, Bengali, Gujarati, Punjabi, Malayalam and more. Auto-detect dialect and switch mid-call.
              </p>
              <div
                key={transcriptKey}
                className="mt-6 space-y-2.5 rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4"
              >
                {transcriptLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: line.speaker === "Agent" ? -14 : 14, y: 4 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.4, delay: line.delay, ease: "easeOut" }}
                    className={`flex text-xs ${line.speaker === "Agent" ? "justify-start" : "justify-end"}`}
                  >
                    {line.speaker === "Agent" ? (
                      <span className="max-w-[82%] rounded-lg bg-primary/20 px-3 py-1.5 text-primary ring-1 ring-primary/30">
                        <span className="mr-1.5 text-[10px] font-bold opacity-60">Agent</span>
                        {line.text}
                      </span>
                    ) : (
                      <span className="max-w-[82%] rounded-lg bg-white px-3 py-1.5 text-slate-700 shadow-sm ring-1 ring-slate-200">
                        <span className="mr-1.5 text-[10px] font-bold opacity-40">Caller</span>
                        {line.text}
                      </span>
                    )}
                  </motion.div>
                ))}
                {/* Typing dots */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2, delay: 3.8, times: [0, 0.1, 0.8, 1] }}
                  className="flex justify-start"
                >
                  <span className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1.5">
                    {[0, 0.18, 0.36].map((d, i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-primary/60"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: d, ease: "easeInOut" }}
                      />
                    ))}
                  </span>
                </motion.div>
              </div>
            </BentoCard>
          </ScrollReveal>

          {/* Natural Turn-Taking */}
          <ScrollReveal>
            <BentoCard>
              <CardBadge>Conversational</CardBadge>
              <CardIcon Icon={Hand} />
              <h3 className="mt-4 font-bold tracking-tight">Natural Turn-Taking</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Smart endpointing, barge-in, and interruption handling. The agent listens, pauses, and responds like a person.
              </p>
              <div className="mt-6 space-y-2">
                {["Barge-in detection", "Natural pauses", "Interruption handling"].map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 * i }}
                    className="flex items-center gap-2 rounded-lg border border-border bg-card/50 px-3 py-2 text-xs text-muted-foreground"
                  >
                    <motion.div
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.75 }}
                    />
                    {f}
                  </motion.div>
                ))}
              </div>
            </BentoCard>
          </ScrollReveal>

          {/* Analytics — live cycling bars (spans 2 cols) */}
          <ScrollReveal className="md:col-span-2">
            <BentoCard>
              <div className="flex items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <CardBadge>Analytics</CardBadge>
                  <h3 className="mt-4 font-bold tracking-tight">Live Transcripts & Analytics</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Speaker labels, sentiment, intents, and conversion events — searchable from day one.
                  </p>
                </div>
                <CardIcon Icon={Activity} />
              </div>
              <div key={analyticsKey} className="mt-6 flex items-end gap-1.5" style={{ height: 64 }}>
                {analyticsData.map((h, i) => (
                  <motion.div
                    key={i}
                    className={`flex-1 rounded-t-sm ${h >= 85 ? "bg-primary" : h >= 70 ? "bg-primary/65" : "bg-primary/35"}`}
                    style={{ height: `${h}%`, originY: 1 }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 0.05 * i, ease: "easeOut" }}
                  />
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground/50">
                <span>Mon</span>
                <motion.span
                  key={analyticsKey}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="font-semibold text-primary/70"
                >
                  +{analyticsData[analyticsData.length - 1]}% calls resolved
                </motion.span>
                <span>Fri</span>
              </div>
            </BentoCard>
          </ScrollReveal>

          {/* Massive Concurrency */}
          <ScrollReveal>
            <BentoCard>
              <CardBadge>Scale</CardBadge>
              <CardIcon Icon={Network} />
              <h3 className="mt-4 font-bold tracking-tight">Massive Concurrency</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Scale from one call to thousands simultaneously. Burst capacity is built in.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-1.5 sm:grid-cols-6">
                {concurrencyDots.map((_, i) => {
                  const row = Math.floor(i / 6)
                  const col = i % 6
                  const rippleDelay = (row + col) * 0.18
                  return (
                    <motion.div
                      key={i}
                      className="aspect-square rounded-md bg-primary/15"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", delay: 0.05 * i, stiffness: 300, damping: 18 }}
                    >
                      <motion.div
                        className="h-full w-full rounded-md bg-primary/40"
                        animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1, 0.8] }}
                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          delay: rippleDelay,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                  )
                })}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Each cell = 1 concurrent agent</p>
            </BentoCard>
          </ScrollReveal>

          {/* TRAI Compliance */}
          <ScrollReveal className="md:col-span-3">
            <BentoCard>
              <CardBadge>Compliant</CardBadge>
              <CardIcon Icon={ShieldCheck} />
              <h3 className="mt-4 font-bold tracking-tight">TRAI & DPDP Compliance</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                TRAI calling-window enforcement, DND scrubbing, DPDP Act data localisation, and encrypted storage — all pre-configured for India. Not an add-on, standard on every plan.
              </p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {traiChecks.map((check, i) => (
                  <motion.div
                    key={check}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      opacity: { duration: 0.35, delay: 0.08 * i },
                      y: { duration: 0.35, delay: 0.08 * i },
                      backgroundColor: { duration: 0.35 },
                    }}
                    animate={{
                      backgroundColor:
                        activeCheck === i
                          ? "oklch(0.78 0.16 195 / 0.07)"
                          : "oklch(1 0 0 / 0.02)",
                    }}
                    className="flex items-start gap-2.5 rounded-lg border border-border px-3 py-2.5 transition-colors duration-300"
                    style={{
                      borderColor: activeCheck === i ? "oklch(0.78 0.16 195 / 0.35)" : undefined,
                    }}
                  >
                    <motion.div
                      className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-400/20"
                      animate={
                        activeCheck === i
                          ? { scale: [1, 1.35, 1] }
                          : { scale: 1 }
                      }
                      transition={{ duration: 0.5 }}
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    </motion.div>
                    <span className="text-xs leading-relaxed text-muted-foreground">{check}</span>
                  </motion.div>
                ))}
              </div>
            </BentoCard>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}

/* ─── Shared sub-components ─── */

function BentoCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/50 p-6 transition-colors duration-300 hover:border-primary/25 hover:bg-white/[0.04] ${className}`}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {/* Top glow on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {/* Shimmer sweep */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-primary/[0.04] to-transparent"
        animate={{ left: ["-60%", "160%"] }}
        transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
      />
      {children}
    </motion.div>
  )
}

function CardBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-fit rounded-full border border-primary/20 bg-primary/[0.07] px-2.5 py-0.5 text-[11px] font-semibold text-primary">
      {children}
    </span>
  )
}

function CardIcon({ Icon }: { Icon: React.ComponentType<{ className?: string }> }) {
  return (
    <span className="mt-3 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.07] text-primary">
      <Icon className="h-5 w-5" aria-hidden />
    </span>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <span className="text-lg font-bold text-foreground">{value}</span>
      <span className="ml-1.5 text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
