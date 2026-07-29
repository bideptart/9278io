import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Phone,
  ShieldCheck,
  Sparkles,
  Wallet,
  ShoppingBag,
  Truck,
  Headphones,
  Smartphone,
  Volume2,
  Play,
  TrendingUp,
  Globe,
  Zap,
  Package,
  BarChart3,
  Users,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { INDUSTRIES, getIndustry, CAP_COLORS } from "@/lib/industries"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/jsonld"

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
  "Inbound":          "border-indigo-500/25 bg-indigo-500/10 text-indigo-600",
  "24/7 Calling":     "border-emerald-500/25 bg-emerald-500/10 text-emerald-600",
  "Hindi & Regional": "border-violet-500/25 bg-violet-500/10 text-violet-600",
  "Lead Qualify":     "border-purple-500/25 bg-purple-500/10 text-purple-600",
  "TRAI Compliant":   "border-red-500/25 bg-red-500/10 text-red-600",
  "Appointment":      "border-cyan-500/25 bg-cyan-500/10 text-cyan-600",
  "EMI Reminder":     "border-yellow-500/25 bg-yellow-500/10 text-yellow-600",
  "DPDP Ready":       "border-pink-500/25 bg-pink-500/10 text-pink-600",
  "Multilingual":     "border-violet-500/25 bg-violet-500/10 text-violet-600",
}

