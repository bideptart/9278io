import type { Metadata } from "next"
import Link from "next/link"
import { Sparkles, ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

export const metadata: Metadata = pageSeo({
  title: "Blog — 9278.io",
  description:
    "Guides, case studies, and insights on AI voice agents, Indian languages, TRAI compliance, and automating phone calls for Indian businesses.",
  path: "/blog",
})

const posts = [
  {
    slug: "ai-voice-agents-hindi",
    category: "Product",
    date: "April 2025",
    title: "How we trained our Hindi voice model to handle Hinglish mid-call",
    excerpt:
      "Indian callers routinely switch between Hindi and English within a single sentence. Here's how we built a dialect detection system that keeps the conversation natural.",
    readTime: "6 min read",
  },
  {
    slug: "trai-compliance-guide",
    category: "Compliance",
    date: "March 2025",
    title: "TRAI compliance for outbound voice campaigns: a practical guide for 2025",
    excerpt:
      "DND scrubbing, calling-window rules, and consent capture — everything a legal team needs to sign off on your outbound AI calling campaign.",
    readTime: "8 min read",
  },
  {
    slug: "bfsi-ai-voice-india",
    category: "Industry",
    date: "March 2025",
    title: "How leading NBFC is using AI voice to reduce EMI default rates by 28%",
    excerpt:
      "A case study on deploying automated payment reminder calls in Hindi and Marathi across Tier-2 and Tier-3 cities — with near-human connect rates.",
    readTime: "5 min read",
  },
  {
    slug: "edtech-lead-qualification",
    category: "Industry",
    date: "February 2025",
    title: "EdTech lead qualification at 10× speed: a 9278.io customer story",
    excerpt:
      "How a Bengaluru-based coaching platform went from 60% lead-response rate to 95% by deploying an AI voice agent for first-touch qualification calls.",
    readTime: "4 min read",
  },
  {
    slug: "dpdp-act-voice-ai",
    category: "Compliance",
    date: "January 2025",
    title: "What the DPDP Act 2023 means for businesses using AI voice calling",
    excerpt:
      "Data localisation, consent requirements, the right to erasure — we break down every clause that applies to voice AI deployments in India.",
    readTime: "9 min read",
  },
  {
    slug: "whatsapp-voice-followup",
    category: "Product",
    date: "January 2025",
    title: "Closing the loop: using WhatsApp Business API after every AI voice call",
    excerpt:
      "Sending a WhatsApp confirmation message after an AI-handled appointment call increases show-up rates by 22%. Here's how to set it up in 9278.io.",
    readTime: "4 min read",
  },
]

const categoryColors: Record<string, string> = {
  Product: "border-primary/20 bg-primary/[0.08] text-primary",
  Compliance: "border-amber-400/20 bg-amber-400/[0.08] text-amber-400",
  Industry: "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-400",
}

export default function BlogPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
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
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" aria-hidden />
              Guides, case studies &amp; insights
            </span>
            <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-6xl">The 9278.io Blog</h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              How Indian businesses are automating phone calls, staying TRAI-compliant, and unlocking ROI with AI voice
              agents in Hindi, Tamil, Telugu, and 12 more languages.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Posts grid */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ScrollReveal key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-card/50 p-6 transition-all duration-300 hover:border-primary/20 hover:bg-white/[0.04]"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryColors[post.category] ?? "border-white/10 bg-white/[0.04] text-muted-foreground"}`}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>

                <div className="flex-1">
                  <h2 className="text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                  <span>{post.readTime}</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <RelatedLinks
        heading="Keep exploring"
        description="Product, pricing, and industries — everything in one place."
        links={[
          { href: "/pricing", title: "Pricing in INR", description: "Starter ₹3,000, Growth ₹8,800, Scale ₹30,000. GST charged at checkout." },
          { href: "/industries", title: "Industries we power", description: "BPO, BFSI, EdTech, e-commerce, and more." },
          { href: "/faq", title: "FAQ", description: "TRAI compliance, Indian languages, billing, and account questions." },
        ]}
      />

      <SiteFooter />
    </main>
  )
}
