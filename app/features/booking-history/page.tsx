import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  CalendarCheck2,
  Check,
  Download,
  HelpCircle,
  IndianRupee,
  LayoutGrid,
  PhoneCall,
  Search,
  SlidersHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { FeatureImageSection } from "@/components/features-page/feature-image-section"
import { HowItWorksFlow } from "@/components/features-page/how-it-works-flow"
import { DetailNumberedList } from "@/components/features-page/detail-numbered-list"
import { BookingHistoryIllustration } from "@/components/features-page/booking-history-illustration"
import { MultiAgentExploreLinks } from "@/components/features-page/multi-agent-explore-links"
import { BadgeBars } from "@/components/features-page/badge-bars"
import { HeroStatsBand } from "@/components/features-page/hero-stats-band"

const heroStats = [
  { icon: CalendarCheck2, stat: "Every", title: "Booking Logged", color: "text-blue-600", tile: "bg-blue-50" },
  { icon: Search, stat: "Searchable", title: "In Seconds", color: "text-violet-600", tile: "bg-violet-50" },
  { icon: SlidersHorizontal, stat: "Filter", title: "By Date or Agent", color: "text-emerald-600", tile: "bg-emerald-50" },
  { icon: Download, stat: "1-click", title: "Export", color: "text-orange-600", tile: "bg-orange-50" },
]
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"

const exploreLinks = [
  {
    icon: <LayoutGrid className="size-5" aria-hidden />,
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
  title: "Booking History",
  description: "See every appointment your agent has booked, in one searchable list.",
  path: "/features/booking-history",
})

const DETAILS = [
  {
    icon: <Search className="size-5" aria-hidden />,
    title: "Every appointment in one searchable list",
    description: "Every booking your agents make lands in a single list you can search in seconds.",
  },
  {
    icon: <SlidersHorizontal className="size-5" aria-hidden />,
    title: "Filter by date or by agent",
    description: "Narrow down to a date range or a specific agent to see exactly what you're looking for.",
  },
  {
    icon: <Download className="size-5" aria-hidden />,
    title: "Export whenever you need it",
    description: "Pull the list out anytime — for reporting, reconciliation, or sharing with your team.",
  },
]

const STEPS = [
  {
    icon: <CalendarCheck2 className="size-5" aria-hidden />,
    title: "Every booking logs itself",
    description: "The moment your agent confirms an appointment, it's added to the list — no manual entry.",
  },
  {
    icon: <Search className="size-5" aria-hidden />,
    title: "Search and filter instantly",
    description: "Find any booking by date or agent in seconds, without scrolling through call recordings.",
  },
  {
    icon: <Download className="size-5" aria-hidden />,
    title: "Export whenever you need it",
    description: "Pull the list out for reporting or reconciliation, anytime — no waiting on support.",
  },
]

export default function BookingHistoryPage() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Booking History", path: "/features/booking-history" },
        ]}
      />

      <section className="relative flex flex-col overflow-hidden border-b border-border/50 lg:h-[calc(100vh-64px)] lg:justify-center">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFF] to-[#EAF4FF]" />
          <div className="absolute -left-24 -top-24 size-[380px] rounded-full bg-primary/[0.06] blur-[120px]" />
          <div className="absolute -bottom-24 -right-16 size-[340px] rounded-full bg-primary/[0.05] blur-[120px]" />
        </div>
        <div className="grid w-full items-stretch gap-10 px-6 pb-6 pt-3 md:px-8 md:pb-8 md:pt-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div>
            <nav aria-label="Breadcrumb">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <BadgeBars className="text-primary" />
                Operate &amp; Monitor
              </span>
            </nav>

            <ScrollReveal className="mt-6">
              <h1 className="mt-5 text-balance text-[32px] font-bold leading-[1.15] tracking-tight sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-[3.6rem]">
                <span style={{ color: "#0F172A" }}>Booking</span>{" "}
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  History
                </span>
              </h1>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                See every appointment your agent has booked, in one searchable list — no digging through call
                recordings or chasing down what got confirmed. Filter by date, status, or customer, and export
                the full history whenever you need it.
              </p>

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

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                {["Searchable by name or number", "Status at a glance", "Exportable anytime"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <Check className="size-4 text-emerald-600" aria-hidden />
                    {t}
                  </span>
                ))}
              </div>

              <HeroStatsBand stats={heroStats} />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.08}>
            <BookingHistoryIllustration />
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
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Every booking, always findable</h2>
          </ScrollReveal>
          <div className="mt-8">
            <DetailNumberedList items={DETAILS} />
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
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">From confirmed call to searchable record</h2>
          </ScrollReveal>
          <HowItWorksFlow steps={STEPS} />
        </div>
      </section>

      <FeatureImageSection
        mode="feature"
        slides={[
          {
            role: "Searchable list",
            name: "Every appointment in one place",
            quote: "Every booking your agents make lands in a single list you can search in seconds.",
            image: "/images/booking-history-searchable-list.webp",
          },
          {
            role: "Filters",
            name: "Narrow down by date or agent",
            quote: "Filter to a date range or a specific agent to find exactly what you're looking for.",
            image: "/images/booking-history-filters.webp",
          },
          {
            role: "Export",
            name: "Pull the list out anytime",
            quote: "Export for reporting, reconciliation, or sharing with your team — whenever you need it.",
            image: "/images/booking-history-export.webp",
          },
        ]}
      />

      <PricingCta
        heading="See it on your own bookings"
        description="Spin up your first agent and every appointment it books shows up here, searchable from day one."
        primaryHref="/get-started"
        primaryLabel="Get started"
        secondaryHref="/features"
        secondaryLabel="Back to Features"
      />

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
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
