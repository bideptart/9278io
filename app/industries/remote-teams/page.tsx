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
  PhoneForwarded,
  Bell,
  BookOpen,
  Bot,
  Plug,
  TrendingUp,
  Wallet,
  BarChart3,
  Briefcase,
  UserCheck,
  Headset,
  Wrench,
  Mic,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal, ScrollStepItem } from "@/components/animation/scroll-reveal"
import { ImagePlaceholderSection } from "@/components/industries/image-placeholder-section"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/jsonld"
import { INDUSTRIES, getIndustry } from "@/lib/industries"
import { RemoteAgentPhoneChat } from "@/components/industries/remote-agent-phone-chat"
import { WorldMap } from "@/components/ui/map"
import { PricingCta } from "@/components/pricing/pricing-cta"

export const metadata: Metadata = pageSeo({
  title: "AI voice agents built for remote teams",
  description:
    "9278.io AI voice agents help remote-first organizations handle employee support, schedule meetings, route requests, and automate communication in 10+ languages.",
  path: "/industries/remote-teams",
})

const PITCH =
  "9278.io automates employee support, meeting scheduling, and request routing—so no call goes unanswered, across time zones or languages."

const HOW_IT_WORKS = [
  { Icon: Bot, step: "1. Deploy Your Agent", text: "Create your AI voice agent with company knowledge, policies, FAQs and workflows." },
  { Icon: Plug, step: "2. Connect & Integrate", text: "Link calendars, CRMs, helpdesks and other tools your team already uses." },
  { Icon: MessageCircle, step: "3. Automate Conversations", text: "Agent handles calls, answers questions, schedules meetings and routes requests." },
  { Icon: TrendingUp, step: "4. Analyze & Improve", text: "Get real-time insights, transcripts and analytics to improve team productivity." },
]

const AGENT_CAN_DO = [
  { Icon: UserCheck, title: "Employee Support", text: "Answer HR, IT, and policy related questions instantly." },
  { Icon: CalendarCheck, title: "Meeting & Call Scheduling", text: "Book, reschedule and manage meetings across teams." },
  { Icon: PhoneForwarded, title: "Smart Call Routing", text: "Route calls to the right person or department." },
  { Icon: Zap, title: "Lead Qualification", text: "Qualify leads and capture important information." },
  { Icon: Bell, title: "Follow-ups & Reminders", text: "Automate follow-ups, reminders and notifications." },
  { Icon: BookOpen, title: "Knowledge Access", text: "Provide instant answers from your documents and guides." },
]

const WHY_CHOOSE = [
  { Icon: Clock, title: "Instant Responses", text: "Get answers in under 3 seconds, every time." },
  { Icon: Zap, title: "Reduce Workload", text: "Automate repetitive conversations and tasks." },
  { Icon: Users, title: "Better Collaboration", text: "Keep distributed teams aligned and informed." },
  { Icon: Wallet, title: "Cost Effective", text: "Lower support costs and improve efficiency." },
  { Icon: ShieldCheck, title: "Secure & Reliable", text: "Enterprise-grade security with 99.9% uptime." },
]

const USE_CASES = [
  { Icon: Briefcase, label: "HR & People Ops", text: "Onboarding, policies, and employee FAQs" },
  { Icon: Users, label: "Customer Success", text: "Handle inquiries and improve satisfaction" },
  { Icon: BarChart3, label: "Sales Teams", text: "Qualify leads and schedule meetings" },
  { Icon: Headset, label: "IT Support", text: "Resolve common issues and route requests" },
  { Icon: Wrench, label: "Operations", text: "Update requests and streamline workflows" },
]

