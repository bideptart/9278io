import {
  Home,
  Stethoscope,
  HeartPulse,
  Wrench,
  UtensilsCrossed,
  Car,
  Scale,
  GraduationCap,
  ShoppingBag,
  Dumbbell,
  type LucideIcon,
} from "lucide-react"

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
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "real-estate",
    name: "Real estate",
    icon: Home,
    short:
      "Qualify buyer & seller leads 24/7, book showings on your calendar, and follow up the moment a listing gets a hit.",
    pitch:
      "Most leads die because no one picks up in the first five minutes. 9278.io answers every inbound call instantly, qualifies buyers and sellers, and books showings directly on your calendar — so you walk into every conversation with context, not voicemail.",
    jobs: [
      "Answer Zillow, Redfin and website leads in under 3 seconds",
      "Qualify budget, timeline, financing, and motivation",
      "Book and reschedule showings on your team calendar",
      "Send listing follow-ups by SMS and email",
      "Hand warm buyers off to your top agent live on the call",
    ],
    sampleLines: [
      "Hi! I saw you just inquired about the colonial on Maple — are you working with an agent yet?",
      "Quick question — are you pre-approved, or would you like me to introduce a lender?",
      "I have Tuesday at 4 or Saturday at 11 open for a showing — which works better?",
    ],
  },
  {
    slug: "dental",
    name: "Dental practices",
    icon: Stethoscope,
    short:
      "Confirm appointments, fill last-minute cancellations, and answer insurance & treatment questions without tying up the front desk.",
    pitch:
      "Front desks miss 20–40% of inbound calls during lunch and after hours. 9278.io picks up every one — confirms cleanings, reschedules cancellations, answers insurance questions, and only routes the genuine emergencies to your team.",
    jobs: [
      "Confirm and reschedule cleanings, hygiene, and ortho visits",
      "Fill last-minute openings from your cancellation list",
      "Verify benefits and explain estimated patient cost",
      "Triage emergencies (toothache, broken crown) and warm-transfer",
      "Send pre-visit instructions and intake forms automatically",
    ],
    sampleLines: [
      "Hi Mrs. Patel, this is the office at Sunrise Dental confirming your cleaning tomorrow at 2:30. Reply 1 to confirm or 2 to reschedule.",
      "Sure — your plan covers two cleanings a year, and your last one was in January, so you're due.",
      "That sounds like a real toothache. Let me get Dr. Lee on the line right now.",
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare clinics",
    icon: HeartPulse,
    short: "Patient intake, prescription refills, and reminder calls with a calm, DPDP-compliant bedside tone.",
    pitch:
      "Indian clinics and hospital chains are drowning in repetitive phone work. 9278.io automates intake, refill requests, post-visit follow-ups, and benefits questions — with a warm, paced bedside tone in Hindi, Tamil, Telugu and other regional languages that patients actually respond to.",
    jobs: [
      "New patient intake and demographic capture",
      "Prescription refill requests routed to pharmacy",
      "Post-discharge follow-up and symptom tracking",
      "Appointment reminders with re-confirmation flow",
      "Benefits and copay explanations",
    ],
    sampleLines: [
      "Just checking in — on a scale of 0 to 10, how is your pain today compared to right after surgery?",
      "Of course. I can request a refill for your telmisartan at the Apollo Pharmacy nearby — does that still work for you?",
      "एक गहरी सांस लीजिए। मैं आपसे कुछ छोटे सवाल पूछूंगी, फिर डॉक्टर दस मिनट में आपको कॉल करेंगे।",
    ],
  },
  {
    slug: "home-services",
    name: "Home services",
    icon: Wrench,
    short:
      "Capture every after-hours service request, dispatch the right tech, and never lose a job to a slow callback again.",
    pitch:
      "AC, plumbing, electrical and home-repair contractors live and die by callback speed. 9278.io answers every after-hours and weekend call, captures the job details, surge-prices emergencies, and books the right technician on your dispatch board — across Tier-1 and Tier-2 Indian cities.",
    jobs: [
      "After-hours emergency intake (AC failure, no power, water leak)",
      "Same-day vs scheduled job triage",
      "Direct booking on Urban Company, ServiceTitan and dispatch tools",
      "Quote ranges based on job type and PIN code",
      "Estimate-day reminders and arrival-window updates over WhatsApp",
    ],
    sampleLines: [
      "Got it — AC stopped cooling, started this afternoon, and you have a small child at home. I'm marking this priority.",
      "Our next emergency window is 7–9pm tonight. Visit charge is ₹499 plus parts. Shall I lock that in?",
      "तकनीशियन 22 मिनट में पहुंच जाएगा। दरवाज़े पर पहुंचते ही मैं आपको WhatsApp कर दूंगी।",
    ],
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    icon: UtensilsCrossed,
    short:
      "Take reservations, confirm large parties, answer hours and menu questions — fluently, in any accent.",
    pitch:
      "Phones during dinner rush are a tax on your hosts. 9278.io handles reservations, confirms large parties, answers hours and menu questions, and routes catering inquiries — so the host stand can focus on the room.",
    jobs: [
      "Reservation booking and modification on Zomato / EazyDiner / Dineout",
      "Large-party and private-event qualification",
      "Hours, parking, and dress-code questions",
      "Allergen and dietary inquiries with menu lookups",
      "Catering and gift-card lead capture",
    ],
    sampleLines: [
      "We have a 4-top open Friday at 7:30 or 8:45 — which would you like?",
      "All our pasta is made fresh daily. The tagliatelle is egg-based, but the spaghetti is vegan.",
      "For a party of 12 we'd recommend the back room — let me grab a few details.",
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
  },
  {
    slug: "education",
    name: "Education",
    icon: GraduationCap,
    short:
      "Admissions intake, financial-aid follow-ups, and student-success calls without burning out enrollment counselors.",
    pitch:
      "Higher-ed and trade schools call hundreds of inquiries every day. 9278.io handles first-touch outreach, financial-aid document chasing, and re-enrollment campaigns — so counselors only talk to leads who are actually ready.",
    jobs: [
      "Inquiry-form follow-up within 60 seconds",
      "Application status checks and document chasing",
      "Financial-aid Q&A and FAFSA reminders",
      "Class-start reminders and orientation booking",
      "At-risk student check-ins between terms",
    ],
    sampleLines: [
      "Hi Marcus — I saw you started an application for the medical-assisting program. Want me to walk you through next steps?",
      "Looks like we're still missing your high-school transcript. Want me to text you the upload link?",
      "Just checking in — the next term starts Jan 22. Are you still planning to register?",
    ],
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    icon: ShoppingBag,
    short:
      "Order status, returns, fitting and sizing — handled 24/7 in any language, with a tone that matches your brand.",
    pitch:
      "DTC brands hit support volume spikes the moment they hit a marketing milestone. 9278.io absorbs the surge — order status, returns, sizing, and post-purchase upsells — and only escalates the genuinely angry customers to a human.",
    jobs: [
      "Order status and tracking updates",
      "Returns, exchanges, and warranty intake",
      "Sizing, fit, and product-recommendation Q&A",
      "Upsell and replenishment follow-up calls",
      "Win-back campaigns for lapsed customers",
    ],
    sampleLines: [
      "Looks like your order shipped Monday and is out for delivery today before 6pm.",
      "Totally understandable. I'll get a return label sent — should I refund to the card you paid with?",
      "Based on your last order, the size 9 should fit a touch better than the 8.5. Want me to swap it?",
    ],
  },
  {
    slug: "fitness",
    name: "Fitness & wellness",
    icon: Dumbbell,
    short: "Class bookings, membership upsells, and no-show recovery for studios and gyms — without a front-desk human.",
    pitch:
      "Boutique gyms, yoga studios and PT clinics fill classes by phone and SMS. 9278.io books classes, recovers no-shows, sells memberships, and re-engages lapsed members — at a fraction of the cost of an answering service.",
    jobs: [
      "Class and trainer booking on Mindbody, Mariana Tek, ClubReady",
      "Membership freeze, cancel, and upgrade requests",
      "No-show recovery within minutes of class end",
      "Trial-to-member upsell calls",
      "Win-back to lapsed members at month-end",
    ],
    sampleLines: [
      "Hey Sam — saw you missed the 6am class. Want me to grab you the 5pm spot tonight?",
      "Your trial wraps on Friday. I can lock in the unlimited plan at $149 if I do it before Sunday — interested?",
      "We can freeze your membership for up to 90 days at no cost. Want me to set that up?",
    ],
  },
]

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug)
}
