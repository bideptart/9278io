import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowRight, Check, Quote, Sparkles,
  GraduationCap, FileCheck, Wallet, CalendarClock, PhoneCall,
  Inbox, HeartHandshake, Rocket, ShieldCheck,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Marquee } from "@/components/ui/marquee"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { FaqAccordion } from "@/components/faq/faq-accordion"
import { GradientCta } from "@/components/sections/gradient-cta"
import { INDUSTRIES, getIndustry } from "@/lib/industries"
import type { FaqItem } from "@/lib/faq"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/seo/jsonld"

/* Education-specific FAQ. Every answer restates facts already published on
   the pricing page and /faq — plan rates, TRAI windows, integrations, the
   language list — applied to the admissions workflows in lib/industries.ts. */
const EDUCATION_FAQ: FaqItem[] = [
  {
    q: "How fast does the agent follow up on a new enquiry?",
    a: "Enquiry-form follow-up fires within 60 seconds of the form landing, while the student is still on your site. Inbound calls are picked up in under 3 seconds, so nothing rolls to voicemail during an admissions rush.",
  },
  {
    q: "Can it chase missing application documents?",
    a: "Yes. Application status checks and document chasing ship as a standard playbook — the agent calls, tells the student exactly which document is outstanding, and on Growth and Scale sends the upload link over the WhatsApp Business API so it lands in writing too.",
  },
  {
    q: "Does it work with our CRM and admissions software?",
    a: "Yes. We have native integrations with LeadSquared, Zoho CRM, Freshworks, Razorpay, and the WhatsApp Business API, plus 200+ other tools via webhooks and Zapier. Custom integrations are included on the Growth and Scale plans.",
  },
  {
    q: "Can it call students about fee instalments?",
    a: "Yes — fee-payment Q&A and instalment reminders are built in, and the agent can answer questions about what's due before it chases payment. Outbound calls stay inside TRAI calling windows (nothing before 9 AM or after 9 PM), and every call is recorded and consent-logged.",
  },
  {
    q: "Which languages can it use with regional students?",
    a: "10+ Indian languages including Hindi, Marathi, Tamil, Telugu, Kannada, Bengali, Gujarati, Punjabi, Malayalam, and Odia — with native-sounding voices, sub-second latency, and the ability to switch language mid-call if a parent takes over.",
  },
  {
    q: "What does this cost for one coaching centre?",
    a: "Starter is ₹3,000 billed once as wallet credit — 250 included minutes at ₹12/min. A dedicated Indian number is ₹400/month, and wallet credit is valid for 60 days from top-up. No setup fees and no contracts.",
  },
]

/* Live-preview thread. The first two turns are the real Marathi exchange from
   lib/industries.ts; the rest continue the same call through the fee-Q&A and
   batch-start playbooks so the panel reads as a full conversation.
   NOTE: the continuation lines were written for this mockup — worth a native
   Marathi speaker's review before this goes to production. */
const EDU_THREAD = [
  { speaker: "Agent", text: "प्रिया, NEET बॅचसाठी प्रवेश घ्यायचा आहे का?" },
  { speaker: "Caller", text: "फी किती आहे ते सांगाल का?" },
  { speaker: "Agent", text: "नक्कीच! फी आणि हप्त्यांचा तपशील WhatsApp वर पाठवला जाईल." },
  { speaker: "Caller", text: "हो, नक्की पाठवा." },
  { speaker: "Agent", text: "पुढची बॅच २२ तारखेला सुरू होते. जागा राखून ठेवायची का?" },
  { speaker: "Caller", text: "हो, ठेवा." },
]

/* The five day-one playbooks from lib/industries.ts, in the order a student
   actually moves through them — enquiry → documents → fees → batch → retention.
   Copy is expanded from the terse job labels to describe what the voice agent
   actually does at each stage; every capability named here is one the platform
   already documents (60s follow-up, WhatsApp on Growth/Scale, TRAI windows,
   CRM write-back). */
const JOURNEY_STAGES = [
  {
    label: "Enquiry",
    icon: Inbox,
    job: "Calls every new enquiry within 60 seconds, qualifies intent, and routes ready leads straight to a counsellor.",
  },
  {
    label: "Documents",
    icon: FileCheck,
    job: "Chases missing marksheets and IDs, then WhatsApps the upload link so the application never stalls.",
  },
  {
    label: "Fees",
    icon: Wallet,
    job: "Answers fee and instalment questions, then follows up before every due date — inside TRAI calling hours.",
  },
  {
    label: "Batch start",
    icon: CalendarClock,
    job: "Confirms seats, books orientation, and reminds each student before day one so nobody drops off.",
  },
  {
    label: "Retention",
    icon: HeartHandshake,
    job: "Checks in on quiet students between terms and flags at-risk cases back to your team.",
  },
]

