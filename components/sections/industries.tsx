"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Phone, Home, ShoppingBag, Scale,
  GraduationCap, Car, UtensilsCrossed, Dumbbell, Landmark,
  ArrowRight, type LucideIcon,
} from "lucide-react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { CardStack, type CardStackItem } from "@/components/ui/card-stack"

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
  href: "/industries/bpo",
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
    href: "/industries/bfsi",
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
   Component — 3D fanned card stack
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

type IndustryCard = CardStackItem & {
  icon: LucideIcon
  accent: string
  tile: string
  caps: string[]
  agentLine?: string
}

const cards: IndustryCard[] = [featured, ...industries].map((ind, i) => ({
  id: i,
  title: ind.title,
  description: ind.description,
  tag: ind.tag,
  href: ind.href,
  icon: ind.icon,
  accent: ACCENTS[i % ACCENTS.length],
  tile: ACCENT_TILES[i % ACCENT_TILES.length],
  caps: ind.caps,
  agentLine: ind.script.find((l) => l.speaker === "Agent")?.text,
}))

/** Fit the fanned cards to the viewport so they stay fully visible on mobile. */
function useCardSize() {
  const [size, setSize] = useState({ width: 460, height: 280 })
  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth
      const width = Math.min(560, Math.max(248, vw - 48))
      // Narrow cards wrap more copy, so give them a touch more height.
      const height = vw < 640 ? Math.round(width * 0.92) : 340
      setSize({ width, height })
    }
    compute()
    window.addEventListener("resize", compute)
    return () => window.removeEventListener("resize", compute)
  }, [])
  return size
}

export function Industries() {
  const { width: cardWidth, height: cardHeight } = useCardSize()
  return (
    <section id="industries" className="overflow-hidden border-b border-border">
      <div className="w-full px-6 py-6 md:px-8 md:py-8">
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
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Pre-tuned scripts, Indian integrations, and TRAI compliance guardrails for the workflows you actually run.
          </p>
        </ScrollReveal>

        <ScrollReveal className="-mt-4">
          <CardStack
            items={cards}
            initialIndex={0}
            maxVisible={5}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            spreadDeg={0}
            tiltXDeg={0}
            depthPx={55}
            overlap={0.68}
            activeScale={1}
            inactiveScale={0.9}
            activeLiftPx={0}
            autoAdvance
            intervalMs={1700}
            springStiffness={420}
            springDamping={38}
            pauseOnHover
            showDots
            renderCard={(item, { active }) => {
              const Icon = item.icon
              return (
                <div className={`relative flex h-full w-full flex-col bg-gradient-to-b from-white to-slate-50 ${active ? "px-10 sm:px-16 py-5 sm:py-8" : "px-4 py-4 sm:px-6 sm:py-6"} ${item.accent}`}>
                  {/* accent bar (colour = industry accent) */}
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-current" aria-hidden />

                  {/* Header */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className={`flex size-10 shrink-0 items-center justify-center rounded-2xl border sm:size-12 ${item.tile}`}>
                      <Icon className="size-4 sm:size-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-[11px]">{item.tag}</p>
                      <h3 className="truncate text-base font-bold tracking-tight text-foreground sm:text-lg">{item.title}</h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground sm:mt-3 sm:line-clamp-3 sm:text-sm">{item.description}</p>

                  {/* Capability chips */}
                  <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3">
                    {item.caps.map((cap) => (
                      <span
                        key={cap}
                        className="rounded-full border border-current/25 bg-current/[0.07] px-2 py-0.5 text-[10px] font-semibold sm:px-2.5 sm:text-[11px]"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>

                  {/* Live agent preview */}
                  {item.agentLine ? (
                    <div className="mt-2 flex items-start gap-2 rounded-xl border border-border bg-white/70 px-3 py-2 backdrop-blur-sm sm:mt-3 sm:py-2">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-current/15 text-[10px] font-bold">
                        A
                      </span>
                      <p className="line-clamp-2 text-[11px] italic leading-relaxed text-slate-500 sm:text-[12px]">{item.agentLine}</p>
                    </div>
                  ) : null}

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between pt-2 sm:pt-3">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="inline-flex w-fit items-center gap-1.5 text-[13px] font-semibold sm:text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Explore <ArrowRight className="size-4" aria-hidden />
                      </Link>
                    ) : <span />}
                    <span className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground sm:text-[11px]">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      TRAI-compliant
                    </span>
                  </div>
                </div>
              )
            }}
          />
        </ScrollReveal>
      </div>
    </section>
  )
}
