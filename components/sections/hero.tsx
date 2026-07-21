"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowRight, PhoneCall, Globe, Clock, ShieldCheck, Check,
  CalendarCheck, IndianRupee, Package, UserRoundCheck,
  MessageSquare, ChevronLeft, ChevronRight, CheckCircle2, LayoutGrid,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

/* ── Left-column highlights ── */
const highlights = [
  { icon: PhoneCall,   stat: "24/7", title: "Always Answers",   color: "text-blue-600",    tile: "bg-blue-50" },
  { icon: Globe,       stat: "10+",  title: "Indian Languages", color: "text-violet-600",  tile: "bg-violet-50" },
  { icon: Clock,       stat: "0s",   title: "Wait Time",        color: "text-emerald-600", tile: "bg-emerald-50" },
  { icon: ShieldCheck, stat: "TRAI", title: "Fully Compliant",  color: "text-orange-600",  tile: "bg-orange-50" },
]

/* ── Panel demo scenarios (cycled) ── */
type Msg = { from: "caller" | "agent"; text: string }
type Card =
  | { type: "appointment"; date: string; times: string[]; active: string }
  | { type: "payment"; invoice: string; due: string; amount: string; status: string }
  | { type: "order"; id: string; state: string; cta: string }
  | { type: "lead"; plan: string; note: string; status: string }

type Scenario = {
  icon: LucideIcon
  title: string
  name: string
  lang: string          // conversation language (shown in footer)
  avatar: string        // caller photo path
  messages: Msg[]
  cardTitle: string
  card: Card
}

