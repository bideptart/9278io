import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  MessageSquareText,
  Repeat,
  PhoneForwarded,
  Settings,
  PhoneCall,
  UserCheck,
  Check,
  LayoutGrid,
  IndianRupee,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { FeatureImageSection } from "@/components/features-page/feature-image-section"
import { DetailCards } from "@/components/features-page/detail-cards"
import { HowItWorksFlow } from "@/components/features-page/how-it-works-flow"
import { CallBehaviorComparison } from "@/components/features-page/call-behavior-comparison"
import { MultiAgentExploreLinks } from "@/components/features-page/multi-agent-explore-links"
import { CallBehaviorPanel } from "@/components/features-page/call-behavior-panel"
import { BadgeBars } from "@/components/features-page/badge-bars"
import { HeroStatsBand } from "@/components/features-page/hero-stats-band"

const heroStats = [
  { icon: MessageSquareText, stat: "Custom", title: "Greeting", color: "text-blue-600", tile: "bg-blue-50" },
  { icon: Repeat, stat: "Natural", title: "Interruptions", color: "text-violet-600", tile: "bg-violet-50" },
  { icon: UserCheck, stat: "Smart", title: "Handoff Rules", color: "text-emerald-600", tile: "bg-emerald-50" },
  { icon: PhoneForwarded, stat: "Every", title: "Call, Same Rules", color: "text-orange-600", tile: "bg-orange-50" },
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
  title: "Call Behavior Controls",
  description: "Set how your agent greets callers, handles interruptions, and hands off conversations.",
  path: "/features/call-behavior-controls",
})

const DETAILS = [
  {
    icon: <MessageSquareText className="size-5" aria-hidden />,
    title: "Set a custom greeting per agent",
    description: "Write the exact words each agent opens a call with, so it sounds like your business, not a generic bot.",
  },
  {
    icon: <Repeat className="size-5" aria-hidden />,
    title: "Choose how interruptions are handled",
    description: "Let callers talk over the agent mid-sentence, just like a real conversation — or keep it turn-based.",
  },
  {
    icon: <PhoneForwarded className="size-5" aria-hidden />,
    title: "Define exactly when to transfer to a human",
    description: "Set the trigger — failed attempts, a specific request, a VIP caller — and the agent hands off on cue.",
  },
]

const STEPS = [
  {
    icon: <Settings className="size-5" aria-hidden />,
    title: "Configure once in the dashboard",
    description: "Set the greeting, interruption rule, and handoff trigger for an agent — takes a couple of minutes.",
  },
  {
    icon: <PhoneCall className="size-5" aria-hidden />,
    title: "Every call follows your rules automatically",
    description: "No per-call setup — the same behavior applies consistently, call after call.",
  },
  {
    icon: <UserCheck className="size-5" aria-hidden />,
    title: "Callers get exactly the experience you defined",
    description: "The right greeting, natural back-and-forth, and a clean handoff the moment it's actually needed.",
  },
]

export default function CallBehaviorControlsPage() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Call Behavior Controls", path: "/features/call-behavior-controls" },
        ]}
      />

      <section className="relative flex flex-col overflow-hidden border-b border-border/50">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFF] to-[#EAF4FF]" />
          <div className="absolute -left-24 -top-24 size-[380px] rounded-full bg-primary/[0.06] blur-[120px]" />
          <div className="absolute -bottom-24 -right-16 size-[340px] rounded-full bg-primary/[0.05] blur-[120px]" />
        </div>
        <div className="grid w-full items-stretch gap-10 px-6 pb-6 pt-3 md:px-8 md:pb-8 md:pt-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div className="min-w-0">
            <ScrollReveal>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <BadgeBars className="text-primary" />
                Build &amp; Setup
              </span>
              <h1 className="mt-5 text-balance text-[32px] font-bold leading-[1.15] tracking-tight sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-[3.6rem]">
                Call{" "}
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Behavior Controls
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Set how your agent greets callers, handles interruptions, and hands off conversations —
                once, in the dashboard, and every call follows the same rules. Change your mind later and
                the update applies to every call from that moment on, no redeployment needed. Every rule
                lives in one place, so your whole team's calls stay consistent.
              </p>

              <div className="mt-7 flex flex-nowrap gap-2 sm:gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-10 shrink-0 rounded-full bg-gradient-to-r from-primary to-[oklch(0.5_0.21_255)] px-3 text-xs font-semibold text-white shadow-[0_8px_28px_oklch(0.546_0.215_262.88/0.45)] transition-all hover:shadow-[0_10px_36px_oklch(0.546_0.215_262.88/0.6)] sm:h-12 sm:px-7 sm:text-base"
                >
                  <Link href="/get-started">
                    <span className="sm:hidden">Build agent</span>
                    <span className="hidden sm:inline">Build your first agent</span>
                    <ArrowRight className="ml-1 size-4" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-10 shrink-0 rounded-full border-border bg-white px-3 text-xs font-semibold text-foreground hover:border-primary/30 hover:bg-slate-50 sm:h-12 sm:px-7 sm:text-base"
                >
                  <Link href="/contact">
                    <PhoneCall className="mr-2 size-4" />
                    Talk to sales
                  </Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {["Set up once per agent", "Applies to every call automatically", "No code required"].map((t) => (
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
            <CallBehaviorPanel />
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
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Three controls, every call</h2>
          </ScrollReveal>
          <div className="mt-10">
            <DetailCards items={DETAILS} />
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
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Set once, applies every call</h2>
          </ScrollReveal>
          <HowItWorksFlow steps={STEPS} />
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Why it matters
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">A defined behavior, not a guess</h2>
          </ScrollReveal>
          <div className="mt-8">
            <CallBehaviorComparison />
          </div>
        </div>
      </section>

      <FeatureImageSection
        mode="feature"
        slides={[
          {
            role: "Custom greeting",
            name: "Sounds like your business, not a bot",
            quote: "Write the exact words each agent opens a call with — set once per agent, in the dashboard.",
            image: "/images/features/call-behavior-controls/call-behavior-controls-01-custom-greeting.png",
          },
          {
            role: "Interruptions",
            name: "Callers can talk over the agent",
            quote: "Choose whether callers can interrupt mid-sentence like a real conversation, or keep it turn-based.",
            image: "/images/features/call-behavior-controls/call-behavior-controls-02-interruptions.png",
          },
          {
            role: "Handoff trigger",
            name: "Define exactly when it transfers",
            quote: "Set the trigger — failed attempts, a specific request, a VIP caller — and the agent hands off on cue.",
            image: "/images/features/call-behavior-controls/call-behavior-controls-03-handoff-trigger.png",
          },
        ]}
      />

      <PricingCta
        heading="Ready to set your agent's call behavior?"
        description="Build your first agent free, then configure its greeting, interruption handling, and handoff rules — all in one place."
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
