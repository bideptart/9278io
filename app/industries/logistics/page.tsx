import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  Clock,
  Zap,
  ShieldCheck,
  Users,
  Globe,
  MessageCircle,
  CalendarCheck,
  Bell,
  ClipboardCheck,
  PhoneMissed,
  Truck,
  Package,
  MapPin,
  Headphones,
  Bot,
  Bike,
  Boxes,
  Route,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal, ScrollStepItem } from "@/components/animation/scroll-reveal"
import { ImagePlaceholderSection } from "@/components/industries/image-placeholder-section"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/jsonld"
import { LogisticsLivePreview } from "@/components/industries/logistics-live-preview"
import { OrderTracking } from "@/components/ui/order-tracking"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { INDUSTRIES, getIndustry } from "@/lib/industries"

export const metadata: Metadata = pageSeo({
  title: "AI voice agents for logistics & delivery",
  description:
    "9278.io AI voice agents help logistics companies automate delivery coordination, shipment tracking, customer notifications, and driver communication in 10+ Indian languages.",
  path: "/industries/logistics",
})

const PITCH =
  "9278.io AI voice agents help logistics companies automate delivery coordination, shipment tracking, customer notifications, and driver communication in 10+ Indian languages. Answer every call instantly, reduce support workload, and keep customers informed from dispatch to delivery."

const AGENT_HANDLES = [
  { Icon: MessageCircle, text: "Instantly answer shipment status inquiries" },
  { Icon: CalendarCheck, text: "Confirm delivery schedules with customers" },
  { Icon: Bell, text: "Notify customers about delays or rescheduled deliveries" },
  { Icon: Users, text: "Coordinate with drivers and dispatch teams" },
  { Icon: ClipboardCheck, text: "Capture proof-of-delivery confirmations" },
  { Icon: PhoneMissed, text: "Handle missed delivery follow-ups automatically" },
]

const BENEFITS = [
  "Faster customer response times",
  "Reduced support center workload",
  "Improved delivery success rates",
  "Real-time communication across regions",
  "Consistent service in multiple Indian languages",
]

const FLEET_ITEMS = [
  "Instant shipment updates",
  "Multilingual customer communication",
  "Automated delivery confirmations",
  "Real-time call transcripts",
  "24/7 availability",
  "Reduced operational costs",
  "Scalable across cities and regions",
]

const USE_CASES = [
  { Icon: Truck, label: "Last-Mile Delivery Coordination" },
  { Icon: Bike, label: "Courier Services" },
  { Icon: Truck, label: "Freight & Transportation" },
  { Icon: Boxes, label: "Warehouse Operations" },
  { Icon: Route, label: "Fleet Management" },
]