const SCENARIOS: Scenario[] = [
  // 1 · Hindi
  {
    icon: CalendarCheck,
    title: "Appointment Booking",
    name: "Priya Sharma",
    lang: "Hindi",
    avatar: "/avatars/priya.jpg",
    messages: [
      { from: "caller", text: "नमस्ते, क्या आप मेरा डेंटल चेक-अप अपॉइंटमेंट बुक कर सकते हैं?" },
      { from: "agent",  text: "ज़रूर! आपके लिए कौन सा दिन और समय सबसे अच्छा रहेगा?" },
      { from: "caller", text: "28 जनवरी सुबह 10 बजे ठीक रहेगा।" },
      { from: "agent",  text: "हो गया! आपका अपॉइंटमेंट सफलतापूर्वक बुक हो गया है।" },
    ],
    cardTitle: "अपॉइंटमेंट बुक हुआ",
    card: { type: "appointment", date: "28 Jan", times: ["09:00", "10:00", "11:00"], active: "10:00" },
  },
  // 2 · Tamil
  {
    icon: IndianRupee,
    title: "Payment Reminder",
    name: "Karthik Raja",
    lang: "Tamil",
    avatar: "/avatars/rahul.jpg",
    messages: [
      { from: "caller", text: "என் நிலுவையில் உள்ள கட்டணத்தை நினைவூட்ட முடியுமா?" },
      { from: "agent",  text: "நிச்சயமாக! நீங்கள் குறிப்பிடும் விலைப்பட்டியல் எண்ணைப் பகிரவும்." },
      { from: "caller", text: "அது INV-78421." },
      { from: "agent",  text: "இதோ உங்கள் நினைவூட்டல். விவரங்களைப் பார்த்து பணம் செலுத்துங்கள்." },
    ],
    cardTitle: "கட்டண நினைவூட்டல்",
    card: { type: "payment", invoice: "INV-78421", due: "15 Feb", amount: "₹4,500", status: "நினைவூட்டல் அனுப்பப்பட்டது" },
  },
  // 3 · Telugu
  {
    icon: Package,
    title: "Order Tracking",
    name: "Anusha Reddy",
    lang: "Telugu",
    avatar: "/avatars/sneha.avif",
    messages: [
      { from: "caller", text: "నా ఆర్డర్ ఈరోజు డెలివరీకి బయలుదేరింది కానీ ఇంకా రాలేదు." },
      { from: "agent",  text: "ఆలస్యానికి క్షమించండి! మీ ఆర్డర్ ID ను షేర్ చేయండి." },
      { from: "caller", text: "అది ORD-45892." },
      { from: "agent",  text: "ధన్యవాదాలు! మీ ఆర్డర్ డెలివరీకి బయలుదేరింది — క్రింద ట్రాక్ చేయండి." },
    ],
    cardTitle: "ఆర్డర్ స్థితి",
    card: { type: "order", id: "ORD-45892", state: "డెలివరీలో ఉంది", cta: "మీ ఆర్డర్‌ను ట్రాక్ చేయండి" },
  },
  // 4 · Kannada
  {
    icon: UserRoundCheck,
    title: "New Enquiry",
    name: "Arjun Gowda",
    lang: "Kannada",
    avatar: "/avatars/amit.jpg",
    messages: [
      { from: "caller", text: "ನಿಮ್ಮ ಜಾಹೀರಾತು ನೋಡಿದೆ — ನಿಮ್ಮ ಪ್ಲ್ಯಾನ್‌ಗಳ ಬಗ್ಗೆ ಹೇಳಿ." },
      { from: "agent",  text: "ಸಂತೋಷದಿಂದ! ನಿಮ್ಮ ಬಜೆಟ್ ಮತ್ತು ತಂಡದ ಗಾತ್ರ ಎಷ್ಟು?" },
      { from: "caller", text: "ತಿಂಗಳಿಗೆ ಸುಮಾರು ₹10,000, ಸುಮಾರು 8 ಏಜೆಂಟ್‌ಗಳು." },
      { from: "agent",  text: "Growth ಪ್ಲ್ಯಾನ್ ಸೂಕ್ತವಾಗಿದೆ. ನಿಮಗಾಗಿ ಕಾಲ್‌ಬ್ಯಾಕ್ ನಿಗದಿಪಡಿಸಿದ್ದೇನೆ." },
    ],
    cardTitle: "ಲೀಡ್ ಸೆರೆಹಿಡಿಯಲಾಗಿದೆ",
    card: { type: "lead", plan: "Growth plan", note: "8 agents · ₹10k / mo", status: "ಕಾಲ್‌ಬ್ಯಾಕ್ ನಿಗದಿಯಾಗಿದೆ" },
  },
  // 5 · Marathi
  {
    icon: CalendarCheck,
    title: "Appointment Booking",
    name: "Sanika Patil",
    lang: "Marathi",
    avatar: "/avatars/priya.jpg",
    messages: [
      { from: "caller", text: "नमस्कार, तुम्ही माझी डेंटल तपासणीची अपॉइंटमेंट बुक कराल का?" },
      { from: "agent",  text: "नक्कीच! तुमच्यासाठी कोणता दिवस आणि वेळ योग्य आहे?" },
      { from: "caller", text: "28 जानेवारी सकाळी 10 वाजता चालेल." },
      { from: "agent",  text: "झाले! तुमची अपॉइंटमेंट यशस्वीरित्या बुक झाली आहे." },
    ],
    cardTitle: "अपॉइंटमेंट बुक झाली",
    card: { type: "appointment", date: "28 Jan", times: ["09:00", "10:00", "11:00"], active: "10:00" },
  },
  // 6 · Bengali
  {
    icon: IndianRupee,
    title: "Payment Reminder",
    name: "Riya Das",
    lang: "Bengali",
    avatar: "/avatars/sneha.avif",
    messages: [
      { from: "caller", text: "আমার বকেয়া পেমেন্টের কথা মনে করিয়ে দেবেন?" },
      { from: "agent",  text: "অবশ্যই! আপনি যে ইনভয়েস আইডির কথা বলছেন সেটি শেয়ার করুন।" },
      { from: "caller", text: "এটা INV-78421।" },
      { from: "agent",  text: "এই যে আপনার রিমাইন্ডার। বিস্তারিত দেখে পেমেন্ট করুন।" },
    ],
    cardTitle: "পেমেন্ট রিমাইন্ডার",
    card: { type: "payment", invoice: "INV-78421", due: "15 Feb", amount: "₹4,500", status: "রিমাইন্ডার পাঠানো হয়েছে" },
  },
  // 7 · Gujarati
  {
    icon: Package,
    title: "Order Tracking",
    name: "Meera Shah",
    lang: "Gujarati",
    avatar: "/avatars/priya.jpg",
    messages: [
      { from: "caller", text: "મારો ઓર્ડર આજે ડિલિવરી માટે નીકળ્યો પણ હજી આવ્યો નથી." },
      { from: "agent",  text: "વિલંબ બદલ માફ કરશો! તમારો ઓર્ડર ID શેર કરો." },
      { from: "caller", text: "તે ORD-45892 છે." },
      { from: "agent",  text: "આભાર! તમારો ઓર્ડર ડિલિવરી માટે નીકળી ગયો છે — નીચે ટ્રેક કરો." },
    ],
    cardTitle: "ઓર્ડર સ્થિતિ",
    card: { type: "order", id: "ORD-45892", state: "ડિલિવરીમાં છે", cta: "તમારો ઓર્ડર ટ્રેક કરો" },
  },
  // 8 · Punjabi
  {
    icon: UserRoundCheck,
    title: "New Enquiry",
    name: "Gurpreet Singh",
    lang: "Punjabi",
    avatar: "/avatars/rahul.jpg",
    messages: [
      { from: "caller", text: "ਮੈਂ ਤੁਹਾਡਾ ਇਸ਼ਤਿਹਾਰ ਵੇਖਿਆ — ਆਪਣੇ ਪਲਾਨ ਬਾਰੇ ਦੱਸੋ।" },
      { from: "agent",  text: "ਖੁਸ਼ੀ ਨਾਲ! ਤੁਹਾਡਾ ਬਜਟ ਅਤੇ ਟੀਮ ਦਾ ਆਕਾਰ ਕਿੰਨਾ ਹੈ?" },
      { from: "caller", text: "ਮਹੀਨੇ ਦਾ ਲਗਭਗ ₹10,000, ਕਰੀਬ 8 ਏਜੰਟ।" },
      { from: "agent",  text: "Growth ਪਲਾਨ ਬਿਲਕੁਲ ਫਿੱਟ ਹੈ। ਮੈਂ ਤੁਹਾਡੇ ਲਈ ਕਾਲਬੈਕ ਸ਼ਡਿਊਲ ਕਰ ਦਿੱਤਾ ਹੈ।" },
    ],
    cardTitle: "ਲੀਡ ਕੈਪਚਰ ਹੋਈ",
    card: { type: "lead", plan: "Growth plan", note: "8 agents · ₹10k / mo", status: "ਕਾਲਬੈਕ ਸ਼ਡਿਊਲ ਹੋਇਆ" },
  },
  // 9 · Malayalam
  {
    icon: CalendarCheck,
    title: "Appointment Booking",
    name: "Ananya Menon",
    lang: "Malayalam",
    avatar: "/avatars/sneha.avif",
    messages: [
      { from: "caller", text: "നമസ്കാരം, എന്റെ ഡെന്റൽ ചെക്കപ്പ് അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യാമോ?" },
      { from: "agent",  text: "തീർച്ചയായും! നിങ്ങൾക്ക് ഏത് ദിവസവും സമയവുമാണ് സൗകര്യം?" },
      { from: "caller", text: "ജനുവരി 28 രാവിലെ 10 മണിക്ക് ശരിയാകും." },
      { from: "agent",  text: "കഴിഞ്ഞു! നിങ്ങളുടെ അപ്പോയിന്റ്മെന്റ് വിജയകരമായി ബുക്ക് ചെയ്തു." },
    ],
    cardTitle: "അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്തു",
    card: { type: "appointment", date: "28 Jan", times: ["09:00", "10:00", "11:00"], active: "10:00" },
  },
  // 10 · Odia
  {
    icon: IndianRupee,
    title: "Payment Reminder",
    name: "Subham Sahoo",
    lang: "Odia",
    avatar: "/avatars/amit.jpg",
    messages: [
      { from: "caller", text: "ମୋର ବକେୟା ପେମେଣ୍ଟ ବିଷୟରେ ମନେ ପକାଇ ପାରିବେ କି?" },
      { from: "agent",  text: "ନିଶ୍ଚିତ! ଆପଣ କେଉଁ ଇନଭଏସ୍ ID କୁହୁଛନ୍ତି ତାହା ସେୟାର କରନ୍ତୁ।" },
      { from: "caller", text: "ତାହା INV-78421।" },
      { from: "agent",  text: "ଏଇଠି ଆପଣଙ୍କ ରିମାଇଣ୍ଡର। ବିବରଣୀ ଦେଖି ପେମେଣ୍ଟ କରନ୍ତୁ।" },
    ],
    cardTitle: "ପେମେଣ୍ଟ ରିମାଇଣ୍ଡର",
    card: { type: "payment", invoice: "INV-78421", due: "15 Feb", amount: "₹4,500", status: "ରିମାଇଣ୍ଡର ପଠାଗଲା" },
  },
]

