import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  ChevronRight,
  Clock3,
  LayoutGrid,
  ListChecks,
  PhoneCall,
  PhoneIncoming,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { GradientCta } from "@/components/sections/gradient-cta"
import { FaqAccordion } from "@/components/faq/faq-accordion"
import { AnalyticsDashboardIllustration } from "@/components/features-page/analytics-dashboard-illustration"
import { DetailCards } from "@/components/features-page/detail-cards"
import { HowItWorksTimeline } from "@/components/features-page/how-it-works-timeline"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { FAQ_GROUPS } from "@/lib/faq"

const billingFaq = FAQ_GROUPS.find((g) => g.id === "billing")!.items.filter((i) =>
  [
    "How does pricing work?",
    "Do my voice minutes expire?",
    "Can I top up more than ₹30,000?",
    "Are there any hidden fees?",
  ].includes(i.q),
)

const STEPS = [
  {
    icon: <PhoneIncoming className="size-5" aria-hidden />,
    title: "Every call logs itself",
    description: "The moment an agent answers or makes a call, it's captured — no setup, no extra step.",
  },
  {
    icon: <BarChart3 className="size-5" aria-hidden />,
    title: "Numbers update in real time",
    description: "Volume, minutes, and duration roll into the dashboard as calls happen, not overnight.",
  },
  {
    icon: <Wallet className="size-5" aria-hidden />,
    title: "See usage against your wallet credit",
    description: "Included minutes burn down against your plan so you always know where you stand before topping up.",
  },
]

export const metadata: Metadata = pageSeo({
  title: "Analytics Dashboard",
  description: "Track call counts, minutes used, and average call duration in one place.",
  path: "/features/analytics-dashboard",
})

const DETAILS = [
  {
    icon: <TrendingUp className="size-5" aria-hidden />,
    title: "Call volume, minutes, and durations",
    description: "See every agent's call count, total minutes, and average call length in one view.",
  },
  {
    icon: <Clock3 className="size-5" aria-hidden />,
    title: "Spot your busy hours at a glance",
    description: "A time-of-day breakdown shows exactly when calls peak, so staffing and routing decisions are easy.",
  },
  {
    icon: <ListChecks className="size-5" aria-hidden />,
    title: "Track usage against your plan",
    description: "Watch included minutes burn down in real time and know well before you hit an overage.",
  },
]

export default function AnalyticsDashboardPage() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Analytics Dashboard", path: "/features/analytics-dashboard" },
        ]}
      />

      <section className="relative flex flex-col overflow-hidden border-b border-border/50 lg:h-[calc(100vh-64px)] lg:justify-center">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFF] to-[#EAF4FF]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(29,78,216,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(29,78,216,0.35)_1px,transparent_1px)] bg-[size:44px_44px]" />
          <div className="absolute -left-24 -top-24 size-[380px] rounded-full bg-primary/[0.06] blur-[120px]" />
          <div className="absolute -bottom-24 -right-16 size-[340px] rounded-full bg-primary/[0.05] blur-[120px]" />
          <div className="absolute right-[6%] top-1/2 size-[380px] -translate-y-1/2 rounded-full bg-primary/[0.08] blur-[110px]" />
          <span className="absolute left-[6%] top-[30%] size-1.5 rounded-full bg-primary/20" />
          <span className="absolute left-[30%] top-[75%] size-1 rounded-full bg-primary/15" />
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pb-12 pt-6 md:px-8 md:pb-16 md:pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
              <Link href="/features" className="hover:text-primary">
                Features
              </Link>{" "}
              <span aria-hidden>/</span> <span className="text-foreground">Analytics Dashboard</span>
            </nav>

            <ScrollReveal className="mt-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
                <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
                Feature spotlight
              </span>
              <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Analytics Dashboard
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Track call counts, minutes used, and average call duration in one place — everything you need to
                understand how your agents are performing, without digging through raw call logs.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                <div className="flex items-center gap-1.5">
                  <PhoneCall className="size-4 text-primary" aria-hidden />
                  <span className="text-sm font-semibold text-foreground">Call volume</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <LayoutGrid className="size-4 text-primary" aria-hidden />
                  <span className="text-sm font-semibold text-foreground">Minutes used</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="size-4 text-accent" aria-hidden />
                  <span className="text-sm font-semibold text-foreground">Active agents</span>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-gradient-to-r from-primary to-[oklch(0.5_0.21_255)] px-7 text-base font-semibold text-white shadow-[0_8px_28px_oklch(0.546_0.215_262.88/0.45)] transition-all hover:shadow-[0_10px_36px_oklch(0.546_0.215_262.88/0.6)]"
                >
                  <Link href="/get-started">
                    Build your first agent
                    <ArrowRight className="ml-1 size-4" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-border bg-white px-7 text-base font-semibold text-foreground hover:border-primary/30 hover:bg-slate-50"
                >
                  <Link href="/contact">
                    <PhoneCall className="mr-2 size-4" />
                    Talk to sales
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.08} className="hidden lg:block">
            <AnalyticsDashboardIllustration />
          </ScrollReveal>
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              What you get
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Everything the dashboard tracks</h2>
            <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Three views into how your agents are actually performing, updated as calls happen.
            </p>
          </ScrollReveal>
          <div className="mt-8">
            <DetailCards items={DETAILS} />
          </div>
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              How it works
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">From first call to full picture</h2>
          </ScrollReveal>
          <HowItWorksTimeline steps={STEPS} />
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Related questions
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">How usage and minutes work</h2>
            <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Straight from the FAQ — no separate lookup needed.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.06} className="mt-8">
            <FaqAccordion
              items={billingFaq}
              idPrefix="analytics-dashboard"
              itemClassName="border-border/60 border-l-4 border-l-transparent bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:border-l-primary hover:shadow-[0_12px_28px_-16px_rgba(15,23,42,0.15)]"
              triggerIcon={<ChevronRight className="pointer-events-none size-4 shrink-0" aria-hidden />}
            />
            <Link
              href="/faq"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              See all FAQs
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <GradientCta
        heading="See it on your own calls"
        description="Spin up your first agent and the Analytics Dashboard starts filling in from your very first call."
        primaryHref="/get-started"
        primaryLabel="Get started"
        secondaryHref="/features"
        secondaryLabel="Back to Features"
      />

      <SiteFooter />
    </main>
  )
}
