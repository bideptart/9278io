export type FaqItem = {
  q: string
  a: string
}

export type FaqGroup = {
  id: string
  title: string
  items: FaqItem[]
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "billing",
    title: "Billing & credit",
    items: [
      {
        q: "How does pricing work?",
        a: "You pick a plan and get billed once as wallet credit: Starter ₹3,000 (250 included minutes), Growth ₹8,800 (800 included minutes), or Scale ₹30,000 (3,000 included minutes). The effective rate is ₹12/min on Starter, ₹11/min on Growth, and ₹10/min on Scale, with overage at ₹12/min, ₹11/min, and ₹10/min respectively. There are no setup fees and no contracts. Prices are in ₹ and GST is charged at checkout.",
      },
      {
        q: "Do you accept Indian payment methods?",
        a: "Yes. We accept all major Indian payment methods — UPI (Google Pay, PhonePe, Paytm), net banking, debit and credit cards (Visa, Mastercard, RuPay), and EMI. Payments are processed securely through Razorpay.",
      },
      {
        q: "Do I get a GST invoice?",
        a: "Yes. Every top-up generates a GST-compliant tax invoice automatically. You can download invoices from your dashboard at any time for accounting and reimbursement.",
      },
      {
        q: "Do my voice minutes expire?",
        a: "Your plan is billed once as wallet credit. You can top up again any time as you scale usage.",
      },
      {
        q: "Can I top up more than ₹30,000?",
        a: "Yes. You can top up multiple times in any combination. High-volume BPOs and enterprise teams typically run multiple Scale top-ups a week. Contact us for custom volume pricing.",
      },
      {
        q: "Are there any hidden fees?",
        a: "No. The only line items on your bill are voice credit (one-time) and phone numbers (monthly, only if you provision one). We don't charge for transcription, recording, integrations, or concurrency.",
      },
      {
        q: "Do you offer refunds?",
        a: "If you experience a service issue we'll always make it right. Unused credit purchased within the last 14 days is refundable on request.",
      },
    ],
  },
  {
    id: "phone-numbers",
    title: "Phone numbers & connectivity",
    items: [
      {
        q: "Do I need to buy an Indian phone number?",
        a: "No. You can use our shared connectivity for free for web-call testing and inbound demos. You only need a dedicated DID if you want a real, persistent branded inbound Indian number.",
      },
      {
        q: "What does an Indian phone number cost?",
        a: "₹400/month for Indian landline and mobile DIDs across all major cities and states. Phone-number rates renew every 30 days.",
      },
      {
        q: "Which states and cities can you provision Indian numbers in?",
        a: "We can provision Indian numbers across all major telecom circles — Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, Kolkata, Pune, Ahmedabad, and every other state. Numbers are provisioned through TRAI-licensed carriers including Jio, Airtel, BSNL, and Vi.",
      },
      {
        q: "Can I keep my existing Indian number?",
        a: "Yes — both via SIP trunking (point your existing carrier at our SIP endpoint) and via full porting. We handle the paperwork with TRAI-licensed carriers.",
      },
      {
        q: "Are calls carrier-grade on Indian networks?",
        a: "Yes. We run on TRAI-licensed Tier-1 carriers in India with HD-voice codecs, call-quality monitoring on every leg, and TRAI calling-window enforcement built in.",
      },
    ],
  },
  {
    id: "languages",
    title: "Indian languages & voices",
    items: [
      {
        q: "Which Indian languages do you support?",
        a: "We support 10+ Indian languages including Hindi, Tamil, Telugu, Kannada, Marathi, Bengali, Gujarati, Punjabi, Malayalam, Odia, Assamese, Urdu, Rajasthani, Bhojpuri, and Maithili — with native-sounding voices and sub-second latency in all of them.",
      },
      {
        q: "Can the agent switch languages mid-call?",
        a: "Yes. Our agents auto-detect the caller's language and switch seamlessly mid-call. A caller can start in Hindi and switch to English — the agent follows without missing a beat.",
      },
      {
        q: "Do the voices sound natural for Indian callers?",
        a: "Yes. Our TTS models are trained on native Indian speech patterns, regional accents, and natural conversation cadence — not generic English voices with an Indian accent filter. Callers consistently rate the experience as natural and easy to understand.",
      },
    ],
  },
  {
    id: "agents",
    title: "Agents & capabilities",
    items: [
      {
        q: "How many concurrent AI agents do I get?",
        a: "2 on Starter, 10 on Growth, and unlimited on Scale. That’s how many AI voice agents can run in parallel for your account.",
      },
      {
        q: "Does it integrate with Indian CRMs and tools?",
        a: "Yes. We have native integrations with Zoho CRM, Freshworks, LeadSquared, Razorpay, WhatsApp Business API, IndiaMART, Tally, and 200+ other tools via webhooks and Zapier. Custom integrations are part of the Growth and Scale plans.",
      },
      {
        q: "Can the agent handle WhatsApp calls and messages?",
        a: "Yes. Growth and Scale plans include WhatsApp Business API integration. Your agent can send follow-up messages, appointment confirmations, and reminders via WhatsApp after a voice call.",
      },
      {
        q: "Can the agent transfer to a human?",
        a: "Yes. Warm transfers, cold transfers, conference, and IVR-style routing are all supported, and you can define the trigger conditions in plain English or Hindi.",
      },
      {
        q: "Can I record and transcribe every call?",
        a: "Yes — included on every plan, with PII redaction options. Recordings and transcripts live in your dashboard and can be pushed to your CRM, WhatsApp, or webhook.",
      },
    ],
  },
  {
    id: "compliance",
    title: "Compliance & data",
    items: [
      {
        q: "Is 9278.io TRAI compliant?",
        a: "Yes. We enforce TRAI calling-window rules (no calls before 9 AM or after 9 PM) and consent capture flows. TRAI compliance is built into every plan — not an add-on.",
      },
      {
        q: "Where is my data stored?",
        a: "All call audio, transcripts, and metadata are stored in encrypted data centres in Mumbai and Hyderabad. Data never leaves India. This is compliant with the Digital Personal Data Protection (DPDP) Act 2023.",
      },
      {
        q: "Are you DPDP Act compliant?",
        a: "Yes. We are aligned with India's Digital Personal Data Protection Act 2023 — data localisation in India, consent management, PII redaction, and the right to erasure are all supported.",
      },
      {
        q: "How do you handle consent and compliance?",
        a: "Consent capture flows and configurable calling-window enforcement are included on every plan. You're responsible for your use-case compliance — we provide the guardrails.",
      },
    ],
  },
  {
    id: "account",
    title: "Account & support",
    items: [
      {
        q: "Where do I sign in?",
        a: "Your dashboard lives at https://voice.9278.io/signin. You can review usage, top up credit, manage Indian phone numbers, edit agent prompts, and download GST invoices.",
      },
      {
        q: "How fast can I be live?",
        a: "Most teams launch their first agent in under 5 minutes from sign-up. Migrating an existing 24/7 inbound flow with full CRM integration typically takes 1–3 days.",
      },
      {
        q: "What support is included?",
        a: "Email support on Starter, priority email + chat on Growth, and a dedicated success manager on Scale. We respond to billing and outage issues 24/7 on every plan. Support is available in Hindi and English.",
      },
    ],
  },
]

export const FLAT_FAQ: FaqItem[] = FAQ_GROUPS.flatMap((g) => g.items)
