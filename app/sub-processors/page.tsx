import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/legal-page"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "Sub-Processor List — 9278.io",
  description: "The third-party sub-processors 9278.io engages to help provide the Services.",
  path: "/sub-processors",
})

const BODY = "This page lists the third parties (sub-processors) 9278.io engages to process personal data to help provide the Services, in line with our Privacy Policy and Data Processing Addendum. We impose DPDPA-aligned obligations on each sub-processor, remain responsible for their performance, and give reasonable notice of material changes.\n\nWe review this list periodically. For the current, detailed sub-processor register, or to object to a new sub-processor, contact privacy@9278.io.\n\n1. INFRASTRUCTURE & HOSTING\n• Cloud hosting and storage — application hosting, database, and recording/transcript storage on infrastructure located in India.\n• CDN & security provider — content delivery, DDoS protection, and edge security.\n\n2. TELECOM & VOICE\n• Licensed Indian telecom service providers and SIP-trunk partners (including Jio, Airtel, BSNL, and Vi) — Indian numbers (DIDs) and call origination/termination — India.\n• DLT / SMS provider, where used — registered messaging and DLT — India.\n\n3. AI (LLM / SPEECH)\n• Google (Gemini) and OpenAI — language understanding and generation — processed under contract; your call content is not used to train their models.\n• Speech-to-text and text-to-speech providers — transcription and AI voice — processed under contract.\n\n4. PAYMENTS, EMAIL & SUPPORT\n• Razorpay and Stripe — payments and GST invoicing.\n• Transactional email provider — account and notification emails.\n• In-house support tooling — support tickets and chat.\n\nCONTACT\nPrivacy: privacy@9278.io · Support: support@9278.io\nSwadesh Mobile Private Limited (9278.io), 1108, Sureshwari Techno IT Park Premises CHS, Link Road, Borivali West, Mumbai, Maharashtra 400092, India."

export default function Page() {
  return (
    <LegalPage
      title={"Sub-Processor List"}
      lastUpdated="20 June 2026"
      operator="Operated by Swadesh Mobile Private Limited · India"
      path={"/sub-processors"}
      body={BODY}
    />
  )
}
