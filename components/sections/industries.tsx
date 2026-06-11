"use client"

import Link from "next/link"
import {
  Phone, Home, ShoppingBag, Scale,
  GraduationCap, Car, UtensilsCrossed, Dumbbell, Landmark,
  ArrowRight,
} from "lucide-react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

/* ── Capability tag colours ── */
const capColors: Record<string, string> = {
  "Inbound":          "border-blue-500/25 bg-blue-500/10 text-blue-600",
  "Outbound":         "border-orange-500/25 bg-orange-500/10 text-orange-600",
  "24/7 Calling":     "border-green-500/25 bg-green-500/10 text-green-600",
  "Hindi & Regional": "border-primary/25 bg-primary/10 text-primary",
  "Lead Qualify":     "border-purple-500/25 bg-purple-500/10 text-purple-600",
  "TRAI Compliant":   "border-red-500/25 bg-red-500/10 text-red-600",
  "Appointment":      "border-cyan-500/25 bg-cyan-500/10 text-cyan-600",
  "EMI Reminder":     "border-yellow-500/25 bg-yellow-500/10 text-yellow-600",
  "DPDP Ready":       "border-pink-500/25 bg-pink-500/10 text-pink-600",
  "Multilingual":     "border-primary/25 bg-primary/10 text-primary",
}

/* ── Industry data ── */
const featured = {
  icon: Phone,
  tag: "BPO & Call Centers",
  title: "Replace Tier-1 Agents at Scale",
  description:
    "Automate inbound queues, run outbound campaigns, and slash cost-per-call across all Indian languages. India's BPO sector — fully automated.",
  caps: ["Inbound", "Outbound", "Hindi & Regional", "TRAI Compliant"],
  script: [
    { speaker: "Agent", text: "नमस्ते! आज मैं आपकी कैसे सहायता कर सकता हूँ?" },
    { speaker: "Caller", text: "Mujhe apna account balance jaanna hai." },
    { speaker: "Agent", text: "Bilkul! Kripya apna registered mobile number dijiye." },
  ],
  href: "/industries",
}

