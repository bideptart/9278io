import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, LayoutGrid, IndianRupee, HelpCircle, Check, PhoneCall } from "lucide-react"
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
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pb-20 pt-2 md:px-8 md:pb-24 md:pt-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div>
            <ScrollReveal>
              <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
                Build &amp; Setup
              </span>
              <h1 className="mt-10 text-balance text-[34px] font-extrabold sm:text-[44px] md:text-[60px] lg:text-[72px]" style={{ lineHeight: 1, letterSpacing: "-1px" }}>
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

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {["Ten named voices", "10+ Indian languages", "Native audio, not text-to-speech"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <Check className="size-3.5 text-primary" aria-hidden />
                    {t}
                  </span>
                ))}
              </div>
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
      <section className="border-b border-border/50" style={{ backgroundColor: "#F7F9FC" }}>
        <div className="mx-auto max-w-4xl px-6 py-16 text-center md:px-8 md:py-20">
          <ScrollReveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Languages</p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Fluent in{" "}
              <span className="bg-gradient-to-r from-primary via-[oklch(0.62_0.2_240)] to-[oklch(0.5_0.22_255)] bg-clip-text text-transparent">
                10+ Indian languages.
              </span>
            </h2>
            <LanguageMarquee />
          </ScrollReveal>
        </div>
      </section>

      {/* Feature list — numbered steps in a 3-up row, connected by a spine.
          Section is taller than the viewport with a sticky inner panel, so
          it stays pinned in place while the step sequence plays out and only
          scrolls away once there's no more extra height left to consume. */}
      <section className="relative bg-white" style={{ height: "170vh" }}>
        <div className="sticky top-0 flex min-h-screen w-full items-center">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:px-12 md:py-24">
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
