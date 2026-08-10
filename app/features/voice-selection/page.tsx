import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, LayoutGrid, IndianRupee, HelpCircle, Check, PhoneCall, Mic, Languages, Zap, AudioWaveform } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { FeatureImageSection } from "@/components/features-page/feature-image-section"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { VoiceSelectionHub } from "@/components/features-page/voice-selection-hub"
import { TtsComparison } from "@/components/features-page/tts-comparison"
import { VoiceSelectionSteps } from "@/components/features-page/voice-selection-steps"
import { LanguageMarquee } from "@/components/features-page/language-marquee"
import { MultiAgentExploreLinks } from "@/components/features-page/multi-agent-explore-links"
import { BadgeBars } from "@/components/features-page/badge-bars"
import { HeroStatsBand } from "@/components/features-page/hero-stats-band"

const heroStats = [
  { icon: Mic, stat: "10", title: "Named Voices", color: "text-blue-600", tile: "bg-blue-50" },
  { icon: Languages, stat: "10+", title: "Indian Languages", color: "text-violet-600", tile: "bg-violet-50" },
  { icon: AudioWaveform, stat: "Native", title: "Not Text-to-Speech", color: "text-emerald-600", tile: "bg-emerald-50" },
  { icon: Zap, stat: "<1s", title: "Latency", color: "text-orange-600", tile: "bg-orange-50" },
]

const exploreLinks = [
  {
    icon: <LayoutGrid className="size-5" aria-hidden />,
    href: "/features",
    title: "All features",
    description: "Every capability across Build, Train, Test, Operate, and Account.",
  },
  {
    icon: <IndianRupee className="size-5" aria-hidden />,
    href: "/pricing",
    title: "Pricing in INR",
    description: "Starter ₹2,999, Growth ₹8,799, Scale ₹29,999. Per-second billing.",
  },
  {
    icon: <HelpCircle className="size-5" aria-hidden />,
    href: "/faq",
    title: "Frequently asked questions",
    description: "TRAI compliance, Indian languages, billing, and account questions.",
  },
]

export const metadata: Metadata = pageSeo({
  title: "Voice Selection — 9278.io Features",
  description:
    "Choose from ten named voices for your 9278.io AI voice agent, native audio in 10+ Indian languages, each voice with a personality description and a preview clip.",
  path: "/features/voice-selection",
})

