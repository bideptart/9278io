import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowRight, Sparkles, Check,
  Clock, PhoneCall, IndianRupee,
  Rocket, LifeBuoy,
  Signal, Wifi, BatteryFull, MessageCircle, Phone, Video, Mic,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Marquee } from "@/components/ui/marquee"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PlaybookStage } from "@/components/industries/playbook-stage"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { INDUSTRIES, getIndustry } from "@/lib/industries"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/jsonld"

/* Trust stats — same real numbers used in the marquee further down this
   page, surfaced early in the hero for immediate credibility. */
const HERO_STATS = [
  { icon: Clock, stat: "< 3s", label: "First-touch response", color: "text-blue-600", tile: "bg-blue-50" },
  { icon: PhoneCall, stat: "40+", label: "Concurrent calls", color: "text-violet-600", tile: "bg-violet-50" },
  { icon: IndianRupee, stat: "₹10", label: "Per-minute, from", color: "text-emerald-600", tile: "bg-emerald-50" },
]

/* Extra playbooks shown only on this page, appended to the shared five in
   lib/industries.ts. Kept local because that array also feeds the industries
   index, the nav and the home-page rows — adding entries there would change
   those surfaces too. */
const EXTRA_PLAYBOOKS = [
  "Waitlist promotion the moment a class spot frees up",
  "Personal-training and diet consult scheduling",
  "Renewal reminders before a membership lapses",
  "Class timings, trainer, and fee enquiries",
  "Guest-pass and referral follow-ups",
]

/**
 * This industry gets its own bespoke page (rather than the shared
 * [slug] template) so its hero can be redesigned independently.
 * Next.js resolves this static route ahead of the [slug] dynamic
 * route for exact-path requests, so every other industry continues
 * to render from app/industries/[slug]/page.tsx unchanged.
 */
const SLUG = "fitness"

export const metadata: Metadata = (() => {
  const industry = getIndustry(SLUG)
  if (!industry) return {}
  return pageSeo({
    title: `AI voice agents for ${industry.name.toLowerCase()}`,
    description: industry.short,
    path: `/industries/${industry.slug}`,
  })
})()

