import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShieldCheck, TrendingUp, Zap } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/jsonld"
import { INDUSTRIES, getIndustry } from "@/lib/industries"
import { BfsiHero } from "@/components/industries/bfsi-hero"
import { BfsiDetails } from "@/components/industries/bfsi-details"

export function BfsiPage() {
  const industry = getIndustry("bfsi")!
  const related = INDUSTRIES.filter((i) => i.slug !== "bfsi").slice(0, 4)

  return (
    <main className="min-h-dvh bg-white text-slate-900">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: "/industries/bfsi" },
        ]}
      />
      <ServiceJsonLd
        name={`AI voice agents for ${industry.name.toLowerCase()}`}
        description={industry.pitch}
        path="/industries/bfsi"
        serviceType="AI voice agent"
      />

      <BfsiHero industry={industry} />
      <BfsiDetails industry={industry} />

      {/* Internal contextual links */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white px-6 py-16 md:px-8 md:py-24">
        <div aria-hidden className="pointer-events-none absolute -left-24 top-10 -z-10 size-80 rounded-full bg-blue-400/15 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 -z-10 size-96 rounded-full bg-sky-400/15 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 motion-safe:animate-pulse" aria-hidden />
              Rollout playbook
            </span>

            <h2 className="mt-5 text-balance font-serif text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              How {industry.name.toLowerCase()} teams
              <br />
              roll out 9278.io
            </h2>

            <div className="mt-6 grid gap-4 text-sm leading-relaxed text-slate-600 md:text-base">
              <p className="text-pretty">
                Most {industry.name.toLowerCase()} customers start by{" "}
                <Link href="/get-started" className="font-medium text-blue-700 underline-offset-4 hover:underline">
                  spinning up a Starter agent
                </Link>{" "}
                with a single phone number, then upgrade to{" "}
                <Link href="/pricing" className="font-medium text-blue-700 underline-offset-4 hover:underline">
                  Growth or Scale
                </Link>{" "}
                once the inbound playbooks prove out.
              </p>
              <p className="text-pretty">
                Curious about voice credit, phone numbers, or compliance? The{" "}
                <Link href="/faq" className="font-medium text-blue-700 underline-offset-4 hover:underline">
                  FAQ
                </Link>{" "}
                answers the questions {industry.name.toLowerCase()} ops teams ask most — and you can browse{" "}
                <Link href="/industries" className="font-medium text-blue-700 underline-offset-4 hover:underline">
                  every other industry
                </Link>{" "}
                we support to compare playbooks.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap gap-3.5">
              <Button
                asChild
                className="group h-auto rounded-full bg-gradient-to-r from-blue-600 to-sky-600 px-6 py-3 text-[14px] font-bold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.65)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(37,99,235,0.75)]"
              >
                <Link href="/get-started?industry=bfsi">
                  Launch a {industry.name.toLowerCase()} agent
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto rounded-full border-slate-200 bg-white px-5 py-3 text-[14px] font-bold text-slate-800 shadow-sm hover:border-blue-300 hover:bg-blue-50/60 hover:text-blue-700"
              >
                <Link href="/faq">Read the FAQ</Link>
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="relative mx-auto w-full max-w-[400px]">
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-[0_30px_70px_-25px_rgba(37,99,235,0.35)]">
                <Image
                  src="/images/bfsi-rollout.png"
                  alt="How BFSI & fintech teams roll out 9278.io — secure banking, compliance, and analytics workflow"
                  width={1254}
                  height={1254}
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 520px, 100vw"
                />
              </div>

              <div className="absolute -left-4 -top-4 z-10 hero-float-up rounded-2xl border border-white/60 bg-white/95 px-4 py-3 shadow-lg shadow-blue-600/10 ring-1 ring-blue-100/60 backdrop-blur">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 text-white">
                    <ShieldCheck className="size-4" aria-hidden />
                  </span>
                  <span className="text-[12px] font-bold text-slate-800">TRAI Compliant</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 z-10 hero-float-down rounded-2xl border border-white/60 bg-white/95 px-4 py-3 shadow-lg shadow-blue-600/10 ring-1 ring-blue-100/60 backdrop-blur">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 text-white">
                    <Zap className="size-4" aria-hidden />
                  </span>
                  <span className="text-[12px] font-bold text-slate-800">Live in 5 minutes</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Other industries we power ─── */}
      <section className="w-full px-6 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance font-serif text-3xl font-semibold tracking-tight md:text-4xl">
              Other industries we power
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Pre-tuned playbooks for the calls your peers in adjacent verticals already automate.
            </p>
          </ScrollReveal>

          <div className="mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ...related.map((r) => ({
                href: `/industries/${r.slug}`,
                titlePrefix: "AI voice agents for ",
                highlight: r.name.toLowerCase(),
                description: r.short,
                icon: r.icon,
              })),
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
                    className="group relative block h-full overflow-hidden rounded-xl border border-l-4 border-slate-200 border-l-blue-600 bg-gradient-to-br from-slate-50/60 to-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    {/* corner ribbon */}
                    <span
                      aria-hidden
                      className="absolute right-0 top-0 h-12 w-12 bg-blue-600 [clip-path:polygon(100%_0,0_0,100%_100%)]"
                    />

                    {/* dotted decoration */}
                    <div aria-hidden className="absolute right-5 top-12 grid grid-cols-4 gap-1 opacity-60">
                      {Array.from({ length: 16 }).map((_, d) => (
                        <span key={d} className="size-1 rounded-full bg-slate-300" />
                      ))}
                    </div>

                    <span className="grid size-11 place-items-center rounded-xl bg-blue-600/10 text-blue-600">
                      <LinkIcon className="size-5" aria-hidden />
                    </span>

                    <h3 className="mt-4 text-balance font-serif text-lg font-bold tracking-tight text-foreground">
                      {link.titlePrefix}
                      {link.titlePrefix ? <span className="text-blue-600">{link.highlight}</span> : link.highlight}
                    </h3>
                    <span aria-hidden className="mt-2.5 block h-1 w-8 rounded-full bg-blue-600" />
                    <p className="mt-2.5 text-pretty text-sm leading-relaxed text-muted-foreground">{link.description}</p>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-sm font-semibold text-blue-600">Read more</span>
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-600 text-white shadow-md transition-transform duration-300 group-hover:translate-x-0.5">
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
