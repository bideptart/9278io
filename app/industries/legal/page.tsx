import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowRight, Check, Scale, CalendarCheck,
  PhoneOff, ShieldCheck, Zap, PhoneCall, Wallet,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { LegalIntakeConsole } from "@/components/industries/legal-intake-console"
import { LegalCallFlow } from "@/components/industries/legal-call-flow"
import { LegalCapabilities } from "@/components/industries/legal-capabilities"
import { INDUSTRIES, getIndustry } from "@/lib/industries"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/jsonld"

/* One day's enquiries plotted across 24h (pct = hour/24). Illustrative of a
   working day, not a measured statistic — `inHours` is simply whether the
   call lands inside the 10–6 band drawn on the timeline. */
/* Chambers hours, as 24h grid columns (10:00–18:00 → columns 11-18). */
const OPEN_FROM = 10
const OPEN_TO = 18

/* `hour` is the grid column the call sits in, so CSS Grid does the
   positioning — no hand-tuned offsets that can drift out of alignment. */
const CALL_PINS = [
  { time: "07:20", hour: 7 },
  { time: "09:20", hour: 9 },
  { time: "11:30", hour: 11 },
  { time: "14:20", hour: 14 },
  { time: "16:45", hour: 16 },
  { time: "19:40", hour: 19 },
  { time: "22:20", hour: 22 },
]

/**
 * Legal gets its own page (rather than the shared [slug] template) so its
 * hero and layout can be designed independently. Next.js resolves this
 * static route ahead of the [slug] dynamic route, so every other industry
 * keeps rendering from app/industries/[slug]/page.tsx unchanged.
 */
const SLUG = "legal"

export const metadata: Metadata = (() => {
  const industry = getIndustry(SLUG)
  if (!industry) return {}
  return pageSeo({
    title: `AI voice agents for ${industry.name.toLowerCase()}`,
    description: industry.short,
    path: `/industries/${industry.slug}`,
  })
})()

