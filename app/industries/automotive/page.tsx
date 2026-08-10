import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight, Check,
  Car, Wrench, CalendarClock, PhoneCall, IndianRupee,
  ArrowLeftRight, KeyRound, Rocket, ShieldCheck,
  Gauge, Clock, Users, PhoneMissed,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { AutomotiveDispatchBoard } from "@/components/industries/automotive-dispatch-board"
import { IndustryExploreLinks } from "@/components/industries/industry-explore-links"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { getIndustry, getRelatedIndustries } from "@/lib/industries"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/jsonld"

/* The five day-one playbooks from lib/industries.ts, in the order a caller
   actually moves through them at a dealership — enquiry → test drive →
   service → parts → exchange. Copy is expanded from the terse job labels
   to describe what the voice agent actually does at each stage; every
   capability named here is one the platform already documents. */
const JOURNEY_STAGES = [
  {
    label: "Test drive",
    icon: Car,
    job: "Books test drives and pre-qualifies the caller's finance so a sales rep walks in already briefed.",
  },
  {
    label: "Service",
    icon: CalendarClock,
    job: "Looks up the vehicle by registration number and mileage, then offers the next available service slot.",
  },
  {
    label: "Parts",
    icon: Wrench,
    job: "Answers parts availability and warranty questions without pulling a service advisor off the floor.",
  },
  {
    label: "Exchange",
    icon: ArrowLeftRight,
    job: "Captures trade-in details and hands qualified exchange leads to your sales team or listed partners.",
  },
  {
    label: "Pickup",
    icon: KeyRound,
    job: "Coordinates loaner-vehicle dispatch and confirms pickup time so nothing sits idle in the bay.",
  },
]

/* Page-local hero copy — industry.pitch is shared across the industries
   index, nav and other pages, so it's kept short and generic there. This
   description instead names the five journey stages covered further down
   this page, and is sized to end cleanly within the hero's 3-line clamp. */
const HERO_DESCRIPTION =
  "9278.io handles test drives, service reminders, parts queries, and exchange valuations — the full dealership journey, for one showroom or a multi-state group."

/**
 * Automotive gets its own page (rather than the shared [slug] template) so
 * its hero can be designed independently. Next.js resolves this static
 * route ahead of the [slug] dynamic route, so every other industry keeps
 * rendering from app/industries/[slug]/page.tsx unchanged.
 */
const SLUG = "automotive"

export const metadata: Metadata = (() => {
  const industry = getIndustry(SLUG)
  if (!industry) return {}
  return pageSeo({
    title: `AI voice agents for ${industry.name.toLowerCase()}`,
    description: industry.short,
    path: `/industries/${industry.slug}`,
  })
})()

