import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  CalendarCheck2,
  Download,
  History,
  PhoneCall,
  Search,
  SlidersHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { GradientCta } from "@/components/sections/gradient-cta"
import { HowItWorksFlow } from "@/components/features-page/how-it-works-flow"
import { FaqPlainList } from "@/components/features-page/faq-plain-list"
import { DetailNumberedList } from "@/components/features-page/detail-numbered-list"
import { BookingHistoryIllustration } from "@/components/features-page/booking-history-illustration"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { FAQ_GROUPS } from "@/lib/faq"

const agentsFaq = FAQ_GROUPS.find((g) => g.id === "agents")!.items.filter((i) =>
  ["Does it integrate with Indian CRMs and tools?", "Can the agent transfer to a human?"].includes(i.q),
)

export const metadata: Metadata = pageSeo({
  title: "Booking History",
  description: "See every appointment your agent has booked, in one searchable list.",
  path: "/features/booking-history",
})

const DETAILS = [
  {
    icon: <Search className="size-5" aria-hidden />,
    title: "Every appointment in one searchable list",
    description: "Every booking your agents make lands in a single list you can search in seconds.",
  },
  {
    icon: <SlidersHorizontal className="size-5" aria-hidden />,
    title: "Filter by date or by agent",
    description: "Narrow down to a date range or a specific agent to see exactly what you're looking for.",
  },
  {
    icon: <Download className="size-5" aria-hidden />,
    title: "Export whenever you need it",
    description: "Pull the list out anytime — for reporting, reconciliation, or sharing with your team.",
  },
]

const STEPS = [
  {
    icon: <CalendarCheck2 className="size-5" aria-hidden />,
    title: "Every booking logs itself",
    description: "The moment your agent confirms an appointment, it's added to the list — no manual entry.",
  },
  {
    icon: <Search className="size-5" aria-hidden />,
    title: "Search and filter instantly",
    description: "Find any booking by date or agent in seconds, without scrolling through call recordings.",
  },
  {
    icon: <Download className="size-5" aria-hidden />,
    title: "Export whenever you need it",
    description: "Pull the list out for reporting or reconciliation, anytime — no waiting on support.",
  },
]

export default function BookingHistoryPage() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Booking History", path: "/features/booking-history" },
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
              <span aria-hidden>/</span> <span className="text-foreground">Booking History</span>
            </nav>

            <ScrollReveal className="mt-6">
              <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/[0.08] text-primary">
                <History className="size-6" aria-hidden />
              </span>
              <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Booking History
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                See every appointment your agent has booked, in one searchable list — no digging through call
                recordings or chasing down what got confirmed.
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
            <BookingHistoryIllustration />
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
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Every booking, always findable</h2>
          </ScrollReveal>
          <div className="mt-8">
            <DetailNumberedList items={DETAILS} />
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
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">From confirmed call to searchable record</h2>
          </ScrollReveal>
          <HowItWorksFlow steps={STEPS} />
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Related questions
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Where bookings fit in</h2>
            <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Straight from the FAQ — no separate lookup needed.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.06} className="mt-8">
            <FaqPlainList items={agentsFaq} />
            <Link
              href="/faq"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              See all FAQs
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <GradientCta
        heading="See it on your own bookings"
        description="Spin up your first agent and every appointment it books shows up here, searchable from day one."
        primaryHref="/get-started"
        primaryLabel="Get started"
        secondaryHref="/features"
        secondaryLabel="Back to Features"
      />

      <SiteFooter />
    </main>
  )
}
