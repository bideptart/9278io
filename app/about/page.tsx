import type { Metadata } from "next"
import { Target, Users, Zap, MapPin, Languages, ShieldCheck, PhoneCall } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { ValuesGrid } from "@/components/about/values-grid"
import { GradientCta } from "@/components/sections/gradient-cta"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

export const metadata: Metadata = pageSeo({
  title: "About 9278.io — India's AI Voice Agent Platform",
  description:
    "We're building India's most capable AI voice infrastructure — multilingual, TRAI-compliant, and purpose-built for Indian businesses.",
  path: "/about",
})

const stats = [
  { icon: Languages, value: "10+", label: "Indian languages" },
  { icon: ShieldCheck, value: "TRAI & DPDP", label: "Fully compliant" },
  { icon: PhoneCall, value: "1,000+", label: "Concurrent calls" },
  { icon: MapPin, value: "Mumbai & Hyderabad", label: "Data centres" },
]

const values = [
  {
    icon: Target,
    title: "India First",
    description:
      "Every product decision starts with one question: does this work for Indian businesses? Our voice models, compliance controls, and integrations are built ground-up for India — not retrofitted.",
  },
  {
    icon: Zap,
    title: "Speed Without Compromise",
    description:
      "Sub-second voice latency on Indian networks. We obsess over call quality because every 100ms of delay degrades the conversation. Our data centres in Mumbai and Hyderabad exist for this reason.",
  },
  {
    icon: Users,
    title: "Built for Scale",
    description:
      "From a single agent booking appointments to a BPO running 1,000 concurrent calls — the same platform handles both. No re-architecture, no ceiling.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] mesh-gradient-bg" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)]"
        />
        <div className="mx-auto w-full max-w-4xl px-4 pb-16 pt-8 text-center md:px-6 md:pb-20 md:pt-10">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
              Our story
            </span>
            <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-6xl">
              We&apos;re making AI voice work for{" "}
              <span className="bg-gradient-to-r from-primary via-[oklch(0.62_0.2_240)] to-[oklch(0.72_0.18_150)] bg-clip-text text-transparent">
                every Indian business.
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              9278.io was founded in Bengaluru with a simple belief: Indian businesses deserve AI voice infrastructure
              that speaks their language — literally. Hindi, Tamil, Telugu, Marathi, and 11 more.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-primary" aria-hidden />
              Mumbai
            </div>

            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-border/60 bg-white p-6 shadow-[0_16px_34px_-24px_oklch(0.2_0.05_260/0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_45px_-16px_oklch(0.546_0.215_262.88/0.35)]"
                  >
                    <span className="mx-auto flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.42_0.19_264)] text-white shadow-[0_6px_14px_-4px_oklch(0.546_0.215_262.88/0.45)]">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <p className="mt-3 text-lg font-bold tracking-tight">{s.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                  </div>
                )
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission */}
      <section className="w-full px-6 py-14 md:px-8 md:py-20">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Mission</p>
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Automate every phone call that{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
              doesn&apos;t need a human.
            </span>
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground md:text-lg">
            India has over 1.4 billion people and one of the world&apos;s largest call-centre industries. Most of those
            calls are repetitive. We built 9278.io so that a business of any size can deploy a voice agent in
            minutes, not months, and reclaim the time their team wastes on calls that a well-designed AI handles
            better.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {["Appointment reminders", "Lead qualification", "Order updates", "EMI follow-ups"].map((c) => (
              <span
                key={c}
                className="rounded-full border border-border/60 bg-white px-3.5 py-1.5 text-sm text-muted-foreground shadow-sm transition-all duration-300 hover:border-primary/30 hover:bg-primary/[0.06] hover:text-primary"
              >
                {c}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Values */}
      <section className="border-t border-border/50">
        <div className="w-full px-6 py-14 md:px-8 md:py-20">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">What drives us</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">Our values</h2>
          </ScrollReveal>

          <ValuesGrid
            values={values.map((v) => ({
              icon: <v.icon className="h-5 w-5" aria-hidden />,
              title: v.title,
              description: v.description,
            }))}
          />
        </div>
      </section>

      <GradientCta
        heading="Ready to build your first agent?"
        description="Pick a plan, optionally add a phone number, and start a real test call — most teams are live in under 5 minutes."
        primaryHref="/get-started"
        primaryLabel="Get started"
        secondaryHref="/pricing"
        secondaryLabel="View pricing"
      />

      <RelatedLinks
        heading="Explore 9278.io"
        description="Product, pricing, and industries — everything in one place."
        links={[
          { href: "/pricing", title: "Pricing in INR", description: "Starter ₹2,999, Growth ₹8,799, Scale ₹29,999. Prices in ₹, billed once as wallet credit." },
          { href: "/industries", title: "Industries we power", description: "BPO, BFSI, real estate, EdTech, and more." },
          { href: "/faq", title: "Frequently asked questions", description: "TRAI compliance, Indian languages, billing, and account questions." },
        ]}
      />

      <SiteFooter />
    </main>
  )
}
