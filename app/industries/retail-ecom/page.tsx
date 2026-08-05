import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight, ShoppingCart, Clock,
  PhoneCall, Zap, Wallet, ShieldCheck,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { RetailHeroCards } from "@/components/industries/retail-hero-cards"
import { RetailPeakQueue } from "@/components/industries/retail-peak-queue"
import { RetailPurchaseTimeline } from "@/components/industries/retail-purchase-timeline"
import { INDUSTRIES } from "@/lib/industries"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/jsonld"

/* Page-local copy. Kept here rather than added to lib/industries.ts, because
   that array drives the industries index, the nav and every other page's
   related-links row — adding an entry would change those pages too. The
   substance is drawn from the verified e-commerce playbook already in
   lib/industries.ts, angled toward retail (stores, stock, omnichannel)
   rather than repeating the D2C-only /industries/ecommerce page. */
const PITCH =
  "Shoppers call when something matters — a late delivery, a size that didn't fit, whether the store has it in stock. 9278.io answers every one of those calls, in the caller's language, and hands your team only the ones that genuinely need a person."

export const metadata: Metadata = pageSeo({
  title: "AI voice agents for retail & e-commerce",
  description:
    "Answer order-status, product, returns and store questions on every call — 24/7, in 10+ Indian languages, without adding queue time.",
  path: "/industries/retail-ecom",
})

