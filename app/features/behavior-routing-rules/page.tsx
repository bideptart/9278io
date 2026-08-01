import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  GitBranch,
  Clock,
  Route,
  PhoneIncoming,
  ArrowRightCircle,
  PhoneCall,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { DetailCards } from "@/components/features-page/detail-cards"
import { HowItWorksFlow } from "@/components/features-page/how-it-works-flow"
import { ComparisonPanel } from "@/components/features-page/comparison-panel"
import { FaqSwitcher } from "@/components/features-page/faq-switcher"
import { RoutingRulesPanel } from "@/components/features-page/routing-rules-panel"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { FAQ_GROUPS } from "@/lib/faq"

const agentsFaq = FAQ_GROUPS.find((g) => g.id === "agents")!.items.filter((i) =>
  ["Can the agent transfer to a human?", "Does it integrate with Indian CRMs and tools?"].includes(i.q),
)

export const metadata: Metadata = pageSeo({
  title: "Behavior & Routing Rules",
  description: "Decide how calls get classified and routed by intent, keyword, or time of day.",
  path: "/features/behavior-routing-rules",
})

const DETAILS = [
  {
    icon: <GitBranch className="size-5" aria-hidden />,
    title: "Route by caller intent or keyword",
    description: "Classify a call automatically based on what the caller says or asks for.",
  },
  {
    icon: <Clock className="size-5" aria-hidden />,
    title: "Handle calls differently by time of day",
    description: "Route after-hours calls to voicemail or a different flow than business-hours calls.",
  },
  {
    icon: <Route className="size-5" aria-hidden />,
    title: "Fallback rules for unmatched calls",
    description: "Set a safety-net rule so a call that doesn't match anything still goes somewhere sensible.",
  },
]

const STEPS = [
  {
    icon: <PhoneIncoming className="size-5" aria-hidden />,
    title: "A call comes in",
    description: "Every inbound call is evaluated against your routing rules before the agent responds.",
  },
  {
    icon: <GitBranch className="size-5" aria-hidden />,
    title: "It's classified by intent, keyword, or time",
    description: "The rule set decides which flow the call should follow, automatically.",
  },
  {
    icon: <ArrowRightCircle className="size-5" aria-hidden />,
    title: "The call follows the matching route",
    description: "From there it's handled, transferred, or escalated exactly as you defined.",
  },
]

export default function BehaviorRoutingRulesPage() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Behavior & Routing Rules", path: "/features/behavior-routing-rules" },
        ]}
      />

      <section className="relative flex flex-col border-b border-border/50">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFF] to-[#EAF4FF]" />
          <div className="absolute -left-24 -top-24 size-[380px] rounded-full bg-primary/[0.06] blur-[120px]" />
          <div className="absolute -bottom-24 -right-16 size-[340px] rounded-full bg-primary/[0.05] blur-[120px]" />
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pb-20 pt-2 md:px-8 md:pb-24 md:pt-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div>
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
                Train &amp; Configure
              </span>
              <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Behavior{" "}
                <span className="bg-gradient-to-r from-primary via-[oklch(0.62_0.2_240)] to-[oklch(0.72_0.18_150)] bg-clip-text text-transparent">
                  &amp; Routing Rules
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Decide how calls get classified and routed by intent, keyword, or time of day — so every
                call ends up exactly where it should.
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
                {["Route by intent or keyword", "Time-of-day aware", "Fallback rule included"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <Check className="size-3.5 text-primary" aria-hidden />
                    {t}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.08}>
            <RoutingRulesPanel />
          </ScrollReveal>
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-4xl px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              What you get
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Rules that decide where a call goes</h2>
          </ScrollReveal>
          <div className="mt-10">
            <DetailCards items={DETAILS} />
          </div>
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-4xl px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              How it works
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">From ring to the right destination</h2>
          </ScrollReveal>
          <HowItWorksFlow steps={STEPS} />
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-4xl px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Why it matters
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Every call, routed on purpose</h2>
          </ScrollReveal>
          <div className="mt-8">
            <ComparisonPanel
              withoutTitle="Without behavior & routing rules"
              withoutPoints={[
                "Every call follows the same flow, regardless of intent",
                "After-hours calls get treated the same as business hours",
                "Unmatched calls have nowhere defined to go",
              ]}
              withTitle="With Behavior & Routing Rules"
              withPoints={[
                "Calls route automatically by intent or keyword",
                "Time-of-day rules send after-hours calls the right way",
                "A fallback rule catches anything unmatched",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-4xl px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Related questions
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Routing, answered</h2>
            <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Straight from the FAQ — pick a question to see the answer.
            </p>
          </ScrollReveal>
          <div className="mt-8">
            <FaqSwitcher items={agentsFaq} />
          </div>
          <Link
            href="/faq"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            See all FAQs
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      </section>

      <PricingCta
        heading="Ready to set your routing rules?"
        description="Build your first agent free, then define how calls get classified and routed — by intent, keyword, or time of day."
        primaryHref="/get-started"
        primaryLabel="Get started"
        secondaryHref="/features"
        secondaryLabel="Back to Features"
      />

      <SiteFooter />
    </main>
  )
}
