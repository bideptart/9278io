import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"

export const metadata: Metadata = pageSeo({
  title: "Privacy Policy — 9278.io",
  description:
    "How Swadesh Mobile collects, uses, stores, and protects your information when you use 9278.io and voice.9278.io.",
  path: "/privacy-policy",
  noindex: false,
})

const LAST_UPDATED = "10 June 2026"

const PRIVACY_POLICY_TEXT = `Privacy Policy
Last updated: 10 June 2026

1. Introduction
Welcome to 9278.io (referred to as "9278.io", "we", "us", or "our"). 9278.io is a brand owned and operated by Swadesh Mobile, providing AI voice receptionist services — including virtual phone number provisioning, realtime conversational voice agents, multilingual transcription, and call recording — to businesses across India and globally.

This Privacy Policy explains how Swadesh Mobile collects, uses, stores, processes, discloses, and protects your information when you visit voice.9278.io, register for an account, purchase or use any of our services, integrate with our APIs, or interact with our support team.

By accessing our website or using any 9278.io service, you confirm that you have read, understood, and agreed to this Privacy Policy. If you do not agree, please discontinue use immediately.

This Policy should be read together with our Terms & Conditions and any executed Data Processing Addendum.

2. Definitions
"Personal Information" means any information that relates to an identified or identifiable natural person, as defined under the Digital Personal Data Protection Act, 2023 (DPDP Act) and the Information Technology Act, 2000.
"Customer Data" means information that you, the 9278.io customer, upload or transmit through our platform — including agent prompts, knowledge base entries, greetings, voice configurations, call recordings, and transcripts.
"End-Recipient" means the individual on the other end of a call placed or received via the 9278.io platform.
"Services" means all 9278.io products including DID provisioning, AI voice agents, realtime LLM-driven conversation, transcription, recording, analytics, and any future services.

3. Information We Collect
3.1 Information You Provide to Us
Account registration data: name, business name, email address, mobile number, password, GSTIN, PAN, billing address, and authorised signatory details.
KYC and onboarding documents required for DID acquisition and TRAI / DLT compliance.
Payment information: card details, UPI ID, bank account details, and transaction records (processed through PCI-DSS-compliant payment gateways; we do not store full card numbers on our servers).
Communications you send to our sales, support, billing, or grievance teams (including email, ticket, chat, and any recorded interactions).
3.2 Customer Data You Upload to Process
Voice agent configuration — greeting text, system prompts, persona definitions, and knowledge base entries.
Per-call audio recordings, transcripts, and AI-generated summaries.
End-recipient phone numbers and conversation metadata captured during inbound or outbound calls.
3.3 Information Collected Automatically
Device and connection data: IP address, browser type, device identifiers, operating system, time zone, and language settings.
Usage data: pages visited, features used, API calls made, call statistics, and platform interactions.
Call telemetry: duration, jitter, latency, end reason, and quality scores returned by our voice runtime and carrier partners.
Cookies, web beacons, and similar tracking technologies — see Section 10 below.
3.4 Information from Third Parties
Identity verification, anti-fraud, and credit-risk information from authorised partners.
Profile data from authentication providers if you sign in via Google, Microsoft, or similar.
Information from Razorpay, telecom operators, LLM providers (Google, OpenAI), and other integration partners.

4. How We Use Your Information
To create and manage your 9278.io account, verify your identity, and complete KYC / DLT onboarding.
To deliver the Services — including provisioning DIDs, routing calls, generating AI responses, transcribing audio, and storing recordings.
To process payments, issue invoices, calculate wallet balances, and manage subscriptions.
To provide customer support, respond to grievances, and resolve technical issues.
To improve, troubleshoot, and develop new features for our platform.
To send service notifications, security alerts, billing reminders, and policy updates (transactional, cannot be opted out of while you remain a customer).
To send promotional communications about our Services — you may opt out of marketing emails at any time.
To detect, prevent, and investigate fraud, abuse, spam, security incidents, and violations of our Acceptable Use Policy.
To comply with applicable laws, regulatory obligations, court orders, and lawful requests from government authorities in India and abroad.

5. AI Voice Agent & Telecom Compliance
Our AI voice agents are powered by realtime large-language-model services (currently Google Gemini and OpenAI). When a call is handled by your agent:

The audio stream, transcription, and LLM responses are routed through Meta-hosted, Google-hosted, or OpenAI-hosted infrastructure, plus our own servers, in accordance with each provider's data-handling requirements.
You confirm that you have obtained valid opt-in consent from every End-Recipient before placing any outbound call via 9278.io.
We do not use End-Recipient voice data, transcripts, or summaries to train any model. They are processed solely to deliver the call, generate the summary, and provide analytics on your behalf.
Voice and SIP traffic is delivered via TRAI-licensed access providers and Business Solution Providers. We retain consent records, scrubbing logs, and DLT identifiers for the period mandated by TRAI and the relevant operators.

6. Call Recording & Transcription
Every inbound call answered by your AI agent is recorded by default and stored in encrypted object storage. You are responsible for configuring your agent to disclose the recording to the End-Recipient where required by law. Transcripts are generated using speech-to-text models from Google, Groq, or equivalent providers. You may delete a recording or transcript through your dashboard at any time, subject to legally required retention.

7. Data Sharing and Disclosure
We do not sell, rent, or trade your Personal Information or Customer Data. We share information only as follows:

With our LLM and voice-runtime providers (Google, OpenAI, Groq) and dashboard partners (dashboard.9278.io) strictly to deliver the Services.
With Indian telecom operators, carrier-grade SIP partners, and DLT registrars to provision DIDs and route calls.
With payment processors (Razorpay), banks, and tax authorities to process payments and issue invoices.
With authorised sub-processors and infrastructure providers (cloud hosting, email delivery, analytics, KYC) under written confidentiality and data protection obligations.
With our channel partners, resellers, or affiliates only to the extent required to provision your account and provide support.
With professional advisors (auditors, lawyers, insurers) under confidentiality.
With law enforcement, regulators, or other government authorities when we are legally compelled to do so, or when disclosure is necessary to protect our rights, property, or the safety of users and the public.
With a successor entity in the event of a merger, acquisition, restructuring, or sale of assets, with notice to affected users.

8. Data Retention
We retain Personal Information and Customer Data only for as long as necessary to fulfil the purposes for which it was collected, to provide the Services, to comply with our legal and regulatory obligations, to resolve disputes, and to enforce our agreements.

Account and KYC records: retained for the life of the account plus the periods required by Indian law (typically 5–8 years after account closure).
Call recordings and transcripts: retained for up to 180 days in active storage and longer in archival storage where required by regulators or by your subscription.
Billing, invoicing, and tax records: retained for at least 8 years.
Customer-uploaded knowledge base entries and agent configuration: retained while your account is active and deleted within 90 days of account closure, unless a longer period is required by law or by you.

9. Your Rights
Subject to applicable law, you have the following rights in respect of your Personal Information:

Right to access — obtain a summary of the Personal Information we hold about you.
Right to correction — request correction of inaccurate or incomplete information.
Right to erasure — request deletion of Personal Information no longer necessary, subject to legal retention requirements.
Right to grievance redressal — escalate complaints to our Grievance Officer (see Section 16).
Right to nominate — appoint another person to exercise your rights in the event of death or incapacity.
9.1 Additional Rights for EU/EEA Users (GDPR)
If you are located in the European Union or European Economic Area, the GDPR grants you additional rights including objection, restriction, portability, and the right to lodge a complaint with your local Supervisory Authority. Where we process your data as a processor on behalf of one of our customers, please direct your request to that customer (the controller). Where we process your data as a controller (e.g., your account information), you may contact us directly using the details in Section 18.

10. Cookies and Tracking Technologies
We use cookies and similar technologies (pixels, local storage, SDKs) to operate the website, remember your preferences, secure your account, measure usage, and improve the Services. You can control cookies through your browser settings; disabling certain cookies may limit features such as auto-login and analytics personalisation.

11. International Data Transfers
Your information may be processed and stored in India and in other countries where our service providers (including Google, OpenAI, and our cloud-hosting partners) operate. Where data is transferred outside your country of residence, we rely on Standard Contractual Clauses, intra-group transfer agreements, and provider certifications to protect your information.

12. Children's Privacy
9278.io is intended exclusively for businesses and individuals over the age of 18 years. We do not knowingly collect Personal Information from children. If you believe a child has provided Personal Information to us, please contact us and we will take prompt steps to delete such information.

13. Third-Party Websites and Integrations
Our website and platform may contain links to or integrations with third-party services (including Razorpay, Google, OpenAI, Groq, ). We are not responsible for the privacy practices of those third parties. We encourage you to review their privacy policies before sharing any information.

14. Data Security
We implement and maintain reasonable technical, administrative, and physical security measures designed to protect Personal Information from unauthorised access, alteration, disclosure, or destruction. These measures include TLS / SSL encryption in transit, encryption at rest for sensitive fields, role-based access controls, multi-factor authentication for administrative access, secure cloud hosting, periodic vulnerability assessments, and employee confidentiality obligations.

Despite these measures, no method of transmission over the internet or electronic storage is 100% secure. You are responsible for keeping your account credentials confidential and notifying us immediately at voice@9278.io if you suspect any unauthorised access.

15. Government and Law Enforcement Requests
Swadesh Mobile cooperates with valid requests from Indian and foreign government, security, defence, revenue, regulatory, and law enforcement authorities. We may disclose Personal Information and Customer Data when we are legally compelled to do so, when we believe in good faith that disclosure is necessary to comply with the law, to enforce our Terms, to protect our users, or to investigate fraud or threats to public safety.

16. Grievance Officer
In accordance with the Information Technology Act, 2000, the IT Rules 2011, and the Digital Personal Data Protection Act, 2023, the contact details of our Grievance Officer are set out below. Complaints will be acknowledged within 48 hours and resolved within the timelines prescribed by law.

Grievance Officer: MOHMADHUZEFA USMANBHAI KATHAWALA
Entity: Swadesh Mobile (operator of 9278.io)
Email: voice@9278.io

17. Cancellation, Delivery & Refund Policy
This section summarises our cancellation, delivery, and refund practices as they affect the personal and account data you provide. The full policy is set out in our Terms & Conditions, §7.

17.1 Delivery of Services
The Services are fully digital — no physical goods are shipped. Upon successful payment, your plan and any purchased virtual numbers are provisioned through the dashboard typically within 2–30 minutes and in any event no later than 24 hours, subject to KYC and upstream carrier confirmation. A confirmation is sent to your registered email and shown in the portal once the AI voice agent is reachable on the assigned DID. From that moment, the plan and per-DID rental cycles are deemed delivered.

17.2 Cancellation
You can cancel auto-renewal at any time by writing to voice@9278.io from the email address registered on your account. Cancellation takes effect at the end of the current monthly or annual billing cycle; per-DID rentals are cancelled at the end of each DID's own 30-day cycle. We do not interrupt service mid-cycle once a plan has been activated.

17.3 Refund Window
A full refund of the subscription fee is available within seven (7) calendar days for monthly plans and fourteen (14) calendar days for annual plans, provided that no minutes have been consumed on the plan and no DID assigned to the plan has been used. Once a single minute has been billed, the subscription fee for that cycle becomes non-refundable.

17.4 Non-Refundable Items
Consumed voice minutes, DID-rental fees for cycles already in progress, payment-gateway charges, activated add-on packs, and any fees attributable to service suspension or termination arising from your breach of these Terms are non-refundable.

17.5 Refund Processing
Eligible refunds are acknowledged within two (2) business days and credited to the original payment instrument within seven (7) to fourteen (14) business days after approval. Bank-side settlement may take an additional 2–5 business days to reflect on your statement. GST already remitted may be adjusted through a credit note in accordance with applicable tax rules.

17.6 Personal Data on Cancellation
On cancellation or account closure, the personal and Customer Data we hold continues to be retained or deleted as described in §8 (Data Retention) of this Policy. Cancellation does not, by itself, trigger immediate deletion of records we are legally required to keep (TRAI/DLT, GST, income tax, anti-fraud).

18. Changes to This Privacy Policy
We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or business operations. The updated version will be posted on this page with a revised "Last Updated" date. Where the changes are material, we will provide additional notice (such as via email or in-product notification). Your continued use of the Services after the effective date of the updated Policy constitutes your acceptance of the changes.

19. Contact Us
If you have any questions, requests, or concerns regarding this Privacy Policy or our data practices, please contact us at:

Email: voice@9278.io
Website: voice.9278.io
Operator: Swadesh Mobile`

