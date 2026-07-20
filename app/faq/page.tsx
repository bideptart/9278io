import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { FaqAccordion } from "@/components/faq/faq-accordion"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
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
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ]}
      />
      <FaqJsonLd items={FLAT_FAQ} />

      <section className="relative overflow-hidden border-b border-border/50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)]"
        />
        <div className="w-full px-6 pb-20 pt-10 md:px-8 md:pb-28 md:pt-14">
          <ScrollReveal className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
              Frequently asked questions
            </span>
            <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-6xl">
              Everything you{" "}
              <span className="bg-gradient-to-r from-[oklch(0.75_0.14_262.88)] to-[oklch(0.4_0.2_262.88)] bg-clip-text text-transparent">
                wanted to know
              </span>
              .
            </h1>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Pricing, credit expiry, phone numbers, compliance, and account access — all in one place. Still stuck?
              The team replies within an hour during business days.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-10 flex flex-wrap justify-center gap-2">
            {FAQ_GROUPS.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-white px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {g.title}
              </a>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <div className="mx-auto w-full max-w-3xl px-6 py-16 md:px-8 md:py-24">
        {FAQ_GROUPS.map((group) => (
          <section key={group.id} id={group.id} className="scroll-mt-24 border-b border-border/50 py-10 first:pt-0 last:border-b-0">
            <ScrollReveal>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{group.title}</h2>
            </ScrollReveal>

            <ScrollReveal className="mt-6">
              <FaqAccordion items={group.items} idPrefix={group.id} />
            </ScrollReveal>
          </section>
        ))}
      </div>

      <section className="w-full px-6 pb-24 md:px-8">
        <ScrollReveal className="rounded-2xl border border-border/60 bg-white px-6 py-12 md:px-12 md:py-14">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h3 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                Still have a question?
              </h3>
              <p className="mt-3 text-muted-foreground">
                Talk to a live 9278.io agent — yes, that&apos;s actually how we do support — or book 20 minutes with a
                solutions engineer.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/get-started">Get started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

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
