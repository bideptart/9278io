import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Check, MessageSquareQuote, Quote, Sparkles } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Marquee } from "@/components/ui/marquee"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { INDUSTRIES, getIndustry, CAP_COLORS } from "@/lib/industries"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/jsonld"

/* Shared blue accent for the "Other industries" quote cards.
   Literal classes so Tailwind's scanner keeps them. */
const QUOTE_CARD = { bg: "bg-blue-500", shadow: "shadow-blue-500/30", text: "text-blue-600" }

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

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const industry = getIndustry(slug)
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

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)]"
        />
        <div className="w-full px-6 py-16 md:px-8 md:py-24">
          <ScrollReveal>
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

            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white px-4 py-1.5 text-sm text-muted-foreground">
              <Icon className="size-3.5 text-primary" aria-hidden />
              {industry.name}
            </span>
            <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-6xl">
              AI voice agents for {industry.name.toLowerCase()}.
            </h1>
            <p className="mt-5 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              {industry.pitch}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {industry.caps.map((cap) => (
                <span
                  key={cap}
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${CAP_COLORS[cap]}`}
                >
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
        </div>
      </section>

      {/* What it does */}
      <section className="w-full px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2 md:gap-16">
          {/* ── Left: animated timeline of day-one jobs ── */}
          <div>
            <ScrollReveal>
              <div className="flex items-center gap-3">
                <span className="h-7 w-1 rounded-full bg-primary" aria-hidden />
                <h2 className="text-balance font-serif text-3xl font-semibold tracking-tight md:text-4xl">
                  What the agent does on day one
                </h2>
              </div>
              <span aria-hidden className="ind-shimmer mt-5 block h-1 w-16 rounded-full" />
              <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                Pre-built playbooks tuned for {industry.name.toLowerCase()} workflows. Every action below works out of the
                box; you can fine-tune them, add new ones, and wire them into your existing tools without writing code.
              </p>
            </ScrollReveal>

            <ol className="relative mt-8 space-y-3.5 before:absolute before:bottom-5 before:left-[15px] before:top-5 before:w-px before:bg-primary/15 before:content-['']">
              {industry.jobs.map((job, i) => (
                <ScrollReveal key={job} delay={i * 0.08}>
                  <li className="relative flex items-start gap-4">
                    <span className="relative z-10 mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-primary text-white shadow-md shadow-primary/25">
                      <Check className="size-4" aria-hidden />
                    </span>
                    <div className="flex-1 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
                      <span className="text-pretty leading-relaxed text-foreground/90">{job}</span>
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ol>
          </div>

          {/* ── Right: modern live-call panel ── */}
          <div>
            <ScrollReveal>
              <div className="flex items-center gap-3">
                <span className="h-7 w-1 rounded-full bg-primary" aria-hidden />
                <h2 className="text-balance font-serif text-3xl font-semibold tracking-tight md:text-4xl">
                  How the agent actually sounds
                </h2>
              </div>
              <span aria-hidden className="ind-shimmer mt-5 block h-1 w-16 rounded-full" />
              <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                Real lines our voice agents have used in {industry.name.toLowerCase()} deployments. Every word is
                generated in real time with sub-second latency, real interruptions, and natural emotion.
              </p>
            </ScrollReveal>

            {/* live conversation preview panel */}
            <ScrollReveal delay={0.1}>
              <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/[0.06]">
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-primary/[0.07] to-transparent px-5 py-3.5">
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden />
                    Live agent preview
                  </p>
                  {/* animated voice waveform */}
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
                    <div
                      key={i}
                      className={`flex text-sm ${line.speaker === "Agent" ? "justify-start" : "justify-end"}`}
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
                </div>
              </div>
            </ScrollReveal>

            <ul className="mt-6 space-y-3">
              {industry.sampleLines.map((line, i) => (
                <ScrollReveal key={i} delay={0.15 + i * 0.08}>
                  <li className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                        <MessageSquareQuote className="size-4" aria-hidden />
                      </span>
                      <p className="text-pretty leading-relaxed text-foreground/90">{line}</p>
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
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

      {/* Internal contextual links — two-phase rollout process */}
      <section className="w-full px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="max-w-2xl">
            <h2 className="text-balance font-serif text-3xl font-semibold tracking-tight md:text-4xl lg:text-[2.6rem]">
              How {industry.name.toLowerCase()} teams roll out 9278.io
            </h2>
          </ScrollReveal>

          <div className="relative mt-10 grid gap-6 md:mt-12 md:grid-cols-2">
            {/* connector arrow between the two phases (desktop) */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:grid md:size-11 md:place-items-center md:rounded-full md:border md:border-slate-200 md:bg-white md:text-primary md:shadow-md"
            >
              <ArrowRight className="size-5" />
            </div>

            <ScrollReveal>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg md:p-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-4xl font-bold leading-none text-primary">01</span>
                  <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                </div>
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
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg md:p-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-4xl font-bold leading-none text-primary">02</span>
                  <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                </div>
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
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5 hover:bg-primary/90"
              >
                <Link href={`/get-started?industry=${industry.slug}`}>Launch a {industry.name.toLowerCase()} agent</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="transition-transform hover:-translate-y-0.5">
                <Link href="/faq">Read the FAQ</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Other industries — quote-style cards */}
      <section className="w-full border-t border-border/50 bg-card/20 px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="max-w-2xl">
            <h2 className="text-balance font-serif text-3xl font-semibold tracking-tight md:text-4xl">
              Other industries we power
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Pre-tuned playbooks for the calls your peers in adjacent verticals already automate.
            </p>
          </ScrollReveal>

          <div className="mt-16 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ...related.map((r) => ({
                href: `/industries/${r.slug}`,
                title: `AI voice agents for ${r.name.toLowerCase()}`,
                description: r.short,
              })),
              ...(slug !== "education" && education
                ? [
                    {
                      href: `/industries/${education.slug}`,
                      title: `AI voice agents for ${education.name.toLowerCase()}`,
                      description: education.short,
                    },
                  ]
                : []),
              {
                href: "/pricing",
                title: "Compare plans and per-minute rates",
                description: "Three tiers from ₹3,000 to ₹30,000, with rates from ₹12 down to ₹10/min.",
              },
              {
                href: "/faq",
                title: "FAQ — credit, phone numbers, compliance",
                description: "Pricing, phone numbers, TRAI calling-window enforcement, DPDP Act 2023, and more.",
              },
            ].map((link, i) => {
              const c = QUOTE_CARD
              return (
                <ScrollReveal key={link.href} delay={i * 0.08}>
                  <article className="group relative h-full">
                    {/* dark quote badge overlapping the top-centre */}
                    <div className="absolute -top-5 left-1/2 z-20 grid size-11 -translate-x-1/2 place-items-center rounded-full bg-slate-900 text-white shadow-lg transition-transform duration-300 group-hover:-translate-y-1">
                      <Quote className="size-5" aria-hidden />
                    </div>
                    {/* coloured back block; white card floats inside (colour frame shows, thicker bottom) */}
                    <Link
                      href={link.href}
                      className={`relative block h-full rounded-[1.75rem] px-2.5 pb-5 pt-2 shadow-xl transition-all duration-300 hover:-translate-y-1.5 ${c.bg} ${c.shadow}`}
                    >
                      <div className="flex h-full flex-col rounded-[1.35rem] bg-white p-6 pt-8 text-center">
                        <h3 className="font-serif text-lg font-semibold tracking-tight text-foreground">{link.title}</h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{link.description}</p>
                        <span className={`mt-5 inline-flex items-center justify-center gap-1.5 text-sm font-semibold ${c.text}`}>
                          Read more <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                        </span>
                      </div>
                    </Link>
                  </article>
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
      <p className="mt-5 font-serif text-3xl font-semibold tracking-tight text-primary md:text-4xl">{value}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sub}</p>
    </div>
  )
}
