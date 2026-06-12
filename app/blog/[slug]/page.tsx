import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/blog"

export const dynamic = "force-static"
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return pageSeo({ title: "Blog — 9278.io", path: "/blog" })
  return pageSeo({
    title: `${post.title} — 9278.io`,
    description: post.description,
    path: `/blog/${post.slug}`,
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <BlogPostPageContent slug={slug} />
}

async function BlogPostPageContent({ slug }: { slug: string }) {
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      {/* ── Article header ── */}
      <header className="relative overflow-hidden border-b border-border/50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[360px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.16),transparent_70%)]"
        />
        <div className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to blog
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-primary/20 bg-primary/[0.08] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              {post.category}
            </span>
            <span className="text-sm text-muted-foreground">
              {post.publishedAt}
              {post.readTime ? ` · ${post.readTime}` : ""}
            </span>
          </div>

          <h1 className="mt-5 text-balance text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          {post.lead ? (
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">{post.lead}</p>
          ) : null}
        </div>
      </header>

      {/* ── Hero image ── */}
      {post.heroHtml ? (
        <div className="mx-auto w-full max-w-4xl px-6 pt-10">
          <div
            className="overflow-hidden rounded-3xl border-2 border-border/70 bg-background shadow-sm [&_svg]:block [&_svg]:h-auto [&_svg]:w-full"
            dangerouslySetInnerHTML={{ __html: post.heroHtml }}
          />
        </div>
      ) : null}

      {/* ── Article body ── */}
      <article
        className="mx-auto w-full max-w-3xl px-6 py-12 text-base leading-[1.8] text-foreground/80 md:py-16 md:text-[17px]
          [&_h2]:mt-12 [&_h2]:scroll-mt-24 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground md:[&_h2]:text-[28px]
          [&_h3]:mt-9 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:text-foreground
          [&_p]:mt-5
          [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:decoration-primary/30 [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:decoration-primary
          [&_strong]:font-semibold [&_strong]:text-foreground
          [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6
          [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6
          [&_li]:pl-1 [&_li]:marker:text-primary/60
          [&_table]:mt-7 [&_table]:w-full [&_table]:overflow-hidden [&_table]:rounded-xl [&_table]:border [&_table]:border-border [&_table]:text-[15px]
          [&_th]:bg-slate-50 [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-foreground
          [&_td]:border-t [&_td]:border-border [&_td]:px-4 [&_td]:py-2.5
          [&_figure]:mt-9 [&_figure]:overflow-hidden [&_figure]:rounded-2xl [&_figure]:border-2 [&_figure]:border-border/70 [&_figure]:bg-background
          [&_svg]:block [&_svg]:h-auto [&_svg]:w-full
          [&_figcaption]:px-4 [&_figcaption]:py-3 [&_figcaption]:text-center [&_figcaption]:text-[13px] [&_figcaption]:italic [&_figcaption]:text-muted-foreground
          [&_.callout]:mt-7 [&_.callout]:rounded-2xl [&_.callout]:border [&_.callout]:border-primary/20 [&_.callout]:border-l-4 [&_.callout]:border-l-primary [&_.callout]:bg-primary/[0.06] [&_.callout]:px-5 [&_.callout]:py-4 [&_.callout]:text-foreground/80
          [&_.keytakeaway]:mt-7 [&_.keytakeaway]:rounded-2xl [&_.keytakeaway]:border [&_.keytakeaway]:border-emerald-400/30 [&_.keytakeaway]:bg-emerald-400/[0.07] [&_.keytakeaway]:px-5 [&_.keytakeaway]:py-4
          [&_.cta]:mt-12 [&_.cta]:rounded-3xl [&_.cta]:border [&_.cta]:border-primary [&_.cta]:bg-primary [&_.cta]:px-6 [&_.cta]:py-8 [&_.cta]:text-center [&_.cta]:shadow-[0_4px_30px_oklch(0.52_0.22_265/0.25)]
          [&_.cta_h3]:mt-0 [&_.cta_h3]:text-xl [&_.cta_h3]:font-bold [&_.cta_h3]:text-white
          [&_.cta_p]:mt-2 [&_.cta_p]:text-white/70
          [&_.btn]:mt-5 [&_.btn]:inline-flex [&_.btn]:items-center [&_.btn]:justify-center [&_.btn]:rounded-lg [&_.btn]:bg-white [&_.btn]:px-5 [&_.btn]:py-2.5 [&_.btn]:text-sm [&_.btn]:font-semibold [&_.btn]:text-primary [&_.btn]:no-underline hover:[&_.btn]:bg-white/90
          [&_details]:mt-3 [&_details]:rounded-xl [&_details]:border-2 [&_details]:border-border/70 [&_details]:bg-white [&_details]:px-5 [&_details]:py-1
          [&_summary]:cursor-pointer [&_summary]:py-3 [&_summary]:font-semibold [&_summary]:text-foreground
          [&_.faq>h2]:mb-2"
        dangerouslySetInnerHTML={{ __html: post.articleHtml }}
      />

      {/* ── Footer nav ── */}
      <div className="mx-auto w-full max-w-3xl px-6 pb-20">
        <div className="flex items-center justify-between border-t border-border pt-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />
            All articles
          </Link>
          <Link
            href="/get-started"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Build your first agent
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
