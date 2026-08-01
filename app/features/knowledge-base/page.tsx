import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, PhoneCall, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { FaqSwitcher } from "@/components/features-page/faq-switcher"
import { KnowledgeBaseHeroIllustration } from "@/components/features-page/knowledge-base-hero-illustration"
import { KnowledgeCategoryShowcase } from "@/components/features-page/knowledge-category-showcase"
import { KnowledgeSearchDemo } from "@/components/features-page/knowledge-search-demo"
import { KnowledgeIsolationVault } from "@/components/features-page/knowledge-isolation-vault"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { FAQ_GROUPS } from "@/lib/faq"

const agentsFaq = FAQ_GROUPS.find((g) => g.id === "agents")!.items.filter((i) =>
  ["How many concurrent AI agents do I get?", "Can I record and transcribe every call?"].includes(i.q),
)

export const metadata: Metadata = pageSeo({
  title: "Knowledge Base (per agent)",
  description: "Give each agent its own set of company facts, FAQs, and policies to draw on.",
  path: "/features/knowledge-base",
})

export default function KnowledgeBasePage() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Knowledge Base (per agent)", path: "/features/knowledge-base" },
        ]}
      />

      {/* Hero */}
      <section className="relative flex flex-col border-b border-border/50">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFF] to-[#EAF4FF]" />
          <div className="absolute -left-24 -top-24 size-[380px] rounded-full bg-primary/[0.06] blur-[120px]" />
          <div className="absolute -bottom-24 -right-16 size-[340px] rounded-full bg-primary/[0.05] blur-[120px]" />
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pb-20 pt-2 md:px-8 md:pb-24 md:pt-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div>
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
                Train &amp; Configure
              </span>
              <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Knowledge{" "}
                <span className="bg-gradient-to-r from-primary via-[oklch(0.62_0.2_240)] to-[oklch(0.72_0.18_150)] bg-clip-text text-transparent">
                  Base
                </span>
                <span className="block text-2xl font-medium text-muted-foreground sm:text-3xl md:text-4xl">per agent</span>
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Give each agent its own set of company facts, FAQs, and policies to draw on — isolated from
                every other agent on your account.
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
                {["Isolated per agent", "Edits go live instantly", "No re-training needed"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <Check className="size-3.5 text-primary" aria-hidden />
                    {t}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.08}>
            <KnowledgeBaseHeroIllustration />
          </ScrollReveal>
        </div>
      </section>

      {/* Three kinds of knowledge, one home */}
      <section className="border-b border-border/50 bg-white">
        <div className="mx-auto w-full max-w-4xl px-6 pb-16 pt-14 md:px-8 md:pb-20 md:pt-20">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              What goes in
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Three kinds of knowledge, one home</h2>
            <p className="mt-2 text-pretty text-muted-foreground">
              FAQs, policies, and business facts — every fact your agent needs, written the way you'd
              explain it to a new hire.
            </p>
          </ScrollReveal>
          <KnowledgeCategoryShowcase />
        </div>
      </section>

      {/* Ask it anything, it just knows */}
      <section className="border-b border-border/50" style={{ backgroundColor: "#F7F9FC" }}>
        <div className="mx-auto w-full max-w-4xl px-6 pb-16 pt-14 md:px-8 md:pb-20 md:pt-20">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              How it answers
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Ask it anything, it just knows</h2>
            <p className="mt-2 text-pretty text-muted-foreground">
              Mid-call, the agent matches the caller's question to the right entry — no scripting, no
              guessing.
            </p>
          </ScrollReveal>
          <KnowledgeSearchDemo />
        </div>
      </section>

      {/* Every agent, its own brain */}
      <section className="border-b border-border/50 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-14 md:px-8 md:pb-20 md:pt-20">
          <ScrollReveal className="max-w-2xl text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              No cross-talk
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Every agent, its own brain</h2>
            <p className="mt-2 text-pretty text-muted-foreground">
              Each agent's knowledge base is completely isolated — one agent never answers from another
              agent's facts.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.08} className="mt-10 flex justify-center">
            <KnowledgeIsolationVault />
          </ScrollReveal>
        </div>
      </section>

      {/* Related questions */}
      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-4xl px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Related questions
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Knowledge base, answered</h2>
            <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Straight from the FAQ — pick a question to see the answer.
            </p>
          </ScrollReveal>
          <div className="mt-8">
            <FaqSwitcher items={agentsFaq} />
          </div>
          <Link
            href="/faq"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            See all FAQs
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      </section>

      <PricingCta
        heading="Ready to give your agent its own knowledge base?"
        description="Build your first agent free, then add the FAQs, policies, and facts it should know — no code required."
        primaryHref="/get-started"
        primaryLabel="Get started"
        secondaryHref="/features"
        secondaryLabel="Back to Features"
      />

      <SiteFooter />
    </main>
  )
}