/* ── Small animated audio bars (used in the left badge) ── */
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

/* ── Vertical waveform shown in the panel header ── */
function HeaderWave() {
  const heights = [10, 18, 26, 14, 22, 12, 20, 28, 16, 10]
  return (
    <div className="flex h-7 items-center gap-[2.5px]" aria-hidden>
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="w-[2.5px] rounded-full bg-primary/70"
          style={{ height: h, transformOrigin: "center" }}
          animate={{ scaleY: [0.4, 1, 0.55, 0.9, 0.4] }}
          transition={{ duration: 0.9 + (i % 4) * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.07 }}
        />
      ))}
    </div>
  )
}

/* ── A single chat bubble (caller = left, agent = right) ── */
function Bubble({ sc, msg }: { sc: Scenario; msg: Msg }) {
  const agent = msg.from === "agent"
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`max-w-[86%] ${agent ? "self-end" : "self-start"}`}
    >
      {/* continuous gentle float — caller & agent bob in OPPOSITE phase (zig-zag).
          CSS animation on a plain div so it runs independent of framer-motion. */}
      <div
        className={`rounded-2xl border border-blue-100 bg-white/95 px-3.5 py-2.5 shadow-[0_16px_40px_-26px_oklch(0.52_0.22_265/0.5)] backdrop-blur ${
          agent ? "rounded-tr-md hero-float-down" : "rounded-tl-md hero-float-up"
        }`}
      >
      <div className="mb-1 flex items-center gap-1.5">
        {agent ? (
          <>
            <span className="flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-blue-100">
              <Image src="/darktheme.png" alt="9278.io" width={40} height={18} className="w-[15px] select-none object-contain" />
            </span>
            <span className="text-[11px] font-semibold text-muted-foreground">9278 Agent</span>
          </>
        ) : (
          <>
            <span className="relative size-5 shrink-0 overflow-hidden rounded-full ring-1 ring-black/5">
              <Image src={sc.avatar} alt={sc.name} fill sizes="20px" className="object-cover" />
            </span>
            <span className="text-[11px] font-semibold text-foreground">{sc.name}</span>
          </>
        )}
      </div>
      <p className="text-[13px] font-medium leading-snug text-primary sm:text-sm">{msg.text}</p>
      </div>
    </motion.div>
  )
}

