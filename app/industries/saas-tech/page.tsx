import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  Clock,
  Phone,
  ShieldCheck,
  Sparkles,
  Play,
  TrendingUp,
  Globe,
  Zap,
  BarChart3,
  Users,
  Rocket,
  MessageCircle,
  Bot,
  Headphones,
  Puzzle,
  UserCheck,
  CalendarCheck,
  IndianRupee,
  Ticket,
  Bell,
  Database,
  Lock,
  CreditCard,
  Server,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { SaasAgentConsole } from "@/components/industries/saas-agent-console"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { INDUSTRIES, getIndustry } from "@/lib/industries"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/jsonld"

export const metadata: Metadata = pageSeo({
  title: "AI voice agents for SaaS & technology teams",
  description:
    "Convert trials, qualify leads, onboard customers, and resolve support requests 24/7 with AI voice agents built for SaaS and technology companies.",
  path: "/industries/saas-tech",
})

const PITCH =
  "Convert trials, qualify leads, onboard customers, and resolve support requests 24/7 with AI voice agents that sound natural and respond instantly. Built for startups, SaaS platforms, software providers, and technology companies."

const DAY_ONE_JOBS = [
  { Icon: UserCheck, text: "Qualifies inbound SaaS leads automatically" },
  { Icon: CalendarCheck, text: "Books demos directly into sales calendars" },
  { Icon: IndianRupee, text: "Handles pricing and plan inquiries" },
  { Icon: Rocket, text: "Assists trial users during onboarding" },
  { Icon: Ticket, text: "Creates support tickets with conversation summaries" },
  { Icon: Bell, text: "Follows up with inactive users automatically" },
]

const OPPORTUNITY_ITEMS = [
  "Instant lead qualification",
  "Automated demo scheduling",
  "Product onboarding assistance",
  "Customer success automation",
  "Trial recovery and re-engagement",
  "Real-time CRM updates",
]

const SUPPORT_ITEMS = [
  "Product walkthrough assistance",
  "Subscription management",
  "Account recovery support",
  "Upgrade and renewal reminders",
  "Multi-language conversations",
  "Real-time CRM synchronization",
]

const WHY_ITEMS = [
  { Icon: Zap, label: "Sub-300ms voice response latency" },
  { Icon: Users, label: "Natural audio conversations that build trust" },
  { Icon: Phone, label: "Massive concurrent call handling" },
  { Icon: BarChart3, label: "Real-time transcripts & analytics" },
  { Icon: CreditCard, label: "Per-second billing — pay only for usage" },
  { Icon: Server, label: "Self-hosted control panel & full ownership" },
  { Icon: Puzzle, label: "CRM & workflow integrations ready" },
  { Icon: ShieldCheck, label: "Enterprise-grade security & compliance" },
]

