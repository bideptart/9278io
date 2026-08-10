import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, PhoneCall, Check, LayoutGrid, IndianRupee, HelpCircle, Receipt, Users2, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { FeatureImageSection } from "@/components/features-page/feature-image-section"
import { AccountSettingsHero } from "@/components/features-page/account-settings-hero"
import { AccountSettingsToggleList } from "@/components/features-page/account-settings-toggle-list"
import { AccountSettingsFlow } from "@/components/features-page/account-settings-flow"
import { ComparisonPanel } from "@/components/features-page/comparison-panel"
import { BadgeBars } from "@/components/features-page/badge-bars"
import { HeroStatsBand } from "@/components/features-page/hero-stats-band"

const heroStats = [
  { icon: Receipt, stat: "1-click", title: "Billing & Invoices", color: "text-blue-600", tile: "bg-blue-50" },
  { icon: Users2, stat: "Full", title: "Team Access Control", color: "text-violet-600", tile: "bg-violet-50" },
  { icon: ShieldCheck, stat: "Always", title: "Visible Security", color: "text-emerald-600", tile: "bg-emerald-50" },
  { icon: LayoutGrid, stat: "1", title: "Place, Everything", color: "text-orange-600", tile: "bg-orange-50" },
]
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
  title: "Account Settings",
  description: "Manage billing, team access, and account details in one place.",
  path: "/features/account-settings",
})

export default function AccountSettingsPage() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Account Settings", path: "/features/account-settings" },
        ]}
      />

      <section className="relative flex flex-col overflow-hidden border-b border-border">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFF] to-[#EAF4FF]" />
          <div className="absolute -left-24 -top-24 size-[380px] rounded-full bg-primary/[0.06] blur-[120px]" />
          <div className="absolute -bottom-24 -right-16 size-[340px] rounded-full bg-primary/[0.05] blur-[120px]" />
        </div>

        <div className="grid w-full items-stretch gap-10 px-6 pb-6 pt-3 md:px-8 md:pb-8 md:pt-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div>
            <ScrollReveal>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <BadgeBars className="text-primary" />
                Account &amp; Overview
              </span>
              <h1 className="mt-5 text-balance text-[32px] font-bold leading-[1.15] tracking-tight sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-[3.6rem]">
                Account{" "}
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Settings
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Manage billing, team access, and account details in one place — every change applies
                across your account instantly. Invite teammates, set who can edit what, and keep every
                invoice a click away. Security settings stay visible too, so nothing important gets
                buried in a menu.
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
                {["Billing & invoices", "Team access", "Account security"].map((t) => (
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
            <AccountSettingsHero />
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
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Everything your account needs, in one place</h2>
          </ScrollReveal>
          <AccountSettingsToggleList />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              How it works
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Change it once, it's live everywhere</h2>
          </ScrollReveal>
          <AccountSettingsFlow />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Why it matters
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">One place for the whole account</h2>
          </ScrollReveal>
          <div className="mt-8">
            <ComparisonPanel
              withoutTitle="Without unified account settings"
              withoutPoints={[
                "Billing, team, and security scattered across emails",
                "No clear view of who has access to what",
                "Changes take support tickets to update",
              ]}
              withTitle="With Account Settings"
              withPoints={[
                "Billing, team, and security in one dashboard",
                "See exactly who has access, at a glance",
                "Update anything yourself, instantly",
              ]}
            />
          </div>
        </div>
      </section>

      <FeatureImageSection
        mode="feature"
        slides={[
          {
            role: "Billing & invoices",
            name: "Top up, switch plans, done",
            quote: "Manage credit, plan changes, and GST invoices without leaving your dashboard or opening a support ticket.",
            image: "/images/features/account-settings/account-settings-01-billing-invoices.png",
          },
          {
            role: "Team access",
            name: "Control who can edit what",
            quote: "Invite teammates and decide exactly who can touch billing, agents, or both — all from one place.",
            image: "/images/features/account-settings/account-settings-02-team-access.png",
          },
          {
            role: "Account security",
            name: "Nothing buried in a menu",
            quote: "Security settings, login preferences, and business info stay visible and easy to change, instantly.",
            image: "/images/features/account-settings/account-settings-03-account-security.png",
          },
        ]}
      />

      <PricingCta
        heading="Ready to take control of your account?"
        description="Build your first agent free, then manage billing, team access, and security from one settings page."
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
