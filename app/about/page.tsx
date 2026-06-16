import type { Metadata } from "next"
import Link from "next/link"
import { Sparkles, Target, Users, Zap, MapPin } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

export const metadata: Metadata = pageSeo({
  title: "About 9278.io — India's AI Voice Agent Platform",
  description:
    "We're building India's most capable AI voice infrastructure — multilingual, TRAI-compliant, and purpose-built for Indian businesses.",
  path: "/about",
})

const values = [
  {
    icon: Target,
    title: "India First",
    description:
      "Every product decision starts with one question: does this work for Indian businesses? Our voice models, compliance controls, and integrations are built ground-up for India — not retrofitted.",
  },
  {
    icon: Zap,
    title: "Speed Without Compromise",
    description:
      "Sub-second voice latency on Indian networks. We obsess over call quality because every 100ms of delay degrades the conversation. Our data centres in Mumbai and Hyderabad exist for this reason.",
  },
  {
    icon: Users,
    title: "Built for Scale",
    description:
      "From a single agent booking appointments to a BPO running 1,000 concurrent calls — the same platform handles both. No re-architecture, no ceiling.",
  },
]

const milestones = [
  { year: "2023", event: "Founded in Bengaluru with a mission to make AI voice accessible in Indian languages." },
  { year: "2024 Q1", event: "Launched Hindi, Tamil, and Telugu voice agents. First 50 customers in BFSI and real estate." },
  { year: "2024 Q3", event: "Expanded to 10+ Indian languages. Crossed 1 million calls automated." },
  { year: "2025", event: "Serving 500+ businesses across BFSI, EdTech, e-commerce, and BPO sectors nationwide." },
]

export default function AboutPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)]"
        />
        <div className="mx-auto w-full max-w-4xl px-4 py-20 text-center md:px-6 md:py-28">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white px-4 py-1.5 text-sm text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" aria-hidden />
              Our story
            </span>
            <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-6xl">
              We&apos;re making AI voice work for{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
                every Indian business.
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              9278.io was founded in Bengaluru with a simple belief: Indian businesses deserve AI voice infrastructure
              that speaks their language — literally. Hindi, Tamil, Telugu, Marathi, and 11 more.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-primary" aria-hidden />
              Bengaluru, India · Data centres in Mumbai &amp; Hyderabad
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission */}
      <section className="w-full px-6 py-20 md:px-8 md:py-28">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Mission</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Automate every phone call that doesn&apos;t need a human.
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground md:text-lg">
            India has over 1.4 billion people and one of the world&apos;s largest call-centre industries. Most of those
            calls are repetitive — appointment reminders, lead qualification, order updates, EMI follow-ups. We built
            9278.io so that a business of any size can deploy a voice agent in minutes, not months, and reclaim the time
            their team wastes on calls that a well-designed AI handles better.
          </p>
        </ScrollReveal>
      </section>

      {/* Values */}
      <section className="border-t border-border/50">
        <div className="w-full px-6 py-20 md:px-8 md:py-28">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">What drives us</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">Our values</h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <ScrollReveal key={v.title}>
                  <div className="rounded-2xl border border-border bg-white p-7">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.08] text-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-border/50">
        <div className="w-full px-6 py-20 md:px-8 md:py-28">
          <ScrollReveal className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">How we got here</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">Our journey</h2>
          </ScrollReveal>

          <div className="mt-12 space-y-6">
            {milestones.map((m) => (
              <ScrollReveal key={m.year}>
                <div className="flex gap-6 rounded-2xl border border-border bg-white p-6">
                  <span className="mt-0.5 shrink-0 rounded-lg border border-primary/20 bg-primary/[0.08] px-3 py-1 text-xs font-bold text-primary">
                    {m.year}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{m.event}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-6 pb-24 md:px-8">
        <ScrollReveal className="rounded-2xl border border-border/60 bg-white px-6 py-12 md:px-12 md:py-14">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h3 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                Want to build with us?
              </h3>
              <p className="mt-3 text-muted-foreground">
                We&apos;re hiring engineers, voice ML researchers, and customer-success leads across India.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/contact">Contact us</Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <RelatedLinks
        heading="Explore 9278.io"
        description="Product, pricing, and industries — everything in one place."
        links={[
          { href: "/pricing", title: "Pricing in INR", description: "Starter ₹3,000, Growth ₹8,800, Scale ₹30,000. Prices in ₹, billed once as wallet credit." },
          { href: "/industries", title: "Industries we power", description: "BPO, BFSI, real estate, EdTech, and more." },
        ]}
      />

      <SiteFooter />
    </main>
  )
}
