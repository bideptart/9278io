import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { IndustryRow } from "@/components/industries/industry-row"
import { INDUSTRIES, CAP_COLORS } from "@/lib/industries"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

export const metadata: Metadata = pageSeo({
  title: "Industries we power",
  description:
    "Pre-tuned AI voice agents for real estate, home services, restaurants, automotive, legal, education, e-commerce, and fitness — live in under 5 minutes.",
  path: "/industries",
})

const HERO_STATS = [
  { value: "8", label: "verticals pre-tuned" },
  { value: "< 3s", label: "first response" },
  { value: "10+", label: "Indian languages" },
  { value: "₹10 / min", label: "from, all-in" },
]

export default function IndustriesPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ]}
      />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[460px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)]"
        />
        <div className="w-full px-6 py-20 md:px-8 md:py-28">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
              Pre-tuned for the calls you actually take
            </span>
            <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Built for every kind of phone call.
            </h1>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Pre-tuned scripts, integrations, and compliance guardrails for ten industries — and a configurable engine
              for everything else. Pick the workflow closest to yours and we&apos;ll have you live in under 5 minutes.
            </p>
          </ScrollReveal>

          {/* Stat strip */}
          <ScrollReveal className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border-2 border-border/70 bg-border/70 sm:grid-cols-4">
            {HERO_STATS.map((s) => (
              <div key={s.label} className="bg-white px-4 py-5 text-center">
                <p className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ── Bento overview ── */}
      <section className="w-full px-6 py-16 md:px-8 md:py-20">
        <ScrollReveal className="mb-10 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">Browse by industry</h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Tap any vertical to see its playbook, sample calls, and capabilities.
          </p>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => {
            const Icon = ind.icon
            return (
              <ScrollReveal key={ind.slug} delay={i * 0.04} className="h-full">
                <Link
                  href={`/industries/${ind.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md hover:bg-slate-50/60"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-2xl border border-primary/15 bg-primary/[0.07] text-primary transition-colors duration-200 group-hover:border-primary/30 group-hover:bg-primary/[0.12]">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <ArrowRight className="size-4 -translate-x-1 text-primary opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" aria-hidden />
                  </div>

                  <h3 className="mt-4 text-lg font-bold tracking-tight transition-colors group-hover:text-primary">
                    {ind.name}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{ind.short}</p>

                  <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    {ind.caps.map((cap) => (
                      <span
                        key={cap}
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${CAP_COLORS[cap]}`}
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>
      </section>

      {/* ── Detailed playbooks ── */}
      <section className="border-y border-border/50 bg-slate-50/50">
        <div className="w-full px-6 md:px-8">
          <ScrollReveal className="mx-auto max-w-2xl py-16 text-center md:py-20">
            <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">Every vertical, in depth.</h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              The exact jobs each agent does on day one, and how it sounds on a real call.
            </p>
          </ScrollReveal>

          {INDUSTRIES.map((industry, i) => (
            <IndustryRow key={industry.slug} slug={industry.slug} reverse={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full px-6 py-20 md:px-8 md:py-24">
        <ScrollReveal className="overflow-hidden rounded-3xl border border-primary bg-primary px-6 py-12 shadow-[0_4px_30px_oklch(0.52_0.22_265/0.25)] md:px-12 md:py-14">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h3 className="text-balance text-2xl font-bold tracking-tight text-white md:text-3xl">
                Don&apos;t see your industry?
              </h3>
              <p className="mt-3 text-white/70">
                We&apos;ve deployed agents in security, recruiting, property management, insurance, finance, and more.
                Tell us what calls eat your day and we&apos;ll have a prototype in 48 hours.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-white font-semibold text-primary hover:bg-white/90">
                <Link href="/get-started">
                  Get started <ArrowRight className="ml-1 size-4" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <RelatedLinks
        heading="Related guides"
        description="Explore pricing, FAQs, and the get-started flow used by thousands of teams."
        links={[
          {
            href: "/pricing",
            title: "Pricing — voice AI from ₹10/min",
            description: "Three plan tiers, transparent rates, and Indian numbers from ₹400/month.",
          },
          {
            href: "/faq",
            title: "FAQ — credit, numbers, compliance",
            description: "Pricing, phone numbers, TRAI calling-window enforcement, DPDP Act 2023, supported languages, and more.",
          },
          {
            href: "/get-started",
            title: "Launch your first agent",
            description: "Pick a plan, optionally provision a phone number, and you’re live in minutes.",
          },
        ]}
      />

      <SiteFooter />
    </main>
  )
}
