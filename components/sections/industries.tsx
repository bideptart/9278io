"use client"

import {
  Phone, Home, ShoppingBag, Scale,
  GraduationCap, Car, UtensilsCrossed, Dumbbell, Landmark,
  type LucideIcon,
} from "lucide-react"
import { IndustriesScrollCards } from "@/components/industries/industries-scroll-cards"

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
    description: "Lead qualification, loan follow-ups, EMI reminders, and insurance renewals — in Hindi and regional languages, with every disclosure logged for RBI and IRDAI audit trails.",
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
    description: "Qualify property leads 24/7, book site visits, and follow up in the caller's preferred language — so no enquiry goes cold waiting for a broker to call back.",
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
    description: "Admissions calls, course follow-ups, and fee-payment reminders for India's coaching and e-learning sector, handled in the parent or student's own regional language.",
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
    description: "Order updates, returns, and post-purchase upsells in Hindi and regional languages — answered 24×7 with zero wait time, even during flash-sale spikes.",
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
    description: "Service scheduling, test-drive follow-ups, and EMI reminders for dealerships across Tier-1 and Tier-2 cities, in the customer's own language every time.",
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
    description: "Table reservations, delivery status, and feedback calls for restaurant chains across India — answered instantly during peak dinner-hour rush.",
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
    description: "Client intake, appointment booking, and document follow-ups for law firms, LegalTech, and compliance consultancies — confidential, logged, and DPDP-ready.",
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
    description: "Class bookings, membership renewals, and no-show recovery for gyms, yoga studios, and wellness chains across India — so front-desk staff can focus on members, not the phone.",
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
const ACCENT_BARS = [
  "bg-blue-500", "bg-violet-500", "bg-cyan-500", "bg-orange-500", "bg-emerald-500",
  "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500",
]

type IndustryCard = {
  id: number
  title: string
  description: string
  tag: string
  href: string
  icon: LucideIcon
  accent: string
  tile: string
  bar: string
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
  bar: ACCENT_BARS[i % ACCENT_BARS.length],
  caps: ind.caps,
  agentLine: ind.script.find((l) => l.speaker === "Agent")?.text,
}))

export function Industries() {
  return (
    <section id="industries" className="border-b border-border">
      <div className="w-full px-6 md:px-8 lg:px-12 xl:px-20">
        <IndustriesScrollCards
          eyebrow="Industries"
          heading="Built for every Indian industry."
          description="Pre-tuned scripts, Indian integrations, and TRAI compliance guardrails for the workflows you actually run — from BPO queues to fitness studios."
          exploreHref="/industries"
          items={cards}
        />
      </div>
    </section>
  )
}
