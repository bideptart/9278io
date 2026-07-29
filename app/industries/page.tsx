import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, Building2, Sparkles, AudioLines } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { IndustryStackCards } from "@/components/industries/industry-stack-cards"
import { IndustryStickyScroll } from "@/components/industries/industry-sticky-scroll"
import { IndustryHeroVisual } from "@/components/industries/industry-hero-visual"
import { VerticalCutReveal } from "@/components/animation/vertical-cut-reveal"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

export const metadata: Metadata = pageSeo({
  title: "Industries we power",
  description:
    "Pre-tuned AI voice agents for BFSI, BPO, real estate, home services, restaurants, automotive, legal, education, e-commerce, and fitness — live in under 5 minutes.",
  path: "/industries",
})

export default function IndustriesPage() {
  return (
    <main className="min-h-dvh bg-white text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ]}
      />

      {/* ── Hero — copy + CTAs on the left, animated live-call mockup on the right ── */}
      <section className="relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-blue-50/50 via-background to-background text-foreground">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_20%_0%,rgba(79,110,247,0.10),transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:56px_56px]"
        />
        <div className="w-full px-6 pb-10 pt-6 md:px-8 md:pb-20 md:pt-10">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Left — copy */}
            <ScrollReveal>
              <div className="max-w-3xl">
                <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-3.5 py-1.5 text-[10px] font-semibold uppercase leading-tight tracking-wide text-primary sm:px-5 sm:py-2 sm:text-xs sm:tracking-[0.18em]">
                  <Sparkles className="size-3.5 shrink-0" aria-hidden />
                  Pre-tuned for the calls you actually take
                </span>
                <h1 className="mt-7 text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                  Built for every kind of <span className="text-primary">phone call.</span>
                </h1>
                <div className="mt-6 flex items-center gap-3" aria-hidden>
                  <span className="h-px w-14 bg-gradient-to-r from-primary to-transparent" />
                  <AudioLines className="size-4 shrink-0 text-primary" />
                  <span className="h-px w-8 bg-gradient-to-l from-primary to-transparent" />
                </div>
                <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                  One AI voice agent that answers calls, qualifies leads, and books appointments across every industry below
                  — fluent in 10+ Indian languages, on the same simple plans for everyone, live in under 5 minutes.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-primary px-7 text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5 hover:bg-primary/90"
                  >
                    <Link href="/get-started">
                      Get started <ArrowRight className="ml-1 size-4" aria-hidden />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full px-7 transition-transform hover:-translate-y-0.5"
                  >
                    <Link href="/pricing">
                      View pricing <ArrowRight className="ml-1 size-4" aria-hidden />
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            {/* Right — animated live-call card with orbiting industry icons */}
            <ScrollReveal delay={0.12}>
              <IndustryHeroVisual />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Bento overview — centered classical header ── */}
      <section className="w-full bg-white py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <ScrollReveal className="mx-auto mb-4 max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-sm">
              <Building2 className="size-3.5" aria-hidden />
              Industries
            </span>
            <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight md:text-4xl lg:text-[2.75rem]">
              Browse by industry
            </h2>
            {/* classical ornamental divider */}
            <div className="mt-6 flex items-center justify-center gap-3" aria-hidden>
              <span className="h-px w-14 bg-gradient-to-r from-transparent to-primary/40" />
              <span className="size-1.5 rotate-45 rounded-[1px] bg-primary/70 motion-safe:animate-pulse" />
              <span className="h-px w-14 bg-gradient-to-l from-transparent to-primary/40" />
            </div>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
              Tap any vertical to see its playbook, sample calls, and capabilities — scroll to stack through all 10.
            </p>
          </ScrollReveal>
        </div>

        {/* Scroll-driven glass card stack */}
        <IndustryStackCards />
      </section>

      {/* ── Detailed playbooks — centered classical header on a clean white band ── */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="w-full px-6 md:px-8">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal className="mx-auto max-w-2xl pt-12 pb-6 text-center md:pt-14 md:pb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-sm">
                <BookOpen className="size-3.5" aria-hidden />
                Playbooks
              </span>
              <h2 className="mt-5 text-balance font-serif text-3xl font-semibold tracking-tight md:text-4xl lg:text-[2.75rem]">
                Every vertical, in depth.
              </h2>
              <span aria-hidden className="ind-shimmer mx-auto mt-6 block h-1 w-24 rounded-full" />
              <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
                The exact jobs each agent does on day one, and how it sounds on a real call.
              </p>
            </ScrollReveal>

            <div className="pb-2 md:pb-3">
              <IndustryStickyScroll />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full px-6 py-14 md:px-8 md:py-16">
        <ScrollReveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-500 to-blue-600 px-6 py-12 shadow-2xl shadow-blue-500/30 ring-1 ring-white/10 md:px-14 md:py-14">
          {/* soft radial glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_0%,rgba(255,255,255,0.18),transparent_60%)]"
          />
          {/* fine grid texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:44px_44px]"
          />
          {/* decorative watermark */}
          <Sparkles
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -right-8 size-52 text-white/[0.06]"
          />

          <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h3 className="text-balance font-serif text-3xl font-semibold tracking-tight text-white md:text-4xl">
                <VerticalCutReveal text="Don't see your industry?" />
              </h3>
              {/* classical accent rule */}
              <div className="mt-5 h-px w-16 bg-white/40" aria-hidden />
              <p className="mt-5 text-pretty leading-relaxed text-white/75 md:text-lg">
                We&apos;ve deployed agents in security, recruiting, property management, insurance, finance, and more.
                Tell us what calls eat your day and we&apos;ll have a prototype in 48 hours.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-auto rounded-full bg-white px-7 py-3.5 text-base font-semibold text-blue-600 shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-white/90 has-[>svg]:px-7"
              >
                <Link href="/get-started">
                  Get started <ArrowRight className="ml-2 size-4" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-auto rounded-full border-white/25 bg-white/15 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition-transform hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/25 hover:text-white"
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
