import type { Metadata } from "next"
import Link from "next/link"
import { Sparkles, MapPin, Zap, Users, TrendingUp } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

export const metadata: Metadata = pageSeo({
  title: "Careers at 9278.io — Join India's AI voice team",
  description:
    "We're hiring engineers, voice ML researchers, and customer success leaders to build India's most capable AI voice infrastructure.",
  path: "/careers",
})

const perks = [
  {
    icon: Zap,
    title: "Solve hard problems",
    description:
      "Sub-second latency in Hindi and Telugu over Jio and Airtel lines. TRAI-compliant outbound campaigns. Real-time dialect detection. The problems here are genuinely hard.",
  },
  {
    icon: Users,
    title: "Small team, big impact",
    description:
      "We're a lean team where your work ships to hundreds of thousands of callers every week. No six-month roadmaps. Fast decisions, direct feedback.",
  },
  {
    icon: TrendingUp,
    title: "Competitive compensation",
    description:
      "Market-rate salaries benchmarked to Bengaluru and Mumbai top-quartile, ESOPs, full health insurance, and a generous L&D budget.",
  },
]

const openRoles = [
  {
    title: "Senior Backend Engineer",
    team: "Platform",
    location: "Bengaluru / Remote India",
    type: "Full-time",
    description:
      "Own the real-time call orchestration layer — WebRTC, SIP, concurrent agent scheduling, and the webhook delivery pipeline.",
  },
  {
    title: "Voice ML Engineer",
    team: "AI / Speech",
    location: "Bengaluru / Remote India",
    type: "Full-time",
    description:
      "Fine-tune STT/TTS models for Indian languages. Improve dialect detection, reduce WER on noisy Indian-network audio, and ship faster inference.",
  },
  {
    title: "Full-Stack Engineer",
    team: "Dashboard",
    location: "Bengaluru / Remote India",
    type: "Full-time",
    description:
      "Build the customer dashboard — call logs, transcript search, usage analytics, and agent configuration — in Next.js and TypeScript.",
  },
  {
    title: "Customer Success Manager",
    team: "Growth",
    location: "Bengaluru",
    type: "Full-time",
    description:
      "Own onboarding and expansion for our BFSI and real-estate customers. You'll be the first call they make when they need to scale.",
  },
  {
    title: "Solutions Engineer",
    team: "Sales",
    location: "Bengaluru / Mumbai",
    type: "Full-time",
    description:
      "Work with enterprise prospects to scope integrations, run POCs, and turn technical evaluations into signed contracts.",
  },
]

export default function CareersPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)]"
        />
        <div className="mx-auto w-full max-w-4xl px-4 py-20 text-center md:px-6 md:py-28">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" aria-hidden />
              We&apos;re hiring
            </span>
            <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-6xl">
              Build the voice of{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
                India&apos;s businesses.
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              We&apos;re a small team in Bengaluru building the infrastructure that powers AI phone calls across India.
              If you want your work to matter on day one, we want to talk.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-primary" aria-hidden />
              Bengaluru HQ · Remote India welcome
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Perks */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Why join us</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">What you&apos;ll get</h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {perks.map((p) => {
            const Icon = p.icon
            return (
              <ScrollReveal key={p.title}>
                <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card/50 p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.08] text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </section>

      {/* Open Roles */}
      <section className="border-t border-border/50">
        <div className="mx-auto w-full max-w-4xl px-4 py-20 md:px-6 md:py-28">
          <ScrollReveal className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Open positions</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              Current openings
            </h2>
          </ScrollReveal>

          <div className="mt-10 space-y-4">
            {openRoles.map((r) => (
              <ScrollReveal key={r.title}>
                <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/50 p-6 transition-colors hover:border-primary/20 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{r.title}</h3>
                      <span className="rounded-full border border-primary/20 bg-primary/[0.08] px-2.5 py-0.5 text-xs font-medium text-primary">
                        {r.team}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span>{r.location}</span>
                      <span>·</span>
                      <span>{r.type}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.description}</p>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="mt-2 shrink-0 border-border bg-card/50 sm:mt-0"
                  >
                    <a href="mailto:careers@9278.io?subject=Application — {r.title}">Apply</a>
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-8 rounded-2xl border border-border/60 bg-card/30 p-6 text-center">
            <p className="text-muted-foreground">
              Don&apos;t see a perfect fit?{" "}
              <a href="mailto:careers@9278.io" className="text-primary underline-offset-4 hover:underline">
                Send us a speculative application
              </a>{" "}
              — we hire for talent whenever we find it.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <RelatedLinks
        heading="Learn more"
        description="About the company, our product, and our mission."
        links={[
          { href: "/about", title: "About 9278.io", description: "Our story, mission, and the team behind the platform." },
          { href: "/pricing", title: "Pricing", description: "INR-first pricing, GST invoices, no contracts." },
          { href: "/contact", title: "Contact us", description: "Questions about roles or the company? Reach out." },
        ]}
      />

      <SiteFooter />
    </main>
  )
}
