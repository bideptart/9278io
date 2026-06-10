import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
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

      <div className="mx-auto w-full max-w-4xl px-4 py-16 md:px-6 md:py-24">
        <Button asChild variant="ghost" size="sm" className="mb-8 -ml-2 text-muted-foreground">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
            Back to blog
          </Link>
        </Button>

        <div className="rounded-2xl border border-border bg-card/50 p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full border border-primary/20 bg-primary/[0.08] px-2.5 py-0.5 text-xs font-medium text-primary">
              {post.category}
            </span>
            <div className="text-xs text-muted-foreground">
              {post.publishedAt}
              {post.readTime ? ` · ${post.readTime}` : ""}
            </div>
          </div>

          <h1 className="mt-5 text-balance text-2xl font-semibold tracking-tight md:text-3xl">{post.title}</h1>
          {post.lead ? <p className="mt-4 text-pretty text-muted-foreground">{post.lead}</p> : null}

          {post.heroHtml ? (
            <div
              className="mt-8 overflow-hidden rounded-2xl border border-border bg-background"
              dangerouslySetInnerHTML={{ __html: post.heroHtml }}
            />
          ) : null}

          <div
            className="mt-10 text-sm leading-relaxed text-muted-foreground
              [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground
              [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-foreground
              [&_p]:mt-4
              [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline
              [&_strong]:text-foreground
              [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5
              [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5
              [&_li]:mt-2
              [&_table]:mt-6 [&_table]:w-full [&_table]:border-collapse
              [&_th]:border [&_th]:border-border [&_th]:bg-muted/40 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:text-foreground
              [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2
              [&_figure]:mt-8 [&_figure]:overflow-hidden [&_figure]:rounded-2xl [&_figure]:border [&_figure]:border-border [&_figure]:bg-background
              [&_figcaption]:px-4 [&_figcaption]:py-3 [&_figcaption]:text-xs [&_figcaption]:text-muted-foreground
              [&_.callout]:mt-6 [&_.callout]:rounded-2xl [&_.callout]:border [&_.callout]:border-primary/20 [&_.callout]:bg-primary/[0.06] [&_.callout]:px-5 [&_.callout]:py-4 [&_.callout]:text-muted-foreground
              [&_.keytakeaway]:mt-6 [&_.keytakeaway]:rounded-2xl [&_.keytakeaway]:border [&_.keytakeaway]:border-emerald-400/20 [&_.keytakeaway]:bg-emerald-400/[0.06] [&_.keytakeaway]:px-5 [&_.keytakeaway]:py-4
              [&_.cta]:mt-10 [&_.cta]:rounded-2xl [&_.cta]:border [&_.cta]:border-border [&_.cta]:bg-muted/30 [&_.cta]:px-6 [&_.cta]:py-6
              [&_.cta_h3]:mt-0 [&_.cta_h3]:text-foreground
              [&_.btn]:mt-4 [&_.btn]:inline-flex [&_.btn]:items-center [&_.btn]:justify-center [&_.btn]:rounded-lg [&_.btn]:bg-primary [&_.btn]:px-4 [&_.btn]:py-2.5 [&_.btn]:text-sm [&_.btn]:font-semibold [&_.btn]:text-primary-foreground [&_.btn]:no-underline hover:[&_.btn]:bg-primary/90
              [&_details]:mt-4 [&_details]:rounded-2xl [&_details]:border [&_details]:border-border [&_details]:bg-card/40 [&_details]:px-5 [&_details]:py-4
              [&_summary]:cursor-pointer [&_summary]:text-foreground [&_summary]:font-medium"
            dangerouslySetInnerHTML={{ __html: post.articleHtml }}
          />
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
