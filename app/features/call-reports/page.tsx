import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Download,
  FileText,
  HelpCircle,
  IndianRupee,
  LayoutGrid,
  PhoneCall,
  PlayCircle,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { FeatureImageSection } from "@/components/features-page/feature-image-section"
import { CallPlaybackTimeline } from "@/components/features-page/call-playback-timeline"
import { RecordingFilmstrip } from "@/components/features-page/recording-filmstrip"
import { TranscriptSpeedComparison } from "@/components/features-page/transcript-speed-comparison"
import { CallSoundwaveIllustration } from "@/components/features-page/call-soundwave-illustration"
import { DetailScatteredCards } from "@/components/features-page/detail-scattered-cards"
import { MultiAgentExploreLinks } from "@/components/features-page/multi-agent-explore-links"
import { BadgeBars } from "@/components/features-page/badge-bars"
import { HeroStatsBand } from "@/components/features-page/hero-stats-band"

const heroStats = [
  { icon: FileText, stat: "Every", title: "Call Recorded", color: "text-blue-600", tile: "bg-blue-50" },
  { icon: PlayCircle, stat: "Full", title: "Transcript Too", color: "text-violet-600", tile: "bg-violet-50" },
  { icon: Search, stat: "Searchable", title: "In Seconds", color: "text-emerald-600", tile: "bg-emerald-50" },
  { icon: Download, stat: "1-click", title: "Download", color: "text-orange-600", tile: "bg-orange-50" },
]
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"

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
  title: "Call Reports (Recordings / Transcripts)",
  description: "Every call is recorded and transcribed, with playback and download built in.",
  path: "/features/call-reports",
})

const DETAILS = [
  {
    icon: <FileText className="size-5" aria-hidden />,
    title: "Recording + transcript for every call",
    description: "Every single call is captured as both an audio recording and a full text transcript.",
    tags: ["Audio", "Text"],
    accent: "oklch(0.546 0.215 262.88)",
  },
  {
    icon: <PlayCircle className="size-5" aria-hidden />,
    title: "Play back or download anytime",
    description: "Listen right in the dashboard or pull the audio file down for your own records.",
    tags: ["Stream", "Download"],
    accent: "oklch(0.72 0.18 155)",
  },
  {
    icon: <Download className="size-5" aria-hidden />,
    title: "Review exactly what was said",
    description: "Read the transcript to see exactly what your agent and the caller said, word for word.",
    tags: ["Searchable", "Word-for-word"],
    accent: "oklch(0.78 0.16 75)",
  },
]

export default function CallReportsPage() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Call Reports (Recordings / Transcripts)", path: "/features/call-reports" },
        ]}
      />

      <section className="relative flex flex-col overflow-hidden border-b border-border/50 lg:h-[calc(100vh-64px)] lg:justify-center">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFF] to-[#EAF4FF]" />
          <div className="absolute -left-24 -top-24 size-[380px] rounded-full bg-primary/[0.06] blur-[120px]" />
          <div className="absolute -bottom-24 -right-16 size-[340px] rounded-full bg-primary/[0.05] blur-[120px]" />
        </div>
        <div className="grid w-full items-stretch gap-10 px-6 pb-6 pt-3 md:px-8 md:pb-8 md:pt-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div>
            <nav aria-label="Breadcrumb">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <BadgeBars className="text-primary" />
                Operate &amp; Monitor
              </span>
            </nav>

            <ScrollReveal className="mt-6">
              <h1 className="mt-5 text-balance text-[32px] font-bold leading-[1.15] tracking-tight sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-[3.6rem]">
                <span style={{ color: "#0F172A" }}>Call Reports</span>{" "}
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  (Recordings / Transcripts)
                </span>
              </h1>
              <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Every call is recorded and transcribed, with playback and download built in — so you can
                review exactly what happened on any call, anytime.
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

              <HeroStatsBand stats={heroStats} />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.08}>
            <CallSoundwaveIllustration />
          </ScrollReveal>
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-20">
          <ScrollReveal>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">What you get</h2>
          </ScrollReveal>
          <DetailScatteredCards items={DETAILS} />
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-20">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2.5 rounded-full bg-primary/[0.07] px-6 py-2.5 text-base font-semibold uppercase tracking-wide text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              How it works
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">From call to transcript</h2>
          </ScrollReveal>
          <CallPlaybackTimeline />
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-20">
          <ScrollReveal>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Your recording library</h2>
          </ScrollReveal>
          <RecordingFilmstrip />
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-20">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2.5 rounded-full bg-primary/[0.07] px-6 py-2.5 text-base font-semibold uppercase tracking-wide text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Why it matters
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Find any moment instantly</h2>
          </ScrollReveal>
          <TranscriptSpeedComparison />
        </div>
      </section>

      <FeatureImageSection
        mode="feature"
        slides={[
          {
            role: "Recording + transcript",
            name: "Every call, captured twice",
            quote: "Every single call is captured as both an audio recording and a full text transcript.",
            image: "/images/call-reports-recording-transcript.webp",
          },
          {
            role: "Playback",
            name: "Listen or download anytime",
            quote: "Play it back right in the dashboard, or pull the audio file down for your own records.",
            image: "/images/call-reports-playback.webp",
          },
          {
            role: "Transcript search",
            name: "Read exactly what was said",
            quote: "See what your agent and the caller said, word for word — no need to re-listen to the whole call.",
            image: "/images/call-reports-transcript-search.webp",
          },
        ]}
      />

      <PricingCta
        heading="Hear every call for yourself"
        description="Spin up your first agent and every call comes with a recording and transcript, ready to review."
        primaryHref="/get-started"
        primaryLabel="Get started"
        secondaryHref="/features"
        secondaryLabel="Back to Features"
      />

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
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
