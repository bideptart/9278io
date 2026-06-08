import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"

export const metadata: Metadata = pageSeo({
  title: "Terms of Service — 9278.io",
  description: "Terms governing your use of the 9278.io AI voice agent platform.",
  path: "/terms",
  noindex: false,
})

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of terms",
    content: `By accessing or using the 9278.io platform ("Service"), you ("Customer") agree to be bound by these Terms of Service ("Terms"). If you are entering into these Terms on behalf of a company or organisation, you represent that you have authority to bind that entity.

9278 Technologies Private Limited ("9278.io", "we", "us") reserves the right to update these Terms at any time with 15 days' notice. Continued use after the effective date constitutes acceptance.`,
  },
  {
    id: "service",
    title: "2. Description of service",
    content: `9278.io provides an AI voice agent platform that enables customers to deploy automated inbound and outbound telephone agents. The platform includes:

• Voice credit top-up and per-minute billing
• AI agent configuration and deployment tools
• Indian and international phone number provisioning
• Call recording, transcription, and analytics
• Integrations with third-party CRMs and tools

The Service is provided on an "as-is" basis subject to these Terms and our Service Level Agreement (SLA) of 99.9% monthly uptime for the call orchestration layer.`,
  },
  {
    id: "accounts",
    title: "3. Accounts & access",
    content: `You are responsible for maintaining the confidentiality of your account credentials. You must not share your API keys or dashboard credentials with unauthorised parties. You must notify us immediately at hello@9278.io if you suspect unauthorised access.

We may suspend or terminate your account for violation of these Terms, non-payment, or at our discretion with 7 days' notice (or immediately for serious violations).`,
  },
  {
    id: "billing",
    title: "4. Billing & credit",
    content: `**Voice credit:** Voice credit is purchased as a one-time top-up (₹3,000, ₹8,800, or ₹30,000) and is billed once as wallet credit. Credit is applied against call usage; per-minute and overage rates depend on the plan selected. Unused credit purchased within the last 14 days is refundable on request due to a service issue.

**Phone numbers:** Phone numbers are billed monthly and renew automatically. You may release a number at any time from your dashboard to stop the recurring charge. Partial months are not refunded.

**Taxes:** All prices are exclusive of GST. GST at the applicable rate (currently 18%) is added at checkout. We issue GST-compliant invoices for every transaction.

**Payment methods:** We accept UPI, net banking, debit/credit cards, and EMI through Razorpay. All transactions are in INR.`,
  },
  {
    id: "acceptable-use",
    title: "5. Acceptable use",
    content: `You agree not to use the Service to:

• Violate TRAI regulations, including calling DND-registered numbers without prior consent
• Make calls outside permitted calling windows (9 AM – 9 PM, recipient's local time)
• Impersonate a person or entity in a way that is deceptive or fraudulent
• Conduct phishing, scam, or harassment campaigns
• Process health information without a signed Data Processing Agreement (DPA)
• Resell or sublicense access to the Service without written permission

We reserve the right to suspend accounts that violate this policy immediately and without notice.`,
  },
  {
    id: "trai",
    title: "6. TRAI & regulatory compliance",
    content: `The platform provides technical tools to assist with TRAI compliance (DND scrubbing, calling-window enforcement, consent capture). However, you remain solely responsible for ensuring your calling campaigns comply with:

• TRAI's Telecom Commercial Communications Customer Preference Regulations (TCCCPR)
• Applicable state telemarketing and consumer protection laws
• India's Digital Personal Data Protection (DPDP) Act 2023

We do not provide legal advice. You should consult qualified legal counsel before launching outbound campaigns.`,
  },
  {
    id: "data",
    title: "7. Data ownership & processing",
    content: `You retain ownership of all call recordings, transcripts, and data generated through your use of the Service ("Customer Data"). We process Customer Data solely to provide the Service as described in our Privacy Policy.

We do not sell Customer Data. We do not use call recordings for training our AI models without your explicit written consent.

We process Customer Data as a Data Processor under the DPDP Act 2023. You act as the Data Fiduciary and are responsible for obtaining lawful consent from your callers.`,
  },
  {
    id: "liability",
    title: "8. Limitation of liability",
    content: `To the maximum extent permitted by law, 9278.io's total liability to you for any claims arising under these Terms shall not exceed the amount you paid to us in the 3 months preceding the claim.

We are not liable for indirect, incidental, special, or consequential damages, including lost profits, revenue, or data.

We are not liable for service interruptions caused by your telecom carrier, force majeure events, third-party outages, or your failure to comply with TRAI regulations.`,
  },
  {
    id: "governing-law",
    title: "9. Governing law & disputes",
    content: `These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka, India.

Before initiating legal proceedings, both parties agree to attempt good-faith resolution through written notice and a 30-day negotiation period.`,
  },
  {
    id: "contact",
    title: "10. Contact",
    content: `For questions about these Terms:

9278 Technologies Private Limited
Bengaluru, Karnataka, India
Email: legal@9278.io`,
  },
]

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
        <div className="mx-auto w-full max-w-4xl px-4 py-16 md:px-6 md:py-20">
          <ScrollReveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Legal</p>
            <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">Terms of Service</h1>
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
