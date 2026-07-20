import type { Metadata } from "next"
import Link from "next/link"
import {
  PhoneCall, ArrowRight,
  Languages, Headphones, Zap, Timer, ShieldCheck,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { FaqAccordion } from "@/components/faq/faq-accordion"
import { FeatureGroups } from "@/components/features-page/feature-groups"
import { AgentShowcase } from "@/components/features-page/agent-showcase"

export const metadata: Metadata = {
  title: "Features — 9278.io",
  robots: { index: false, follow: true },
}

const trustChips = [
  { icon: Languages,   label: "10+ Indian Languages" },
  { icon: Headphones,  label: "24/7 Always On" },
  { icon: Zap,         label: "Sub-300ms Latency" },
  { icon: Timer,       label: "Per-Second Billing" },
  { icon: ShieldCheck, label: "TRAI Compliant" },
]

const faqs = [
  {
    q: "Is 9278.io compliant with Indian calling regulations?",
    a: "Yes — every outbound call is automatically restricted to TRAI's permitted 9AM–9PM calling window, so you never have to track compliance manually.",
  },
  {
    q: "Can I pay without a credit card or international billing?",
    a: "Yes — we support UPI, PhonePe, Paytm, RuPay, and net banking, so you can pay the way you already do business in India.",
  },
  {
    q: "Do I get GST invoices for accounting?",
    a: "Yes — every payment automatically generates a GST-compliant invoice, and your full transaction history is downloadable anytime from your dashboard.",
  },
  {
    q: "How is your language support different from other platforms?",
    a: "Instead of a generic \"40+ languages\" claim, we support 10+ named Indian languages — Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Punjabi, Malayalam, Kannada, Odia, and Assamese — each tuned for real Indian accents and phrasing.",
  },
  {
    q: "Do I need to sign a contract or talk to sales to get started?",
    a: "No — you can sign up and launch your first agent in minutes, with transparent per-minute pricing shown upfront. No contracts, cancel anytime.",
  },
]

export default function FeaturesPage() {
  return (
    <main className="flex min-h-dvh flex-col bg-background text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-border/50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)]"
        />
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-8 md:px-8 md:py-10 lg:grid-cols-[1fr_1.2fr]">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
              Features
            </span>
            <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Everything your voice agent needs.
            </h1>
            <p className="mt-3 max-w-lg text-pretty text-[18px] leading-relaxed text-muted-foreground">
              From setup to billing — every tool that comes with your 9278.io AI voice agent, built for Indian
              businesses. Low latency, multi-language, TRAI-compliant, priced per second.
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-gradient-to-r from-primary to-[oklch(0.5_0.21_255)] py-2 pl-8 pr-2 text-base font-semibold text-white shadow-[0_8px_28px_oklch(0.546_0.215_262.88/0.45)] transition-all hover:shadow-[0_10px_36px_oklch(0.546_0.215_262.88/0.6)]"
              >
                <Link href="/get-started">
                  Build your first agent
                  <span className="flex size-7 items-center justify-center rounded-full bg-white/20">
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-border bg-white px-7 text-base font-semibold text-foreground hover:border-primary/30 hover:bg-slate-50"
              >
                <Link href="/contact">
                  <PhoneCall className="mr-2 h-4 w-4" />
                  Talk to sales
                </Link>
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {trustChips.map((c) => {
                const Icon = c.icon
                return (
                  <span
                    key={c.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-white px-3 py-1.5 text-xs font-medium text-muted-foreground"
                  >
                    <Icon className="h-3.5 w-3.5 text-primary" aria-hidden />
                    {c.label}
                  </span>
                )
              })}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="flex justify-center lg:justify-end">
            <AgentShowcase />
          </ScrollReveal>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border/50">
        <div className="w-full px-6 py-14 md:px-8 md:py-20">
          <ScrollReveal className="mx-auto max-w-5xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
              What's Included
            </span>
            <h2 className="mt-3 text-balance text-2xl font-bold tracking-tight md:text-3xl md:whitespace-nowrap">
              Built for India's front desk, not just another voice AI.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              From setup to billing, every feature here is designed around how Indian businesses actually operate —
              TRAI-compliant, GST-ready, and priced the way you pay.
            </p>
          </ScrollReveal>

          <FeatureGroups />
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border/50">
        <div className="w-full px-6 py-14 md:px-8 md:py-20">
          <ScrollReveal className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
              FAQ
            </span>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Questions about what makes us different.
            </h2>
          </ScrollReveal>

          <div className="mx-auto mt-10 max-w-3xl">
            <ScrollReveal>
              <FaqAccordion items={faqs} idPrefix="features-page" defaultOpenIndex={0} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-6 py-16 text-center md:px-8 md:py-20">
        <ScrollReveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
            Get Started
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Ready to put this to work?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
            Build your first agent free, or talk to us about what your business needs.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full font-semibold">
              <Link href="/get-started">Build your first agent</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full font-semibold">
              <Link href="/contact">
                <PhoneCall className="mr-2 h-4 w-4" />
                Talk to sales
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </section>

      <SiteFooter />
    </main>
  )
}
