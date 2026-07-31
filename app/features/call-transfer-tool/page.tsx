import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  PhoneCall,
  PhoneForwarded,
  PhoneOutgoing,
  ShieldAlert,
  Tag,
  UserCheck,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { GradientCta } from "@/components/sections/gradient-cta"
import { DetailSplitRows } from "@/components/features-page/detail-split-rows"
import { HowItWorksZigzag } from "@/components/features-page/how-it-works-zigzag"
import { ComparisonPanel } from "@/components/features-page/comparison-panel"
import { FaqSwitcher } from "@/components/features-page/faq-switcher"
import { CallTransferIllustration } from "@/components/features-page/call-transfer-illustration"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { FAQ_GROUPS } from "@/lib/faq"

const agentsFaq = FAQ_GROUPS.find((g) => g.id === "agents")!.items.filter((i) =>
  ["Can the agent transfer to a human?", "Does it integrate with Indian CRMs and tools?"].includes(i.q),
)

export const metadata: Metadata = pageSeo({
  title: "Call Transfer Tool",
  description: "Hand off any call to a human number with a custom label you set.",
  path: "/features/call-transfer-tool",
})

const DETAILS = [
  {
    icon: <Users className="size-5" aria-hidden />,
    title: "Forward any call to a human number",
    description: "Hand any call off to a real person the moment your agent decides it needs one.",
  },
  {
    icon: <Tag className="size-5" aria-hidden />,
    title: "Add a custom label per transfer",
    description: "Label each transfer destination so it's obvious where a call is being routed and why.",
  },
  {
    icon: <ShieldAlert className="size-5" aria-hidden />,
    title: "Set fallback numbers for busy lines",
    description: "Add a backup number so a call never dead-ends if the first line is busy or unreachable.",
  },
]

const STEPS = [
  {
    icon: <PhoneForwarded className="size-4" aria-hidden />,
    title: "Agent decides a transfer is needed",
    description: "Your agent recognizes a call is outside its limits — a request, an escalation, a VIP caller.",
  },
  {
    icon: <PhoneOutgoing className="size-4" aria-hidden />,
    title: "It dials the labeled destination",
    description: "The call routes to the number you've set for that trigger, falling back if the line is busy.",
  },
  {
    icon: <UserCheck className="size-4" aria-hidden />,
    title: "The caller reaches the right person",
    description: "No dead air, no dropped call — just a warm handoff to a human who can take it from there.",
  },
]

export default function CallTransferToolPage() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Call Transfer Tool", path: "/features/call-transfer-tool" },
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
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
              <Link href="/features" className="hover:text-primary">
                Features
              </Link>{" "}
              <span aria-hidden>/</span> <span className="text-foreground">Call Transfer Tool</span>
            </nav>

            <ScrollReveal className="mt-6">
              <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/[0.08] text-primary">
                <PhoneForwarded className="size-6" aria-hidden />
              </span>
              <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Call Transfer Tool
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Hand off any call to a human number with a custom label you set — so when your agent hits its
                limit, the caller lands with the right person, not a dead end.
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
            <CallTransferIllustration />
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
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Never leave a caller stranded</h2>
          </ScrollReveal>
          <div className="mt-10">
            <DetailSplitRows items={DETAILS} />
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
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">From limit to live handoff</h2>
          </ScrollReveal>
          <HowItWorksZigzag steps={STEPS} />
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-4xl px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Why it matters
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">The difference a fallback makes</h2>
          </ScrollReveal>
          <div className="mt-8">
            <ComparisonPanel
              withoutTitle="Without a transfer rule"
              withoutPoints={[
                "Calls outside the agent's scope hit a dead end",
                "Busy or unreachable lines mean a dropped caller",
                "No record of where a call was supposed to go",
              ]}
              withTitle="With Call Transfer Tool"
              withPoints={[
                "Every edge case routes to a real person, labeled clearly",
                "A fallback number catches busy or unreachable lines",
                "Every transfer destination is set once and reused",
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
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Handoffs, answered</h2>
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

      <GradientCta
        heading="Set up your first transfer rule"
        description="Spin up your first agent and connect a fallback number so no call ever hits a wall."
        primaryHref="/get-started"
        primaryLabel="Get started"
        secondaryHref="/features"
        secondaryLabel="Back to Features"
      />

      <SiteFooter />
    </main>
  )
}
