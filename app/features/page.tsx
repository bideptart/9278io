import type { Metadata } from "next"
import Link from "next/link"
import { PhoneCall, ArrowRight, Sparkles } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { FaqAccordion } from "@/components/faq/faq-accordion"
import { FeatureGroups } from "@/components/features-page/feature-groups"
import { BlueprintHero } from "@/components/features-page/blueprint-hero"
import { StatBand } from "@/components/features-page/stat-band"
import { FeatureBento } from "@/components/features-page/feature-bento"
import { TestimonialsPlaceholder } from "@/components/features-page/testimonials-placeholder"

export const metadata: Metadata = {
  title: "Features — 9278.io",
  robots: { index: false, follow: true },
}

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
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] mesh-gradient-bg" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,23,42,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at top, black 40%, transparent 85%)",
          }}
        />
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-12 md:px-8 md:py-20 lg:grid-cols-[1fr_1.2fr]">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
              Features
            </span>
            <h1 className="mt-3 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-[60px]">
              Everything your{" "}
              <span className="bg-gradient-to-r from-primary via-[oklch(0.62_0.2_240)] to-[oklch(0.72_0.18_150)] bg-clip-text text-transparent">
                voice agent needs.
              </span>
            </h1>
            <p className="mt-3 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
              From setup to billing — every tool your 9278.io AI voice agent needs, built for Indian businesses.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
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
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="flex justify-center lg:justify-end">
            <BlueprintHero />
          </ScrollReveal>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border/50">
        <div className="w-full px-6 py-10 md:px-8 md:py-14">
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

      {/* Stat band */}
      <section className="border-b border-border/50">
        <div className="w-full px-6 py-10 md:px-8 md:py-14">
          <ScrollReveal className="mx-auto max-w-5xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
              By the Numbers
            </span>
            <h2 className="mt-3 text-balance text-2xl font-bold tracking-tight md:text-3xl">
              Fast, accurate, and always on.
            </h2>
          </ScrollReveal>

          <div className="mt-10">
            <StatBand />
          </div>
        </div>
      </section>

      {/* Bento grid */}
      <section className="border-b border-border/50">
        <div className="w-full px-6 py-10 md:px-8 md:py-14">
          <ScrollReveal className="mx-auto max-w-5xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
              At a Glance
            </span>
            <h2 className="mt-3 text-balance text-2xl font-bold tracking-tight md:text-3xl">
              Every capability, in one view.
            </h2>
          </ScrollReveal>

          <div className="mt-10">
            <FeatureBento />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-border/50">
        <div className="w-full px-6 py-10 md:px-8 md:py-14">
          <ScrollReveal className="mx-auto max-w-5xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
              What Customers Say
            </span>
            <h2 className="mt-3 text-balance text-2xl font-bold tracking-tight md:text-3xl">
              Loved by businesses across India.
            </h2>
          </ScrollReveal>

          <div className="mt-10">
            <TestimonialsPlaceholder />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border/50">
        <div className="w-full px-6 pb-6 pt-10 md:px-8 md:pb-8 md:pt-14">
          <ScrollReveal className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
              FAQ
            </span>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Questions about what makes us different.
            </h2>
          </ScrollReveal>

          <div className="mx-auto mt-10 max-w-5xl">
            <ScrollReveal>
              <div className="glass-panel rounded-[1.75rem] p-2 shadow-[0_20px_48px_-32px_oklch(0.13_0.025_255/0.35)] transition-shadow hover:shadow-[0_28px_60px_-32px_oklch(0.546_0.215_262.88/0.2)] sm:p-4">
                <FaqAccordion items={faqs} idPrefix="features-page" defaultOpenIndex={0} />
              </div>
            </ScrollReveal>

            <ScrollReveal className="mt-8 flex justify-center">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white px-5 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                See all FAQs →
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-6 pb-16 pt-4 md:px-8 md:pb-20 md:pt-6">
        <ScrollReveal className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[oklch(0.64_0.19_245)] via-primary to-[oklch(0.45_0.19_264)] px-8 py-12 shadow-[0_40px_100px_-40px_oklch(0.52_0.22_265/0.6)] md:px-14 md:py-14">
            {/* faint grid */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.18]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
                maskImage: "radial-gradient(ellipse at center, black 55%, transparent 100%)",
              }}
            />
            {/* soft glows */}
            <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-white/15 blur-[90px] motion-safe:animate-breathe" />
            <div aria-hidden className="pointer-events-none absolute -bottom-28 -right-16 size-80 rounded-full bg-[oklch(0.7_0.15_210/0.35)] blur-[100px] motion-safe:animate-breathe [animation-delay:3s]" />
            {/* decorative sparkle */}
            <Sparkles aria-hidden className="pointer-events-none absolute -right-6 bottom-2 size-48 text-white/[0.06]" strokeWidth={1} />

            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
              {/* Left: copy */}
              <div className="max-w-xl">
                <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to put this to work?
                </h2>
                <div className="mt-4 h-px w-12 bg-white/40" aria-hidden />
                <p className="mt-4 text-pretty text-base leading-relaxed text-white/85">
                  Build your first agent free, or talk to us about what your business needs.
                </p>
              </div>

              {/* Right: actions */}
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="group h-12 rounded-full bg-white px-8 text-base font-semibold text-primary shadow-[0_10px_30px_oklch(0.2_0.1_262/0.35)] transition-all hover:scale-[1.04] hover:bg-white/90"
                >
                  <Link href="/get-started">
                    Build your first agent
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-white/40 bg-white/10 px-7 text-base font-semibold text-white backdrop-blur transition-all hover:scale-[1.04] hover:border-white/60 hover:bg-white/20 hover:text-white"
                >
                  <Link href="/contact">
                    <PhoneCall className="mr-2 h-4 w-4" />
                    Talk to sales
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <SiteFooter />
    </main>
  )
}
