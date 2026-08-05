import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, LayoutDashboard, Copy, PhoneCall, LayoutGrid, IndianRupee, HelpCircle } from "lucide-react"
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
      <section className="relative overflow-hidden" style={{ backgroundColor: "#F7F9FC" }}>
        {/* page-level soft blue blobs, top-right and bottom-left */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 -z-10 size-[520px] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, #2563EB, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-32 -z-10 size-[420px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #2563EB, transparent 70%)" }}
        />
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-10 px-6 py-10 md:px-8 md:py-14 lg:flex-row lg:items-center lg:gap-10">
          <div className="w-full max-w-2xl text-center lg:max-w-none lg:flex-1 lg:text-left">
            <ScrollReveal>
              <div className="flex justify-center lg:justify-start">
                <span
                  className="inline-flex h-10 items-center gap-2 rounded-full text-[15px] font-semibold"
                  style={{ backgroundColor: "#EEF4FF", border: "1px solid #BBD1FF", color: "#2563EB", padding: "0 18px" }}
                >
                  <span className="size-1.5 rounded-full" style={{ backgroundColor: "#2563EB" }} aria-hidden />
                  BUILD &amp; SETUP
                </span>
              </div>

              <h1
                className="mt-10 text-[44px] font-extrabold md:text-[60px] lg:text-[72px]"
                style={{ lineHeight: 0.95, letterSpacing: "-2px" }}
              >
                <span style={{ color: "#0F172A" }}>Multi-Agent</span>
                <br />
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

              <p
                className="mx-auto mt-8 text-xl md:text-[24px] lg:mx-0"
                style={{ color: "#667085", lineHeight: 1.6, maxWidth: "500px" }}
              >
                Create and manage as many AI agents as you need from a single account.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-5 lg:justify-start">
                <Link
                  href="/get-started"
                  className="group inline-flex h-[60px] items-center gap-2 rounded-full pl-[34px] pr-[10px] text-base font-semibold text-white transition-all hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(90deg, #4F8DFF, #2563EB)",
                    boxShadow: "0 20px 60px rgba(37,99,235,0.25)",
                  }}
                >
                  Build your first agent
                  <span className="flex size-9 items-center justify-center rounded-full bg-white/20">
                    <ArrowRight className="size-4" aria-hidden />
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-[60px] items-center rounded-full px-9 text-base font-semibold transition-colors hover:bg-[#F1F5F9]"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D5DD", color: "#0F172A" }}
                >
                  Talk to sales
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="w-full max-w-md lg:max-w-none lg:flex-1">
            <ScrollReveal>
              <MultiAgentHub />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Capabilities intro */}
      <section className="border-b border-border/50">
        <div className="mx-auto flex min-h-[240px] max-w-5xl items-center justify-center px-6 py-14 md:min-h-[280px] md:px-8 md:py-20">
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
          },
          {
            role: "Fast cloning",
            name: "Clone an agent in minutes",
            quote: "Start a new agent from one you've already configured — same voice, same knowledge base, same call behavior — instead of rebuilding from scratch.",
          },
          {
            role: "Dedicated numbers",
            name: "One number per agent",
            quote: "Give every agent its own phone number so a caller to sales and a caller to support each reach the right agent automatically.",
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
