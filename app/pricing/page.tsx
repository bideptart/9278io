import type { Metadata } from "next"
import Link from "next/link"
import dynamic from "next/dynamic"
import { ShieldCheck, Lock, Fingerprint, Globe, ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PricingCardSection } from "@/components/pricing/pricing-card-section"
import { LiveCallMockup } from "@/components/pricing/live-call-mockup"
import { RateByPlanMockup } from "@/components/pricing/rate-by-plan-mockup"
import { LiveCostMockup } from "@/components/pricing/live-cost-mockup"
import { MockupStackConnector } from "@/components/pricing/mockup-stack-connector"
import { MockupVerticalConnector } from "@/components/pricing/mockup-vertical-connector"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { Button } from "@/components/ui/button"

// Below-the-fold and not needed for first paint — code-split out of the
// initial client bundle so hydrating the hero/plan cards above the fold
// doesn't compete with parsing/executing these on the main thread too.
// ssr stays on (the default) so the content still renders server-side for
// SEO and no-JS users; only the client bundle is split.
const ComparePlansTable = dynamic(() =>
  import("@/components/pricing/compare-plans-table").then((m) => m.ComparePlansTable),
)
const CostComparisonStrip = dynamic(() =>
  import("@/components/pricing/cost-comparison-strip").then((m) => m.CostComparisonStrip),
)
const FaqAccordion = dynamic(() => import("@/components/faq/faq-accordion").then((m) => m.FaqAccordion))
import { formatPlanAgentNoun, formatPlanAgents, PLANS } from "@/lib/pricing"
import { FAQ_GROUPS } from "@/lib/faq"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd, PricingJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

// First 6 of the "Billing & credit" FAQ group — real, existing copy from
// the FAQ page (lib/faq.ts), not new content, so this stays in sync with
// whatever's answered there instead of drifting out of date separately.
const PRICING_FAQ_ITEMS = (FAQ_GROUPS.find((g) => g.id === "billing")?.items ?? []).slice(0, 6)

