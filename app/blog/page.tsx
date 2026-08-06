import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, CalendarClock, Globe, Tags } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PricingCta } from "@/components/pricing/pricing-cta"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"
import { BlogSearchProvider } from "@/components/blog/blog-search-context"
import { BlogCategoryFilter } from "@/components/blog/blog-category-filter"
import { BlogPostGrid } from "@/components/blog/blog-post-grid"
import { BlogHeroMockup } from "@/components/blog/blog-hero-mockup"
import { getAllBlogPostSummaries } from "@/lib/blog"
import { sanitizeHtml } from "@/lib/sanitize"

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
  "Voice AI": "border-primary/20 bg-primary/[0.08] text-primary",
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
  const topicCount = new Set(posts.map((p) => p.category)).size
  const latestUpdate = posts[0]?.publishedAt.split(" ").slice(1).join(" ") || ""

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />

      <BlogSearchProvider>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-blue-50/50 via-background to-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)]"
        />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-6 pt-10 md:px-6 md:pb-8 md:pt-14 lg:grid-cols-2 lg:gap-12">
          <ScrollReveal className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
              Guides, case studies &amp; insights
            </span>
            <h1 className="mt-6 text-balance text-[34px] font-bold leading-[1.15] tracking-tight sm:text-5xl md:text-6xl lg:text-[60px]">
              The AI Voice Agent{" "}
              <span className="bg-gradient-to-r from-primary via-[oklch(0.62_0.2_240)] to-[oklch(0.72_0.18_150)] bg-clip-text text-transparent">
                Knowledge Hub
              </span>
            </h1>
            <p className="mx-auto mt-5 line-clamp-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg lg:mx-0">
              Practical guides, comparisons, and real case studies on AI voice agents for Indian businesses — TRAI and
              DPDP compliance, per-second pricing, and support for Hindi, Tamil, Telugu, and 7 more languages, updated
              every week.
            </p>

            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 lg:mx-0 lg:max-w-none">
              <div className="flex items-center gap-2.5 rounded-lg border-[3px] border-border/60 bg-white px-3 py-2.5">
                <BookOpen className="size-4 flex-none text-primary" aria-hidden />
                <div className="min-w-0">
                  <p className="text-base font-bold leading-tight tracking-tight">{posts.length}</p>
                  <p className="truncate text-[11px] leading-tight text-muted-foreground">In-depth guides</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-lg border-[3px] border-border/60 bg-white px-3 py-2.5">
                <Tags className="size-4 flex-none text-primary" aria-hidden />
                <div className="min-w-0">
                  <p className="text-base font-bold leading-tight tracking-tight">{topicCount}</p>
                  <p className="truncate text-[11px] leading-tight text-muted-foreground">Topics covered</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-lg border-[3px] border-border/60 bg-white px-3 py-2.5">
                <Globe className="size-4 flex-none text-primary" aria-hidden />
                <div className="min-w-0">
                  <p className="text-base font-bold leading-tight tracking-tight">10+</p>
                  <p className="truncate text-[11px] leading-tight text-muted-foreground">Languages</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-lg border-[3px] border-border/60 bg-white px-3 py-2.5">
                <CalendarClock className="size-4 flex-none text-primary" aria-hidden />
                <div className="min-w-0">
                  <p className="text-base font-bold leading-tight tracking-tight">{latestUpdate || "Live"}</p>
                  <p className="truncate text-[11px] leading-tight text-muted-foreground">Last updated</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: rotates through the 3 newest posts as real cards (image,
              category, title) — hidden below lg, mobile hero stays a clean
              single centered column. */}
          <div className="hidden lg:mt-8 lg:block">
            <BlogHeroMockup posts={posts} />
          </div>
        </div>
      </section>

      {/* ── Posts ── */}
      <section className="w-full px-6 pb-16 pt-12 md:px-8 md:pb-20 md:pt-16">
        {/* Categories */}
        <BlogCategoryFilter topicCount={topicCount} postCount={posts.length} />

        {/* Featured */}
        {featured && (
          <ScrollReveal className="mb-6">
            <Link
              href={`/blog/${featured.slug}`}
              className="group block overflow-hidden rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/[0.07] via-white to-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="grid items-center gap-2 md:grid-cols-2 md:gap-8">
                <div className="order-last p-7 md:order-first md:p-10">
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${catClass(featured.category)}`}>
                      {featured.category}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">Featured</span>
                  </div>
                  <h2 className="mt-4 text-balance text-2xl font-bold leading-tight tracking-tight transition-colors group-hover:text-primary md:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{featured.description}</p>
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
                </div>
                <div
                  className="flex items-center justify-center overflow-hidden p-6 md:py-8 md:pr-8 [&_img]:aspect-[16/9] [&_img]:w-full [&_img]:object-cover [&_img]:!rounded-2xl [&_svg]:aspect-[16/9] [&_svg]:w-full [&_svg]:!rounded-2xl"
                  // Sanitized at the injection point — see lib/sanitize.ts.
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(featured.heroHtml) }}
                />
              </div>
            </Link>
          </ScrollReveal>
        )}

        {/* Grid */}
        <BlogPostGrid posts={rest} />
      </section>
      </BlogSearchProvider>

      <PricingCta
        heading="Ready to stop reading and start calling?"
        description="Pick a plan, optionally add a phone number, and start a real test call — most teams are live in under 5 minutes."
        primaryHref="/get-started"
        primaryLabel="Get started"
        secondaryHref="/pricing"
        secondaryLabel="View pricing"
      />

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