export default function RemoteTeamsPage() {
  const related = INDUSTRIES.filter((i) => i.slug !== "remote-teams").slice(0, 3)

  return (
    <>
      <SiteHeader />
      <main className="min-h-dvh bg-white text-slate-900" style={{ zoom: 0.9 }}>

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: "Remote Teams", path: "/industries/remote-teams" },
        ]}
      />
      <ServiceJsonLd
        name="AI voice agents for remote teams"
        description={PITCH}
        path="/industries/remote-teams"
        serviceType="AI voice agent"
      />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-white">
        <div className="w-full px-6 pt-6 pb-12 md:px-8 md:pt-8 md:pb-16">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-10">
            {/* Left — copy */}
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white py-1.5 pl-1.5 pr-5 text-[12px] font-bold uppercase tracking-wide text-blue-700 shadow-sm">
                <span className="grid size-6 place-items-center rounded-full bg-blue-100 text-blue-600">
                  <Users className="size-3.5" aria-hidden />
                </span>
                AI Voice Agents for Remote Teams
              </span>

              <h1 className="mt-10 text-[44px] font-extrabold md:text-[60px] lg:text-[72px]" style={{ lineHeight: 0.95, letterSpacing: "-2px" }}>
                <span style={{ color: "#0F172A" }}>AI Voice Agents Built</span>
                <br />
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  for Remote Teams
                </span>
              </h1>

              <p className="mt-5 text-pretty text-[16px] font-bold leading-snug text-slate-800">
                Keep your workforce connected with AI voice agents that answer every call instantly, 24/7.
              </p>

              <p className="mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-slate-600">{PITCH}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                {[
                  { Icon: Clock, label: "Always Available 24/7 Support" },
                  { Icon: Globe, label: "Multilingual 10+ Languages" },
                ].map((f) => (
                  <span
                    key={f.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-blue-400 bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-slate-700 shadow-sm"
                  >
                    <f.Icon className="size-3.5 text-blue-600" aria-hidden />
                    {f.label}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-nowrap items-center gap-2 sm:gap-3.5">
                <Button
                  asChild
                  size="lg"
                  className="group h-auto whitespace-nowrap rounded-full bg-blue-600 px-4 py-3 text-[12.5px] font-bold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.65)] transition-all hover:-translate-y-0.5 hover:bg-blue-700 sm:px-7 sm:py-3.5 sm:text-[15px]"
                >
                  <Link href="/get-started?industry=remote-teams">
                    Launch Remote Agent
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-auto whitespace-nowrap rounded-full border-slate-200 bg-white px-4 py-3 text-[12.5px] font-bold text-slate-800 shadow-sm hover:border-blue-300 hover:bg-blue-50/60 hover:text-blue-700 sm:px-6 sm:py-3.5 sm:text-[15px]"
                >
                  <Link href="/get-started?industry=remote-teams">Book a Demo</Link>
                </Button>
              </div>
            </ScrollReveal>

            {/* Right — animated world map showing a distributed team */}
            <ScrollReveal delay={0.14}>
              <div className="relative">
                <div className="overflow-hidden rounded-[1.75rem] border border-blue-400">
                <WorldMap
                  className="aspect-[2/1.55]"
                  lineColor="#2563eb"
                  dots={[
                    {
                      start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
                      end: { lat: 51.5074, lng: -0.1278, label: "London" },
                    },
                    {
                      start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
                      end: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
                    },
                    {
                      start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
                      end: { lat: 40.7128, lng: -74.006, label: "New York" },
                    },
                    {
                      start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
                      end: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
                    },
                    {
                      start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
                      end: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
                    },
                    {
                      start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
                      end: { lat: -23.5505, lng: -46.6333, label: "São Paulo" },
                    },
                  ]}
                />
                </div>

                {/* Remote worker chips */}
                <div
                  className="ind-float absolute -bottom-4 left-6 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-md"
                  style={{ animationDelay: "0.2s" }}
                >
                  <span className="grid size-7 place-items-center rounded-full bg-blue-100 text-blue-600">
                    <MessageCircle className="size-3.5" aria-hidden />
                  </span>
                  <p className="text-[11px] font-semibold text-slate-700">On a call</p>
                </div>

                <div
                  className="ind-float absolute -bottom-4 right-8 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-md"
                  style={{ animationDelay: "1.1s" }}
                >
                  <span className="grid size-7 place-items-center rounded-full bg-blue-100 text-blue-600">
                    <Mic className="size-3.5" aria-hidden />
                  </span>
                  <p className="text-[11px] font-semibold text-slate-700">Speaking</p>
                </div>

                <div
                  className="ind-float absolute -top-4 right-4 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-md"
                  style={{ animationDelay: "0.6s" }}
                >
                  <span className="grid size-7 place-items-center rounded-full bg-blue-100 text-blue-600">
                    <MessageCircle className="size-3.5" aria-hidden />
                  </span>
                  <p className="text-[11px] font-semibold text-slate-700">Connected</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="w-full px-6 pb-10 md:px-8 md:pb-14">
        <ScrollStepItem className="mx-auto max-w-7xl">
          <div className="rounded-[1.75rem] border border-blue-400 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-center font-sans text-xl font-bold text-slate-900 sm:text-2xl">
              How It Works For Remote Teams
            </p>

            <div className="relative mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {HOW_IT_WORKS.map((step, i) => (
                <ScrollStepItem key={step.step} index={i} className="group relative text-center">
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div
                      aria-hidden
                      className="absolute left-1/2 top-6 hidden h-px w-full border-t border-dashed border-blue-300 lg:block"
                    />
                  )}
                  <span className="relative z-10 mx-auto grid size-12 place-items-center rounded-full bg-blue-600 text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <step.Icon className="size-5.5" aria-hidden />
                  </span>
                  <p className="mt-4 text-[14px] font-bold text-slate-900">{step.step}</p>
                  <p className="mt-1.5 text-pretty text-[12.5px] leading-relaxed text-slate-500">{step.text}</p>
                </ScrollStepItem>
              ))}
            </div>
          </div>
        </ScrollStepItem>
      </section>

      {/* ─── What agent can do + phone mockup + Why choose ─── */}
      <section className="w-full px-6 pb-10 md:px-8 md:pb-14">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_340px_1fr]">
          {/* What your remote agent can do */}
          <ScrollStepItem index={0}>
            <div className="h-full rounded-[1.75rem] border border-blue-400 bg-white p-6 shadow-sm">
              <p className="font-sans text-lg font-bold text-slate-900">What Your Remote Agent Can Do</p>
              <div className="mt-4 space-y-4">
                {AGENT_CAN_DO.map((item, i) => (
                  <ScrollStepItem
                    key={item.title}
                    index={i}
                    className="group flex items-start gap-3 rounded-xl transition-all duration-300 hover:-translate-x-0.5"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                      <item.Icon className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="text-[13.5px] font-bold text-slate-900">{item.title}</p>
                      <p className="text-pretty text-[12.5px] leading-snug text-slate-500">{item.text}</p>
                    </div>
                  </ScrollStepItem>
                ))}
              </div>
            </div>
          </ScrollStepItem>

          {/* Phone mockup */}
          <ScrollStepItem index={1} className="hidden h-full self-start lg:block">
            <div className="mx-auto flex h-full w-[300px] flex-col overflow-hidden rounded-[2.25rem] border-[6px] border-slate-900 bg-slate-900 shadow-2xl">
              <div className="flex min-h-0 flex-1 flex-col rounded-[1.75rem] bg-white">
                <div className="flex items-center justify-between px-4 pt-4 text-[11px] font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Bot className="size-4" aria-hidden />
                    AI Agent
                  </span>
                  <span>9:41</span>
                </div>
                <p className="px-4 pt-1.5 text-[13px] font-bold text-emerald-600">Online</p>

                <div className="h-[230px] shrink-0">
                  <RemoteAgentPhoneChat />
                </div>

                <div className="flex items-center gap-2 border-t border-slate-100 px-3.5 py-3">
                  <div className="flex h-4 flex-1 items-end gap-[2px]" aria-hidden>
                    {[3, 6, 4, 7, 5, 8, 4].map((h, i) => (
                      <span
                        key={i}
                        style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
                        className="ind-eq w-[2px] rounded-full bg-blue-500"
                      />
                    ))}
                  </div>
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                    <Mic className="size-3.5" aria-hidden />
                  </span>
                </div>
              </div>
            </div>
          </ScrollStepItem>

          {/* Why remote teams choose 9278.io */}
          <ScrollStepItem index={2}>
            <div className="h-full rounded-[1.75rem] border border-blue-400 bg-white p-6 shadow-sm">
              <p className="font-sans text-lg font-bold text-slate-900">
                Why Remote Teams
                <br />
                Choose 9278.io
              </p>
              <div className="mt-4 space-y-4">
                {WHY_CHOOSE.map((item, i) => (
                  <ScrollStepItem
                    key={item.title}
                    index={i}
                    className="group flex items-start gap-3 rounded-xl transition-all duration-300 hover:-translate-x-0.5"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                      <item.Icon className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="text-[13.5px] font-bold text-slate-900">{item.title}</p>
                      <p className="text-pretty text-[12.5px] leading-snug text-slate-500">{item.text}</p>
                    </div>
                  </ScrollStepItem>
                ))}
              </div>
            </div>
          </ScrollStepItem>
        </div>

        {/* Stats bar */}
        <div className="mx-auto mt-8 max-w-7xl">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-blue-400 bg-gradient-to-r from-blue-800 to-blue-700 px-3 py-3 shadow-lg shadow-blue-800/25">
            <div className="grid grid-cols-2 divide-y divide-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:grid-cols-6">
              {[
                { Icon: Zap, label: "Average Response Time", value: "< 3 Seconds" },
                { Icon: Clock, label: "Support Availability", value: "24/7" },
                { Icon: Globe, label: "Languages Supported", value: "10+" },
                { Icon: Users, label: "Concurrent Calls", value: "Up to 40" },
                { Icon: ShieldCheck, label: "Reliable Uptime", value: "99.9%" },
                { Icon: CalendarCheck, label: "Meeting Scheduling", value: "Automated" },
              ].map(({ Icon: StatIcon, label, value }, i) => (
                <ScrollStepItem
                  key={label}
                  index={i}
                  className="group flex flex-col items-center gap-2 px-5 py-5 text-center transition-colors duration-300 hover:bg-white/5"
                >
                  <span className="grid size-11 place-items-center rounded-2xl bg-white/10 text-white transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <StatIcon className="size-5" aria-hidden />
                  </span>
                  <p className="font-sans text-xl font-extrabold tracking-tight text-white">{value}</p>
                  <p className="text-[12px] font-medium text-blue-100">{label}</p>
                </ScrollStepItem>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Use cases for remote teams ─── */}
      <section className="w-full px-6 pb-10 md:px-8 md:pb-14">
        <ScrollStepItem className="mx-auto max-w-7xl">
          <div className="rounded-[1.75rem] border border-blue-400 bg-white p-6 shadow-sm">
            <p className="font-sans text-lg font-bold text-slate-900">Use Cases For Remote Teams</p>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {USE_CASES.map((u, i) => (
                <ScrollStepItem
                  key={u.label}
                  index={i}
                  className="group flex items-start gap-2.5 rounded-xl border border-slate-100 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                    <u.Icon className="size-4.5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-slate-900">{u.label}</p>
                    <p className="text-pretty text-[11.5px] leading-snug text-slate-500">{u.text}</p>
                  </div>
                </ScrollStepItem>
              ))}
            </div>
          </div>
        </ScrollStepItem>
      </section>

      <ImagePlaceholderSection
        src="/images/industries/remote-teams.png"
        alt="AI voice agent supporting a distributed remote team"
        heading="One agent, wherever your team is."
        paragraph="No matter the time zone, 9278.io picks up every call instantly — answering HR and IT questions, scheduling meetings, and routing requests to the right person, so distributed teams stay connected around the clock."
      />

      <PricingCta
        heading="Your Remote Team Never Misses A Conversation"
        description="Deploy AI voice agents that answer instantly, schedule automatically, and support your team around the clock."
        primaryHref="/get-started?industry=remote-teams"
        primaryLabel="Launch Your Remote Agent"
        secondaryHref="/pricing"
        secondaryLabel="View Pricing"
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
            {related.map((r) => ({
              href: `/industries/${r.slug}`,
              titlePrefix: "AI voice agents for ",
              highlight: r.name.toLowerCase(),
              description: r.short,
              icon: r.icon,
            })).map((link, i) => {
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
