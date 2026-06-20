import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/legal-page"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "Call Recording & Consent Notice — 9278.io",
  description: "How call recording and transcription work on 9278.io, and your consent obligations under the DPDP Act.",
  path: "/call-recording",
})

const BODY = "This Notice explains how call recording and transcription work on 9278.io and your obligations when you enable them. It supports the Terms, AUP, Privacy Policy, and Data Processing Addendum. When your AI agent records or transcribes calls, you are the Data Fiduciary and 9278.io is your Data Processor; the legal duty to record lawfully is yours.\n\n1. FEATURES\n• Call recording — inbound calls handled by your AI agent can be recorded (default retention of 30 days).\n• Transcription — real-time transcripts and AI summaries are generated.\n• Call forwarding — calls may be routed to your human team’s numbers.\n\n2. CONSENT AND NOTICE (DPDPA + IT ACT)\nA recording of an identifiable caller is personal data under the DPDPA. You must give callers clear notice that the call is being recorded and processed, and obtain consent or another lawful basis. Best practice (and the platform default) is an opening announcement that the call is recorded and handled by an AI assistant, allowing the caller to proceed or opt out. Recording without lawful basis can expose you to liability under the DPDPA and IT Act.\n\n3. RETENTION, SECURITY AND ACCESS\nRecordings and transcripts are stored on our India-based infrastructure, encrypted in transit and at rest, and accessible to you through the dashboard. You control retention (a period you configure); keep recordings no longer than necessary. Data Principals (callers) may request access, correction, or erasure via the relevant business (Data Fiduciary); 9278.io will assist as Data Processor.\n\n4. LAWFUL REQUESTS\nWe may be required to preserve or produce recordings in response to a lawful order or under the Telecommunications Act, 2023 / IT Act s.69. We do not disclose recordings except as required by law or to prevent imminent harm.\n\n5. PROHIBITED USE\nDo not use recording to entrap or deceive, to capture conversations unlawfully, or to record children without verifiable parental consent. Do not combine recordings with AI to impersonate individuals (see the AI Voice Disclosure & Responsible-AI Policy).\n\nCONTACT\nPrivacy: privacy@9278.io · Grievance Officer: grievance@9278.io · Support: support@9278.io\nSwadesh Mobile Private Limited (9278.io), 1108, Sureshwari Techno IT Park Premises CHS, Link Road, Borivali West, Mumbai, Maharashtra 400092, India."

export default function Page() {
  return (
    <LegalPage
      title={"Call Recording & Consent Notice"}
      lastUpdated="20 June 2026"
      operator="Operated by Swadesh Mobile Private Limited · India"
      path={"/call-recording"}
      body={BODY}
    />
  )
}