export default function VoiceSelectionPage() {
  return (
    <main className="flex min-h-dvh flex-col bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Voice Selection", path: "/features/voice-selection" },
        ]}
      />

      {/* Hero */}
      <section className="relative flex flex-col overflow-hidden border-b border-border/50">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFF] to-[#EAF4FF]" />
          <div className="absolute -left-24 -top-24 size-[380px] rounded-full bg-primary/[0.06] blur-[120px]" />
          <div className="absolute -bottom-24 -right-16 size-[340px] rounded-full bg-primary/[0.05] blur-[120px]" />
        </div>
        <div className="grid w-full items-stretch gap-10 px-6 pb-6 pt-3 md:px-8 md:pb-16 md:pt-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div>
            <ScrollReveal>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <BadgeBars className="text-primary" />
                Build &amp; Setup
              </span>
              <h1 className="mt-5 text-balance text-[32px] font-bold leading-[1.15] tracking-tight sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-[3.6rem]">
                Voice{" "}
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Selection
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Ten named voices, native audio in 10+ Indian languages — no robotic text-to-speech. Preview
                every voice before you pick one, and switch anytime without rebuilding your agent. Each voice
                carries its own personality, so the tone matches the business, not a generic script.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-gradient-to-r from-primary to-[oklch(0.5_0.21_255)] px-7 text-base font-semibold text-white shadow-[0_8px_28px_oklch(0.546_0.215_262.88/0.45)] transition-all hover:shadow-[0_10px_36px_oklch(0.546_0.215_262.88/0.6)]"
                >
                  <Link href="/get-started">
                    Build your first agent
                    <ArrowRight className="ml-1 size-4" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-border bg-white px-7 text-base font-semibold text-foreground hover:border-primary/30 hover:bg-slate-50"
                >
                  <Link href="/contact">
                    <PhoneCall className="mr-2 size-4" />
                    Talk to sales
                  </Link>
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                {["Ten named voices", "10+ Indian languages", "Native audio, not text-to-speech"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <Check className="size-4 text-emerald-600" aria-hidden />
                    {t}
                  </span>
                ))}
              </div>

              <HeroStatsBand stats={heroStats} />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.08}>
            <VoiceSelectionHub />
          </ScrollReveal>
        </div>
      </section>

      {/* Native audio vs. robotic TTS — a direct contrast band */}
      <section className="relative overflow-hidden border-b border-border/50 bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-0 -z-10 size-[380px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #2563EB, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 bottom-0 -z-10 size-[380px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #2563EB, transparent 70%)" }}
        />
        <div className="mx-auto max-w-5xl px-6 py-20 md:px-10 md:py-24">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Under the hood</p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">Native audio, not text read aloud.</h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              Most voice bots bolt text-to-speech onto a chat engine. 9278.io's agents are built on native audio from the ground up.
            </p>
          </ScrollReveal>

          <TtsComparison />
        </div>
      </section>

      {/* Language pill cloud */}
      <section className="overflow-hidden border-b border-border/50" style={{ backgroundColor: "#F7F9FC" }}>
        <div className="mx-auto max-w-4xl px-6 pt-10 text-center md:px-8 md:pt-14">
          <ScrollReveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Languages</p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Fluent in{" "}
              <span className="bg-gradient-to-r from-primary via-[oklch(0.62_0.2_240)] to-[oklch(0.5_0.22_255)] bg-clip-text text-transparent">
                10+ Indian languages.
              </span>
            </h2>
          </ScrollReveal>
        </div>
        <div className="px-8 pb-10 sm:px-16 md:pb-14">
          <LanguageMarquee />
        </div>
      </section>

      {/* Feature list — numbered steps in a 4-up row, connected by a spine.
          Only lg+ gets the tall sticky-pin wrapper (the 4-column layout fits
          within one screen there); below lg the steps stack into a single
          column that's taller than min-h-screen, so pinning it would make
          the next section overlap before the sticky content finished. */}
      <section className="relative bg-white lg:h-[170vh]">
        <div className="w-full py-20 md:py-24 lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:items-center lg:py-0">
          <div className="mx-auto w-full max-w-6xl px-6 md:px-12">
            <ScrollReveal className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Voice Selection</p>
              <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">Pick it, hear it, ship it.</h2>
            </ScrollReveal>

            <VoiceSelectionSteps />
          </div>
        </div>
      </section>

      <FeatureImageSection
        mode="feature"
        slides={[
          {
            role: "Preview first",
            name: "Hear it before you assign it",
            quote: "Play a real clip of any voice and compare them side by side before choosing.",
            image: "/images/features/voice-selection/voice-selection-01-preview-first.png",
          },
          {
            role: "A personality each",
            name: "Ten voices, ten distinct tones",
            quote: "Every named voice comes with its own personality description, so the tone matches your brand.",
            image: "/images/features/voice-selection/voice-selection-02-personality-each.png",
          },
          {
            role: "Switch anytime",
            name: "Change it with no rebuild",
            quote: "Swap an agent's voice whenever you want — knowledge base, routing, and behavior stay exactly as they were.",
            image: "/images/features/voice-selection/voice-selection-03-switch-anytime.png",
          },
        ]}
      />

      <PricingCta
        heading="Ready to give your agent the right voice?"
        description="Build your first agent free, then choose the voice that fits your brand — swap it anytime."
        primaryHref="/get-started"
        primaryLabel="Get started"
        secondaryHref="/pricing"
        secondaryLabel="View pricing"
      />

      <section className="w-full px-6 pb-24 md:px-8" style={{ backgroundColor: "#F7F9FC" }}>
        <div className="mx-auto max-w-5xl pt-16 md:pt-20">
          <ScrollReveal>
            <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">Explore more of 9278.io</h2>
            <p className="mt-2 max-w-2xl text-pretty text-sm text-muted-foreground md:text-base">
              See the rest of what's included, or check pricing and common questions.
            </p>
          </ScrollReveal>

          <MultiAgentExploreLinks links={exploreLinks} />
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
