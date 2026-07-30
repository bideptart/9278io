import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Clock, LayoutGrid, MessageCircleQuestion, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { GradientCta } from "@/components/sections/gradient-cta"
import { FaqCategoryGrid } from "@/components/faq/faq-category-grid"
import { FaqDetailSections } from "@/components/faq/faq-detail-sections"
import { FaqIllustration } from "@/components/faq/faq-illustration"
import { FAQ_GROUPS, FLAT_FAQ } from "@/lib/faq"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

export const metadata: Metadata = pageSeo({
  title: "Frequently asked questions",
  description:
    "Answers on pricing, voice credit expiry, phone numbers, AI agents, compliance, and account access at 9278.io.",
  path: "/faq",
})

export default function FaqPage() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ]}
      />
      <FaqJsonLd items={FLAT_FAQ} />

      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {/* mesh-gradient blobs — layered, blurred color pools instead of a single flat wash */}
          <div className="absolute -left-24 -top-32 size-[480px] rounded-full bg-[oklch(0.78_0.16_195)]/30 blur-[110px]" />
          <div className="absolute -top-20 left-1/3 size-[420px] rounded-full bg-primary/25 blur-[100px]" />
          <div className="absolute -right-32 top-10 size-[380px] rounded-full bg-[oklch(0.72_0.18_300)]/[0.14] blur-[110px]" />
          <div className="absolute bottom-0 right-1/4 size-[320px] rounded-full bg-[oklch(0.75_0.14_262.88)]/20 blur-[90px]" />
          {/* faded grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.12)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(75%_55%_at_50%_0%,black,transparent)]" />
          {/* scattered accent nodes, scoped to this section only */}
          <span className="absolute left-[6%] top-[38%] size-1.5 rounded-full bg-primary/40 shadow-[0_0_8px_1px_oklch(0.546_0.215_262.88/0.35)]" />
          <span className="absolute left-[64%] top-[22%] size-1 rounded-full bg-primary/50 shadow-[0_0_6px_1px_oklch(0.546_0.215_262.88/0.35)]" />
          <span className="absolute left-[92%] top-[8%] size-1 rounded-full bg-primary/30" />
          {/* smooth fade into the content below instead of a hard rule */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pb-12 pt-6 md:px-8 md:pb-16 md:pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <ScrollReveal className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
              Frequently asked questions
            </span>
            <h1 className="mt-6 text-balance pb-1 text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl md:text-6xl">
              Everything you{" "}
              <span className="inline-block bg-gradient-to-r from-[oklch(0.75_0.14_262.88)] to-[oklch(0.4_0.2_262.88)] bg-clip-text pr-1 leading-[1.15] text-transparent">
                wanted to know
              </span>
              .
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg lg:mx-0">
              Real questions our team hears most — on pricing, Indian phone numbers, TRAI and DPDP compliance, and
              account access — answered in plain language, whether you're comparing plans or already live.
            </p>

            <div className="mx-auto mt-7 flex max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:mx-0 lg:justify-start">
              <div className="flex items-center gap-1.5">
                <MessageCircleQuestion className="size-4 text-primary" aria-hidden />
                <span className="text-sm font-semibold tabular-nums text-foreground">{FLAT_FAQ.length}+</span>
                <span className="text-sm text-muted-foreground">questions answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <LayoutGrid className="size-4 text-primary" aria-hidden />
                <span className="text-sm font-semibold tabular-nums text-foreground">{FAQ_GROUPS.length}</span>
                <span className="text-sm text-muted-foreground">categories</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="size-4 text-accent" aria-hidden />
                <span className="text-sm font-semibold text-foreground">&lt;1hr</span>
                <span className="text-sm text-muted-foreground">avg reply</span>
              </div>
            </div>

            <div className="mx-auto mt-7 flex max-w-xl flex-col justify-center gap-3 sm:flex-row lg:mx-0 lg:justify-start">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-gradient-to-r from-primary to-[oklch(0.5_0.21_255)] py-2 pl-8 pr-2 text-base font-semibold text-white shadow-[0_8px_28px_oklch(0.546_0.215_262.88/0.45)] transition-all hover:shadow-[0_10px_36px_oklch(0.546_0.215_262.88/0.6)]"
              >
                <Link href="/get-started">
                  Build your first agent
                  <span className="flex size-7 items-center justify-center rounded-full bg-white/20">
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-border bg-white px-7 text-base font-semibold text-foreground hover:border-primary/30 hover:bg-slate-50"
              >
                <Link href="/contact">
                  <PhoneCall className="mr-2 h-4 w-4" />
                  Talk to sales
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="hidden lg:block">
            <FaqIllustration
              questionCount={FLAT_FAQ.length}
              questions={FAQ_GROUPS.slice(0, 4).map((g) => g.items[0].q)}
            />
          </ScrollReveal>
        </div>
      </section>

      <div id="faq-results" className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 pb-8 pt-10 md:px-8 md:pb-12 md:pt-14">
        <ScrollReveal className="mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
            What's covered
          </span>
          <h2 className="mt-2 text-balance text-2xl font-bold tracking-tight md:text-3xl">
            Six topics. Every real question.
          </h2>
          <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Jump straight to a topic, or scroll through all {FLAT_FAQ.length}+ answers below.
          </p>
        </ScrollReveal>
        <FaqCategoryGrid groups={FAQ_GROUPS} />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-4 md:px-8 md:pb-28 md:pt-8">
        <FaqDetailSections groups={FAQ_GROUPS} />
      </div>

      <GradientCta
        id="contact"
        heading="Still have a question?"
        description="Talk to a live 9278.io agent — yes, that's actually how we do support — or book 20 minutes with a solutions engineer."
        primaryHref="/get-started"
        primaryLabel="Get started"
        secondaryHref="/pricing"
        secondaryLabel="View pricing"
      />

      <RelatedLinks
        heading="Keep reading"
        description="The pages most teams visit right after the FAQ."
        links={[
          {
            href: "/pricing",
            title: "Pricing & per-minute rates",
            description: "Compare Starter, Growth and Scale top-ups and see the full phone-number rate card.",
          },
          {
            href: "/industries",
            title: "Industries — pre-tuned playbooks",
            description: "Real estate, home services, restaurants, automotive, legal, education, and more.",
          },
          {
            href: "/get-started",
            title: "Get started in under 5 minutes",
            description: "Pick a plan, optionally add a phone number, and start a real test call.",
          },
        ]}
      />

      <SiteFooter />
    </main>
  )
}
