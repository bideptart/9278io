import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, PhoneCall, Check, LayoutGrid, IndianRupee, HelpCircle, Users, Zap, RefreshCw, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { FeatureImageSection } from "@/components/features-page/feature-image-section"
import { MultiAgentExploreLinks } from "@/components/features-page/multi-agent-explore-links"
import { KnowledgeBaseHeroIllustration } from "@/components/features-page/knowledge-base-hero-illustration"
import { KnowledgeCategoryShowcase } from "@/components/features-page/knowledge-category-showcase"
import { KnowledgeIndexLookup } from "@/components/features-page/knowledge-index-lookup"
import { KnowledgeIsolationVault } from "@/components/features-page/knowledge-isolation-vault"
import { BadgeBars } from "@/components/features-page/badge-bars"
import { HeroStatsBand } from "@/components/features-page/hero-stats-band"

const heroStats = [
  { icon: Users, stat: "Isolated", title: "Per Agent", color: "text-blue-600", tile: "bg-blue-50" },
  { icon: Zap, stat: "Instant", title: "Edits Go Live", color: "text-violet-600", tile: "bg-violet-50" },
  { icon: RefreshCw, stat: "0", title: "Retraining Needed", color: "text-emerald-600", tile: "bg-emerald-50" },
  { icon: BookOpen, stat: "FAQs +", title: "Policies", color: "text-orange-600", tile: "bg-orange-50" },
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
  title: "Knowledge Base (per agent)",
  description: "Give each agent its own set of company facts, FAQs, and policies to draw on.",
  path: "/features/knowledge-base",
})

export default function KnowledgeBasePage() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Knowledge Base (per agent)", path: "/features/knowledge-base" },
        ]}
      />

      {/* Hero */}
      <section className="relative flex flex-col overflow-hidden border-b border-border/50 lg:min-h-[calc(100vh-64px)] lg:justify-center">
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
                Train &amp; Configure
              </span>
              <h1 className="mt-5 text-balance text-[32px] font-bold leading-[1.15] tracking-tight sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-[3.6rem]">
                Knowledge{" "}
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Base
                </span>
              </h1>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Give each agent its own set of company facts, FAQs, and policies to draw on — isolated from
                every other agent on your account. Update an entry anytime and every call after that reflects
                it immediately, no retraining required.
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
                {["Isolated per agent", "Edits go live instantly", "No re-training needed"].map((t) => (
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
            <KnowledgeBaseHeroIllustration />
          </ScrollReveal>
        </div>
      </section>

      {/* Three kinds of knowledge, one home */}
      <section className="border-b border-border/50 bg-white">
        <div className="w-full px-6 pb-6 pt-3 md:px-8 md:pb-8 md:pt-4">
          <ScrollReveal className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              What goes in
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Three kinds of knowledge, one home</h2>
            <p className="mt-2 text-pretty text-muted-foreground">
              FAQs, policies, and business facts — every fact your agent needs, written the way you'd
              explain it to a new hire.
            </p>
          </ScrollReveal>
          <KnowledgeCategoryShowcase />
        </div>
      </section>

      {/* Ask it anything, it just knows */}
      <section className="border-b border-border/50" style={{ backgroundColor: "#F7F9FC" }}>
        <div className="w-full px-6 pb-6 pt-3 md:px-8 md:pb-8 md:pt-4">
          <ScrollReveal className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              How it answers
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Ask it anything, it just knows</h2>
            <p className="mt-2 text-pretty text-muted-foreground">
              Mid-call, the agent matches the caller's question to the right entry — no scripting, no
              guessing.
            </p>
          </ScrollReveal>
          <KnowledgeIndexLookup />
        </div>
      </section>

      {/* Every agent, its own brain */}
      <section className="border-b border-border/50 bg-white">
        <div className="w-full px-6 pb-6 pt-3 md:px-8 md:pb-8 md:pt-4">
          <ScrollReveal className="max-w-2xl text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              No cross-talk
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Every agent, its own brain</h2>
            <p className="mt-2 text-pretty text-muted-foreground">
              Each agent's knowledge base is completely isolated — one agent never answers from another
              agent's facts.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.08} className="mt-10 flex justify-center">
            <KnowledgeIsolationVault />
          </ScrollReveal>
        </div>
      </section>

      <FeatureImageSection
        mode="feature"
        slides={[
          {
            role: "Isolated per agent",
            name: "Its own facts, its own brain",
            quote: "Each agent's knowledge base is completely separate — one agent never answers from another agent's facts.",
            image: "/images/features/knowledge-base/knowledge-base-01-isolated-per-agent.png",
          },
          {
            role: "Instant updates",
            name: "Edits go live immediately",
            quote: "Change an FAQ, policy, or fact and every call after that reflects it — no retraining, no delay.",
            image: "/images/features/knowledge-base/knowledge-base-02-instant-updates.png",
          },
          {
            role: "No re-training",
            name: "Nothing to rebuild",
            quote: "Add or edit facts anytime without touching the agent's voice, routing, or behavior setup.",
            image: "/images/features/knowledge-base/knowledge-base-03-no-retraining.png",
          },
        ]}
      />

      <PricingCta
        heading="Ready to give your agent its own knowledge base?"
        description="Build your first agent free, then add the FAQs, policies, and facts it should know — no code required."
        primaryHref="/get-started"
        primaryLabel="Get started"
        secondaryHref="/features"
        secondaryLabel="Back to Features"
      />

      {/* Explore more */}
      <section className="border-b border-border/50">
        <div className="w-full px-6 pb-6 pt-3 md:px-8 md:pb-8 md:pt-4">
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