function ECommercePage() {
  const industry = getIndustry("ecommerce")!
  const Icon = ShoppingBag

  return (
    <main className="min-h-dvh bg-white text-slate-900">
      <SiteHeader />

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
      <section className="relative overflow-hidden bg-gradient-to-b from-violet-50/60 via-indigo-50/30 to-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(139,92,246,0.22),rgba(99,102,241,0.08)_55%,transparent_75%)]"
        />
        <div aria-hidden className="pointer-events-none absolute -left-24 top-6 -z-10 size-80 rounded-full bg-violet-400/18 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-20 top-36 -z-10 size-96 rounded-full bg-indigo-400/18 blur-3xl" />
        {/* Dotted grid pattern like reference */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(139,92,246,0.18) 1px, transparent 1.2px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="w-full px-6 pt-12 pb-12 md:px-8 md:pt-16 md:pb-16">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-10">
            {/* Left — copy */}
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white/90 py-1.5 pl-1.5 pr-5 text-[14px] font-medium text-violet-700 shadow-sm backdrop-blur">
                <span className="grid size-6 place-items-center rounded-full bg-violet-100 text-violet-600">
                  <Sparkles className="size-3.5" aria-hidden />
                </span>
                AI Voice Agents for Modern Businesses
              </span>

              <h1 className="mt-7 text-balance font-serif text-5xl font-extrabold leading-[0.98] tracking-tight text-slate-900 sm:text-[3.4rem] md:text-[4.1rem]">
                <span className="block font-black">AI voice agents</span>
                <span className="block mt-1 bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent font-black">
                  for e-commerce.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-pretty text-[16.5px] leading-[1.75] text-slate-600 md:text-lg">
                D2C brands hit support volume spikes the moment they hit a marketing milestone. 9278.io absorbs the
                surge — order status, returns, sizing, and post-purchase upsells — and only escalates the genuinely
                angry customers to a human.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {/* Inbound */}
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/95 px-4 py-2 text-[13px] font-semibold text-violet-700 shadow-sm">
                  <Phone className="size-4 text-violet-600" aria-hidden />
                  Inbound
                </span>
                {/* 24/7 Calling — GREEN as per reference */}
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/90 px-4 py-2 text-[13px] font-semibold text-emerald-700 shadow-sm">
                  <Clock className="size-4 text-emerald-600" aria-hidden />
                  24/7 Calling
                </span>
                {/* Hindi & Regional */}
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/95 px-4 py-2 text-[13px] font-semibold text-violet-700 shadow-sm">
                  <Globe className="size-4 text-violet-600" aria-hidden />
                  Hindi &amp; Regional
                </span>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                {/* Get Started — purple gradient pill with arrow on RIGHT */}
                <Button
                  asChild
                  size="lg"
                  className="group h-auto rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_30px_-10px_rgba(139,92,246,0.65)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(139,92,246,0.75)]"
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
                  className="h-auto rounded-full border-slate-200 bg-white/95 px-6 py-3.5 text-[15px] font-bold text-slate-800 shadow-sm hover:border-violet-300 hover:bg-violet-50/60 hover:text-violet-700"
                >
                  <Link href="/pricing">
                    <Play className="mr-2 size-4 fill-slate-800 group-hover:fill-violet-700" aria-hidden />
                    View Pricing
                  </Link>
                </Button>
              </div>

              {/* Trusted by 10,000+ brands row */}
              <div className="mt-10 flex items-center gap-3.5">
                {/* Avatar stack */}
                <div className="flex -space-x-3">
                  <div className="grid size-10 place-items-center overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-amber-100 to-orange-100 shadow-sm ring-1 ring-slate-200/60">
                    <img src="/avatars/priya.jpg" alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="grid size-10 place-items-center overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-sky-100 to-blue-100 shadow-sm ring-1 ring-slate-200/60">
                    <img src="/avatars/rahul.jpg" alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="grid size-10 place-items-center overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-emerald-100 to-teal-100 shadow-sm ring-1 ring-slate-200/60">
                    <img src="/avatars/amit.jpg" alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="grid size-10 place-items-center overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-violet-600 to-indigo-600 text-[11px] font-bold text-white shadow-sm ring-1 ring-violet-200/60">
                    +10K
                  </div>
                </div>
                <div className="leading-tight">
                  <p className="text-[13.5px] font-semibold text-slate-800">Trusted by 10,000+ brands</p>
                  <p className="text-[12.5px] text-slate-500">for smarter customer conversations</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Right — futuristic hero illustration */}
            <ScrollReveal delay={0.14}>
              <div className="relative mx-auto w-full max-w-[560px]">
                {/* Main illustration — futuristic robot on podium with floating cards */}
                <div className="relative">
                  <img
                    src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Futuristic%20white%20robot%20with%20purple%20blue%20glowing%20eyes%20wearing%20headset%20standing%20on%20a%20white%20circular%20podium%2C%20surrounded%20by%20four%20floating%20glass%20morphism%20UI%20cards%3A%20shopping%20cart%20order%20update%2C%20package%20returns%2C%20audio%20wave%20listening%2C%20upsell%20chart%20graph.%20Swirling%20orbital%20rings%2C%20sparkle%20particles%2C%20soft%20purple%20blue%20tech%20gradient%20background%2C%20clean%203D%20render%2C%20isometric%20angle&image_size=landscape_4_3"
                    alt="AI Voice Agent for E-commerce — futuristic robot on podium with floating glass cards"
                    className="w-full rounded-[2rem] object-cover"
                    loading="eager"
                  />

                  {/* Overlay Floating Glass Cards (on top of image to ensure exact match) */}

                  {/* Top-left: Order Update Processing */}
                  <div className="absolute left-4 top-6 z-20 hero-float-up">
                    <div className="rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-[0_14px_40px_-14px_rgba(79,70,229,0.35)] backdrop-blur-md ring-1 ring-violet-100/60">
                      <div className="flex items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 text-violet-600">
                          <ShoppingBag className="size-5" aria-hidden />
                        </span>
                        <div>
                          <p className="text-[12.5px] font-bold text-slate-800 leading-tight">Order Update</p>
                          <p className="text-[11px] font-medium text-slate-500">Processing</p>
                        </div>
                        <span className="ml-1 grid size-4 place-items-center rounded-full bg-emerald-500">
                          <Check className="size-2.5 text-white" aria-hidden />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Top-right: AI Voice Agent Listening */}
                  <div className="absolute right-2 top-2 z-20 ind-float">
                    <div className="rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-[0_14px_40px_-14px_rgba(79,70,229,0.35)] backdrop-blur-md ring-1 ring-violet-100/60">
                      <p className="text-[13px] font-bold text-violet-700 leading-tight">AI Voice Agent</p>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <p className="text-[10.5px] font-medium text-slate-500">Listening…</p>
                        <div className="flex h-3 items-end gap-[1.5px]" aria-hidden>
                          {[7, 11, 6, 13, 9, 14, 8, 12, 7, 10, 5, 11].map((h, i) => (
                            <span
                              key={i}
                              style={{
                                height: `${h}px`,
                                animationDelay: `${(i % 6) * 0.1}s`,
                                background:
                                  i < 6
                                    ? "linear-gradient(to top, rgb(139,92,246), rgb(99,102,241))"
                                    : "linear-gradient(to top, rgb(129,140,248), rgb(191,219,254))",
                              }}
                              className="ind-eq w-[2.5px] rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Middle-left: Returns & Exchange Handled */}
                  <div className="absolute left-0 top-[48%] z-20 hero-float-down">
                    <div className="rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-[0_14px_40px_-14px_rgba(79,70,229,0.35)] backdrop-blur-md ring-1 ring-violet-100/60">
                      <div className="flex items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 text-violet-600">
                          <Package className="size-5" aria-hidden />
                        </span>
                        <div>
                          <p className="text-[12.5px] font-bold text-slate-800 leading-tight">Returns &amp; Exchange</p>
                          <p className="text-[11px] font-medium text-slate-500">Handled</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom-right: Upsell Opportunity Identified */}
                  <div className="absolute right-0 bottom-10 z-20 ind-float">
                    <div className="rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-[0_14px_40px_-14px_rgba(79,70,229,0.35)] backdrop-blur-md ring-1 ring-violet-100/60">
                      <div className="flex items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 text-violet-600">
                          <BarChart3 className="size-5" aria-hidden />
                        </span>
                        <div>
                          <p className="text-[12.5px] font-bold text-slate-800 leading-tight">Upsell Opportunity</p>
                          <p className="text-[11px] font-medium text-slate-500">Identified</p>
                        </div>
                        <span className="ml-1 flex gap-1" aria-hidden>
                          <span className="size-1.5 rounded-full bg-slate-300" />
                          <span className="size-1.5 rounded-full bg-slate-300" />
                          <span className="size-1.5 rounded-full bg-violet-500" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ─── Stats bar (directly under hero, inside hero section per reference) ─── */}
        <div className="w-full px-6 pb-10 md:px-8 md:pb-14">
          <ScrollReveal className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-white/95 px-3 py-3 shadow-[0_20px_50px_-25px_rgba(79,70,229,0.35)] backdrop-blur">
              <div className="grid grid-cols-1 divide-y divide-slate-200/70 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
                {[
                  {
                    Icon: Zap,
                    label: "First-touch response",
                    value: "< 3 Seconds",
                    iconBg: "bg-violet-100 text-violet-600",
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
                    iconBg: "bg-violet-100 text-violet-600",
                  },
                ].map(({ Icon: StatIcon, label, value, iconBg }) => (
                  <div key={label} className="flex items-center gap-4 px-5 py-4 sm:px-6 sm:py-5">
                    <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${iconBg}`}>
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
        </div>
      </section>

      {/* ─── What agent does + How it sounds ─── */}
      <section className="w-full px-6 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {/* Left — day-one jobs */}
          <ScrollReveal>
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-violet-100 bg-gradient-to-br from-violet-50/90 via-white to-indigo-50/60 p-7 shadow-sm sm:p-9">
              {/* Shopping bag accent */}
              <div className="absolute -right-2 -top-2 opacity-90">
                <div className="grid size-20 place-items-center rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-500 text-white shadow-lg shadow-violet-500/30">
                  <ShoppingBag className="size-10" aria-hidden />
                </div>
              </div>

              <h2 className="font-serif text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.75rem]">
                What the agent does
                <br />
                on day one
              </h2>

              <ol className="mt-8 space-y-3.5">
                {industry.jobs.map((job) => (
                  <li
                    key={job}
                    className="flex items-center gap-3.5 rounded-2xl border border-violet-100/70 bg-white/90 px-5 py-3.5 shadow-[0_2px_10px_-4px_rgba(79,70,229,0.1)] backdrop-blur"
                  >
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/25">
                      <Check className="size-3.5" aria-hidden />
                    </span>
                    <span className="text-pretty text-[14.5px] leading-relaxed text-slate-700">{job}</span>
                  </li>
                ))}
              </ol>
            </div>
          </ScrollReveal>

          {/* Right — how agent sounds */}
          <ScrollReveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-indigo-100 bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/60 p-7 shadow-sm sm:p-9">
              {/* Sound-wave accent */}
              <div className="absolute -right-2 -top-2 opacity-90">
                <div className="grid size-20 place-items-center rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/30">
                  <Volume2 className="size-9" aria-hidden />
                </div>
              </div>

              <h2 className="font-serif text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.75rem]">
                How the agent
                <br />
                actually sounds
              </h2>

              <p className="mt-5 text-pretty text-[14.5px] leading-relaxed text-slate-600">
                Real lines, real tone — in e-commerce deployments — generated in real time with sub-second latency and
                natural emotion.
              </p>

              {/* Live agent preview panel */}
              <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_-18px_rgba(79,70,229,0.25)]">
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-violet-50/80 via-indigo-50/60 to-transparent px-5 py-3.5">
                  <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" aria-hidden />
                    Live Agent Preview
                  </p>
                  <div className="flex h-5 items-end gap-[2px]" aria-hidden>
                    {[7, 13, 9, 15, 11, 8, 14].map((h, i) => (
                      <span
                        key={i}
                        style={{ height: `${h}px`, animationDelay: `${(i % 5) * 0.12}s` }}
                        className="ind-eq w-1 rounded-full bg-gradient-to-t from-violet-500 to-indigo-500"
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5 p-5">
                  <div className="flex text-sm">
                    <span className="max-w-[85%] rounded-2xl rounded-bl-sm bg-violet-50 px-4 py-2.5 text-violet-800 ring-1 ring-violet-100">
                      <span className="mr-1 text-[10px] font-bold uppercase opacity-70">Agent</span>
                      👋 Hello! What can I help you with today?
                    </span>
                  </div>
                  <div className="flex text-sm justify-end">
                    <span className="max-w-[85%] rounded-2xl rounded-br-sm bg-slate-50 px-4 py-2.5 text-slate-700 ring-1 ring-slate-200">
                      <span className="mr-1 text-[10px] font-bold uppercase opacity-40">Customer</span>
                      Can you track my order?
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── How teams roll out — 3 showcase cards ─── */}
      <section className="w-full px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-gradient-to-r from-violet-50 to-indigo-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-violet-700">
              <Sparkles className="size-3.5" aria-hidden />
              Powering real businesses
            </span>
            <h2 className="mt-5 text-balance font-serif text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              How e-commerce
              <br />
              teams roll out{" "}
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                9278.io
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-600">
              From D2C startups to enterprise brands — our AI agents scale with your business and speak your
              customers' language.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "E-commerce",
                desc: "Handle support, returns and post-purchase at scale.",
                Icon: Smartphone,
                prompt: "Smartphone%20with%20shopping%20cart%20app%20on%20screen%20next%20to%20pink%20shopping%20cart%2C%20soft%20pastel%20purple%20gradient%20background%2C%20clean%203D%20render%2C%20minimal",
                href: "/industries/ecommerce",
              },
              {
                title: "Logistics & Delivery",
                desc: "Track orders and resolve shipping queries instantly.",
                Icon: Truck,
                prompt: "Light%20blue%20delivery%20truck%20with%20stacked%20brown%20cardboard%20boxes%2C%20soft%20pastel%20purple%20and%20blue%20gradient%20background%2C%20clean%203D%20render%2C%20minimal",
                href: "/industries/bpo",
              },
              {
                title: "Customer Support",
                desc: "Delight customers with human-like AI conversations.",
                Icon: Headphones,
                prompt: "Friendly%20purple%20robot%20wearing%20a%20customer%20support%20headset%2C%20soft%20pastel%20purple%20and%20blue%20gradient%20background%2C%20clean%203D%20render%2C%20minimal",
                href: "/industries/bpo",
              },
            ].map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.08}>
                <Link
                  href={card.href}
                  className="group block h-full overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-300 hover:shadow-[0_25px_50px_-20px_rgba(79,70,229,0.35)]"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={`https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${card.prompt}&image_size=landscape_4_3`}
                      alt={card.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-violet-500/20 via-indigo-500/10 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2.5">
                      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 text-violet-600 ring-1 ring-violet-100">
                        <card.Icon className="size-5" aria-hidden />
                      </span>
                      <h3 className="font-serif text-lg font-semibold tracking-tight text-slate-900">
                        {card.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{card.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-violet-600 transition-all group-hover:gap-2">
                      Read more
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI agents that grow with you ─── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-violet-50/60 via-indigo-50/40 to-sky-50/50 px-6 py-16 md:px-8 md:py-24">
        <div aria-hidden className="pointer-events-none absolute -left-24 top-16 -z-10 size-72 rounded-full bg-violet-400/15 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 -z-10 size-80 rounded-full bg-indigo-400/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left — copy */}
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-violet-700 shadow-sm backdrop-blur">
              <Sparkles className="size-3.5" aria-hidden />
              The smarter way to scale
            </span>
            <h2 className="mt-5 text-balance font-serif text-4xl font-bold tracking-tight text-slate-900 sm:text-[2.6rem]">
              AI agents that{" "}
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                grow with you
              </span>
            </h2>

            <ul className="mt-7 space-y-3.5">
              {[
                "Lower support costs",
                "Happier customers",
                "Higher repeat purchases",
                "Always-on availability",
              ].map((line) => (
                <li key={line} className="flex items-center gap-3.5">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/25">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  <span className="text-pretty text-[15px] leading-relaxed text-slate-700 font-medium">{line}</span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              size="lg"
              className="group mt-9 h-auto rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-600/40"
            >
              <Link href="/get-started?industry=ecommerce">
                Launch an e-commerce agent
                <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </Button>
          </ScrollReveal>

          {/* Right — performance dashboard mock */}
          <ScrollReveal delay={0.12}>
            <div className="relative">
              {/* +32% floating badge */}
              <div className="absolute -bottom-5 -right-3 z-20 hero-float-up">
                <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-[0_15px_35px_-12px_rgba(79,70,229,0.35)] ring-1 ring-violet-100">
                  <span className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 text-white">
                    <TrendingUp className="size-4" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-violet-700 leading-none">+32%</p>
                    <p className="text-[10px] font-medium text-slate-500 mt-0.5">vs. last month</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(79,70,229,0.35)] sm:p-8">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <span className="grid size-5 place-items-center rounded-md bg-violet-100 text-violet-600">
                    <ShieldCheck className="size-3" aria-hidden />
                  </span>
                  Real-time performance
                </p>

                <div className="mt-6 grid grid-cols-3 gap-5">
                  {[
                    { label: "Conversations", value: "12,450" },
                    { label: "Customer Satisfaction", value: "98.2%" },
                    { label: "Revenue Impact", value: "₹4.2L" },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="font-serif text-xl font-bold tracking-tight text-violet-700 sm:text-2xl">
                        {s.value}
                      </p>
                      <p className="mt-1 text-[11px] font-medium leading-snug text-slate-500">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Fake area chart */}
                <div className="mt-7 h-32 w-full">
                  <svg viewBox="0 0 400 120" className="h-full w-full" aria-hidden>
                    <defs>
                      <linearGradient id="ecomArea" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgb(139,92,246)" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="rgb(99,102,241)" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="ecomLine" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="rgb(139,92,246)" />
                        <stop offset="100%" stopColor="rgb(99,102,241)" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,90 C40,85 60,70 90,68 C120,66 140,82 170,70 C200,58 220,45 250,42 C280,39 300,55 330,40 C360,25 380,20 400,15 L400,120 L0,120 Z"
                      fill="url(#ecomArea)"
                    />
                    <path
                      d="M0,90 C40,85 60,70 90,68 C120,66 140,82 170,70 C200,58 220,45 250,42 C280,39 300,55 330,40 C360,25 380,20 400,15"
                      fill="none"
                      stroke="url(#ecomLine)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Final CTA banner ─── */}
      <section className="w-full px-6 pb-16 pt-10 md:px-8 md:pb-24 md:pt-12">
        <ScrollReveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 px-6 py-10 shadow-2xl shadow-violet-700/35 md:px-12 md:py-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_100%_at_85%_0%,rgba(255,255,255,0.22),rgba(255,255,255,0.06)_40%,transparent_70%)]"
          />
          <div aria-hidden className="pointer-events-none absolute -left-10 top-6 size-48 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex flex-col items-start gap-7 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-5">
              <div className="hidden shrink-0 sm:block">
                <img
                  src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Close%20up%20portrait%20of%20cute%20white%20robot%20face%20with%20bright%20blue%20glowing%20eyes%2C%20soft%20purple%20gradient%20background%2C%20clean%203D%20render%2C%20minimal&image_size=square"
                  alt="AI robot assistant"
                  className="h-28 w-28 rounded-3xl object-cover ring-2 ring-white/25"
                  loading="lazy"
                />
              </div>
              <div className="max-w-xl">
                <h3 className="text-balance font-serif text-2xl font-bold tracking-tight text-white md:text-[2rem]">
                  Ready to transform your customer experience?
                </h3>
                <p className="mt-3 text-pretty leading-relaxed text-white/80">
                  Join 9278.io and let AI do the talking.
                </p>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="h-auto rounded-full bg-white px-8 py-4 text-base font-bold text-violet-700 shadow-xl transition-all hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-2xl"
            >
              <Link href="/get-started?industry=ecommerce">
                Get Started
                <ArrowRight className="ml-2 size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </section>

      <SiteFooter />
    </main>
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

  const Icon = industry.icon
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

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-primary/[0.06] via-sky-50/40 to-transparent">
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
              <h1 className="mt-6 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                AI voice agents <span className="text-primary">for {industry.name.toLowerCase()}.</span>
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
