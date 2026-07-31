// Short, factual summaries of each FAQ group's real content (see lib/faq.ts).
// Used on the /faq page's category list and detail sections — condensed and
// rephrased from answers that already exist there, nothing invented.

export const FAQ_GROUP_BLURBS: Record<string, string> = {
  billing: "Wallet credit, GST invoices, and refunds — no contracts, no setup fees.",
  "phone-numbers": "Indian DIDs from ₹400/month, porting, and SIP trunking on Tier-1 carriers.",
  languages: "10+ Indian languages with native TTS and sub-second latency.",
  agents: "2 to unlimited concurrent agents, CRM and WhatsApp integrations, human handoff.",
  compliance: "TRAI calling-window enforcement and DPDP Act 2023 alignment, built in.",
  account: "Go live in under 5 minutes, with support tiers from email to a dedicated manager.",
}

export const FAQ_GROUP_INTROS: Record<string, string> = {
  billing:
    "Every plan is billed once as wallet credit — Starter, Growth, or Scale — with a GST-compliant invoice generated automatically on each top-up. Credit and minutes stay valid for 60 days, and unused credit is refundable within 14 days of purchase.",
  "phone-numbers":
    "Indian landline and mobile DIDs run ₹400/month across every major telecom circle, provisioned through TRAI-licensed carriers like Jio, Airtel, and Vi. Keep your existing number by porting it in, or connect an existing carrier over SIP trunking.",
  languages:
    "9278.io speaks 10+ Indian languages natively — Hindi, Tamil, Telugu, Bengali, and more — with sub-second latency and voices trained on real regional accents, not an English model with an accent filter. Agents auto-detect the caller's language and switch mid-call without missing a beat.",
  agents:
    "Concurrency scales from 2 agents on Starter to unlimited on Scale, with native integrations into Zoho, Freshworks, and WhatsApp Business API on every plan. Calls transfer warm or cold to a human the moment a conversation needs one.",
  compliance:
    "TRAI's 9 AM–9 PM calling window and consent-capture flows are enforced on every plan, not sold as an add-on. 9278.io is aligned with India's DPDP Act 2023, storing all call audio and transcripts exclusively in Mumbai and Hyderabad data centres.",
  account:
    "Most teams launch their first live agent in under five minutes from sign-up, and the dashboard at voice.9278.io covers usage, phone numbers, and GST invoices in one place. Support scales from email on Starter to a dedicated success manager on Scale.",
}
