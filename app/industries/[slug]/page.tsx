import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  Clock,
  Phone,
  ShieldCheck,
  Sparkles,
  Wallet,
  ShoppingBag,
  Volume2,
  Play,
  TrendingUp,
  Globe,
  Zap,
  Package,
  BarChart3,
  Users,
  Rocket,
  MessageCircle,
  HelpCircle,
  Home,
  CalendarCheck,
  UserCheck,
  Bot,
  Mic,
  Headphones,
  Building2,
  Briefcase,
  Wrench,
  Droplet,
  Fan,
  Search,
  Bell,
  MapPin,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal, ScrollStepItem } from "@/components/animation/scroll-reveal"
import { CenterOutItem } from "@/components/industries/center-out-reveal"
import { IndustryImage } from "@/components/industries/industry-image"
import { INDUSTRIES, getIndustry, getRelatedIndustries, CAP_COLORS } from "@/lib/industries"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/jsonld"
import { RestaurantRobotMascot } from "@/components/industries/restaurant-robot-mascot"
import { RestaurantReservationCard, RestaurantChatCard } from "@/components/industries/restaurant-reservation-widget"
import { ConversationPreviewChat } from "@/components/industries/conversation-preview-chat"
import { SoundSampleChat } from "@/components/industries/sound-sample-chat"
import { EcommercePerformanceChart } from "@/components/industries/ecommerce-performance-chart"
import { EcommerceHeroVisual } from "@/components/industries/ecommerce-hero-visual"
import { ImagePlaceholderSection } from "@/components/industries/image-placeholder-section"
import { BfsiPage } from "@/components/industries/bfsi-page"
import { BpoPage } from "@/components/industries/bpo-page"
import { PricingCta } from "@/components/pricing/pricing-cta"

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const industry = getIndustry(slug)
  if (!industry) return {}

  return pageSeo({
    title: `AI voice agents for ${industry.name.toLowerCase()}`,
    description: industry.short,
    path: `/industries/${industry.slug}`,
  })
}

const ECOM_CAP_COLORS: Record<string, string> = {
  "Inbound":          "border-sky-500/25 bg-sky-500/10 text-sky-600",
  "24/7 Calling":     "border-emerald-500/25 bg-emerald-500/10 text-emerald-600",
  "Hindi & Regional": "border-blue-500/25 bg-blue-500/10 text-blue-600",
  "Lead Qualify":     "border-purple-500/25 bg-purple-500/10 text-purple-600",
  "TRAI Compliant":   "border-red-500/25 bg-red-500/10 text-red-600",
  "Appointment":      "border-cyan-500/25 bg-cyan-500/10 text-cyan-600",
  "EMI Reminder":     "border-yellow-500/25 bg-yellow-500/10 text-yellow-600",
  "DPDP Ready":       "border-pink-500/25 bg-pink-500/10 text-pink-600",
  "Multilingual":     "border-blue-500/25 bg-blue-500/10 text-blue-600",
}

