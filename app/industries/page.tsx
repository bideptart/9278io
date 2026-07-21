import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, Sparkles } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PlaybooksCardStack } from "@/components/industries/playbooks-card-stack"
import { Marquee } from "@/components/ui/marquee"
import { INDUSTRIES, CAP_COLORS } from "@/lib/industries"

/* Per-industry accent palette for the airy grid. Literal classes so
   Tailwind's scanner keeps them; child accents use currentColor. */
const ACCENTS = [
  "text-blue-600", "text-violet-600", "text-cyan-600", "text-orange-600", "text-emerald-600",
  "text-purple-600", "text-pink-600", "text-indigo-600", "text-teal-600", "text-rose-600", "text-amber-600",
]
const ACCENT_TILES = [
  "bg-blue-50 border-blue-200", "bg-violet-50 border-violet-200", "bg-cyan-50 border-cyan-200",
  "bg-orange-50 border-orange-200", "bg-emerald-50 border-emerald-200", "bg-purple-50 border-purple-200",
  "bg-pink-50 border-pink-200", "bg-indigo-50 border-indigo-200", "bg-teal-50 border-teal-200",
  "bg-rose-50 border-rose-200", "bg-amber-50 border-amber-200",
]
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

export const metadata: Metadata = pageSeo({
  title: "Industries we power",
  description:
    "Pre-tuned AI voice agents for BFSI, BPO, real estate, home services, restaurants, automotive, legal, education, e-commerce, and fitness — live in under 5 minutes.",
  path: "/industries",
})

