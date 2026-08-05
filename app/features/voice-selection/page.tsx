import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, LayoutGrid, IndianRupee, HelpCircle } from "lucide-react"
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

      {/* Hero — single centred column, waveform visual below instead of a side illustration */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#F7F9FC" }}>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 -z-10 size-[520px] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, #2563EB, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-32 -z-10 size-[420px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #2563EB, transparent 70%)" }}
        />
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-14 px-6 py-16 md:px-8 md:py-20 lg:flex-row lg:items-center lg:gap-10">
          <div className="w-full max-w-2xl text-center lg:max-w-none lg:flex-1 lg:text-left">
            <ScrollReveal>
              <span
                className="inline-flex h-10 items-center gap-2 rounded-full text-[15px] font-semibold"
                style={{ backgroundColor: "#EEF4FF", border: "1px solid #BBD1FF", color: "#2563EB", padding: "0 18px" }}
              >
                <span className="size-1.5 rounded-full" style={{ backgroundColor: "#2563EB" }} aria-hidden />
                BUILD &amp; SETUP
              </span>

              <h1 className="mt-10 text-[44px] font-extrabold md:text-[60px] lg:text-[72px]" style={{ lineHeight: 0.95, letterSpacing: "-2px" }}>
                <span style={{ color: "#0F172A" }}>Voice</span>
                <br />
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

              <p className="mx-auto mt-8 text-xl md:text-[24px] lg:mx-0" style={{ color: "#667085", lineHeight: 1.6, maxWidth: "480px" }}>
                Ten named voices, native audio in 10+ Indian languages — no robotic text-to-speech.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-5 lg:justify-start">
                <Link
                  href="/get-started"
                  className="group inline-flex h-[60px] items-center gap-2 rounded-full pl-[34px] pr-[10px] text-base font-semibold text-white transition-all hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(90deg, #4F8DFF, #2563EB)", boxShadow: "0 20px 60px rgba(37,99,235,0.25)" }}
                >
                  Build your first agent
                  <span className="flex size-9 items-center justify-center rounded-full bg-white/20">
                    <ArrowRight className="size-4" aria-hidden />
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-[60px] items-center rounded-full px-9 text-base font-semibold transition-colors hover:bg-[#F1F5F9]"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D5DD", color: "#0F172A" }}
                >
                  Talk to sales
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="w-full max-w-md pb-8 lg:max-w-none lg:flex-1 lg:pb-0">
            <ScrollReveal>
              <VoiceSelectionHub />
            </ScrollReveal>
          </div>
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