export default function LogisticsPage() {
  const related = INDUSTRIES.filter((i) => i.slug !== "logistics").slice(0, 3)
  const education = getIndustry("education")

  return (
    <>
      <SiteHeader />
      <main className="min-h-dvh bg-white text-slate-900" style={{ zoom: 0.9 }}>

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: "Logistics", path: "/industries/logistics" },
        ]}
      />
      <ServiceJsonLd
        name="AI voice agents for logistics & delivery"
        description={PITCH}
        path="/industries/logistics"
        serviceType="AI voice agent"
      />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-white">
        <div className="w-full px-6 pt-6 pb-12 md:px-8 md:pt-8 md:pb-16">

          <div className="mx-auto grid max-w-7xl items-end gap-14 lg:grid-cols-2 lg:gap-10">
            {/* Left — copy */}
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white py-1.5 pl-1.5 pr-5 text-[12px] font-bold uppercase tracking-wide text-blue-700 shadow-sm">
                <span className="grid size-6 place-items-center rounded-full bg-blue-100 text-blue-600">
                  <Truck className="size-3.5" aria-hidden />
                </span>
                AI Voice Agents for Logistics
              </span>

              <h1 className="mt-10 text-[44px] font-extrabold md:text-[60px] lg:text-[72px]" style={{ lineHeight: 0.95, letterSpacing: "-2px" }}>
                <span style={{ color: "#0F172A" }}>AI Voice Agents for</span>
                <br />
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Logistics &amp; Delivery
                </span>
              </h1>

              <p className="mt-5 text-pretty text-[16px] font-bold leading-snug text-slate-800">
                Never miss a shipment update, delivery confirmation, or customer inquiry.
              </p>

              <p className="mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-slate-600">{PITCH}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                {[
                  { Icon: Clock, label: "24/7 Shipment Updates" },
                  { Icon: Check, label: "Delivery Confirmation" },
                  { Icon: Users, label: "Driver Coordination" },
                  { Icon: Globe, label: "Multilingual Support" },
                ].map((f) => (
                  <span
                    key={f.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-slate-700 shadow-sm"
                  >
                    <f.Icon className="size-3.5 text-blue-600" aria-hidden />
                    {f.label}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Button
                  asChild
                  size="lg"
                  className="group h-auto rounded-full bg-blue-600 px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.65)] transition-all hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  <Link href="/get-started?industry=logistics">
                    Get Started
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-auto rounded-full border-slate-200 bg-white px-6 py-3.5 text-[15px] font-bold text-slate-800 shadow-sm hover:border-blue-300 hover:bg-blue-50/60 hover:text-blue-700"
                >
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </ScrollReveal>

            {/* Right — order tracking map card */}
            <ScrollReveal delay={0.14}>
              <div className="relative mx-auto w-full max-w-[620px] overflow-hidden rounded-[1.75rem] shadow-xl shadow-slate-900/10">
                {/* Map panel */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] border border-blue-400 bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100">
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.35]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(37,99,235,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.12) 1px, transparent 1px)",
                      backgroundSize: "26px 26px",
                    }}
                  />

                  {/* Dashed delivery route */}
                  <svg className="absolute inset-0 h-full w-full" aria-hidden viewBox="0 0 400 300" preserveAspectRatio="none">
                    <path
                      d="M 160 276 C 220 250, 280 150, 344 39"
                      fill="none"
                      stroke="rgb(37,99,235)"
                      strokeOpacity="0.55"
                      strokeWidth="3"
                      strokeDasharray="7 7"
                      strokeLinecap="round"
                      className="connector-flow"
                      style={{ animationDirection: "reverse" }}
                    />
                  </svg>

                  {/* Origin pin */}
                  <div className="absolute bottom-[8%] left-[40%] grid size-6 place-items-center rounded-full bg-emerald-500 ring-4 ring-emerald-500/25" aria-hidden />

                  {/* Destination pin */}
                  <div className="absolute right-[14%] top-[13%]" aria-hidden>
                    <div className="relative grid size-9 place-items-center">
                      <MapPin className="size-9 fill-rose-500 text-rose-500 drop-shadow" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Truck on route */}
                  <div className="absolute left-[63%] top-[63%] -translate-x-1/2 -translate-y-1/2">
                    <div className="ind-truck-drive grid size-12 place-items-center rounded-xl bg-blue-600 text-white shadow-xl shadow-blue-600/30 sm:size-14">
                      <Truck className="size-6 sm:size-7" aria-hidden />
                    </div>
                  </div>

                  {/* AI Voice Agent badge */}
                  <div className="absolute right-2 top-2 flex animate-pulse items-center gap-1.5 rounded-xl bg-white px-1.5 py-1.5 shadow-md [animation-duration:2.4s] sm:right-3 sm:top-3 sm:gap-2 sm:px-3 sm:py-2">
                    <span className="relative grid size-6 shrink-0 place-items-center rounded-full bg-blue-600 text-white sm:size-7">
                      <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping [animation-duration:1.8s]" aria-hidden />
                      <Headphones className="relative size-3 sm:size-3.5" aria-hidden />
                    </span>
                    <div className="hidden sm:block">
                      <p className="text-[11px] font-bold leading-tight text-slate-800">AI Voice Agent</p>
                      <p className="text-[10px] text-slate-500">24/7 Support</p>
                    </div>
                  </div>

                  {/* Order tracking timeline panel */}
                  <div className="absolute left-2 top-2 w-[145px] rounded-2xl bg-white/95 p-2.5 shadow-lg backdrop-blur sm:left-3 sm:top-3 sm:w-[210px] sm:p-4">
                    <p className="text-[10px] font-black uppercase tracking-wide text-slate-900 sm:text-[13px]">Order Tracking</p>
                    <div className="mb-2 mt-1 h-1 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-100 sm:mb-3 sm:mt-1.5 sm:w-16" />
                    <OrderTracking
                      className="max-w-none [&_svg]:h-3.5 [&_svg]:w-3.5 [&_p:first-child]:text-[10px] [&_p:last-child]:text-[8.5px] [&_.pb-6]:pb-2 [&_.ml-3]:ml-1.5 sm:[&_svg]:h-5 sm:[&_svg]:w-5 sm:[&_p:first-child]:text-[13px] sm:[&_p:last-child]:text-[11px] sm:[&_.pb-6]:pb-4 sm:[&_.ml-3]:ml-3"
                      steps={[
                        { name: "Order Placed", timestamp: "9:02 AM", isCompleted: true },
                        { name: "Picked Up", timestamp: "10:15 AM", isCompleted: true },
                        { name: "In Transit", timestamp: "12:40 PM", isCompleted: true },
                        { name: "Out for Delivery", timestamp: "Today", isCompleted: false },
                        { name: "Delivered", timestamp: "Pending", isCompleted: false },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── What agent handles + Benefits + Live agent preview ─── */}
      <section className="w-full px-6 pb-10 md:px-8 md:pb-14">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {/* What the agent handles */}
          <ScrollStepItem index={0}>
            <div className="h-full rounded-[1.75rem] border border-blue-400 bg-white p-6 shadow-sm">
              <p className="font-sans text-lg font-bold text-slate-900">What the agent handles</p>
              <div className="mt-4 space-y-4">
                {AGENT_HANDLES.map((item, i) => (
                  <ScrollStepItem
                    key={item.text}
                    index={i}
                    className="group flex items-start gap-3 rounded-xl transition-all duration-300 hover:-translate-x-0.5"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                      <item.Icon className="size-4" aria-hidden />
                    </span>
                    <span className="text-pretty text-[13.5px] leading-snug text-slate-700">{item.text}</span>
                  </ScrollStepItem>
                ))}
              </div>
            </div>
          </ScrollStepItem>

          {/* Benefits */}
          <ScrollStepItem index={1}>
            <div className="flex h-full flex-col rounded-[1.75rem] border border-blue-400 bg-white p-6 shadow-sm">
              <p className="font-sans text-lg font-bold text-slate-900">Benefits for your logistics business</p>
              <div className="mt-4 space-y-3.5">
                {BENEFITS.map((line, i) => (
                  <ScrollStepItem key={line} index={i} className="flex items-start gap-3">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                      <Check className="size-3" aria-hidden />
                    </span>
                    <span className="text-pretty text-[13.5px] leading-snug text-slate-700">{line}</span>
                  </ScrollStepItem>
                ))}
              </div>

              {/* Decorative package/globe illustration */}
              <div className="relative mt-auto flex h-40 items-end justify-center pt-8">
                <Globe className="size-24 text-blue-200" strokeWidth={1} aria-hidden />
                <span className="absolute bottom-6 grid size-14 place-items-center rounded-full bg-blue-600 text-white shadow-md">
                  <MapPin className="size-6" aria-hidden />
                </span>
                <span className="absolute bottom-0 left-[34%] grid size-12 place-items-center rounded-lg bg-amber-100 text-amber-700 shadow-sm">
                  <Package className="size-6" aria-hidden />
                </span>
                <span className="absolute bottom-3 right-[32%] grid size-11 place-items-center rounded-lg bg-amber-100 text-amber-700 shadow-sm">
                  <Package className="size-5.5" aria-hidden />
                </span>
              </div>
            </div>
          </ScrollStepItem>

          {/* Live agent preview */}
          <ScrollStepItem index={2}>
            <div className="h-full overflow-hidden rounded-[1.75rem] border border-blue-400 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="font-sans text-lg font-bold text-slate-900">Live agent preview</p>
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                  <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden />
                  Live
                </span>
              </div>

              <LogisticsLivePreview />
            </div>
          </ScrollStepItem>
        </div>
      </section>

      {/* ─── How teams roll out + AI agents that move with your fleet ─── */}
      <section className="w-full px-6 pb-10 md:px-8 md:pb-14">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_360px]">
          {/* Rollout card */}
          <ScrollStepItem index={0}>
            <div className="h-full rounded-[1.75rem] border border-blue-400 bg-white p-6 shadow-sm sm:p-7">
              <p className="font-sans text-xl font-bold text-slate-900">How logistics teams roll out 9278.io</p>

              <div className="relative mt-6 grid gap-8 sm:grid-cols-2">
                <div
                  aria-hidden
                  className="absolute left-1/2 top-10 hidden -translate-x-1/2 items-center gap-1 text-blue-400 sm:flex"
                >
                  <span className="h-px w-8 border-t border-dashed border-blue-300" />
                  <ArrowRight className="size-4" />
                </div>

                <ScrollStepItem index={0} className="group">
                  <span className="grid size-8 place-items-center rounded-full bg-blue-600 text-[12px] font-bold text-white">
                    01
                  </span>
                  <div className="relative mt-4 flex h-28 items-center justify-center overflow-hidden rounded-2xl bg-blue-50 transition-transform duration-300 group-hover:scale-[1.02]">
                    <div className="relative flex flex-col items-center">
                      <div className="grid size-14 place-items-center rounded-2xl bg-white shadow-md">
                        <Headphones className="size-6 text-blue-600" aria-hidden />
                      </div>
                      <span className="absolute -bottom-1.5 -right-1.5 grid size-6 place-items-center rounded-full bg-emerald-500 text-white shadow-sm">
                        <Check className="size-3" aria-hidden />
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-[14px] font-bold text-slate-900">Launch a logistics agent</p>
                  <p className="mt-1.5 text-pretty text-[13px] leading-relaxed text-slate-500">
                    Deploy a shipment support agent with your delivery workflows, customer FAQs, and operational
                    processes. Go live in hours with no complex setup.
                  </p>
                </ScrollStepItem>

                <ScrollStepItem index={1} className="group">
                  <span className="grid size-8 place-items-center rounded-full bg-blue-600 text-[12px] font-bold text-white">
                    02
                  </span>
                  <div className="relative mt-4 flex h-28 items-center justify-center overflow-hidden rounded-2xl bg-blue-50 transition-transform duration-300 group-hover:scale-[1.02]">
                    <div className="flex h-16 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-slate-900 bg-white p-1.5">
                      <div className="flex h-4 items-end gap-[1.5px]" aria-hidden>
                        {[3, 6, 4, 7, 5].map((h, i) => (
                          <span
                            key={i}
                            style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
                            className="ind-eq w-[1.5px] rounded-full bg-blue-600"
                          />
                        ))}
                      </div>
                      <Truck className="size-3.5 text-blue-600" aria-hidden />
                    </div>
                  </div>
                  <p className="mt-4 text-[14px] font-bold text-slate-900">Automate delivery communications</p>
                  <p className="mt-1.5 text-pretty text-[13px] leading-relaxed text-slate-500">
                    Handle tracking requests, delivery confirmations, and driver updates automatically while
                    reducing manual call volume.
                  </p>
                </ScrollStepItem>
              </div>
            </div>
          </ScrollStepItem>

          {/* Fleet panel */}
          <ScrollStepItem index={1}>
            <div className="h-full rounded-[1.75rem] bg-gradient-to-br from-blue-700 to-blue-600 p-6 text-white shadow-lg shadow-blue-700/25 sm:p-7">
              <p className="font-sans text-xl font-bold">AI agents that move with your fleet</p>
              <div className="mt-5 space-y-3">
                {FLEET_ITEMS.map((line, i) => (
                  <ScrollStepItem
                    key={line}
                    index={i}
                    className="flex items-start gap-2.5 transition-transform duration-300 hover:translate-x-1"
                  >
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-white/15 text-white">
                      <Check className="size-3" aria-hidden />
                    </span>
                    <span className="text-pretty text-[13.5px] leading-snug text-blue-50">{line}</span>
                  </ScrollStepItem>
                ))}
              </div>
            </div>
          </ScrollStepItem>
        </div>

        {/* Stats bar */}
        <div className="mx-auto mt-8 max-w-7xl">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-blue-400 bg-white px-3 py-3 shadow-[0_20px_50px_-25px_rgba(2,132,199,0.35)]">
            <div className="grid grid-cols-2 divide-y divide-slate-200/70 sm:grid-cols-5 sm:divide-x sm:divide-y-0">
              {[
                { Icon: Zap, label: "Average response time", value: "< 3 Seconds" },
                { Icon: Clock, label: "Automated support availability", value: "24/7" },
                { Icon: Globe, label: "Indian languages supported", value: "10+" },
                { Icon: ShieldCheck, label: "Reliable call handling", value: "99.9%" },
                { Icon: Users, label: "Concurrent delivery inquiries", value: "Up to 40" },
              ].map(({ Icon: StatIcon, label, value }, i) => (
                <ScrollStepItem
                  key={label}
                  index={i}
                  className="group flex flex-col items-center gap-2 px-5 py-5 text-center transition-colors duration-300 hover:bg-blue-50/40"
                >
                  <span className="grid size-11 place-items-center rounded-2xl bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <StatIcon className="size-5" aria-hidden />
                  </span>
                  <p className="font-sans text-xl font-extrabold tracking-tight text-slate-900">{value}</p>
                  <p className="text-[12px] font-medium text-slate-500">{label}</p>
                </ScrollStepItem>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Other use cases ─── */}
      <section className="w-full px-6 pb-10 md:px-8 md:pb-14">
        <ScrollStepItem className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 rounded-[1.75rem] border border-blue-400 bg-white px-6 py-5 shadow-sm sm:flex-row sm:items-center">
            <p className="shrink-0 font-sans text-lg font-bold text-slate-900">Other use cases</p>
            <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-5">
              {USE_CASES.map((u, i) => (
                <ScrollStepItem
                  key={u.label}
                  index={i}
                  className="group flex items-center gap-2.5 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                    <u.Icon className="size-4.5" aria-hidden />
                  </span>
                  <span className="text-[12.5px] font-semibold leading-snug text-slate-700">{u.label}</span>
                </ScrollStepItem>
              ))}
            </div>
          </div>
        </ScrollStepItem>
      </section>

      <ImagePlaceholderSection
        src="/images/industries/logistics.png"
        alt="AI voice agent coordinating logistics and delivery operations"
        heading="Every shipment, tracked and communicated."
        paragraph="From dispatch to delivery, 9278.io keeps customers and drivers in the loop — confirming pickups, answering tracking questions, and handling delay notifications instantly, so your ops team can focus on keeping the fleet moving."
      />

      <PricingCta
        heading="Keep Every Delivery On Track"
        description="Automate shipment updates, delivery confirmations, and customer communication with AI voice agents built for Indian logistics operations."
        primaryHref="/get-started?industry=logistics"
        primaryLabel="Launch Your Logistics Agent"
        secondaryHref="/get-started?industry=logistics"
        secondaryLabel="Book a Demo"
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
                icon: ShieldCheck,
              },
              {
                href: "/faq",
                titlePrefix: "",
                highlight: "FAQ — credit, phone numbers, compliance",
                description: "Pricing, phone numbers, TRAI calling-window enforcement, DPDP Act 2023, and more.",
                icon: Globe,
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