/* Single industry tile — shared by the mobile marquee rows and the sm+ grid. */
function IndustryCard({
  ind,
  i,
  className = "",
}: {
  ind: (typeof INDUSTRIES)[number]
  i: number
  className?: string
}) {
  const Icon = ind.icon
  const accent = ACCENTS[i % ACCENTS.length]
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-current hover:shadow-xl ${accent} ${className}`}
    >
      <Link href={`/industries/${ind.slug}`} className="relative flex h-full flex-col p-6">
        {/* oversized watermark of the industry icon */}
        <Icon
          aria-hidden
          className="pointer-events-none absolute -bottom-7 -right-5 size-32 text-current opacity-[0.05] transition-all duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110 group-hover:opacity-[0.09]"
        />
        {/* accent colour-wash on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-current opacity-0 transition-opacity duration-500 group-hover:opacity-[0.05]"
        />

        {/* filled accent icon badge + name on one line */}
        <div className="relative flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-current shadow-md transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110">
            <Icon className="size-5 text-white" aria-hidden />
          </span>
          <h3 className="min-w-0 font-serif text-lg font-semibold tracking-tight text-foreground">{ind.name}</h3>
        </div>
        {/* accent underline that grows on hover */}
        <span
          aria-hidden
          className="relative mt-3 block h-[3px] w-9 origin-left rounded-full bg-current transition-all duration-500 group-hover:w-16"
        />

        <p className="relative mt-3 text-xs leading-snug text-muted-foreground">{ind.short}</p>
        <div className="relative mt-auto flex flex-nowrap gap-1 pt-3.5">
          {ind.caps.map((cap) => (
            <span
              key={cap}
              className={`min-w-0 shrink whitespace-nowrap rounded-full border px-1.5 py-0.5 text-center text-[8px] font-medium leading-tight ${CAP_COLORS[cap]}`}
            >
              {cap}
            </span>
          ))}
        </div>
      </Link>
    </div>
  )
}

export default function IndustriesPage() {
  return (
    <main className="min-h-dvh bg-white text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ]}
      />

      {/* ── Hero — classical light band, left-aligned editorial ── */}
      <section className="relative overflow-hidden border-b border-slate-200/70 bg-white text-foreground">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_20%_0%,rgba(79,110,247,0.10),transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:56px_56px]"
        />
        <div className="w-full px-6 pb-12 pt-8 md:px-8 md:pb-14 md:pt-9">
          <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            {/* Left — copy */}
            <ScrollReveal>
              <div className="max-w-3xl">
                <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-3.5 py-1.5 text-[10px] font-semibold uppercase leading-tight tracking-wide text-primary sm:px-5 sm:py-2 sm:text-xs sm:tracking-[0.18em]">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
                  Pre-tuned for the calls you actually take
                </span>
                <h1 className="mt-7 text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                  Built for every kind of phone call.
                </h1>
                <div className="mt-6 h-px w-28 bg-gradient-to-r from-primary to-transparent" aria-hidden />
                <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                  One AI voice agent that answers calls, qualifies leads, and books appointments across every industry below
                  — fluent in 10+ Indian languages, on the same simple plans for everyone, live in under 5 minutes.
                </p>
              </div>
            </ScrollReveal>

            {/* Right — modern-classic conceptual illustration */}
            <ScrollReveal delay={0.12}>
              <div className="relative mx-auto w-full max-w-[430px] lg:ml-auto lg:mr-0 lg:-mt-4 lg:max-w-[470px]">
                <svg
                  viewBox="0 0 520 500"
                  role="img"
                  aria-label="One AI voice agent connecting calls across many industries and Indian languages"
                  className="h-auto w-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="ind-wave" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#818cf8" />
                      <stop offset="1" stopColor="#4f46e5" />
                    </linearGradient>
                    <linearGradient id="ind-globe" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#eef2ff" />
                      <stop offset="1" stopColor="#dbe4ff" />
                    </linearGradient>
                    <linearGradient id="ind-core" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#ffffff" />
                      <stop offset="1" stopColor="#f5f7ff" />
                    </linearGradient>
                    <radialGradient id="ind-glow" cx="0.5" cy="0.5" r="0.5">
                      <stop offset="0" stopColor="#6366f1" stopOpacity="0.20" />
                      <stop offset="1" stopColor="#6366f1" stopOpacity="0" />
                    </radialGradient>
                    <filter id="ind-soft" x="-150%" y="-150%" width="400%" height="400%">
                      <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#1e293b" floodOpacity="0.14" />
                    </filter>
                    <pattern id="ind-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1.5" fill="#c7d2fe" />
                    </pattern>
                  </defs>

                  {/* ambient glow (breathing) */}
                  <circle cx="260" cy="240" r="235" fill="url(#ind-glow)" className="ind-glow" />

                  {/* decorative dotted panels */}
                  <rect x="372" y="34" width="118" height="118" rx="10" fill="url(#ind-dots)" opacity="0.7" />
                  <rect x="34" y="352" width="104" height="96" rx="10" fill="url(#ind-dots)" opacity="0.6" />

                  {/* decorative accents */}
                  <path d="M470 210 h16 M478 202 v16" stroke="#a5b4fc" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M44 150 h14 M51 143 v14" stroke="#a5b4fc" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="430" cy="410" r="4" fill="#c7d2fe" />
                  <circle cx="96" cy="86" r="4" fill="#c7d2fe" />

                  {/* orbit rings — outer dashed ring slowly rotates */}
                  <circle
                    cx="260"
                    cy="240"
                    r="188"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="1.5"
                    strokeDasharray="2 8"
                    strokeLinecap="round"
                    className="ind-spin-slow"
                  />
                  <circle cx="260" cy="240" r="132" fill="none" stroke="#dbe4ff" strokeWidth="1.5" />

                  {/* globe */}
                  <circle cx="260" cy="240" r="82" fill="url(#ind-globe)" stroke="#c7d2fe" strokeWidth="1.5" />
                  <clipPath id="ind-globe-clip">
                    <circle cx="260" cy="240" r="82" />
                  </clipPath>
                  <g clipPath="url(#ind-globe-clip)" stroke="#a5b4fc" strokeWidth="1" fill="none" opacity="0.75">
                    <ellipse cx="260" cy="240" rx="28" ry="82" />
                    <ellipse cx="260" cy="240" rx="56" ry="82" />
                    <line x1="178" y1="240" x2="342" y2="240" />
                    <line x1="190" y1="200" x2="330" y2="200" />
                    <line x1="190" y1="280" x2="330" y2="280" />
                  </g>

                  {/* connector lines to nodes */}
                  <g stroke="#c7d2fe" strokeWidth="1.5" strokeDasharray="1.5 6" strokeLinecap="round">
                    <line x1="260" y1="240" x2="260" y2="108" />
                    <line x1="260" y1="240" x2="135" y2="207" />
                    <line x1="260" y1="240" x2="377" y2="294" />
                    <line x1="260" y1="240" x2="402" y2="122" />
                    <line x1="260" y1="240" x2="100" y2="331" />
                  </g>

                  {/* expanding call-signal rings from the core */}
                  <circle cx="260" cy="240" r="47" fill="none" stroke="#818cf8" strokeWidth="2" className="ind-ping" />
                  <circle
                    cx="260"
                    cy="240"
                    r="47"
                    fill="none"
                    stroke="#818cf8"
                    strokeWidth="2"
                    className="ind-ping"
                    style={{ animationDelay: "1.45s" }}
                  />

                  {/* central voice-AI core (gentle pulse) */}
                  <circle
                    cx="260"
                    cy="240"
                    r="47"
                    fill="url(#ind-core)"
                    stroke="#e0e7ff"
                    strokeWidth="1.5"
                    filter="url(#ind-soft)"
                    className="ind-core"
                  />
                  <g fill="url(#ind-wave)">
                    {[
                      { x: 236, y: 230, h: 20, d: "0s" },
                      { x: 245, y: 223, h: 34, d: "0.2s" },
                      { x: 254, y: 217, h: 46, d: "0.4s" },
                      { x: 263, y: 226, h: 28, d: "0.15s" },
                      { x: 272, y: 220, h: 40, d: "0.35s" },
                      { x: 281, y: 229, h: 22, d: "0.1s" },
                    ].map((b, i) => (
                      <rect
                        key={i}
                        x={b.x}
                        y={b.y}
                        width="5"
                        height={b.h}
                        rx="2.5"
                        className="ind-eq"
                        style={{ animationDelay: b.d }}
                      />
                    ))}
                  </g>

                  {/* industry / call nodes on the orbits (pulsing) */}
                  <g filter="url(#ind-soft)">
                    <circle cx="260" cy="108" r="15" fill="#ffffff" />
                    <circle cx="135" cy="207" r="15" fill="#ffffff" />
                    <circle cx="377" cy="294" r="15" fill="#ffffff" />
                    <circle cx="402" cy="122" r="13" fill="#ffffff" />
                    <circle cx="100" cy="331" r="13" fill="#ffffff" />
                  </g>
                  {[
                    { cx: 260, cy: 108, r: 6, fill: "#4f46e5", d: "0s" },
                    { cx: 135, cy: 207, r: 6, fill: "#0891b2", d: "0.5s" },
                    { cx: 377, cy: 294, r: 6, fill: "#ea580c", d: "1s" },
                    { cx: 402, cy: 122, r: 5, fill: "#059669", d: "1.5s" },
                    { cx: 100, cy: 331, r: 5, fill: "#7c3aed", d: "0.75s" },
                  ].map((n, i) => (
                    <circle
                      key={i}
                      cx={n.cx}
                      cy={n.cy}
                      r={n.r}
                      fill={n.fill}
                      className="ind-node"
                      style={{ animationDelay: n.d }}
                    />
                  ))}

                  {/* multilingual script bubbles (floating) */}
                  <g className="ind-float">
                    <rect x="96" y="96" width="96" height="34" rx="17" fill="#ffffff" stroke="#e0e7ff" strokeWidth="1" filter="url(#ind-soft)" />
                    <text x="144" y="118" textAnchor="middle" fontSize="15" fontWeight="600" fill="#4f46e5">नमस्ते</text>
                  </g>
                  <g className="ind-float" style={{ animationDelay: "1.4s" }}>
                    <rect x="338" y="196" width="112" height="34" rx="17" fill="#ffffff" stroke="#e0e7ff" strokeWidth="1" filter="url(#ind-soft)" />
                    <text x="394" y="218" textAnchor="middle" fontSize="15" fontWeight="600" fill="#0891b2">வணக்கம்</text>
                  </g>
                  <g className="ind-float" style={{ animationDelay: "2.6s" }}>
                    <rect x="196" y="404" width="128" height="34" rx="17" fill="#ffffff" stroke="#e0e7ff" strokeWidth="1" filter="url(#ind-soft)" />
                    <text x="260" y="426" textAnchor="middle" fontSize="14" fontWeight="600" fill="#334155">Hello · నమస్తే</text>
                  </g>
                </svg>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Bento overview — centered classical header ── */}
      <section className="w-full px-6 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mx-auto mb-8 max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Industries</span>
            <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight md:text-4xl lg:text-[2.75rem]">
              Browse by industry
            </h2>
            {/* classical ornamental divider */}
            <div className="mt-6 flex items-center justify-center gap-3" aria-hidden>
              <span className="h-px w-14 bg-gradient-to-r from-transparent to-primary/40" />
              <span className="size-1.5 rotate-45 rounded-[1px] bg-primary/70 motion-safe:animate-pulse" />
              <span className="h-px w-14 bg-gradient-to-l from-transparent to-primary/40" />
            </div>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
              Tap any vertical to see its playbook, sample calls, and capabilities.
            </p>
          </ScrollReveal>

          {/* Mobile: two auto-scrolling rows (opposite directions) */}
          <div className="-mx-6 space-y-4 sm:hidden">
            <Marquee pauseOnHover className="[--duration:36s] [--gap:1rem] p-0 py-1">
              {INDUSTRIES.slice(0, Math.ceil(INDUSTRIES.length / 2)).map((ind, i) => (
                <IndustryCard key={ind.slug} ind={ind} i={i} className="w-[250px] shrink-0" />
              ))}
            </Marquee>
            <Marquee
              reverse
              pauseOnHover
              className="[--duration:36s] [--gap:1rem] p-0 py-1 [&>div]:[animation-direction:reverse]!"
            >
              {INDUSTRIES.slice(Math.ceil(INDUSTRIES.length / 2)).map((ind, i) => (
                <IndustryCard
                  key={ind.slug}
                  ind={ind}
                  i={i + Math.ceil(INDUSTRIES.length / 2)}
                  className="w-[250px] shrink-0"
                />
              ))}
            </Marquee>
          </div>

          {/* sm+: static grid */}
          <div className="hidden gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {INDUSTRIES.map((ind, i) => (
              <ScrollReveal key={ind.slug} delay={i * 0.04} className="h-full">
                <IndustryCard ind={ind} i={i} className="h-full" />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Detailed playbooks — centered classical header on a clean white band ── */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="w-full px-6 md:px-8">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal className="max-w-2xl pt-12 pb-6 text-left md:pt-14 md:pb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-sm">
                <BookOpen className="size-3.5" aria-hidden />
                Playbooks
              </span>
              <h2 className="mt-5 text-balance font-serif text-3xl font-semibold tracking-tight md:text-4xl lg:text-[2.75rem]">
                Every vertical, in depth.
              </h2>
              <span aria-hidden className="ind-shimmer mt-6 block h-1 w-24 rounded-full" />
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
                The exact jobs each agent does on day one, and how it sounds on a real call.
              </p>
            </ScrollReveal>

            <div className="pb-12 md:pb-16">
              <PlaybooksCardStack />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full px-6 py-14 md:px-8 md:py-16">
        <ScrollReveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-500 to-blue-600 px-6 py-12 shadow-2xl shadow-blue-500/30 ring-1 ring-white/10 md:px-14 md:py-14">
          {/* soft radial glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_0%,rgba(255,255,255,0.18),transparent_60%)]"
          />
          {/* fine grid texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:44px_44px]"
          />
          {/* decorative watermark */}
          <Sparkles
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -right-8 size-52 text-white/[0.06]"
          />

          <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h3 className="text-balance font-serif text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Don&apos;t see your industry?
              </h3>
              {/* classical accent rule */}
              <div className="mt-5 h-px w-16 bg-white/40" aria-hidden />
              <p className="mt-5 text-pretty leading-relaxed text-white/75 md:text-lg">
                We&apos;ve deployed agents in security, recruiting, property management, insurance, finance, and more.
                Tell us what calls eat your day and we&apos;ll have a prototype in 48 hours.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-white font-semibold text-blue-600 shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-white/90"
              >
                <Link href="/get-started">
                  Get started <ArrowRight className="ml-1 size-4" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/5 text-white backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white/15 hover:text-white"
              >
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <RelatedLinks
        heading="Related guides"
        description="Explore pricing, FAQs, and the get-started flow used by thousands of teams."
        links={[
          {
            href: "/pricing",
            title: "Pricing — voice AI from ₹10/min",
            description: "Three plan tiers, transparent rates, and Indian numbers from ₹400/month.",
          },
          {
            href: "/faq",
            title: "FAQ — credit, numbers, compliance",
            description: "Pricing, phone numbers, TRAI calling-window enforcement, DPDP Act 2023, supported languages, and more.",
          },
          {
            href: "/get-started",
            title: "Launch your first agent",
            description: "Pick a plan, optionally provision a phone number, and you’re live in minutes.",
          },
        ]}
      />

      <SiteFooter />
    </main>
  )
}
