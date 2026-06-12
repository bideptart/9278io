import type { Metadata } from "next"
import Link from "next/link"
import { Zap, Headphones } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PlanCards } from "@/components/pricing/plan-cards"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { formatPlanAgentNoun, formatPlanAgents, PLANS } from "@/lib/pricing"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd, PricingJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

export const metadata: Metadata = pageSeo({
  title: "Pricing — voice AI from ₹10/min",
  description:
    "Pick a plan and get started. Starter ₹3,000, Growth ₹8,800, Scale ₹30,000. All plans include inbound calling, call recording, and real-time transcription. Prices in ₹, billed once as wallet credit.",
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

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)]"
        />
        <div className="w-full px-6 py-20 md:px-8 md:py-28">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
              Pay as you go · INR pricing · GST invoices
            </span>
            <h1 className="mt-6 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl">
              Pick your plan.
            </h1>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              All plans include inbound calling, call recording, and real-time transcription. Prices in ₹, billed once
              as wallet credit.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-3 md:grid-cols-2">
            <Stat icon={Zap} label="Voice rate" value="From ₹10 / min" sub="Best rate on the Scale plan." />
            <Stat
              icon={Headphones}
              label="Minimum top-up"
              value="₹3,000"
              sub="GST charged at checkout."
            />
          </div>
        </div>
      </section>

      <section id="plans" className="w-full px-6 pb-24 md:px-8">
        <ScrollReveal className="mb-10">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">Pick your plan.</h2>
          <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
            All plans include inbound calling, call recording, and real-time transcription. Prices in ₹, billed once as
            wallet credit.
          </p>
        </ScrollReveal>

        <PlanCards />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          GST charged at checkout. Top-ups available from ₹500. Cancel anytime.
        </p>
      </section>

      <section className="w-full px-6 pb-24 md:px-8">
        <ScrollReveal className="rounded-2xl border-[3px] border-border/60 bg-white px-6 py-12 md:px-12 md:py-14">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h3 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
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
    <div className="rounded-xl border-[3px] border-border/60 bg-white p-5">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <Icon className="size-4 text-primary" aria-hidden />
        {label}
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
    </div>
  )
}
