import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/legal-page"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "Acceptable Use Policy — 9278.io",
  description: "What you may and may not do on 9278.io — TRAI/DLT, AI-voice disclosure, and prohibited-use rules.",
  path: "/acceptable-use",
})

const BODY = "This Acceptable Use Policy (“AUP”) is part of the Terms of Service. It applies to you, your users, and any AI agent you configure. Breach can lead to suspension or termination and to reporting to TRAI/DoT/law enforcement. Examples are not exhaustive.\n\n1. LAWFUL USE\nUse the Services only for lawful business communication in India and in line with the Telecommunications Act, 2023, the IT Act, 2000, the DPDPA, 2023, TRAI’s TCCCPR, 2018 and the DLT framework, and the Consumer Protection Act, 2019.\n\n2. COMMERCIAL CALLING & MESSAGING (TRAI / DLT / DND)\nFor any outbound or commercial communication, you must:\n• be registered on the DLT (Distributed Ledger Technology) platform as required by TCCCPR, with registered headers and approved content templates;\n• obtain and maintain verifiable consent for promotional communications, and scrub against the National Customer Preference Register (NCPR/DND) before contacting any number;\n• respect permitted calling-time windows (e.g. not before 9:00 am or after 9:00 pm for commercial calls) and honour opt-out/STOP requests promptly;\n• not place unsolicited commercial communications (UCC), bulk spam, or unregistered telemarketing traffic;\n• not spoof or falsify caller identity, or evade DND, traceability, or numbering rules.\nThe platform provides DND scrubbing and calling-window controls; you remain responsible for DLT registration, consent, and lawful campaign content.\n\n3. AI VOICE — DISCLOSURE AND CONDUCT\nYour AI agent must clearly disclose to callers that they are speaking with an automated/AI system, not a human, and (where calls are recorded) that the call is recorded. You must not use AI voice to impersonate a specific real person, to create deepfake or deceptive audio, or to mislead callers. See the AI Voice Disclosure & Responsible-AI Policy.\n\n4. PROHIBITED CONTENT AND CONDUCT\n• fraud, phishing, vishing, social-engineering, or financial scams;\n• harassment, threats, hate speech, or content unlawful under Indian law (including the Bharatiya Nyaya Sanhita, IT Rules, and Films/Publications laws);\n• malware or attempts to gain unauthorised access to any system;\n• misuse of personal data obtained through the Services contrary to the DPDPA;\n• evading lawful interception, sanctions, or contacting barred destinations.\n\n5. SERVICE INTEGRITY AND FRAUD\nDo not resell except as your plan permits; place artificial, fraudulent, or traffic-pumping traffic; share one account to evade limits; or degrade the network. We run fraud and toll-fraud monitoring and may block suspicious traffic and report it to TRAI/DoT or law enforcement.\n\n6. ENFORCEMENT\nReport abuse to grievance@9278.io. We may investigate, suspend or terminate, block traffic, remove content, and cooperate with TRAI, DoT, the Data Protection Board, and law enforcement; for fraud, illegal traffic, or safety risks we may act immediately. To appeal, email legal@9278.io. We may update this AUP on reasonable notice.\n\nCONTACT\nLegal: legal@9278.io · Grievance Officer: grievance@9278.io · Support: support@9278.io\nSwadesh Mobile Private Limited (9278.io), 1108, Sureshwari Techno IT Park Premises CHS, Link Road, Borivali West, Mumbai, Maharashtra 400092, India."

export default function Page() {
  return (
    <LegalPage
      title={"Acceptable Use Policy"}
      lastUpdated="20 June 2026"
      operator="Operated by Swadesh Mobile Private Limited · India"
      path={"/acceptable-use"}
      body={BODY}
    />
  )
}
