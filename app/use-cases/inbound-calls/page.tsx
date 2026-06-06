import type { Metadata } from "next"
import Link from "next/link"
import { Sparkles, PhoneIncoming, Clock, Users, TrendingUp, Check } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

export const metadata: Metadata = pageSeo({
  title: "Inbound Call Automation for Indian Businesses — 9278.io",
  description:
    "Handle every inbound call 24/7 in Hindi, Tamil, Telugu, and 15+ Indian languages. No missed calls, no hold times, no headcount.",
  path: "/use-cases/inbound-calls",
})

const features = [
  "Answers every call instantly — no hold music, no queue",
  "Speaks Hindi, Tamil, Telugu, Marathi, Bengali, and 10+ more languages",
  "Qualifies callers and routes to the right team or department",
  "Books appointments directly into your calendar",
  "Logs every call to Zoho CRM, Freshworks, or LeadSquared",
  "Sends WhatsApp confirmation after every call",
  "Runs 24/7 including weekends and public holidays",
  "TRAI-compliant IVR flows built in",
]

const stats = [
  { value: "100%", label: "Answer rate — never miss a call" },
  { value: "< 1s", label: "Response latency on Indian networks" },
  { value: "24/7", label: "Availability including holidays" },
  { value: "15+", label: "Indian languages supported" },
]

export default function InboundCallsPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Inbound Calls", path: "/use-cases/inbound-calls" },
        ]}
      />

      <section className="relative overflow-hidden border-b border-border/50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)]"
        />
        <div className="mx-auto w-full max-w-4xl px-4 py-20 text-center md:px-6 md:py-28">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" aria-hidden />
              Use case
            </span>
            <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-6xl">
              Inbound Call{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
                Automation
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Every call answered instantly, in the caller&apos;s language. No hold times, no missed leads, no night-shift
              staff — just an AI agent that sounds like your best receptionist, available 24/7.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/get-started">Start for free</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
          <div className="grid grid-cols-2 divide-x divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card/50 md:grid-cols-4 md:divide-y-0">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1.5 px-6 py-8 text-center">
                <span className="text-3xl font-bold tracking-tight text-foreground">{s.value}</span>
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <ScrollReveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">What you get</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              A 24/7 receptionist in every Indian language
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Set up your inbound agent once and it handles every call from day one — routing, qualifying, booking, and
              logging — without you lifting a finger.
            </p>
            <ul className="mt-8 space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal className="grid gap-4">
            {[
              { icon: PhoneIncoming, title: "Instant answer", desc: "Caller hears your agent in under one second — before a human could even pick up." },
              { icon: Clock, title: "Zero downtime", desc: "Public holidays, 2 AM calls, weekend enquiries — your agent never clocks out." },
              { icon: Users, title: "Smart routing", desc: "Qualify the caller's intent and warm-transfer to the right team member when needed." },
              { icon: TrendingUp, title: "Measurable ROI", desc: "Every call logged to your CRM with transcript, sentiment, and outcome — searchable from day one." },
            ].map((card) => {
              const Icon = card.icon
              return (
                <div key={card.title} className="flex gap-4 rounded-2xl border border-border bg-card/50 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.08] text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold">{card.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{card.desc}</p>
                  </div>
                </div>
              )
            })}
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-24 md:px-6">
        <ScrollReveal className="rounded-2xl border border-border/60 bg-card/30 px-6 py-12 text-center md:px-12 md:py-14">
          <h3 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
            Never miss another inbound call.
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Deploy your first inbound agent in under 5 minutes. Starter plan from ₹2,399 — no contracts.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/get-started">Get started</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>
        </ScrollReveal>
      </section>

      <RelatedLinks
        heading="Related use cases"
        description="Explore more ways Indian businesses use 9278.io."
        links={[
          { href: "/use-cases/outbound-calls", title: "Outbound calls", description: "Automated outbound campaigns in Hindi and regional languages." },
          { href: "/use-cases/appointment-booking", title: "Appointment booking", description: "Book slots over voice, no human agent required." },
          { href: "/use-cases/lead-qualification", title: "Lead qualification", description: "Qualify every lead the moment they call in." },
        ]}
      />

      <SiteFooter />
    </main>
  )
}
