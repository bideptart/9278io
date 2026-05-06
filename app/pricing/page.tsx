import type { Metadata } from "next"
import Link from "next/link"
import { Sparkles, Zap, Phone, Headphones } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PlanCards } from "@/components/pricing/plan-cards"
import { PhoneRates } from "@/components/pricing/phone-rates"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PLANS } from "@/lib/pricing"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd, PricingJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

export const metadata: Metadata = pageSeo({
  title: "Pricing — voice AI from $0.10/min",
  description:
    "Simple, transparent pricing. Voice from $0.10/min. Top up with $20, $50, or $100 to unlock 1, 2, or 3 AI voice agents. Phone numbers from $2/month.",
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
          description: `${p.tagline} ${p.minutes.toLocaleString()} voice minutes at ₹${p.ratePerMinInr}/min, ${p.agents} AI agent${p.agents === 1 ? "" : "s"}, valid 60 days.`,
          ratePerMin: p.ratePerMinInr,
        }))}
      />

      {canceled && (
        <div className="border-b border-border/60 bg-card/40">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 text-sm text-muted-foreground md:px-6">
            <p>Checkout was canceled. You can pick a plan again whenever you&apos;re ready.</p>
          </div>
        </div>
      )}

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)]"
        />
        <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" aria-hidden />
              Pay as you go · INR pricing · GST invoices
            </span>
            <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-6xl">
              India-first pricing. No surprises.
            </h1>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Pay in INR, get GST-compliant invoices. Three top-up sizes. Indian phone numbers from ₹200/month.
              You only ever pay for the minutes your agents actually talk.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-3 md:grid-cols-3">
            <Stat icon={Zap} label="Voice rate" value="From ₹8.35 / min" sub="Best rate on the Scale plan." />
            <Stat icon={Phone} label="Indian numbers" value="From ₹200 / mo" sub="All states · US, UK, UAE also available." />
            <Stat
              icon={Headphones}
              label="Minimum top-up"
              value="₹1,699"
              sub="Voice credit valid for 60 days. GST invoice included."
            />
          </div>
        </div>
      </section>

      <section id="plans" className="mx-auto w-full max-w-6xl px-4 pb-24 md:px-6">
        <ScrollReveal className="mb-10">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Choose your starting credit</h2>
          <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
            Three tiers, three rates. The more you commit, the less you pay per minute — and the more concurrent AI
            agents you unlock.
          </p>
        </ScrollReveal>

        <PlanCards />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          All plans include real-time transcripts, recording, analytics, and 15+ Indian languages. GST invoice on every top-up.
        </p>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-24 md:px-6">
        <ScrollReveal className="mb-10">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Phone number rates</h2>
          <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
            Phone numbers are optional. Use our shared connectivity for free, or provision your own DID for outbound
            caller-ID and inbound calls.
          </p>
        </ScrollReveal>

        <PhoneRates />

        <div className="mt-6 grid gap-4 text-sm text-muted-foreground md:grid-cols-3">
          <p>Numbers renew every 30 days and can be released anytime to stop the recurring fee.</p>
          <p>Toll-free numbers in the USA are available on request.</p>
          <p>Need a number in another country? Reach out — we provision globally.</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-24 md:px-6">
        <ScrollReveal className="rounded-2xl border border-border/60 bg-card/30 px-6 py-12 md:px-12 md:py-14">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h3 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                Try before you commit. Talk to our agent now.
              </h3>
              <p className="mt-3 text-muted-foreground">
                See latency, voice quality, and conversation flow firsthand — then top up only if you love it.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/get-started">Get started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/#cta">Talk to an agent</Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

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

function Stat({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  sub: string
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/30 p-5">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <Icon className="size-4 text-primary" aria-hidden />
        {label}
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
    </div>
  )
}
