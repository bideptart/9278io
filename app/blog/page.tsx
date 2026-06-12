import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
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
  Compliance: "border-amber-500/25 bg-amber-500/10 text-amber-600",
  Pricing: "border-amber-500/25 bg-amber-500/10 text-amber-600",
  Industry: "border-emerald-500/25 bg-emerald-500/10 text-emerald-600",
}

function catClass(category: string) {
  return categoryColors[category] ?? "border-border bg-slate-50 text-muted-foreground"
}

export default async function BlogPage() {
  const posts = await getAllBlogPostSummaries()
  const featured = posts[0]
  const rest = featured ? posts.slice(1) : posts

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)]"
        />
        <div className="mx-auto w-full max-w-4xl px-4 py-20 text-center md:px-6 md:py-28">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
              Guides, case studies &amp; insights
            </span>
            <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">The 9278.io Blog</h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              How Indian businesses are automating phone calls, staying TRAI-compliant, and unlocking ROI with AI voice
              agents in Hindi, Tamil, Telugu, and 12 more languages.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Posts ── */}
      <section className="w-full px-6 py-16 md:px-8 md:py-20">
        {/* Featured */}
        {featured && (
          <ScrollReveal className="mb-6">
            <Link
              href={`/blog/${featured.slug}`}
              className="group block overflow-hidden rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/[0.07] via-white to-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg md:p-10"
            >
              <div className="flex items-center gap-3">
                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${catClass(featured.category)}`}>
                  {featured.category}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Featured</span>
              </div>
              <h2 className="mt-4 max-w-3xl text-balance text-2xl font-bold leading-tight tracking-tight transition-colors group-hover:text-primary md:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">{featured.description}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
                <span>{featured.publishedAt}</span>
                {featured.readTime ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>{featured.readTime}</span>
                  </>
                ) : null}
                <span className="ml-auto inline-flex items-center gap-1.5 font-semibold text-primary">
                  Read article
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </Link>
          </ScrollReveal>
        )}

        {/* Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.04} className="h-full">
              <Link
                href={`/blog/${post.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-slate-50/60 hover:shadow-md"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="flex items-center justify-between">
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${catClass(post.category)}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.publishedAt}</span>
                </div>

                <div className="mt-4 flex-1">
                  <h2 className="text-base font-bold leading-snug tracking-tight transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                  <span>{post.readTime}</span>
                  <ArrowRight className="size-3.5 text-primary transition-transform group-hover:translate-x-1" aria-hidden />
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
          { href: "/pricing", title: "Pricing in INR", description: "Starter ₹2,999, Growth ₹8,799, Scale ₹29,999. GST charged at checkout." },
          { href: "/industries", title: "Industries we power", description: "BPO, BFSI, EdTech, e-commerce, and more." },
          { href: "/faq", title: "FAQ", description: "TRAI compliance, Indian languages, billing, and account questions." },
        ]}
      />

      <SiteFooter />
    </main>
  )
}
