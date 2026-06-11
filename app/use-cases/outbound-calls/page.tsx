import type { Metadata } from "next"
import Link from "next/link"
import { Sparkles, PhoneOutgoing, Shield, TrendingUp, Users, Check } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

export const metadata: Metadata = pageSeo({
  title: "Outbound Call Automation for Indian Businesses — 9278.io",
  description:
    "Run TRAI-compliant outbound calling campaigns in Hindi, Tamil, Telugu, and 10+ Indian languages. EMI reminders, lead follow-ups, appointment confirmations — automated.",
  path: "/use-cases/outbound-calls",
})

const features = [
  "TRAI-compliant: DND scrubbing before every call",
  "Calling-window enforcement (9 AM – 9 PM IST)",
  "Speaks Hindi, Tamil, Telugu, Marathi, Bengali, and 10+ more",
  "Personalised scripts using CRM data (name, amount, date)",
  "Automatic retry logic for unanswered calls",
  "WhatsApp follow-up after every call",
  "Real-time reporting and outcome tracking",
  "Integrates with Zoho CRM, Freshworks, and LeadSquared",
]

const stats = [
  { value: "3×", label: "Higher connect rate vs SMS" },
  { value: "100%", label: "TRAI-compliant DND scrubbing" },
  { value: "₹10", label: "Per minute on Scale plan" },
  { value: "10+", label: "Indian languages" },
]

export default function OutboundCallsPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Outbound Calls", path: "/use-cases/outbound-calls" },
        ]}
      />

      <section className="relative overflow-hidden border-b border-border/50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)]"
        />
        <div className="mx-auto w-full max-w-4xl px-4 py-20 text-center md:px-6 md:py-28">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" aria-hidden />
              Use case
            </span>
            <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-6xl">
              Outbound Call{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
                Automation
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Run large-scale TRAI-compliant outbound campaigns — EMI reminders, payment follow-ups, lead nurturing,
              appointment confirmations — in the caller&apos;s language, without a single human agent.
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

      <section className="border-b border-border/50">
        <div className="w-full px-6 py-16 md:px-8">
          <div className="grid grid-cols-2 divide-x divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white md:grid-cols-4 md:divide-y-0">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1.5 px-6 py-8 text-center">
                <span className="text-3xl font-bold tracking-tight text-foreground">{s.value}</span>
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <ScrollReveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">What you get</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              TRAI-compliant outbound at scale
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Upload your contact list, configure the script, and let the platform handle DND scrubbing, calling windows,
              retries, and logging — all fully compliant.
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
              { icon: Shield, title: "TRAI compliance built in", desc: "DND scrubbing, calling-window enforcement, and consent audit trails — all automatic." },
              { icon: PhoneOutgoing, title: "Personalised at scale", desc: "Each call uses live CRM data — the agent says the caller's name, amount due, and due date." },
              { icon: Users, title: "Handles objections", desc: "The agent follows your escalation logic: disputes, callbacks, and transfers to a human — all configurable." },
              { icon: TrendingUp, title: "Complete analytics", desc: "Connected rate, disposition breakdown, and full transcripts for every call in your dashboard." },
            ].map((card) => {
              const Icon = card.icon
              return (
                <div key={card.title} className="flex gap-4 rounded-2xl border border-border bg-white p-5">
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

      <section className="w-full px-6 pb-24 md:px-8">
        <ScrollReveal className="rounded-2xl border border-border/60 bg-white px-6 py-12 text-center md:px-12 md:py-14">
          <h3 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
            Launch your first outbound campaign today.
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Scale plan from ₹30,000 — ₹10/min effective, unlimited agents, full TRAI compliance included.
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
        description="More ways Indian businesses automate calls with 9278.io."
        links={[
          { href: "/use-cases/inbound-calls", title: "Inbound calls", description: "Answer every inbound call 24/7 in Hindi and regional languages." },
          { href: "/use-cases/lead-qualification", title: "Lead qualification", description: "Qualify leads the moment they respond to your campaign." },
          { href: "/use-cases/customer-support", title: "Customer support", description: "Handle repeat enquiries automatically, escalate only what matters." },
        ]}
      />

      <SiteFooter />
    </main>
  )
}