type DocSection = { id: string; title: string; content: string }

function extractTopLevelSections(raw: string): { preamble: string; sections: DocSection[] } {
  const text = raw.replace(/\r\n/g, "\n")
  const firstSectionMatch = /^\d+\.\s.+$/m.exec(text)
  const startIndex = firstSectionMatch?.index ?? 0

  const lastUpdatedLineMatch = /^Last updated:\s*.+$/m.exec(text)
  const preambleStart = lastUpdatedLineMatch ? lastUpdatedLineMatch.index + lastUpdatedLineMatch[0].length : 0
  const preamble = text.slice(preambleStart, startIndex).trim()

  const matches = Array.from(text.matchAll(/^(\d+)\.\s(.+)$/gm))
  const sections = matches.map((m, idx) => {
    const num = m[1]
    const heading = m[2]
    const contentStart = (m.index ?? 0) + m[0].length
    const contentEnd = idx + 1 < matches.length ? (matches[idx + 1].index ?? text.length) : text.length
    const content = text.slice(contentStart, contentEnd).trim()
    return { id: `section-${num}`, title: `${num}. ${heading}`, content }
  })

  return { preamble, sections }
}

const { preamble, sections } = extractTopLevelSections(PRIVACY_POLICY_TEXT)

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ]}
      />

      <section className="relative overflow-hidden border-b border-border/50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[300px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.1),transparent_70%)]"
        />
        <div className="w-full px-6 py-16 md:px-8 md:py-20">
          <ScrollReveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Legal</p>
            <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">Privacy Policy</h1>
            <p className="mt-3 text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>
          </ScrollReveal>
        </div>
      </section>

      <div className="w-full px-6 py-16 md:px-8 md:py-24">
        {preamble ? (
          <ScrollReveal className="mb-10 space-y-3 text-sm leading-relaxed text-muted-foreground">
            {preamble.split("\n\n").map((para, i) => (
              <p key={i} className="whitespace-pre-line">
                {para}
              </p>
            ))}
          </ScrollReveal>
        ) : null}

        {/* Table of contents */}
        <ScrollReveal className="mb-12 rounded-2xl border border-border bg-white p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Contents</p>
          <nav className="grid gap-1.5 sm:grid-cols-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </ScrollReveal>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.id} id={s.id} className="scroll-mt-28">
              <ScrollReveal>
                <h2 className="text-xl font-semibold tracking-tight">{s.title}</h2>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {s.content.split("\n\n").map((para, i) => (
                    <p key={i} className="whitespace-pre-line">
                      {para}
                    </p>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
