import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"

export const metadata: Metadata = pageSeo({
  title: "Terms of Service — 9278.io",
  description: "Terms & Conditions governing your use of 9278.io and the Voice Agent Portal at voice.9278.io.",
  path: "/terms",
  noindex: false,
})

const LAST_UPDATED = "10 June 2026"

const TERMS_TEXT = `Terms & Conditions
Last updated: 10 June 2026

These Terms & Conditions ("Terms") constitute a legally binding agreement between you ("Customer", "you", "your") and Swadesh Mobile, the operator of 9278.io and the Voice Agent Portal hosted at voice.9278.io. By accessing our website, dashboard, APIs, or any related service (collectively, the "Services"), you confirm that you have read, understood, and agreed to these Terms together with our Privacy Policy.

1. Acceptance of Terms
By creating an account, integrating with our APIs, or otherwise using any feature of the Services, you accept these Terms. If you are entering into this agreement on behalf of a company or other legal entity, you represent that you have the authority to bind that entity.

2. Definitions
Account — your registered account for accessing the Services.
AI Voice Agent — the automated conversational agent provisioned to answer or place calls on your virtual number.
Virtual Number / DID — the inbound telephone number assigned to your account through our upstream carrier partners.
Customer Data — information you upload or transmit through the Services, including knowledge base entries, prompts, greetings, recordings, transcripts and call metadata.
Wallet — your prepaid INR balance debited per minute of voice usage and per number rental cycle.
End-Recipient — the individual on the other end of a call placed or received through the Services.

3. Eligibility & Account Registration
You must be 18+ and competent to contract under the Indian Contract Act, 1872. You must register a legitimate business entity (sole proprietorship, partnership, LLP, company, or registered trust / society). You agree to provide accurate KYC documents, including PAN, GST certificate (where applicable), and authorised signatory ID. You are responsible for keeping your credentials confidential. Submitting false information may result in suspension without refund.

4. Description of Services
The Services include, without limitation:

AI voice agents using realtime large-language-model providers (e.g., Google Gemini, OpenAI) for greeting, intent detection, and response generation.
Inbound calling on Indian DIDs through TRAI-licensed carriers and Business Solution Providers.
Multilingual text-to-speech and speech-to-text in English and major Indian languages (Hindi, Bengali, Telugu, Marathi, Tamil, Urdu, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese).
Call recording, real-time transcription, and AI-generated call summaries.
Knowledge-base ingestion and per-number agent configuration.
Wallet management, billing dashboards, and Razorpay-based recharge.

5. Subscription Plans, Wallet & Pricing
We operate a two-part pricing model: (i) a recurring subscription plan (monthly or annual, e.g. Starter / Growth / Scale) covering included minutes and concurrent calls, and (ii) per-second voice charges debited from your prepaid Wallet for usage beyond included minutes. Pricing for additional DIDs, premium voice models, or realtime transcription is disclosed at the point of purchase.

We reserve the right to revise subscription pricing, per-minute rates, and DID rental fees with 15 days' prior notice by email or in-product banner. Upstream carrier or LLM-provider rate changes may take effect immediately and will be reflected in your next invoice or wallet debit.

6. Payment, Billing & Wallet
Subscription fees are billed in advance; Wallet recharges are billed at the time of recharge. All amounts are exclusive of GST and other applicable taxes, which will be added at prevailing rates. Payments are processed through PCI-DSS-compliant gateways (currently Razorpay Software Pvt Ltd); full card numbers are not stored on our servers. Calls will not be placed and inbound minutes may be suspended if your Wallet balance is insufficient at the time the call is dispatched or answered.

7. Cancellation, Delivery & Refund Policy
7.1 Delivery of Services
The Services are digital in nature and have no physical shipment. Upon successful payment, your subscription plan and (where purchased) virtual numbers are provisioned automatically through our dashboard. Provisioning is typically completed within 2–30 minutes, and in any event no later than 24 hours after payment, subject to KYC verification and upstream carrier confirmation. You will receive a confirmation email and an in-portal notification once the plan is active and your AI voice agent is reachable on the assigned DID. The plan and any per-DID rental cycles are deemed "delivered" at the moment your agent becomes dial-able.

7.2 Cancellation by the Customer
You may cancel your subscription at any time by sending a written request to voice@9278.io from the email address registered on your account. Cancellation is effective from the end of the then-current billing cycle (monthly or annual); we do not stop service mid-cycle once a plan has been activated. Per-DID rental cycles run independently of the main plan and are cancelled at the end of each DID's own 30-day cycle. No further auto-renewal will occur once cancellation is recorded.

7.3 Refund Window — Monthly Plans
You may request a full refund of the subscription fee for a monthly plan within seven (7) calendar days of the original purchase, provided that no minutes have been consumed on the plan and no DIDs assigned to the plan have been used to place or receive calls. Once even a single minute of conversation has been billed against the plan, the monthly subscription fee becomes non-refundable for that cycle. Wallet recharges follow the same principle (see §7.5 below).

7.4 Refund Window — Annual Plans
Annual / yearly plans are refundable within fourteen (14) calendar days of the original purchase on the same "no-minutes-consumed" basis as monthly plans. After the 14-day window, annual subscription fees are non-refundable for the remainder of the annual term, but you may continue to use the plan up to its scheduled expiry date and disable auto-renewal under §7.2.

7.5 Non-Refundable Items
The following amounts are non-refundable once incurred:

Consumed voice minutes — any minutes (or partial seconds, rounded per the per-second billing rate) used by your AI agent.
DID rental fees already deducted for a 30-day rental cycle that has begun, including pro-rated days.
Payment-gateway fees charged by Razorpay or the underlying card-network, which are deducted by the gateway and not retained by us.
Add-on packs (e.g. extra-minute top-ups, premium voice add-ons) once activated.
Service-suspension or termination resulting from your breach of these Terms, fraud, or violation of TRAI/DLT/DPDP requirements.

7.6 Refund Process and Timeline
Eligible refund requests must be sent to voice@9278.io from the registered account email, stating the order ID, payment date, payment method, and reason for refund. We will acknowledge the request within two (2) business days and, if approved, process the refund to the original payment instrument within seven (7) to fourteen (14) business days. The actual credit may take an additional 2–5 business days to reflect on your statement, depending on your bank or card network. GST already remitted to the government on the original invoice may be adjusted via credit note in accordance with applicable tax rules.

7.7 Wallet Balances on Account Closure
Unused Wallet balance remaining at the time of account closure is not automatically refundable. At our sole discretion, the balance may either be (a) transferred to another active account that you operate, or (b) refunded after deducting gateway fees and any minimum-balance retention required to settle pending carrier invoices.

7.8 Chargebacks and Disputes
We strongly request that you contact us at voice@9278.io before initiating a chargeback through your bank or card issuer. Unjustified chargebacks attract a processing fee of ₹500 per dispute and may result in immediate suspension of the Services pending resolution.

8. User Responsibilities & Acceptable Use
You are solely responsible for the content of calls placed or received through your AI voice agent and for any consents required. You must:

Obtain valid, demonstrable consent from every End-Recipient where required by applicable law in connection with your use of 9278.io.
Honour opt-out (DND, "do not call") requests promptly — within 24 hours and in any event before the next contact attempt.
Identify yourself or your business accurately at the start of every call; no impersonation.
Configure your agent to disclose, where required by law, that the call is being recorded.

9. Prohibited Content and Activities
You must not use the Services to place or receive calls that are:

Unlawful, fraudulent, deceptive, defamatory, obscene, or pornographic.
In violation of the TRAI Telecom Commercial Communications Customer Preference Regulations, the Information Technology Act 2000, the Consumer Protection Act 2019, or the DPDP Act 2023.
Promoting prohibited or restricted goods or services (illegal drugs, unregistered financial schemes, weapons, gambling where prohibited, and adult content) without the requisite licences.
Designed to harass, threaten, or defraud the End-Recipient.
We reserve the right to investigate suspected violations and to suspend or terminate accounts found in breach, without refund.

10. Telecom & TRAI Compliance
All voice traffic dispatched through 9278.io is routed via TRAI-licensed access providers and carrier-grade SIP partners. You are responsible for any required Entity, Header, or Template registrations on the DLT framework (Jio, Airtel, Vi, BSNL) where applicable to your account. Failure to comply with TRAI / DLT requirements may result in immediate suspension of the Services without refund.

11. Third-Party Platforms
Your use of the Services is also subject to the terms of the underlying providers we depend on, including but not limited to Razorpay (payments), Google (Gemini LLM and TTS), OpenAI (fallback LLM and TTS), and our DID carrier partners. We pass through their decisions on rate limits, account suspensions, or policy violations and are not responsible for them.

12. Intellectual Property
All intellectual property rights in the 9278.io platform, including the website, logos, trademarks, software, source code, APIs, documentation, designs, and all derivative works, are owned by Swadesh Mobile or our licensors. We grant you a limited, non-exclusive, non-transferable, revocable licence to use the Services for your internal business purposes. You retain ownership of your Customer Data but grant us a worldwide licence to host, transmit, process, and back it up to provide the Services.

You may not reverse engineer, decompile, resell, or sublicense any part of the Services without our prior written consent.

13. Confidentiality and Data Protection
Each party agrees to protect the confidential information of the other with the same degree of care it uses to protect its own, and in any event with no less than reasonable care. Processing of Personal Information is governed by our Privacy Policy and any executed Data Processing Addendum.

14. Service Availability
We will use commercially reasonable efforts to make the Services available 24×7, subject to scheduled maintenance, force majeure events, and outages or throttling imposed by upstream providers. We do not guarantee uninterrupted, error-free, or perfectly secure operation. SLA-backed uptime, where applicable, is documented in the relevant order form or addendum.

15. Limitation of Liability
To the maximum extent permitted by law, in no event shall Swadesh Mobile, its directors, employees, affiliates, or licensors be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, including lost profits, lost revenue, or lost data. Our aggregate liability under or in connection with these Terms in any rolling 12-month period shall not exceed the total fees actually paid by you to 9278.io during that period.

16. Indemnification
You agree to indemnify, defend, and hold harmless Swadesh Mobile and its officers, directors, employees, affiliates, and licensors from any and all claims, damages, losses, or expenses (including reasonable legal fees) arising from your use of the Services, violation of these Terms, breach of third-party rights, the content of calls placed or received via your AI agent, or penalties levied by carriers, regulators, or LLM providers.

17. Term, Suspension and Termination
These Terms remain in effect for as long as you have an active account or use the Services. We may suspend or terminate without notice if you breach these Terms, fraud is detected, or payment is overdue. You may terminate your account at any time by sending a written request to voice@9278.io. Termination does not entitle you to any refund of subscription fees, Wallet balance, or DID rental already paid.

18. Account Deletion
Once you have signed up, your account cannot be unilaterally self-deleted from the front-end interface for audit and compliance reasons. You may deactivate or submit a written deletion request to voice@9278.io. Deletion is processed in accordance with our Privacy Policy, retaining records required by law (TRAI/DLT, GST, income tax).

19. Modifications to These Terms
We may amend these Terms from time to time. The updated version will be posted on this page with a revised "Last Updated" date. Material changes will be communicated by email or in-product notification at least 15 days before they take effect. Continued use after the effective date constitutes acceptance.

20. Force Majeure
Neither party shall be liable for any failure or delay in performance to the extent caused by an event beyond its reasonable control, including acts of God, war, terrorism, civil unrest, strikes, pandemics, government action, regulatory change, internet or telecom outages, or upstream-provider failures.

21. Governing Law and Jurisdiction
These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict-of-laws principles. Courts at Swadesh Mobile's principal place of business shall have exclusive jurisdiction.

22. Dispute Resolution
The parties will attempt to resolve any dispute amicably within 30 days of written notice. If the dispute is not resolved within that period, it shall be referred to and finally resolved by arbitration under the Arbitration and Conciliation Act, 1996, by a sole arbitrator mutually appointed by the parties. Arbitration shall be conducted in English at the seat designated by Swadesh Mobile.

23. Severability, Waiver and Entire Agreement
If any provision of these Terms is held invalid, the remaining provisions shall continue in full force. A waiver of any breach is not a waiver of any subsequent breach. These Terms, together with the Privacy Policy and any executed addenda, constitute the entire agreement between the parties on the subject matter and supersede all prior agreements.

24. Contact
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

const { preamble, sections } = extractTopLevelSections(TERMS_TEXT)

export default function TermsPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
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
            <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">Terms of Service</h1>
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