const industries = [
  {
    icon: Landmark,
    tag: "BFSI",
    title: "BFSI & Fintech",
    description: "Lead qualification, loan follow-ups, EMI reminders, and insurance renewals in Hindi and regional languages.",
    caps: ["Outbound", "EMI Reminder", "Lead Qualify"],
    script: [
      { speaker: "Agent", text: "নমস্কার, আপনার EMI আগামীকাল বাকি আছে।" },
      { speaker: "Caller", text: "জি, আমি আগামীকাল পেমেন্ট করব।" },
    ],
    href: "/industries/legal",
  },
  {
    icon: Home,
    tag: "Real Estate",
    title: "Real Estate",
    description: "Qualify property leads 24/7, book site visits, and follow up in the caller's preferred language.",
    caps: ["24/7 Calling", "Lead Qualify", "Appointment"],
    script: [
      { speaker: "Agent", text: "வணக்கம்! நீங்கள் 2BHK அபார்ட்மெண்ட் பார்க்க விரும்புகிறீர்களா?" },
      { speaker: "Caller", text: "ஆமாம், புனேவில் பார்க்க வேண்டும்." },
    ],
    href: "/industries/real-estate",
  },
  {
    icon: GraduationCap,
    tag: "EdTech",
    title: "EdTech & Coaching",
    description: "Admissions calls, course follow-ups, and fee-payment reminders for India's coaching and e-learning sector.",
    caps: ["Outbound", "Lead Qualify", "Multilingual"],
    script: [
      { speaker: "Agent", text: "प्रिया, NEET बॅचसाठी प्रवेश घ्यायचा आहे का?" },
      { speaker: "Caller", text: "फी किती आहे ते सांगाल का?" },
    ],
    href: "/industries/education",
  },
  {
    icon: ShoppingBag,
    tag: "E-Commerce",
    title: "E-Commerce & D2C",
    description: "Order updates, returns, and post-purchase upsells in Hindi and regional languages — 24×7, zero wait time.",
    caps: ["Inbound", "24/7 Calling", "Hindi & Regional"],
    script: [
      { speaker: "Agent", text: "ನಿಮ್ಮ ಆರ್ಡರ್ ಇಂದು ಡೆಲಿವರಿಗೆ ಹೊರಟಿದೆ!" },
      { speaker: "Caller", text: "ಚೆನ್ನಾಗಿದೆ, ಯಾವ ಸಮಯಕ್ಕೆ ಬರಲಿದೆ?" },
    ],
    href: "/industries/ecommerce",
  },
  {
    icon: Car,
    tag: "Automotive",
    title: "Automotive",
    description: "Service scheduling, test-drive follow-ups, and EMI reminders for dealerships across Tier-1 and Tier-2 cities.",
    caps: ["Outbound", "Appointment", "EMI Reminder"],
    script: [
      { speaker: "Agent", text: "સાહેબ, તમારી કાર સર્વિસ આ અઠવાડિયે બાકી છે." },
      { speaker: "Caller", text: "શનિવારે 11 વાગ્યે બુક કરો." },
    ],
    href: "/industries/automotive",
  },
  {
    icon: UtensilsCrossed,
    tag: "Restaurants",
    title: "Restaurants & QSR",
    description: "Table reservations, delivery status, and feedback calls for restaurant chains across India.",
    caps: ["Inbound", "24/7 Calling", "Appointment"],
    script: [
      { speaker: "Agent", text: "സ്പൈസ് ഗാർഡനിലേക്ക് സ്വാഗതം! എത്ര പേർക്ക് ടേബിള്‍ വേണം?" },
      { speaker: "Caller", text: "4 പേർക്ക്, ഇന്ന് രാത്രി 8 മണിക്ക്." },
    ],
    href: "/industries/restaurants",
  },
  {
    icon: Scale,
    tag: "Legal",
    title: "Legal Services",
    description: "Client intake, appointment booking, and document follow-ups for law firms, LegalTech, and compliance consultancies.",
    caps: ["Inbound", "Appointment", "DPDP Ready"],
    script: [
      { speaker: "Agent", text: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਮੈਂ ਮੁਫ਼ਤ ਕਨਸਲਟੇਸ਼ਨ ਬੁੱਕ ਕਰ ਸਕਦਾ/ਸਕਦੀ ਹਾਂ।" },
      { speaker: "Caller", text: "ਹਾਂ, ਕੱਲ੍ਹ ਦੁਪਹਿਰ ਠੀਕ ਹੈ।" },
    ],
    href: "/industries/legal",
  },
  {
    icon: Dumbbell,
    tag: "Fitness",
    title: "Fitness & Wellness",
    description: "Class bookings, membership renewals, and no-show recovery for gyms, yoga studios, and wellness chains across India.",
    caps: ["Outbound", "Appointment", "Multilingual"],
    script: [
      { speaker: "Agent", text: "Your membership expires in 3 days, Ankit!" },
      { speaker: "Caller", text: "Renew kar do, 1 saal ka." },
    ],
    href: "/industries/fitness",
  },
]

/* ══════════════════════════════════════════════════
   Component — bento grid
══════════════════════════════════════════════════ */

export function Industries() {
  return (
    <section id="industries" className="border-b border-border">
      <div className="w-full px-6 py-20 md:px-8 md:py-28">

        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary"
          >
            <motion.span className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
            Industries
          </motion.span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Built for every Indian industry.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Pre-tuned scripts, Indian integrations, and TRAI compliance guardrails for the workflows you actually run.
          </p>
        </ScrollReveal>

        {/* ── Bento grid ── */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(196px,auto)]">
          <HeroTile item={featured} />
          {industries.map((item, i) => (
            <BentoTile key={item.title} item={item} delay={0.04 * (i + 1)} />
          ))}
        </div>

      </div>
    </section>
  )
}

/* ── Hero tile (2×2) ── */

function HeroTile({ item }: { item: typeof featured }) {
  const Icon = item.icon
  return (
    <ScrollReveal className="h-full sm:col-span-2 lg:row-span-2">
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/[0.07] via-white to-white p-7 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary/15 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />

        <div className="relative flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-white text-primary shadow-sm">
            <Icon className="h-6 w-6" aria-hidden />
          </span>
          <span className="rounded-full border border-primary/20 bg-primary/[0.08] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
            {item.tag}
          </span>
        </div>

        <h3 className="relative mt-4 text-2xl font-bold tracking-tight">{item.title}</h3>
        <p className="relative mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{item.description}</p>

        <div className="relative mt-4 flex flex-wrap gap-2">
          {item.caps.map(cap => (
            <span key={cap} className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${capColors[cap]}`}>
              {cap}
            </span>
          ))}
        </div>

        {/* Live agent conversation */}
        <div className="relative mt-auto pt-6">
          <p className="mb-2.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <motion.span className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
            Live agent preview
          </p>
          <div className="space-y-2 rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur-sm">
            {item.script.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: line.speaker === "Agent" ? -8 : 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.15 * i }}
                className={`flex text-xs ${line.speaker === "Agent" ? "justify-start" : "justify-end"}`}
              >
                {line.speaker === "Agent" ? (
                  <span className="max-w-[85%] rounded-2xl rounded-bl-sm bg-primary/15 px-3 py-1.5 text-primary ring-1 ring-primary/20">
                    <span className="mr-1 text-[9px] font-bold opacity-60">Agent</span>
                    {line.text}
                  </span>
                ) : (
                  <span className="max-w-[85%] rounded-2xl rounded-br-sm bg-white px-3 py-1.5 text-slate-700 shadow-sm ring-1 ring-slate-200">
                    <span className="mr-1 text-[9px] font-bold opacity-40">Caller</span>
                    {line.text}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
          <Link
            href={item.href}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Explore industries <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </motion.div>
    </ScrollReveal>
  )
}

/* ── Compact bento tile ── */

function BentoTile({ item, delay }: { item: typeof industries[number]; delay: number }) {
  const Icon = item.icon
  const agentLine = item.script.find(l => l.speaker === "Agent")?.text
  return (
    <ScrollReveal delay={delay} className="h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 border-border bg-white p-5 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:bg-slate-50/70"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/15 bg-primary/[0.07] text-primary transition-colors duration-200 group-hover:border-primary/30 group-hover:bg-primary/[0.12]">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            {item.tag}
          </span>
        </div>

        {/* Text */}
        <h3 className="mt-3.5 text-[15px] font-bold tracking-tight transition-colors group-hover:text-primary">
          {item.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{item.description}</p>

        {/* Capability tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.caps.map(cap => (
            <span key={cap} className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${capColors[cap]}`}>
              {cap}
            </span>
          ))}
        </div>

        {/* Footer: one-line agent quote + CTA */}
        <div className="mt-auto pt-4">
          {agentLine && (
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-2.5 py-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/15 text-[9px] font-bold text-primary">A</span>
              <p className="truncate text-[11px] italic leading-relaxed text-slate-500">{agentLine}</p>
            </div>
          )}
          <Link
            href={item.href}
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            Explore <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </motion.div>
    </ScrollReveal>
  )
}
