import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"

export const metadata: Metadata = pageSeo({
  title: "Legal & Compliance — 9278.io",
  description:
    "9278.io's legal and compliance policies for India — Terms, Privacy (DPDP Act), Acceptable Use, AI disclosure, call recording, DPA, SLA, grievance redressal, and more.",
  path: "/legal",
})

const groups = [
  {
    heading: "Core terms",
    items: [
      { title: "Terms of Service", href: "/terms", desc: "The agreement governing your use of 9278.io." },
      { title: "Privacy Policy", href: "/privacy-policy", desc: "How we handle personal data under the DPDP Act 2023." },
      { title: "Refund & Cancellation Policy", href: "/refund-policy", desc: "Billing, cancellation, and refund terms." },
      { title: "Service Level Agreement (SLA)", href: "/sla", desc: "Availability commitment, support targets, and credits." },
    ],
  },
  {
    heading: "Acceptable use & AI",
    items: [
      { title: "Acceptable Use Policy", href: "/acceptable-use", desc: "What's allowed — TRAI/DLT, DND, and prohibited use." },
      { title: "AI Voice Disclosure & Responsible-AI Policy", href: "/ai-disclosure", desc: "Disclosing automated calls; no deepfakes or impersonation." },
      { title: "Call Recording & Consent Notice", href: "/call-recording", desc: "How recording works and your consent duties." },
    ],
  },
  {
    heading: "Data protection",
    items: [
      { title: "Data Processing Addendum (DPDPA)", href: "/data-processing-addendum", desc: "Our role as your Data Processor for caller data." },
      { title: "Sub-Processor List", href: "/sub-processors", desc: "The third parties that help us run the Services." },
      { title: "Cookie Policy", href: "/cookies", desc: "Cookies and similar technologies we use." },
      { title: "Grievance Redressal Policy", href: "/grievance-redressal", desc: "How to raise a complaint and how we resolve it." },
    ],
  },
  {
    heading: "Telecom",
    items: [
      { title: "Telecom & Regulatory Compliance Statement", href: "/telecom-compliance", desc: "How we operate within India's telecom framework." },
    ],
  },
]

export default function LegalIndexPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Legal", path: "/legal" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[340px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.16),transparent_70%)]"
        />
        <div className="w-full px-6 py-14 text-center md:px-12 md:py-16 lg:px-20">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
              Legal &amp; Compliance
            </span>
            <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Legal &amp; compliance
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Every policy that governs 9278.io, written for India — the DPDP Act 2023, TRAI/DLT rules, the
              Telecommunications Act 2023, and consumer-protection law. Operated by Swadesh Mobile Private Limited.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Policy groups */}
      <div className="w-full px-6 py-14 md:px-12 md:py-20 lg:px-20">
        <div className="space-y-12">
          {groups.map((group) => (
            <ScrollReveal key={group.heading}>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">{group.heading}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex h-full flex-col justify-between gap-3 rounded-2xl border-2 border-border bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                  >
                    <div>
                      <h3 className="font-bold tracking-tight transition-colors group-hover:text-primary">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      Read policy
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-12 rounded-2xl border-2 border-primary/20 bg-primary/[0.04] p-6 text-sm text-muted-foreground md:p-7">
          <p className="break-words">
            For privacy or data-protection requests, email{" "}
            <a href="mailto:privacy@9278.io" className="font-semibold text-primary underline-offset-4 hover:underline">
              privacy@9278.io
            </a>
            . To raise a grievance, email{" "}
            <a href="mailto:grievance@9278.io" className="font-semibold text-primary underline-offset-4 hover:underline">
              grievance@9278.io
            </a>
            {" "}or see our{" "}
            <Link href="/grievance-redressal" className="font-semibold text-primary underline-offset-4 hover:underline">
              Grievance Redressal Policy
            </Link>
            .
          </p>
        </ScrollReveal>
      </div>

      <SiteFooter />
    </main>
  )
}
