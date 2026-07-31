import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Download, FileText, Mic, PhoneCall, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"

export const metadata: Metadata = pageSeo({
  title: "Call Reports (Recordings / Transcripts)",
  description: "Every call is recorded and transcribed, with playback and download built in.",
  path: "/features/call-reports",
})

const DETAILS = [
  {
    icon: FileText,
    title: "Recording + transcript for every call",
    description: "Every single call is captured as both an audio recording and a full text transcript.",
  },
  {
    icon: PlayCircle,
    title: "Play back or download anytime",
    description: "Listen right in the dashboard or pull the audio file down for your own records.",
  },
  {
    icon: Download,
    title: "Review exactly what was said",
    description: "Read the transcript to see exactly what your agent and the caller said, word for word.",
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

      <section className="relative overflow-hidden border-b border-border/50">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFF] to-[#EAF4FF]" />
          <div className="absolute -left-24 -top-24 size-[380px] rounded-full bg-primary/[0.06] blur-[120px]" />
          <div className="absolute -bottom-24 -right-16 size-[340px] rounded-full bg-primary/[0.05] blur-[120px]" />
        </div>
        <div className="mx-auto w-full max-w-4xl px-6 pb-14 pt-8 md:px-8 md:pb-20 md:pt-12">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link href="/features" className="hover:text-primary">
              Features
            </Link>{" "}
            <span aria-hidden>/</span> <span className="text-foreground">Call Reports</span>
          </nav>

          <ScrollReveal className="mt-6">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/[0.08] text-primary">
              <Mic className="size-6" aria-hidden />
            </span>
            <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
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
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-4xl px-6 py-14 md:px-8 md:py-20">
          <ScrollReveal>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">What you get</h2>
          </ScrollReveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {DETAILS.map((d, i) => {
              const Icon = d.icon
              return (
                <ScrollReveal key={d.title} delay={i * 0.05}>
                  <div className="h-full rounded-2xl border border-border/60 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <p className="mt-4 text-base font-semibold tracking-tight text-foreground">{d.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
                  </div>
                </ScrollReveal>
              )
            })}
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
