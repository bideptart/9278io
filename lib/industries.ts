import {
  Home,
  Wrench,
  UtensilsCrossed,
  Car,
  Scale,
  GraduationCap,
  ShoppingBag,
  Dumbbell,
  Landmark,
  Headphones,
  type LucideIcon,
} from "lucide-react"

export type ConversationLine = { speaker: "Agent" | "Caller"; text: string }

export type Industry = {
  slug: string
  name: string
  icon: LucideIcon
  short: string
  /** 2-3 sentence positioning paragraph for the dedicated section. */
  pitch: string
  /** Bullet points: things the agent does on day one. */
  jobs: string[]
  /** A handful of representative real-world phrases the agent handles well. */
  sampleLines: string[]
  /** Capability tags surfaced on the home-page cards and industry pages. */
  caps: string[]
  /** Short multilingual agent↔caller exchange shown as a live preview. */
  conversation: ConversationLine[]
}

/* Capability tag colours — shared with the home-page Industries section. */
export const CAP_COLORS: Record<string, string> = {
  "Inbound":          "border-blue-500/25 bg-blue-500/10 text-blue-600",
  "24/7 Calling":     "border-green-500/25 bg-green-500/10 text-green-600",
  "Hindi & Regional": "border-primary/25 bg-primary/10 text-primary",
  "Lead Qualify":     "border-purple-500/25 bg-purple-500/10 text-purple-600",
  "TRAI Compliant":   "border-red-500/25 bg-red-500/10 text-red-600",
  "Appointment":      "border-cyan-500/25 bg-cyan-500/10 text-cyan-600",
  "EMI Reminder":     "border-yellow-500/25 bg-yellow-500/10 text-yellow-600",
  "DPDP Ready":       "border-pink-500/25 bg-pink-500/10 text-pink-600",
  "Multilingual":     "border-primary/25 bg-primary/10 text-primary",
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "real-estate",
    name: "Real estate",
    icon: Home,
    short:
      "Qualify buyer & seller leads 24/7, book site visits on your calendar, and follow up the moment a listing gets a hit.",
    pitch:
      "Most leads are lost because no one answers within the first five minutes. 9278.io instantly answers every call, qualifies buyers and sellers in their preferred Indian language, and books site visits directly to your calendar.",
    jobs: [
      "Answer Housing.com, MagicBricks and 99acres leads in under 3 seconds",
      "Qualify budget, timeline, home-loan status, and motivation",
      "Book and reschedule site visits on your team calendar",
      "Send listing follow-ups by SMS and WhatsApp",
      "Hand warm buyers off to your top agent live on the call",
    ],
    sampleLines: [
      "Hi! I saw you just enquired about the 2BHK in Kothrud — are you working with an agent yet?",
      "Quick question — is your home loan pre-approved, or would you like me to introduce a lender?",
      "I have Tuesday at 4 or Saturday at 11 open for a site visit — which works better?",
    ],
    caps: ["24/7 Calling", "Lead Qualify", "Appointment"],
    conversation: [
      { speaker: "Agent", text: "வணக்கம்! நீங்கள் 2BHK அபார்ட்மெண்ட் பார்க்க விரும்புகிறீர்களா?" },
      { speaker: "Caller", text: "ஆமாம், புனேவில் பார்க்க வேண்டும்." },
    ],
  },
  {
    slug: "home-services",
    name: "Home services",
    icon: Wrench,
    short:
      "Capture every after-hours service request, dispatch the right tech, and never lose a job to a slow callback again.",
    pitch:
      "Every missed call is a missed job—especially after hours and on weekends. 9278.io answers instantly, captures job details, prioritizes emergencies, and books the right technician directly to your dispatch board.",
    jobs: [
      "After-hours emergency intake (AC failure, no power, water leak)",
      "Same-day vs scheduled job triage",
      "Direct booking on Urban Company and your dispatch tools",
      "Quote ranges based on job type and PIN code",
      "Estimate-day reminders and arrival-window updates over WhatsApp",
    ],
    sampleLines: [
      "Got it — AC stopped cooling, started this afternoon, and you have a small child at home. I'm marking this priority.",
      "Our next emergency window is 7–9pm tonight. Visit charge is ₹499 plus parts. Shall I lock that in?",
      "तकनीशियन 22 मिनट में पहुंच जाएगा। दरवाज़े पर पहुंचते ही मैं आपको WhatsApp कर दूंगी।",
    ],
    caps: ["Inbound", "24/7 Calling", "Appointment"],
    conversation: [
      { speaker: "Agent", text: "नमस्ते! आपको कौन सी सेवा चाहिए — AC, प्लंबिंग या इलेक्ट्रिकल?" },
      { speaker: "Caller", text: "AC ठंडा नहीं कर रहा, आज ही चाहिए." },
    ],
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    icon: UtensilsCrossed,
    short:
      "Take reservations, confirm large parties, answer hours and menu questions — fluently, in any language.",
    pitch:
      "Phones during dinner rush are a tax on your hosts. 9278.io handles reservations and confirms large parties — so the host stand can focus on the room.",
    jobs: [
      "Reservation booking and modification on Zomato / EazyDiner / Dineout",
      "Large-party and private-event qualification",
      "Hours, parking, and dress-code questions",
      "Allergen and dietary inquiries with menu lookups",
      "Catering and gift-card lead capture",
    ],
    sampleLines: [
      "We have a 4-top open Friday at 7:30 or 8:45 — which would you like?",
      "All our breads are made fresh — the butter naan pairs really well with the dal makhani.",
      "For a party of 12 we'd recommend the private dining room — let me grab a few details.",
    ],
    caps: ["Inbound", "24/7 Calling", "Appointment"],
    conversation: [
      { speaker: "Agent", text: "സ്പൈസ് ഗാർഡനിലേക്ക് സ്വാഗതം! എത്ര പേർക്ക് ടേബിള്‍ വേണം?" },
      { speaker: "Caller", text: "4 പേർക്ക്, ഇന്ന് രാത്രി 8 മണിക്ക്." },
    ],
  },
  {
    slug: "automotive",
    name: "Automotive",
    icon: Car,
    short:
      "Schedule service, follow up on test drives, and keep the BDC ringing 24 hours a day across every dealership.",
    pitch:
      "Indian dealerships still lose deals overnight. 9278.io handles service scheduling, test-drive follow-ups, parts inquiries, and exchange questions — for a single showroom or a multi-state dealer group on one platform.",
    jobs: [
      "Service appointment booking by registration number and mileage",
      "Test-drive follow-up and finance pre-qualification",
      "Parts and warranty inquiries",
      "Exchange valuation lead capture (CARS24 / Spinny / OLX)",
      "Loaner-vehicle dispatch coordination",
    ],
    sampleLines: [
      "Looks like your 2022 Maruti Brezza is due for the 30,000 km service. I have Thursday at 8 or Friday at 10:30 — which works?",
      "I can get you an exchange estimate on your trade-in via Spinny if you share the registration number — got a minute?",
      "Loaner vehicle is confirmed. We'll have it ready when you drop off Tuesday at 7:30am.",
    ],
    caps: ["Appointment", "EMI Reminder"],
    conversation: [
      { speaker: "Agent", text: "સાહેબ, તમારી કાર સર્વિસ આ અઠવાડિયે બાકી છે." },
      { speaker: "Caller", text: "શનિવારે 11 વાગ્યે બુક કરો." },
    ],
  },
  {
    slug: "legal",
    name: "Legal",
    icon: Scale,
    short:
      "Intake new clients, qualify cases by jurisdiction and statute of limitations, and book consults — without a paralegal stuck on the phone.",
    pitch:
      "Family-law, property-dispute and consumer-rights firms live on lead intake. 9278.io screens every inbound call against your conflict and qualification rules, captures the facts your advocates actually need, and books a paid consult before the lead shops you.",
    jobs: [
      "Practice-area routing and conflict checks",
      "Limitation-period and jurisdiction screening",
      "Paid-consult booking with Razorpay capture",
      "Document-collection reminders pre-consult",
      "Hindi, Tamil, Telugu intake out of the box",
    ],
    sampleLines: [
      "नमस्ते, मुझे आपकी संपत्ति विवाद के बारे में जानकर खेद है। क्या आपके पास मूल बिक्री विलेख (sale deed) उपलब्ध है?",
      "Got it — that's still within the three-year limitation period under the Limitation Act. Let me get you on the advocate's calendar.",
      "परामर्श से पहले, हमें आपका आधार और संपत्ति के दस्तावेज़ चाहिए होंगे।",
    ],
    caps: ["Inbound", "Appointment", "DPDP Ready"],
    conversation: [
      { speaker: "Agent", text: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਮੈਂ ਮੁਫ਼ਤ ਕਨਸਲਟੇਸ਼ਨ ਬੁੱਕ ਕਰ ਸਕਦਾ/ਸਕਦੀ ਹਾਂ।" },
      { speaker: "Caller", text: "ਹਾਂ, ਕੱਲ੍ਹ ਦੁਪਹਿਰ ਠੀਕ ਹੈ।" },
    ],
  },
  {
    slug: "education",
    name: "Education",
    icon: GraduationCap,
    short:
      "Admissions intake, fee-payment follow-ups, and student-success calls without burning out your counsellors.",
    pitch:
      "Coaching institutes and ed-tech platforms call hundreds of enquiries every day. 9278.io handles first-touch outreach, fee-document chasing, and re-enrollment campaigns across Hindi and regional languages — so counsellors only talk to leads who are actually ready.",
    jobs: [
      "Enquiry-form follow-up within 60 seconds",
      "Application status checks and document chasing",
      "Fee-payment Q&A and instalment reminders",
      "Batch-start reminders and orientation booking",
      "At-risk student check-ins between terms",
    ],
    sampleLines: [
      "Hi Priya — I saw you started an application for the NEET batch. Want me to walk you through next steps?",
      "Looks like we're still missing your board marksheet. Want me to WhatsApp you the upload link?",
      "Just checking in — the next batch starts on the 22nd. Are you still planning to register?",
    ],
    caps: ["Lead Qualify", "Multilingual"],
    conversation: [
      { speaker: "Agent", text: "प्रिया, NEET बॅचसाठी प्रवेश घ्यायचा आहे का?" },
      { speaker: "Caller", text: "फी किती आहे ते सांगाल का?" },
    ],
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    icon: ShoppingBag,
    short:
      "Order status, returns, fitting and sizing — handled 24/7 in any language, with a tone that matches your brand.",
    pitch:
      "D2C brands hit support volume spikes the moment they hit a marketing milestone. 9278.io absorbs the surge — order status, returns, sizing, and post-purchase upsells — and only escalates the genuinely angry customers to a human.",
    jobs: [
      "Order status and tracking updates",
      "Returns, exchanges, and warranty intake",
      "Sizing, fit, and product-recommendation Q&A",
      "Upsell and replenishment follow-up calls",
      "Win-back campaigns for lapsed customers",
    ],
    sampleLines: [
      "Looks like your order shipped Monday and is out for delivery today before 6pm.",
      "Totally understandable. I'll get a return label sent — should I refund to your original method or UPI?",
      "Based on your last order, the size 9 should fit a touch better than the 8.5. Want me to swap it?",
    ],
    caps: ["Inbound", "24/7 Calling", "Hindi & Regional"],
    conversation: [
      { speaker: "Agent", text: "ನಿಮ್ಮ ಆರ್ಡರ್ ಇಂದು ಡೆಲಿವರಿಗೆ ಹೊರಟಿದೆ!" },
      { speaker: "Caller", text: "ಚೆನ್ನಾಗಿದೆ, ಯಾವ ಸಮಯಕ್ಕೆ ಬರಲಿದೆ?" },
    ],
  },
  {
    slug: "fitness",
    name: "Fitness & wellness",
    icon: Dumbbell,
    short: "Class bookings, membership upsells, and no-show recovery for studios and gyms — without a front-desk human.",
    pitch:
      "Boutique gyms and yoga studios fill classes by phone and WhatsApp. 9278.io books classes, recovers no-shows, sells memberships, and re-engages lapsed members across Indian languages — at a fraction of the cost of a front-desk hire.",
    jobs: [
      "Class and trainer booking on your studio software",
      "Membership freeze, cancel, and upgrade requests",
      "No-show recovery within minutes of class end",
      "Trial-to-member upsell calls",
      "Win-back to lapsed members at month-end",
    ],
    sampleLines: [
      "Hey Ankit — saw you missed the 6am class. Want me to grab you the 5pm spot tonight?",
      "Your trial wraps on Friday. I can lock in the annual plan at ₹14,999 if I do it before Sunday — interested?",
      "We can freeze your membership for up to 90 days at no cost. Want me to set that up?",
    ],
    caps: ["Appointment", "Multilingual"],
    conversation: [
      { speaker: "Agent", text: "Your membership expires in 3 days, Ankit!" },
      { speaker: "Caller", text: "Renew kar do, 1 saal ka." },
    ],
  },
  {
    slug: "bfsi",
    name: "BFSI & fintech",
    icon: Landmark,
    short:
      "Qualify loan and insurance leads, chase EMI and premium dues, and run KYC and renewal reminders 24/7 — in Hindi and every regional language.",
    pitch:
      "Lending, insurance and fintech teams win on speed and compliance. 9278.io answers and places thousands of calls a day — qualifying loan applicants, reminding customers before an EMI or premium lapses, and winning back renewals — with every call recorded and consent-logged inside TRAI calling windows.",
    jobs: [
      "Qualify personal-loan, home-loan and credit-card leads, routing the hot ones to a human",
      "Pre-due and overdue EMI reminders with UPI and payment-link follow-through",
      "Insurance premium-renewal and policy-lapse win-back calls",
      "KYC and document-collection reminders before disbursal",
      "Every call recorded and consent-logged inside TRAI calling windows",
    ],
    sampleLines: [
      "नमस्ते, आपकी होम लोन EMI कल देय है — क्या मैं आपको भुगतान लिंक भेज दूँ?",
      "Quick check before we proceed — is your monthly income above ₹25,000, and do you have six months of salary slips?",
      "Your policy lapses on the 18th. I can renew it today and keep your no-claim bonus intact — shall I go ahead?",
    ],
    caps: ["Lead Qualify", "EMI Reminder", "DPDP Ready"],
    conversation: [
      { speaker: "Agent", text: "নমস্কার, আপনার EMI আগামীকাল বাকি আছে।" },
      { speaker: "Caller", text: "জি, আমি আগামীকাল পেমেন্ট করব।" },
    ],
  },
  {
    slug: "bpo",
    name: "BPO & call centres",
    icon: Headphones,
    short:
      "Automate Tier-1 inbound and outbound queues, answer every caller in under three seconds, and cut cost-per-call across all Indian languages — round the clock.",
    pitch:
      "Call centres bleed money on Tier-1 volume and attrition. 9278.io handles the repetitive inbound and outbound calls — balance checks, order status, verification, and surveys — and only escalates the calls that genuinely need a human.",
    jobs: [
      "Tier-1 inbound: balance checks and order status",
      "Outbound verification and CSAT survey campaigns",
      "First-level support with warm transfer on escalation",
      "Up to 40 concurrent calls per number",
      "Every call recorded inside TRAI calling windows",
    ],
    sampleLines: [
      "नमस्ते! मैं आपकी कैसे सहायता कर सकती हूँ — बैलेंस, ऑर्डर स्टेटस, या कुछ और?",
      "I've pulled up your account — your last recharge of ₹299 is active till the 27th. Anything else?",
      "This'll take two minutes — on a scale of 1 to 5, how was your recent support experience?",
    ],
    caps: ["Inbound", "24/7 Calling", "TRAI Compliant"],
    conversation: [
      { speaker: "Agent", text: "नमस्ते! आज मैं आपकी कैसे सहायता कर सकता हूँ?" },
      { speaker: "Caller", text: "Mujhe apna account balance jaanna hai." },
    ],
  },
]

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug)
}

/**
 * Picks `count` industries for a page's "Other industries we power" section,
 * rotated to a starting point derived from `currentSlug` so different pages
 * show different cards instead of everyone defaulting to the same first few
 * entries in INDUSTRIES (this also covers pages whose own slug — e.g.
 * logistics, remote-teams, saas-tech — isn't itself in the INDUSTRIES list).
 */
export function getRelatedIndustries(currentSlug: string, count = 3): Industry[] {
  const pool = INDUSTRIES.filter((i) => i.slug !== currentSlug)
  let seed = 0
  for (let i = 0; i < currentSlug.length; i++) seed += currentSlug.charCodeAt(i)
  const start = pool.length ? seed % pool.length : 0
  return [...pool.slice(start), ...pool.slice(0, start)].slice(0, count)
}
