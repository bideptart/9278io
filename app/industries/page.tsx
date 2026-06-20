import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Plus } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { IndustryRow } from "@/components/industries/industry-row"
import { INDUSTRIES, CAP_COLORS } from "@/lib/industries"

/* Per-industry accent palette for the airy grid. Literal classes so
   Tailwind's scanner keeps them; child accents use currentColor. */
const ACCENTS = [
  "text-blue-600", "text-violet-600", "text-cyan-600", "text-orange-600",
  "text-emerald-600", "text-purple-600", "text-pink-600", "text-indigo-600", "text-teal-600",
]
const ACCENT_TILES = [
  "bg-blue-50 border-blue-200", "bg-violet-50 border-violet-200", "bg-cyan-50 border-cyan-200",
  "bg-orange-50 border-orange-200", "bg-emerald-50 border-emerald-200", "bg-purple-50 border-purple-200",
  "bg-pink-50 border-pink-200", "bg-indigo-50 border-indigo-200", "bg-teal-50 border-teal-200",
]
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

export const metadata: Metadata = pageSeo({
  title: "Industries we power",
  description:
    "Pre-tuned AI voice agents for real estate, home services, restaurants, automotive, legal, education, e-commerce, and fitness — live in under 5 minutes.",
  path: "/industries",
})

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
        <div className="w-full px-6 pb-20 pt-10 md:px-8 md:pb-28 md:pt-14">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
              Pre-tuned for the calls you actually take
            </span>
            <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Built for every kind of phone call.
            </h1>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              One AI voice agent that answers calls, qualifies leads, and books appointments across every industry below
              — fluent in 10+ Indian languages, on the same simple plans for everyone, live in under 5 minutes.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Bento overview ── */}
      <section className="w-full px-6 py-16 md:px-8 md:py-20">
        <ScrollReveal className="mb-10">
          <div className="rounded-2xl border border-primary bg-primary p-7 text-center shadow-[0_4px_20px_oklch(0.52_0.22_265/0.25)] md:p-9">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">Browse by industry</h2>
            <p className="mt-3 text-pretty text-white/70">
              Tap any vertical to see its playbook, sample calls, and capabilities.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => {
            const Icon = ind.icon
            const accent = ACCENTS[i % ACCENTS.length]
            const tile = ACCENT_TILES[i % ACCENT_TILES.length]
            return (
              <ScrollReveal
                key={ind.slug}
                delay={i * 0.04}
                className={`group relative bg-white transition-colors duration-300 hover:bg-slate-50/50 ${accent}`}
              >
                <Link href={`/industries/${ind.slug}`} className="relative block p-7">
                  {/* accent line draws across the top on hover (colour = industry accent) */}
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100"
                    aria-hidden
                  />
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex size-12 shrink-0 items-center justify-center rounded-2xl border ${tile} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="min-w-0 text-lg font-bold tracking-tight text-foreground">{ind.name}</h3>
                  </div>
                  <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{ind.short}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
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

          {/* "Many more" cell — completes the grid and signals broader coverage */}
          <ScrollReveal
            delay={INDUSTRIES.length * 0.04}
            className="group relative bg-white text-primary transition-colors duration-300 hover:bg-slate-50/50"
          >
            <Link href="/get-started" className="relative block p-7">
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100"
                aria-hidden
              />
              <div className="flex items-center gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/[0.07] transition-transform duration-300 group-hover:scale-110">
                  <Plus className="size-5" aria-hidden />
                </span>
                <h3 className="min-w-0 text-lg font-bold tracking-tight text-foreground">Many more</h3>
              </div>
              <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                Security, recruiting, insurance, finance and more — tell us your calls and we&apos;ll tune an agent for you.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                Get started <ArrowRight className="size-4" aria-hidden />
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Detailed playbooks ── */}
      <section className="border-y border-border/50 bg-slate-50/50">
        <div className="w-full px-6 md:px-8">
          <ScrollReveal className="py-16 md:py-20">
            <div className="rounded-2xl border border-primary bg-primary p-7 text-center shadow-[0_4px_20px_oklch(0.52_0.22_265/0.25)] md:p-9">
              <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">Every vertical, in depth.</h2>
              <p className="mt-3 text-pretty text-white/70">
                The exact jobs each agent does on day one, and how it sounds on a real call.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-5 pb-20 md:space-y-6 md:pb-24">
            {INDUSTRIES.map((industry, i) => (
              <IndustryRow key={industry.slug} slug={industry.slug} reverse={i % 2 === 1} />
            ))}
          </div>
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
