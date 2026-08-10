import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, LayoutDashboard, Copy, PhoneCall, LayoutGrid, IndianRupee, HelpCircle, Check, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { FeatureImageSection } from "@/components/features-page/feature-image-section"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { MultiAgentHub } from "@/components/features-page/multi-agent-hub"
import { MultiAgentCapabilities } from "@/components/features-page/multi-agent-capabilities"
import { MultiAgentExploreLinks } from "@/components/features-page/multi-agent-explore-links"
import { BadgeBars } from "@/components/features-page/badge-bars"
import { HeroStatsBand } from "@/components/features-page/hero-stats-band"

const heroStats = [
  { icon: Bot, stat: "∞", title: "Agents / Account", color: "text-blue-600", tile: "bg-blue-50" },
  { icon: LayoutDashboard, stat: "1", title: "Shared Dashboard", color: "text-violet-600", tile: "bg-violet-50" },
  { icon: Copy, stat: "<1m", title: "Clone a Setup", color: "text-emerald-600", tile: "bg-emerald-50" },
  { icon: PhoneCall, stat: "1", title: "Number / Agent", color: "text-orange-600", tile: "bg-orange-50" },
]

export const metadata: Metadata = pageSeo({
  title: "Multi-Agent Management — 9278.io Features",
  description:
    "Create and manage as many AI voice agents as you need from a single 9278.io account — one dashboard, fast cloning, and a dedicated number per agent.",
  path: "/features/multi-agent-management",
})

const capabilities = [
  {
    icon: <LayoutDashboard className="size-8 shrink-0 text-primary md:size-10" aria-hidden />,
    title: "One dashboard for every agent you run",
    description:
      "Every agent on your account — however many you create — shows up in the same dashboard. Switch between them without juggling separate logins or tools. As your team adds more agents for more use cases, none of them fragment the view — it stays one place to check on everything.",
    points: [
      "Every agent appears in the same dashboard",
      "Switch between agents without separate logins",
      "No extra tools to manage",
      "Scales as you add more agents, without splitting your view",
    ],
  },
  {
    icon: <Copy className="size-8 shrink-0 text-primary md:size-10" aria-hidden />,
    title: "Clone an existing agent to start a new one fast",
    description:
      "Already have an agent configured the way you like? Clone it to spin up a new one with the same voice, knowledge base, and call behavior as a starting point, instead of building from scratch. It's the fastest way to launch a new line of business without redoing setup you've already gotten right.",
    points: [
      "Same voice carried over automatically",
      "Knowledge base copied to the new agent",
      "Call behavior reused as your starting point",
      "Skip re-doing setup you've already configured once",
    ],
  },
  {
    icon: <PhoneCall className="size-8 shrink-0 text-primary md:size-10" aria-hidden />,
    title: "Assign a different number to each agent",
    description:
      "Give each agent its own phone number, so a caller to your sales line and a caller to your support line reach the right agent automatically — no manual routing required. Every line stays independent, so each agent can specialize in the conversation it was built for.",
    points: [
      "Each agent gets its own dedicated number",
      "Callers reach the right agent automatically",
      "No manual call routing needed",
      "Each line stays specialized to its own agent",
    ],
  },
]

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

export default function MultiAgentManagementPage() {
  return (
    <main className="flex min-h-dvh flex-col bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Multi-Agent Management", path: "/features/multi-agent-management" },
        ]}
      />

      {/* Hero */}
      <section className="relative flex flex-col overflow-hidden border-b border-border/50 lg:min-h-[calc(100vh-64px)] lg:justify-center">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFF] to-[#EAF4FF]" />
          <div className="absolute -left-24 -top-24 size-[380px] rounded-full bg-primary/[0.06] blur-[120px]" />
          <div className="absolute -bottom-24 -right-16 size-[340px] rounded-full bg-primary/[0.05] blur-[120px]" />
        </div>
        <div className="grid w-full items-stretch gap-10 px-6 pb-6 pt-3 md:px-8 md:pb-8 md:pt-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div>
            <ScrollReveal>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <BadgeBars className="text-primary" />
                Build &amp; Setup
              </span>
              <h1 className="mt-5 text-balance text-[32px] font-bold leading-[1.15] tracking-tight sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-[3.6rem]">
                Multi-Agent{" "}
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Management
                </span>
              </h1>
              <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Create and manage as many AI agents as you need from a single account — one dashboard, fast
                cloning, and a dedicated number per agent. Switch between agents in seconds, no separate
                logins, and no juggling multiple accounts to keep everything running.
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
                {["One dashboard for every agent", "Clone a setup in minutes", "A dedicated number per agent"].map((t) => (
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
            <MultiAgentHub />
          </ScrollReveal>
        </div>
      </section>

      {/* Capabilities intro */}
      <section className="border-b border-border/50">
        <div className="mx-auto flex max-w-5xl items-center justify-center px-6 py-10 md:px-8 md:py-14">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Multi-Agent Management</p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Every agent, managed from{" "}
              <span className="bg-gradient-to-r from-primary via-[oklch(0.62_0.2_240)] to-[oklch(0.5_0.22_255)] bg-clip-text text-transparent">
                one place.
              </span>
            </h2>
          </ScrollReveal>
        </div>
      </section>

      {/* Capabilities — each one is its own full-width section, alternating background */}
      <MultiAgentCapabilities capabilities={capabilities} />

      <FeatureImageSection
        mode="feature"
        slides={[
          {
            role: "One dashboard",
            name: "Every agent, one account",
            quote: "However many agents you create — sales, support, dispatch — they all show up in the same 9278.io dashboard. No juggling separate logins.",
            image: "/images/features/multi-agent-management/multi-agent-management-01-one-dashboard.png",
          },
          {
            role: "Fast cloning",
            name: "Clone an agent in minutes",
            quote: "Start a new agent from one you've already configured — same voice, same knowledge base, same call behavior — instead of rebuilding from scratch.",
            image: "/images/features/multi-agent-management/multi-agent-management-02-fast-cloning.png",
          },
          {
            role: "Dedicated numbers",
            name: "One number per agent",
            quote: "Give every agent its own phone number so a caller to sales and a caller to support each reach the right agent automatically.",
            image: "/images/features/multi-agent-management/multi-agent-management-03-dedicated-numbers.png",
          },
        ]}
      />

      <PricingCta
        heading="Ready to manage your agents from one place?"
        description="Create your first agent free, then add as many more as your business needs — all from one dashboard."
        primaryHref="/get-started"
        primaryLabel="Get started"
        secondaryHref="/pricing"
        secondaryLabel="View pricing"
      />

      <section className="w-full px-6 pb-24 md:px-8" style={{ backgroundColor: "#F7F9FC" }}>
        <div className="mx-auto max-w-5xl pt-16 md:pt-20">
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