export default function FitnessIndustryPage() {
  const industry = getIndustry(SLUG)
  if (!industry) notFound()

  const Icon = industry.icon

  // Pick three sibling industries for the related-links module.
  const related = INDUSTRIES.filter((i) => i.slug !== industry.slug).slice(0, 3)
  const education = getIndustry("education")

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

      {/* Hero — redesigned: split layout, gradient headline, hero-style CTA,
          trust stats, and a bespoke circular visual with floating badges. */}
      <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-blue-50/50 via-background to-background">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 h-[560px] w-[720px] rounded-full bg-primary/[0.1] blur-[130px]"
        />
        <div className="relative w-full px-6 pb-10 pt-1 md:px-8 md:pb-12 md:pt-2">
          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-12">
            {/* ── Left: copy ── */}
            <div>
              <ScrollReveal>
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
                  <Icon className="size-4" aria-hidden />
                  {industry.name}
                </span>
              </ScrollReveal>

              <ScrollReveal delay={0.06}>
                <h1 className="mt-10 text-[44px] font-extrabold md:text-[60px] lg:text-[72px]" style={{ lineHeight: 0.95, letterSpacing: "-2px" }}>
                  <span style={{ color: "#0F172A" }}>AI voice agents for</span>{" "}
                  <span
                    style={{
                      backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    fitness &amp; wellness.
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.12}>
                <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                  {industry.pitch}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.18}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

              {/* Trust stats */}
              <ScrollReveal
                delay={0.26}
                className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border/60"
              >
                {HERO_STATS.map((s) => (
                  <div key={s.label} className="flex flex-col items-center gap-1 bg-white px-3 py-4 text-center">
                    <div className="flex items-center gap-2">
                      <span className={`flex size-8 items-center justify-center rounded-full ${s.tile} ${s.color}`}>
                        <s.icon className="size-4" aria-hidden />
                      </span>
                      <span className={`text-lg font-bold ${s.color}`}>{s.stat}</span>
                    </div>
                    <span className="text-[11px] leading-tight text-muted-foreground">{s.label}</span>
                  </div>
                ))}
              </ScrollReveal>
            </div>

            {/* ── Right: console + phone product mockup ── */}
            <ScrollReveal delay={0.15}>
              <ConsoleMockup conversation={industry.conversation} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What it does — unified, auto-cycling playbook + live-call stage */}
      <section className="w-full px-6 py-8 md:px-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-7 w-1 rounded-full bg-primary" aria-hidden />
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                What the agent does and how it sounds
              </h2>
            </div>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              Pre-built playbooks tuned for {industry.name.toLowerCase()} workflows, and the real lines our voice
              agents use to run them — cycling live below.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="mt-12">
            <PlaybookStage
              jobs={[...industry.jobs, ...EXTRA_PLAYBOOKS]}
              sampleLines={industry.sampleLines}
              conversation={industry.conversation}
              image={{
                src: "/industries/fitness.jpg",
                alt: "AI voice agents for fitness & wellness — schedule appointments, provide workout info, answer membership queries, and support customer goals",
                width: 504,
                height: 335,
              }}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Why teams switch */}
      <section className="relative overflow-hidden border-y border-border/50 bg-card/20 py-8 md:py-12">
        <ScrollReveal>
          <Marquee pauseOnHover className="[--duration:28s] [--gap:1.25rem]">
            {[
              {
                label: "First-touch response",
                value: "< 3 seconds",
                sub: `Every ${industry.name.toLowerCase()} call answered before it goes to voicemail.`,
              },
              {
                label: "Concurrent calls",
                value: "Up to 40",
                sub: "On the Scale plan — no extra hardware, no extra licenses.",
              },
              {
                label: "Per-minute rate",
                value: "From ₹10",
                sub: "See the full rate card on the pricing page.",
              },
            ].map((s) => (
              <div key={s.label} className="w-[300px] sm:w-[340px]">
                <Stat label={s.label} value={s.value} sub={s.sub} />
              </div>
            ))}
          </Marquee>
        </ScrollReveal>
      </section>

      {/* Rollout — alternating copy / product-mockup rows */}
      <section className="w-full px-6 py-8 md:px-8 md:py-12">
        <div className="mx-auto max-w-6xl space-y-10 md:space-y-14">
          {/* ── Row 1: copy left, setup mockup right ── */}
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
            <ScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Phase 01</p>
              <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                Go live in{" "}
                <span className="bg-gradient-to-r from-primary to-[oklch(0.62_0.2_240)] bg-clip-text text-transparent">
                  minutes
                </span>
                , not months
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
                once the inbound playbooks prove out.
              </p>

              <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
                {[
                  { value: "5 min", label: "To first live agent" },
                  { value: "10+", label: "Indian languages" },
                  { value: "40+", label: "Concurrent calls" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{s.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <SetupMockup industryName={industry.name} />
            </ScrollReveal>
          </div>

          {/* ── Row 2: call mockup left, copy right ── */}
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
            <ScrollReveal className="md:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Phase 02</p>
              <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                Every answer,{" "}
                <span className="bg-gradient-to-r from-primary to-[oklch(0.5_0.22_255)] bg-clip-text text-transparent">
                  before you ask
                </span>
              </h2>
              <p className="mt-5 text-pretty leading-relaxed text-muted-foreground md:text-lg">
                Curious about voice credit, phone numbers, or compliance? The{" "}
                <Link href="/faq" className="font-medium text-primary underline-offset-4 hover:underline">
                  FAQ
                </Link>{" "}
                answers the questions {industry.name.toLowerCase()} ops teams ask most — and you can browse{" "}
                <Link href="/industries" className="font-medium text-primary underline-offset-4 hover:underline">
                  every other industry
                </Link>{" "}
                we support to compare playbooks.
              </p>

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

            <ScrollReveal delay={0.12} className="md:order-1">
              <ComplianceMockup />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <PricingCta
        heading="Ready to fill every class?"
        description="Launch an agent that books classes, recovers no-shows, and wins back lapsed members — in 10+ Indian languages, around the clock."
        primaryHref={`/get-started?industry=${industry.slug}`}
        primaryLabel="Build your first agent"
        secondaryHref="/pricing"
        secondaryLabel="View pricing"
      />

      {/* Other industries — uniform corner-ribbon cards (matches the
          e-commerce industry page's card style, and the Automotive page's
          "Other industries" section) instead of the asymmetric bento. */}
      <section className="w-full border-t border-border/50 bg-card/20 px-6 py-6 md:px-8 md:py-8">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance font-serif text-2xl font-semibold tracking-tight md:text-3xl">
              Other industries we power
            </h2>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
              Pre-tuned playbooks for the calls your peers in adjacent verticals already automate.
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
              ...(education
                ? [
                    {
                      href: `/industries/${education.slug}`,
                      titlePrefix: "AI voice agents for ",
                      highlight: education.name.toLowerCase(),
                      description: education.short,
                      icon: education.icon,
                    },
                  ]
                : []),
              {
                href: "/pricing",
                titlePrefix: "",
                highlight: "Compare plans and per-minute rates",
                description: "Three tiers from ₹3,000 to ₹30,000, with rates from ₹12 down to ₹10/min.",
                icon: IndianRupee,
              },
              {
                href: "/faq",
                titlePrefix: "",
                highlight: "FAQ — credit, phone numbers, compliance",
                description: "Pricing, phone numbers, TRAI calling-window enforcement, DPDP Act 2023, and more.",
                icon: LifeBuoy,
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


      <SiteFooter />
    </main>
  )
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
      {/* accent line draws across the top on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <span className="grid size-7 place-items-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
          <Sparkles className="size-4" aria-hidden />
        </span>
        {label}
      </div>
      <p className="mt-5 text-3xl font-semibold tracking-tight text-primary md:text-4xl">{value}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sub}</p>
    </div>
  )
}

/* Hero visual — a desktop agent console with a live-call phone overlapping
   it. Purely presentational and CSS-animated (no client JS): the two
   devices float in opposite phase, chat bubbles cycle in, the record dot
   blinks, and the waveform bars run off the shared .ind-eq keyframe. */
function ConsoleMockup({ conversation }: { conversation: { speaker: string; text: string }[] }) {
  const channels = ["Class bookings", "Memberships", "No-show recovery"]
  // Real conversation from lib/industries.ts, plus a short closing turn that
  // resolves the same thread (a renewal, not a booking) so it stays coherent.
  const thread = [
    ...conversation.slice(0, 2),
    { speaker: "Agent", text: "Done — renewed for 12 months!" },
  ]

  return (
    <div aria-hidden className="relative mx-auto w-full max-w-[640px] pb-10 sm:pb-12">
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-primary/[0.16] blur-[90px] motion-safe:animate-pulse"
      />

      {/* ── Desktop console (right margin keeps the thread clear of the phone) ── */}
      <div className="hero-float-up mr-28 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_70px_-30px_oklch(0.52_0.22_265/0.45)] sm:mr-[112px]">
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-red-400/70" />
          <span className="size-2.5 rounded-full bg-amber-400/70" />
          <span className="size-2.5 rounded-full bg-emerald-400/70" />
          <p className="flex-1 text-center text-[11px] font-medium text-muted-foreground">9278.io — Agent console</p>
        </div>

        <div className="flex">
          {/* sidebar */}
          <div className="hidden w-[34%] shrink-0 border-r border-slate-100 bg-slate-50/50 p-3.5 sm:block">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Playbooks</p>
            <ul className="mt-2.5 space-y-1">
              {channels.map((c, i) => (
                <li
                  key={c}
                  className={`truncate rounded-lg px-2.5 py-1.5 text-[11px] ${
                    i === 0 ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground"
                  }`}
                >
                  # {c}
                </li>
              ))}
            </ul>

            <p className="mt-4 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Live now</p>
            <ul className="mt-2.5 space-y-2">
              {["Ankit S.", "Priya M."].map((n, i) => (
                <li key={n} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span
                    className={`size-1.5 shrink-0 rounded-full ${i === 0 ? "bg-emerald-500" : "bg-slate-300"}`}
                  />
                  {n}
                </li>
              ))}
            </ul>
          </div>

          {/* thread — right inset matches how far the phone overlaps the console
              (phone width minus the console's right margin), so text never
              slides underneath it. */}
          <div className="min-w-0 flex-1 pr-11 sm:pr-20">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-4 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-[12px] font-semibold text-foreground"># Class bookings</p>
                <p className="text-[10px] text-muted-foreground">2 agents · 1 live call</p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <span className="grid size-6 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                  <PhoneCall className="size-3" />
                </span>
                <span className="grid size-6 place-items-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="size-3" />
                </span>
              </div>
            </div>

            {/* Bubbles animate opacity/transform only, so they keep their layout
                space — the panel height stays fixed without hard-coding one. */}
            <div className="space-y-2 p-4">
              {thread.map((line, i) => {
                const isAgent = line.speaker === "Agent"
                return (
                  <div
                    key={i}
                    style={{ animationDelay: `${i * 1.4}s` }}
                    className={`fit-bubble-cycle flex ${isAgent ? "justify-start" : "justify-end"}`}
                  >
                    <span
                      className={
                        isAgent
                          ? "max-w-[88%] rounded-xl rounded-bl-sm bg-primary/12 px-2.5 py-1.5 text-[11px] leading-snug text-primary ring-1 ring-primary/15"
                          : "max-w-[88%] rounded-xl rounded-br-sm bg-slate-50 px-2.5 py-1.5 text-[11px] leading-snug text-slate-600 ring-1 ring-slate-200"
                      }
                    >
                      <span className="mr-1 text-[9px] font-bold opacity-50">{isAgent ? "Agent" : "Caller"}</span>
                      {line.text}
                    </span>
                  </div>
                )
              })}

              {/* typing indicator — in normal flow, so bubbles can't sit on it */}
              <div className="flex">
                <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1.5">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      style={{ animationDelay: `${d * 0.16}s` }}
                      className="fit-typing size-1 rounded-full bg-primary"
                    />
                  ))}
                </span>
              </div>
            </div>

            {/* live-call footer */}
            <div className="flex items-center gap-2.5 border-t border-slate-100 bg-slate-50/60 px-4 py-2.5">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary text-white">
                <PhoneCall className="size-3.5" />
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate text-[11px] font-semibold text-foreground">Live call · Ankit S.</p>
                <p className="text-[9px] text-muted-foreground">00:42 · transcript on</p>
              </div>
              <div className="flex h-4 shrink-0 items-end gap-[2px]">
                {[6, 11, 8, 13, 9, 7].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}px`, animationDelay: `${(i % 5) * 0.12}s` }}
                    className="ind-eq w-[3px] rounded-full bg-primary/70"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Phone, overlapping bottom-right ── */}
      <div className="hero-float-down absolute -bottom-6 right-0 w-[152px] sm:w-[186px]">
        {/* outer titanium band + inner bezel */}
        <div className="rounded-[2.1rem] bg-gradient-to-b from-slate-700 via-slate-900 to-slate-800 p-[3px] shadow-[0_30px_60px_-18px_oklch(0.2_0.1_262/0.6)]">
          <div className="relative rounded-[1.95rem] border-[3px] border-slate-950 bg-white">
            {/* side buttons */}
            <span className="absolute -left-[5px] top-[86px] h-9 w-[3px] rounded-l bg-slate-700" />
            <span className="absolute -left-[5px] top-[130px] h-9 w-[3px] rounded-l bg-slate-700" />
            <span className="absolute -right-[5px] top-[104px] h-12 w-[3px] rounded-r bg-slate-700" />

            <div className="overflow-hidden rounded-[1.7rem] bg-white">
              {/* status bar */}
              <div className="relative flex items-center justify-between px-3.5 pb-1 pt-2">
                <span className="text-[8.5px] font-semibold text-foreground">9:41</span>
                {/* dynamic-island notch */}
                <span className="absolute left-1/2 top-1.5 h-[15px] w-[52px] -translate-x-1/2 rounded-full bg-slate-950" />
                <span className="flex items-center gap-[3px] text-foreground">
                  <Signal className="size-[9px]" />
                  <Wifi className="size-[9px]" />
                  <BatteryFull className="size-[11px]" />
                </span>
              </div>

              {/* app header */}
              <div className="px-3.5 pt-2.5">
                <p className="text-[7.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">9278.io</p>
                <p className="text-[15px] font-bold leading-tight text-foreground">Live call</p>
              </div>

              {/* recording card */}
              <div className="relative mx-3.5 mt-2.5 overflow-hidden rounded-xl bg-gradient-to-br from-primary to-[oklch(0.38_0.18_264)] px-3 py-3">
                <span className="flex items-center gap-1 text-[7px] font-bold uppercase tracking-wider text-white/95">
                  <span className="fit-blink size-1.5 rounded-full bg-emerald-400" />
                  Recording
                </span>
                {/* waveform */}
                <div className="mt-2.5 flex h-6 items-center justify-center gap-[2px]">
                  {[5, 9, 14, 7, 17, 11, 6, 15, 9, 13, 7, 16, 10, 5, 12].map((h, i) => (
                    <span
                      key={i}
                      style={{ height: `${h}px`, animationDelay: `${(i % 6) * 0.11}s` }}
                      className="ind-eq w-[2px] rounded-full bg-white/80"
                    />
                  ))}
                </div>
                <p className="mt-2 text-[7.5px] font-medium text-white/85">00:42 · AI transcribing…</p>
              </div>

              {/* recent calls list */}
              <div className="mt-1 px-2">
                {[
                  { name: "Ankit S.", sub: "Today, 6:12 AM", dur: "0:42", badge: true, strong: true },
                  { name: "Class booking", sub: "Today, 7:30 AM", dur: "1:08", badge: false, strong: false },
                  { name: "Trial follow-up", sub: "Yesterday", dur: "0:55", badge: false, strong: false },
                ].map((r) => (
                  <div key={r.name} className="flex items-center gap-2 rounded-lg px-1.5 py-[7px]">
                    <span
                      className={`grid size-6 shrink-0 place-items-center rounded-full ${
                        r.strong ? "bg-primary text-white" : "bg-primary/10 text-primary"
                      }`}
                    >
                      <Phone className="size-2.5" />
                    </span>
                    <span className="min-w-0 flex-1 leading-tight">
                      <span className="flex items-center gap-1">
                        <span
                          className={`truncate text-[8.5px] ${
                            r.strong ? "font-semibold text-foreground" : "font-medium text-foreground/70"
                          }`}
                        >
                          {r.name}
                        </span>
                        {r.badge && (
                          <span className="shrink-0 rounded bg-emerald-500 px-1 text-[5.5px] font-bold uppercase text-white">
                            Live
                          </span>
                        )}
                      </span>
                      <span className="block truncate text-[7px] text-muted-foreground">{r.sub}</span>
                    </span>
                    <span className="shrink-0 text-[7px] text-muted-foreground">{r.dur}</span>
                  </div>
                ))}
              </div>

              {/* bottom tab bar */}
              <div className="mt-1 flex items-center justify-around border-t border-slate-100 px-2 pb-2 pt-1.5">
                <MessageCircle className="size-3 text-slate-300" />
                <Phone className="size-3 text-slate-300" />
                <Video className="size-3 text-slate-300" />
                <Mic className="size-3 text-primary" />
              </div>
              {/* home indicator */}
              <div className="flex justify-center pb-1.5">
                <span className="h-[3px] w-14 rounded-full bg-slate-900/80" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Phase 01 visual — a stylised "agent setup" product panel. */
function SetupMockup({ industryName }: { industryName: string }) {
  return (
    <div className="relative" aria-hidden>
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-primary/[0.09] blur-[60px]"
      />
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/[0.07]">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
          <span className="size-2.5 rounded-full bg-slate-200" />
          <span className="size-2.5 rounded-full bg-slate-200" />
          <span className="size-2.5 rounded-full bg-slate-200" />
          <p className="ml-2 text-[11px] font-medium text-muted-foreground">Agent setup</p>
        </div>

        <div className="space-y-4 p-5">
          {/* agent identity row */}
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-white shadow-sm shadow-primary/30">
              <Rocket className="size-5" />
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-sm font-semibold text-foreground">{industryName} agent</p>
              <p className="text-[11px] text-muted-foreground">Starter plan · 1 number</p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
              <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
              Live
            </span>
          </div>

          {/* phone number field */}
          <div className="rounded-xl border border-slate-200 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Phone number</p>
            <div className="mt-2 flex items-center gap-2">
              <PhoneCall className="size-4 text-primary" />
              <span className="text-sm font-medium tabular-nums text-foreground">+91 98765 43210</span>
            </div>
          </div>

          {/* language chips */}
          <div className="rounded-xl border border-slate-200 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Languages</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["Hindi", "English", "Tamil", "Marathi", "+7"].map((l, i) => (
                <span
                  key={l}
                  style={{ animationDelay: `${i * 0.14}s` }}
                  className="fit-chip-in rounded-full border border-primary/20 bg-primary/[0.07] px-2.5 py-1 text-[11px] font-medium text-primary"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>

          {/* progress to live */}
          <div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-medium text-muted-foreground">Setup progress</span>
              <span className="font-semibold text-primary">Ready</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <span className="fit-progress-loop block h-full rounded-full bg-gradient-to-r from-primary to-[oklch(0.5_0.22_255)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Phase 02 visual — a stylised "compliance & answers" product panel. */
function ComplianceMockup() {
  const rows = [
    { label: "TRAI calling windows", value: "Enforced" },
    { label: "DPDP Act 2023", value: "Compliant" },
    { label: "Call recording & consent", value: "Logged" },
  ]
  return (
    <div className="relative" aria-hidden>
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-primary/[0.09] blur-[60px]"
      />
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/[0.07]">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-primary/[0.07] to-transparent px-5 py-3.5">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <LifeBuoy className="size-3.5 text-primary" />
            Compliance checks
          </p>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
            All clear
          </span>
        </div>

        {/* scan sweep passes down the list, then each check ticks in */}
        <div className="relative divide-y divide-slate-100">
          <span
            className="fit-scan pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-transparent via-primary/[0.07] to-transparent"
          />
          {rows.map((r, i) => (
            <div key={r.label} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <span className="text-sm text-foreground/85">{r.label}</span>
              <span
                style={{ animationDelay: `${0.4 + i * 0.55}s` }}
                className="fit-check-in flex items-center gap-1.5 text-xs font-semibold text-emerald-600"
              >
                <Check className="size-3.5" />
                {r.value}
              </span>
            </div>
          ))}
        </div>

        {/* mini FAQ preview */}
        <div className="space-y-2 border-t border-slate-100 bg-slate-50/60 p-4">
          {["What counts as voice credit?", "How fast can I be live?"].map((q) => (
            <div
              key={q}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5"
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
