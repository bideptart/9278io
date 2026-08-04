import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ChevronRight, Download, FileText, PhoneCall, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { CallPlaybackTimeline } from "@/components/features-page/call-playback-timeline"
import { RecordingFilmstrip } from "@/components/features-page/recording-filmstrip"
import { TranscriptSearchDemo } from "@/components/features-page/transcript-search-demo"
import { FaqAccordion } from "@/components/faq/faq-accordion"
import { CallSoundwaveIllustration } from "@/components/features-page/call-soundwave-illustration"
import { DetailScatteredCards } from "@/components/features-page/detail-scattered-cards"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { FAQ_GROUPS } from "@/lib/faq"

const callReportsFaq = [
  ...FAQ_GROUPS.find((g) => g.id === "agents")!.items.filter((i) => ["Can I record and transcribe every call?", "Does it integrate with Indian CRMs and tools?"].includes(i.q)),
  ...FAQ_GROUPS.find((g) => g.id === "compliance")!.items.filter((i) => ["Where is my data stored?", "How do you handle consent and compliance?"].includes(i.q)),
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
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pb-12 pt-6 md:px-8 md:pb-16 md:pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div>
            <nav aria-label="Breadcrumb">
              <span className="inline-flex items-center rounded-full bg-primary/[0.07] px-6 py-2.5 text-base font-semibold uppercase tracking-wide text-primary ring-1 ring-inset ring-primary/20">
                Operate &amp; Monitor
              </span>
            </nav>

            <ScrollReveal className="mt-6">
              <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Call Reports (Recordings / Transcripts)
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
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
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.08} className="hidden lg:block">
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
          <TranscriptSearchDemo />
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-20">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2.5 rounded-full bg-primary/[0.07] px-6 py-2.5 text-base font-semibold uppercase tracking-wide text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Related questions
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Recordings, transcripts, and compliance</h2>
            <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Straight from the FAQ — pick a question to see the answer.
            </p>
          </ScrollReveal>
          <div className="mx-auto mt-8 max-w-2xl">
            <FaqAccordion
              items={callReportsFaq}
              idPrefix="call-reports"
              itemClassName="border-border/60 border-l-4 border-l-transparent bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:border-l-primary hover:shadow-[0_12px_28px_-16px_rgba(15,23,42,0.15)]"
              triggerIcon={<ChevronRight className="pointer-events-none size-4 shrink-0" aria-hidden />}
            />
            <Link
              href="/faq"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              See all FAQs
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <PricingCta
        heading="Hear every call for yourself"
        description="Spin up your first agent and every call comes with a recording and transcript, ready to review."
        primaryHref="/get-started"
        primaryLabel="Get started"
        secondaryHref="/features"
        secondaryLabel="Back to Features"
      />

      <SiteFooter />
    </main>
  )
}