export default function LegalIndustryPage() {
  const industry = getIndustry(SLUG)
  if (!industry) notFound()

  // Four sibling industries, plus the pricing and FAQ tiles, to fill the same
  // six-card grid the other industry pages use.
  const related = INDUSTRIES.filter((i) => i.slug !== industry.slug).slice(0, 4)

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: `/industries/${industry.slug}` },
        ]}
      />
      <ServiceJsonLd
        name={`AI voice agents for ${industry.name.toLowerCase()}`}
        description={industry.pitch}
        path={`/industries/${industry.slug}`}
        serviceType="AI voice agent"
      />

      {/* ══ Hero — copy left, live intake record right ══ */}
      <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-blue-50/50 via-background to-background">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-28 h-[520px] w-[680px] rounded-full bg-primary/[0.09] blur-[120px]"
        />
        <div className="relative w-full px-6 pb-12 pt-4 md:px-8 md:pb-16 md:pt-6">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            {/* ── copy ── */}
            <div>
              <ScrollReveal>
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
                  <Scale className="size-4" aria-hidden />
                  {industry.name}
                </span>
              </ScrollReveal>

              <ScrollReveal delay={0.06}>
                <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-foreground sm:text-5xl lg:text-[3.35rem]">
                  AI voice agents{" "}
                  <span className="bg-gradient-to-r from-primary via-[oklch(0.62_0.2_240)] to-[oklch(0.5_0.22_255)] bg-clip-text text-transparent">
                    for legal.
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.12}>
                <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground md:text-lg">
                  {industry.pitch}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.18}>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-full bg-gradient-to-r from-primary to-[oklch(0.5_0.21_255)] py-2 pl-8 pr-2 text-base font-semibold text-white shadow-[0_8px_28px_oklch(0.546_0.215_262.88/0.45)] transition-all hover:shadow-[0_10px_36px_oklch(0.546_0.215_262.88/0.6)]"
                  >
                    <Link href={`/get-started?industry=${industry.slug}`}>
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

              {/* capability chips — straight from lib/industries.ts */}
              <ScrollReveal delay={0.24}>
                <div className="mt-7 flex flex-wrap gap-2">
                  {industry.caps.map((cap) => (
                    <span
                      key={cap}
                      className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* ── live intake record ── */}
            <ScrollReveal delay={0.15}>
              <LegalIntakeConsole />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══ The problem — editorial, with a call log rather than cards ══ */}
      <section className="w-full px-6 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">The intake gap</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              A missed call is a client
              <br className="hidden sm:block" /> who rings the next firm.
            </h2>
            <p className="mt-5 max-w-lg text-pretty leading-relaxed text-muted-foreground md:text-lg">
              Enquiries arrive while your advocates are in court, mid-consult, or off for the evening. Whoever picks
              up first usually keeps the client — and a paralegal tied to the phone is a paralegal not doing
              billable work.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "Calls land in court hours and go to voicemail",
                "Intake notes arrive incomplete, or not at all",
                "Callers reach a firm that answered sooner",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3" aria-hidden />
                  </span>
                  <span className="text-pretty text-[15px] leading-relaxed text-foreground/80">{line}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* A day on the intake line, plotted against opening hours — a
              timeline rather than another paneled list, so this section
              doesn't echo the hero's card-with-rows shape. Illustrative of
              one day's calls; no figures are claimed. */}
          <ScrollReveal delay={0.12}>
            <div aria-hidden className="lgl-day">
              <div className="flex items-baseline justify-between">
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  <span className="lgl-miss size-1.5 rounded-full bg-primary" aria-hidden />
                  A day on the intake line
                </p>
              </div>

              {/* The day, 00:00 → 24:00, on a shared 24-column grid: markers,
                  the hour bar and the axis all use the same columns, so the
                  browser keeps them aligned at any width. */}
              <div className="mt-10 grid grid-cols-[repeat(24,minmax(0,1fr))] items-end gap-y-2.5">
                {/* markers — time, dot, stem down to the bar */}
                {CALL_PINS.map((pin, i) => {
                  const open = pin.hour >= OPEN_FROM && pin.hour < OPEN_TO
                  return (
                    <span
                      key={pin.time}
                      style={{ gridColumn: pin.hour + 1, gridRow: 1, animationDelay: `${i * 0.42}s` }}
                      className="lgl-pin flex flex-col items-center justify-end"
                    >
                      <span
                        className={`mb-1.5 text-[10.5px] font-semibold tabular-nums ${
                          open ? "text-primary/70" : "text-red-400"
                        }`}
                      >
                        {pin.time}
                      </span>
                      <span
                        className={`relative grid size-9 place-items-center rounded-full ${
                          open
                            ? "bg-primary text-white shadow-md shadow-primary/25"
                            : "bg-white text-red-500 ring-1 ring-red-200"
                        }`}
                      >
                        {/* missed calls keep a slow halo so the eye lands on them */}
                        {!open && <span className="lgl-miss absolute inset-0 rounded-full bg-red-400/25" />}
                        {open ? <Check className="relative size-4" /> : <PhoneOff className="relative size-4" />}
                      </span>
                      <span className={`h-5 w-px ${open ? "bg-primary/30" : "bg-red-200"}`} />
                    </span>
                  )
                })}

                {/* base bar for the whole day */}
                <span
                  style={{ gridColumn: "1 / -1", gridRow: 2 }}
                  className="h-3.5 rounded-full bg-slate-200/70"
                />
                {/* chambers hours, wiping open from the left */}
                <span
                  style={{ gridColumn: `${OPEN_FROM + 1} / ${OPEN_TO + 1}`, gridRow: 2 }}
                  className="lgl-band h-3.5 rounded-full bg-primary/35"
                />
                {/* a light sweep travelling the day once per loop */}
                <span
                  style={{ gridColumn: "1 / -1", gridRow: 2 }}
                  className="relative h-3.5 overflow-hidden rounded-full"
                >
                  <span className="lgl-sweep absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                </span>

                {/* axis ticks */}
                {[
                  { h: 0, label: "00:00", align: "items-start" },
                  { h: 10, label: "10:00", align: "items-center" },
                  { h: 18, label: "18:00", align: "items-center" },
                  { h: 23, label: "24:00", align: "items-end" },
                ].map((t) => (
                  <span
                    key={t.label}
                    style={{ gridColumn: t.h + 1, gridRow: 3 }}
                    className={`flex flex-col ${t.align} text-[11px] font-medium tabular-nums text-muted-foreground/70`}
                  >
                    {t.label}
                  </span>
                ))}

                {/* chambers-hours caption, spanning exactly the tinted range */}
                <span
                  style={{ gridColumn: `${OPEN_FROM + 1} / ${OPEN_TO + 1}`, gridRow: 4 }}
                  className="mt-1 text-center text-[10.5px] font-semibold uppercase tracking-wider text-primary/70"
                >
                  Chambers open
                </span>
              </div>

              {/* legend + the point */}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200 pt-4">
                <span className="flex items-center gap-2 text-[12px] text-muted-foreground">
                  <span className="grid size-4 place-items-center rounded-full bg-primary text-white">
                    <Check className="size-2.5" />
                  </span>
                  Caught in chambers hours
                </span>
                <span className="flex items-center gap-2 text-[12px] text-muted-foreground">
                  <span className="grid size-4 place-items-center rounded-full bg-red-50 text-red-500">
                    <PhoneOff className="size-2.5" />
                  </span>
                  Outside them — voicemail, or gone
                </span>
              </div>

              <p className="mt-4 flex items-start gap-2.5 text-[13px] leading-relaxed text-foreground/75">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>
                  An agent on the line answers every one of these — the early morning, the evening, and the ones that
                  land mid-hearing.
                </span>
              </p>

              <style>{`
                /* Calls keep landing on the day: each marker drops in at its
                   own offset, holds, then clears — so the rail is never
                   static, it reads as an intake line still taking calls. */
                @keyframes lglPin {
                  0%        { opacity: 0; transform: translateY(10px) scale(0.9); }
                  7%, 78%   { opacity: 1; transform: translateY(0) scale(1); }
                  90%, 100% { opacity: 0; transform: translateY(-5px) scale(0.94); }
                }
                .lgl-day .lgl-pin {
                  animation: lglPin 7s cubic-bezier(0.22, 1, 0.36, 1) infinite both;
                }

                /* chambers hours wipe open before the calls land */
                @keyframes lglBand {
                  from { transform: scaleX(0); }
                  to   { transform: scaleX(1); }
                }
                .lgl-day .lgl-band {
                  transform-origin: left center;
                  animation: lglBand 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
                }

                /* a slow pass of light along the day */
                @keyframes lglSweep {
                  0%       { transform: translateX(-4rem); opacity: 0; }
                  12%, 78% { opacity: 1; }
                  100%     { transform: translateX(100%); opacity: 0; }
                }
                .lgl-day .lgl-sweep { animation: lglSweep 5.5s ease-in-out 1.4s infinite; }

                /* soft halo behind the calls that were missed */
                @keyframes lglMiss {
                  0%, 100% { transform: scale(1);    opacity: 0.55; }
                  50%      { transform: scale(1.45); opacity: 0; }
                }
                .lgl-day .lgl-miss { animation: lglMiss 2.8s ease-out infinite; }

                @media (prefers-reduced-motion: reduce) {
                  .lgl-day .lgl-pin { animation: none; opacity: 1; transform: none; }
                  .lgl-day .lgl-band { animation: none; transform: none; }
                  .lgl-day .lgl-sweep { animation: none; opacity: 0; }
                  .lgl-day .lgl-miss { animation: none; opacity: 0.4; }
                }
              `}</style>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ Call journey — expanding rail ══ */}
      <section className="w-full border-y border-border/50 bg-card/20 px-6 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Anatomy of a call</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              From unknown caller to booked consultation
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Five stages, every enquiry, in whichever language the caller is comfortable in.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="mt-8">
            <LegalCallFlow />
          </ScrollReveal>
        </div>
      </section>

      {/* ══ Platform numbers — the same published figures the e-commerce
             page's stats bar uses (response time, concurrency, rate,
             uptime); nothing here is legal-specific or invented. ══ */}
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

      {/* ══ Capabilities — four tiles, each running its own live loop ══ */}
      <section className="w-full px-6 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">What it handles</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Built around how firms actually take work in
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="mt-8">
            <LegalCapabilities sampleLines={industry.sampleLines} jobs={industry.jobs} />
          </ScrollReveal>
        </div>
      </section>

      {/* ══ Other industries — same uniform corner-ribbon cards the
             automotive, fitness and education pages use ══ */}
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
              {
                href: "/pricing",
                titlePrefix: "",
                highlight: "Compare plans and per-minute rates",
                description: "Three tiers from ₹3,000 to ₹30,000, with rates from ₹12 down to ₹10/min.",
                icon: Wallet,
              },
              {
                href: "/faq",
                titlePrefix: "",
                highlight: "FAQ — credit, phone numbers, compliance",
                description: "Pricing, phone numbers, TRAI calling-window enforcement, DPDP Act 2023, and more.",
                icon: ShieldCheck,
              },
            ].map((link, i) => {
              const LinkIcon = link.icon
              return (
                <ScrollReveal key={link.href} delay={i * 0.08}>
                  <Link
                    href={link.href}
                    className="group relative block h-full overflow-hidden rounded-2xl border border-l-4 border-slate-200 border-l-primary bg-gradient-to-br from-slate-50/60 to-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    {/* corner ribbon */}
                    <span
                      aria-hidden
                      className="absolute right-0 top-0 h-12 w-12 bg-primary [clip-path:polygon(100%_0,0_0,100%_100%)]"
                    />

                    {/* dotted decoration */}
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

      {/* ══ Closing CTA ══ */}
      <PricingCta
        heading="Put an agent on your intake line."
        description="Answer every enquiry, capture the facts your advocates need, and book the consult — in 10+ Indian languages, around the clock."
        primaryHref={`/get-started?industry=${industry.slug}`}
        primaryLabel="Build your first agent"
        secondaryHref="/pricing"
        secondaryLabel="View pricing"
      />

      <SiteFooter />
    </main>
  )
}
