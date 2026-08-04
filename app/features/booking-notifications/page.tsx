import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  BellRing,
  CalendarCheck2,
  HelpCircle,
  History,
  Inbox,
  IndianRupee,
  LayoutGrid,
  Mail,
  PhoneCall,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { DetailSpotlightPanel } from "@/components/features-page/detail-spotlight-panel"
import { HowItWorksRadial } from "@/components/features-page/how-it-works-radial"
import { SpeedComparisonBars } from "@/components/features-page/speed-comparison-bars"
import { BookingNotificationsIllustration } from "@/components/features-page/booking-notifications-illustration"
import { MultiAgentExploreLinks } from "@/components/features-page/multi-agent-explore-links"
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
  title: "Booking Notifications",
  description: "Get an email the moment your agent books a meeting or appointment.",
  path: "/features/booking-notifications",
})

const DETAILS = [
  {
    icon: <Mail className="size-5" aria-hidden />,
    title: "Instant email on every booking",
    description: "An email lands the moment your agent books a meeting or appointment — no checking in.",
    points: [
      "Sent to your account email by default",
      "Includes the agent, contact, and appointment details",
      "No dashboard tab needed to stay in the loop",
    ],
  },
  {
    icon: <CalendarCheck2 className="size-5" aria-hidden />,
    title: "Never miss a new appointment",
    description: "Every confirmed booking reaches your inbox automatically, so nothing slips through.",
    points: [
      "Fires for every agent on your account, not just one",
      "Works the same whether it's your 1st or 1,000th booking",
      "Nothing to configure — it's on from day one",
    ],
  },
  {
    icon: <Zap className="size-5" aria-hidden />,
    title: "Sent the moment it's confirmed",
    description: "No batching or delays — the notification goes out as soon as the booking is locked in.",
    points: [
      "No hourly digest or batch window to wait on",
      "Same delivery speed at 1 booking a day or 100",
      "Matches the moment shown in Booking History",
    ],
  },
  {
    icon: <History className="size-5" aria-hidden />,
    title: "Every email links back to Booking History",
    description: "Click through from the notification straight to that appointment's full record.",
    points: [
      "No searching through your inbox for the details later",
      "Opens the same entry you'd find in Booking History",
      "Keeps email and dashboard in sync automatically",
    ],
  },
]

const STEPS = [
  {
    icon: <CalendarCheck2 className="size-4" aria-hidden />,
    title: "Agent confirms a booking",
    description: "The moment a caller's appointment is locked in, nothing further is needed from you.",
  },
  {
    icon: <Zap className="size-4" aria-hidden />,
    title: "Notification fires instantly",
    description: "No batching, no polling — the send happens the same second the booking is confirmed.",
  },
  {
    icon: <Inbox className="size-4" aria-hidden />,
    title: "It lands in your inbox",
    description: "Read it on your phone, forward it to the team, or archive it — it's just email.",
  },
]

export default function BookingNotificationsPage() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Booking Notifications", path: "/features/booking-notifications" },
        ]}
      />

      <section className="relative flex flex-col overflow-hidden border-b border-border/50 lg:h-[calc(100vh-64px)] lg:justify-center">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFF] to-[#EAF4FF]" />
          <div className="absolute -left-24 -top-24 size-[380px] rounded-full bg-primary/[0.06] blur-[120px]" />
          <div className="absolute -bottom-24 -right-16 size-[340px] rounded-full bg-primary/[0.05] blur-[120px]" />
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pb-12 pt-6 md:px-8 md:pb-16 md:pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
              <Link href="/features" className="hover:text-primary">
                Features
              </Link>{" "}
              <span aria-hidden>/</span> <span className="text-foreground">Booking Notifications</span>
            </nav>

            <ScrollReveal className="mt-6">
              <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/[0.08] text-primary">
                <BellRing className="size-6" aria-hidden />
              </span>
              <h1 className="mt-10 text-[44px] font-extrabold md:text-[60px] lg:text-[72px]" style={{ lineHeight: 0.95, letterSpacing: "-2px" }}>
                <span style={{ color: "#0F172A" }}>Booking</span>{" "}
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Notifications
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Get an email the moment your agent books a meeting or appointment — so you're always the first
                to know, without watching a dashboard.
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
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.08} className="hidden lg:block">
            <BookingNotificationsIllustration />
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
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Pick a detail to explore</h2>
          </ScrollReveal>
          <div className="mt-8">
            <DetailSpotlightPanel items={DETAILS} />
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
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Watch it arrive, live</h2>
          </ScrollReveal>
          <HowItWorksRadial steps={STEPS} />
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Why it matters
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Zero lag between booked and known</h2>
          </ScrollReveal>
          <div className="mt-8">
            <SpeedComparisonBars />
          </div>
        </div>
      </section>

      <PricingCta
        heading="Never miss a booking again"
        description="Spin up your first agent and every confirmed appointment lands straight in your inbox."
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
