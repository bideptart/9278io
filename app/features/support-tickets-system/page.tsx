import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Archive, ChevronRight, LayoutDashboard, PhoneCall, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { TicketStepReveal } from "@/components/features-page/ticket-step-reveal"
import { SupportBentoGrid } from "@/components/features-page/support-bento-grid"
import { TicketActivityFeed } from "@/components/features-page/ticket-activity-feed"
import { FaqAccordion } from "@/components/faq/faq-accordion"
import { DetailGlassRow } from "@/components/features-page/detail-glass-row"
import { SupportTicketIllustration } from "@/components/features-page/support-ticket-illustration"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { FAQ_GROUPS } from "@/lib/faq"

const supportFaq = [
  ...FAQ_GROUPS.find((g) => g.id === "account")!.items.filter((i) => ["What support is included?", "Where do I sign in?"].includes(i.q)),
  ...FAQ_GROUPS.find((g) => g.id === "agents")!.items.filter((i) => ["Does it integrate with Indian CRMs and tools?"].includes(i.q)),
  ...FAQ_GROUPS.find((g) => g.id === "billing")!.items.filter((i) => ["Are there any hidden fees?"].includes(i.q)),
]

export const metadata: Metadata = pageSeo({
  title: "Support Tickets System",
  description: "Raise and track support requests directly from your dashboard.",
  path: "/features/support-tickets-system",
})

const DETAILS = [
  {
    icon: <LayoutDashboard className="size-5" aria-hidden />,
    title: "Raise requests from your dashboard",
    description: "No separate portal or email thread — open a ticket right where you already work.",
  },
  {
    icon: <Timer className="size-5" aria-hidden />,
    title: "Track status in one place",
    description: "See exactly where every open request stands, from raised to resolved.",
  },
  {
    icon: <Archive className="size-5" aria-hidden />,
    title: "Full history kept for reference",
    description: "Every ticket you've ever raised stays on record, searchable whenever you need it again.",
  },
]

export default function SupportTicketsSystemPage() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Support Tickets System", path: "/features/support-tickets-system" },
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
            <nav aria-label="Breadcrumb">
              <span className="inline-flex items-center rounded-full bg-primary/[0.07] px-6 py-2.5 text-base font-semibold uppercase tracking-wide text-primary ring-1 ring-inset ring-primary/20">
                Operate &amp; Monitor
              </span>
            </nav>

            <ScrollReveal className="mt-6">
              <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Support Tickets System
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Raise and track support requests directly from your dashboard — no separate portal, no
                email back-and-forth to find out where things stand.
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
            <SupportTicketIllustration />
          </ScrollReveal>
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-20">
          <ScrollReveal>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">What you get</h2>
          </ScrollReveal>
          <div className="mt-8">
            <DetailGlassRow items={DETAILS} />
          </div>
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-20">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              How it works
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">From raised to resolved</h2>
          </ScrollReveal>
          <TicketStepReveal />
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-20">
          <ScrollReveal>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Built into your workflow</h2>
          </ScrollReveal>
          <div className="mt-8">
            <SupportBentoGrid />
          </div>
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-20">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Why it matters
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Nothing sits unanswered</h2>
          </ScrollReveal>
          <div className="mt-8">
            <TicketActivityFeed />
          </div>
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-20">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Related questions
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Support, answered</h2>
            <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Straight from the FAQ — pick a question to see the answer.
            </p>
          </ScrollReveal>
          <div className="mx-auto mt-8 max-w-2xl">
            <FaqAccordion
              items={supportFaq}
              idPrefix="support-tickets-system"
              itemClassName="border-border/60 border-l-4 border-l-transparent bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:border-l-primary hover:shadow-[0_12px_28px_-16px_rgba(15,23,42,0.15)]"
              triggerIcon={<ChevronRight className="pointer-events-none size-4 shrink-0" aria-hidden />}
            />
            <Link
              href="/faq"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              See all FAQs
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <PricingCta
        heading="Get support without leaving your dashboard"
        description="Spin up your first agent and raise a ticket anytime, right from the same place you manage it."
        primaryHref="/get-started"
        primaryLabel="Get started"
        secondaryHref="/features"
        secondaryLabel="Back to Features"
      />

      <SiteFooter />
    </main>
  )
}
