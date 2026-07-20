import type { Metadata } from "next"
import { MessageCircleQuestion } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { GradientCta } from "@/components/sections/gradient-cta"
import { FaqSearchProvider } from "@/components/faq/faq-search-context"
import { FaqSearchBar } from "@/components/faq/faq-search-bar"
import { FaqGroupsList } from "@/components/faq/faq-groups-list"
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

      <FaqSearchProvider>
      <section className="relative overflow-hidden border-b border-border/50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)]"
        />
        <div className="w-full px-6 pb-10 pt-10 md:px-8 md:pb-14 md:pt-14">
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
            <p className="mx-auto mt-5 line-clamp-4 max-w-4xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Whether you're comparing plans before you sign up or already live and wondering how billing, phone
              numbers, or compliance actually work day to day, chances are someone asked the same thing before you.
              We've collected the real questions our team hears most — on pricing, credit expiry, Indian phone
              numbers, TRAI and DPDP compliance, and account access — answered here in plain language.
            </p>

            <FaqSearchBar />

            <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-x-6 gap-y-1 text-sm text-muted-foreground">
              <span><strong className="text-foreground">{FLAT_FAQ.length}+</strong> questions answered</span>
              <span aria-hidden>·</span>
              <span><strong className="text-foreground">{FAQ_GROUPS.length}</strong> categories</span>
              <span aria-hidden>·</span>
              <span><strong className="text-foreground">&lt;1hr</strong> avg reply</span>
            </div>
          </ScrollReveal>

          <ScrollReveal className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-2.5">
            {FAQ_GROUPS.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-white px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {g.title}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <MessageCircleQuestion className="size-3.5" aria-hidden />
              Still stuck? Talk to us
            </a>
          </ScrollReveal>
        </div>
      </section>

      <div id="faq-results" className="mx-auto w-full max-w-3xl scroll-mt-24 px-6 pb-16 pt-10 md:px-8 md:pb-24 md:pt-12">
        <FaqGroupsList groups={FAQ_GROUPS} />
      </div>
      </FaqSearchProvider>

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
