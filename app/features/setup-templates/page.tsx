import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, PhoneCall, LayoutTemplate, Check, LayoutGrid, IndianRupee, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { FeatureImageSection } from "@/components/features-page/feature-image-section"
import { SetupTemplatesLaptopHero } from "@/components/features-page/setup-templates-laptop-hero"
import { TemplateGrid } from "@/components/features-page/template-grid"
import { TemplateLaunchFlow } from "@/components/features-page/template-launch-flow"
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
  title: "Ready-Made Setup Templates",
  description: "Start from Receptionist, Healthcare, Transport, Support, or Blank. Launch in minutes.",
  path: "/features/setup-templates",
})

export default function SetupTemplatesPage() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Ready-Made Setup Templates", path: "/features/setup-templates" },
        ]}
      />

      <section className="relative flex flex-col overflow-hidden border-b border-border">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFF] to-[#F3EEFF]" />
          <div className="absolute -left-24 -top-24 size-[380px] rounded-full bg-[#7C3AED]/[0.07] blur-[120px]" />
          <div className="absolute -bottom-24 -right-16 size-[340px] rounded-full bg-primary/[0.05] blur-[120px]" />
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pb-12 pt-4 md:px-8 md:pb-16 md:pt-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div>
            <ScrollReveal>
              <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <LayoutTemplate className="size-3.5" aria-hidden />
                Test &amp; Go Live
              </span>
              <h1 className="mt-4 text-balance text-[34px] font-extrabold sm:text-[44px] md:text-[60px] lg:text-[72px]" style={{ lineHeight: 1, letterSpacing: "-1px" }}>
                Ready-Made
                <br />
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Setup Templates
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Start from Receptionist, Healthcare, Transport, Support, or Blank — each one pre-filled
                with a greeting, routing, and knowledge base. Launch in minutes, then customize anything.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
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
                {["5 proven templates", "Pre-filled and ready", "Customize after launch"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <Check className="size-3.5 text-primary" aria-hidden />
                    {t}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.08}>
            <SetupTemplatesLaptopHero />
          </ScrollReveal>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              What you get
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Five templates, pick your starting point</h2>
          </ScrollReveal>
          <TemplateGrid />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              How it works
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">From template to live agent</h2>
          </ScrollReveal>
          <TemplateLaunchFlow />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Why it matters
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Skip the blank-page problem</h2>
          </ScrollReveal>
          <div className="mt-8">
            <ComparisonPanel
              withoutTitle="Without setup templates"
              withoutPoints={[
                "Every agent starts from a blank page",
                "Writing a greeting and rules from scratch takes hours",
                "Easy to miss a step a proven setup would cover",
              ]}
              withTitle="With Setup Templates"
              withPoints={[
                "Start from a proven, pre-filled template",
                "Greeting, routing, and knowledge already set",
                "Launch in minutes, refine anything after",
              ]}
            />
          </div>
        </div>
      </section>

      <FeatureImageSection
        mode="feature"
        slides={[
          {
            role: "5 proven templates",
            name: "A starting point for every use case",
            quote: "Receptionist, Healthcare, Transport, Support, or Blank — each one pre-filled and ready to launch.",
            image: "/images/features/setup-templates/setup-templates-01-proven-templates.png",
          },
          {
            role: "Pre-filled",
            name: "Greeting, routing, and knowledge already set",
            quote: "Skip the blank page — every template ships with the basics your agent needs, done.",
            image: "/images/features/setup-templates/setup-templates-02-pre-filled.png",
          },
          {
            role: "Fully customizable",
            name: "Start from a template, make it yours",
            quote: "Launch in minutes, then refine anything — the greeting, routing, or knowledge — anytime after.",
            image: "/images/features/setup-templates/setup-templates-03-fully-customizable.png",
          },
        ]}
      />

      <PricingCta
        heading="Ready to launch from a template?"
        description="Build your first agent free, then start from Receptionist, Healthcare, Transport, Support, or Blank."
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
