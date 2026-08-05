import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Bot,
  HelpCircle,
  IndianRupee,
  LayoutGrid,
  MessageSquareText,
  PhoneCall,
  Sparkles,
  Wand2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { FeatureImageSection } from "@/components/features-page/feature-image-section"
import { DetailFanStack } from "@/components/features-page/detail-fan-stack"
import { HowItWorksConsole } from "@/components/features-page/how-it-works-console"
import { TestingImpactBand } from "@/components/features-page/testing-impact-band"
import { PlaygroundIllustration } from "@/components/features-page/playground-illustration"
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
  title: "Playground / Live Testing",
  description: "Test your agent's responses in a live sandbox before it ever answers a real call.",
  path: "/features/playground-live-testing",
})

const DETAILS = [
  {
    icon: <MessageSquareText className="size-5" aria-hidden />,
    title: "Chat with your agent in a safe sandbox",
    description: "Send test messages and see exactly how your agent would respond to a real caller.",
  },
  {
    icon: <Wand2 className="size-5" aria-hidden />,
    title: "Tweak prompts and see results instantly",
    description: "Adjust your agent's instructions and immediately test the new behavior in the same session.",
  },
  {
    icon: <Sparkles className="size-5" aria-hidden />,
    title: "Catch gaps before going live",
    description: "Find the questions your agent doesn't handle well yet, before a real customer ever asks them.",
  },
]

const STEPS = [
  {
    icon: <Bot className="size-3.5" aria-hidden />,
    title: "open sandbox --agent=receptionist",
    description: "Launch the playground for the agent you want to test.",
  },
  {
    icon: <MessageSquareText className="size-3.5" aria-hidden />,
    title: "send \"can I book for tomorrow?\"",
    description: "Type any message a real caller might say, and send it.",
  },
  {
    icon: <Sparkles className="size-3.5" aria-hidden />,
    title: "review response --latency --accuracy",
    description: "Check the reply, response time, and whether the info was correct.",
  },
]

export default function PlaygroundLiveTestingPage() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Playground / Live Testing", path: "/features/playground-live-testing" },
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
            <nav aria-label="Breadcrumb">
              <span className="inline-flex items-center rounded-full bg-primary/[0.07] px-6 py-2.5 text-base font-semibold uppercase tracking-wide text-primary ring-1 ring-inset ring-primary/20">
                Test &amp; Go Live
              </span>
            </nav>

            <ScrollReveal className="mt-6">
              <h1 className="mt-10 text-[44px] font-extrabold md:text-[60px] lg:text-[72px]" style={{ lineHeight: 0.95, letterSpacing: "-2px" }}>
                <span style={{ color: "#0F172A" }}>Playground /</span>{" "}
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Live Testing
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Test your agent&apos;s responses in a live sandbox before it ever answers a real call — tweak,
                retest, and catch the gaps while it's still safe to.
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
            <PlaygroundIllustration />
          </ScrollReveal>
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-20">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              What you get
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">A safe place to test everything</h2>
          </ScrollReveal>
          <DetailFanStack items={DETAILS} />
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-20">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              How it works
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Test it like a command line</h2>
          </ScrollReveal>
          <HowItWorksConsole steps={STEPS} />
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-20">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Why it matters
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Nothing goes live by accident</h2>
          </ScrollReveal>
          <TestingImpactBand />
        </div>
      </section>

      <FeatureImageSection
        mode="feature"
        slides={[
          {
            role: "Safe sandbox",
            name: "Chat with your agent before it goes live",
            quote: "Send test messages and see exactly how your agent would respond to a real caller.",
          },
          {
            role: "Instant tweaks",
            name: "Change a prompt, see it right away",
            quote: "Adjust your agent's instructions and immediately test the new behavior in the same session.",
          },
          {
            role: "Catch gaps early",
            name: "Find the weak spots first",
            quote: "Spot the questions your agent doesn't handle well yet, before a real customer ever asks them.",
          },
        ]}
      />

      <PricingCta
        heading="Test it yourself before it ever answers a real call"
        description="Spin up your first agent and try it in the sandbox — no real caller until you're ready."
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
