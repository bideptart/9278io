import type { Metadata } from "next"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Clock } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { LiveStatus } from "@/components/contact/live-status"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

// Code-split — neither needs to be in the initial hydration bundle for
// this page to be interactive (the hero above them has no interactivity
// of its own to block on).
const ContactForm = dynamic(() => import("@/components/contact/contact-form").then((m) => m.ContactForm))
const ChannelCards = dynamic(() => import("@/components/contact/channel-cards").then((m) => m.ChannelCards))
const FaqAccordion = dynamic(() => import("@/components/faq/faq-accordion").then((m) => m.FaqAccordion))

export const metadata: Metadata = pageSeo({
  title: "Contact us — 9278.io",
  description:
    "Get in touch with the 9278.io team. Sales, support, partnerships, and press enquiries for our AI voice agent platform for Indian businesses.",
  path: "/contact",
  keywords: [
    // Focus keyword first
    "AI receptionist demo",
    // Supporting keywords
    "AI voice agent demo",
    "AI receptionist pricing",
    "AI voice agent pricing",
    "talk to AI sales agent",
    "AI customer support voice",
    "contact AI voice agent provider",
    "AI phone answering service",
    "9278.io support",
  ],
})

// The contact action sends two emails (notification + acknowledgement);
// give it more than the short default so neither send is cut off.
export const maxDuration = 30

const faqs = [
  {
    q: "How quickly do you respond?",
    a: "Sales and billing enquiries are answered within a few hours during Indian business hours (9 AM – 7 PM IST, Monday–Saturday). Critical outages are handled 24/7 on all plans.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes — you can test the platform with our shared demo line before purchasing any credit. No credit card required.",
  },
  {
    q: "Can I book a demo call?",
    a: "Absolutely. Email info@9278.io with a preferred time and we'll set up a 30-minute walkthrough with a solutions engineer.",
  },
]

export default function ContactPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-blue-50/50 via-background to-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)]"
        />
        <div className="mx-auto w-full max-w-4xl px-4 py-10 text-center md:px-6 md:py-12">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
              We&apos;d love to hear from you
            </span>
            <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Get in{" "}
              <span className="bg-gradient-to-r from-primary via-[oklch(0.62_0.2_240)] to-[oklch(0.72_0.18_150)] bg-clip-text text-transparent">
                touch
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Whether you have a question about pricing, want to see a live demo, or need help with your agents — the
              9278.io team is here.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Clock className="size-4 text-primary" aria-hidden />
                Mon–Sat, 9 AM – 7 PM IST · Critical support 24/7
              </span>
              <LiveStatus />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Form + channels */}
      <section className="w-full px-6 py-10 md:px-8 md:py-14">
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <ScrollReveal>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Send us a message</h2>
              <p className="mt-2 text-pretty text-muted-foreground">
                Fill in the form and we&apos;ll get back to you by email, usually within one business day.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>

          {/* Channels */}
          <div className="flex flex-col lg:col-span-2">
            <ScrollReveal delay={0.08}>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Other ways to reach us</h2>
              <p className="mt-2 text-pretty text-muted-foreground">Prefer email, or want to hear it live? Take your pick.</p>
            </ScrollReveal>
            <ChannelCards />
          </div>
        </div>
      </section>

      {/* Quick FAQs */}
      <section className="border-t border-border/50">
        <div className="w-full px-6 py-14 md:px-8 md:py-16">
          <ScrollReveal className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Before you write
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">Common questions</h2>
          </ScrollReveal>

          <div className="mx-auto mt-10 max-w-3xl">
            <ScrollReveal>
              <FaqAccordion items={faqs} idPrefix="contact" contentClassName="pl-[52px]" />
            </ScrollReveal>
            <ScrollReveal className="flex justify-center pt-2">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 px-5 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                See all FAQs →
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <PricingCta
        heading="Prefer to just talk to someone?"
        description="Try our live demo agent right now — no signup, no waiting for an email back."
        primaryHref="/get-started"
        primaryLabel="Get started"
        secondaryHref="/pricing"
        secondaryLabel="View pricing"
      />

      <RelatedLinks
        heading="Useful pages"
        description="Explore pricing, industries, and frequently asked questions."
        links={[
          { href: "/pricing", title: "Pricing in INR", description: "Transparent INR rates, GST invoicing, no hidden fees." },
          { href: "/faq", title: "FAQ", description: "Billing, compliance, Indian languages, and more." },
          { href: "/get-started", title: "Get started free", description: "Deploy your first agent in under 5 minutes." },
        ]}
      />

      <SiteFooter />
    </main>
  )
}