export default function AutomotiveIndustryPage() {
  const industry = getIndustry(SLUG)
  if (!industry) notFound()

  const Icon = industry.icon

  // Pick three sibling industries for the related-links module.
  const related = getRelatedIndustries(industry.slug)

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

      {/* Hero — split layout with the dealership hero artwork on the right,
          floating status chips overlaid to tie it into the live-call theme
          used across the other industry pages. */}
      <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-blue-50/50 via-background to-background">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 h-[560px] w-[720px] rounded-full bg-primary/[0.1] blur-[130px]"
        />
        <div className="relative w-full px-6 pb-16 pt-6 md:px-8 md:pb-20 md:pt-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-12">
            {/* ── Left: copy ── */}
            <div>
              <ScrollReveal>
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
                  <Icon className="size-4" aria-hidden />
                  {industry.name}
                </span>
              </ScrollReveal>

              <ScrollReveal delay={0.06}>
                <h1 className="mt-6 text-[44px] font-semibold md:text-[60px] lg:text-[72px]" style={{ lineHeight: 0.95, letterSpacing: "-2px" }}>
                  <span style={{ color: "#0F172A" }}>AI Voice Agents for</span>{" "}
                  <span
                    style={{
                      backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Dealerships &amp; Service Centres.
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.12}>
                <p className="mt-3 max-w-xl text-pretty line-clamp-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {HERO_DESCRIPTION}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.18}>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
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

            </div>

            {/* ── Right: dealership hero artwork + floating status chips ── */}
            <ScrollReveal delay={0.15}>
              <div className="relative mx-auto w-full max-w-[560px]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-primary/[0.14] blur-[90px]"
                />
                <div className="hero-float-up overflow-hidden rounded-[2rem] shadow-[0_30px_70px_-30px_oklch(0.52_0.22_265/0.45)] ring-1 ring-slate-200/60">
                  <Image
                    src="/industries/automotive.jpg"
                    alt="AI voice agent for automotive dealerships — books test drives, schedules servicing, answers queries, and boosts customer engagement"
                    width={507}
                    height={340}
                    className="h-auto w-full"
                    sizes="(min-width: 1024px) 560px, 90vw"
                    unoptimized
                    priority
                  />
                </div>

                {/* Floating: test-drive booked */}
                <div className="hero-float-up absolute -left-4 top-6 z-10 hidden sm:block">
                  <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white/95 px-3.5 py-2.5 shadow-[0_14px_34px_-16px_oklch(0.2_0.05_262/0.4)] backdrop-blur">
                    <span className="grid size-8 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Car className="size-4" aria-hidden />
                    </span>
                    <div className="leading-tight">
                      <p className="text-[11.5px] font-semibold text-foreground">Test drive booked</p>
                      <p className="text-[10px] text-muted-foreground">Sat, 11:00 AM</p>
                    </div>
                    <span className="ml-1 grid size-4 place-items-center rounded-full bg-emerald-500">
                      <Check className="size-2.5 text-white" aria-hidden />
                    </span>
                  </div>
                </div>

                {/* Floating: after-hours call recovered */}
                <div className="hero-float-down absolute -bottom-5 -right-2 z-10">
                  <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white/95 px-3.5 py-2.5 shadow-[0_14px_34px_-16px_oklch(0.2_0.05_262/0.4)] backdrop-blur">
                    <span className="grid size-8 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                      <PhoneMissed className="size-4" aria-hidden />
                    </span>
                    <div className="leading-tight">
                      <p className="text-[11.5px] font-semibold text-foreground">After-hours call</p>
                      <p className="text-[10px] text-muted-foreground">Answered · 9:42 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What it does — dark dispatch-board stage, automotive-only visual
          language (distinct from the shared light PlaybookStage used on
          the other industry pages). */}
      <section className="w-full px-6 pb-8 pt-10 md:px-8 md:pb-12 md:pt-14">
        <div className="w-full">
          <ScrollReveal className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-7 w-1 rounded-full bg-primary" aria-hidden />
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                What the agent does and how it sounds
              </h2>
            </div>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Every bay, live — the playbooks running right now and the real lines our voice agents use to run them.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="mt-6">
            <AutomotiveDispatchBoard
              jobs={industry.jobs}
              sampleLines={industry.sampleLines}
              conversation={industry.conversation}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Why teams switch — three separate cards that 3D-flip on hover:
          the back face swaps the whole palette (primary fill, white text)
          instead of just fading or lifting like the rest of the site. */}
      <section className="w-full px-6 py-8 md:px-8 md:py-12">
        <div className="w-full">
          <ScrollReveal>
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                {
                  icon: Clock,
                  label: "First-touch response",
                  value: "< 3 seconds",
                  sub: `Every ${industry.name.toLowerCase()} call answered before it goes to voicemail.`,
                },
                {
                  icon: PhoneCall,
                  label: "Concurrent calls",
                  value: "Up to 40",
                  sub: "On the Scale plan — no extra hardware, no extra licenses.",
                },
                {
                  icon: IndianRupee,
                  label: "Per-minute rate",
                  value: "From ₹10",
                  sub: "See the full rate card on the pricing page.",
                },
              ].map((s) => (
                <div key={s.label} className="group h-[220px] [perspective:1200px]">
                  <div className="relative h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* Front — white bg, primary text */}
                    <div className="absolute inset-0 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_20px_50px_-30px_oklch(0.52_0.22_265/0.3)] [backface-visibility:hidden]">
                      <span className="relative grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                        <span aria-hidden className="ind-ping absolute inset-0 rounded-xl bg-primary/30" />
                        <s.icon className="relative size-5" aria-hidden />
                      </span>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{s.label}</p>
                      <p className="text-3xl font-semibold tracking-tight text-primary md:text-4xl">{s.value}</p>
                      <p className="text-[13px] leading-relaxed text-muted-foreground">{s.sub}</p>
                    </div>

                    {/* Back — primary bg, white text: colors fully inverted */}
                    <div className="absolute inset-0 flex flex-col gap-3 rounded-3xl bg-gradient-to-br from-primary to-[oklch(0.5_0.21_255)] p-7 text-white shadow-[0_20px_50px_-25px_oklch(0.52_0.22_265/0.55)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <span className="grid size-10 place-items-center rounded-xl bg-white/15 text-white">
                        <s.icon className="size-5" aria-hidden />
                      </span>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-white/70">{s.label}</p>
                      <p className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{s.value}</p>
                      <p className="text-[13px] leading-relaxed text-white/85">{s.sub}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* The showroom-to-service journey */}
      <section className="w-full px-6 py-8 md:px-8 md:py-12">
        <div className="w-full">
          <ScrollReveal className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-7 w-1 rounded-full bg-primary" aria-hidden />
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Every call, from enquiry to pickup
              </h2>
            </div>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              One agent covers the whole caller journey — sales, service, parts, and exchange — so nothing falls
              through between departments.
            </p>
          </ScrollReveal>

          <div className="relative mt-6">
            {/* A dashed line "runs" through the journey — the call moving
                stage to stage — using the site's existing dash-flow
                keyframe (connector-flow), visible once there's a single
                row to travel across. */}
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-9 hidden h-px w-full lg:block"
              preserveAspectRatio="none"
            >
              <line
                x1="0"
                y1="0.5"
                x2="100%"
                y2="0.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="7 7"
                strokeLinecap="round"
                className="connector-flow text-primary/30"
              />
            </svg>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {JOURNEY_STAGES.map((stage, i) => (
                <ScrollReveal key={stage.label} delay={0.1 + i * 0.08}>
                  <div className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lg">
                    <span className="absolute right-4 top-4 text-xs font-semibold tabular-nums text-muted-foreground/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-primary group-hover:text-white group-hover:shadow-md group-hover:shadow-primary/30">
                      <stage.icon className="size-5" aria-hidden />
                    </span>
                    <p className="mt-4 text-sm font-semibold tracking-tight text-foreground">{stage.label}</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{stage.job}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rollout — one unified block instead of Fitness/Education's
          alternating "Phase 01 / Phase 02" mirrored rows: a single intro,
          then both mockups side by side under it, connected by an arrow
          reading left-to-right as "set up, then compliant" in one glance. */}
      <section className="w-full px-6 py-8 md:px-8 md:py-12">
        <div className="w-full">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <ScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Rollout</p>
              <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                From first call to{" "}
                <span className="bg-gradient-to-r from-primary to-[oklch(0.62_0.2_240)] bg-clip-text text-transparent">
                  fully compliant
                </span>
                , same week
              </h2>
              <p className="mt-5 text-pretty leading-relaxed text-muted-foreground md:text-lg">
                Most {industry.name.toLowerCase()} customers start by{" "}
                <Link href="/get-started" className="font-medium text-primary underline-offset-4 hover:underline">
                  spinning up a Starter agent
                </Link>{" "}
                with a single phone number, then upgrade to{" "}
                <Link href="/pricing" className="font-medium text-primary underline-offset-4 hover:underline">
                  Growth or Scale
                </Link>{" "}
                once the playbooks prove out — every booking already running inside TRAI and DPDP rules from day
                one.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Image
                src="/industries/automotive-stats.png"
                alt="5 minutes to first live agent, 10+ Indian languages supported, 40+ concurrent calls handled"
                width={900}
                height={140}
                className="h-auto w-full max-w-[450px]"
                unoptimized
              />

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-gradient-to-r from-primary to-[oklch(0.5_0.21_255)] py-2 pl-7 pr-2 text-base font-semibold text-white shadow-[0_8px_28px_oklch(0.546_0.215_262.88/0.45)] transition-all hover:shadow-[0_10px_36px_oklch(0.546_0.215_262.88/0.6)]"
                >
                  <Link href={`/get-started?industry=${industry.slug}`}>
                    Launch a {industry.name.toLowerCase()} agent
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
                  <Link href="/faq">Read the FAQ</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>

          {/* Both mockups, side by side, with a connecting arrow */}
          {/* grid-cols-1 is minmax(0,1fr): without it the single mobile track
              sizes to the mockups' min-content (~406px) and pushes the page
              wider than the viewport. */}
          <div className="relative mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
            <ScrollReveal delay={0.1}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                1 · Set up
              </p>
              <ServiceTicketMockup />
            </ScrollReveal>

            <span
              aria-hidden
              className="hidden shrink-0 items-center justify-center lg:flex"
            >
              <span className="grid size-11 place-items-center rounded-full border border-dashed border-primary/40 bg-white text-primary shadow-sm">
                <ArrowRight className="size-5" />
              </span>
            </span>

            <ScrollReveal delay={0.2}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                2 · Stay compliant
              </p>
              <ComplianceMockup />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <PricingCta
        heading="Ready to fill every bay and every seat?"
        description="Launch an agent that books test drives, schedules service, and answers parts questions — in 10+ Indian languages, around the clock."
        primaryHref={`/get-started?industry=${industry.slug}`}
        primaryLabel="Build your first agent"
        secondaryHref="/pricing"
        secondaryLabel="View pricing"
      />

      {/* Other industries — uniform corner-ribbon cards, matching the
          card style already used elsewhere in the project (e-commerce's
          industry page) rather than the asymmetric bento used before. */}
      <section className="w-full border-t border-border/50 bg-card/20 px-6 py-6 md:px-8 md:py-8">
        <div className="w-full">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance font-serif text-2xl font-semibold tracking-tight md:text-3xl">
              Other industries we power
            </h2>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
              Pre-tuned playbooks for the calls your peers in adjacent verticals already automate.
            </p>
          </ScrollReveal>

          <IndustryExploreLinks
            links={related.map((r) => ({
              href: `/industries/${r.slug}`,
              titlePrefix: "AI voice agents for ",
              highlight: r.name.toLowerCase(),
              description: r.short,
              icon: <r.icon className="size-4" aria-hidden />,
            }))}
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

/* Phase 01 visual — a stylised, ticket-shaped product panel: perforated
   header instead of a generic browser-chrome mockup, a scan sweep passes
   over the checklist once per loop, and each completed row ticks in on a
   stagger (both reuse the site's existing fit-scan / fit-check-in
   keyframes, the same ones Fitness's rollout mockups already run on). */
function ServiceTicketMockup() {
  const checklist = [
    { label: "Registration matched", done: true },
    { label: "Service history pulled", done: true },
    { label: "Slot offered — Thu 8:00 AM", done: true },
    { label: "Confirmation sent", done: false },
  ]
  return (
    <div className="relative" aria-hidden>
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-primary/[0.09] blur-[60px]" />
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/[0.07]">
        {/* perforated ticket header */}
        <div className="relative flex items-center justify-between gap-3 border-b border-dashed border-primary/25 bg-gradient-to-r from-primary/[0.08] to-transparent px-5 py-3.5">
          <span className="absolute -left-1.5 top-1/2 size-3 -translate-y-1/2 rounded-full bg-background" />
          <span className="absolute -right-1.5 top-1/2 size-3 -translate-y-1/2 rounded-full bg-background" />
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-primary">
            <span className="size-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
            Service ticket
          </p>
          <p className="text-[11px] font-semibold tabular-nums text-muted-foreground">#SB-2291</p>
        </div>

        <div className="space-y-4 p-5">
          {/* vehicle identity row */}
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-white shadow-sm shadow-primary/30">
              <Car className="size-5" />
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-sm font-semibold text-foreground">Maruti Brezza · 30,000 km due</p>
              <p className="text-[11px] text-muted-foreground">GJ 05 XX 4521</p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
              <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
              Booked
            </span>
          </div>

          {/* advisor + odometer — side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Advisor</p>
              <div className="mt-2 flex items-center gap-2">
                <Users className="size-4 text-primary" />
                <span className="text-[13px] font-medium text-foreground">Bay 3</span>
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Odometer</p>
              <div className="mt-2 flex items-center gap-2">
                <Gauge className="size-4 text-primary" />
                <span className="text-[13px] font-medium tabular-nums text-foreground">29,860 km</span>
              </div>
            </div>
          </div>

          {/* checklist — a highlight sweeps down the panel once per loop,
              then each completed row ticks in behind it on a stagger */}
          <div className="relative overflow-hidden rounded-xl border border-slate-200 p-3">
            <span className="fit-scan pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-primary/[0.09] to-transparent" />
            <p className="text-[11px] font-medium text-muted-foreground">Booking checklist</p>
            <ul className="mt-2 space-y-1.5">
              {checklist.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2 text-[12.5px]">
                  <span
                    style={c.done ? { animationDelay: `${0.3 + i * 0.45}s` } : undefined}
                    className={`grid size-4 shrink-0 place-items-center rounded-full ${
                      c.done ? "fit-check-in bg-primary text-white" : "border border-slate-300 bg-white"
                    }`}
                  >
                    {c.done && <Check className="size-2.5" />}
                  </span>
                  <span className={c.done ? "text-foreground/85" : "text-muted-foreground"}>{c.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Phase 02 visual — redesigned status panel: each row now carries a
   filling left-edge bar plus a staggered check-in (fit-check-in), and a
   scan sweep passes over the whole list once per loop (fit-scan) — the
   automotive version previously had zero animation despite reusing the
   same shape as Fitness's rollout mockups. */
function ComplianceMockup() {
  const rows = [
    { label: "TRAI calling windows", value: "Enforced" },
    { label: "DPDP Act 2023", value: "Compliant" },
    { label: "Call recording & consent", value: "Logged" },
  ]
  return (
    <div className="relative" aria-hidden>
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-primary/[0.09] blur-[60px]" />
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/[0.07]">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-primary/[0.08] to-transparent px-5 py-3.5">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <ShieldCheck className="size-3.5 text-primary" />
            Compliance checks
          </p>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
            All clear
          </span>
        </div>

        <div className="relative divide-y divide-slate-100">
          <span className="fit-scan pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-transparent via-primary/[0.07] to-transparent" />
          {rows.map((r, i) => (
            <div key={r.label} className="relative flex items-center justify-between gap-3 py-3.5 pl-6 pr-5">
              <span
                style={{ animationDelay: `${0.3 + i * 0.45}s` }}
                className="fit-check-in absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary"
              />
              <span className="text-sm text-foreground/85">{r.label}</span>
              <span
                style={{ animationDelay: `${0.3 + i * 0.45}s` }}
                className="fit-check-in flex items-center gap-1.5 text-xs font-semibold text-emerald-600"
              >
                <Check className="size-3.5" />
                {r.value}
              </span>
            </div>
          ))}
        </div>

        {/* mini FAQ preview — chips settle in on the same cadence */}
        <div className="space-y-2 border-t border-slate-100 bg-slate-50/60 p-4">
          {["What counts as voice credit?", "How fast can I be live?"].map((q, i) => (
            <div
              key={q}
              style={{ animationDelay: `${i * 0.14}s` }}
              className="fit-chip-in flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5"
            >
              <span className="text-[13px] text-foreground/80">{q}</span>
              <ArrowRight className="size-3.5 shrink-0 text-primary" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
