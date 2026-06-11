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
  "Inbound":          "border-blue-500/25 bg-blue-500/10 text-blue-400",
  "Outbound":         "border-orange-500/25 bg-orange-500/10 text-orange-400",
  "24/7 Calling":     "border-green-500/25 bg-green-500/10 text-green-400",
  "Hindi & Regional": "border-primary/25 bg-primary/10 text-primary",
  "Lead Qualify":     "border-purple-500/25 bg-purple-500/10 text-purple-400",
  "TRAI Compliant":   "border-red-500/25 bg-red-500/10 text-red-400",
  "Appointment":      "border-cyan-500/25 bg-cyan-500/10 text-cyan-400",
  "EMI Reminder":     "border-yellow-500/25 bg-yellow-500/10 text-yellow-400",
  "DPDP Ready":       "border-pink-500/25 bg-pink-500/10 text-pink-400",
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

/* ── Component ── */

export function Industries() {
  const primaryIndustries = industries.slice(0, 6)
  const tailIndustries = industries.slice(6)

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

        {/* ── Featured BPO card ── */}
        <ScrollReveal className="mt-12">
          <FeaturedCard item={featured} />
        </ScrollReveal>

        {/* ── Industry grid ── */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {primaryIndustries.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.05}>
              <IndustryCard item={item} />
            </ScrollReveal>
          ))}
          {tailIndustries.length === 2 ? (
            <div className="grid gap-4 sm:col-span-2 lg:col-span-3 lg:grid-cols-2">
              {tailIndustries.map((item, i) => (
                <ScrollReveal key={item.title} delay={(i + primaryIndustries.length) * 0.05}>
                  <IndustryCard item={item} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            tailIndustries.map((item, i) => (
              <ScrollReveal key={item.title} delay={(i + primaryIndustries.length) * 0.05}>
                <IndustryCard item={item} />
              </ScrollReveal>
            ))
          )}
        </div>

      </div>
    </section>
  )
}

/* ── Featured card (full-width) ── */

function FeaturedCard({ item }: { item: typeof featured }) {
  const Icon = item.icon
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-border bg-white p-7 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:bg-slate-50 md:flex md:gap-10"
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      {/* Gradient top line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Left: text */}
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.08] text-primary">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {item.tag}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-bold tracking-tight">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>

        {/* Capability tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {item.caps.map(cap => (
            <span key={cap} className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${capColors[cap]}`}>
              {cap}
            </span>
          ))}
        </div>

        <Link
          href={item.href}
          className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        >
          Explore use case <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Right: agent script preview */}
      <div className="mt-6 w-full md:mt-0 md:w-80 md:shrink-0">
        <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Live agent preview
        </p>
        <div className="space-y-2 rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4">
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
                <span className="max-w-[85%] rounded-lg bg-primary/20 px-3 py-1.5 text-primary ring-1 ring-primary/25">
                  <span className="mr-1 text-[9px] font-bold opacity-60">Agent</span>
                  {line.text}
                </span>
              ) : (
                <span className="max-w-[85%] rounded-lg bg-white px-3 py-1.5 text-slate-700 shadow-sm ring-1 ring-slate-200">
                  <span className="mr-1 text-[9px] font-bold opacity-40">Caller</span>
                  {line.text}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Regular industry card ── */

function IndustryCard({ item }: { item: typeof industries[number] }) {
  const Icon = item.icon
  return (
    <motion.div
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary/25 hover:shadow-md hover:bg-slate-50"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.07] text-primary transition-colors duration-200 group-hover:border-primary/30 group-hover:bg-primary/[0.12]">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          {item.tag}
        </span>
      </div>

      {/* Text */}
      <h3 className="mt-4 text-sm font-bold tracking-tight transition-colors group-hover:text-primary">
        {item.title}
      </h3>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.description}</p>

      {/* Capability tags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {item.caps.map(cap => (
          <span key={cap} className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${capColors[cap]}`}>
            {cap}
          </span>
        ))}
      </div>

      {/* Mini script */}
      <div className="mt-4 space-y-1.5 rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-3">
        {item.script.map((line, i) => (
          <div
            key={i}
            className={`flex text-[10px] ${line.speaker === "Agent" ? "justify-start" : "justify-end"}`}
          >
            {line.speaker === "Agent" ? (
              <span className="max-w-[88%] rounded-md bg-primary/[0.18] px-2 py-1 text-primary leading-relaxed ring-1 ring-primary/20">
                <span className="mr-1 text-[9px] font-bold opacity-60">A</span>{line.text}
              </span>
            ) : (
              <span className="max-w-[88%] rounded-md bg-white px-2 py-1 text-slate-600 leading-relaxed shadow-sm ring-1 ring-slate-200">
                <span className="mr-1 text-[9px] font-bold opacity-40">C</span>{line.text}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Hover CTA */}
      <div className="mt-4 flex items-center justify-between">
        <Link
          href={item.href}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        >
          Explore use case <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </motion.div>
  )
}