/* Hero stat strip — all four numbers restate facts already published on
   this site (marquee below, pricing page) or in the education playbook. */
const HERO_STATS = [
  { value: "< 3s", label: "First response" },
  { value: "60s", label: "Enquiry follow-up" },
  { value: "10+", label: "Indian languages" },
  { value: "₹10", label: "Per-minute, from" },
]

/**
 * Education gets its own page (rather than the shared [slug] template) so
 * its hero can be designed independently. Next.js resolves this static
 * route ahead of the [slug] dynamic route, so every other industry keeps
 * rendering from app/industries/[slug]/page.tsx unchanged.
 */
const SLUG = "education"

export const metadata: Metadata = (() => {
  const industry = getIndustry(SLUG)
  if (!industry) return {}
  return pageSeo({
    title: `AI voice agents for ${industry.name.toLowerCase()}`,
    description: industry.short,
    path: `/industries/${industry.slug}`,
  })
})()

export default function EducationIndustryPage() {
  const industry = getIndustry(SLUG)
  if (!industry) notFound()

  // Pick three sibling industries for the related-links module.
  const related = INDUSTRIES.filter((i) => i.slug !== industry.slug).slice(0, 3)

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

      {/* ── Hero: copy left, floating playbook-card collage right ── */}
      <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-blue-50/50 via-background to-background">
        {/* soft organic blob behind the collage */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-0 h-[560px] w-[620px] rounded-[45%_55%_50%_50%/50%_45%_55%_50%] bg-primary/[0.07] blur-[60px]"
        />

        <div className="relative w-full px-6 pb-16 pt-6 md:px-8 md:pb-20 md:pt-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/industries" className="hover:text-foreground">
                  Industries
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-foreground">{industry.name}</li>
            </ol>
          </nav>

          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-12">
            {/* ── Left: copy ── */}
            <div>
              <ScrollReveal>
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
                  <GraduationCap className="size-4" aria-hidden />
                  {industry.name}
                </span>
              </ScrollReveal>

              <ScrollReveal delay={0.06}>
                <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
                  AI voice agents for{" "}
                  <span className="bg-gradient-to-r from-primary via-[oklch(0.62_0.2_240)] to-[oklch(0.72_0.18_150)] bg-clip-text text-transparent">
                    education.
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.12}>
                <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground md:text-lg">
                  {industry.pitch}
                </p>
              </ScrollReveal>

              {/* stat strip */}
              <ScrollReveal delay={0.18}>
                <div className="mt-8 flex flex-wrap gap-x-9 gap-y-5">
                  {HERO_STATS.map((s) => (
                    <div key={s.label}>
                      <p className="text-2xl font-bold tracking-tight text-foreground">{s.value}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* CTA row — pill button + circular secondary actions */}
              <ScrollReveal delay={0.24}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-full bg-gradient-to-r from-primary to-[oklch(0.5_0.21_255)] py-2 pl-7 pr-2 text-base font-semibold text-white shadow-[0_8px_28px_oklch(0.546_0.215_262.88/0.45)] transition-all hover:shadow-[0_10px_36px_oklch(0.546_0.215_262.88/0.6)]"
                  >
                    <Link href={`/get-started?industry=${industry.slug}`}>
                      Let&apos;s get started
                      <span className="flex size-7 items-center justify-center rounded-full bg-white/20">
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </span>
                    </Link>
                  </Button>
                  <Link
                    href="/#demo-audio"
                    aria-label="Hear a live agent demo"
                    className="grid size-12 place-items-center rounded-full border border-border bg-white text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30"
                  >
                    <PhoneCall className="size-4" aria-hidden />
                  </Link>
                  <Link
                    href="/pricing"
                    className="text-sm font-semibold text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    View pricing
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* ── Right: floating playbook cards ── */}
            <ScrollReveal delay={0.15}>
              <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[440px]">
                {/* decorative dots */}
                {[
                  { top: "12%", left: "44%", size: "size-2.5" },
                  { top: "38%", left: "2%", size: "size-3.5" },
                  { top: "72%", left: "48%", size: "size-2" },
                  { top: "58%", left: "94%", size: "size-2.5" },
                ].map((d, i) => (
                  <span
                    key={i}
                    style={{ top: d.top, left: d.left, animationDelay: `${i * 0.7}s` }}
                    className={`fit-twinkle absolute ${d.size} rounded-full bg-primary/40`}
                  />
                ))}
                {/* soft rounded-square accents behind the cards */}
                <span className="absolute left-[26%] top-[26%] size-24 rotate-12 rounded-[1.75rem] bg-primary/[0.06]" />
                <span className="absolute bottom-[18%] right-[26%] size-20 -rotate-6 rounded-[1.5rem] bg-[oklch(0.72_0.18_150)]/[0.08]" />

                {/* dotted links from the featured card to the others */}
                <svg
                  viewBox="0 0 400 400"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  fill="none"
                  stroke="currentColor"
                >
                  <g className="text-primary/25" strokeWidth="1.5" strokeDasharray="3 7" strokeLinecap="round">
                    <path d="M150 118 C 220 90, 260 90, 300 74" />
                    <path d="M120 150 C 90 220, 88 250, 96 296" />
                    <path d="M158 148 C 230 210, 270 260, 300 316" />
                  </g>
                </svg>

                {/* ── Featured: live admissions call ── */}
                <div className="hero-float-up absolute left-[4%] top-[10%] w-[48%] max-w-[196px]">
                  <div className="overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-primary to-[oklch(0.42_0.2_262)] p-4 shadow-[0_28px_56px_-18px_oklch(0.52_0.22_265/0.6)] ring-1 ring-white/15">
                    <div className="flex items-center justify-between">
                      <span className="grid size-9 place-items-center rounded-xl bg-white/20 text-white backdrop-blur">
                        <GraduationCap className="size-[18px]" />
                      </span>
                      <span className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-[3px] text-[8px] font-bold uppercase tracking-wide text-white backdrop-blur">
                        <span className="fit-blink size-1 rounded-full bg-emerald-300" />
                        Live
                      </span>
                    </div>
                    <p className="mt-3.5 text-[13px] font-semibold leading-tight text-white">Admissions</p>
                    <p className="mt-0.5 text-[10px] text-white/70">Calling Priya S. · 00:18</p>
                    {/* live waveform */}
                    <div className="mt-2.5 flex h-4 items-end gap-[2px]">
                      {[5, 9, 6, 12, 8, 11, 7, 13, 6, 9].map((h, i) => (
                        <span
                          key={i}
                          style={{ height: `${h}px`, animationDelay: `${(i % 5) * 0.11}s` }}
                          className="ind-eq w-[2px] rounded-full bg-white/75"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Documents: collection progress ── */}
                <div
                  className="hero-float-down absolute right-[2%] top-0 w-[46%] max-w-[186px]"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-4 shadow-[0_22px_46px_-20px_oklch(0.2_0.05_262/0.3)]">
                    <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                      <FileCheck className="size-[18px]" />
                    </span>
                    <p className="mt-3.5 text-[13px] font-semibold leading-tight text-foreground">Documents</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">3 of 4 received</p>
                    <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <span className="fit-progress-loop block h-full rounded-full bg-gradient-to-r from-primary to-[oklch(0.62_0.2_240)]" />
                    </div>
                  </div>
                </div>

                {/* ── Fee reminders: instalment status ── */}
                <div
                  className="hero-float-down absolute bottom-[8%] left-0 w-[46%] max-w-[186px]"
                  style={{ animationDelay: "1.1s" }}
                >
                  <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-4 shadow-[0_22px_46px_-20px_oklch(0.2_0.05_262/0.3)]">
                    <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Wallet className="size-[18px]" />
                    </span>
                    <p className="mt-3.5 text-[13px] font-semibold leading-tight text-foreground">Fee reminders</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">Instalment 2 · due Friday</p>
                    <span
                      className="fit-check-in mt-2.5 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-[3px] text-[9px] font-semibold text-emerald-600"
                    >
                      <Check className="size-2.5" />
                      Reminder sent
                    </span>
                  </div>
                </div>

                {/* ── Batch starts: upcoming orientation ── */}
                <div
                  className="hero-float-up absolute bottom-[2%] right-[6%] w-[46%] max-w-[186px]"
                  style={{ animationDelay: "0.75s" }}
                >
                  <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-4 shadow-[0_22px_46px_-20px_oklch(0.2_0.05_262/0.3)]">
                    <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                      <CalendarClock className="size-[18px]" />
                    </span>
                    <p className="mt-3.5 text-[13px] font-semibold leading-tight text-foreground">Batch starts</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">NEET · 22 Jan</p>
                    <div className="mt-2.5 flex gap-1">
                      {["20", "21", "22"].map((d, i) => (
                        <span
                          key={d}
                          style={{ animationDelay: `${i * 0.16}s` }}
                          className={`fit-chip-in grid h-5 flex-1 place-items-center rounded-md text-[9px] font-semibold ${
                            d === "22" ? "bg-primary text-white" : "bg-slate-100 text-muted-foreground"
                          }`}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What it does — the student journey, stage by stage */}
      <section className="w-full px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              The student journey
            </span>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              From first enquiry to first class
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Five pre-built playbooks cover the whole admissions lifecycle. Every stage works out of the box — fine-tune
              them, add your own, and wire them into your existing tools without writing code.
            </p>
          </ScrollReveal>

          {/* ── Journey rail ── */}
          <div className="relative mt-14">
            {/* connector line running behind the stage nodes (desktop) */}
            <span
              aria-hidden
              className="ind-shimmer absolute left-[10%] right-[10%] top-7 hidden h-[2px] rounded-full opacity-40 lg:block"
            />

            <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
              {JOURNEY_STAGES.map((stage, i) => (
                <ScrollReveal key={stage.label} delay={i * 0.09}>
                  <li className="group relative flex flex-col items-center text-center">
                    {/* node */}
                    <span className="relative grid size-14 place-items-center rounded-2xl border border-primary/15 bg-white shadow-[0_10px_26px_-12px_oklch(0.52_0.22_265/0.5)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/40">
                      <stage.icon className="size-6 text-primary" aria-hidden />
                      {/* step number badge */}
                      <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm">
                        {i + 1}
                      </span>
                      {/* pulse ring on the first (live) stage */}
                      {i === 0 && (
                        <span
                          aria-hidden
                          className="ind-ping absolute inset-0 rounded-2xl border-2 border-primary/40"
                        />
                      )}
                    </span>

                    <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                      {stage.label}
                    </p>
                    <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{stage.job}</p>
                  </li>
                </ScrollReveal>
              ))}
            </ol>
          </div>

          {/* ── Live call + real lines ── */}
          <div className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
            {/* conversation panel */}
            <ScrollReveal>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/[0.06]">
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-primary/[0.07] to-transparent px-5 py-3.5">
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden />
                    Live agent preview · Marathi
                  </p>
                  <div className="flex h-5 items-end gap-[2px]" aria-hidden>
                    {[7, 13, 9, 15, 11, 8, 14].map((h, i) => (
                      <span
                        key={i}
                        style={{ height: `${h}px`, animationDelay: `${(i % 5) * 0.12}s` }}
                        className="ind-eq w-1 rounded-full bg-primary/70"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex-1 space-y-2 p-5">
                  {EDU_THREAD.map((line, i) => (
                    <div
                      key={i}
                      style={{ animationDelay: `${i * 1.15}s`, animationDuration: "10s" }}
                      className={`fit-bubble-cycle flex text-sm ${
                        line.speaker === "Agent" ? "justify-start" : "justify-end"
                      }`}
                    >
                      {line.speaker === "Agent" ? (
                        <span className="max-w-[85%] rounded-2xl rounded-bl-sm bg-primary/15 px-3.5 py-2 text-primary ring-1 ring-primary/20">
                          <span className="mr-1 text-[10px] font-bold opacity-60">Agent</span>
                          {line.text}
                        </span>
                      ) : (
                        <span className="max-w-[85%] rounded-2xl rounded-br-sm bg-slate-50 px-3.5 py-2 text-slate-700 ring-1 ring-slate-200">
                          <span className="mr-1 text-[10px] font-bold opacity-40">Caller</span>
                          {line.text}
                        </span>
                      )}
                    </div>
                  ))}
                  {/* typing indicator keeps the panel alive between turns */}
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

                <p className="border-t border-slate-100 bg-slate-50/60 px-5 py-3 text-[11px] text-muted-foreground">
                  Generated in real time — sub-second latency, real interruptions, natural emotion.
                </p>
              </div>
            </ScrollReveal>

            {/* real lines, as stacked quote cards */}
            <div className="space-y-3">
              {industry.sampleLines.map((line, i) => (
                <ScrollReveal key={i} delay={0.1 + i * 0.09}>
                  <figure className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-gradient-to-b from-primary to-[oklch(0.72_0.18_150)] transition-transform duration-300 group-hover:scale-y-100"
                    />
                    <Quote className="size-4 text-primary/40" aria-hidden />
                    <blockquote className="mt-2.5 text-pretty leading-relaxed text-foreground/90">{line}</blockquote>
                    <figcaption className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {JOURNEY_STAGES[i]?.label ?? "Outbound"}
                    </figcaption>
                  </figure>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why teams switch */}
      <section className="relative overflow-hidden border-y border-border/50 bg-card/20 py-16 md:py-20">
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

      {/* Rollout — 2×2 feature cards, each with a live product mockup */}
      <section className="w-full px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
              How {industry.name.toLowerCase()} teams roll out 9278.io
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Start with one number and one playbook, then scale as the results prove out — no contracts, no setup fees,
              and nothing to rip out later.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2">
            {/* ── 01 · Spin up a Starter agent ── */}
            <ScrollReveal>
              <article className="group">
                <div className="grid h-[230px] place-items-center rounded-3xl border border-slate-200/70 bg-slate-50/70 p-6 transition-colors duration-300 group-hover:bg-slate-50">
                  <div className="hero-float-up w-full max-w-[240px] rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_40px_-20px_oklch(0.2_0.05_262/0.3)]">
                    <div className="flex items-center gap-2.5">
                      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-white">
                        <Rocket className="size-4" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1 leading-tight">
                        <span className="block truncate text-[12px] font-semibold text-foreground">
                          Education agent
                        </span>
                        <span className="block text-[10px] text-muted-foreground">Starter · 1 number</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[8px] font-bold uppercase text-emerald-700">
                        <span className="fit-blink size-1 rounded-full bg-emerald-500" />
                        Live
                      </span>
                    </div>
                    <div className="mt-3.5 flex items-center justify-between text-[10px]">
                      <span className="text-muted-foreground">Setup progress</span>
                      <span className="font-semibold text-primary">Ready</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <span className="fit-progress-loop block h-full rounded-full bg-gradient-to-r from-primary to-[oklch(0.72_0.18_150)]" />
                    </div>
                  </div>
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">Start in minutes</h3>
                <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                  Most {industry.name.toLowerCase()} customers begin by{" "}
                  <Link href="/get-started" className="font-medium text-primary underline-offset-4 hover:underline">
                    spinning up a Starter agent
                  </Link>{" "}
                  with a single phone number — live the same afternoon.
                </p>
              </article>
            </ScrollReveal>

            {/* ── 02 · Upgrade to Growth or Scale ── */}
            <ScrollReveal delay={0.08}>
              <article className="group">
                <div className="grid h-[230px] place-items-center rounded-3xl border border-slate-200/70 bg-slate-50/70 p-6 transition-colors duration-300 group-hover:bg-slate-50">
                  <div className="hero-float-down w-full max-w-[240px] space-y-1.5">
                    {[
                      { plan: "Starter", price: "₹3,000", rate: "₹12/min", active: false },
                      { plan: "Growth", price: "₹8,800", rate: "₹11/min", active: true },
                      { plan: "Scale", price: "₹30,000", rate: "₹10/min", active: false },
                    ].map((p, i) => (
                      <div
                        key={p.plan}
                        style={{ animationDelay: `${i * 0.16}s` }}
                        className={`fit-chip-in flex items-center justify-between rounded-xl px-3 py-2.5 ${
                          p.active
                            ? "bg-primary text-white shadow-[0_10px_24px_-12px_oklch(0.52_0.22_265/0.7)]"
                            : "border border-slate-200 bg-white"
                        }`}
                      >
                        <span
                          className={`text-[11px] font-semibold ${p.active ? "text-white" : "text-foreground"}`}
                        >
                          {p.plan}
                        </span>
                        <span className="flex items-baseline gap-1.5">
                          <span
                            className={`text-[11px] font-bold ${p.active ? "text-white" : "text-foreground"}`}
                          >
                            {p.price}
                          </span>
                          <span
                            className={`text-[9px] ${p.active ? "text-white/70" : "text-muted-foreground"}`}
                          >
                            {p.rate}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">Scale when it proves out</h3>
                <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                  Move up to{" "}
                  <Link href="/pricing" className="font-medium text-primary underline-offset-4 hover:underline">
                    Growth or Scale
                  </Link>{" "}
                  once the inbound playbooks land — rates drop from ₹12 to ₹10 a minute as you grow.
                </p>
              </article>
            </ScrollReveal>

            {/* ── 03 · Compliance answered ── */}
            <ScrollReveal delay={0.16}>
              <article className="group">
                <div className="grid h-[230px] place-items-center rounded-3xl border border-slate-200/70 bg-slate-50/70 p-6 transition-colors duration-300 group-hover:bg-slate-50">
                  <div className="hero-float-up w-full max-w-[240px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_40px_-20px_oklch(0.2_0.05_262/0.3)]">
                    <p className="flex items-center gap-1.5 border-b border-slate-100 px-3.5 py-2.5 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                      <ShieldCheck className="size-3 text-primary" aria-hidden />
                      Compliance
                    </p>
                    <div className="divide-y divide-slate-100">
                      {["TRAI calling windows", "DPDP Act 2023", "Consent logged"].map((r, i) => (
                        <div key={r} className="flex items-center justify-between gap-2 px-3.5 py-2">
                          <span className="text-[10px] text-foreground/80">{r}</span>
                          <span
                            style={{ animationDelay: `${0.4 + i * 0.55}s` }}
                            className="fit-check-in grid size-4 place-items-center rounded-full bg-emerald-50 text-emerald-600"
                          >
                            <Check className="size-2.5" aria-hidden />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">Compliance, answered</h3>
                <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                  Curious about voice credit, phone numbers, or compliance? The{" "}
                  <Link href="/faq" className="font-medium text-primary underline-offset-4 hover:underline">
                    FAQ
                  </Link>{" "}
                  answers what {industry.name.toLowerCase()} ops teams ask most.
                </p>
              </article>
            </ScrollReveal>

            {/* ── 04 · Compare other industries ── */}
            <ScrollReveal delay={0.24}>
              <article className="group">
                <div className="grid h-[230px] place-items-center rounded-3xl border border-slate-200/70 bg-slate-50/70 p-6 transition-colors duration-300 group-hover:bg-slate-50">
                  <div className="hero-float-down grid w-full max-w-[240px] grid-cols-3 gap-2">
                    {INDUSTRIES.slice(0, 6).map((ind, i) => {
                      const IndIcon = ind.icon
                      const isSelf = ind.slug === industry.slug
                      return (
                        <span
                          key={ind.slug}
                          style={{ animationDelay: `${i * 0.1}s` }}
                          className={`fit-chip-in grid aspect-square place-items-center rounded-xl ${
                            isSelf
                              ? "bg-primary text-white shadow-[0_10px_24px_-12px_oklch(0.52_0.22_265/0.7)]"
                              : "border border-slate-200 bg-white text-primary/70"
                          }`}
                        >
                          <IndIcon className="size-4" aria-hidden />
                        </span>
                      )
                    })}
                  </div>
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">Compare playbooks</h3>
                <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                  Browse{" "}
                  <Link href="/industries" className="font-medium text-primary underline-offset-4 hover:underline">
                    every other industry
                  </Link>{" "}
                  we support to see how neighbouring teams automate the same calls.
                </p>
              </article>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-14 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-gradient-to-r from-primary to-[oklch(0.5_0.21_255)] py-2 pl-7 pr-2 text-base font-semibold text-white shadow-[0_8px_28px_oklch(0.546_0.215_262.88/0.45)] transition-all hover:shadow-[0_10px_36px_oklch(0.546_0.215_262.88/0.6)]"
              >
                <Link href={`/get-started?industry=${industry.slug}`}>
                  Launch an {industry.name.toLowerCase()} agent
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
      </section>

      {/* Other industries — asymmetric bento of dark, light and accent tiles */}
      <section className="w-full border-t border-border/50 bg-card/20 px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          {/* header: heading left, description right */}
          <ScrollReveal className="grid gap-6 md:grid-cols-2 md:items-start md:gap-12">
            <div>
              <span
                aria-hidden
                className="block h-[3px] w-14 rounded-full bg-gradient-to-r from-primary to-[oklch(0.72_0.18_150)]"
              />
              <h2 className="mt-5 text-balance text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                Other industries we power
              </h2>
            </div>
            <p className="text-pretty leading-relaxed text-muted-foreground md:pt-9">
              Pre-tuned playbooks for the calls your peers in adjacent verticals already automate — same platform, same
              plans, different scripts.
            </p>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {/* ── A · featured industry — wide dark tile ── */}
            {related[0] && (
              <ScrollReveal className="md:col-span-2">
                <Link
                  href={`/industries/${related[0].slug}`}
                  className="group relative flex h-full min-h-[230px] flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-[oklch(0.3_0.12_262)] to-primary p-7 transition-transform duration-300 hover:-translate-y-1"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-white/10 blur-3xl"
                  />
                  {/* faint grid */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.15]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
                      backgroundSize: "40px 40px",
                      maskImage: "radial-gradient(ellipse at 70% 0%, black 20%, transparent 75%)",
                    }}
                  />
                  <span className="absolute right-7 top-7 grid size-11 place-items-center rounded-xl bg-white/15 text-white backdrop-blur">
                    {(() => {
                      const I = related[0].icon
                      return <I className="size-5" aria-hidden />
                    })()}
                  </span>
                  <div className="relative">
                    <h3 className="text-balance text-xl font-semibold tracking-tight text-white md:text-2xl">
                      AI voice agents for {related[0].name.toLowerCase()}
                    </h3>
                    <p className="mt-2.5 max-w-md text-pretty text-sm leading-relaxed text-white/70">
                      {related[0].short}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                      Read more
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            )}

            {/* ── B · second industry — tall dark tile with live-call mockup ── */}
            {related[1] && (
              <ScrollReveal delay={0.08} className="lg:row-span-2">
                <Link
                  href={`/industries/${related[1].slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-slate-900 p-7 transition-transform duration-300 hover:-translate-y-1"
                >
                  <h3 className="text-balance text-xl font-semibold tracking-tight text-white">
                    AI voice agents for {related[1].name.toLowerCase()}
                  </h3>
                  <p className="mt-2.5 text-pretty text-sm leading-relaxed text-white/60">{related[1].short}</p>

                  {/* mini live-call panel */}
                  <div className="mt-7 flex-1">
                    <div className="hero-float-up rounded-2xl bg-white p-3.5 shadow-2xl">
                      <div className="flex items-center gap-2">
                        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-white">
                          <PhoneCall className="size-3.5" aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1 leading-tight">
                          <span className="block text-[11px] font-semibold text-foreground">Inbound call</span>
                          <span className="block text-[9px] text-muted-foreground">Answered in 2.1s</span>
                        </span>
                        <span className="flex h-4 shrink-0 items-end gap-[2px]">
                          {[5, 9, 6, 11, 7].map((h, i) => (
                            <span
                              key={i}
                              style={{ height: `${h}px`, animationDelay: `${(i % 4) * 0.12}s` }}
                              className="ind-eq w-[2px] rounded-full bg-primary/70"
                            />
                          ))}
                        </span>
                      </div>
                      <div className="mt-3 space-y-1.5">
                        <span className="block w-[85%] rounded-lg rounded-bl-sm bg-primary/12 px-2.5 py-1.5 text-[10px] leading-snug text-primary">
                          Thanks for calling — how can I help?
                        </span>
                        <span className="ml-auto block w-[70%] rounded-lg rounded-br-sm bg-slate-100 px-2.5 py-1.5 text-[10px] leading-snug text-slate-600">
                          I need to book a slot.
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                    Read more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </ScrollReveal>
            )}

            {/* ── C · third industry — dark tile with connected-node graphic ── */}
            {related[2] && (
              <ScrollReveal delay={0.16}>
                <Link
                  href={`/industries/${related[2].slug}`}
                  className="group flex h-full min-h-[230px] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[oklch(0.26_0.06_262)] to-slate-900 p-7 transition-transform duration-300 hover:-translate-y-1"
                >
                  {/* node cluster: this industry linked to its neighbours */}
                  <div aria-hidden className="relative h-[86px]">
                    <svg viewBox="0 0 200 86" className="absolute inset-0 h-full w-full">
                      <g stroke="white" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="3 5">
                        <path d="M34 58 L92 26" fill="none" />
                        <path d="M92 26 L150 56" fill="none" />
                      </g>
                    </svg>
                    {[
                      { icon: related[2].icon, cls: "left-[6px] top-[38px]", featured: false },
                      { icon: GraduationCap, cls: "left-[72px] top-[6px]", featured: true },
                      { icon: related[0]?.icon ?? GraduationCap, cls: "left-[130px] top-[36px]", featured: false },
                    ].map((n, i) => (
                      <span
                        key={i}
                        style={{ animationDelay: `${i * 0.18}s` }}
                        className={`fit-chip-in absolute ${n.cls} grid size-10 place-items-center rounded-full ${
                          n.featured ? "bg-primary text-white" : "bg-white/10 text-white/80 backdrop-blur"
                        }`}
                      >
                        <n.icon className="size-4" />
                      </span>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-balance text-lg font-semibold tracking-tight text-white">
                      AI voice agents for {related[2].name.toLowerCase()}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white/90">
                      Read more
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            )}

            {/* ── D · pricing — light tile with a falling-rate chart ── */}
            <ScrollReveal delay={0.24}>
              <Link
                href="/pricing"
                className="group flex h-full min-h-[230px] flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/70 bg-[oklch(0.98_0.008_95)] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div>
                  <h3 className="text-balance text-lg font-semibold tracking-tight text-foreground">
                    Compare plans &amp; per-minute rates
                  </h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    Three tiers from ₹3,000 to ₹30,000.
                  </p>
                </div>

                {/* rate curve: ₹12 → ₹10 as tiers scale up */}
                <div aria-hidden className="mt-5">
                  <svg viewBox="0 0 200 56" className="h-14 w-full" fill="none">
                    <defs>
                      <linearGradient id="edu-rate" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor="oklch(0.546 0.215 262.88)" />
                        <stop offset="1" stopColor="oklch(0.72 0.18 150)" />
                      </linearGradient>
                    </defs>
                    <path d="M4 12 L100 30 L196 46" stroke="url(#edu-rate)" strokeWidth="2.5" strokeLinecap="round" />
                    {[
                      { cx: 4, cy: 12 },
                      { cx: 100, cy: 30 },
                      { cx: 196, cy: 46 },
                    ].map((p, i) => (
                      <circle key={i} cx={p.cx} cy={p.cy} r="3.5" fill="white" stroke="url(#edu-rate)" strokeWidth="2" />
                    ))}
                  </svg>
                  <div className="mt-1 flex justify-between text-[10px] font-medium text-muted-foreground">
                    <span>₹12/min</span>
                    <span>₹11/min</span>
                    <span className="text-primary">₹10/min</span>
                  </div>
                </div>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Read more
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </ScrollReveal>

            {/* ── E · FAQ — wide light tile with topic chips ── */}
            <ScrollReveal delay={0.32} className="md:col-span-2">
              <Link
                href="/faq"
                className="group flex h-full flex-col gap-5 rounded-2xl border border-slate-200/70 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <ShieldCheck className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-balance text-lg font-semibold tracking-tight text-foreground">
                      FAQ — credit, phone numbers, compliance
                    </h3>
                    <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
                      Pricing, phone numbers, TRAI calling-window enforcement, DPDP Act 2023, and more.
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  {["Voice credit", "TRAI", "DPDP"].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {chip}
                    </span>
                  ))}
                  <ArrowRight
                    className="size-4 text-primary transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </div>
              </Link>
            </ScrollReveal>

            {/* ── F · accent CTA tile ── */}
            <ScrollReveal delay={0.4}>
              <Link
                href={`/get-started?industry=${industry.slug}`}
                className="group relative flex h-full min-h-[150px] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.5_0.21_255)] p-7 shadow-[0_20px_44px_-22px_oklch(0.52_0.22_265/0.7)] transition-transform duration-300 hover:-translate-y-1"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-12 -left-10 size-44 rounded-full bg-white/10 blur-2xl"
                />
                <span className="absolute right-6 top-6 grid size-10 place-items-center rounded-full bg-white text-primary transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" aria-hidden />
                </span>
                <p className="relative mt-auto max-w-[75%] text-balance text-xl font-semibold leading-snug tracking-tight text-white">
                  Launch your {industry.name.toLowerCase()} agent today
                </p>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ — education-specific, same treatment as the homepage FAQ */}
      <section id="faq" className="border-b border-border/50">
        <FaqJsonLd items={EDUCATION_FAQ} />
        <div className="w-full px-6 pb-10 pt-14 md:px-8 md:pb-14 md:pt-20">
          <ScrollReveal className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
              FAQ
            </span>
            <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight md:text-5xl">Questions, answered.</h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              The short version: enquiries answered in 60 seconds, outbound inside TRAI windows, and Starter runs ₹3,000
              for 250 minutes. The long version is below.
            </p>
          </ScrollReveal>

          <div className="mx-auto mt-12 max-w-5xl">
            <ScrollReveal>
              <FaqAccordion items={EDUCATION_FAQ} idPrefix="education-faq" />
            </ScrollReveal>

            <ScrollReveal className="mt-10 flex justify-center">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 px-5 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                See all FAQs →
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <GradientCta
        heading="Ready to fill every batch?"
        description="Launch an agent that follows up on enquiries in 60 seconds, chases documents, and reminds students about fees — in 10+ Indian languages, around the clock."
        primaryHref={`/get-started?industry=${industry.slug}`}
        primaryLabel="Build your first agent"
        secondaryHref="/pricing"
        secondaryLabel="View pricing"
      />

      <SiteFooter />
    </main>
  )
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
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