/* ── Result card shown at the end of each scenario ── */
function ResultCard({ sc }: { sc: Scenario }) {
  const Icon = sc.icon
  const c = sc.card
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="w-full max-w-[300px] self-end"
    >
      {/* continuous gentle float (zig-zag with the bubbles) */}
      <div className="hero-float-up rounded-2xl border border-blue-100 bg-white/95 p-3 shadow-[0_18px_44px_-28px_oklch(0.52_0.22_265/0.55)] backdrop-blur">
      <div className="flex items-center gap-2 border-b border-blue-100/70 pb-2">
        <span className="flex size-6 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Icon className="size-3.5" aria-hidden />
        </span>
        <p className="text-xs font-semibold text-foreground">{sc.cardTitle}</p>
      </div>

      {c.type === "appointment" && (
        <div className="mt-2.5">
          <div className="flex items-center justify-between rounded-lg bg-slate-50 px-2 py-1.5">
            <ChevronLeft className="size-3.5 text-muted-foreground" aria-hidden />
            <span className="text-xs font-semibold text-foreground">{c.date}</span>
            <ChevronRight className="size-3.5 text-muted-foreground" aria-hidden />
          </div>
          <div className="mt-2 flex gap-1.5">
            {c.times.map((t) => (
              <span
                key={t}
                className={`flex-1 rounded-lg py-1.5 text-center text-[11px] font-semibold ${
                  t === c.active ? "bg-primary text-white shadow-sm" : "border border-border text-muted-foreground"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {c.type === "payment" && (
        <div className="mt-2.5">
          <div className="flex items-center justify-between">
            <div className="leading-tight">
              <p className="text-xs font-semibold text-foreground">Invoice: {c.invoice}</p>
              <p className="text-[10px] text-muted-foreground">Due {c.due}</p>
            </div>
            <p className="text-sm font-bold text-primary">{c.amount}</p>
          </div>
          <div className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-emerald-50 py-1.5 text-[11px] font-semibold text-emerald-600">
            <CheckCircle2 className="size-3.5" aria-hidden /> {c.status}
          </div>
        </div>
      )}

      {c.type === "order" && (
        <div className="mt-2.5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-foreground">ID: {c.id}</p>
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-blue-600">
              {c.state}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-emerald-50 py-1.5 text-[11px] font-semibold text-emerald-600">
            {c.cta} <ArrowRight className="size-3.5" aria-hidden />
          </div>
        </div>
      )}

      {c.type === "lead" && (
        <div className="mt-2.5">
          <div className="flex items-center justify-between">
            <div className="leading-tight">
              <p className="text-xs font-semibold text-foreground">{c.plan}</p>
              <p className="text-[10px] text-muted-foreground">{c.note}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-emerald-50 py-1.5 text-[11px] font-semibold text-emerald-600">
            <CheckCircle2 className="size-3.5" aria-hidden /> {c.status}
          </div>
        </div>
      )}
      </div>
    </motion.div>
  )
}

/* ── Nurix-style animated call panel (cycles through scenarios) ── */
function CallPanel() {
  const [si, setSi] = useState(0)
  const [step, setStep] = useState(0)
  const sc = SCENARIOS[si]
  const total = sc.messages.length

  useEffect(() => {
    if (step <= total) {
      const delay = step === 0 ? 700 : 1500
      const t = setTimeout(() => setStep((s) => s + 1), delay)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setSi((i) => (i + 1) % SCENARIOS.length)
      setStep(0)
    }, 3000)
    return () => clearTimeout(t)
  }, [si, step, total])

  const cardShown = step > total
  const revealed = Math.min(step, total)
  // Keep at most the two latest bubbles on screen; once the card appears, keep only the closing agent line.
  const shown = cardShown
    ? [{ msg: sc.messages[total - 1], i: total - 1 }]
    : sc.messages
        .slice(Math.max(0, revealed - 2), revealed)
        .map((msg, k) => ({ msg, i: Math.max(0, revealed - 2) + k }))

  const HeaderIcon = sc.icon

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-blue-100/80 bg-gradient-to-br from-blue-50/80 via-white to-blue-50/30 p-5 shadow-[0_40px_90px_-30px_oklch(0.52_0.22_265/0.45)] ring-1 ring-black/[0.03] sm:p-6">
      {/* dotted grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(oklch(0.55 0.21 262 / 0.16) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
        aria-hidden
      />

      {/* Header */}
      <div className="relative flex items-start justify-between gap-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={si}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-3"
          >
            <span className="flex size-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 shadow-sm">
              <HeaderIcon className="size-5" aria-hidden />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-foreground sm:text-[15px]">{sc.title}</p>
              <p className="text-xs text-muted-foreground">{sc.name}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden sm:block">
            <HeaderWave />
          </div>
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-white shadow-[0_6px_18px_-6px_oklch(0.52_0.22_265/0.7)]">
            <PhoneCall className="size-4" aria-hidden />
          </span>
          <span className="flex size-9 items-center justify-center rounded-xl border border-border bg-white text-muted-foreground shadow-sm">
            <MessageSquare className="size-4" aria-hidden />
          </span>
        </div>
      </div>

      {/* Conversation area — FIXED height (tall enough for the tallest scenario:
          closing bubble + result card) so the panel never grows/shrinks as the
          demo auto-cycles. Shorter states just center inside this height. */}
      <div className="relative flex h-[264px] flex-col justify-center gap-6 overflow-hidden py-4 sm:h-[276px] sm:gap-5">
        <AnimatePresence mode="popLayout">
          {shown.map(({ msg, i }) => (
            <Bubble key={`${si}-${i}`} sc={sc} msg={msg} />
          ))}
          {cardShown && <ResultCard key={`${si}-card`} sc={sc} />}
        </AnimatePresence>
      </div>

      {/* live footer */}
      <div className="relative flex items-center justify-between border-t border-blue-100/70 pt-3">
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
          <span className="flex size-4 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Globe className="size-2.5" aria-hidden />
          </span>
          {sc.lang} · Inbound Call
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
          <motion.span
            className="size-1.5 rounded-full bg-emerald-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          Live
        </span>
      </div>
    </div>
  )
}

/* ── Composed hero visual ── */
function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative mx-auto w-full max-w-[520px]"
    >
      {/* soft glow behind */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.12] blur-[90px]"
        aria-hidden
      />
      <CallPanel />
    </motion.div>
  )
}

export function Hero() {
  return (
    <section className="relative flex flex-col overflow-hidden border-b border-border/50 bg-gradient-to-b from-blue-50/50 via-background to-background lg:min-h-[calc(100vh-64px)] lg:justify-center">
      {/* Glow */}
      <div aria-hidden className="pointer-events-none absolute -top-32 right-0 h-[620px] w-[820px] rounded-full bg-primary/[0.1] blur-[130px]" />

      <div className="relative w-full px-6 pb-6 pt-3 md:px-8 md:pb-8 md:pt-4">
        <div className="grid items-stretch gap-14 lg:grid-cols-2 lg:gap-12">

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
                <Link href="/features">
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  Features
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

            {/* Stats card — pinned to the bottom so it aligns with the panel */}
            <ScrollReveal className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border/60 sm:grid-cols-4">
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

          {/* ── Right: hero visual ── */}
          <div id="demo-audio" className="flex scroll-mt-24 items-center justify-center lg:pt-2">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
