"use client"

import Link from "next/link"
import {
  Phone, Home, ShoppingBag, Scale,
  GraduationCap, Car, UtensilsCrossed, Dumbbell, Landmark,
} from "lucide-react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

/* ── Industry data ── */
const featured = {
  icon: Phone,
  tag: "BPO & Call Centers",
  title: "Replace Tier-1 Agents at Scale",
  description:
    "Automate inbound queues, answer every caller instantly, and slash cost-per-call across all Indian languages. India's BPO sector — fully automated.",
  caps: ["Inbound", "Hindi & Regional", "TRAI Compliant"],
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
    caps: ["EMI Reminder", "Lead Qualify"],
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
    caps: ["Lead Qualify", "Multilingual"],
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
    caps: ["Appointment", "EMI Reminder"],
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
    caps: ["Appointment", "Multilingual"],
    script: [
      { speaker: "Agent", text: "Your membership expires in 3 days, Ankit!" },
      { speaker: "Caller", text: "Renew kar do, 1 saal ka." },
    ],
    href: "/industries/fitness",
  },
]

/* ══════════════════════════════════════════════════
   Component — airy accent grid
══════════════════════════════════════════════════ */

const ACCENTS = [
  "text-blue-600", "text-violet-600", "text-cyan-600", "text-orange-600", "text-emerald-600",
  "text-purple-600", "text-pink-600", "text-indigo-600", "text-teal-600",
]
const ACCENT_TILES = [
  "bg-blue-50 border-blue-200", "bg-violet-50 border-violet-200", "bg-cyan-50 border-cyan-200",
  "bg-orange-50 border-orange-200", "bg-emerald-50 border-emerald-200", "bg-purple-50 border-purple-200",
  "bg-pink-50 border-pink-200", "bg-indigo-50 border-indigo-200", "bg-teal-50 border-teal-200",
]

export function Industries() {
  const all = [featured, ...industries]
  return (
    <section id="industries" className="border-b border-border">
      <div className="w-full px-6 py-24 md:px-8 md:py-32">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary"
          >
            <motion.span className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
            Industries
          </motion.span>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Built for every Indian industry.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Pre-tuned scripts, Indian integrations, and TRAI compliance guardrails for the workflows you actually run.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
          {all.map((ind, i) => {
            const Icon = ind.icon
            const accent = ACCENTS[i % ACCENTS.length]
            const tile = ACCENT_TILES[i % ACCENT_TILES.length]
            return (
              <ScrollReveal
                key={ind.title}
                delay={i * 0.04}
                className={`group relative bg-white transition-colors duration-300 hover:bg-slate-50/50 ${accent}`}
              >
                <Link href={ind.href} className="relative block p-7">
                  {/* accent line draws across the top on hover (colour = industry accent) */}
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100"
                    aria-hidden
                  />
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex size-12 shrink-0 items-center justify-center rounded-2xl border ${tile} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em]">{ind.tag}</p>
                      <h3 className="text-lg font-bold tracking-tight text-foreground">{ind.title}</h3>
                    </div>
                  </div>
                  <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{ind.description}</p>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