export const metadata: Metadata = pageSeo({
  title: "AI Voice Agent Pricing — plans from ₹10/min",
  description:
    "AI receptionist and voice agent pricing for Indian businesses. Starter ₹3,000, Growth ₹8,800, Scale ₹30,000/mo. TRAI-compliant, per-second billing, 10+ Indian languages.",
  path: "/pricing",
})

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>
}) {
  const { canceled } = await searchParams
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ]}
      />
      <PricingJsonLd
        offers={PLANS.map((p) => ({
          name: `${p.name} credit`,
          amount: p.amountInr,
          description: `${p.tagline} ${p.minutes.toLocaleString("en-IN")} included minutes at ₹${p.ratePerMinInr}/min effective, ${formatPlanAgents(p.agents)} ${formatPlanAgentNoun(p.agents)}.`,
          ratePerMin: p.ratePerMinInr,
        }))}
      />

      {canceled && (
        <div className="border-b border-border/60 bg-white">
          <div className="flex w-full items-center justify-between gap-3 px-6 py-3 text-sm text-muted-foreground md:px-6">
            <p>Checkout was canceled. You can pick a plan again whenever you&apos;re ready.</p>
          </div>
        </div>
      )}

      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-background to-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)]"
        />
        <div className="w-full px-6 pb-10 pt-10 md:px-8 md:pb-14 md:pt-14">
          <div className="mx-auto grid max-w-7xl items-stretch gap-12 lg:grid-cols-2">
            <ScrollReveal className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-2 text-[clamp(9px,2.9vw,13px)] font-semibold uppercase tracking-normal text-primary sm:whitespace-normal sm:px-5 sm:text-sm sm:tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
                Pay as you go · INR pricing · GST invoices
              </span>
              <h1 className="mt-6 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl">
                Pick your plan for{" "}
                <span className="bg-gradient-to-r from-primary via-[oklch(0.62_0.2_240)] to-[oklch(0.72_0.18_150)] bg-clip-text text-transparent">
                  AI voice agents.
                </span>
              </h1>
              <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Simple AI receptionist pricing for Indian businesses. Every plan includes inbound calling, call
                recording, and real-time transcription with per-second billing. Pay once in ₹ as wallet credit
                valid for 60 days — no contracts, no setup fees, cancel anytime.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-gradient-to-r from-primary to-[oklch(0.5_0.21_255)] px-8 text-base font-semibold text-white shadow-[0_8px_28px_oklch(0.546_0.215_262.88/0.45)] transition-all hover:shadow-[0_10px_36px_oklch(0.546_0.215_262.88/0.6)]"
                >
                  <Link href="/get-started">
                    Get started
                    <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-border bg-white px-7 text-base font-semibold text-foreground hover:border-primary/30 hover:bg-slate-50"
                >
                  <Link href="/#cta">Talk to an agent</Link>
                </Button>
              </div>

              {/* Trust badges — tiled to match the stats card below */}
              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border/60 sm:grid-cols-4">
                {[
                  { icon: ShieldCheck, title: "TRAI-compliant", color: "text-blue-600", tile: "bg-blue-50" },
                  { icon: Lock, title: "Razorpay secured", color: "text-emerald-600", tile: "bg-emerald-50" },
                  { icon: Fingerprint, title: "DPDP compliant", color: "text-violet-600", tile: "bg-violet-50" },
                  { icon: Globe, title: "10+ languages", color: "text-orange-600", tile: "bg-orange-50" },
                ].map((b) => {
                  const Icon = b.icon
                  return (
                    <div key={b.title} className="flex flex-col items-center gap-1.5 bg-white px-3 py-3 text-center">
                      <span className={`flex size-8 items-center justify-center rounded-full ${b.tile} ${b.color}`}>
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <span className={`text-[11px] font-semibold leading-tight ${b.color}`}>{b.title}</span>
                    </div>
                  )
                })}
              </div>
            </ScrollReveal>

            <div className="relative hidden min-h-[360px] lg:block">
              <MockupStackConnector className="absolute inset-0 h-full w-full" />
              <LiveCallMockup className="absolute right-4 top-0" />
              <LiveCostMockup className="absolute left-2 top-[18%]" />
              <RateByPlanMockup className="absolute bottom-6 left-28" />
            </div>

            {/* Mobile/tablet: same 3 cards, simple vertical stack instead of
                the absolute-positioned floating layout (which only fits the
                lg+ two-column grid), with a short vertical dashed connector
                between each card instead of the desktop curved-line SVG. */}
            <div className="flex flex-col items-center lg:hidden">
              <LiveCallMockup className="relative" />
              <MockupVerticalConnector />
              <LiveCostMockup className="relative" />
              <MockupVerticalConnector />
              <RateByPlanMockup className="relative" />
            </div>
          </div>
        </div>
      </section>

      <section id="plans" className="w-full border-y border-blue-100 bg-blue-50/70">
        <PricingCardSection />

        <p className="mx-auto max-w-7xl px-4 pb-16 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
          GST charged at checkout. Top-ups available from ₹500. Cancel anytime.
        </p>
      </section>

      <section className="w-full px-6 py-12 md:px-8 md:py-16">
        <ComparePlansTable />
      </section>

      <section className="relative w-full overflow-hidden px-6 py-12 md:px-8 md:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.14),transparent_70%)]"
        />
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Cost comparison
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            One agent's salary vs one plan.
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            A single AI voice agent handles what a human hire would — for a fraction of the monthly cost. No
            recruiting, training, or turnover to manage, and it never calls in sick. See how the numbers stack up
            for the plan you're actually considering.
          </p>
        </ScrollReveal>
        <div className="mt-10">
          <CostComparisonStrip />
        </div>
      </section>

      <section className="w-full px-6 py-12 md:px-8 md:py-16">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            FAQ
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Billing questions, answered.
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            The most common questions about how credit, minutes, and invoicing actually work.
          </p>
        </ScrollReveal>
        <ScrollReveal className="mx-auto mt-8 max-w-5xl">
          <FaqAccordion items={PRICING_FAQ_ITEMS} idPrefix="pricing-faq" />
          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link href="/faq" className="font-medium text-primary hover:underline">
              See all FAQs →
            </Link>
          </p>
        </ScrollReveal>
      </section>

      <PricingCta
        id="pricing-cta"
        heading="Try before you commit. Talk to our agent now."
        description="See latency, voice quality, and conversation flow firsthand — then top up only if you love it."
        primaryHref="/get-started"
        primaryLabel="Get started"
        secondaryHref="/contact"
        secondaryLabel="Contact"
      />

      <RelatedLinks
        heading="More on 9278.io"
        description="Industry playbooks, FAQs, and the get-started flow."
        links={[
          {
            href: "/industries",
            title: "Industries we power",
            description: "Pre-tuned voice agents for ten verticals — and a configurable engine for everything else.",
          },
          {
            href: "/faq",
            title: "FAQ — billing, credit & compliance",
            description: "How credit, phone numbers, and concurrency work in practice.",
          },
          {
            href: "/get-started",
            title: "Launch your first agent",
            description: "Pick a plan, optionally add a number, and you’re live in minutes.",
          },
        ]}
      />

      <SiteFooter />
    </main>
  )
}