function ECommercePage() {
  const industry = getIndustry("ecommerce")!
  const Icon = ShoppingBag
  const related = getRelatedIndustries("ecommerce")

  return (
    <>
      <SiteHeader />
      <main className="min-h-dvh bg-white text-slate-900" style={{ zoom: 0.9 }}>

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: "E-commerce", path: "/industries/ecommerce" },
        ]}
      />
      <ServiceJsonLd
        name="AI voice agents for e-commerce"
        description={industry.pitch}
        path="/industries/ecommerce"
        serviceType="AI voice agent"
      />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-sky-50/30 to-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(37,99,235,0.22),rgba(14,165,233,0.08)_55%,transparent_75%)]"
        />
        <div aria-hidden className="pointer-events-none absolute -left-24 top-6 -z-10 size-80 rounded-full bg-blue-400/18 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-20 top-36 -z-10 size-96 rounded-full bg-sky-400/18 blur-3xl" />
        {/* Dotted grid pattern like reference */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(37,99,235,0.18) 1px, transparent 1.2px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="w-full px-6 pt-6 pb-12 md:px-8 md:pt-8 md:pb-16">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-10">
            {/* Left — copy */}
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white/90 py-1.5 pl-1.5 pr-5 text-[14px] font-medium text-blue-700 shadow-sm backdrop-blur">
                <span className="grid size-6 place-items-center rounded-full bg-blue-100 text-blue-600">
                  <Sparkles className="size-3.5" aria-hidden />
                </span>
                AI Voice Agents for Modern Businesses
              </span>

              <h1 className="mt-10 text-[44px] font-extrabold md:text-[60px] lg:text-[72px]" style={{ lineHeight: 0.95, letterSpacing: "-2px" }}>
                <span style={{ color: "#0F172A" }}>AI Voice Agents</span>
                <br />
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  for E-Commerce.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-pretty text-[16.5px] leading-[1.75] text-slate-600 md:text-lg">
                Handle every customer call instantly—even during flash sales and viral traffic spikes. 9278.io
                automates order updates, returns, and upsells, escalating only complex issues while answering in
                the customer's preferred language.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {/* Inbound */}
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/95 px-4 py-2 text-[13px] font-semibold text-blue-700 shadow-sm">
                  <Phone className="size-4 text-blue-600" aria-hidden />
                  Inbound
                </span>
                {/* 24/7 Calling — GREEN as per reference */}
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/90 px-4 py-2 text-[13px] font-semibold text-emerald-700 shadow-sm">
                  <Clock className="size-4 text-emerald-600" aria-hidden />
                  24/7 Calling
                </span>
                {/* Hindi & Regional */}
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/95 px-4 py-2 text-[13px] font-semibold text-blue-700 shadow-sm">
                  <Globe className="size-4 text-blue-600" aria-hidden />
                  Hindi &amp; Regional
                </span>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                {/* Get Started — purple gradient pill with arrow on RIGHT */}
                <Button
                  asChild
                  size="lg"
                  className="group h-auto rounded-full bg-gradient-to-r from-blue-600 to-sky-600 px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.65)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(37,99,235,0.75)]"
                >
                  <Link href="/get-started?industry=ecommerce">
                    Get Started
                    <span className="ml-2 inline-flex size-6 items-center justify-center rounded-full bg-white/20">
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </Link>
                </Button>
                {/* View Pricing — white pill, play before text */}
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-auto rounded-full border-slate-200 bg-white/95 px-6 py-3.5 text-[15px] font-bold text-slate-800 shadow-sm hover:border-blue-300 hover:bg-blue-50/60 hover:text-blue-700"
                >
                  <Link href="/pricing">
                    <Play className="mr-2 size-4 fill-slate-800 group-hover:fill-blue-700" aria-hidden />
                    View Pricing
                  </Link>
                </Button>
              </div>
            </ScrollReveal>

            {/* Right — circular voice-AI orbit hero visual */}
            <ScrollReveal delay={0.14}>
              <EcommerceHeroVisual />
            </ScrollReveal>
          </div>
        </div>

        {/* ─── Stats bar (directly under hero, inside hero section per reference) ─── */}
        <div className="w-full px-6 pb-10 md:px-8 md:pb-14">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-blue-400 bg-white/95 px-3 py-3 shadow-[0_20px_50px_-25px_rgba(2,132,199,0.35)] backdrop-blur">
              <div className="grid grid-cols-1 divide-y divide-slate-200/70 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
                {[
                  {
                    Icon: Zap,
                    label: "First-touch response",
                    value: "< 3 Seconds",
                    iconBg: "bg-blue-100 text-blue-600",
                  },
                  {
                    Icon: Phone,
                    label: "Concurrent calls",
                    value: "Up to 40",
                    iconBg: "bg-emerald-100 text-emerald-600",
                  },
                  {
                    Icon: Wallet,
                    label: "Per-minute rate",
                    value: "From ₹10",
                    iconBg: "bg-sky-100 text-sky-600",
                  },
                  {
                    Icon: ShieldCheck,
                    label: "Uptime reliability",
                    value: "99.9%",
                    iconBg: "bg-blue-100 text-blue-600",
                  },
                ].map(({ Icon: StatIcon, label, value, iconBg }, i) => (
                  <ScrollStepItem
                    key={label}
                    index={i}
                    className="group flex items-center gap-4 px-5 py-4 transition-colors duration-300 hover:bg-blue-50/40 sm:px-6 sm:py-5"
                  >
                    <span className={`grid size-11 shrink-0 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${iconBg}`}>
                      <StatIcon className="size-6" aria-hidden />
                    </span>
                    <div>
                      <p className="font-sans text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                        {value}
                      </p>
                      <p className="mt-0.5 text-[12.5px] font-medium text-slate-500">{label}</p>
                    </div>
                  </ScrollStepItem>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── What agent does + How it sounds ─── */}
      <section className="w-full px-6 pb-8 pt-6 md:px-8 md:pb-10 md:pt-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {/* Left — day-one jobs */}
          <ScrollStepItem index={0}>
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-blue-400 bg-gradient-to-br from-blue-50/90 via-white to-sky-50/60 p-7 shadow-sm sm:p-9">
              {/* Shopping bag accent */}
              <div className="absolute -right-2 -top-2 opacity-90">
                <div className="grid size-20 place-items-center rounded-3xl bg-gradient-to-br from-blue-500 to-sky-500 text-white shadow-lg shadow-blue-500/30">
                  <ShoppingBag className="size-10" aria-hidden />
                </div>
              </div>

              <h2 className="font-sans text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.75rem]">
                What the agent does
                <br />
                on day one
              </h2>

              <div className="mt-8 space-y-3.5">
                {industry.jobs.map((job, i) => (
                  <ScrollStepItem
                    key={job}
                    index={i}
                    className="flex items-center gap-3.5 rounded-2xl border border-blue-100/70 bg-white/90 px-5 py-3.5 shadow-[0_2px_10px_-4px_rgba(2,132,199,0.1)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-600/10"
                  >
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-sky-600 text-white shadow-md shadow-blue-500/25">
                      <Check className="size-3.5" aria-hidden />
                    </span>
                    <span className="text-pretty text-[14.5px] leading-relaxed text-slate-700">{job}</span>
                  </ScrollStepItem>
                ))}
              </div>
            </div>
          </ScrollStepItem>

          {/* Right — how agent sounds */}
          <ScrollStepItem index={1}>
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-blue-400 bg-gradient-to-br from-sky-50/80 via-white to-blue-50/60 p-7 shadow-sm sm:p-9">
              {/* Sound-wave accent */}
              <div className="absolute -right-2 -top-2 opacity-90">
                <div className="grid size-20 place-items-center rounded-3xl bg-gradient-to-br from-sky-500 to-blue-500 text-white shadow-lg shadow-sky-500/30">
                  <Volume2 className="size-9" aria-hidden />
                </div>
              </div>

              <h2 className="font-sans text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.75rem]">
                How the agent
                <br />
                actually sounds
              </h2>

              <p className="mt-5 text-pretty text-[14.5px] leading-relaxed text-slate-600">
                Real lines, real tone — in e-commerce deployments — generated in real time with sub-second latency and
                natural emotion.
              </p>

              {/* Live agent preview panel */}
              <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_-18px_rgba(2,132,199,0.25)]">
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-blue-50/80 via-sky-50/60 to-transparent px-5 py-3.5">
                  <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" aria-hidden />
                    Live Agent Preview
                  </p>
                  <div className="flex h-5 items-end gap-[2px]" aria-hidden>
                    {[7, 13, 9, 15, 11, 8, 14].map((h, i) => (
                      <span
                        key={i}
                        style={{ height: `${h}px`, animationDelay: `${(i % 5) * 0.12}s` }}
                        className="ind-eq w-1 rounded-full bg-gradient-to-t from-blue-500 to-sky-500"
                      />
                    ))}
                  </div>
                </div>

                <SoundSampleChat
                  labeled
                  height={230}
                  messages={[
                    { from: "agent", text: "👋 Hello! What can I help you with today?" },
                    { from: "customer", text: "Can you track my order?" },
                    { from: "agent", text: "Sure! Order #4521 shipped yesterday and arrives by 6 PM tomorrow." },
                    { from: "customer", text: "Great — can I also return a pair of shoes from my last order?" },
                    { from: "agent", text: "Absolutely — I'll email a prepaid return label right now." },
                  ]}
                />
              </div>
            </div>
          </ScrollStepItem>
        </div>
      </section>

      {/* ─── How teams roll out — two-step process ─── */}
      <section className="w-full px-6 pb-8 pt-6 md:px-8 md:pb-10 md:pt-8">
        <div className="mx-auto max-w-6xl">
          <ScrollStepItem className="flex items-start gap-4">
            <span className="relative shrink-0">
              <span aria-hidden className="absolute -left-4 top-1 h-10 w-px bg-primary" />
              <span className="grid size-14 place-items-center rounded-full border border-primary/20 bg-white text-primary shadow-sm">
                <Rocket className="size-6" aria-hidden />
              </span>
            </span>
            <div>
              <h2 className="text-balance font-sans text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                How e-commerce
                <br />
                teams roll out 9278.io
              </h2>
              <span aria-hidden className="mt-4 block h-1 w-16 rounded-full bg-primary" />
            </div>
          </ScrollStepItem>

          <div className="relative mt-10 grid gap-8 md:grid-cols-2 md:gap-10">
            {/* connector arrow between the two phases (desktop) */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:grid md:size-14 md:place-items-center md:rounded-full md:border md:border-dashed md:border-primary/40 md:bg-white md:text-primary md:shadow-md"
            >
              <ArrowRight className="size-5" />
            </div>

            <ScrollStepItem index={0}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-blue-400 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-8">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-gradient-to-r from-blue-600 to-sky-600 px-4 py-1.5 text-sm font-bold text-white shadow-md shadow-blue-600/25">
                    01
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                  <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-primary" />
                </div>
                <span className="mt-6 grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Package className="size-6" aria-hidden />
                </span>
                <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                  Most e-commerce customers start by{" "}
                  <Link href="/get-started" className="font-semibold text-primary underline-offset-4 hover:underline">
                    spinning up a Starter agent
                  </Link>{" "}
                  with a single phone number, then upgrade to{" "}
                  <Link href="/pricing" className="font-semibold text-primary underline-offset-4 hover:underline">
                    Growth or Scale
                  </Link>{" "}
                  once the inbound playbooks prove out.
                </p>
              </div>
            </ScrollStepItem>

            <ScrollStepItem index={1}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-blue-400 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-8">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-white shadow-md shadow-primary/25">
                    02
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                  <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-primary" />
                </div>
                <span className="mt-6 grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <MessageCircle className="size-6" aria-hidden />
                </span>
                <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                  Curious about voice credit, phone numbers, or compliance? The{" "}
                  <Link href="/faq" className="font-semibold text-primary underline-offset-4 hover:underline">
                    FAQ
                  </Link>{" "}
                  answers the questions e-commerce ops teams ask most — and you can browse{" "}
                  <Link href="/industries" className="font-semibold text-primary underline-offset-4 hover:underline">
                    every other industry
                  </Link>{" "}
                  we support to compare playbooks.
                </p>
              </div>
            </ScrollStepItem>
          </div>

          <ScrollStepItem>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-auto rounded-full bg-primary px-7 py-3.5 text-base text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5 hover:bg-primary/90"
              >
                <Link href="/get-started?industry=ecommerce">
                  <Rocket className="mr-1.5 size-5" aria-hidden />
                  Launch a e-commerce agent
                  <ArrowRight className="ml-1.5 size-5" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-auto rounded-full px-7 py-3.5 text-base transition-transform hover:-translate-y-0.5"
              >
                <Link href="/faq">
                  <HelpCircle className="mr-1.5 size-5" aria-hidden />
                  Read the FAQ
                </Link>
              </Button>
            </div>
          </ScrollStepItem>
        </div>
      </section>

      {/* ─── AI agents that grow with you ─── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50/60 via-sky-50/40 to-sky-50/50 px-6 pb-16 pt-6 md:px-8 md:pb-24 md:pt-8">
        <div aria-hidden className="pointer-events-none absolute -left-24 top-16 -z-10 size-72 rounded-full bg-blue-400/15 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 -z-10 size-80 rounded-full bg-sky-400/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left — copy */}
          <ScrollStepItem index={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-blue-700 shadow-sm backdrop-blur">
              <Sparkles className="size-3.5" aria-hidden />
              The smarter way to scale
            </span>
            <h2 className="mt-5 text-balance font-sans text-4xl font-bold tracking-tight text-slate-900 sm:text-[2.6rem]">
              AI agents that{" "}
              <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-blue-600 bg-clip-text text-transparent">
                grow with you
              </span>
            </h2>

            <div className="mt-7 space-y-3.5">
              {[
                "Lower support costs",
                "Happier customers",
                "Higher repeat purchases",
                "Always-on availability",
              ].map((line, i) => (
                <ScrollStepItem key={line} index={i} className="flex items-center gap-3.5">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-sky-600 text-white shadow-md shadow-blue-500/25">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  <span className="text-pretty text-[15px] leading-relaxed text-slate-700 font-medium">{line}</span>
                </ScrollStepItem>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="group mt-9 h-auto rounded-full bg-gradient-to-r from-blue-600 to-sky-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/40"
            >
              <Link href="/get-started?industry=ecommerce">
                Launch an e-commerce agent
                <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </Button>
          </ScrollStepItem>

          {/* Right — performance dashboard mock */}
          <ScrollStepItem index={1}>
            <div className="relative">
              {/* +32% floating badge */}
              <div className="absolute -bottom-5 -right-3 z-20 hero-float-up">
                <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-[0_15px_35px_-12px_rgba(2,132,199,0.35)] ring-1 ring-blue-100">
                  <span className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-sky-500 text-white">
                    <TrendingUp className="size-4" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-blue-700 leading-none">+32%</p>
                    <p className="text-[10px] font-medium text-slate-500 mt-0.5">vs. last month</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-blue-400 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(2,132,199,0.35)] sm:p-8">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <span className="grid size-5 place-items-center rounded-md bg-blue-100 text-blue-600">
                    <ShieldCheck className="size-3" aria-hidden />
                  </span>
                  Real-time performance
                </p>

                <EcommercePerformanceChart />
              </div>
            </div>
          </ScrollStepItem>
        </div>
      </section>

      <ImagePlaceholderSection
        src="/images/industries/ecommerce-shopping.png"
        alt="Online shopping and checkout experience with cart, packages, and secure payment"
        heading="Every order, tracked from cart to doorstep."
        paragraph="9278.io answers order status, returns, and sizing questions instantly — even during flash sales — so your support team only steps in for the calls that really need them."
      />

      <PricingCta
        heading="Let AI handle calls so your team can focus on growing sales."
        description="Launch your AI voice agent in minutes. No setup headaches."
        primaryHref="/get-started?industry=ecommerce"
        primaryLabel="Launch an e-commerce agent"
        secondaryHref="/get-started?industry=ecommerce"
        secondaryLabel="Talk to our expert"
      />

      {/* ─── Other industries we power ─── */}
      <section className="w-full px-6 pb-14 md:px-8 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <ScrollStepItem className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance font-sans text-[1.6rem] font-semibold tracking-tight md:text-3xl">
              Other industries we power
            </h2>
            <p className="mt-2.5 text-pretty text-[13.5px] leading-relaxed text-muted-foreground">
              Pre-tuned playbooks for the calls your peers in adjacent verticals already automate.
            </p>
          </ScrollStepItem>

          <div className="mt-12 grid gap-x-5 gap-y-7 overflow-x-clip sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => ({
              href: `/industries/${r.slug}`,
              titlePrefix: "AI voice agents for ",
              highlight: r.name.toLowerCase(),
              description: r.short,
              icon: r.icon,
            })).map((link, i) => {
              const a = {
                border: "border-l-primary",
                tile: "bg-primary/10 text-primary",
                text: "text-primary",
                ribbon: "bg-primary",
                btn: "bg-primary",
              }
              const LinkIcon = link.icon
              const position = i === 0 ? "left" : i === 2 ? "right" : "middle"

              return (
                <CenterOutItem key={link.href} position={position}>
                  <Link
                    href={link.href}
                    className={`group relative block h-full overflow-hidden rounded-xl border border-l-4 border-slate-200 bg-gradient-to-br from-slate-50/60 to-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:-translate-y-1 active:shadow-lg ${a.border}`}
                  >
                    {/* corner ribbon */}
                    <span
                      aria-hidden
                      className={`absolute right-0 top-0 h-10 w-10 [clip-path:polygon(100%_0,0_0,100%_100%)] ${a.ribbon}`}
                    />

                    {/* dotted decoration */}
                    <div aria-hidden className="absolute right-4 top-10 grid grid-cols-4 gap-1 opacity-60">
                      {Array.from({ length: 16 }).map((_, d) => (
                        <span key={d} className="size-1 rounded-full bg-slate-300" />
                      ))}
                    </div>

                    <span className={`grid size-9 place-items-center rounded-lg ${a.tile}`}>
                      <LinkIcon className="size-4.5" aria-hidden />
                    </span>

                    <h3 className="mt-3 text-balance font-sans text-[15px] font-bold leading-snug tracking-tight text-foreground">
                      {link.titlePrefix}
                      {link.titlePrefix ? <span className={a.text}>{link.highlight}</span> : link.highlight}
                    </h3>
                    <span aria-hidden className={`mt-2 block h-1 w-7 rounded-full ${a.ribbon}`} />
                    <p className="mt-2 text-pretty text-[12.5px] leading-relaxed text-muted-foreground">{link.description}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className={`text-[12.5px] font-semibold ${a.text}`}>Read more</span>
                      <span
                        className={`grid size-7 shrink-0 place-items-center rounded-full text-white shadow-md transition-transform duration-300 group-hover:translate-x-0.5 ${a.btn}`}
                      >
                        <ArrowRight className="size-3" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </CenterOutItem>
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

function RealEstatePage() {
  const industry = getIndustry("real-estate")!
  const related = getRelatedIndustries("real-estate")

  return (
    <>
      <SiteHeader />
      <main className="min-h-dvh bg-white text-slate-900" style={{ zoom: 0.9 }}>

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: "Real estate", path: "/industries/real-estate" },
        ]}
      />
      <ServiceJsonLd
        name="AI voice agents for real estate"
        description={industry.pitch}
        path="/industries/real-estate"
        serviceType="AI voice agent"
      />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-sky-50/30 to-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(37,99,235,0.22),rgba(14,165,233,0.08)_55%,transparent_75%)]"
        />
        <div aria-hidden className="pointer-events-none absolute -left-24 top-6 -z-10 size-80 rounded-full bg-blue-400/18 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-20 top-36 -z-10 size-96 rounded-full bg-sky-400/18 blur-3xl" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.18) 1px, transparent 1.2px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="w-full px-6 pt-6 pb-12 md:px-8 md:pt-8 md:pb-16">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-10">
            {/* Left — copy */}
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white/90 py-1.5 pl-1.5 pr-5 text-[14px] font-medium text-blue-700 shadow-sm backdrop-blur">
                <span className="grid size-6 place-items-center rounded-full bg-blue-100 text-blue-600">
                  <Sparkles className="size-3.5" aria-hidden />
                </span>
                AI Voice Agents for Modern Businesses
              </span>

              <h1 className="mt-10 text-[44px] font-extrabold md:text-[60px] lg:text-[72px]" style={{ lineHeight: 0.95, letterSpacing: "-2px" }}>
                <span style={{ color: "#0F172A" }}>AI Voice Agents</span>
                <br />
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  for Real Estate.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-pretty text-[16.5px] leading-[1.75] text-slate-600 md:text-lg">
                {industry.pitch}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/90 px-4 py-2 text-[13px] font-semibold text-emerald-700 shadow-sm">
                  <Clock className="size-4 text-emerald-600" aria-hidden />
                  24/7 Calling
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/95 px-4 py-2 text-[13px] font-semibold text-blue-700 shadow-sm">
                  <UserCheck className="size-4 text-blue-600" aria-hidden />
                  Lead Qualify
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/95 px-4 py-2 text-[13px] font-semibold text-blue-700 shadow-sm">
                  <CalendarCheck className="size-4 text-blue-600" aria-hidden />
                  Appointment
                </span>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <Button
                  asChild
                  size="lg"
                  className="group h-auto rounded-full bg-gradient-to-r from-blue-600 to-sky-600 px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.65)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(37,99,235,0.75)]"
                >
                  <Link href="/get-started?industry=real-estate">
                    Get Started
                    <span className="ml-2 inline-flex size-6 items-center justify-center rounded-full bg-white/20">
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-auto rounded-full border-slate-200 bg-white/95 px-6 py-3.5 text-[15px] font-bold text-slate-800 shadow-sm hover:border-blue-300 hover:bg-blue-50/60 hover:text-blue-700"
                >
                  <Link href="/pricing">
                    <Play className="mr-2 size-4 fill-slate-800 group-hover:fill-blue-700" aria-hidden />
                    View Pricing
                  </Link>
                </Button>
              </div>
            </ScrollReveal>

            {/* Right — Picture 1: real property photo with floating status chips */}
            <ScrollReveal delay={0.14}>
              <div className="relative mx-auto w-full max-w-[560px]">
                <div className="relative overflow-hidden rounded-[2rem] shadow-xl shadow-slate-900/10">
                  <IndustryImage slug="real-estate" name="Real estate" />
                </div>

                <div className="absolute -left-4 top-6 z-20 hero-float-up">
                  <div className="rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-[0_14px_40px_-14px_rgba(2,132,199,0.35)] backdrop-blur-md ring-1 ring-blue-100/60">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-blue-500/10 to-sky-500/10 text-blue-600">
                        <Home className="size-5" aria-hidden />
                      </span>
                      <div>
                        <p className="text-[12.5px] font-bold text-slate-800 leading-tight">New Lead</p>
                        <p className="text-[11px] font-medium text-slate-500">Qualifying</p>
                      </div>
                      <span className="ml-1 grid size-4 place-items-center rounded-full bg-emerald-500">
                        <Check className="size-2.5 text-white" aria-hidden />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-4 -top-4 z-20 ind-float">
                  <div className="rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-[0_14px_40px_-14px_rgba(2,132,199,0.35)] backdrop-blur-md ring-1 ring-blue-100/60">
                    <p className="text-[13px] font-bold text-blue-700 leading-tight">AI Voice Agent</p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <p className="text-[10.5px] font-medium text-slate-500">Listening…</p>
                      <div className="flex h-3 items-end gap-[1.5px]" aria-hidden>
                        {[7, 11, 6, 13, 9, 14, 8, 12, 7, 10, 5, 11].map((h, i) => (
                          <span
                            key={i}
                            style={{
                              height: `${h}px`,
                              animationDelay: `${(i % 6) * 0.1}s`,
                              background: "linear-gradient(to top, rgb(37,99,235), rgb(14,165,233))",
                            }}
                            className="ind-eq w-[2.5px] rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -left-6 top-[48%] z-20 hero-float-down">
                  <div className="rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-[0_14px_40px_-14px_rgba(2,132,199,0.35)] backdrop-blur-md ring-1 ring-blue-100/60">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-blue-500/10 to-sky-500/10 text-blue-600">
                        <CalendarCheck className="size-5" aria-hidden />
                      </span>
                      <div>
                        <p className="text-[12.5px] font-bold text-slate-800 leading-tight">Site Visit</p>
                        <p className="text-[11px] font-medium text-slate-500">Booked</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-6 bottom-10 z-20 ind-float">
                  <div className="rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-[0_14px_40px_-14px_rgba(2,132,199,0.35)] backdrop-blur-md ring-1 ring-blue-100/60">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-blue-500/10 to-sky-500/10 text-blue-600">
                        <UserCheck className="size-5" aria-hidden />
                      </span>
                      <div>
                        <p className="text-[12.5px] font-bold text-slate-800 leading-tight">Buyer</p>
                        <p className="text-[11px] font-medium text-slate-500">Qualified</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

      </section>

      {/* ─── What agent does + How it sounds ─── */}
      <section className="w-full px-6 pb-8 pt-6 md:px-8 md:pb-10 md:pt-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {/* Left — day-one jobs */}
          <ScrollStepItem index={0}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-blue-400 bg-gradient-to-br from-blue-50/70 via-white to-blue-50/40 p-7 shadow-sm sm:p-9">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400 bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-700 shadow-sm">
                <Sparkles className="size-3.5" aria-hidden />
                Day one. Done right.
              </span>

              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-balance font-sans text-[1.9rem] font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-3xl">
                    What the agent
                    <br />
                    does on <span className="text-blue-600">day one</span>
                  </h2>
                  <p className="mt-3 max-w-xs text-pretty text-[14px] leading-relaxed text-slate-500">
                    Everything your team hands off. Everything your agent handles.
                  </p>
                </div>

                {/* Robot illustration with orbiting capability icons */}
                <div className="relative hidden size-28 shrink-0 sm:block">
                  <div aria-hidden className="absolute inset-0 rounded-full border border-dashed border-blue-200" />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="grid size-16 place-items-center rounded-3xl bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/30">
                      <Bot className="size-8" aria-hidden />
                    </div>
                  </div>
                  <span className="absolute -left-1 top-1 grid size-7 place-items-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm ring-1 ring-white hero-float-up">
                    <Phone className="size-3.5" aria-hidden />
                  </span>
                  <span className="absolute -right-1 top-3 grid size-7 place-items-center rounded-full bg-violet-100 text-violet-600 shadow-sm ring-1 ring-white ind-float">
                    <Users className="size-3.5" aria-hidden />
                  </span>
                  <span className="absolute -left-2 bottom-2 grid size-7 place-items-center rounded-full bg-orange-100 text-orange-600 shadow-sm ring-1 ring-white hero-float-down">
                    <MessageCircle className="size-3.5" aria-hidden />
                  </span>
                  <span className="absolute -right-1 -bottom-1 grid size-7 place-items-center rounded-full bg-blue-100 text-blue-600 shadow-sm ring-1 ring-white ind-float">
                    <CalendarCheck className="size-3.5" aria-hidden />
                  </span>
                </div>
              </div>

              <div className="relative mt-8 space-y-4">
                <span aria-hidden className="absolute left-[22px] top-3 bottom-3 w-px bg-blue-200/70" />
                {[
                  {
                    Icon: Phone,
                    tone: "bg-emerald-100 text-emerald-600",
                    title: "Capture & qualify leads instantly",
                  },
                  {
                    Icon: Users,
                    tone: "bg-violet-100 text-violet-600",
                    title: "Qualify with the right info",
                  },
                  {
                    Icon: CalendarCheck,
                    tone: "bg-blue-100 text-blue-600",
                    title: "Book & manage site visits",
                  },
                  {
                    Icon: MessageCircle,
                    tone: "bg-orange-100 text-orange-600",
                    title: "Follow up, every time",
                  },
                  {
                    Icon: Headphones,
                    tone: "bg-emerald-100 text-emerald-600",
                    title: "Nurture while you're busy",
                  },
                ].map((step, i) => (
                  <ScrollStepItem key={step.title} index={i} className="relative flex items-start gap-4">
                    <span aria-hidden className="relative z-10 mt-1 size-2.5 shrink-0 rounded-full bg-blue-600 ring-4 ring-blue-50" />
                    <div className="flex flex-1 items-center gap-3 rounded-2xl border border-blue-100/70 bg-white px-5 py-3.5 shadow-[0_2px_10px_-4px_rgba(2,132,199,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-600/10">
                      <span className={`grid size-9 shrink-0 place-items-center rounded-xl ${step.tone}`}>
                        <step.Icon className="size-4.5" aria-hidden />
                      </span>
                      <div>
                        <p className="text-[11px] font-bold text-blue-600">
                          {String(i + 1).padStart(2, "0")}
                        </p>
                        <p className="text-[15px] font-bold leading-snug text-slate-900">{step.title}</p>
                      </div>
                    </div>
                  </ScrollStepItem>
                ))}
              </div>

              <div className="mt-auto pt-8">
                <Button
                  asChild
                  size="lg"
                  className="group h-auto w-full rounded-full bg-gradient-to-r from-blue-600 to-sky-600 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/35"
                >
                  <Link href="/get-started?industry=real-estate">
                    Launch a real estate agent
                    <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollStepItem>

          {/* Right — how agent sounds */}
          <ScrollStepItem index={1}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-blue-400 bg-white p-7 shadow-sm sm:p-9">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400 bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-700 shadow-sm">
                <Volume2 className="size-3.5" aria-hidden />
                Hear it to believe it
              </span>

              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-balance font-sans text-[1.9rem] font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-3xl">
                    How the agent
                    <br />
                    actually <span className="text-blue-600">sounds</span>
                  </h2>
                  <p className="mt-3 max-w-xs text-pretty text-[14px] leading-relaxed text-slate-500">
                    Real conversations. In your language. With human-like tone and context.
                  </p>
                </div>

                {/* Waveform / microphone illustration */}
                <div className="relative hidden size-28 shrink-0 items-center justify-center sm:flex">
                  <span aria-hidden className="absolute size-28 rounded-full border border-blue-100" />
                  <span aria-hidden className="absolute size-20 rounded-full border border-blue-100" />
                  <div className="absolute left-0 flex h-10 items-end gap-[3px]" aria-hidden>
                    {[10, 18, 8, 22, 14].map((h, i) => (
                      <span
                        key={i}
                        style={{ height: `${h}px`, animationDelay: `${i * 0.12}s` }}
                        className="ind-eq w-[3px] rounded-full bg-gradient-to-t from-violet-400 to-violet-200"
                      />
                    ))}
                  </div>
                  <div className="absolute right-0 flex h-10 items-end gap-[3px]" aria-hidden>
                    {[14, 8, 22, 12, 10].map((h, i) => (
                      <span
                        key={i}
                        style={{ height: `${h}px`, animationDelay: `${i * 0.12}s` }}
                        className="ind-eq w-[3px] rounded-full bg-gradient-to-t from-blue-500 to-sky-300"
                      />
                    ))}
                  </div>
                  <div className="grid size-14 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-violet-500 text-white shadow-lg shadow-blue-500/30">
                    <Mic className="size-6" aria-hidden />
                  </div>
                </div>
              </div>

              {/* Live conversation preview panel */}
              <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_-18px_rgba(2,132,199,0.25)]">
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-3.5">
                  <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" aria-hidden />
                    Live Conversation Preview
                  </p>
                  <span className="flex items-center gap-1.5 text-[12px] font-semibold text-blue-600">
                    <Globe className="size-3.5" aria-hidden />
                    Switch to Hindi
                  </span>
                </div>

                <ConversationPreviewChat
                  messages={[
                    { from: "agent", text: industry.sampleLines[0] },
                    { from: "customer", text: "Not yet, just started looking." },
                    { from: "agent", text: industry.sampleLines[1] },
                    { from: "customer", text: "Not pre-approved yet, actually." },
                    { from: "agent", text: `No problem! I can connect you with one. ${industry.sampleLines[2]}` },
                  ]}
                />

                <div className="grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100">
                  {[
                    { Icon: Zap, label: "Ultra-fast response" },
                    { Icon: Volume2, label: "Human-like conversations" },
                    { Icon: ShieldCheck, label: "Enterprise-grade security" },
                  ].map(({ Icon: FeatIcon, label }) => (
                    <div key={label} className="flex flex-col items-center gap-1.5 px-3 py-4 text-center">
                      <FeatIcon className="size-4.5 text-blue-600" aria-hidden />
                      <span className="text-[11.5px] font-semibold leading-tight text-slate-700">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-8">
                <Button
                  asChild
                  size="lg"
                  className="group h-auto w-full rounded-full bg-gradient-to-r from-blue-600 to-sky-600 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/35"
                >
                  <Link href="/get-started?industry=real-estate">
                    Hear a live demo call
                    <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollStepItem>
        </div>
      </section>

      {/* ─── How teams roll out — two-step process ─── */}
      <section className="w-full px-6 pb-8 pt-6 md:px-8 md:pb-10 md:pt-8">
        <div className="mx-auto max-w-6xl">
          <ScrollStepItem index={0} className="flex items-start gap-5">
            <span className="relative shrink-0">
              <Sparkles className="absolute -right-1 -top-1 size-3.5 text-blue-400" aria-hidden />
              <span className="grid size-16 place-items-center rounded-full border border-blue-100 bg-white text-blue-600 shadow-sm">
                <Rocket className="size-7" aria-hidden />
              </span>
            </span>
            <div>
              <h2 className="text-balance font-sans text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                How real estate
                <br />
                teams roll out <span className="text-blue-600">9278.io</span>
              </h2>
              <span aria-hidden className="mt-4 block h-1 w-16 rounded-full bg-blue-600" />
              <p className="mt-4 max-w-md text-pretty leading-relaxed text-slate-500">
                A simple, scalable approach to launch AI voice agents and drive real results.
              </p>
            </div>
          </ScrollStepItem>

          <div className="relative mt-10 grid gap-8 md:grid-cols-2 md:gap-10">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:grid md:size-14 md:place-items-center md:rounded-full md:border md:border-dashed md:border-blue-300 md:bg-white md:text-blue-600 md:shadow-md"
            >
              <ArrowRight className="size-5" />
            </div>

            {/* Card 01 — Start small. Grow fast. */}
            <ScrollStepItem index={0}>
              <div className="relative h-full overflow-hidden rounded-2xl border border-blue-400 bg-white p-7 shadow-sm md:p-8">
                <span
                  aria-hidden
                  className="absolute right-0 top-0 h-14 w-14 rounded-bl-2xl bg-gradient-to-br from-blue-600 to-sky-500"
                />
                <span className="absolute left-6 top-5 rounded-full bg-blue-600 px-3.5 py-1 text-sm font-bold text-white shadow-md shadow-blue-600/25">
                  01
                </span>

                <span className="mt-14 grid size-16 place-items-center rounded-full bg-blue-50 text-blue-600">
                  <Home className="size-7" aria-hidden />
                </span>

                <h3 className="mt-5 text-balance font-sans text-2xl font-bold tracking-tight text-slate-900">
                  Start small.
                  <br />
                  Grow fast.
                </h3>
                <span aria-hidden className="mt-3 block h-1 w-10 rounded-full bg-blue-600" />

                <p className="mt-4 text-pretty leading-relaxed text-slate-500">
                  Most real estate customers start by{" "}
                  <Link href="/get-started" className="font-semibold text-blue-600 underline-offset-4 hover:underline">
                    spinning up a Starter agent
                  </Link>{" "}
                  with a single phone number, then upgrade to{" "}
                  <Link href="/pricing" className="font-semibold text-blue-600 underline-offset-4 hover:underline">
                    Growth or Scale
                  </Link>{" "}
                  once the inbound playbooks prove out.
                </p>

                {/* Mini growth path illustration */}
                <div className="relative mt-8 h-20">
                  <svg viewBox="0 0 300 80" className="h-full w-full" aria-hidden>
                    <path
                      d="M10,68 C60,66 90,55 140,42 C180,32 210,20 270,12"
                      fill="none"
                      stroke="rgb(37,99,235)"
                      strokeOpacity="0.35"
                      strokeWidth="2"
                      strokeDasharray="4 6"
                    />
                    <path d="M258,16 L272,12 L266,25" fill="none" stroke="rgb(37,99,235)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="absolute inset-x-0 top-1 flex items-end justify-between px-1">
                    {[
                      { Icon: Play, label: "Starter" },
                      { Icon: BarChart3, label: "Growth" },
                      { Icon: Rocket, label: "Scale" },
                    ].map((step, i) => (
                      <div key={step.label} className={`flex flex-col items-center gap-1.5 ${i === 1 ? "mb-3" : i === 2 ? "mb-6" : ""}`}>
                        <span className="grid size-9 place-items-center rounded-full border border-blue-100 bg-white text-blue-600 shadow-sm">
                          <step.Icon className="size-4" aria-hidden />
                        </span>
                        <span className="text-[11px] font-semibold text-blue-600">{step.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollStepItem>

            {/* Card 02 — Explore more. Compare with confidence. */}
            <ScrollStepItem index={1}>
              <div className="relative h-full overflow-hidden rounded-2xl border border-blue-400 bg-white p-7 shadow-sm md:p-8">
                <span
                  aria-hidden
                  className="absolute right-0 top-0 h-14 w-14 rounded-bl-2xl bg-gradient-to-br from-blue-600 to-sky-500"
                />
                <span className="absolute left-6 top-5 rounded-full bg-blue-600 px-3.5 py-1 text-sm font-bold text-white shadow-md shadow-blue-600/25">
                  02
                </span>

                <span className="mt-14 grid size-16 place-items-center rounded-full bg-blue-50 text-blue-600">
                  <MessageCircle className="size-7" aria-hidden />
                </span>

                <h3 className="mt-5 text-balance font-sans text-2xl font-bold tracking-tight text-slate-900">
                  Explore more.
                  <br />
                  Compare with confidence.
                </h3>
                <span aria-hidden className="mt-3 block h-1 w-10 rounded-full bg-blue-600" />

                <p className="mt-4 text-pretty leading-relaxed text-slate-500">
                  Curious about voice credit, phone numbers, or compliance? The{" "}
                  <Link href="/faq" className="font-semibold text-blue-600 underline-offset-4 hover:underline">
                    FAQ
                  </Link>{" "}
                  answers the questions real estate ops teams ask most — and you can browse{" "}
                  <Link href="/industries" className="font-semibold text-blue-600 underline-offset-4 hover:underline">
                    every other industry
                  </Link>{" "}
                  we support to compare playbooks.
                </p>

                {/* Decorative backdrop — city silhouette + stacked cards */}
                <div className="relative mt-8 h-20 overflow-hidden">
                  <svg viewBox="0 0 300 70" className="absolute inset-x-0 bottom-0 h-16 w-full text-blue-50" aria-hidden>
                    <rect x="10" y="20" width="34" height="50" fill="currentColor" />
                    <rect x="52" y="6" width="30" height="64" fill="currentColor" />
                    <rect x="230" y="14" width="28" height="56" fill="currentColor" />
                    <rect x="264" y="28" width="30" height="42" fill="currentColor" />
                  </svg>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-3">
                    <span className="grid size-11 place-items-center rounded-xl border border-blue-100 bg-white text-blue-500 shadow-sm">
                      <Building2 className="size-5" aria-hidden />
                    </span>
                    <span className="grid size-14 -translate-y-2 place-items-center rounded-2xl border border-blue-200 bg-white text-blue-600 shadow-md">
                      <ShieldCheck className="size-6" aria-hidden />
                    </span>
                    <span className="grid size-11 place-items-center rounded-xl border border-blue-100 bg-white text-blue-500 shadow-sm">
                      <Briefcase className="size-5" aria-hidden />
                    </span>
                  </div>
                </div>
              </div>
            </ScrollStepItem>
          </div>

          <ScrollStepItem index={2}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-auto rounded-full bg-gradient-to-r from-blue-600 to-sky-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-600/25 transition-transform hover:-translate-y-0.5"
              >
                <Link href="/get-started?industry=real-estate">
                  <Rocket className="mr-1.5 size-5" aria-hidden />
                  Launch a real estate agent
                  <ArrowRight className="ml-1.5 size-5" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-auto rounded-full px-7 py-3.5 text-base transition-transform hover:-translate-y-0.5"
              >
                <Link href="/faq">
                  <HelpCircle className="mr-1.5 size-5" aria-hidden />
                  Read the FAQ
                </Link>
              </Button>
            </div>
          </ScrollStepItem>
        </div>
      </section>

      {/* ─── AI agents that grow with you ─── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50/60 via-sky-50/40 to-sky-50/50 px-6 pb-16 pt-6 md:px-8 md:pb-24 md:pt-8">
        <div aria-hidden className="pointer-events-none absolute -left-24 top-16 -z-10 size-72 rounded-full bg-blue-400/15 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 -z-10 size-80 rounded-full bg-sky-400/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left — copy */}
          <ScrollStepItem index={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-blue-700 shadow-sm backdrop-blur">
              <Sparkles className="size-3.5" aria-hidden />
              The smarter way to scale
            </span>
            <h2 className="mt-5 text-balance font-sans text-4xl font-bold tracking-tight text-slate-900 sm:text-[2.6rem]">
              AI agents that{" "}
              <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-blue-600 bg-clip-text text-transparent">
                grow with you
              </span>
            </h2>

            <ul className="mt-7 space-y-3.5">
              {[
                "Faster lead response",
                "More site visits booked",
                "Fewer missed calls",
                "Always-on availability",
              ].map((line) => (
                <li key={line} className="flex items-center gap-3.5">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-sky-600 text-white shadow-md shadow-blue-500/25">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  <span className="text-pretty text-[15px] leading-relaxed text-slate-700 font-medium">{line}</span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              size="lg"
              className="group mt-9 h-auto rounded-full bg-gradient-to-r from-blue-600 to-sky-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/40"
            >
              <Link href="/get-started?industry=real-estate">
                Launch a real estate agent
                <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </Button>
          </ScrollStepItem>

          {/* Right — Picture 2: real-time performance recap (real stats, no invented numbers) */}
          <ScrollStepItem index={1}>
            <div className="relative">
              <div className="rounded-[2rem] border border-blue-400 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(2,132,199,0.35)] sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="ind-float relative grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-md shadow-blue-500/25">
                    <span aria-hidden className="absolute inset-0 rounded-2xl bg-blue-500 motion-safe:animate-ping" style={{ animationDuration: "2.4s", opacity: 0.35 }} />
                    <TrendingUp className="relative size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[15px] font-bold text-slate-900">Real-Time Performance</p>
                    <p className="text-[12.5px] leading-snug text-slate-500">
                      AI agents working 24/7 to grow your real estate business
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 place-items-center gap-5 py-4">
                  {[
                    { Icon: MessageCircle, tone: "bg-blue-50 text-blue-600", label: "First-touch response", value: "< 3 sec" },
                    { Icon: Phone, tone: "bg-emerald-50 text-emerald-600", label: "Concurrent calls", value: "Up to 40" },
                    { Icon: Wallet, tone: "bg-violet-50 text-violet-600", label: "Per-minute rate", value: "From ₹10" },
                    { Icon: ShieldCheck, tone: "bg-orange-50 text-orange-600", label: "Uptime reliability", value: "99.9%" },
                  ].map((s, i) => (
                    <ScrollStepItem key={s.label} index={i} className="w-full max-w-[220px]">
                      <div
                        className={`group w-full rounded-2xl border border-blue-400 p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-blue-600/15 ${s.tone}`}
                      >
                        <span className="mx-auto grid size-12 place-items-center rounded-full bg-white/70 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                          <s.Icon className="size-6" aria-hidden />
                        </span>
                        <p className="mt-4 font-sans text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                          {s.value}
                        </p>
                        <p className="mt-1 text-[13px] font-medium leading-snug text-slate-500">{s.label}</p>
                      </div>
                    </ScrollStepItem>
                  ))}
                </div>
              </div>
            </div>
          </ScrollStepItem>
        </div>
      </section>

      <ImagePlaceholderSection
        src="/images/industries/real-estate-robot.png"
        alt="AI assistant helping a buyer find and analyze properties"
        heading="Every lead, matched and followed up."
        paragraph="From the first call to the site visit, 9278.io keeps buyers and sellers moving — qualifying leads, answering listing questions, and booking visits instantly so your agents can focus on closing."
      />

      <PricingCta
        heading="Let AI handle calls so your team can focus on closing deals."
        description="Launch your AI voice agent in minutes. No setup headaches."
        primaryHref="/get-started?industry=real-estate"
        primaryLabel="Launch a real estate agent"
        secondaryHref="/get-started?industry=real-estate"
        secondaryLabel="Talk to our expert"
      />

      {/* ─── Other industries we power ─── */}
      <section className="w-full px-6 pb-14 md:px-8 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <ScrollStepItem className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance font-sans text-[1.6rem] font-semibold tracking-tight md:text-3xl">
              Other industries we power
            </h2>
            <p className="mt-2.5 text-pretty text-[13.5px] leading-relaxed text-muted-foreground">
              Pre-tuned playbooks for the calls your peers in adjacent verticals already automate.
            </p>
          </ScrollStepItem>

          <div className="mt-12 grid gap-x-5 gap-y-7 overflow-x-clip sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => ({
              href: `/industries/${r.slug}`,
              titlePrefix: "AI voice agents for ",
              highlight: r.name.toLowerCase(),
              description: r.short,
              icon: r.icon,
            })).map((link, i) => {
              const a = {
                border: "border-l-primary",
                tile: "bg-primary/10 text-primary",
                text: "text-primary",
                ribbon: "bg-primary",
                btn: "bg-primary",
              }
              const LinkIcon = link.icon
              const position = i === 0 ? "left" : i === 2 ? "right" : "middle"

              return (
                <CenterOutItem key={link.href} position={position}>
                  <Link
                    href={link.href}
                    className={`group relative block h-full overflow-hidden rounded-xl border border-l-4 border-slate-200 bg-gradient-to-br from-slate-50/60 to-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:-translate-y-1 active:shadow-lg ${a.border}`}
                  >
                    {/* corner ribbon */}
                    <span
                      aria-hidden
                      className={`absolute right-0 top-0 h-10 w-10 [clip-path:polygon(100%_0,0_0,100%_100%)] ${a.ribbon}`}
                    />

                    {/* dotted decoration */}
                    <div aria-hidden className="absolute right-4 top-10 grid grid-cols-4 gap-1 opacity-60">
                      {Array.from({ length: 16 }).map((_, d) => (
                        <span key={d} className="size-1 rounded-full bg-slate-300" />
                      ))}
                    </div>

                    <span className={`grid size-9 place-items-center rounded-lg ${a.tile}`}>
                      <LinkIcon className="size-4.5" aria-hidden />
                    </span>

                    <h3 className="mt-3 text-balance font-sans text-[15px] font-bold leading-snug tracking-tight text-foreground">
                      {link.titlePrefix}
                      {link.titlePrefix ? <span className={a.text}>{link.highlight}</span> : link.highlight}
                    </h3>
                    <span aria-hidden className={`mt-2 block h-1 w-7 rounded-full ${a.ribbon}`} />
                    <p className="mt-2 text-pretty text-[12.5px] leading-relaxed text-muted-foreground">{link.description}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className={`text-[12.5px] font-semibold ${a.text}`}>Read more</span>
                      <span
                        className={`grid size-7 shrink-0 place-items-center rounded-full text-white shadow-md transition-transform duration-300 group-hover:translate-x-0.5 ${a.btn}`}
                      >
                        <ArrowRight className="size-3" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </CenterOutItem>
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

function HomeServicesPage() {
  const industry = getIndustry("home-services")!
  const related = getRelatedIndustries("home-services")

  return (
    <>
      <SiteHeader />
      <main className="min-h-dvh bg-white text-slate-900" style={{ zoom: 0.9 }}>

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: "Home services", path: "/industries/home-services" },
        ]}
      />
      <ServiceJsonLd
        name="AI voice agents for home services"
        description={industry.pitch}
        path="/industries/home-services"
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
                AI voice agents for home services
              </span>

              <h1 className="mt-6 text-[44px] font-extrabold md:text-[60px] lg:text-[72px]" style={{ lineHeight: 0.95, letterSpacing: "-2px" }}>
                <span style={{ color: "#0F172A" }}>AI Voice Agents Built for</span>
                <br />
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Home Services.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-pretty text-[16.5px] leading-[1.75] text-slate-600 md:text-lg">
                {industry.pitch}
              </p>

              <div className="mt-5 flex flex-wrap gap-4 sm:flex-nowrap">
                {[
                  { Icon: Phone, title: "24/7 Calling", desc: "Always on for your customers" },
                  { Icon: CalendarCheck, title: "Instant Booking", desc: "Capture & schedule jobs in real time" },
                  { Icon: TrendingUp, title: "More Jobs Won", desc: "Convert more calls into confirmed jobs" },
                ].map((f) => (
                  <div key={f.title} className="flex min-w-0 items-start gap-2.5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600">
                      <f.Icon className="size-4" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="whitespace-nowrap text-[12.5px] font-bold leading-snug text-slate-900">{f.title}</p>
                      <p className="max-w-[120px] text-[11px] leading-snug text-slate-500">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3.5">
                <Button
                  asChild
                  size="lg"
                  className="group h-auto rounded-full bg-blue-600 px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.65)] transition-all hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  <Link href="/get-started?industry=home-services">
                    Get started
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-auto rounded-full border-slate-200 bg-white px-6 py-3.5 text-[15px] font-bold text-slate-800 shadow-sm hover:border-blue-300 hover:bg-blue-50/60 hover:text-blue-700"
                >
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>
            </ScrollReveal>

            {/* Right — hero photo + smarter-calls overlay + live call preview */}
            <ScrollReveal delay={0.14}>
              <div className="relative mx-auto w-full max-w-[620px]">
                <div className="relative flex flex-col items-center gap-5 overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-white via-blue-50/40 to-blue-100/50 px-5 py-8 shadow-xl shadow-slate-900/10 sm:block sm:aspect-[4/3.5] sm:px-0 sm:py-0">
                  {/* Dotted pattern, faded toward the center */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.22]"
                    style={{
                      backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.3) 1px, transparent 1.4px)",
                      backgroundSize: "18px 18px",
                      maskImage: "radial-gradient(circle at center, transparent 30%, black 75%)",
                      WebkitMaskImage: "radial-gradient(circle at center, transparent 30%, black 75%)",
                    }}
                  />
                  {/* Soft ambient light blobs */}
                  <div aria-hidden className="absolute -left-16 -top-16 size-64 rounded-full bg-blue-200/40 blur-3xl" />
                  <div aria-hidden className="absolute -bottom-20 -right-10 size-72 rounded-full bg-sky-200/40 blur-3xl" />
                  <div aria-hidden className="absolute left-1/3 top-1/4 size-40 rounded-full bg-white/60 blur-2xl" />
                  {/* Abstract guide circle */}
                  <div
                    aria-hidden
                    className="absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200/50"
                  />

                  {/* Phone — Home Dashboard (stacked first on mobile/tablet, top-left floating on sm+) */}
                  <div
                    className="ind-float relative z-10 w-full max-w-[280px] rounded-[2.1rem] border border-blue-600 bg-white shadow-2xl sm:absolute sm:left-[4%] sm:top-[4%] sm:w-[264px] sm:max-w-none sm:-rotate-[9deg]"
                    style={{ animationDelay: "2.8s" }}
                  >
                    <div className="overflow-hidden rounded-[1.4rem]">
                      <div className="space-y-4 px-4 pb-6 pt-6">
                        <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-2.5">
                          <Search className="size-3.5 text-slate-500" aria-hidden />
                          <span className="text-[10px] font-medium text-slate-500">Find any service</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {[Droplet, Zap, Fan, Sparkles].map((CatIcon, i) => (
                            <div key={i} className="rounded-lg bg-blue-50 py-2.5 text-center">
                              <CatIcon className="mx-auto size-4 text-blue-600" aria-hidden />
                            </div>
                          ))}
                        </div>
                        <div className="rounded-xl bg-blue-600 p-3.5 text-white">
                          <p className="text-[11px] font-bold">15% OFF Today</p>
                          <p className="text-[9.5px] font-medium text-blue-100">Book any service now</p>
                        </div>
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between rounded-lg border border-slate-100 p-2.5">
                            <p className="text-[9.5px] font-bold text-slate-900">Plumbing Repair</p>
                            <p className="text-[9.5px] font-bold text-blue-600">₹399</p>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border border-slate-100 p-2.5">
                            <p className="text-[9.5px] font-bold text-slate-900">Deep Cleaning</p>
                            <p className="text-[9.5px] font-bold text-blue-600">₹599</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-around border-t border-slate-100 px-2 py-3.5">
                        {[Home, CalendarCheck, MessageCircle, Bell].map((NavIcon, i) => (
                          <NavIcon key={i} className={`size-4 ${i === 0 ? "text-blue-600" : "text-slate-400"}`} aria-hidden />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Phone — Book Appointment (stacked second on mobile/tablet, top-right floating on sm+) */}
                  <div
                    className="ind-float relative z-30 w-full max-w-[280px] rounded-[2.1rem] border border-blue-600 bg-white shadow-2xl sm:absolute sm:right-[4%] sm:top-[6%] sm:w-[272px] sm:max-w-none sm:rotate-[11deg]"
                    style={{ animationDelay: "0.9s" }}
                  >
                    <div className="space-y-3.5 px-4 py-6">
                      <p className="text-[10px] font-bold tracking-wide text-slate-500">BOOK APPOINTMENT</p>
                      <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-2.5">
                        <span className="grid size-8 shrink-0 place-items-center rounded-md bg-blue-100 text-blue-600">
                          <Droplet className="size-4" aria-hidden />
                        </span>
                        <p className="text-[10.5px] font-bold text-slate-900">Plumbing Repair</p>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-slate-100 p-2.5">
                        <CalendarCheck className="size-4 shrink-0 text-blue-600" aria-hidden />
                        <p className="text-[10px] font-semibold text-slate-800">Tomorrow</p>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-slate-100 p-2.5">
                        <Clock className="size-4 shrink-0 text-blue-600" aria-hidden />
                        <p className="text-[10px] font-semibold text-slate-800">11:00 AM</p>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-slate-100 p-2.5">
                        <MapPin className="size-4 shrink-0 text-blue-600" aria-hidden />
                        <p className="text-[10px] font-semibold text-slate-800">12 MG Road, Pune</p>
                      </div>
                      <span className="block rounded-full bg-blue-600 py-2.5 text-center text-[10.5px] font-bold text-white">
                        Confirm Booking
                      </span>
                    </div>
                  </div>

                  {/* Feature chips, one directly below each phone */}
                  {[
                    { Icon: Clock, label: "24/7 Availability", pos: "left-[1%] bottom-[7%]", delay: "0.5s" },
                    { Icon: ShieldCheck, label: "Verified Technicians", pos: "left-1/2 bottom-[2%] -translate-x-1/2", delay: "2s" },
                    { Icon: CalendarCheck, label: "Instant Booking", pos: "right-[1%] bottom-[7%]", delay: "3.4s" },
                  ].map(({ Icon: FeatureIcon, label, pos, delay }) => (
                    <div
                      key={label}
                      className={`ind-float absolute ${pos} z-0 hidden items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2.5 shadow-lg sm:flex`}
                      style={{ animationDelay: delay }}
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-100 text-blue-600">
                        <FeatureIcon className="size-4.5" aria-hidden />
                      </span>
                      <p className="whitespace-nowrap text-[13px] font-bold text-slate-800">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Stats bar */}
        <div className="w-full px-6 pb-10 md:px-8 md:pb-14">
          <ScrollStepItem index={0} className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-blue-400 bg-white/95 px-3 py-3 shadow-[0_20px_50px_-25px_rgba(2,132,199,0.35)] backdrop-blur">
              <div className="grid grid-cols-1 divide-y divide-slate-200/70 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
                {[
                  { Icon: Zap, label: "First-call response", value: "< 3 sec", tone: "bg-blue-100 text-blue-600" },
                  { Icon: BarChart3, label: "Concurrent calls", value: "Up to 40", tone: "bg-emerald-100 text-emerald-600" },
                  { Icon: Clock, label: "Always available", value: "24/7", tone: "bg-violet-100 text-violet-600" },
                  { Icon: ShieldCheck, label: "Uptime reliability", value: "99.9%", tone: "bg-blue-100 text-blue-600" },
                ].map(({ Icon: StatIcon, label, value, tone }) => (
                  <div key={label} className="flex items-center gap-4 px-5 py-4 sm:px-6 sm:py-5">
                    <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${tone}`}>
                      <StatIcon className="size-6" aria-hidden />
                    </span>
                    <div>
                      <p className="font-sans text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                        {value}
                      </p>
                      <p className="mt-0.5 text-[12.5px] font-medium text-slate-500">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollStepItem>
        </div>
      </section>

      {/* ─── What agent does + How it sounds ─── */}
      <section className="w-full px-6 pb-8 md:px-8 md:pb-10">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {/* Left — day-one jobs with real photo */}
          <ScrollStepItem index={0}>
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-blue-400 bg-blue-50/30 p-7 shadow-sm sm:p-9">
              <span className="grid size-11 place-items-center rounded-full bg-blue-100 text-blue-600">
                <Wrench className="size-5" aria-hidden />
              </span>
              <h2 className="mt-4 font-sans text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.65rem]">
                What the agent does on day one
              </h2>
              <span aria-hidden className="mt-3 block h-1 w-14 rounded-full bg-blue-600" />

              <div className="mt-6 overflow-hidden rounded-2xl shadow-md shadow-slate-900/10">
                <IndustryImage slug="home-services" name="Home services" />
              </div>

              <div className="mt-6 space-y-3">
                {industry.jobs.map((job, i) => (
                  <ScrollStepItem
                    key={job}
                    index={i}
                    className="flex items-center gap-3.5 rounded-2xl border border-blue-100/70 bg-white px-5 py-3.5 shadow-[0_2px_10px_-4px_rgba(2,132,199,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-600/10"
                  >
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                      <Check className="size-3.5" aria-hidden />
                    </span>
                    <span className="text-pretty text-[14px] leading-snug text-slate-700">{job}</span>
                  </ScrollStepItem>
                ))}
              </div>
            </div>
          </ScrollStepItem>

          {/* Right — how agent sounds */}
          <ScrollStepItem index={1}>
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-blue-400 bg-blue-50/30 p-7 shadow-sm sm:p-9">
              <span className="grid size-11 place-items-center rounded-full bg-blue-100 text-blue-600">
                <Volume2 className="size-5" aria-hidden />
              </span>
              <h2 className="mt-4 font-sans text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.65rem]">
                How the agent actually sounds
              </h2>
              <span aria-hidden className="mt-3 block h-1 w-14 rounded-full bg-blue-600" />

              <p className="mt-4 text-pretty text-[14.5px] leading-relaxed text-slate-600">
                Real conversations. In your language. With human-like tone and context — built for home service
                businesses.
              </p>

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
                        style={{ height: `${6 + ((i * 7) % 18)}px`, animationDelay: `${(i % 12) * 0.09}s` }}
                        className={`ind-eq w-[2px] rounded-full ${i < 10 ? "bg-blue-500" : "bg-slate-200"}`}
                      />
                    ))}
                  </div>
                  <span className="shrink-0 text-[11px] font-medium text-slate-400">0:00 / 0:32</span>
                </div>

                <SoundSampleChat
                  messages={[
                    { from: "agent", text: "नमस्ते! मैं 9278 का वॉइस असिस्टेंट हूँ। आपको किस प्रकार की सेवा चाहिए?" },
                    { from: "customer", text: "मेरा AC काम नहीं कर रहा, ठंडी हवा नहीं आ रही।" },
                    { from: "agent", text: "ठीक है, मैं आपकी जानकारी ले लेता हूँ। कृपया अपना नाम और पता बताइए।" },
                  ]}
                />

                <div className="mt-4 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-[12.5px] font-semibold text-blue-600">
                  <Globe className="size-3.5" aria-hidden />
                  Supports 20+ Indian Languages
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-blue-400 bg-blue-50/40 p-5">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                    <Sparkles className="size-4" aria-hidden />
                  </span>
                  <p className="text-[13.5px] font-bold text-slate-900">Built for every home service call</p>
                </div>

                <p className="mt-3.5 text-pretty text-[14px] leading-relaxed text-slate-600">
                  Home service businesses need quick and reliable communication to manage customer requests,
                  appointments, and support. AI-powered solutions help automate call handling, booking, and
                  follow-ups, ensuring no lead is missed. From plumbing and electrical services to cleaning and
                  maintenance, businesses can provide 24/7 assistance and faster response times. This improves
                  customer satisfaction, streamlines operations, and helps service providers grow more efficiently.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {["24/7 Assistance", "Faster Response", "No Missed Leads", "Streamlined Ops"].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/70 bg-white px-3 py-1.5 text-[11.5px] font-semibold text-blue-700 shadow-sm"
                    >
                      <Check className="size-3" aria-hidden />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollStepItem>
        </div>
      </section>

      <ImagePlaceholderSection
        src="/images/industries/home-services-robots.png"
        alt="AI robots handling cleaning, repairs, and maintenance tasks around a home"
        heading="Every job, dispatched without delay."
        paragraph="From the first ring to the technician at the door, 9278.io captures job details, prioritizes emergencies, and books the right tech directly to your dispatch board — so no call, and no job, slips through."
      />

      <PricingCta
        heading="Ready to automate calls and grow your home service business?"
        description="Launch your AI voice agent in minutes. No setup headaches."
        primaryHref="/get-started?industry=home-services"
        primaryLabel="Launch a home services agent"
        secondaryHref="/get-started?industry=home-services"
        secondaryLabel="Talk to our expert"
      />

      {/* ─── Other industries we power ─── */}
      <section className="w-full px-6 pb-14 md:px-8 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <ScrollStepItem className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance font-sans text-[1.6rem] font-semibold tracking-tight md:text-3xl">
              Other industries we power
            </h2>
            <p className="mt-2.5 text-pretty text-[13.5px] leading-relaxed text-muted-foreground">
              Pre-tuned playbooks for the calls your peers in adjacent verticals already automate.
            </p>
          </ScrollStepItem>

          <div className="mt-12 grid gap-x-5 gap-y-7 overflow-x-clip sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => ({
              href: `/industries/${r.slug}`,
              titlePrefix: "AI voice agents for ",
              highlight: r.name.toLowerCase(),
              description: r.short,
              icon: r.icon,
            })).map((link, i) => {
              const a = {
                border: "border-l-primary",
                tile: "bg-primary/10 text-primary",
                text: "text-primary",
                ribbon: "bg-primary",
                btn: "bg-primary",
              }
              const LinkIcon = link.icon
              const position = i === 0 ? "left" : i === 2 ? "right" : "middle"

              return (
                <CenterOutItem key={link.href} position={position}>
                  <Link
                    href={link.href}
                    className={`group relative block h-full overflow-hidden rounded-xl border border-l-4 border-slate-200 bg-gradient-to-br from-slate-50/60 to-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:-translate-y-1 active:shadow-lg ${a.border}`}
                  >
                    <span
                      aria-hidden
                      className={`absolute right-0 top-0 h-10 w-10 [clip-path:polygon(100%_0,0_0,100%_100%)] ${a.ribbon}`}
                    />

                    <div aria-hidden className="absolute right-4 top-10 grid grid-cols-4 gap-1 opacity-60">
                      {Array.from({ length: 16 }).map((_, d) => (
                        <span key={d} className="size-1 rounded-full bg-slate-300" />
                      ))}
                    </div>

                    <span className={`grid size-9 place-items-center rounded-lg ${a.tile}`}>
                      <LinkIcon className="size-4.5" aria-hidden />
                    </span>

                    <h3 className="mt-3 text-balance font-sans text-[15px] font-bold leading-snug tracking-tight text-foreground">
                      {link.titlePrefix}
                      {link.titlePrefix ? <span className={a.text}>{link.highlight}</span> : link.highlight}
                    </h3>
                    <span aria-hidden className={`mt-2 block h-1 w-7 rounded-full ${a.ribbon}`} />
                    <p className="mt-2 text-pretty text-[12.5px] leading-relaxed text-muted-foreground">{link.description}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className={`text-[12.5px] font-semibold ${a.text}`}>Read more</span>
                      <span
                        className={`grid size-7 shrink-0 place-items-center rounded-full text-white shadow-md transition-transform duration-300 group-hover:translate-x-0.5 ${a.btn}`}
                      >
                        <ArrowRight className="size-3" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </CenterOutItem>
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

function RestaurantsPage() {
  const industry = getIndustry("restaurants")!
  const related = getRelatedIndustries("restaurants")

  return (
    <>
      <SiteHeader />
      <main className="min-h-dvh bg-white text-slate-900" style={{ zoom: 0.9 }}>

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: "Restaurants", path: "/industries/restaurants" },
        ]}
      />
      <ServiceJsonLd
        name="AI voice agents for restaurants"
        description={industry.pitch}
        path="/industries/restaurants"
        serviceType="AI voice agent"
      />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-white">
        <div className="w-full px-6 pt-6 pb-12 md:px-8 md:pt-8 md:pb-16">

          <div className="mx-auto grid max-w-7xl items-end gap-14 lg:grid-cols-2 lg:gap-10">
            {/* Left — copy */}
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white py-1.5 pl-1.5 pr-5 text-[13px] font-medium text-blue-700 shadow-sm">
                <span className="grid size-6 place-items-center rounded-full bg-blue-100 text-blue-600">
                  <Sparkles className="size-3.5" aria-hidden />
                </span>
                AI voice agents for restaurants
              </span>

              <h1 className="mt-10 text-[44px] font-extrabold md:text-[60px] lg:text-[72px]" style={{ lineHeight: 0.85, letterSpacing: "-2px" }}>
                <span style={{ color: "#0F172A" }}>AI Voice Agents</span>
                <br />
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  for Restaurants.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-pretty text-[16.5px] leading-[1.75] text-slate-600 md:text-lg">
                {industry.pitch}
              </p>

              <div className="mt-8 flex flex-wrap gap-4 sm:flex-nowrap">
                {[
                  { Icon: Phone, title: "24/7 Calling", desc: "Always on for your customers" },
                  { Icon: CalendarCheck, title: "Instant Booking", desc: "Capture & schedule jobs in real time" },
                  { Icon: TrendingUp, title: "More Jobs Won", desc: "Convert more calls into confirmed jobs" },
                ].map((f) => (
                  <div key={f.title} className="flex min-w-0 items-start gap-2.5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600">
                      <f.Icon className="size-4" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="whitespace-nowrap text-[12.5px] font-bold leading-snug text-slate-900">{f.title}</p>
                      <p className="max-w-[120px] text-[11px] leading-snug text-slate-500">{f.desc}</p>
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
                  <Link href="/get-started?industry=restaurants">
                    Get started
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-auto rounded-full border-slate-200 bg-white px-6 py-3.5 text-[15px] font-bold text-slate-800 shadow-sm hover:border-blue-300 hover:bg-blue-50/60 hover:text-blue-700"
                >
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>
            </ScrollReveal>

            {/* Right — reservation form + AI chat assistant */}
            <ScrollReveal delay={0.14}>
              <div className="relative mx-auto grid w-full max-w-[700px] gap-5 sm:grid-cols-2">
                <RestaurantReservationCard />
                <RestaurantChatCard />
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ─── Smarter operations. Happier guests. ─── */}
        <div className="w-full px-6 pb-4 pt-2 md:px-8">
          <ScrollStepItem index={0} className="mx-auto max-w-7xl">
            <div className="group relative overflow-hidden rounded-[1.75rem] border border-blue-400 bg-gradient-to-br from-blue-50 via-white to-sky-50 p-8 shadow-sm transition-shadow duration-300 hover:shadow-[0_25px_60px_-25px_rgba(2,132,199,0.4)] sm:p-11">
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <h2 className="text-balance font-sans text-[1.75rem] font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Smarter operations.
                    <br />
                    Happier guests.
                  </h2>
                  <div className="mt-6 space-y-4">
                    {[
                      "Reduce no-shows with confirmations",
                      "Upsell specials & events",
                      "Answer menu and hours instantly",
                      "Free up your team to focus on guests",
                    ].map((line, i) => (
                      <ScrollStepItem key={line} index={i} className="flex items-center gap-3.5">
                        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-blue-600 text-white shadow-md shadow-blue-500/25 transition-transform duration-300 group-hover:scale-105">
                          <Check className="size-4" aria-hidden />
                        </span>
                        <span className="text-pretty text-[15.5px] leading-snug text-slate-700">{line}</span>
                      </ScrollStepItem>
                    ))}
                  </div>
                </div>

                {/* Robot mascot */}
                <RestaurantRobotMascot />
              </div>
            </div>
          </ScrollStepItem>
        </div>
      </section>

      {/* ─── What agent does + How it sounds ─── */}
      <section className="w-full px-6 pt-8 pb-8 md:px-8 md:pt-10 md:pb-10">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {/* Left — day-one jobs */}
          <ScrollStepItem index={0}>
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-blue-400 bg-blue-50/30 p-7 shadow-sm sm:p-9">
              <h2 className="font-sans text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.65rem]">
                What the agent does on day one
              </h2>
              <span aria-hidden className="mt-3 block h-1 w-14 rounded-full bg-blue-600" />

              <div className="mt-6 space-y-3">
                {industry.jobs.map((job, i) => (
                  <ScrollStepItem
                    key={job}
                    index={i}
                    className="flex items-center gap-3.5 rounded-2xl border border-blue-100/70 bg-white px-5 py-3.5 shadow-[0_2px_10px_-4px_rgba(2,132,199,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-600/10"
                  >
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                      <Check className="size-3.5" aria-hidden />
                    </span>
                    <span className="text-pretty text-[14px] leading-snug text-slate-700">{job}</span>
                  </ScrollStepItem>
                ))}
              </div>
            </div>
          </ScrollStepItem>

          {/* Right — how agent sounds */}
          <ScrollStepItem index={1}>
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-blue-400 bg-blue-50/30 p-7 shadow-sm sm:p-9">
              <h2 className="font-sans text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.65rem]">
                How the agent actually sounds
              </h2>
              <span aria-hidden className="mt-3 block h-1 w-14 rounded-full bg-blue-600" />

              <p className="mt-4 text-pretty text-[14.5px] leading-relaxed text-slate-600">
                Real lines our voice agents have used in restaurants deployments — generated in real time with
                sub-second latency and natural emotion.
              </p>

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

                <SoundSampleChat
                  messages={[
                    { from: "agent", text: "नमस्ते! 9278 में आपका स्वागत है। मैं आपकी किस प्रकार मदद कर सकता हूँ?" },
                    { from: "customer", text: "4 लोगों के लिए, आज रात 8 बजे टेबल चाहिए।" },
                    { from: "agent", text: "ज़रूर! मैं आपके लिए 8 बजे की टेबल बुक कर देता हूँ। क्या कोई खास पसंद है?" },
                  ]}
                />

                <div className="mt-4 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-[12.5px] font-semibold text-blue-600">
                  <Globe className="size-3.5" aria-hidden />
                  Supports 20+ Indian Languages
                </div>
              </div>
            </div>
          </ScrollStepItem>
        </div>

        {/* Stats bar */}
        <div className="mx-auto mt-10 max-w-7xl">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-blue-400 bg-white px-3 py-3 shadow-[0_20px_50px_-25px_rgba(2,132,199,0.35)]">
            <div className="grid grid-cols-2 divide-y divide-slate-200/70 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
              {[
                { Icon: Zap, label: "First-call response", value: "< 3 sec", tone: "bg-blue-50 text-blue-600" },
                { Icon: BarChart3, label: "Concurrent calls", value: "Up to 40", tone: "bg-emerald-50 text-emerald-600" },
                { Icon: Clock, label: "Always available", value: "24/7", tone: "bg-violet-50 text-violet-600" },
                { Icon: ShieldCheck, label: "Uptime reliability", value: "99.9%", tone: "bg-blue-50 text-blue-600" },
              ].map(({ Icon: StatIcon, label, value, tone }, i) => (
                <ScrollStepItem key={label} index={i} className="group flex flex-col items-center gap-2 px-5 py-5 text-center transition-colors duration-300 hover:bg-blue-50/40">
                  <span className={`grid size-11 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${tone}`}>
                    <StatIcon className="size-5" aria-hidden />
                  </span>
                  <p className="font-sans text-2xl font-extrabold tracking-tight text-slate-900">{value}</p>
                  <p className="text-[12.5px] font-medium text-slate-500">{label}</p>
                </ScrollStepItem>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ImagePlaceholderSection
        src="/images/industries/restaurants-robots.png"
        alt="AI robot staff serving guests in a futuristic restaurant"
        heading="Service that never slows down."
        paragraph="From the moment a call comes in to the moment a table is confirmed, 9278.io keeps the conversation moving — taking reservations, answering menu questions, and handling last-minute changes so your floor staff can stay focused on the guests right in front of them."
      />

      <PricingCta
        heading="Let AI handle calls so your team can focus on great hospitality."
        description="Launch your AI voice agent in minutes. No setup headaches."
        primaryHref="/get-started?industry=restaurants"
        primaryLabel="Launch a restaurant agent"
        secondaryHref="/get-started?industry=restaurants"
        secondaryLabel="Talk to our expert"
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

          <div className="mt-12 grid gap-x-5 gap-y-7 overflow-x-clip sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => ({
              href: `/industries/${r.slug}`,
              titlePrefix: "AI voice agents for ",
              highlight: r.name.toLowerCase(),
              description: r.short,
              icon: r.icon,
            })).map((link, i) => {
              const a = {
                border: "border-l-primary",
                tile: "bg-primary/10 text-primary",
                text: "text-primary",
                ribbon: "bg-primary",
                btn: "bg-primary",
              }
              const LinkIcon = link.icon
              const position = i === 0 ? "left" : i === 2 ? "right" : "middle"

              return (
                <CenterOutItem key={link.href} position={position}>
                  <Link
                    href={link.href}
                    className={`group relative block h-full overflow-hidden rounded-xl border border-l-4 border-slate-200 bg-gradient-to-br from-slate-50/60 to-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:-translate-y-1 active:shadow-lg ${a.border}`}
                  >
                    {/* corner ribbon */}
                    <span
                      aria-hidden
                      className={`absolute right-0 top-0 h-10 w-10 [clip-path:polygon(100%_0,0_0,100%_100%)] ${a.ribbon}`}
                    />

                    {/* dotted decoration */}
                    <div aria-hidden className="absolute right-4 top-10 grid grid-cols-4 gap-1 opacity-60">
                      {Array.from({ length: 16 }).map((_, d) => (
                        <span key={d} className="size-1 rounded-full bg-slate-300" />
                      ))}
                    </div>

                    <span className={`grid size-9 place-items-center rounded-lg ${a.tile}`}>
                      <LinkIcon className="size-4.5" aria-hidden />
                    </span>

                    <h3 className="mt-3 text-balance font-sans text-[15px] font-bold leading-snug tracking-tight text-foreground">
                      {link.titlePrefix}
                      {link.titlePrefix ? <span className={a.text}>{link.highlight}</span> : link.highlight}
                    </h3>
                    <span aria-hidden className={`mt-2 block h-1 w-7 rounded-full ${a.ribbon}`} />
                    <p className="mt-2 text-pretty text-[12.5px] leading-relaxed text-muted-foreground">{link.description}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className={`text-[12.5px] font-semibold ${a.text}`}>Read more</span>
                      <span
                        className={`grid size-7 shrink-0 place-items-center rounded-full text-white shadow-md transition-transform duration-300 group-hover:translate-x-0.5 ${a.btn}`}
                      >
                        <ArrowRight className="size-3" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </CenterOutItem>
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

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const industry = getIndustry(slug)
  if (!industry) notFound()

  if (slug === "ecommerce") {
    return <ECommercePage />
  }

  if (slug === "real-estate") {
    return <RealEstatePage />
  }

  if (slug === "bfsi") {
    return <BfsiPage />
  }

  if (slug === "bpo") {
    return <BpoPage />
  }

  if (slug === "home-services") {
    return <HomeServicesPage />
  }

  if (slug === "restaurants") {
    return <RestaurantsPage />
  }

  const Icon = industry.icon
  const related = getRelatedIndustries(industry.slug)
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

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-blue-50/50 via-background to-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)]"
        />
        <div aria-hidden className="pointer-events-none absolute -left-16 top-10 -z-10 size-56 rounded-full bg-primary/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute right-0 top-32 -z-10 size-64 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="w-full px-6 py-16 md:px-8 md:py-24">
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

          <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white py-1 pl-1 pr-4 text-sm text-muted-foreground shadow-sm">
                <span className="grid size-6 place-items-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-3.5" aria-hidden />
                </span>
                AI voice agents for {industry.name.toLowerCase()}
              </span>
              <h1 className="mt-10 text-[44px] font-extrabold md:text-[60px] lg:text-[72px]" style={{ lineHeight: 0.95, letterSpacing: "-2px" }}>
                <span style={{ color: "#0F172A" }}>AI voice agents</span>{" "}
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  for {industry.name.toLowerCase()}.
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                {industry.pitch}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {industry.caps.map((cap) => (
                  <span key={cap} className={`rounded-full border px-3 py-1 text-xs font-medium ${CAP_COLORS[cap]}`}>
                    {cap}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href={`/get-started?industry=${industry.slug}`}>
                    Get started <ArrowRight className="ml-1 size-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div className="relative">
                <span className="absolute -top-5 right-4 z-10 hidden items-center gap-2 rounded-2xl rounded-br-sm border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-foreground shadow-lg sm:flex">
                  👋 Hi! How can I help you today?
                </span>
                <span className="absolute -bottom-4 -left-4 z-10 grid size-12 place-items-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/[0.06]">
                  <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-primary/[0.07] to-transparent px-5 py-3.5">
                    <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden />
                      Live agent preview
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
                  <div className="space-y-2 p-5">
                    {industry.conversation.map((line, i) => (
                      <div key={i} className={`flex text-sm ${line.speaker === "Agent" ? "justify-start" : "justify-end"}`}>
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
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <ScrollReveal>
            <div className="h-full rounded-3xl bg-primary/5 p-6 sm:p-8">
              <h2 className="text-balance font-serif text-2xl font-semibold tracking-tight md:text-[1.75rem]">
                What the agent does on day one
              </h2>
              <span aria-hidden className="mt-4 block h-1 w-12 rounded-full bg-primary" />
              <ol className="mt-6 space-y-3">
                {industry.jobs.map((job) => (
                  <li key={job} className="flex items-center gap-3 rounded-xl border border-primary/10 bg-white px-4 py-3 shadow-sm">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-white">
                      <Check className="size-3.5" aria-hidden />
                    </span>
                    <span className="text-pretty text-sm leading-relaxed text-foreground/90">{job}</span>
                  </li>
                ))}
              </ol>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="h-full rounded-3xl bg-primary/5 p-6 sm:p-8">
              <h2 className="text-balance font-serif text-2xl font-semibold tracking-tight md:text-[1.75rem]">
                How the agent actually sounds
              </h2>
              <span aria-hidden className="mt-4 block h-1 w-12 rounded-full bg-primary" />
              <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
                Real lines our voice agents have used in {industry.name.toLowerCase()} deployments — generated in real
                time with sub-second latency and natural emotion.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
