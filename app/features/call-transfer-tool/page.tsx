import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  HelpCircle,
  IndianRupee,
  LayoutGrid,
  PhoneCall,
  PhoneForwarded,
  PhoneOutgoing,
  ShieldAlert,
  Tag,
  UserCheck,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { FeatureImageSection } from "@/components/features-page/feature-image-section"
import { DetailProfessionalLedger } from "@/components/features-page/detail-professional-ledger"
import { HowItWorksZigzag } from "@/components/features-page/how-it-works-zigzag"
import { ComparisonPanel } from "@/components/features-page/comparison-panel"
import { MultiAgentExploreLinks } from "@/components/features-page/multi-agent-explore-links"
import { CallTransferIllustration } from "@/components/features-page/call-transfer-illustration"
import { BadgeBars } from "@/components/features-page/badge-bars"
import { HeroStatsBand } from "@/components/features-page/hero-stats-band"

const heroStats = [
  { icon: Users, stat: "Any", title: "Human Number", color: "text-blue-600", tile: "bg-blue-50" },
  { icon: Tag, stat: "Custom", title: "Label per Transfer", color: "text-violet-600", tile: "bg-violet-50" },
  { icon: ShieldAlert, stat: "Backup", title: "Fallback Numbers", color: "text-emerald-600", tile: "bg-emerald-50" },
  { icon: UserCheck, stat: "0", title: "Dead Ends", color: "text-orange-600", tile: "bg-orange-50" },
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
  title: "Call Transfer Tool",
  description: "Hand off any call to a human number with a custom label you set.",
  path: "/features/call-transfer-tool",
})

const DETAILS = [
  {
    icon: <Users className="size-5" aria-hidden />,
    title: "Forward any call to a human number",
    description: "Hand any call off to a real person the moment your agent decides it needs one.",
  },
  {
    icon: <Tag className="size-5" aria-hidden />,
    title: "Add a custom label per transfer",
    description: "Label each transfer destination so it's obvious where a call is being routed and why.",
  },
  {
    icon: <ShieldAlert className="size-5" aria-hidden />,
    title: "Set fallback numbers for busy lines",
    description: "Add a backup number so a call never dead-ends if the first line is busy or unreachable.",
  },
]

const STEPS = [
  {
    icon: <PhoneForwarded className="size-4" aria-hidden />,
    title: "Agent decides a transfer is needed",
    description: "Your agent recognizes a call is outside its limits — a request, an escalation, a VIP caller.",
  },
  {
    icon: <PhoneOutgoing className="size-4" aria-hidden />,
    title: "It dials the labeled destination",
    description: "The call routes to the number you've set for that trigger, falling back if the line is busy.",
  },
  {
    icon: <UserCheck className="size-4" aria-hidden />,
    title: "The caller reaches the right person",
    description: "No dead air, no dropped call — just a warm handoff to a human who can take it from there.",
  },
]

export default function CallTransferToolPage() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Call Transfer Tool", path: "/features/call-transfer-tool" },
        ]}
      />

      <section className="relative flex flex-col overflow-hidden border-b border-border/50 lg:h-[calc(100vh-64px)] lg:justify-center">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFF] to-[#EAF4FF]" />
          <div className="absolute -left-24 -top-24 size-[380px] rounded-full bg-primary/[0.06] blur-[120px]" />
          <div className="absolute -bottom-24 -right-16 size-[340px] rounded-full bg-primary/[0.05] blur-[120px]" />
        </div>
        <div className="grid w-full min-w-0 items-stretch gap-10 px-6 pb-6 pt-3 md:px-8 md:pb-8 md:pt-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <BadgeBars className="text-primary" />
                Operate &amp; Monitor
              </span>
            </nav>

            <ScrollReveal className="mt-6">
              <h1 className="mt-5 text-balance text-[32px] font-bold leading-[1.15] tracking-tight sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-[3.6rem]">
                <span style={{ color: "#0F172A" }}>Call</span>{" "}
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Transfer Tool
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Hand off any call to a human number with a custom label you set — so when your agent hits its
                limit, the caller lands with the right person, not a dead end. Add backup numbers so a
                transfer never rings out to nowhere. Set it once, per agent.
              </p>

              <div className="mt-7 flex flex-nowrap gap-2 sm:gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-11 shrink-0 rounded-full bg-gradient-to-r from-primary to-[oklch(0.5_0.21_255)] px-4 text-sm font-semibold text-white shadow-[0_8px_28px_oklch(0.546_0.215_262.88/0.45)] transition-all hover:shadow-[0_10px_36px_oklch(0.546_0.215_262.88/0.6)] sm:h-12 sm:px-7 sm:text-base"
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
                  className="h-11 shrink-0 rounded-full border-border bg-white px-4 text-sm font-semibold text-foreground hover:border-primary/30 hover:bg-slate-50 sm:h-12 sm:px-7 sm:text-base"
                >
                  <Link href="/contact">
                    <PhoneCall className="mr-2 size-4" />
                    Talk to sales
                  </Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {["Transfer to any human number", "Custom label per transfer", "Backup numbers included"].map((t) => (
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

          <ScrollReveal delay={0.08} className="min-w-0">
            <CallTransferIllustration />
          </ScrollReveal>
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="w-full px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              What you get
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Never leave a caller stranded</h2>
          </ScrollReveal>
          <div className="mt-10">
            <DetailProfessionalLedger items={DETAILS} />
          </div>
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="w-full px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              How it works
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">From limit to live handoff</h2>
          </ScrollReveal>
          <HowItWorksZigzag steps={STEPS} />
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="w-full px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Why it matters
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">The difference a fallback makes</h2>
          </ScrollReveal>
          <div className="mt-8">
            <ComparisonPanel
              withoutTitle="Without a transfer rule"
              withoutPoints={[
                "Calls outside the agent's scope hit a dead end",
                "Busy or unreachable lines mean a dropped caller",
                "No record of where a call was supposed to go",
              ]}
              withTitle="With Call Transfer Tool"
              withPoints={[
                "Every edge case routes to a real person, labeled clearly",
                "A fallback number catches busy or unreachable lines",
                "Every transfer destination is set once and reused",
              ]}
            />
          </div>
        </div>
      </section>

      <FeatureImageSection
        mode="feature"
        slides={[
          {
            role: "Human handoff",
            name: "Forward any call to a real person",
            quote: "Hand any call off to a human number the moment your agent decides it needs one.",
            image: "/images/call-transfer-tool-human-handoff.webp",
          },
          {
            role: "Custom labels",
            name: "Know where every transfer goes",
            quote: "Label each destination so it's obvious where a call is routed, and why.",
            image: "/images/call-transfer-tool-custom-labels.webp",
          },
          {
            role: "Fallback numbers",
            name: "Never a dead-end line",
            quote: "Add a backup number so a call never stalls if the first line is busy or unreachable.",
            image: "/images/call-transfer-tool-fallback-numbers.webp",
          },
        ]}
      />

      <PricingCta
        heading="Set up your first transfer rule"
        description="Spin up your first agent and connect a fallback number so no call ever hits a wall."
        primaryHref="/get-started"
        primaryLabel="Get started"
        secondaryHref="/features"
        secondaryLabel="Back to Features"
      />

      <section className="border-b border-border/50">
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
