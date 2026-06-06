import type { Metadata } from "next"
import Link from "next/link"
import { Sparkles, Headphones, Zap, Users, BarChart3, Check } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

export const metadata: Metadata = pageSeo({
  title: "AI Customer Support for Indian Businesses — 9278.io",
  description:
    "Automate tier-1 customer support calls in Hindi, Tamil, Telugu, and 15+ Indian languages. Resolve common queries instantly, escalate only what needs a human.",
  path: "/use-cases/customer-support",
})

const features = [
  "Handles order status, returns, and delivery queries automatically",
  "Speaks Hindi, Tamil, Telugu, Marathi, Bengali, and 10+ more",
  "Pulls live data from your OMS, CRM, or custom API",
  "Smart escalation: warm-transfers to a human when needed",
  "Full context passed to the agent on transfer — no repeat",
  "TRAI-compliant IVR menus for regulated industries",
  "Sentiment detection flags frustrated callers immediately",
  "Every call transcript pushed to your CRM automatically",
]

const stats = [
  { value: "80%", label: "Queries resolved without human" },
  { value: "< 1s", label: "Response on Indian networks" },
  { value: "24/7", label: "Support coverage" },
  { value: "15+", label: "Indian languages" },
]

export default function CustomerSupportPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Customer Support", path: "/use-cases/customer-support" },
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
              Customer{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
                Support
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Resolve 80% of support calls automatically in the caller&apos;s language — order status, returns,
              account queries, delivery issues. Escalate only the calls that genuinely need a human.
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

      <section className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <ScrollReveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">What you get</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              Support that scales without adding headcount
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Configure your support agent with your product knowledge base, connect it to your OMS, and it handles
              tier-1 queries around the clock — in Hindi, Tamil, Telugu, and more.
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
              { icon: Zap, title: "Instant resolution", desc: "Caller asks for order status — agent fetches from your OMS and reads it out in under a second." },
              { icon: Headphones, title: "Smart escalation", desc: "Frustrated caller? Unusual query? The agent detects and warm-transfers with full context — no repeat." },
              { icon: Users, title: "Consistent experience", desc: "Every caller gets the same calm, accurate, on-brand response — regardless of call volume or time of day." },
              { icon: BarChart3, title: "CSAT & analytics", desc: "Post-call CSAT surveys over voice, transcript search, and sentiment trends in your dashboard." },
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

      <section className="mx-auto w-full max-w-6xl px-4 pb-24 md:px-6">
        <ScrollReveal className="rounded-2xl border border-border/60 bg-card/30 px-6 py-12 text-center md:px-12 md:py-14">
          <h3 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
            Scale your support without scaling your team.
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Growth plan from ₹5,999 — 10 AI voice agents and 12 concurrent calls.
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
        description="More ways to automate phone calls with 9278.io."
        links={[
          { href: "/use-cases/inbound-calls", title: "Inbound calls", description: "Answer every inbound call 24/7 in Hindi and regional languages." },
          { href: "/use-cases/outbound-calls", title: "Outbound calls", description: "Run TRAI-compliant outbound campaigns automatically." },
          { href: "/use-cases/appointment-booking", title: "Appointment booking", description: "Book slots over voice, 24/7." },
        ]}
      />

      <SiteFooter />
    </main>
  )
}
