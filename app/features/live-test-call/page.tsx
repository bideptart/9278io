import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, PhoneCall, PhoneOutgoing, Check, LayoutGrid, IndianRupee, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { FeatureImageSection } from "@/components/features-page/feature-image-section"
import { LiveTestCallHero } from "@/components/features-page/live-test-call-hero"
import { LiveTestCallChecklist } from "@/components/features-page/live-test-call-checklist"
import { LiveTestCallTimeline } from "@/components/features-page/live-test-call-timeline"
import { ComparisonPanel } from "@/components/features-page/comparison-panel"
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
  title: "Live Test Call (Real Number Dial-In)",
  description: "Dial your agent's real number and hear exactly what your callers hear, live.",
  path: "/features/live-test-call",
})

export default function LiveTestCallPage() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Live Test Call", path: "/features/live-test-call" },
        ]}
      />

      <section className="relative flex flex-col overflow-hidden border-b border-border">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFF] to-[#EAF4FF]" />
          <div className="absolute -left-24 -top-24 size-[380px] rounded-full bg-primary/[0.06] blur-[120px]" />
          <div className="absolute -bottom-24 -right-16 size-[340px] rounded-full bg-primary/[0.05] blur-[120px]" />
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pb-16 pt-2 md:px-8 md:pb-20 md:pt-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div>
            <ScrollReveal>
              <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <PhoneOutgoing className="size-3.5" aria-hidden />
                Test &amp; Go Live
              </span>
              <h1 className="mt-10 text-balance text-[34px] font-extrabold sm:text-[44px] md:text-[60px] lg:text-[72px]" style={{ lineHeight: 1, letterSpacing: "-1px" }}>
                Live Test Call
                <br />
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Real number dial-in
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Dial your agent's real number and hear exactly what your callers hear, live — the same
                voice, the same greeting, the same answers. No sandbox, no simulation.
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

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {["Dial the real number", "Verify voice & latency", "Confirm routing end to end"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <Check className="size-3.5 text-primary" aria-hidden />
                    {t}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.08}>
            <LiveTestCallHero />
          </ScrollReveal>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 pb-8 pt-10 md:px-8 md:pb-10 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              What you get
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Test it like a real caller would</h2>
          </ScrollReveal>
          <LiveTestCallChecklist />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 pb-8 pt-10 md:px-8 md:pb-10 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              How it works
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">One call, start to approved</h2>
          </ScrollReveal>
          <LiveTestCallTimeline />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 pb-8 pt-10 md:px-8 md:pb-10 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Why it matters
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Catch it before a caller does</h2>
          </ScrollReveal>
          <div className="mt-8">
            <ComparisonPanel
              withoutTitle="Without a real dial-in test"
              withoutPoints={[
                "Only tested in a text-based sandbox",
                "First real call reveals voice or latency issues",
                "Routing mistakes discovered by an actual customer",
              ]}
              withTitle="With Live Test Call"
              withPoints={[
                "Tested by dialing the exact live number",
                "Voice and latency verified before launch",
                "Routing confirmed end to end, by you",
              ]}
            />
          </div>
        </div>
      </section>

      <FeatureImageSection
        mode="feature"
        slides={[
          {
            role: "Real number",
            name: "Dial exactly what callers dial",
            quote: "No sandbox mode — test the exact number your customers call, live.",
            image: "/images/features/live-test-call/live-test-call-01-real-number.png",
          },
          {
            role: "Voice & latency",
            name: "Catch it before a customer does",
            quote: "Hear the same voice, greeting, and hold music your callers hear, and spot lag or glitches live.",
            image: "/images/features/live-test-call/live-test-call-02-voice-latency.png",
          },
          {
            role: "Routing check",
            name: "Confirm it end to end",
            quote: "Verify transfers, fallbacks, and after-hours behavior all work exactly as configured.",
            image: "/images/features/live-test-call/live-test-call-03-routing-check.png",
          },
        ]}
      />

      <PricingCta
        heading="Ready to hear your agent live?"
        description="Build your first agent free, then dial the real number and hear exactly what your callers hear."
        primaryHref="/get-started"
        primaryLabel="Get started"
        secondaryHref="/features"
        secondaryLabel="Back to Features"
      />

      <section className="border-b border-border">
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
