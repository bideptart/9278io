import type { Metadata } from "next"
import Link from "next/link"
import { Sparkles, ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"
import { getAllBlogPostSummaries } from "@/lib/blog"

export const metadata: Metadata = pageSeo({
  title: "Blog — 9278.io",
  description:
    "Guides, case studies, and insights on AI voice agents, Indian languages, TRAI compliance, and automating phone calls for Indian businesses.",
  path: "/blog",
})

export const dynamic = "force-static"

const categoryColors: Record<string, string> = {
  "Use Cases": "border-primary/20 bg-primary/[0.08] text-primary",
  Guides: "border-primary/20 bg-primary/[0.08] text-primary",
  Compliance: "border-amber-400/20 bg-amber-400/[0.08] text-amber-400",
  Pricing: "border-amber-400/20 bg-amber-400/[0.08] text-amber-400",
  Industry: "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-400",
}

export default async function BlogPage() {
  const posts = await getAllBlogPostSummaries()
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
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white px-4 py-1.5 text-sm text-muted-foreground">
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
      <section className="w-full px-6 py-20 md:px-8 md:py-28">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ScrollReveal key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:border-primary/20 hover:bg-slate-50"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryColors[post.category] ?? "border-white/10 bg-slate-50 text-muted-foreground"}`}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.publishedAt}</span>
                </div>

                <div className="flex-1">
                  <h2 className="text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
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
