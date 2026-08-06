import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Fingerprint, PhoneCall, Check, LayoutGrid, IndianRupee, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { FeatureImageSection } from "@/components/features-page/feature-image-section"
import { IdentitySetupHero } from "@/components/features-page/identity-setup-hero"
import { IdentityCardStack } from "@/components/features-page/identity-card-stack"
import { IdentityWizard } from "@/components/features-page/identity-wizard"
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
  title: "Agent Identity Setup",
  description: "Name your agent, set its avatar, and define how it introduces itself.",
  path: "/features/identity-setup",
})

export default function IdentitySetupPage() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Agent Identity Setup", path: "/features/identity-setup" },
        ]}
      />

      <section className="relative flex flex-col overflow-hidden border-b border-border">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFF] to-[#F3EEFF]" />
          <div className="absolute -left-24 -top-24 size-[380px] rounded-full bg-[#7C3AED]/[0.07] blur-[120px]" />
          <div className="absolute -bottom-24 -right-16 size-[340px] rounded-full bg-primary/[0.05] blur-[120px]" />
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pb-14 pt-2 md:px-8 md:pb-20 md:pt-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div>
            <ScrollReveal>
              <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <Fingerprint className="size-3.5" aria-hidden />
                Account &amp; Overview
              </span>
              <h1 className="mt-10 text-balance text-[34px] font-extrabold sm:text-[44px] md:text-[60px] lg:text-[72px]" style={{ lineHeight: 1, letterSpacing: "-1px" }}>
                Agent{" "}
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Identity Setup
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Name your agent, set its avatar, and define how it introduces itself — a distinct identity
                for every number you run. Every agent gets its own look and voice, so callers instantly
                know which business they've reached. Update the name, avatar, or greeting anytime, and it
                applies everywhere that agent answers.
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
                {["Name and avatar", "Custom greeting", "Consistent branding"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <Check className="size-3.5 text-primary" aria-hidden />
                    {t}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.08}>
            <IdentitySetupHero />
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
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">An identity, not just a number</h2>
          </ScrollReveal>
          <IdentityCardStack />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              How it works
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Three steps to a finished identity</h2>
          </ScrollReveal>
          <IdentityWizard />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Why it matters
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Callers remember a name, not a number</h2>
          </ScrollReveal>
          <div className="mt-8">
            <ComparisonPanel
              withoutTitle="Without a defined identity"
              withoutPoints={[
                "Every agent sounds and feels generic",
                "Callers aren't sure who they're speaking with",
                "Branding is inconsistent across numbers",
              ]}
              withTitle="With Agent Identity Setup"
              withPoints={[
                "Each agent has its own name and avatar",
                "Callers hear a consistent, branded greeting",
                "Every number feels like part of your business",
              ]}
            />
          </div>
        </div>
      </section>

      <FeatureImageSection
        mode="feature"
        slides={[
          {
            role: "Name and avatar",
            name: "A distinct identity per agent",
            quote: "Name your agent and give it a look, so callers instantly know which business they've reached.",
          },
          {
            role: "Custom greeting",
            name: "Write it once, in your own words",
            quote: "Define exactly how each agent introduces itself, and it applies everywhere that agent answers.",
          },
          {
            role: "Consistent branding",
            name: "Every number feels on-brand",
            quote: "Update the name, avatar, or greeting anytime, and every call reflects it right away.",
          },
        ]}
      />

      <PricingCta
        heading="Ready to give your agent an identity?"
        description="Build your first agent free, then name it, style its avatar, and write its greeting."
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
