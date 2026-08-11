import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, LayoutDashboard, PhoneCall, Check, IndianRupee, HelpCircle, Activity, BarChart3, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { FeatureImageSection } from "@/components/features-page/feature-image-section"
import { DashboardOverviewHero } from "@/components/features-page/dashboard-overview-hero"
import { DashboardOverviewStats } from "@/components/features-page/dashboard-overview-stats"
import { DashboardBootSequence } from "@/components/features-page/dashboard-boot-sequence"
import { ComparisonPanel } from "@/components/features-page/comparison-panel"
import { MultiAgentExploreLinks } from "@/components/features-page/multi-agent-explore-links"
import { BadgeBars } from "@/components/features-page/badge-bars"
import { HeroStatsBand } from "@/components/features-page/hero-stats-band"

const heroStats = [
  { icon: Activity, stat: "Live", title: "Activity Feed", color: "text-blue-600", tile: "bg-blue-50" },
  { icon: BarChart3, stat: "Instant", title: "Usage at a Glance", color: "text-violet-600", tile: "bg-violet-50" },
  { icon: Link2, stat: "Built-in", title: "Quick Links", color: "text-emerald-600", tile: "bg-emerald-50" },
  { icon: LayoutDashboard, stat: "1", title: "Dashboard, Everything", color: "text-orange-600", tile: "bg-orange-50" },
]
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"

const exploreLinks = [
  {
    icon: <LayoutDashboard className="size-5" aria-hidden />,
    href: "/features",
    title: "All features",
    description: "Every capability across Build, Train, Test, Operate, and Account.",
  },
  {
    icon: <IndianRupee className="size-5" aria-hidden />,
    href: "/pricing",
    title: "Pricing in INR",
    description: "Starter ₹2,999, Growth ₹8,799, Scale ₹29,999. Per-second billing.",
  },
  {
    icon: <HelpCircle className="size-5" aria-hidden />,
    href: "/faq",
    title: "Frequently asked questions",
    description: "TRAI compliance, Indian languages, billing, and account questions.",
  },
]

export const metadata: Metadata = pageSeo({
  title: "Dashboard Overview",
  description: "See your account's activity at a glance the moment you log in.",
  path: "/features/dashboard-overview",
})

export default function DashboardOverviewPage() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Dashboard Overview", path: "/features/dashboard-overview" },
        ]}
      />

      <section className="relative flex flex-col overflow-hidden border-b border-border lg:min-h-[calc(100vh-64px)] lg:justify-center">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFF] to-[#EAF4FF]" />
          <div className="absolute -left-24 -top-24 size-[380px] rounded-full bg-primary/[0.06] blur-[120px]" />
          <div className="absolute -bottom-24 -right-16 size-[340px] rounded-full bg-primary/[0.05] blur-[120px]" />
        </div>
        <div className="grid w-full items-stretch gap-10 px-6 pb-6 pt-3 md:px-8 md:pb-8 md:pt-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div className="min-w-0">
            <ScrollReveal>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <BadgeBars className="text-primary" />
                Account &amp; Overview
              </span>
              <h1 className="mt-5 text-balance text-[32px] font-bold leading-[1.15] tracking-tight sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-[3.6rem]">
                Dashboard{" "}
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Overview
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                See your account's activity at a glance the moment you log in — calls, minutes, bookings,
                and what needs your attention, all in one place so nothing slips through. No digging
                through menus to find out what happened while you were away. Everything's already there.
              </p>

              <div className="mt-7 flex flex-nowrap gap-2 sm:gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-10 shrink-0 rounded-full bg-gradient-to-r from-primary to-[oklch(0.5_0.21_255)] px-3 text-xs font-semibold text-white shadow-[0_8px_28px_oklch(0.546_0.215_262.88/0.45)] transition-all hover:shadow-[0_10px_36px_oklch(0.546_0.215_262.88/0.6)] sm:h-12 sm:px-7 sm:text-base"
                >
                  <Link href="/get-started">
                    <span className="sm:hidden">Build agent</span>
                    <span className="hidden sm:inline">Build your first agent</span>
                    <ArrowRight className="ml-1 size-4" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-10 shrink-0 rounded-full border-border bg-white px-3 text-xs font-semibold text-foreground hover:border-primary/30 hover:bg-slate-50 sm:h-12 sm:px-7 sm:text-base"
                >
                  <Link href="/contact">
                    <PhoneCall className="mr-2 size-4" />
                    Talk to sales
                  </Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {["Live activity feed", "Usage at a glance", "Quick links built in"].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-sm"
                    style={{ border: "1px solid #E4ECFF" }}
                  >
                    <Check className="size-4 text-emerald-600" aria-hidden />
                    {t}
                  </span>
                ))}
              </div>

              <HeroStatsBand stats={heroStats} />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.08}>
            <DashboardOverviewHero />
          </ScrollReveal>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="w-full px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              What you get
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Your account, at a glance</h2>
          </ScrollReveal>
          <DashboardOverviewStats />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="w-full px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              How it works
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Ready before you've finished logging in</h2>
          </ScrollReveal>
          <DashboardBootSequence />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="w-full px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Why it matters
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Never dig for the numbers</h2>
          </ScrollReveal>
          <div className="mt-8">
            <ComparisonPanel
              withoutTitle="Without an overview dashboard"
              withoutPoints={[
                "Check multiple screens to see how things are going",
                "Miss activity that happened while you were away",
                "No single place to see account health",
              ]}
              withTitle="With Dashboard Overview"
              withPoints={[
                "Everything that matters, on one screen",
                "See exactly what happened since you last logged in",
                "Account health visible the moment you arrive",
              ]}
            />
          </div>
        </div>
      </section>

      <FeatureImageSection
        mode="feature"
        slides={[
          {
            role: "Live activity feed",
            name: "See what's happening right now",
            quote: "Calls, bookings, and hand-offs stream in live, so you always know what happened while you were away.",
            image: "/images/features/dashboard-overview/dashboard-overview-01-live-activity-feed.png",
          },
          {
            role: "Usage at a glance",
            name: "Minutes, calls, and agents in one view",
            quote: "Everything that matters about your account sits on one screen the moment you log in.",
            image: "/images/features/dashboard-overview/dashboard-overview-02-usage-at-a-glance.png",
          },
          {
            role: "Quick links",
            name: "Get where you need to go, fast",
            quote: "Shortcuts to the tools you use most, built right into the overview — no digging through menus.",
            image: "/images/features/dashboard-overview/dashboard-overview-03-quick-links.png",
          },
        ]}
      />

      <PricingCta
        heading="Ready to see your account at a glance?"
        description="Build your first agent free, then track calls, bookings, and activity from one dashboard overview."
        primaryHref="/get-started"
        primaryLabel="Get started"
        secondaryHref="/features"
        secondaryLabel="Back to Features"
      />

      <section className="border-b border-border">
        <div className="w-full px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">Explore more of 9278.io</h2>
            <p className="mt-2 max-w-2xl text-pretty text-sm text-muted-foreground md:text-base">
              See the rest of what's included, or check pricing and common questions.
            </p>
          </ScrollReveal>
          <MultiAgentExploreLinks links={exploreLinks} />
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