export default function SaasTechPage() {
  const related = INDUSTRIES.filter((i) => i.slug !== "saas-tech").slice(0, 3)
  const education = getIndustry("education")

  return (
    <>
      <SiteHeader />
      <main className="min-h-dvh bg-white text-slate-900" style={{ zoom: 0.9 }}>

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: "SaaS & Technology", path: "/industries/saas-tech" },
        ]}
      />
      <ServiceJsonLd
        name="AI voice agents for SaaS & technology"
        description={PITCH}
        path="/industries/saas-tech"
        serviceType="AI voice agent"
      />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-white">
        <div className="w-full px-6 pt-6 pb-12 md:px-8 md:pt-8 md:pb-16">

          <div className="mx-auto grid max-w-7xl items-start gap-14 lg:grid-cols-2 lg:gap-10">
            {/* Left — copy */}
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white py-1.5 pl-1.5 pr-5 text-[13px] font-medium text-blue-700 shadow-sm">
                <span className="grid size-6 place-items-center rounded-full bg-blue-100 text-blue-600">
                  <Sparkles className="size-3.5" aria-hidden />
                </span>
                AI Voice Agents for SaaS & Technology
              </span>

              <h1 className="mt-6 text-balance font-sans text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl">
                AI Voice Agents
                <br />
                for <span className="text-blue-600">SaaS Teams.</span>
              </h1>

              <p className="mt-6 max-w-lg text-pretty text-[15.5px] leading-relaxed text-slate-600">{PITCH}</p>

              <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 sm:flex sm:flex-wrap">
                {[
                  { Icon: Phone, title: "24/7", desc: "Customer Support" },
                  { Icon: Users, title: "Trial Conversion", desc: "Calls" },
                  { Icon: Globe, title: "Multi-language", desc: "Voice AI" },
                  { Icon: Puzzle, title: "CRM", desc: "Integration" },
                ].map((f) => (
                  <div key={f.title} className="flex items-start gap-2.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600">
                      <f.Icon className="size-4.5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-[13px] font-bold leading-snug text-slate-900">{f.title}</p>
                      <p className="max-w-[130px] text-[11.5px] leading-snug text-slate-500">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <Button
                  asChild
                  size="lg"
                  className="group h-auto rounded-full bg-blue-600 px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.65)] transition-all hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  <Link href="/get-started?industry=saas-tech">
                    Launch SaaS AI Agent
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-auto rounded-full border-slate-200 bg-white px-6 py-3.5 text-[15px] font-bold text-slate-800 shadow-sm hover:border-blue-300 hover:bg-blue-50/60 hover:text-blue-700"
                >
                  <Link href="/get-started?industry=saas-tech">Book a Live Demo</Link>
                </Button>
              </div>
            </ScrollReveal>

            {/* Right — SaaS dashboard illustration + live call preview */}
            <ScrollReveal delay={0.14}>
              <div className="relative mx-auto w-full max-w-[620px]">
                {/* Agent console — dynamic, continuing chat; the console itself is the card now */}
                <SaasAgentConsole />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Never lose a customer opportunity ─── */}
      <section className="w-full px-6 pb-10 md:px-8 md:pb-14">
        <ScrollReveal className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-start">
            <h2 className="text-balance font-sans text-2xl font-bold tracking-tight text-slate-900 sm:text-[1.75rem]">
              Never lose a customer opportunity.
            </h2>
            <div>
              <p className="max-w-2xl text-pretty text-[14.5px] leading-relaxed text-slate-600">
                AI agents answer product questions, qualify inbound leads, book demos, recover abandoned trials, and
                guide customers through onboarding — without human intervention.
              </p>
              <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {OPPORTUNITY_ITEMS.map((line) => (
                  <li key={line} className="flex items-center gap-2.5">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                      <Check className="size-3" aria-hidden />
                    </span>
                    <span className="text-pretty text-[13.5px] leading-snug text-slate-700">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── What the AI agent does + Smarter support ─── */}
      <section className="w-full px-6 pb-10 md:px-8 md:pb-14">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          {/* Left — day-one jobs */}
          <ScrollReveal>
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-blue-400 bg-blue-50/30 p-7 shadow-sm sm:p-9">
              <h2 className="font-sans text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.65rem]">
                What the AI Agent Does on Day One
              </h2>
              <span aria-hidden className="mt-3 block h-1 w-14 rounded-full bg-blue-600" />

              <ol className="mt-6 space-y-3">
                {DAY_ONE_JOBS.map((job) => (
                  <li
                    key={job.text}
                    className="flex items-center gap-3.5 rounded-2xl border border-blue-100/70 bg-white px-5 py-3.5 shadow-[0_2px_10px_-4px_rgba(2,132,199,0.08)]"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-100 text-blue-600">
                      <job.Icon className="size-4" aria-hidden />
                    </span>
                    <span className="text-pretty text-[14px] leading-snug text-slate-700">{job.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </ScrollReveal>

          {/* Right — smarter support panel with robot */}
          <ScrollReveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-blue-400 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-7 shadow-sm sm:p-9">
              <h2 className="font-sans text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.65rem]">
                Smarter support.
                <br />
                Faster growth.
              </h2>
              <span aria-hidden className="mt-3 block h-1 w-14 rounded-full bg-blue-600" />

              <p className="mt-4 text-pretty text-[14px] leading-relaxed text-slate-600">
                Your AI voice agent acts as a sales rep, onboarding specialist, and support assistant — available
                around the clock.
              </p>

              <ul className="mt-5 space-y-2.5">
                {SUPPORT_ITEMS.map((line) => (
                  <li key={line} className="flex items-center gap-2.5">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                      <Check className="size-3" aria-hidden />
                    </span>
                    <span className="text-pretty text-[13.5px] leading-snug text-slate-700">{line}</span>
                  </li>
                ))}
              </ul>

              {/* Robot mascot */}
              <div className="relative mt-6 flex h-28 items-center justify-end">
                <div aria-hidden className="absolute right-6 -top-2 size-24 rounded-full bg-blue-200/40 blur-2xl" />
                <div className="relative flex flex-col items-center">
                  <span className="size-2 rounded-full bg-blue-500" aria-hidden />
                  <span className="h-3 w-[2px] bg-blue-300" aria-hidden />
                  <div className="grid size-14 place-items-center rounded-2xl bg-white shadow-lg">
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full bg-blue-600" aria-hidden />
                      <span className="size-2.5 rounded-full bg-blue-600" aria-hidden />
                    </div>
                  </div>
                  <span className="h-1.5 w-4 bg-blue-200" aria-hidden />
                  <div className="flex h-9 w-20 items-start justify-center rounded-2xl bg-gradient-to-b from-blue-600 to-indigo-600 pt-2 shadow-lg">
                    <span className="grid size-5 place-items-center rounded-full bg-white text-blue-600">
                      <Headphones className="size-3" aria-hidden />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Performance + How it sounds ─── */}
      <section className="w-full px-6 pb-10 md:px-8 md:pb-14">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,360px)_1fr]">
          {/* Performance card */}
          <ScrollReveal>
            <div className="overflow-hidden rounded-[2rem] border border-blue-400 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-full bg-blue-100 text-blue-600">
                  <TrendingUp className="size-4.5" aria-hidden />
                </span>
                <p className="text-[15px] font-bold text-slate-900">Performance that drives growth</p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-5">
                {[
                  { Icon: Zap, value: "< 3 sec", label: "First response time" },
                  { Icon: TrendingUp, value: "Up to 40", label: "Concurrent calls" },
                  { Icon: CalendarCheck, value: "24/7", label: "Always available" },
                  { Icon: MessageCircle, value: "98%", label: "Customer satisfaction" },
                  { Icon: ShieldCheck, value: "99.9%", label: "Uptime" },
                  { Icon: Globe, value: "10+", label: "Languages supported" },
                ].map((s) => (
                  <div key={s.label} className="flex items-start gap-2.5">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600">
                      <s.Icon className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="font-sans text-lg font-bold tracking-tight text-slate-900">{s.value}</p>
                      <p className="text-[11px] font-medium leading-snug text-slate-500">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* How the agent actually sounds */}
          <ScrollReveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-blue-400 bg-blue-50/30 p-7 shadow-sm sm:p-9">
              <h2 className="font-sans text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.65rem]">
                How the Agent Actually Sounds
              </h2>
              <span aria-hidden className="mt-3 block h-1 w-14 rounded-full bg-blue-600" />

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_-18px_rgba(2,132,199,0.25)]">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Play sample"
                    className="grid size-9 shrink-0 place-items-center rounded-full bg-blue-600 text-white shadow-md shadow-blue-600/25"
                  >
                    <Play className="size-4 fill-white" aria-hidden />
                  </button>
                  <div className="flex h-6 flex-1 items-end gap-[2px]" aria-hidden>
                    {Array.from({ length: 34 }).map((_, i) => (
                      <span
                        key={i}
                        style={{ height: `${6 + ((i * 7) % 18)}px`, animationDelay: `${(i % 8) * 0.1}s` }}
                        className={`ind-eq w-[2px] rounded-full ${i < 10 ? "bg-blue-500" : "bg-slate-200"}`}
                      />
                    ))}
                  </div>
                  <span className="shrink-0 text-[11px] font-medium text-slate-400">0:00 / 0:32</span>
                </div>

                <div className="mt-4 space-y-2.5">
                  <p className="max-w-[90%] rounded-xl rounded-tl-sm bg-slate-50 border border-slate-200 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-slate-700">
                    Hi, I&apos;m evaluating your software for my team.
                  </p>
                  <p className="ml-auto max-w-[90%] rounded-xl rounded-tr-sm bg-blue-50 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-blue-800">
                    Great! I&apos;d be happy to help. How many users are you planning to onboard?
                  </p>
                  <p className="max-w-[85%] rounded-xl rounded-tl-sm border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-slate-700">
                    Around 50 employees.
                  </p>
                  <p className="ml-auto max-w-[90%] rounded-xl rounded-tr-sm bg-blue-50 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-blue-800">
                    Perfect. Based on that size, our Growth plan would be a good fit. Would you like me to schedule a
                    personalized demo?
                  </p>
                  <p className="max-w-[85%] rounded-xl rounded-tl-sm border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-slate-700">
                    Yes, tomorrow afternoon.
                  </p>
                  <p className="ml-auto max-w-[90%] rounded-xl rounded-tr-sm bg-blue-50 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-blue-800">
                    Done! I&apos;ve booked your demo and sent the calendar invite.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Why SaaS teams choose 9278.io ─── */}
      <section className="w-full bg-blue-50/40 px-6 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="text-balance font-sans text-2xl font-bold tracking-tight text-slate-900 sm:text-[1.75rem]">
              Why SaaS Teams Choose 9278.io
            </h2>
          </ScrollReveal>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {WHY_ITEMS.map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 0.05}>
                <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-blue-400 bg-white p-4 text-center shadow-sm">
                  <span className="grid size-11 place-items-center rounded-full bg-blue-100 text-blue-600">
                    <item.Icon className="size-5" aria-hidden />
                  </span>
                  <p className="text-[12px] font-semibold leading-snug text-slate-700">{item.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <PricingCta
        heading="Let AI handle conversations while your team builds products."
        description="Deploy a voice agent in minutes and automate sales, onboarding, and customer support from a single platform. No setup headaches, go live in minutes, and scale instantly."
        primaryHref="/get-started?industry=saas-tech"
        primaryLabel="Launch SaaS AI Agent"
        secondaryHref="/get-started?industry=saas-tech"
        secondaryLabel="Book a Live Demo"
      />

      {/* ─── Other industries we power ─── */}
      <section className="w-full px-6 pb-14 md:px-8 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance font-sans text-[1.6rem] font-semibold tracking-tight md:text-3xl">
              Other industries we power
            </h2>
            <p className="mt-2.5 text-pretty text-[13.5px] leading-relaxed text-muted-foreground">
              Pre-tuned playbooks for the calls your peers in adjacent verticals already automate.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
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
                icon: TrendingUp,
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
                    className="group relative block h-full overflow-hidden rounded-xl border border-l-4 border-l-primary border-slate-200 bg-gradient-to-br from-slate-50/60 to-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <span
                      aria-hidden
                      className="absolute right-0 top-0 h-10 w-10 bg-primary [clip-path:polygon(100%_0,0_0,100%_100%)]"
                    />

                    <div aria-hidden className="absolute right-4 top-10 grid grid-cols-4 gap-1 opacity-60">
                      {Array.from({ length: 16 }).map((_, d) => (
                        <span key={d} className="size-1 rounded-full bg-slate-300" />
                      ))}
                    </div>

                    <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                      <LinkIcon className="size-4.5" aria-hidden />
                    </span>

                    <h3 className="mt-3 text-balance font-sans text-[15px] font-bold leading-snug tracking-tight text-foreground">
                      {link.titlePrefix}
                      {link.titlePrefix ? <span className="text-primary">{link.highlight}</span> : link.highlight}
                    </h3>
                    <span aria-hidden className="mt-2 block h-1 w-7 rounded-full bg-primary" />
                    <p className="mt-2 text-pretty text-[12.5px] leading-relaxed text-muted-foreground">{link.description}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[12.5px] font-semibold text-primary">Read more</span>
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-white shadow-md transition-transform duration-300 group-hover:translate-x-0.5">
                        <ArrowRight className="size-3" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      </main>
      <SiteFooter />
    </>
  )
}