export default function RetailEcomPage() {
  // Read-only: four sibling industries for the related-links row.
  const related = INDUSTRIES.slice(0, 3)

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: "Retail & e-commerce", path: "/industries/retail-ecom" },
        ]}
      />
      <ServiceJsonLd
        name="AI voice agents for retail & e-commerce"
        description={PITCH}
        path="/industries/retail-ecom"
        serviceType="AI voice agent"
      />

      {/* ══ Hero ══ */}
      <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-blue-50/50 via-background to-background">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-28 h-[520px] w-[680px] rounded-full bg-primary/[0.09] blur-[120px]"
        />
        <div className="relative w-full px-6 pb-12 pt-10 md:px-8 md:pb-16 md:pt-10">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div>
              <ScrollReveal>
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
                  <ShoppingCart className="size-4" aria-hidden />
                  Retail &amp; e-commerce
                </span>
              </ScrollReveal>

              <ScrollReveal delay={0.06}>
                <h1 className="mt-10 text-[44px] font-semibold md:text-[60px] lg:text-[72px]" style={{ lineHeight: 0.95, letterSpacing: "-2px" }}>
                  <span style={{ color: "#0F172A" }}>AI Voice Agents for</span>{" "}
                  <span
                    style={{
                      backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Retail &amp; E-commerce
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.12}>
                <p className="mt-5 max-w-xl text-pretty line-clamp-3 leading-relaxed text-muted-foreground md:text-lg">{PITCH}</p>
              </ScrollReveal>

              <ScrollReveal delay={0.18}>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-full bg-gradient-to-r from-primary to-[oklch(0.5_0.21_255)] py-2 pl-8 pr-2 text-base font-semibold text-white shadow-[0_8px_28px_oklch(0.546_0.215_262.88/0.45)] transition-all hover:shadow-[0_10px_36px_oklch(0.546_0.215_262.88/0.6)]"
                  >
                    <Link href="/get-started?industry=retail-ecom">
                      Get started
                      <span className="flex size-7 items-center justify-center rounded-full bg-white/20">
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-full border-border bg-white px-7 text-base font-semibold text-foreground hover:border-primary/30 hover:bg-slate-50"
                  >
                    <Link href="/pricing">View pricing</Link>
                  </Button>
                </div>
              </ScrollReveal>

            </div>

            <ScrollReveal delay={0.15}>
              <RetailHeroCards />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══ Platform numbers — published figures used elsewhere on the site ══ */}
      <section className="w-full px-6 py-10 md:px-8 md:py-12">
        <ScrollReveal className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-white/95 px-3 py-3 shadow-[0_20px_50px_-25px_rgba(2,132,199,0.35)] backdrop-blur">
            <div className="grid grid-cols-1 divide-y divide-slate-200/70 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
              {[
                { Icon: Zap, label: "First-touch response", value: "< 3 Seconds", tile: "bg-blue-100 text-blue-600" },
                { Icon: PhoneCall, label: "Concurrent calls", value: "Up to 40", tile: "bg-emerald-100 text-emerald-600" },
                { Icon: Wallet, label: "Per-minute rate", value: "From ₹10", tile: "bg-sky-100 text-sky-600" },
                { Icon: ShieldCheck, label: "Uptime reliability", value: "99.9%", tile: "bg-blue-100 text-blue-600" },
              ].map(({ Icon: StatIcon, label, value, tile }) => (
                <div key={label} className="flex items-center gap-4 px-5 py-4 sm:px-6 sm:py-5">
                  <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${tile}`}>
                    <StatIcon className="size-6" aria-hidden />
                  </span>
                  <div>
                    <p className="font-serif text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                      {value}
                    </p>
                    <p className="mt-0.5 text-[12.5px] font-medium text-slate-500">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ══ Peak demand — copy left, live queue right ══ */}
      <section className="w-full border-y border-border/50 bg-card/20 px-6 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Peak demand</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Sale week shouldn&apos;t mean hold music
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground md:text-lg">
              Campaign days, festive weeks and delivery delays all spike the same line at once. The agent answers up to
              40 calls at the same time on the Scale plan — no extra headcount, no extra licences, no queue.
            </p>

            <ul className="mt-7 space-y-3">
              {[
                "Every caller answered, not queued",
                "Late-delivery calls flagged to your team",
                "Out-of-hours and weekend calls still handled",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Clock className="size-3" aria-hidden />
                  </span>
                  <span className="text-pretty text-[15px] leading-relaxed text-foreground/80">{line}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <RetailPeakQueue />
          </ScrollReveal>
        </div>
      </section>

      {/* == The whole purchase - editorial timeline, not a card grid == */}
      <section className="w-full px-6 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">What it handles</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Support that spans the whole purchase
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Shoppers ring at three points in a purchase. The agent covers all of them.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="mt-12">
            <RetailPurchaseTimeline />
          </ScrollReveal>
        </div>
      </section>

      {/* ══ Closing CTA ══ */}
      <PricingCta
        heading="Put an agent on your support line."
        description="Answer order, product, returns and store questions on every call — 24/7, in 10+ Indian languages, even on your busiest day."
        primaryHref="/get-started?industry=retail-ecom"
        primaryLabel="Build your first agent"
        secondaryHref="/pricing"
        secondaryLabel="View pricing"
      />

      {/* ══ Other industries ══ */}
      <section className="w-full border-t border-border/50 bg-card/20 px-6 py-6 md:px-8 md:py-8">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance font-serif text-2xl font-semibold tracking-tight md:text-3xl">
              Other industries we power
            </h2>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
              Pre-tuned playbooks for the calls your peers in adjacent verticals already automate — same platform,
              same plans, different scripts.
            </p>
          </ScrollReveal>

          <div className="mt-6 grid gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ...related.map((r) => ({
                href: `/industries/${r.slug}`,
                titlePrefix: "AI voice agents for ",
                highlight: r.name.toLowerCase(),
                description: r.short,
                icon: r.icon,
              })),
            ].map((link, i) => {
              const LinkIcon = link.icon
              return (
                <ScrollReveal key={link.href} delay={i * 0.08}>
                  <Link
                    href={link.href}
                    className="group relative block h-full overflow-hidden rounded-2xl border border-l-4 border-slate-200 border-l-primary bg-gradient-to-br from-slate-50/60 to-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <span
                      aria-hidden
                      className="absolute right-0 top-0 h-12 w-12 bg-primary [clip-path:polygon(100%_0,0_0,100%_100%)]"
                    />
                    <div aria-hidden className="absolute right-4 top-12 grid grid-cols-4 gap-1 opacity-60">
                      {Array.from({ length: 16 }).map((_, d) => (
                        <span key={d} className="size-1 rounded-full bg-slate-300" />
                      ))}
                    </div>

                    <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                      <LinkIcon className="size-4" aria-hidden />
                    </span>

                    <h3 className="mt-3 min-h-[2.4rem] text-balance text-[15px] font-semibold leading-snug tracking-tight text-foreground">
                      {link.titlePrefix}
                      {link.titlePrefix ? <span className="text-primary">{link.highlight}</span> : link.highlight}
                    </h3>
                    <span aria-hidden className="mt-2 block h-1 w-8 rounded-full bg-primary" />
                    <p className="mt-2 text-pretty text-[12.5px] leading-relaxed text-muted-foreground">
                      {link.description}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-primary">Read more</span>
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-white shadow-md transition-transform duration-300 group-hover:translate-x-0.5">
                        <ArrowRight className="size-3.5" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
