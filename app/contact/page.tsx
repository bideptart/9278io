import type { Metadata } from "next"
import Link from "next/link"
import { Sparkles, Mail, MessageSquare, Phone, Clock } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

export const metadata: Metadata = pageSeo({
  title: "Contact us — 9278.io",
  description:
    "Get in touch with the 9278.io team. Sales, support, partnerships, and press enquiries for India's leading AI voice agent platform.",
  path: "/contact",
})

const channels = [
  {
    icon: Mail,
    title: "Email support",
    description: "For billing, technical issues, and general questions. We respond within one business day.",
    action: "hello@9278.io",
    href: "mailto:hello@9278.io",
  },
  {
    icon: MessageSquare,
    title: "Sales & partnerships",
    description: "Custom plans, reseller partnerships, or enterprise onboarding. We'll reply within a few hours.",
    action: "sales@9278.io",
    href: "mailto:sales@9278.io",
  },
  {
    icon: Phone,
    title: "Talk to an agent",
    description: "The fastest way to see 9278.io in action — call our demo agent right now and test the experience.",
    action: "Try a live demo",
    href: "/get-started",
  },
]

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
    a: "Absolutely. Email sales@9278.io with a preferred time and we'll set up a 30-minute walkthrough with a solutions engineer.",
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
      <section className="relative overflow-hidden border-b border-border/50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)]"
        />
        <div className="mx-auto w-full max-w-4xl px-4 py-20 text-center md:px-6 md:py-28">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white px-4 py-1.5 text-sm text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" aria-hidden />
              We&apos;d love to hear from you
            </span>
            <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-6xl">Get in touch</h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Whether you have a question about pricing, want to see a live demo, or need help with your agents — the
              9278.io team is here.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="size-4 text-primary" aria-hidden />
              Mon–Sat, 9 AM – 7 PM IST · Critical support 24/7
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Channels */}
      <section className="w-full px-6 py-20 md:px-8 md:py-28">
        <div className="grid gap-6 md:grid-cols-3">
          {channels.map((c) => {
            const Icon = c.icon
            return (
              <ScrollReveal key={c.title}>
                <div className="flex flex-col gap-5 rounded-2xl border border-border bg-white p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.08] text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                  </div>
                  <Button asChild variant="outline" className="mt-auto w-fit border-border bg-white">
                    <a href={c.href}>{c.action}</a>
                  </Button>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </section>

      {/* Quick FAQs */}
      <section className="border-t border-border/50">
        <div className="w-full px-6 py-20 md:px-8 md:py-28">
          <ScrollReveal className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Before you write</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">Common questions</h2>
          </ScrollReveal>

          <div className="mt-10 space-y-4">
            {faqs.map((f) => (
              <ScrollReveal key={f.q}>
                <div className="rounded-2xl border border-border bg-white p-6">
                  <h3 className="font-semibold">{f.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </div>
              </ScrollReveal>
            ))}
            <ScrollReveal>
              <p className="pt-2 text-center text-sm text-muted-foreground">
                More answers in our{" "}
                <Link href="/faq" className="text-primary underline-offset-4 hover:underline">
                  full FAQ
                </Link>
                .
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

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
