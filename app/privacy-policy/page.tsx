import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"

export const metadata: Metadata = pageSeo({
  title: "Privacy Policy — 9278.io",
  description: "How 9278.io collects, uses, and protects your personal data in compliance with India's DPDP Act 2023.",
  path: "/privacy-policy",
  noindex: false,
})

const sections = [
  {
    id: "intro",
    title: "1. Introduction",
    content: `9278.io ("we", "our", "us") is a product of 9278 Technologies Private Limited, a company incorporated in India. We operate India's AI voice agent platform at https://9278.io and https://dashboard.9278.io.

This Privacy Policy explains what personal data we collect, why we collect it, how we use it, and your rights under India's Digital Personal Data Protection (DPDP) Act 2023 and other applicable laws.

By using our platform, you agree to the practices described in this policy. If you do not agree, please discontinue use of our services.`,
  },
  {
    id: "data-collected",
    title: "2. Data we collect",
    content: `**Account data:** When you create an account we collect your name, email address, phone number, and company name.

**Usage data:** We collect information about how you use the dashboard — pages visited, features used, API calls made, and timestamps. This is used to improve the product and detect abuse.

**Call data:** When your agents handle calls, we store call recordings, real-time transcripts, speaker labels, sentiment analysis, and metadata (duration, direction, outcome). Call data is stored in encrypted data centres in Mumbai and Hyderabad and never leaves India.

**Payment data:** Payments are processed through Razorpay. We do not store card numbers or UPI credentials. We retain billing records (amount, date, GST invoice) for legal and accounting purposes.

**Cookies:** We use first-party session cookies for authentication and analytics. We do not use third-party advertising cookies.`,
  },
  {
    id: "data-use",
    title: "3. How we use your data",
    content: `We use your data to:

• Provide and improve the 9278.io platform
• Process payments and issue GST-compliant invoices
• Send transactional emails (account confirmation, billing receipts, usage alerts)
• Monitor for fraud, abuse, and policy violations
• Comply with TRAI regulations, DPDP Act requirements, and court orders

We do not sell your personal data to third parties. We do not use call recordings or transcripts for advertising.`,
  },
  {
    id: "data-storage",
    title: "4. Data storage & localisation",
    content: `All personal data and call data is stored within India, in encrypted data centres in Mumbai and Hyderabad, in compliance with the DPDP Act 2023's data localisation requirements.

We retain account data for the duration of your account plus 90 days after deletion. Call recordings and transcripts are retained for 90 days by default; you can configure shorter retention or trigger immediate deletion from your dashboard.`,
  },
  {
    id: "your-rights",
    title: "5. Your rights",
    content: `Under the DPDP Act 2023, you have the right to:

• **Access** — request a copy of all personal data we hold about you
• **Correction** — request correction of inaccurate data
• **Erasure** — request deletion of your personal data (subject to our legal retention obligations)
• **Grievance** — file a complaint with our Data Protection Officer

To exercise any right, email privacy@9278.io. We will respond within 30 days.`,
  },
  {
    id: "trai",
    title: "6. TRAI compliance",
    content: `For outbound calling campaigns operated through our platform, we enforce TRAI's Telecom Commercial Communications Customer Preference Regulations (TCCCPR). This includes:

• Mandatory DND scrubbing before every outbound call
• Enforced calling windows (9 AM – 9 PM, caller's local time)
• Consent capture and audit trail for promotional calls

Our customers remain responsible for ensuring their campaigns comply with applicable TRAI regulations for their specific category of communication (transactional vs. promotional).`,
  },
  {
    id: "third-parties",
    title: "7. Third-party processors",
    content: `We share data with the following sub-processors under data processing agreements:

• **Razorpay** — payment processing (India)
• **Supabase** (self-hosted, India region) — database and authentication
• **Jio, Airtel, BSNL, Vi** — TRAI-licensed telecom carriers for call routing

We do not share data with any processor outside India without your explicit consent.`,
  },
  {
    id: "changes",
    title: "8. Changes to this policy",
    content: `We may update this policy from time to time. We will notify you by email and post a notice in your dashboard at least 15 days before material changes take effect. Continued use of the platform after the effective date constitutes acceptance of the updated policy.`,
  },
  {
    id: "contact",
    title: "9. Contact & grievance officer",
    content: `For privacy questions, data requests, or to file a grievance under the DPDP Act:

Data Protection Officer
9278 Technologies Private Limited
Bengaluru, Karnataka, India
Email: privacy@9278.io

Response time: within 30 days of receipt.`,
  },
]

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
        <div className="mx-auto w-full max-w-4xl px-4 py-16 md:px-6 md:py-20">
          <ScrollReveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Legal</p>
            <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">Privacy Policy</h1>
            <p className="mt-3 text-sm text-muted-foreground">Last updated: 1 May 2025</p>
          </ScrollReveal>
        </div>
      </section>

      <div className="mx-auto w-full max-w-4xl px-4 py-16 md:px-6 md:py-24">
        {/* Table of contents */}
        <ScrollReveal className="mb-12 rounded-2xl border border-border bg-card/50 p-6">
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
