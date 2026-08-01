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
import { CallBehaviorPanel } from "@/components/features-page/call-behavior-panel"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { FAQ_GROUPS } from "@/lib/faq"

const agentsFaq = FAQ_GROUPS.find((g) => g.id === "agents")!.items.filter((i) =>
  ["Can the agent transfer to a human?", "Can I record and transcribe every call?"].includes(i.q),
)

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
                Build &amp; Setup
              </span>
              <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Call{" "}
                <span className="bg-gradient-to-r from-primary via-[oklch(0.62_0.2_240)] to-[oklch(0.72_0.18_150)] bg-clip-text text-transparent">
                  Behavior Controls
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Set how your agent greets callers, handles interruptions, and hands off conversations —
                once, in the dashboard, and every call follows the same rules.
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
                {["Set up once per agent", "Applies to every call automatically", "No code required"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <Check className="size-3.5 text-primary" aria-hidden />
                    {t}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.08}>
            <CallBehaviorPanel />
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
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Three controls, every call</h2>
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
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Set once, applies every call</h2>
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
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">A defined behavior, not a guess</h2>
          </ScrollReveal>
          <div className="mt-8">
            <ComparisonPanel
              withoutTitle="Without call behavior controls"
              withoutPoints={[
                "Every agent opens with the same generic greeting",
                "Callers can't get a word in until the agent finishes talking",
                "No clear rule for when a call should reach a human",
              ]}
              withTitle="With Call Behavior Controls"
              withPoints={[
                "A custom greeting per agent, written by you",
                "Callers can interrupt naturally, mid-sentence",
                "A clear, configurable trigger decides exactly when to hand off",
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
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Call behavior, answered</h2>
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
        heading="Ready to set your agent's call behavior?"
        description="Build your first agent free, then configure its greeting, interruption handling, and handoff rules — all in one place."
        primaryHref="/get-started"
        primaryLabel="Get started"
        secondaryHref="/features"
        secondaryLabel="Back to Features"
      />

      <SiteFooter />
    </main>
  )
}
